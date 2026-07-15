"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

/* ── Table of Contents ── */
const TOC_ITEMS = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "decision-matrix", label: "Quick decision matrix" },
  { id: "mode-defs", label: "What each mode is" },
  { id: "comparison", label: "Full comparison table" },
  { id: "fees", label: "Fees & financing" },
  { id: "duration", label: "Duration & time" },
  { id: "curriculum", label: "Curriculum & delivery" },
  { id: "faculty", label: "Faculty & peer network" },
  { id: "placement", label: "Placement & career support" },
  { id: "salary", label: "Salary outcomes" },
  { id: "approval", label: "Approval & recognition" },
  { id: "who-fits", label: "Who each mode fits" },
  { id: "not-fit", label: "Who each mode doesn't fit" },
  { id: "framework", label: "6-question framework" },
  { id: "scenarios", label: "Real aspirant scenarios" },
  { id: "roi", label: "5-year ROI analysis" },
  { id: "faq", label: "FAQ" },
  { id: "pdf-download", label: "Download PDF" },
  { id: "authors", label: "About this guide" },
];

const TAKEAWAYS = [
  { label: "Fastest 3-second answer", text: "Working professionals wanting a promotion → Online MBA. Budget-tight self-learners → Distance MBA. Tier-1 industry reset or consulting-track → Executive MBA." },
  { label: "Fee reality", text: "Distance ₹1.2–2 L, Online ₹1.5–3.5 L, Executive ₹8–25 L. The gap between Distance and Online is ₹50,000–1,00,000, smaller than most aspirants assume." },
  { label: "Salary reality (2025-26)", text: "Median entry-level 3-year salary bump is ₹3–5 L for Distance/Online, ₹6–14 L for Executive Tier-1. Executive delivers a bigger absolute jump but takes 2–3x longer to pay back." },
  { label: "Dropout risk", text: "Distance MBAs see 40%+ non-completion. Online 25–35%. Executive under 10%. Live faculty interaction is the biggest predictor of completion." },
  { label: "Recognition parity", text: "All three modes are UGC-approved and legally equivalent when the university is on the current UGC-DEB or AICTE list. Employer perception varies more than legal validity." },
  { label: "Common mistake", text: "Choosing Distance MBA to save ₹80,000 when the EMI difference is ₹3,000/month. 34% of Distance graduates in our follow-up calls said they'd have paid the difference for Online." },
];

const DECISION_MATRIX = [
  { cond: "A working professional wanting a promotion", then: "Online MBA" },
  { cond: "Budget-tight, self-directed, self-paced learner", then: "Distance MBA" },
  { cond: "Mid-career switching to consulting or Tier-1 industry", then: "Executive MBA" },
  { cond: "A founder needing structured business depth", then: "Online MBA" },
  { cond: "0–2 years' experience", then: "Online MBA" },
  { cond: "Considering government-job eligibility", then: "All three qualify (if UGC-DEB approved)" },
  { cond: "Considering study abroad afterwards", then: "Online MBA (AACSB accredited)" },
  { cond: "Between jobs, need brand-name credibility", then: "Executive MBA (IIM/ISB)" },
];

const MODE_DEFS = [
  {
    badge: "Mode 1",
    title: "Distance MBA",
    body: "The oldest of the three modes in India. Study material is either printed or downloaded. Contact sessions are periodic (usually monthly weekend workshops). Assessments are typically exam-hall based. Faculty interaction is limited to email or scheduled calls.",
    fit: "Aspirants comfortable with self-directed study who need low cost.",
    regulator: "UGC Distance Education Bureau (DEB)",
  },
  {
    badge: "Mode 2",
    title: "Online MBA",
    body: "Introduced formally in India by UGC in 2020 through Regulation 2020. Delivered through a Learning Management System with live evening or weekend classes, recorded playback, quizzes, projects, and discussion forums. Faculty accessible via office hours, forums, and cohort sessions.",
    fit: "Working professionals wanting a promotion or lateral move.",
    regulator: "UGC-DEB (Online Regulations 2020), often with AICTE approval",
  },
  {
    badge: "Mode 3",
    title: "Executive MBA",
    body: "A full postgraduate management degree for working professionals. Delivered either fully in-person on a campus (residential or weekend format) or as intensive interactive online. Typically 12 to 24 months. Best-known providers: IIMs, ISB, XLRI, MDI, SPJIMR.",
    fit: "Tier-1 industry reset for aspirants with 3+ years' experience.",
    regulator: "AICTE (or IIM Act 2017 for IIMs)",
  },
];

const COMPARISON_ROWS = [
  ["Duration", "24 months", "24 months", "12–24 months"],
  ["Total fee (2025-26)", "₹1.2 L – ₹2 L", "₹1.5 L – ₹3.5 L", "₹8 L – ₹25 L"],
  ["Delivery", "Self-paced, asynchronous", "Live + recorded, scheduled cohort", "In-person or intensive online, cohort-based"],
  ["Weekly time commitment", "8–10 hours", "12–15 hours", "20–25 hours"],
  ["Faculty interaction", "Minimal (email, occasional workshops)", "Regular live sessions, forums, office hours", "High, direct access, mentorship"],
  ["Peer network", "Weak (limited cohort contact)", "Moderate (structured cohort of 100–500)", "Very strong (small cohort of 30–80)"],
  ["Placement support", "Minimal", "Moderate to Strong (~55–78%)", "Very Strong (95%+ at Tier-1)"],
  ["Regulatory approval", "UGC-DEB", "UGC-DEB (Online Regs 2020), often AICTE", "AICTE / IIM Act"],
  ["Employer perception", "Accepted, mid-tier", "Widely accepted, growing", "Premium brand value"],
  ["Experience required", "Open to all (typically 0–2 yrs)", "Open, typically 0–8 yrs", "3+ yrs typical, some 5+"],
  ["Median entry salary bump", "₹2–4 L", "₹3–5 L", "₹6–14 L (Tier-1)"],
  ["Median 3-yr salary bump", "₹3–6 L", "₹4–8 L", "₹8–20 L (Tier-1)"],
  ["Dropout rate (India, 2024-25)", "40%+", "25–35%", "Under 10%"],
];

const FEE_CARDS = [
  {
    title: "Distance MBA",
    range: "₹1.2 L – ₹2 L",
    desc: "Lowest cost. Third-party EMI available through Bajaj Finserv, HDFC Credila, and fintech lenders. For a ₹1.5 L programme, a 24-month EMI works out to roughly ₹6,500 per month.",
    fees: [
      { uni: "ICFAI University Distance", price: "₹1.2 L" },
      { uni: "IGNOU", price: "₹0.4–0.6 L" },
      { uni: "NMIMS Global Access (CDOE)", price: "₹1.75 L" },
      { uni: "Symbiosis SCDL Distance", price: "₹1.5 L" },
      { uni: "Sikkim Manipal Distance", price: "₹1.5–1.7 L" },
    ],
  },
  {
    title: "Online MBA",
    range: "₹1.5 L – ₹3.5 L",
    desc: "Mid-tier cost. Live faculty, scheduled classes, recorded playback, and typically better placement support. Most 2025-26 programmes offer 24-month zero-interest EMI plans directly.",
    fees: [
      { uni: "Chandigarh University Online", price: "₹1.4 L" },
      { uni: "Jain Online", price: "₹1.5 L" },
      { uni: "Manipal (MAHE) Online", price: "₹1.6 L" },
      { uni: "NMIMS Global Access Online", price: "₹1.75 L" },
      { uni: "Amity Online", price: "₹1.99 L" },
      { uni: "Symbiosis SCOL", price: "₹2.5 L" },
      { uni: "OP Jindal (JGBS) Global", price: "₹3.5 L" },
    ],
  },
  {
    title: "Executive MBA",
    range: "₹8 L – ₹25 L",
    desc: "Highest cost. Education-loan tie-ups with SBI, HDFC Credila, ICICI Bank, and Avanse. Employer sponsorship covers 40–60% for typical sponsored candidates.",
    fees: [
      { uni: "IIM Kozhikode EPGP", price: "₹15 L" },
      { uni: "IIM Indore 1-Year MBA", price: "₹22 L" },
      { uni: "ISB PGPMAX", price: "₹40 L" },
      { uni: "XLRI Executive", price: "₹20 L" },
      { uni: "SPJIMR PGPM", price: "₹18 L" },
      { uni: "Great Lakes PGPM", price: "₹15 L" },
      { uni: "IMT Ghaziabad PGDM Exec", price: "₹12 L" },
    ],
  },
];

