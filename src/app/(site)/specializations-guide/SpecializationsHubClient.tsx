"use client";

import { useState } from "react";
import Link from "next/link";
import LeadModal from "@/components/forms/LeadModal";

/* ── CMS types ─────────────────────────────────────────────── */

interface SpecCard {
  icon?: string;
  name: string;
  description?: string;
  salary?: string;
  pageSlug?: string;
}

interface FrameworkItem {
  question: string;
  answer?: string;
}

interface CMSData {
  hero?: {
    eyebrow?: string;
    heading?: string;
    lede?: string;
    notSureText?: string;
    notSureCTA?: string;
  };
  specGrid?: {
    eyebrow?: string;
    heading?: string;
    cards?: SpecCard[];
  };
  freshness?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
  };
  framework?: {
    eyebrow?: string;
    heading?: string;
    items?: FrameworkItem[];
  };
  ctaBand?: {
    heading?: string;
    body?: string;
    primaryCTA?: string;
    secondaryCTA?: string;
  };
}

interface Props {
  data?: CMSData | Record<string, unknown> | null;
}

/* ── Default data (exact reference template content) ────────── */

const DEFAULT_SPECS: SpecCard[] = [
  {
    icon: "📢",
    name: "Marketing & Digital Marketing",
    description:
      "India's fastest-growing MBA stream by enrolment in 2026. Covers brand, B2B, performance marketing, and AI-assisted campaigns.",
    salary: "₹9 L avg",
    pageSlug: "marketing",
  },
  {
    icon: "📈",
    name: "Finance",
    description:
      "Corporate finance, equity research, financial modelling, and CFO-track roles. The largest single-discipline category by hiring.",
    salary: "₹14 L avg",
    pageSlug: "finance",
  },
  {
    icon: "🏦",
    name: "Banking & Financial Services",
    description:
      "Retail banking, wealth management, fintech, and BFSI roles. Distinct from corporate finance. Fastest-growing employer segment in 2026.",
    salary: "₹11 L avg",
    pageSlug: "banking-financial-services",
  },
  {
    icon: "👥",
    name: "Human Resources",
    description:
      "People strategy, OKRs, talent acquisition, and CHRO-track roles. Consistently strong placements. Often undervalued by aspirants.",
    salary: "₹10 L avg",
    pageSlug: "human-resources",
  },
  {
    icon: "🚛",
    name: "Operations & Supply Chain",
    description:
      "Logistics, manufacturing, supply-chain analytics, and procurement. Especially relevant for engineers moving to managerial tracks.",
    salary: "₹10 L avg",
    pageSlug: "operations-supply-chain",
  },
  {
    icon: "💻",
    name: "IT & Project Management",
    description:
      "The bridge specialization for IT professionals moving to delivery, programme, and product management. Highest density of working professionals.",
    salary: "₹14 L avg",
    pageSlug: "it-project-management",
  },
  {
    icon: "🏥",
    name: "Healthcare Management",
    description:
      "Hospital administration, pharma operations, and healthcare consulting. Fastest-growing niche specialization in 2026.",
    salary: "₹12 L avg",
    pageSlug: "healthcare-management",
  },
  {
    icon: "⭐",
    name: "Executive MBA at IIM-tier",
    description:
      "One-year senior executive programmes from IIMs and equivalents. For 8+ years experienced professionals looking for board-track credentials.",
    salary: "₹35 L+ avg",
    pageSlug: "executive-mba",
  },
];

const DEFAULT_FRAMEWORK: FrameworkItem[] = [
  {
    question: "What do I do today, and what do I want to do in three years?",
    answer:
      "The specialization should bridge the two, not jump too far. A Finance executive doing a Finance MBA leverages domain depth. An engineer moving to Marketing starts from scratch — workable, but the curve is steeper.",
  },
  {
    question: "Am I in a field with strong demand growth, or saturation?",
    answer:
      "Marketing, IT, Finance: high demand. Healthcare: rapidly growing. Pure HR: stable but competitive. Operations: strong in manufacturing and e-commerce, softer in services.",
  },
  {
    question: "Do I have domain experience to bring?",
    answer:
      "Experience plus credential is more powerful than credential alone. If you are switching fields, the MBA provides the bridge — but you start the job search without the domain advantage that peers already have.",
  },
  {
    question: "What is my employer's track record with this specialization?",
    answer:
      "Some employers map promotions tightly to specialization. Talk to your HR or manager before deciding. The credential should align with how promotions actually happen where you work.",
  },
  {
    question: "Am I optimizing for salary, role-fit, or industry switch?",
    answer:
      "All three lead to different programme choices. Salary optimization often points to Finance or IT. Role-fit typically points to the specialization closest to your current work. Industry switch requires the most research on employer acceptance.",
  },
];

/* ── Component ─────────────────────────────────────────────── */

