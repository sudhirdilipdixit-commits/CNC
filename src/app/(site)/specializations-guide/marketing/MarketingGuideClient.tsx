"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LeadModal from "@/components/forms/LeadModal";

/* ─── Data ────────────────────────────────────────────────────────────── */

const TAKEAWAYS = [
  "<strong>Mode-fit:</strong> Online MBA suits most working professionals; Distance MBA fits budget-tight self-learners; Executive MBA at IIM/ISB/XLRI is worth ₹15–25 lakh only for Tier-1 industry resets.",
  "<strong>Fees:</strong> ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (IIM Indore Executive). Mainstream Online MBA median sits at ₹1.8 lakh for 24 months.",
  "<strong>Median salaries (2025-26):</strong> ₹6.5 LPA for freshers, ₹14 LPA at 3–7 years, ₹28 LPA at 8–15 years. Location, employer, and industry each shift these bands by 30–60%.",
  "<strong>Best-fit profile:</strong> Working professionals in sales, marketing, or communications wanting a promotion, or engineers/CAs switching into brand and product roles.",
  "<strong>Poor-fit signal:</strong> If you dislike consumer psychology or want a purely quantitative role, choose Business Analytics or Finance instead.",
  "<strong>Top pick by mode (2025-26):</strong> Symbiosis Online, NMIMS Distance, IIM Indore Executive.",
];

const QUICK_FACTS = [
  { label: "Duration", value: "12–24 months" },
  { label: "Fee range", value: "₹1.2 L – ₹25 L" },
  { label: "Approval", value: "UGC-DEB, AICTE, NAAC A+" },
  { label: "Median entry salary (2025-26)", value: "₹6.5 LPA" },
  { label: "Median mid-career salary", value: "₹14 LPA" },
];

const TOP_EMPLOYERS = [
  { label: "FMCG", value: "HUL, ITC, Nestle" },
  { label: "Tech", value: "Amazon, Flipkart, Meta" },
  { label: "D2C", value: "Nykaa, boAt, Sugar" },
  { label: "Best fits", value: "Sales / marketing pros" },
];

const PROFILE_CARDS = [
  {
    letter: "A",
    title: "The working professional shifting up",
    body: `Three to twelve years of experience in sales, marketing, communications, PR, or brand management. Currently a Marketing Executive, Assistant Manager, or Senior Executive. Wanting a promotion to Manager or Senior Manager but blocked by the “MBA required” clause. Distance or Online MBA is the natural fit. Job continues, MBA runs alongside, promotion follows within 18–24 months.`,
  },
  {
    letter: "B",
    title: "The domain-switcher",
    body: "Engineer, CA, doctor, or non-marketing professional wanting to move into brand management, product marketing, or a customer-facing strategic role. Often triggered by a plateau in the current field. Online or Executive MBA fits. Executive MBA is preferred if the switch involves geographic relocation or a full-industry change.",
  },
  {
    letter: "C",
    title: "The founder or family-business next-gen",
    body: "Founder of a D2C brand, e-commerce venture, or services business, or the incoming generation of a family enterprise. Wants formal marketing depth because instinct is no longer enough at scale. Distance or Online MBA suits busy founders. Executive MBA works if the business can spare 12–24 months of part-time academic commitment.",
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
    title: "Core marketing",
    body: "Consumer Behaviour, Brand Management, Sales & Distribution Management, Marketing Research, Services Marketing, Business Communication. This is where marketing becomes a proper discipline.",
  },
  {
    sem: "Semester 3",
    title: "Specialization depth",
    body: "Integrated Marketing Communications, Digital Marketing (module), Retail Management, B2B Marketing, Product & Innovation Management, Marketing Analytics (Excel and GA4).",
  },
  {
    sem: "Semester 4",
    title: "2025-26 additions & capstone",
    body: "AI for Marketers (new elective at most universities in 2024-25), Retail Media & CTV Advertising, Marketing Automation & CRM (HubSpot, Salesforce), Sustainability & Purpose-Led Marketing, capstone project.",
  },
];

const ROLE_CARDS = [
  {
    num: "1",
    title: "Brand Management",
    body: `Ownership of a single brand or product line. Roles: Assistant Brand Manager → Brand Manager → Senior Brand Manager → Category Head. Typical employers: HUL, ITC, Nestle, Marico, Dabur, Emami. The "classic" marketing career and most competitive to enter.`,
  },
  {
    num: "2",
    title: "Product Marketing",
    body: "Sits between product and sales. Owns positioning, launches, sales enablement. Roles: PMA → PMM → Senior PMM → Head of PMM. Typical employers: Amazon, Flipkart, Salesforce, Microsoft, Freshworks, Zoho. Fastest-growing role family in India in 2025-26.",
  },
  {
    num: "3",
    title: "Digital & Growth Marketing",
    body: "Performance marketing, SEO, paid media, growth hacking. Roles: Growth Associate → Growth Manager → Head of Growth. Typical employers: D2C (Nykaa, Mamaearth, boAt), fintech (CRED, Groww, Zerodha), consumer tech (Zomato, Swiggy, Ola).",
  },
  {
    num: "4",
    title: "Sales & BD",
    body: "Enterprise sales, key account management, channel sales. Roles: BDM → Sales Manager → Regional Head → National Sales Head. Typical employers: SaaS, industrial goods, insurance, real estate, pharma. Marketing MBAs who do this well often earn faster than pure marketing paths.",
  },
  {
    num: "5",
    title: "Marketing Research & Analytics",
    body: "Consumer research, market sizing, analytics. Roles: Research Analyst → Insights Manager → Head of Insights. Typical employers: Nielsen, Kantar, Ipsos, Deloitte, and internal insights teams at large FMCG and tech firms. Strong fit for quantitative aspirants.",
  },
  {
    num: "6",
    title: "Marketing Consulting",
    body: "Independent or firm-based consulting on brand strategy, go-to-market, marketing operations. Roles: Consultant → Senior Consultant → Principal → Partner. Typical employers: Bain, BCG, McKinsey, Kearney, boutique firms. More accessible via Executive MBA than Distance/Online.",
  },
];

const SALARY_ROWS = [
  { band: "Fresh graduate, 0–2 years", distOnline: "₹4.5 – 8 LPA", execT1: "₹8 – 14 LPA", execT2: "₹6 – 10 LPA" },
  { band: "Mid-level, 3–7 years", distOnline: "₹9 – 16 LPA", execT1: "₹18 – 30 LPA", execT2: "₹12 – 20 LPA" },
  { band: "Senior, 8–15 years", distOnline: "₹18 – 35 LPA", execT1: "₹35 – 60 LPA", execT2: "₹22 – 40 LPA" },
  { band: "Leadership, 15+ years", distOnline: "₹35 – 60 LPA", execT1: "₹60 LPA – ₹1.2 Cr", execT2: "₹40 – 75 LPA" },
  { band: "CMO track (top 5%)", distOnline: "₹50 LPA+", execT1: "₹1 Cr+", execT2: "₹60 LPA+" },
];

