"use client";

import { useState } from "react";
import Link from "next/link";
import LeadModal from "@/components/forms/LeadModal";

/* ─── CMS types ────────────────────────────────────────────────────── */

interface HeroStat { icon?: string; value?: string; label?: string; }
interface SoftCta { text?: string; buttonLabel?: string; }
interface Skill { name: string; isNew?: boolean; }
interface InfoCard { title?: string; body?: string; }
interface CareerCard { icon?: string; role: string; industries?: string; salaryRange?: string; }
interface UniRow {
  rank?: number; name: string; programme?: string;
  accreditations?: string[]; fee?: string; detailsHref?: string;
}
interface FaqItem { _id?: string; question: string; answer?: string; }

interface CMSData {
  title?: string;
  hero?: {
    eyebrow?: string;
    heading?: string;
    lede?: string;
    heroStats?: HeroStat[];
    softCta?: SoftCta;
  };
  overview?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    skills?: Skill[];
    infoCard?: InfoCard;
  };
  careerOutcomes?: {
    eyebrow?: string;
    heading?: string;
    sourceNote?: string;
    careers?: CareerCard[];
  };
  editorialCta?: { text?: string; linkLabel?: string; linkHref?: string; };
  universities?: {
    eyebrow?: string;
    heading?: string;
    seeAllLabel?: string;
    seeAllHref?: string;
    items?: UniRow[];
  };
  faqs?: FaqItem[];
  faqsHeading?: string;
  ctaBand?: {
    heading?: string;
    body?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
}

interface Props {
  data: CMSData | Record<string, unknown>;
}

/* ─── Default data (Marketing & Digital Marketing) ─────────────────── */