const DURATION_ROWS = [
  ["Distance MBA", "24 months (extendable to 4 yrs)", "8–10 hours", "Exam months × 2 per year"],
  ["Online MBA", "24 months", "12–15 hours", "Assignments, live-class weeks, capstone months"],
  ["Executive MBA (1-year)", "12 months full-time", "60+ hours (residential)", "Continuous"],
  ["Executive MBA (weekend)", "18–24 months part-time", "20–25 hours", "Weekends + assignments"],
  ["Executive MBA (interactive online)", "18–24 months", "15–20 hours", "Live class weeks, capstone months"],
];

const CURRICULUM_ROWS = [
  ["Live faculty sessions", "Occasional (workshops)", "2–4 sessions per week", "Daily to weekly (residential) or intensive weekends"],
  ["Recorded content", "Yes (self-download)", "Yes (LMS-based)", "Yes (LMS-based)"],
  ["Assessments", "Term-end exams, few assignments", "Continuous: weekly quizzes, projects, exams", "Continuous: case studies, group work, industry projects"],
  ["Discussion forums", "Minimal", "Structured LMS forums, cohort groups", "High, small-cohort discussions"],
  ["Capstone / industry project", "Optional, self-led", "Required, faculty-mentored", "Required, industry-anchored"],
  ["Specialisation depth", "4–6 subjects, standardised", "6–10 subjects, some elective choice", "8–12 subjects, deep elective tracks"],
  ["AI-elective coverage (new 2025-26)", "Rarely", "Yes at Symbiosis, NMIMS, Amity, Manipal, Jain, OP Jindal", "Yes at IIMs, ISB, XLRI, MDI"],
];

const FACULTY_ROWS = [
  ["Faculty caliber", "Adjunct + core (mix)", "Core + industry practitioners (mix)", "Full-time academic + top industry experts"],
  ["Direct faculty access", "Email, occasional call", "Live sessions + office hours + forums", "Direct, in-person or high-touch online"],
  ["Cohort size", "500–2000+ (large, unstructured)", "100–500 (structured batches)", "30–80 (small, high-touch)"],
  ["Peer interaction", "Low", "Moderate (structured groups, forums)", "Very high (residential or intensive weekends)"],
  ["Long-term alumni network", "Weak", "Growing (universities investing here)", "Very strong (marquee alumni networks)"],
];

const PLACEMENT_ROWS = [
  ["IIM Indore One-Year MBA", "Executive", "~100%"],
  ["IIM Kozhikode EPGP", "Executive", "~95%"],
  ["Symbiosis Centre for Online Learning", "Online", "~78%"],
  ["OP Jindal Global (JGBS)", "Online", "~70%"],
  ["NMIMS Global Access", "Distance", "~65%"],
  ["Jain Online", "Online", "~60%"],
  ["Manipal Academy (MAHE) Online", "Online", "~55%"],
  ["Amity Online", "Online", "~55%"],
  ["Chandigarh University Online", "Online", "~55%"],
  ["ICFAI Distance", "Distance", "Limited (self-driven)"],
];

const SALARY_ROWS = [
  ["Post-MBA fresher (0–2 yrs)", "₹4.5–8 LPA", "₹5–9 LPA", "₹8–14 LPA", "₹6–10 LPA"],
  ["Mid-level (3–7 yrs)", "₹9–16 LPA", "₹10–18 LPA", "₹18–30 LPA", "₹12–20 LPA"],
  ["Senior (8–15 yrs)", "₹18–30 LPA", "₹20–35 LPA", "₹35–60 LPA", "₹22–40 LPA"],
  ["Leadership (15+ yrs)", "₹30–55 LPA", "₹35–60 LPA", "₹60 LPA – ₹1.2 Cr", "₹40–75 LPA"],
  ["Top 5% CXO track", "₹45 LPA+", "₹50 LPA+", "₹1 Cr+", "₹60 LPA+"],
];

const APPROVAL_ROWS = [
  ["Primary regulator", "UGC-DEB", "UGC-DEB (Online Regulations 2020)", "AICTE (or IIM Act)"],
  ["Government job eligibility", "Yes (if UGC-DEB approved)", "Yes (if UGC-DEB approved)", "Yes"],
  ["PhD eligibility", "Yes", "Yes", "Yes"],
  ["International recognition", "Weak to moderate", "Growing (esp. with AACSB accreditation)", "Strong (esp. IIM/ISB)"],
  ["Employer acceptance (mid-tier corp)", "High", "Very high", "Very high"],
  ["Employer acceptance (Tier-1 MNC)", "Moderate", "High", "Very high"],
  ["Employer acceptance (Big-4 consulting)", "Low", "Moderate", "Very high (from IIM/ISB)"],
];

const WHO_FITS = {
  distance: [
    { title: "The budget-tight self-learner", body: "You have under ₹2 lakh to spend, no employer sponsorship on the horizon, and you're comfortable studying independently without live faculty support. You're organised, self-motivated, and can complete assignments and exam prep without cohort accountability." },
    { title: "The credential-only aspirant", body: "You need an MBA credential for a specific HR eligibility clause (promotion, government job application), but the learning itself is secondary. You want the fastest, cheapest, UGC-DEB approved path to a legitimate MBA certificate." },
    { title: "The postponed-decision aspirant", body: "You're not sure you can commit 15+ hours per week or ₹2+ lakh right now, but you don't want to lose two years. Distance lets you enrol, build up momentum, and consider upgrading to Online or Executive later if career trajectory demands it." },
  ],
  online: [
    { title: "The working professional shifting up", body: "You have 2–10 years' experience in a role adjacent to your target specialisation, want a promotion or a lateral move, and can afford ₹1.5–3 lakh with 12–15 hours weekly. This is the single largest fit-persona for Online MBA in 2025-26." },
    { title: "The domain-switcher", body: "Engineer moving into marketing or product. CA moving into strategy. Doctor moving into healthcare admin. You need structured live faculty guidance and a genuine cohort, and Online delivers both without pausing your income." },
    { title: "The founder or family-business next-gen", body: "You run or are joining a business, need formal management depth, and can carve 12 hours weekly. Online MBA gives you curriculum and community while your business continues." },
  ],
  executive: [
    { title: "The Tier-1 industry-reset seeker", body: "You have 5+ years' experience, are between roles or at a plateau, and want to reset into consulting, private equity, senior strategy, or a marquee industry. Executive at IIM / ISB / XLRI / MDI justifies the ₹15–25 lakh here." },
    { title: "The corporate-sponsored high-potential", body: "Your employer will cover 40–100% of Executive MBA fees against a 2–3 year service-back commitment. This is the highest-ROI Executive MBA path because the fee burden is externalised while the personal career upside remains." },
    { title: "The international-mobility seeker", body: "You plan to move abroad post-MBA. AACSB / EQUIS-accredited Executive MBAs (ISB, IIM Bangalore, MDI, IIM Calcutta) carry meaningful international recognition that Distance and most Online MBAs still lack." },
  ],
};

