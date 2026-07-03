import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOtp } from "@/lib/otpStore";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().length(6),
});

const MESSAGES: Record<string, string> = {
  invalid: "Incorrect OTP. Please try again.",
  expired: "OTP has expired. Please request a new one.",
  max_attempts: "Too many incorrect attempts. Please request a new OTP.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { mobile, otp } = parsed.data;
    const result = verifyOtp(mobile, otp);

    if (result === "valid") {
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json(
      { error: MESSAGES[result] ?? "Verification failed." },
      { status: result === "invalid" ? 401 : 400 }
    );
  } catch (err) {
    console.error("OTP verify error:", err);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
