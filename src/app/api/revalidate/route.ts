import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath("/");
    revalidatePath("/resources");
    revalidatePath("/ai-counsellor");
  }

  return NextResponse.json({ revalidated: true, path: path ?? "all", at: new Date().toISOString() });
}
