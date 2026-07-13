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
  `Fastest-hiring MBA specialization in e-commerce. Amazon, Flipkart, and Meesho collectively hire 500+ SCM MBA graduates annually per our tracking.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (IIM Kozhikode Executive). Mainstream Online MBA median sits at ₹1.9 lakh for 24 months.`,
  `Median salaries (2025-26): ₹7 LPA for freshers, ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years. Chief Supply Chain Officer track pushes ₹80 LPA+ at leadership levels.`,
  `Best-fit profile: Manufacturing engineers moving into logistics/procurement; existing SCM professionals wanting promotion; e-commerce operations aspirants; and consulting aspirants targeting SCM practices.`,
  `Poor-fit signal: If you prefer creative or people-first work, or dislike measurement-heavy operational disciplines, choose Marketing, HR, or Finance instead.`,
  `Top pick by mode (2025-26): Symbiosis Online, NMIMS Distance, IIM Kozhikode EPGP SCM track (Executive).`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹22 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹7 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹15 LPA" },
  { label: "Top employers", value: "Amazon, Flipkart, Meesho, Reliance Retail, DMart, Walmart, HUL, ITC, TATA Motors, Maersk, DHL, Blue Dart, Delhivery, Shiprocket, ecom Express" },
  { label: "Fits best if", value: "Manufacturing engineer moving to logistics, or existing SCM professional wanting promotion" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "The manufacturing engineer moving into logistics or procurement",
    body: `Three to ten years' experience in production, materials, or plant engineering at TATA Motors, Mahindra, Bajaj Auto, or similar. Wants to move into strategic sourcing, procurement, or logistics leadership. Distance or Online MBA fits — engineering background is genuine credit; SCM MBA adds the strategic and analytical dimension.`,
  },
  {
    title: "The existing SCM professional wanting promotion",
    body: `Two to twelve years' experience in supply chain, procurement, or logistics at any company. Currently a Supply Chain Analyst, Procurement Executive, or Logistics Coordinator. Blocked by "MBA required" clause for Manager, Senior Manager, or Head of SCM roles. Distance or Online MBA is the natural path.`,
  },
  {
    title: "The e-commerce operations aspirant",
    body: `Aspirant with 2-8 years' experience in retail, logistics, or e-commerce operations wanting to build career at Amazon, Flipkart, Meesho, Reliance Retail, or D2C brands. Online MBA fits. E-commerce SCM hiring has grown roughly 40% year-on-year in 2024-25 per our alumni tracking and Naukri data.`,
  },
  {
    title: "The SCM consulting aspirant",
    body: `Existing consultant, engineer, or SCM professional wanting to move into SCM consulting at Kearney, Deloitte Supply Chain, Accenture Supply Chain, EY Supply Chain, or Bain Ops. Executive MBA at IIM Kozhikode EPGP or IIM Ahmedabad PGPX fits.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to Supply Chain Management.",
  },
  {
    title: "Semester 2 — SCM core",
    subjects: "Supply Chain Strategy, Procurement & Strategic Sourcing, Logistics & Transportation Management, Warehousing & Inventory Management, Business Communication, Operations Research for SCM.",
  },
  {
    title: "Semester 3 — Applied SCM",
    subjects: "Demand Planning & Forecasting, SCM Analytics (Excel + Power BI + basic Python), Global Supply Chain & International Trade Basics, SCM Technology (SAP, Oracle, WMS, TMS), E-commerce Supply Chain, Reverse Logistics & Returns Management.",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "AI-Driven Demand Planning (new elective — LLMs and ML for forecasting, dynamic pricing, inventory optimisation), Sustainable Supply Chain (new elective — Scope 3 emissions, circular supply chain design, EU CBAM compliance), Supply Chain Risk Management, Advanced Analytics with Python, Industry Capstone Project.",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "E-commerce & Fulfilment SCM",
    path: "Ops Manager → Senior Ops Manager → Regional Ops Head → Director Operations → VP Operations",
    employers: "Amazon, Flipkart, Meesho, Reliance Retail, Myntra, Nykaa",
    salary: "Fastest-growing career family and highest RSU-adjusted compensation in 2025-26.",
  },
  {
    title: "Procurement & Strategic Sourcing",
    path: "Procurement Analyst → Sourcing Manager → Head of Procurement → CPO",
    employers: "TATA Motors, Mahindra, TATA Steel, HUL, ITC, Nestle",
    salary: "Steady, deep-domain career with strong long-term progression.",
  },
  {
    title: "Manufacturing & Industrial SCM",
    path: "SCM Analyst → SCM Manager → Head of Supply Chain → CSCO",
    employers: "TATA Motors, Mahindra, Bajaj Auto, TATA Steel, JSW, Reliance Industries",
    salary: "Traditional path with strong stability and CSCO track access.",
  },
  {
    title: "Logistics & 3PL Management",
    path: "Logistics Manager → Operations Head → Regional Head → VP Operations",
    employers: "Maersk, DHL, Blue Dart, Delhivery, Shiprocket, ecom Express, Mahindra Logistics",
    salary: "Growing fast with e-commerce boom.",
  },
  {
    title: "Retail SCM",
    path: "Retail SCM Analyst → SCM Manager → Head of Retail Operations → COO Retail",
    employers: "Reliance Retail, DMart, Trent (Zudio, Westside), Landmark, Titan",
    salary: "Overlaps with Retail Management specialization.",
  },
  {
    title: "SCM Consulting",
    path: "Consultant → Senior Consultant → Manager → Principal → Partner",
    employers: "Kearney, Deloitte Supply Chain, Accenture Supply Chain, EY Supply Chain, Bain Operations",
    salary: "Highest-paying path. Best accessed through Executive MBA at IIM Kozhikode/Ahmedabad.",
    note: "Tier-1 SCM consulting at Kearney and McKinsey Operations primarily hires from Executive MBAs at IIM ABCK and XLRI.",
  },
  {
    title: "Global Sourcing / International SCM",
    path: "Sourcing Analyst → Global Sourcing Manager → Head of Global Procurement → CPO",
    employers: "MNCs sourcing from India, Indian exporters, global procurement centres",
    salary: "International focus adds 15-25% pay premium over domestic SCM roles.",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹5 – 9 LPA", exec_t1: "₹10 – 16 LPA", exec_t2: "₹7 – 12 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹11 – 20 LPA", exec_t1: "₹21 – 36 LPA", exec_t2: "₹14 – 24 LPA" },
  { band: "Senior, 8-15 years", dist: "₹22 – 40 LPA", exec_t1: "₹40 – 68 LPA", exec_t2: "₹27 – 48 LPA" },
  { band: "Leadership, 15+ years", dist: "₹40 – 68 LPA", exec_t1: "₹68 LPA – ₹1.2 Cr", exec_t2: "₹48 – 82 LPA" },
  { band: "CSCO track (top 5%)", dist: "₹60 LPA+", exec_t1: "₹1.2 Cr+", exec_t2: "₹75 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "EPGP (SCM track)", university: "IIM Kozhikode", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~95%)", strength: "Best value IIM SCM track" },
  { rank: 2, programme: "PGPX (SCM electives)", university: "IIM Ahmedabad", mode: "Executive (residential)", duration: "12 mo", fee: "₹28 L", placement: "Very Strong (~100%)", strength: "Top brand for SCM consulting reset" },
  { rank: 3, programme: "Executive MBA (Ops + SCM)", university: "XLRI Jamshedpur", mode: "Executive (weekend)", duration: "15 mo", fee: "₹22 L", placement: "Very Strong (~96%)", strength: "Legacy ops + SCM depth" },
  { rank: 4, programme: "Online MBA Supply Chain Management", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.55 L", placement: "Strong (~74%)", strength: "Live faculty, strong Amazon/Flipkart alumni" },
  { rank: 5, programme: "Distance MBA Supply Chain Management", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.85 L", placement: "Moderate-Strong (~66%)", strength: "Industry-tied SCM projects" },
  { rank: 6, programme: "Online MBA Supply Chain Management", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.75 L", placement: "Moderate (~57%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA Supply Chain Management", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~57%)", strength: "Widest SCM electives" },
  { rank: 8, programme: "Online MBA Supply Chain Management", university: "Jain (Deemed-to-be-Univ) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~60%)", strength: "Value + strong accreditation" },
  { rank: 9, programme: "Online MBA Supply Chain Management", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~53%)", strength: "Strong newer entrant with e-commerce placements" },
  { rank: 10, programme: "Distance MBA Supply Chain Management", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Manufacturing engineer at TATA/Mahindra wanting to move to logistics/procurement", mode: "Distance or Online MBA", why: "Credential unlocks transition; sector recognises it well" },
  { situation: "Existing SCM professional at any firm wanting promotion", mode: "Online MBA", why: "Live faculty + cohort discussions add strategic depth" },
  { situation: "E-commerce ops aspirant targeting Amazon/Flipkart/Meesho", mode: "Online MBA (Symbiosis or NMIMS)", why: "These programmes have direct e-commerce hiring pipelines" },
  { situation: "SCM professional targeting Kearney/Deloitte/Accenture Supply Chain reset", mode: "Executive MBA (IIM Kozhikode EPGP or IIM Ahmedabad PGPX)", why: "Consulting placement is brand-gated" },
  { situation: "Aspirant with 15+ years' operations experience targeting CSCO track", mode: "Executive MBA (XLRI or IIM Ahmedabad PGPX)", why: "Executive brand + peer cohort matter for senior transitions" },
  { situation: "Fresh commerce/engineering graduate wanting SCM career", mode: "Online MBA", why: "Executive requires 3+ years; Online delivers structured entry" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You prefer creative or brand-facing work. Choose Marketing Management or Digital Marketing.`,
  `You want a purely people-first career. Choose HR Management.`,
  `You want a purely financial or investment career. Choose Finance Management or Banking & Finance.`,
  `You resist measurement-heavy operational disciplines. SCM is fundamentally about measurement — inventory turns, on-time delivery, cost per order, forecast accuracy. If daily KPI dashboards feel oppressive, you'll struggle.`,
  `You want minimum warehouse or fulfilment-centre exposure. Even senior SCM roles at Amazon and Flipkart involve regular facility visits and floor-level problem-solving.`,
  `You want steady 9-to-5 work. SCM is 24×7 by nature — festival peaks, Amazon Diwali, Flipkart Big Billion Days, D2C sale events all require weekend and evening escalations.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target segment — e-commerce, manufacturing, 3PL, retail, or consulting", body: `Each has fundamentally different economics, employer preferences, and daily work. E-commerce pays highest with RSU components. Manufacturing pays steadily with stability. 3PL pays growth-linked. Consulting pays highest but requires Tier-1 brand access. Know which one you're targeting.` },
  { step: 2, title: "Confirm your comfort with 24×7 operations rhythm", body: `SCM roles at e-commerce and 3PL involve peak-season escalations, evening operational reviews, and weekend inventory checks. If this doesn't fit your family or life situation, consider manufacturing SCM (calmer rhythm) or SCM consulting (project-based cycles) instead.` },
  { step: 3, title: "Check whether Tier-1 SCM consulting or CSCO track is a realistic goal", body: `If Tier-1 consulting — Executive MBA at IIM Kozhikode/Ahmedabad justifies the ₹15-28 lakh. If CSCO track — Online MBA plus intentional lateral moves over 15+ years is more strategic than fee alone. If neither — Online MBA is the sharpest ROI.` },
  { step: 4, title: "Audit whether you enjoy analytical and system-heavy work", body: `Modern SCM demands data literacy — demand planning models, network optimisation, WMS analytics. If Excel dashboards and Power BI reports feel oppressive, you'll struggle in the technology-heavy roles. Consider Procurement (less system-heavy) instead.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹28 L is the full range. Most working professionals fit ₹1.85 L to ₹2.55 L Online. Stretching to Executive without a specific Tier-1 consulting reset or CSCO track opportunity is the most expensive regret we track.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Supply Chain Management valid in India?", a: `Yes. An Online MBA in SCM from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment.` },
  { q: "Is SCM MBA better than an Operations MBA?", a: `Depends on career target. SCM is a deeper subset of Operations focused specifically on physical goods movement and inventory. If you want SCM as your entire career (procurement, logistics, warehousing), SCM MBA is sharper. If you want flexibility across manufacturing management, quality, service ops, and SCM, Operations MBA is more portable.` },
  { q: "How much does a Supply Chain MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹28 lakh (IIM Ahmedabad PGPX). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.4 lakh and ₹2.55 lakh total. IIM Kozhikode EPGP SCM track is ₹15 lakh; XLRI Executive is ₹22 lakh.` },
  { q: "What is the salary after an Online MBA in Supply Chain?", a: `Median 2025-26 salary is ₹7 LPA for freshers, ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years. E-commerce SCM roles at Amazon, Flipkart, and Meesho pay 25-40% above traditional manufacturing SCM.` },
  { q: "Can I get into Amazon or Flipkart after an Online SCM MBA?", a: `Yes — this is one of the most common outcomes. Amazon India runs formal MBA hiring programmes for Ops Manager and Senior Ops Manager roles. Aspirants with 2-5 years' prior operations experience report ~48% conversion rate to e-commerce operations roles within 12 months of graduation.` },
  { q: "What is the difference between an SCM MBA and a Logistics Diploma?", a: `An MBA is a full 24-month postgraduate degree with management foundation plus specialization. A logistics diploma is a shorter (typically 6-12 months) execution-focused certification. MBAs open Manager and leadership career paths; diplomas typically position for supervisor-level entry roles.` },
  { q: "Can I do an SCM MBA without a manufacturing or logistics background?", a: `Yes. Roughly 35% of SCM MBA enrolments at Symbiosis SCOL and NMIMS in 2024-25 came from non-SCM backgrounds — often IT services, retail, and general management. The MBA teaches SCM from first principles.` },
  { q: "Which universities have the best placement records for SCM MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Ahmedabad PGPX (~100%), XLRI (~96%), IIM Kozhikode EPGP SCM track (~95%), and Symbiosis SCOL (~74%).` },
  { q: "How is AI affecting Supply Chain careers in India?", a: `Substantially. AI is restructuring demand planning (replacing statistical forecasting with ML models), warehouse operations (automated picking, robotics), route optimisation (AI-driven last-mile), and procurement (AI-augmented supplier selection). SCM MBAs joining the workforce in 2025-27 should expect to be evaluated on AI-tool fluency — Blue Yonder, o9, SAP APO with ML modules are now interview-critical at major SCM employers.` },
  { q: "Can I move to SCM consulting after a Distance or Online MBA?", a: `For mid-tier SCM consulting (Deloitte Supply Chain, EY Supply Chain, KPMG Supply Chain), yes — moderately. For Tier-1 SCM consulting (Kearney, McKinsey Operations & Supply Chain, Bain Ops), difficult — these firms hire predominantly from Executive MBAs at IIM Kozhikode, IIM Ahmedabad, XLRI, and Great Lakes.` },
  { q: "What are education loan options for a Supply Chain MBA?", a: `For Online MBAs at ₹1.85-2.55 lakh, most working professionals pay from monthly salary. For Executive MBAs at ₹15-28 lakh, education loans are widely available from SBI (up to ₹1.5 crore), HDFC Credila, ICICI, Avanse, Auxilo. Interest rates 9.5-12.5%.` },
  { q: "How does CollegeNCourses help me choose?", a: `Our counsellors match you to programmes based on your target segment (e-commerce, manufacturing, 3PL, retail, or consulting), current operations experience, Tier-1 consulting aspirations, CSCO track ambition, budget, and timeline. Free 30-minute call.` },
  { q: "Is Supply Chain Management MBA a good career option?", a: `Yes, particularly for engineers, existing SCM professionals, and aspirants targeting e-commerce. India's e-commerce and quick commerce growth, manufacturing PLI schemes, and infrastructure push are driving structural SCM hiring. Median salaries are healthy and progression to CSCO track reaches ₹80 LPA+ with RSU components often exceeding ₹1.5 Cr total comp.`, voice: true },
  { q: "How much salary after SCM MBA in India?", a: `Median starting salary after an Online MBA in Supply Chain is ₹7 LPA in India in 2025-26. It scales to ₹15 LPA at 3-7 years, ₹30 LPA at 8-15 years, and ₹60 LPA+ at CSCO track. Executive MBA from IIM Kozhikode or IIM Ahmedabad pushes these numbers 2-3x higher for consulting placements.`, voice: true },
  { q: "Which is the best MBA for supply chain in India?", a: `The three most-recommended MBAs for SCM in 2025-26 are IIM Kozhikode EPGP SCM track (Executive, best value IIM SCM), Symbiosis Centre for Online Learning (Online, strong Amazon/Flipkart alumni), and NMIMS Global Access (Distance/Online, strongest industry-tied SCM projects).`, voice: true },
  { q: "Do employers actually value Distance and Online SCM MBAs in 2025-26?", a: `Yes, especially in e-commerce (Amazon, Flipkart, Meesho, Reliance Retail), 3PL (DHL, Delhivery, Blue Dart), and mid-to-large manufacturers (TATA Motors, Mahindra, TATA Steel). For Tier-1 SCM consulting at Kearney, Deloitte, and Accenture Supply Chain, Executive MBA from IIMs or XLRI retains preference.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Operations Management: The Honest Guide", href: "/specializations-guide/operations/" },
  { title: "MBA in International Business Management: The Honest Guide", href: "/specializations-guide/international-business/" },
  { title: "MBA in Retail Management: The Honest Guide", href: "/specializations-guide/retail/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function SupplyChainGuideClient() {
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
        .sc-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .sc-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .sc-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .sc-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .sc-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .sc-bc-inner li:last-child::after{content:""}
        .sc-bc-inner a{color:var(--navy);text-decoration:none}
        .sc-bc-inner a:hover{text-decoration:underline}
        .sc-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .sc-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .sc-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .sc-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .sc-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .sc-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .sc-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .sc-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .sc-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .sc-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.sc-layout{grid-template-columns:1fr}}
        .sc-toc-sticky{position:sticky;top:80px}
        .sc-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .sc-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .sc-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .sc-toc-desktop nav a.sc-active,.sc-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .sc-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .sc-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .sc-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.sc-toc-mobile{display:none}}
        @media(max-width:900px){.sc-toc-desktop{display:none}.sc-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .sc-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .sc-toc-mobile summary::after{content:"▾"}
        .sc-toc-mobile[open] summary::after{content:"▴"}
        .sc-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .sc-toc-mobile a:hover{background:var(--mist)}
        .sc-section{margin-bottom:3.5rem;padding-top:.5rem}
        .sc-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .sc-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .sc-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .sc-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .sc-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .sc-facts-table tr:last-child td{border-bottom:none}
        .sc-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .sc-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .sc-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .sc-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .sc-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .sc-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .sc-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .sc-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .sc-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .sc-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .sc-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .sc-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .sc-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .sc-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .sc-role-meta strong{color:var(--charcoal)}
        .sc-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .sc-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .sc-table-wrap{overflow-x:auto}
        .sc-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .sc-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .sc-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .sc-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .sc-col-highlight{font-weight:600;background:#fef9ec!important}
        .sc-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .sc-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .sc-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .sc-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .sc-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .sc-rank.top3{background:var(--yellow);color:var(--navy)}
        .sc-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .sc-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .sc-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .sc-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .sc-mode-rec{font-weight:700;color:var(--navy)}
        .sc-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .sc-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .sc-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .sc-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .sc-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .sc-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .sc-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .sc-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .sc-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .sc-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .sc-faq-list summary::-webkit-details-marker{display:none}
        .sc-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .sc-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .sc-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .sc-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .sc-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .sc-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .sc-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .sc-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .sc-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .sc-cta-band button:hover{opacity:.88}
        .sc-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .sc-below-cta{text-align:center;margin-top:1.25rem}
        .sc-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.sc-cta-row{flex-direction:column}.sc-salary-table th,.sc-salary-table td,.sc-top10-table th,.sc-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="sc-progress" aria-hidden="true" />

      <nav className="sc-breadcrumb" aria-label="Breadcrumb">
        <div className="sc-wrap">
          <ol className="sc-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Supply Chain Management</li>
          </ol>
        </div>
      </nav>

      <header className="sc-hero">
        <div className="sc-wrap">
          <p className="sc-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="sc-h1">MBA in Supply Chain Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="sc-sub">Fees from ₹1.2 lakh to ₹22 lakh. Real salary data from 284 alumni across e-commerce, retail, manufacturing, and 3PL roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="sc-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="sc-cta-row">
            <button className="sc-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="sc-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="sc-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="sc-wrap">
        <div className="sc-layout">
          <aside>
            <div className="sc-toc-sticky">
              <details className="sc-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="sc-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "sc-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="sc-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            <section id="takeaways" className="sc-section">
              <h2>Key takeaways</h2>
              <ul className="sc-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section id="snapshot" className="sc-section">
              <h2>Supply Chain Management MBA, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in Supply Chain Management trains you to move physical goods efficiently — sourcing raw materials, managing procurement, running warehouses and fulfilment centres, orchestrating last-mile logistics, and optimising the flow of inventory. As of 2025-26, it&apos;s the fastest-hiring MBA specialization in India&apos;s e-commerce sector and among the strongest for manufacturing career transitions.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (IIM Kozhikode Executive SCM track), with the mainstream Online MBA median at ₹1.9 lakh. Median entry-level salary for an SCM MBA graduate in 2025-26 stands at ₹7 lakh per annum for freshers, ₹15 lakh for mid-level (3-7 years&apos; experience), and ₹30 lakh for senior roles (8-15 years). Chief Supply Chain Officer (CSCO) roles at 15+ years reach ₹80 LPA–₹1.5 Cr+.</p>
              <table className="sc-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="what-it-is" className="sc-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Supply Chain Management, at postgraduate level, is the discipline of moving physical goods predictably at cost — sourcing inputs, running procurement, managing warehouses, orchestrating logistics, delivering to customers, and reversing flows for returns. Everything else — Incoterms, MOQ negotiations, WMS systems, route optimisation — sits inside that end-to-end flow discipline.</p>
              <p>What makes it different from an Operations Management MBA is scope. Operations is broader — it covers manufacturing quality, service operations, project management, and process improvement alongside supply chain. SCM is a deeper subset focused specifically on physical goods movement and inventory optimisation.</p>
              <div className="sc-callout">
                <em>A misconception we hear often in CollegeNCourses counselling calls: &quot;Supply Chain MBA means you&apos;ll work in a warehouse.&quot; It doesn&apos;t. Modern SCM roles in 2025-26 are roughly 30% analytics and demand planning, 25% strategic sourcing and vendor management, 20% operational execution, 15% technology and systems (WMS, TMS, ERP), and 10% network design and capacity planning. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            <section id="who-fits" className="sc-section">
              <h2>Who this specialization is built for</h2>
              <p>Supply Chain Management MBAs work best for four broad profiles.</p>
              <div className="sc-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="sc-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="curriculum" className="sc-section">
              <h2>What a 2025-26 Supply Chain Management MBA actually teaches</h2>
              <p>A 2025-26 SCM MBA covers management foundations, then goes deep on supply chain strategy, procurement and sourcing, logistics and transportation management, warehousing and inventory management, demand planning and forecasting, SCM analytics, global supply chain, and reverse logistics. The 2025 additions are AI-driven demand planning and Sustainable Supply Chain (Scope 3 emissions, circular supply chain).</p>
              <div className="sc-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="sc-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="sc-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> AI-Driven Demand Planning is now offered as an elective at IIM Kozhikode, Symbiosis SCOL, NMIMS, Amity, Manipal, and Great Lakes. It covers LLMs for demand sensing from unstructured data, ML forecasting models replacing traditional statistical methods, dynamic pricing algorithms, and AI-driven route optimisation. Sustainable Supply Chain is particularly relevant for aspirants targeting exporters — India&apos;s supply chain to EU markets increasingly requires Scope 3 emission tracking under CBAM (enforced from 2026).</em>
              </div>
            </section>

            <section id="careers" className="sc-section">
              <h2>The roles a Supply Chain Management MBA leads to</h2>
              <p>SCM opens seven distinct role families across e-commerce, manufacturing, retail, 3PL, and consulting.</p>
              <div className="sc-callout">
                <em>From our 2024-25 counselling desk: E-commerce SCM has become the largest single hiring pool for SCM MBAs. Amazon, Flipkart, and Meesho collectively hired over 500 SCM MBA graduates in 2024-25 across roles in fulfilment planning, last-mile operations, category-level SCM, and marketplace SCM. The salary premium at e-commerce over traditional manufacturing SCM is 25-40% at mid-level, driven by RSU components and rapid promotion cycles. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="sc-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="sc-role-card">
                    <h3>{r.title}</h3>
                    <p className="sc-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="sc-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="sc-role-salary">{r.salary}</p>
                    {r.note && <p className="sc-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section id="salary" className="sc-section">
              <h2>What a Supply Chain Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Supply Chain Management sits at ₹7 lakh per annum for freshers (0-2 years&apos; experience), ₹15 lakh for mid-level (3-7 years), and ₹30 lakh for senior roles (8-15 years). E-commerce SCM at Amazon, Flipkart, and Meesho carries 25-40% premium above traditional manufacturing SCM at the same experience level.</p>
              <div className="sc-table-wrap">
                <table className="sc-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="sc-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sc-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. E-commerce SCM roles at Amazon, Flipkart, and Meesho typically sit in the upper quartile with additional RSU value.</p>
              <div className="sc-callout">
                <em><strong>What these numbers do not tell you:</strong> Amazon India RSUs and Flipkart ESOPs add 20-40% to total compensation over 4-year vesting cycles at mid-to-senior SCM roles. SCM consulting Manager and Principal roles at Kearney, Deloitte, and Accenture carry 30-45% premiums above these bands.</em>
              </div>
            </section>

            <section id="top10" className="sc-section">
              <h2>The 10 Supply Chain Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 284 SCM alumni surveyed 2024-25, and CollegeNCourses counsellor feedback.</p>
              <div className="sc-table-wrap">
                <table className="sc-top10-table">
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
                        <td><span className={`sc-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="sc-source">As of 2025-26. Fees are total programme cost. Placement support ratings from CollegeNCourses internal alumni tracking of SCM graduates seeking a role within six months of programme completion.</p>
              <div className="sc-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            <section id="mode" className="sc-section">
              <h2>Distance, Online, or Executive: which mode fits your SCM career</h2>
              <p>The mode choice for Supply Chain hinges on whether Tier-1 consulting reset or CSCO track is a realistic goal versus SCM promotion within your current sector.</p>
              <div className="sc-callout">
                <em>From our counselling records 2023-25: CSCO track is the highest 15-year compensation ceiling within the Operations family of specializations. Median CSCO compensation in India in 2025-26 is ₹80 LPA base with RSU/bonus components often taking total comp above ₹1.5 Cr. However, CSCO track requires multiple lateral moves across procurement, logistics, planning, and e-commerce SCM over 15+ years — not just credentialing. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="sc-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="sc-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="sc-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick a Supply Chain Management MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="sc-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if a Supply Chain Management MBA is right for you: 5 questions</h2>
              <div className="sc-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="sc-howto-card">
                    <div className="sc-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faqs" className="sc-section">
              <h2>Frequently asked questions</h2>
              <div className="sc-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="sc-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="sc-section">
              <h2>Go deeper</h2>
              <ul className="sc-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      <section className="sc-cta-band">
        <div className="sc-wrap">
          <h2>Ready to shortlist your Supply Chain Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target segment (e-commerce, manufacturing, 3PL, consulting), current operations experience, Tier-1 aspirations, and budget. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-supply-chain" />
    </>
  );
}
