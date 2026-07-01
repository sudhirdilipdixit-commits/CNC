import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Online MBA Schools | Specializations Guide | CollegeNCourses",
  description:
    "Explore trending online MBA specializations and career paths. Find the right MBA program for your goals — Banking & Finance, Marketing, IT, AI, and more.",
  openGraph: {
    title: "Top Online MBA Schools | Specializations Guide | CollegeNCourses",
    description:
      "Explore trending online MBA specializations and career paths. Find the right MBA program for your goals — Banking & Finance, Marketing, IT, AI, and more.",
  },
};

const SPECIALIZATIONS = [
  {
    id: "banking-finance",
    num: "01",
    name: "MBA in Banking & Finance",
    idealCandidates:
      "Analytical problem-solvers passionate about financial markets and corporate strategy will thrive. Strong quantitative skills and an interest in wealth creation are essential.",
    coreTopics: [
      "Financial Markets & Institutions",
      "Investment Banking",
      "Corporate Finance",
      "Risk Management",
      "Financial Modeling",
      "International Finance",
    ],
    careerPaths: [
      "Financial Analyst",
      "Investment Banker",
      "Portfolio Manager",
      "Risk Manager",
      "Credit Analyst",
      "Financial Consultant",
      "Wealth Manager",
    ],
    industries: [
      "Banking",
      "Investment Banking",
      "Asset Management",
      "Insurance",
      "Financial Services",
      "Corporate Finance Departments",
      "Fintech",
    ],
    growthOpportunities:
      "The finance sector's rapid evolution with fintech innovations and global integration ensures high demand for skilled professionals in sustainable finance and digital banking.",
  },
  {
    id: "business-analytics",
    num: "02",
    name: "MBA in Business Analytics",
    idealCandidates:
      "Data enthusiasts and strong analytical thinkers will thrive. This program is ideal for individuals seeking to leverage data for business growth.",
    coreTopics: [
      "Data Mining & Warehousing",
      "Predictive Modeling & Machine Learning",
      "Statistical Analysis",
      "Data Visualization",
      "Business Intelligence",
      "Big Data Technologies",
    ],
    careerPaths: [
      "Business Analysts",
      "Data Scientists",
      "Analytics Consultants",
      "Market Research Analyst",
      "Business Intelligence Manager",
      "Operations Research Analyst",
    ],
    industries: [
      "E-commerce",
      "Finance",
      "IT",
      "Healthcare",
      "Retail",
      "Consulting",
      "Telecommunications",
      "Manufacturing",
    ],
    growthOpportunities:
      "As data becomes crucial, demand for professionals who can extract meaningful insights is skyrocketing. Business Analytics is a top in-demand skill.",
  },
  {
    id: "marketing",
    num: "03",
    name: "MBA in Marketing",
    idealCandidates:
      "Creative thinkers and excellent communicators passionate about consumer psychology and market trends will excel, particularly those enjoying strategy and audience engagement.",
    coreTopics: [
      "Brand Management",
      "Digital Marketing",
      "Consumer Behavior",
      "Market Research & Analytics",
      "Product Management",
      "Marketing Strategy",
      "Integrated Marketing Communications",
    ],
    careerPaths: [
      "Marketing Manager",
      "Brand Manager",
      "Digital Marketing Specialist",
      "Market Research Analyst",
      "Product Manager",
      "Advertising Account Manager",
    ],
    industries: [
      "Advertising & Media",
      "FMCG",
      "E-commerce",
      "Retail",
      "IT",
      "Healthcare",
      "Automotive",
      "Consulting",
      "Startups",
    ],
    growthOpportunities:
      "With the continuous evolution of digital platforms, marketing remains a dynamic and high-growth field, emphasising digital marketing and brand storytelling specialisations.",
  },
  {
    id: "information-technology",
    num: "04",
    name: "MBA in Information Technology (IT)",
    idealCandidates:
      "Individuals with a strong interest or background in technology, including aspiring IT leaders who can translate technical solutions into business value.",
    coreTopics: [
      "IT Project Management",
      "Cybersecurity Management",
      "Database Management Systems",
      "Cloud Computing Strategy",
      "Digital Transformation",
      "IT Governance",
      "Enterprise Resource Planning (ERP)",
    ],
    careerPaths: [
      "IT Project Manager",
      "IT Consultant",
      "IT Director / Manager",
      "Chief Information Officer (CIO)",
      "Systems Analyst",
      "Cybersecurity Manager",
    ],
    industries: [
      "IT & Software Services",
      "Fintech",
      "Healthcare",
      "Telecommunications",
      "Manufacturing",
      "Consulting",
      "Government",
      "E-commerce",
    ],
    growthOpportunities:
      "Professionals who can bridge the gap between business strategy and technological execution are invaluable in this rapidly changing landscape.",
  },
  {
    id: "ai-machine-learning",
    num: "05",
    name: "MBA in AI & Machine Learning",
    idealCandidates:
      "Technologically curious individuals with strong analytical skills interested in data science, automation, and advanced algorithms, particularly those leading AI integration.",
    coreTopics: [
      "Machine Learning Algorithms",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "AI Ethics",
      "Data Science for Business",
      "AI Project Management",
    ],
    careerPaths: [
      "AI Strategist",
      "Machine Learning Consultant",
      "AI Product Manager",
      "Data Science Manager",
      "Automation Consultant",
      "AI Business Analyst",
    ],
    industries: [
      "Technology",
      "Finance",
      "Healthcare",
      "Automotive",
      "E-commerce",
      "Consulting",
      "Manufacturing",
      "Research & Development",
    ],
    growthOpportunities:
      "With the explosive growth of AI and Machine Learning, demand for business leaders who understand and can implement these technologies is immense.",
  },
  {
    id: "healthcare-management",
    num: "06",
    name: "MBA in Healthcare Management",
    idealCandidates:
      "Natural leaders passionate about improving healthcare systems will excel, particularly strong communicators who understand business principles and public health challenges.",
    coreTopics: [
      "Healthcare Policy & Regulation",
      "Operations Management",
      "Marketing & Strategy",
      "Health Economics",
      "Healthcare Informatics",
      "Public Health Management",
    ],
    careerPaths: [
      "Hospital Administrator",
      "Healthcare Consultant",
      "Pharmaceutical Project Manager",
      "Health Informatics Manager",
      "Clinic Manager",
      "Healthcare Marketing Manager",
    ],
    industries: [
      "Hospitals",
      "Pharmaceutical Companies",
      "Biotechnology Firms",
      "Health Insurance",
      "Consulting Firms",
      "Medical Device Companies",
    ],
    growthOpportunities:
      "The global healthcare sector is experiencing exponential growth, creating demand for managers who can navigate complex environments and drive innovation.",
  },
];

