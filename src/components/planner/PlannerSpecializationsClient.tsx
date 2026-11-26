"use client";

import { useCallback, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-specializations.css";

const bricolage = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  variable: "--font-planner-display",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  variable: "--font-planner-body",
  subsets: ["latin"],
  display: "swap",
});

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const SPECS = [
  {
    icon: "\u{1F4E3}",
    name: "Marketing & Digital Marketing",
    description: "India's fastest-growing MBA stream by enrolment in 2026. Covers brand, B2B, performance marketing, and AI-assisted campaigns.",
    salary: "Rs 9 L avg",
    slug: "marketing",
  },
  {
    icon: "\u{1F4C8}",
    name: "Finance",
    description: "Corporate finance, equity research, financial modelling, and CFO-track roles. The largest single-discipline category by hiring.",
    salary: "Rs 14 L avg",
    slug: "finance",
  },
  {
    icon: "\u{1F3E6}",
    name: "Banking & Financial Services",
    description: "Retail banking, wealth management, fintech, and BFSI roles. Distinct from corporate finance. Fastest-growing employer segment in 2026.",
    salary: "Rs 11 L avg",
    slug: "banking-finance",
  },
  {
    icon: "\u{1F465}",
    name: "Human Resources",
    description: "People strategy, OKRs, talent acquisition, and CHRO-track roles. Consistently strong placements. Often undervalued by aspirants.",
    salary: "Rs 10 L avg",
    slug: "hr",
  },
  {
    icon: "\u{1F69B}",
    name: "Operations & Supply Chain",
    description: "Logistics, manufacturing, supply-chain analytics, and procurement. Especially relevant for engineers moving to managerial tracks.",
    salary: "Rs 10 L avg",
    slug: "supply-chain",
  },
  {
    icon: "\u{1F4BB}",
    name: "IT & Project Management",
    description: "The bridge specialization for IT professionals moving to delivery, programme, and product management. Highest density of working professionals.",
    salary: "Rs 14 L avg",
    slug: "it-systems",
  },
  {
    icon: "\u{1F3E5}",
    name: "Healthcare Management",
    description: "Hospital administration, pharma operations, and healthcare consulting. Fastest-growing niche specialization in 2026.",
    salary: "Rs 12 L avg",
    slug: null,
  },
  {
    icon: "\u{2B50}",
    name: "Executive MBA at IIM-tier",
    description: "One-year senior executive programmes from IIMs and equivalents. For 8+ years experienced professionals looking for board-track credentials.",
    salary: "Rs 35 L+ avg",
    slug: "top-online-mba-schools",
  },
];

const FRAMEWORK = [
  {
    q: "What do I do today, and what do I want to do in three years?",
    a: "The specialization should bridge the two, not jump too far. A Finance executive doing a Finance MBA leverages domain depth. An engineer moving to Marketing starts from scratch - workable, but the curve is steeper.",
  },
  {
    q: "Am I in a field with strong demand growth, or saturation?",
    a: "Marketing, IT, Finance: high demand. Healthcare: rapidly growing. Pure HR: stable but competitive. Operations: strong in manufacturing and e-commerce, softer in services.",
  },
  {
    q: "Do I have domain experience to bring?",
    a: "Experience plus credential is more powerful than credential alone. If you are switching fields, the MBA provides the bridge - but you start the job search without the domain advantage that peers already have.",
  },
  {
    q: "What is my employer's track record with this specialization?",
    a: "Some employers map promotions tightly to specialization. Talk to your HR or manager before deciding. The credential should align with how promotions actually happen where you work.",
  },
  {
    q: "Am I optimizing for salary, role-fit, or industry switch?",
    a: "All three lead to different programme choices. Salary optimization often points to Finance or IT. Role-fit typically points to the specialization closest to your current work. Industry switch requires the most research on employer acceptance.",
  },
];

export default function PlannerSpecializationsClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("spec-hub-preview");

  const openLeadForm = useCallback((source = "spec-hub-preview") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader primaryCTA="Get Free Guidance" onOpenLeadForm={openLeadForm} />

      {/* Breadcrumb */}
      <div className="p-breadcrumb">
        <div className="wrap">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <span className="cur">Specializations Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className="p-hero">
        <div className="wrap spec-hero-inner">
          <div className="p-eyebrow">GUIDE 2026</div>
          <h1>Which MBA specialization is right for you?</h1>
          <p className="p-lede">
            The honest, jargon-free guide to the eight MBA specializations Indian aspirants are choosing in 2026. Career outcomes, salary ranges, top programmes, and the questions to ask yourself before deciding.
          </p>

          <div className="not-sure-box">
            <p>Not sure where to start? Our AI Counsellor picks a specialization for you based on 6 quick questions about your background and goals.</p>
            <button type="button" className="btn btn-sun btn-sm" onClick={() => openLeadForm("spec-hero-not-sure")}>
              Try the AI Counsellor {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Specializations grid */}
      <section className="p-section p-section-alt">
        <div className="wrap">
          <div className="sec-head">
            <div className="p-eyebrow">THE EIGHT SPECIALIZATIONS</div>
            <h2 style={{ marginTop: 10 }}>Compare. Then explore.</h2>
          </div>

          <div className="c-grid">
            {SPECS.map((spec) => (
              <article className="c-card" key={spec.name}>
                <div className="c-ic" style={{ background: "var(--lilac)" }}>{spec.icon}</div>
                <h3>{spec.name}</h3>
                <p className="roles">{spec.description}</p>
                <div className="c-card-footer">
                  <div className="c-salary">{spec.salary} <span>/ post-MBA</span></div>
                  <a href={spec.slug ? `/specializations-guide/${spec.slug}` : "/specializations-guide"} className="go">
                    Explore {ARROW}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's new in 2026 */}
      <section className="p-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="freshness-card">
            <div className="p-eyebrow">WHAT&apos;S NEW IN 2026</div>
            <h3>Three tracks that didn&apos;t exist two years ago</h3>
            <p>
              AI for Managers is now a formal elective track within Marketing, Operations, and IT MBA programmes at Symbiosis, Amity, and IIM Indore. GenAI for Business launched as a standalone specialization at Amity in late 2025, with NMIMS following in 2026. Sustainability and ESG Management is still a niche, but corporate reporting mandates are driving rapid growth in both curriculum and employer demand. If you are choosing for 2026 to 2027 intake, ask every shortlisted university whether these are available as electives or full streams.
            </p>
          </div>
        </div>
      </section>

      {/* Decision framework */}
      <section className="p-section p-section-alt">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div className="p-eyebrow">DECISION FRAMEWORK</div>
          <h2 style={{ marginTop: 10 }}>Five questions to ask before choosing</h2>
          <hr className="p-rule" />
          <div className="p-questions">
            {FRAMEWORK.map((item, i) => (
              <div className="p-q-item" key={item.q}>
                <div className="p-q-num">{i + 1}</div>
                <div className="p-q-body">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta p-cta-band">
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Still not sure?</h2>
          <p>Our AI Counsellor recommends a specialization and three matching programmes based on your profile in two minutes.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("spec-cta-band")}>
              Get Free Guidance {ARROW}
            </button>
            <a href="tel:+917350460393" className="btn btn-white">Call Us</a>
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
