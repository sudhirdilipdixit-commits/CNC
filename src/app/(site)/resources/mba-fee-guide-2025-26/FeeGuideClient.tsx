"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "fee-ranges", label: "Fee ranges at a glance" },
  { id: "fee-by-mode", label: "Fee breakdown by mode" },
  { id: "fee-by-spec", label: "Fee by specialization" },
  { id: "fee-by-university", label: "Fee by university tier" },
  { id: "hidden-costs", label: "Hidden costs" },
  { id: "emi-financing", label: "EMI and financing" },
  { id: "section-80e", label: "Section 80E tax benefits" },
  { id: "scholarships", label: "Scholarships" },
  { id: "red-flags", label: "Fee red flags" },
  { id: "true-cost-calculator", label: "True-cost calculator (6 steps)" },
  { id: "fee-vs-roi", label: "Fee vs ROI" },
  { id: "scenarios", label: "Aspirant scenarios" },
  { id: "faq", label: "FAQ" },
  { id: "pdf-download", label: "Download the fee sheet" },
  { id: "authors", label: "About this guide" },
];

const TAKEAWAYS = [
  { label: "Advertised fees understate the true cost by Rs 15,000–40,000", text: "Registration fees, semester examination fees, study material fees, and the convocation/certificate fee are often not included in the headline tuition figure. Calculate the all-in total, not just the advertised number." },
  { label: "Distance MBAs are not automatically cheaper than Online MBAs", text: "The lowest-cost branded Online MBAs (Chandigarh University, DY Patil) overlap with the highest-end Distance options (SMU-DE). Mode is not a reliable proxy for total cost." },
  { label: "The 3x fee spread within the top-20 is real but not matched by a 3x outcome difference", text: "An NMIMS Online MBA at Rs 3.75 lakh is not guaranteed to produce outcomes three times better than a Chandigarh University Online MBA at Rs 1.2 lakh. The right fee bracket depends on your specific career target and employer ecosystem." },
  { label: "Interest-free university EMI is widely available and often the best financing option", text: "Most universities in the Rs 1–2.5 lakh range offer interest-free monthly EMI directly, making formal education loans with interest often unnecessary in this bracket." },
  { label: "Section 80E deduction is real and worth calculating", text: "If you do take an education loan for a larger fee, the Section 80E interest deduction from taxable income (no upper limit, for up to 8 years) can materially reduce the effective net cost." },
  { label: "Employer sponsorship is asked for less than 30% of the time", text: "In our counselling records, fewer than 30% of eligible aspirants ask their employer about sponsorship before enrolling. Many employers — particularly PSU banks, large IT firms, and consulting houses — offer 40–100% fee sponsorship against a service commitment." },
];

const MODE_FEE_CARDS = [
  {
    mode: "Distance MBA",
    range: "Rs 0.25–1.5 lakh",
    subrange: "Rs 0.25–0.6L (state/open) | Rs 0.8–1.5L (private branded)",
    namedExample: "IGNOU Rs 0.4L | SMU-DE Rs 0.9L | Annamalai Rs 0.6L",
    hiddenTypical: "Rs 8,000–18,000 (exam fees across 4 semesters)",
    who: "Aspirants primarily targeting government-job eligibility, very low total cost, or self-paced study. State-university Distance MBAs have the most established UGC-DEB track records.",
    platform: "Primarily self-paced; physical or PDF study materials; regional study centre access at some universities.",
  },
  {
    mode: "Online MBA",
    range: "Rs 1.2–3.75 lakh",
    subrange: "Rs 1.2–2.2L (mid-range branded) | Rs 2.5–3.75L (premium)",
    namedExample: "Chandigarh Rs 1.2L | Amity Rs 1.6-2L | NMIMS Rs 2.5-3.75L",
    hiddenTypical: "Rs 12,000–30,000 (exam + tool licences + platform fees, programme-dependent)",
    who: "Working professionals wanting live-session interaction, structured cohort model, stronger private-sector brand recognition. Best concentration of value in Rs 1.5–2.2L bracket.",
    platform: "Live synchronous sessions (weekly or monthly) + LMS library + recorded content + mobile app at most top providers.",
  },
  {
    mode: "Executive MBA",
    range: "Rs 8 lakh–40+ lakh",
    subrange: "Rs 8–15L (EMBA from branded private university) | Rs 20–40+L (IIM/ISB/top-tier)",
    namedExample: "Symbiosis EMBA Rs 8.5L | IIM Ahmedabad PGPX Rs 38+L | ISB PGP Rs 40+L",
    hiddenTypical: "Rs 30,000–1.5 lakh+ (residential modules, international trips, case materials)",
    who: "Senior professionals (8+ years' experience) targeting CXO or senior leadership acceleration. Employer sponsorship or education loan often used. Different ROI calculus from Distance/Online.",
    platform: "Hybrid: residential campus modules (weekend or week-long intensives) + online between sessions.",
  },
];

