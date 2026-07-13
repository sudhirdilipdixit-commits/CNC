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
  `Restructured by omnichannel and D2C in 2024-25. Traditional retail leaders now need e-commerce fluency; new D2C brands hire differently from legacy retailers.`,
  `Fees: ₹1.2 lakh (ICFAI Distance) to ₹20 lakh (IIM Executive Retail focus). Mainstream Online MBA median sits at ₹1.85 lakh for 24 months.`,
  `Median salaries (2025-26): ₹5.5 LPA for freshers, ₹12 LPA at 3-7 years, ₹26 LPA at 8-15 years. COO Retail and D2C Brand Head roles push ₹40-70 LPA.`,
  `Best-fit profile: Sales/store professionals wanting promotion; D2C brand aspirants; consumer-goods professionals moving into retail leadership; and family-business retail next-generation.`,
  `Poor-fit signal: If you dislike customer-facing work, prefer purely analytical roles, or want purely digital-only careers, choose Digital Marketing, Business Analytics, or Finance instead.`,
  `Top pick by mode (2025-26): Symbiosis Online, NMIMS Distance, IIM Ahmedabad PGPX for Retail.`,
];

type QuickFact = { label: string; value: string };
const QUICK_FACTS: QuickFact[] = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "₹1.2 L – ₹20 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median 2025-26 entry salary", value: "₹5.5 LPA" },
  { label: "Median 2025-26 mid-career salary", value: "₹12 LPA" },
  { label: "Top employers", value: "Reliance Retail, DMart, Trent (Zudio, Westside), TATA Cliq, Landmark, Nykaa, Myntra, Amazon Retail, Flipkart, Blinkit, Zepto, Instamart, Mamaearth, boAt, Sugar" },
  { label: "Fits best if", value: "Sales/store pro wanting promotion, D2C aspirant, or family-business retail next-gen" },
];

type ProfileCard = { title: string; body: string };
const PROFILE_CARDS: ProfileCard[] = [
  {
    title: "The sales / store professional wanting promotion",
    body: `Two to eight years' experience as a Store Manager, Cluster Manager, or Retail Sales Executive at Reliance Retail, DMart, Trent, Landmark, Titan, or similar. Wants promotion to Regional Manager, Head of Store Operations, or Category Head. Blocked by 'MBA required' clause in most large corporates. Distance or Online MBA fits perfectly.`,
  },
  {
    title: "The D2C brand aspirant",
    body: `Two to eight years' experience in marketing, sales, product, or entrepreneurship. Wants to build or scale a D2C brand — either as a founder or by joining Nykaa, Mamaearth, boAt, Sugar, MyGlamm, or similar as a Category Manager or Brand Manager. Online MBA fits — provides omnichannel and consumer-behaviour frameworks while allowing career continuity.`,
  },
  {
    title: "The consumer-goods professional moving into retail leadership",
    body: `Three to twelve years' experience at HUL, ITC, Nestle, Marico, or similar FMCG firms in sales or trade marketing roles. Wants to move into retail-specific leadership — either at large retailers (Reliance Retail, DMart) or at emerging D2C brands. Online MBA fits. Executive at IIM Ahmedabad PGPX or MICA fits for aspirants targeting Tier-1 D2C brand-founder trajectories.`,
  },
  {
    title: "The family-business retail next-generation",
    body: `Second or third-generation family retail business owner. Business is domestic and physical retail-heavy. Wants to add omnichannel, D2C, and modern retail frameworks. Online MBA at Symbiosis or NMIMS fits — curriculum access more valuable than credential for family-business use case.`,
  },
];

type Semester = { title: string; subjects: string };
const CURRICULUM: Semester[] = [
  {
    title: "Semester 1 — Foundations",
    subjects: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management, Organisational Behaviour, Introduction to Retail Management.",
  },
  {
    title: "Semester 2 — Retail core",
    subjects: "Retail Strategy & Format, Store Operations & Management, Category Management & Buying, Visual Merchandising, Customer Experience Design, Business Communication.",
  },
  {
    title: "Semester 3 — Applied retail",
    subjects: "Omnichannel Retail Strategy, Retail Supply Chain, Retail Analytics (Excel + Power BI), Retail Marketing & Digital, Consumer Behaviour in Retail, Retail Buying & Merchandising.",
  },
  {
    title: "Semester 4 — 2025-26 additions & capstone",
    subjects: "D2C Brand Building (new elective — brand story, product-market fit, community and content, unit economics), Quick Commerce Operations (new elective — dark stores, 10-minute delivery ops, category strategy for Blinkit/Zepto/Instamart), AI in Retail (new elective — personalisation, dynamic pricing, computer vision in stores), Industry Capstone Project.",
  },
];

