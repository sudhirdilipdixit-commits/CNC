"use client";

import { useEffect, useRef, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "what-is-ba-mba", label: "What is it?" },
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
  `Highest-paying MBA specialization at entry-level in 2025-26. Median first-year salary of Rs 8.5 LPA for Online MBA graduates — 30% above the specialization average.`,
  "Fees: Rs 1.3 lakh (ICFAI Distance) to Rs 28 lakh (IIM Bangalore BAI). Mainstream Online MBA median sits at Rs 2 lakh for 24 months.",
  "Median salaries (2025-26): Rs 8.5 LPA for freshers, Rs 17 LPA at 3–7 years, Rs 34 LPA at 8–15 years. Fastest salary compounding of any specialization.",
  "Best-fit profile: Engineers, IT professionals, and finance analysts wanting a management title; quantitatively-minded aspirants at any experience level.",
  "Poor-fit signal: If you dislike Excel, SQL, statistics, or find data patterns uninteresting, choose Marketing or HR instead.",
  "Top pick by mode (2025-26): Symbiosis Online, Great Lakes PGP-BABI, IIM Bangalore BAI Executive.",
];

const QUICK_FACTS = [
  { label: "Duration", value: "12 months (Executive) to 24 months (Distance/Online)" },
  { label: "Fee range", value: "Rs 1.3 L – Rs 28 L (mode-dependent)" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median entry salary", value: "Rs 8.5 LPA" },
  { label: "Median mid-career salary", value: "Rs 17 LPA" },
  { label: "Median senior salary", value: "Rs 34 LPA" },
  { label: "Top employers", value: "Accenture, Deloitte, EY, KPMG, Tiger Analytics, Fractal, Mu Sigma, Amazon, Flipkart, HDFC Bank, ICICI, PwC" },
];

const PROFILE_CARDS = [
  {
    icon: "💻",
    title: "Engineer / IT Professional Shifting Into Management",
    desc: "Two to twelve years in software engineering, data engineering, IT services, or product engineering. Comfortable with Excel and SQL. Wants to move into Analytics Manager, Product Analytics Manager, or Data Consulting roles. Distance or Online MBA is the natural fit. This is the largest single fit-persona for Business Analytics MBAs.",
  },
  {
    icon: "📊",
    title: "Finance / Consulting Professional Moving Up",
    desc: "CA, CFA, or consultant wanting to add structured analytics depth. Wants to move into FP&A leadership, risk analytics, credit modelling, or analytics consulting at Deloitte / EY / Accenture / Fractal / Tiger Analytics. Online or Executive MBA fits.",
  },
  {
    icon: "🎓",
    title: "Quantitatively-Minded Graduate or Early-Career Switcher",
    desc: "Math, statistics, economics, or engineering graduate wanting to start in analytics. Currently in an unrelated role or job-hunting. Online MBA fits — provides both credentialing and structured tool exposure.",
  },
];

const CURRICULUM = [
  {
    sem: "Semester 1",
    title: "Foundations",
    subjects: [
      "Principles of Management",
      "Managerial Economics",
      "Financial Accounting",
      "Business Statistics",
      "Marketing Management",
      "Organisational Behaviour",
      "Introduction to Analytics",
    ],
  },
  {
    sem: "Semester 2",
    title: "Analytics Core",
    subjects: [
      "SQL & Databases",
      "Python or R for Data Analysis",
      "Descriptive & Predictive Analytics",
      "Data Visualization (Tableau + Power BI)",
      "Business Statistics Advanced",
      "Business Communication",
    ],
  },
  {
    sem: "Semester 3",
    title: "Applications & Advanced Techniques",
    subjects: [
      "Machine Learning Basics",
      "Business Intelligence",
      "Marketing Analytics",
      "Financial Analytics",
      "Operations Analytics",
      "Big Data Introduction (Hadoop/Spark concepts)",
      "Time Series Analysis",
    ],
  },
  {
    sem: "Semester 4",
    title: "2025-26 Additions & Capstone",
    subjects: [
      "Generative AI for Business (new elective)",
      "Ethical AI Frameworks",
      "Analytics Storytelling",
      "Advanced Predictive Modelling",
      "Industry Capstone Project",
    ],
  },
];

const ROLE_CARDS = [
  {
    icon: "📈",
    role: "Business Analyst / Product Analyst",
    path: "Business Analyst → Senior BA → Analytics Manager → Head of Analytics",
    employers: "Any Fortune-500, D2C, SaaS, or BFSI firm",
    salary: "Rs 7–18 LPA",
    note: "The single largest role family and easiest entry point",
  },
  {
    icon: "🔢",
    role: "Data Analyst",
    path: "Data Analyst → Senior DA → Analytics Lead → Chief Data Officer",
    employers: "BFSI, tech, e-commerce, telecom",
    salary: "Rs 6–16 LPA",
    note: "Strong technical growth path; faster technical compounding",
  },
  {
    icon: "🤝",
    role: "Analytics Consulting",
    path: "Analyst → Senior Analyst → Manager → Principal → Partner",
    employers: "Deloitte, EY, KPMG, McKinsey QuantumBlack, Tiger Analytics, Fractal, Mu Sigma",
    salary: "Rs 10–35 LPA",
    note: "Highest 5-year salary compounding of any Business Analytics path",
  },
  {
    icon: "📊",
    role: "BI (Business Intelligence) Management",
    path: "BI Analyst → BI Manager → Head of BI → Chief Data Officer",
    employers: "Large MNCs, BFSI, retail chains",
    salary: "Rs 7–22 LPA",
    note: "Slower but very stable career progression",
  },
  {
    icon: "🏦",
    role: "Risk & Financial Analytics",
    path: "Risk Analyst → Risk Manager → Head of Risk Analytics → Chief Risk Officer",
    employers: "Banks, insurance, fintech",
    salary: "Rs 8–28 LPA",
    note: "Strong regulatory demand, high stability, healthy pay",
  },
  {
    icon: "📱",
    role: "Product Analytics",
    path: "Product Analyst → Senior PA → Head of Product Analytics → VP Analytics",
    employers: "SaaS, consumer tech, fintech, ed-tech",
    salary: "Rs 9–30 LPA",
    note: "Fastest-growing role family in India as of 2025-26",
  },
];

const SALARY_ROWS = [
  { band: "Fresh graduate (0–2 yrs)", dist: "Rs 6–10 LPA", exec_t1: "Rs 10–16 LPA", exec_t2: "Rs 7.5–12 LPA" },
  { band: "Mid-level (3–7 yrs)", dist: "Rs 12–22 LPA", exec_t1: "Rs 22–38 LPA", exec_t2: "Rs 14–24 LPA" },
  { band: "Senior (8–15 yrs)", dist: "Rs 22–42 LPA", exec_t1: "Rs 42–75 LPA", exec_t2: "Rs 28–50 LPA" },
  { band: "Leadership (15+ yrs)", dist: "Rs 42–70 LPA", exec_t1: "Rs 75 L – Rs 1.5 Cr", exec_t2: "Rs 48–85 LPA" },
  { band: "CDO track (top 5%)", dist: "Rs 65 LPA+", exec_t1: "Rs 1.3 Cr+", exec_t2: "Rs 75 LPA+" },
];

const TOP10_ROWS = [
  { rank: 1, prog: "Executive Analytics (BAI)", uni: "IIM Bangalore", mode: "Executive (blended)", dur: "12 mo", fee: "Rs 28 L", approval: "AICTE, IIM Act", placement: "~98%", strength: "Top Tier-1 brand, industry mentorship" },
  { rank: 2, prog: "PGP-BABI", uni: "Great Lakes", mode: "Executive (weekend)", dur: "12 mo", fee: "Rs 16 L", approval: "AICTE", placement: "~92%", strength: "Purely analytics-focused Tier-1" },
  { rank: 3, prog: "Online MBA Business Analytics", uni: "Symbiosis SCOL", mode: "Online", dur: "24 mo", fee: "Rs 2.7 L", approval: "UGC-DEB, AICTE", placement: "~74%", strength: "Live faculty, strong Tier-1 brand" },
  { rank: 4, prog: "Certificate in Business Analytics (CBA)", uni: "ISB", mode: "Executive (blended)", dur: "12 mo", fee: "Rs 4.5 L", approval: "Executive Certificate", placement: "~95%", strength: "ISB brand + intensive analytics track" },
  { rank: 5, prog: "Online MBA Business Analytics", uni: "NMIMS Global Access", mode: "Online", dur: "24 mo", fee: "Rs 1.9 L", approval: "UGC-DEB", placement: "~66%", strength: "Industry-tied capstones" },
  { rank: 6, prog: "Online MBA Business Analytics", uni: "Manipal (MAHE)", mode: "Online", dur: "24 mo", fee: "Rs 1.75 L", approval: "UGC-DEB, NAAC A+", placement: "~57%", strength: "Best value in Tier-1 university" },
  { rank: 7, prog: "Online MBA Business Analytics", uni: "OP Jindal Global (JGBS)", mode: "Online", dur: "24 mo", fee: "Rs 3.75 L", approval: "UGC-DEB, AACSB", placement: "~72%", strength: "International accreditation" },
  { rank: 8, prog: "Online MBA Business Analytics", uni: "Amity University Online", mode: "Online", dur: "24 mo", fee: "Rs 1.99 L", approval: "UGC-DEB", placement: "~56%", strength: "Widest analytics electives" },
  { rank: 9, prog: "Online MBA Business Analytics", uni: "Jain CDOE", mode: "Online", dur: "24 mo", fee: "Rs 1.55 L", approval: "UGC-DEB, NAAC A++", placement: "~61%", strength: "Value + strong accreditation" },
  { rank: 10, prog: "Distance MBA Business Analytics", uni: "ICFAI Distance", mode: "Distance", dur: "24 mo", fee: "Rs 1.3 L", approval: "UGC-DEB", placement: "Limited", strength: "Lowest UGC-DEB cost" },
];

const MODE_ROWS = [
  { situation: "Working full-time in IT/engineering, want analytics management", best: "Online MBA", reason: "Live faculty walkthroughs on SQL/Python/Tableau + cohort discussions are material" },
  { situation: "Finance/CA professional moving into analytics or risk", best: "Online MBA", reason: "Structured stats + tools + business framework in one package" },
  { situation: "Consultant targeting Tier-1 analytics consulting (Fractal/Tiger/Deloitte)", best: "Executive MBA (IIM Bangalore BAI, ISB CBA, Great Lakes)", reason: "Brand + placement cell + alumni network critical for this reset" },
  { situation: "Fresh engineering/math graduate wanting analytics career", best: "Online MBA", reason: "Executive requires 3+ years; Online delivers structured entry" },
  { situation: "Budget under Rs 1.5 lakh", best: "Distance MBA (ICFAI)", reason: "Only if Online is genuinely unaffordable; accept lower placement outcomes" },
];

const NOT_FIT = [
  "You dislike statistics, Excel, or SQL. Business Analytics is fundamentally about data. If numbers feel boring, you'll be miserable.",
  "You want a purely creative or brand-facing role — Marketing Management or Digital Marketing is the right specialization.",
  "You want to work with people rather than data — HR Management is the right specialization.",
  "You want to run a P&L or become a general manager — a General MBA or Executive MBA at IIM/ISB fits better.",
  "You resist learning new tools every 18–24 months. The analytics stack (SQL, Python libraries, viz tools, cloud platforms) evolves faster than most disciplines.",
  `You're choosing Business Analytics because it "seems well-paying." It is — but the daily work is data-heavy. Pick because the problem-solving interests you, not the salary label.`,
];

const FIVE_QUESTIONS = [
  {
    step: "01",
    title: "Name your target role and industry",
    subtitle: "Specific enough to drive programme choice",
    body: "Business Analyst at a SaaS firm? Risk Analytics at a bank? Product Analytics at an e-commerce firm? Analytics Consultant at Deloitte? The programme choice and elective mix changes based on the answer. Domain specificity drives salary premiums of 15–30%.",
  },
  {
    step: "02",
    title: "Confirm your existing tool comfort level",
    subtitle: "SQL, Excel, and Tableau are the minimum",
    body: "If you have zero exposure to SQL, Excel, or any visualization tool, plan for 2–3 months of parallel self-learning through Google Data Analytics or Coursera before the MBA starts. You will not regret it.",
  },
  {
    step: "03",
    title: "Check whether Tier-1 analytics consulting is a realistic goal",
    subtitle: "This determines Executive vs Online",
    body: "If yes, Executive MBA at IIM Bangalore, ISB, or Great Lakes justifies the Rs 15–28 lakh. If not, Online MBA is far better ROI. The regret pattern: aspirants stretching to Executive without a clear consulting-reset opportunity in view.",
  },
  {
    step: "04",
    title: "Audit whether you enjoy problem-framing",
    subtitle: "And structured thinking under ambiguity",
    body: "Business Analytics is not about running scripts. It is about deciding what to measure, and communicating that decision to management. Aspirants who love ambiguous business problems do exceptionally well. Those who prefer following clear instructions struggle.",
  },
  {
    step: "05",
    title: "Set your hard financial ceiling",
    subtitle: "Then find the best programme within it",
    body: "Rs 1.3 L to Rs 28 L is the full range. Most working professionals fit Rs 1.9 L to Rs 3 L Online. Stretching to Executive without a clear Tier-1 reset in view is the single most common financial regret we track at our counselling desk.",
  },
];

const FAQS = [
  { q: "Is an Online MBA in Business Analytics valid in India?", a: "Yes. An Online MBA in Business Analytics from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment.", voice: false },
  { q: "Which is better — Business Analytics MBA or a Data Science course?", a: "A Business Analytics MBA is better if you want to move into management, business decision-making, or analytics consulting. A Data Science course is better if you want deep model-building or algorithm work. Business Analytics is broader; Data Science is deeper on technical specifics. Median 5-year salaries for MBAs in Business Analytics slightly outpace Data Science course graduates because the management path opens faster.", voice: false },
  { q: "How much does a Business Analytics MBA cost in India in 2025-26?", a: "Fees range from Rs 1.3 lakh (ICFAI Distance) to Rs 28 lakh (IIM Bangalore BAI Executive). Mainstream Online programmes at Symbiosis, NMIMS, Amity, Manipal, Jain, and OP Jindal sit between Rs 1.55 lakh and Rs 3.75 lakh.", voice: false },
  { q: "What is the salary after an Online MBA in Business Analytics?", a: "Median 2025-26 salary is Rs 8.5 LPA for freshers, Rs 17 LPA at 3–7 years, Rs 34 LPA at 8–15 years. Analytics consulting at Deloitte, EY, Fractal, or Tiger Analytics carries a 20–35% premium above these numbers.", voice: false },
  { q: "Do I need to know Python or R before starting the MBA?", a: "Not required, but strongly helpful. Aspirants with basic Python or R exposure enter the programme roughly 6–8 weeks ahead of peers. Programmes at Symbiosis, NMIMS, and Great Lakes include Python foundations in Semester 2, so a beginner can catch up.", voice: false },
  { q: "What is the difference between a Business Analytics MBA and a Business Analytics diploma?", a: "An MBA is a full 24-month postgraduate degree with management foundation plus specialization. A diploma is a shorter (typically 6–12 months) technical certification focused on execution. MBAs open Analytics Manager and consulting career paths; diplomas typically position for analyst-level entry roles.", voice: false },
  { q: "Can I do a Business Analytics MBA without a technical background?", a: "Yes. Roughly 30% of 2024-25 enrolments at Symbiosis SCOL and NMIMS Business Analytics came from non-technical backgrounds — typically commerce, arts, and general management. Programmes are designed to teach from first principles. Expect the first 4 months to feel steep if statistics are unfamiliar.", voice: false },
  { q: "Which universities have the best placement records for Business Analytics MBAs?", a: "Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Bangalore BAI Executive (~98%), ISB CBA (~95%), Great Lakes PGP-BABI (~92%), and Symbiosis Online (~74%). Executive tracks lead by a wide margin in this specialization.", voice: false },
  { q: "How is AI affecting Business Analytics careers in India?", a: "AI is expanding the field rather than contracting it. Generative AI is augmenting analytics workflows — SQL query drafting, data cleaning, dashboard-narration — but the analytical judgment, business problem-framing, and stakeholder communication remain human. Analytics job postings in India grew 34% in 2024-25 per Naukri JobSpeak data.", voice: false },
  { q: "Can I switch industries after a Business Analytics MBA?", a: "Yes — one of the specialization's strongest features. Business Analytics is industry-agnostic. Aspirants moving from IT services to BFSI, e-commerce to healthcare, or manufacturing to consulting is common. Our alumni tracking shows 41% switch industries within 3 years of graduation.", voice: false },
  { q: "What are education loan and EMI options for a Business Analytics MBA?", a: "For Online MBAs at Rs 2–3 lakh, most working professionals pay from monthly salary. For Executive MBAs at Rs 15–28 lakh, education loans are widely available from SBI (up to Rs 1.5 crore), HDFC Credila, ICICI, Avanse, and Auxilo. Interest rates in 2025-26 range 9.5–12.5%.", voice: false },
  { q: "How does CollegeNCourses help me choose?", a: "Our counsellors match you to programmes based on your target industry, tool comfort, career goal, budget, and Tier-1 consulting aspiration. Free 30-minute call. Shortlist three programmes from UGC-DEB approved options only. No paid referral affects our recommendation.", voice: false },
  { q: "Is Business Analytics MBA in demand in India?", a: "Yes, very much. Business Analytics is the second-fastest-growing MBA specialization in India by search volume in 2025-26. Analytics job postings grew 34% year-on-year in 2024-25 per Naukri data. Demand is broad-based across BFSI, IT services, consulting, e-commerce, and product-tech.", voice: true },
  { q: "How much does a Business Analytics MBA pay?", a: "The median starting salary after an Online MBA in Business Analytics is Rs 8.5 LPA in India in 2025-26 — the highest of any MBA specialization at entry-level. It scales to Rs 17 LPA at 3–7 years and Rs 34 LPA at 8–15 years.", voice: true },
  { q: "Which is the best MBA in Business Analytics in India?", a: "The three most-recommended MBAs for Business Analytics in 2025-26 are IIM Bangalore BAI (Executive, best for Tier-1 consulting reset), Great Lakes PGP-BABI (Executive, purely analytics-focused Tier-1 brand), and Symbiosis SCOL (Online, best value at Tier-1 university).", voice: true },
  { q: "Do employers actually value Distance and Online Business Analytics MBAs in 2025-26?", a: "Yes, especially in IT services, BFSI, e-commerce, product-tech, and mid-size consulting firms. Tier-1 analytics consulting (Fractal, Tiger, Deloitte QuantumBlack) still prefers Executive MBAs from IIM/ISB/Great Lakes. What matters more than mode is portfolio: capstone projects, Kaggle competitions, or live BI dashboards on GitHub materially strengthen candidacy.", voice: false },
];

const RELATED = [
  { href: "/resources/distance-vs-online-vs-executive-mba-guide/", label: "Distance vs Online vs Executive MBA" },
  { href: "/specializations-guide/marketing/", label: "MBA in Marketing Management" },
  { href: "/specializations-guide/digital-marketing/", label: "MBA in Digital Marketing" },
  { href: "/specializations-guide/international-business/", label: "MBA in International Business" },
  { href: "/universities/", label: "Compare UGC-DEB approved universities" },
  { href: "/contact/", label: "Free 30-min counselling call" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BusinessAnalyticsGuideClient() {
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
      <div className="ba-progress-track" aria-hidden="true">
        <div ref={progressRef} className="ba-progress-bar" />
      </div>

      <style>{`
        /* ── progress ── */
        .ba-progress-track{position:fixed;top:0;left:0;width:100%;height:3px;z-index:200;background:transparent}
        .ba-progress-bar{height:3px;width:0;background:var(--yellow);transition:width .1s linear}

        /* ── layout ── */
        .ba-wrap{max-width:1200px;margin:0 auto;padding:0 1.25rem}
        .ba-two-col{display:grid;grid-template-columns:220px 1fr;gap:2.5rem;align-items:start;padding:2rem 0 4rem}
        @media(max-width:900px){.ba-two-col{grid-template-columns:1fr}}

        /* ── breadcrumb ── */
        .ba-breadcrumb{background:var(--pale-navy);padding:.75rem 0}
        .ba-bc-inner{display:flex;flex-wrap:wrap;gap:.4rem .5rem;font-size:.8rem;color:var(--grey);list-style:none;margin:0;padding:0}
        .ba-bc-inner li::after{content:"›";margin-left:.5rem;color:var(--grey)}
        .ba-bc-inner li:last-child::after{content:""}
        .ba-bc-inner a{color:var(--navy);text-decoration:none}
        .ba-bc-inner a:hover{text-decoration:underline}

        /* ── hero ── */
        .ba-hero{background:var(--navy);color:#fff;padding:3.5rem 0 2.5rem}
        .ba-hero-eyebrow{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--yellow);font-weight:600;margin-bottom:.75rem}
        .ba-hero h1{font-family:var(--font-serif);font-size:clamp(1.7rem,3.5vw,2.6rem);line-height:1.2;color:#fff;margin:0 0 1rem}
        .ba-hero-sub{font-size:1rem;color:rgba(255,255,255,.82);max-width:720px;line-height:1.7;margin-bottom:1.25rem}
        .ba-hero-trust{font-size:.8rem;color:rgba(255,255,255,.6);margin-bottom:1.5rem}
        .ba-hero-meta{display:flex;flex-wrap:wrap;gap:.75rem;font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:1.75rem}
        .ba-hero-meta span{display:flex;align-items:center;gap:.35rem}
        .ba-hero-ctarow{display:flex;flex-wrap:wrap;gap:.75rem}
        .ba-btn-primary{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.92rem;padding:.72rem 1.4rem;border-radius:6px;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;transition:opacity .15s}
        .ba-btn-primary:hover{opacity:.88}
        .ba-btn-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.45);font-weight:600;font-size:.88rem;padding:.66rem 1.3rem;border-radius:6px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;transition:border-color .15s}
        .ba-btn-outline:hover{border-color:#fff}

        /* ── takeaways ── */
        .ba-takeaways{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.5rem;margin-bottom:2rem}
        .ba-takeaways h2{font-family:var(--font-serif);font-size:1.15rem;color:var(--navy);margin:0 0 1rem}
        .ba-tk-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem}
        .ba-tk-list li{display:flex;gap:.65rem;font-size:.9rem;color:var(--charcoal);line-height:1.55}
        .ba-tk-list li::before{content:"✓";color:var(--yellow);font-weight:700;flex-shrink:0;margin-top:.05rem}

        /* ── toc ── */
        .ba-toc-sticky{position:sticky;top:80px}
        .ba-toc-desktop{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ba-toc-desktop h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);margin:0 0 .85rem;font-weight:600}
        .ba-toc-desktop nav a{display:block;font-size:.84rem;color:var(--charcoal);text-decoration:none;padding:.3rem .6rem;border-left:3px solid transparent;border-radius:0 4px 4px 0;line-height:1.4;transition:all .15s}
        .ba-toc-desktop nav a.active,.ba-toc-desktop nav a:hover{color:var(--navy);border-left-color:var(--yellow);background:var(--pale-navy)}
        .ba-toc-cta{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--pale-navy)}
        .ba-toc-cta button{width:100%;background:var(--yellow);color:var(--navy);font-weight:700;font-size:.84rem;padding:.6rem;border-radius:6px;border:none;cursor:pointer;transition:opacity .15s}
        .ba-toc-cta button:hover{opacity:.85}
        @media(min-width:901px){.ba-toc-mobile{display:none}}
        @media(max-width:900px){.ba-toc-desktop{display:none}.ba-toc-mobile{background:var(--pale-navy);border-radius:8px;margin-bottom:1.5rem}}
        .ba-toc-mobile summary{padding:.85rem 1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .ba-toc-mobile summary::after{content:"▾"}
        .ba-toc-mobile[open] summary::after{content:"▴"}
        .ba-toc-mobile a{display:block;padding:.45rem 1rem;font-size:.85rem;color:var(--charcoal);text-decoration:none;border-bottom:1px solid rgba(0,0,0,.05)}
        .ba-toc-mobile a:hover{background:var(--mist)}

        /* ── section commons ── */
        .ba-section{padding:2.5rem 0}
        .ba-section-title{font-family:var(--font-serif);font-size:clamp(1.3rem,2.5vw,1.8rem);color:var(--navy);margin:0 0 .4rem}
        .ba-section-sub{font-size:.95rem;color:var(--grey);margin:0 0 1.5rem}
        .ba-body-text{font-size:.93rem;color:var(--charcoal);line-height:1.75;margin-bottom:1rem}

        /* ── quick facts ── */
        .ba-facts-table{width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1.5rem;overflow:hidden;border-radius:8px;border:1.5px solid var(--pale-navy)}
        .ba-facts-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy)}
        .ba-facts-table tr:last-child td{border-bottom:none}
        .ba-facts-table td:first-child{font-weight:600;color:var(--navy);background:var(--pale-navy);width:35%}

        /* ── callout ── */
        .ba-callout{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:1rem 1.25rem;font-size:.9rem;color:var(--charcoal);line-height:1.6;margin:1.25rem 0}
        .ba-callout strong{color:var(--navy)}
        .ba-callout em{font-style:italic}

        /* ── profile cards ── */
        .ba-profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ba-profile-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ba-profile-icon{font-size:2rem;margin-bottom:.6rem}
        .ba-profile-card h3{font-size:.95rem;font-weight:700;color:var(--navy);margin:0 0 .5rem}
        .ba-profile-card p{font-size:.86rem;color:var(--charcoal);line-height:1.6;margin:0}

        /* ── curriculum ── */
        .ba-curriculum-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ba-curr-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ba-curr-badge{display:inline-block;background:var(--yellow);color:var(--navy);font-size:.72rem;font-weight:700;padding:.2rem .5rem;border-radius:4px;margin-bottom:.5rem}
        .ba-curr-card h3{font-size:.92rem;font-weight:700;color:var(--navy);margin:0 0 .75rem}
        .ba-curr-card ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.4rem}
        .ba-curr-card ul li{font-size:.82rem;color:var(--charcoal);display:flex;gap:.5rem;line-height:1.45}
        .ba-curr-card ul li::before{content:"·";color:var(--grey);flex-shrink:0}

        /* ── role cards ── */
        .ba-role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-bottom:1.5rem}
        .ba-role-card{background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.25rem}
        .ba-role-icon{font-size:1.6rem;margin-bottom:.5rem}
        .ba-role-card h3{font-size:.9rem;font-weight:700;color:var(--navy);margin:0 0 .65rem;line-height:1.35}
        .ba-role-meta{display:flex;flex-direction:column;gap:.35rem}
        .ba-role-meta-row{display:flex;gap:.4rem;font-size:.8rem}
        .ba-role-meta-row span:first-child{font-weight:600;color:var(--grey);min-width:56px;flex-shrink:0}
        .ba-role-meta-row span:last-child{color:var(--charcoal);line-height:1.4}
        .ba-role-note{font-size:.76rem;color:var(--grey);font-style:italic;margin-top:.4rem;padding-top:.4rem;border-top:1px solid var(--pale-navy)}

        /* ── counsellor callout ── */
        .ba-counsel-callout{background:var(--navy);color:#fff;border-radius:10px;padding:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin:1.75rem 0}
        .ba-counsel-callout p{margin:0;font-size:.95rem;line-height:1.6;max-width:580px}
        .ba-counsel-callout strong{color:var(--yellow)}
        .ba-counsel-callout button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.88rem;padding:.65rem 1.25rem;border-radius:6px;border:none;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:opacity .15s}
        .ba-counsel-callout button:hover{opacity:.85}

        /* ── tables ── */
        .ba-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:1.5rem}
        .ba-table{width:100%;border-collapse:collapse;font-size:.86rem;min-width:480px}
        .ba-table th{background:var(--navy);color:#fff;padding:.65rem .85rem;text-align:left;font-size:.78rem;font-weight:600;white-space:nowrap}
        .ba-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal)}
        .ba-table tr:last-child td{border-bottom:none}
        .ba-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ba-table td:first-child{font-weight:600;color:var(--navy)}
        .ba-table .ba-highlight{color:#1a8a3a;font-weight:600}

        /* ── top 10 table ── */
        .ba-top10-table{width:100%;border-collapse:collapse;font-size:.81rem;min-width:780px}
        .ba-top10-table th{background:var(--navy);color:#fff;padding:.6rem .65rem;text-align:left;font-weight:600;font-size:.75rem;white-space:nowrap}
        .ba-top10-table td{padding:.6rem .65rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal);vertical-align:top}
        .ba-top10-table tr:last-child td{border-bottom:none}
        .ba-top10-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ba-rank-badge{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;font-weight:700;font-size:.78rem}
        .ba-rank-badge.gold{background:#F5C518;color:#333}
        .ba-rank-badge.silver{background:#C0C0C0;color:#333}
        .ba-rank-badge.bronze{background:#CD7F32;color:#fff}
        .ba-rank-badge.other{background:var(--pale-navy);color:var(--navy)}

        /* ── mode table ── */
        .ba-mode-table{width:100%;border-collapse:collapse;font-size:.86rem;min-width:550px;margin-bottom:1.5rem}
        .ba-mode-table th{background:var(--navy);color:#fff;padding:.65rem .85rem;text-align:left;font-size:.78rem;font-weight:600}
        .ba-mode-table td{padding:.65rem .85rem;border-bottom:1px solid var(--pale-navy);color:var(--charcoal);vertical-align:top}
        .ba-mode-table tr:last-child td{border-bottom:none}
        .ba-mode-table tr:nth-child(even) td{background:var(--pale-navy)}
        .ba-mode-table .ba-mode-best{font-weight:700;color:var(--navy)}

        /* ── not fit ── */
        .ba-notfit-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.65rem;margin-bottom:1.5rem}
        .ba-notfit-list li{display:flex;gap:.65rem;font-size:.9rem;color:var(--charcoal);line-height:1.55;background:#fff;border:1.5px solid #fce8e8;border-radius:8px;padding:.75rem 1rem}
        .ba-notfit-list li::before{content:"✗";color:#d9534f;font-weight:700;flex-shrink:0;margin-top:.05rem}

        /* ── how-to cards ── */
        .ba-howto-grid{display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem}
        .ba-howto-card{display:grid;grid-template-columns:60px 1fr;gap:1rem;background:#fff;border:1.5px solid var(--pale-navy);border-radius:10px;padding:1.1rem}
        .ba-howto-num{font-family:var(--font-serif);font-size:2rem;font-weight:700;color:var(--yellow);line-height:1;text-align:center;padding-top:.15rem}
        .ba-howto-title{font-size:.95rem;font-weight:700;color:var(--navy);margin:0 0 .1rem}
        .ba-howto-subtitle{font-size:.78rem;color:var(--grey);margin:0 0 .4rem}
        .ba-howto-body{font-size:.86rem;color:var(--charcoal);line-height:1.6;margin:0}

        /* ── lead magnet ── */
        .ba-lead-block{background:var(--pale-navy);border:1.5px solid var(--yellow);border-radius:12px;padding:2rem;margin:2rem 0;text-align:center}
        .ba-lead-block h3{font-family:var(--font-serif);font-size:1.25rem;color:var(--navy);margin:0 0 .5rem}
        .ba-lead-block p{font-size:.9rem;color:var(--charcoal);margin:0 0 1.25rem;line-height:1.6}
        .ba-lead-block button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:.95rem;padding:.8rem 1.75rem;border-radius:8px;border:none;cursor:pointer;transition:opacity .15s}
        .ba-lead-block button:hover{opacity:.88}

        /* ── faq ── */
        .ba-faq-list{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.5rem}
        .ba-faq-item{background:#fff;border:1.5px solid var(--pale-navy);border-radius:8px;overflow:hidden}
        .ba-faq-item summary{padding:.9rem 1.1rem;font-weight:600;font-size:.9rem;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:.75rem}
        .ba-faq-item summary::-webkit-details-marker{display:none}
        .ba-faq-chevron{flex-shrink:0;transition:transform .2s;color:var(--grey);font-size:.8rem}
        .ba-faq-item[open] .ba-faq-chevron{transform:rotate(180deg)}
        .ba-faq-item[open]{border-color:var(--yellow)}
        .ba-faq-body{padding:.1rem 1.1rem 1rem;font-size:.88rem;color:var(--charcoal);line-height:1.65}
        .ba-voice-badge{display:inline-block;background:#f0f8ff;border:1px solid #b3d4f0;color:#1565c0;font-size:.68rem;font-weight:600;padding:.15rem .4rem;border-radius:3px;margin-left:.5rem;vertical-align:middle;white-space:nowrap}
        .ba-faq-q-row{display:flex;align-items:center;flex:1;gap:.4rem}

        /* ── related ── */
        .ba-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-bottom:1.5rem}
        .ba-related-link{display:block;background:#fff;border:1.5px solid var(--pale-navy);border-radius:8px;padding:.9rem 1rem;font-size:.88rem;color:var(--navy);text-decoration:none;font-weight:600;transition:border-color .15s,background .15s}
        .ba-related-link:hover{border-color:var(--yellow);background:var(--pale-navy)}

        /* ── sources ── */
        .ba-sources{background:var(--pale-navy);border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;font-size:.8rem;color:var(--grey);line-height:1.7}
        .ba-sources strong{color:var(--navy);display:block;margin-bottom:.4rem}

        /* ── cta band ── */
        .ba-cta-band{background:var(--navy);color:#fff;padding:3rem 0;text-align:center}
        .ba-cta-band h2{font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,2rem);color:#fff;margin:0 0 .6rem}
        .ba-cta-band p{font-size:.95rem;color:rgba(255,255,255,.78);margin:0 0 1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
        .ba-cta-band button{background:var(--yellow);color:var(--navy);font-weight:700;font-size:1rem;padding:.85rem 2rem;border-radius:8px;border:none;cursor:pointer;transition:opacity .15s}
        .ba-cta-band button:hover{opacity:.88}
      `}</style>

      {/* Breadcrumb */}
      <nav className="ba-breadcrumb" aria-label="Breadcrumb">
        <div className="ba-wrap">
          <ol className="ba-bc-inner">
            <li><a href="/">Home</a></li>
            <li><a href="/specializations-guide/">Specializations Guide</a></li>
            <li aria-current="page">MBA in Business Analytics</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="ba-hero">
        <div className="ba-wrap">
          <div className="ba-hero-eyebrow">Specialization Guide · 2025-26 Edition</div>
          <h1>MBA in Business Analytics<br />The Honest 2025-26 Guide</h1>
          <p className="ba-hero-sub">
            Fees from Rs 1.3 lakh to Rs 28 lakh. Real salary data from 246 alumni. Top 10
            UGC-DEB approved programmes compared, mode-by-mode. No paid rankings. No sales pitch.
          </p>
          <p className="ba-hero-trust">★★★★★ 4.8/5 counselling rating · 12,000+ aspirants placed since 2019 · 150+ verified universities</p>
          <div className="ba-hero-meta">
            <span>📅 December 2025</span>
            <span>⏱ 15-min read</span>
            <span>✅ UGC-DEB approved programmes only</span>
            <span>📊 246 alumni surveyed</span>
          </div>
          <div className="ba-hero-ctarow">
            <button className="ba-btn-primary" onClick={() => setModalOpen(true)}>
              Get free counsellor recommendation →
            </button>
            <a href="#top-programmes" className="ba-btn-outline">
              Jump to top 10 programmes ↓
            </a>
          </div>
        </div>
      </header>

      {/* Two-column body */}
      <div className="ba-wrap">
        <div className="ba-two-col">

          {/* Left — Sticky ToC */}
          <aside>
            <div className="ba-toc-sticky">
              <details className="ba-toc-mobile">
                <summary>Table of Contents</summary>
                {TOC_ITEMS.map(({ id, label }) => (
                  <a key={id} href={`#${id}`}>{label}</a>
                ))}
              </details>
              <div className="ba-toc-desktop">
                <h3>Contents</h3>
                <nav>
                  {TOC_ITEMS.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} className={activeId === id ? "active" : ""}>
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="ba-toc-cta">
                  <button onClick={() => setModalOpen(true)}>Free counselling call</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — Article */}
          <main>

            {/* Key Takeaways */}
            <div className="ba-takeaways">
              <h2>Key takeaways — read this first</h2>
              <ul className="ba-tk-list">
                {TAKEAWAYS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            {/* What is it */}
            <section id="what-is-ba-mba" className="ba-section">
              <h2 className="ba-section-title">What is an MBA in Business Analytics?</h2>
              <p className="ba-section-sub">And how is it different from Data Science and Marketing MBAs?</p>

              <p className="ba-body-text">
                An MBA in Business Analytics, at postgraduate level, is the discipline of using data
                to make better business decisions across functions. Everything else — the Python
                scripts, the Tableau dashboards, the machine learning models, the regression outputs
                — sits inside the discipline of turning data patterns into actionable business
                direction.
              </p>
              <p className="ba-body-text">
                As of 2025-26, it is the highest-paying MBA specialization at entry-level in India
                and the second-fastest-growing by aspirant search volume. UGC-DEB has approved 47
                institutions to offer Online MBA programmes; Business Analytics is available at 41 of them.
              </p>

              <table className="ba-facts-table">
                <tbody>
                  {QUICK_FACTS.map((f, i) => (
                    <tr key={i}>
                      <td>{f.label}</td>
                      <td>{f.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ba-callout">
                <strong>A misconception we hear often:</strong> <em>"Business Analytics MBA means you'll code every day."</em> It does not. Modern Business Analytics roles in 2025-26 are roughly 40% analytics thinking (defining what to measure), 30% tool execution (SQL, Excel, Tableau), 20% communicating insights to stakeholders, and 10% coding. If you enjoy problem-framing and structured thinking, you will do well without being a hardcore programmer.
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits" className="ba-section">
              <h2 className="ba-section-title">Who this specialization is built for</h2>
              <p className="ba-section-sub">Three profiles that fit — and the common thread</p>

              <div className="ba-profile-grid">
                {PROFILE_CARDS.map((c, i) => (
                  <div key={i} className="ba-profile-card">
                    <div className="ba-profile-icon">{c.icon}</div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="ba-callout">
                <strong>From our counselling desk (2024-25):</strong> Business Analytics MBAs have the highest employer diversity of any specialization we track. Our 246 surveyed alumni landed at 187 distinct employers across BFSI, IT services, consulting, e-commerce, healthcare, and manufacturing. This distributional breadth makes the specialization highly recession-resilient — when one sector contracts, others are hiring.
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="ba-section">
              <h2 className="ba-section-title">What a 2025-26 Business Analytics MBA actually teaches</h2>
              <p className="ba-section-sub">Semester-wise curriculum — UGC-DEB approved structure</p>

              <div className="ba-curriculum-grid">
                {CURRICULUM.map((sem, i) => (
                  <div key={i} className="ba-curr-card">
                    <div className="ba-curr-badge">{sem.sem}</div>
                    <h3>{sem.title}</h3>
                    <ul>
                      {sem.subjects.map((s, j) => <li key={j}>{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="ba-callout">
                <strong>New in 2025-26:</strong> Generative AI for Business is now offered as an elective at IIM Bangalore, ISB, Great Lakes, Symbiosis SCOL, NMIMS, Amity, and OP Jindal. It covers LLM applications for business, prompt engineering for analytics workflows, AI-assisted data preparation, and ethical/regulatory considerations. This is the single biggest curriculum shift in Business Analytics in the last three years.
              </div>
            </section>

            {/* Career roles */}
            <section id="career-roles" className="ba-section">
              <h2 className="ba-section-title">The roles a Business Analytics MBA leads to</h2>
              <p className="ba-section-sub">Six role families — broadest cross-industry applicability of any MBA specialization</p>

              <div className="ba-role-grid">
                {ROLE_CARDS.map((r, i) => (
                  <div key={i} className="ba-role-card">
                    <div className="ba-role-icon">{r.icon}</div>
                    <h3>{r.role}</h3>
                    <div className="ba-role-meta">
                      <div className="ba-role-meta-row">
                        <span>Path</span>
                        <span>{r.path}</span>
                      </div>
                      <div className="ba-role-meta-row">
                        <span>Employers</span>
                        <span>{r.employers}</span>
                      </div>
                      <div className="ba-role-meta-row">
                        <span>Salary</span>
                        <span style={{ fontWeight: 700, color: "var(--navy)" }}>{r.salary}</span>
                      </div>
                    </div>
                    <div className="ba-role-note">{r.note}</div>
                  </div>
                ))}
              </div>

              <div className="ba-counsel-callout">
                <p>
                  <strong>Not sure which role family fits your background?</strong> Our counsellors
                  map your current experience to the most viable Business Analytics career track
                  in a free 30-minute call.
                </p>
                <button onClick={() => setModalOpen(true)}>Book free call</button>
              </div>
            </section>

            {/* Salary */}
            <section id="salary" className="ba-section">
              <h2 className="ba-section-title">What a Business Analytics MBA graduate earns in 2025-26</h2>
              <p className="ba-section-sub">Median bands by experience and mode — cross-referenced with AmbitionBox, Naukri JobSpeak, LinkedIn Salary India Q3 2025</p>

              <div className="ba-table-wrap">
                <table className="ba-table">
                  <thead>
                    <tr>
                      <th>Experience band</th>
                      <th>Distance / Online MBA</th>
                      <th>Executive MBA (Tier-1)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.band}</td>
                        <td>{r.dist}</td>
                        <td className="ba-highlight">{r.exec_t1}</td>
                        <td>{r.exec_t2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ba-callout">
                <strong>What these numbers do not tell you:</strong> Employer type dominates. An Analytics Manager at Fractal Analytics or Tiger Analytics typically earns 40–50% more than the same role at a mid-tier IT services firm. Location matters less than for other specializations — remote analytics roles are common and pay comparably to Bangalore/Mumbai. If you are comparing offers, weight employer-brand and role-scope over city.
              </div>
            </section>

            {/* Top 10 */}
            <section id="top-programmes" className="ba-section">
              <h2 className="ba-section-title">The 10 Business Analytics MBA programmes worth shortlisting in 2025-26</h2>
              <p className="ba-section-sub">UGC-DEB and AICTE approved only · Internal placement tracking from 246 alumni</p>

              <div className="ba-table-wrap">
                <table className="ba-top10-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Programme</th>
                      <th>Mode</th>
                      <th>Duration</th>
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
                          <span className={`ba-rank-badge ${r.rank === 1 ? "gold" : r.rank === 2 ? "silver" : r.rank === 3 ? "bronze" : "other"}`}>
                            {r.rank}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: "var(--navy)" }}>{r.prog}</span>
                          <br />
                          <span style={{ fontSize: ".75rem", color: "var(--grey)" }}>{r.uni}</span>
                        </td>
                        <td>{r.mode}</td>
                        <td>{r.dur}</td>
                        <td style={{ fontWeight: 600 }}>{r.fee}</td>
                        <td style={{ fontSize: ".75rem" }}>{r.approval}</td>
                        <td style={{ fontWeight: 600, color: "var(--navy)" }}>{r.placement}</td>
                        <td style={{ fontSize: ".76rem", color: "var(--grey)" }}>{r.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ba-lead-block">
                <h3>Get a personalised shortlist of 3 programmes</h3>
                <p>
                  Tell us your target industry, tool background, budget, and Tier-1 consulting aspiration.
                  We will shortlist the 3 best-fit programmes from UGC-DEB approved options — no referral fees.
                </p>
                <button onClick={() => setModalOpen(true)}>Get my shortlist →</button>
              </div>
            </section>

            {/* Mode choice */}
            <section id="mode-choice" className="ba-section">
              <h2 className="ba-section-title">Distance, Online, or Executive: which mode fits?</h2>
              <p className="ba-section-sub">The mode choice for Business Analytics is unusually consequential because of tool-fluency and cohort-quality dimensions</p>

              <div className="ba-callout">
                <strong>From our counselling records 2023-25:</strong> Business Analytics is the specialization where Executive MBA delivers the sharpest ROI premium. IIM Bangalore BAI, Great Lakes PGP-BABI, and ISB CBA alumni report Tier-1 consulting placement rates of 45–60% — orders of magnitude above what Distance/Online graduates achieve. If a Tier-1 analytics-consulting career (Fractal, Tiger Analytics, Deloitte, EY QuantumBlack, McKinsey Analytics) is the goal, the Rs 15–28 lakh Executive investment is genuinely worth it.
              </div>

              <div className="ba-table-wrap">
                <table className="ba-mode-table">
                  <thead>
                    <tr>
                      <th>Your situation</th>
                      <th>Best mode</th>
                      <th>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.situation}</td>
                        <td className="ba-mode-best">{r.best}</td>
                        <td style={{ fontSize: ".8rem", color: "var(--grey)" }}>{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Who not fit */}
            <section id="who-not-fit" className="ba-section">
              <h2 className="ba-section-title">Who should NOT pick a Business Analytics MBA</h2>
              <p className="ba-section-sub">Honest assessment — most guides will not tell you this</p>

              <ul className="ba-notfit-list">
                {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            {/* 5-step framework */}
            <section id="how-to-decide" className="ba-section">
              <h2 className="ba-section-title">How to decide if a Business Analytics MBA is right for you</h2>
              <p className="ba-section-sub">5 questions counsellors ask before shortlisting programmes</p>

              <div className="ba-howto-grid">
                {FIVE_QUESTIONS.map((q, i) => (
                  <div key={i} className="ba-howto-card">
                    <div className="ba-howto-num">{q.step}</div>
                    <div>
                      <div className="ba-howto-title">{q.title}</div>
                      <div className="ba-howto-subtitle">{q.subtitle}</div>
                      <p className="ba-howto-body">{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faq" className="ba-section">
              <h2 className="ba-section-title">Frequently asked questions</h2>
              <p className="ba-section-sub">Answers from our counselling team — Q13–Q15 optimised for voice search</p>

              <div className="ba-faq-list">
                {FAQS.map((faq, i) => (
                  <details key={i} className="ba-faq-item">
                    <summary>
                      <span className="ba-faq-q-row">
                        {faq.q}
                        {faq.voice && <span className="ba-voice-badge">🎙 Voice</span>}
                      </span>
                      <span className="ba-faq-chevron">▼</span>
                    </summary>
                    <div className="ba-faq-body">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="ba-section" style={{ paddingTop: "1rem" }}>
              <h2 className="ba-section-title">Go deeper</h2>
              <div className="ba-related-grid">
                {RELATED.map((r, i) => (
                  <a key={i} href={r.href} className="ba-related-link">
                    {r.label} →
                  </a>
                ))}
              </div>
            </section>

            {/* Sources */}
            <div className="ba-sources">
              <strong>Sources and methodology</strong>
              Programme fees, approval status, and placement data sourced from official university
              admission portals, UGC-DEB approved-institutions list (December 2025), and AICTE
              Handbook 2025-26. Salary data is based on CollegeNCourses alumni tracking (246 Business
              Analytics MBA graduates surveyed 2024-25), cross-referenced with AmbitionBox,
              Naukri.com JobSpeak Q3 2025, and LinkedIn Salary India Dataset 2025. Bands represent
              25th–75th percentile. This guide carries no paid placements — programme inclusion is
              based only on approval status and alumni outcome data.
              <br /><br />
              <strong>Reviewed by:</strong> CollegeNCourses Senior Counselling Team (Analytics &amp; Finance focus) · Last updated: December 2025
            </div>

          </main>
        </div>
      </div>

      {/* CTA Band */}
      <section className="ba-cta-band">
        <div className="ba-wrap">
          <h2>Ready to shortlist your Business Analytics MBA?</h2>
          <p>
            Talk to a CollegeNCourses counsellor. We will match you to three programmes based on
            your target industry, tool background, budget, and Tier-1 consulting aspirations.
            Free, 30 minutes.
          </p>
          <button onClick={() => setModalOpen(true)}>Get free counselling →</button>
        </div>
      </section>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source="spec-guide-business-analytics"
      />
    </>
  );
}
