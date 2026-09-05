import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Rows are processed concurrently (see mapWithConcurrency), so this only
// needs to cover the slowest single row plus network overhead — not
// rows * per-row time like a fully sequential loop would.
export const maxDuration = 300;

const VALID_TYPES = ["courses", "universities", "faqs"] as const;
type ImportType = (typeof VALID_TYPES)[number];

const SANITY_TYPE_MAP: Record<ImportType, string> = {
  courses: "courseCard",
  universities: "universityCard",
  faqs: "faq",
};

function getSanityClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN!,
    useCdn: false,
  });
}

function checkAuth(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  return !!secret && request.headers.get("authorization") === `Bearer ${secret}`;
}

// Robust CSV parser — handles quoted fields, embedded commas, escaped quotes ("")
function parseCSV(raw: string): Record<string, string>[] {
  const text = raw.replace(/^﻿/, "").trim(); // strip BOM if present
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return [];

  function parseLine(line: string): string[] {
    const result: string[] = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (c === "," && !inQuotes) {
        result.push(field);
        field = "";
      } else {
        field += c;
      }
    }
    result.push(field);
    return result;
  }

  const headers = parseLine(lines[0]).map((h) => h.trim());
  return lines
    .slice(1)
    .filter((l) => l.trim())
    .map((l) => {
      const values = parseLine(l);
      const row: Record<string, string> = {};
      headers.forEach((h, i) => { row[h] = values[i]?.trim() ?? ""; });
      return row;
    });
}

