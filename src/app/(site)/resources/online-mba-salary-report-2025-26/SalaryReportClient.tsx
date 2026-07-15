"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "quick-answer", label: "Highest & lowest paying at a glance" },
  { id: "salary-table", label: "The complete salary table" },
  { id: "career-stage", label: "Highest-paying by career stage" },
  { id: "growth-trajectory", label: "Steepest growth trajectory" },
  { id: "executive-premium", label: "The Executive MBA premium" },
  { id: "employer-type", label: "Salary by employer type" },
  { id: "salary-by-city", label: "Salary by city" },
  { id: "negotiate-offer", label: "How to negotiate using this data" },
  { id: "methodology", label: "Our methodology" },
  { id: "salary-alone", label: "Should salary be your only factor" },
  { id: "red-flags", label: "Red flags to avoid" },
  { id: "scenarios", label: "Real aspirant scenarios" },
  { id: "faq", label: "FAQ" },
  { id: "pdf-download", label: "Download PDF version" },
  { id: "authors", label: "About this guide" },
];

const TAKEAWAYS = [
  {
    label: "Business Analytics and IT & Systems Management lead at entry level",
    text: "Both specializations post entry-level salaries of ₹6.5–10 lakh; the two most quantitatively-driven specializations command the steepest starting premium.",
  },
  {
    label: "Finance Management and IT & Systems Management lead at leadership level",
    text: "Both reach ₹42–75 lakh at 15+ years, reflecting CFO and CIO/CTO track ceilings covered in their respective specialization guides.",
  },
  {
    label: "The gap between specializations is smaller than the gap between employers",
    text: "Choosing D2C over IT services, or consulting over legacy manufacturing, typically moves your salary more than choosing one specialization over another.",
  },
  {
    label: "Executive MBA delivers roughly 1.8–2x the leadership-level pay",
    text: "But at 8–15x the upfront cost, a pattern consistent with the ROI analysis in our Mode Comparison Guide.",
  },
  {
    label: "Operations Management shows the single sharpest documented transition",
    text: "Manufacturing engineers moving into management report median jumps from ₹6 lakh to ₹18 lakh over four years.",
  },
  {
    label: "Common mistake",
    text: "Benchmarking a job offer against a specialization's overall salary range instead of the specific employer-type band it actually falls into; the employer-type section shows why this matters more than the specialization choice itself.",
  },
];

const SALARY_TABLE = [
  { spec: "Business Analytics", entry: "₹6–10 L", mid: "₹12–22 L", senior: "₹22–42 L", lead: "₹42–70 L", slug: "business-analytics" },
  { spec: "IT & Systems Management", entry: "₹6–10 L", mid: "₹11–22 L", senior: "₹22–42 L", lead: "₹42–75 L", slug: "it-systems" },
  { spec: "Digital Marketing", entry: "₹5–9 L", mid: "₹10–18 L", senior: "₹20–38 L", lead: "₹38–65 L", slug: "digital-marketing" },
  { spec: "Finance Management", entry: "₹5–9 L", mid: "₹11–20 L", senior: "₹22–42 L", lead: "₹42–75 L", slug: "finance" },
  { spec: "Supply Chain Management", entry: "₹5–9 L", mid: "₹11–20 L", senior: "₹22–40 L", lead: "₹40–68 L", slug: "supply-chain" },
  { spec: "Marketing Management", entry: "₹5–8 L", mid: "₹10–17 L", senior: "₹19–35 L", lead: "₹35–58 L", slug: "marketing" },
  { spec: "Operations Management", entry: "₹5–8 L", mid: "₹10–18 L", senior: "₹20–38 L", lead: "₹38–65 L", slug: "operations" },
  { spec: "Project Management", entry: "₹5–8 L", mid: "₹10–18 L", senior: "₹20–38 L", lead: "₹38–62 L", slug: "project-management" },
  { spec: "Banking & Finance Management", entry: "₹4.5–7.5 L", mid: "₹9–17 L", senior: "₹18–32 L", lead: "₹32–55 L", slug: "banking-finance" },
  { spec: "HR Management", entry: "₹4–7 L", mid: "₹8–15 L", senior: "₹18–32 L", lead: "₹32–55 L", slug: "hr" },
  { spec: "International Business Management", entry: "₹4–7 L", mid: "₹8–15 L", senior: "₹17–32 L", lead: "₹32–55 L", slug: "international-business" },
  { spec: "Retail Management", entry: "₹4–7 L", mid: "₹8–16 L", senior: "₹18–34 L", lead: "₹34–58 L", slug: "retail" },
];

const ENTRY_RANKING = [
  { rank: "1", spec: "Business Analytics", range: "₹6–10 L" },
  { rank: "1", spec: "IT & Systems Management", range: "₹6–10 L" },
  { rank: "3", spec: "Digital Marketing", range: "₹5–9 L" },
  { rank: "3", spec: "Finance Management", range: "₹5–9 L" },
  { rank: "3", spec: "Supply Chain Management", range: "₹5–9 L" },
];

const LEADERSHIP_RANKING = [
  { rank: "1", spec: "Finance Management", range: "₹42–75 L" },
  { rank: "1", spec: "IT & Systems Management", range: "₹42–75 L" },
  { rank: "3", spec: "Business Analytics", range: "₹42–70 L" },
  { rank: "4", spec: "Supply Chain Management", range: "₹40–68 L" },
  { rank: "5", spec: "Digital Marketing", range: "₹38–65 L" },
  { rank: "5", spec: "Operations Management", range: "₹38–65 L" },
];

const GROWTH_TRAJECTORIES = [
  {
    spec: "Operations Management",
    detail: "Manufacturing engineers moving into management report median progression from ₹6 lakh to ₹18 lakh over 4 years.",
    slug: "operations",
  },
  {
    spec: "IT & Systems Management",
    detail: "Software engineers moving into technical management or product roles report median progression from ₹18 lakh to ₹28 lakh over 24 months, with 65% of tracked engineers making this transition.",
    slug: "it-systems",
  },
  {
    spec: "Digital Marketing",
    detail: "Growth Marketing roles at Series B–C startups report progression from ₹10 lakh to ₹28 lakh over 36 months.",
    slug: "digital-marketing",
  },
  {
    spec: "HR Management",
    detail: "The HRBP career path specifically reports 45–55% salary progression over 3 years, versus 22–30% for pure operational HR roles.",
    slug: "hr",
  },
  {
    spec: "Project Management",
    detail: "Transitioning from Project Manager to Program Manager reports roughly 35% higher pay within 24 months of the transition.",
    slug: "project-management",
  },
];