const NOT_FIT = {
  distance: [
    "You need live faculty interaction to stay accountable (40%+ dropout risk is real).",
    "You want to target Tier-1 consulting, PE, or investment banking as your first post-MBA role.",
    "You need structured placement support to convert the degree into a job change.",
    "You need international recognition (limited outside India).",
  ],
  online: [
    "You cannot commit 12–15 hours per week for 24 months alongside your job.",
    "Your budget is under ₹1.5 lakh (Distance may be a better fit).",
    "You need a Tier-1 IIM/ISB brand for a specific target employer (Executive is the fit).",
    "Your target industry has a stated preference for regular/residential MBAs.",
  ],
  executive: [
    "You cannot afford ₹8–25 lakh and don't have employer sponsorship.",
    "Your career objective is a within-industry promotion: Distance or Online is a better ROI.",
    "You have under 3 years' work experience (most Executive programmes require 3+).",
    "You are stretching financially to fund it without a clear reset opportunity in view.",
  ],
};

const FRAMEWORK_STEPS = [
  {
    step: 1,
    title: "How much can you actually spend?",
    body: `Set a walk-away number before you research programmes. If under ₹2 lakh: Distance or lower-end Online. If ₹1.5–3.5 lakh: Online. If ₹8+ lakh with no employer sponsorship: do a hard-nosed ROI calculation before committing to Executive.`,
  },
  {
    step: 2,
    title: "How many hours per week can you realistically commit?",
    body: "Block your actual calendar for two typical weeks. If 8–10 hours max: Distance. If 12–15 hours: Online. If 20+ hours or full-time: Executive (in-person or intensive online).",
  },
  {
    step: 3,
    title: `What's your target role two years post-MBA?`,
    body: `Name it specifically. "Manager" is too vague: Manager of what, where? If the target is a promotion in your current company: Distance or Online. If it's an industry switch: Online (moderate reset) or Executive (aggressive reset). If it's Tier-1 consulting: Executive at IIM/ISB.`,
  },
  {
    step: 4,
    title: `What does your employer actually think about Distance and Online MBAs?`,
    body: `Not what LinkedIn says: what your reporting manager and HR say. Have the conversation before you enrol. If they say "we prefer regular MBA" and your promotion clock matters, calibrate accordingly.`,
  },
  {
    step: 5,
    title: `What's your dropout risk profile?`,
    body: "Be honest. Distance MBA has 40%+ dropout in India. If you've historically struggled with self-paced learning, choose Online or Executive despite the higher fee: the completion probability is worth it.",
  },
  {
    step: 6,
    title: "Do you need international recognition?",
    body: "If you're planning to work or study abroad post-MBA within 5 years, prioritise AACSB or EQUIS-accredited programmes: OP Jindal Global (JGBS Online), ISB, IIM Bangalore, MDI. Distance MBAs rarely carry these accreditations.",
  },
];

const SCENARIOS = [
  {
    name: "Priya",
    initial: "P",
    age: 28,
    role: "Marketing Executive, Pune IT services firm",
    background: "B.Com graduate. 5 years' experience. Currently earning ₹9 LPA. Wants a promotion to Marketing Manager. Company HR policy requires an MBA credential for the Manager grade.",
    drivers: "Job continuity essential. Budget ceiling ₹2.5 L. Weekly time available: 12–14 hours.",
    recommendation: "Symbiosis Centre for Online Learning (SCOL), Online MBA in Marketing, ₹2.5 L.",
    outcome: "Promoted to Marketing Manager in Month 16, salary revised to ₹14 LPA (55% jump). Completed the MBA in Month 24 with a distinction in Consumer Behaviour.",
  },
  {
    name: "Rahul",
    initial: "R",
    age: 32,
    role: "Software Engineer, Bangalore product company",
    background: "B.Tech graduate. 9 years' experience in engineering. Currently earning ₹28 LPA. Wants to switch into product management or product marketing.",
    drivers: "Career reset priority. Willing to take a 6-month career break. Budget ceiling ₹15 L (self-funded, some employer support).",
    recommendation: "IIM Kozhikode EPGP (Executive Postgraduate Programme, interactive online), ₹15 L, 24 months.",
    outcome: "Transitioned into Senior Product Marketing Manager at a mid-stage B2B SaaS company at ₹42 LPA (50% jump) in Month 20.",
  },
  {
    name: "Anita",
    initial: "A",
    age: 24,
    role: "Fresh commerce graduate, Nashik",
    background: "B.Com graduate, 1 year of retail sales experience. Currently earning ₹3 LPA. Wants an MBA credential to open corporate career paths.",
    drivers: "Budget ceiling ₹1.5 L (self-funded from savings + parental support). Weekly time available: 8–9 hours.",
    recommendation: "ICFAI University Distance MBA (specialization: Marketing), ₹1.2 L, 24 months.",
    outcome: "Completed the MBA. Transitioned to a Business Development Executive role at a Pune-based fintech at ₹5.5 LPA (83% jump). Followed the MBA with a Digital Marketing certification.",
  },
];

const ROI_ROWS = [
  { label: "Total fee", d: "₹1.5 L", o: "₹2.5 L", e: "₹22 L", highlight: false },
  { label: "Opportunity cost (if applicable)", d: "₹0", o: "₹0", e: "~₹27 L (1 yr sabbatical, if residential)", highlight: false },
  { label: "Total investment", d: "₹1.5 L", o: "₹2.5 L", e: "~₹49 L (residential) or ₹22 L (part-time)", highlight: true },
  { label: "Median 5-yr cumulative salary uplift", d: "₹15–25 L", o: "₹20–35 L", e: "₹50–90 L", highlight: false },
  { label: "Net 5-yr benefit", d: "₹13–24 L", o: "₹18–33 L", e: "₹28–68 L (part-time)", highlight: false },
  { label: "ROI multiple", d: "9–16x", o: "7–13x", e: "1.5–3x (residential); 1.3–3x (part-time)", highlight: false },
  { label: "Payback period", d: "6–10 months", o: "8–14 months", e: "30–45 months", highlight: false },
];

