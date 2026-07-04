import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };
  const secret = process.env.ADMIN_SECRET;

  if (!secret || !password || password !== secret) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_auth");
  return res;
}