const EXECUTIVE_PREMIUM = [
  { spec: "Finance Management", online: "₹42–75 L", executive: "₹75 L – ₹1.5 Cr", premium: "~1.9×" },
  { spec: "IT & Systems Management", online: "₹42–75 L", executive: "₹75 L – ₹1.5 Cr", premium: "~1.9×" },
  { spec: "Business Analytics", online: "₹42–70 L", executive: "₹75 L – ₹1.5 Cr", premium: "~2.0×" },
  { spec: "Supply Chain Management", online: "₹40–68 L", executive: "₹68 L – ₹1.2 Cr", premium: "~1.8×" },
  { spec: "Operations Management", online: "₹38–65 L", executive: "₹65 L – ₹1.2 Cr", premium: "~1.8×" },
  { spec: "HR Management", online: "₹32–55 L", executive: "₹55 L – ₹1 Cr", premium: "~1.8×" },
  { spec: "Banking & Finance Management", online: "₹32–55 L", executive: "₹55 L – ₹1 Cr", premium: "~1.8×" },
];

const EMPLOYER_TYPES = [
  {
    type: "D2C / consumer tech / quick commerce",
    positioning: "25–45% above traditional employers",
    notes: "Often includes meaningful ESOP upside; higher variance",
  },
  {
    type: "Product companies (Microsoft, Amazon, Google-tier)",
    positioning: "30–70% above IT services for equivalent titles",
    notes: "RSU components frequently exceed base salary at senior levels",
  },
  {
    type: "Consulting (Big-4, MBB)",
    positioning: "Highest at senior/principal levels",
    notes: "Entry access is brand-gated, typically requiring Executive MBA at Tier-1",
  },
  {
    type: "BFSI / public-sector banks",
    positioning: "Steady, moderate",
    notes: "Strong stability; sector-specific bonus structures",
  },
  {
    type: "IT services (TCS, Infosys, Wipro-tier)",
    positioning: "Conservative, steady",
    notes: "Largest employer volume; lower variance than product companies",
  },
  {
    type: "Manufacturing majors (TATA, Mahindra, Reliance-tier)",
    positioning: "Steady, stability-focused",
    notes: "Slower but very predictable progression",
  },
];

const HOWTO_STEPS = [
  {
    step: 1,
    title: "Find your specialization's band in the complete salary table",
    body: "Identify your specific experience band (entry, mid, senior, or leadership), not the specialization's full range, which spans a 15-year career.",
  },
  {
    step: 2,
    title: "Identify your employer's type from the employer-type section",
    body: "D2C, product-tech, consulting, BFSI, IT services, or manufacturing: this typically moves your expected salary more than the specialization band itself.",
  },
  {
    step: 3,
    title: "Adjust for your city using the directional city tiers",
    body: "A metro offer should be benchmarked against metro data; a Tier-2 offer against Tier-2 expectations, as comparing across tiers without adjustment produces a misleading read.",
  },
  {
    step: 4,
    title: "Check whether your offer sits below, at, or above the resulting band",
    body: "If it's below the 25th percentile for your specific experience band, employer type, and city combination, you have a specific, data-backed basis for a counter-offer conversation.",
  },
  {
    step: 5,
    title: "Ask for the full compensation breakdown, not just base",
    body: "Especially at product companies and D2C brands, RSUs or ESOPs can materially change total compensation; a lower base with meaningful equity can outperform a higher all-cash offer over 3–5 years, or vice versa if the equity is illiquid or high-risk.",
  },
  {
    step: 6,
    title: "Bring the specific comparison, not just a general 'I think I deserve more'",
    body: "\"Based on CollegeNCourses' 2025–26 salary data, [specialization] professionals with [X years] at [employer type] companies typically earn ₹[Y]–₹[Z] lakh\" is a concrete, defensible opening line; vague requests are easier to deflect than specific, sourced ones.",
  },
];

const SCENARIOS = [
  {
    name: "Aditi",
    initial: "A",
    age: 28,
    role: "Business Analyst offer from a Bangalore product company",
    background: "Completed an Online MBA in Business Analytics. Received an offer of ₹9 LPA from a mid-stage SaaS product company in Bangalore, her first offer post-graduation.",
    action: "Used the Business Analytics entry-level band (₹6–10 L) alongside the product-company positioning (30–70% above IT services) to confirm her offer sat roughly at the median for a product company specifically, not merely 'within range' for the specialization broadly.",
    outcome: "Negotiated the offer up to ₹10.5 LPA by referencing the product-company-specific band rather than the specialization's general range, and by requesting the full RSU breakdown, which the initial offer had not clearly itemised.",
    type: "success",
  },
  {
    name: "Rohan",
    initial: "R",
    age: 34,
    role: "Operations Manager offer after transitioning from manufacturing engineering",
    background: "Completed an Online MBA in Operations Management after 8 years as a manufacturing engineer earning ₹7.5 LPA. Received an internal offer for a Plant Operations Manager role at ₹13 LPA.",
    action: "Checked his offer against the documented Operations Management transition pattern (₹6 L to ₹18 L over 4 years) and realised his ₹13 LPA fell meaningfully below the trajectory typical alumni were reporting at his experience stage.",
    outcome: "Raised the comparison directly with his employer's HR team, citing the specific transition data, and the offer was revised to ₹15.5 LPA after a follow-up conversation.",
    type: "success",
  },
  {
    name: "Sanjana",
    initial: "S",
    age: 31,
    role: "Comparing an Executive MBA investment against her current Online MBA plan",
    background: "Already enrolled in an Online MBA in Finance Management, considering whether to switch to a ₹22 lakh Executive MBA at a Tier-1 institute instead, specifically for a Big-4 consulting reset.",
    action: "Used the Executive premium table to see that Finance Management's Executive leadership-level band (₹75 L–1.5 Cr) genuinely justified the cost if the Big-4 consulting reset was a realistic, specific goal, and confirmed with target firms' recruiting pages that entry was realistically Executive-MBA-gated for the practice she wanted.",
    outcome: "Proceeded with the Executive MBA switch, financed via education loan with the Section 80E tax benefit factored in (per our Fee Guide), and secured a Senior Consultant offer at a Big-4 firm's finance advisory practice within 4 months of graduation.",
    type: "success",
  },
];

