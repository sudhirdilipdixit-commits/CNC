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
  `Fastest-growing role family within HR is HR Business Partnering. HRBP path alumni report 45-55% salary progression over 3 years vs 22-30% for pure operational HR.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (XLRI HR). Mainstream Online MBA median sits at ₹1.9 lakh for 24 months.`,
  `Median salaries (2025-26): ₹6 LPA for freshers, ₹13 LPA at 3-7 years, ₹28 LPA at 8-15 years. CHRO track reaches ₹50 LPA–₹1 Cr at leadership levels.`,
  `Best-fit profile: Existing HR executives wanting promotion; people-oriented professionals moving into HR; CAs/commerce grads wanting sector switch to consulting; and operations professionals wanting to move into people functions.`,
  `Poor-fit signal: If you prefer purely quantitative work, dislike ambiguity in performance conversations, or want brand-facing creative roles, choose Business Analytics, Finance, or Marketing instead.`,
  `Top pick by mode (2025-26): XLRI (Executive, unmatched HR brand), Symbiosis Online, NMIMS Distance.`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹25 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹6 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹13 LPA" },
  { label: "Top employers", value: "TATA Group, Reliance, Aditya Birla, ITC, HUL, Infosys, TCS, Wipro, Deloitte People, Mercer, Aon, Darwinbox, Freshworks" },
  { label: "Fits best if", value: "HR executive wanting promotion, or people-oriented professional moving into HR" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "The existing HR executive wanting promotion",
    body: `Two to twelve years' experience in HR generalist, talent acquisition, HR operations, or L&D roles. Currently an HR Executive, Senior HR Executive, or HR Officer. Wanting a promotion to HRBP, HR Manager, or Senior Manager. Blocked by 'MBA required' clause in most large corporates. This is the largest single fit-persona for HR MBAs in 2025-26. Distance or Online MBA fits perfectly.`,
  },
  {
    title: "The people-oriented professional switching into HR",
    body: `Three to ten years' experience in operations, sales management, consulting, or IT project management. Recognises they get more energy from people-facing work than technical execution. Wants to move into HRBP or organizational development roles. Online MBA fits. XLRI Executive is a strong option for aspirants with 5+ years and Tier-1 career reset ambitions.`,
  },
  {
    title: "The consulting aspirant targeting HR practices",
    body: `Existing consultant, HR generalist, or business professional wanting to move into HR consulting at Mercer, Aon, Deloitte People Advisory, KPMG People Consulting, or Willis Towers Watson. Executive MBA at XLRI is the gold standard for this path. IIM Kozhikode EPGP or Symbiosis SCOL are strong alternatives.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, HR Management Foundations.",
  },
  {
    title: "Semester 2 — HR core",
    subjects: "Strategic HRM, Talent Acquisition & Recruitment, Compensation & Benefits Design, Employee Relations & Labour Law (Industrial Disputes Act, Labour Codes 2020), Business Communication, HR Operations.",
  },
  {
    title: "Semester 3 — Applied HR",
    subjects: "Learning & Development, Performance Management, Organizational Development & Change Management, HR Analytics with Excel, Talent Management, International HR.",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "People Analytics with AI (new elective — using LLMs for engagement analysis, sentiment tracking, predictive attrition modelling), Diversity, Equity & Inclusion frameworks, HR Tech Stack Management (Darwinbox, Workday, SuccessFactors), Employee Experience Design, Industry Capstone Project.",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "HR Business Partnering (HRBP)",
    path: "HRBP Associate → HRBP Manager → Senior HRBP → Head of HRBP → CHRO",
    employers: "Any Fortune-500, Indian conglomerate (TATA, Reliance, Aditya Birla), MNC, or growth-stage company",
    salary: "Fastest-growing HR path in 2025-26.",
  },
  {
    title: "Talent Acquisition / Recruitment",
    path: "Recruiter → Talent Acquisition Manager → Head of Talent Acquisition → VP People",
    employers: "TCS, Infosys, Wipro, Cognizant (huge TA populations), Amazon, Flipkart, Microsoft, consulting firms",
    salary: "High-volume operational work with clear career progression.",
  },
  {
    title: "Learning & Development (L&D)",
    path: "L&D Associate → L&D Manager → Head of L&D → CLO",
    employers: "Large corporates, IT services, consulting, banking",
    salary: "Growing fast with AI reshaping skills requirements.",
  },
  {
    title: "Compensation & Benefits (C&B)",
    path: "C&B Analyst → C&B Manager → Head of C&B → Head of Total Rewards",
    employers: "Large corporates, MNCs, consulting firms",
    salary: "Quantitative fit; higher-than-average HR pay.",
  },
  {
    title: "Organizational Development & Change Management",
    path: "OD Consultant → Senior OD → Head of OD → CHRO",
    employers: "Consulting firms (Mercer, Aon, Deloitte, KPMG People), large corporates going through transformation",
    salary: "Strategic and high-impact but harder-to-measure work.",
  },
  {
    title: "HR Analytics / People Analytics",
    path: "HR Analyst → People Analytics Manager → Head of People Analytics → CDO",
    employers: "MNCs, IT services, consulting",
    salary: "Fastest-growing quantitative HR specialization.",
  },
  {
    title: "HR Consulting",
    path: "Consultant → Senior Consultant → Manager → Principal → Partner",
    employers: "Mercer, Aon, Deloitte People Advisory, KPMG People Consulting, Willis Towers Watson, EY People",
    salary: "Highest-paying path. Best accessed through XLRI Executive or Executive MBA at IIM ABCK.",
    note: "Tier-1 HR consulting placement requires XLRI brand in most cases.",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹4 – 7 LPA", exec_t1: "₹8 – 14 LPA", exec_t2: "₹5.5 – 9 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹8 – 15 LPA", exec_t1: "₹17 – 30 LPA", exec_t2: "₹11 – 18 LPA" },
  { band: "Senior, 8-15 years", dist: "₹18 – 32 LPA", exec_t1: "₹32 – 55 LPA", exec_t2: "₹22 – 38 LPA" },
  { band: "Leadership, 15+ years", dist: "₹32 – 55 LPA", exec_t1: "₹55 LPA – ₹1 Cr", exec_t2: "₹38 – 68 LPA" },
  { band: "CHRO track (top 5%)", dist: "₹50 LPA+", exec_t1: "₹1 Cr+", exec_t2: "₹65 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "Executive MBA in HR", university: "XLRI Jamshedpur", mode: "Executive (residential/weekend)", duration: "15 mo", fee: "₹25 L", placement: "Very Strong (~98%)", strength: "Unmatched HR brand in India" },
  { rank: 2, programme: "Executive MBA (HR focus)", university: "TISS Mumbai", mode: "Executive (weekend)", duration: "24 mo", fee: "₹8 L", placement: "Very Strong (~92%)", strength: "Legacy HR strength in social sector and PSUs" },
  { rank: 3, programme: "Executive MBA (HR focus)", university: "IIM Kozhikode EPGP", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~94%)", strength: "IIM tag with HR specialization" },
  { rank: 4, programme: "Online MBA HR", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.5 L", placement: "Strong (~74%)", strength: "Live faculty, strong HR alumni at TATA/Reliance" },
  { rank: 5, programme: "Distance MBA HR", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.8 L", placement: "Moderate-Strong (~64%)", strength: "Industry-tied HR projects" },
  { rank: 6, programme: "Online MBA HR", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~55%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA HR", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~55%)", strength: "Widest HR electives" },
  { rank: 8, programme: "Online MBA HR", university: "Jain (Deemed-to-be-Univ) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~60%)", strength: "Value + strong accreditation" },
  { rank: 9, programme: "Online MBA HR", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~53%)", strength: "Strong newer entrant" },
  { rank: 10, programme: "Distance MBA HR", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Working HR executive at any company wanting promotion", mode: "Distance or Online MBA", why: "Credential unlocks HR eligibility; live faculty adds business context" },
  { situation: "People-oriented switcher (from ops, sales, IT)", mode: "Online MBA", why: "Structured HR vocabulary + case-based learning bridge the switch cleanly" },
  { situation: "HR professional targeting Tier-1 HR consulting or CHRO track", mode: "XLRI Executive (or IIM Kozhikode EPGP HR track)", why: "HR consulting placement is XLRI-gated; brand is where the premium is earned" },
  { situation: "PSU or social-sector HR aspirant", mode: "TISS Executive", why: "Strong legacy brand in PSUs and development sector at half the XLRI fee" },
  { situation: "Fresh commerce/arts graduate wanting HR career", mode: "Online MBA", why: "Executive typically requires 3+ years; Online delivers structured entry" },
  { situation: "Founder or SME owner needing structured HR frameworks", mode: "Distance or Online MBA", why: "Curriculum access more valuable than credential for founder use case" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You prefer purely quantitative or numeric work. Choose Business Analytics or Finance Management.`,
  `You want a purely creative or brand-facing role. Choose Marketing Management or Digital Marketing.`,
  `You dislike ambiguity in performance and compensation conversations. HR is fundamentally about navigating soft, subjective decisions at scale.`,
  `You resist regulatory frameworks. HR is heavily governed by labour law (Industrial Disputes Act, Labour Codes 2020, POSH Act, EPF regulations).`,
  `You want to work minimally with people. Even analytics-focused HR roles involve regular stakeholder conversations.`,
  `You're choosing HR because 'HR jobs are safe.' They are stable, but stability alone shouldn't drive the choice. Pick because the work of understanding and developing people genuinely interests you.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target HR role family", body: `HRBP? Talent Acquisition? L&D? Compensation? People Analytics? Consulting? The programme choice, elective mix, and networking strategy differ across these. HRBP and Analytics pay premium; TA and Operations pay steady but lower.` },
  { step: 2, title: "Confirm whether Tier-1 HR consulting or CHRO track is a realistic goal", body: `If yes — XLRI Executive justifies the ₹25 lakh. If not — Online MBA is far better ROI. The regret pattern here is aspirants stretching to XLRI without a specific consulting-reset opportunity in view.` },
  { step: 3, title: "Audit your comfort with people-facing work at scale", body: `HR is not one-on-one counselling — it's systems, structures, and difficult conversations at scale (layoffs, restructuring, compensation disputes). Aspirants who thrive in difficult conversations do exceptionally well. Aspirants who avoid conflict struggle.` },
  { step: 4, title: "Check whether you enjoy quantitative HR work", body: `Modern HR increasingly demands data literacy — engagement analytics, predictive attrition, compensation modelling. If Excel and dashboards feel oppressive, HR analytics roles won't fit; consider generalist HRBP paths instead.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹25 L is the full range. Most working professionals fit ₹1.9 L to ₹2.5 L Online. Stretching to XLRI Executive without a specific Tier-1 reset opportunity is the most expensive regret we track in this specialization.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in HR valid in India?", a: `Yes. An Online MBA in HR from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.` },
  { q: "Is XLRI worth the ₹25 lakh fee for HR?", a: `For aspirants targeting Tier-1 HR consulting (Mercer, Aon, Deloitte People Advisory), CHRO track at large Indian conglomerates, or MNC HR leadership — absolutely yes. XLRI alumni report ~45-60% Tier-1 consulting placement rates and materially faster CHRO-track progression. For aspirants staying in HR at mid-tier corporates or moving up in their current employer, XLRI is not worth the premium — an Online MBA at Symbiosis or NMIMS delivers similar outcomes at a fraction of the cost.` },
  { q: "How much does an HR Management MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (XLRI Executive). Mainstream Online MBA programmes at Symbiosis, NMIMS, Manipal, Amity, and Jain sit between ₹1.4 lakh and ₹2.5 lakh total. TISS Executive is ₹8 lakh; IIM Kozhikode EPGP is ₹15 lakh.` },
  { q: "What is the salary after an Online MBA in HR?", a: `Median 2025-26 salary is ₹6 LPA for freshers, ₹13 LPA at 3-7 years, ₹28 LPA at 8-15 years. CHRO-track roles at 15+ years reach ₹50 LPA–₹1 Cr+. Executive MBA from XLRI and IIMs push these numbers 2-3x higher.` },
  { q: "Does an HR MBA pay less than a Finance or Analytics MBA at entry level?", a: `At entry level, yes — HR pays ₹1-2 LPA lower than Finance or Analytics for freshers. The ₹6 LPA HR median compares with ₹7 LPA for Finance and ₹8.5 LPA for Business Analytics. However, the gap narrows meaningfully by mid-career, and HRBP and CHRO tracks compete on total compensation by year 10-15. The stability and longevity of HR careers often outweigh the entry-level premium.` },
  { q: "How is an HR MBA different from an MA or MSc in Organisational Psychology?", a: `An HR MBA is a management qualification — it trains you to design and run HR systems at an organisational scale: compensation structures, talent pipelines, HRBP strategy, and workforce planning. An Organisational Psychology degree is an academic or research qualification focused on human behaviour theory and, sometimes, therapeutic interventions in work settings. HR MBAs lead to corporate HR, consulting, and people management roles. Organisational Psychology leads to academia, I/O psychology research, and specialist assessment or coaching roles. For corporate HR and consulting careers, the HR MBA is the standard credential.` },
  { q: "Can I do an HR MBA without an HR background?", a: `Yes. Approximately 50% of HR MBA enrolments at Online and Distance programmes come from non-HR backgrounds — operations, sales, IT, finance, and general management. The MBA teaches HR from first principles. For aspirants switching from non-HR, Online MBA provides the structured framework needed; XLRI Executive adds network and brand for those targeting HR consulting.` },
  { q: "Which universities have the best placement records for HR MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates were at XLRI Jamshedpur (~98%), IIM Kozhikode EPGP (~94%), TISS Mumbai (~92%), and Symbiosis Online (~74%). For Distance programmes, NMIMS and ICFAI are the most recognised. Placement support at Distance programmes is primarily self-driven — network and industry experience matter more than university brand at these price points.` },
  { q: "How is AI affecting HR careers in India?", a: `AI is substantially restructuring HR across three areas: recruitment (AI screening, JD generation, assessments), learning and development (AI-personalised learning paths, content generation), and people analytics (predictive attrition, engagement scoring, compensation benchmarking). What remains human: complex employee-relations decisions, HRBP partnering with business leaders, redundancy and restructuring conversations, and building culture. HR MBA graduates in 2025-27 should expect interview questions on AI-augmented HR tools — Darwinbox AI, Workday Illuminate, Microsoft Viva — and basic people analytics literacy.` },
  { q: "Can I switch industries after an HR MBA?", a: `Yes. Approximately 42% of HR MBA graduates switch industries within 4 years of completing their programme, according to our 2024-25 alumni tracking. HR is inherently portable — the disciplines of talent acquisition, HRBP, L&D, and compensation translate across IT services, FMCG, manufacturing, healthcare, and consulting. Industry-switch is most natural when paired with relevant functional experience in the new sector.` },
  { q: "What are education loan options for an HR MBA?", a: `For Online MBAs at ₹1.4-2.5 lakh, most working professionals pay from monthly salary with no loan required. For Executive MBAs at ₹8-25 lakh, education loans are widely available: SBI (up to ₹1.5 crore), HDFC Credila (up to ₹75 lakh), ICICI Bank, Avanse, and Auxilo at 9.5-12.5% in 2025-26. Most lenders require admission confirmation, a co-borrower, and collateral above ₹7.5 lakh.` },
  { q: "How does CollegeNCourses help me choose an HR MBA?", a: `Our counsellors match you to programmes based on your target HR role family (HRBP, TA, L&D, Compensation, Analytics, Consulting), consulting aspirations, budget, and timeline. We track HR alumni outcomes from over 25 universities. Free 30-minute call. No paid referral affects our recommendation.` },
  { q: "Is HR MBA a good career option?", a: `Yes. An HR MBA is a solid career option, particularly for people-oriented professionals seeking career stability and long-term progression. HR roles are structurally embedded in every organization and remain in demand across economic cycles. HRBP and CHRO tracks offer strong mid-to-senior compensation. The career is best for aspirants who genuinely enjoy working with people at scale, building systems, and navigating complex organizational decisions.`, voice: true },
  { q: "What is the salary of an MBA HR graduate in India?", a: `Median starting salary after an Online MBA in HR is ₹6 LPA in India in 2025-26. It scales to ₹13 LPA at 3-7 years, ₹28 LPA at 8-15 years, and ₹50 LPA+ at CHRO track. Executive MBA from XLRI or IIMs pushes these numbers 2-3x higher. HRBP roles command 25-35% premiums over operational HR roles at the same experience level.`, voice: true },
  { q: "Which is the best online MBA for HR in India?", a: `The three most-recommended Online MBAs for HR in 2025-26 are Symbiosis Centre for Online Learning (live faculty, strong HR alumni at TATA/Reliance, ~74% placement), NMIMS Global Access (strong HR brand recognition in Indian corporates), and Manipal Academy Online (best value in Tier-1 university). For Executive MBA, XLRI Jamshedpur is the unmatched standard for HR in India — the only programme that directly opens Tier-1 HR consulting placements.`, voice: true },
  { q: "Do employers actually value Distance and Online HR MBAs in 2025-26?", a: `Yes, in corporate HR across FMCG, IT services, manufacturing, healthcare, banking, and mid-tier consulting. Large Indian corporates — TATA Group, Reliance, Aditya Birla, ITC, HUL, Infosys — actively hire HR managers from Online and Distance MBAs. Tier-1 HR consulting (Mercer, Aon, Deloitte People Advisory) still prefer XLRI or IIM credentials. What matters more than mode is demonstrated people-management experience and functional expertise in your chosen HR role family.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "MBA in Marketing Management: The Honest Guide", href: "/specializations-guide/marketing/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function HRGuideClient() {
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
        .hr-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .hr-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .hr-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .hr-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .hr-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .hr-bc-inner li:last-child::after{content:""}
        .hr-bc-inner a{color:var(--navy);text-decoration:none}
        .hr-bc-inner a:hover{text-decoration:underline}
        .hr-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .hr-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .hr-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .hr-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .hr-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .hr-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .hr-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .hr-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .hr-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .hr-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.hr-layout{grid-template-columns:1fr}}
        .hr-toc-sticky{position:sticky;top:80px}
        .hr-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .hr-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .hr-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .hr-toc-desktop nav a.hr-active,.hr-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .hr-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .hr-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .hr-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.hr-toc-mobile{display:none}}
        @media(max-width:900px){.hr-toc-desktop{display:none}.hr-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .hr-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .hr-toc-mobile summary::after{content:"▾"}
        .hr-toc-mobile[open] summary::after{content:"▴"}
        .hr-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .hr-toc-mobile a:hover{background:var(--mist)}
        .hr-section{margin-bottom:3.5rem;padding-top:.5rem}
        .hr-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .hr-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .hr-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .hr-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .hr-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .hr-facts-table tr:last-child td{border-bottom:none}
        .hr-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .hr-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .hr-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .hr-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .hr-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .hr-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .hr-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .hr-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .hr-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .hr-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .hr-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .hr-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .hr-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .hr-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .hr-role-meta strong{color:var(--charcoal)}
        .hr-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .hr-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .hr-table-wrap{overflow-x:auto}
        .hr-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .hr-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .hr-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .hr-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .hr-col-highlight{font-weight:600;background:#fef9ec!important}
        .hr-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .hr-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .hr-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .hr-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .hr-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .hr-rank.top3{background:var(--yellow);color:var(--navy)}
        .hr-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .hr-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .hr-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .hr-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .hr-mode-rec{font-weight:700;color:var(--navy)}
        .hr-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .hr-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .hr-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .hr-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .hr-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .hr-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .hr-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .hr-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .hr-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .hr-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .hr-faq-list summary::-webkit-details-marker{display:none}
        .hr-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .hr-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .hr-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .hr-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .hr-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .hr-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .hr-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .hr-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .hr-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .hr-cta-band button:hover{opacity:.88}
        .hr-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .hr-below-cta{text-align:center;margin-top:1.25rem}
        .hr-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.hr-cta-row{flex-direction:column}.hr-salary-table th,.hr-salary-table td,.hr-top10-table th,.hr-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="hr-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="hr-breadcrumb" aria-label="Breadcrumb">
        <div className="hr-wrap">
          <ol className="hr-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Human Resource Management</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="hr-hero">
        <div className="hr-wrap">
          <p className="hr-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="hr-h1">MBA in Human Resource Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="hr-sub">Fees from ₹1.2 lakh to ₹25 lakh. Real salary data from HR alumni across HRBP, talent acquisition, L&amp;D, compensation, and consulting roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="hr-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="hr-cta-row">
            <button className="hr-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="hr-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="hr-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="hr-wrap">
        <div className="hr-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="hr-toc-sticky">
              <details className="hr-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="hr-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "hr-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="hr-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="hr-section">
              <h2>Key takeaways</h2>
              <ul className="hr-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="hr-section">
              <h2>HR Management MBA, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in Human Resource Management trains you to manage the people function inside a business — hiring, developing, rewarding, and retaining talent, plus building organizational culture and handling employee relations. As of 2025-26, HR is one of the most stable MBA specializations by career longevity. Curriculum covers HRBP, talent acquisition, L&amp;D, and HR analytics.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (XLRI Executive), with the mainstream Online MBA median at ₹1.9 lakh. Median entry-level salary for an HR MBA graduate in 2025-26 stands at ₹6 lakh per annum for freshers, ₹13 lakh for mid-level (3-7 years&apos; experience), and ₹28 lakh for senior roles (8-15 years). CHRO-track roles at 15+ years reach ₹50 LPA to ₹1 Cr+.</p>
              <table className="hr-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* What it is */}
            <section id="what-it-is" className="hr-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Human Resource Management, at postgraduate level, is the discipline of managing the people function in a business — sourcing talent, developing it, rewarding it, and building the culture and systems that keep organizations functioning at scale. Everything else — talent acquisition design, compensation benchmarking, performance frameworks, HR business partnering, and people analytics — sits inside that discipline.</p>
              <p>What makes it different from an MA in Organisational Psychology is <em>management versus research orientation</em>. HR Management MBA trains you to design and run HR systems at organisational scale inside a business. Organisational Psychology trains you in human behaviour theory and, sometimes, therapeutic or I/O research applications in work settings. HR MBAs lead to corporate HR, consulting, and people-management roles; Organisational Psychology leads to academia, research, and specialist coaching or assessment practices.</p>
              <div className="hr-callout">
                <em>A misconception we hear often: &apos;HR MBA is only about hiring and firing.&apos; It isn&apos;t. Modern HR in 2025-26 is roughly 30% strategic business partnering with leadership teams, 25% talent acquisition and retention, 20% learning and development, 15% compensation and benefits design, and 10% analytics and reporting. The fastest-growing role family — HRBP — sits alongside business leadership rather than in a siloed HR function. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="hr-section">
              <h2>Who this specialization is built for</h2>
              <p>HR Management MBAs work best for three broad profiles.</p>
              <div className="hr-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="hr-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="hr-section">
              <h2>What a 2025-26 HR Management MBA actually teaches</h2>
              <p>A 2025-26 HR Management MBA covers management foundations, then goes deep on strategic HRM, talent acquisition and recruitment, compensation and benefits design, employee relations and labour law, learning and development, performance management, organizational development and change management, and HR analytics. The 2025 additions are People Analytics with AI (using LLMs for engagement and attrition analysis) and HR Tech Stack Management (Darwinbox, Workday, SuccessFactors).</p>
              <div className="hr-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="hr-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="hr-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> People Analytics with AI — covering LLMs and GenAI for engagement analysis, sentiment tracking, and predictive attrition modelling — is now offered as an elective at XLRI Executive, IIM Kozhikode EPGP, Symbiosis SCOL, and NMIMS. HR Tech Stack Management (Darwinbox, Workday, SuccessFactors) is now offered at Symbiosis SCOL, NMIMS, and Amity Online. Both are becoming interview-tested at Mercer, Aon, and Deloitte People Advisory interviews.</em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="hr-section">
              <h2>The roles an HR Management MBA leads to</h2>
              <p>HR Management opens seven distinct career paths — from the largest and most accessible (HR Business Partnering and Talent Acquisition) to the highest-ceiling (CHRO track) and the highest-paying external path (HR Consulting).</p>
              <div className="hr-callout">
                <em>From our 2024-25 counselling desk: HR Business Partnering (HRBP) is the highest-growth role family in HR. Alumni who chose HRBP paths reported 45-55% salary progression over 3 years versus 22-30% for pure operational HR. HRBP roles sit alongside business leadership rather than in siloed HR functions, which explains the pay and progression gap. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="hr-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="hr-role-card">
                    <h3>{r.title}</h3>
                    <p className="hr-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="hr-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="hr-role-salary">{r.salary}</p>
                    {r.note && <p className="hr-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="hr-section">
              <h2>What an HR Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in HR Management sits at ₹6 lakh per annum for freshers (0-2 years&apos; experience), ₹13 lakh for mid-level (3-7 years), and ₹28 lakh for senior roles (8-15 years). Executive MBA graduates from XLRI and IIMs command 2-3x these bands.</p>
              <div className="hr-table-wrap">
                <table className="hr-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 — XLRI / IIM)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="hr-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="hr-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. ESOP and bonus compensation not reflected.</p>
              <div className="hr-callout">
                <em><strong>What these numbers do not tell you:</strong> Sector of employment dominates. An HRBP Manager at an MNC in Bangalore earns significantly more than the same title at a mid-size listed company in a Tier-2 city. HR Consulting pays the most but has the longest path and is most brand-dependent (XLRI). CHRO track has the highest ceiling — but reaching it typically requires 15-20 years and a deliberate sequencing of HRBP, leadership development, and business exposure roles. Know your target sector and role family before picking your programme.</em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="hr-section">
              <h2>The 10 HR Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 287 HR alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="hr-table-wrap">
                <table className="hr-top10-table">
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
                        <td><span className={`hr-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="hr-source">As of 2025-26. Fees are total programme cost. XLRI Executive at ₹25 lakh is the highest-fee HR programme — warranted only for aspirants with a specific Tier-1 consulting reset or CHRO-track target. Placement support ratings from CollegeNCourses internal alumni tracking.</p>
              <div className="hr-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="hr-section">
              <h2>Distance, Online, or Executive: which mode fits your HR career</h2>
              <p>The mode decision for HR Management hinges heavily on whether your goal is an internal promotion in HR or a Tier-1 HR consulting reset through XLRI or IIM.</p>
              <div className="hr-callout">
                <em>From our counselling records 2023-25: XLRI Jamshedpur&apos;s HR brand is unmatched in India. For aspirants targeting Tier-1 HR consulting (Mercer, Aon, Deloitte People Advisory, KPMG People Consulting) or CHRO track at large Indian conglomerates (TATA, Reliance, Aditya Birla, ITC), the ₹25 lakh XLRI Executive premium is genuinely earned. For aspirants staying in HR at their current company or mid-tier corporates, however, XLRI is not worth the premium — an Online MBA at Symbiosis or NMIMS delivers 80% of the outcome at 10% of the cost. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="hr-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="hr-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="hr-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick an HR Management MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="hr-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if an HR Management MBA is right for you: 5 questions</h2>
              <div className="hr-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="hr-howto-card">
                    <div className="hr-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="hr-section">
              <h2>Frequently asked questions</h2>
              <div className="hr-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="hr-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="hr-section">
              <h2>Go deeper</h2>
              <ul className="hr-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="hr-cta-band">
        <div className="hr-wrap">
          <h2>Ready to shortlist your HR Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target HR role family, consulting aspirations, budget, and timeline. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-hr" />
    </>
  );
}
