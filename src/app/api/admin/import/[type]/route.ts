import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Vercel Pro: extend timeout for image uploads. Hobby plan caps at 10s.
export const maxDuration = 60;

const VALID_TYPES = ["courses", "universities"] as const;
type ImportType = (typeof VALID_TYPES)[number];

const SANITY_TYPE_MAP: Record<ImportType, string> = {
  courses: "courseCard",
  universities: "universityCard",
};

const VALID_MODES = ["Online", "Distance", "Online + Distance", "Blended"];
const VALID_FEE_CATEGORIES = ["Under 1 Lakh", "1–2 Lakh", "2–3 Lakh", "3–5 Lakh", "5+ Lakh"];

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
    return NextResponse.json({ error: "Invalid type. Use 'courses' or 'universities'." }, { status: 400 });
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
  if (rows.length > 100) {
    return NextResponse.json(
      { error: `Too many rows (${rows.length}). Max 100 per import — split into smaller batches.` },
      { status: 400 }
    );
  }

  const client = getSanityClient();
  const results: ResultRow[] = [];

  for (const row of rows) {
    const internalName = row.internalName?.trim();
    if (!internalName) {
      results.push({ internalName: "(empty)", action: "skipped", error: "Missing internalName" });
      continue;
    }

    try {
      let fields: Record<string, unknown>;

      if (importType === "courses") {
        if (!row.courseName?.trim()) {
          results.push({ internalName, action: "skipped", error: "Missing courseName" });
          continue;
        }
        fields = {
          internalName,
          courseName: row.courseName.trim(),
          universityName: row.universityName?.trim() || "",
          mode: VALID_MODES.includes(row.mode?.trim()) ? row.mode.trim() : "",
          duration: row.duration?.trim() || "",
          fees: row.fees?.trim() || "",
          feeCategory: VALID_FEE_CATEGORIES.includes(row.feeCategory?.trim()) ? row.feeCategory.trim() : "",
          eligibility: row.eligibility?.trim() || "",
          badge: row.badge?.trim() || "",
          isFeatured: row.isFeatured?.trim().toUpperCase() === "TRUE",
        };
      } else {
        if (!row.universityName?.trim()) {
          results.push({ internalName, action: "skipped", error: "Missing universityName" });
          continue;
        }
        fields = {
          internalName,
          universityName: row.universityName.trim(),
          mode: VALID_MODES.includes(row.mode?.trim()) ? row.mode.trim() : "",
          duration: row.duration?.trim() || "",
          approvedBy: row.approvedBy?.trim()
            ? row.approvedBy.split("|").map((s) => s.trim()).filter(Boolean)
            : [],
          fees: row.fees?.trim() || "",
          feeCategory: VALID_FEE_CATEGORIES.includes(row.feeCategory?.trim()) ? row.feeCategory.trim() : "",
          eligibility: row.eligibility?.trim() || "",
          badge: row.badge?.trim() || "",
          isFeatured: row.isFeatured?.trim().toUpperCase() === "TRUE",
        };
      }

      // Upload logo if URL provided
      let logoError: string | undefined;
      const logoUrl = row.logoUrl?.trim();
      if (logoUrl) {
        try {
          const slug = internalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
          fields.universityLogo = await uploadLogoFromUrl(client, logoUrl, slug);
        } catch (e) {
          logoError = `Logo skipped: ${e instanceof Error ? e.message : "Unknown error"}`;
        }
      }

      // Upsert: update if exists, create if not
      const existingId = await client.fetch<string | null>(
        `*[_type == $sanityType && internalName == $name][0]._id`,
        { sanityType, name: internalName }
      );

      if (existingId) {
        await client.patch(existingId).set(fields).commit();
        results.push({ internalName, action: "updated", error: logoError });
      } else {
        await client.create({ _type: sanityType, ...fields });
        results.push({ internalName, action: "created", error: logoError });
      }
    } catch (err) {
      results.push({
        internalName,
        action: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({ results });
}
