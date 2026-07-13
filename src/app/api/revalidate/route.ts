import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

// Maps every Sanity document type → the Next.js list pages that must revalidate.
// Individual slug pages are derived automatically from the payload's slug field.
const TYPE_PATHS: Record<string, string[]> = {
  homepage:            ["/"],
  blog:                ["/blog"],
  author:              ["/blog"],
  blogCategory:        ["/blog"],
  faq:                 ["/", "/specializations-guide"],
  specializationsPage: ["/specializations-guide"],
  specializationDetail:["/specializations-guide"],
  resourceItem:        ["/resources"],
  resourceDetail:      ["/resources"],
  landingPage:         [],          // only the individual slug page matters
  courseCard:          ["/"],
  universityCard:      ["/"],
};

// Derives the individual slug URL for document types that have one.
function slugPath(type: string, slug: string): string | null {
  switch (type) {
    case "blog":               return `/blog/${slug}`;
    case "author":             return `/blog/authors/${slug}`;
    case "blogCategory":       return `/blog/category/${slug}`;
    case "specializationDetail": return `/specializations-guide/${slug}`;
    case "resourceDetail":     return `/resources/${slug}`;
    case "landingPage":        return `/${slug}`;
    default:                   return null;
  }
}

// Verifies the Sanity webhook HMAC signature.
// Sanity header format: "t=<unix_timestamp>,v1=<hmac_sha256_hex>"
// Signed payload: "<timestamp>.<raw_body>"
function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const parts: Record<string, string> = {};
  for (const part of header.split(",")) {
    const eq = part.indexOf("=");
    if (eq !== -1) parts[part.slice(0, eq)] = part.slice(eq + 1);
  }
  const { t: timestamp, v1: signature } = parts;
  if (!timestamp || !signature) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const webhookSig = request.headers.get("sanity-webhook-signature");
  const secretParam = request.nextUrl.searchParams.get("secret");

  // ── Authentication ──────────────────────────────────────────────────────────
  if (webhookSig) {
    // Sanity-signed webhook
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "SANITY_WEBHOOK_SECRET not set" }, { status: 500 });
    }
    if (!verifySignature(rawBody, webhookSig, webhookSecret)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }
  } else if (secretParam) {
    // Manual call with ?secret=
    if (secretParam !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse payload ───────────────────────────────────────────────────────────
  let payload: Record<string, unknown> = {};
  try { payload = JSON.parse(rawBody); } catch { /* manual call with empty body */ }

  const docType = payload._type as string | undefined;
  const slug = (payload.slug as string | undefined)
    ?? (payload.slug as { current?: string } | undefined)?.current;
  const pathParam = request.nextUrl.searchParams.get("path");

  const revalidated: string[] = [];

  const flush = (path: string) => {
    revalidatePath(path);
    revalidated.push(path);
  };

  // ── Revalidation logic ──────────────────────────────────────────────────────
  if (pathParam) {
    // Explicit path override (manual calls)
    flush(pathParam);
  } else if (docType) {
    // Revalidate every list page for this type
    for (const p of TYPE_PATHS[docType] ?? ["/"]) flush(p);
    // Revalidate the specific document's slug page
    if (slug) {
      const sp = slugPath(docType, slug);
      if (sp) flush(sp);
    }
  } else {
    // No type info — revalidate the whole layout (conservative fallback)
    revalidatePath("/", "layout");
    revalidated.push("/ (layout)");
  }

  return NextResponse.json({ revalidated, at: new Date().toISOString() });
}
