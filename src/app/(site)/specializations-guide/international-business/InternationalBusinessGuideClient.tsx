"use client";

import { useEffect, useRef, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "what-is-ib-mba", label: "What is it?" },
  { id: "who-fits", label: "Who fits?" },
  { id: "curriculum", label: "Curriculum" },
  { id: "career-roles", label: "Career roles" },
  { id: "salary", label: "Salary" },
  { id: "top-programmes", label: "Top 10 programmes" },
  { id: "mode-choice", label: "Which mode?" },
  { id: "who-not-fit", label: "Who should not choose" },
  { id: "how-to-decide", label: "5-step framework" },
  { id: "faq", label: "FAQs" },
];

const TAKEAWAYS = [
  "Built for professionals targeting MNC country management, export-import businesses, and family businesses going global.",
  `Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 22 lakh (IIFT Residential) — most working professionals fit Rs 1.85–3.75 lakh Online.`,
  "Median salary: Rs 6 LPA at entry, Rs 13 LPA at 3–7 years, Rs 28 LPA at 8–15 years.",
  "Best-fit: aspirants who enjoy geopolitics, cross-cultural work, and are comfortable with travel.",
  "Poor-fit: professionals who want to stay in domestic-only roles — a Marketing or Operations MBA delivers better ROI for them.",
  "Our 3 top picks: OP Jindal Online (AACSB), IIFT Executive (placement leader), Symbiosis Online (MNC placements).",
];

const QUICK_FACTS = [
  { label: "Duration", value: "12–24 months" },
  { label: "Fee range", value: "Rs 1.2 L – Rs 22 L" },
  { label: "Approval", value: "UGC-DEB / AICTE / NAAC A+" },
  { label: "Entry salary", value: "Rs 6 LPA" },
  { label: "Mid-career salary", value: "Rs 13 LPA" },
  { label: "Senior salary", value: "Rs 28 LPA" },
  { label: "Top employers", value: "Unilever, P&G, Nestle, Samsung, LG, Godrej, Reliance, DHL, Maersk, TATA International" },
];

const PROFILE_CARDS = [
  {
    icon: "🌐",
    title: "Domestic Sales/Marketing Pro",
    desc: "3–8 years in B2B or B2C sales in India, eyeing an international business development or country-management role at a multinational.",
  },
  {
    icon: "🏭",
    title: "Family Business Next-Gen",
    desc: "Taking over or expanding a family business into international markets. Needs structured understanding of trade finance, forex, and cross-cultural management.",
  },
  {
    icon: "📦",
    title: "Export-Import Veteran",
    desc: "Formalising practical expertise in international trade documentation, customs, and global logistics with a recognised MBA credential.",
  },
];

const CURRICULUM = [
  {
    sem: "Semester 1",
    title: "Foundations",
    subjects: [
      "Business Economics & Global Business Environment",
      "Financial Accounting & Management Control",
      "Marketing Management",
      "Organisational Behaviour & Cross-Cultural Management",
      "Statistics & Business Analytics",
    ],
  },
  {
    sem: "Semester 2",
    title: "International Business Core",
    subjects: [
      "International Trade Theory & Policy",
      "Foreign Exchange Markets & Risk Management",
      "Cross-Cultural Negotiation & Communication",
      "Global Strategic Management",
      "International Marketing",
    ],
  },
  {
    sem: "Semester 3",
    title: "Applied International Business",
    subjects: [
      "Export-Import Documentation & Customs Procedures",
      "International Human Resource Management",
      "Global Supply Chain & Logistics Management",
      "International Business Law & Trade Compliance",
      "Country Risk Analysis",
    ],
  },
  {
    sem: "Semester 4",
    title: "2025-26 Focus Areas",
    subjects: [
      "ESG in Global Business & EU Carbon Border Adjustment Mechanism (CBAM)",
      "Digital Cross-Border Trade & E-Commerce Platforms",
      "India-EU / India-US Trade Agreement Impact",
      "International Business Capstone Project",
      "Elective: GCC Operations / Embassy Trade Roles / International Consulting",
    ],
  },
];

const ROLE_CARDS = [
  {
    icon: "📈",
    role: "International Business Development / Export Sales",
    employers: "Export-heavy Indian companies, MNC India subsidiaries, D2C global brands",
    salary: "Rs 7–18 LPA",
    growth: "High — India's export push to $2 trillion by 2030",
  },
  {
    icon: "🌍",
    role: "Country Manager / Regional Manager (MNC)",
    employers: "Unilever, P&G, Samsung, LG, Nestle, Reckitt, Colgate",
    salary: "Rs 18–50 LPA + expat allowances",
    growth: "Selective — top 5–10% of MBA graduates reach this level",
  },
  {
    icon: "🛍",
    role: "Global Product / Category Management",
    employers: "FMCG MNCs, Global tech companies, International pharma",
    salary: "Rs 14–35 LPA",
    growth: "Moderate — competes with domestic product management",
  },
  {
    icon: "📋",
    role: "International Trade / Import-Export Manager",
    employers: "Trading houses, Logistics companies, Customs-heavy industries",
    salary: "Rs 6–15 LPA",
    growth: "Stable — large MSME and logistics sector in India",
  },
  {
    icon: "🚢",
    role: "Global Supply Chain / Logistics",
    employers: "DHL, Maersk, FedEx, TATA International, Gati-KWE",
    salary: "Rs 10–28 LPA",
    growth: "High — supply chain disruptions are creating structural demand",
  },
  {
    icon: "🤝",
    role: "International Business Consulting",
    employers: "Big 4 international advisory, Boutique trade consulting firms",
    salary: "Rs 12–30 LPA",
    growth: "Growing — CBAM, trade compliance, and country-entry advisory demand is rising",
  },
];

