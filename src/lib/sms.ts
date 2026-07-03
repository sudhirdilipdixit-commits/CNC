export async function sendOtpSms(mobile: string, otp: string): Promise<void> {
  const apiKey = process.env.SMS_API_KEY;
  const sender = process.env.SMS_SENDER_ID;
  const templateId = process.env.SMS_DLT_TEMPLATE_ID;
  const template =
    process.env.SMS_OTP_TEMPLATE ??
    "Your OTP for CollegeNCourses verification is {OTP}. Valid for 10 minutes. Do not share with anyone.";

  if (!apiKey || !sender) throw new Error("SMS credentials not configured");

  const message = template.replace("{OTP}", otp);

  const params = new URLSearchParams({
    apikey: apiKey,
    sender,
    to: `91${mobile}`,
    msg: message,
    ...(templateId ? { templateid: templateId } : {}),
  });

  const res = await fetch(
    `https://www.smsalert.co.in/api/push.json?${params.toString()}`,
    { method: "GET" }
  );

  const json = await res.json().catch(() => null);
  console.log("[SMS] response:", res.status, json);

  if (!res.ok) {
    throw new Error(`SMS API ${res.status}: ${JSON.stringify(json)}`);
  }

  // SMSalert returns status 0 for errors even on HTTP 200
  if (json && (json.status === 0 || json.status === "error")) {
    throw new Error(`SMS send failed: ${JSON.stringify(json)}`);
  }
}