export default function SpecializationsGuidePage() {
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
            <Link href="/specializations-guide" style={{ color: "var(--grey)" }}>Specialization Guide</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Top Online MBA Schools</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "64px 0 56px" }}>
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <div className="eyebrow" style={{ color: "var(--yellow)" }}>SPECIALIZATION GUIDE</div>
            <h1 className="h-display h1" style={{ color: "var(--white)", margin: "12px 0 20px" }}>
              Master Your Future: Explore Trending Online MBA Specializations &amp; Career Paths
            </h1>
            <p className="lede" style={{ color: "var(--pale-navy)", marginBottom: 0 }}>
              Choosing the right MBA specialisation is crucial for shaping your career path, and our
              guide helps you explore various fields and their exciting opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Quick-jump pills */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)", padding: "14px 0" }}>
        <div className="container">
          <div className="spec-jump">
            {SPECIALIZATIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="spec-jump-pill">
                {s.name.replace("MBA in ", "")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Specialization sections */}
      {SPECIALIZATIONS.map((spec, i) => (
        <section
          key={spec.id}
          id={spec.id}
          style={{
            background: i % 2 === 0 ? "var(--white)" : "var(--ivory)",
            padding: "56px 0",
          }}
        >
          <div className="container">

            {/* Header bar */}
            <div className="spec-header">
              <div className="spec-num">{spec.num}</div>
              <h2 className="h-display h2" style={{ color: "var(--white)", margin: 0 }}>
                {spec.name}
              </h2>
            </div>

            {/* Content grid */}
            <div className="spec-grid">

              {/* Left: narrative cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="spec-card">
                  <span className="spec-card-label">Ideal Candidates</span>
                  <p style={{ color: "var(--charcoal)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    {spec.idealCandidates}
                  </p>
                </div>
                <div className="spec-card">
                  <span className="spec-card-label">Growth Opportunities</span>
                  <p style={{ color: "var(--charcoal)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    {spec.growthOpportunities}
                  </p>
                </div>
              </div>

              {/* Right: chip cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="spec-card">
                  <span className="spec-card-label">Core Topics Covered</span>
                  <div className="chip-group">
                    {spec.coreTopics.map((t) => (
                      <span key={t} className="chip chip-navy">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-card-label">Career Paths</span>
                  <div className="chip-group">
                    {spec.careerPaths.map((c) => (
                      <span key={c} className="chip chip-yellow">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-card-label">Industries</span>
                  <div className="chip-group">
                    {spec.industries.map((ind) => (
                      <span key={ind} className="chip chip-pale">{ind}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* CTA Banner */}
      <section style={{ background: "var(--navy)", padding: "72px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 640 }}>
          <div className="eyebrow" style={{ color: "var(--yellow)" }}>READY TO BEGIN?</div>
          <h2 className="h-display h2" style={{ color: "var(--white)", margin: "12px 0 16px" }}>
            Find the right MBA programme for your goals
          </h2>
          <p style={{ color: "var(--pale-navy)", fontSize: 16, marginBottom: 28 }}>
            Speak with our counsellors to match your profile and ambitions with the right
            specialisation and institution.
          </p>
          <Link href="/contact-us" className="btn btn-primary">
            Talk to a Counsellor
          </Link>
        </div>
      </section>

      {/* Page-scoped styles */}
      <style>{`
        /* Quick-jump strip */
        .spec-jump {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .spec-jump-pill {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--pale-navy);
          font-size: 13px;
          font-weight: 500;
          color: var(--navy);
          text-decoration: none;
          background: var(--white);
          white-space: nowrap;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .spec-jump-pill:hover {
          background: var(--navy);
          color: var(--yellow);
          border-color: var(--navy);
        }

        /* Section header */
        .spec-header {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--navy);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          padding: 20px 28px;
        }
        .spec-num {
          font-family: var(--font-serif);
          font-size: 34px;
          font-weight: 700;
          color: var(--yellow);
          line-height: 1;
          flex-shrink: 0;
          opacity: 0.85;
        }

        /* Content grid: 1-col mobile → 2-col desktop */
        .spec-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          background: var(--ivory);
          border: 1px solid var(--pale-navy);
          border-top: none;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          padding: 20px;
        }
        @media (min-width: 800px) {
          .spec-grid { grid-template-columns: 1fr 1.45fr; }
        }

        /* Card */
        .spec-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: var(--radius-md);
          padding: 20px 22px;
        }
        .spec-card-label {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--navy);
          border-bottom: 2px solid var(--yellow);
          padding-bottom: 5px;
          margin-bottom: 12px;
        }

        /* Chips */
        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .chip {
          display: inline-block;
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }
        .chip-navy  { background: var(--navy);      color: var(--white);  }
        .chip-yellow{ background: var(--yellow);    color: var(--navy); font-weight: 600; }
        .chip-pale  { background: var(--pale-navy); color: var(--navy);   }
      `}</style>
    </main>
  );
}