const FAQS: { q: string; a: string; voice?: boolean }[] = [
  {
    q: "Which MBA specialization pays the highest salary in India?",
    a: "It depends on career stage. Business Analytics and IT & Systems Management pay highest at entry level (₹6–10 lakh). Finance Management and IT & Systems Management pay highest at leadership level (₹42–75 lakh), reflecting CFO and CIO/CTO track ceilings. See the full ranking in the career-stage section.",
  },
  {
    q: "What is the salary difference between Online MBA and Executive MBA?",
    a: "Executive MBA delivers roughly 1.8–2x the leadership-level salary of an Online MBA in the same specialization, but costs 8–15 times more upfront. Finance Management and IT & Systems Management show the widest Executive premiums. Full comparison table in the Executive premium section.",
  },
  {
    q: "Does employer type matter more than specialization for MBA salary?",
    a: "Often, yes. D2C brands, quick commerce, and product-tech companies pay 25–45% above traditional employers for comparable roles regardless of specialization, while IT services and legacy manufacturing pay conservatively. The employer-type section has the full comparison.",
  },
  {
    q: "What is the lowest-paying MBA specialization?",
    a: "HR Management, International Business Management, and Retail Management post the lowest entry-level salaries among the 12 specializations we track, at ₹4–7 lakh. This doesn't mean these are poor career choices; HR and International Business have strong leadership-level ceilings (₹32–55 lakh) that partially close the gap by mid-to-senior career.",
  },
  {
    q: "Which specialization has the fastest salary growth?",
    a: "Operations Management shows the single sharpest documented transition: manufacturing engineers moving into management report median progression from ₹6 lakh to ₹18 lakh over 4 years. IT & Systems Management and Digital Marketing show comparably steep transitions. Full detail in the growth trajectory section.",
  },
  {
    q: "How much does salary vary by city for MBA graduates?",
    a: "Bangalore, Mumbai, and Delhi-NCR post the highest absolute salaries. Pune, Hyderabad, and Chennai typically run 10–20% below those three metros for comparable roles. Tier-2 cities typically run 25–40% below metro figures, though cost-of-living-adjusted purchasing power can be comparable.",
  },
  {
    q: "Is CTC the same as take-home salary?",
    a: "No. CTC (Cost to Company) includes employer PF contributions, insurance, and other non-cash components. Take-home pay is meaningfully lower than the headline CTC figure. Always ask for a clear breakdown when comparing offers or reported salary figures.",
  },
  {
    q: "How was this salary data collected?",
    a: "Every figure is sourced from CollegeNCourses internal alumni tracking (3,842 salary outcomes analysed across all 12 specializations, 2023–25), cross-referenced with AmbitionBox, Naukri JobSpeak, and LinkedIn Salary India data. Full methodology in the methodology section.",
  },
  {
    q: "Should I choose my MBA specialization based purely on salary data?",
    a: "No. Salary data should inform your decision, not be the sole basis for it. A strong-fit aspirant in a 'lower-paying' specialization typically compounds better over a career than a mismatched aspirant chasing the highest number. See the honest reasoning section.",
  },
  {
    q: "How can I use this data to negotiate my job offer?",
    a: "Identify your specialization's experience-band salary in the complete table, adjust for your specific employer type, adjust for your city, then compare your actual offer against that specific combination, not the specialization's overall range. Full 6-step framework in the negotiation section.",
  },
  {
    q: "Do Business Analytics and IT & Systems Management really pay the same at entry level?",
    a: "Both post directionally similar entry-level bands (₹6–10 lakh) in our tracking, reflecting comparable demand for quantitative and technical-management skills at entry level. Their trajectories diverge more at senior and leadership levels; see the career-stage ranking section for the fuller picture.",
  },
  {
    q: "What is the highest MBA salary achievable in India?",
    a: "At the very top of the range (CFO, CIO/CTO, or Chief Supply Chain Officer roles at large Indian conglomerates or MNCs), total compensation (including RSUs and bonuses) can exceed ₹1.5 crore. These are top-5% outcomes at 15+ years' experience, not typical or median figures.",
  },
  {
    q: "Which MBA specialization has the highest salary?",
    a: "Business Analytics and IT & Systems Management have the highest entry-level salaries in India in 2025–26, at ₹6–10 lakh. Finance Management and IT & Systems Management have the highest leadership-level ceilings, reaching ₹42–75 lakh.",
    voice: true,
  },
  {
    q: "How much salary increase after online MBA?",
    a: "Median salary increase after an Online MBA varies by specialization and prior experience, typically ranging from a 30% jump for working professionals seeking promotion to over 80% for career-switchers moving into a new function. See each specific specialization guide for detailed before-and-after figures.",
    voice: true,
  },
  {
    q: "What is the average salary after MBA in India 2025?",
    a: "Average post-MBA salary in India in 2025–26 varies significantly by specialization, mode, and experience, ranging from roughly ₹4–10 lakh at entry level to ₹32–75 lakh at leadership level across the 12 specializations CollegeNCourses tracks. See the complete salary table for the full breakdown.",
    voice: true,
  },
  {
    q: "How does CollegeNCourses help me understand my specific salary potential?",
    a: "Our counsellors walk through your specific specialization, target employer type, and city to give you a realistic benchmark, and help you use that benchmark in an actual offer negotiation if you already have one. Free 30-minute call. No paid referral affects our recommendation.",
  },
];

