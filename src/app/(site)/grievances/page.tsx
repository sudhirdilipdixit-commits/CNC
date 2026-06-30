import type { Metadata } from "next";
import Link from "next/link";
import GrievanceForm from "@/components/grievances/GrievanceForm";

export const metadata: Metadata = {
  title: "Grievance Redressal | CollegeNCourses",
  description:
    "Submit a complaint or grievance about our counselling, service, or data practices. Three-level escalation matrix with 24-hour acknowledgement.",
  openGraph: {
    title: "Grievance Redressal | CollegeNCourses",
    description:
      "We take every grievance seriously. Submit a complaint and receive a reference number within 24 hours.",
  },
};

const ESC_LEVELS = [
  {
    num: "1",
    label: "First contact",
    title: "Customer Grievance Cell",
    contact: "grievances@collegencourses.com",
    subject: "Grievance: [brief description]",
    sla: "Response within 48 working hours",
    note: "Include your name, mobile, enquiry ID (if any), and a clear description of the issue. We will acknowledge within 24 hours and resolve or escalate within 48.",
  },
  {
    num: "2",
    label: "Second escalation",
    title: "Grievance Officer",
    contact: "grievanceofficer@collegencourses.com",
    designation: "Head of Operations, DNYANAL EDUCON PRIVATE LIMITED",
    sla: "Response within 7 working days",
    note: "Escalate here only if Level 1 has not resolved your grievance within 5 working days. Please include the Level 1 ticket reference number in your email.",
  },
  {
    num: "3",
    label: "Founder escalation",
    title: "Founder and Director",
    contact: "founder@collegencourses.com",
    designation: "Nikhita Pradeep Deshmukh, Founder and Director",
    sla: "Response within 15 working days",
    note: "Reserved for unresolved or serious grievances that have not been addressed satisfactorily at Levels 1 and 2. Include all previous correspondence.",
  },
];

const RIGHTS = [
  {
    title: "Honest information",
    body: "Accurate, up-to-date programme details including real fees, accreditation status, and batch dates.",
  },
  {
    title: "No sales pressure",
    body: "One call, one WhatsApp follow-up. No more unless you ask. No \"limited seats\" pressure tactics.",
  },
  {
    title: "Data privacy",
    body: "Your personal data is never sold. You can request deletion at any time at privacy@collegencourses.com.",
  },
  {
    title: "Transparent pricing",
    body: "No hidden fees, no surprise charges beyond what was disclosed before you applied.",
  },
  {
    title: "Honest comparisons",
    body: "We will tell you if a competitor's programme is a better fit for your situation, even if we don't earn a referral.",
  },
  {
    title: "Timely resolution",
    body: "Every grievance acknowledged within 24 hours, resolved or escalated within 48 working hours at Level 1.",
  },
];

