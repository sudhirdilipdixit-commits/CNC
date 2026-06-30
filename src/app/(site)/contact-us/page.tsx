import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CollegeNCourses",
  description:
    "Speak to a senior counsellor by phone, WhatsApp, or email. Three ways to get personalised guidance on online MBA and distance programmes.",
  openGraph: {
    title: "Contact CollegeNCourses",
    description:
      "Call, WhatsApp, or email us. A senior counsellor will reach you within 30 minutes.",
  },
};

// ── What happens next ────────────────────────────────────────────────────────

const NEXT_STEPS = [
  {
    n: "1",
    title: "We call you",
    body: "A senior counsellor calls within 30 minutes (Mon–Sat, 9 am–7 pm).",
  },
  {
    n: "2",
    title: "We listen first",
    body: "We understand your goals, timeline, and budget before recommending anything.",
  },
  {
    n: "3",
    title: "Shortlist in 48 hours",
    body: "You get a personalised PDF shortlist of programmes matched to your profile.",
  },
  {
    n: "4",
    title: "Guided application",
    body: "We help with forms, documents, and deadlines — at no cost to you.",
  },
];

export default function ContactPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Hero — padding 48px 0 0, no bottom padding, flows into method cards */}
      <section style={{ padding: "48px 0 0", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">GET IN TOUCH</div>
            <h1 className="h-display h1" style={{ margin: "12px 0 16px" }}>
              Three ways to talk to a real counsellor.
            </h1>
            <p className="lede">
              Call us, WhatsApp us, or fill the form below. A senior counsellor reaches you within
              30 minutes during working hours. No call centre. No pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Method cards — plain container, flows on ivory, margin 40px 0 */}
      <div className="container">
        <div className="contact-methods">

          {/* Call */}
          <div className="method-card method-card-call">
            <div className="method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--yellow)" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="method-title">Call us directly</div>
            <div className="method-contact">+91 7350 460 393</div>
            <div className="method-detail">Monday to Saturday, 9 am to 8 pm IST. Average wait under 60 seconds.</div>
            <div className="method-cta">
              <a href="tel:+917350460393" className="btn btn-primary btn-sm">Call Now</a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="method-card method-card-wa">
            <div className="method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.4-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
                <path d="M12 2A10 10 0 002 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2A10 10 0 0022 12 10 10 0 0012 2z" />
              </svg>
            </div>
            <div className="method-title">WhatsApp us</div>
            <div className="method-contact">+91 7350 460 393</div>
            <div className="method-detail">Replies during working hours. Useful for quick questions, sending documents, or scheduling a call.</div>
            <div className="method-cta">
              <a href="https://wa.me/917350460393" target="_blank" rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "1.5px solid rgba(255,255,255,.3)" }}>
                Open WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="method-card method-card-email">
            <div className="method-icon" style={{ color: "var(--navy)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="method-title" style={{ color: "var(--navy)" }}>Email us</div>
            <div className="method-contact" style={{ color: "var(--navy)" }}>info@collegencourses.com</div>
            <div className="method-detail">Reply within 4 working hours. For data or privacy requests, write to privacy@collegencourses.com.</div>
            <div className="method-cta">
              <a href="mailto:info@collegencourses.com" className="btn btn-secondary btn-sm">Send Email</a>
            </div>
          </div>

        </div>
      </div>

      {/* Main: Form + What happens next — white section, padding-top: 0 */}
      <section style={{ background: "var(--white)", paddingTop: 0, paddingBottom: 64 }}>
        <div className="container contact-main">

          {/* LEFT: Form card */}
          <div className="contact-form-card">
            <div className="contact-form-header">
              <h2>Or fill the form and we&apos;ll call you</h2>
              <p>Within 30 minutes during working hours. No spam, no obligations.</p>
            </div>
            <div className="contact-form-body">
              <ContactForm />
            </div>
          </div>

          {/* RIGHT: What happens next + office + map + other contacts */}
          <div>
            <div className="what-next">
              <h3>What happens next</h3>
              <div className="next-steps">
                {NEXT_STEPS.map((s) => (
                  <div key={s.n} className="next-step">
                    <div className="next-step-num">{s.n}</div>
                    <div className="next-step-body">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office */}
            <div style={{
              marginTop: 28, padding: "20px 24px",
              background: "var(--ivory)", border: "1px solid var(--mist)",
              borderRadius: "var(--radius-lg)",
            }}>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 8 }}>
                Our office
              </div>
              <div style={{ color: "var(--charcoal)", fontSize: 14, lineHeight: 1.8 }}>
                <strong>DNYANAL EDUCON PRIVATE LIMITED</strong><br />
                Pune, Maharashtra, India
              </div>
            </div>

            {/* Map placeholder */}
            <div className="map-placeholder">
              <span>Map coming soon</span>
            </div>

            {/* Other contacts */}
            <div className="other-contacts">
              <div className="other-contact">
                <strong>Partnerships</strong>
                <a href="mailto:partnerships@collegencourses.com" style={{ color: "var(--navy)" }}>
                  partnerships@collegencourses.com
                </a>
              </div>
              <div className="other-contact">
                <strong>Careers</strong>
                <a href="mailto:careers@collegencourses.com" style={{ color: "var(--navy)" }}>
                  careers@collegencourses.com
                </a>
              </div>
              <div className="other-contact">
                <strong>Grievance Redressal</strong>
                <Link href="/grievances" style={{ color: "var(--navy)" }}>
                  View grievance policy &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Page-scoped styles matching reference exactly */}
      <style>{`
        .contact-methods {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin: 40px 0;
        }
        @media (min-width: 640px) {
          .contact-methods { grid-template-columns: repeat(3, 1fr); }
        }

        .method-card {
          border-radius: 14px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }
        .method-card-call { background: var(--navy); color: var(--ivory); }
        .method-card-wa   { background: #25D366; color: #fff; }
        .method-card-email { background: var(--white); border: 2px solid var(--mist); color: var(--charcoal); }

        .method-icon {
          width: 48px; height: 48px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; flex: 0 0 48px;
        }
        .method-card-call  .method-icon { background: rgba(252,204,0,.15); }
        .method-card-wa    .method-icon { background: rgba(255,255,255,.2); }
        .method-card-email .method-icon { background: var(--pale-navy); }

        .method-title { font-family: var(--font-serif); font-size: 20px; line-height: 1.2; }
        .method-card-call  .method-title { color: var(--yellow); }
        .method-card-wa    .method-title { color: #fff; }

        .method-contact { font-size: 18px; font-weight: 700; line-height: 1.2; }
        .method-card-call  .method-contact { color: #fff; }
        .method-card-wa    .method-contact { color: #fff; }
        .method-card-email .method-contact { color: var(--navy); }

        .method-detail { font-size: 13px; line-height: 1.5; }
        .method-card-call  .method-detail { color: var(--pale-navy); }
        .method-card-wa    .method-detail { color: rgba(255,255,255,.85); }
        .method-card-email .method-detail { color: var(--grey); }

        .method-cta { margin-top: auto; }

        /* 2-col main layout */
        .contact-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding: 48px 0 0;
        }
        @media (min-width: 1024px) {
          .contact-main { grid-template-columns: 1.1fr .9fr; gap: 56px; align-items: start; }
        }

        /* Form card */
        .contact-form-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-top: 4px solid var(--yellow);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(36,48,72,.06);
        }
        .contact-form-header { padding: 24px 28px; border-bottom: 1px solid var(--mist); }
        .contact-form-header h2 { font-family: var(--font-serif); color: var(--navy); font-size: 22px; margin-bottom: 6px; }
        .contact-form-header p  { color: var(--grey); font-size: 14px; }
        .contact-form-body { padding: 24px 28px; }

        /* What happens next */
        .what-next { background: var(--ivory); border: 1px solid var(--mist); border-radius: 14px; padding: 28px; }
        .what-next h3 { font-family: var(--font-serif); color: var(--navy); font-size: 20px; margin-bottom: 24px; }
        .next-steps { display: flex; flex-direction: column; gap: 16px; }
        .next-step { display: flex; gap: 14px; align-items: flex-start; }
        .next-step-num {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--navy); color: var(--yellow);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif); font-size: 16px; font-weight: 700;
          flex: 0 0 32px;
        }
        .next-step-body h4 { color: var(--navy); font-size: 15px; margin-bottom: 4px; }
        .next-step-body p  { font-size: 13px; color: var(--grey); line-height: 1.5; margin: 0; }

        /* Map */
        .map-placeholder {
          background: var(--pale-navy);
          border-radius: 8px;
          height: 220px;
          display: flex; align-items: center; justify-content: center;
          color: var(--navy); font-size: 14px; font-weight: 600;
          border: 1px solid var(--mist);
          margin-top: 20px;
        }
        .map-placeholder span { opacity: .5; }

        /* Other contacts */
        .other-contacts { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
        .other-contact { font-size: 14px; color: var(--charcoal); }
        .other-contact strong { color: var(--navy); display: block; margin-bottom: 2px; font-size: 13px; }
      `}</style>
    </main>
  );
}
