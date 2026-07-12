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
  `Highest transition-value MBA for manufacturing engineers. Alumni median jumped from ₹6 LPA to ₹18 LPA over 4 years — the sharpest salary transition of any specialization we track.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (IIM Kozhikode Ops Executive). Mainstream Online MBA median sits at ₹1.85 lakh for 24 months.`,
  `Median salaries (2025-26): ₹6.5 LPA for freshers, ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years. COO track pushes ₹75 LPA+ at leadership levels.`,
  `Best-fit profile: Manufacturing or industrial engineers wanting management titles; existing ops professionals wanting promotion; consulting aspirants targeting Ops Excellence practices; and supply chain managers wanting COO-track roles.`,
  `Poor-fit signal: If you prefer creative, brand-facing, or purely financial work, choose Marketing, Digital Marketing, or Finance instead.`,
  `Top pick by mode (2025-26): Symbiosis Online, NMIMS Distance, IIM Kozhikode EPGP Ops track (Executive).`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹22 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹6.5 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹15 LPA" },
  { label: "Top employers", value: "TATA Motors, Reliance, Mahindra, Bajaj Auto, Ashok Leyland, TATA Steel, HUL, Nestle, Amazon, Flipkart, Deloitte Ops, McKinsey Operations" },
  { label: "Fits best if", value: "Manufacturing engineer or existing ops professional wanting management title" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "Manufacturing or industrial engineer moving into management",
    body: `B.Tech Mechanical, Production, Industrial, or Chemical Engineer with 3-10 years' experience at TATA Motors, Bajaj Auto, Mahindra, Bharat Forge, or TATA Steel. Currently a Senior Engineer or Shop Floor Manager. Wants to move into Plant Head, Head of Manufacturing, or Ops consulting. Distance or Online MBA fits perfectly. This is the largest single fit-persona for Ops MBAs in 2025-26.`,
  },
  {
    title: "Existing operations professional wanting promotion",
    body: `Two to twelve years' experience in operations at any company — production planning, quality, supply chain, procurement, warehouse. Currently blocked by "MBA required" clause for Head of Operations or Director level. Distance or Online MBA delivers the credential. Sector agnostic — works across manufacturing, e-commerce, consumer goods, tech services.`,
  },
  {
    title: "Consulting aspirant targeting Operations Excellence practices",
    body: `Existing consultant, engineer, or business analyst wanting to move into Ops consulting at Deloitte, McKinsey Operations Excellence, Bain Operations, or Kearney. Executive MBA at IIM Kozhikode Ops track, Great Lakes, or XLRI Ops fits. This is the highest-paying path for the right profile.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to Operations Management",
  },
  {
    title: "Semester 2 — Operations core",
    subjects: "Operations Strategy, Supply Chain Basics, Quality Management (TQM, Six Sigma foundations), Production Planning & Control, Business Communication, Operations Research",
  },
  {
    title: "Semester 3 — Applied operations",
    subjects: "Lean Manufacturing, Project Management, Service Operations, Operations Analytics (Excel + Power BI), Manufacturing Systems, Business Process Management, Capacity Planning",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "Industry 4.0 (IoT, digital twins, predictive maintenance — new elective), Sustainability & ESG in Operations (new elective), Advanced Six Sigma (Green Belt pathway), Supply Chain 4.0, Industry Capstone Project",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Manufacturing Operations Management",
    path: "Production Supervisor → Plant Engineer → Plant Manager → Plant Head → VP Manufacturing",
    employers: "TATA Motors, Bajaj Auto, Mahindra, TATA Steel, Bharat Forge, JSW Steel, Reliance, Bharat Petroleum",
    salary: "Highest transition-value career for engineering talent",
  },
  {
    title: "Supply Chain & Procurement",
    path: "Supply Chain Analyst → SCM Manager → Head of Supply Chain → CPO / CSCO",
    employers: "Amazon, Flipkart, Reliance Retail, Walmart, HUL, ITC, TATA Motors",
    salary: "Fastest-growing career family in India as of 2025-26 due to e-commerce expansion",
  },
  {
    title: "Quality & Six Sigma",
    path: "Quality Engineer → Six Sigma Black Belt → Master Black Belt → Head of Quality → COO",
    employers: "Manufacturing companies, IT services (TCS, Infosys, Wipro have large Six Sigma populations), consulting firms",
    salary: "Six Sigma certifications amplify progression; COO-track is accessible",
  },
  {
    title: "Operations Consulting",
    path: "Consultant → Senior Consultant → Manager → Principal → Partner",
    employers: "Deloitte Ops, McKinsey Operations, Bain Ops, Kearney, EY Ops, PwC Ops",
    salary: "Highest paying path; best accessed through Executive MBA at IIM Kozhikode, Great Lakes, XLRI",
  },
  {
    title: "Service Operations Management",
    path: "Ops Analyst → Ops Manager → Head of Ops → COO",
    employers: "Banks and NBFCs, Apollo Hospitals, Fortis, IHCL, hotel chains, IT services",
    salary: "Growing as India's service sector expands; steady progression",
  },
  {
    title: "E-commerce & Retail Operations",
    path: "Ops Associate → Ops Manager → Regional Ops Head → VP Operations",
    employers: "Amazon, Flipkart, Meesho, Nykaa, Reliance Retail, DMart, Zomato, Swiggy",
    salary: "Fast-growth career family driven by India's e-commerce boom",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹5 – 8 LPA", exec_t1: "₹9 – 15 LPA", exec_t2: "₹6 – 10 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹10 – 18 LPA", exec_t1: "₹20 – 34 LPA", exec_t2: "₹13 – 22 LPA" },
  { band: "Senior, 8-15 years", dist: "₹20 – 38 LPA", exec_t1: "₹38 – 65 LPA", exec_t2: "₹25 – 45 LPA" },
  { band: "Leadership, 15+ years", dist: "₹38 – 65 LPA", exec_t1: "₹65 LPA – ₹1.2 Cr", exec_t2: "₹45 – 80 LPA" },
  { band: "COO track (top 5%)", dist: "₹55 LPA+", exec_t1: "₹1.2 Cr+", exec_t2: "₹75 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "Executive MBA (Ops track)", university: "IIM Kozhikode EPGP", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~95%)", strength: "Best-value IIM ops track" },
  { rank: 2, programme: "Executive MBA (Ops focus)", university: "IIM Ahmedabad PGPX", mode: "Executive (residential)", duration: "12 mo", fee: "₹28 L", placement: "Very Strong (~100%)", strength: "Top brand for ops consulting reset" },
  { rank: 3, programme: "Executive MBA (Ops elective)", university: "XLRI Jamshedpur", mode: "Executive (weekend)", duration: "15 mo", fee: "₹22 L", placement: "Very Strong (~96%)", strength: "Legacy strength in ops + industrial relations" },
  { rank: 4, programme: "Online MBA Operations Management", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.55 L", placement: "Strong (~74%)", strength: "Live faculty, strong TATA / Reliance alumni" },
  { rank: 5, programme: "Distance MBA Operations Management", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.8 L", placement: "Moderate-Strong (~63%)", strength: "Industry-tied projects with manufacturers" },
  { rank: 6, programme: "Online MBA Operations Management", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~55%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA Operations Management", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~56%)", strength: "Widest operations electives" },
  { rank: 8, programme: "Online MBA Operations Management", university: "Jain (Deemed) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~58%)", strength: "Value + strong accreditation (NAAC A++)" },
  { rank: 9, programme: "Online MBA Operations Management", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~52%)", strength: "Strong newer entrant" },
  { rank: 10, programme: "Distance MBA Operations Management", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Manufacturing engineer at TATA/Mahindra/Reliance wanting Plant Manager promotion", mode: "Distance or Online MBA", why: "Credential unlocks promotion; large fee premium unnecessary" },
  { situation: "Existing ops manager wanting Head of Ops or Director role", mode: "Online MBA", why: "Live faculty + cohort discussions add sector breadth" },
  { situation: "Consultant or ops professional targeting Deloitte/McKinsey Ops reset", mode: "Executive MBA (IIM Kozhikode EPGP or IIM Ahmedabad PGPX)", why: "Consulting placement is brand-gated" },
  { situation: "E-commerce ops professional (Amazon/Flipkart) wanting VP role", mode: "Online MBA", why: "Portfolio matters more than brand in tech ops" },
  { situation: "Fresh engineering grad wanting to enter operations career", mode: "Online MBA", why: "Executive MBA requires 3+ years; Online delivers structured entry" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You prefer creative or brand-facing work. Choose Marketing Management or Digital Marketing.`,
  `You want a purely financial or investment career. Choose Finance Management or Banking & Finance.`,
  `You resist metrics, process discipline, and continuous measurement. Operations is fundamentally about measurement and improvement. If daily KPI reviews feel oppressive, you'll struggle.`,
  `You want minimum shop-floor or facility exposure. Even senior Ops roles at manufacturing majors involve regular plant visits and factory-floor time.`,
  `You want to become a CMO or work in customer-facing strategy. Choose Marketing specializations.`,
  `You're choosing Operations because "manufacturing jobs are safe." Manufacturing is transforming rapidly with Industry 4.0. If you resist learning new tools and paradigms every 2-3 years, you'll be left behind.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target segment — manufacturing, services, e-commerce, or consulting", body: `Each segment has different economics. Manufacturing pays steadily with stability. E-commerce pays competitively with growth. Consulting pays highest but requires brand credentials. Know which one you're targeting before choosing your programme.` },
  { step: 2, title: "Confirm whether Tier-1 Ops consulting reset is a realistic goal", body: `If yes → Executive MBA at IIM Kozhikode EPGP, IIM Ahmedabad PGPX, or XLRI justifies the ₹15-28 lakh. If not → Online MBA is far better ROI. The regret pattern here is aspirants stretching to Executive without a specific consulting-reset opportunity in view.` },
  { step: 3, title: "Audit your interest in Lean, Six Sigma, and process improvement", body: `Operations MBA rewards aspirants who genuinely enjoy process improvement — running experiments, measuring outcomes, iterating. If DMAIC (Define, Measure, Analyse, Improve, Control) sounds interesting, you'll thrive. If it sounds tedious, choose a different specialization.` },
  { step: 4, title: "Check whether you can commit to plant visits or on-site operational exposure", body: `Even Online Operations MBAs at Symbiosis and NMIMS include mandatory plant-visit capstones. If your work or family situation makes this impossible, plan alternatives (virtual industry projects) or reconsider the specialization.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹28 L is the full range. Most working professionals fit ₹1.85 L to ₹2.55 L Online. Stretching to Executive without a specific Tier-1 consulting reset in view is the most expensive regret we track.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Operations Management valid in India?", a: `Yes. An Online MBA in Operations from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, PSU manufacturing promotions, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.` },
  { q: "Is Operations MBA better than Supply Chain MBA?", a: `Operations is broader — it includes supply chain plus manufacturing, quality, service ops, and project management. Supply Chain is a deeper subset focused specifically on physical goods movement. If you're clear you want supply chain career specifically (Amazon logistics, Reliance Retail, Flipkart), Supply Chain MBA is sharper. If you want flexibility across ops functions, Operations MBA is more portable.` },
  { q: "How much does an Operations Management MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹28 lakh (IIM Ahmedabad PGPX). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.4 lakh and ₹2.55 lakh total. IIM Kozhikode EPGP Ops track is ₹15 lakh.` },
  { q: "What is the salary after an Online MBA in Operations?", a: `Median 2025-26 salary is ₹6.5 LPA for freshers, ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years. Ops consulting Manager roles at Deloitte and McKinsey Operations push ₹40-55 LPA at 8-10 years. COO track at 15+ years reaches ₹75 LPA+.` },
  { q: "Do I need Six Sigma certification alongside the MBA?", a: `Not required, but highly value-adding. Many Online MBAs (Symbiosis SCOL, NMIMS, Manipal) bundle Six Sigma Green Belt certification. Adding Six Sigma Black Belt separately (₹40k-80k typically) after the MBA amplifies career acceleration. Manufacturing employers actively prefer Green Belt + MBA combinations.` },
  { q: "What is the difference between an MBA in Operations and an MTech in Industrial Engineering?", a: `MBA in Operations is management-focused — you'll become a manager or consultant. MTech in Industrial Engineering is technical-focused — you'll become a technical expert on manufacturing systems, ergonomics, and industrial optimisation. Salaries at senior levels are similar; career paths differ.` },
  { q: "Can I do an Operations MBA without a manufacturing background?", a: `Yes. Roughly 40% of Operations MBA enrolments at Symbiosis SCOL and NMIMS in 2024-25 came from non-manufacturing backgrounds — IT services, e-commerce, banking. The MBA teaches operations from first principles. Expect the first 3-4 months to feel steep if manufacturing terminology is unfamiliar.` },
  { q: "Which universities have the best placement records for Operations MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates for Operations graduates were at IIM Ahmedabad PGPX (~100%), XLRI (~96%), IIM Kozhikode EPGP (~95%), and Symbiosis SCOL (~74%). Executive tracks lead by wide margin for Tier-1 consulting placements.` },
  { q: "How is Industry 4.0 affecting Operations careers in India?", a: `Substantially. IoT sensors, digital twins, and AI-powered predictive maintenance are restructuring manufacturing jobs. Junior QC and shop-floor supervision roles are contracting; roles requiring Industry 4.0 fluency, data interpretation, and change management are growing. Operations MBAs in 2025-27 should expect evaluation on smart manufacturing, digital twins, and MES/ERP systems knowledge — interview-critical at major manufacturers.` },
  { q: "Can I move to Operations consulting after a Distance or Online MBA?", a: `For mid-tier Ops consulting (Deloitte, EY, PwC), yes — moderately, though harder than from an Executive MBA. For Tier-1 Ops consulting (McKinsey Operations Excellence, Bain Ops, Kearney), difficult — these firms hire predominantly from Executive MBAs at IIM Kozhikode, IIM Ahmedabad, and XLRI. If Tier-1 Ops consulting is the goal, Executive MBA is the practical path.` },
  { q: "What are education loan options for an Operations MBA?", a: `For Online MBAs at ₹1.85-2.55 lakh, most working professionals pay from monthly salary. For Executive MBAs at ₹15-28 lakh, education loans are widely available: SBI (up to ₹1.5 crore), HDFC Credila (up to ₹75 lakh), ICICI Bank, Avanse, Auxilo. Interest rates 9.5-12.5% in 2025-26. Large manufacturers reimburse Executive MBAs against 2-3 year service-back.` },
  { q: "How does CollegeNCourses help me choose?", a: `Our counsellors match you to programmes based on your target segment (manufacturing, services, e-commerce, or consulting), existing certifications (Six Sigma, PMP), Tier-1 consulting aspirations, budget, and timeline. Free 30-minute call. No paid referral affects our recommendation.` },
  { q: "Is Operations MBA a good career option?", a: `Yes, particularly for engineers and existing operations professionals. India's manufacturing push (PLI schemes, semiconductor initiatives, EV manufacturing) plus e-commerce expansion is driving structural Ops hiring. Median salaries are healthy and career progression to COO / VP Operations reaches ₹75 LPA+.`, voice: true },
  { q: "How much salary after operations MBA?", a: `Median starting salary after an Online MBA in Operations Management is ₹6.5 LPA in India in 2025-26. It scales to ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years, and ₹75 LPA+ at COO level. Executive MBA from IIM Kozhikode or IIM Ahmedabad pushes these numbers 2-3x higher.`, voice: true },
  { q: "Which is the best MBA for operations management in India?", a: `The three most-recommended MBAs for Operations in 2025-26 are IIM Kozhikode EPGP Ops track (Executive, best-value IIM ops), Symbiosis Centre for Online Learning (Online, strong manufacturer alumni), and NMIMS Global Access (Distance/Online, strongest industry-tied projects with manufacturers).`, voice: true },
  { q: "Do employers actually value Distance and Online Operations MBAs in 2025-26?", a: `Yes, especially in manufacturing (TATA, Reliance, Mahindra, Bajaj), e-commerce (Amazon, Flipkart), and IT services (TCS, Infosys, Wipro Ops functions). Tier-1 Ops consulting still prefers Executive MBAs from IIMs, XLRI, or Great Lakes. What matters more than mode is your Six Sigma / Lean certification portfolio and shop-floor exposure.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Supply Chain Management: The Honest Guide", href: "/specializations-guide/supply-chain/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function OperationsGuideClient() {
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
        .om-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .om-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .om-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .om-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .om-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .om-bc-inner li:last-child::after{content:""}
        .om-bc-inner a{color:var(--navy);text-decoration:none}
        .om-bc-inner a:hover{text-decoration:underline}
        .om-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .om-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .om-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem}
        .om-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .om-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .om-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .om-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .om-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .om-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .om-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.om-layout{grid-template-columns:1fr}}
        .om-toc-sticky{position:sticky;top:80px}
        .om-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .om-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .om-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .om-toc-desktop nav a.om-active,.om-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .om-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .om-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .om-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.om-toc-mobile{display:none}}
        @media(max-width:900px){.om-toc-desktop{display:none}.om-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .om-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .om-toc-mobile summary::after{content:"▾"}
        .om-toc-mobile[open] summary::after{content:"▴"}
        .om-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .om-toc-mobile a:hover{background:var(--mist)}
        .om-section{margin-bottom:3.5rem;padding-top:.5rem}
        .om-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .om-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .om-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .om-snapshot-grid{display:grid;grid-template-columns:1fr 280px;gap:2rem}
        @media(max-width:700px){.om-snapshot-grid{grid-template-columns:1fr}}
        .om-snapshot-body{font-size:.95rem;line-height:1.65;color:var(--charcoal)}
        .om-snapshot-body p{margin:0 0 .9rem}
        .om-snapshot-card{background:var(--pale-navy,#f0f4ff);border-radius:8px;overflow:hidden}
        .om-snapshot-card table{width:100%;border-collapse:collapse;font-size:.87rem}
        .om-snapshot-card td{padding:.6rem .9rem;border-bottom:1px solid #dde3ef;vertical-align:top}
        .om-snapshot-card td:first-child{font-weight:600;white-space:nowrap;color:var(--navy);width:45%}
        .om-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .om-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .om-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .om-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .om-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .om-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .om-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .om-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .om-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .om-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .om-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .om-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .om-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .om-role-meta strong{color:var(--charcoal)}
        .om-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .om-table-wrap{overflow-x:auto}
        .om-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .om-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .om-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .om-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .om-col-highlight{font-weight:600;background:#fef9ec!important}
        .om-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .om-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .om-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .om-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .om-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .om-rank.top3{background:var(--yellow);color:var(--navy)}
        .om-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .om-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .om-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .om-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .om-mode-rec{font-weight:700;color:var(--navy)}
        .om-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .om-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .om-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .om-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .om-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .om-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .om-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .om-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .om-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .om-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .om-faq-list summary::-webkit-details-marker{display:none}
        .om-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .om-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .om-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .om-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .om-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .om-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .om-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .om-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .om-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .om-cta-band button:hover{opacity:.88}
        .om-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .om-below-cta{text-align:center;margin-top:1.25rem}
        .om-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.om-cta-row{flex-direction:column}.om-salary-table th,.om-salary-table td,.om-top10-table th,.om-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="om-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="om-breadcrumb" aria-label="Breadcrumb">
        <div className="om-wrap">
          <ol className="om-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Operations Management</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="om-hero">
        <div className="om-wrap">
          <p className="om-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="om-h1">MBA in Operations Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="om-sub">Fees from ₹1.2 lakh to ₹22 lakh. Real salary data from 312 alumni across manufacturing, supply chain, quality, and ops consulting roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="om-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="om-cta-row">
            <button className="om-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="om-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="om-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="om-wrap">
        <div className="om-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="om-toc-sticky">
              <details className="om-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="om-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "om-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="om-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="om-section">
              <h2>Key takeaways</h2>
              <ul className="om-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="om-section">
              <h2>Operations Management MBA, in 90 seconds</h2>
              <div className="om-snapshot-grid">
                <div className="om-snapshot-body">
                  <p>An MBA in Operations Management trains you to run business operations — manufacturing, service delivery, quality management, supply chain, project execution, and process improvement. As of 2025-26, it's the highest transition-value MBA for manufacturing engineers moving into management. Curriculum covers Lean, Six Sigma, TQM, operations analytics, and Industry 4.0 applications.</p>
                  <p>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (IIM Kozhikode Executive Ops track), with the mainstream Online MBA median at ₹1.85 lakh. Median entry-level salary for an Operations MBA graduate in 2025-26 stands at ₹6.5 lakh per annum for freshers, ₹15 lakh for mid-level (3-7 years' experience), and ₹30 lakh for senior roles (8-15 years). COO track at 15+ years pushes ₹75 LPA+.</p>
                </div>
                <div className="om-snapshot-card">
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
            <section id="what-it-is" className="om-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Operations Management, at postgraduate level, is the discipline of running business operations efficiently and at quality — deciding how products get made, how services get delivered, how processes get improved, and how supply chains get orchestrated. Everything else — Lean tools, Six Sigma, capacity planning, throughput analysis — sits inside that discipline.</p>
              <p>What makes it different from a Supply Chain Management MBA is scope. Supply Chain is a subset of Operations — focused specifically on moving physical goods from source to customer. Operations Management is broader — it also covers manufacturing quality, service operations, process improvement, project management, and operational strategy.</p>
              <div className="om-callout">
                <em>A misconception we hear often in CollegeNCourses counselling calls: "Operations MBA is only for manufacturing careers." It isn't. Modern Operations MBAs in 2025-26 land at consulting firms (Deloitte, McKinsey Operations), tech services (TCS, Infosys), e-commerce (Amazon, Flipkart), consumer goods (HUL, Nestle, ITC), and healthcare (Apollo, Fortis) alongside traditional manufacturers. Service operations are growing faster than manufacturing operations as Indian employment shifts.</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="om-section">
              <h2>Who this specialization is built for</h2>
              <p>Operations Management MBAs work best for three broad profiles.</p>
              <div className="om-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="om-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="om-section">
              <h2>What a 2025-26 Operations Management MBA actually teaches</h2>
              <p>A 2025-26 Operations Management MBA covers management foundations, then goes deep on operations strategy, supply chain, quality management (TQM, Six Sigma), Lean manufacturing, project management, service operations, operations analytics, business process management, and manufacturing systems. The 2025 additions are Industry 4.0 (IoT, digital twins, predictive maintenance) and Sustainability in Operations.</p>
              <div className="om-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="om-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="om-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> Industry 4.0 and Sustainability in Operations are now offered as electives at IIM Kozhikode, Great Lakes, Symbiosis SCOL, NMIMS, Amity, and Manipal. Industry 4.0 covers IoT sensors on factory floors, digital twin simulation, and predictive maintenance ML models. Sustainability covers carbon accounting, circular economy design, and EU CBAM compliance — increasingly relevant for Indian manufacturers exporting to Europe. If the syllabus doesn't include these, the programme is dated.</em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="om-section">
              <h2>The roles an Operations Management MBA leads to</h2>
              <p>Operations opens six distinct role families across manufacturing, services, e-commerce, and consulting.</p>
              <div className="om-callout">
                <em>From our 2024-25 counselling desk: Manufacturing engineers who add an Ops MBA report the sharpest salary jumps of any specialization we track — median ₹6 LPA to ₹18 LPA over 4 years. The jump is driven by transitioning from Senior Engineer / Shop Floor roles into Plant Manager / Head of Manufacturing roles, which have distinct MBA-preference clauses at TATA, Reliance, Mahindra, and similar. This is the single most transformative career-shift specialization for the engineering talent pool. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="om-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="om-role-card">
                    <h3>{r.title}</h3>
                    <p className="om-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="om-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="om-role-salary">{r.salary}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="om-section">
              <h2>What an Operations Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Operations Management sits at ₹6.5 lakh per annum for freshers (0-2 years' experience), ₹15 lakh for mid-level (3-7 years), and ₹30 lakh for senior roles (8-15 years). Ops consulting at Deloitte, McKinsey Operations, Bain, and Kearney carries 30-50% premium above these bands.</p>
              <div className="om-table-wrap">
                <table className="om-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 IIM)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="om-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="om-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. Ops consulting Manager and Principal roles at Deloitte, McKinsey, and Bain carry 30-50% premiums above these bands.</p>
              <div className="om-callout">
                <em><strong>What these numbers do not tell you:</strong> Manufacturing versus non-manufacturing dominates progression. A Plant Manager at TATA Motors and a Regional Ops Head at Amazon earn similar base salaries, but Amazon carries meaningful RSUs. E-commerce ops roles grew 42% in 2024-25 per Naukri JobSpeak. If you're building for wealth upside, target e-commerce or consulting. If you're building for stability, target manufacturing majors.</em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="om-section">
              <h2>The 10 Operations Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 312 Operations alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="om-table-wrap">
                <table className="om-top10-table">
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
                        <td><span className={`om-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="om-source">As of 2025-26. Fees are total programme cost. Placement support ratings from CollegeNCourses internal alumni tracking of Operations graduates seeking a role within six months of programme completion.</p>
              <div className="om-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="om-section">
              <h2>Distance, Online, or Executive: which mode fits your Operations career</h2>
              <p>The mode choice for Operations hinges on whether Tier-1 ops consulting reset is a realistic goal or the target is manufacturing management within your current sector.</p>
              <div className="om-callout">
                <em>From our counselling records 2023-25: Operations consulting at Deloitte, McKinsey Operations Excellence, Bain Operations, and Kearney increasingly hires from Executive Ops MBA programmes. IIM Kozhikode EPGP Ops track alumni report Tier-1 consulting placements at 42-58% conversion — significantly higher than any Distance or Online MBA can deliver. However, for aspirants staying in manufacturing management (Plant Head, Head of Operations at TATA / Mahindra / similar), Online MBA at Symbiosis or NMIMS delivers 85% of the outcome at 15% of the cost. Know which path you're on before committing. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="om-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="om-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="om-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick an Operations Management MBA</h2>
              <p>We include this section because most guides won't.</p>
              <ul className="om-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if an Operations Management MBA is right for you: 5 questions</h2>
              <div className="om-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="om-howto-card">
                    <div className="om-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="om-section">
              <h2>Frequently asked questions</h2>
              <div className="om-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="om-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="om-section">
              <h2>Go deeper</h2>
              <ul className="om-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="om-cta-band">
        <div className="om-wrap">
          <h2>Ready to shortlist your Operations Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target segment, Six Sigma exposure, consulting aspirations, budget, and timeline. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-operations" />
    </>
  );
}
