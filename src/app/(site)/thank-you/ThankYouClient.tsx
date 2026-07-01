"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ThankYouClient() {
  const params = useSearchParams();
  const name = params.get("name") || "";
  const id = params.get("id") || "";
  const source = params.get("source") || "website";
  const displayId = id || "CNC-2026-XXXXX";

  useEffect(() => {
    // ── GTM dataLayer ──────────────────────────────────────────
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      enquiry_id: displayId,
      lead_source: source,
    });

    // ── Meta Pixel ─────────────────────────────────────────────
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", { content_name: source });
    }

    // ── Google Ads / GA4 (replace AW-XXXXX/YYYYY with your IDs)
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        // send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
        transaction_id: displayId,
      });
    }
  }, [displayId, source]);

  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* ── Hero ── */}
      <section style={{ background: "var(--ivory)", padding: "56px 0 48px" }}>
        <div className="container">
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>

            <div className="ty-tick" role="img" aria-label="Success">&#10003;</div>

            <h1 className="h-display h1" style={{ marginBottom: 14 }}>
              Thank you{name ? `, ${name}` : ""}. We&apos;ve got your enquiry.
            </h1>

            <div className="ty-enquiry-id">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              Enquiry ID:&nbsp;{displayId}
            </div>

            <p className="lede" style={{ color: "var(--grey)", marginBottom: 0 }}>
              Confirmation sent by SMS and WhatsApp. A senior counsellor will call
              you within 30 minutes during working hours.
            </p>

          </div>
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section style={{ background: "var(--white)", padding: "48px 0 64px" }}>
        <div className="container">

          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 36px" }}>
            <div className="eyebrow">WHAT HAPPENS NEXT</div>
            <h2 className="h-display h2">Here is the timeline from here</h2>
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 8px" }}>
            <div className="ty-timeline">

              {/* Step 1 – done */}
              <div className="timeline-step">
                <span className="time-badge">Done</span>
                <div className="timeline-icon tl-done">&#10003;</div>
                <h4>Enquiry received</h4>
                <p>
                  Your enquiry is logged with ID {displayId}. Confirmation sent
                  by SMS and WhatsApp.
                </p>
              </div>

              {/* Step 2 – next */}
              <div className="timeline-step">
                <span className="time-badge">Within 30 min</span>
                <div className="timeline-icon tl-next">2</div>
                <h4>Counsellor review</h4>
                <p>
                  A senior counsellor reads your enquiry and prepares personalised
                  programme options for you.
                </p>
              </div>

              {/* Step 3 – later */}
              <div className="timeline-step">
                <span className="time-badge">First call</span>
                <div className="timeline-icon tl-later">3</div>
                <h4>30-minute call</h4>
                <p>
                  Your situation, your options, your questions. No commitment, no
                  sales pitch.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Back home ── */}
      <div style={{ background: "var(--ivory)", padding: "32px 0", textAlign: "center" }}>
        <div className="container">
          <Link href="/" style={{
            color: "var(--navy)", fontWeight: 600, fontSize: 15,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to homepage
          </Link>
        </div>
      </div>

      {/* ── Page-scoped styles ── */}
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .ty-tick {
          width: 80px; height: 80px; border-radius: 50%;
          background: var(--yellow); border: 4px solid var(--navy);
          color: var(--navy);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          font-size: 36px; font-weight: 800;
          animation: popIn .4s cubic-bezier(.16,1,.3,1);
        }

        .ty-enquiry-id {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--pale-navy); border-radius: 999px;
          padding: 8px 18px;
          font-weight: 700; font-size: 14px; letter-spacing: .06em;
          color: var(--navy);
          margin: 14px 0 20px;
        }

        /* Timeline grid */
        .ty-timeline {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          position: relative;
        }
        @media (min-width: 640px) {
          .ty-timeline { grid-template-columns: repeat(3, 1fr); }
        }

        .timeline-step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative;
          padding: 0 16px 32px;
        }

        /* Mobile: vertical connector above each step (except first) */
        .timeline-step::before {
          content: ''; display: block;
          width: 2px; height: 40px;
          background: var(--pale-navy);
          margin: 0 auto;
        }
        .timeline-step:first-child::before { display: none; }

        /* Desktop: horizontal connector to the right of each step (except last) */
        @media (min-width: 640px) {
          .timeline-step::before { display: none; }
          .timeline-step:not(:last-child)::after {
            content: ''; position: absolute;
            top: 46px;    /* time-badge height (~18px) + gap (8px) + icon half (20px) */
            right: -50%; width: 100%; height: 2px;
            background: var(--pale-navy); z-index: 0;
          }
        }

        .time-badge {
          display: inline-block;
          background: var(--yellow); color: var(--navy);
          font-size: 10px; font-weight: 800;
          padding: 2px 8px; border-radius: 3px;
          letter-spacing: .08em; text-transform: uppercase;
          margin-bottom: 8px;
        }

        .timeline-icon {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 800;
          z-index: 1; flex-shrink: 0; margin-bottom: 14px;
        }
        .tl-done  { background: var(--yellow); color: var(--navy); }
        .tl-next  { background: var(--navy);   color: var(--yellow); }
        .tl-later { background: var(--mist);   color: var(--grey); }

        .timeline-step h4 {
          font-size: 15px; font-weight: 700;
          color: var(--navy); margin-bottom: 6px;
        }
        .timeline-step p {
          font-size: 13px; color: var(--grey); line-height: 1.55;
        }
      `}</style>
    </main>
  );
}
