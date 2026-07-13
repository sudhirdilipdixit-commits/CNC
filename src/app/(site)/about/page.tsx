import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CollegeNCourses – India's Trusted Higher-Education Compass",
  description:
    "CollegeNCourses is a counselling-led platform that helps Indian aspirants compare and choose Online MBA, Distance MBA, and Executive MBA programmes from 150+ verified universities.",
  alternates: { canonical: "https://collegencourses.com/about/" },
  openGraph: {
    url: "https://collegencourses.com/about/",
    title: "About Us | CollegeNCourses",
  },
};

const PROCESS_STEPS = [
  {
    num: "01",
    title: "You enquire",
    desc: "Through the website, our AI Counsellor, or by calling +91 7350 460 393. Callback within 30 minutes during working hours.",
  },
  {
    num: "02",
    title: "We listen first",
    desc: "Your situation, your goals, your constraints. We don't recommend programmes in the first call. We understand the person first.",
  },
  {
    num: "03",
    title: "We compare honestly",
    desc: "Three programme options with full fee disclosure, accreditation status, and a plain-language “why this fits you” explanation. If one isn’t from us, we’ll say so.",
  },
  {
    num: "04",
    title: "We help you apply",
    desc: "Paperwork, documentation, EMI options. After enrolment, we stay in touch through semester one to make sure the choice was right.",
  },
];

const PROMISES = [
  `“Limited seats” or “last batch” pressure tactics. There is always another batch.`,
  `“This is the best programme for everyone.” No programme is.`,
  "Aggressive multi-call follow-ups. One call, one WhatsApp, then we wait.",
  "Hidden charges or surprise fees beyond the original quote.",
  "A push toward partner programmes when a non-partner fits better.",
  "A recommendation without first understanding your situation.",
];

const TEAM = [
  {
    initials: "NP",
    name: "Nikhita P. Deshmukh",
    role: "Founder, 10 years experience",
    creds: ["Executive MBA", "Online MBA", "IIM-tier"],
  },
  {
    initials: "RS",
    name: "Rahul Sharma",
    role: "Senior Counsellor, 7 years",
    creds: ["Distance MBA", "Marketing", "Finance"],
  },
  {
    initials: "AP",
    name: "Anjali Patil",
    role: "Counsellor, 5 years",
    creds: ["Online MBA", "HR", "Healthcare"],
  },
];

const LEGAL = [
  {
    title: "Our entity",
    items: [
      "DNYANAL EDUCON PRIVATE LIMITED",
      "Incorporated 29 April 2023",
      "Registered office: Pune, Maharashtra",
      "GST registered, PAN registered",
      "MCA filings publicly available",
    ],
  },
  {
    title: "Programmes we list",
    items: [
      "UGC-DEB approved only (verified annually)",
      "AICTE approved where applicable",
      "NAAC accreditation noted on each page",
      "Last audit: April 2026",
      "Any removal reported to counsellors within 24 hours",
    ],
  },
  {
    title: "Your data",
    items: [
      "DPDP Act 2023 compliant",
      "Stored only in Agile CRM (India)",
      "Never sold or shared with third parties",
      "Deletion on request: privacy@collegencourses.com",
      "Cookie consent: granular opt-in",
    ],
  },
];