const SALARY_ROWS = [
  { band: "Entry (0–2 yrs)", dist: "Rs 5–7 LPA", exec_iift: "Rs 12–18 LPA", exec_t2: "Rs 7–10 LPA" },
  { band: "Early-mid (3–5 yrs)", dist: "Rs 8–12 LPA", exec_iift: "Rs 20–32 LPA", exec_t2: "Rs 12–18 LPA" },
  { band: "Mid (5–8 yrs)", dist: "Rs 12–18 LPA", exec_iift: "Rs 30–50 LPA", exec_t2: "Rs 16–24 LPA" },
  { band: "Senior (8–15 yrs)", dist: "Rs 18–28 LPA", exec_iift: "Rs 40–80 LPA", exec_t2: "Rs 22–36 LPA" },
  { band: "Country / VP level", dist: "Rs 25–40 LPA", exec_iift: "Rs 60–120 LPA+", exec_t2: "Rs 30–55 LPA" },
];

const TOP10_ROWS = [
  { rank: 1, uni: "IIFT", city: "Delhi/Kolkata", mode: "Executive (blended)", fee: "Rs 18 L", approval: "GoI / UGC", placement: "~95%", strength: "MNC country-manager pipeline, embassy trade roles" },
  { rank: 2, uni: "IIFT Residential", city: "Delhi", mode: "Full-time", fee: "Rs 22 L", approval: "GoI / UGC", placement: "~98%", strength: "Highest brand for IB in India; MEA track" },
  { rank: 3, uni: "OP Jindal Global (JGBS)", city: "Sonipat", mode: "Online", fee: "Rs 3.75 L", approval: "UGC-DEB / AACSB", placement: "~76%", strength: "AACSB — best Online for international recognition" },
  { rank: 4, uni: "Symbiosis SCOL", city: "Pune", mode: "Online", fee: "Rs 2.55 L", approval: "UGC-DEB / NAAC A", placement: "~72%", strength: "Live faculty; MNC-friendly brand" },
  { rank: 5, uni: "NMIMS CDOE", city: "Mumbai", mode: "Distance", fee: "Rs 1.85 L", approval: "UGC-DEB / NAAC A+", placement: "~60%", strength: "Mumbai corporate-network access; strong alumni" },
  { rank: 6, uni: "Manipal Online (MAHE)", city: "Manipal", mode: "Online", fee: "Rs 1.7 L", approval: "UGC-DEB / NAAC A++", placement: "~54%", strength: "Tier-1 brand at mid-budget; strong NAAC score" },
  { rank: 7, uni: "Amity Online", city: "Noida", mode: "Online", fee: "Rs 1.99 L", approval: "UGC-DEB / NAAC A+", placement: "~55%", strength: "International collaborations; good alumni base" },
  { rank: 8, uni: "Jain Online (JAIN CDOE)", city: "Bengaluru", mode: "Online", fee: "Rs 1.5 L", approval: "UGC-DEB / NAAC A++", placement: "~58%", strength: "Strong south India corporate placements" },
  { rank: 9, uni: "ICFAI University", city: "Hyderabad", mode: "Distance", fee: "Rs 1.2 L", approval: "UGC / NAAC A", placement: "Limited", strength: "Lowest fee in the segment; self-directed learners" },
  { rank: 10, uni: "Chandigarh University Online", city: "Chandigarh", mode: "Online", fee: "Rs 1.4 L", approval: "UGC-DEB / NAAC A+", placement: "~52%", strength: "Fast-growing placement network; value for price" },
];

const MODE_ROWS = [
  { situation: "I want MNC country management in 5–7 years", best: "IIFT Executive or Residential", reason: "Brand and alumni network are irreplaceable at this level" },
  { situation: "I want to grow an export-import business", best: "Online MBA (Symbiosis / NMIMS)", reason: "Curriculum is aligned; cost is efficient; can study while working" },
  { situation: "I'm next-gen in a family import-export business", best: "Online MBA (OP Jindal / Symbiosis)", reason: "Structured framework with flexibility to manage the business simultaneously" },
  { situation: "I want to work in international consulting at Big 4", best: "IIFT Executive or Top-B-School PGDM", reason: "Brand filters exist at Big 4 and boutique trade consulting firms" },
  { situation: "I need the lowest possible cost", best: "ICFAI Distance / Chandigarh Online", reason: "UGC-DEB valid; trade curriculum adequate for MSME export roles" },
  { situation: "I need AACSB recognition for overseas roles", best: "OP Jindal Global Online", reason: "Only AACSB Online IB MBA in India at a manageable fee" },
];

