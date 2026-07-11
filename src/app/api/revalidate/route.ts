import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag");

  if (tag) {
    revalidateTag(tag);
  } else {
    // Bust all known cache tags
    revalidateTag("resourceItem");
    revalidateTag("resourceDetail");
    revalidateTag("courseCard");
    revalidatePath("/");
    revalidatePath("/resources");
  }

  return NextResponse.json({ revalidated: true, tag: tag ?? "all", at: new Date().toISOString() });
}