type RoleCard = { title: string; path: string; employers: string; salary: string; note?: string };
const ROLE_CARDS: RoleCard[] = [
  {
    title: "Store Operations Management (Traditional Retail)",
    path: "Store Manager → Cluster Manager → Regional Manager → Head of Store Operations → COO Retail",
    employers: "Reliance Retail (Reliance Fresh, Smart, JioMart), DMart, Trent (Zudio, Westside, Star), Landmark Group, Titan, Shoppers Stop, Lifestyle",
    salary: "Traditional but stable career family.",
  },
  {
    title: "Category Management & Buying",
    path: "Category Analyst → Category Manager → Category Head → VP Categories",
    employers: "Large retailers (Reliance Retail, DMart), e-commerce (Amazon, Flipkart, Nykaa, Myntra), D2C brands",
    salary: "Fast growth path with strong progression.",
  },
  {
    title: "D2C Brand Category Management",
    path: "Category Manager → Brand Manager → Head of Brand → VP Categories",
    employers: "Nykaa, Mamaearth, boAt, Sugar, MyGlamm, WOW Skin Science, Bella Vita, Sirona, Rare Rabbit",
    salary: "New category since 2019 and one of the fastest-paying paths in 2025-26.",
    note: "ESOP components at Series B-C brands can materially exceed base compensation over 4-5 years if the brand scales.",
  },
  {
    title: "E-commerce Retail (Marketplace / Category Head)",
    path: "Category Analyst → Category Manager → Category Head → VP Marketplace",
    employers: "Amazon, Flipkart, Nykaa, Myntra, Meesho, JioMart, TATA CliQ",
    salary: "Strong growth family with competitive compensation.",
  },
  {
    title: "Quick Commerce Operations",
    path: "City Operations Manager → Regional Head → Head of Operations → COO",
    employers: "Blinkit, Zepto, Instamart (Swiggy), BB Now (BigBasket)",
    salary: "Newest and fastest-growing career family in Indian retail.",
  },
  {
    title: "Retail Marketing & Customer Experience",
    path: "Marketing Manager → Head of Marketing → Head of CX → CMO",
    employers: "Retailers, D2C brands, e-commerce platforms",
    salary: "Overlaps with Marketing Management and Digital Marketing specializations.",
  },
  {
    title: "Retail Consulting",
    path: "Consultant → Senior Consultant → Manager → Partner",
    employers: "Deloitte Retail, EY Retail, PwC Retail, KPMG Retail, Bain, McKinsey Retail, Wazir Advisors, Technopak",
    salary: "Highest-paying path. Best accessed through Executive MBA at IIM Ahmedabad PGPX or MICA.",
  },
];

type SalaryRow = { band: string; dist: string; exec_t1: string; exec_t2: string };
const SALARY_ROWS: SalaryRow[] = [
  { band: "Fresh graduate, 0-2 years", dist: "₹4 – 7 LPA", exec_t1: "₹8 – 14 LPA", exec_t2: "₹5.5 – 10 LPA" },
  { band: "Mid-level, 3-7 years", dist: "₹8 – 16 LPA", exec_t1: "₹18 – 30 LPA", exec_t2: "₹11 – 20 LPA" },
  { band: "Senior, 8-15 years", dist: "₹18 – 34 LPA", exec_t1: "₹34 – 58 LPA", exec_t2: "₹22 – 42 LPA" },
  { band: "Leadership, 15+ years", dist: "₹34 – 58 LPA", exec_t1: "₹58 LPA – ₹1 Cr", exec_t2: "₹42 – 72 LPA" },
  { band: "COO Retail / D2C Head (top 5%)", dist: "₹50 LPA+", exec_t1: "₹1 Cr+", exec_t2: "₹65 LPA+" },
];

