"use client";

import { useState } from "react";
import Link from "next/link";
import LeadModal from "@/components/forms/LeadModal";

/* ── Data ─────────────────────────────────────────────────── */

const SPECS = [
  {
    slug: "marketing",
    icon: "📢",
    name: "Marketing & Digital Marketing",
    desc: "India's fastest-growing MBA stream by enrolment in 2026. Covers brand, B2B, performance marketing, and AI-assisted campaigns.",
    salary: "₹9 L avg",
    badge: "Fastest Growing",
  },
  {
    slug: "finance",
    icon: "📈",
    name: "Finance",
    desc: "Corporate finance, equity research, financial modelling, and CFO-track roles. The largest single-discipline category by hiring.",
    salary: "₹14 L avg",
    badge: "",
  },
  {
    slug: "banking-financial-services",
    icon: "🏦",
    name: "Banking & Financial Services",
    desc: "Retail banking, wealth management, fintech, and BFSI roles. Distinct from corporate finance. Fastest-growing employer segment in 2026.",
    salary: "₹11 L avg",
    badge: "",
  },
  {
    slug: "human-resources",
    icon: "👥",
    name: "Human Resources",
    desc: "People strategy, OKRs, talent acquisition, and CHRO-track roles. Consistently strong placements. Often undervalued by aspirants.",
    salary: "₹10 L avg",
    badge: "",
  },
  {
    slug: "operations-supply-chain",
    icon: "🚛",
    name: "Operations & Supply Chain",
    desc: "Logistics, manufacturing, supply-chain analytics, and procurement. Especially relevant for engineers moving to managerial tracks.",
    salary: "₹10 L avg",
    badge: "",
  },
  {
    slug: "it-project-management",
    icon: "💻",
    name: "IT & Project Management",
    desc: "The bridge specialization for IT professionals moving to delivery, programme, and product management. Highest density of working professionals.",
    salary: "₹14 L avg",
    badge: "",
  },
  {
    slug: "healthcare-management",
    icon: "🏥",
    name: "Healthcare Management",
    desc: "Hospital administration, pharma operations, and healthcare consulting. Fastest-growing niche specialization in 2026.",
    salary: "₹12 L avg",
    badge: "Rising Fast",
  },
  {
    slug: "executive-mba",
    icon: "⭐",
    name: "Executive MBA at IIM-tier",
    desc: "One-year senior executive programmes from IIMs and equivalents. For 8+ years experienced professionals looking for board-track credentials.",
    salary: "₹35 L+ avg",
    badge: "Senior Leaders",
  },
];

const FRAMEWORK = [
  {
    n: 1,
    q: "What do I do today, and what do I want to do in three years?",
    a: "The specialization should bridge the two, not jump too far. A Finance executive doing a Finance MBA leverages domain depth. An engineer moving to Marketing starts from scratch — workable, but the curve is steeper.",
  },
  {
    n: 2,
    q: "Am I in a field with strong demand growth, or saturation?",
    a: "Marketing, IT, Finance: high demand. Healthcare: rapidly growing. Pure HR: stable but competitive. Operations: strong in manufacturing and e-commerce, softer in services.",
  },
  {
    n: 3,
    q: "Do I have domain experience to bring?",
    a: "Experience plus credential is more powerful than credential alone. If you are switching fields, the MBA provides the bridge — but you start the job search without the domain advantage that peers already have.",
  },
  {
    n: 4,
    q: "What is my employer's track record with this specialization?",
    a: "Some employers map promotions tightly to specialization. Talk to your HR or manager before deciding. The credential should align with how promotions actually happen where you work.",
  },
  {
    n: 5,
    q: "Am I optimizing for salary, role-fit, or industry switch?",
    a: "All three lead to different programme choices. Salary optimization often points to Finance or IT. Role-fit typically points to the specialization closest to your current work. Industry switch requires the most research on employer acceptance.",
  },
];

const FAQS = [
  {
    q: "Which MBA specialization has the highest salary in India?",
    a: "Finance and IT & Project Management typically yield the highest post-MBA salaries, averaging ₹14 lakh per annum. Executive MBA programmes from IIM-tier institutions command ₹35 lakh+ for senior professionals. The actual salary depends heavily on the university, city of placement, and prior work experience.",
  },
  {
    q: "Which MBA specialization is best for a working professional?",
    a: "IT & Project Management has the highest density of working professionals, particularly from tech backgrounds. HR and Operations are also popular for mid-career professionals. The best choice depends on your current domain — staying within your field usually provides the strongest career leverage.",
  },
  {
    q: "Is it possible to switch to a completely different field with an MBA?",
    a: "Yes, but the curve is steeper when switching both industry and function simultaneously. The MBA provides the credential bridge, but without domain experience, you start the job search at a disadvantage to peers who already have that context. The most successful switches combine the MBA with internships or project work in the target industry during the programme.",
  },
  {
    q: "Which specialization is right if I am not sure what I want?",
    a: "Marketing and General Management are the most forgiving specializations for the undecided — they offer broad skill sets applicable across industries. However, if you have a domain background, using it is almost always more powerful than abandoning it. Our counsellors help you map your existing strengths to the right specialization in a free 30-minute call.",
  },
  {
    q: "Is Healthcare Management a good MBA specialization?",
    a: "Healthcare Management is the fastest-growing niche MBA specialization in 2026, driven by expansion of hospital chains, health-tech, and pharma operations. Average post-MBA salaries are around ₹12 lakh. It is especially strong for professionals already working in pharma, hospitals, or diagnostics who want to move into managerial roles.",
  },
];