const RELATED = [
  { title: "Distance vs Online vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "Is Online MBA Valid for Government Jobs in India?", href: "/resources/online-mba-valid-government-jobs/" },
  { title: "MBA in Business Analytics: The Honest Guide", href: "/specializations-guide/business-analytics/" },
  { title: "MBA in Finance Management: The Honest Guide", href: "/specializations-guide/finance/" },
];

export default function SalaryReportClient() {
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
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <>
      <style>{`
        .sr-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}
        .sr-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .sr-breadcrumb a{color:var(--grey)}.sr-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .sr-breadcrumb .sep{color:var(--pale-navy)}.sr-breadcrumb .cur{color:var(--navy);font-weight:500}
        .sr-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .sr-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .sr-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .sr-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .sr-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .sr-trust .stars{color:var(--yellow);letter-spacing:1px}.sr-trust .dot{color:var(--pale-navy)}
        .sr-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .sr-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center;text-decoration:none}
        .sr-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .sr-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .sr-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .sr-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .sr-caption{font-size:12px;color:var(--grey);font-style:italic}
        .sr-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.sr-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}
        .sr-toc-sidebar{display:none}
        @media(min-width:1024px){
          .sr-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .sr-toc-sidebar h4{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .sr-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .sr-toc-sidebar li{margin:0}
          .sr-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s;text-decoration:none}
          .sr-toc-sidebar a:hover{color:var(--navy)}
          .sr-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }
        .sr-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .sr-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .sr-toc-mobile summary::-webkit-details-marker{display:none}
        .sr-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .sr-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .sr-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .sr-toc-mobile li{padding:6px 0}
        .sr-toc-mobile a{color:var(--charcoal);font-size:14px;text-decoration:none}
        .sr-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.sr-toc-mobile{display:none}}
        .sr-body{max-width:860px}
        .sr-body section{scroll-margin-top:90px}
        .sr-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .sr-body h2:first-child{margin-top:0}
        .sr-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .sr-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .sr-body p:last-child{margin-bottom:0}
        .sr-body a{color:var(--navy);border-bottom:1px solid var(--yellow);text-decoration:none}
        .sr-body a:hover{background:var(--yellow)}
        .sr-body strong{color:var(--navy);font-weight:700}
        .sr-body ul{list-style:none;margin:0 0 16px;padding:0}
        .sr-body ul li{position:relative;padding-left:20px;margin-bottom:10px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .sr-body ul li::before{content:'';position:absolute;left:0;top:9px;width:8px;height:8px;background:var(--yellow);border-radius:50%}
        .sr-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .sr-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%;flex-shrink:0}
        .sr-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .sr-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .sr-takeaways ul{list-style:none;margin:0}.sr-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .sr-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .sr-takeaways li:last-child{margin-bottom:0}
        .sr-quick-card{background:var(--white);border:2px solid var(--yellow);border-radius:14px;padding:24px;margin:24px 0;box-shadow:0 4px 14px rgba(36,48,72,.10)}
        .sr-ranking-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:640px){.sr-ranking-grid{grid-template-columns:1fr 1fr}}
        .sr-ranking-card{background:var(--white);border:1px solid var(--mist);border-radius:10px;overflow:hidden}
        .sr-ranking-card-head{background:var(--navy);color:var(--yellow);padding:14px 18px;font-family:var(--font-serif);font-size:17px;font-weight:700}
        .sr-ranking-card-body{padding:16px 18px}
        .sr-ranking-row{display:grid;grid-template-columns:28px 1fr auto;gap:8px;padding:10px 0;border-bottom:1px dashed var(--mist);align-items:center;font-size:14px}
        .sr-ranking-row:last-child{border-bottom:none}
        .sr-rank-num{font-family:var(--font-serif);font-size:18px;font-weight:700;color:var(--yellow);text-align:center}
        .sr-rank-spec{color:var(--charcoal);font-weight:500}
        .sr-rank-range{font-family:monospace;font-size:13px;color:var(--navy);font-weight:700;white-space:nowrap;font-variant-numeric:tabular-nums}
        .sr-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .sr-table{width:100%;border-collapse:collapse;font-size:14px;min-width:700px}
        .sr-table thead{background:var(--navy);color:var(--yellow)}
        .sr-table th{text-align:left;padding:14px 16px;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle}
        .sr-table td{padding:14px 16px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.5;font-variant-numeric:tabular-nums}
        .sr-table tbody tr:hover{background:var(--ivory)}
        .sr-table .sr-spec-col{color:var(--navy);font-weight:600}
        .sr-table .sr-premium-col{color:var(--navy);font-weight:700;font-style:italic}
        .sr-table .sr-guide-link{color:var(--navy);font-size:12px;white-space:nowrap;border-bottom:1px solid var(--yellow);text-decoration:none}
        .sr-table .sr-guide-link:hover{background:var(--yellow)}
        .sr-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .sr-callout-label{display:block;font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .sr-callout-navy{background:var(--pale-navy)}
        .sr-trajectories{display:flex;flex-direction:column;gap:16px;margin:24px 0}
        .sr-trajectory{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;display:flex;gap:16px;align-items:flex-start}
        .sr-trajectory-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .sr-trajectory-body h4{font-family:var(--font-serif);color:var(--navy);font-size:18px;margin-bottom:6px;line-height:1.25}
        .sr-trajectory-body p{font-size:14px;line-height:1.6;margin:0;color:var(--charcoal)}
        .sr-trajectory-body a{color:var(--navy);font-size:12px;font-weight:600;border-bottom:1px solid var(--yellow);text-decoration:none;display:inline-block;margin-top:6px}
        .sr-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .sr-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .sr-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .sr-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:19px;margin-bottom:8px;margin-top:0;line-height:1.25}
        .sr-step-body p{font-size:15px;line-height:1.65;margin:0;color:var(--charcoal)}
        .sr-city-grid{display:grid;grid-template-columns:1fr;gap:14px;margin:24px 0}
        @media(min-width:640px){.sr-city-grid{grid-template-columns:repeat(3,1fr)}}
        .sr-city-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;border-top:4px solid var(--yellow)}
        .sr-city-card h4{font-family:var(--font-serif);color:var(--navy);font-size:16px;margin-bottom:8px;line-height:1.3}
        .sr-city-card p{font-size:14px;line-height:1.6;color:var(--charcoal);margin:0}
        .sr-methodology-box{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0}
        .sr-methodology-box h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:12px;line-height:1.25}
        .sr-methodology-box ul{list-style:none;margin:0;padding:0}
        .sr-methodology-box li{position:relative;padding-left:20px;margin-bottom:10px;font-size:14px;line-height:1.6;color:var(--charcoal)}
        .sr-methodology-box li::before{content:'';position:absolute;left:0;top:8px;width:8px;height:8px;background:var(--navy);border-radius:50%}
        .sr-red-flags{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .sr-red-flag{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start}
        .sr-red-icon{flex:0 0 28px;width:28px;height:28px;background:#FDEAEA;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px}
        .sr-red-body{font-size:15px;line-height:1.6;color:var(--charcoal)}
        .sr-red-body strong{color:var(--navy);display:block;margin-bottom:4px}
        .sr-scenarios{display:grid;grid-template-columns:1fr;gap:24px;margin:24px 0}
        .sr-scenario{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .sr-scenario-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .sr-scenario-avatar{flex:0 0 56px;width:56px;height:56px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:28px;font-weight:700;border:3px solid var(--yellow)}
        .sr-scenario-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:20px;margin-bottom:4px;line-height:1.2}
        .sr-scenario-meta p{color:var(--pale-navy);font-size:13px;margin:0}
        .sr-scenario-body{padding:24px}
        .sr-scenario-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .sr-scenario-row:last-child{border-bottom:none}
        .sr-scenario-row-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .sr-scenario-row p{font-size:14px;line-height:1.6;margin:0}
        .sr-scenario-outcome{background:#E8F5EA;padding:12px 16px;border-left:3px solid #2A7A3A;border-radius:0 8px 8px 0;margin-top:8px}
        .sr-scenario-outcome strong{color:#2A7A3A}
        .sr-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .sr-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .sr-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .sr-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .sr-faq-q::-webkit-details-marker{display:none}
        .sr-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .sr-faq-item[open] .sr-faq-icon{transform:rotate(45deg)}
        .sr-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .sr-voice-badge{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}
        .sr-lead-magnet{background:var(--navy);color:var(--ivory);border-radius:14px;padding:40px 32px;margin:48px 0;border:3px solid var(--yellow);position:relative}
        .sr-lead-badge{position:absolute;top:-12px;left:24px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:4px}
        .sr-lead-magnet h2{color:var(--ivory) !important;font-size:clamp(22px,3vw,28px) !important;margin-top:0 !important;margin-bottom:12px !important}
        .sr-lead-lead{color:var(--pale-navy);font-size:15px;line-height:1.6;margin-bottom:24px}
        .sr-lm-form{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.sr-lm-form{grid-template-columns:1fr 1fr}.sr-lm-full{grid-column:1/-1}}
        .sr-lm-field{display:flex;flex-direction:column}
        .sr-lm-field label{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--pale-navy);margin-bottom:6px}
        .sr-lm-field label .req{color:var(--yellow);margin-left:3px}
        .sr-lm-field input,.sr-lm-field select{background:rgba(255,255,255,.08);border:1px solid rgba(214,219,237,.3);border-radius:8px;padding:12px 14px;color:var(--ivory);font-size:15px;transition:border-color .15s,background .15s;font-family:inherit}
        .sr-lm-field input:focus,.sr-lm-field select:focus{outline:none;background:rgba(255,255,255,.14);border-color:var(--yellow)}
        .sr-lm-field input::placeholder{color:rgba(214,219,237,.5)}
        .sr-lm-field select{appearance:none;-webkit-appearance:none;padding-right:40px}
        .sr-lm-field select option{background:var(--navy);color:var(--ivory)}
        .sr-lm-consent{font-size:12px;color:var(--pale-navy);line-height:1.55;margin:16px 0}
        .sr-lm-submit{background:var(--yellow);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:800;font-size:15px;box-shadow:0 4px 16px rgba(36,48,72,.22);border:none;cursor:pointer;transition:transform .15s;width:100%}
        @media(min-width:640px){.sr-lm-submit{width:auto}}
        .sr-lm-submit:hover{transform:translateY(-2px)}
        .sr-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.sr-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.sr-related-grid{grid-template-columns:repeat(3,1fr)}}
        .sr-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal);text-decoration:none}
        .sr-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .sr-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-family:var(--font-serif);font-size:16px}
        .sr-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}
        .sr-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .sr-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .sr-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .sr-author-row:last-child{border-bottom:none}
        .sr-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .sr-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .sr-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}
        .sr-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px;line-height:1.7}
        .sr-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .sr-sources ul{list-style:none;margin:0 0 12px !important;padding:0}
        .sr-sources li{padding:4px 0;color:var(--charcoal)}
        .sr-sources a{color:var(--navy);border-bottom:1px dotted var(--navy);text-decoration:none}
        .sr-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .sr-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .sr-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .sr-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .sr-btn-navy{background:var(--navy);color:var(--yellow) !important}
        .sr-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px;text-decoration:none}
      `}</style>

      <div ref={progressRef} className="sr-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="sr-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span className="sep">›</span>
          <a href="/resources">Resources</a><span className="sep">›</span>
          <span className="cur">2025-26 Online MBA Salary Report</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="sr-hero">
        <div className="container">
          <span className="sr-eyebrow">Resource Guide • 2025-26 Edition</span>
          <h1>The 2025-26 Online MBA salary report: all 12 specializations compared</h1>
          <p className="sr-subtitle">
            Entry to leadership salary, the Executive MBA premium, and what actually moves your offer. Built from 3,842 alumni salary outcomes tracked across all 12 specializations we cover.
          </p>
          <div className="sr-trust">
            <span className="stars">★★★★★</span>
            <span>4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed since 2019</span>
            <span className="dot">•</span>
            <span>150+ verified universities</span>
          </div>
          <div className="sr-cta-row">
            <button className="sr-btn sr-btn-primary" onClick={() => setModalOpen(true)}>
              Get a free salary benchmark for your target role →
            </button>
            <a href="#pdf-download" className="sr-btn sr-btn-outline">
              Download the PDF version →
            </a>
          </div>
          <p className="sr-caption">
            Last verified: December 2025, cross-referenced with AmbitionBox, Naukri JobSpeak, and LinkedIn Salary India Q3 2025 data, and consistent with all 12 CollegeNCourses specialization guides.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="sr-layout">

          {/* Desktop TOC sidebar */}
          <aside className="sr-toc-sidebar" aria-label="Table of contents">
            <h4>On this page</h4>
            <ol>
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? "active" : ""}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Body */}
          <div className="sr-body">

            {/* Mobile TOC */}
            <details className="sr-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Section 2: Key Takeaways */}
            <section id="takeaways">
              <div className="sr-takeaways">
                <h2>Key takeaways</h2>
                <ul>
                  {TAKEAWAYS.map((t, i) => (
                    <li key={i}>
                      <strong>{t.label}.</strong> {t.text}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3: Quick Answer */}
            <section id="quick-answer">
              <h2>If you only need the ranking, here it is</h2>
              <p>
                Business Analytics and IT &amp; Systems Management post the highest entry-level salaries among the 12 specializations, at ₹6.5–10 lakh, while HR and Retail Management post the lowest, at ₹4–7 lakh. At leadership level, Finance Management and IT &amp; Systems Management lead, reflecting CFO and CIO track ceilings.
              </p>
              <div className="sr-quick-card">
                <div className="sr-ranking-grid">
                  <div className="sr-ranking-card">
                    <div className="sr-ranking-card-head">Highest paying: entry level (0–2 yrs)</div>
                    <div className="sr-ranking-card-body">
                      {ENTRY_RANKING.map((r, i) => (
                        <div key={i} className="sr-ranking-row">
                          <span className="sr-rank-num">{r.rank}</span>
                          <span className="sr-rank-spec">{r.spec}</span>
                          <span className="sr-rank-range">{r.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sr-ranking-card">
                    <div className="sr-ranking-card-head">Highest paying: leadership level (15+ yrs)</div>
                    <div className="sr-ranking-card-body">
                      {LEADERSHIP_RANKING.map((r, i) => (
                        <div key={i} className="sr-ranking-row">
                          <span className="sr-rank-num">{r.rank}</span>
                          <span className="sr-rank-spec">{r.spec}</span>
                          <span className="sr-rank-range">{r.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="sr-caption" style={{ marginTop: 12 }}>
                  Full 12-specialization table below. Career-stage-specific rankings in the next section.
                </p>
              </div>
            </section>

            {/* Section 4: Complete Salary Table */}
            <section id="salary-table">
              <h2>Every specialization, every career stage, side by side</h2>
              <span className="sr-freshness">
                Cross-referenced with AmbitionBox, Naukri JobSpeak, and LinkedIn Salary India Dataset Q3 2025, and consistent with the salary data published in each linked specialization guide.
              </span>
              <p>
                Median 2025-26 salaries for Online and Distance MBA graduates range from ₹4 lakh to ₹10 lakh at entry level across the 12 specializations CollegeNCourses covers, widening to ₹32–75 lakh at leadership level. The gap between specializations is modest early in a career and compounds significantly by year 15.
              </p>
              <div className="sr-table-wrap">
                <table className="sr-table">
                  <thead>
                    <tr>
                      <th>Specialization</th>
                      <th>Entry (0–2 yrs)</th>
                      <th>Mid (3–7 yrs)</th>
                      <th>Senior (8–15 yrs)</th>
                      <th>Leadership (15+ yrs)</th>
                      <th>Full guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_TABLE.map((row, i) => (
                      <tr key={i}>
                        <td className="sr-spec-col">{row.spec}</td>
                        <td>{row.entry}</td>
                        <td>{row.mid}</td>
                        <td>{row.senior}</td>
                        <td><strong>{row.lead}</strong></td>
                        <td>
                          <a className="sr-guide-link" href={`/specializations-guide/${row.slug}/`}>
                            Read guide →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sr-caption">
                As of 2025-26. Bands represent 25th–75th percentile for Online/Distance MBA graduates. For Executive MBA figures by specialization, see the Executive premium section. Each row is sourced directly from that specialization's own guide.
              </p>
              <div className="sr-callout">
                <span className="sr-callout-label">Why this table sorts by entry-level salary, not leadership-level</span>
                Most aspirants comparing specializations are early in their decision process and want to know what changes first: the leadership-level ranking, which tells a meaningfully different story, is in the next section.
              </div>
            </section>

            {/* Section 5: Career Stage Rankings */}
            <section id="career-stage">
              <h2>The ranking changes depending on which career stage you&apos;re planning for</h2>
              <p>
                The specialization that pays best at entry level isn&apos;t always the one that pays best at leadership level. Business Analytics and IT &amp; Systems Management lead early; Finance Management catches up and overtakes by leadership level, driven by the CFO track ceiling covered in our <a href="/specializations-guide/finance/">Finance Management guide</a>.
              </p>
              <div className="sr-ranking-grid">
                <div className="sr-ranking-card">
                  <div className="sr-ranking-card-head">Top 5 at entry level (0–2 years)</div>
                  <div className="sr-ranking-card-body">
                    {ENTRY_RANKING.map((r, i) => (
                      <div key={i} className="sr-ranking-row">
                        <span className="sr-rank-num">{r.rank}</span>
                        <span className="sr-rank-spec">{r.spec}</span>
                        <span className="sr-rank-range">{r.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sr-ranking-card">
                  <div className="sr-ranking-card-head">Top 5 at leadership level (15+ years)</div>
                  <div className="sr-ranking-card-body">
                    {LEADERSHIP_RANKING.map((r, i) => (
                      <div key={i} className="sr-ranking-row">
                        <span className="sr-rank-num">{r.rank}</span>
                        <span className="sr-rank-spec">{r.spec}</span>
                        <span className="sr-rank-range">{r.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sr-callout sr-callout-navy">
                <span className="sr-callout-label">Counsellor observation</span>
                From our counselling records across all 12 specializations: aspirants who choose purely on the entry-level number sometimes overlook that Finance Management (which starts in the middle of the pack, not the top) has the single highest leadership-level ceiling of any specialization we track. If you&apos;re planning a 15–20 year career horizon rather than optimising for your first job offer, the entry-level ranking in isolation can be genuinely misleading. (CollegeNCourses Senior Counsellor Desk)
              </div>
            </section>

            {/* Section 6: Growth Trajectory */}
            <section id="growth-trajectory">
              <h2>Beyond the salary band: which transitions compound fastest</h2>
              <p>
                Operations Management delivers the sharpest documented career transition, with manufacturing engineers reporting median jumps from ₹6 lakh to ₹18 lakh over four years. IT &amp; Systems Management and Digital Marketing follow closely, both driven by engineers and marketers moving from technical execution into management or growth roles.
              </p>
              <p>
                A salary <em>band</em> tells you where people land; a growth <em>trajectory</em> tells you how fast a specific transition compounds. These are the five sharpest documented trajectories across our 12 specialization guides:
              </p>
              <div className="sr-trajectories">
                {GROWTH_TRAJECTORIES.map((t, i) => (
                  <div key={i} className="sr-trajectory">
                    <div className="sr-trajectory-num">{i + 1}</div>
                    <div className="sr-trajectory-body">
                      <h4>{t.spec}</h4>
                      <p>{t.detail}</p>
                      <a href={`/specializations-guide/${t.slug}/`}>Full detail →</a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">Important distinction</span>
                These are specific, named transitions within a specialization, not the specialization&apos;s overall salary band. An Operations Management MBA doesn&apos;t guarantee the ₹6L-to-₹18L jump; that figure describes a specific, common transition (manufacturing engineer to plant/ops management) within the broader specialization. See each linked guide&apos;s &quot;Career Paths&quot; section for the full range of role families.
              </div>
            </section>

            {/* Section 7: Executive Premium */}
            <section id="executive-premium">
              <h2>How much more does Executive actually pay, specialization by specialization</h2>
              <p>
                Executive MBA delivers roughly 1.8–2x the leadership-level salary of an Online or Distance MBA in the same specialization, but costs 8–15 times more upfront. Finance Management and IT &amp; Systems Management show the widest Executive premiums, both driven by Tier-1 consulting and CXO-track placement outcomes.
              </p>
              <div className="sr-table-wrap">
                <table className="sr-table">
                  <thead>
                    <tr>
                      <th>Specialization</th>
                      <th>Online/Distance (leadership)</th>
                      <th>Executive Tier-1 (leadership)</th>
                      <th>Approx. premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXECUTIVE_PREMIUM.map((row, i) => (
                      <tr key={i}>
                        <td className="sr-spec-col">{row.spec}</td>
                        <td>{row.online}</td>
                        <td>{row.executive}</td>
                        <td className="sr-premium-col">{row.premium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sr-caption">
                Premium is a derived calculation (midpoint of Executive Tier-1 leadership band ÷ midpoint of Online/Distance leadership band for the same specialization), not a figure independently published elsewhere, shown for directional comparison only. Full fee comparison is in our <a href="/resources/mba-fee-guide-2025-26/">Fee Guide</a>.
              </p>
              <div className="sr-callout">
                <span className="sr-callout-label">From our Mode Comparison Guide</span>
                Online/Distance MBAs deliver the higher <em>return multiple</em> per rupee spent; Executive MBAs deliver the higher <em>absolute</em> leadership-level income, at substantially higher upfront cost. Neither is universally better: it depends on whether your constraint is available capital or maximum absolute outcome, and whether you have a specific Tier-1 reset opportunity in view.
              </div>
            </section>

            {/* Section 8: Employer Type */}
            <section id="employer-type">
              <h2>The comparison that matters more than specialization choice</h2>
              <p>
                Employer type moves post-MBA salary more than specialization choice does. D2C brands, quick commerce, and product-tech companies pay 25–45% above traditional employers for comparable roles, while IT services and legacy manufacturing pay steadily but conservatively. Consulting firms pay highest at senior levels but are the most brand-gated at entry.
              </p>
              <div className="sr-table-wrap">
                <table className="sr-table">
                  <thead>
                    <tr>
                      <th>Employer type</th>
                      <th>Salary positioning</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EMPLOYER_TYPES.map((row, i) => (
                      <tr key={i}>
                        <td className="sr-spec-col">{row.type}</td>
                        <td>{row.positioning}</td>
                        <td>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sr-caption">
                Compiled from employer-specific observations across all 12 CollegeNCourses specialization guides. See each guide&apos;s &quot;Salary Data&quot; section for specialization-specific employer detail.
              </p>
              <div className="sr-callout sr-callout-navy">
                <span className="sr-callout-label">Counsellor observation</span>
                From our counselling records across all 12 specializations: the single most common benchmarking mistake we see is an aspirant comparing their job offer against a specialization&apos;s overall salary range, when the more useful comparison is against the specific employer-type band their offer actually falls into. A ₹9 LPA offer from a D2C brand and a ₹9 LPA offer from an IT services firm aren&apos;t equally competitive: one is below-median for its employer type, the other is above. The negotiation section walks through exactly how to make this comparison correctly. (CollegeNCourses Senior Counsellor Desk)
              </div>
            </section>

            {/* Section 9: Salary by City */}
            <section id="salary-by-city">
              <h2>Does location change what you&apos;re offered?</h2>
              <p>
                Location affects post-MBA salary meaningfully, though less than employer type does. As a directional pattern across the specializations we track:
              </p>
              <div className="sr-city-grid">
                <div className="sr-city-card">
                  <h4>Bangalore, Mumbai, Delhi-NCR</h4>
                  <p>Highest absolute salaries, driven by concentration of IT/product-tech, BFSI headquarters, D2C brand headquarters, and consulting firm presence.</p>
                </div>
                <div className="sr-city-card">
                  <h4>Pune, Hyderabad, Chennai</h4>
                  <p>Strong second tier, typically 10–20% below the top three metros for comparable roles and employer types.</p>
                </div>
                <div className="sr-city-card">
                  <h4>Tier-2 cities (Jaipur, Indore, Coimbatore, Nagpur…)</h4>
                  <p>Typically 25–40% below metro figures for comparable roles, though cost-of-living-adjusted purchasing power can be comparable or occasionally better.</p>
                </div>
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">A note on granularity</span>
                This is a directional pattern, not a precise city-by-city dataset; we don&apos;t yet have sufficiently granular city-level data across all 12 specializations to publish exact figures per city. If location-specific benchmarking matters for your decision, a counselling call lets us pull the most relevant comparison we have for your specific target city and specialization.
              </div>
            </section>

            {/* Section 10: How to Negotiate */}
            <section id="negotiate-offer">
              <h2>How to use this salary data to negotiate your offer, in 6 steps</h2>
              <p>
                This is the exact framework our counsellors walk through with aspirants who have a live offer in hand and want to know if it&apos;s fair.
              </p>
              <div className="sr-steps">
                {HOWTO_STEPS.map((s) => (
                  <div key={s.step} className="sr-step-card">
                    <div className="sr-step-num">{s.step}</div>
                    <div className="sr-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">Important caveat</span>
                This data is a benchmark, not a guarantee. Individual negotiation outcomes depend on your specific performance, the employer&apos;s budget cycle, and factors this report can&apos;t capture. Use it to ground the conversation in data, not to demand a specific number as if it were owed to you.
              </div>
            </section>

            {/* Section 11: Methodology */}
            <section id="methodology">
              <h2>How these numbers were compiled</h2>
              <p>
                Every figure in the complete salary table is sourced directly from the &quot;Salary Data 2025-26&quot; section of the corresponding CollegeNCourses specialization guide, not recalculated or estimated independently for this report. Each of those 12 guides, in turn, draws on CollegeNCourses internal alumni tracking (3,842 salary outcomes analysed in aggregate across all 12 specializations, 2023–25), cross-referenced with <a href="https://www.ambitionbox.com/" rel="noopener">AmbitionBox</a> salary benchmarks, <a href="https://www.naukri.com/jobspeak" rel="noopener">Naukri.com JobSpeak</a> reports, and the <a href="https://www.linkedin.com/salary/" rel="noopener">LinkedIn Salary India Dataset</a>.
              </p>
              <div className="sr-methodology-box">
                <h3>What this guide adds beyond the 12 individual specialization guides</h3>
                <ul>
                  <li><strong>Cross-specialization ranking:</strong> no individual specialization guide can tell you how it ranks against the other 11.</li>
                  <li><strong>The Executive premium calculation:</strong> a derived analysis explicitly labelled as such, using the underlying published bands as inputs.</li>
                  <li><strong>The employer-type and city syntheses:</strong> patterns that recur across individual guides but aren&apos;t assembled into one comparison anywhere else.</li>
                </ul>
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">What we do NOT do</span>
                We do not adjust any specialization&apos;s figures upward or downward to make a more compelling headline ranking. Every band in the complete salary table matches its source specialization guide exactly. If you cross-check a figure in this report against its linked specialization guide and find a discrepancy, please flag it to our editorial desk; it should not exist, and if it does, it&apos;s an error to correct, not a rounding choice to defend.
              </div>
            </section>

            {/* Section 12: Salary Alone */}
            <section id="salary-alone">
              <h2>The honest answer: no, and here&apos;s why</h2>
              <p>
                We publish this report because salary data is genuinely useful input, but it&apos;s one input, not the whole decision. Every one of our 12 specialization guides includes a &quot;Who This Specialization Does NOT Fit&quot; section for a reason: the highest-paid graduate in a specialization that bores or drains them will very likely underperform, both in wellbeing and in eventual compensation, compared to a strong-fit aspirant in a &quot;lower-paying&quot; specialization who compounds steadily because they&apos;re genuinely good at the work.
              </p>
              <p>
                Consider the entry-to-leadership pattern above: Business Analytics leads early, Finance overtakes by leadership level. If you&apos;re quantitatively inclined but find corporate finance&apos;s decision-making style tedious, chasing Finance&apos;s higher ceiling on salary data alone is a genuine mismatch risk; Business Analytics or a related specialization might compound better for you specifically, even at a technically lower ceiling on paper.
              </p>
              <div className="sr-callout">
                <span className="sr-callout-label">Our honest recommendation</span>
                Use this report to rule out specializations that are financially unworkable for your situation, and to set realistic expectations for the specializations you&apos;re genuinely drawn to, not to rank-order every option purely by the numbers in the salary table. A <a href="/counselling/">counselling call</a> is specifically designed to weigh salary data against fit, interest, and your specific career goal together.
              </div>
            </section>

            {/* Section 13: Red Flags */}
            <section id="red-flags">
              <h2>Salary marketing claims to be sceptical of</h2>
              <p>
                Because salary is such a high-motivation, high-search-intent topic, it attracts overclaiming and misleading framing more than almost any other MBA-decision topic. Watch for these specific patterns.
              </p>
              <div className="sr-red-flags">
                {[
                  {
                    text: (
                      <>
                        <strong>&quot;Guaranteed ₹X LPA package.&quot;</strong>
                        No university or programme can guarantee a specific salary outcome: placement support and career services are legitimate claims; guaranteed compensation figures are not.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        <strong>A single, cherry-picked outlier presented as typical.</strong>
                        &quot;Our alumnus earns ₹80 LPA&quot; may be a genuine, real outcome, and also a 95th-percentile outlier presented without that context. Ask specifically for median or 25th–75th percentile figures, not the single best story.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        <strong>CTC (Cost to Company) presented as take-home pay.</strong>
                        CTC includes employer PF contributions, insurance, and other non-cash components that meaningfully differ from actual monthly take-home: a ₹12 LPA CTC offer is not ₹1 lakh per month in hand.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        <strong>Stipend or training-period pay presented as the ongoing salary.</strong>
                        Some roles, particularly at large consulting and IT services firms, pay a lower stipend during an initial training period before transitioning to the full post-training salary band; confirm which figure you&apos;re being quoted.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        <strong>Salary figures with no stated year or specialization.</strong>
                        A specific, dated, specialization-tagged figure is verifiable and comparable. A vague &quot;MBA graduates earn well&quot; claim is neither.
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="sr-red-flag">
                    <div className="sr-red-icon">✕</div>
                    <div className="sr-red-body">{item.text}</div>
                  </div>
                ))}
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">When in doubt</span>
                If you encounter a salary claim from any source that seems inconsistent with the ranges in this report, <a href="/counselling/">book a counselling call</a> and we&apos;ll help you evaluate it against our underlying data.
              </div>
            </section>

            {/* Section 14: Scenarios */}
            <section id="scenarios">
              <h2>Three real salary-negotiation stories (anonymised)</h2>
              <div className="sr-scenarios">
                {SCENARIOS.map((s, i) => (
                  <div key={i} className="sr-scenario">
                    <div className="sr-scenario-header">
                      <div className="sr-scenario-avatar">{s.initial}</div>
                      <div className="sr-scenario-meta">
                        <h3>{s.name}, {s.age}</h3>
                        <p>{s.role}</p>
                      </div>
                    </div>
                    <div className="sr-scenario-body">
                      <div className="sr-scenario-row">
                        <div className="sr-scenario-row-label">Background</div>
                        <p>{s.background}</p>
                      </div>
                      <div className="sr-scenario-row">
                        <div className="sr-scenario-row-label">What she/he did</div>
                        <p>{s.action}</p>
                      </div>
                      <div className="sr-scenario-row">
                        <div className="sr-scenario-row-label">Outcome</div>
                        <div className="sr-scenario-outcome">
                          <p><strong>Result: </strong>{s.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sr-callout">
                <span className="sr-callout-label">What these three stories illustrate</span>
                The aspirants who used specific, sourced data (not general salary awareness) in their negotiation or decision conversation got measurably better outcomes than a generic &quot;I think I&apos;m underpaid&quot; approach would have produced. This is exactly what the 6-step negotiation framework is built to enable.
              </div>
            </section>

            {/* Section 15: FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="sr-faq-list">
                {FAQS.map((item, i) => (
                  <details key={i} className="sr-faq-item">
                    <summary className="sr-faq-q">
                      <span>
                        {item.q}
                        {item.voice && <span className="sr-voice-badge">Voice search</span>}
                      </span>
                      <span className="sr-faq-icon">+</span>
                    </summary>
                    <div className="sr-faq-a">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Section 16: PDF Download / Lead Magnet */}
            <section id="pdf-download">
              <div className="sr-lead-magnet">
                <span className="sr-lead-badge">Free Download</span>
                <h2>Take this salary report with you</h2>
                <p className="sr-lead-lead">
                  Prefer to keep this offline? Download the full PDF: the complete salary comparison, print-ready and shareable. Includes the 12-specialization table, the Executive premium analysis, the employer-type breakdown, and the 6-step negotiation worksheet.
                </p>
                <div className="sr-lm-form">
                  <div className="sr-lm-field">
                    <label htmlFor="sr-name">Full name <span className="req">*</span></label>
                    <input id="sr-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="sr-lm-field">
                    <label htmlFor="sr-email">Email address <span className="req">*</span></label>
                    <input id="sr-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="sr-lm-field">
                    <label htmlFor="sr-phone">Phone number (optional)</label>
                    <input id="sr-phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="sr-lm-field">
                    <label htmlFor="sr-spec">Target specialization</label>
                    <select id="sr-spec">
                      <option value="">Select specialization</option>
                      <option>Business Analytics</option>
                      <option>IT &amp; Systems Management</option>
                      <option>Digital Marketing</option>
                      <option>Finance Management</option>
                      <option>Supply Chain Management</option>
                      <option>Marketing Management</option>
                      <option>Operations Management</option>
                      <option>Project Management</option>
                      <option>Banking &amp; Finance Management</option>
                      <option>HR Management</option>
                      <option>International Business Management</option>
                      <option>Retail Management</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="sr-lm-field sr-lm-full">
                    <label htmlFor="sr-offer">Do you currently have a job offer to benchmark?</label>
                    <select id="sr-offer">
                      <option value="">Select one</option>
                      <option>Yes: I have a live offer to benchmark</option>
                      <option>No: still deciding on a specialization</option>
                      <option>No: planning ahead for future offers</option>
                    </select>
                  </div>
                </div>
                <p className="sr-lm-consent">
                  By downloading, you agree to receive a follow-up email from a CollegeNCourses counsellor. We do not share your details with any university, employer, or third party. Unsubscribe anytime.
                </p>
                <button className="sr-lm-submit" onClick={() => setModalOpen(true)}>
                  Email me the PDF →
                </button>
              </div>
            </section>

            {/* Section 17: Related Resources */}
            <section>
              <h2>Go deeper</h2>
              <div className="sr-related-grid">
                {RELATED.map((r, i) => (
                  <a key={i} href={r.href} className="sr-related-card">
                    <div className="icon">{i + 1}</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* Section 18: Authors & Sources */}
            <section id="authors">
              <div className="sr-authors">
                <h3>About this guide</h3>
                <div className="sr-author-row">
                  <strong>Written by: CollegeNCourses Editorial Team</strong>
                  <p className="sr-author-role">Content Lead, CollegeNCourses Editorial Desk</p>
                  <p className="sr-author-bio">Leads content strategy for CollegeNCourses and has been writing on Indian higher education since 2020.</p>
                </div>
                <div className="sr-author-row">
                  <strong>Reviewed by: CollegeNCourses Senior Counsellor</strong>
                  <p className="sr-author-role">Senior Counsellor, CollegeNCourses</p>
                  <p className="sr-author-bio">Has advised over 3,000 aspirants on career and compensation planning across Distance, Online, and Executive MBA modes since 2016.</p>
                </div>
                <div className="sr-author-row">
                  <strong>Approved by: Nikhita Pradeep Deshmukh</strong>
                  <p className="sr-author-role">Founder, DNYANAL EDUCON PRIVATE LIMITED</p>
                  <p className="sr-author-bio">Founder of CollegeNCourses.</p>
                </div>
              </div>
              <div className="sr-sources">
                <h4>Sources referenced</h4>
                <ul>
                  <li>
                    <a href="https://www.ambitionbox.com/" rel="noopener">AmbitionBox</a>: Salary Benchmarks Q3 2025
                  </li>
                  <li>
                    <a href="https://www.naukri.com/jobspeak" rel="noopener">Naukri.com JobSpeak Report</a>: October 2025
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/salary/" rel="noopener">LinkedIn Salary India Dataset</a>: 2025
                  </li>
                  <li>
                    CollegeNCourses alumni tracking across all 12 specializations (3,842 salary outcomes analysed in aggregate, 2023–25)
                  </li>
                  <li>
                    Each figure in the complete salary table sourced directly from the &quot;Salary Data 2025-26&quot; section of the corresponding CollegeNCourses specialization guide
                  </li>
                </ul>
                <p style={{ margin: 0, color: "var(--grey)", fontSize: 12 }}>
                  This page is updated every six months, immediately following the refresh of any individual specialization guide&apos;s salary data.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="sr-cta-band">
        <div className="container">
          <h2>Want your specific salary potential benchmarked?</h2>
          <p>
            Talk to a CollegeNCourses counsellor. We&apos;ll walk through your target specialization, employer type, and city, and if you already have an offer, help you build a data-backed negotiation conversation. Free, 30 minutes.
          </p>
          <button className="sr-btn sr-btn-navy" onClick={() => setModalOpen(true)}>
            Book a free counselling call →
          </button>
          <br />
          <a href="/resources/mba-fee-guide-2025-26/" className="sr-cta-secondary">
            Or read our Complete MBA Fee Guide →
          </a>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="salary-report-guide" />
    </>
  );
}