export default function SpecializationsHubClient({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const cms = data as CMSData | null | undefined;

  const hero = cms?.hero;
  const specGrid = cms?.specGrid;
  const freshness = cms?.freshness;
  const framework = cms?.framework;
  const ctaBand = cms?.ctaBand;

  const specs: SpecCard[] =
    specGrid?.cards && specGrid.cards.length > 0 ? specGrid.cards : DEFAULT_SPECS;

  const frameworkItems: FrameworkItem[] =
    framework?.items && framework.items.length > 0 ? framework.items : DEFAULT_FRAMEWORK;

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
        .not-sure-box p {
          font-size: 14px; color: var(--charcoal);
          flex: 1; min-width: 200px; margin: 0;
        }

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
        .spec-card-desc {
          font-size: 13px; color: var(--grey);
          line-height: 1.55; flex: 1; margin-bottom: 16px;
        }
        .spec-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .spec-salary { font-size: 12px; font-weight: 600; color: var(--navy); }
        .spec-salary span { color: var(--grey); font-weight: 400; }
        .spec-explore {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 13px; font-weight: 600; color: var(--navy);
        }
        .spec-explore svg { transition: transform 0.15s; }
        .spec-card:hover .spec-explore svg { transform: translateX(3px); }

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
        .freshness-card > p {
          color: var(--pale-navy);
          font-size: 15px;
          line-height: 1.65;
          margin: 0;
        }

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
        .fw-body h4 {
          color: var(--navy); margin-bottom: 6px;
          font-size: 16px; font-weight: 700; line-height: 1.35;
        }
        .fw-body p {
          font-size: 14px; color: var(--charcoal);
          line-height: 1.65; margin: 0;
        }

        /* ── CTA Band buttons ── */
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hub-hero">
        <div className="container">
          <nav className="spec-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="cur">Specializations Guide</span>
          </nav>

          <div className="hub-hero-inner">
            <div className="eyebrow" style={{ marginTop: 16 }}>
              {hero?.eyebrow || "GUIDE 2026"}
            </div>
            <h1 className="h-display h1">
              {hero?.heading || "Which MBA specialization is right for you?"}
            </h1>
            <p className="lede">
              {hero?.lede ||
                "The honest, jargon-free guide to the eight MBA specializations Indian aspirants are choosing in 2026. Career outcomes, salary ranges, top programmes, and the questions to ask yourself before deciding."}
            </p>

            <div className="not-sure-box">
              <p>
                {hero?.notSureText ||
                  "Not sure where to start? Our AI Counsellor picks a specialization for you based on 6 quick questions about your background and goals."}
              </p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
                {hero?.notSureCTA || "Try the AI Counsellor"}
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
            <div className="eyebrow">{specGrid?.eyebrow || "THE EIGHT SPECIALIZATIONS"}</div>
            <h2 className="h-display h2">{specGrid?.heading || "Compare. Then explore."}</h2>
          </div>

          <div className="spec-grid">
            {specs.map((spec, i) => (
              <Link
                key={spec.pageSlug || spec.name || i}
                href={spec.pageSlug ? `/specializations-guide/${spec.pageSlug}` : "#"}
                className="spec-card"
              >
                <div className="spec-icon" aria-hidden="true">{spec.icon || "📚"}</div>
                <h3>{spec.name}</h3>
                <p className="spec-card-desc">{spec.description}</p>
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

      {/* ── What's New in 2026 ────────────────────────────────── */}
      <section className="freshness-section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="freshness-card">
            <div className="eyebrow on-dark">
              {freshness?.eyebrow || "WHAT’S NEW IN 2026"}
            </div>
            <h3>{freshness?.heading || "Three tracks that didn’t exist two years ago"}</h3>
            <p>
              {freshness?.body ||
                "AI for Managers is now a formal elective track within Marketing, Operations, and IT MBA programmes at Symbiosis, Amity, and IIM Indore. GenAI for Business launched as a standalone specialization at Amity in late 2025, with NMIMS following in 2026. Sustainability and ESG Management is still a niche, but corporate reporting mandates are driving rapid growth in both curriculum and employer demand. If you are choosing for 2026 to 2027 intake, ask every shortlisted university whether these are available as electives or full streams."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Decision Framework ────────────────────────────────── */}
      <section className="framework-section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-head left" style={{ marginBottom: 32 }}>
            <div className="eyebrow">{framework?.eyebrow || "DECISION FRAMEWORK"}</div>
            <h2 className="h-display h2">
              {framework?.heading || "Five questions to ask before choosing"}
            </h2>
          </div>

          <div className="framework-list">
            {frameworkItems.map((item, i) => (
              <div key={i} className="framework-item">
                <div className="fw-num" aria-hidden="true">{i + 1}</div>
                <div className="fw-body">
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────────── */}
      <div className="cta-band" id="contact">
        <div className="container">
          <h2>{ctaBand?.heading || "Still not sure?"}</h2>
          <p>
            {ctaBand?.body ||
              "Our AI Counsellor recommends a specialization and three matching programmes based on your profile in two minutes."}
          </p>
          <div className="cta-btns">
            <button type="button" className="btn btn-inverted" onClick={() => setModalOpen(true)}>
              {ctaBand?.primaryCTA || "Get Free Counselling"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="tel:+917350460393" className="btn btn-secondary">
              {ctaBand?.secondaryCTA || "Talk to a Counsellor"}
            </a>
          </div>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-hub" />
    </>
  );
}
