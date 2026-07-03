import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOtp, canSendOtp, storeOtp } from "@/lib/otpStore";
import { sendOtpSms } from "@/lib/sms";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }

    const { mobile } = parsed.data;
    const { allowed, cooldownSeconds } = canSendOtp(mobile);

    if (!allowed) {
      if (cooldownSeconds) {
        return NextResponse.json(
          { error: `Please wait ${cooldownSeconds} seconds before resending.` },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Maximum OTP requests reached. Please try again later." },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    await sendOtpSms(mobile, otp);
    storeOtp(mobile, otp);

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