const DEFAULT: CMSData = {
  hero: {
    eyebrow: "MBA SPECIALIZATION GUIDE",
    heading: "Marketing & Digital Marketing MBA",
    lede:
      "India's fastest-growing MBA specialization by 2026 enrolment — and not just because it sounds exciting. Marketing MBAs now train you for the data-driven, performance-first, AI-augmented reality of modern brand-building. Here is everything you need to decide whether this is the right track for you.",
    heroStats: [
      { icon: "📈", value: "₹9 L", label: "avg post-MBA salary" },
      { icon: "🏆", value: "#1", label: "enrolment share 2026" },
      { icon: "⏱️", value: "12–24 mo", label: "typical programme" },
      { icon: "🏫", value: "40+", label: "accredited programmes" },
    ],
    softCta: {
      text: "Not sure if marketing is your fit? Our AI Counsellor compares all 8 specializations against your profile in 2 minutes.",
      buttonLabel: "Try the AI Counsellor",
    },
  },
  overview: {
    eyebrow: "THE SPECIALIZATION",
    heading: "What does a Marketing MBA actually cover?",
    body: `The marketing MBA has changed more in the last three years than in the preceding decade. Core modules still cover brand strategy, consumer behaviour, and pricing — but the new curriculum weight is in digital channels, performance analytics, and AI-assisted campaign management.\n\nMost UGC-DEB approved programmes now include dedicated units on SEO and SEM, social media strategy, marketing analytics, and prompt engineering for marketing content. Amity and Symbiosis both introduced AI for Marketers electives in 2025.\n\nWhat this means for you: the graduate who leaves with both brand-strategy instinct and hands-on performance-marketing skill has a clear advantage in the 2026 hiring market.`,
    skills: [
      { name: "Brand Strategy" },
      { name: "Consumer Behaviour" },
      { name: "Performance Marketing", isNew: true },
      { name: "Marketing Analytics", isNew: true },
      { name: "SEO / SEM" },
      { name: "Social Media Strategy" },
      { name: "Product Marketing", isNew: true },
      { name: "B2B Sales & Strategy" },
      { name: "Pricing & Revenue Management" },
      { name: "AI for Campaigns", isNew: true },
      { name: "Content Strategy" },
      { name: "CRM & Marketing Automation", isNew: true },
    ],
    infoCard: {
      title: "New in 2026",
      body: "Amity, Symbiosis, and NMIMS have introduced AI for Marketers as a formal elective. Ask admissions teams explicitly whether this track is available before enrolling.",
    },
  },
  careerOutcomes: {
    eyebrow: "CAREER OUTCOMES",
    heading: "Where do Marketing MBA graduates land?",
    sourceNote: "Salary data based on median placement reports from UGC-DEB approved institutions, 2024–25.",
    careers: [
      { icon: "📢", role: "Brand Manager", industries: "FMCG, D2C, Retail", salaryRange: "₹8–14 L" },
      { icon: "📊", role: "Digital Marketing Manager", industries: "E-commerce, SaaS, Agencies", salaryRange: "₹9–18 L" },
      { icon: "🔁", role: "Performance Marketing Lead", industries: "D2C, Fintech, EdTech", salaryRange: "₹10–20 L" },
      { icon: "🎯", role: "Product Marketing Manager", industries: "SaaS, Tech, Consumer Apps", salaryRange: "₹12–22 L" },
      { icon: "📱", role: "Social Media & Content Head", industries: "Media, FMCG, Startups", salaryRange: "₹7–13 L" },
      { icon: "🏢", role: "B2B Account Manager / Sales Lead", industries: "Enterprise, Consulting", salaryRange: "₹9–16 L" },
    ],
  },
  editorialCta: {
    text: "Ready to compare marketing programmes side-by-side? Our programme comparison tool shows duration, fees, accreditation, and placement data in one view.",
    linkLabel: "Compare Marketing MBA Programmes",
    linkHref: "/mba-online",
  },
  universities: {
    eyebrow: "TOP UNIVERSITIES",
    heading: "Leading programmes for Marketing specialization",
    seeAllLabel: "View all accredited Marketing MBA programmes",
    seeAllHref: "/mba-online",
    items: [
      { rank: 1, name: "Symbiosis Centre for Distance Learning", programme: "MBA – Marketing", accreditations: ["UGC-DEB", "NAAC A"], fee: "₹1.8 L", detailsHref: "/mba-online" },
      { rank: 2, name: "NMIMS Global Access", programme: "MBA – Marketing & Sales", accreditations: ["UGC-DEB", "NAAC A+"], fee: "₹1.6 L", detailsHref: "/mba-online" },
      { rank: 3, name: "Amity University Online", programme: "MBA – Marketing Management", accreditations: ["UGC-DEB", "NAAC A+", "WES"], fee: "₹2.0 L", detailsHref: "/mba-online" },
      { rank: 4, name: "Manipal Academy of Higher Education", programme: "MBA – Marketing", accreditations: ["UGC-DEB", "NAAC A++"], fee: "₹1.9 L", detailsHref: "/mba-online" },
      { rank: 5, name: "Lovely Professional University", programme: "MBA – Digital Marketing", accreditations: ["UGC-DEB", "NAAC A+"], fee: "₹1.4 L", detailsHref: "/mba-online" },
    ],
  },
  faqs: [
    { _id: "f1", question: "Is a Marketing MBA worth it in 2026?", answer: "Yes, particularly if you want to move from a functional role — content, paid ads — into managerial or strategic positions. The credential helps most for roles at brand manager level and above, where the hiring bar includes formal business and strategy education." },
    { _id: "f2", question: "Does it matter if I choose Marketing vs Digital Marketing as the specialization name?", answer: "Practically, no — curriculum overlap is 80–90%. 'Digital Marketing' as a named specialization skews more toward tools and channels; 'Marketing Management' skews more toward brand and strategy. For most employers in 2026, either is acceptable." },
    { _id: "f3", question: "Can I do a Marketing MBA without a business background?", answer: "Yes. The majority of marketing MBA students in online/distance programmes come from non-business backgrounds — engineering, science, arts. The programme is designed to bring you up to speed on business fundamentals while building on your existing skills." },
    { _id: "f4", question: "Which is better — Symbiosis or NMIMS for Marketing MBA?", answer: "Both are strong, UGC-DEB approved programmes. Symbiosis has better brand recognition in corporate India outside of Mumbai. NMIMS has particularly strong alumni networks in Mumbai and Pune. If you are outside Maharashtra, Symbiosis or Manipal may serve you better." },
    { _id: "f5", question: "What is the difference between a full-time and online Marketing MBA?", answer: "The core curriculum is similar. Key differences are networking (full-time gives you campus placement and alumni access), pace (full-time is 2 years focused, online fits around your job), and cost (online is typically 3–5× cheaper). For working professionals, online is almost always the better financial decision." },
  ],
  faqsHeading: "Frequently Asked Questions",
  ctaBand: {
    heading: "Not sure Marketing is right for you?",
    body: "Our AI Counsellor compares all 8 specializations against your profile and recommends the best fit in 2 minutes.",
    primaryCtaLabel: "Try the AI Counsellor",
    secondaryCtaLabel: "Talk to a Counsellor",
    secondaryCtaHref: "tel:+917350460393",
  },
};