const FEE_BY_SPEC = [
  { spec: "Marketing Management", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "3.75", notes: "Wide range; NMIMS Marketing at the premium end" },
  { spec: "Digital Marketing", distanceLow: "—", distanceHigh: "—", onlineLow: "1.2", onlineHigh: "1.8", notes: "Primarily Online mode; fewer Distance options" },
  { spec: "Finance Management", distanceLow: "0.3", distanceHigh: "1.5", onlineLow: "1.4", onlineHigh: "3.75", notes: "NMIMS Finance at the top; ICFAI strong at lower fee" },
  { spec: "Banking & Finance", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.5", notes: "SMU-DE and ICFAI strong in this track" },
  { spec: "Business Analytics", distanceLow: "—", distanceHigh: "—", onlineLow: "1.3", onlineHigh: "3.5", notes: "Primarily Online mode; Manipal MAHE and NMIMS lead" },
  { spec: "Human Resource Management", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.5", notes: "Symbiosis SCOL and CU Online strong in HR" },
  { spec: "Operations Management", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.8", notes: "Symbiosis SCOL is the top Online pick for Operations" },
  { spec: "Supply Chain Management", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.8", notes: "LPU Online has one of the few dedicated Online options" },
  { spec: "IT & Systems Management", distanceLow: "—", distanceHigh: "—", onlineLow: "1.3", onlineHigh: "2.8", notes: "Manipal MAHE leads; primarily Online mode" },
  { spec: "Project Management", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.8", notes: "Manipal MAHE and Symbiosis SCOL both offer this" },
  { spec: "International Business", distanceLow: "0.3", distanceHigh: "1.2", onlineLow: "1.2", onlineHigh: "2.2", notes: "Amity Online leads for IB; Jain also strong" },
  { spec: "Healthcare Management", distanceLow: "—", distanceHigh: "—", onlineLow: "1.2", onlineHigh: "1.6", notes: "DY Patil Online; fewer providers in this track" },
];

const HIDDEN_COSTS = [
  { item: "Registration / application fee", typical: "Rs 1,000–3,000", notes: "Paid once at application. Often non-refundable even if you don't join." },
  { item: "Semester examination fees", typical: "Rs 2,000–5,000 per semester × 4", notes: "Most significant hidden cost. Multiply per-semester fee by all 4 semesters. Some universities charge per-paper." },
  { item: "Study material / book pack fee", typical: "Rs 0–15,000 (if not bundled)", notes: "Distance programmes often charge separately. Online MBAs vary — some bundle, some add per-semester." },
  { item: "Software / tool licence fees", typical: "Rs 0–10,000 (specialization-dependent)", notes: "Analytics, IT, and Project Management MBAs may require paid software (e.g. SPSS, MS Project) not bundled in tuition." },
  { item: "Placement cell / alumni membership fee", typical: "Rs 0–5,000", notes: "Some universities charge an annual or one-time fee for placement cell access. Not always disclosed upfront." },
  { item: "Convocation and certificate fee", typical: "Rs 2,000–5,000", notes: "Charged at programme completion, 18-24 months after enrolment. Easy to forget in the initial budget." },
  { item: "Re-exam / back-paper fees", typical: "Rs 500–2,000 per paper", notes: "Contingent cost — not budgeted by most aspirants. Relevant for working professionals with demanding travel schedules." },
];

const EMI_OPTIONS = [
  {
    title: "Direct university EMI (interest-free)",
    who: "Most Online MBA programmes in the Rs 1–2.5 lakh range",
    terms: "Typically 12–24 monthly instalments, zero interest, no processing fee",
    bestFor: "Default option for most aspirants in this fee bracket. No credit check, no documentation beyond admission.",
    watch: "Confirm in writing whether the interest-free period covers the entire programme or only the first year.",
  },
  {
    title: "SBI Education Loan",
    who: "SBI (State Bank of India)",
    terms: "Up to Rs 40 lakh for Distance/Online at eligible institutions; tenure up to 15 years; interest currently ~11.15% p.a.",
    bestFor: "Aspirants targeting a higher-fee EMBA or Online MBA at a UGC-DEB approved institution who cannot fund the fee from savings.",
    watch: "SBI's list of eligible institutions for education loans is separate from UGC-DEB approval — confirm your specific university is on their approved list before applying.",
  },
  {
    title: "HDFC Credila / ICICI Bank education loan",
    who: "Private bank education loan providers",
    terms: "Similar to SBI but often slightly higher rate (11.5–13.5% p.a.); faster processing; some offer pre-admission approval",
    bestFor: "Aspirants who need faster disbursement or whose institution is on the private bank's approved list but not SBI's.",
    watch: "Compare effective rate including processing fee. Some NBFCs add significant upfront fees that raise the effective cost.",
  },
  {
    title: "Employer sponsorship / reimbursement",
    who: "PSU banks, large IT firms, consulting firms, some manufacturing PSUs",
    terms: "40–100% fee coverage against 2–3 year service-back commitment. Sometimes structured as annual salary supplement with conditional clawback.",
    bestFor: "Any aspirant currently employed in an organisation with a tuition reimbursement policy — more common than most aspirants realise.",
    watch: "Get the terms in writing before enrolment. Understand what happens to the benefit if you're made redundant vs. if you resign voluntarily.",
  },
];

const TRUE_COST_STEPS = [
  { step: 1, title: "Start with the total programme tuition, not a per-semester or per-year figure", body: "Ensure you're comparing full-programme cost to full-programme cost across options. A per-semester figure × 4 can look deceptively similar to a per-year figure × 2 that's actually different." },
  { step: 2, title: "Add the registration and application fee", body: "Usually Rs 1,000–3,000, already paid by the time you're deep in comparison, but include it for an accurate total." },
  { step: 3, title: "Add the semester-wise examination fee for the full programme", body: "Call the university's admissions desk or read the fee structure document for the per-semester exam fee. Multiply by 4 (for a 4-semester programme)." },
  { step: 4, title: "Add study material, tool licence, and placement cell fees if not bundled in tuition", body: "Ask the admissions office directly: 'Are study materials bundled in the tuition fee? Is there a separate examination fee? Is there a placement cell fee?' Write the answers down." },
  { step: 5, title: "Add the convocation and certificate fee", body: "Small individually (Rs 2,000–5,000), but charged at completion, 18-24 months after enrolment. Easy to miss in an early-stage budget." },
  { step: 6, title: "If financing, calculate net financing cost after Section 80E tax benefit", body: "For a bank education loan: calculate total interest over the full loan tenure. Estimate annual Section 80E tax saving (interest amount × your marginal tax rate). Subtract estimated total tax saving from total interest to get genuine net financing cost. Add this net financing cost to your all-in fee total." },
];

const SCENARIOS = [
  {
    name: "Ritu",
    initial: "R",
    age: 32,
    role: "Marketing Manager at a Bangalore e-commerce startup",
    background: "5 years of digital marketing experience. Wanted to formalise her management skills and move into a Marketing Director track. Budget: Rs 2 lakh. Employer expressed willingness to discuss, but she hadn't formalised the conversation.",
    approach: "Counsellor recommended she formalise the employer conversation before comparing universities — specifically, to ask her HR team in writing what MBA fee support the company offered. Her employer confirmed a Rs 1 lakh reimbursement against a 2-year service commitment.",
    financingOutcome: "With Rs 1 lakh employer reimbursement, her effective out-of-pocket cost for Amity Online (Rs 1.8 lakh) was Rs 0.8 lakh, paid in 18 interest-free monthly instalments of Rs 4,400.",
    recommendation: "Amity University Online — Marketing specialization",
    type: "success",
  },
  {
    name: "Suresh",
    initial: "S",
    age: 44,
    role: "Senior Operations Manager at a Chennai manufacturing PSU",
    background: "18 years' operations experience. Targeting an EMBA to qualify for a General Manager role. Original shortlist included three EMBA programmes at Rs 12–18 lakh.",
    approach: "Counsellor walked through the true-cost calculation including hidden costs (Rs 1.8 lakh in residential modules, case materials, and platform fees beyond headline tuition) and the Section 80E tax benefit on a bank loan. At his tax bracket (30% marginal rate), the effective post-tax net cost of a bank loan dropped to approximately 7.8% p.a., meaningfully lower than the sticker rate.",
    financingOutcome: "Enrolled in a Rs 14.5 lakh EMBA. Total loan with hidden costs: Rs 16.3 lakh. Estimated Section 80E saving over 8 years: Rs 3.6 lakh. Net effective cost: Rs 12.7 lakh — Rs 3.6 lakh less than he had initially budgeted for.",
    recommendation: "Symbiosis EMBA — Operations and Supply Chain track",
    type: "success",
  },
  {
    name: "Ayesha",
    initial: "A",
    age: 27,
    role: "HR Executive at a Delhi NGO",
    background: "4 years' HR experience. First job in the NGO sector. Budget: 'Whatever I can afford.' Came to counselling after finding a university advertising an Online MBA at Rs 52,000 total — significantly below market rate for the category.",
    approach: "The Rs 52,000 price point triggered a verification check. The programme was offered by an institution that was UGC-recognised in the general sense but did not hold current UGC-DEB approval for an Online MBA programme. The degree would not have carried the legal equivalence discussed in our Government Jobs guide.",
    financingOutcome: "Avoided enrolling in an unapproved programme. Redirected to IGNOU's distance MBA at Rs 0.45 lakh — genuinely the lowest-cost UGC-DEB approved option that met her government-job-eligibility goal, with a 40-year track record.",
    recommendation: "IGNOU Distance MBA — HR specialization",
    type: "caution",
  },
];

const FAQS = [
  { q: "How much does a Distance or Online MBA actually cost in India in 2025-26, including hidden fees?", a: "Total all-in cost, including typical hidden fees, is approximately Rs 0.35–0.75 lakh for state-university Distance MBAs, Rs 0.95–1.7 lakh for private Distance MBAs, Rs 1.35–2.5 lakh for mid-range Online MBAs, and Rs 2.8–4.2 lakh for premium Online MBAs. The advertised tuition figure alone typically understates the true cost by Rs 15,000–40,000." },
  { q: "What hidden costs should I budget for beyond tuition?", a: "The four most commonly missed costs are: registration/application fee (Rs 1,000–3,000), semester examination fees (Rs 8,000–20,000 across the full programme), study material or tool licence fees (Rs 0–25,000, specialization-dependent), and convocation/certificate fee (Rs 2,000–5,000). Total these from the university's own fee structure document before budgeting." },
  { q: "Does the MBA specialization I choose affect the fee?", a: "Only modestly at the Distance and Online level, where fees cluster within a broad range regardless of specialization within a given university. At Executive MBA level, specialization matters significantly because different specializations have different leading institutes with very different fee brackets." },
  { q: "Can I get an education loan for a Distance or Online MBA?", a: "Yes. Standard providers including SBI, HDFC Credila, ICICI Bank, and Avanse extend education loans for UGC-DEB approved Distance and Online MBA programmes. SBI's education loan for Distance/Online higher education covers programmes at UGC-approved institutions. Confirm your specific university is on the lender's approved list — it's separate from UGC-DEB approval." },
  { q: "What is Section 80E and how does it reduce MBA fees?", a: "Section 80E of the Income Tax Act allows a full deduction of interest paid on an education loan from your taxable income, with no upper limit, for up to 8 years. It applies to loans from recognised financial institutions. Only interest is deductible, not principal. If your marginal tax rate is 30%, Section 80E can reduce your effective loan cost by 30% of the interest — a meaningful saving on an EMBA loan." },
  { q: "Are there scholarships available for Distance or Online MBA programmes?", a: "Yes, though less publicised than for full-time residential programmes. Categories include: merit-based waivers (typically 10–25% off tuition for early applicants or high-scoring candidates), need-based concessions (means-tested at some universities), women-in-management scholarships at Symbiosis, Jain, and Amity, and defence/veteran quotas at several universities. Always ask the university's admissions office directly what's available — scholarships are rarely listed prominently on the public website." },
  { q: "Is it cheaper to pay MBA fees upfront or take an education loan?", a: "It depends on your tax bracket and the opportunity cost of your capital. For lower fee brackets (under Rs 2 lakh) where interest-free university EMI is available, financing carries zero extra cost — use the EMI and preserve your cash. For Executive MBA brackets with bank loans, Section 80E can make a loan effective cost lower than its headline rate, sometimes making financing smarter than a lump-sum cash payment if you're in a higher tax bracket with better uses for that capital." },
  { q: "What is the Central Sector Interest Subsidy (CSIS) Scheme?", a: "A Government of India scheme providing interest subsidy during the loan moratorium period on education loans for students from economically weaker sections (parental income below Rs 4.5 lakh per annum). Applies to professional and technical courses at recognised institutions. Eligibility for specific Distance/Online MBA programmes varies by lender — verify directly with your bank." },
  { q: "Will a university increase fees mid-programme?", a: "Legitimate universities specify in the admission offer letter whether fees are fixed for your entire programme duration or subject to annual revision. Always confirm this in writing before you enrol. If the offer letter doesn't address this explicitly, ask directly and get it in writing." },
  { q: "Do I have to pay GST on MBA tuition fees?", a: "No. Core tuition fees for a recognised degree programme offered by an educational institution as defined under Indian GST law are exempt from GST. If you see GST charged on tuition, ask for a detailed fee breakdown and clarification — this is a red flag." },
  { q: "Can my employer pay for my MBA?", a: "Many employers — particularly large public-sector banks, IT services firms, consulting firms, and some large manufacturing PSUs — offer 40–100% fee sponsorship against a 2–3 year service-back commitment. Fewer than 30% of eligible aspirants ask their employer directly before enrolling. It's worth a written email to HR asking about the company's tuition reimbursement policy before committing to any university or financing arrangement." },
  { q: "What is the ROI of a Distance or Online MBA?", a: "In our counselling data, the most consistent return is salary acceleration in a first post-MBA promotion cycle — typically 18–35% increment in that cycle for PSU bank employees, and 15–30% for private-sector employees depending on specialization. The ROI is strongest when the MBA enables a specific, named career outcome (a promotion eligibility threshold, a specialization-track shift) rather than being a general credential exercise." },
  { q: "How much does an online MBA cost in India?", a: "Total all-in cost for an Online MBA in India in 2025-26, including typical hidden fees: Rs 1.35–2.5 lakh for mid-range branded options; Rs 2.8–4.2 lakh for premium (NMIMS). The advertised tuition figure ranges Rs 1.2–3.75 lakh for the top 20 UGC-DEB approved universities." },
  { q: "What is the cheapest online MBA in India?", a: "IGNOU, at approximately Rs 0.4–0.6 lakh all-in, is the most affordable genuinely UGC-DEB approved option (Distance mode). Among branded private Online MBA programmes with live sessions, Chandigarh University Online at Rs 1.2–1.6 lakh is the lowest-cost option in our top-20 list." },
  { q: "How can I reduce the cost of my MBA?", a: "Four levers: (1) Check for merit-based or need-based scholarships directly with the university's admissions office before enrolling. (2) Ask your employer about fee sponsorship or tuition reimbursement in writing, before you commit to any university. (3) Use interest-free university EMI instead of a bank loan where the fee bracket allows. (4) If you take a bank loan, claim the Section 80E interest deduction on your income tax return every year it applies." },
  { q: "Is CollegeNCourses paid by universities or banks to recommend certain options?", a: "No. We do not accept payment from universities, banks, or NBFCs that affects our fee structure, financing, or university recommendations. Counsellor recommendations are based solely on the aspirant's stated goals, budget, and career target." },
];

const RELATED = [
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Is Online MBA Valid for Government Jobs in India? 2025-26", href: "/resources/online-mba-valid-government-jobs/" },
  { title: "Distance vs Online vs Executive MBA: Complete Comparison Guide", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
  { title: "MBA in Finance Management: The Honest Guide", href: "/specializations-guide/finance/" },
  { title: "How to Choose Your MBA Specialization: A Framework", href: "/blogs/how-to-choose-mba-specialization/" },
];

const ROI_TABLE = [
  { profile: "PSU bank employee, Scale I-II", expectedSalaryIncrease: "18–35% in first post-MBA promotion cycle", timeToROI: "1–2 years post-graduation", notes: "Most consistent use case in our data" },
  { profile: "IT professional targeting analytics/management", expectedSalaryIncrease: "15–40% on role change", timeToROI: "1–3 years", notes: "Outcome varies heavily by specialization and employer" },
  { profile: "Marketing/HR professional seeking formal qualification", expectedSalaryIncrease: "10–25% over 2–3 years", timeToROI: "2–4 years", notes: "MBA enables roles that wouldn't have been accessible without it" },
  { profile: "Government employee targeting departmental promotion", expectedSalaryIncrease: "Promotion-linked increment scale (not MBA-specific)", timeToROI: "Upon promotion", notes: "ROI is primarily eligibility-driven, not market-rate-driven" },
];

export default function FeeGuideClient() {
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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <>
      <style>{`
        .fg-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}
        .fg-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .fg-breadcrumb a{color:var(--grey)}.fg-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .fg-breadcrumb .sep{color:var(--pale-navy)}.fg-breadcrumb .cur{color:var(--navy);font-weight:500}
        .fg-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .fg-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .fg-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .fg-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .fg-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .fg-trust .stars{color:var(--yellow);letter-spacing:1px}.fg-trust .dot{color:var(--pale-navy)}
        .fg-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .fg-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center;text-decoration:none}
        .fg-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .fg-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .fg-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .fg-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .fg-caption{font-size:12px;color:var(--grey);font-style:italic}
        .fg-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.fg-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}
        .fg-toc-sidebar{display:none}
        @media(min-width:1024px){
          .fg-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .fg-toc-sidebar h4{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .fg-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .fg-toc-sidebar li{margin:0}
          .fg-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s;text-decoration:none}
          .fg-toc-sidebar a:hover{color:var(--navy)}
          .fg-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }
        .fg-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .fg-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .fg-toc-mobile summary::-webkit-details-marker{display:none}
        .fg-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .fg-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .fg-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .fg-toc-mobile li{padding:6px 0}
        .fg-toc-mobile a{color:var(--charcoal);font-size:14px;text-decoration:none}
        .fg-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.fg-toc-mobile{display:none}}
        .fg-body{max-width:860px}
        .fg-body section{scroll-margin-top:90px}
        .fg-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .fg-body h2:first-child{margin-top:0}
        .fg-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .fg-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .fg-body p:last-child{margin-bottom:0}
        .fg-body a{color:var(--navy);border-bottom:1px solid var(--yellow);text-decoration:none}
        .fg-body a:hover{background:var(--yellow)}
        .fg-body strong{color:var(--navy);font-weight:700}
        .fg-body ul{list-style:none;margin:0 0 16px;padding:0}
        .fg-body ul li{position:relative;padding-left:20px;margin-bottom:10px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .fg-body ul li::before{content:'';position:absolute;left:0;top:9px;width:8px;height:8px;background:var(--yellow);border-radius:50%}
        .fg-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .fg-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%;flex-shrink:0}
        .fg-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .fg-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .fg-takeaways ul{list-style:none;margin:0}.fg-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .fg-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .fg-takeaways li:last-child{margin-bottom:0}
        .fg-fee-range-card{background:var(--navy);color:var(--ivory);border-radius:12px;padding:24px;margin:24px 0}
        .fg-fee-ranges-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:16px}
        @media(min-width:640px){.fg-fee-ranges-grid{grid-template-columns:repeat(2,1fr)}}
        .fg-fee-range-item{background:rgba(255,255,255,.08);border-radius:8px;padding:16px}
        .fg-fee-range-item .label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--pale-navy);margin-bottom:4px}
        .fg-fee-range-item .amount{font-family:var(--font-serif);font-size:26px;font-weight:700;color:var(--yellow);margin-bottom:4px}
        .fg-fee-range-item .sublabel{font-size:12px;color:var(--pale-navy)}
        .fg-mode-cards{display:grid;grid-template-columns:1fr;gap:20px;margin:24px 0}
        @media(min-width:768px){.fg-mode-cards{grid-template-columns:repeat(3,1fr)}}
        .fg-mode-card{background:var(--white);border:1px solid var(--mist);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
        .fg-mode-card-header{background:var(--navy);color:var(--ivory);padding:16px 20px}
        .fg-mode-card-header h3{font-family:var(--font-serif);font-size:20px;color:var(--ivory);margin:0 0 4px;line-height:1.2}
        .fg-mode-card-header .range{color:var(--yellow);font-size:22px;font-family:var(--font-serif);font-weight:700}
        .fg-mode-card-body{padding:16px 20px;flex:1;display:flex;flex-direction:column;gap:10px}
        .fg-mode-card-row{font-size:13px;line-height:1.5}
        .fg-mode-card-row .fg-row-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:2px}
        .fg-mode-card-row p{margin:0;color:var(--charcoal)}
        .fg-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .fg-table{width:100%;border-collapse:collapse;font-size:13px;min-width:540px}
        .fg-table thead{background:var(--navy);color:var(--yellow)}
        .fg-table th{text-align:left;padding:12px 14px;font-weight:700;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
        .fg-table td{padding:12px 14px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.45;font-size:13px}
        .fg-table tbody tr:hover{background:var(--ivory)}
        .fg-table .fg-em{color:var(--navy);font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
        .fg-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .fg-callout-label{display:block;font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .fg-callout-navy{background:var(--pale-navy)}
        .fg-emi-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:640px){.fg-emi-grid{grid-template-columns:repeat(2,1fr)}}
        .fg-emi-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;border-top:4px solid var(--yellow)}
        .fg-emi-card h4{font-family:var(--font-serif);color:var(--navy);font-size:18px;margin-bottom:8px;line-height:1.3}
        .fg-emi-card .fg-emi-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:3px}
        .fg-emi-card .fg-emi-val{font-size:13px;color:var(--charcoal);margin-bottom:8px;line-height:1.5}
        .fg-emi-watch{background:#FFF8E1;border-left:3px solid var(--yellow);padding:8px 12px;margin-top:10px;font-size:12px;color:var(--charcoal);line-height:1.5}
        .fg-section-80e{background:var(--pale-navy);border-radius:12px;padding:28px;margin:24px 0}
        .fg-section-80e h3{font-family:var(--font-serif);color:var(--navy);font-size:22px;margin-bottom:12px}
        .fg-section-80e p{font-size:15px;line-height:1.65;color:var(--charcoal)}
        .fg-80e-calc{background:var(--white);border-radius:8px;padding:16px;margin-top:16px;font-size:14px}
        .fg-80e-calc-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--mist);font-size:14px}
        .fg-80e-calc-row:last-child{border-bottom:none;font-weight:700;color:var(--navy)}
        .fg-80e-calc-row .fg-label{color:var(--charcoal)}
        .fg-80e-calc-row .fg-val{font-family:var(--font-serif);color:var(--navy);font-variant-numeric:tabular-nums}
        .fg-scholarships{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.fg-scholarships{grid-template-columns:repeat(2,1fr)}}
        .fg-scholarship-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:18px}
        .fg-scholarship-card h4{font-family:var(--font-serif);color:var(--navy);font-size:17px;margin-bottom:8px;line-height:1.3}
        .fg-scholarship-card p{font-size:14px;color:var(--charcoal);line-height:1.6;margin:0}
        .fg-red-flags ul{list-style:none !important;margin:16px 0;padding:0}
        .fg-red-flags li{position:relative;padding-left:28px;margin-bottom:12px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .fg-red-flags li::before{content:'⚠';position:absolute;left:0;top:1px;font-size:16px}
        .fg-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .fg-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .fg-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .fg-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:8px;line-height:1.25}
        .fg-step-body p{font-size:15px;line-height:1.65;margin:0;color:var(--charcoal)}
        .fg-scenarios{display:grid;grid-template-columns:1fr;gap:24px;margin:24px 0}
        .fg-scenario{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .fg-scenario-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .fg-scenario-avatar{flex:0 0 56px;width:56px;height:56px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:28px;font-weight:700}
        .fg-scenario-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:20px;margin-bottom:4px;line-height:1.2}
        .fg-scenario-meta p{color:var(--pale-navy);font-size:13px;margin:0}
        .fg-scenario-body{padding:24px}
        .fg-scenario-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .fg-scenario-row:last-child{border-bottom:none}
        .fg-scenario-row-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .fg-scenario-row p{font-size:14px;line-height:1.6;margin:0}
        .fg-outcome-success{background:#E8F5EA;padding:12px 16px;border-left:3px solid #2A7A3A;border-radius:0 8px 8px 0;margin-top:8px}
        .fg-outcome-caution{background:#FFF3E0;padding:12px 16px;border-left:3px solid #E67E22;border-radius:0 8px 8px 0;margin-top:8px}
        .fg-outcome-success strong{color:#2A7A3A}
        .fg-outcome-caution strong{color:#B06200}
        .fg-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .fg-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .fg-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .fg-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .fg-faq-q::-webkit-details-marker{display:none}
        .fg-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .fg-faq-item[open] .fg-faq-icon{transform:rotate(45deg)}
        .fg-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .fg-lead-magnet{background:var(--navy);color:var(--ivory);border-radius:14px;padding:40px 32px;margin:48px 0;border:3px solid var(--yellow);position:relative}
        .fg-lead-badge{position:absolute;top:-12px;left:24px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:4px}
        .fg-lead-magnet h2{color:var(--ivory) !important;font-size:clamp(22px,3vw,28px) !important;margin-top:0 !important;margin-bottom:12px !important}
        .fg-lead-lead{color:var(--pale-navy);font-size:15px;line-height:1.6;margin-bottom:24px}
        .fg-lm-form{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.fg-lm-form{grid-template-columns:1fr 1fr}.fg-lm-full{grid-column:1/-1}}
        .fg-lm-field{display:flex;flex-direction:column}
        .fg-lm-field label{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--pale-navy);margin-bottom:6px}
        .fg-lm-field label .req{color:var(--yellow);margin-left:3px}
        .fg-lm-field input,.fg-lm-field select{background:rgba(255,255,255,.08);border:1px solid rgba(214,219,237,.3);border-radius:8px;padding:12px 14px;color:var(--ivory);font-size:15px;transition:border-color .15s,background .15s;font-family:inherit}
        .fg-lm-field input:focus,.fg-lm-field select:focus{outline:none;background:rgba(255,255,255,.14);border-color:var(--yellow)}
        .fg-lm-field input::placeholder{color:rgba(214,219,237,.5)}
        .fg-lm-field select{appearance:none;-webkit-appearance:none}
        .fg-lm-consent{font-size:12px;color:var(--pale-navy);line-height:1.55;margin:16px 0}
        .fg-lm-submit{background:var(--yellow);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:800;font-size:15px;box-shadow:0 4px 16px rgba(36,48,72,.22);border:none;cursor:pointer;transition:transform .15s;width:100%}
        @media(min-width:640px){.fg-lm-submit{width:auto}}
        .fg-lm-submit:hover{transform:translateY(-2px)}
        .fg-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.fg-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.fg-related-grid{grid-template-columns:repeat(3,1fr)}}
        .fg-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal);text-decoration:none}
        .fg-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .fg-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-family:var(--font-serif);font-size:16px}
        .fg-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}
        .fg-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .fg-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .fg-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .fg-author-row:last-child{border-bottom:none}
        .fg-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .fg-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .fg-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}
        .fg-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px}
        .fg-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .fg-sources ul{list-style:none;margin:0;padding:0}
        .fg-sources li{padding:4px 0;color:var(--charcoal)}
        .fg-sources a{color:var(--navy);border-bottom:1px dotted var(--navy);text-decoration:none}
        .fg-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .fg-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .fg-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .fg-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .fg-btn-navy{background:var(--navy);color:var(--yellow) !important}
        .fg-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px;text-decoration:none}
        .fg-disclaimer{background:#FFF8E1;border:1px solid #FCCC00;border-radius:8px;padding:16px 20px;margin:24px 0;font-size:14px;line-height:1.6;color:var(--charcoal)}
        .fg-disclaimer strong{color:var(--navy)}
      `}</style>

      <div ref={progressRef} className="fg-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="fg-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span className="sep">›</span>
          <a href="/resources">Resources</a><span className="sep">›</span>
          <span className="cur">Complete Distance/Online MBA Fee Guide 2025-26</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="fg-hero">
        <div className="container">
          <span className="fg-eyebrow">Fee Guide • 2025-26 Edition</span>
          <h1>Complete Distance &amp; Online MBA Fee Guide — True Cost Breakdown 2025-26</h1>
          <p className="fg-subtitle">
            Tuition, hidden costs, EMI options, scholarships, and Section 80E tax benefits explained. The full true-cost picture, not just the advertised number. Built from 1,200+ fee consultations.
          </p>
          <div className="fg-trust">
            <span className="stars">★★★★★</span>
            <span>4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed</span>
            <span className="dot">•</span>
            <span>150+ universities tracked</span>
          </div>
          <div className="fg-cta-row">
            <a href="/counselling/" className="fg-btn fg-btn-primary">Get a personalised fee breakdown for your shortlist →</a>
            <a href="#pdf-download" className="fg-btn fg-btn-outline">Download the fee comparison sheet →</a>
          </div>
          <p className="fg-caption">
            <em>Fee data collected from university official portals and admissions offices, January 2026. Verify directly with your shortlisted university before paying any fee. This guide is not affiliated with any university or financing provider.</em>
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="fg-layout">

          {/* ToC sidebar */}
          <aside className="fg-toc-sidebar" aria-label="Table of contents">
            <h4>On this page</h4>
            <ol>
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={activeId === item.id ? "active" : ""}>{item.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Article body */}
          <div className="fg-body">

            {/* Mobile ToC */}
            <details className="fg-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                ))}
              </ol>
            </details>

            {/* Key takeaways */}
            <section id="takeaways" className="fg-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i}><strong>{t.label}.</strong> {t.text}</li>
                ))}
              </ul>
            </section>

            {/* Fee ranges at a glance */}
            <section id="fee-ranges">
              <h2>Fee ranges at a glance</h2>
              <span className="fg-freshness">Verified from university official portals, January 2026</span>
              <div className="fg-fee-range-card">
                <p style={{ color: "var(--pale-navy)", fontSize: "14px", margin: "0 0 12px" }}>All figures are total programme all-in cost (tuition + typical hidden fees). Not just advertised tuition.</p>
                <div className="fg-fee-ranges-grid">
                  <div className="fg-fee-range-item">
                    <div className="label">State/open university Distance MBA</div>
                    <div className="amount">Rs 0.35–0.75L</div>
                    <div className="sublabel">IGNOU, Annamalai, Osmania, MKU, VMOU, YCMOU</div>
                  </div>
                  <div className="fg-fee-range-item">
                    <div className="label">Private branded Distance MBA</div>
                    <div className="amount">Rs 0.95–1.7L</div>
                    <div className="sublabel">SMU-DE, ICFAI</div>
                  </div>
                  <div className="fg-fee-range-item">
                    <div className="label">Mid-range branded Online MBA</div>
                    <div className="amount">Rs 1.35–2.5L</div>
                    <div className="sublabel">Chandigarh, DY Patil, Jain, LPU, Amity, Manipal, Symbiosis</div>
                  </div>
                  <div className="fg-fee-range-item">
                    <div className="label">Premium Online MBA</div>
                    <div className="amount">Rs 2.8–4.2L</div>
                    <div className="sublabel">NMIMS Global Access</div>
                  </div>
                </div>
              </div>
              <div className="fg-callout">
                <span className="fg-callout-label">The most important number</span>
                The true all-in cost is almost always Rs 15,000–40,000 higher than the advertised tuition. The 6-step true-cost calculator below shows you how to build the accurate total before you commit to any university.
              </div>
            </section>

            {/* Fee by mode */}
            <section id="fee-by-mode">
              <h2>Fee breakdown by mode</h2>
              <div className="fg-mode-cards">
                {MODE_FEE_CARDS.map((m) => (
                  <div className="fg-mode-card" key={m.mode}>
                    <div className="fg-mode-card-header">
                      <h3>{m.mode}</h3>
                      <div className="range">{m.range}</div>
                    </div>
                    <div className="fg-mode-card-body">
                      <div className="fg-mode-card-row">
                        <div className="fg-row-label">Sub-ranges</div>
                        <p>{m.subrange}</p>
                      </div>
                      <div className="fg-mode-card-row">
                        <div className="fg-row-label">Named examples</div>
                        <p>{m.namedExample}</p>
                      </div>
                      <div className="fg-mode-card-row">
                        <div className="fg-row-label">Typical hidden costs to add</div>
                        <p>{m.hiddenTypical}</p>
                      </div>
                      <div className="fg-mode-card-row">
                        <div className="fg-row-label">Best for</div>
                        <p>{m.who}</p>
                      </div>
                      <div className="fg-mode-card-row">
                        <div className="fg-row-label">Platform</div>
                        <p>{m.platform}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p>For a complete mode comparison beyond fees — learning experience, career outcomes, recognition — see the <a href="/resources/distance-vs-online-vs-executive-mba-guide/">Distance vs Online vs Executive MBA guide</a>.</p>
            </section>

            {/* Fee by specialization */}
            <section id="fee-by-spec">
              <h2>Fee by specialization</h2>
              <p>Specialization affects fee less than mode at the Distance/Online level. The table below shows the range across the top universities for each specialization — the difference within a given mode is typically under Rs 30,000.</p>
              <div className="fg-table-wrap">
                <table className="fg-table">
                  <thead>
                    <tr>
                      <th>Specialization</th>
                      <th>Distance MBA range</th>
                      <th>Online MBA range</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_BY_SPEC.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.spec}</strong></td>
                        <td className="fg-em">{row.distanceLow !== "—" ? `Rs ${row.distanceLow}–${row.distanceHigh}L` : "—"}</td>
                        <td className="fg-em">Rs {row.onlineLow}–{row.onlineHigh}L</td>
                        <td>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fg-caption">All figures are total programme tuition cost (not including hidden fees). Ranges reflect the spread across the top-20 UGC-DEB approved universities.</p>
            </section>

            {/* Fee by university tier */}
            <section id="fee-by-university">
              <h2>Fee by university tier</h2>
              <p>Universities condense into roughly four fee tiers. The tier reflects the combination of mode, brand positioning, and platform investment — not necessarily a proportional difference in educational quality or career outcome.</p>
              <div className="fg-table-wrap">
                <table className="fg-table">
                  <thead>
                    <tr>
                      <th>Tier</th>
                      <th>Fee range (all-in)</th>
                      <th>Named universities</th>
                      <th>Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Premium Online</strong></td>
                      <td className="fg-em">Rs 2.8–4.2L</td>
                      <td>NMIMS Global Access</td>
                      <td>Finance/Marketing targets where NMIMS brand adds specific employer value</td>
                    </tr>
                    <tr>
                      <td><strong>Mid-range Online</strong></td>
                      <td className="fg-em">Rs 1.35–2.5L</td>
                      <td>Amity, Manipal MAHE, Symbiosis SCOL, Jain, LPU, Chandigarh, DY Patil</td>
                      <td>Best value concentration — strong brand, live sessions, good platform</td>
                    </tr>
                    <tr>
                      <td><strong>Private Distance</strong></td>
                      <td className="fg-em">Rs 0.95–1.7L</td>
                      <td>SMU-DE, ICFAI</td>
                      <td>Long track record, government-job eligibility, self-paced preference</td>
                    </tr>
                    <tr>
                      <td><strong>State/open university Distance</strong></td>
                      <td className="fg-em">Rs 0.35–0.75L</td>
                      <td>IGNOU, Pondicherry U, Annamalai, Osmania, MKU, Alagappa, Bharathiar, Periyar, VMOU, YCMOU</td>
                      <td>Very low fee, government-job eligibility, regional employer recognition</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Hidden costs */}
            <section id="hidden-costs">
              <h2>The hidden costs most aspirants miss</h2>
              <p>These are not unusual or unexpected charges — they're standard parts of the fee structure at most universities, simply not prominently displayed in marketing materials alongside the headline tuition figure.</p>
              <div className="fg-table-wrap">
                <table className="fg-table">
                  <thead>
                    <tr>
                      <th>Cost item</th>
                      <th>Typical amount</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HIDDEN_COSTS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.item}</strong></td>
                        <td className="fg-em">{row.typical}</td>
                        <td>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="fg-callout fg-callout-navy">
                <span className="fg-callout-label">Counsellor observation</span>
                In our counselling conversations 2023-25, semester examination fees are the most consistently missed hidden cost — particularly for aspirants who have only seen the university's homepage or a recruitment aggregator listing. A university advertising an Online MBA at Rs 1.6 lakh may have Rs 20,000+ in examination fees spread across four semesters, bringing the true total to Rs 1.8 lakh. Always ask for the complete fee breakup document, not just the headline tuition. — <em>CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* EMI and financing */}
            <section id="emi-financing">
              <h2>EMI and financing options</h2>
              <div className="fg-emi-grid">
                {EMI_OPTIONS.map((opt) => (
                  <div className="fg-emi-card" key={opt.title}>
                    <h4>{opt.title}</h4>
                    <div className="fg-emi-label">Available at</div>
                    <div className="fg-emi-val">{opt.who}</div>
                    <div className="fg-emi-label">Typical terms</div>
                    <div className="fg-emi-val">{opt.terms}</div>
                    <div className="fg-emi-label">Best for</div>
                    <div className="fg-emi-val">{opt.bestFor}</div>
                    <div className="fg-emi-watch"><strong>Watch:</strong> {opt.watch}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 80E */}
            <section id="section-80e">
              <h2>Section 80E tax benefit: how it reduces your effective MBA cost</h2>
              <div className="fg-section-80e">
                <h3>What Section 80E does</h3>
                <p>
                  Section 80E of the Income Tax Act allows you to deduct the full interest paid on an education loan from your taxable income — with no upper limit — for up to 8 consecutive years from the year you begin repayment. The loan must be from a recognised financial institution (not a personal loan or credit card). Only the interest component is deductible, not the principal.
                </p>
                <p>
                  In practical terms: if your marginal tax rate is 30% and you pay Rs 1.5 lakh in interest in a year, your tax saving from Section 80E is Rs 45,000 — reducing the effective cost of that interest to Rs 1.05 lakh.
                </p>
                <div className="fg-80e-calc">
                  <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "8px", fontSize: "14px" }}>Example: EMBA loan, 30% tax bracket</div>
                  <div className="fg-80e-calc-row">
                    <span className="fg-label">Total loan amount</span>
                    <span className="fg-val">Rs 16.3 lakh</span>
                  </div>
                  <div className="fg-80e-calc-row">
                    <span className="fg-label">Total interest over 8 years (at ~11% p.a.)</span>
                    <span className="fg-val">Rs 8.1 lakh</span>
                  </div>
                  <div className="fg-80e-calc-row">
                    <span className="fg-label">Section 80E tax saving (30% × Rs 8.1L interest)</span>
                    <span className="fg-val" style={{ color: "#2A7A3A" }}>– Rs 2.43 lakh</span>
                  </div>
                  <div className="fg-80e-calc-row">
                    <span className="fg-label">Effective net financing cost</span>
                    <span className="fg-val">Rs 5.67 lakh</span>
                  </div>
                </div>
                <p style={{ marginTop: "12px", fontSize: "14px" }}>
                  Note: this calculation assumes 30% marginal rate throughout and that all 8 years' interest qualifies. Actual tax saving depends on your individual tax situation. Consult a tax professional for advice specific to your case.
                </p>
              </div>
            </section>

            {/* Scholarships */}
            <section id="scholarships">
              <h2>Scholarships and fee concessions: what's actually available</h2>
              <div className="fg-scholarships">
                <div className="fg-scholarship-card">
                  <h4>Merit-based waivers</h4>
                  <p>Most branded Online MBA providers offer early-application or academic-merit waivers of 10–25% off tuition. These are typically time-bound (first 100 applicants, or within a specific application window) and require minimum qualifying marks. Ask the admissions desk directly at first contact what scholarship options are live for your application cycle.</p>
                </div>
                <div className="fg-scholarship-card">
                  <h4>Need-based concessions</h4>
                  <p>Less common than merit-based, but available at several universities including some state open universities and Symbiosis SCOL. Typically means-tested (family income below a stated threshold). Documentation-heavy but can cover 15–30% of tuition.</p>
                </div>
                <div className="fg-scholarship-card">
                  <h4>Women-in-management scholarships</h4>
                  <p>Amity Online, Jain University Online, Symbiosis SCOL, and several other providers run dedicated scholarships for women applicants — typically 10–20% fee waiver with a minimum academic eligibility. Under-claimed relative to the number of women applicants who qualify.</p>
                </div>
                <div className="fg-scholarship-card">
                  <h4>Defence / veteran / disability concessions</h4>
                  <p>Several universities — including state open universities and IGNOU — offer significant fee concessions for defence personnel, veterans, and persons with disabilities. IGNOU in particular has structured concessions across multiple categories. Requires documentation from the relevant authority.</p>
                </div>
              </div>
              <div className="fg-callout">
                <span className="fg-callout-label">The key practice</span>
                Scholarships are consistently under-applied for because they're rarely listed prominently on a university's main marketing pages. Call or email the admissions office directly and ask: "What scholarship or fee concession options are currently available for this programme?" This one question recovers money for a significant proportion of our counselling clients.
              </div>
            </section>

            {/* Red flags */}
            <section id="red-flags">
              <h2>Fee-related red flags that should make you pause</h2>
              <div className="fg-red-flags">
                <ul>
                  <li><strong>Fee significantly below the lowest legitimate benchmark (under Rs 25,000 for a "full MBA").</strong> Genuine UGC-DEB approved MBA programmes have real delivery costs — faculty, platform, examination infrastructure. Sub-Rs 25,000 "MBA" fees likely indicate an unapproved qualification.</li>
                  <li><strong>Refusal to provide a complete, itemised fee structure document before you pay any application fee.</strong> Every legitimate university will provide a full fee breakdown — tuition, examination fees, study material fees, certification fees — in writing before you formally commit.</li>
                  <li><strong>Pressure to pay immediately to "lock in" a price or batch.</strong> Ethical enrolment practice involves giving you time to read the offer document, complete your own verification, and make an informed decision. High-pressure urgency tactics are a red flag.</li>
                  <li><strong>GST charged on core tuition fees.</strong> Core degree-programme tuition is GST-exempt. If you're shown a fee breakdown with GST on tuition, ask for clarification.</li>
                  <li><strong>Mid-programme fee revision with no clause in the original offer letter.</strong> Ask before enrolling: is the fee fixed for the full programme duration, or subject to revision? Get the answer in writing.</li>
                  <li><strong>No clear refund policy in writing before payment.</strong> Legitimate universities have stated refund policies for fees paid at different stages of the enrolment process. If this isn't documented in your offer letter, ask for it before paying.</li>
                </ul>
              </div>
            </section>

            {/* True cost calculator */}
            <section id="true-cost-calculator">
              <h2>The 6-step true-cost calculator: know your all-in cost before you commit</h2>
              <p>This is the worksheet CollegeNCourses counsellors use with every aspirant shortlisting multiple universities. It prevents the common experience of discovering the real cost only after paying an application or admission fee.</p>
              <div className="fg-steps">
                {TRUE_COST_STEPS.map((s) => (
                  <div className="fg-step-card" key={s.step}>
                    <div className="fg-step-num">{s.step}</div>
                    <div className="fg-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fee vs ROI */}
            <section id="fee-vs-roi">
              <h2>Fee vs ROI: what the data suggests by career profile</h2>
              <p style={{ fontStyle: "italic", fontSize: "14px", color: "var(--grey)" }}>Indicative ranges from our counselling and alumni data. Not guaranteed. Actual outcomes depend on employer, prior experience, and individual performance, not solely on MBA fee bracket.</p>
              <div className="fg-table-wrap">
                <table className="fg-table">
                  <thead>
                    <tr>
                      <th>Career profile</th>
                      <th>Expected salary impact</th>
                      <th>Approximate time to ROI</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROI_TABLE.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.profile}</strong></td>
                        <td>{row.expectedSalaryIncrease}</td>
                        <td>{row.timeToROI}</td>
                        <td style={{ fontSize: "12px", color: "var(--grey)" }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="fg-callout">
                <span className="fg-callout-label">The ROI framing that matters most</span>
                ROI calculations often focus on salary uplift, but the most consistent use case in our data is access-based: the MBA enables a promotion, role, or career track that was otherwise inaccessible — not just a salary increment in the same role. That shift in access is often worth more than a simple salary-delta calculation captures.
              </div>
            </section>

            {/* Scenarios */}
            <section id="scenarios">
              <h2>Three fee-planning stories (anonymised)</h2>
              <div className="fg-scenarios">
                {SCENARIOS.map((s) => (
                  <div className="fg-scenario" key={s.name}>
                    <div className="fg-scenario-header">
                      <div className="fg-scenario-avatar">{s.initial}</div>
                      <div className="fg-scenario-meta">
                        <h3>{s.name}, {s.age}</h3>
                        <p>{s.role}</p>
                      </div>
                    </div>
                    <div className="fg-scenario-body">
                      <div className="fg-scenario-row">
                        <div className="fg-scenario-row-label">Background & goal</div>
                        <p>{s.background}</p>
                      </div>
                      <div className="fg-scenario-row">
                        <div className="fg-scenario-row-label">Counsellor approach</div>
                        <p>{s.approach}</p>
                      </div>
                      <div className="fg-scenario-row">
                        <div className="fg-scenario-row-label">Financing outcome</div>
                        <div className={s.type === "success" ? "fg-outcome-success" : "fg-outcome-caution"}>
                          <p>{s.financingOutcome}</p>
                        </div>
                      </div>
                      <div className="fg-scenario-row">
                        <div className="fg-scenario-row-label">Final recommendation</div>
                        <p><strong>{s.recommendation}</strong></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="fg-faq-list">
                {FAQS.map((faq, i) => (
                  <details className="fg-faq-item" key={i}>
                    <summary className="fg-faq-q">
                      <span>{faq.q}</span>
                      <span className="fg-faq-icon">+</span>
                    </summary>
                    <div className="fg-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Lead magnet */}
            <section id="pdf-download">
              <div className="fg-lead-magnet">
                <span className="fg-lead-badge">Free Download</span>
                <h2>Get the fee comparison sheet + true-cost calculator</h2>
                <p className="fg-lead-lead">
                  A printable one-page fee comparison across the top 20 universities, the 6-step true-cost worksheet, the Section 80E tax benefit calculator, and a refund-policy checklist template. Free — just tell us which specialization and financing preference we should tailor it to.
                </p>
                <form className="fg-lm-form" onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}>
                  <div className="fg-lm-field">
                    <label>Full name<span className="req">*</span></label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="fg-lm-field">
                    <label>Email<span className="req">*</span></label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="fg-lm-field">
                    <label>Phone (optional)</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="fg-lm-field">
                    <label>Target specialization<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select specialization</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Business Analytics</option>
                      <option>Human Resources</option>
                      <option>Operations / Supply Chain</option>
                      <option>IT & Systems</option>
                      <option>Banking & Finance</option>
                      <option>Other / Not sure yet</option>
                    </select>
                  </div>
                  <div className="fg-lm-field fg-lm-full">
                    <label>Preferred financing<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Interest-free university EMI</option>
                      <option>Education loan (bank)</option>
                      <option>Employer sponsorship</option>
                      <option>Paying upfront</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <p className="fg-lm-consent fg-lm-full">
                    By downloading, you agree to receive a follow-up email from a CollegeNCourses counsellor. We do not share your details with any university, bank, or third party. Unsubscribe anytime.
                  </p>
                  <div className="fg-lm-full">
                    <button type="submit" className="fg-lm-submit">Email me the fee sheet →</button>
                  </div>
                </form>
              </div>
            </section>

            <div className="fg-disclaimer">
              <strong>Disclaimer:</strong> Fee figures are collected from university official portals and admissions offices and are indicative for the 2025-26 academic year. They may change without notice. Always verify the complete, itemised fee structure directly with your shortlisted university before paying any fee. This guide does not constitute financial advice. Section 80E illustrations are for informational purposes only — consult a qualified tax professional for advice specific to your situation.
            </div>

            {/* Related resources */}
            <section id="related">
              <h2>Go deeper</h2>
              <div className="fg-related-grid">
                {RELATED.map((r) => (
                  <a href={r.href} className="fg-related-card" key={r.href}>
                    <div className="icon">→</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* Authors */}
            <section id="authors">
              <div className="fg-authors">
                <h3>About this guide</h3>
                <div className="fg-author-row">
                  <strong>Written by</strong>
                  <div className="fg-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="fg-author-bio">Leads content strategy for CollegeNCourses and has been writing on Indian higher education since 2020.</div>
                </div>
                <div className="fg-author-row">
                  <strong>Reviewed by</strong>
                  <div className="fg-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="fg-author-bio">Has advised over 3,000 aspirants on fee planning, financing, and career-alignment counselling across Distance, Online, and Executive MBA modes since 2016.</div>
                </div>
                <div className="fg-author-row">
                  <strong>Approved by</strong>
                  <div className="fg-author-role">Nikhita Pradeep Deshmukh, Founder, DNYANAL EDUCON PRIVATE LIMITED</div>
                  <div className="fg-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="fg-sources">
                <h4>Sources referenced</h4>
                <ul>
                  <li>University official fee structure documents (20 universities), collected January 2026</li>
                  <li><a href="https://deb.ugc.ac.in/" target="_blank" rel="noopener">UGC Distance Education Bureau (DEB)</a> — approved institution list</li>
                  <li><a href="https://www.incometax.gov.in/" target="_blank" rel="noopener">Income Tax Act, Section 80E</a> — education loan interest deduction provisions</li>
                  <li><a href="https://www.sbi.co.in/" target="_blank" rel="noopener">SBI Education Loan guidelines</a>, January 2026</li>
                  <li>Central Sector Interest Subsidy (CSIS) Scheme documentation, Ministry of Education</li>
                  <li>CollegeNCourses counselling records: fee planning conversations 2022-25 (1,200+ records analysed)</li>
                </ul>
                <p style={{ fontSize: "12px", color: "var(--grey)", marginTop: "12px", fontStyle: "italic" }}>
                  This page is reviewed every six months or when significant fee changes are notified by universities. Next scheduled review: July 2026.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="fg-cta-band">
        <div className="container">
          <h2>Want a personalised fee breakdown for your specific shortlist?</h2>
          <p>A CollegeNCourses counsellor will build the true all-in cost comparison for your 2-3 shortlisted universities, including hidden costs, applicable scholarships, and financing options. Free, 30 minutes.</p>
          <a href="/counselling/" className="fg-btn fg-btn-navy">Book a free fee-planning consultation →</a>
          <br />
          <a href="/resources/top-20-ugc-deb-approved-online-mba-2025-26/" className="fg-cta-secondary">Or browse the Top 20 UGC-DEB Approved universities →</a>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="fee-guide" />
    </>
  );
}