const FAQS = [
  { q: "What is the main difference between Distance, Online, and Executive MBA?", a: "Distance MBA is self-paced with minimal live interaction, lowest cost. Online MBA offers scheduled live faculty sessions plus recorded playback, mid-tier cost, and structured placement support. Executive MBA is a full postgraduate degree designed for working professionals with 3+ years' experience, delivered in-person or intensive online, highest cost, strongest brand and placement outcomes." },
  { q: "Which MBA mode is best for working professionals in 2025-26?", a: "For most working professionals with 2–10 years' experience wanting a promotion in their current field, Online MBA is the best balance of cost, time commitment, credential, and live faculty interaction. Distance suits budget-constrained self-learners; Executive suits Tier-1 industry-reset moments." },
  { q: "Is Online MBA better than Distance MBA in India?", a: "Online MBA is better than Distance MBA for most working professionals because of three factors: live faculty interaction, structured cohort learning, and stronger placement support. Distance MBA remains a better fit only for self-disciplined budget-tight aspirants. Both are UGC-DEB approved and legally equivalent when the university is on the current list." },
  { q: "Is an Executive MBA worth it?", a: "Executive MBA is worth ₹15–25 lakh only when three conditions hold: you have 3+ years' experience, you're targeting a Tier-1 industry reset (consulting, PE, senior strategy, MNC leadership), and you have either employer sponsorship or clear financial capacity. Without a clear reset opportunity in view, Distance or Online delivers better ROI." },
  { q: "How much does each MBA mode cost in India in 2025-26?", a: "Distance MBA: ₹1.2–2 lakh. Online MBA: ₹1.5–3.5 lakh. Executive MBA: ₹8 lakh (Tier-2) to ₹25 lakh (IIM Indore residential). ISB PGPMAX and international programmes can go up to ₹40 lakh." },
  { q: "What is the salary difference between Distance, Online, and Executive MBA graduates?", a: "In 2025-26, median entry-level salary bumps are: Distance MBA graduates ₹2–4 lakh, Online MBA graduates ₹3–5 lakh, Executive MBA graduates from Tier-1 institutes ₹6–14 lakh. Executive delivers the biggest absolute jump but requires 5–15x the investment." },
  { q: "Are Distance and Online MBA valid for government jobs?", a: "Yes. UGC-DEB approved Distance and Online MBAs are legally equivalent to regular MBAs for all government job eligibility, per current UGC notifications (2020–2025). Confirm the specific university is on the UGC-DEB current approved-institutions list before enrolling." },
  { q: "Do employers actually accept Distance and Online MBAs in 2025-26?", a: "Most Indian employers, especially IT, SaaS, D2C, fintech, services, and mid-to-large private companies, accept Distance and Online MBAs from UGC-DEB approved universities at parity with regular MBAs. Tier-1 consulting, PE, and investment banking still prefer residential Tier-1 MBAs." },
  { q: "What is the dropout rate for each mode?", a: "As of 2025-26, Distance MBAs see 40%+ non-completion, Online MBAs 25–35%, and Executive MBAs under 10%. The completion gap is driven primarily by cohort presence and live faculty interaction, not by ability." },
  { q: "Can I get education loans for all three modes?", a: "Yes. Standard education-loan providers (SBI, HDFC Credila, ICICI Bank, Avanse) cover all UGC-DEB and AICTE approved programmes. Distance and Online MBAs typically use short-tenure personal loans or salary EMIs; Executive MBAs use full education loans. Interest rates in 2025-26 range 9.5–12.5%." },
  { q: "Can I convert from Distance to Online MBA mid-programme?", a: "Formally, no. Once enrolled, mode is fixed at the same university. However, you can enrol in a new Online MBA at a different university if career priorities change, though you lose progress. The better strategy is to choose the right mode at enrolment." },
  { q: "What is the difference between AICTE and UGC-DEB approval?", a: "UGC-DEB (Distance Education Bureau) approves Distance and Online MBAs under UGC's remit. AICTE approves technical management education. Some Online MBAs carry both UGC-DEB and AICTE approval. Executive MBAs typically operate under AICTE, or for IIMs, under the IIM Act 2017. All three approval bodies confer legally equivalent degrees." },
  { q: "Which mode is best for working professionals?", a: "For most working professionals in India in 2025-26, Online MBA is the best mode. It balances cost (₹1.5–3.5 lakh), time commitment (12–15 hours per week), live faculty interaction, and placement support. Distance suits only budget-tight self-directed learners. Executive suits only Tier-1 industry-reset moments.", voice: true },
  { q: "Is online MBA equal to regular MBA?", a: "Yes. As of 2025-26, an Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Employer acceptance is high in most sectors, though Tier-1 consulting and investment banking still prefer residential MBAs.", voice: true },
  { q: "How to choose the right MBA in India?", a: "Choose based on six factors: budget ceiling, weekly time availability, target role two years post-MBA, current employer's stated position on Online and Distance MBAs, your dropout risk profile, and whether you need international recognition. If under ₹3 lakh with a promotion target: Online MBA. Under ₹2 lakh, self-directed: Distance. Above ₹8 lakh, Tier-1 reset: Executive.", voice: true },
  { q: "How does CollegeNCourses help me choose the right mode?", a: "Our counsellors run a structured 30-minute free call in which we understand your role, income, career goal, budget, and timeline; walk you through the six-question decision framework; and shortlist three specific programmes across the right mode for your profile. We have no referral deal that affects our recommendation." },
];

const RELATED = [
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "Is Online MBA Valid for Government Jobs in India?", href: "/resources/online-mba-valid-government-jobs/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
  { title: "MBA in Marketing Management: The Honest Guide", href: "/specializations-guide/marketing/" },
  { title: "How to Choose Your MBA Specialization: A Framework", href: "/blogs/how-to-choose-mba-specialization/" },
];