const NOT_FIT = [
  "You want a domestic-only sales or marketing career — Marketing Management or General MBA delivers better ROI.",
  "You dislike travel and are not comfortable with frequent relocation — high-paying IB roles typically demand both.",
  "You want a quantitative finance or data analytics role — Finance MBA or Analytics MBA is better aligned.",
  "You want to become a domestic CMO or National Sales Head — Marketing MBA is the right specialization.",
  `You resist learning about other cultures or find cross-cultural communication uncomfortable — this will be a friction point throughout the course and career.`,
  "You expect the MBA to get you an overseas job quickly — the MBA opens doors; immigration, employer sponsorship, and market conditions govern actual overseas placement.",
];

const FIVE_QUESTIONS = [
  {
    step: "01",
    title: "Name your target role type",
    subtitle: "MNC, export-import, or family business?",
    body: "The three career paths have very different economics. MNC country management pays highest. Export-import at Indian MSMEs pays moderately. Family business scales with the business. Your answer should drive the programme choice, not the other way around.",
  },
  {
    step: "02",
    title: "Confirm your comfort with travel",
    subtitle: "And overseas relocation",
    body: "Roughly 60% of high-paying International Business roles involve significant travel or overseas postings. If your family situation makes this difficult in the near-term, some role families (trade compliance, domestic IB units) work well — others will be limiting.",
  },
  {
    step: "03",
    title: "Check whether IIFT is genuinely in play",
    subtitle: "For your budget and timeline",
    body: "IIFT is the specialization leader at Rs 18–22 lakh. If your target is MNC country management or MEA-track, it is worth it. If you are targeting domestic export-import at an Indian firm, an Online MBA at Rs 1.85–3.75 lakh delivers far better ROI.",
  },
  {
    step: "04",
    title: "Audit your cross-cultural interest",
    subtitle: "And macro-economic curiosity",
    body: "International Business demands active interest in geopolitics, currency movements, trade policy, and cultural nuance. Aspirants who genuinely enjoy reading about global affairs thrive. Those who find it a chore typically move back to domestic roles within 3 years.",
  },
  {
    step: "05",
    title: "Set your hard financial ceiling",
    subtitle: "Then find the best programme within it",
    body: "Rs 1.2 L to Rs 22 L is the range. Most working professionals fit Rs 1.85 L to Rs 3.75 L Online. Stretching to IIFT Executive without an MNC-track reset in view is a common regret pattern our counsellors see repeatedly.",
  },
];

