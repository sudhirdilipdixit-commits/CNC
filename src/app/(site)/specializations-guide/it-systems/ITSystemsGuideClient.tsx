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
  `Highest-transition-value MBA for mid-career software engineers. 65% of our IT & Systems MBA alumni report moving out of purely coding roles within 24 months of graduation.`,
  `Fees: ₹1.3 lakh (ICFAI Distance) to ₹28 lakh (IIM Bangalore Executive). Mainstream Online MBA median sits at ₹2 lakh for 24 months.`,
  `Median salaries (2025-26): ₹8 LPA for freshers, ₹16 LPA at 3-7 years, ₹34 LPA at 8-15 years. CIO/CTO track pushes ₹65 LPA to ₹1.5 Cr+ at leadership levels.`,
  `Best-fit profile: Software engineers wanting Product or IT Management; IT services professionals moving to consulting; system architects wanting strategy roles; IT professionals targeting digital transformation leadership.`,
  `Enterprise Architecture is an underrated high-value path — EA senior roles pay ₹42-75 LPA with less competition than Product or IB tracks. Consider it if you enjoy systems design over execution.`,
  `Poor-fit signal: If you prefer pure coding and technical depth over business context and team management, consider a technical postgraduate programme instead of an MBA.`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.3 L – ₹28 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹8 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹16 LPA" },
  { label: "Top employers", value: "Microsoft, Amazon, Google, Meta, Salesforce, SAP, Oracle, TCS, Infosys, Wipro, HCL, Accenture, Deloitte, IBM Consulting, Reliance Jio, TATA Digital" },
  { label: "Fits best if", value: "Software engineer or IT services professional wanting management, product, or consulting role" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "The software engineer wanting Product Management",
    body: `Three to ten years of software development experience at a tech company, startup, or IT services firm. Wants to move into Product Management — roadmap ownership, stakeholder management, P&L responsibility. Online MBA adds the business strategy and management layer that engineering alone doesn't provide. 65% of our alumni in this category report securing PM roles within 18 months of completion.`,
  },
  {
    title: "The IT services professional wanting consulting",
    body: `Three to twelve years at TCS, Infosys, Wipro, HCL, or similar. Currently a Senior Developer, Tech Lead, or Project Lead. Wants to move into IT consulting at Deloitte, Accenture, IBM Consulting, or EY. IT & Systems MBA adds the client management, business analysis, and engagement delivery skills. Online MBA is usually sufficient; Executive at IIM Kozhikode or Ahmedabad is justified if MBB or Big-4 Strategy is the target.`,
  },
  {
    title: "The IT professional targeting CIO/IT Director track",
    body: `Five to fifteen years in IT infrastructure, enterprise applications, IT management, or systems administration. Wants to move from IT Manager to IT Director, VP of Technology, or CIO. Executive MBA is most appropriate — the business strategy and leadership curriculum is directly relevant. Online MBA also works for mid-level IT management roles.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to IT Management.",
  },
  {
    title: "Semester 2 — IT Management core",
    subjects: "IT Strategy & Governance, Enterprise Architecture Fundamentals, IT Service Management (ITIL framework), Cloud Computing & Infrastructure Management, Business Communication, Systems Analysis & Design.",
  },
  {
    title: "Semester 3 — Applied IT Management",
    subjects: "Digital Transformation Strategy, ERP Systems (SAP, Oracle), Cybersecurity Management, IT Project Management (PMP/PRINCE2 aligned), Product Management Fundamentals, Data Management & BI.",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "AI Strategy for IT Leaders (new elective — LLMs, AI governance, cloud AI platforms), Platform Engineering & DevOps Management (new elective — platform teams, SRE, FinOps), IT Risk & Compliance Management, Advanced Cloud Architecture, Industry Capstone Project.",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Product Management",
    path: "IT/Software Engineer → IT Systems MBA → Product Manager → Senior PM → Director of Product → VP Product",
    employers: "Microsoft, Google, Amazon, Salesforce, Razorpay, Zepto, Swiggy, PhonePe, Paytm, Freshworks, Zoho, TATA Digital",
    salary: "₹14–28 LPA (mid), ₹32–60 LPA (senior)",
    note: "Most popular outcome for engineering-to-management transition",
  },
  {
    title: "IT Consulting",
    path: "IT/Software role → IT Systems MBA → Associate Consultant → Consultant → Senior Consultant → Manager (IT Consulting)",
    employers: "Deloitte, Accenture, IBM Consulting, EY, PwC, KPMG, Capgemini, TCS Consulting",
    salary: "₹12–22 LPA (mid), ₹28–55 LPA (senior)",
  },
  {
    title: "Enterprise Architecture",
    path: "Systems Analyst/Architect → IT Systems MBA → Enterprise Architect → Senior EA → Chief Architect → CTO/CIO",
    employers: "Large enterprises across BFSI, telecom, manufacturing — Infosys, Wipro, IBM, Reliance, HDFC Bank",
    salary: "₹16–32 LPA (mid), ₹42–75 LPA (senior)",
    note: "Underrated high-value path — lower competition, high demand",
  },
  {
    title: "IT Management / IT Director",
    path: "IT Manager → IT Systems MBA → IT Director → VP Technology → CIO",
    employers: "Any large enterprise — BFSI, manufacturing, retail, pharma, government PSUs",
    salary: "₹14–26 LPA (mid), ₹32–60 LPA (senior)",
  },
  {
    title: "Digital Transformation",
    path: "IT/Project role → IT Systems MBA → Digital Transformation Manager → Head of Digital → CDO",
    employers: "TATA Group, Reliance Jio, HDFC Bank, ICICI Bank, Mahindra, L&T, Godrej",
    salary: "₹16–30 LPA (mid), ₹38–68 LPA (senior)",
  },
  {
    title: "IT Project / Programme Management",
    path: "Developer/BA → IT Systems MBA → IT Project Manager → Programme Manager → PMO Director",
    employers: "TCS, Infosys, Wipro, Accenture, Capgemini, HCL, Cognizant",
    salary: "₹10–20 LPA (mid), ₹24–44 LPA (senior)",
  },
  {
    title: "Cybersecurity Management",
    path: "Security Engineer → IT Systems MBA → Security Manager → CISO",
    employers: "Banks, NBFCs, tech companies, government — HDFC, ICICI, TCS, Infosys, CERT-In empanelled firms",
    salary: "₹14–28 LPA (mid), ₹36–65 LPA (senior)",
    note: "High demand; shortage of professionals with both technical and management depth",
  },
];

// Columns: [Experience Band, Distance MBA, Executive MBA, Online MBA]
const SALARY_ROWS: string[][] = [
  ["Fresh / 0-2 yrs", "₹6–10 LPA", "₹11–18 LPA", "₹7.5–13 LPA"],
  ["Mid / 3-7 yrs", "₹11–22 LPA", "₹22–40 LPA", "₹14–26 LPA"],
  ["Senior / 8-15 yrs", "₹22–42 LPA", "₹42–75 LPA", "₹28–50 LPA"],
  ["Leadership / 15+ yrs", "₹42–75 LPA", "₹75 LPA–₹1.5 Cr", "₹50–90 LPA"],
  ["CIO / CTO track", "₹65 LPA+", "₹1.5 Cr+", "₹80 LPA+"],
];

const TOP10_ROWS: { rank: number; name: string; mode: string; duration: string; fee: string; note: string }[] = [
  { rank: 1, name: "IIM Ahmedabad PGPX", mode: "Executive", duration: "12 mo", fee: "₹28 L", note: "Top consulting & tech placements" },
  { rank: 2, name: "IIM Bangalore EPGP", mode: "Executive", duration: "12 mo", fee: "₹24 L", note: "Strong IT & tech management focus" },
  { rank: 3, name: "IIIT Bangalore Executive MBA", mode: "Executive", duration: "18 mo", fee: "₹8 L", note: "Technology-specific management" },
  { rank: 4, name: "IIM Kozhikode EPGP", mode: "Executive", duration: "12 mo", fee: "₹22 L", note: "Strong consulting placements" },
  { rank: 5, name: "Symbiosis SCOL Online MBA", mode: "Online", duration: "24 mo", fee: "₹1.65 L", note: "Strong placement conversion" },
  { rank: 6, name: "NMIMS Global Access", mode: "Distance/Online", duration: "24 mo", fee: "₹1.8 L", note: "Strong brand in tech sector" },
  { rank: 7, name: "Manipal Online MBA", mode: "Online", duration: "24 mo", fee: "₹1.75 L", note: "NAAC A++ approved" },
  { rank: 8, name: "Amity Online MBA", mode: "Online", duration: "24 mo", fee: "₹1.9 L", note: "Large alumni network" },
  { rank: 9, name: "Jain Online MBA", mode: "Online", duration: "24 mo", fee: "₹1.7 L", note: "NAAC A++ approved" },
  { rank: 10, name: "ICFAI Distance MBA", mode: "Distance", duration: "24 mo", fee: "₹1.3 L", note: "Most affordable entry" },
];

// Columns: [Factor, Distance MBA, Online MBA, Executive MBA]
const MODE_ROWS: string[][] = [
  ["Work experience", "0-2 years", "2+ years", "5+ years (typically 8+)"],
  ["Target role", "Entry IT management", "Product, consulting, IT management", "Senior management, CIO track, MBB consulting"],
  ["Time commitment", "Self-paced, minimal live sessions", "8-12 hrs/week, live weekend classes", "Immersive; some residential modules"],
  ["Fee range", "₹1.3 L – ₹3 L", "₹1.65 L – ₹3 L", "₹8 L – ₹28 L"],
  ["Peer network quality", "Variable", "Strong (working professionals)", "Very strong (senior professionals)"],
  ["Employer recognition", "Good for IT management roles", "Strong across IT sector", "Premium — CIO/CTO track and MBB consulting"],
  ["Best for", "Budget-conscious; career starters", "Mid-career engineers; IT services professionals", "Senior IT professionals; consulting-reset aspirants"],
];

const NOT_FIT: string[] = [
  "Professionals who prefer pure technical depth — MTech or advanced certifications are a better fit",
  "Those who dislike cross-functional coordination, stakeholder management, or meetings — the management layer is central",
  "Aspirants with no IT or technology background — this MBA assumes technical foundations",
  "Those targeting investment banking, PE, or pure finance careers — a Finance or IB-specific MBA is a better choice",
  "Professionals who want to stay in a purely hands-on coding role long-term",
];

const FIVE_QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Do you want to manage technology, or do technology?",
    a: "IT & Systems MBA prepares you to manage technology functions — strategy, governance, teams, budgets. If you want to continue as a hands-on engineer or architect, a technical postgraduate programme is a better fit. If you want to lead technology teams and shape IT strategy, this MBA is the right choice.",
  },
  {
    q: "What is your target role in 3 years?",
    a: "Product Manager, IT Director, Enterprise Architect, IT Consultant, or CIO/CTO track? Each has a slightly different programme focus and career development strategy. Know your target before choosing a programme — vague targets produce vague outcomes.",
  },
  {
    q: "Do you have 3+ years of IT or engineering experience?",
    a: "If yes, you have the technical foundation the MBA builds on. If not, consider deepening technical experience first — the MBA's management layer is most valuable when combined with genuine technical depth.",
  },
  {
    q: "Is Tier-1 Executive (IIM/IIT) necessary for your target?",
    a: "Only if your target is MBB consulting or a CTO role at a top-5 tech company. For IT management, product, or Big-4 IT consulting, Online MBA at ₹1.65-2.75 lakh is far better ROI. Most IT professionals do not need to spend ₹22-28 lakh on an Executive MBA.",
  },
  {
    q: "How much career change are you targeting?",
    a: "Moving from software engineer to PM or IT consulting is a moderate career change that an Online MBA supports well. Moving from IT to finance or marketing is a larger change — consider a more broad-based MBA or a different specialization. The MBA works best when you are staying within the technology domain.",
  },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in IT & Systems Management valid in India?", a: "Yes. An Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes including government jobs, further education, and private-sector employment." },
  { q: "Can a software engineer do an MBA in IT & Systems Management?", a: "Yes — it is the most natural transition. Software engineers who add an IT & Systems MBA typically move into Product Management, IT Consulting, Enterprise Architecture, or IT Management. 65% of our alumni in this profile report moving out of purely coding roles within 24 months." },
  { q: "What is the salary after an MBA in IT & Systems Management?", a: "Median 2025-26 salary is ₹8 LPA for freshers, ₹16 LPA at 3-7 years, ₹34 LPA at 8-15 years. CIO/CTO-track roles at 15+ years reach ₹65 LPA to ₹1.5 Cr+." },
  { q: "How much does an IT & Systems MBA cost in India?", a: "Fees range from ₹1.3 lakh (ICFAI Distance) to ₹28 lakh (IIM Bangalore Executive). Mainstream Online MBA programmes sit between ₹1.65 lakh and ₹2.75 lakh." },
  { q: "Is IT & Systems MBA better than MBA in Business Analytics?", a: "They serve different careers. IT & Systems MBA focuses on technology management, IT strategy, and product management. Business Analytics MBA focuses on data-driven decision-making. IT & Systems is stronger for CIO/CTO track and technology management. Business Analytics is stronger for data science or analytics leadership." },
  { q: "Can I get into product management after an IT & Systems MBA?", a: "Yes — Product Management is one of the strongest outcomes for IT & Systems MBA graduates with engineering backgrounds. The MBA adds business strategy, P&L ownership, and stakeholder management skills." },
  { q: "Is enterprise architecture a good career after IT & Systems MBA?", a: "Yes, and it is underrated. Senior Enterprise Architects earn ₹42-75 LPA with less competition than Product or Consulting tracks. High demand at large enterprises undergoing digital transformation." },
  { q: "Which universities offer the best IT & Systems MBA in India?", a: "IIM Ahmedabad PGPX and IIM Bangalore EPGP for Executive mode. IIIT Bangalore for technology-specific management. Symbiosis and NMIMS for Online/Distance mode with strong IT sector placements." },
  { q: "How is AI affecting IT & Systems Management careers?", a: "IT professionals who understand AI governance, cloud AI platforms, and can translate AI capabilities into business outcomes are commanding 20-35% salary premiums in 2025-26. AI strategy is increasingly part of the IT & Systems MBA curriculum." },
  { q: "Can I move into IT consulting after an Online MBA in IT & Systems?", a: "Yes — Big-4 IT consulting (Deloitte, PwC, EY, KPMG), Accenture Technology, IBM Consulting, and Capgemini all hire IT MBA graduates with relevant engineering or IT services backgrounds." },
  { q: "What is the best online MBA for IT Management in India?", a: "The three most-recommended Online MBAs for IT & Systems in 2025-26 are Symbiosis SCOL (strong placement conversion), NMIMS Global Access (strong brand in the IT sector), and Manipal Online (NAAC A++ approved)." },
  { q: "Do employers value Distance and Online IT & Systems MBAs?", a: "Yes, in IT management, product management, Big-4 IT consulting, and MNCs. Tier-1 MBB consulting and top-5 tech firm CTO tracks still prefer Executive MBAs from IIM ABC/IIT/ISB. What matters more than mode is your technical track record and the role you are targeting.", voice: true },
  { q: "Can I do cybersecurity management after an IT & Systems MBA?", a: "Yes. Cybersecurity Management and CISO roles are increasingly filled by IT & Systems MBA graduates with security engineering backgrounds. The MBA adds governance, risk management, and business communication skills that pure technical security professionals often lack.", voice: true },
  { q: "What is the difference between MBA IT Management and MBA Information Systems?", a: "Both cover similar ground with slightly different emphases. IT Management focuses more on managing IT functions and technology teams within organisations. Information Systems focuses more on the intersection of business processes and IT systems. In practice, both degrees open similar career paths.", voice: true },
  { q: "Is there demand for IT & Systems MBA graduates in India?", a: "Yes — and growing. Digital transformation initiatives across BFSI, retail, manufacturing, and government are creating sustained demand for professionals who can bridge technology and business. Our tracking shows 15-20% year-on-year growth in IT management job postings on Naukri and LinkedIn." },
];

const RELATED: { href: string; label: string }[] = [
  { href: "/specializations-guide/finance/", label: "Finance Management" },
  { href: "/specializations-guide/operations/", label: "Operations Management" },
  { href: "/specializations-guide/project-management/", label: "Project Management" },
  { href: "/specializations-guide/supply-chain/", label: "Supply Chain Management" },
  { href: "/specializations-guide/banking-finance/", label: "Banking & Finance" },
  { href: "/specializations-guide/hr/", label: "HR Management" },
  { href: "/specializations-guide/retail/", label: "Retail Management" },
];

export default function ITSystemsGuideClient() {
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
        .it-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .it-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .it-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .it-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .it-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .it-bc-inner li:last-child::after{content:""}
        .it-bc-inner a{color:var(--navy);text-decoration:none}
        .it-bc-inner a:hover{text-decoration:underline}
        .it-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .it-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .it-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .it-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .it-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .it-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .it-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .it-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .it-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .it-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.it-layout{grid-template-columns:1fr}}
        .it-toc-sticky{position:sticky;top:80px}
        .it-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .it-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .it-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .it-toc-desktop nav a.it-active,.it-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .it-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .it-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .it-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.it-toc-mobile{display:none}}
        @media(max-width:900px){.it-toc-desktop{display:none}.it-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .it-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .it-toc-mobile summary::after{content:"▾"}
        .it-toc-mobile[open] summary::after{content:"▴"}
        .it-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .it-toc-mobile a:hover{background:var(--mist)}
        .it-section{margin-bottom:3.5rem;padding-top:.5rem}
        .it-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .it-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .it-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .it-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .it-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .it-facts-table tr:last-child td{border-bottom:none}
        .it-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .it-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .it-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .it-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .it-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .it-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .it-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .it-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .it-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .it-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .it-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .it-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .it-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .it-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .it-role-meta strong{color:var(--charcoal)}
        .it-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .it-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .it-table-wrap{overflow-x:auto}
        .it-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .it-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .it-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .it-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .it-col-highlight{font-weight:600;background:#fef9ec!important}
        .it-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .it-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .it-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .it-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .it-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .it-rank.top3{background:var(--yellow);color:var(--navy)}
        .it-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .it-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .it-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .it-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .it-mode-factor{font-weight:600;color:var(--navy)}
        .it-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .it-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .it-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .it-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .it-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .it-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .it-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .it-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .it-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .it-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .it-faq-list summary::-webkit-details-marker{display:none}
        .it-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .it-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .it-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .it-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .it-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .it-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .it-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .it-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .it-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .it-cta-band button:hover{opacity:.88}
        .it-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .it-below-cta{text-align:center;margin-top:1.25rem}
        .it-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.it-cta-row{flex-direction:column}.it-salary-table th,.it-salary-table td,.it-top10-table th,.it-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="it-progress" aria-hidden="true" />

      <nav className="it-breadcrumb" aria-label="Breadcrumb">
        <div className="it-wrap">
          <ol className="it-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">IT &amp; Systems Management</li>
          </ol>
        </div>
      </nav>

      <header className="it-hero">
        <div className="it-wrap">
          <p className="it-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="it-h1">MBA in IT &amp; Systems Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="it-sub">Fees from ₹1.3 lakh to ₹28 lakh. Salary bands, top 10 UGC-DEB approved programmes compared mode-by-mode. Built for software engineers and IT professionals.</p>
          <p className="it-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="it-cta-row">
            <button className="it-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="it-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="it-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="it-wrap">
        <div className="it-layout">
          <aside>
            <div className="it-toc-sticky">
              <details className="it-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="it-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "it-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="it-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key Takeaways */}
            <section id="takeaways" className="it-section">
              <h2>Key takeaways</h2>
              <ul className="it-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot — 90 seconds */}
            <section id="snapshot" className="it-section">
              <h2>MBA in IT &amp; Systems Management, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in IT &amp; Systems Management trains you to manage technology functions in business — IT strategy, enterprise architecture, digital transformation, cloud strategy, cybersecurity management, IT service management, and product management. As of 2025-26, it&apos;s the highest-transition-value MBA for mid-career software engineers moving into technology management, product, or consulting roles.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.3 lakh (ICFAI Distance) to ₹28 lakh (IIM Bangalore Executive), with the mainstream Online MBA median at ₹2 lakh. Median entry-level salary for an IT &amp; Systems MBA graduate in 2025-26 stands at ₹8 lakh per annum for freshers, ₹16 lakh for mid-level (3-7 years&apos; experience), and ₹34 lakh for senior roles (8-15 years). CIO/CTO tracks at 15+ years reach ₹65 LPA to ₹1.5 Cr+.</p>
              <table className="it-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* What this MBA is */}
            <section id="what-it-is" className="it-section">
              <h2>What is an MBA in IT &amp; Systems Management?</h2>
              <p>An MBA in IT &amp; Systems Management is a two-year (Distance/Online) or one-year (Executive) postgraduate management programme specializing in the business management of technology functions. Core disciplines include IT strategy, enterprise architecture, digital transformation, cloud and infrastructure management, IT service management (ITSM), cybersecurity governance, ERP systems, and product management fundamentals.</p>
              <div className="it-profile-grid" style={{ marginTop: "1.5rem" }}>
                <div className="it-profile-card">
                  <h3>This is NOT a technical coding degree</h3>
                  <p>IT &amp; Systems MBA teaches the business management of technology — strategy, governance, architecture, and leadership. Technical skills are a prerequisite, not the output. If you want to deepen coding skills, a technical master&apos;s or MTech is a better fit.</p>
                </div>
                <div className="it-profile-card">
                  <h3>The enterprise architecture path is underrated</h3>
                  <p>Enterprise Architects at senior levels earn ₹42-75 LPA — matching Product Management and ahead of most IT management tracks — with significantly less competition for roles. If you enjoy systems design, governance, and cross-functional architecture, EA is worth exploring seriously.</p>
                </div>
                <div className="it-profile-card">
                  <h3>65% of our IT MBA alumni moved out of coding within 24 months</h3>
                  <p>Based on our internal alumni tracking. The shift is typically to Product Management, IT Consulting, IT Management, or Enterprise Architecture. The MBA provides the business context and credentialing that make hiring managers confident in the transition.</p>
                </div>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="it-section">
              <h2>Who fits an MBA in IT &amp; Systems Management?</h2>
              <p>Three profiles consistently get strong career outcomes from this specialisation.</p>
              <div className="it-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="it-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
              <h2 style={{ marginTop: "2.5rem" }}>Who should not choose this MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="it-notfit-list">
                <li>Professionals who prefer pure technical depth over management — consider MTech or advanced certifications instead</li>
                <li>Those who dislike stakeholder management, meetings, and cross-functional coordination — the management layer is central, not optional</li>
                <li>Aspirants without any IT or technology background — the MBA assumes technical foundations; marketing or operations MBA is a better fit</li>
                <li>Those targeting investment banking, PE, or pure finance careers — Finance or IB-specific MBA is a better choice</li>
              </ul>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="it-section">
              <h2>IT &amp; Systems Management MBA Curriculum 2025-26</h2>
              <p>A 2025-26 IT &amp; Systems Management MBA covers management foundations, then goes deep on IT strategy, enterprise architecture, cloud computing, cybersecurity management, digital transformation, ERP systems, and product management. The 2025-26 additions are AI Strategy for IT Leaders and Platform Engineering &amp; DevOps Management.</p>
              <div className="it-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="it-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="it-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> AI Strategy for IT Leaders is now an elective covering LLMs, AI governance frameworks, cloud AI platforms, and how to translate AI capabilities into business outcomes. Platform Engineering &amp; DevOps Management covers platform teams, SRE practices, and FinOps — directly relevant for IT professionals targeting product or engineering management roles.</em>
              </div>
            </section>

            {/* Careers */}
            <section id="careers" className="it-section">
              <h2>Career paths after an IT &amp; Systems Management MBA</h2>
              <p>IT &amp; Systems Management opens seven distinct career families across product, consulting, enterprise architecture, IT management, digital transformation, project management, and cybersecurity.</p>
              <div className="it-callout">
                <em>From our 2024-25 counselling desk: Product Management is the most popular career outcome for IT &amp; Systems MBA graduates with engineering backgrounds. 65% of our alumni in this profile report moving out of purely coding roles within 24 months of graduation. Enterprise Architecture is the most underrated high-value path — EA senior roles at ₹42-75 LPA with significantly less competition than Product or Consulting tracks. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="it-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="it-role-card">
                    <h3>{r.title}</h3>
                    <p className="it-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="it-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="it-role-salary">{r.salary}</p>
                    {r.note && <p className="it-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="it-section">
              <h2>What an IT &amp; Systems Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in IT &amp; Systems Management sits at ₹8 LPA for freshers (0-2 years&apos; experience), ₹16 LPA for mid-level (3-7 years), and ₹34 LPA for senior roles (8-15 years). CIO/CTO track roles at 15+ years reach ₹65 LPA to ₹1.5 Cr+. Executive MBA graduates command 30-50% premiums at entry and mid levels.</p>
              <div className="it-table-wrap">
                <table className="it-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance MBA</th>
                      <th>Executive MBA</th>
                      <th>Online MBA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r[0]}>
                        <td>{r[0]}</td>
                        <td>{r[1]}</td>
                        <td className="it-col-highlight">{r[2]}</td>
                        <td>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="it-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile.</p>
              <div className="it-callout">
                <em><strong>What these numbers do not tell you:</strong> ESOP and RSU components at product companies (Microsoft, Google, Amazon, Salesforce, Razorpay, Freshworks) add 20-50% to total compensation over 4-year vesting at senior PM and IT leadership roles. Big-4 IT consulting Manager and Partner tracks carry significant performance bonuses above base salary.</em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="it-section">
              <h2>The 10 IT &amp; Systems Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking, and CollegeNCourses counsellor feedback.</p>
              <div className="it-table-wrap">
                <table className="it-top10-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Programme / University</th>
                      <th>Mode</th>
                      <th>Duration</th>
                      <th>Fee</th>
                      <th>Key Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP10_ROWS.map((r) => (
                      <tr key={r.rank}>
                        <td><span className={`it-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
                        <td>{r.name}</td>
                        <td>{r.mode}</td>
                        <td>{r.duration}</td>
                        <td>{r.fee}</td>
                        <td>{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="it-source">As of 2025-26. Fees are total programme cost. Rankings based on CollegeNCourses internal counsellor tracking and alumni feedback from IT &amp; Systems Management graduates.</p>
              <div className="it-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="it-section">
              <h2>Distance vs Online vs Executive: Which mode fits?</h2>
              <p>The mode choice for IT &amp; Systems Management hinges on your work experience level, target role, and whether a Tier-1 Executive MBA is necessary to achieve your specific career goal.</p>
              <div className="it-callout">
                <em>From our counselling records 2023-25: Most working IT professionals do not need to spend ₹22-28 lakh on an Executive MBA. For Product Management, Big-4 IT consulting, and IT management roles, Online MBA at ₹1.65-2.75 lakh delivers far better ROI. Executive MBA is justified only for MBB consulting reset or CTO track at top-5 tech companies. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="it-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="it-mode-table">
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Distance MBA</th>
                      <th>Online MBA</th>
                      <th>Executive MBA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r[0]}>
                        <td className="it-mode-factor">{r[0]}</td>
                        <td>{r[1]}</td>
                        <td>{r[2]}</td>
                        <td>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick an IT &amp; Systems Management MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="it-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if an IT &amp; Systems Management MBA is right for you: 5 questions</h2>
              <div className="it-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((item, idx) => (
                  <div key={idx} className="it-howto-card">
                    <div className="it-howto-num">{idx + 1}</div>
                    <div>
                      <h3>{item.q}</h3>
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="it-section">
              <h2>Frequently asked questions</h2>
              <div className="it-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="it-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="it-section">
              <h2>Explore other specialization guides</h2>
              <ul className="it-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.label}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      <section className="it-cta-band">
        <div className="it-wrap">
          <h2>Ready to shortlist your IT &amp; Systems MBA?</h2>
          <p>We&apos;ll match you to three programmes based on your target role (Product, Consulting, EA, IT Management), your existing IT experience, and your budget. Free 30-minute call.</p>
          <button onClick={() => setModalOpen(true)}>Get matched →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-it-systems" />
    </>
  );
}
