import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CollegeNCourses – India's Trusted Higher-Education Compass",
  description:
    "CollegeNCourses is an initiative by Dnyanal Educon Pvt Ltd, helping students, professionals, and working adults find the right Online MBA or Distance MBA programme through honest guidance and personalised career mapping.",
  alternates: { canonical: "https://collegencourses.com/about/" },
  openGraph: {
    url: "https://collegencourses.com/about/",
    title: "About Us | CollegeNCourses",
  },
};

const WHO_WE_HELP = [
  { icon: "🎓", label: "Students", desc: "Beginning their higher-education journey and exploring career paths." },
  { icon: "💼", label: "Working Professionals", desc: "Seeking an MBA upgrade without leaving their current job." },
  { icon: "🚀", label: "Entrepreneurs", desc: "Looking to formalise business knowledge and strengthen credentials." },
  { icon: "👩‍💻", label: "Women Returning to Work", desc: "Re-entering the workforce with a recognised, flexible degree." },
  { icon: "🏠", label: "Homemakers", desc: "Building new skills and career options on their own schedule." },
];

const OFFERINGS = [
  {
    number: "01",
    title: "Tailored Course Recommendations",
    desc: "Personalised distance MBA programme suggestions aligned with your career goals and current qualifications — not a one-size-fits-all list.",
  },
  {
    number: "02",
    title: "Reputable University Network",
    desc: "Access to 150+ UGC-DEB and AICTE approved institutions offering legitimate, employer-respected degrees.",
  },
  {
    number: "03",
    title: "Cutting-Edge Career Mapping",
    desc: "Technology-enabled career visualisation tools that help you see where each programme can take you before you apply.",
  },
  {
    number: "04",
    title: "Comprehensive Information Hub",
    desc: "A single platform to research, compare, and evaluate universities, institutes, programmes, fees, and batch timelines.",
  },
  {
    number: "05",
    title: "Expert Guidance",
    desc: "Insights from young professionals specialising in education counselling, career development, and digital solutions.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section
        style={{
          background: "var(--navy)",
          paddingTop: "calc(var(--header-h) + 56px)",
          paddingBottom: "64px",
        }}
      >
        <div className="container">
          <div className="eyebrow on-dark" style={{ marginBottom: 16 }}>
            WHO WE ARE
          </div>
          <h1
            className="h-display h1"
            style={{ color: "var(--ivory)", maxWidth: "700px" }}
          >
            Provide career guidance &amp; education
          </h1>
          <p
            className="lede"
            style={{
              color: "var(--pale-navy)",
              marginTop: 24,
              maxWidth: "620px",
            }}
          >
            Way to uplift knowledge &amp; skills to grow career — CollegeNCourses
            is an initiative by{" "}
            <strong style={{ color: "var(--yellow)" }}>
              Dnyanal Educon Pvt Ltd
            </strong>
            , India&apos;s trusted compass for higher-education decisions.
          </p>
        </div>
      </section>

      {/* ── Philosophy Quote ── */}
      <section style={{ background: "var(--ivory)", padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              borderLeft: "4px solid var(--yellow)",
              paddingLeft: 32,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            <p
              className="h-display h3"
              style={{ color: "var(--navy)", fontStyle: "italic", marginBottom: 20 }}
            >
              &ldquo;The only limit to your career growth is the limit you place
              on yourself.&rdquo;
            </p>
            <p style={{ color: "var(--grey)", fontSize: 15 }}>
              — Core philosophy at CollegeNCourses
            </p>
          </div>

          <div
            style={{
              marginTop: 56,
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            <div>
              <h2
                className="h-display h3"
                style={{ color: "var(--navy)", marginBottom: 16 }}
              >
                Empowering Leaders Through Quality MBA Distance Education
              </h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.7 }}>
                Continuous learning is not optional in modern professional
                environments — it is the baseline. CollegeNCourses exists to
                make the right educational choice accessible, transparent, and
                efficient for every Indian learner, regardless of age,
                background, or schedule.
              </p>
            </div>
            <div>
              <h2
                className="h-display h3"
                style={{ color: "var(--navy)", marginBottom: 16 }}
              >
                Personalised Career Mapping &amp; Guidance
              </h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.7 }}>
                We evaluate your objectives, existing competencies, and market
                dynamics to recommend the optimal educational pathway — not the
                one that earns us the highest commission. Our counsellors are
                MBA alumni and industry mentors, not sales agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Help ── */}
      <section style={{ background: "var(--mist)", padding: "80px 0" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">WHO WE HELP</div>
            <h2 className="h-display h2">We guide every kind of learner</h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              marginTop: 48,
            }}
          >
            {WHO_WE_HELP.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--pale-navy)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 24px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--navy)",
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </h3>
                <p style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ background: "var(--ivory)", padding: "80px 0" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">WHY CHOOSE US</div>
            <h2 className="h-display h2">
              Why choose us for your MBA Distance Learning journey?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              marginTop: 48,
            }}
          >
            {OFFERINGS.map((item) => (
              <div
                key={item.number}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--pale-navy)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 28px",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: "var(--yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--navy)",
                  }}
                >
                  {item.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 17,
                      color: "var(--navy)",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section
        style={{
          background: "var(--navy)",
          padding: "72px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            className="h-display h2"
            style={{ color: "var(--ivory)", marginBottom: 16 }}
          >
            Ready to find the right programme?
          </h2>
          <p
            className="lede"
            style={{
              color: "var(--pale-navy)",
              marginBottom: 36,
              margin: "0 auto 36px",
            }}
          >
            Talk to a real counsellor — MBA alumni and industry mentors — within
            30 minutes. No spam, no obligation.
          </p>
          <a href="/contact-us/" className="btn btn-primary btn-pill">
            Get Free Counselling
          </a>
        </div>
      </section>
    </>
  );
}