const TOP_PROGRAMMES = [
  { rank: 1, name: "Symbiosis (SCOL)", prog: "Online MBA Marketing", mode: "Online", dur: "24 mo", fee: "₹2.5 L", approval: "UGC-DEB, AICTE", placement: "Strong (~78%)", strength: "Live faculty, alumni network" },
  { rank: 2, name: "NMIMS Global Access", prog: "Distance MBA Marketing", mode: "Distance", dur: "24 mo", fee: "₹1.75 L", approval: "UGC-DEB", placement: "Moderate-Strong (~65%)", strength: "Industry-tied projects" },
  { rank: 3, name: "Manipal (MAHE)", prog: "Online MBA Marketing", mode: "Online", dur: "24 mo", fee: "₹1.6 L", approval: "UGC-DEB, NAAC A+", placement: "Moderate (~55%)", strength: "Best-value Tier-1 university" },
  { rank: 4, name: "IIM Indore", prog: "Executive MBA (1-Year)", mode: "Executive", dur: "12 mo", fee: "₹22 L", approval: "AICTE, IIM Act", placement: "Very Strong (~100%)", strength: "Tier-1 brand, guaranteed track" },
  { rank: 5, name: "Amity University", prog: "Online MBA Marketing", mode: "Online", dur: "24 mo", fee: "₹1.99 L", approval: "UGC-DEB", placement: "Moderate (~55%)", strength: "Widest specialization electives" },
  { rank: 6, name: "OP Jindal (JGBS)", prog: "Online MBA Global", mode: "Online", dur: "24 mo", fee: "₹3.5 L", approval: "UGC-DEB, AACSB", placement: "Strong (~70%)", strength: "International accreditation" },
  { rank: 7, name: "ICFAI University", prog: "Distance MBA Marketing", mode: "Distance", dur: "24 mo", fee: "₹1.2 L", approval: "UGC-DEB", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
  { rank: 8, name: "Jain Deemed-to-be Univ", prog: "Online MBA Marketing", mode: "Online", dur: "24 mo", fee: "₹1.5 L", approval: "UGC-DEB, NAAC A++", placement: "Moderate-Strong (~60%)", strength: "Value + accreditation" },
  { rank: 9, name: "IIM Kozhikode", prog: "EPGP", mode: "Executive", dur: "24 mo", fee: "₹15 L", approval: "AICTE, IIM Act", placement: "Very Strong (~95%)", strength: "IIM tag without residency" },
  { rank: 10, name: "Chandigarh University", prog: "Online MBA Marketing", mode: "Online", dur: "24 mo", fee: "₹1.4 L", approval: "UGC-DEB, NAAC A+", placement: "Moderate (~55%)", strength: "Strong newer entrant" },
];

const FEE_MODES = [
  {
    title: "Distance MBA",
    range: "₹1.2 L – ₹2 L",
    body: "Lowest cost. Self-paced study, largely asynchronous. Best for self-disciplined aspirants. Placement support is minimal at most universities. Third-party EMI available through Bajaj Finserv, HDFC Credila, and fintech lenders.",
  },
  {
    title: "Online MBA",
    range: "₹1.5 L – ₹3.5 L",
    body: "Mid-tier cost. Live faculty sessions, scheduled classes, recorded playback. Better placement support. Fee often payable in semester-wise or monthly instalments interest-free directly through the university. Most 2025-26 programmes offer their own 24-month EMI plans.",
  },
  {
    title: "Executive MBA",
    range: "₹8 L – ₹25 L",
    body: "Highest cost. In-person or intensive interactive online. Full placement or career-services access. Standard education-loan tie-ups with SBI, HDFC Credila, ICICI Bank, and Avanse Financial.",
  },
];

const MODE_COMPARISON = [
  {
    situation: "Working full-time, want a promotion inside current company or industry",
    mode: "Distance MBA or Online MBA",
    why: "Job continues uninterrupted. Employer often reimburses partially. Promotion clock keeps running.",
  },
  {
    situation: "Switching industry or function (engineer → marketer, tech → brand)",
    mode: "Online MBA (preferred) or Executive MBA",
    why: "Online gives structured live faculty and stronger placement support than Distance. Executive gives Tier-1 credibility that helps break industry inertia.",
  },
  {
    situation: "Between jobs, mid-career, need a hard reset with brand credibility",
    mode: "Executive MBA (IIM, ISB, XLRI, MDI)",
    why: "Higher fee, but placement cell + alumni network + Tier-1 brand justify it for a reset moment. Not worth it for a small career-tuning.",
  },
  {
    situation: "Founder or family-business owner",
    mode: "Distance MBA or Online MBA",
    why: "Time is the constraint, not credential. Curriculum access matters more than placement.",
  },
  {
    situation: "Aspirant with 0–2 years of experience",
    mode: "Wait, or take Online MBA",
    why: "Most Executive MBAs require 3+ years. Distance MBAs are open to all but career leverage is thin at 0–2 years.",
  },
];

const NOT_FIT = [
  "You dislike consumer psychology and find people-motivation questions boring. Marketing is fundamentally about why people buy. If that's uninteresting, you'll be miserable.",
  "You want a purely analytical or technical role. Consider Business Analytics or IT & Systems Management instead.",
  "You want to become a CFO or work in equity research. Finance or Banking & Financial Services specialization is the right path.",
  "You want to become a CHRO or work in learning-and-development. HR Management specialization is the right path.",
  `You resist creative work or find brand-building "fluffy." Modern marketing has moved substantially toward data, but discomfort with creative execution will hurt you at senior levels.`,
  `You are choosing Marketing "because it seems easier than Finance." It isn't. It is different-hard. If you are optimising for perceived ease, you will not enjoy the job that follows the MBA.`,
];

const FIVE_QUESTIONS = [
  {
    title: "Name your target role, two years post-graduation",
    body: '"Marketing" is too vague. Brand Manager? Product Marketing Manager? Head of Growth? Sales Manager? Consultant? The programme, and even the specialization mix within Marketing, changes based on the answer. If you cannot name a specific target role, book a counselling call before you enrol.',
  },
  {
    title: "Confirm whether you're shifting up or fully switching",
    body: "The MBA's payoff is 2-3x higher for someone already in sales, marketing, or comms who wants a promotion. It's a slower payoff for a full-industry-and-function switch. Both are valid; know which one you're doing.",
  },
  {
    title: "Check your employer's stated position on Distance and Online MBAs",
    body: `Most employers accept them in 2025-26 (post AICTE clarifications), but "accept" is not "reward." Have an honest conversation with your reporting manager or HR before enrolling. If the answer is "we prefer regular MBA," calibrate accordingly.`,
  },
  {
    title: "Audit whether you can actually finish",
    body: "Distance and Online MBAs have a 30–40% dropout rate in India. Working professionals underestimate the workload. Before enrolling, block your calendar and see if 12-15 hours per week for 24 months is realistic. If not, either compress by choosing a 12-month Executive MBA or postpone.",
  },
  {
    title: "Set your hard financial ceiling",
    body: "Set a walk-away number. If you can afford ₹2 lakh across two years, you have 6 excellent options. If you can afford ₹5 lakh, the shortlist widens to 12. Trying to stretch into ₹15-25 lakh Executive MBAs without employer support is a common cause of financial stress in years 3-4 post-enrolment.",
  },
];

const FAQS = [
  {
    q: "Is an Online MBA in Marketing Management valid in India?",
    a: "Yes. As of 2025-26, an Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list.",
  },
  {
    q: "Which is better for Marketing: Distance MBA, Online MBA, or Executive MBA?",
    a: "For most working professionals wanting a promotion in their current field, Online MBA is the best balance of cost, credential, and live faculty interaction. Distance MBA works if cost is the tightest constraint. Executive MBA (IIM/ISB/XLRI/MDI) is worth ₹15-25 lakh only if you are making a Tier-1 industry reset, an international move, or targeting consulting/senior strategy roles.",
  },
  {
    q: "How much does a Marketing Management MBA cost in India in 2025-26?",
    a: "Fees range from ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (IIM Executive residential). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between ₹1.5 lakh and ₹2.5 lakh total for a 24-month programme.",
  },
  {
    q: "What is the salary after an Online MBA in Marketing?",
    a: "Median 2025-26 salary for Online MBA graduates in Marketing sits at ₹6.5 LPA for freshers (0–2 years' experience), ₹14 LPA for mid-level (3–7 years), and ₹28 LPA for senior roles (8–15 years). Salary is heavily influenced by location, employer, and industry: fintech, SaaS, and D2C consistently pay 30-40% above traditional FMCG and services.",
  },
  {
    q: "Does an Online MBA in Marketing help with promotions in my current job?",
    a: "For most working professionals in sales, marketing, or communications roles at mid-sized to large Indian companies, yes. Promotions to Manager or Senior Manager often require a formal MBA credential per internal HR policy. Distance and Online MBAs from UGC-DEB approved universities typically satisfy this requirement.",
  },
  {
    q: "What is the difference between a Marketing MBA and a Digital Marketing MBA?",
    a: "A Marketing Management MBA covers the entire marketing function: brand, product, distribution, offline and online channels, research, and sales alignment. A Digital Marketing MBA is a focused specialization, deeper on SEO, paid media, growth, and marketing automation. For general marketing careers, choose Marketing Management. For growth or D2C-first careers, choose Digital Marketing.",
  },
  {
    q: "Can I do a Marketing Management MBA without a marketing background?",
    a: "Yes. Roughly 40% of Marketing Management MBA enrolments at Symbiosis, NMIMS, and Amity in 2024-25 came from non-marketing backgrounds. The MBA is designed to teach marketing from first principles.",
  },
  {
    q: "Which universities have the best placement records for Marketing MBAs?",
    a: "Based on our internal alumni tracking (2024-25), the highest placement conversion rates for Marketing specialization were at IIM Indore Executive (approaching 100%), Symbiosis Online (approx 78%), and NMIMS Distance (approx 65%).",
  },
  {
    q: "How is the AI wave affecting Marketing careers in India?",
    a: "The 2024-25 AI wave restructured a subset of marketing roles: content marketing, basic copywriting, and early-stage market research are increasingly AI-augmented. Strategic roles (Brand Manager, Growth Head, PMM, Sales Head) are being aided by AI tools rather than replaced. Marketing MBAs should expect to be evaluated partly on AI-tool fluency.",
  },
  {
    q: "Can I switch industries after a Marketing Management MBA?",
    a: "Yes, but with realism. Industry switches within marketing (FMCG to D2C, IT services to SaaS) are common and generally succeed. Function switches out of marketing into consulting or product management are harder from a Distance/Online MBA than from an Executive MBA at an IIM.",
  },
  {
    q: "What is the EMI or education loan availability for a Marketing MBA?",
    a: "For Distance and Online MBAs, most working professionals pay from monthly salary. For Executive MBAs above ₹8 lakh, education loans are widely available: SBI, HDFC Credila, ICICI Bank, Avanse Financial, and Auxilo. Interest rates in 2025-26 range from 9.5% to 12.5%.",
  },
  {
    q: "How does CollegeNCourses help me choose a programme?",
    a: "Our counsellors run a structured 30-minute free call. We understand your role, salary, career goal, budget, and timeline; shortlist three programmes matched to your profile from UGC-DEB approved options only; walk you through fee structures, EMI options, admission timelines, and the trade-offs.",
  },
  {
    q: "Is online MBA worth it for a working professional?",
    a: "Yes, for the right profile. If you have 3+ years of experience in a marketing-adjacent role and want a promotion or a domain switch, a UGC-DEB approved Online MBA delivers strong return typically within 18-24 months of graduation.",
  },
  {
    q: "How much salary after MBA in marketing?",
    a: "In 2025-26, the median first-year salary after an MBA in Marketing Management sits at roughly ₹6.5 LPA for Distance and Online MBA graduates, and ₹8-14 LPA for Tier-1 Executive MBA graduates.",
  },
  {
    q: "Which online MBA is best for marketing in India?",
    a: "The three most-recommended Online MBA programmes for Marketing specialization in India as of 2025-26 are Symbiosis Centre for Online Learning, NMIMS Global Access, and Manipal Academy of Higher Education. Best depends on your budget, experience, and career target.",
  },
  {
    q: "Do employers actually value Distance and Online MBAs in 2025-26?",
    a: "Most Indian employers, especially in mid-sized to large private-sector companies, accept Distance and Online MBAs from UGC-DEB approved universities for promotion eligibility and hiring. Acceptance is highest in IT, SaaS, D2C, and fintech.",
  },
];

const TOC_ITEMS = [
  { href: "#takeaways", label: "Key takeaways" },
  { href: "#snapshot", label: "In 90 seconds" },
  { href: "#what-is", label: "What this MBA really is" },
  { href: "#who-fits", label: "Who it fits" },
  { href: "#curriculum", label: "Curriculum 2025-26" },
  { href: "#career-paths", label: "Career paths" },
  { href: "#salary", label: "Salary data 2025-26" },
  { href: "#top-programmes", label: "Top 10 programmes" },
  { href: "#fees", label: "Fee structure" },
  { href: "#mode-comparison", label: "Distance vs Online vs Executive" },
  { href: "#not-fit", label: "Who it does NOT fit" },
  { href: "#questions", label: "5 questions to ask" },
  { href: "#faq", label: "FAQ" },
  { href: "#resources", label: "Related resources" },
  { href: "#authors", label: "About the authors" },
];

/* ─── Styles ──────────────────────────────────────────────────────────── */

const STYLES = `
  /* Progress bar */
  .mg-progress { position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear; }

  /* Breadcrumb */
  .mg-breadcrumb { font-size:13px;color:var(--grey);padding:16px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center; }
  .mg-breadcrumb a { color:var(--grey); }
  .mg-breadcrumb a:hover { color:var(--navy);text-decoration:underline; }
  .mg-breadcrumb .mg-sep { color:var(--pale-navy); }
  .mg-breadcrumb .mg-cur { color:var(--navy);font-weight:500; }

  /* Hero */
  .mg-hero { background:var(--ivory);padding:32px 0 56px;border-bottom:1px solid var(--mist); }
  .mg-eyebrow { display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:var(--radius-sm);margin-bottom:20px; }
  .mg-hero h1 { font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,5vw,50px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em; }
  .mg-subtitle { font-size:clamp(15px,2.2vw,19px);color:var(--charcoal);line-height:1.6;margin-bottom:20px;max-width:720px; }
  .mg-trust-strip { display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:20px; }
  .mg-stars { color:var(--yellow);letter-spacing:1px; }
  .mg-dot { color:var(--pale-navy); }
  .mg-cta-row { display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px; }
  .mg-verify { font-size:12px;color:var(--grey);font-style:italic; }

  /* Buttons */
  .mg-btn { display:inline-flex;align-items:center;gap:8px;padding:14px 22px;border-radius:var(--radius-md);font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none; }
  .mg-btn-primary { background:var(--yellow);color:var(--navy);box-shadow:var(--shadow-cta); }
  .mg-btn-primary:hover { transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25); }
  .mg-btn-secondary { background:transparent;color:var(--navy);border:2px solid var(--navy); }
  .mg-btn-secondary:hover { background:var(--navy);color:var(--ivory); }

  /* Layout */
  .mg-content-layout { display:grid;grid-template-columns:1fr;gap:32px;padding:40px 0; }
  @media(min-width:1024px){.mg-content-layout{grid-template-columns:240px 1fr;gap:56px;padding:56px 0;}}

  /* Sidebar ToC */
  .mg-toc-sidebar { display:none; }
  @media(min-width:1024px){
    .mg-toc-sidebar { display:block;position:sticky;top:120px;align-self:start;max-height:calc(100vh-140px);overflow-y:auto;padding-right:12px; }
    .mg-toc-sidebar h4 { font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px; }
    .mg-toc-sidebar ol { list-style:none;border-left:2px solid var(--mist); }
    .mg-toc-sidebar li { margin:0; }
    .mg-toc-sidebar a { display:block;padding:7px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s; }
    .mg-toc-sidebar a:hover { color:var(--navy); }
    .mg-toc-sidebar a.mg-toc-active { color:var(--navy);font-weight:600;border-left-color:var(--yellow); }
  }

  /* Mobile ToC */
  .mg-toc-mobile { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);margin-bottom:24px; }
  .mg-toc-mobile summary { padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px; }
  .mg-toc-mobile summary::-webkit-details-marker { display:none; }
  .mg-toc-mobile summary::after { content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s; }
  .mg-toc-mobile[open] summary::after { transform:rotate(45deg); }
  .mg-toc-mobile ol { list-style:none;padding:0 18px 18px; }
  .mg-toc-mobile li { padding:5px 0; }
  .mg-toc-mobile a { color:var(--charcoal);font-size:14px; }
  .mg-toc-mobile a:hover { color:var(--navy); }
  @media(min-width:1024px){.mg-toc-mobile{display:none;}}

  /* Article body */
  .mg-article { max-width:820px; }
  .mg-article h2 { font-family:var(--font-serif);color:var(--navy);font-size:clamp(24px,3.5vw,34px);line-height:1.2;margin:56px 0 16px;letter-spacing:-.01em; }
  .mg-article h2:first-child { margin-top:0; }
  .mg-article h3 { font-family:var(--font-serif);color:var(--navy);font-size:clamp(18px,2.4vw,22px);line-height:1.25;margin:32px 0 10px; }
  .mg-article p { font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em; }
  .mg-article p:last-child { margin-bottom:0; }
  .mg-article ul,
  .mg-article ol { margin:12px 0 16px 20px;color:var(--charcoal);font-size:16px;line-height:1.7; }
  .mg-article li { margin-bottom:8px; }
  .mg-article strong { color:var(--navy);font-weight:700; }
  section[id] { scroll-margin-top:120px; }

  /* Freshness */
  .mg-freshness { display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:5px 12px;border-radius:var(--radius-sm);font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px; }
  .mg-freshness::before { content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%; }

  /* Takeaways */
  .mg-takeaways { background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:24px;margin-bottom:32px; }
  .mg-takeaways h2 { margin-top:0!important;margin-bottom:16px!important;font-size:22px!important; }
  .mg-takeaways ul { list-style:none;margin:0; }
  .mg-takeaways li { position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6; }
  .mg-takeaways li::before { content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%; }
  .mg-takeaways li:last-child { margin-bottom:0; }

  /* Snapshot cards */
  .mg-snapshot { display:grid;grid-template-columns:1fr;gap:20px;margin:20px 0; }
  @media(min-width:900px){.mg-snapshot{grid-template-columns:1.5fr 1fr;}}
  .mg-snap-card { background:var(--white);border:1px solid var(--mist);border-top:4px solid var(--yellow);border-radius:var(--radius-md);padding:20px; }
  .mg-snap-card h4 { font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:16px; }
  .mg-snap-row { display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--mist);font-size:14px;gap:12px; }
  .mg-snap-row:last-child { border-bottom:none; }
  .mg-snap-lbl { color:var(--grey);font-weight:500;flex-shrink:0; }
  .mg-snap-val { color:var(--navy);font-weight:600;text-align:right; }

  /* Callout */
  .mg-callout { background:var(--white);border-left:4px solid var(--yellow);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:16px 20px;margin:20px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:var(--shadow-sm); }
  .mg-callout-label { display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal; }
  .mg-callout.mg-counsellor { background:var(--pale-navy); }

  /* Profile cards */
  .mg-card-grid { display:grid;grid-template-columns:1fr;gap:16px;margin:20px 0; }
  @media(min-width:768px){.mg-card-grid{grid-template-columns:repeat(3,1fr);}}
  .mg-profile-card { background:var(--white);border:1px solid var(--mist);border-top:4px solid var(--yellow);border-radius:var(--radius-md);padding:20px; }
  .mg-profile-icon { width:44px;height:44px;background:var(--pale-navy);color:var(--navy);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-family:var(--font-serif);font-size:20px;font-weight:700; }
  .mg-profile-card h3 { font-family:var(--font-serif);color:var(--navy);font-size:19px;margin-bottom:10px;line-height:1.25; }
  .mg-profile-card p { color:var(--charcoal);font-size:14px;line-height:1.6;margin:0; }

  /* Curriculum */
  .mg-curriculum { display:grid;grid-template-columns:1fr;gap:12px;margin:20px 0; }
  @media(min-width:768px){.mg-curriculum{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:1024px){.mg-curriculum{grid-template-columns:repeat(4,1fr);}}
  .mg-sem-card { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:16px;border-top:3px solid var(--yellow); }
  .mg-sem-badge { display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:var(--radius-sm);margin-bottom:12px; }
  .mg-sem-card h4 { font-family:var(--font-serif);color:var(--navy);font-size:16px;margin-bottom:10px;line-height:1.3; }
  .mg-sem-card p { color:var(--charcoal);font-size:13px;line-height:1.55;margin:0; }

  /* Role grid */
  .mg-role-grid { display:grid;grid-template-columns:1fr;gap:16px;margin:20px 0; }
  @media(min-width:768px){.mg-role-grid{grid-template-columns:repeat(2,1fr);}}
  .mg-role-card { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:20px; }
  .mg-role-num { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--yellow);color:var(--navy);font-family:var(--font-serif);font-size:15px;font-weight:700;margin-bottom:12px; }
  .mg-role-card h3 { font-family:var(--font-serif);color:var(--navy);font-size:19px;margin-bottom:10px;line-height:1.25; }
  .mg-role-card p { font-size:14px;line-height:1.6;color:var(--charcoal);margin:0; }

  /* Tables */
  .mg-table-wrap { overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:var(--radius-md);border:1px solid var(--mist);background:var(--white); }
  .mg-table { width:100%;border-collapse:collapse;font-size:14px;min-width:640px; }
  .mg-table thead { background:var(--navy);color:var(--yellow); }
  .mg-table th { text-align:left;padding:13px 16px;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle; }
  .mg-table td { padding:13px 16px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.5; }
  .mg-table tbody tr:hover { background:var(--ivory); }
  .mg-table .mg-rank { font-family:var(--font-serif);color:var(--navy);font-size:17px;font-weight:700;text-align:center; }
  .mg-table .mg-fee { color:var(--navy);font-weight:700; }
  .mg-table caption { caption-side:bottom;text-align:left;padding:10px 16px;font-size:12px;color:var(--grey);font-style:italic;line-height:1.5; }
  .mg-table-cta { background:var(--pale-navy);padding:16px 20px;border-radius:var(--radius-md);display:flex;flex-direction:column;gap:12px;margin:12px 0 24px;align-items:flex-start; }
  @media(min-width:640px){.mg-table-cta{flex-direction:row;align-items:center;justify-content:space-between;}}
  .mg-table-cta p { color:var(--navy);font-size:14px;margin:0; }

  /* Fee cards */
  .mg-fee-grid { display:grid;grid-template-columns:1fr;gap:16px;margin:20px 0; }
  @media(min-width:900px){.mg-fee-grid{grid-template-columns:repeat(3,1fr);}}
  .mg-fee-card { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:20px;border-top:4px solid var(--yellow); }
  .mg-fee-card h4 { font-family:var(--font-serif);color:var(--navy);font-size:19px;margin-bottom:12px;line-height:1.2; }
  .mg-fee-range { font-family:var(--font-serif);color:var(--navy);font-size:22px;background:var(--pale-navy);padding:7px 13px;border-radius:var(--radius-md);display:inline-block;margin-bottom:12px; }
  .mg-fee-card p { font-size:14px;line-height:1.6;margin:0; }

  /* Not-fit */
  .mg-not-fit { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:20px;margin:16px 0;list-style:none; }
  .mg-not-fit li { padding-left:32px;position:relative;margin-bottom:12px;font-size:15px;line-height:1.6;color:var(--charcoal); }
  .mg-not-fit li:last-child { margin-bottom:0; }
  .mg-not-fit li::before { content:'×';position:absolute;left:0;top:-2px;width:22px;height:22px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px; }

  /* Steps */
  .mg-steps { display:grid;grid-template-columns:1fr;gap:16px;margin:20px 0; }
  .mg-step-card { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:20px;display:flex;gap:16px;align-items:flex-start; }
  .mg-step-num { flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700; }
  .mg-step-body h3 { font-family:var(--font-serif);color:var(--navy);font-size:19px;margin-bottom:8px;line-height:1.25; }
  .mg-step-body p { font-size:15px;line-height:1.65;margin:0; }

  /* FAQ */
  .mg-faq-list { display:flex;flex-direction:column;gap:12px;margin:20px 0; }
  .mg-faq-item { border:1px solid var(--mist);border-radius:var(--radius-md);background:var(--white);overflow:hidden; }
  .mg-faq-item[open] { border-color:var(--pale-navy);box-shadow:var(--shadow-sm); }
  .mg-faq-q { padding:17px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:15px;line-height:1.45; }
  .mg-faq-q::-webkit-details-marker { display:none; }
  .mg-faq-icon { flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s; }
  .mg-faq-item[open] .mg-faq-icon { transform:rotate(45deg); }
  .mg-faq-a { padding:0 22px 18px;color:var(--charcoal);font-size:15px;line-height:1.7; }

  /* Related resources */
  .mg-related-grid { display:grid;grid-template-columns:1fr;gap:12px;margin:20px 0; }
  @media(min-width:640px){.mg-related-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:1024px){.mg-related-grid{grid-template-columns:repeat(3,1fr);}}
  .mg-related-card { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal); }
  .mg-related-card:hover { transform:translateY(-2px);box-shadow:var(--shadow-md);border-color:var(--yellow); }
  .mg-related-icon { width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:15px; }
  .mg-related-card h4 { font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0; }

  /* Authors */
  .mg-authors { background:var(--white);border:1px solid var(--mist);border-radius:var(--radius-md);padding:20px;margin:20px 0; }
  .mg-authors h3 { font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px; }
  .mg-author-row { padding:12px 0;border-bottom:1px solid var(--mist); }
  .mg-author-row:last-child { border-bottom:none; }
  .mg-author-name { color:var(--navy);font-size:15px;font-weight:700;display:block;margin-bottom:4px; }
  .mg-author-role { font-size:13px;color:var(--grey);margin-bottom:4px; }
  .mg-author-bio { font-size:13px;color:var(--charcoal);line-height:1.55; }
  .mg-sources { background:var(--pale-navy);border-radius:var(--radius-md);padding:20px;margin:20px 0;font-size:13px;line-height:1.7; }
  .mg-sources h4 { font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px; }
  .mg-sources ul { list-style:none;margin:0 0 12px; }
  .mg-sources li { padding:3px 0;color:var(--charcoal); }
  .mg-sources a { color:var(--navy);border-bottom:1px dotted var(--navy); }

  /* CTA band */
  .mg-cta-band { background:var(--yellow);padding:72px 0;text-align:center;position:relative;margin-top:72px; }
  .mg-cta-band::before { content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy); }
  .mg-cta-band h2 { font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,4vw,38px);line-height:1.15;margin-bottom:12px; }
  .mg-cta-band p { color:var(--navy);font-size:16px;max-width:600px;margin:0 auto 24px;line-height:1.55; }
  .mg-cta-btns { display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }
  .mg-cta-band .mg-btn-primary { background:var(--navy);color:var(--yellow); }
  .mg-cta-band .mg-btn-primary:hover { background:var(--navy-dark); }
  .mg-cta-secondary { display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px; }
`;

/* ─── Component ───────────────────────────────────────────────────────── */

export default function MarketingGuideClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.width = docH > 0 ? `${(window.scrollY / docH) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".mg-toc-sidebar a");
    const sections = document.querySelectorAll<HTMLElement>("article section[id]");
    let observer: IntersectionObserver | null = null;

    if (tocLinks.length && sections.length && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              tocLinks.forEach((l) =>
                l.classList.toggle("mg-toc-active", l.getAttribute("href") === `#${id}`)
              );
            }
          });
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      sections.forEach((s) => observer!.observe(s));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="mg-progress" ref={progressRef} aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="mg-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="mg-sep" aria-hidden="true">›</span>
          <Link href="/specializations-guide">Specializations Guide</Link>
          <span className="mg-sep" aria-hidden="true">›</span>
          <span className="mg-cur">MBA in Marketing Management</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mg-hero">
        <div className="container">
          <span className="mg-eyebrow">Specialization Guide · 2025-26 Edition</span>
          <h1>
            MBA in Marketing Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes
          </h1>
          <p className="mg-subtitle">
            Fees from ₹1.2 lakh to ₹25 lakh. Real salary data from 412 alumni. Top 10 UGC-DEB approved
            programmes compared, mode-by-mode. No paid rankings. No sales pitch.
          </p>
          <div className="mg-trust-strip">
            <span><span className="mg-stars">★★★★★</span> 4.8 / 5 counselling rating</span>
            <span className="mg-dot">•</span>
            <span>12,000+ aspirants placed since 2019</span>
            <span className="mg-dot">•</span>
            <span>150+ verified universities</span>
          </div>
          <div className="mg-cta-row">
            <button
              type="button"
              className="mg-btn mg-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Get a free counsellor recommendation →
            </button>
            <a href="#top-programmes" className="mg-btn mg-btn-secondary">
              Jump to top 10 programmes ↓
            </a>
          </div>
          <p className="mg-verify">
            Last verified: 15 December 2025 against the UGC-DEB current approved-institutions list.
          </p>
        </div>
      </section>

      {/* Content layout */}
      <div className="container">
        <div className="mg-content-layout">

          {/* ToC Sidebar (desktop) */}
          <aside className="mg-toc-sidebar" aria-label="On this page">
            <h4>On this page</h4>
            <ol>
              {TOC_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Article body */}
          <article className="mg-article">

            {/* Mobile ToC */}
            <details className="mg-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Key Takeaways */}
            <section id="takeaways" className="mg-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
              </ul>
            </section>

            {/* In 90 seconds */}
            <section id="snapshot">
              <h2>Marketing Management MBA, in 90 seconds</h2>
              <p>
                <strong>An MBA in Marketing Management trains you to build, position, and grow brands.</strong>{" "}
                As of 2025-26, it is the single most-enrolled MBA specialization in India across Distance and
                Online modes, and the fastest-growing Executive MBA elective at IIMs. UGC-DEB has approved
                47 institutions to offer Online MBA programmes as of the current session.
              </p>
              <p>
                Fees range from ₹1.2 lakh (ICFAI Distance) to ₹25 lakh (IIM Executive), with the mainstream
                Online MBA median at ₹1.8 lakh. Median entry-level salary for a Marketing MBA graduate in
                2025-26 stands at ₹6.5 lakh per annum for freshers, ₹14 lakh for mid-level (3–7 years'
                experience), and ₹28 lakh for senior roles (8–15 years). The specialization suits three
                profiles best: working professionals in sales, marketing, or communications who want a
                management title; engineers and CAs shifting into brand or product roles; and founders who
                need structured marketing depth.
              </p>
              <div className="mg-snapshot">
                <div className="mg-snap-card">
                  <h4>Quick facts</h4>
                  {QUICK_FACTS.map((r) => (
                    <div key={r.label} className="mg-snap-row">
                      <span className="mg-snap-lbl">{r.label}</span>
                      <span className="mg-snap-val">{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mg-snap-card">
                  <h4>Top employers</h4>
                  {TOP_EMPLOYERS.map((r) => (
                    <div key={r.label} className="mg-snap-row">
                      <span className="mg-snap-lbl">{r.label}</span>
                      <span className="mg-snap-val">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What this MBA is */}
            <section id="what-is">
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>
                <strong>
                  An MBA in Marketing Management, at postgraduate level, is the discipline of understanding
                  customers, building the right product for them, positioning it in the market, pricing
                  correctly, distributing well, and communicating in ways that convert attention into revenue.
                </strong>{" "}
                Everything else — the Kotler frameworks, the STP model, the 4Ps — sits inside that
                discipline.
              </p>
              <p>
                What makes it different from a Digital Marketing MBA is scope. Marketing Management covers
                the full function: brand strategy, product management, offline and online channels, market
                research, consumer behaviour, sales-marketing alignment, retail, and partnerships. Digital
                Marketing is a focused subset. If you want to run brand strategy for a Nykaa or an HUL,
                choose Marketing Management. If you want to specialise in performance ads, SEO, and
                growth-hacking, Digital Marketing is the tighter fit.
              </p>
              <p>
                What makes it different from a Sales MBA is emphasis. Marketing sits upstream of sales. It
                decides what to sell, to whom, and why. Sales executes. In India&apos;s 2025-26 job market,
                most Marketing Management MBAs end up doing both, especially in the first three years.
              </p>
              <div className="mg-callout">
                <span className="mg-callout-label">One misconception we hear often</span>
                &ldquo;Marketing is only for creative people.&rdquo; It isn&apos;t. Modern marketing in
                2025-26 is roughly 60% analytics, 25% strategy, and 15% creative. If you enjoy consumer
                psychology, data patterns, and business writing, you&apos;ll do well. Formal design skills
                are optional.
              </div>
            </section>

            {/* Who fits */}
            <section id="who-fits">
              <h2>Who this specialization is built for</h2>
              <p>
                Marketing Management MBAs work best for three broad profiles. If you recognise yourself
                below, this is worth serious consideration.
              </p>
              <div className="mg-card-grid">
                {PROFILE_CARDS.map((c) => (
                  <div key={c.letter} className="mg-profile-card">
                    <div className="mg-profile-icon">{c.letter}</div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum">
              <h2>What a 2025-26 Marketing Management MBA actually teaches</h2>
              <p>
                <strong>
                  A 2025-26 Marketing Management MBA covers 24 core subjects across four semesters:
                </strong>{" "}
                management foundations, core marketing (brand, consumer behaviour, sales, research),
                specialization electives (digital, retail, B2B, analytics), and the new 2025 additions —
                AI for Marketers, Marketing Automation, and Purpose-Led Marketing.
              </p>
              <div className="mg-curriculum">
                {CURRICULUM.map((c) => (
                  <div key={c.sem} className="mg-sem-card">
                    <span className="mg-sem-badge">{c.sem}</span>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
              <div className="mg-callout">
                <span className="mg-callout-label">New in 2025-26</span>
                AI for Marketers is now offered as an elective at Symbiosis, NMIMS, Amity, Manipal, Jain,
                and OP Jindal. It covers generative AI for content, AI-driven customer segmentation, and
                ethical guardrails around synthetic media. If it&apos;s not on the syllabus of a programme
                you&apos;re considering, that programme is behind.
              </div>
            </section>

            {/* Career paths */}
            <section id="career-paths">
              <h2>The roles a Marketing Management MBA leads to</h2>
              <p>
                Marketing is a broader career funnel than most aspirants realise. A single MBA in Marketing
                Management opens doors into six distinct role families. Your first job out of the MBA
                usually sits in one; your third job (five to seven years later) often sits in a different
                one.
              </p>
              <div className="mg-callout mg-counsellor">
                <span className="mg-callout-label">From our 2024-25 counselling desk</span>
                The single most under-explored option we surface is Product Marketing. Aspirants who chose
                Product Marketing over classical Brand Management — largely IT and engineering-background
                candidates — reported 40-60% faster salary progression in years 2-4 post-MBA, based on our
                alumni tracking. It remains under-marketed by universities relative to its actual career
                strength.
                <br /><br />
                — CollegeNCourses Senior Counsellor Desk
              </div>
              <div className="mg-role-grid">
                {ROLE_CARDS.map((r) => (
                  <div key={r.num} className="mg-role-card">
                    <div className="mg-role-num">{r.num}</div>
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Salary */}
            <section id="salary">
              <span className="mg-freshness">
                Last verified 15 December 2025 · AmbitionBox, Naukri, LinkedIn Q3 2025
              </span>
              <h2>What a Marketing Management MBA graduate earns in 2025-26</h2>
              <p>
                <strong>
                  Median 2025-26 salary for Online MBA graduates in Marketing sits at ₹6.5 lakh per annum
                  for freshers
                </strong>{" "}
                (0-2 years&apos; experience), ₹14 lakh for mid-level (3-7 years), and ₹28 lakh for senior
                roles (8-15 years). Executive MBA graduates from Tier-1 IIMs command roughly 2-3x these
                bands.
              </p>
              <div className="mg-table-wrap">
                <table className="mg-table">
                  <thead>
                    <tr>
                      <th>Experience Band</th>
                      <th>Distance/Online MBA</th>
                      <th>Executive MBA (Tier-1)</th>
                      <th>Executive MBA (Tier-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((r) => (
                      <tr key={r.band}>
                        <td>{r.band}</td>
                        <td>{r.distOnline}</td>
                        <td>{r.execT1}</td>
                        <td>{r.execT2}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>
                    Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with
                    AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent
                    25th–75th percentile.
                  </caption>
                </table>
              </div>
              <div className="mg-callout">
                <span className="mg-callout-label">What these numbers do not tell you</span>
                Location matters. A Mumbai, Bangalore, or Gurgaon Marketing Manager typically earns 30–40%
                more than the same role in Pune, Hyderabad, or Chennai. Company matters more — Amazon or
                HUL pays roughly 60% more than a mid-tier D2C brand. Domain matters most — marketing in
                fintech, SaaS, and D2C consistently pays 30-40% above traditional FMCG, media, or
                services.
              </div>
            </section>

            {/* Top programmes */}
            <section id="top-programmes">
              <span className="mg-freshness">
                Last verified 15 December 2025 · UGC-DEB &amp; AICTE current lists
              </span>
              <h2>The 10 Marketing MBA programmes worth shortlisting in 2025-26</h2>
              <p>
                Our current top-10 list across Distance, Online, and Executive modes. Not paid, not
                sponsored. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, our internal
                placement tracking from 412 alumni, and structured feedback from counsellors handling
                2,000+ enquiries per month. We refresh this list every six months.
              </p>
              <div className="mg-table-wrap">
                <table className="mg-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Programme</th>
                      <th>Mode</th>
                      <th>Duration</th>
                      <th>Fee (2025-26)</th>
                      <th>Approval</th>
                      <th>Placement Support</th>
                      <th>Key Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_PROGRAMMES.map((p) => (
                      <tr key={p.rank}>
                        <td className="mg-rank">{p.rank}</td>
                        <td>
                          <strong>{p.name}</strong>
                          <br />
                          {p.prog}
                        </td>
                        <td>{p.mode}</td>
                        <td>{p.dur}</td>
                        <td className="mg-fee">{p.fee}</td>
                        <td>{p.approval}</td>
                        <td>{p.placement}</td>
                        <td>{p.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>
                    As of 2025-26. Fees are total programme cost, exclusive of exam surcharges. Placement
                    support ratings are directional, not guarantees.
                  </caption>
                </table>
              </div>
              <div className="mg-table-cta">
                <p>
                  <strong>Confused about which one fits your profile?</strong> Our counsellors shortlist
                  three programmes matched to your role, budget, and timeline in a free 30-minute call.
                </p>
                <button
                  type="button"
                  className="mg-btn mg-btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Book a free call →
                </button>
              </div>
            </section>

            {/* Fees */}
            <section id="fees">
              <h2>What you will actually pay across the three modes</h2>
              <p>
                Fees for a Marketing Management MBA span an order of magnitude — roughly ₹1.2 lakh at the
                lowest UGC-DEB approved end to ₹25 lakh at Tier-1 Executive MBAs. That range is not
                arbitrary. It reflects real differences in brand, faculty access, peer network, and career
                support.
              </p>
              <div className="mg-fee-grid">
                {FEE_MODES.map((f) => (
                  <div key={f.title} className="mg-fee-card">
                    <h4>{f.title}</h4>
                    <div className="mg-fee-range">{f.range}</div>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
              <div className="mg-callout">
                <span className="mg-callout-label">Financing note</span>
                As of 2025-26, most working professionals finance Distance and Online MBAs from monthly
                salary (₹6,000-8,000 per month EMI is manageable for the ₹1.5-2 L bracket). Executive MBA
                typically requires either employer sponsorship or a proper education loan. If you are
                self-financing an Executive MBA, do a hard-nosed ROI calculation before committing.
              </div>
            </section>

            {/* Mode comparison */}
            <section id="mode-comparison">
              <h2>Distance, Online, or Executive: which mode fits your Marketing career</h2>
              <p>
                This is the question most aspirants ask us in the first counselling call. The answer is not
                &ldquo;whichever is cheapest&rdquo; or &ldquo;whichever has the best brand.&rdquo; It
                depends on where you are in your career, what your employer will reimburse, and what problem
                the MBA is solving.
              </p>
              <div className="mg-callout mg-counsellor">
                <span className="mg-callout-label">From our counselling records 2023-25</span>
                The single most common regret we hear from Distance MBA graduates is under-estimating how
                much they missed live faculty interaction. Of aspirants who initially chose Distance for
                cost reasons, 34% told us in follow-up calls they would have paid the extra ₹50,000-80,000
                for Online with live classes if we had pushed harder.
                <br /><br />
                — CollegeNCourses Senior Counsellor Desk
              </div>
              <div className="mg-table-wrap">
                <table className="mg-table">
                  <thead>
                    <tr>
                      <th>If your situation is...</th>
                      <th>The best mode is...</th>
                      <th>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODE_COMPARISON.map((r) => (
                      <tr key={r.situation}>
                        <td>{r.situation}</td>
                        <td><strong>{r.mode}</strong></td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Not fit */}
            <section id="not-fit">
              <h2>Who should not pick a Marketing Management MBA</h2>
              <p>
                We include this section because most guides won&apos;t. It saves people who are about to
                spend ₹2-5 lakh on a wrong-fit programme. If two or more of the below describe you, choose
                a different specialization or mode.
              </p>
              <ul className="mg-not-fit">
                {NOT_FIT.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* 5 Questions */}
            <section id="questions">
              <h2>How to decide if a Marketing Management MBA is right for you: 5 questions</h2>
              <p>
                Every aspirant who enrols in a Marketing Management MBA and later regrets it usually made
                a decision without answering one or more of the five questions below. Go through each
                honestly.
              </p>
              <div className="mg-steps">
                {FIVE_QUESTIONS.map((q, i) => (
                  <div key={i} className="mg-step-card">
                    <div className="mg-step-num">{i + 1}</div>
                    <div className="mg-step-body">
                      <h3>{q.title}</h3>
                      <p>{q.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="mg-faq-list">
                {FAQS.map((faq, i) => (
                  <details key={i} className="mg-faq-item">
                    <summary className="mg-faq-q">
                      {faq.q}
                      <span className="mg-faq-icon" aria-hidden="true">+</span>
                    </summary>
                    <div className="mg-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related resources */}
            <section id="resources">
              <h2>Go deeper</h2>
              <div className="mg-related-grid">
                {[
                  { href: "/resources", label: "Distance vs Online vs Executive MBA: Complete Comparison Guide 2025-26" },
                  { href: "/resources", label: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26" },
                  { href: "/resources", label: "Complete Distance/Online MBA Fee Guide 2025-26" },
                  { href: "/specializations-guide", label: "Digital Marketing MBA Specialization Guide" },
                  { href: "/blog", label: "How to Choose Your MBA Specialization: A Framework" },
                  { href: "/resources", label: "2025-26 Online MBA Salary Report by Specialization" },
                ].map((r, i) => (
                  <Link key={i} href={r.href} className="mg-related-card">
                    <div className="mg-related-icon">→</div>
                    <h4>{r.label}</h4>
                  </Link>
                ))}
              </div>
            </section>

            {/* Authors */}
            <section id="authors">
              <h2>About this guide</h2>
              <div className="mg-authors">
                <h3>Editorial credits</h3>
                <div className="mg-author-row">
                  <span className="mg-author-name">Written by: CollegeNCourses Editorial Team</span>
                  <div className="mg-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="mg-author-bio">
                    Our editorial team has been writing on Indian higher education since 2020, covering
                    Distance, Online, and Executive MBA programmes across UGC-DEB approved universities.
                  </div>
                </div>
                <div className="mg-author-row">
                  <span className="mg-author-name">Reviewed by: CollegeNCourses Senior Counsellor</span>
                  <div className="mg-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="mg-author-bio">
                    Our reviewing counsellor has advised over 3,000 MBA aspirants across Distance, Online,
                    and Executive modes since 2016. Areas of focus: Marketing and Digital specializations.
                  </div>
                </div>
                <div className="mg-author-row">
                  <span className="mg-author-name">Approved by: Nikhita Pradeep Deshmukh</span>
                  <div className="mg-author-role">Founder, Dnyanal Educon Pvt Ltd</div>
                  <div className="mg-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="mg-sources">
                <h4>Sources referenced</h4>
                <p><strong>Regulatory &amp; accreditation:</strong></p>
                <ul>
                  <li>University Grants Commission (UGC) — approved-institutions list, 2025-26</li>
                  <li>UGC Distance Education Bureau (DEB)</li>
                  <li>AICTE — Approval Process Handbook 2025-26</li>
                  <li>NAAC — Institution grading database</li>
                </ul>
                <p><strong>Salary and market data:</strong></p>
                <ul>
                  <li>AmbitionBox Salary Benchmarks — Marketing Manager India, Q3 2025</li>
                  <li>Naukri.com JobSpeak Report — October 2025</li>
                  <li>LinkedIn Salary India Dataset — 2025</li>
                </ul>
                <p>
                  <strong>Internal:</strong> CollegeNCourses alumni tracking (412 alumni surveyed
                  2024-25, refreshed quarterly); counsellor enquiry logs, aggregated 2023-25, anonymised.
                </p>
                <p style={{ fontStyle: "italic", color: "var(--grey)", marginTop: 12 }}>
                  This page is updated every six months. Next scheduled review: 15 June 2026.
                </p>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* CTA Band */}
      <section className="mg-cta-band" id="contact">
        <div className="container">
          <h2>Ready to shortlist your Marketing MBA?</h2>
          <p>
            Talk to a CollegeNCourses counsellor. We&apos;ll match you to three programmes based on your
            role, budget, and timeline. Free, 30 minutes.
          </p>
          <div className="mg-cta-btns">
            <button
              type="button"
              className="mg-btn mg-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Get free counselling →
            </button>
            <Link href="/contact-us" className="mg-btn mg-btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-marketing" />
    </>
  );
}
