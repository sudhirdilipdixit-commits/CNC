import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const schema = z.object({
  name: z.string().min(1).max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  utmSource: z.string().max(200).optional().default(""),
  utmMedium: z.string().max(200).optional().default(""),
  utmCampaign: z.string().max(200).optional().default(""),
  utmContent: z.string().max(200).optional().default(""),
  utmTerm: z.string().max(200).optional().default(""),
  gclidFbclid: z.string().max(200).optional().default(""),
  landingPage: z.string().max(500).optional().default(""),
  referrer: z.string().max(500).optional().default(""),
  userAgent: z.string().max(500).optional().default(""),
  deviceType: z.string().max(50).optional().default(""),
  browser: z.string().max(100).optional().default(""),
  source: z.string().max(100).optional().default("modal"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ saved: false }, { status: 400 });
    }

    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: d } = parsed;

    // Skip if an unverified record for this mobile already exists (avoid duplicates)
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("mobile", d.mobile)
      .eq("status", "unverified")
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ saved: false });
    }

    await supabase.from("leads").insert({
      name: d.name,
      mobile: d.mobile,
      email: "",
      city: "",
      course_interested: "",
      consent: false,
      utm_source: d.utmSource,
      utm_medium: d.utmMedium,
      utm_campaign: d.utmCampaign,
      utm_content: d.utmContent,
      utm_term: d.utmTerm,
      gclid_fbclid: d.gclidFbclid,
      landing_page: d.landingPage,
      referrer: d.referrer,
      ip_address: ip,
      user_agent: d.userAgent,
      device_type: d.deviceType,
      browser: d.browser,
      source: d.source,
      status: "unverified",
    });

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error("Partial lead error:", err);
    return NextResponse.json({ saved: false }, { status: 500 });
  }
}