// Runs `fn` over `items` with at most `limit` in flight at once, preserving
// result order. Used so 100 rows' worth of network calls (existence checks,
// logo uploads, writes) overlap instead of running one at a time.
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function uploadLogoFromUrl(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any,
  url: string,
  slug: string
): Promise<object> {
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const asset = await client.assets.upload("image", buffer, {
    filename: `${slug}-logo`,
    contentType,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

type ResultRow = { internalName: string; action: string; error?: string };

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as ImportType)) {
    return NextResponse.json({ error: "Invalid type. Use 'courses', 'universities', or 'faqs'." }, { status: 400 });
  }

  const importType = type as ImportType;
  const sanityType = SANITY_TYPE_MAP[importType];

  const body = await request.json() as { csv?: string };
  if (!body.csv?.trim()) {
    return NextResponse.json({ error: "No CSV content provided." }, { status: 400 });
  }

  const rows = parseCSV(body.csv);
  if (rows.length === 0) {
    return NextResponse.json({ error: "CSV has no data rows (only a header was found)." }, { status: 400 });
  }
  const maxRows = importType === "faqs" ? 500 : 100;
  if (rows.length > maxRows) {
    return NextResponse.json(
      { error: `Too many rows (${rows.length}). Max ${maxRows} per import — split into smaller batches.` },
      { status: 400 }
    );
  }

  const client = getSanityClient();
  const results: ResultRow[] = [];

  // ── FAQ Library — single transaction (1 fetch + 1 commit regardless of row count) ──
  if (importType === "faqs") {
    const existingFaqs = await client.fetch<{ _id: string; question: string }[]>(
      `*[_type == "faq"]{_id, question}`
    );
    const existingMap = new Map(existingFaqs.map((f) => [f.question, f._id]));
    const tx = client.transaction();

    for (const row of rows) {
      const question = row.question?.trim();
      if (!question) {
        results.push({ internalName: "(empty)", action: "skipped", error: "Missing question" });
        continue;
      }
      const answer = row.answer?.trim();
      if (!answer) {
        results.push({ internalName: question.slice(0, 70), action: "skipped", error: "Missing answer" });
        continue;
      }
      const fields = {
        question,
        answer,
        tags: row.tags?.trim()
          ? row.tags.split("|").map((s: string) => s.trim()).filter(Boolean)
          : [],
      };
      const existingId = existingMap.get(question);
      if (existingId) {
        tx.patch(existingId, (p) => p.set(fields));
        results.push({ internalName: question.slice(0, 70), action: "updated" });
      } else {
        tx.create({ _type: "faq", ...fields });
        results.push({ internalName: question.slice(0, 70), action: "created" });
      }
    }

    try {
      await tx.commit();
    } catch (err) {
      return NextResponse.json({
        error: `Transaction failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      }, { status: 500 });
    }
    return NextResponse.json({ results });
  }

  // ── Courses & Universities ──────────────────────────────────────────────
  // One query up front instead of one per row, so 100 rows don't mean 100
  // round-trips just to find out which ones already exist.
  const existing = await client.fetch<{ _id: string; internalName: string }[]>(
    `*[_type == $sanityType]{_id, internalName}`,
    { sanityType }
  );
  const existingMap = new Map(existing.map((d) => [d.internalName, d._id]));

  const tx = client.transaction();

  // Logo uploads and existence lookups are network-bound and independent
  // per row, so run them with several in flight at once instead of strictly
  // one row at a time — this is what actually kept 100-row imports under
  // the function timeout.
  const rowResults = await mapWithConcurrency(rows, 6, async (row): Promise<ResultRow> => {
    const internalName = row.internalName?.trim();
    if (!internalName) {
      return { internalName: "(empty)", action: "skipped", error: "Missing internalName" };
    }

    try {
      let fields: Record<string, unknown>;

      if (importType === "courses") {
        if (!row.courseName?.trim()) {
          return { internalName, action: "skipped", error: "Missing courseName" };
        }
        fields = {
          internalName,
          courseName: row.courseName.trim(),
          universityName: row.universityName?.trim() || "",
          duration: row.duration?.trim() || "",
          fees: row.fees?.trim() || "",
          eligibility: row.eligibility?.trim() || "",
          badge: row.badge?.trim() || "",
          isFeatured: row.isFeatured?.trim().toUpperCase() === "TRUE",
        };
      } else {
        if (!row.universityName?.trim()) {
          return { internalName, action: "skipped", error: "Missing universityName" };
        }
        fields = {
          internalName,
          universityName: row.universityName.trim(),
          duration: row.duration?.trim() || "",
          approvedBy: row.approvedBy?.trim()
            ? row.approvedBy.split("|").map((s) => s.trim()).filter(Boolean)
            : [],
          fees: row.fees?.trim() || "",
          eligibility: row.eligibility?.trim() || "",
          badge: row.badge?.trim() || "",
          isFeatured: row.isFeatured?.trim().toUpperCase() === "TRUE",
        };
      }

      // ── Logo handling ──────────────────────────────────────────
      const logoUrl = row.logoUrl?.trim();
      const logoAlt = row.logoAlt?.trim() || "";
      const logoTitle = row.logoTitle?.trim() || "";
      const logoDescription = row.logoDescription?.trim() || "";
      let logoError: string | undefined;

      if (logoUrl) {
        try {
          const slug = internalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
          const asset = await uploadLogoFromUrl(client, logoUrl, slug);
          fields.universityLogo = {
            ...asset,
            ...(logoAlt && { alt: logoAlt }),
            ...(logoTitle && { title: logoTitle }),
            ...(logoDescription && { description: logoDescription }),
          };
        } catch (e) {
          logoError = `Logo skipped: ${e instanceof Error ? e.message : "Unknown error"}`;
        }
      }

      // Upsert: update if exists, create if not — queued into the shared
      // transaction and committed once at the end, not per row.
      const existingId = existingMap.get(internalName);

      if (existingId) {
        tx.patch(existingId, (p) => {
          let patched = p.set(fields);
          // Update logo metadata even without a new logo URL
          if (!logoUrl && (logoAlt || logoTitle || logoDescription)) {
            const metaPatch: Record<string, string> = {};
            if (logoAlt) metaPatch["universityLogo.alt"] = logoAlt;
            if (logoTitle) metaPatch["universityLogo.title"] = logoTitle;
            if (logoDescription) metaPatch["universityLogo.description"] = logoDescription;
            patched = patched.set(metaPatch);
          }
          return patched;
        });
        return { internalName, action: "updated", error: logoError };
      } else {
        tx.create({ _type: sanityType, ...fields });
        return { internalName, action: "created", error: logoError };
      }
    } catch (err) {
      return {
        internalName,
        action: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

  results.push(...rowResults);

  try {
    await tx.commit();
  } catch (err) {
    return NextResponse.json({
      error: `Transaction failed: ${err instanceof Error ? err.message : "Unknown error"}`,
    }, { status: 500 });
  }

  return NextResponse.json({ results });
}