export default function MBAModeComparisonClient() {
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
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
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
        /* Reading progress */
        .mc-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}

        /* Breadcrumb */
        .mc-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .mc-breadcrumb a{color:var(--grey)}
        .mc-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .mc-breadcrumb .sep{color:var(--pale-navy)}
        .mc-breadcrumb .cur{color:var(--navy);font-weight:500}

        /* Hero */
        .mc-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .mc-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .mc-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .mc-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .mc-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .mc-trust .stars{color:var(--yellow);letter-spacing:1px}
        .mc-trust .dot{color:var(--pale-navy)}
        .mc-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .mc-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center}
        .mc-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .mc-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .mc-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .mc-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .mc-caption{font-size:12px;color:var(--grey);font-style:italic}

        /* Layout */
        .mc-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.mc-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}

        /* ToC sidebar */
        .mc-toc-sidebar{display:none}
        @media(min-width:1024px){
          .mc-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .mc-toc-sidebar h4{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .mc-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .mc-toc-sidebar li{margin:0}
          .mc-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s}
          .mc-toc-sidebar a:hover{color:var(--navy)}
          .mc-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }

        /* Mobile ToC */
        .mc-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .mc-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .mc-toc-mobile summary::-webkit-details-marker{display:none}
        .mc-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .mc-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .mc-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .mc-toc-mobile li{padding:6px 0}
        .mc-toc-mobile a{color:var(--charcoal);font-size:14px}
        .mc-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.mc-toc-mobile{display:none}}

        /* Article body */
        .mc-body{max-width:860px}
        .mc-body section{scroll-margin-top:90px}
        .mc-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .mc-body h2:first-child{margin-top:0}
        .mc-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .mc-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .mc-body p:last-child{margin-bottom:0}
        .mc-body a{color:var(--navy);border-bottom:1px solid var(--yellow)}
        .mc-body a:hover{background:var(--yellow)}
        .mc-body strong{color:var(--navy);font-weight:700}

        /* Freshness signal */
        .mc-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .mc-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%}

        /* Key takeaways */
        .mc-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .mc-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .mc-takeaways ul{list-style:none;margin:0}
        .mc-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .mc-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .mc-takeaways li:last-child{margin-bottom:0}

        /* Decision matrix */
        .mc-dm{background:var(--white);border:2px solid var(--yellow);border-radius:14px;padding:24px;margin:24px 0;box-shadow:0 4px 14px rgba(36,48,72,.10)}
        .mc-dm h3{font-family:var(--font-sans) !important;font-size:11px !important;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey) !important;margin:0 0 16px !important}
        .mc-dm-list{list-style:none !important;margin:0 !important}
        .mc-dm-list li{display:grid;grid-template-columns:1fr auto;align-items:center;gap:16px;padding:14px 0;border-bottom:1px dashed var(--mist);font-size:15px;margin-bottom:0}
        .mc-dm-list li:last-child{border-bottom:none}
        .mc-dm-if{color:var(--charcoal)}
        .mc-dm-then{color:var(--navy);font-weight:700;text-align:right;white-space:nowrap}
        .mc-dm-arrow{color:var(--yellow);font-weight:800;margin:0 4px}
        @media(max-width:500px){.mc-dm-list li{grid-template-columns:1fr;gap:4px}.mc-dm-then{text-align:left}}

        /* Mode definition cards */
        .mc-mode-cards{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:768px){.mc-mode-cards{grid-template-columns:repeat(3,1fr)}}
        .mc-mode-card{background:var(--white);border:1px solid var(--mist);border-top:4px solid var(--yellow);border-radius:8px;padding:24px}
        .mc-badge{display:inline-block;background:var(--navy);color:var(--yellow);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:4px;margin-bottom:12px}
        .mc-mode-card h3{font-family:var(--font-serif);color:var(--navy);font-size:22px;margin-bottom:12px;line-height:1.2}
        .mc-mode-card p{font-size:14px;line-height:1.65;color:var(--charcoal);margin-bottom:12px}
        .mc-mode-card p:last-child{margin-bottom:0}
        .mc-regulator{font-size:12px;color:var(--grey);font-style:italic;margin-top:8px;padding-top:12px;border-top:1px solid var(--mist) !important}

        /* Data tables */
        .mc-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .mc-table{width:100%;border-collapse:collapse;font-size:14px;min-width:640px}
        .mc-table thead{background:var(--navy);color:var(--yellow)}
        .mc-table th{text-align:left;padding:14px 16px;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle}
        .mc-table td{padding:14px 16px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.5}
        .mc-table tbody tr:hover{background:var(--ivory)}
        .mc-table .fee{color:var(--navy);font-weight:700}
        .mc-table caption{caption-side:bottom;text-align:left;padding:12px 16px;font-size:12px;color:var(--grey);font-style:italic;line-height:1.5}
        .mc-table td strong{color:var(--navy)}

        /* Fee cards */
        .mc-fee-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:900px){.mc-fee-grid{grid-template-columns:repeat(3,1fr)}}
        .mc-fee-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;border-top:4px solid var(--yellow)}
        .mc-fee-card h4{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:12px;line-height:1.2}
        .mc-fee-range{font-family:var(--font-serif);color:var(--navy);font-size:24px;background:var(--pale-navy);padding:8px 14px;border-radius:8px;display:inline-block;margin-bottom:12px}
        .mc-fee-card p{font-size:14px;line-height:1.6;margin-bottom:12px}
        .mc-named-fees{list-style:none;margin:12px 0 0 !important;padding:12px 0 0;border-top:1px solid var(--mist);font-size:13px}
        .mc-named-fees li{padding:4px 0;color:var(--charcoal);display:flex;justify-content:space-between;gap:12px;margin-bottom:0}
        .mc-named-fees .uni{color:var(--charcoal);flex:1}
        .mc-named-fees .price{color:var(--navy);font-weight:700;white-space:nowrap}

        /* Callout */
        .mc-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .mc-callout-label{display:block;font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .mc-callout-navy{background:var(--pale-navy)}

        /* Fit grid */
        .mc-fit-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:900px){.mc-fit-grid{grid-template-columns:repeat(3,1fr)}}
        .mc-fit-col{background:var(--pale-navy);border-radius:8px;padding:16px}
        .mc-fit-col-header{font-family:var(--font-serif);color:var(--navy);font-size:18px;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid var(--yellow)}
        .mc-fit-persona{background:var(--white);border-radius:8px;padding:16px;margin-bottom:12px}
        .mc-fit-persona:last-child{margin-bottom:0}
        .mc-fit-persona h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.3;margin-bottom:8px}
        .mc-fit-persona p{font-size:13px;line-height:1.55;color:var(--charcoal);margin:0}

        /* Not-fit columns */
        .mc-not-fit{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:900px){.mc-not-fit{grid-template-columns:repeat(3,1fr)}}
        .mc-not-col{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;border-top:3px solid #C04B4B}
        .mc-not-col h4{font-family:var(--font-serif);color:var(--navy);font-size:17px;margin-bottom:12px}
        .mc-not-col ul{list-style:none;margin:0 !important;padding:0}
        .mc-not-col li{position:relative;padding-left:22px;margin-bottom:12px;font-size:14px;line-height:1.55;color:var(--charcoal)}
        .mc-not-col li::before{content:'×';position:absolute;left:0;top:-2px;color:#C04B4B;font-weight:800;font-size:18px}

        /* Steps */
        .mc-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .mc-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .mc-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .mc-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:8px;line-height:1.25}
        .mc-step-body p{font-size:15px;line-height:1.65;margin:0}

        /* Scenario cards */
        .mc-scenarios{display:grid;grid-template-columns:1fr;gap:24px;margin:24px 0}
        .mc-scenario{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .mc-scenario-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .mc-scenario-avatar{flex:0 0 56px;width:56px;height:56px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:28px;font-weight:700;border:3px solid var(--yellow)}
        .mc-scenario-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:20px;margin-bottom:4px;line-height:1.2}
        .mc-scenario-meta p{color:var(--pale-navy);font-size:13px;margin:0}
        .mc-scenario-body{padding:24px}
        .mc-scenario-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .mc-scenario-row:last-child{border-bottom:none}
        .mc-scenario-row-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .mc-scenario-row p{font-size:14px;line-height:1.6;margin:0}
        .mc-scenario-recommend{background:var(--pale-navy);padding:12px 16px;border-left:3px solid var(--yellow);border-radius:0 8px 8px 0;margin-top:8px}
        .mc-scenario-outcome{background:#E8F5EA;padding:12px 16px;border-left:3px solid #2A7A3A;border-radius:0 8px 8px 0;margin-top:8px}
        .mc-scenario-outcome strong{color:#2A7A3A}

        /* ROI table */
        .mc-roi-highlight td{font-weight:700;color:var(--navy);background:var(--pale-navy) !important}

        /* FAQ */
        .mc-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .mc-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .mc-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .mc-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .mc-faq-q::-webkit-details-marker{display:none}
        .mc-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .mc-faq-item[open] .mc-faq-icon{transform:rotate(45deg)}
        .mc-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .mc-voice-badge{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}

        /* Lead magnet */
        .mc-lead-magnet{background:var(--navy);color:var(--ivory);border-radius:14px;padding:40px 32px;margin:48px 0;border:3px solid var(--yellow);position:relative}
        .mc-lead-badge{position:absolute;top:-12px;left:24px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:4px}
        .mc-lead-magnet h2{color:var(--ivory) !important;font-size:clamp(22px,3vw,28px) !important;margin-top:0 !important;margin-bottom:12px !important}
        .mc-lead-lead{color:var(--pale-navy);font-size:15px;line-height:1.6;margin-bottom:24px}
        .mc-lm-form{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.mc-lm-form{grid-template-columns:1fr 1fr}.mc-lm-full{grid-column:1/-1}}
        .mc-lm-field{display:flex;flex-direction:column}
        .mc-lm-field label{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--pale-navy);margin-bottom:6px}
        .mc-lm-field label .req{color:var(--yellow);margin-left:3px}
        .mc-lm-field input,.mc-lm-field select{background:rgba(255,255,255,.08);border:1px solid rgba(214,219,237,.3);border-radius:8px;padding:12px 14px;color:var(--ivory);font-size:15px;transition:border-color .15s,background .15s;font-family:inherit}
        .mc-lm-field input:focus,.mc-lm-field select:focus{outline:none;background:rgba(255,255,255,.14);border-color:var(--yellow)}
        .mc-lm-field input::placeholder{color:rgba(214,219,237,.5)}
        .mc-lm-field select{appearance:none;-webkit-appearance:none;padding-right:40px}
        .mc-lm-consent{font-size:12px;color:var(--pale-navy);line-height:1.55;margin:16px 0}
        .mc-lm-submit{background:var(--yellow);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:800;font-size:15px;box-shadow:0 4px 16px rgba(36,48,72,.22);border:none;cursor:pointer;transition:transform .15s;width:100%}
        @media(min-width:640px){.mc-lm-submit{width:auto}}
        .mc-lm-submit:hover{transform:translateY(-2px)}

        /* Related resources */
        .mc-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.mc-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.mc-related-grid{grid-template-columns:repeat(3,1fr)}}
        .mc-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal)}
        .mc-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .mc-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-family:var(--font-serif);font-size:16px}
        .mc-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}

        /* Authors */
        .mc-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .mc-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .mc-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .mc-author-row:last-child{border-bottom:none}
        .mc-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .mc-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .mc-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}

        .mc-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px;line-height:1.7}
        .mc-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .mc-sources ul{list-style:none;margin:0 0 12px !important;padding:0}
        .mc-sources li{padding:4px 0;color:var(--charcoal)}
        .mc-sources a{color:var(--navy);border-bottom:1px dotted var(--navy)}

        /* CTA band */
        .mc-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .mc-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .mc-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .mc-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .mc-cta-band .mc-btn-navy{background:var(--navy);color:var(--yellow)}
        .mc-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px}
      `}</style>

      {/* Reading progress */}
      <div ref={progressRef} className="mc-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="mc-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="sep">›</span>
          <a href="/resources">Resources</a>
          <span className="sep">›</span>
          <span className="cur">Distance vs Online vs Executive MBA Guide</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mc-hero" id="hero">
        <div className="container">
          <span className="mc-eyebrow">Resource Guide • 2025-26 Edition</span>
          <h1>Distance MBA vs Online MBA vs Executive MBA: the honest 2025-26 comparison</h1>
          <p className="mc-subtitle">
            Fees, duration, salary, placement, and employer acceptance: all three modes compared side by side. Built from 412 alumni interviews and 2,000+ counselling conversations. No paid rankings. No sales pitch.
          </p>
          <div className="mc-trust">
            <span><span className="stars">★★★★★</span> 4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed since 2019</span>
            <span className="dot">•</span>
            <span>150+ verified universities</span>
          </div>
          <div className="mc-cta-row">
            <button className="mc-btn mc-btn-primary" onClick={() => setModalOpen(true)}>
              Get a free 30-min mode recommendation →
            </button>
            <a href="#pdf-download" className="mc-btn mc-btn-outline">Download the PDF version ↓</a>
          </div>
          <p className="mc-caption">
            Last verified: 15 December 2025 against UGC-DEB current approved-institutions list and AICTE Handbook 2025-26.
          </p>
        </div>
      </section>

      {/* Main layout */}
      <div className="container">
        <div className="mc-layout">

          {/* ToC Sidebar */}
          <aside className="mc-toc-sidebar" aria-label="On this page">
            <h4>On this page</h4>
            <ol>
              {TOC_ITEMS.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={activeId === t.id ? "active" : ""}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Article body */}
          <article className="mc-body">

            {/* Mobile ToC */}
            <details className="mc-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
                ))}
              </ol>
            </details>

            {/* SECTION 2: Key Takeaways */}
            <section id="takeaways" className="mc-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i}><strong>{t.label}:</strong> {t.text}</li>
                ))}
              </ul>
            </section>

            {/* SECTION 3: Quick Decision Matrix */}
            <section id="decision-matrix">
              <h2>The 3-second answer for most aspirants</h2>
              <p><strong>Choose an Online MBA if you&apos;re a working professional with 2-10 years&apos; experience wanting a promotion.</strong> Choose a Distance MBA if your budget ceiling is under ₹2 lakh and you&apos;re self-disciplined. Choose an Executive MBA if you&apos;re targeting a Tier-1 industry reset, consulting career, or senior strategy role and can invest ₹15–25 lakh.</p>
              <div className="mc-dm">
                <h3>Decision matrix</h3>
                <ul className="mc-dm-list">
                  {DECISION_MATRIX.map((row, i) => (
                    <li key={i}>
                      <span className="mc-dm-if">{row.cond}</span>
                      <span className="mc-dm-then"><span className="mc-dm-arrow">→</span> {row.then}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* SECTION 4: What Each Mode Is */}
            <section id="mode-defs">
              <h2>What each mode really means (before the jargon)</h2>
              <p><strong>Distance MBA is self-paced study with minimal live interaction</strong>, delivered largely through recorded content and printed material. Online MBA is scheduled live-class instruction with faculty interaction, recorded playback, and structured cohorts. Executive MBA is a full or part-time postgraduate programme designed for working professionals with 3+ years&apos; experience, delivered in-person or intensive interactive online.</p>
              <div className="mc-mode-cards">
                {MODE_DEFS.map((m, i) => (
                  <div className="mc-mode-card" key={i}>
                    <span className="mc-badge">{m.badge}</span>
                    <h3>{m.title}</h3>
                    <p>{m.body}</p>
                    <p><strong>Best fit:</strong> {m.fit}</p>
                    <p className="mc-regulator">Regulator: {m.regulator}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: Complete Comparison Table */}
            <section id="comparison">
              <h2>The complete comparison, 13 dimensions</h2>
              <p>This is the master comparison table. Every dimension aspirants actually ask about, side by side.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr>
                      <th>Dimension</th>
                      <th>Distance MBA</th>
                      <th>Online MBA</th>
                      <th>Executive MBA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td className={i === 1 ? "fee" : ""}>{row[1]}</td>
                        <td className={i === 1 ? "fee" : ""}>{row[2]}</td>
                        <td className={i === 1 ? "fee" : ""}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>
                    As of 2025-26. Sources: CollegeNCourses internal alumni tracking, UGC-DEB, AICTE Handbook 2025-26, AmbitionBox salary benchmarks Q3 2025.
                  </caption>
                </table>
              </div>
            </section>

            {/* SECTION 6: Fees & Financing */}
            <section id="fees">
              <span className="mc-freshness">Last verified 15 December 2025 · University official pages</span>
              <h2>What you&apos;ll actually pay across the three modes</h2>
              <p><strong>Distance MBA fees in India for 2025-26 range from ₹1.2 lakh (ICFAI, IGNOU) to ₹2 lakh (NMIMS Distance).</strong> Online MBA fees range from ₹1.4 lakh (Chandigarh University) to ₹3.5 lakh (OP Jindal Global). Executive MBA fees range from ₹8 lakh (Tier-2 institutes) to ₹25 lakh (IIM Indore residential one-year programme).</p>
              <p>Fee is the most-searched criterion for MBA mode choice, and also the most misunderstood. Distance and Online MBAs sit within a much narrower band than most aspirants realise. Executive MBAs sit in an entirely different bracket.</p>
              <div className="mc-fee-grid">
                {FEE_CARDS.map((card, i) => (
                  <div className="mc-fee-card" key={i}>
                    <h4>{card.title}</h4>
                    <div className="mc-fee-range">{card.range}</div>
                    <p>{card.desc}</p>
                    <ul className="mc-named-fees">
                      {card.fees.map((f, j) => (
                        <li key={j}>
                          <span className="uni">{f.uni}</span>
                          <span className="price">{f.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mc-callout">
                <span className="mc-callout-label">The Distance–Online fee gap is smaller than it looks</span>
                The mainstream Distance-to-Online fee gap is ₹50,000–1,00,000. Spread over 24 months, that&apos;s ₹2,000–4,000 per month, often less than the aspirant&apos;s monthly Uber or Zomato spend. Choosing the wrong mode to save ₹80,000 is the most common financial mis-optimisation we see in counselling calls.
              </div>
            </section>

            {/* SECTION 7: Duration */}
            <section id="duration">
              <h2>How much time each mode actually demands</h2>
              <p>Duration and weekly time are the two dimensions aspirants underestimate most. Total programme duration is comparable across the three modes for the standard 24-month formats, but weekly time and cognitive load differ substantially.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr><th>Mode</th><th>Total duration</th><th>Weekly time</th><th>Peak workload periods</th></tr>
                  </thead>
                  <tbody>
                    {DURATION_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>A useful mental model: <strong>total study effort across a 24-month MBA is roughly 850 hours for Distance, 1,200 hours for Online, and 1,600 hours for a part-time Executive MBA.</strong> That difference explains the dropout gap and the outcome gap.</p>
            </section>

            {/* SECTION 8: Curriculum */}
            <section id="curriculum">
              <h2>What learning actually looks like across the three modes</h2>
              <p>Curricula are 70–80% overlapping across the three modes for the core management subjects. What differs is delivery format, depth of specialisation, and cohort learning.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr><th>Element</th><th>Distance MBA</th><th>Online MBA</th><th>Executive MBA</th></tr>
                  </thead>
                  <tbody>
                    {CURRICULUM_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>The single biggest curriculum shift across all three modes in 2024-25 has been the introduction of &quot;AI for Managers&quot; electives at nearly every UGC-DEB approved university. See our <a href="/specializations-guide/marketing/">Marketing Management specialization guide</a> for a deeper look at curriculum changes.</p>
            </section>

            {/* SECTION 9: Faculty */}
            <section id="faculty">
              <h2>Who you learn from and with</h2>
              <p>Faculty quality and peer network are two of the most under-discussed dimensions in the mode-choice conversation, and often the ones that make the biggest difference to long-term career outcomes.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr><th>Dimension</th><th>Distance MBA</th><th>Online MBA</th><th>Executive MBA</th></tr>
                  </thead>
                  <tbody>
                    {FACULTY_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mc-callout mc-callout-navy">
                <span className="mc-callout-label">Counsellor observation</span>
                The single biggest predictor of MBA completion and career outcome in our tracking is not fee, brand, or curriculum: it&apos;s live faculty interaction and cohort presence. Aspirants who reported &quot;regular live sessions with faculty&quot; had completion rates of 78% (Online) and 92% (Executive). Aspirants who chose pure self-paced Distance reported 58% completion. (CollegeNCourses Senior Counsellor Desk)
              </div>
            </section>

            {/* SECTION 10: Placement */}
            <section id="placement">
              <span className="mc-freshness">Last verified · 412 alumni surveyed 2024-25</span>
              <h2>What placement support looks like in each mode</h2>
              <p>Placement support ranges from minimal in Distance MBA (self-driven) to very strong in Executive MBA (guaranteed placement cell). Online MBA sits in between, with structured career services, resume workshops, and university-tied hiring at most Tier-1 universities.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr><th>Programme</th><th>Mode</th><th>Placement conversion</th></tr>
                  </thead>
                  <tbody>
                    {PLACEMENT_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>
                    Placement conversion = % of graduates seeking a new role who secured one within 6 months, per CollegeNCourses internal alumni tracking 2024-25 (n=412).
                  </caption>
                </table>
              </div>
            </section>

            {/* SECTION 11: Salary */}
            <section id="salary">
              <span className="mc-freshness">Cross-referenced with AmbitionBox, Naukri JobSpeak, LinkedIn Salary India Dataset Q3 2025</span>
              <h2>Salary outcomes across the three modes</h2>
              <p>Median 2025-26 post-MBA salaries in India differ substantially across the three modes. Distance MBA graduates typically see a ₹2–4 lakh entry-level bump, Online MBA graduates a ₹3–5 lakh bump, and Executive MBA graduates from Tier-1 institutes a ₹6–14 lakh bump.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr>
                      <th>Experience band</th>
                      <th>Distance MBA</th>
                      <th>Online MBA</th>
                      <th>Executive Tier-1</th>
                      <th>Executive Tier-2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td className="fee">{row[1]}</td>
                        <td className="fee">{row[2]}</td>
                        <td className="fee">{row[3]}</td>
                        <td className="fee">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>Bands represent 25th–75th percentile. Top 10% earn significantly higher; bottom 10% earn below.</caption>
                </table>
              </div>
            </section>

            {/* SECTION 12: Approval */}
            <section id="approval">
              <h2>Regulatory approval and employer recognition</h2>
              <p>All three MBA modes are legally recognised in India when the awarding university holds the correct approval. Distance and Online MBAs require UGC-DEB approval under the 2020 Online Regulations. Executive MBAs require AICTE approval or, for IIMs, coverage under the IIM Act 2017. Employer acceptance varies more than legal validity.</p>
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr><th>Element</th><th>Distance MBA</th><th>Online MBA</th><th>Executive MBA</th></tr>
                  </thead>
                  <tbody>
                    {APPROVAL_ROWS.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row[0]}</strong></td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mc-callout">
                <span className="mc-callout-label">Common misconception</span>
                &quot;Online MBA degrees are second-class.&quot; As of 2025-26, UGC has been explicit that Online MBA degrees from approved universities carry identical legal standing to regular MBAs. Employer acceptance has followed. What varies is employer preference in premium hiring segments (consulting, PE, investment banking), where residential Tier-1 MBAs retain an edge. For the mainstream Indian job market (IT, SaaS, FMCG, D2C, banking, insurance), Distance and Online MBAs from UGC-DEB approved universities are hired at parity.
              </div>
            </section>

            {/* SECTION 13: Who Each Mode Fits */}
            <section id="who-fits">
              <h2>Who each mode is genuinely built for</h2>
              <p>Three profile cards per mode. If you recognise yourself in one, that mode is worth serious consideration.</p>
              <div className="mc-fit-grid">
                <div className="mc-fit-col">
                  <div className="mc-fit-col-header">Distance MBA fits</div>
                  {WHO_FITS.distance.map((p, i) => (
                    <div className="mc-fit-persona" key={i}>
                      <h4>{p.title}</h4>
                      <p>{p.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mc-fit-col">
                  <div className="mc-fit-col-header">Online MBA fits</div>
                  {WHO_FITS.online.map((p, i) => (
                    <div className="mc-fit-persona" key={i}>
                      <h4>{p.title}</h4>
                      <p>{p.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mc-fit-col">
                  <div className="mc-fit-col-header">Executive MBA fits</div>
                  {WHO_FITS.executive.map((p, i) => (
                    <div className="mc-fit-persona" key={i}>
                      <h4>{p.title}</h4>
                      <p>{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 14: Who Should NOT Pick Each Mode */}
            <section id="not-fit">
              <h2>Who should NOT pick each mode</h2>
              <p>Every mode has anti-fit signals. If two or more of the below describe you for a given mode, choose a different one.</p>
              <div className="mc-not-fit">
                <div className="mc-not-col">
                  <h4>Distance MBA: don&apos;t pick if</h4>
                  <ul>
                    {NOT_FIT.distance.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div className="mc-not-col">
                  <h4>Online MBA: don&apos;t pick if</h4>
                  <ul>
                    {NOT_FIT.online.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div className="mc-not-col">
                  <h4>Executive MBA: don&apos;t pick if</h4>
                  <ul>
                    {NOT_FIT.executive.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mc-callout mc-callout-navy">
                <span className="mc-callout-label">Counsellor observation</span>
                The most expensive regret we see is aspirants who fund a ₹15–25 lakh Executive MBA without a specific industry-reset plan. They complete the programme, return to the same role, and take 4–5 years to recover the investment. Executive MBA works best when there&apos;s a specific Tier-1 opportunity (consulting, PE, MNC senior strategy) in clear view before enrolment. (CollegeNCourses Senior Counsellor Desk)
              </div>
            </section>

            {/* SECTION 15: 6-Question Framework */}
            <section id="framework">
              <h2>How to decide which MBA mode is right for you: 6 questions</h2>
              <p>Every mode-choice regret we hear in follow-up counselling calls comes back to one or more of the six questions below going unanswered at the time of enrolment. Work through each honestly. Book a free counselling call if you get stuck on any.</p>
              <div className="mc-steps">
                {FRAMEWORK_STEPS.map((s) => (
                  <div className="mc-step-card" key={s.step}>
                    <div className="mc-step-num">{s.step}</div>
                    <div className="mc-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="mc-btn mc-btn-primary" onClick={() => setModalOpen(true)}>
                  Get personalised mode advice →
                </button>
              </div>
            </section>

            {/* SECTION 16: Real Aspirant Scenarios */}
            <section id="scenarios">
              <h2>Three real aspirant stories (anonymised)</h2>
              <div className="mc-scenarios">
                {SCENARIOS.map((s, i) => (
                  <div className="mc-scenario" key={i}>
                    <div className="mc-scenario-header">
                      <div className="mc-scenario-avatar">{s.initial}</div>
                      <div className="mc-scenario-meta">
                        <h3>{s.name}, {s.age}</h3>
                        <p>{s.role}</p>
                      </div>
                    </div>
                    <div className="mc-scenario-body">
                      <div className="mc-scenario-row">
                        <div className="mc-scenario-row-label">Background</div>
                        <p>{s.background}</p>
                      </div>
                      <div className="mc-scenario-row">
                        <div className="mc-scenario-row-label">Decision drivers</div>
                        <p>{s.drivers}</p>
                      </div>
                      <div className="mc-scenario-row">
                        <div className="mc-scenario-row-label">Recommendation</div>
                        <div className="mc-scenario-recommend"><p>{s.recommendation}</p></div>
                      </div>
                      <div className="mc-scenario-row">
                        <div className="mc-scenario-row-label">Outcome</div>
                        <div className="mc-scenario-outcome"><p><strong>{s.outcome}</strong></p></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mc-callout">
                <span className="mc-callout-label">What these three stories illustrate</span>
                The &quot;best&quot; mode depends entirely on the aspirant&apos;s constraints, career objective, and time availability. Priya, Rahul, and Anita would all be badly served by choosing each other&apos;s mode. The free 30-minute counselling call is designed exactly around this triangulation.
              </div>
            </section>

            {/* SECTION 17: ROI */}
            <section id="roi">
              <h2>The 5-year ROI picture</h2>
              <p>Every MBA is an investment. This section compares 5-year total return across the three modes for a representative aspirant: 5 years&apos; current experience, ₹9 LPA current salary, marketing specialization.</p>
              <div className="mc-table-wrap">
                <table className="mc-table mc-roi-table">
                  <thead>
                    <tr>
                      <th>Metric (5 years post-enrolment)</th>
                      <th>Distance MBA</th>
                      <th>Online MBA</th>
                      <th>Executive MBA (Tier-1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROI_ROWS.map((row, i) => (
                      <tr key={i} className={row.highlight ? "mc-roi-highlight" : ""}>
                        <td><strong>{row.label}</strong></td>
                        <td>{row.d}</td>
                        <td>{row.o}</td>
                        <td>{row.e}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Best fit if...</strong></td>
                      <td>Cost is the tightest constraint</td>
                      <td>You want the best absolute ROI multiple</td>
                      <td>Absolute salary uplift matters most and you have a Tier-1 reset opportunity</td>
                    </tr>
                  </tbody>
                  <caption>
                    Directional bands based on CollegeNCourses alumni tracking 2020-25. Individual outcomes vary substantially by employer, location, and post-MBA effort.
                  </caption>
                </table>
              </div>
              <div className="mc-callout">
                <span className="mc-callout-label">What the ROI numbers reveal</span>
                Distance and Online MBAs deliver the highest ROI <em>multiples</em> (return per rupee invested) because the investment is small. Executive MBAs deliver the highest <em>absolute</em> return but require a much higher upfront commitment. Which matters more to you, the multiple or the absolute, is the question that decides your mode.
              </div>
            </section>

            {/* SECTION 18: FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="mc-faq-list">
                {FAQS.map((faq, i) => (
                  <details className="mc-faq-item" key={i}>
                    <summary className="mc-faq-q">
                      <span>
                        {faq.q}
                        {faq.voice && <span className="mc-voice-badge">Voice</span>}
                      </span>
                      <span className="mc-faq-icon">+</span>
                    </summary>
                    <div className="mc-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* SECTION 19: Lead Magnet / PDF Download */}
            <section id="pdf-download">
              <div className="mc-lead-magnet">
                <span className="mc-lead-badge">Free Download</span>
                <h2>Take this guide with you</h2>
                <p className="mc-lead-lead">
                  The full 2025-26 comparison guide, print-ready and shareable. Includes the complete comparison table, decision framework worksheet, and cost-benefit calculator. Free. Just tell us where to send it.
                </p>
                <div className="mc-lm-form">
                  <div className="mc-lm-field">
                    <label>Full name<span className="req">*</span></label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="mc-lm-field">
                    <label>Email<span className="req">*</span></label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="mc-lm-field">
                    <label>Phone <span style={{ fontWeight: 400, color: "var(--pale-navy)" }}>(optional)</span></label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="mc-lm-field">
                    <label>Work experience<span className="req">*</span></label>
                    <select required>
                      <option value="">Select years of experience</option>
                      <option value="0-2">0–2 years</option>
                      <option value="3-7">3–7 years</option>
                      <option value="8+">8+ years</option>
                    </select>
                  </div>
                  <div className="mc-lm-field mc-lm-full">
                    <label>Mode of interest<span className="req">*</span></label>
                    <select required>
                      <option value="">Select preferred mode</option>
                      <option value="distance">Distance MBA</option>
                      <option value="online">Online MBA</option>
                      <option value="executive">Executive MBA</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                </div>
                <p className="mc-lm-consent">
                  By downloading, you agree to receive a follow-up email from a CollegeNCourses counsellor. We do not share your details with any university or third party. Unsubscribe anytime.
                </p>
                <button className="mc-lm-submit" onClick={() => setModalOpen(true)}>
                  Email me the PDF →
                </button>
              </div>
            </section>

            {/* SECTION 20: Related Resources */}
            <section id="related">
              <h2>Go deeper</h2>
              <div className="mc-related-grid">
                {RELATED.map((r, i) => (
                  <a href={r.href} className="mc-related-card" key={i}>
                    <div className="icon">→</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* SECTION 21: Authors & Sources */}
            <section id="authors">
              <div className="mc-authors">
                <h3>About this guide</h3>
                <div className="mc-author-row">
                  <strong>Written by: CollegeNCourses Editorial Team</strong>
                  <div className="mc-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="mc-author-bio">Leads content strategy for CollegeNCourses and has been writing on Indian higher education since 2020.</div>
                </div>
                <div className="mc-author-row">
                  <strong>Reviewed by: CollegeNCourses Senior Counsellor Desk</strong>
                  <div className="mc-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="mc-author-bio">Has counselled over 3,000 MBA aspirants across Distance, Online, and Executive modes since 2016.</div>
                </div>
                <div className="mc-author-row">
                  <strong>Approved by: Nikhita Pradeep Deshmukh</strong>
                  <div className="mc-author-role">Founder, DNYANAL EDUCON PRIVATE LIMITED</div>
                  <div className="mc-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="mc-sources">
                <h4>Sources referenced</h4>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>Regulatory</p>
                <ul>
                  <li>University Grants Commission (UGC): ugc.gov.in</li>
                  <li>UGC Distance Education Bureau (DEB): deb.ugc.ac.in, Approved-institutions list, 2025-26</li>
                  <li>AICTE Approval Process Handbook 2025-26: aicte-india.org</li>
                  <li>IIM Act 2017 (Ministry of Education, Government of India)</li>
                </ul>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4, marginTop: 12 }}>Salary & market data</p>
                <ul>
                  <li>AmbitionBox: Salary Benchmarks Q3 2025</li>
                  <li>Naukri.com JobSpeak Report: October 2025</li>
                  <li>LinkedIn Salary India Dataset: 2025</li>
                </ul>
                <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4, marginTop: 12 }}>Internal</p>
                <ul>
                  <li>CollegeNCourses alumni tracking (412 alumni surveyed 2024-25, refreshed quarterly)</li>
                  <li>CollegeNCourses counsellor enquiry logs, aggregated 2023-25, anonymised</li>
                </ul>
                <p style={{ fontStyle: "italic", marginTop: 12 }}>
                  This page is updated every six months. Next scheduled review: June 2026.
                </p>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* CTA Band */}
      <section className="mc-cta-band">
        <div className="container">
          <h2>Still unsure which mode fits you?</h2>
          <p>
            Talk to a CollegeNCourses counsellor. We&apos;ll walk you through the six-question framework in a free 30-minute call, then shortlist three programmes matched to your role, budget, and timeline.
          </p>
          <button className="mc-btn mc-btn-navy" onClick={() => setModalOpen(true)}>
            Book a free counselling call →
          </button>
          <br />
          <a href="/specializations-guide/marketing/" className="mc-cta-secondary">
            Or read our Marketing Management specialization guide →
          </a>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="mba-mode-comparison" />
    </>
  );
}
