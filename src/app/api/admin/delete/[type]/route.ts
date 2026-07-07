import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

export const maxDuration = 60;

const VALID_TYPES = ["courses", "universities", "faqs", "blogs"] as const;
type DeleteType = (typeof VALID_TYPES)[number];

const SANITY_TYPE_MAP: Record<DeleteType, string> = {
  courses: "courseCard",
  universities: "universityCard",
  faqs: "faq",
  blogs: "blog",
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as DeleteType)) {
    return NextResponse.json(
      { error: "Invalid type. Use 'courses', 'universities', 'faqs', or 'blogs'." },
      { status: 400 }
    );
  }

  const sanityType = SANITY_TYPE_MAP[type as DeleteType];

  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: "SANITY_API_TOKEN is not set in environment variables." }, { status: 500 });
  }

  const client = getSanityClient();

  let ids: string[];
  try {
    ids = await client.fetch<string[]>(`*[_type == $sanityType]._id`, { sanityType });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch IDs: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  if (ids.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  // Delete in batches of 50
  const BATCH = 50;
  try {
    for (let i = 0; i < ids.length; i += BATCH) {
      const tx = client.transaction();
      ids.slice(i, i + BATCH).forEach((id) => tx.delete(id));
      await tx.commit();
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Delete failed: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ deleted: ids.length });
}
