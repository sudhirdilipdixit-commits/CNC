"use client";

import { useEffect, useRef, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "snapshot", label: "In 90 seconds" },
  { id: "what-it-is", label: "What this MBA is" },
  { id: "who-fits", label: "Who it fits" },
  { id: "curriculum", label: "Curriculum 2025-26" },
  { id: "careers", label: "Career paths & roles" },
  { id: "salary", label: "Salary data 2025-26" },
  { id: "top10", label: "Top 10 programmes" },
  { id: "mode", label: "Which mode fits" },
  { id: "faqs", label: "FAQs" },
];

const TAKEAWAYS: string[] = [
  `Strongest lifetime-earnings MBA specialization in India. CFO track at 15+ years regularly reaches ₹1+ crore base; no other specialization matches this compounding trajectory.`,
  `Fees: ₹1.3 lakh (ICFAI Distance) to ₹40 lakh (ISB PGPMAX Executive). Mainstream Online MBA median sits at ₹1.95 lakh for 24 months.`,
  `Median salaries (2025-26): ₹7 LPA for freshers, ₹16 LPA at 3-7 years, ₹32 LPA at 8-15 years. CFO track pushes ₹75 LPA to ₹1.5 crore at leadership levels.`,
  `Best-fit profile: CAs, CFAs, and commerce graduates adding management depth; analytical engineers switching to finance; FP&A executives wanting a promotion or consulting reset.`,
  `Poor-fit signal: If you specifically want to work at banks or NBFCs, choose Banking & Finance. If you want data-heavy analytics roles, choose Business Analytics.`,
  `Top pick by mode (2025-26): Symbiosis Online (strong Big-4 placements), NMIMS Global Access (strong Finance brand recognition in Indian corporates), OP Jindal Global (AACSB accredited for global mobility).`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12-15 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.3 L – ₹40 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ / AACSB where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹7 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹16 LPA" },
  { label: "Top employers", value: "TCS, Infosys, HUL, Reliance, McKinsey Finance, Deloitte, EY, PwC, KPMG, Flipkart, Amazon India, CRISIL, ICRA" },
  { label: "Fits best if", value: "CA / CFA adding management depth, or FP&A executive wanting promotion or consulting reset" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "CA / CFA / commerce graduate adding management depth",
    body: `CA, CFA Level 2/3, CS, or CMA professional wanting to add management vocabulary and leadership skills to a strong technical finance base. The Finance MBA adds corporate strategy, organisational behaviour, and business communication on top of accounting, audit, and tax depth. Online MBA fits well. This is the largest single fit-persona for Finance MBAs in 2025-26.`,
  },
  {
    title: "Analytical engineer or IT professional switching to corporate finance",
    body: `B.Tech graduate with 3-10 years' experience in software, data, or analytics wanting to switch into corporate finance, FP&A, or finance consulting (Big-4, McKinsey Finance, Deloitte). Finance MBA provides quantitative and financial modelling framework. Online MBA is the standard entry; Executive MBA at IIM or ISB is warranted if Tier-1 consulting is the specific goal.`,
  },
  {
    title: "Finance or FP&A executive wanting promotion or consulting reset",
    body: `Finance manager, FP&A lead, or Controller with 5-15 years' experience. Currently blocked by "MBA required" clause for VP Finance, CFO-1, or Chief Financial Officer. Or wants a Tier-1 consulting reset (McKinsey Finance, Deloitte S&O, EY Strategy). Online MBA works for the promotion; Executive MBA at IIM Ahmedabad PGPX or ISB PGPMAX is the tool for consulting reset.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to Corporate Finance",
  },
  {
    title: "Semester 2 — Finance core",
    subjects: "Corporate Finance, Financial Modelling (Excel-based), Financial Statement Analysis, Working Capital Management, Business Communication, Cost Accounting & Management Control",
  },
  {
    title: "Semester 3 — Advanced applications",
    subjects: "Investment Analysis & Portfolio Management, Mergers & Acquisitions, Derivatives & Risk Management, Valuation Methods (DCF, Comparables, LBO), International Finance, Behavioural Finance",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "AI in Finance (LLMs and GenAI for forecasting, reporting, and audit automation — new elective), FinTech & Digital Finance, ESG in Corporate Finance (new elective), Advanced Financial Modelling, Industry Capstone Project",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Corporate Finance & FP&A",
    path: "Finance Analyst → Senior Analyst → Finance Manager → Head of FP&A → VP Finance → CFO",
    employers: "Every large company — HUL, Reliance, Infosys, TCS, Flipkart, Zomato, Amazon India, ONGC",
    salary: "Largest single career path; stable, well-paying, structured progression",
  },
  {
    title: "Corporate Treasury",
    path: "Treasury Analyst → Treasury Manager → Head of Treasury → Group Treasurer",
    employers: "Large MNCs, IT services firms, diversified conglomerates",
    salary: "Premium on liquidity management and FX expertise; lean teams, high seniority",
  },
  {
    title: "Investment Analysis & Equity Research",
    path: "Research Associate → Research Analyst → Senior Analyst → Fund Manager",
    employers: "CRISIL, ICRA, Morningstar, Motilal Oswal, HDFC AMC, Mirae, SBI MF, DSP BlackRock",
    salary: "High pay; 60-70% of senior positions in India prefer CFA + Finance MBA combination",
  },
  {
    title: "Finance Consulting",
    path: "Analyst / Associate → Consultant → Manager → Senior Manager → Partner",
    employers: "Deloitte, EY, PwC, KPMG, McKinsey Finance Practice, Bain Corporate Finance, Accenture Finance",
    salary: "Highest starting salary at Tier-1 firms; brand-dependent access",
    note: "Tier-1 Finance consulting (McKinsey, Bain) primarily hires from Executive MBAs at IIM ABC, ISB, and XLRI.",
  },
  {
    title: "Corporate Strategy & M&A",
    path: "Strategy Analyst → Strategy Manager → Head of Corp Dev → CFO → CEO",
    employers: "Reliance Industries, Tata Group HQ, Mahindra HQ, L&T, Adani Group, Godrej Group",
    salary: "Premium path; small teams, high visibility, direct C-suite exposure",
  },
  {
    title: "CFO Track",
    path: "Finance Manager → VP Finance → Finance Director → CFO",
    employers: "Any company; 15+ years required; Mumbai/Delhi/Bengaluru dominant geographies",
    salary: "₹1.2 crore median base salary for listed company CFO roles in 2025-26",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹5 – 9 LPA", exec_t1: "₹10 – 18 LPA", exec_t2: "₹7 – 12 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹11 – 20 LPA", exec_t1: "₹22 – 40 LPA", exec_t2: "₹14 – 24 LPA" },
  { band: "Senior, 8-15 years", dist: "₹22 – 42 LPA", exec_t1: "₹42 – 75 LPA", exec_t2: "₹28 – 48 LPA" },
  { band: "Leadership, 15+ years", dist: "₹42 – 75 LPA", exec_t1: "₹75 LPA – ₹1.5 Cr", exec_t2: "₹48 – 90 LPA" },
  { band: "CFO track (top 5%)", dist: "₹65 LPA+", exec_t1: "₹1.5 Cr+", exec_t2: "₹80 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "PGPX (Finance focus)", university: "IIM Ahmedabad", mode: "Executive (residential)", duration: "12 mo", fee: "₹28 L", placement: "Very Strong (~100%)", strength: "Best brand for PE, consulting, and CFO reset" },
  { rank: 2, programme: "PGPMAX Finance Track", university: "ISB Hyderabad", mode: "Executive (residential)", duration: "15 mo", fee: "₹40 L", placement: "Very Strong (~98%)", strength: "AACSB accreditation; global finance mobility" },
  { rank: 3, programme: "EPGP (Finance elective)", university: "IIM Kozhikode", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~94%)", strength: "Best-value IIM with strong Big-4 placements" },
  { rank: 4, programme: "Distance MBA Finance", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.8 L", placement: "Strong (~66%)", strength: "Strongest Finance brand in Indian corporates" },
  { rank: 5, programme: "Online MBA Finance", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.55 L", placement: "Strong (~76%)", strength: "Live faculty; strong Big-4 alumni network" },
  { rank: 6, programme: "Online MBA Finance", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~55%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA Finance", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~56%)", strength: "Widest Finance elective set" },
  { rank: 8, programme: "Online MBA Finance (AACSB)", university: "OP Jindal Global (JGBS)", mode: "Online", duration: "24 mo", fee: "₹3.75 L", placement: "Moderate-Strong (~72%)", strength: "Only AACSB-accredited online option in top-10" },
  { rank: 9, programme: "Online MBA Finance", university: "Jain (Deemed) Online", mode: "Online", duration: "24 mo", fee: "₹1.55 L", placement: "Moderate (~60%)", strength: "Value + NAAC A++ accreditation" },
  { rank: 10, programme: "Distance MBA Finance", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.3 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "CA / CFA / commerce grad wanting management depth for corporate career", mode: "Online MBA (Symbiosis or NMIMS)", why: "Technical depth already present; MBA adds management breadth" },
  { situation: "Engineer or IT professional switching to Finance or FP&A", mode: "Online MBA or Executive MBA", why: "Online for self-directed; Executive if Tier-1 consulting is specific goal" },
  { situation: "FP&A exec 5+ years wanting Tier-1 consulting reset (McKinsey Finance, EY Strategy)", mode: "Executive MBA (IIM Ahmedabad PGPX or ISB PGPMAX)", why: "Brand-gated; consulting doesn't hire from Distance/Online for this level" },
  { situation: "Working Finance exec wanting VP Finance or CFO promotion", mode: "Distance or Online MBA", why: "Credential unlocks internal promotion; cost-ROI clear" },
  { situation: "Targeting investment banking or private equity", mode: "Executive Tier-1 (IIM ABC / ISB) or CFA + Online MBA", why: "IB and PE are almost entirely brand-gated or CFA-credentialed hiring" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable; placement support is self-driven" },
];

const NOT_FIT: string[] = [
  `You dislike Excel, numbers, financial models, or quantitative analysis. Finance MBA is the most numerically demanding specialization. Not a good fit if spreadsheets feel like punishment.`,
  `You prefer people-facing or creative work. Choose Marketing Management, Digital Marketing, or HR Management.`,
  `You specifically want to work at banks or NBFCs in a banking role. Choose Banking & Finance Management instead — it's 30-40% faster career acceleration inside financial services.`,
  `You want a data-and-analytics-heavy role (data scientist, machine learning, advanced analytics). Choose Business Analytics — Finance MBA is financial analysis, not data science.`,
  `You resist structured analytical thinking and prefer intuition-first decisions. Finance requires building mental models: DCF, unit economics, sensitivity analysis. Aspirants who resist this framework struggle significantly.`,
  `You're choosing Finance MBA "because it pays well." Finance does pay well at the senior level, but so does any specialization when done well. Pick because the work interests you — 15+ years of financial modelling, P&L management, and capital allocation decisions should be genuinely engaging to you, not something you'll tolerate.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target function within finance", body: `Corporate FP&A? Treasury? Investment analysis? Consulting? M&A? CFO track? The programme, the electives, and even the case-competition strategy differ across these. Vague targets deliver vague outcomes.` },
  { step: 2, title: "Confirm whether you already hold a technical finance credential", body: `If you are a CA, CFA, or CMA, an Online MBA is likely the right complement — you have technical depth, the MBA adds management breadth. If you do not, expect a steeper first-year curve; Executive MBA may be justified if you want brand equity to close the gap.` },
  { step: 3, title: "Check whether Tier-1 consulting or PE is a realistic goal", body: `If yes, IIM Ahmedabad PGPX, ISB PGPMAX, or IIM Bangalore Executive justifies ₹22-40 lakh. If not, Online MBA is far better ROI. The regret pattern is aspirants stretching to Executive without a specific consulting-reset opportunity in view.` },
  { step: 4, title: "Audit whether you enjoy structured analytical thinking", body: `Finance requires building mental models: DCF, unit economics, sensitivity analysis, scenario modelling. Aspirants who love breaking problems down structurally do exceptionally well. Aspirants who prefer intuition-first decision-making struggle.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.3 L to ₹40 L is the full range. Most working professionals fit ₹1.95 L to ₹3 L Online. Stretching to Executive without a specific Tier-1 reset opportunity is the most expensive regret pattern we track in this specialization.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Finance Management valid in India?", a: `Yes. An Online MBA in Finance from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.` },
  { q: "Should I do a CA or an MBA in Finance?", a: `Both, if you can. CA delivers technical depth (accounting, audit, tax). Finance MBA delivers management breadth (corporate finance, strategy, leadership). CAs who add a Finance MBA report 40-55% salary progression over 3 years versus 20-25% for CA-only. If choosing one: CA for technical career; Finance MBA for management or consulting.` },
  { q: "How much does a Finance Management MBA cost in India in 2025-26?", a: `Fees range from ₹1.3 lakh (ICFAI Distance) to ₹40 lakh (ISB PGPMAX Executive). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.55 lakh and ₹2.55 lakh total. IIM Ahmedabad PGPX is ₹28 lakh.` },
  { q: "What is the salary after an Online MBA in Finance?", a: `Median 2025-26 salary is ₹7 LPA for freshers, ₹16 LPA at 3-7 years, ₹32 LPA at 8-15 years. CFO-track roles at 15+ years push ₹75 LPA to ₹1.5 crore. Investment banking Associate roles at Tier-1 firms carry 30-60% premiums above these bands.` },
  { q: "Is a Finance MBA better than an MBA in Business Analytics?", a: `They serve different careers. Finance MBAs go into corporate finance, FP&A, treasury, and finance consulting. Business Analytics MBAs go into data-driven decision-making across any function. Business Analytics has higher entry salaries in 2025-26 (₹8.5 LPA median vs ₹7 LPA for Finance) but Finance has stronger senior-level compounding — CFO tracks reach ₹1+ crore.` },
  { q: "Can I move into investment banking after a Distance or Online MBA in Finance?", a: `Difficult. Investment banking hires almost exclusively from IIM Ahmedabad/Bangalore/Kolkata, ISB, XLRI, and CFA charterholders. If IB is the target, Executive MBA at Tier-1 or CFA (with any UGC-DEB approved MBA) is the practical path.` },
  { q: "Can I do a Finance MBA without a commerce background?", a: `Yes. Roughly 35% of Finance MBA enrolments at Symbiosis SCOL and NMIMS in 2024-25 came from engineering, IT, or science backgrounds. The MBA teaches finance from first principles. Expect the first 4-6 months to feel steep if accounting is unfamiliar.` },
  { q: "Which universities have the best placement records for Finance MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Ahmedabad PGPX (~100%), ISB PGPMAX (~98%), IIM Kozhikode EPGP (~94%), and Symbiosis Online (~76%). Big-4 placements (Deloitte, EY, PwC, KPMG) are the dominant employer segment for Online MBAs.` },
  { q: "How is AI affecting Finance careers in India?", a: `AI is augmenting rather than replacing Finance roles. Generative AI now handles financial reporting drafting, first-cut sensitivity modelling, and standard forecasting. What remains human: judgment calls on capital allocation, strategic partnering with business teams, and communicating financial decisions to boards. Finance MBA graduates in 2025-27 should expect interview questions on AI-augmented financial modelling skills.` },
  { q: "Can I switch to private equity or venture capital after a Finance MBA?", a: `Difficult through Distance/Online MBA alone. PE and VC firms hire predominantly from IIM ABC, ISB, XLRI, top overseas MBAs, or from Tier-1 investment banks and consulting firms. A Finance Executive MBA plus 3-5 years of relevant experience is the standard path.` },
  { q: "What are education loan options for a Finance MBA?", a: `For Online MBAs at ₹1.55-3 lakh, most working professionals pay from monthly salary. For Executive MBAs at ₹15-40 lakh, education loans are widely available: SBI (up to ₹1.5 crore), HDFC Credila (up to ₹75 lakh), ICICI Bank, Avanse, Auxilo at 9.5-12.5% in 2025-26.` },
  { q: "How does CollegeNCourses help me choose a Finance MBA?", a: `Our counsellors match you to programmes based on your target function (FP&A vs consulting vs IB vs CFO track), existing credentials (CA, CFA, engineering), budget, and timeline. Free 30-minute call. No paid referral affects our recommendation.` },
  { q: "Is Finance MBA a good career option?", a: `Yes, especially for lifetime earnings and career longevity. Finance roles are structurally embedded in every company and remain in demand across economic cycles. Entry salaries are competitive; senior-level compounding is the strongest of any MBA specialization — CFO track regularly reaches ₹1+ crore.`, voice: true },
  { q: "What is the salary of MBA Finance graduate in India?", a: `Median starting salary after an Online MBA in Finance is ₹7 LPA in India in 2025-26. It scales to ₹16 LPA at 3-7 years, ₹32 LPA at 8-15 years, and ₹75 LPA+ at CFO track. Executive MBA from IIM Ahmedabad or ISB pushes these numbers 2-3x higher.`, voice: true },
  { q: "Which is the best online MBA for Finance in India?", a: `The three most-recommended Online MBAs for Finance in 2025-26 are Symbiosis Centre for Online Learning (strong Big-4 placements), NMIMS Global Access (strongest Finance brand recognition in Indian corporates), and OP Jindal Global Business School (AACSB accredited for international mobility).`, voice: true },
  { q: "Do employers actually value Distance and Online Finance MBAs in 2025-26?", a: `Yes, in corporate finance, FP&A, Big-4 finance consulting, mid-tier consulting, and MNCs. Tier-1 IB, PE, and MBB consulting still prefer Executive MBAs from IIM ABC/ISB/XLRI. What matters more than mode is your quantitative track record, financial modelling proficiency, and industry-specific project work.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Banking & Finance Management: The Honest Guide", href: "/specializations-guide/banking-finance/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function FinanceGuideClient() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = TOC_ITEMS.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fm-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .fm-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .fm-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .fm-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .fm-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .fm-bc-inner li:last-child::after{content:""}
        .fm-bc-inner a{color:var(--navy);text-decoration:none}
        .fm-bc-inner a:hover{text-decoration:underline}
        .fm-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .fm-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .fm-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem}
        .fm-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .fm-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .fm-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .fm-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .fm-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .fm-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .fm-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.fm-layout{grid-template-columns:1fr}}
        .fm-toc-sticky{position:sticky;top:80px}
        .fm-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .fm-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .fm-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .fm-toc-desktop nav a.fm-active,.fm-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .fm-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .fm-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .fm-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.fm-toc-mobile{display:none}}
        @media(max-width:900px){.fm-toc-desktop{display:none}.fm-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .fm-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .fm-toc-mobile summary::after{content:"▾"}
        .fm-toc-mobile[open] summary::after{content:"▴"}
        .fm-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .fm-toc-mobile a:hover{background:var(--mist)}
        .fm-section{margin-bottom:3.5rem;padding-top:.5rem}
        .fm-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .fm-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .fm-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .fm-snapshot-grid{display:grid;grid-template-columns:1fr 280px;gap:2rem}
        @media(max-width:700px){.fm-snapshot-grid{grid-template-columns:1fr}}
        .fm-snapshot-body{font-size:.95rem;line-height:1.65;color:var(--charcoal)}
        .fm-snapshot-body p{margin:0 0 .9rem}
        .fm-snapshot-card{background:var(--pale-navy,#f0f4ff);border-radius:8px;overflow:hidden}
        .fm-snapshot-card table{width:100%;border-collapse:collapse;font-size:.87rem}
        .fm-snapshot-card td{padding:.6rem .9rem;border-bottom:1px solid #dde3ef;vertical-align:top}
        .fm-snapshot-card td:first-child{font-weight:600;white-space:nowrap;color:var(--navy);width:45%}
        .fm-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .fm-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .fm-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .fm-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .fm-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .fm-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .fm-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .fm-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .fm-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .fm-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .fm-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .fm-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .fm-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .fm-role-meta strong{color:var(--charcoal)}
        .fm-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .fm-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .fm-table-wrap{overflow-x:auto}
        .fm-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .fm-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .fm-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .fm-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .fm-col-highlight{font-weight:600;background:#fef9ec!important}
        .fm-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .fm-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .fm-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .fm-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .fm-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .fm-rank.top3{background:var(--yellow);color:var(--navy)}
        .fm-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .fm-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .fm-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .fm-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .fm-mode-rec{font-weight:700;color:var(--navy)}
        .fm-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .fm-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .fm-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .fm-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .fm-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .fm-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .fm-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .fm-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .fm-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .fm-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .fm-faq-list summary::-webkit-details-marker{display:none}
        .fm-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .fm-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .fm-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .fm-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .fm-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .fm-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .fm-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .fm-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .fm-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .fm-cta-band button:hover{opacity:.88}
        .fm-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .fm-below-cta{text-align:center;margin-top:1.25rem}
        .fm-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.fm-cta-row{flex-direction:column}.fm-salary-table th,.fm-salary-table td,.fm-top10-table th,.fm-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="fm-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="fm-breadcrumb" aria-label="Breadcrumb">
        <div className="fm-wrap">
          <ol className="fm-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Finance Management</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="fm-hero">
        <div className="fm-wrap">
          <p className="fm-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="fm-h1">MBA in Finance Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="fm-sub">Fees from ₹1.3 lakh to ₹40 lakh. Real salary data from 389 alumni across corporate finance, FP&amp;A, treasury, investment analysis, and consulting roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="fm-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="fm-cta-row">
            <button className="fm-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="fm-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="fm-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="fm-wrap">
        <div className="fm-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="fm-toc-sticky">
              <details className="fm-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="fm-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "fm-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="fm-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="fm-section">
              <h2>Key takeaways</h2>
              <ul className="fm-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="fm-section">
              <h2>Finance Management MBA, in 90 seconds</h2>
              <div className="fm-snapshot-grid">
                <div className="fm-snapshot-body">
                  <p>An MBA in Finance Management trains you to manage financial decisions at any organisation — corporate finance, financial planning and analysis (FP&amp;A), investment analysis, treasury, mergers and acquisitions, and finance consulting. As of 2025-26, it's the MBA specialization with the strongest lifetime-earnings compounding — the CFO track at 15+ years regularly reaches ₹1 crore base.</p>
                  <p>Fees range from ₹1.3 lakh (ICFAI Distance) to ₹40 lakh (ISB PGPMAX Executive), with the mainstream Online MBA median at ₹1.95 lakh. Median entry-level salary for a Finance MBA graduate in 2025-26 stands at ₹7 lakh per annum for freshers, ₹16 lakh for mid-level (3-7 years' experience), and ₹32 lakh for senior roles (8-15 years). CFO-track roles at 15+ years push ₹75 LPA to ₹1.5 crore.</p>
                </div>
                <div className="fm-snapshot-card">
                  <table>
                    <tbody>
                      {QUICK_FACTS.map((f) => (
                        <tr key={f.label}><td>{f.label}</td><td>{f.value}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* What it is */}
            <section id="what-it-is" className="fm-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Finance Management, at postgraduate level, is the discipline of making and implementing financial decisions across an organisation — capital allocation, financial planning, investment appraisal, risk management, treasury, and strategic finance. Everything else — DCF models, sensitivity analysis, capital structure decisions, M&amp;A valuations — sits inside that discipline.</p>
              <p>What makes it different from a Banking &amp; Finance MBA is <em>function versus sector</em>. Finance Management trains you for the finance function at any company — FMCG, IT services, manufacturing, consulting, or e-commerce. Banking &amp; Finance trains you specifically for financial services. Finance Management is more portable across sectors; Banking &amp; Finance delivers faster acceleration if you're committed to the financial services sector.</p>
              <div className="fm-callout">
                <em>A misconception we hear often in CollegeNCourses counselling calls: "Finance MBA and CA are the same thing." They are not. CA is a technical qualification in accounting, audit, and tax. Finance MBA is a management qualification in corporate finance, strategic decision-making, and leadership. The most powerful combination in the market is CA + Finance MBA — it delivers both technical depth and management breadth, and CAs who add a Finance MBA report 40-55% salary acceleration over 3 years versus 20-25% for CA-only. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="fm-section">
              <h2>Who this specialization is built for</h2>
              <p>Finance Management MBAs work best for three broad profiles.</p>
              <div className="fm-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="fm-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="fm-section">
              <h2>What a 2025-26 Finance Management MBA actually teaches</h2>
              <p>A 2025-26 Finance Management MBA covers management foundations, then goes deep on corporate finance, financial statement analysis, financial modelling, working capital management, investment analysis and portfolio management, M&amp;A, derivatives and risk management, valuation methods, and international finance. The 2025 additions are AI in Finance (LLMs and GenAI for financial analysis) and ESG in Corporate Finance.</p>
              <div className="fm-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="fm-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="fm-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> AI in Finance — covering LLMs and GenAI for financial forecasting, automated reporting, and audit efficiency — is now offered as an elective at IIM Kozhikode EPGP, Symbiosis SCOL, NMIMS, Jain Online, and OP Jindal Global. ESG in Corporate Finance (carbon accounting, sustainability-linked debt instruments, EU CBAM compliance for Indian exporters) is now offered at ISB, IIM programmes, Symbiosis, and NMIMS. Both are becoming interview-tested at Big-4 Finance practice and McKinsey Finance interviews.
                </em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="fm-section">
              <h2>The roles a Finance Management MBA leads to</h2>
              <p>Finance Management opens six distinct career paths — from the largest and most accessible (Corporate Finance / FP&amp;A) to the highest-ceiling (CFO track).</p>
              <div className="fm-callout">
                <em>From our 2024-25 counselling desk: The CFO track is the highest-ceiling career path for any MBA specialization in India. Listed company CFO median base in 2025-26 is ₹1.2 crore (excluding ESOPs and bonuses). Unlisted company and PE-backed CFOs vary significantly but the ₹80-100 lakh base is common by year 15-20. Finance Management is the primary on-ramp to this track — 68% of Indian CFOs surveyed by us in 2024 held a Finance MBA or equivalent as their primary management credential. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="fm-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="fm-role-card">
                    <h3>{r.title}</h3>
                    <p className="fm-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="fm-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="fm-role-salary">{r.salary}</p>
                    {r.note && <p className="fm-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="fm-section">
              <h2>What a Finance Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Finance Management sits at ₹7 lakh per annum for freshers (0-2 years' experience), ₹16 lakh for mid-level (3-7 years), and ₹32 lakh for senior roles (8-15 years). Finance has the strongest senior-level compounding of any specialization we track — the distance between median mid-career and CFO-track is wider here than any other path.</p>
              <div className="fm-table-wrap">
                <table className="fm-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 IIM / ISB)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="fm-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fm-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. Investment banking Associate and PE roles carry 30-60% premiums above these bands; ESOP and bonus compensation not reflected.</p>
              <div className="fm-callout">
                <em><strong>What these numbers do not tell you:</strong> Sector of employment dominates. A VP Finance at an MNC in Mumbai earns significantly more than the same title at a mid-size listed company in a Tier-2 city. Big-4 Finance consulting pays well but has a longer path to partner. Corporate Strategy / M&amp;A has the highest variance — but the highest ceiling at senior levels outside of IB. Know your sector before picking your programme.
                </em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="fm-section">
              <h2>The 10 Finance Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 389 Finance alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="fm-table-wrap">
                <table className="fm-top10-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Programme</th>
                      <th>University</th>
                      <th>Mode</th>
                      <th>Duration</th>
                      <th>Fee</th>
                      <th>Placement</th>
                      <th>Key strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP10_ROWS.map((r) => (
                      <tr key={r.rank}>
                        <td><span className={`fm-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
                        <td>{r.programme}</td>
                        <td>{r.university}</td>
                        <td>{r.mode}</td>
                        <td>{r.duration}</td>
                        <td>{r.fee}</td>
                        <td>{r.placement}</td>
                        <td>{r.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fm-source">As of 2025-26. Fees are total programme cost. ISB PGPMAX at ₹40 lakh is the highest-fee programme across all specialization guides — warranted only for aspirants with a specific Tier-1 consulting reset or global mobility target. Placement support ratings from CollegeNCourses internal alumni tracking.</p>
              <div className="fm-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="fm-section">
              <h2>Distance, Online, or Executive: which mode fits your Finance career</h2>
              <p>The mode decision for Finance Management hinges heavily on whether your goal is an internal corporate promotion or a Tier-1 external reset.</p>
              <div className="fm-callout">
                <em>From our counselling records 2023-25: The most common regret in Finance MBA mode selection is aspirants who stretched to ISB PGPMAX (₹40 lakh) without a specific consulting-reset opportunity in view. ISB Finance alumni consistently report strong outcomes when they had a clear Tier-1 target in mind before enrolling. Without that, the Online MBA at ₹1.95-3 lakh delivers 80% of the corporate-promotion ROI at 5-10% of the cost. Mode regret runs in both directions — some aspirants also underinvest when a Tier-1 target was genuinely in reach. Know your target first. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="fm-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="fm-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="fm-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick a Finance Management MBA</h2>
              <p>We include this section because most guides won't.</p>
              <ul className="fm-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if a Finance Management MBA is right for you: 5 questions</h2>
              <div className="fm-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="fm-howto-card">
                    <div className="fm-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="fm-section">
              <h2>Frequently asked questions</h2>
              <div className="fm-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="fm-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="fm-section">
              <h2>Go deeper</h2>
              <ul className="fm-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="fm-cta-band">
        <div className="fm-wrap">
          <h2>Ready to shortlist your Finance Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target function, existing credentials (CA, CFA, engineering), budget, and timeline. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-finance" />
    </>
  );
}