const FAQS = [
  { q: "Is an Online MBA in International Business valid in India?", a: "Yes. An Online MBA in International Business from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment.", voice: false },
  { q: "Is IIFT worth the Rs 18–22 lakh fee?", a: "For aspirants targeting MNC country management, MEA services, embassy trade roles, or international consulting — yes. IIFT alumni report Tier-1 MNC placement rates of 90–98% and country-manager offers at 2–3x base salary. For aspirants staying in domestic export-import at Indian MSMEs, IIFT is not worth the premium — an Online MBA delivers the same career at a fraction of the cost.", voice: false },
  { q: "How much does an International Business MBA cost in India in 2025-26?", a: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 22 lakh (IIFT full-time residential). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between Rs 1.5 lakh and Rs 2.55 lakh. OP Jindal Global is higher at Rs 3.75 lakh for AACSB accreditation.", voice: false },
  { q: "What is the salary after an Online MBA in International Business?", a: "Median 2025-26 salary is Rs 6 LPA for freshers, Rs 13 LPA at 3–7 years, Rs 28 LPA at 8–15 years. MNC country management and global product roles can push Rs 40–80 LPA. Overseas postings often add 30–100% expatriate allowances.", voice: false },
  { q: "Can I work abroad after an International Business MBA from India?", a: "An Indian MBA opens international-role doors but does not guarantee overseas placement. Work-visa requirements are governed by employer sponsorship and country-specific rules. AACSB-accredited programmes (OP Jindal JGBS) carry moderately better international recognition.", voice: false },
  { q: "What is the difference between an International Business MBA and a Foreign Trade MBA?", a: "At IIFT, the two are used interchangeably. At other universities, International Business tends to be broader (marketing + finance + strategy across borders) while Foreign Trade tends to be trade-flow-specific (imports, exports, documentation, logistics).", voice: false },
  { q: "Can I do an International Business MBA without any prior international experience?", a: "Yes. Roughly 45% of Symbiosis and NMIMS International Business enrolments in 2024-25 came from purely domestic backgrounds. The MBA is designed to teach international business from first principles.", voice: false },
  { q: "Which universities have the best placement records for International Business MBAs?", a: "Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIFT (~95–98% at Executive and residential), OP Jindal Global (~76%), and Symbiosis Online (~72%).", voice: false },
  { q: "How is the geopolitical environment affecting International Business careers in 2025-26?", a: `India's push to $2 trillion in exports by 2030, EU CBAM (in force 2026), US supply-chain compliance requirements, and India's participation in trade agreements are all creating structural demand for International Business talent.`, voice: false },
  { q: "Can I switch industries after an International Business MBA?", a: "Yes. International Business is industry-agnostic. Aspirants regularly move between FMCG, technology, pharmaceuticals, automotive, engineering goods, and services. Our alumni tracking shows 47% switch industries within 4 years of graduation.", voice: false },
  { q: "What are education loan options for IIFT and Executive International Business programmes?", a: "For Online MBAs at Rs 1.5–3.75 lakh, most working professionals pay from monthly salary. For IIFT Executive at Rs 18–22 lakh, education loans are available from SBI, HDFC Credila, ICICI, Avanse, and Auxilo at interest rates of 9.5–12.5% in 2025-26.", voice: false },
  { q: "How does CollegeNCourses help me choose an International Business MBA?", a: "Our counsellors match you to programmes based on your target role type (MNC, export-import, family business), current experience, comfort with international travel, budget, and timeline. Free 30-minute call. No paid referral affects our recommendation.", voice: false },
  { q: "Is International Business MBA good career in India?", a: "Yes, especially in 2025-26. India's export push, GCC growth, and MNC expansion into Tier-2 Indian markets are creating structural demand. Country Manager and VP International roles offer some of the highest MBA-track compensation in India.", voice: true },
  { q: "How much salary after international business MBA?", a: "Median starting salary after an Online MBA in International Business is Rs 6 LPA in India in 2025-26, scaling to Rs 13 LPA at 3–7 years and Rs 28 LPA at 8–15 years. IIFT Executive graduates command 2–3x these bands.", voice: true },
  { q: "Which is the best MBA for international business in India?", a: "The most-recommended MBAs for International Business in 2025-26 are IIFT Executive/Residential (highest brand and placement), OP Jindal Global Online (AACSB accredited, best for international mobility), and Symbiosis SCOL Online (strong MNC placements).", voice: true },
  { q: "Do employers actually value Distance and Online International Business MBAs in 2025-26?", a: "Yes, particularly in domestic export-import, family businesses, MSMEs going global, and Indian MNC subsidiary roles. For top-tier MNC country management or MEA-track roles, IIFT retains a strong preference.", voice: false },
];

const RELATED = [
  { href: "/specializations-guide/marketing/", label: "MBA in Marketing Management" },
  { href: "/specializations-guide/digital-marketing/", label: "MBA in Digital Marketing" },
  { href: "/specializations-guide/finance/", label: "MBA in Finance" },
  { href: "/resources/distance-vs-online-vs-executive-mba-guide/", label: "Distance vs Online vs Executive MBA" },
  { href: "/universities/", label: "Compare all UGC-DEB approved universities" },
  { href: "/contact/", label: "Free 30-min counselling call" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function InternationalBusinessGuideClient() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sticky ToC active-section tracker
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Reading progress */}
      <div className="ib-progress-track" aria-hidden="true">
        <div ref={progressRef} className="ib-progress-bar" />
      </div>

      <style>{`
        /* ── progress ── */
        .ib-progress-track{position:fixed;top:0;left:0;width:100%;height:3px;z-index:200;background:transparent}
        .ib-progress-bar{height:3px;width:0;background:var(--yellow);transition:width .1s linear}

        /* ── layout ── */
        .ib-wrap{max-width:1200px;margin:0 auto;padding:0 1.25rem}
        .ib-two-col{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.ib-two-col{grid-template-columns:1fr}}

        /* ── breadcrumb ── */
        .ib-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .ib-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .ib-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .ib-bc-inner li:last-child::after{content:""}
        .ib-bc-inner a{color:var(--navy);text-decoration:none}
        .ib-bc-inner a:hover{text-decoration:underline}

        /* ── hero ── */
        .ib-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .ib-hero-eyebrow{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--yellow);font-weight:600;margin-bottom:.75rem}
        .ib-hero h1{font-family:var(--font-serif);font-size:clamp(1.7rem,3.5vw,2.6rem);line-height:1.2;color:#fff;margin:0 0 1rem}
        .ib-hero-sub{font-size:1rem;color:rgba(255,255,255,.82);max-width:720px;line-height:1.7;margin-bottom:1.5rem}
        .ib-hero-meta{display:flex;flex-wrap:wrap;gap:.75rem;font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:1.75rem}
        .ib-hero-meta span{display:flex;align-items:center;gap:.35rem}
        .ib-hero-ctarow{display:flex;flex-wrap:wrap;gap:.75rem}
        .ib-btn-primary{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.92rem;padding:.72rem 1.4rem;border-radius:6px;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;transition:opacity .15s}
        .ib-btn-primary:hover{opacity:.88}
        .ib-btn-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.45);font-weight:600;font-size:.88rem;padding:.66rem 1.3rem;border-radius:6px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;transition:border-color .15s}
        .ib-btn-outline:hover{border-color:#fff}

        /* ── takeaways ── */
        .ib-takeaways{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.5rem;margin-bottom:2rem}
        .ib-takeaways h2{font-family:var(--font-serif);font-size:1.15rem;color:var(--navy);margin:0 0 1rem}
        .ib-tk-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .ib-tk-list li{display:flex;gap:.65rem;font-size:.9rem;color:var(--charcoal);line-height:1.55}
        .ib-tk-list li::before{content:"✓";color:var(--yellow);font-weight:700;flex-shrink:0;margin-top:.05rem}

        /* ── toc ── */
        .ib-toc-sticky{position:sticky;top:80px}
        .ib-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ib-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .ib-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .ib-toc-desktop nav a.active,.ib-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .ib-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .ib-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .ib-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.ib-toc-mobile{display:none}}
        @media(max-width:900px){.ib-toc-desktop{display:none}.ib-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .ib-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .ib-toc-mobile summary::after{content:"▾"}
        .ib-toc-mobile[open] summary::after{content:"▴"}
        .ib-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .ib-toc-mobile a:hover{background:var(--mist)}

        /* ── section commons ── */
        .ib-section{padding:2.5rem 0}
        .ib-section-title{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.8rem);color:var(--navy);margin:0 0 .4rem}
        .ib-section-sub{font-size:.95rem;color:var(--grey);margin:0 0 1.5rem}

        /* ── quick facts ── */
        .ib-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .ib-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy)}
        .ib-facts-table tr:last-child td{border-bottom:none}
        .ib-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}

        /* ── callout ── */
        .ib-callout{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:1rem 1.25rem;font-size:.9rem;color:var(--charcoal);line-height:1.6;margin:1.25rem 0}
        .ib-callout strong{color:var(--navy)}

        /* ── profile cards ── */
        .ib-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ib-profile-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ib-profile-icon{font-size:2rem;margin-bottom:.6rem}
        .ib-profile-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin:0 0 .5rem}
        .ib-profile-card p{font-size:.86rem;color:var(--charcoal);line-height:1.6;margin:0}

        /* ── curriculum ── */
        .ib-curriculum-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ib-curr-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ib-curr-badge{display:inline-block;background:var(--yellow);color:var(--navy);font-size:.72rem;font-weight:700;padding:.2rem .5rem;border-radius:4px;margin-bottom:.5rem}
        .ib-curr-card h3{font-size:.92rem;font-weight:700;color:var(--navy);margin:0 0 .75rem}
        .ib-curr-card ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.4rem}
        .ib-curr-card ul li{font-size:.82rem;color:var(--charcoal);display:flex;gap:.5rem;line-height:1.45}
        .ib-curr-card ul li::before{content:"·";color:var(--grey);flex-shrink:0}

        /* ── role cards ── */
        .ib-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ib-role-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ib-role-icon{font-size:1.6rem;margin-bottom:.5rem}
        .ib-role-card h3{font-size:.9rem;font-weight:700;color:var(--navy);margin:0 0 .65rem;line-height:1.35}
        .ib-role-meta{display:flex;flex-direction:column;gap:.35rem}
        .ib-role-meta-row{display:flex;gap:.4rem;font-size:.8rem}
        .ib-role-meta-row span:first-child{font-weight:600;color:var(--grey);min-width:68px;flex-shrink:0}
        .ib-role-meta-row span:last-child{color:var(--charcoal);line-height:1.4}

        /* ── salary table ── */
        .ib-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:1.5rem}
        .ib-table{width:100%;border-collapse:collapse;font-size:.86rem;min-width:480px}
        .ib-table th{background:var(--navy);color:#fff;padding:.65rem .85rem;text-align:left;font-size:.78rem;font-weight:600;white-space:nowrap}
        .ib-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal)}
        .ib-table tr:last-child td{border-bottom:none}
        .ib-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ib-table td:first-child{font-weight:600;color:var(--navy)}
        .ib-table .ib-highlight{color:#1a8a3a;font-weight:600}

        /* ── top 10 table ── */
        .ib-top10-table{width:100%;border-collapse:collapse;font-size:.82rem;min-width:750px}
        .ib-top10-table th{background:var(--navy);color:#fff;padding:.6rem .7rem;text-align:left;font-weight:600;font-size:.76rem;white-space:nowrap}
        .ib-top10-table td{padding:.6rem .7rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal);vertical-align:top}
        .ib-top10-table tr:last-child td{border-bottom:none}
        .ib-top10-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ib-rank-badge{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;font-weight:700;font-size:.78rem}
        .ib-rank-badge.gold{background:#F5C518;color:#333}
        .ib-rank-badge.silver{background:#C0C0C0;color:#333}
        .ib-rank-badge.bronze{background:#CD7F32;color:#fff}
        .ib-rank-badge.other{background:var(--pale-navy);color:var(--navy)}

        /* ── mode table ── */
        .ib-mode-table{width:100%;border-collapse:collapse;font-size:.86rem;min-width:550px;margin-bottom:1.5rem}
        .ib-mode-table th{background:var(--navy);color:#fff;padding:.65rem .85rem;text-align:left;font-size:.78rem;font-weight:600}
        .ib-mode-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal);vertical-align:top}
        .ib-mode-table tr:last-child td{border-bottom:none}
        .ib-mode-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ib-mode-table .ib-mode-best{font-weight:700;color:var(--navy)}

        /* ── not fit ── */
        .ib-notfit-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.65rem}
        .ib-notfit-list li{display:flex;gap:.65rem;font-size:.9rem;color:var(--charcoal);line-height:1.55;background:#fff;border:1.5px solid #fce8e8;border-radius:8px;padding:.75rem 1rem}
        .ib-notfit-list li::before{content:"✗";color:#d9534f;font-weight:700;flex-shrink:0;margin-top:.05rem}

        /* ── how-to cards ── */
        .ib-howto-grid{display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem}
        .ib-howto-card{display:grid;grid-template-columns:60px 1fr;gap:1rem;background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.1rem}
        .ib-howto-num{font-family:var(--font-serif);font-size:2rem;font-weight:700;color:var(--yellow);line-height:1;text-align:center;padding-top:.15rem}
        .ib-howto-title{font-size:.95rem;font-weight:700;color:var(--navy);margin:0 0 .1rem}
        .ib-howto-subtitle{font-size:.78rem;color:var(--grey);margin:0 0 .4rem}
        .ib-howto-body{font-size:.86rem;color:var(--charcoal);line-height:1.6;margin:0}

        /* ── counsellor callout ── */
        .ib-counsel-callout{background:var(--navy);color:#fff;border-radius:10px;padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin:1.75rem 0}
        .ib-counsel-callout p{margin:0;font-size:.95rem;line-height:1.6;max-width:580px}
        .ib-counsel-callout strong{color:var(--yellow)}
        .ib-counsel-callout button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.88rem;padding:.65rem 1.25rem;border-radius:6px;border:none;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:opacity .15s}
        .ib-counsel-callout button:hover{opacity:.85}

        /* ── faq ── */
        .ib-faq-list{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.5rem}
        .ib-faq-item{background:#fff;border:1.5px solid var(--pale-navy);border-radius:8px;overflow:hidden}
        .ib-faq-item summary{padding:.9rem 1.1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:.75rem}
        .ib-faq-item summary::-webkit-details-marker{display:none}
        .ib-faq-chevron{flex-shrink:0;transition:transform .2s;color:var(--grey);font-size:.8rem}
        .ib-faq-item[open] .ib-faq-chevron{transform:rotate(180deg)}
        .ib-faq-item[open]{border-color:var(--yellow)}
        .ib-faq-body{padding:.1rem 1.1rem 1rem;font-size:.88rem;color:var(--charcoal);line-height:1.65}
        .ib-voice-badge{display:inline-block;background:#f0f8ff;border:1px solid #b3d4f0;color:#1565c0;font-size:.68rem;font-weight:600;padding:.15rem .4rem;border-radius:3px;margin-left:.5rem;vertical-align:middle;white-space:nowrap}
        .ib-faq-q-row{display:flex;align-items:center;flex:1;gap:.4rem}

        /* ── lead magnet ── */
        .ib-lead-block{background:var(--pale-navy);border:1.5px solid var(--yellow);border-radius:12px;padding:2rem;margin:2rem 0;text-align:center}
        .ib-lead-block h3{font-family:var(--font-serif);font-size:1.25rem;color:var(--navy);margin:0 0 .5rem}
        .ib-lead-block p{font-size:.9rem;color:var(--charcoal);margin:0 0 1.25rem;line-height:1.6}
        .ib-lead-block button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.95rem;padding:.8rem 1.75rem;border-radius:8px;border:none;cursor:pointer;transition:opacity .15s}
        .ib-lead-block button:hover{opacity:.88}

        /* ── related ── */
        .ib-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-bottom:1.5rem}
        .ib-related-link{display:block;background:#fff;border:1.5px solid var(--pale-navy);border-radius:8px;padding:.9rem 1rem;font-size:.88rem;color:var(--navy);text-decoration:none;font-weight:600;transition:border-color .15s,background .15s}
        .ib-related-link:hover{border-color:var(--yellow);background:var(--pale-navy)}

        /* ── sources ── */
        .ib-sources{background:var(--pale-navy);border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;font-size:.8rem;color:var(--grey);line-height:1.7}
        .ib-sources strong{color:var(--navy);display:block;margin-bottom:.4rem}

        /* ── cta band ── */
        .ib-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .ib-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .ib-cta-band p{font-size:.95rem;color:rgba(255,255,255,.78);margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .ib-cta-band button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:1rem;padding:.85rem 2rem;border-radius:8px;border:none;cursor:pointer;transition:opacity .15s}
        .ib-cta-band button:hover{opacity:.88}
      `}</style>

      {/* Breadcrumb */}
      <nav className="ib-breadcrumb" aria-label="Breadcrumb">
        <div className="ib-wrap">
          <ol className="ib-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in International Business</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="ib-hero">
        <div className="ib-wrap">
          <div className="ib-hero-eyebrow">Specialization Guide · Updated December 2025</div>
          <h1>MBA in International Business Management<br />The Honest 2025-26 Guide</h1>
          <p className="ib-hero-sub">
            Fees Rs 1.2 L to Rs 22 L, salary bands, top 10 UGC-DEB programmes across Distance,
            Online, and Executive modes — written by counsellors, not sponsors.
          </p>
          <div className="ib-hero-meta">
            <span>📅 December 2025</span>
            <span>⏱ 12-min read</span>
            <span>✅ UGC-DEB approved programmes only</span>
            <span>🏫 10 universities reviewed</span>
          </div>
          <div className="ib-hero-ctarow">
            <button className="ib-btn-primary" onClick={() => setModalOpen(true)}>
              Get free counselling →
            </button>
            <a href="#top-programmes" className="ib-btn-outline">
              Compare top 10 programmes ↓
            </a>
          </div>
        </div>
      </header>

      {/* Main two-column layout */}
      <div className="ib-wrap">
        <div className="ib-two-col">

          {/* Left — Sticky ToC */}
          <aside>
            <div className="ib-toc-sticky">
              {/* Mobile ToC */}
              <details className="ib-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map(({ id, label }) => (
                  <a key={id} href={`#${id}`}>{label}</a>
                ))}
              </details>

              {/* Desktop ToC */}
              <div className="ib-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={activeId === id ? "active" : ""}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="ib-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — Article content */}
          <main>

            {/* Key Takeaways */}
            <div className="ib-takeaways">
              <h2>6 things to know before reading this guide</h2>
              <ul className="ib-tk-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            {/* What is it */}
            <section id="what-is-ib-mba" className="ib-section">
              <h2 className="ib-section-title">What is an MBA in International Business?</h2>
              <p className="ib-section-sub">And who is it actually designed for?</p>

              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>
                An MBA in International Business Management is a postgraduate degree that combines a
                standard MBA management foundation with specialised subjects in international trade
                theory, foreign exchange management, cross-cultural management, global supply chain,
                and export-import operations. In India, it is available across three modes: Distance,
                Online, and Executive.
              </p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                Unlike Marketing or Finance, which have large domestic career tracks, International
                Business specifically optimises for roles where the business or employer crosses
                national borders. The honest version of this guide: if your career goal is
                domestic-only, a different specialisation will serve you better.
              </p>

              {/* Quick facts */}
              <table className="ib-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}>
                      <td>{f.label}</td>
                      <td>{f.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ib-callout">
                <strong>2025-26 context:</strong> India's merchandise exports are targeting $2 trillion
                by 2030. The EU Carbon Border Adjustment Mechanism (CBAM) takes force in 2026.
                India-EU and India-GCC trade agreements are reshaping cross-border business flows.
                This is creating structural demand for International Business professionals that was
                not present in the same form five years ago.
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="ib-section">
              <h2 className="ib-section-title">The three profiles who gain most from this MBA</h2>
              <p className="ib-section-sub">Our counsellors see these patterns consistently</p>

              <div className="ib-profile-grid">
                {PROFILE_CARDS.map((c, i) => (
                  <div key={i} className="ib-profile-card">
                    <div className="ib-profile-icon">{c.icon}</div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="ib-callout">
                <strong>Common thread:</strong> all three profiles have a clear line of sight to a
                cross-border role. If that line of sight is absent, the MBA will teach you
                International Business theory without a career track to apply it to.
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="ib-section">
              <h2 className="ib-section-title">What you will actually study</h2>
              <p className="ib-section-sub">Semester-wise curriculum overview — UGC-DEB approved structure</p>

              <div className="ib-curriculum-grid">
                {CURRICULUM.map((sem, i) => (
                  <div key={i} className="ib-curr-card">
                    <div className="ib-curr-badge">{sem.sem}</div>
                    <h3>{sem.title}</h3>
                    <ul>
                      {sem.subjects.map((s, j) => <li key={j}>{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="ib-callout">
                <strong>2025-26 additions to watch:</strong> Most Tier-1 Online programmes have added
                EU CBAM implications, digital cross-border trade platforms, and ESG-in-global-business
                modules. If a programme you are considering has not updated its curriculum since
                2022-23, ask for the current subject list before enrolling.
              </div>
            </section>

            {/* Career roles */}
            <section id="career-roles" className="ib-section">
              <h2 className="ib-section-title">Careers and role families</h2>
              <p className="ib-section-sub">Where International Business MBA graduates actually land</p>

              <div className="ib-role-grid">
                {ROLE_CARDS.map((r, i) => (
                  <div key={i} className="ib-role-card">
                    <div className="ib-role-icon">{r.icon}</div>
                    <h3>{r.role}</h3>
                    <div className="ib-role-meta">
                      <div className="ib-role-meta-row">
                        <span>Employers</span>
                        <span>{r.employers}</span>
                      </div>
                      <div className="ib-role-meta-row">
                        <span>Salary</span>
                        <span style={{ fontWeight: 700, color: "var(--navy)" }}>{r.salary}</span>
                      </div>
                      <div className="ib-role-meta-row">
                        <span>Growth</span>
                        <span>{r.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ib-counsel-callout">
                <p>
                  <strong>Not sure which role family fits your background?</strong> Our counsellors
                  map your current experience to the most viable International Business career track
                  in a free 30-minute call.
                </p>
                <button onClick={() => setModalOpen(true)}>Book free call</button>
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="ib-section">
              <h2 className="ib-section-title">Salary by experience and mode</h2>
              <p className="ib-section-sub">Median 2025-26 data — Distance/Online vs Executive (IIFT and Tier-2)</p>

              <div className="ib-table-wrap">
                <table className="ib-table">
                  <thead>
                    <tr>
                      <th>Experience band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive IIFT / Tier-1</th>
                      <th>Executive Tier-2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="ib-highlight">{r.exec_iift}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ib-callout">
                <strong>Important context:</strong> The salary gap between Online MBA and IIFT
                Executive is real and significant. At the Country Manager / VP level, IIFT alumni
                command 2–3x the salary of Online MBA graduates. The gap narrows considerably for
                domestic export-import and family-business roles where employer perception of mode
                is less pronounced.
              </div>
            </section>

            {/* Top 10 programmes */}
            <section id="top-programmes" className="ib-section">
              <h2 className="ib-section-title">Top 10 MBA International Business programmes in India</h2>
              <p className="ib-section-sub">UGC-DEB approved only · 2025-26 fees and placement data</p>

              <div className="ib-table-wrap">
                <table className="ib-top10-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>University</th>
                      <th>Mode</th>
                      <th>Fee</th>
                      <th>Approval</th>
                      <th>Placement</th>
                      <th>Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP10_ROWS.map((r) => (
                      <tr key={r.rank}>
                        <td>
                          <span className={`ib-rank-badge ${r.rank === 1 ? "gold" : r.rank === 2 ? "silver" : r.rank === 3 ? "bronze" : "other"}`}>
                            {r.rank}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: "var(--navy)" }}>
                          {r.uni}
                          <br />
                          <span style={{ fontWeight: 400, fontSize: ".76rem", color: "var(--grey)" }}>{r.city}</span>
                        </td>
                        <td>{r.mode}</td>
                        <td style={{ fontWeight: 600 }}>{r.fee}</td>
                        <td style={{ fontSize: ".78rem" }}>{r.approval}</td>
                        <td style={{ fontWeight: 600, color: "var(--navy)" }}>{r.placement}</td>
                        <td style={{ fontSize: ".78rem", color: "var(--grey)" }}>{r.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ib-callout">
                <strong>Note on IIFT:</strong> IIFT (Indian Institute of Foreign Trade) is
                Government of India's dedicated International Trade institution — it is in a
                separate category from other universities. For MNC country management and MEA
                roles, IIFT alumni have a structural advantage. For domestic export-import and
                family businesses, an Online MBA at Rs 1.5–3.75 lakh is far better ROI.
              </div>

              <div className="ib-lead-block">
                <h3>Get a personalised shortlist of 3 programmes</h3>
                <p>
                  Tell us your target role, budget, and timeline. We will shortlist
                  the 3 best-fit programmes from UGC-DEB approved options — no referral fees.
                </p>
                <button onClick={() => setModalOpen(true)}>Get my shortlist →</button>
              </div>
            </section>

            {/* Mode choice */}
            <section id="mode-choice" className="ib-section">
              <h2 className="ib-section-title">Which mode should you choose?</h2>
              <p className="ib-section-sub">Situation-based decision guide</p>

              <div className="ib-table-wrap">
                <table className="ib-mode-table">
                  <thead>
                    <tr>
                      <th>Your situation</th>
                      <th>Best mode / programme</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.situation}</td>
                        <td className="ib-mode-best">{r.best}</td>
                        <td style={{ fontSize: ".8rem", color: "var(--grey)" }}>{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ib-counsel-callout">
                <p>
                  <strong>Your situation does not fit any of the above?</strong> Our counsellors
                  handle edge cases — career breaks, non-traditional backgrounds, family business
                  specifics — in the free 30-minute call.
                </p>
                <button onClick={() => setModalOpen(true)}>Book free call</button>
              </div>
            </section>

            {/* Who should not choose */}
            <section id="who-not-fit" className="ib-section">
              <h2 className="ib-section-title">Who should NOT choose International Business</h2>
              <p className="ib-section-sub">Honest assessment — this specialisation is the wrong choice for these profiles</p>

              <ul className="ib-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            {/* 5-step framework */}
            <section id="how-to-decide" className="ib-section">
              <h2 className="ib-section-title">The 5-question framework counsellors use</h2>
              <p className="ib-section-sub">Walk through these before choosing a programme</p>

              <div className="ib-howto-grid">
                {FIVE_QUESTIONS.map((q, i) => (
                  <div key={i} className="ib-howto-card">
                    <div className="ib-howto-num">{q.step}</div>
                    <div>
                      <div className="ib-howto-title">{q.title}</div>
                      <div className="ib-howto-subtitle">{q.subtitle}</div>
                      <p className="ib-howto-body">{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faq" className="ib-section">
              <h2 className="ib-section-title">Frequently asked questions</h2>
              <p className="ib-section-sub">Answers from our counselling team — Q13–Q15 optimised for voice search</p>

              <div className="ib-faq-list">
                {FAQS.map((faq, i) => (
                  <details key={i} className="ib-faq-item">
                    <summary>
                      <span className="ib-faq-q-row">
                        {faq.q}
                        {faq.voice && <span className="ib-voice-badge">🎙 Voice</span>}
                      </span>
                      <span className="ib-faq-chevron">▼</span>
                    </summary>
                    <div className="ib-faq-body">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related resources */}
            <section className="ib-section" style={{ paddingTop: "1rem" }}>
              <h2 className="ib-section-title">Related guides and resources</h2>
              <div className="ib-related-grid">
                {RELATED.map((r, i) => (
                  <a key={i} href={r.href} className="ib-related-link">
                    {r.label} →
                  </a>
                ))}
              </div>
            </section>

            {/* Authors / Sources */}
            <div className="ib-sources">
              <strong>Sources and methodology</strong>
              Programme fees, approval status, and placement data are sourced from official university
              admission portals and UGC-DEB&apos;s approved institutions list (December 2025). Salary
              data is based on CollegeNCourses alumni tracking (2022-2025, n=740 International Business
              MBA graduates) and IIFT placement reports. This guide carries no paid placements —
              programme inclusion is based only on UGC-DEB approval status and alumni outcome data.
              <br /><br />
              <strong>Reviewed by:</strong> CollegeNCourses Senior Counselling Team · Last updated: December 2025
            </div>

          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="ib-cta-band">
        <div className="ib-wrap">
          <h2>Ready to shortlist your International Business MBA?</h2>
          <p>
            Our counsellors will match you to the right programme for your role, budget,
            and travel comfort — in a free 30-minute call. No referral fees. No paid rankings.
          </p>
          <button onClick={() => setModalOpen(true)}>Book free counselling call →</button>
        </div>
      </section>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source="spec-guide-international-business"
      />
    </>
  );
}
