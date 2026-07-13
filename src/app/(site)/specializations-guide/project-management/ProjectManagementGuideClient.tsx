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
  `PMP + MBA is the sharpest promotion accelerator in the specialization. Aspirants adding both reported 40-55% faster promotion to Senior PM and Program Manager roles.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (XLRI Executive). Mainstream Online MBA median sits at ₹1.9 lakh for 24 months.`,
  `Median salaries (2025-26): ₹6.5 LPA for freshers, ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years. Program Manager and PMO Head roles push ₹40-70 LPA.`,
  `Best-fit profile: Existing project professionals wanting formal credential; IT engineers moving from technical to PM roles; construction/infrastructure engineers wanting management titles; and consultants wanting to move into PM leadership.`,
  `Poor-fit signal: If you prefer creative, exploratory, or purely analytical work, or dislike structured methodologies, choose Marketing, Analytics, or Finance instead.`,
  `Top pick by mode (2025-26): Symbiosis Online, NMIMS Distance, IIM Kozhikode EPGP (Executive).`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹22 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹6.5 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹14 LPA" },
  { label: "Top employers", value: "TCS, Infosys, Wipro, Cognizant, Accenture, HCL, Capgemini, L&T, TATA Projects, Godrej Properties, Shapoorji Pallonji, Deloitte, PwC, EY, Reliance" },
  { label: "Fits best if", value: "Existing PM, IT engineer moving to PM, or construction engineer wanting management title" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "The existing project professional wanting formal credential",
    body: `Two to twelve years' experience as a project coordinator, junior PM, or delivery lead at IT services (TCS, Infosys, Wipro, Cognizant, HCL, Accenture) or a mid-tier consulting firm. Wants a management credential to unlock Senior PM or Program Manager promotions. This is the largest single fit-persona for PM MBAs in 2025-26.`,
  },
  {
    title: "The IT engineer or technical lead moving to PM roles",
    body: `Three to ten years' experience in software engineering, technical architecture, or QA at IT services or product companies. Wants to move out of hands-on coding into PM or Delivery Manager roles. Distance or Online MBA fits — plus a PMP or Scrum Master certification alongside is the standard combination.`,
  },
  {
    title: "The construction or infrastructure engineer wanting management titles",
    body: `Civil, mechanical, or electrical engineer with 3-8 years at L&T, TATA Projects, Shapoorji Pallonji, Godrej Properties, or infrastructure PSUs. Wants to move from technical execution to Project Head, Site Manager, or Head of Delivery. Distance or Online MBA fits — construction sector recognises the credential well for management progression.`,
  },
  {
    title: "The consultant moving into PM leadership",
    body: `Existing consultant at Deloitte, EY, PwC, KPMG, or Accenture wanting to move into large-programme delivery leadership or transformation consulting. Executive MBA at IIM Kozhikode EPGP or XLRI fits.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Project Management Fundamentals (PMBOK-aligned).",
  },
  {
    title: "Semester 2 — PM core",
    subjects: "Agile & Scrum Methodologies, PRINCE2 Framework, Project Planning & Scheduling (MS Project, Primavera), Risk Management, Stakeholder Management, Business Communication.",
  },
  {
    title: "Semester 3 — Applied project management",
    subjects: "Program & Portfolio Management, Project Cost Management (EVM techniques), Quality Management in Projects, PM Tools (Jira, Asana, Monday.com, Trello), Contract & Procurement Management, Project Human Resources.",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "AI in Project Management (new elective — LLMs for status reports, risk prediction, resource optimisation), Sustainability & ESG in Projects (new elective — carbon accounting for construction, green project management), Change Management, Project Leadership & Team Dynamics, Industry Capstone Project.",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Project Manager (IT / Software)",
    path: "PM → Senior PM → Delivery Manager → Head of Delivery",
    employers: "TCS, Infosys, Wipro, Cognizant, HCL, Accenture, Capgemini, Tech Mahindra",
    salary: "Largest single career family. Median cluster ₹12-22 LPA at 5-8 years.",
  },
  {
    title: "Program Manager",
    path: "Program Manager → Senior Program Manager → Head of Programs → VP Delivery",
    employers: "IT services (senior levels), product companies, banks and insurance (transformation PMs), consulting",
    salary: "35% higher pay than PM roles within 24 months of transition, per our counsellor tracking.",
  },
  {
    title: "Construction / Infrastructure PM",
    path: "Site Engineer → Project Engineer → Project Manager → Project Director → Head of Projects",
    employers: "L&T, TATA Projects, Shapoorji Pallonji, Godrej Properties, DLF, Prestige, TATA Realty",
    salary: "Growing career family driven by India's infrastructure push.",
    note: "Strong combination with PRINCE2 certification for this sector.",
  },
  {
    title: "Portfolio Management / PMO Head",
    path: "PMO Analyst → PMO Manager → Head of PMO → Chief Delivery Officer",
    employers: "Large IT services, consulting firms, large banks and NBFCs undergoing transformation",
    salary: "Strategic and high-visibility role; pays well.",
  },
  {
    title: "Scrum Master / Agile Coach",
    path: "Scrum Master → Senior Scrum Master → Agile Coach → Head of Agile Transformation",
    employers: "IT services, product companies, banks (Agile transformation is huge in BFSI)",
    salary: "Growing career family; higher pay for Enterprise Agile Coaches (₹35-55 LPA at senior levels).",
  },
  {
    title: "Consulting (Transformation PM)",
    path: "Consultant → Senior Consultant → Manager → Principal",
    employers: "Deloitte, PwC, EY, KPMG, Accenture Strategy, IBM Consulting",
    salary: "Best accessed through Executive MBA at IIM Kozhikode or XLRI.",
  },
  {
    title: "Product / Category Launch PM",
    path: "Launch PM → Senior Launch PM → Head of Launches → VP Product Operations",
    employers: "Consumer goods (HUL, ITC, Nestle), pharma (major clinical trials and launches), consumer tech, e-commerce",
    salary: "Specialized but well-paid.",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹5 – 8 LPA", exec_t1: "₹9 – 15 LPA", exec_t2: "₹6 – 10 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹10 – 18 LPA", exec_t1: "₹19 – 32 LPA", exec_t2: "₹13 – 22 LPA" },
  { band: "Senior, 8-15 years", dist: "₹20 – 38 LPA", exec_t1: "₹38 – 62 LPA", exec_t2: "₹25 – 44 LPA" },
  { band: "Leadership, 15+ years", dist: "₹38 – 62 LPA", exec_t1: "₹62 LPA – ₹1.1 Cr", exec_t2: "₹45 – 78 LPA" },
  { band: "CDO / Head of PMO (top 5%)", dist: "₹55 LPA+", exec_t1: "₹1.1 Cr+", exec_t2: "₹72 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "Executive MBA (PM focus)", university: "XLRI Jamshedpur", mode: "Executive (weekend)", duration: "15 mo", fee: "₹22 L", placement: "Very Strong (~96%)", strength: "Legacy strength in PM + ops" },
  { rank: 2, programme: "EPGP (PM track)", university: "IIM Kozhikode", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~94%)", strength: "Best value IIM PM track" },
  { rank: 3, programme: "PGPX (with PM electives)", university: "IIM Ahmedabad", mode: "Executive (residential)", duration: "12 mo", fee: "₹28 L", placement: "Very Strong (~100%)", strength: "Top brand for consulting transformation PM reset" },
  { rank: 4, programme: "Online MBA Project Management", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.5 L", placement: "Strong (~74%)", strength: "Live faculty, strong IT services alumni" },
  { rank: 5, programme: "Distance MBA Project Management", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.8 L", placement: "Moderate-Strong (~65%)", strength: "Industry-tied PM projects" },
  { rank: 6, programme: "Online MBA Project Management", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~54%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA Project Management", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~56%)", strength: "Widest PM electives" },
  { rank: 8, programme: "Online MBA Project Management", university: "Jain (Deemed-to-be-Univ) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~58%)", strength: "Value + strong accreditation" },
  { rank: 9, programme: "Online MBA Project Management", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~52%)", strength: "Strong newer entrant" },
  { rank: 10, programme: "Distance MBA Project Management", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Existing PM at TCS/Infosys/Wipro/Cognizant wanting Senior PM", mode: "Distance or Online MBA + PMP", why: "Credential + certification combination unlocks promotion; large fee premium unnecessary" },
  { situation: "IT engineer moving from coding into PM", mode: "Online MBA + Scrum Master", why: "Live faculty + methodology certification bridge cleanly" },
  { situation: "Construction/infrastructure engineer wanting Site or Project Head", mode: "Distance or Online MBA", why: "Sector recognises credential well; PRINCE2 pairs strongly" },
  { situation: "PM targeting Program Manager or PMO Head roles", mode: "Online MBA (Symbiosis, NMIMS, or Manipal)", why: "Curriculum breadth + credential fuel the strategic leap" },
  { situation: "Consultant targeting Tier-1 transformation PM at Deloitte/PwC/EY", mode: "Executive MBA (XLRI or IIM Kozhikode EPGP)", why: "Consulting placement is brand-gated" },
  { situation: "Aspirant targeting Enterprise Agile Coach role", mode: "Online MBA + advanced Scrum certifications", why: "Combination outperforms pure MBA for this specialised path" },
  { situation: "Fresh engineering grad wanting PM career", mode: "Online MBA", why: "Executive requires 3+ years; Online delivers structured entry" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You prefer creative, exploratory, or ambiguous work. Choose Marketing Management or Digital Marketing.`,
  `You want purely analytical or quantitative work. Choose Business Analytics or Finance Management.`,
  `You dislike structured methodologies (PMBOK, Agile, PRINCE2). PM is fundamentally about following and adapting structured frameworks.`,
  `You resist stakeholder-heavy calendars. PMs spend 40-60% of their week in meetings — status calls, retrospectives, steering committees, escalations.`,
  `You want to remain a hands-on individual contributor. PM MBAs are for people wanting to orchestrate work through others.`,
  `You're choosing PM MBA because 'PM roles are common.' They are — but the daily work is heavy on communication, negotiation, and administrative rigour.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target industry — IT, construction, consulting, or product", body: `Each has different economics, employer preferences, and dominant methodologies. IT services PMs use Agile/Scrum heavily. Construction PMs use PMBOK plus PRINCE2. Consulting transformation PMs blend all methodologies. Know which one you're targeting so you can weight electives accordingly.` },
  { step: 2, title: "Plan your PMP or Scrum Master certification alongside the MBA", body: `The combination is genuinely more powerful than either alone (per counsellor observation in Section 7). Budget ₹40k-60k additionally for PMP; ₹20k for Scrum Master. Most programmes support the certification pathway during Semester 3-4.` },
  { step: 3, title: "Confirm whether Program Manager or Tier-1 consulting reset is a realistic goal", body: `If yes — Executive MBA at XLRI or IIM Kozhikode EPGP justifies the ₹15-22 lakh. If not — Online MBA is far better ROI. The regret pattern here is aspirants stretching to Executive without a specific consulting-reset or Program Manager opportunity in view.` },
  { step: 4, title: "Audit your comfort with stakeholder-heavy work", body: `PM roles are people-and-process-heavy. If you enjoy running structured meetings, managing expectations, negotiating scope changes, and communicating status upward — you'll thrive. If any of these feel draining, reconsider the specialization.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹28 L is the full range. Most working professionals fit ₹1.9 L to ₹2.5 L Online. Stretching to Executive without a specific Tier-1 consulting reset or Program Manager transition is the most expensive regret we track in this specialization.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Project Management valid in India?", a: `Yes. An Online MBA in Project Management from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.` },
  { q: "Is PMP better than an MBA in Project Management?", a: `They serve different purposes. PMP is a certification recognised globally for project execution competency. MBA in Project Management is a management degree covering strategy, leadership, and cross-functional business context. Aspirants holding both reported 40-55% faster promotion to Senior PM and Program Manager roles than aspirants holding either alone.` },
  { q: "How much does a Project Management MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹28 lakh (IIM Ahmedabad PGPX). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.4 lakh and ₹2.5 lakh total.` },
  { q: "What is the salary after an Online MBA in Project Management?", a: `Median 2025-26 salary is ₹6.5 LPA for freshers, ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years. Program Manager and PMO Head roles push ₹40-70 LPA. Program Manager roles pay ~35% above pure PM roles at the same experience level.` },
  { q: "Do I need a PMP certification before or after the MBA?", a: `Most aspirants pursue PMP alongside or after the MBA — not before. The MBA provides the management context that makes PMP preparation faster. Some programmes (Symbiosis SCOL, NMIMS) bundle PMP prep materials into Semester 3-4. Budget ₹40k-60k for the PMP exam and prep costs separately.` },
  { q: "What is the difference between a PM MBA and an Operations Management MBA?", a: `PM MBAs focus on delivering discrete projects and programmes — scope, schedule, cost, risk, stakeholders. Operations Management MBAs focus on running ongoing business operations — supply chain, process improvement, capacity planning, lean manufacturing. Choose PM MBA if you want to deliver change initiatives; choose Ops MBA if you want to run steady-state business functions.` },
  { q: "Can I do a PM MBA without prior project management experience?", a: `Yes. Roughly 40% of PM MBA enrolments come from non-PM backgrounds — engineering, IT, or science graduates wanting to enter PM careers. The MBA teaches PM frameworks from first principles. Expect the first 4-6 months to feel steep if project coordination is unfamiliar territory.` },
  { q: "Which universities have the best placement records for PM MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Ahmedabad PGPX (~96%), XLRI Jamshedpur (~96%), IIM Kozhikode EPGP (~94%), and Symbiosis Online (~74%). IT services (TCS, Infosys, Wipro, Cognizant) and consulting (Deloitte, PwC, EY) are the dominant employer segments.` },
  { q: "How is AI affecting Project Management careers in India?", a: `AI is substantially restructuring project administration — automated status reporting, AI-assisted risk prediction, resource optimisation tools. What remains human: stakeholder relationship management, scope negotiation, escalation judgement, and cross-functional alignment. PM MBA graduates in 2025-27 should expect interview questions on AI-augmented project tracking and LLM-assisted reporting tools.` },
  { q: "Can I move to Program Management after a Distance or Online PM MBA?", a: `Yes. Our counsellor tracking shows approximately 50% of Distance and Online PM MBA graduates who actively pursue Program Management roles transition within 24 months of completing the degree. The key factors: 5+ years of existing PM experience, PMP certification alongside the MBA, and targeting companies undergoing large transformation programmes. Salary progression of 30-40% on transition is typical.` },
  { q: "What are education loan options for a PM MBA?", a: `For Online MBAs at ₹1.4-2.5 lakh, most working professionals pay from monthly salary. For Executive MBAs at ₹15-22 lakh, education loans are widely available: SBI (up to ₹1.5 crore), HDFC Credila (up to ₹75 lakh), ICICI Bank, Avanse, Auxilo at 9.5-12.5% in 2025-26.` },
  { q: "How does CollegeNCourses help me choose a PM MBA?", a: `Our counsellors match you to programmes based on your target industry (IT, construction, consulting, or product), certification plan (PMP, Scrum), consulting reset aspirations, budget, and timeline. Free 30-minute call. No paid referral affects our recommendation.` },
  { q: "Is Project Management MBA a good career option?", a: `Yes, particularly for existing project professionals and IT engineers moving into management. India's IT services growth, infrastructure push, and consulting expansion are driving structural PM hiring across industries. Entry salaries are competitive and senior-level paths (Program Manager, PMO Head, Chief Delivery Officer) pay extremely well.`, voice: true },
  { q: "How much salary after PM MBA in India?", a: `Median starting salary after an Online MBA in Project Management is ₹6.5 LPA in India in 2025-26. It scales to ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years, and ₹40-70 LPA at Program Manager and PMO Head levels. Executive MBA from XLRI or IIM Kozhikode pushes these numbers significantly higher.`, voice: true },
  { q: "Which is the best MBA for project management in India?", a: `The three most-recommended programmes for Project Management in 2025-26 are XLRI Jamshedpur Executive MBA (legacy PM strength, ~96% placement), Symbiosis Centre for Online Learning (live faculty, strong IT services alumni), and NMIMS Global Access Distance MBA (strong PM brand recognition in Indian corporates). IIM Kozhikode EPGP is the best-value IIM option for Executive mode.`, voice: true },
  { q: "Do employers actually value Distance and Online PM MBAs in 2025-26?", a: `Yes, in IT services, construction, consulting, and manufacturing. TCS, Infosys, Wipro, Cognizant, HCL, and mid-tier IT firms actively promote Distance and Online MBA PM graduates to Senior PM and Delivery Manager roles. Tier-1 consulting (MBB) still prefers Executive MBAs from IIM/XLRI for transformation PM leadership. What matters more than mode is your project delivery track record, methodology certifications (PMP, Scrum), and industry-specific capstone work.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Operations Management: The Honest Guide", href: "/specializations-guide/operations/" },
  { title: "MBA in IT & Systems Management: The Honest Guide", href: "/specializations-guide/it-systems/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function ProjectManagementGuideClient() {
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
        .pm-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .pm-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .pm-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .pm-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .pm-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .pm-bc-inner li:last-child::after{content:""}
        .pm-bc-inner a{color:var(--navy);text-decoration:none}
        .pm-bc-inner a:hover{text-decoration:underline}
        .pm-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .pm-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .pm-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .pm-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .pm-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .pm-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .pm-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .pm-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .pm-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .pm-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.pm-layout{grid-template-columns:1fr}}
        .pm-toc-sticky{position:sticky;top:80px}
        .pm-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .pm-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .pm-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .pm-toc-desktop nav a.pm-active,.pm-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .pm-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .pm-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .pm-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.pm-toc-mobile{display:none}}
        @media(max-width:900px){.pm-toc-desktop{display:none}.pm-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .pm-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .pm-toc-mobile summary::after{content:"▾"}
        .pm-toc-mobile[open] summary::after{content:"▴"}
        .pm-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .pm-toc-mobile a:hover{background:var(--mist)}
        .pm-section{margin-bottom:3.5rem;padding-top:.5rem}
        .pm-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .pm-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .pm-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .pm-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .pm-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .pm-facts-table tr:last-child td{border-bottom:none}
        .pm-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .pm-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .pm-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .pm-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .pm-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .pm-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .pm-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .pm-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .pm-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .pm-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .pm-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .pm-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .pm-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .pm-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .pm-role-meta strong{color:var(--charcoal)}
        .pm-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .pm-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .pm-table-wrap{overflow-x:auto}
        .pm-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .pm-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .pm-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .pm-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .pm-col-highlight{font-weight:600;background:#fef9ec!important}
        .pm-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .pm-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .pm-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .pm-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .pm-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .pm-rank.top3{background:var(--yellow);color:var(--navy)}
        .pm-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .pm-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .pm-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .pm-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .pm-mode-rec{font-weight:700;color:var(--navy)}
        .pm-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .pm-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .pm-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .pm-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .pm-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .pm-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .pm-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .pm-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .pm-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .pm-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .pm-faq-list summary::-webkit-details-marker{display:none}
        .pm-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .pm-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .pm-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .pm-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .pm-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .pm-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .pm-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .pm-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .pm-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .pm-cta-band button:hover{opacity:.88}
        .pm-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .pm-below-cta{text-align:center;margin-top:1.25rem}
        .pm-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.pm-cta-row{flex-direction:column}.pm-salary-table th,.pm-salary-table td,.pm-top10-table th,.pm-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="pm-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="pm-breadcrumb" aria-label="Breadcrumb">
        <div className="pm-wrap">
          <ol className="pm-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Project Management</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="pm-hero">
        <div className="pm-wrap">
          <p className="pm-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="pm-h1">MBA in Project Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="pm-sub">Fees from ₹1.2 lakh to ₹22 lakh. Real salary data across IT services, construction, consulting, and infrastructure. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="pm-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="pm-cta-row">
            <button className="pm-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="pm-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="pm-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="pm-wrap">
        <div className="pm-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="pm-toc-sticky">
              <details className="pm-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="pm-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "pm-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="pm-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="pm-section">
              <h2>Key takeaways</h2>
              <ul className="pm-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="pm-section">
              <h2>Project Management MBA, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in Project Management trains you to deliver projects and programmes on time, within budget, and at quality — using structured methodologies like PMBOK, Agile, Scrum, and PRINCE2. As of 2025-26, it&apos;s one of India&apos;s most cross-industry-portable MBA specializations, with strong demand across IT services, construction, consulting, pharma, and infrastructure.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹22 lakh (XLRI Executive), with the mainstream Online MBA median at ₹1.9 lakh. Median entry-level salary for a Project Management MBA graduate in 2025-26 stands at ₹6.5 lakh per annum for freshers, ₹14 lakh for mid-level (3-7 years&apos; experience), and ₹28 lakh for senior roles (8-15 years). PMO Head and Chief Delivery Officer roles reach ₹40-80 LPA.</p>
              <table className="pm-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* What it is */}
            <section id="what-it-is" className="pm-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Project Management, at postgraduate level, is the discipline of delivering initiatives predictably — planning scope, managing schedule, controlling cost, mitigating risk, aligning stakeholders, and closing projects to plan.</p>
              <p>What makes it different from an Operations Management MBA is <em>project versus process</em>. Project Management trains you for discrete, time-bound initiatives — product launches, IT system rollouts, infrastructure builds, business transformation programmes. Operations Management trains you for ongoing, repeatable business functions — supply chain, manufacturing, process improvement. Choose PM MBA if you want to deliver change; choose Ops MBA if you want to run steady-state operations.</p>
              <div className="pm-callout">
                <em>A misconception: &apos;Project Management MBA is only for IT project managers.&apos; It isn&apos;t. Modern PM MBAs land at construction, pharma, consulting, healthcare, and infrastructure alongside traditional IT services. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="pm-section">
              <h2>Who this specialization is built for</h2>
              <p>Project Management MBAs work best for four broad profiles.</p>
              <div className="pm-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="pm-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="pm-section">
              <h2>What a 2025-26 Project Management MBA actually teaches</h2>
              <p>A 2025-26 Project Management MBA covers management foundations, then goes deep on PMBOK-aligned project management, Agile and Scrum methodologies, PRINCE2 framework, project planning and scheduling, risk management, stakeholder management, program and portfolio management, project cost management (EVM), and PM tools (Jira, Asana, MS Project, Primavera). The 2025 additions are AI in Project Management and Sustainability &amp; ESG in Projects.</p>
              <div className="pm-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="pm-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="pm-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> AI in Project Management — covering LLMs for automated status reporting, risk prediction, and resource optimisation — is now offered as an elective at IIM Kozhikode EPGP, Symbiosis SCOL, and NMIMS. Sustainability &amp; ESG in Projects (carbon accounting for construction, green project management frameworks) is now offered at ISB, IIM programmes, and Symbiosis. Both are becoming interview-tested at Deloitte, PwC, and EY transformation PM interviews.</em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="pm-section">
              <h2>The roles a Project Management MBA leads to</h2>
              <p>Project Management opens seven distinct career paths — from the largest and most accessible (Project Manager IT/Software) to the highest-ceiling (Portfolio Management and PMO Head).</p>
              <div className="pm-callout">
                <em>From our 2024-25 counselling desk: The PMP certification plus MBA combination is the sharpest promotion accelerator we track for project professionals. Aspirants adding both reported 40-55% faster promotion to Senior PM and Program Manager roles. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="pm-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="pm-role-card">
                    <h3>{r.title}</h3>
                    <p className="pm-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="pm-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="pm-role-salary">{r.salary}</p>
                    {r.note && <p className="pm-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="pm-section">
              <h2>What a Project Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Project Management sits at ₹6.5 lakh per annum for freshers (0-2 years&apos; experience), ₹14 lakh for mid-level (3-7 years), and ₹28 lakh for senior roles (8-15 years). Program Manager and PMO Head roles push ₹40-70 LPA.</p>
              <div className="pm-table-wrap">
                <table className="pm-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 IIM / XLRI)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="pm-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="pm-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. Bonus and ESOP compensation not reflected.</p>
              <div className="pm-callout">
                <em>From our counselling records 2023-25: Program Management is the hidden career path most aspirants miss. Alumni who transitioned from PM to Program Manager reported 35% higher pay within 24 months — because Program Management involves orchestrating multiple projects and gets treated as a leadership role rather than a delivery role. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="pm-section">
              <h2>The 10 Project Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="pm-table-wrap">
                <table className="pm-top10-table">
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
                        <td><span className={`pm-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="pm-source">As of 2025-26. Fees are total programme cost. IIM Ahmedabad PGPX at ₹28 lakh is warranted only for aspirants with a specific Tier-1 consulting transformation PM reset target. Placement support ratings from CollegeNCourses internal alumni tracking.</p>
              <div className="pm-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="pm-section">
              <h2>Distance, Online, or Executive: which mode fits your Project Management career</h2>
              <p>The mode decision for Project Management hinges on your current experience level, target industry, and whether a consulting reset or Program Manager transition is a concrete goal.</p>
              <div className="pm-callout">
                <em>From our counselling records 2023-25: Program Management is the hidden career path most aspirants miss. Alumni who transitioned from PM to Program Manager reported 35% higher pay within 24 months — because Program Management involves orchestrating multiple projects and gets treated as a leadership role rather than a delivery role. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="pm-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="pm-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="pm-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick a Project Management MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="pm-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if a Project Management MBA is right for you: 5 questions</h2>
              <div className="pm-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="pm-howto-card">
                    <div className="pm-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="pm-section">
              <h2>Frequently asked questions</h2>
              <div className="pm-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="pm-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="pm-section">
              <h2>Go deeper</h2>
              <ul className="pm-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="pm-cta-band">
        <div className="pm-wrap">
          <h2>Ready to shortlist your Project Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target industry (IT, construction, consulting, or product), certification plan (PMP, Scrum), consulting reset aspirations, budget, and timeline. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-project-management" />
    </>
  );
}