/* ─── FAQ accordion item (client component) ─────────────────────────── */

function FaqRow({ question, answer }: { question: string; answer?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sd-faq-item">
      <button
        type="button"
        className="sd-faq-q"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{question}</span>
        <svg
          width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`sd-faq-icon${open ? " open" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="sd-faq-a">{answer}</div>}
    </div>
  );
}

/* ─── Component ────────────────────────────────────────────────────── */

export default function SpecializationDetailClient({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const cms = data as CMSData;

  const hero = (cms.hero?.heading ? cms.hero : null) ?? DEFAULT.hero!;
  const overview = (cms.overview?.heading ? cms.overview : null) ?? DEFAULT.overview!;
  const careerOutcomes = (cms.careerOutcomes?.careers?.length ? cms.careerOutcomes : null) ?? DEFAULT.careerOutcomes!;
  const editorialCta = cms.editorialCta ?? DEFAULT.editorialCta!;
  const universities = (cms.universities?.items?.length ? cms.universities : null) ?? DEFAULT.universities!;
  const faqs = cms.faqs?.length ? cms.faqs : DEFAULT.faqs!;
  const faqsHeading = cms.faqsHeading ?? DEFAULT.faqsHeading;
  const ctaBand = cms.ctaBand ?? DEFAULT.ctaBand!;

  const bodyParas = (overview.body ?? "").split(/\n\n+/).filter(Boolean);

  return (
    <>
      <style>{`
        /* ── Hero ───────────────────────────────────── */
        .sd-hero { background: var(--ivory); padding: 48px 0 40px; }
        .sd-hero-inner { max-width: 820px; }
        .sd-hero h1 { margin: 12px 0 20px; }
        .sd-hero-lede { font-size: 17px; color: var(--charcoal); line-height: 1.65; margin-bottom: 28px; }
        .sd-hero-stats { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
        .sd-hero-stat {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--white); border: 1px solid var(--mist);
          border-radius: var(--radius-pill);
          padding: 8px 16px; font-size: 13px; line-height: 1.2;
        }
        .sd-hero-stat-icon { font-size: 16px; }
        .sd-hero-stat-val { font-weight: 700; color: var(--navy); }
        .sd-hero-stat-lbl { color: var(--grey); }
        .sd-soft-cta {
          background: var(--white); border: 1px solid var(--mist);
          border-left: 4px solid var(--yellow);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 18px 20px;
          display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
        }
        .sd-soft-cta p {
          font-size: 14px; color: var(--charcoal);
          flex: 1; min-width: 200px; margin: 0;
        }

        /* ── Breadcrumb ─────────────────────────────── */
        .sd-breadcrumb {
          font-size: 12px; color: var(--grey);
          padding: 12px 0 0;
          display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
        }
        .sd-breadcrumb a { color: var(--grey); }
        .sd-breadcrumb a:hover { color: var(--navy); }
        .sd-breadcrumb .sep { color: var(--pale-navy); }
        .sd-breadcrumb .cur { color: var(--navy); font-weight: 500; }

        /* ── Section common ─────────────────────────── */
        .sd-section { padding: 60px 0; }
        .sd-section-alt { background: var(--white); }
        .sd-rule {
          width: 48px; height: 3px;
          background: var(--yellow); border-radius: 2px;
          margin: 16px 0 28px;
        }
        .sd-section-max { max-width: 820px; }

        /* ── Overview body ──────────────────────────── */
        .sd-body { font-size: 16px; line-height: 1.75; color: var(--charcoal); }
        .sd-body p { margin-bottom: 1.4em; }
        .sd-body p:last-child { margin-bottom: 0; }

        /* ── Skills Grid ────────────────────────────── */
        .sd-skills-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 28px 0; }
        .sd-skill-tag {
          display: inline-block;
          background: var(--mist); color: var(--navy);
          border-radius: var(--radius-pill);
          font-size: 13px; font-weight: 500;
          padding: 6px 14px;
        }
        .sd-skill-tag.new {
          background: var(--yellow); color: var(--navy); font-weight: 700;
        }
        .sd-skill-tag.new::after {
          content: " ✦"; font-size: 9px; vertical-align: super;
        }

        /* ── Info Card ──────────────────────────────── */
        .sd-info-card {
          background: var(--pale-navy); border-radius: var(--radius-md);
          padding: 20px 24px; margin-top: 8px;
        }
        .sd-info-card-title {
          font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: var(--navy); margin-bottom: 8px;
        }
        .sd-info-card p { font-size: 14px; color: var(--navy); margin: 0; line-height: 1.6; }

        /* ── Career Grid ────────────────────────────── */
        .sd-career-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 640px) { .sd-career-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .sd-career-grid { grid-template-columns: repeat(3, 1fr); } }
        .sd-career-card {
          background: var(--white); border: 1px solid var(--mist);
          border-radius: var(--radius-md); padding: 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .sd-career-icon {
          width: 40px; height: 40px; background: var(--pale-navy);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .sd-career-role {
          font-family: var(--font-serif); color: var(--navy);
          font-size: 16px; font-weight: 700; line-height: 1.25;
        }
        .sd-career-industries { font-size: 12px; color: var(--grey); line-height: 1.4; }
        .sd-career-salary {
          font-size: 13px; font-weight: 700; color: var(--navy);
          margin-top: auto; padding-top: 4px;
        }
        .sd-source-note { font-size: 12px; color: var(--grey); margin-top: 20px; }

        /* ── Editorial CTA ──────────────────────────── */
        .sd-editorial-cta {
          background: var(--navy); border-radius: var(--radius-lg);
          padding: 24px 28px; margin: 40px 0;
          display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
        }
        .sd-editorial-cta p {
          color: var(--pale-navy); font-size: 15px;
          flex: 1; min-width: 200px; margin: 0; line-height: 1.6;
        }
        .sd-editorial-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--yellow); color: var(--navy);
          border-radius: var(--radius-md);
          font-size: 13px; font-weight: 700; padding: 10px 18px;
          white-space: nowrap; flex-shrink: 0; transition: background .15s;
        }
        .sd-editorial-link:hover { background: #e6b800; }

        /* ── University List ────────────────────────── */
        .sd-uni-list { display: flex; flex-direction: column; }
        .sd-uni-row {
          display: grid; grid-template-columns: 40px 1fr auto;
          gap: 16px; align-items: center;
          padding: 18px 0; border-bottom: 1px solid var(--mist);
        }
        .sd-uni-row:first-child { border-top: 1px solid var(--mist); }
        .sd-uni-rank {
          width: 40px; height: 40px;
          background: var(--yellow); color: var(--navy); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif); font-size: 18px; font-weight: 700;
          flex-shrink: 0;
        }
        .sd-uni-info { min-width: 0; }
        .sd-uni-name { font-weight: 700; color: var(--navy); font-size: 15px; line-height: 1.3; margin-bottom: 4px; }
        .sd-uni-prog { font-size: 13px; color: var(--grey); margin-bottom: 8px; }
        .sd-uni-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .sd-uni-chip {
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; background: var(--mist); color: var(--navy);
          padding: 3px 8px; border-radius: var(--radius-pill);
        }
        .sd-uni-right { text-align: right; flex-shrink: 0; }
        .sd-uni-fee { font-size: 14px; font-weight: 700; color: var(--navy); white-space: nowrap; }
        .sd-uni-fee-lbl { font-size: 10px; color: var(--grey); letter-spacing: .06em; text-transform: uppercase; }
        .sd-uni-link {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; font-weight: 600; color: var(--navy); margin-top: 4px;
        }
        .sd-see-all-wrap { margin-top: 24px; }
        .sd-see-all { font-size: 14px; font-weight: 600; color: var(--navy); text-decoration: underline; }
        .sd-see-all:hover { text-decoration: none; }
        @media (max-width: 600px) {
          .sd-uni-row { grid-template-columns: 36px 1fr; }
          .sd-uni-right { grid-column: 2; }
        }

        /* ── FAQ ────────────────────────────────────── */
        .sd-faq-list { display: flex; flex-direction: column; }
        .sd-faq-item { border-bottom: 1px solid var(--mist); }
        .sd-faq-item:first-child { border-top: 1px solid var(--mist); }
        .sd-faq-q {
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px; width: 100%; padding: 20px 0;
          font-size: 16px; font-weight: 600; color: var(--navy);
          text-align: left; background: none; border: none; cursor: pointer;
          line-height: 1.4;
        }
        .sd-faq-q:hover { color: var(--charcoal); }
        .sd-faq-icon { transition: transform .25s; flex-shrink: 0; }
        .sd-faq-icon.open { transform: rotate(180deg); }
        .sd-faq-a { padding: 0 0 20px; font-size: 15px; line-height: 1.7; color: var(--charcoal); max-width: 720px; }

        /* ── CTA buttons ────────────────────────────── */
        .sd-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="container">
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link href="/specializations-guide">Specializations Guide</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="cur">{hero.heading}</span>
          </nav>

          <div className="sd-hero-inner">
            <div className="eyebrow" style={{ marginTop: 16 }}>
              {hero.eyebrow ?? "MBA SPECIALIZATION GUIDE"}
            </div>
            <h1 className="h-display h1">{hero.heading}</h1>
            {hero.lede && <p className="sd-hero-lede">{hero.lede}</p>}

            {hero.heroStats && hero.heroStats.length > 0 && (
              <div className="sd-hero-stats">
                {hero.heroStats.map((stat, i) => (
                  <div key={i} className="sd-hero-stat">
                    {stat.icon && (
                      <span className="sd-hero-stat-icon" aria-hidden="true">{stat.icon}</span>
                    )}
                    <span className="sd-hero-stat-val">{stat.value}</span>
                    <span className="sd-hero-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {hero.softCta?.text && (
              <div className="sd-soft-cta">
                <p>{hero.softCta.text}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setModalOpen(true)}
                >
                  {hero.softCta.buttonLabel ?? "Try the AI Counsellor"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview (The Specialization) ────────────────────── */}
      <section className="sd-section sd-section-alt">
        <div className="container sd-section-max">
          <div className="eyebrow">{overview.eyebrow ?? "THE SPECIALIZATION"}</div>
          <h2 className="h-display h2">{overview.heading}</h2>
          <div className="sd-rule" aria-hidden="true" />

          {bodyParas.length > 0 && (
            <div className="sd-body">
              {bodyParas.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}

          {overview.skills && overview.skills.length > 0 && (
            <div className="sd-skills-grid">
              {overview.skills.map((skill, i) => (
                <span key={i} className={`sd-skill-tag${skill.isNew ? " new" : ""}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          {overview.infoCard?.body && (
            <div className="sd-info-card">
              {overview.infoCard.title && (
                <div className="sd-info-card-title">{overview.infoCard.title}</div>
              )}
              <p>{overview.infoCard.body}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Career Outcomes ──────────────────────────────────── */}
      <section className="sd-section">
        <div className="container">
          <div className="eyebrow">{careerOutcomes.eyebrow ?? "CAREER OUTCOMES"}</div>
          <h2 className="h-display h2">{careerOutcomes.heading}</h2>
          <div className="sd-rule" aria-hidden="true" />

          {careerOutcomes.careers && careerOutcomes.careers.length > 0 && (
            <div className="sd-career-grid">
              {careerOutcomes.careers.map((c, i) => (
                <div key={i} className="sd-career-card">
                  {c.icon && (
                    <div className="sd-career-icon" aria-hidden="true">{c.icon}</div>
                  )}
                  <div className="sd-career-role">{c.role}</div>
                  {c.industries && <div className="sd-career-industries">{c.industries}</div>}
                  {c.salaryRange && <div className="sd-career-salary">{c.salaryRange}</div>}
                </div>
              ))}
            </div>
          )}

          {careerOutcomes.sourceNote && (
            <p className="sd-source-note">{careerOutcomes.sourceNote}</p>
          )}

          {(editorialCta.text || editorialCta.linkLabel) && (
            <div className="sd-editorial-cta">
              {editorialCta.text && <p>{editorialCta.text}</p>}
              {editorialCta.linkLabel && (
                <Link href={editorialCta.linkHref ?? "#"} className="sd-editorial-link">
                  {editorialCta.linkLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Top Universities ─────────────────────────────────── */}
      <section className="sd-section sd-section-alt">
        <div className="container sd-section-max">
          <div className="eyebrow">{universities.eyebrow ?? "TOP UNIVERSITIES"}</div>
          <h2 className="h-display h2">{universities.heading}</h2>
          <div className="sd-rule" aria-hidden="true" />

          {universities.items && universities.items.length > 0 && (
            <div className="sd-uni-list">
              {universities.items.map((uni, i) => (
                <div key={i} className="sd-uni-row">
                  <div className="sd-uni-rank" aria-hidden="true">{uni.rank ?? i + 1}</div>
                  <div className="sd-uni-info">
                    <div className="sd-uni-name">{uni.name}</div>
                    {uni.programme && <div className="sd-uni-prog">{uni.programme}</div>}
                    {uni.accreditations && uni.accreditations.length > 0 && (
                      <div className="sd-uni-chips">
                        {uni.accreditations.map((a, j) => (
                          <span key={j} className="sd-uni-chip">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="sd-uni-right">
                    {uni.fee && (
                      <>
                        <div className="sd-uni-fee-lbl">Total fee</div>
                        <div className="sd-uni-fee">{uni.fee}</div>
                      </>
                    )}
                    {uni.detailsHref && (
                      <Link href={uni.detailsHref} className="sd-uni-link">
                        Details
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {universities.seeAllLabel && (
            <div className="sd-see-all-wrap">
              <Link href={universities.seeAllHref ?? "#"} className="sd-see-all">
                {universities.seeAllLabel} →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="sd-section">
        <div className="container sd-section-max">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">{faqsHeading ?? "Common questions answered"}</h2>
          <div className="sd-rule" aria-hidden="true" />

          <div className="sd-faq-list">
            {faqs.map((faq, i) => (
              <FaqRow key={faq._id ?? i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────────── */}
      <div className="cta-band" id="contact">
        <div className="container">
          <h2>{ctaBand.heading ?? "Not sure which specialization is right for you?"}</h2>
          <p>
            {ctaBand.body ??
              "Our AI Counsellor compares all 8 specializations against your profile and recommends the best fit in 2 minutes."}
          </p>
          <div className="sd-cta-btns">
            <button
              type="button"
              className="btn btn-inverted"
              onClick={() => setModalOpen(true)}
            >
              {ctaBand.primaryCtaLabel ?? "Try the AI Counsellor"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={ctaBand.secondaryCtaHref ?? "tel:+917350460393"}
              className="btn btn-secondary"
            >
              {ctaBand.secondaryCtaLabel ?? "Talk to a Counsellor"}
            </a>
          </div>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-detail" />
    </>
  );
}