type Top10Row = { rank: number; programme: string; university: string; mode: string; duration: string; fee: string; placement: string; strength: string };
const TOP10_ROWS: Top10Row[] = [
  { rank: 1, programme: "PGPX (Retail electives)", university: "IIM Ahmedabad", mode: "Executive (residential)", duration: "12 mo", fee: "₹28 L", placement: "Very Strong (~100%)", strength: "Top brand for D2C founder / consulting reset" },
  { rank: 2, programme: "Executive MBA (Retail/Consumer focus)", university: "MICA Ahmedabad", mode: "Executive (residential)", duration: "24 mo", fee: "₹20 L", placement: "Very Strong (~92%)", strength: "Legacy consumer + brand depth" },
  { rank: 3, programme: "EPGP (Retail/Consumer track)", university: "IIM Kozhikode", mode: "Executive (interactive online)", duration: "24 mo", fee: "₹15 L", placement: "Very Strong (~94%)", strength: "Best value IIM retail" },
  { rank: 4, programme: "Online MBA Retail Management", university: "Symbiosis SCOL", mode: "Online", duration: "24 mo", fee: "₹2.5 L", placement: "Strong (~72%)", strength: "Live faculty, strong D2C and retail alumni" },
  { rank: 5, programme: "Distance MBA Retail Management", university: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.8 L", placement: "Moderate-Strong (~64%)", strength: "Industry-tied retail projects" },
  { rank: 6, programme: "Online MBA Retail Management", university: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", placement: "Moderate (~54%)", strength: "Best value in Tier-1 university" },
  { rank: 7, programme: "Online MBA Retail Management", university: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", placement: "Moderate (~55%)", strength: "Widest retail electives" },
  { rank: 8, programme: "Online MBA Retail Management", university: "Jain (Deemed-to-be-Univ) Online", mode: "Online", duration: "24 mo", fee: "₹1.5 L", placement: "Moderate-Strong (~58%)", strength: "Value + strong accreditation" },
  { rank: 9, programme: "Online MBA Retail Management", university: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.4 L", placement: "Moderate (~52%)", strength: "Strong newer entrant with D2C placements" },
  { rank: 10, programme: "Distance MBA Retail Management", university: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
];

type ModeRow = { situation: string; mode: string; why: string };
const MODE_ROWS: ModeRow[] = [
  { situation: "Existing store manager at Reliance/DMart wanting Regional Manager promotion", mode: "Distance or Online MBA", why: "Credential unlocks promotion; large fee premium unnecessary" },
  { situation: "Aspirant targeting D2C Brand Category Manager at Nykaa/Mamaearth/boAt", mode: "Online MBA (Symbiosis, NMIMS, or MICA online)", why: "D2C-specific electives + alumni networks matter more than brand" },
  { situation: "Consumer-goods professional targeting COO Retail at large chain", mode: "Executive MBA (MICA or IIM Kozhikode EPGP)", why: "Executive brand + peer cohort matter for senior transitions" },
  { situation: "Retail professional targeting Tier-1 consulting (Deloitte/Bain Retail)", mode: "Executive MBA (IIM Ahmedabad PGPX or MICA)", why: "Consulting placement is brand-gated" },
  { situation: "Family-business retail next-gen", mode: "Online MBA (Symbiosis or NMIMS)", why: "Curriculum access + omnichannel exposure most valuable" },
  { situation: "Aspirant targeting Quick Commerce (Blinkit/Zepto) City Ops Head", mode: "Online MBA (Symbiosis or NMIMS)", why: "Fast-moving sector; portfolio matters more than brand" },
  { situation: "Budget under ₹1.5 L", mode: "Distance MBA (ICFAI)", why: "Only if Online is genuinely unaffordable" },
];

const NOT_FIT: string[] = [
  `You dislike customer-facing or public-facing work. Choose Finance Management, Business Analytics, or IT & Systems Management.`,
  `You want a purely digital-only career (no offline retail exposure). Choose Digital Marketing.`,
  `You want purely quantitative or analytical work. Choose Business Analytics.`,
  `You resist weekends, festival season peaks, and rotational schedules. Retail is heavily seasonal and weekend-heavy.`,
  `You want to work exclusively at legacy corporate offices. D2C brands and quick commerce have startup-style operational rhythms — long days during launches and peak sales, ambiguity in role definitions.`,
  `You're choosing Retail because 'everyone shops so retail must have jobs.' That's directionally true but the daily work is customer-and-metrics-intensive.`,
];

type HowToStep = { step: number; title: string; body: string };
const FIVE_QUESTIONS: HowToStep[] = [
  { step: 1, title: "Name your target segment — traditional retail, D2C, e-commerce retail, or quick commerce", body: `Each has fundamentally different economics, hiring criteria, and daily work. Traditional retail pays steadily; D2C pays cash + ESOPs; e-commerce retail pays competitively; quick commerce pays high with rapid burnout risk. Know which one you're targeting.` },
  { step: 2, title: "Confirm your comfort with weekends and festival-peak schedules", body: `Retail is 24×7 during Diwali, EOSS periods, Black Friday, and end-of-quarter pushes. If work-life predictability is a hard requirement, some segments (retail consulting, category management at MNCs) fit; others (store operations, quick commerce) will feel relentless.` },
  { step: 3, title: "Audit whether you enjoy consumer businesses at ground level", body: `Retail rewards aspirants who genuinely enjoy understanding consumers — store visits, category walks, D2C brand deconstruction, and metrics reviews. If retail visits feel tedious, this isn't the fit.` },
  { step: 4, title: "Check whether D2C or quick commerce is the right emerging segment for you", body: `If yes — Online MBA with D2C/quick commerce electives (Symbiosis, NMIMS, MICA) is far better than a traditional retail programme. If your target is Reliance Retail or DMart, either works.` },
  { step: 5, title: "Set your hard financial ceiling", body: `₹1.2 L to ₹28 L is the full range. Most working professionals fit ₹1.85 L to ₹2.5 L Online. Stretching to Executive is worthwhile only for D2C founder-track (IIM Ahmedabad PGPX) or Tier-1 retail consulting reset (MICA or IIM PGPX).` },
];

type FAQ = { q: string; a: string; voice?: boolean };
const FAQS: FAQ[] = [
  { q: "Is an Online MBA in Retail Management valid in India?", a: `Yes. An Online MBA in Retail from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment.` },
  { q: "Should I do a Retail MBA or a Marketing MBA?", a: `Depends on target. If you want to run brand strategy across sectors (FMCG at HUL, tech at Amazon), Marketing Management is broader and more portable. If you want to work specifically in retail businesses (Nykaa category head, DMart regional manager, D2C brand founder), Retail Management goes deeper into retail-specific disciplines.` },
  { q: "How much does a Retail MBA cost in India in 2025-26?", a: `Fees range from ₹1.2 lakh (ICFAI Distance) to ₹28 lakh (IIM Ahmedabad PGPX). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.4 lakh and ₹2.5 lakh total. MICA Executive is ₹20 lakh; IIM Kozhikode EPGP retail track is ₹15 lakh.` },
  { q: "What is the salary after an Online MBA in Retail?", a: `Median 2025-26 salary is ₹5.5 LPA for freshers, ₹12 LPA at 3-7 years, ₹26 LPA at 8-15 years. D2C brand Category Managers at Nykaa, Mamaearth, and boAt earn 25-40% above these medians, with ESOPs adding meaningful upside on liquidity events.` },
  { q: "Can I start my own D2C brand after this MBA?", a: `Yes — one of the specialization's fastest-growing paths. The MBA gives you consumer-behaviour frameworks, brand-building sequences, unit economics understanding, and D2C-specific playbooks. Roughly 8% of our 197 surveyed Retail MBA alumni have started their own D2C brand or joined founding teams at Series A stage within 3 years of graduation.` },
  { q: "What is the difference between Retail MBA and Fashion Management?", a: `Retail Management is category-agnostic — you can run beauty, grocery, apparel, home, or electronics. Fashion Management is specifically apparel/lifestyle-focused with additional depth on trend forecasting, textile knowledge, and fashion cycles. Aspirants clear about apparel/fashion should consider both; aspirants open across retail categories should choose Retail Management.` },
  { q: "Can I do a Retail MBA without a retail background?", a: `Yes. Roughly 55% of Retail MBA enrolments at Symbiosis SCOL and NMIMS in 2024-25 came from non-retail backgrounds — often IT services, engineering, general management, or fresh graduates. The MBA teaches retail from first principles.` },
  { q: "Which universities have the best placement records for Retail MBAs?", a: `Based on internal alumni tracking (2024-25), the highest placement conversion rates for Retail graduates were at IIM Ahmedabad PGPX (~100%), IIM Kozhikode EPGP retail track (~94%), MICA Executive (~92%), and Symbiosis SCOL (~72%). Symbiosis and NMIMS have the strongest D2C brand alumni networks.` },
  { q: "How is AI affecting Retail careers in India?", a: `Substantially. AI is restructuring personalisation (customer-level recommendations at Nykaa, Amazon), dynamic pricing, inventory optimisation, computer vision in physical stores, and D2C content generation. Junior visual merchandising and standard operational roles are contracting; strategic category management, AI-driven CX design, and D2C brand building roles are growing.` },
  { q: "What is Quick Commerce and is it a good career path?", a: `Quick Commerce is the 10-minute grocery and essentials delivery model — Blinkit (Zomato), Zepto, Instamart (Swiggy), BB Now (BigBasket). It's the fastest-growing segment of Indian retail as of 2025-26. Career progression is fast because segments are new and companies are scaling. Trade-off is high burnout risk from operational intensity.` },
  { q: "What are education loan options for a Retail MBA?", a: `For Online MBAs at ₹1.85-2.5 lakh, most working professionals pay from monthly salary. For Executive MBAs at ₹15-28 lakh, education loans are widely available: SBI (up to ₹1.5 crore), HDFC Credila (up to ₹75 lakh), ICICI (up to ₹1 crore), Avanse, Auxilo. Interest rates 9.5-12.5%.` },
  { q: "How does CollegeNCourses help me choose?", a: `Our counsellors match you to programmes based on your target segment (traditional retail, D2C, e-commerce, quick commerce, or consulting), current sales/marketing experience, family-business context, Tier-1 aspirations, budget, and timeline. Free 30-minute call.` },
  { q: "Is Retail Management MBA a good career option?", a: `Yes, particularly for aspirants interested in consumer businesses. India's D2C brand explosion (Nykaa, Mamaearth, boAt), quick commerce growth (Blinkit, Zepto), organised retail expansion (Reliance Retail, DMart), and e-commerce scaling (Amazon, Flipkart, Meesho) are all driving structural retail hiring across segments.`, voice: true },
  { q: "What is the salary after retail MBA in India?", a: `Median starting salary after an Online MBA in Retail is ₹5.5 LPA in India in 2025-26. It scales to ₹12 LPA at 3-7 years, ₹26 LPA at 8-15 years, and ₹50 LPA+ at COO Retail or D2C Brand Head levels. D2C Category Managers at Series B-C brands earn cash comp plus meaningful ESOP components.`, voice: true },
  { q: "Which is the best MBA for retail in India?", a: `The three most-recommended MBAs for Retail in 2025-26 are IIM Ahmedabad PGPX (Executive, best for D2C founder or Tier-1 consulting reset), MICA Executive (legacy consumer + brand depth, best for retail consulting), and Symbiosis Centre for Online Learning (Online, strong D2C brand alumni network).`, voice: true },
  { q: "Do employers actually value Distance and Online Retail MBAs in 2025-26?", a: `Yes, especially at large retailers (Reliance Retail, DMart, Trent), e-commerce (Amazon, Flipkart, Nykaa, Myntra), and D2C brands (Nykaa, Mamaearth, boAt, Sugar) — which are where most Retail MBA hiring happens. For Tier-1 retail consulting (Bain, McKinsey, Deloitte Retail), Executive MBA from IIM Ahmedabad, MICA, or IIM Kozhikode retains preference.` },
];

type Related = { title: string; href: string };
const RELATED: Related[] = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Marketing Management: The Honest Guide", href: "/specializations-guide/marketing/" },
  { title: "MBA in Digital Marketing: The Honest Guide", href: "/specializations-guide/digital-marketing/" },
  { title: "MBA in Supply Chain Management: The Honest Guide", href: "/specializations-guide/supply-chain/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function RetailGuideClient() {
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
        .rt-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:var(--yellow);z-index:999;transition:width .1s linear}
        .rt-wrap{max-width:1140px;margin:0 auto;padding:0 1.25rem;font-family:var(--font-sans);color:var(--charcoal)}
        .rt-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .rt-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .rt-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .rt-bc-inner li:last-child::after{content:""}
        .rt-bc-inner a{color:var(--navy);text-decoration:none}
        .rt-bc-inner a:hover{text-decoration:underline}
        .rt-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .rt-eyebrow{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:.75rem}
        .rt-h1{font-family:var(--font-serif);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.2;font-weight:700;text-wrap:balance;margin-bottom:1rem;color:#fff}
        .rt-sub{font-size:1.05rem;line-height:1.6;color:#cbd5e1;max-width:640px;margin-bottom:1.5rem}
        .rt-trust{font-size:.8rem;color:#94a3b8;margin-bottom:1.5rem}
        .rt-cta-row{display:flex;flex-wrap:wrap;gap:.75rem}
        .rt-btn-primary{background:var(--yellow);color:var(--navy);padding:.65rem 1.5rem;border-radius:6px;font-weight:700;font-size:.95rem;border:none;cursor:pointer}
        .rt-btn-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:.65rem 1.5rem;border-radius:6px;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block}
        .rt-verify{font-size:.72rem;color:#94a3b8;margin-top:.75rem;font-style:italic}
        .rt-layout{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.rt-layout{grid-template-columns:1fr}}
        .rt-toc-sticky{position:sticky;top:80px}
        .rt-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .rt-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .rt-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .rt-toc-desktop nav a.rt-active,.rt-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .rt-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .rt-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .rt-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.rt-toc-mobile{display:none}}
        @media(max-width:900px){.rt-toc-desktop{display:none}.rt-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .rt-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .rt-toc-mobile summary::after{content:"▾"}
        .rt-toc-mobile[open] summary::after{content:"▴"}
        .rt-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .rt-toc-mobile a:hover{background:var(--mist)}
        .rt-section{margin-bottom:3.5rem;padding-top:.5rem}
        .rt-section h2{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.75rem);color:var(--navy);margin-bottom:1.25rem;text-wrap:balance}
        .rt-takeaway-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .rt-takeaway-list li{background:var(--pale-navy,#f0f4ff);border-left:4px solid var(--yellow);padding:.9rem 1rem .9rem 1.25rem;border-radius:0 6px 6px 0;font-size:.95rem;line-height:1.5}
        .rt-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .rt-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);vertical-align:top}
        .rt-facts-table tr:last-child td{border-bottom:none}
        .rt-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}
        .rt-callout{border-left:4px solid var(--yellow);background:var(--pale-navy,#f0f4ff);padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin:1.5rem 0;font-size:.9rem;line-height:1.55;font-style:italic}
        .rt-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
        .rt-profile-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .rt-profile-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;border-left:4px solid var(--yellow);padding-left:.75rem}
        .rt-profile-card p{font-size:.9rem;line-height:1.55;color:var(--charcoal);margin:0}
        .rt-semester-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
        .rt-semester{background:var(--pale-navy,#f0f4ff);border-radius:8px;padding:1.1rem}
        .rt-semester h3{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;text-transform:uppercase;letter-spacing:.04em}
        .rt-semester p{font-size:.83rem;line-height:1.55;color:var(--charcoal);margin:0}
        .rt-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
        .rt-role-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem}
        .rt-role-card h3{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem}
        .rt-role-meta{font-size:.82rem;color:#64748b;margin-bottom:.25rem;line-height:1.4}
        .rt-role-meta strong{color:var(--charcoal)}
        .rt-role-salary{font-size:.85rem;font-weight:600;color:var(--navy);margin-top:.5rem;padding-top:.5rem;border-top:1px solid #e2e8f0}
        .rt-role-note{font-size:.8rem;color:#64748b;font-style:italic;margin-top:.4rem}
        .rt-table-wrap{overflow-x:auto}
        .rt-salary-table{width:100%;border-collapse:collapse;font-size:.88rem;font-variant-numeric:tabular-nums}
        .rt-salary-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left;white-space:nowrap}
        .rt-salary-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0}
        .rt-salary-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .rt-col-highlight{font-weight:600;background:#fef9ec!important}
        .rt-top10-table{width:100%;border-collapse:collapse;font-size:.83rem;font-variant-numeric:tabular-nums}
        .rt-top10-table th{background:var(--navy);color:#fff;padding:.6rem .75rem;text-align:left;white-space:nowrap}
        .rt-top10-table td{padding:.55rem .75rem;border-bottom:1px solid #e2e8f0;vertical-align:top}
        .rt-top10-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .rt-rank{display:inline-flex;align-items:center;justify-content:center;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--navy);color:#fff;font-size:.75rem;font-weight:700}
        .rt-rank.top3{background:var(--yellow);color:var(--navy)}
        .rt-mode-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .rt-mode-table th{background:var(--navy);color:#fff;padding:.65rem .9rem;text-align:left}
        .rt-mode-table td{padding:.6rem .9rem;border-bottom:1px solid #e2e8f0;vertical-align:top;line-height:1.4}
        .rt-mode-table tr:nth-child(even) td{background:var(--pale-navy,#f0f4ff)}
        .rt-mode-rec{font-weight:700;color:var(--navy)}
        .rt-notfit-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.75rem}
        .rt-notfit-list li{padding:.75rem 1rem;background:#fff7f7;border-left:4px solid #ef4444;border-radius:0 6px 6px 0;font-size:.92rem;line-height:1.5}
        .rt-howto-grid{display:flex;flex-direction:column;gap:1rem}
        .rt-howto-card{display:grid;grid-template-columns:2.5rem 1fr;gap:.75rem;align-items:start;background:var(--pale-navy,#f0f4ff);padding:1.1rem;border-radius:8px}
        .rt-howto-num{width:2.5rem;height:2.5rem;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
        .rt-howto-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.35rem}
        .rt-howto-card p{font-size:.88rem;line-height:1.55;color:var(--charcoal);margin:0}
        .rt-faq-list{display:flex;flex-direction:column;gap:.5rem}
        .rt-faq-list details{border:1px solid #e2e8f0;border-radius:6px;overflow:hidden}
        .rt-faq-list summary{padding:.9rem 1rem;font-size:.93rem;font-weight:600;cursor:pointer;list-style:none;color:var(--navy)}
        .rt-faq-list summary::-webkit-details-marker{display:none}
        .rt-faq-list details[open] summary{border-bottom:1px solid #e2e8f0}
        .rt-faq-list details p{padding:.9rem 1rem;font-size:.9rem;line-height:1.6;color:var(--charcoal);margin:0}
        .rt-voice-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;margin-left:.5rem;vertical-align:middle}
        .rt-related-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .rt-related-list a{color:var(--navy);font-size:.93rem;text-decoration:underline;text-underline-offset:3px}
        .rt-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .rt-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .rt-cta-band p{color:rgba(255,255,255,.78);font-size:.95rem;margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .rt-cta-band button{background:var(--yellow);color:var(--navy);border:none;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .15s}
        .rt-cta-band button:hover{opacity:.88}
        .rt-source{font-size:.75rem;color:#94a3b8;font-style:italic;margin-top:.75rem;line-height:1.4}
        .rt-below-cta{text-align:center;margin-top:1.25rem}
        .rt-below-cta button{background:var(--yellow);color:var(--navy);border:none;padding:.6rem 1.4rem;border-radius:6px;font-weight:700;cursor:pointer}
        @media(max-width:768px){.rt-cta-row{flex-direction:column}.rt-salary-table th,.rt-salary-table td,.rt-top10-table th,.rt-top10-table td{font-size:.78rem;padding:.5rem .55rem}}
      `}</style>

      <div ref={progressRef} className="rt-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className="rt-breadcrumb" aria-label="Breadcrumb">
        <div className="rt-wrap">
          <ol className="rt-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Retail Management</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="rt-hero">
        <div className="rt-wrap">
          <p className="rt-eyebrow">Specialization Guide • 2025-26 Edition</p>
          <h1 className="rt-h1">MBA in Retail Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="rt-sub">Fees from ₹1.2 lakh to ₹20 lakh. Real salary data across store operations, category management, D2C brand building, e-commerce retail, and quick commerce roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode.</p>
          <p className="rt-trust">★★★★★ 4.8 / 5 counselling rating &nbsp;•&nbsp; 12,000+ aspirants placed since 2019 &nbsp;•&nbsp; 150+ verified universities</p>
          <div className="rt-cta-row">
            <button className="rt-btn-primary" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation →</button>
            <a href="#top10" className="rt-btn-secondary">Jump to top 10 programmes ↓</a>
          </div>
          <p className="rt-verify"><em>Last verified against the UGC-DEB current approved-institutions list.</em></p>
        </div>
      </header>

      <div className="rt-wrap">
        <div className="rt-layout">
          {/* Sidebar + mobile ToC */}
          <aside>
            <div className="rt-toc-sticky">
              <details className="rt-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                ))}
              </details>
              <div className="rt-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className={activeId === t.id ? "rt-active" : ""}>{t.label}</a>
                  ))}
                </nav>
                <div className="rt-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          <main>
            {/* Key takeaways */}
            <section id="takeaways" className="rt-section">
              <h2>Key takeaways</h2>
              <ul className="rt-takeaway-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            {/* Snapshot */}
            <section id="snapshot" className="rt-section">
              <h2>Retail Management MBA, in 90 seconds</h2>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1rem" }}>An MBA in Retail Management trains you to run retail businesses across physical stores, e-commerce, D2C brands, and quick commerce. Curriculum covers store operations, category management, retail buying, visual merchandising, customer experience design, omnichannel strategy, and D2C brand building. As of 2025-26, the specialization has been fundamentally restructured by omnichannel and D2C growth.</p>
              <p style={{ fontSize: ".93rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem" }}>Fees range from ₹1.2 lakh (ICFAI Distance) to ₹20 lakh (IIM Ahmedabad Retail focus), with the mainstream Online MBA median at ₹1.85 lakh. Median entry-level salary for a Retail MBA graduate in 2025-26 stands at ₹5.5 lakh per annum for freshers, ₹12 lakh for mid-level (3-7 years&apos; experience), and ₹26 lakh for senior roles (8-15 years). COO Retail and D2C Brand Head roles reach ₹40-70 LPA at 15+ years.</p>
              <table className="rt-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}><td>{f.label}</td><td>{f.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* What it is */}
            <section id="what-it-is" className="rt-section">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Retail Management, at postgraduate level, is the discipline of running consumer-facing retail businesses — designing store experiences, curating product assortments, managing categories, running retail operations, orchestrating omnichannel journeys, and building D2C brands.</p>
              <p>What makes it different from a Marketing Management MBA is <em>sector specificity versus functional breadth</em>. Marketing Management trains you for the marketing function across any sector — FMCG, IT, financial services, or manufacturing. Retail Management goes deep into retail-specific disciplines: store operations, category buying, retail supply chain, visual merchandising, and retail analytics. Marketing Management is more sector-portable; Retail Management delivers faster career acceleration if you&apos;re committed to consumer retail businesses.</p>
              <p>What makes it different from a Digital Marketing MBA is <em>channel scope</em>. Digital Marketing covers performance marketing, SEO, social media, and digital campaign management. Retail Management covers the full retail stack — physical store operations, omnichannel integration, category management, and D2C brand building — not only digital channels.</p>
              <div className="rt-callout">
                <em>A misconception we hear often in CollegeNCourses counselling calls: &apos;Retail MBA is only about running a physical store.&apos; It isn&apos;t — not since 2020. Modern retail in 2025-26 is roughly 30% omnichannel strategy, 25% category and buying management, 20% customer experience and analytics, 15% brand and marketing, and 10% operations. D2C brand building has become a distinct career path within Retail. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="rt-section">
              <h2>Who this specialization is built for</h2>
              <p>Retail Management MBAs work best for four broad profiles.</p>
              <div className="rt-profile-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.title} className="rt-profile-card">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="rt-section">
              <h2>What a 2025-26 Retail Management MBA actually teaches</h2>
              <p>A 2025-26 Retail Management MBA covers management foundations, then goes deep on retail strategy, store operations, category management and buying, visual merchandising, customer experience design, omnichannel retail, retail supply chain, and retail analytics. The 2025 additions are D2C Brand Building, Quick Commerce Operations, and AI in Retail.</p>
              <div className="rt-semester-grid">
                {CURRICULUM.map((s) => (
                  <div key={s.title} className="rt-semester">
                    <h3>{s.title}</h3>
                    <p>{s.subjects}</p>
                  </div>
                ))}
              </div>
              <div className="rt-callout" style={{ marginTop: "1.25rem" }}>
                <em><strong>New in 2025-26:</strong> D2C Brand Building, Quick Commerce Operations (dark stores, 10-minute delivery ops, category strategy for Blinkit/Zepto/Instamart), and AI in Retail (personalisation, dynamic pricing, computer vision in stores) are now offered as electives at Symbiosis SCOL, NMIMS, and MICA. These are increasingly tested in interviews at Nykaa, Mamaearth, boAt, Blinkit, and Zepto.
                </em>
              </div>
            </section>

            {/* Career paths */}
            <section id="careers" className="rt-section">
              <h2>The roles a Retail Management MBA leads to</h2>
              <p>Retail Management opens seven distinct career paths — from the most accessible (Store Operations Management) to the fastest-growing new category (Quick Commerce Operations) to the highest-paying (Retail Consulting).</p>
              <div className="rt-callout">
                <em>From our 2024-25 counselling desk: Omnichannel retailing has restructured the Retail Management specialization in the last three years. Traditional retail leaders (Reliance Retail, DMart, Trent) now explicitly evaluate MBA graduates on e-commerce fluency alongside store operations expertise. D2C-native brands (Nykaa, Mamaearth, boAt) have created an entirely new career category — Brand Category Manager — that didn&apos;t meaningfully exist in India before 2019. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="rt-role-grid" style={{ marginTop: "1.25rem" }}>
                {ROLE_CARDS.map((r) => (
                  <div key={r.title} className="rt-role-card">
                    <h3>{r.title}</h3>
                    <p className="rt-role-meta"><strong>Path:</strong> {r.path}</p>
                    <p className="rt-role-meta"><strong>Employers:</strong> {r.employers}</p>
                    <p className="rt-role-salary">{r.salary}</p>
                    {r.note && <p className="rt-role-note">{r.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="rt-section">
              <h2>What a Retail Management MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Retail Management sits at ₹5.5 lakh per annum for freshers (0-2 years&apos; experience), ₹12 lakh for mid-level (3-7 years), and ₹26 lakh for senior roles (8-15 years). D2C brands and quick commerce carry 25-40% premium above traditional physical retail at the same experience level.</p>
              <div className="rt-table-wrap">
                <table className="rt-salary-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1 IIM / MICA)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="rt-col-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="rt-source">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th–75th percentile. D2C brand ESOP components and quick commerce variable pay not reflected in base salary bands.</p>
              <div className="rt-callout">
                <em><strong>What these numbers do not tell you:</strong> Segment of employment dominates. A Category Manager at Nykaa in Mumbai earns significantly more than the same title at a mid-size regional retail chain. D2C Category Managers at Series B-C brands earn base comp plus ESOPs — the ESOP upside on a liquidity event can materially exceed several years of base salary. Quick commerce pays high base but carries high burnout risk; know the trade-off before choosing that path.
                </em>
              </div>
            </section>

            {/* Top 10 */}
            <section id="top10" className="rt-section">
              <h2>The 10 Retail Management MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 197 Retail alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="rt-table-wrap">
                <table className="rt-top10-table">
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
                        <td><span className={`rt-rank${r.rank <= 3 ? " top3" : ""}`}>{r.rank}</span></td>
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
              <p className="rt-source">As of 2025-26. Fees are total programme cost. IIM Ahmedabad PGPX at ₹28 lakh is warranted only for aspirants with a specific D2C founder-track or Tier-1 retail consulting reset target. Placement support ratings from CollegeNCourses internal alumni tracking.</p>
              <div className="rt-below-cta">
                <p style={{ marginBottom: ".75rem" }}>Confused about which one fits your profile?</p>
                <button onClick={() => setModalOpen(true)}>Book a free counselling call →</button>
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode" className="rt-section">
              <h2>Distance, Online, or Executive: which mode fits your Retail career</h2>
              <p>The mode decision for Retail Management hinges on your target segment — traditional retail, D2C, quick commerce, or consulting — and whether you need a credential for an internal promotion or a brand reset for an external move.</p>
              <div className="rt-callout">
                <em>From our counselling records 2023-25: D2C brand building has become a distinct career path from traditional retail management. Aspirants targeting D2C brand-founder or Category Manager roles at Nykaa, Mamaearth, boAt, or emerging Series A-B brands benefit sharply from Online MBAs that include D2C-specific electives (Symbiosis SCOL, NMIMS, MICA) — the curriculum matters more than the brand for this path. — CollegeNCourses Senior Counsellor Desk</em>
              </div>
              <div className="rt-table-wrap" style={{ marginTop: "1.25rem" }}>
                <table className="rt-mode-table">
                  <thead>
                    <tr><th>If your situation is…</th><th>The best mode is…</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td className="rt-mode-rec">{r.mode}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ marginTop: "2.5rem" }}>Who should not pick a Retail Management MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <ul className="rt-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h2 style={{ marginTop: "2.5rem" }}>How to decide if a Retail Management MBA is right for you: 5 questions</h2>
              <div className="rt-howto-grid" style={{ marginTop: "1rem" }}>
                {FIVE_QUESTIONS.map((q) => (
                  <div key={q.step} className="rt-howto-card">
                    <div className="rt-howto-num">{q.step}</div>
                    <div>
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="rt-section">
              <h2>Frequently asked questions</h2>
              <div className="rt-faq-list">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      {f.voice && <span className="rt-voice-tag">voice</span>}
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="rt-section">
              <h2>Go deeper</h2>
              <ul className="rt-related-list">
                {RELATED.map((r) => (
                  <li key={r.href}><a href={r.href}>{r.title}</a></li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="rt-cta-band">
        <div className="rt-wrap">
          <h2>Ready to shortlist your Retail Management MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target segment (traditional retail, D2C, e-commerce, quick commerce, or consulting), current experience, and D2C-founder or consulting aspirations. Free, 30 minutes.</p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-retail" />
    </>
  );
}
