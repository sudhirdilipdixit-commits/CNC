"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS = [
  { id: "takeaways", label: "Quick summary" },
  { id: "what-it-is", label: "What this MBA really is" },
  { id: "who-fits", label: "Who it fits" },
  { id: "curriculum", label: "Curriculum 2025-26" },
  { id: "careers", label: "Career paths" },
  { id: "salary", label: "Salary data 2025-26" },
  { id: "top10", label: "Top 10 programmes" },
  { id: "fees", label: "Fee structure" },
  { id: "mode", label: "Distance vs Online vs Executive" },
  { id: "not-fit", label: "Who it does NOT fit" },
  { id: "five-questions", label: "5 questions to ask" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "Related resources" },
  { id: "authors", label: "About the authors" },
];

const TAKEAWAYS = [
  { label: "Fastest-growing MBA specialization in 2025-26", text: "Digital Marketing overtook Finance in aspirant search volume in Q3 2024 and continues to lead." },
  { label: "Fees", text: "₹1.2 lakh (ICFAI Distance) to ₹18 lakh (Executive at IIM Kozhikode Digital Track). Mainstream Online MBA median sits at ₹1.9 lakh." },
  { label: "Median salaries (2025-26)", text: "₹7 LPA for freshers, ₹15 LPA at 3–7 years, ₹32 LPA at 8–15 years. D2C, fintech, and SaaS pay 30–45% above traditional sectors." },
  { label: "Best-fit profile", text: "Existing digital marketers, content creators wanting a management title, engineers switching into growth roles, and D2C founders needing structured growth depth." },
  { label: "Poor-fit signal", text: "If you prefer offline brand strategy or dislike data-driven work, choose Marketing Management instead." },
  { label: "Top pick by mode (2025-26)", text: "Symbiosis Online, NMIMS Distance, IIM Kozhikode Executive (Digital track)." },
];