export default function GrievancesPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{
            display: "flex", gap: 6, alignItems: "center",
            padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap",
          }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Grievance Redressal</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: "48px 0", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow">GRIEVANCE REDRESSAL</div>
            <h1 className="h-display h1" style={{ margin: "12px 0 16px" }}>
              Complaints and grievances
            </h1>
            <p className="lede" style={{ marginBottom: 20 }}>
              We take every grievance seriously. If anything in our counselling,
              sales process, or service did not meet the standard we promise,
              please tell us. We will respond, and we will act.
            </p>

            {/* DPDP compliance card */}
            <div style={{
              background: "var(--pale-navy)",
              borderLeft: "4px solid var(--yellow)",
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              padding: "16px 20px",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--navy)", marginBottom: 6,
              }}>
                DPDP Act 2023 compliance
              </div>
              <p style={{ fontSize: 14, color: "var(--charcoal)", margin: 0 }}>
                Our Grievance Redressal mechanism is maintained in compliance with
                the Digital Personal Data Protection Act 2023 and the Consumer
                Protection Act 2019. Every grievance receives a reference number
                within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation Matrix */}
      <section style={{ background: "var(--white)", paddingTop: 0, paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ paddingTop: 56, marginBottom: 28 }}>
            <div className="eyebrow">ESCALATION MATRIX</div>
            <h2 className="h-display h2" style={{ marginBottom: 8 }}>
              Three-level escalation
            </h2>
            <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "14px 0 24px" }} />
            <p style={{ color: "var(--grey)", fontSize: 15, maxWidth: 640 }}>
              Please follow this order. Most grievances are resolved at Level 1
              within 48 hours. Escalate to Level 2 only if you have not received
              a satisfactory response at Level 1.
            </p>
          </div>

          {/* Matrix */}
          <div style={{
            display: "flex", flexDirection: "column",
            border: "1px solid var(--mist)",
            borderRadius: "var(--radius-lg)", overflow: "hidden",
            marginBottom: 8,
          }}>
            {ESC_LEVELS.map((lvl, i) => (
              <div key={lvl.num} className="esc-level"
                style={{ borderBottom: i < 2 ? "1px solid var(--mist)" : "none" }}>
                {/* Badge column */}
                <div style={{
                  background: "var(--navy)",
                  padding: "20px 24px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: "var(--font-serif)", fontSize: 36,
                      color: "var(--yellow)", lineHeight: 1,
                    }}>{lvl.num}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "var(--pale-navy)", marginTop: 4,
                    }}>{lvl.label}</div>
                  </div>
                </div>
                {/* Content column */}
                <div style={{ background: "var(--white)", padding: "20px 24px" }}>
                  <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: 16, marginBottom: 8 }}>
                    {lvl.title}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--charcoal)", marginBottom: 8 }}>
                    Email:{" "}
                    <a href={`mailto:${lvl.contact}`}
                      style={{ color: "var(--navy)", fontWeight: 600 }}>
                      {lvl.contact}
                    </a>
                    {lvl.subject && (
                      <><br />Subject line: &ldquo;{lvl.subject}&rdquo;</>
                    )}
                    {lvl.designation && (
                      <><br />Designation: {lvl.designation}</>
                    )}
                  </p>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "var(--pale-navy)", color: "var(--navy)",
                    fontSize: 12, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 999,
                  }}>
                    <span style={{ fontSize: 14 }}>⏰</span> {lvl.sla}
                  </span>
                  <p style={{ fontSize: 13, color: "var(--grey)", marginTop: 10, marginBottom: 0 }}>
                    {lvl.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "var(--grey)", marginTop: 12 }}>
            If your grievance concerns a data privacy matter, please write to{" "}
            <a href="mailto:privacy@collegencourses.com"
              style={{ color: "var(--navy)", fontWeight: 600 }}>
              privacy@collegencourses.com
            </a>{" "}
            directly. Data grievances are handled separately under the DPDP Act
            2023 framework.
          </p>
        </div>
      </section>

      {/* Form + Your Rights */}
      <section style={{ background: "var(--ivory)", padding: "64px 0 80px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="grv-main-grid">

            {/* LEFT: Form */}
            <div>
              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow">SUBMIT A GRIEVANCE</div>
                <h2 className="h-display h2" style={{ marginBottom: 8 }}>
                  Tell us what happened
                </h2>
                <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "14px 0 0" }} />
              </div>
              <div style={{
                background: "var(--white)",
                border: "1px solid var(--mist)",
                borderTop: "4px solid var(--yellow)",
                borderRadius: "var(--radius-lg)",
                padding: 32,
                boxShadow: "0 1px 3px rgba(36,48,72,.06)",
              }}>
                <h2 style={{
                  fontFamily: "var(--font-serif)", color: "var(--navy)",
                  fontSize: 22, marginBottom: 6,
                }}>Grievance submission form</h2>
                <p style={{ color: "var(--grey)", fontSize: 14, marginBottom: 24 }}>
                  All fields marked with * are required. You will receive a
                  reference number by email within 24 hours.
                </p>
                <GrievanceForm />
              </div>
            </div>

            {/* RIGHT: Your Rights */}
            <div>
              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow">YOUR RIGHTS</div>
                <h2 className="h-display h2" style={{ marginBottom: 8 }}>
                  What you are entitled to
                </h2>
                <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "14px 0 0" }} />
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
              }} className="rights-grid">
                {RIGHTS.map((r) => (
                  <div key={r.title} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    background: "var(--white)", border: "1px solid var(--mist)",
                    borderRadius: "var(--radius-md)", padding: 16,
                  }}>
                    <div style={{
                      width: 32, height: 32, background: "var(--yellow)",
                      color: "var(--navy)", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 800, flexShrink: 0,
                    }}>✓</div>
                    <div>
                      <h4 style={{
                        fontSize: 14, fontWeight: 700,
                        color: "var(--navy)", marginBottom: 4,
                      }}>{r.title}</h4>
                      <p style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.4, margin: 0 }}>
                        {r.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Page-scoped styles */}
      <style>{`
        .esc-level {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .esc-level { grid-template-columns: 160px 1fr; }
        }

        .grv-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 1024px) {
          .grv-main-grid { grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: start; }
        }

        @media (max-width: 480px) {
          .rights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
