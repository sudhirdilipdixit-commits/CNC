"use client";

import { useState } from "react";
import type { ResourceDetail } from "./page";

// ─── Default after-steps (shown if Sanity field is empty) ─────────────────────
const DEFAULT_AFTER_STEPS = [
  { stepLabel: "01", title: "Guide in your inbox", body: "Within 60 seconds. Check spam if not there within 2 minutes." },
  { stepLabel: "02", title: "One follow-up email", body: "In 3 days, with questions other aspirants asked us after reading. Unsubscribe in one click." },
  { stepLabel: "03", title: "No call unless you ask", body: "If you want to talk to a counsellor, reply to the email or use the contact form." },
];

// ─── Shared input style ────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  border: "1px solid var(--pale-navy)", borderRadius: "var(--radius-md)",
  background: "var(--white)", fontSize: 15, fontFamily: "var(--font-sans)",
  color: "var(--charcoal)", outline: "none",
};
const lbl: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase" as const,
  color: "var(--navy)", marginBottom: 6,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function LeadMagnetClient({ data }: { data: ResourceDetail }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [mobile, setMobile]     = useState("");
  const [consent, setConsent]   = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const afterSteps = (data.afterSteps && data.afterSteps.length > 0)
    ? data.afterSteps
    : DEFAULT_AFTER_STEPS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    setError("");
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile: mobile || undefined,
          city: "Online",
          courseInterested: data.pdfName ?? data.headline,
          consent: true,
          source: "resource-download",
          landingPage: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setSubmitted(true);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <style>{`
        .lm-form-focus:focus { border-color: var(--yellow) !important; box-shadow: 0 0 0 3px rgba(252,204,0,.18); }
        .lm-panel-mobile { background: var(--ivory) !important; }
        @media (min-width: 1024px) { .lm-panel-mobile { background: var(--navy) !important; } }
        .lm-hero-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .lm-hero-grid { grid-template-columns: 1.1fr 0.9fr; min-height: calc(100vh - 64px); } }
        .lm-content-pad { padding: 48px 0 40px; }
        @media (min-width: 1024px) { .lm-content-pad { padding: 64px 48px 64px 0; } }
      `}</style>

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ fontSize: 12, color: "var(--grey)", padding: "10px 0", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <a href="/" style={{ color: "var(--grey)" }}>Home</a>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <a href="/resources" style={{ color: "var(--grey)" }}>Resources</a>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>
              {data.pdfName ?? data.headline}
            </span>
          </nav>
        </div>
      </div>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--ivory)", padding: 0 }}>
        <div className="container">
          <div className="lm-hero-grid">

            {/* ── Left: Content ─────────────────────────────────────────── */}
            <div className="lm-content-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

              {/* Eyebrow */}
              {data.eyebrow && (
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>
                  {data.eyebrow}
                </div>
              )}

              {/* H1 */}
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px,4.5vw,48px)", lineHeight: 1.1, color: "var(--navy)", letterSpacing: "-0.01em", marginBottom: 20 }}>
                {data.headline}
              </h1>

              {/* Lede */}
              {data.lede && (
                <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--charcoal)", lineHeight: 1.6, marginBottom: 24 }}>
                  {data.lede}
                </p>
              )}

              {/* Social proof bar */}
              {(data.downloadCount || data.ratingText) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)", marginBottom: 24 }}>
                  {data.downloadCount && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--grey)" }}>
                      <span style={{ fontWeight: 700, color: "var(--navy)" }}>{data.downloadCount}</span>
                      &nbsp;aspirants have downloaded this
                    </div>
                  )}
                  {data.ratingText && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--grey)" }}>
                      <span style={{ color: "var(--yellow)", fontSize: 14, letterSpacing: 1 }}>★★★★★</span>
                      &nbsp;{data.ratingText}
                    </div>
                  )}
                </div>
              )}

              {/* What's inside */}
              {(data.checklistItems && data.checklistItems.length > 0) && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>
                    What&apos;s inside
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {data.checklistItems.map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 15, color: "var(--charcoal)" }}>
                        <span style={{ flexShrink: 0, width: 20, height: 20, background: "var(--yellow)", color: "var(--navy)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Freshness note */}
              {data.freshnessNote && (
                <p style={{ fontSize: 12, color: "var(--grey)", fontStyle: "italic", marginBottom: 0 }}>
                  {data.freshnessNote}
                </p>
              )}

              {/* Testimonials */}
              {(data.testimonials && data.testimonials.length > 0) && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
                  {data.testimonials.map((t, i) => (
                    <div key={i} style={{ background: "var(--white)", borderLeft: "3px solid var(--yellow)", padding: "12px 16px", borderRadius: "0 var(--radius-md) var(--radius-md) 0" }}>
                      <p style={{ fontSize: 14, color: "var(--charcoal)", fontStyle: "italic", marginBottom: 4 }}>
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div style={{ fontSize: 12, color: "var(--grey)" }}>{t.attribution}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Form Panel ──────────────────────────────────────── */}
            <div
              className="lm-panel-mobile"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}
            >
              <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", overflow: "hidden", width: "100%", maxWidth: 420, boxShadow: "0 12px 40px rgba(36,48,72,.14)" }}>

                {!submitted ? (
                  /* ── Form state ─────────────────────────────────────── */
                  <>
                    <div style={{ background: "var(--navy)", padding: "24px 28px", textAlign: "center" }}>
                      <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)", fontSize: 22, marginBottom: 6 }}>
                        {data.formTitle ?? "Get the Guide. Free."}
                      </h3>
                      <p style={{ color: "var(--yellow)", fontSize: 13 }}>
                        {data.formSubtitle ?? "In your inbox in 60 seconds. No spam."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ padding: "24px 28px" }}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={lbl}>Full Name <span style={{ color: "#B83A2A" }}>*</span></label>
                        <input
                          value={name} onChange={e => setName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="lm-form-focus" style={inp}
                        />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={lbl}>Email <span style={{ color: "#B83A2A" }}>*</span></label>
                        <input
                          type="email" value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="lm-form-focus" style={inp}
                        />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 6 }}>
                          Mobile
                          <span style={{ color: "rgba(36,48,72,.5)", fontWeight: 400, fontSize: 11, textTransform: "none", letterSpacing: 0 }}>
                            (optional)
                          </span>
                        </label>
                        <input
                          type="tel" value={mobile} onChange={e => setMobile(e.target.value)}
                          placeholder="+91 98XXX XX XX"
                          className="lm-form-focus" style={inp}
                        />
                      </div>
                      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "var(--grey)", marginBottom: 16, lineHeight: 1.5, cursor: "pointer" }}>
                        <input
                          type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)" }}
                        />
                        <span>Send me the guide and one short follow-up about Online MBA programmes.</span>
                      </label>

                      {error && <p style={{ color: "#B83A2A", fontSize: 13, marginBottom: 12 }}>{error}</p>}

                      <button
                        type="submit" disabled={submitting || !consent}
                        className="btn btn-primary"
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: (!consent || submitting) ? 0.7 : 1 }}
                      >
                        {submitting ? "Sending…" : "Email Me the Guide"}
                        {!submitting && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>

                      <p style={{ fontSize: 11, color: "var(--grey)", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
                        Used by {data.downloadCount ?? "thousands of"} aspirants. DPDP Act compliant. Unsubscribe in one click.
                      </p>
                    </form>

                    <div style={{ background: "var(--ivory)", padding: "12px 28px", textAlign: "center", fontSize: 11, color: "var(--grey)", borderTop: "1px solid var(--mist)" }}>
                      {data.formFooterNote ?? "No call unless you ask for one. Seriously."}
                    </div>
                  </>
                ) : (
                  /* ── Post-submit PDF reveal ──────────────────────────── */
                  <>
                    <div style={{ background: "var(--navy)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 48, height: 48, background: "var(--yellow)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                        📄
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)", fontSize: 16, lineHeight: 1.2 }}>
                          {data.pdfName ?? data.headline}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--yellow)", marginTop: 4 }}>
                          CollegeNCourses{data.pageCount ? ` · ${data.pageCount} pages` : ""}{data.lastUpdated ? ` · ${data.lastUpdated}` : ""}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "20px 24px" }}>
                      {/* Success message */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#E8F5EA", borderRadius: "var(--radius-md)", padding: "12px 16px", marginBottom: 16 }}>
                        <div style={{ width: 28, height: 28, background: "#2A7A3A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
                          ✓
                        </div>
                        <p style={{ fontSize: 14, color: "#2A7A3A", fontWeight: 600 }}>
                          Sent to {email}. Check your inbox (or spam).
                        </p>
                      </div>

                      {/* Download button (if PDF URL provided) */}
                      {data.pdfDownloadUrl ? (
                        <a
                          href={data.pdfDownloadUrl}
                          download
                          className="btn btn-primary btn-sm"
                          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}
                        >
                          Download directly
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                        </a>
                      ) : (
                        <div style={{ marginBottom: 14 }} />
                      )}

                      <div style={{ fontSize: 12, color: "var(--grey)", lineHeight: 1.6 }}>
                        <strong style={{ color: "var(--navy)", display: "block", marginBottom: 6 }}>What happens next</strong>
                        You&apos;ll get one follow-up email in 3 days with questions other aspirants asked after reading the guide. You can unsubscribe in one click. No call unless you ask for one.
                      </div>

                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--mist)" }}>
                        <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 12 }}>
                          Ready to take the next step?
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <a href="/ai-counsellor" className="btn btn-primary btn-sm" style={{ justifyContent: "center" }}>
                            Get AI Programme Recommendations
                          </a>
                          <a href="/counselling" style={{ textAlign: "center", fontSize: 13, color: "var(--navy)", fontWeight: 600 }}>
                            Talk to a senior counsellor →
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ AFTER DOWNLOAD STEPS ════════════════════════════════════════════ */}
      <section style={{ background: "var(--white)", padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>
              WHAT HAPPENS NEXT
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px,3.2vw,36px)", lineHeight: 1.15, color: "var(--navy)", marginBottom: 14 }}>
              After you download
            </h2>
            <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {afterSteps.map((step, i) => (
              <div
                key={i}
                style={{ background: "var(--white)", border: "1px solid var(--mist)", borderRadius: "var(--radius-md)", padding: 20, textAlign: "center" }}
              >
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, color: "var(--yellow)", marginBottom: 10 }}>
                  {step.stepLabel ?? String(i + 1).padStart(2, "0")}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.5 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--yellow)", padding: "56px 0", textAlign: "center", borderTop: "4px solid var(--navy)" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(24px,3.5vw,34px)", marginBottom: 12 }}>
            Want a counsellor to walk you through this?
          </h2>
          <p style={{ color: "var(--navy)", fontSize: 17, marginBottom: 28, lineHeight: 1.6 }}>
            Book a free 30-minute call. We&apos;ll cover your specific profile, the guide findings, and what makes sense for you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/counselling" className="btn btn-inverted">
              Book a Free Call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/resources" className="btn btn-secondary">
              ← Back to Resources
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