/* ── Component ────────────────────────────────────────────── */

export default function SpecializationsHubClient() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <style>{`
        /* ── Hub Hero ── */
        .hub-hero { padding: 56px 0; background: var(--ivory); }
        .hub-hero-inner { max-width: 720px; }
        .hub-hero-inner h1 { margin: 12px 0 20px; }
        .hub-hero-inner .lede { margin-bottom: 28px; }

        .not-sure-box {
          background: var(--white);
          border: 1px solid var(--mist);
          border-left: 4px solid var(--yellow);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 18px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }
        .not-sure-box p { font-size: 14px; color: var(--charcoal); flex: 1; min-width: 200px; margin: 0; }

        /* ── Spec Grid ── */
        .spec-section { background: var(--white); }
        .spec-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .spec-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .spec-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .spec-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          text-decoration: none;
          color: inherit;
          position: relative;
          cursor: pointer;
        }
        .spec-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--yellow);
        }
        .spec-icon {
          width: 48px; height: 48px;
          background: var(--pale-navy);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
          transition: background 0.18s;
          flex-shrink: 0;
        }
        .spec-card:hover .spec-icon { background: var(--yellow); }
        .spec-card h3 {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: 18px;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .spec-card-desc { font-size: 13px; color: var(--grey); line-height: 1.55; flex: 1; margin-bottom: 16px; }
        .spec-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--mist);
        }
        .spec-salary { font-size: 12px; font-weight: 600; color: var(--navy); }
        .spec-salary span { color: var(--grey); font-weight: 400; }
        .spec-explore {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 13px; font-weight: 600; color: var(--navy);
        }
        .spec-explore svg { transition: transform 0.15s; }
        .spec-card:hover .spec-explore svg { transform: translateX(3px); }
        .spec-badge {
          position: absolute; top: 12px; right: 12px;
          background: var(--navy); color: var(--yellow);
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 8px;
          border-radius: 3px;
        }

        /* ── Freshness Card ── */
        .freshness-section { background: var(--ivory); }
        .freshness-card {
          background: var(--navy);
          border-radius: var(--radius-lg);
          padding: 36px;
          color: var(--ivory);
        }
        .freshness-card h3 {
          font-family: var(--font-serif);
          color: var(--yellow);
          font-size: clamp(20px, 2.5vw, 26px);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .freshness-card > p { color: var(--pale-navy); font-size: 15px; line-height: 1.65; margin-bottom: 20px; }
        .freshness-tracks { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .freshness-tracks li {
          display: flex; gap: 14px; align-items: flex-start;
          font-size: 15px; color: var(--pale-navy); line-height: 1.6;
        }
        .track-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--yellow); margin-top: 7px; flex: 0 0 8px;
        }
        .freshness-tracks strong { color: var(--ivory); }

        /* ── Decision Framework ── */
        .framework-section { background: var(--white); }
        .framework-list { display: flex; flex-direction: column; gap: 24px; }
        .framework-item { display: flex; gap: 16px; align-items: flex-start; }
        .fw-num {
          flex: 0 0 40px; width: 40px; height: 40px;
          background: var(--yellow); color: var(--navy);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif); font-size: 20px; font-weight: 700;
        }
        .fw-body h4 { color: var(--navy); margin-bottom: 6px; font-size: 16px; font-weight: 700; line-height: 1.35; }
        .fw-body p { font-size: 14px; color: var(--charcoal); line-height: 1.65; margin: 0; }

        /* ── CTA Band buttons ── */
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* ── FAQ overrides for native <details> ── */
        details.faq-item summary { list-style: none; }
        details.faq-item summary::-webkit-details-marker { display: none; }
        details.faq-item[open] { border-color: var(--pale-navy); }
        details.faq-item[open] .faq-icon { transform: rotate(45deg); }

        /* ── Breadcrumb ── */
        .spec-breadcrumb {
          font-size: 12px; color: var(--grey);
          padding: 12px 0 0;
          display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
        }
        .spec-breadcrumb a { color: var(--grey); }
        .spec-breadcrumb a:hover { color: var(--navy); }
        .spec-breadcrumb .sep { color: var(--pale-navy); }
        .spec-breadcrumb .cur { color: var(--navy); font-weight: 500; }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="hub-hero">
        <div className="container">
          <nav className="spec-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="cur">Specializations Guide</span>
          </nav>

          <div className="hub-hero-inner">
            <div className="eyebrow" style={{ marginTop: 16 }}>GUIDE 2026</div>
            <h1 className="h-display h1">Which MBA specialization is right for you?</h1>
            <p className="lede">
              The honest, jargon-free guide to 8 MBA specializations Indian aspirants are choosing
              in 2026. Career outcomes, salary benchmarks, top programmes, and the questions to ask
              yourself before deciding.
            </p>

            <div className="not-sure-box">
              <p>
                <strong>Not sure where to start?</strong> Our counsellors match you to the right
                specialization based on your background, experience, and goals — in a free
                30-minute call.
              </p>
              <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>
                Get Free Guidance
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specializations Grid ───────────────────────────────── */}
      <section className="spec-section">
        <div className="container">
          <div className="section-head left" style={{ marginBottom: 32 }}>
            <div className="eyebrow">EXPLORE ALL 8</div>
            <h2 className="h-display h2">Browse specializations</h2>
          </div>

          <div className="spec-grid">
            {SPECS.map((spec) => (
              <Link
                key={spec.slug}
                href={`/specializations-guide/${spec.slug}`}
                className="spec-card"
              >
                {spec.badge && <span className="spec-badge">{spec.badge}</span>}
                <div className="spec-icon" aria-hidden="true">{spec.icon}</div>
                <h3>{spec.name}</h3>
                <p className="spec-card-desc">{spec.desc}</p>
                <div className="spec-card-footer">
                  <div className="spec-salary">
                    {spec.salary} <span>/ post-MBA</span>
                  </div>
                  <span className="spec-explore">
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's New in 2026 ─────────────────────────────────── */}
      <section className="freshness-section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="freshness-card">
            <div className="eyebrow on-dark">WHAT&apos;S NEW IN 2026</div>
            <h3>Three tracks that didn&apos;t exist two years ago</h3>
            <p>
              The specialization landscape has shifted materially since 2024.
              Three developments stand out for Indian MBA aspirants this year:
            </p>
            <ul className="freshness-tracks">
              <li>
                <span className="track-dot" aria-hidden="true"></span>
                <span>
                  <strong>AI-integrated curriculum in Marketing and IT.</strong> Universities have embedded
                  AI and machine-learning modules directly into the core syllabus — not as electives.
                  Graduates are expected to understand prompt engineering, AI-driven analytics, and
                  automation tools as baseline skills, not advanced options.
                </span>
              </li>
              <li>
                <span className="track-dot" aria-hidden="true"></span>
                <span>
                  <strong>Healthcare Management as a mainstream specialization.</strong> What was once
                  a niche option at specialty institutions is now offered by 40+ UGC-approved universities.
                  Post-COVID hospital expansion, health-tech investment, and pharma sector growth are
                  driving consistent hiring demand.
                </span>
              </li>
              <li>
                <span className="track-dot" aria-hidden="true"></span>
                <span>
                  <strong>ESG and Sustainable Finance modules in Finance MBA.</strong> Regulatory pressure
                  from SEBI and RBI is making sustainability literacy non-negotiable for Finance graduates
                  targeting listed-company and BFSI roles. Most tier-1 Finance programmes have integrated
                  ESG modules into their 2025-26 syllabi.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Decision Framework ─────────────────────────────────── */}
      <section className="framework-section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-head left" style={{ marginBottom: 32 }}>
            <div className="eyebrow">MAKE THE RIGHT CALL</div>
            <h2 className="h-display h2">How to choose your specialization</h2>
          </div>

          <div className="framework-list">
            {FRAMEWORK.map((item) => (
              <div key={item.n} className="framework-item">
                <div className="fw-num" aria-hidden="true">{item.n}</div>
                <div className="fw-body">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ───────────────────────────────────────────── */}
      <div className="cta-band" id="contact">
        <div className="container">
          <h2>Still not sure which track is right for you?</h2>
          <p>
            Talk to a senior counsellor. We map your background, goals, and constraints to
            the right specialization and three matching programmes — free, in 30 minutes.
          </p>
          <div className="cta-btns">
            <button type="button" className="btn btn-inverted" onClick={openModal}>
              Get Free Counselling
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="tel:+917350460393" className="btn btn-secondary">
              Call +91 73504 60393
            </a>
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="section-faq">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">FREQUENTLY ASKED</div>
            <h2 className="h-display h2">Specialization questions we hear most</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">
                  {faq.q}
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-hub" />
    </>
  );
}
