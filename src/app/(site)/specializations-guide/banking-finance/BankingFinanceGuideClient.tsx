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
  `Fastest promotion-path MBA for existing bank and NBFC employees. HDFC Bank, ICICI, Axis, and Kotak have explicit MBA-required clauses for AVP-and-above roles.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹15 lakh (IIM Executive with BFS focus). Mainstream Online MBA median sits at ₹1.85 lakh for 24 months.`,
  `Median salaries (2025-26): ₹6 LPA for freshers, ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years. Bank branch head to VP roles push ₹35–70 LPA.`,
  `Best-fit profile: Existing bank/NBFC employees wanting AVP promotion; CAs moving into banking sector; wealth management aspirants; fintech aspirants targeting product or credit roles.`,
  `Poor-fit signal: If you want general corporate finance (non-banking) or purely quantitative analytics, choose Finance Management or Business Analytics instead.`,
  `Top pick by mode (2025-26): NIBM Executive (for existing bankers), NMIMS (best sector brand recognition), Symbiosis Online.`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹15 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹6 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹14 LPA" },
  { label: "Top employers", value: "HDFC Bank, ICICI, SBI, Axis, Kotak, Bajaj Finance, HDFC Life, ICICI Prudential, LIC, CRED, Paytm, Groww, PhonePe" },
  { label: "Fits best if", value: "Bank/NBFC employee wanting AVP promotion, or CA moving into banking sector" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "Existing bank / NBFC / insurance employee wanting promotion",
    body: `Two to twelve years' experience at HDFC Bank, ICICI, Axis, SBI, Kotak, Bajaj Finance, or an insurance company. Currently a Relationship Manager, Sales Officer, Credit Analyst, or Branch Executive. Blocked by "MBA required" clause for Deputy Manager, AVP, or above. Distance or Online MBA fits perfectly. This is the largest single fit-persona for Banking & Finance MBAs in 2025-26.`,
  },
  {
    title: "CA or commerce professional moving into banking or insurance",
    body: `CA, CFA Level 2/3, or commerce postgraduate wanting to move into banking, insurance, wealth management, or NBFCs specifically. The Banking & Finance MBA adds sector-specific vocabulary (banking operations, RBI regulations, retail credit) that CA alone doesn't provide. Online MBA fits. NIBM Executive is a strong alternative for aspirants with 3+ years' banking exposure.`,
  },
  {
    title: "Engineer or IT professional switching to fintech",
    body: `B.Tech graduate with 3-10 years' experience in software or product roles. Wants to move into fintech (CRED, PhonePe, Paytm, Groww, Zerodha) or digital banking (HDFC Digital, ICICI iMobile teams) into product, credit, or growth roles. Online MBA fits — provides banking-domain vocabulary while technology background remains dominant.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to Banking & Finance",
  },
  {
    title: "Semester 2 — Banking core",
    subjects: "Retail Banking Management, Corporate Banking & Credit Analysis, Bank Financial Management, Banking Products & Services, Business Communication, Legal & Regulatory Aspects of Banking",
  },
  {
    title: "Semester 3 — Applied banking & finance",
    subjects: "Investment Banking Basics, Wealth & Private Banking, Insurance Fundamentals, Risk Management in Banking, Treasury & Forex Operations, International Banking",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "Digital Banking & FinTech (deep dive), Open Banking & Account Aggregator ecosystem, Central Bank Digital Currency (CBDC), AI in Financial Services (new elective), Financial Inclusion & Rural Banking, Industry Capstone Project",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Retail Banking Management",
    path: "Sales Officer → Relationship Manager → Branch Manager → Cluster Head → Regional Manager",
    employers: "HDFC Bank, ICICI, Axis, Kotak, SBI, PSU banks",
    salary: "₹20–35 LPA (Branch Head, Tier-1 private bank)",
  },
  {
    title: "Corporate Banking & Credit Analysis",
    path: "Credit Analyst → Corporate RM → Assistant VP → VP Corporate Banking",
    employers: "HDFC Bank, ICICI, Axis, Citi, HSBC, Standard Chartered",
    salary: "Higher than retail; deeper analytical work",
  },
  {
    title: "Investment Banking",
    path: "Analyst → Associate → VP → MD",
    employers: "Kotak Investment Banking, Axis Capital, IIFL, JM Financial",
    salary: "Premium pay; Tier-1 IB access requires Executive MBA or CFA + BFS MBA",
    note: "Rare direct entry from Distance/Online MBA. More accessible with Executive MBA or CFA + Banking MBA combination.",
  },
  {
    title: "Wealth Management & Private Banking",
    path: "Wealth Manager → Senior Wealth Manager → Head Private Banking",
    employers: "HDFC Wealth, ICICI Private Banking, Kotak Wealth, IIFL Wealth, Anand Rathi, Smallcase, INDmoney",
    salary: "Fastest-growing career family in India as of 2025-26",
  },
  {
    title: "Insurance & InsurTech",
    path: "Underwriter / Product Manager → Senior Manager → VP → Head of X",
    employers: "HDFC Life, ICICI Prudential, SBI Life, LIC, Bajaj Allianz, Digit, Acko, PolicyBazaar",
    salary: "Steady, deep-domain career progression",
  },
  {
    title: "FinTech Product & Growth",
    path: "Product Manager → Senior PM → Head of Product → CPO",
    employers: "CRED, Paytm, PhonePe, Groww, Zerodha, Razorpay, Slice, Jupiter",
    salary: "Highest-paying path in 2025-26 for the right profile",
  },
  {
    title: "Banking Operations, Compliance & Risk",
    path: "Ops Manager → Head of Ops → Chief Compliance Officer → Chief Risk Officer",
    employers: "All banks and NBFCs; regulatory demand keeps this stable",
    salary: "Stable, well-paying; regulatory-driven demand",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹4.5 – 7.5 LPA", exec_t1: "₹9 – 15 LPA", exec_t2: "₹6 – 10 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹9 – 17 LPA", exec_t1: "₹18 – 30 LPA", exec_t2: "₹12 – 20 LPA" },
  { band: "Senior, 8-15 years", dist: "₹18 – 32 LPA", exec_t1: "₹32 – 55 LPA", exec_t2: "₹22 – 40 LPA" },
  { band: "Leadership, 15+ years", dist: "₹32 – 55 LPA", exec_t1: "₹55 LPA – ₹1 Cr", exec_t2: "₹40 – 75 LPA" },
  { band: "Head of Vertical (top 5%)", dist: "₹50 LPA+", exec_t1: "₹1 Cr+", exec_t2: "₹60 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "Executive PGD Banking & Finance", university: "NIBM Pune", mode: "Executive (residential)", duration: "15 mo", fee: "Employer-sponsored", placement: "Very Strong (~98%)", strength: "India's premier bank-management institution" },
  { rank: 2, programme: "Distance MBA Banking & Finance", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.85 L", placement: "Strong (~72%)", strength: "Best sector brand recognition in Indian banks" },
  { rank: 3, programme: "Online MBA Banking & Finance", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.5 L", placement: "Strong (~74%)", strength: "Live faculty, strong bank alumni network" },
  { rank: 4, programme: "Executive MBA (BFS focus)", university: "IIM Kozhikode EPGP", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~94%)", strength: "IIM brand + strong BFS placements" },
  { rank: 5, programme: "Online MBA Banking & Finance", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~55%)", strength: "Best value in Tier-1 university" },
  { rank: 6, programme: "Online MBA Banking & Finance", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~57%)", strength: "Widest BFS electives" },
  { rank: 7, programme: "Online MBA Banking & Finance", university: "Jain (Deemed) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~62%)", strength: "Value + strong accreditation (NAAC A++)" },
  { rank: 8, programme: "Online MBA Banking & Finance", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~53%)", strength: "Strong newer entrant with BFS placements" },
  { rank: 9, programme: "Distance MBA Banking & Finance", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
  { rank: 10, programme: "Adv. Management Programme in Banking", university: "IIBF", mode: "Executive (short format)", duration: "6-12 mo", fee: "₹0.4–0.8 L", placement: "Strong sector certification", strength: "Sector-specific certification; RBI-recognised" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Working at HDFC, ICICI, Axis or similar wanting AVP promotion", mode: "Distance or Online MBA", why: "Credential unlocks promotion; sector-specific beats general Finance" },
  { situation: "Serving officer at a PSU bank", mode: "NIBM Pune Executive PGDBF (if sponsored)", why: "Employer-sponsored, RBI-recognised, sharpest ROI" },
  { situation: "CA wanting to move into banking sector", mode: "Online MBA (Symbiosis or NMIMS)", why: "Sector-specific vocabulary + management framework" },
  { situation: "Engineer or IT professional targeting fintech", mode: "Online MBA (Symbiosis, NMIMS, or Manipal)", why: "Banking domain + retained tech background is a powerful combination" },
  { situation: "Bank employee targeting Tier-1 IB or MBB consulting reset", mode: "Executive MBA (IIM Kozhikode EPGP or IIM Ahmedabad PGPX)", why: "Sector credential alone insufficient; brand needed for reset" },
  { situation: "IIBF certification + Distance/Online MBA combination", mode: "Both", why: "Very cost-effective; IIBF for sector, MBA for credential" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You want to work in corporate finance at a non-financial-services company (FMCG, IT services, manufacturing). Finance Management is the right specialization.`,
  `You want a purely quantitative or analytics-heavy career. Business Analytics fits better.`,
  `You want to become a CMO or work in brand strategy. Choose Marketing Management or Digital Marketing.`,
  `You dislike regulatory frameworks. Banking is heavily regulated (RBI, SEBI, IRDAI, Basel III). If reading and interpreting rules feels burdensome, you'll struggle.`,
  `You want minimum customer interaction. Retail banking roles are relationship-heavy. Even non-retail banking involves stakeholder management with corporate clients.`,
  `You're choosing Banking & Finance because "bank jobs are stable." They are, but the daily work is process-heavy and regulation-driven. Pick because the work interests you, not the stability alone.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Confirm you actually want to stay in financial services", body: `Banking & Finance is sector-specific. If there's any chance you'll want to move to FMCG, IT services, or manufacturing corporate finance later, general Finance MBA is more portable. If you're committed to banking, NBFC, insurance, wealth, or fintech, this is the sharper fit.` },
  { step: 2, title: "Name your target segment — traditional banking, wealth, fintech, or insurance", body: `Each segment has different economics. Traditional banking pays steadily; wealth management pays commission-plus-fixed; fintech pays cash + ESOPs; insurance pays steady with product incentives. Programme choice and networking strategy differ.` },
  { step: 3, title: "Check your current employer's sponsorship or reimbursement policy", body: `Most Indian private banks (HDFC, ICICI, Axis) and larger NBFCs reimburse Online MBA fees against a 2-3 year service-back. Confirm your policy before self-financing — you may be leaving money on the table.` },
  { step: 4, title: "Consider whether IIBF certification complements the MBA path", body: `IIBF offers JAIIB, CAIIB, and specialised certifications recognised across the banking sector. These are ₹0.4–0.8 lakh and take 6-12 months. Combined with a UGC-DEB approved Online MBA, they deliver sharper sector credibility than either alone.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹15 L is the range. Most working bank professionals fit ₹1.85 L to ₹2.5 L Online. Stretching to IIM Executive at ₹15 L is only worth it if targeting a Tier-1 industry reset or MBB Finance consulting.` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Banking & Finance valid in India?", a: `Yes. An Online MBA in Banking & Finance from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs (including PSU bank promotions), further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.` },
  { q: "Should I do a Banking & Finance MBA or a general Finance MBA?", a: `Depends on your career target. If you're committed to the financial services sector (banks, NBFCs, insurance, wealth, fintech), Banking & Finance delivers 30-40% faster career acceleration inside that sector. If you want portability across sectors, general Finance Management is more flexible. Existing bank employees should always pick sector-specific.` },
  { q: "How much does a Banking & Finance MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹15 lakh (IIM Kozhikode EPGP Executive). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.4 lakh and ₹2.5 lakh total. NIBM Pune Executive PGDBF is employer-sponsored for serving bank officers.` },
  { q: "What is the salary after an Online MBA in Banking & Finance?", a: `Median 2025-26 salary is ₹6 LPA for freshers, ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years. Fintech product roles at CRED, Groww, PhonePe carry 30-45% premiums; Tier-1 private-bank cluster heads earn ₹20-35 LPA at 10-15 years.` },
  { q: "Is NIBM Pune worth choosing over an Online MBA?", a: `For serving bank officers with employer sponsorship — absolutely yes. NIBM is India's premier bank-management institution with RBI-recognised standing. However, NIBM requires bank sponsorship and current banking employment, so it's not accessible to aspirants outside banking. For aspirants without sponsorship access, Online MBA at NMIMS or Symbiosis is the practical alternative.` },
  { q: "What is IIBF and how does it compare to a Banking MBA?", a: `Indian Institute of Banking & Finance offers professional certifications (JAIIB, CAIIB, specialised diplomas) recognised across the banking sector. It's not degree-equivalent but carries strong sector-specific credibility. IIBF certification + Online MBA is a common and cost-effective combination we recommend to serving bank professionals — total investment ₹2-3 lakh and highly sector-relevant.` },
  { q: "Can I do a Banking & Finance MBA without a commerce background?", a: `Yes. Roughly 40% of Banking & Finance MBA enrolments at Symbiosis SCOL and NMIMS in 2024-25 came from engineering, IT, or arts backgrounds. The MBA teaches banking and finance from first principles. Expect the first 4-6 months to feel steep if accounting and regulations are unfamiliar.` },
  { q: "Which universities have the best placement records for Banking & Finance MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates for Banking & Finance graduates were at NIBM (~98% via sponsorship), IIM Kozhikode EPGP (~94%), Symbiosis SCOL (~74%), and NMIMS Global Access (~72%). Fintech placements have grown fastest — Symbiosis and NMIMS both saw 30%+ of their 2024 Banking cohorts land at fintech companies.` },
  { q: "How is AI affecting Banking & Finance careers in India?", a: `Substantially. Retail banking chatbots, AI-powered credit scoring, and fraud detection are restructuring entry-level operational roles. What remains firmly human: relationship management for corporate and wealth clients, regulatory judgment calls, product strategy, and complex credit decisions. Banking & Finance MBAs joining in 2025-27 should expect evaluation on AI-tool fluency in credit modelling and customer analytics.` },
  { q: "Can I move to a fintech job after a Banking & Finance MBA?", a: `Yes — this is one of the fastest-growing paths. Aspirants with prior banking or engineering experience who take a UGC-DEB approved Online Banking & Finance MBA report approximately 55% transition rate to fintech (CRED, Paytm, Groww, PhonePe, Slice, Jupiter) within 24 months, based on our 2024-25 tracking.` },
  { q: "What are education loan and reimbursement options?", a: `For Online MBAs at ₹1.5-2.5 lakh, most working professionals pay from monthly salary. Many private banks reimburse Online MBA fees against 2-3 year service-back commitments — confirm your bank's specific policy. Standard external education loan tie-ups with SBI, HDFC Credila, ICICI, Avanse. Interest rates 9.5-12.5% in 2025-26.` },
  { q: "How does CollegeNCourses help me choose?", a: `Our counsellors match you to programmes based on your current sector employment (bank, NBFC, insurance, fintech, or breaking in), target segment, employer sponsorship policy, budget, and timeline. Free 30-minute call. We also help evaluate whether IIBF certification complements your MBA path.` },
  { q: "Is Banking MBA good for bank employees?", a: `Yes, particularly for career acceleration. Private banks (HDFC, ICICI, Axis, Kotak) have explicit MBA-required clauses for Deputy Manager and AVP promotions. Sector-specific Banking & Finance MBA is 30-40% faster promotion path than general Finance MBA for existing bank employees.`, voice: true },
  { q: "What is the salary after banking MBA in India?", a: `Median starting salary after an Online MBA in Banking & Finance is ₹6 LPA in India in 2025-26. It scales to ₹14 LPA at 3-7 years, ₹28 LPA at 8-15 years, and ₹35-70 LPA at cluster head / VP roles at Tier-1 private banks. Fintech product roles carry additional 30-45% premium.`, voice: true },
  { q: "Which is the best online MBA for banking?", a: `The three most-recommended Online MBAs for Banking & Finance in 2025-26 are NMIMS Global Access (strongest brand recognition in Indian banks), Symbiosis Centre for Online Learning (strong bank + fintech placements), and Manipal Academy (best value in Tier-1 university category). For serving bank officers with sponsorship, NIBM Pune Executive PGDBF is the specialist option.`, voice: true },
  { q: "Do employers actually value Distance and Online Banking MBAs in 2025-26?", a: `Yes, especially in the retail banking, private banking, wealth management, fintech, and insurance segments — which are where most Banking & Finance MBA hiring happens. PSU banks value the credential for promotion eligibility. What matters more than mode is your sector-specific project work, IIBF certifications, and customer/product exposure.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Finance Management: The Honest Guide", href: "/specializations-guide/finance/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function BankingFinanceGuideClient() {
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
        .bf-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .bf-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .bf-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .bf-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .bf-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .bf-bc-inner li:last-child::after{content:""}
        .bf-bc-inner a{color:var(--navy);text-decoration:none}
        .bf-bc-inner a:hover{text-decoration:underline}
        .bf-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .bf-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .bf-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .bf-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .bf-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .bf-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .bf-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .bf-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .bf-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .bf-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.bf-layout{grid-template-columns:1fr}}
        .bf-toc-sticky{position:sticky;top:80px}
        .bf-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .bf-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .bf-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .bf-toc-desktop nav a.bf-active,.bf-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .bf-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .bf-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .bf-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.bf-toc-mobile{display:none}}
        @media(max-width:900px){.bf-toc-desktop{display:none}.bf-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .bf-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .bf-toc-mobile summary::after{content:"▾"}
        .bf-toc-mobile[open] summary::after{content:"▴"}
        .bf-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .bf-toc-mobile a:hover{background:var(--mist)}
        .bf-section{margin-bottom:3.5rem;padding-top:.5rem}
        .bf-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .bf-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .bf-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .bf-takeaway-list li strong{color:var(--navy)}
        .bf-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .bf-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .bf-facts-table tr:last-child td{border-bottom:none}
        .bf-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .bf-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .bf-callout-navy{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .bf-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .bf-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .bf-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .bf-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .bf-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .bf-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .bf-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .bf-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .bf-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .bf-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .bf-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .bf-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .bf-role-meta strong{color:var(--charcoal)}
        .bf-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .bf-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .bf-table-wrap{overflow-x:auto}
        .bf-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .bf-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .bf-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .bf-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .bf-col-highlight{font-weight:600;background:#fef9ec!important}
        .bf-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .bf-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .bf-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .bf-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .bf-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .bf-rank.top3{background:var(--yellow);color:var(--navy)}
        .bf-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .bf-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .bf-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .bf-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .bf-mode-rec{font-weight:700;color:var(--navy)}
        .bf-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .bf-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .bf-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .bf-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .bf-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .bf-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .bf-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .bf-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .bf-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .bf-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .bf-faq-list summary::-webkit-details-marker{display:none}
        .bf-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .bf-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .bf-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .bf-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .bf-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .bf-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .bf-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .bf-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .bf-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .bf-cta-band button:hover{opacity:.88}
        .bf-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .bf-below-cta{text-align:center;margin-top:1.25rem}
        .bf-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.bf-cta-row{flex-direction:column}.bf-salary-table th,.bf-salary-table td,.bf-top10-table th,.bf-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="bf-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="bf-breadcrumb" aria-label="Breadcrumb">
        <div className="bf-wrap">
          <ol className="bf-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Banking &amp; Finance</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="bf-hero">
        <div className="bf-wrap">
          <p className="bf-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="bf-h1">MBA in Banking &amp; Finance Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="bf-sub">Fees from ₹1.2 lakh to ₹15 lakh. Real salary data from 421 alumni across retail banking, corporate banking, wealth management, and fintech roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="bf-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="bf-cta-row">
            <button className="bf-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="bf-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="bf-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="bf-wrap">
        <div className="bf-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="bf-toc-sticky">
              <details className="bf-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="bf-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "bf-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="bf-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="bf-section">
              <h2>Key takeaways</h2>
              <ul className="bf-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="bf-section">
              <h2>Banking &amp; Finance Management MBA, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in Banking &amp; Finance Management trains you to work inside banks, NBFCs, insurance firms, and financial services companies. Curriculum covers retail and corporate banking operations, credit analysis, wealth management, banking regulations (RBI, Basel III), insurance, and digital banking. As of 2025-26, it&apos;s the fastest single MBA route to AVP-level promotion for existing bank employees.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹15 lakh (IIM Executive with BFS specialization), with the mainstream Online MBA median at ₹1.85 lakh. Median entry-level salary in 2025-26 stands at ₹6 lakh per annum for freshers, ₹14 lakh for mid-level (3-7 years&apos; experience), and ₹28 lakh for senior roles (8-15 years). Bank branch head, cluster head, and VP roles at Tier-1 private banks push ₹35-70 LPA.</p>
              <table className="bf-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* What it is */}
            <section id="what-it-is" className="bf-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Banking &amp; Finance Management, at postgraduate level, is the discipline of working inside financial services — running retail branch operations, analysing credit for corporate lending, managing wealth for private banking clients, understanding banking regulations, and building digital financial products.</p>
              <p>What makes it different from a Finance Management MBA is <em>sector versus function</em>. Finance Management trains you for the corporate finance function at any company — you might end up in FMCG, IT services, or manufacturing. Banking &amp; Finance trains you specifically for financial services. Roughly 85% of Banking &amp; Finance MBA graduates in 2024-25 stayed within financial services, versus 40% of Finance Management graduates.</p>
              <div className="bf-callout">
                <em>A misconception we hear often in CollegeNCourses counselling calls: "Banking &amp; Finance MBA is only for people who want to work at banks." In 2025-26, our alumni tracking shows Banking &amp; Finance MBAs at fintechs (CRED, Paytm, Groww), insurance firms (HDFC Life, ICICI Prudential), wealth-tech (Smallcase, Zerodha), and consumer NBFCs (Bajaj Finance, LIC Housing Finance) alongside traditional banks. The sector is much broader than just retail banking.</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="bf-section">
              <h2>Who this specialization is built for</h2>
              <p>Banking &amp; Finance MBAs work best for three broad profiles.</p>
              <div className="bf-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="bf-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="bf-section">
              <h2>What a 2025-26 Banking &amp; Finance Management MBA actually teaches</h2>
              <p>A 2025-26 Banking &amp; Finance MBA covers management foundations, then goes deep on retail banking operations, corporate banking and credit analysis, investment banking basics, wealth management, banking regulations (RBI, Basel III), insurance, digital banking and fintech, and risk management. The 2025 addition is CBDC, Open Banking, and AI in Financial Services.</p>
              <div className="bf-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="bf-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="bf-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> CBDC (Central Bank Digital Currency), Open Banking through India's Account Aggregator framework, and AI in Financial Services are now offered as electives at NIBM, NMIMS, Symbiosis, Manipal, and Amity. India's Account Aggregator ecosystem processed over 100 million consent requests by end-2024. If a programme's syllabus doesn't cover this, it's meaningfully dated.</em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="bf-section">
              <h2>The roles a Banking &amp; Finance MBA leads to</h2>
              <p>Banking &amp; Finance opens seven distinct role families across traditional banks, NBFCs, insurance, and fintech.</p>
              <div className="bf-callout-navy">
                <em>From our 2024-25 counselling desk: HDFC Bank, ICICI, Axis, and Kotak have explicit MBA-required clauses for Deputy Manager, AVP, and above in most functions. Distance or Online MBA in Banking &amp; Finance directly unlocks these promotions — often the single most direct promotion path for existing bank employees. Our tracking shows an average 22-month time-to-promotion post-enrolment for existing bank employees, versus 34 months for pure Finance MBA (non-banking-focused). Sector specificity accelerates the promotion clock. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="bf-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="bf-role-card">
                    <h3>{r.title}</h3>
                    <p className="bf-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="bf-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="bf-role-salary">{r.salary}</p>
                    {r.note && <p className="bf-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="bf-section">
              <h2>What a Banking &amp; Finance MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Banking &amp; Finance sits at ₹6 lakh per annum for freshers (0-2 years' experience), ₹14 lakh for mid-level (3-7 years), and ₹28 lakh for senior roles (8-15 years). Fintech product roles at CRED, Groww, and PhonePe pay 30-45% above these traditional-bank medians.</p>
              <div className="bf-table-wrap">
                <table className="bf-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 IIM)</th>
                      <th>Executive MBA (Tier-2 / NIBM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="bf-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="bf-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. Fintech product roles at Series B-C startups carry additional 20-40% ESOP value not reflected here.</p>
              <div className="bf-callout">
                <em><strong>What these numbers do not tell you:</strong> Employer segment dominates. A Cluster Head at HDFC Bank in Mumbai earns nearly 2x the same title at a Tier-2 bank in Nagpur. Fintechs pay competitively but come with ESOP-heavy compensation — cash comp looks lower initially but total wealth over 5 years often exceeds Tier-1 bank equivalents if the startup grows.</em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="bf-section">
              <h2>The 10 Banking &amp; Finance MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 421 Banking &amp; Finance alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="bf-table-wrap">
                <table className="bf-top10-table">
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
                        <td><span className={`bf-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="bf-source">As of 2025-26. NIBM Pune is primarily employer-sponsored for serving bank officers. IIBF certifications are not degree-equivalent but carry very strong sector recognition. Placement support ratings from CollegeNCourses internal alumni tracking.</p>
              <div className="bf-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="bf-section">
              <h2>Distance, Online, or Executive: which mode fits your Banking &amp; Finance career</h2>
              <p>Mode choice for Banking &amp; Finance is heavily influenced by whether you're already inside the banking sector or trying to break in.</p>
              <div className="bf-callout-navy">
                <em>From our counselling records 2023-25: Existing bank employees over-invest in general Finance MBAs when Banking &amp; Finance would deliver 30-40% faster career acceleration in their specific sector. HDFC and ICICI's internal promotion boards explicitly favour sector-specific MBAs over general Finance MBAs at Deputy Manager and AVP levels. If you already work at a bank, don't pick a general Finance MBA thinking it's more prestigious — the sector-specific credential is objectively better for your specific career path. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="bf-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="bf-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="bf-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick a Banking &amp; Finance MBA</h2>
              <p>We include this section because most guides won't.</p>
              <ul className="bf-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if a Banking &amp; Finance MBA is right for you: 5 questions</h2>
              <div className="bf-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="bf-howto-card">
                    <div className="bf-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="bf-section">
              <h2>Frequently asked questions</h2>
              <div className="bf-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="bf-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="bf-section">
              <h2>Go deeper</h2>
              <ul className="bf-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="bf-cta-band">
        <div className="bf-wrap">
          <h2>Ready to shortlist your Banking &amp; Finance MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your sector segment, employer sponsorship policy, budget, and career target. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-banking-finance" />
    </>
  );
}
