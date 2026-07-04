import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const VALID_TYPES = ["courses", "universities"] as const;
type ExportType = (typeof VALID_TYPES)[number];

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

function escapeCsv(val: unknown): string {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toCsvRow(fields: unknown[]): string {
  return fields.map(escapeCsv).join(",");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as ExportType)) {
    return NextResponse.json({ error: "Invalid type. Use 'courses' or 'universities'." }, { status: 400 });
  }

  const client = getSanityClient();
  let csv = "";

  if (type === "courses") {
    const docs = await client.fetch<Record<string, unknown>[]>(
      `*[_type == "courseCard"] | order(courseName asc) {
        internalName, courseName, universityName, mode, duration, fees, feeCategory, eligibility, badge, isFeatured,
        "logoUrl": universityLogo.asset->url
      }`
    );

    const headers = ["internalName","courseName","universityName","mode","duration","fees","feeCategory","eligibility","badge","isFeatured","logoUrl"];
    const rows = docs.map((c) =>
      toCsvRow([
        c.internalName, c.courseName, c.universityName, c.mode, c.duration,
        c.fees, c.feeCategory, c.eligibility, c.badge,
        c.isFeatured ? "TRUE" : "FALSE",
        c.logoUrl ?? "",
      ])
    );
    csv = [headers.join(","), ...rows].join("\n");
  } else {
    const docs = await client.fetch<Record<string, unknown>[]>(
      `*[_type == "universityCard"] | order(universityName asc) {
        internalName, universityName, mode, duration, approvedBy, fees, feeCategory, eligibility, badge, isFeatured,
        "logoUrl": universityLogo.asset->url
      }`
    );

    const headers = ["internalName","universityName","mode","duration","approvedBy","fees","feeCategory","eligibility","badge","isFeatured","logoUrl"];
    const rows = docs.map((u) =>
      toCsvRow([
        u.internalName, u.universityName, u.mode, u.duration,
        Array.isArray(u.approvedBy) ? (u.approvedBy as string[]).join("|") : "",
        u.fees, u.feeCategory, u.eligibility, u.badge,
        u.isFeatured ? "TRUE" : "FALSE",
        u.logoUrl ?? "",
      ])
    );
    csv = [headers.join(","), ...rows].join("\n");
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-export.csv"`,
    },
  });
}
