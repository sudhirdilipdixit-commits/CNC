import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { waitUntil } from "@vercel/functions";
import { pushToAgile } from "@/lib/agilecrm";

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  city: z.string().min(2).max(100),
  courseInterested: z.string().max(200).optional().default(""),
  consent: z.boolean(),
  // UTM fields
  utmSource: z.string().max(200).optional().default(""),
  utmMedium: z.string().max(200).optional().default(""),
  utmCampaign: z.string().max(200).optional().default(""),
  utmContent: z.string().max(200).optional().default(""),
  utmTerm: z.string().max(200).optional().default(""),
  gclidFbclid: z.string().max(200).optional().default(""),
  landingPage: z.string().max(500).optional().default(""),
  referrer: z.string().max(500).optional().default(""),
  // Device
  userAgent: z.string().max(500).optional().default(""),
  deviceType: z.string().max(50).optional().default(""),
  browser: z.string().max(100).optional().default(""),
  source: z.string().max(100).optional().default("modal"),
});

// Rate limiting store (in-memory, use Redis in prod)
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000; // 1 min

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: d } = parsed;

    // Server-side duplicate check (last 24 hours)
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .or(`mobile.eq.${d.mobile},email.eq.${d.email}`)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ duplicate: true });
    }

    // Insert lead
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: d.name,
        mobile: d.mobile,
        email: d.email,
        city: d.city,
        course_interested: d.courseInterested,
        consent: d.consent,
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
        status: "new",
      })
      .select("id")
      .single();

    if (error) throw error;

    // Push to Agile CRM after response is sent — waitUntil keeps the function
    // alive on Vercel without making the user wait for the Agile API.
    waitUntil(
      pushToAgile({
        name: d.name,
        mobile: d.mobile,
        email: d.email,
        city: d.city,
        courseInterested: d.courseInterested,
        utmSource: d.utmSource,
        utmMedium: d.utmMedium,
        utmCampaign: d.utmCampaign,
        landingPage: d.landingPage,
        source: d.source,
      }).catch((e) => console.error("Agile CRM push failed:", e))
    );

    return NextResponse.json({ id: String(lead.id).slice(-5).toUpperCase() });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