const QUICK_FACTS = [
  { label: "Duration", value: "12–24 months" },
  { label: "Fee range", value: "₹1.2 L – ₹18 L" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+ where applicable" },
  { label: "Median entry salary (2025-26)", value: "₹7 LPA" },
  { label: "Median mid-career salary", value: "₹15 LPA" },
  { label: "Top employers", value: "Amazon, Flipkart, Nykaa, Meta, Google, Zomato, CRED, Groww, boAt" },
  { label: "Fits best if", value: "Digital / performance / content professional wanting a promotion or growth role" },
];

const PROFILE_CARDS = [
  {
    letter: "A",
    title: "The existing digital professional shifting up",
    body: `Two to eight years in performance marketing, SEO, content, social media, or email marketing. Currently a Digital Marketing Executive or Specialist. Wanting a promotion to Manager, Growth Manager, or Head of Growth but blocked by the "MBA required" clause. Distance or Online MBA fits. Job continues, credentialing runs alongside, promotion follows within 18–24 months.`,
  },
  {
    letter: "B",
    title: "The content or social creator moving into strategy",
    body: "Content creators, community managers, influencer strategists, or freelancers wanting to move into structured growth roles. Often triggered by wanting predictability, benefits, or a management title. Online MBA is the natural fit — provides the business vocabulary and framework the aspirant lacks while their creative skills already carry weight.",
  },
  {
    letter: "C",
    title: "The engineer or CA switching into D2C/tech growth",
    body: "Backend engineer, CA, or non-marketing professional wanting to move into growth or product marketing. Often triggered by watching D2C brands scale and realising growth is where the equity is. Online MBA (or Executive for a cleaner reset) is preferred. Aspirants with strong quantitative backgrounds do particularly well.",
  },
];

const CURRICULUM = [
  {
    sem: "Semester 1",
    title: "Foundations",
    body: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management (core), Organisational Behaviour. This is where you build the vocabulary of business.",
  },
  {
    sem: "Semester 2",
    title: "Digital foundations",
    body: "Digital Marketing Fundamentals, Consumer Behaviour, Content Marketing, Search Engine Optimization (SEO), Social Media Marketing, Business Communication.",
  },
  {
    sem: "Semester 3",
    title: "Performance & analytics",
    body: "Paid Advertising (Google Ads, Meta, LinkedIn), Marketing Analytics with GA4, Marketing Automation & CRM, E-commerce Marketing, Growth Hacking, Attribution & Measurement.",
  },
  {
    sem: "Semester 4",
    title: "2025-26 additions & capstone",
    body: "AI-Powered Marketing (new elective), Retail Media & CTV Advertising, Personalization at Scale, Sustainability & Purpose-Led Marketing, capstone project.",
  },
];

const ROLE_CARDS = [
  {
    num: "1",
    title: "Performance / Paid Media Marketing",
    body: "Running paid advertising across Google, Meta, LinkedIn. Roles: PPC Specialist → Performance Marketing Manager → Head of Paid → Marketing Director. Employers: D2C brands, ed-tech, fintech, SaaS. Data-heavy, ROI-accountable role. Fastest career acceleration path for analytical aspirants.",
  },
  {
    num: "2",
    title: "SEO & Content Marketing",
    body: "Organic growth through content strategy, SEO, editorial calendars. Roles: SEO Specialist → SEO Manager → Head of Content → CMO. Employers: SaaS, e-commerce, publishing, ed-tech. Slower to compound but very defensible long-term career.",
  },
  {
    num: "3",
    title: "Growth Marketing",
    body: "Cross-channel, experiment-driven revenue growth. Roles: Growth Analyst → Growth Manager → Head of Growth → VP Growth. Employers: D2C (Nykaa, Mamaearth, boAt), fintech (CRED, Groww, Zerodha), consumer tech (Zomato, Swiggy). Highest-paid path in 2025-26 for the right profile.",
  },
  {
    num: "4",
    title: "Marketing Automation & CRM",
    body: "Owning the marketing tech stack, email programmes, lifecycle marketing. Roles: Marketing Automation Specialist → CRM Manager → Head of Marketing Ops → CMO. Employers: SaaS, financial services, B2B tech. Strong long-term earning potential.",
  },
  {
    num: "5",
    title: "Social Media & Community Marketing",
    body: "Brand-led social presence, community building, influencer marketing. Roles: Social Media Manager → Community Head → Head of Brand Social → CMO. Employers: consumer brands, D2C, tech, entertainment. Strong fit for creator-background aspirants.",
  },
  {
    num: "6",
    title: "Digital Analytics & Insights",
    body: "Analytics dedicated to marketing effectiveness. Roles: Marketing Analyst → Marketing Analytics Manager → Head of MarTech / Analytics → CDO. Employers: MNCs, agencies, D2C, tech. Strong crossover with Business Analytics.",
  },
];

const SALARY_ROWS = [
  ["Fresh graduate, 0–2 years", "₹5–9 LPA", "₹9–15 LPA", "₹6.5–11 LPA"],
  ["Mid-level, 3–7 years", "₹10–18 LPA", "₹20–34 LPA", "₹13–22 LPA"],
  ["Senior, 8–15 years", "₹20–38 LPA", "₹38–65 LPA", "₹24–44 LPA"],
  ["Leadership, 15+ years", "₹38–65 LPA", "₹65 LPA – ₹1.3 Cr", "₹42–78 LPA"],
  ["Head of Growth (top 5%)", "₹55 LPA+", "₹1.2 Cr+", "₹65 LPA+"],
];

const TOP10_ROWS = [
  { rank: 1, programme: "Online MBA Digital Marketing", uni: "Symbiosis Centre for Online Learning (SCOL)", mode: "Online", duration: "24 mo", fee: "₹2.6 L", approval: "UGC-DEB, AICTE", placement: "~76%", strength: "Live faculty, strong alumni in D2C" },
  { rank: 2, programme: "Distance MBA Digital Marketing", uni: "NMIMS Global Access (CDOE)", mode: "Distance", duration: "24 mo", fee: "₹1.85 L", approval: "UGC-DEB", placement: "~62%", strength: "Industry-tied projects" },
  { rank: 3, programme: "Executive MBA Digital Marketing", uni: "IIM Kozhikode (EPGP - Digital Track)", mode: "Executive", duration: "24 mo", fee: "₹15 L", approval: "AICTE, IIM Act", placement: "~94%", strength: "IIM tag + digital specialization" },
  { rank: 4, programme: "Online MBA Digital Marketing", uni: "Manipal Academy (MAHE)", mode: "Online", duration: "24 mo", fee: "₹1.7 L", approval: "UGC-DEB, NAAC A+", placement: "~54%", strength: "Best value Tier-1" },
  { rank: 5, programme: "Online MBA Digital Marketing", uni: "Amity University Online", mode: "Online", duration: "24 mo", fee: "₹1.99 L", approval: "UGC-DEB", placement: "~56%", strength: "Widest digital electives" },
  { rank: 6, programme: "Online MBA Digital Marketing Global", uni: "OP Jindal Global (JGBS)", mode: "Online", duration: "24 mo", fee: "₹3.75 L", approval: "UGC-DEB, AACSB", placement: "~72%", strength: "International accreditation" },
  { rank: 7, programme: "Distance MBA Digital Marketing", uni: "ICFAI University Distance", mode: "Distance", duration: "24 mo", fee: "₹1.2 L", approval: "UGC-DEB", placement: "Limited", strength: "Lowest UGC-DEB cost" },
  { rank: 8, programme: "Online MBA Digital Marketing", uni: "Jain (Deemed-to-be-Univ) Online", mode: "Online", duration: "24 mo", fee: "₹1.55 L", approval: "UGC-DEB, NAAC A++", placement: "~58%", strength: "Value + accreditation" },
  { rank: 9, programme: "Online MBA Digital Marketing", uni: "Chandigarh University Online", mode: "Online", duration: "24 mo", fee: "₹1.45 L", approval: "UGC-DEB, NAAC A+", placement: "~53%", strength: "Strong newer entrant" },
  { rank: 10, programme: "Online MBA Digital Marketing", uni: "NIIT University Online", mode: "Online", duration: "24 mo", fee: "₹1.9 L", approval: "UGC-DEB", placement: "~55%", strength: "Strong industry connect through NIIT ecosystem" },
];

const MODE_ROWS = [
  { cond: "Working full-time in digital marketing, want promotion", mode: "Online MBA", why: "Live faculty walk-throughs on tools + cohort discussions on campaigns are material for this specialization" },
  { cond: "Content creator or freelancer moving into structured role", mode: "Online MBA", why: "Structured business vocabulary + tool certifications set you up cleanly" },
  { cond: "Engineer or CA switching into D2C/tech growth", mode: "Online MBA (preferred) or Executive", why: "Online for gradual transition; Executive for aggressive career reset" },
  { cond: "Between roles, need Tier-1 brand for D2C/consulting", mode: "Executive MBA (IIM Kozhikode, MICA, Great Lakes)", why: "Brand + placement cell essential for the reset moment" },
  { cond: "Founder or D2C brand builder", mode: "Online MBA", why: "Curriculum access matters more than credential; Online delivers both" },
  { cond: "Budget under ₹1.5 L", mode: "Distance MBA", why: "Only when Online is genuinely unaffordable; accept lower placement outcomes" },
];

const NOT_FIT = [
  "You dislike data, dashboards, and attribution reports. Digital Marketing is fundamentally analytical. If GA4, Excel, and ROI reports feel boring, you'll be miserable.",
  "You prefer offline brand strategy and long-form brand building. Marketing Management is the right specialization.",
  "You want a purely quantitative / data science career. Business Analytics is the right fit.",
  "You want to become a CFO or work in equity research. Finance or Banking & Financial Services is the right path.",
  "You resist experimentation and prefer settled processes. Modern digital marketing is test-and-iterate. If you dislike being wrong 60% of the time in experiments, you'll struggle.",
  "You're choosing Digital Marketing because it sounds trendy. It is trendy — and demanding. Pick because the work interests you, not the label.",
];

const FIVE_QUESTIONS = [
  {
    step: 1,
    title: "Name your target growth channel or role",
    body: "Performance marketing? SEO/content? Growth marketing at a startup? Marketing automation? Analytics? The programme choice, and even the elective mix, changes based on the answer. Vague targets mean vague outcomes.",
  },
  {
    step: 2,
    title: "Confirm your employer type — brand-side, D2C, agency, or tech",
    body: "Salary and career progression differ 30–50% across these segments. D2C and tech pay premium; agencies pay steady; traditional brands pay conservative. Know which one you're targeting.",
  },
  {
    step: 3,
    title: "Check whether you have tool-fluency starter skills",
    body: "Google Ads, Meta Ads Manager, GA4, SEMrush, HubSpot. You'll be evaluated on these in interviews. If you have zero exposure, plan for 3–6 months of parallel self-learning during the MBA.",
  },
  {
    step: 4,
    title: "Audit whether you can commit to continuous experimentation",
    body: "Distance and Online Digital Marketing MBAs have 32–38% dropout rate — slightly higher than the specialization average. The workload includes running actual campaigns in some programmes (Symbiosis, OP Jindal), which is time-heavy.",
  },
  {
    step: 5,
    title: "Set your hard financial ceiling",
    body: "Digital Marketing MBA fees run ₹1.2 L to ₹18 L. Most working professionals fit ₹1.7 L to ₹3 L Online. Stretching to Executive without a specific Tier-1 growth-role reset in view is a common financial regret pattern.",
  },
];

const FAQS = [
  { q: "Is an Online MBA in Digital Marketing valid in India?", a: "Yes. As of 2025-26, an Online MBA in Digital Marketing from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list." },
  { q: "Which is better for Digital Marketing — this specialization or Marketing Management?", a: "For growth roles at D2C, fintech, SaaS, or consumer tech companies, Digital Marketing is the better fit. For brand management at FMCG, ITC-style employers, or offline-heavy consumer brands, Marketing Management is the better fit. The two overlap 40–50% in core curriculum but diverge sharply in electives and career trajectories." },
  { q: "How much does a Digital Marketing MBA cost in India in 2025-26?", a: "Fees range from ₹1.2 lakh (ICFAI Distance) to ₹18 lakh (IIM Executive tracks). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.55 lakh and ₹2.6 lakh total for a 24-month programme." },
  { q: "What is the salary after an Online MBA in Digital Marketing?", a: "Median 2025-26 salary for Online MBA graduates in Digital Marketing sits at ₹7 LPA for freshers, ₹15 LPA for mid-level (3–7 years), and ₹32 LPA for senior roles (8–15 years). Salaries at D2C, fintech, and SaaS employers run 30–45% above this median." },
  { q: "Do I need to know Google Ads and SEO before starting the MBA?", a: "Not required, but strongly helpful. Aspirants who enter with basic Google Ads and GA4 familiarity have a 30–40% faster career acceleration in the first 12 months post-MBA. If you don't, Google's free Skillshop and Meta Blueprint certifications during Semester 1 will get you baseline-competent." },
  { q: "What is the difference between a Digital Marketing MBA and a diploma in Digital Marketing?", a: "An MBA is a full postgraduate degree with a management foundation (finance, ops, HR, strategy) plus the Digital Marketing specialization. A diploma is a short-format certification (3–12 months) focused only on execution skills. For a management role, you need the MBA." },
  { q: "Can I do a Digital Marketing MBA without a marketing background?", a: "Yes. Roughly 55% of Digital Marketing MBA enrolments at Symbiosis and NMIMS in 2024-25 came from non-marketing backgrounds — typically IT, engineering, and content creation. The MBA teaches Digital Marketing from first principles." },
  { q: "Which universities have the best placement records for Digital Marketing MBAs?", a: "Based on our internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Kozhikode Executive Digital Track (~94%), Symbiosis Online (~76%), and OP Jindal Global (~72%). ICFAI and Amity had strong volume placements but lower average packages." },
  { q: "How is AI affecting Digital Marketing careers in India?", a: "Substantially. Since late 2024, generative AI tools (ChatGPT, Jasper, Copy.ai, Midjourney) restructured content, ad copy, and creative production roles. Junior copywriting and static-content roles are contracting; strategic, analytical, and cross-channel roles are growing. Digital Marketing MBAs joining in 2025-27 will be evaluated on AI-tool fluency in interviews." },
  { q: "Can I switch to a growth marketing role at a D2C brand after this MBA?", a: "Yes — this is one of the most common outcomes. Aspirants with 2–5 years' prior digital or content experience who take a UGC-DEB approved Online MBA report ~65% transition rate to D2C/fintech growth roles within 18 months of graduation, based on our 2024-25 tracking." },
  { q: "What tools and platforms will I learn during the MBA?", a: "Standard 2025-26 curriculum covers Google Ads, Meta Ads Manager, LinkedIn Ads, GA4, Google Tag Manager, SEMrush or Ahrefs, HubSpot or Salesforce, Mailchimp, and basics of SQL and Excel. Executive tracks add Mixpanel or Amplitude, marketing mix modelling tools, and paid AI platforms." },
  { q: "How does CollegeNCourses help me choose a Digital Marketing MBA?", a: "Our counsellors match you to programmes based on your target growth channel, employer type (D2C vs agency vs brand), budget, and timeline. We shortlist three programmes from UGC-DEB approved options only. Free 30-minute call. No paid rankings." },
  { q: "Is Digital Marketing MBA in demand in India?", a: "Yes, very. Digital Marketing became the highest-search-volume MBA specialization in India in Q3 2024 and continues to lead. D2C brand growth, fintech expansion, and SaaS scaling are driving demand for growth marketing and performance marketing talent, especially at 3–8 years' experience.", voice: true },
  { q: "How much does a Digital Marketing MBA pay?", a: "The median starting salary after an Online MBA in Digital Marketing is roughly ₹7 lakh per annum in India in 2025-26, scaling to ₹15 LPA at 3–7 years and ₹32 LPA at 8–15 years. Growth Marketing roles at D2C or fintech companies can push these numbers 30–45% higher.", voice: true },
  { q: "Which is the best online MBA for Digital Marketing?", a: "The three most-recommended Online MBAs for Digital Marketing in 2025-26 are Symbiosis Centre for Online Learning (highest placement conversion), NMIMS Global Access (strongest industry-tied projects), and Manipal Academy (best value in Tier-1 category).", voice: true },
  { q: "Do employers actually value Digital Marketing MBAs from Distance or Online mode in 2025-26?", a: "Yes, especially in the D2C, fintech, SaaS, ed-tech, and consumer-tech sectors — which are where most Digital Marketing hiring happens. Traditional agencies and legacy brands are more cautious but still hire. What matters more than mode is your portfolio of live campaigns and measurable outcomes." },
];

const RELATED = [
  { title: "Distance MBA vs Online MBA vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "MBA in Marketing Management: The Honest Guide", href: "/specializations-guide/marketing/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
];

export default function DigitalMarketingGuideClient() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.width = docH > 0 ? `${(window.scrollY / docH) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionEls = TOC_ITEMS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        .dg-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}

        /* Breadcrumb */
        .dg-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .dg-breadcrumb a{color:var(--grey)}.dg-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .dg-breadcrumb .sep{color:var(--pale-navy)}.dg-breadcrumb .cur{color:var(--navy);font-weight:500}

        /* Hero */
        .dg-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .dg-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .dg-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .dg-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .dg-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .dg-trust .stars{color:var(--yellow);letter-spacing:1px}.dg-trust .dot{color:var(--pale-navy)}
        .dg-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .dg-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center}
        .dg-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .dg-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .dg-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .dg-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .dg-caption{font-size:12px;color:var(--grey);font-style:italic}

        /* Layout */
        .dg-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.dg-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}

        /* ToC Sidebar */
        .dg-toc-sidebar{display:none}
        @media(min-width:1024px){
          .dg-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .dg-toc-sidebar h4{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .dg-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .dg-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s}
          .dg-toc-sidebar a:hover{color:var(--navy)}
          .dg-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }

        /* Mobile ToC */
        .dg-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .dg-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .dg-toc-mobile summary::-webkit-details-marker{display:none}
        .dg-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .dg-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .dg-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .dg-toc-mobile li{padding:6px 0}
        .dg-toc-mobile a{color:var(--charcoal);font-size:14px}
        .dg-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.dg-toc-mobile{display:none}}

        /* Article body */
        .dg-body{max-width:860px}
        .dg-body section{scroll-margin-top:90px}
        .dg-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .dg-body h2:first-child{margin-top:0}
        .dg-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .dg-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .dg-body p:last-child{margin-bottom:0}
        .dg-body a{color:var(--navy);border-bottom:1px solid var(--yellow)}
        .dg-body a:hover{background:var(--yellow)}
        .dg-body strong{color:var(--navy);font-weight:700}

        /* Freshness signal */
        .dg-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .dg-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%}

        /* Key takeaways */
        .dg-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .dg-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .dg-takeaways ul{list-style:none;margin:0}
        .dg-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .dg-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .dg-takeaways li:last-child{margin-bottom:0}

        /* Quick facts card */
        .dg-facts{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .dg-facts table{width:100%;border-collapse:collapse;font-size:14px}
        .dg-facts td{padding:10px 0;border-bottom:1px solid var(--mist);vertical-align:top}
        .dg-facts td:first-child{color:var(--grey);font-weight:600;width:45%;padding-right:12px}
        .dg-facts td:last-child{color:var(--navy);font-weight:700}
        .dg-facts tr:last-child td{border-bottom:none}

        /* Callout */
        .dg-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .dg-callout-label{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .dg-callout-navy{background:var(--pale-navy)}

        /* Profile cards */
        .dg-profile-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:768px){.dg-profile-grid{grid-template-columns:repeat(3,1fr)}}
        .dg-profile-card{background:var(--white);border:1px solid var(--mist);border-top:4px solid var(--yellow);border-radius:8px;padding:24px}
        .dg-profile-letter{width:40px;height:40px;background:var(--navy);color:var(--yellow);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:20px;font-weight:700;margin-bottom:12px}
        .dg-profile-card h3{font-family:var(--font-serif);color:var(--navy);font-size:18px;margin-bottom:10px;line-height:1.3}
        .dg-profile-card p{font-size:14px;line-height:1.65;color:var(--charcoal);margin:0}

        /* Curriculum */
        .dg-curriculum{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:768px){.dg-curriculum{grid-template-columns:repeat(2,1fr)}}
        .dg-sem-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px}
        .dg-sem-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .dg-sem-card h3{font-family:var(--font-serif);color:var(--navy);font-size:18px;margin-bottom:10px;line-height:1.3}
        .dg-sem-card p{font-size:14px;line-height:1.65;color:var(--charcoal);margin:0}

        /* Role cards */
        .dg-roles-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:768px){.dg-roles-grid{grid-template-columns:repeat(2,1fr)}}
        .dg-role-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;display:flex;gap:16px;align-items:flex-start}
        .dg-role-num{flex:0 0 36px;width:36px;height:36px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:18px;font-weight:700}
        .dg-role-body h3{font-family:var(--font-serif);color:var(--navy);font-size:17px;margin-bottom:8px;line-height:1.3}
        .dg-role-body p{font-size:14px;line-height:1.6;color:var(--charcoal);margin:0}

        /* Data tables */
        .dg-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .dg-table{width:100%;border-collapse:collapse;font-size:14px;min-width:640px}
        .dg-table thead{background:var(--navy);color:var(--yellow)}
        .dg-table th{text-align:left;padding:14px 16px;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle}
        .dg-table td{padding:12px 16px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.5}
        .dg-table tbody tr:hover{background:var(--ivory)}
        .dg-table .fee{color:var(--navy);font-weight:700}
        .dg-table caption{caption-side:bottom;text-align:left;padding:12px 16px;font-size:12px;color:var(--grey);font-style:italic;line-height:1.5}
        .dg-table td strong{color:var(--navy)}
        .dg-rank{background:var(--navy);color:var(--yellow);font-weight:800;font-size:13px;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}

        /* Not fit */
        .dg-not-fit{background:var(--white);border:1px solid var(--mist);border-top:3px solid #C04B4B;border-radius:8px;padding:24px;margin:24px 0}
        .dg-not-fit ul{list-style:none;margin:0;padding:0}
        .dg-not-fit li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .dg-not-fit li::before{content:'×';position:absolute;left:0;top:-2px;color:#C04B4B;font-weight:800;font-size:18px}
        .dg-not-fit li:last-child{margin-bottom:0}

        /* Steps */
        .dg-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .dg-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .dg-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .dg-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:8px;line-height:1.25}
        .dg-step-body p{font-size:15px;line-height:1.65;margin:0}

        /* FAQ */
        .dg-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .dg-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .dg-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .dg-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .dg-faq-q::-webkit-details-marker{display:none}
        .dg-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .dg-faq-item[open] .dg-faq-icon{transform:rotate(45deg)}
        .dg-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .dg-voice-badge{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}

        /* Related resources */
        .dg-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.dg-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.dg-related-grid{grid-template-columns:repeat(3,1fr)}}
        .dg-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal)}
        .dg-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .dg-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:16px}
        .dg-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}

        /* Authors */
        .dg-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .dg-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .dg-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .dg-author-row:last-child{border-bottom:none}
        .dg-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .dg-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .dg-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}
        .dg-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px;line-height:1.7}
        .dg-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .dg-sources ul{list-style:none;margin:0 0 12px !important;padding:0}
        .dg-sources li{padding:4px 0;color:var(--charcoal)}

        /* CTA band */
        .dg-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .dg-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .dg-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .dg-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .dg-btn-navy{background:var(--navy);color:var(--yellow)}
        .dg-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px}
      `}</style>

      {/* Reading progress */}
      <div ref={progressRef} className="dg-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="dg-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="sep">›</span>
          <a href="/specializations-guide">Specializations Guide</a>
          <span className="sep">›</span>
          <span className="cur">MBA in Digital Marketing</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="dg-hero">
        <div className="container">
          <span className="dg-eyebrow">Specialization Guide • 2025-26 Edition</span>
          <h1>MBA in Digital Marketing: the honest 2025-26 guide to Distance, Online &amp; Executive modes</h1>
          <p className="dg-subtitle">
            Fees from ₹1.2 lakh to ₹18 lakh. Real salary data from 289 alumni across performance marketing, SEO, growth, and analytics roles. Top 10 UGC-DEB approved programmes compared, mode-by-mode. No paid rankings.
          </p>
          <div className="dg-trust">
            <span><span className="stars">★★★★★</span> 4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed since 2019</span>
            <span className="dot">•</span>
            <span>150+ verified universities</span>
          </div>
          <div className="dg-cta-row">
            <button className="dg-btn dg-btn-primary" onClick={() => setModalOpen(true)}>
              Get a free counsellor recommendation →
            </button>
            <a href="#top10" className="dg-btn dg-btn-outline">Jump to top 10 programmes ↓</a>
          </div>
          <p className="dg-caption">Last verified: 15 December 2025 against the UGC-DEB current approved-institutions list.</p>
        </div>
      </section>

      {/* Main layout */}
      <div className="container">
        <div className="dg-layout">

          {/* ToC Sidebar */}
          <aside className="dg-toc-sidebar" aria-label="On this page">
            <h4>On this page</h4>
            <ol>
              {TOC_ITEMS.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={activeId === t.id ? "active" : ""}>{t.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Article body */}
          <article className="dg-body">

            {/* Mobile ToC */}
            <details className="dg-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
                ))}
              </ol>
            </details>

            {/* SECTION 2 — Key Takeaways */}
            <section id="takeaways" className="dg-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i}><strong>{t.label}:</strong> {t.text}</li>
                ))}
              </ul>
            </section>

            {/* SECTION 3 — At-a-glance snapshot */}
            <section id="snapshot">
              <h2>Digital Marketing MBA, in 90 seconds</h2>
              <p>An MBA in Digital Marketing trains you to run growth engines across paid media, SEO, content, email, and marketing automation. As of 2025-26, it&apos;s the fastest-growing MBA specialization in India by search volume, offered at all 47 UGC-DEB approved Online MBA institutions. Curriculum includes AI-powered marketing, marketing automation, and analytics.</p>
              <div className="dg-facts">
                <table>
                  <tbody>
                    {QUICK_FACTS.map((f, i) => (
                      <tr key={i}>
                        <td>{f.label}</td>
                        <td>{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4 — What it actually is */}
            <section id="what-it-is">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p><strong>An MBA in Digital Marketing, at postgraduate level, is the discipline of driving measurable revenue growth through digital channels</strong> — paid media, SEO, content, email, social, and automation. Everything else — the case studies, the funnel frameworks, the attribution models — sits inside the discipline of turning digital attention into paying customers.</p>
              <p>What makes it different from a Marketing Management MBA is scope and depth. Marketing Management covers the full function including offline brand strategy, product management, and distribution. Digital Marketing goes deeper on performance channels but lighter on offline brand work. If you want to run brand strategy for HUL or ITC, choose <a href="/specializations-guide/marketing/">Marketing Management</a>. If you want to run growth for Nykaa, boAt, or a fintech, choose Digital Marketing.</p>
              <div className="dg-callout">
                <span className="dg-callout-label">A misconception we hear often</span>
                &quot;Digital Marketing MBA is just about running Instagram and Google Ads.&quot; It isn&apos;t. Modern digital marketing in 2025-26 is roughly 45% analytics and attribution, 25% strategy and funnel design, 20% creative and content, and 10% platform-specific execution. If you enjoy data patterns, growth experiments, and business writing, you&apos;ll do well.
              </div>
            </section>

            {/* SECTION 5 — Who it fits */}
            <section id="who-fits">
              <h2>Who this specialization is built for</h2>
              <p>Digital Marketing MBAs work best for three broad profiles.</p>
              <div className="dg-profile-grid">
                {PROFILE_CARDS.map((card, i) => (
                  <div className="dg-profile-card" key={i}>
                    <div className="dg-profile-letter">{card.letter}</div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6 — Curriculum */}
            <section id="curriculum">
              <h2>What a 2025-26 Digital Marketing MBA actually teaches</h2>
              <p>A 2025-26 Digital Marketing MBA covers foundations of management, then goes deep on digital channels: paid advertising (Google, Meta, LinkedIn), SEO and content marketing, marketing automation and CRM (HubSpot, Salesforce), analytics (GA4, Mixpanel, Amplitude), email marketing, growth hacking, e-commerce, and AI-powered marketing (new 2025 elective at most universities).</p>
              <div className="dg-curriculum">
                {CURRICULUM.map((sem, i) => (
                  <div className="dg-sem-card" key={i}>
                    <div className="dg-sem-label">{sem.sem}</div>
                    <h3>{sem.title}</h3>
                    <p>{sem.body}</p>
                  </div>
                ))}
              </div>
              <div className="dg-callout">
                <span className="dg-callout-label">New in 2025-26</span>
                AI-Powered Marketing is now offered as an elective at Symbiosis SCOL, NMIMS, Amity, Manipal, Jain, and OP Jindal. It covers generative AI for ad copy and creatives, AI-driven customer segmentation, chatbot design, predictive analytics for churn, and the ethics of AI-generated content. If a programme&apos;s syllabus doesn&apos;t include this, it&apos;s behind the market.
              </div>
            </section>

            {/* SECTION 7 — Career paths */}
            <section id="careers">
              <h2>The roles a Digital Marketing MBA leads to</h2>
              <p>Digital Marketing opens six distinct role families, each with its own progression path.</p>
              <div className="dg-callout dg-callout-navy">
                <span className="dg-callout-label">Counsellor observation</span>
                The Digital Marketing MBA role with the highest 3-year salary acceleration is Growth Marketing at Series B–C startups. Alumni in this path reported average salary progression from ₹10 LPA to ₹28 LPA over 36 months, versus ₹10 LPA to ₹17 LPA in traditional marketing tracks. The trade-off is startup risk. — CollegeNCourses Senior Counsellor Desk
              </div>
              <div className="dg-roles-grid">
                {ROLE_CARDS.map((r, i) => (
                  <div className="dg-role-card" key={i}>
                    <div className="dg-role-num">{r.num}</div>
                    <div className="dg-role-body">
                      <h3>{r.title}</h3>
                      <p>{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8 — Salary */}
            <section id="salary">
              <span className="dg-freshness">Last verified · AmbitionBox, Naukri JobSpeak, LinkedIn Salary India Q3 2025</span>
              <h2>What a Digital Marketing MBA graduate earns in 2025-26</h2>
              <p>Median 2025-26 salary for Online MBA graduates in Digital Marketing sits at <strong>₹7 lakh per annum for freshers (0–2 years&apos; experience), ₹15 lakh for mid-level (3–7 years), and ₹32 lakh for senior roles (8–15 years).</strong> Executive MBA graduates from Tier-1 institutes command roughly 2–3x these bands. D2C, fintech, and SaaS pay 30–45% above traditional sectors.</p>
              <div className="dg-table-wrap">
                <table className="dg-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance/Online MBA</th>
                      <th>Executive MBA (Tier-1)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td className="fee">{row[1]}</td>
                        <td className="fee">{row[2]}</td>
                        <td className="fee">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India Dataset 2025. Bands represent 25th–75th percentile.</caption>
                </table>
              </div>
              <div className="dg-callout">
                <span className="dg-callout-label">What these numbers do not tell you</span>
                Employer type matters more than location. A Growth Manager at CRED in Bangalore earns nearly double the same role at a Delhi ed-tech. Company stage matters too: growth roles at Series B–C startups often carry ESOPs that materially change 5-year comp. If you are choosing purely on salary at signing, factor in stock, RSUs, and performance-linked bonuses.
              </div>
            </section>

            {/* SECTION 9 — Top 10 programmes */}
            <section id="top10">
              <span className="dg-freshness">Last verified · UGC-DEB approved-institutions list and AICTE Handbook 2025-26</span>
              <h2>The 10 Digital Marketing MBA programmes worth shortlisting in 2025-26</h2>
              <p>Our current top-10 across Distance, Online, and Executive modes. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, internal placement tracking from 289 Digital Marketing alumni surveyed 2024-25, and CollegeNCourses counsellor feedback. Refreshed every six months.</p>
              <div className="dg-table-wrap">
                <table className="dg-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>University</th>
                      <th>Mode</th>
                      <th>Fee</th>
                      <th>Approval</th>
                      <th>Placement</th>
                      <th>Key strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP10_ROWS.map((r) => (
                      <tr key={r.rank}>
                        <td><span className="dg-rank">{r.rank}</span></td>
                        <td><strong>{r.uni}</strong><br /><span style={{ fontSize: 12, color: "var(--grey)" }}>{r.programme}</span></td>
                        <td>{r.mode}</td>
                        <td className="fee">{r.fee}</td>
                        <td style={{ fontSize: 12 }}>{r.approval}</td>
                        <td>{r.placement}</td>
                        <td style={{ fontSize: 13 }}>{r.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>As of 2025-26. Fees are total programme cost. Placement support ratings from CollegeNCourses internal alumni tracking of Digital Marketing graduates seeking a role within six months of programme completion.</caption>
                </table>
              </div>
              <div className="dg-callout">
                Confused about which one fits your profile? Our counsellors shortlist three programmes matched to your role, budget, and timeline in a free 30-minute call.{" "}
                <button style={{ background: "none", border: "none", color: "var(--navy)", fontWeight: 700, cursor: "pointer", padding: 0, textDecoration: "underline" }} onClick={() => setModalOpen(true)}>
                  Book a free counselling call →
                </button>
              </div>
            </section>

            {/* SECTION 10 — Fee structure */}
            <section id="fees">
              <h2>What you will actually pay across the three modes</h2>
              <p>Fees for a Digital Marketing MBA span from ₹1.2 lakh (ICFAI Distance) to ₹15–18 lakh at Executive tracks. Because Digital Marketing is a newer specialization, fee premiums vary substantially between universities based on specialization depth and tool-access included (HubSpot Academy certifications, SEMrush access, GA4 course credits).</p>
              <div className="dg-table-wrap">
                <table className="dg-table">
                  <thead>
                    <tr><th>Mode</th><th>Fee range</th><th>What's included</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Distance MBA</strong></td>
                      <td className="fee">₹1.2 L – ₹2 L</td>
                      <td>Lowest cost. Best for aspirants who can self-learn tools (Google Ads, Meta Ads, GA4) through free platform certifications alongside the coursework. Placement support is minimal.</td>
                    </tr>
                    <tr>
                      <td><strong>Online MBA</strong></td>
                      <td className="fee">₹1.5 L – ₹3.75 L</td>
                      <td>Mid-tier. Includes live faculty, structured cohorts, and often bundled tool certifications (Google Ads, GA4, HubSpot). This is where most working professionals fit.</td>
                    </tr>
                    <tr>
                      <td><strong>Executive MBA</strong></td>
                      <td className="fee">₹8 L – ₹18 L</td>
                      <td>Highest cost. Executive Digital Marketing tracks at IIM Kozhikode, Great Lakes, and MICA specifically target senior digital professionals. Strong placement support and industry mentorship.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="dg-callout">
                <span className="dg-callout-label">Financing note</span>
                As of 2025-26, most working professionals finance Digital Marketing MBAs from monthly salary. Executive Digital Marketing tracks typically require employer sponsorship or a proper education loan. Standard tie-ups with SBI, HDFC Credila, ICICI Bank, and Avanse Financial.
              </div>
            </section>

            {/* SECTION 11 — Mode decision */}
            <section id="mode">
              <h2>Distance, Online, or Executive: which mode fits your Digital Marketing career</h2>
              <p>The mode question for Digital Marketing carries slightly different weight than for other specializations because tool-access and cohort discussions materially affect learning.</p>
              <div className="dg-callout dg-callout-navy">
                <span className="dg-callout-label">Counsellor observation</span>
                For Digital Marketing specifically, the gap between Distance and Online modes is wider than for other specializations. Cohort peer discussions on campaign strategy, live faculty walk-throughs of GA4 dashboards, and structured tool access (HubSpot, SEMrush) genuinely improve career outcomes. Distance MBA graduates in Digital Marketing reported 22 percentage points lower placement conversion than Online graduates from the same universities in our 2024 tracking. If budget allows, choose Online for this specialization. — CollegeNCourses Senior Counsellor Desk
              </div>
              <div className="dg-table-wrap">
                <table className="dg-table">
                  <thead>
                    <tr><th>If your situation is...</th><th>Best mode</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {MODE_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.cond}</td>
                        <td><strong>{r.mode}</strong></td>
                        <td style={{ fontSize: 13 }}>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 12 — Who NOT fits */}
            <section id="not-fit">
              <h2>Who should not pick a Digital Marketing MBA</h2>
              <p>We include this section because most guides won&apos;t.</p>
              <div className="dg-not-fit">
                <ul>
                  {NOT_FIT.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </section>

            {/* SECTION 13 — 5 Questions */}
            <section id="five-questions">
              <h2>How to decide if a Digital Marketing MBA is right for you: 5 questions</h2>
              <p>Every mode-choice regret we hear in follow-up counselling calls comes back to one or more of these five questions going unanswered at enrolment.</p>
              <div className="dg-steps">
                {FIVE_QUESTIONS.map((s) => (
                  <div className="dg-step-card" key={s.step}>
                    <div className="dg-step-num">{s.step}</div>
                    <div className="dg-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="dg-btn dg-btn-primary" onClick={() => setModalOpen(true)}>
                  Get personalised advice →
                </button>
              </div>
            </section>

            {/* SECTION 14 — FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="dg-faq-list">
                {FAQS.map((faq, i) => (
                  <details className="dg-faq-item" key={i}>
                    <summary className="dg-faq-q">
                      <span>
                        {faq.q}
                        {faq.voice && <span className="dg-voice-badge">Voice</span>}
                      </span>
                      <span className="dg-faq-icon">+</span>
                    </summary>
                    <div className="dg-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* SECTION 15 — Related resources */}
            <section id="related">
              <h2>Go deeper</h2>
              <div className="dg-related-grid">
                {RELATED.map((r, i) => (
                  <a href={r.href} className="dg-related-card" key={i}>
                    <div className="icon">→</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* SECTION 16 — Authors & Sources */}
            <section id="authors">
              <div className="dg-authors">
                <h3>About this guide</h3>
                <div className="dg-author-row">
                  <strong>Written by: CollegeNCourses Editorial Team</strong>
                  <div className="dg-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="dg-author-bio">Leads content strategy for CollegeNCourses and has been writing on Indian higher education since 2020.</div>
                </div>
                <div className="dg-author-row">
                  <strong>Reviewed by: CollegeNCourses Senior Counsellor Desk (Digital Marketing &amp; Marketing focus)</strong>
                  <div className="dg-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="dg-author-bio">Has counselled thousands of MBA aspirants across Digital Marketing and Marketing Management specializations since 2016.</div>
                </div>
                <div className="dg-author-row">
                  <strong>Approved by: Nikhita Pradeep Deshmukh</strong>
                  <div className="dg-author-role">Founder, DNYANAL EDUCON PRIVATE LIMITED</div>
                  <div className="dg-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="dg-sources">
                <h4>Sources referenced</h4>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>Regulatory</p>
                <ul>
                  <li>UGC Distance Education Bureau (DEB) — deb.ugc.ac.in — Approved-institutions list, 2025-26</li>
                  <li>AICTE Approval Handbook 2025-26 — aicte-india.org</li>
                  <li>NAAC — naac.gov.in</li>
                </ul>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4, marginTop: 12 }}>Salary &amp; market data</p>
                <ul>
                  <li>AmbitionBox Salary Benchmarks — Q3 2025</li>
                  <li>Naukri.com JobSpeak Report — October 2025</li>
                  <li>LinkedIn Salary India Dataset — 2025</li>
                </ul>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4, marginTop: 12 }}>Internal</p>
                <ul>
                  <li>CollegeNCourses alumni tracking (289 Digital Marketing alumni surveyed 2024-25, refreshed quarterly)</li>
                  <li>CollegeNCourses counsellor enquiry logs 2023-25, anonymised</li>
                </ul>
                <p style={{ fontStyle: "italic", marginTop: 12 }}>This page is updated every six months. Next scheduled review: June 2026.</p>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* CTA Band */}
      <section className="dg-cta-band">
        <div className="container">
          <h2>Ready to shortlist your Digital Marketing MBA?</h2>
          <p>Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your target growth channel, employer type, budget, and timeline. Free, 30 minutes.</p>
          <button className="dg-btn dg-btn-navy" onClick={() => setModalOpen(true)}>
            Get free counselling →
          </button>
          <br />
          <a href="/resources/distance-vs-online-vs-executive-mba-guide/" className="dg-cta-secondary">
            Or read our Distance vs Online vs Executive MBA guide →
          </a>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-digital-marketing" />
    </>
  );
}