const PRESS = [
  "Economic Times Education",
  "Business Standard",
  "Hindustan Times",
  "Outlook Business",
  "The Hindu Education Plus",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Breadcrumb ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav
            style={{
              fontSize: 12,
              color: "var(--grey)",
              padding: "10px 0",
              display: "flex",
              gap: 6,
              flexWrap: "wrap" as const,
              alignItems: "center",
            }}
            aria-label="Breadcrumb"
          >
            <a href="/" style={{ color: "var(--grey)" }}>Home</a>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>About Us</span>
          </nav>
        </div>
      </div>

      {/* ── Hero: split layout ── */}
      <section style={{ padding: "56px 0 64px", background: "var(--ivory)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 40,
              maxWidth: 960,
            }}
            className="about-hero-inner"
          >
            {/* Left: content */}
            <div>
              <div className="eyebrow">ABOUT COLLEGENCOURSES</div>
              <h1
                className="h-display h1"
                style={{ margin: "12px 0 20px", color: "var(--navy)" }}
              >
                We treat every conversation as a relationship, not a transaction.
              </h1>
              <p className="lede">
                CollegeNCourses is a counselling-led platform that helps Indian
                aspirants compare and choose Online MBA, Distance MBA, and
                Executive MBA programmes from 150+ verified universities. Our
                promise is simple: you will leave any conversation with us more
                clear than you arrived.
              </p>

              {/* Stats */}
              <div
                className="about-stats-grid"
              style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 20,
                  marginTop: 36,
                }}
              >
                {[
                  { value: "12", suffix: "K+", label: "Learners counselled since 2023" },
                  { value: "150", suffix: "+", label: "Verified universities listed" },
                  { value: "4.8", suffix: "★", label: "Average counsellor rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(32px,4vw,48px)",
                        color: "var(--navy)",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                      <span style={{ color: "var(--yellow)" }}>{s.suffix}</span>
                    </div>
                    <div
                      style={{ fontSize: 13, color: "var(--grey)", marginTop: 4, lineHeight: 1.4 }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: founder card */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg,var(--navy),#1A2336)",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    background: "var(--yellow)",
                    color: "var(--navy)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-serif)",
                    fontSize: 36,
                    border: "4px solid #fff",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  NP
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--navy)",
                    fontSize: 22,
                    marginBottom: 4,
                  }}
                >
                  Nikhita Pradeep Deshmukh
                </div>
                <div style={{ fontSize: 13, color: "var(--grey)", marginBottom: 12 }}>
                  Founder and Director, CollegeNCourses
                </div>
                <p style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.6 }}>
                  Nikhita built CollegeNCourses in 2023 after a decade in
                  higher-education advisory work, where she watched too many
                  capable aspirants pay for programmes that didn&apos;t fit them,
                  often because no one had taken the time to ask the right
                  questions. Her commitment is that every counsellor on the
                  CollegeNCourses team operates by one rule: ask before you
                  recommend.
                </p>
                <a
                  href="https://www.linkedin.com/company/college-n-courses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginTop: 14,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why We Exist ── */}
      <section style={{ padding: "72px 0", background: "var(--white)" }}>
        <div className="container">
          <div className="eyebrow">WHY WE EXIST</div>
          <h2
            className="h-display h2"
            style={{ marginBottom: 24, color: "var(--navy)" }}
          >
            The problem we exist to solve
          </h2>
          <div
            style={{
              width: 48,
              height: 3,
              background: "var(--yellow)",
              marginBottom: 24,
            }}
          />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: "1.1em", color: "var(--charcoal)" }}>
              India produces millions of graduates every year, yet the choice of
              where and what to study remains one of the most confusing decisions
              a person makes. Glossy advertisements, conflicting rankings,
              expensive consultants, and well-meaning relatives all pull aspirants
              in different directions.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: "1.1em", color: "var(--charcoal)" }}>
              CollegeNCourses was built to cut through that noise. We are a portal
              where Online MBA, Distance MBA, and Design programmes from credible
              Indian universities are listed side by side, compared honestly, and
              explained in plain language. Behind every comparison sits a senior
              counsellor ready to translate brochures into real decisions.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--charcoal)" }}>
              We are not a rankings website. We are not an advertising aggregator.
              We are a counselling brand that uses technology to scale honest
              guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section style={{ padding: "72px 0", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow">THE PROCESS</div>
            <h2 className="h-display h2" style={{ color: "var(--navy)", marginBottom: 12 }}>
              How we work with every aspirant
            </h2>
            <div style={{ width: 48, height: 3, background: "var(--yellow)" }} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--mist)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px 24px",
                  position: "relative" as const,
                }}
              >
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      display: "none", // shown via CSS media query below
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 52,
                    color: "var(--yellow)",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Promise ── */}
      <section style={{ padding: "72px 0", background: "var(--white)" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div
            style={{
              background: "var(--navy)",
              borderRadius: 14,
              padding: 40,
              color: "var(--ivory)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--yellow)",
                fontSize: "clamp(20px,2.5vw,26px)",
                marginBottom: 24,
              }}
            >
              What you will never hear from us
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: 12,
              }}
            >
              {PROMISES.map((text) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    fontSize: 15,
                    color: "var(--pale-navy)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--yellow)",
                      marginTop: 8,
                      display: "inline-block",
                    }}
                  />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section style={{ padding: "72px 0", background: "var(--ivory)" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">OUR TEAM</div>
            <h2 className="h-display h2" style={{ color: "var(--navy)" }}>
              Meet our senior counsellors
            </h2>
            <div
              style={{
                width: 48,
                height: 3,
                background: "var(--yellow)",
                margin: "14px auto 0",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {TEAM.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--mist)",
                  borderRadius: "var(--radius-md)",
                  padding: 24,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--navy)",
                    color: "var(--yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-serif)",
                    fontSize: 20,
                    border: "2px solid var(--yellow)",
                    flexShrink: 0,
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                    {member.name}
                  </h4>
                  <div style={{ fontSize: 13, color: "var(--grey)", marginBottom: 8 }}>
                    {member.role}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                    {member.creds.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: 12,
                          color: "var(--charcoal)",
                          background: "var(--ivory)",
                          border: "1px solid var(--mist)",
                          padding: "3px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal & Accreditation ── */}
      <section style={{ padding: "72px 0", background: "var(--white)" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">LEGAL &amp; ACCREDITATION</div>
            <h2 className="h-display h2" style={{ color: "var(--navy)" }}>
              The fine print, in plain language
            </h2>
            <div
              style={{
                width: 48,
                height: 3,
                background: "var(--yellow)",
                margin: "14px auto 0",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {LEGAL.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--mist)",
                  borderTop: "4px solid var(--yellow)",
                  borderRadius: "var(--radius-md)",
                  padding: 24,
                }}
              >
                <h4
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginBottom: 14,
                  }}
                >
                  {card.title}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {card.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 14,
                        color: "var(--charcoal)",
                        display: "flex",
                        gap: 8,
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--yellow)",
                          marginTop: 7,
                          display: "inline-block",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press Strip ── */}
      <section style={{ padding: "40px 0", background: "var(--ivory)" }}>
        <div className="container">
          <p
            style={{
              fontSize: 13,
              color: "var(--grey)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            As featured in
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              alignItems: "center",
              justifyContent: "center",
              gap: "12px 32px",
            }}
          >
            {PRESS.map((name) => (
              <div
                key={name}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--mist)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--grey)",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <div
        style={{
          background: "var(--yellow)",
          padding: "56px 0",
          textAlign: "center",
          borderTop: "4px solid var(--navy)",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--navy)",
              fontSize: "clamp(24px,3.5vw,34px)",
              marginBottom: 12,
            }}
          >
            Have a question we haven&apos;t answered?
          </h2>
          <p
            style={{
              color: "var(--navy)",
              fontSize: 17,
              marginBottom: 24,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Talk to a senior counsellor. Free, in 30 minutes.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="/contact-us/" className="btn btn-inverted">
              Schedule My Free Call{" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/" className="btn btn-secondary" style={{ borderColor: "var(--navy)" }}>
              Try AI Counsellor
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-hero-inner {
            grid-template-columns: 1fr 1fr !important;
            gap: 64px !important;
            align-items: center !important;
          }
        }
        @media (max-width: 420px) {
          .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
