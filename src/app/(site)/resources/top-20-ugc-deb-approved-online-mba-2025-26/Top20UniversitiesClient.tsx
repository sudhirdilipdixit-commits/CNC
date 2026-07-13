"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "top5-snapshot", label: "Top 5 snapshot" },
  { id: "ugc-deb-meaning", label: "What UGC-DEB approval means" },
  { id: "methodology", label: "Ranking methodology" },
  { id: "full-ranking", label: "All 20 universities" },
  { id: "top10-profiles", label: "Top 10 detailed profiles" },
  { id: "universities-11-20", label: "Universities 11-20" },
  { id: "fee-comparison", label: "Fee comparison" },
  { id: "placement-salary", label: "Placement & salary data" },
  { id: "verification-steps", label: "How to verify UGC-DEB status" },
  { id: "red-flags", label: "Red flags to avoid" },
  { id: "which-fits", label: "Which university fits your profile" },
  { id: "specializations", label: "Specialization cross-reference" },
  { id: "scenarios", label: "Aspirant scenarios" },
  { id: "faq", label: "FAQ" },
  { id: "pdf-download", label: "Download the full list" },
  { id: "authors", label: "About this guide" },
];

const TAKEAWAYS = [
  { label: "UGC-DEB approval is mandatory, not optional", text: "Only universities holding current UGC-DEB approval for their specific Online MBA programme offer a degree with the same legal standing as a conventional MBA for employment and further education. The 20 universities in this guide all meet this baseline." },
  { label: "NAAC grade and years of UGC-DEB track record matter beyond the minimum", text: "A university with NAAC 'A+' grade and multiple consecutive years of UGC-DEB approval gives you a stronger credential on paper and substantially less risk than a recent entrant, all else being equal." },
  { label: "No single ranking serves every aspirant", text: "The right university depends on your budget, target career track, preferred learning style, and whether private-sector brand perception matters more or government-job eligibility matters more. The ranked list highlights where each university leads." },
  { label: "Fee range is genuinely wide", text: "From Rs 1.2 lakh (ICFAI) to Rs 3.75 lakh (NMIMS), the full-programme fee spread is 3x within the top 20. Most aspirants can find a strong option under Rs 2 lakh without compromising on UGC-DEB standing." },
  { label: "Platform quality differences are real but hard to quantify", text: "Live-session frequency, mobile-app quality, and peer-community engagement vary significantly between universities despite similar branding claims. The profiles below highlight what we hear repeatedly from enrolled students." },
  { label: "Check approval fresh each time", text: "Approval statuses change. Verify directly on deb.ugc.ac.in before you enrol, even if you saw a university on this list recently, because our review cycle is six months and yours should be real-time." },
];

const UNIVERSITIES = [
  { rank: 1, name: "Amity University Online", short: "Amity", naac: "A+", fee: "1.6–2.0L", mode: "Online", established: 2020, ugcDeb: "2020", dualApproval: true, specializations: 12, strongFor: "Private-sector brand, IB & Analytics", slug: "amity" },
  { rank: 2, name: "NMIMS Global Access", short: "NMIMS", naac: "A++", fee: "2.5–3.75L", mode: "Online", established: 2016, ugcDeb: "2016", dualApproval: true, specializations: 10, strongFor: "Finance, Marketing, premium brand", slug: "nmims" },
  { rank: 3, name: "Manipal University Online (MAHE)", short: "Manipal MAHE", naac: "A++", fee: "1.6–2.2L", mode: "Online", established: 2019, ugcDeb: "2019", dualApproval: true, specializations: 9, strongFor: "Tech Management, Analytics, broad recognition", slug: "manipal" },
  { rank: 4, name: "Jain University Online", short: "Jain Online", naac: "A++", fee: "1.35–1.8L", mode: "Online", established: 2020, ugcDeb: "2020", dualApproval: false, specializations: 10, strongFor: "Value for money, entrepreneurship track", slug: "jain" },
  { rank: 5, name: "Chandigarh University Online", short: "CU Online", naac: "A+", fee: "1.2–1.6L", mode: "Online", established: 2021, ugcDeb: "2021", dualApproval: false, specializations: 8, strongFor: "Low fee, PSU-belt aspirants, HR specialization", slug: "cu" },
  { rank: 6, name: "Symbiosis Centre for Online Learning (SCOL)", short: "Symbiosis SCOL", naac: "A+", fee: "1.5–2.5L", mode: "Online", established: 2018, ugcDeb: "2018", dualApproval: true, specializations: 7, strongFor: "Operations, HR, brand recognition in West India", slug: "scol" },
  { rank: 7, name: "Lovely Professional University Online", short: "LPU Online", naac: "A+", fee: "1.4–1.8L", mode: "Online", established: 2020, ugcDeb: "2020", dualApproval: false, specializations: 9, strongFor: "Industry connect, flexible EMI", slug: "lpu" },
  { rank: 8, name: "DY Patil University Online", short: "DY Patil Online", naac: "A", fee: "1.2–1.6L", mode: "Online", established: 2021, ugcDeb: "2021", dualApproval: false, specializations: 6, strongFor: "Healthcare Management, Maharashtra employers", slug: "dypatil" },
  { rank: 9, name: "Sikkim Manipal University (SMU-DE)", short: "SMU-DE", naac: "B++", fee: "0.8–1.2L", mode: "Distance", established: 2001, ugcDeb: "2001", dualApproval: false, specializations: 8, strongFor: "Budget, government-job eligibility, long track record", slug: "smu" },
  { rank: 10, name: "ICFAI University Distance", short: "ICFAI", naac: "A", fee: "1.2–1.5L", mode: "Distance", established: 2002, ugcDeb: "2002", dualApproval: false, specializations: 7, strongFor: "Finance specialization, self-paced learning", slug: "icfai" },
  { rank: 11, name: "Pondicherry University (Distance)", short: "Pondicherry U", naac: "A", fee: "0.5–0.8L", mode: "Distance", established: 1985, ugcDeb: "2005", dualApproval: false, specializations: 5, strongFor: "Central University standing, very low fee", slug: "pu" },
  { rank: 12, name: "Annamalai University (CDOE)", short: "Annamalai", naac: "A", fee: "0.5–0.9L", mode: "Distance", established: 1979, ugcDeb: "2004", dualApproval: false, specializations: 6, strongFor: "Government-job eligibility, very long track record", slug: "annamalai" },
  { rank: 13, name: "Osmania University (CDOL)", short: "Osmania", naac: "A", fee: "0.3–0.5L", mode: "Distance", established: 1982, ugcDeb: "2003", dualApproval: false, specializations: 4, strongFor: "State University standing, very low fee, Telangana employers", slug: "osmania" },
  { rank: 14, name: "Madurai Kamaraj University (DDE)", short: "MKU", naac: "B++", fee: "0.3–0.5L", mode: "Distance", established: 1981, ugcDeb: "2002", dualApproval: false, specializations: 4, strongFor: "Tamil Nadu employers, very low fee", slug: "mku" },
  { rank: 15, name: "Alagappa University (DDE)", short: "Alagappa", naac: "A++", fee: "0.35–0.55L", mode: "Distance", established: 1985, ugcDeb: "2003", dualApproval: false, specializations: 4, strongFor: "High NAAC grade for fee bracket, Tamil Nadu", slug: "alagappa" },
  { rank: 16, name: "Bharathiar University (DDE)", short: "Bharathiar", naac: "A+", fee: "0.3–0.5L", mode: "Distance", established: 1981, ugcDeb: "2002", dualApproval: false, specializations: 4, strongFor: "Tamil Nadu employers, low fee, long track record", slug: "bharathiar" },
  { rank: 17, name: "Periyar University (Distance)", short: "Periyar", naac: "A", fee: "0.3–0.4L", mode: "Distance", established: 1997, ugcDeb: "2006", dualApproval: false, specializations: 3, strongFor: "Very low fee, Tamil Nadu employers", slug: "periyar" },
  { rank: 18, name: "VMOU (Vardhman Mahaveer Open University)", short: "VMOU", naac: "B++", fee: "0.25–0.4L", mode: "Distance", established: 1987, ugcDeb: "2003", dualApproval: false, specializations: 4, strongFor: "Rajasthan employers, very low fee, open university", slug: "vmou" },
  { rank: 19, name: "IGNOU", short: "IGNOU", naac: "A", fee: "0.4–0.6L", mode: "Distance", established: 1985, ugcDeb: "1985", dualApproval: false, specializations: 5, strongFor: "Central University brand, government-job eligibility, nationwide support", slug: "ignou" },
  { rank: 20, name: "Yashwantrao Chavan Maharashtra Open University (YCMOU)", short: "YCMOU", naac: "A", fee: "0.3–0.5L", mode: "Distance", established: 1989, ugcDeb: "2002", dualApproval: false, specializations: 4, strongFor: "Maharashtra employers, open university standing", slug: "ycmou" },
];

const TOP10_PROFILES = [
  {
    rank: 1,
    name: "Amity University Online",
    headline: "Best overall package for private-sector career aspirants",
    fee: "Rs 1.6–2.0 lakh (total programme)",
    naac: "A+ (2023)",
    ugcDeb: "Since 2020",
    aicte: "Yes",
    specializations: "12 — including Business Analytics, International Business, Data Science, Retail, and a dual-specialization option",
    platform: "Amity Online Learning Portal — synchronous weekly live sessions, recorded library, mobile app available",
    placement: "Amity Online Placement Support Cell — average reported starting salary for MBA completers varies widely by specialization and prior experience",
    bestFor: "Aspirants prioritising private-sector brand recognition, a wide specialization menu, and access to the Amity alumni network.",
    notBestFor: "Aspirants primarily targeting government-job promotion where AICTE approval specifics matter; aspirants for whom fee is the primary filter (other strong options cost less).",
    counsellorNote: "Most commonly shortlisted by aspirants targeting marketing, international business, and analytics roles at mid-to-large private firms. The Amity brand is widely recognised by HR at Indian private companies.",
  },
  {
    rank: 2,
    name: "NMIMS Global Access (SVKM's NMIMS University)",
    headline: "Premium private university brand, strongest for Finance and Marketing",
    fee: "Rs 2.5–3.75 lakh (total programme, specialization-dependent)",
    naac: "A++ (2023)",
    ugcDeb: "Since 2016",
    aicte: "Yes",
    specializations: "10 — Finance, Marketing, HR, Operations, Business Analytics, among others",
    platform: "NMIMS Global Access — live interactive sessions, case-method pedagogy, structured cohort model",
    placement: "NMIMS Online Career Services — placement outcomes influenced significantly by specialization and prior work experience",
    bestFor: "Aspirants with a strong finance or marketing career target, willing to pay the premium for a top-tier brand, expecting the brand to be recognised by financial services and FMCG employers.",
    notBestFor: "Budget-conscious aspirants — the NMIMS fee bracket is 50-100% higher than equivalent UGC-DEB approved options.",
    counsellorNote: "The NMIMS brand carries genuine recognition in banking, BFSI, and FMCG recruitment circles. For aspirants targeting these sectors, the fee premium often makes sense. For other tracks, the return on the premium is less clear.",
  },
  {
    rank: 3,
    name: "Manipal University Online (MAHE)",
    headline: "Best for Tech Management and Business Analytics specializations",
    fee: "Rs 1.6–2.2 lakh (total programme)",
    naac: "A++ (2024)",
    ugcDeb: "Since 2019",
    aicte: "Yes",
    specializations: "9 — including specializations in IT & Systems, Business Analytics, and Project Management alongside standard tracks",
    platform: "Manipal Online — well-developed LMS, strong mobile experience, asynchronous + synchronous mix",
    placement: "Manipal Career Services — strong IT-sector connection consistent with Manipal's broader engineering and technology reputation",
    bestFor: "IT professionals, engineers, and tech-adjacent aspirants targeting management roles who want a brand with both technology credibility and management standing.",
    notBestFor: "Aspirants for whom brand recognition in non-tech sectors (retail, manufacturing, FMCG) is the primary driver.",
    counsellorNote: "Consistently the top pick among our IT and engineering background aspirants. The MAHE brand's technology credibility transfers meaningfully to tech-management roles.",
  },
  {
    rank: 4,
    name: "Jain University Online",
    headline: "Strong value at a modest fee with a genuine private-university credential",
    fee: "Rs 1.35–1.8 lakh (total programme)",
    naac: "A++",
    ugcDeb: "Since 2020",
    aicte: "No (UGC-DEB only)",
    specializations: "10 — broad menu including Entrepreneurship and Family Business Management, which few other Online MBA providers offer",
    platform: "JainOnline — live + recorded, reasonably well-rated mobile experience",
    placement: "JainOnline placement support — strong Bangalore-region connections consistent with parent university's base",
    bestFor: "Aspirants balancing brand quality with budget, entrepreneurs, and aspirants targeting Bangalore-centric employers.",
    notBestFor: "Aspirants for whom dual AICTE approval is specifically required for a target role.",
    counsellorNote: "Jain's A++ NAAC grade at a fee bracket well below NMIMS and Amity is genuinely unusual. The Entrepreneurship and Family Business MBA is the only strong Online MBA option for that profile in our tracking.",
  },
  {
    rank: 5,
    name: "Chandigarh University Online",
    headline: "Lowest fee among private branded Online MBA options in the top 10",
    fee: "Rs 1.2–1.6 lakh (total programme)",
    naac: "A+",
    ugcDeb: "Since 2021",
    aicte: "No (UGC-DEB only)",
    specializations: "8 — including HR Management (consistently rated strong) and standard business tracks",
    platform: "CU iConnect — synchronous live sessions, decent LMS",
    placement: "CU Placement Cell — strong North India connections, particularly in manufacturing and PSU-adjacent sectors",
    bestFor: "North India-based aspirants targeting PSU, banking, or manufacturing employers for whom brand-name budget matters more than premium-brand pricing.",
    notBestFor: "Aspirants targeting premium BFSI or IT-management roles where Amity/NMIMS/Manipal brand recognition gives a meaningful edge.",
    counsellorNote: "The most common recommendation for aspirants who ask for 'a branded Online MBA that doesn't cost Rs 2+ lakh.'",
  },
  {
    rank: 6,
    name: "Symbiosis Centre for Online Learning (SCOL)",
    headline: "Strong for HR and Operations; recognised Symbiosis brand in West and South India",
    fee: "Rs 1.5–2.5 lakh",
    naac: "A+",
    ugcDeb: "Since 2018",
    aicte: "Yes",
    specializations: "7 — HR, Marketing, Finance, Operations, and a Project Management track",
    platform: "SCOL LMS — synchronous live sessions, structured programme with defined cohorts",
    placement: "Symbiosis Career Services — strong Pune-region and West India connections",
    bestFor: "Aspirants targeting HR or Operations roles, and those where Symbiosis brand recognition is already known to their target employer.",
    notBestFor: "Aspirants outside West/South India where Symbiosis carries less inherent name recognition.",
    counsellorNote: "The HR Management MBA here is consistently one of the strongest Online options for that specialization in our tracking.",
  },
  {
    rank: 7,
    name: "Lovely Professional University Online",
    headline: "Strong industry network, flexible EMI structure",
    fee: "Rs 1.4–1.8 lakh",
    naac: "A+",
    ugcDeb: "Since 2020",
    aicte: "No (UGC-DEB only)",
    specializations: "9 — including Logistics and Supply Chain Management which is a less common Online option",
    platform: "LPU Online — synchronous live sessions, large cohort model",
    placement: "LPU Career Services — wide industry connections across North India",
    bestFor: "Aspirants with a supply chain or logistics background, those needing flexible EMI, and North India-based aspirants.",
    notBestFor: "Aspirants for whom premium brand recognition in BFSI or IT-management sectors is the primary driver.",
    counsellorNote: "The Supply Chain and Logistics MBA is one of the few genuinely Online options for that specialization at this fee bracket.",
  },
  {
    rank: 8,
    name: "DY Patil University Online",
    headline: "Best for Healthcare Management; strong Maharashtra employer connections",
    fee: "Rs 1.2–1.6 lakh",
    naac: "A",
    ugcDeb: "Since 2021",
    aicte: "No (UGC-DEB only)",
    specializations: "6 — including Healthcare Management which is a distinctive specialization here",
    platform: "DY Patil Online — moderate platform, synchronous + asynchronous mix",
    placement: "DY Patil Career Support — Maharashtra hospital and healthcare sector connections",
    bestFor: "Healthcare professionals in Maharashtra seeking a management qualification that aligns with their sector, and aspirants targeting Maharashtra-based employers generally.",
    notBestFor: "Aspirants outside Maharashtra, or those for whom the platform experience and live-session quality are primary criteria.",
    counsellorNote: "The Healthcare Management MBA here is consistently the pick for healthcare professionals who want an Online option without relocating.",
  },
  {
    rank: 9,
    name: "Sikkim Manipal University — Distance Education (SMU-DE)",
    headline: "Longest-standing private Distance MBA with the strongest government-job track record",
    fee: "Rs 0.8–1.2 lakh",
    naac: "B++",
    ugcDeb: "Since 2001",
    aicte: "No",
    specializations: "8 — standard Distance MBA tracks",
    platform: "SMU-DE study centre model — primarily self-paced with regional support centre access",
    placement: "Limited centralised placement support compared to Online MBA providers",
    bestFor: "Aspirants primarily targeting government-job eligibility or promotion, for whom the long UGC-DEB approval track record is meaningful, and who prefer a lower fee bracket.",
    notBestFor: "Aspirants expecting a structured online platform experience, live sessions, or strong private-sector placement support.",
    counsellorNote: "SMU-DE's 20+ year UGC-DEB approval history is genuinely rare and is specifically meaningful for aspirants doing document verification for government roles years after graduation.",
  },
  {
    rank: 10,
    name: "ICFAI University Distance",
    headline: "Self-paced distance option with particular strength in Finance specialization",
    fee: "Rs 1.2–1.5 lakh",
    naac: "A",
    ugcDeb: "Since 2002",
    aicte: "No",
    specializations: "7 — Finance, Banking, HR, Marketing, Operations, among others",
    platform: "ICFAI Distance — primarily self-paced, minimal live sessions",
    placement: "ICFAI Career Services — stronger for Finance specialization aspirants",
    bestFor: "Aspirants targeting a Finance MBA who prefer self-paced study and value ICFAI's long track record in finance education.",
    notBestFor: "Aspirants expecting structured live sessions or an active cohort experience.",
    counsellorNote: "ICFAI's distance programme is one of the most consistently recommended for Finance specialization aspirants who prefer self-paced study.",
  },
];

const SPECIALIZATION_MATRIX = [
  { spec: "MBA in Marketing Management", topUniversities: "Amity, NMIMS, Symbiosis SCOL", guideLink: "/specializations-guide/marketing/" },
  { spec: "MBA in Digital Marketing", topUniversities: "Amity, Manipal MAHE, Jain Online", guideLink: "/specializations-guide/digital-marketing/" },
  { spec: "MBA in Business Analytics", topUniversities: "Manipal MAHE, NMIMS, Amity", guideLink: "/specializations-guide/business-analytics/" },
  { spec: "MBA in Finance Management", topUniversities: "NMIMS, ICFAI, Symbiosis SCOL", guideLink: "/specializations-guide/finance/" },
  { spec: "MBA in Banking & Finance Management", topUniversities: "NMIMS, SMU-DE, ICFAI", guideLink: "/specializations-guide/banking-finance/" },
  { spec: "MBA in Human Resource Management", topUniversities: "Symbiosis SCOL, Chandigarh University, LPU Online", guideLink: "/specializations-guide/human-resources/" },
  { spec: "MBA in Operations Management", topUniversities: "Symbiosis SCOL, Manipal MAHE, LPU Online", guideLink: "/specializations-guide/operations/" },
  { spec: "MBA in Supply Chain Management", topUniversities: "LPU Online, Manipal MAHE, Amity", guideLink: "/specializations-guide/supply-chain/" },
  { spec: "MBA in IT & Systems Management", topUniversities: "Manipal MAHE, Amity, Jain Online", guideLink: "/specializations-guide/it-systems/" },
  { spec: "MBA in Project Management", topUniversities: "Manipal MAHE, Symbiosis SCOL, Amity", guideLink: "/specializations-guide/project-management/" },
  { spec: "MBA in International Business", topUniversities: "Amity, NMIMS, Jain Online", guideLink: "/specializations-guide/international-business/" },
  { spec: "MBA in Healthcare Management", topUniversities: "DY Patil Online, Amity", guideLink: "/specializations-guide/healthcare-management/" },
];

const SCENARIOS = [
  {
    name: "Karan",
    initial: "K",
    age: 29,
    role: "IT Engineer at a Pune-based IT services firm",
    background: "5 years of experience as a software engineer, targeting a shift into Product Management or a Business Analyst role at a technology company. Budget: up to Rs 2.5 lakh. Company's HR recognises both technical and management credentials equally.",
    shortlist: ["Manipal MAHE (Business Analytics)", "Amity Online (Business Analytics)", "NMIMS (Business Analytics at the upper budget edge)"],
    recommendation: "Manipal MAHE — Business Analytics",
    rationale: "Manipal's technology credibility transfers meaningfully to tech-management roles, its Business Analytics MBA is one of the stronger offerings in this space, and the Rs 1.6-2.2 lakh fee leaves budget headroom compared to NMIMS. The MAHE A++ NAAC grade is also a durable credential on a long CV.",
    type: "success",
  },
  {
    name: "Fatima",
    initial: "F",
    age: 34,
    role: "Assistant Manager at a nationalised bank in Lucknow",
    background: "10 years' banking experience, targeting internal promotion from Scale II to Scale III and ultimately a specialist banking track. Budget: Rs 1.5 lakh. Government-job eligibility is the primary driver. Her bank's internal HR policy recognises UGC-DEB approved qualifications.",
    shortlist: ["Chandigarh University Online (low fee, UGC-DEB)", "SMU-DE (long track record, low fee)", "NMIMS (banking specialization, premium)"],
    recommendation: "Chandigarh University Online or SMU-DE depending on platform preference",
    rationale: "Both meet her primary UGC-DEB requirement fully. CU Online offers a more structured live-session experience at a slightly higher fee. SMU-DE offers the longer UGC-DEB approval track record at a lower fee with a more self-paced model. The NMIMS premium isn't justified by the government-job eligibility goal alone.",
    type: "success",
  },
  {
    name: "Deepak",
    initial: "D",
    age: 27,
    role: "Recent graduate considering Online MBA options",
    background: "Commerce graduate, first job in a small Hyderabad trading firm. Wanted to 'do an online MBA from a reputed university' without a clear career outcome in mind. Budget: 'as low as possible.'",
    shortlist: ["Osmania University Distance (cheapest at Rs 0.3L)", "MKU Distance", "IGNOU"],
    recommendation: "Guided conversation before shortlisting",
    rationale: "When no career outcome is defined, choosing a university purely on low fee risks investing 2 years in a credential that may not move the needle. A counselling conversation clarified his target: he wanted to move into banking. That reframe produced a specific shortlist (Chandigarh University Online or SMU-DE) and an explanation of why Osmania's fee-only advantage didn't offset its lower brand recognition in that sector.",
    type: "caution",
  },
];

const FAQS = [
  { q: "Which is the best Online MBA university in India in 2025-26?", a: "There's no single answer — 'best' depends on your career target, budget, and location. For private-sector brand recognition: Amity Online, NMIMS, or Manipal MAHE depending on your specialization. For government-job eligibility with a strong track record: SMU-DE or IGNOU. For the best value-for-money branded option: Jain University Online (A++ NAAC) or Chandigarh University Online. Full analysis in the profiles and which-university-fits-which-profile sections." },
  { q: "Is UGC-DEB approval the same as UGC approval?", a: "UGC-DEB (Distance Education Bureau) specifically governs Distance and Online programme approvals and is distinct from general UGC recognition. A university can be broadly UGC-recognised (as a legitimate institution) without holding current UGC-DEB approval for a specific Online MBA programme. Always verify approval at the programme level on deb.ugc.ac.in, not just the university's general UGC standing." },
  { q: "Does NAAC grade affect the value of an Online MBA?", a: "Yes, meaningfully. A higher NAAC grade (A++ > A+ > A) reflects a broader quality assessment of the entire institution and is a credential indicator that HR and recruiting bodies recognise, independent of the specific Online MBA programme. All other things equal, an A++ NAAC university's Online MBA carries a stronger credential signal than a B-grade university's, even if both are equally UGC-DEB approved." },
  { q: "Can I get an Online MBA from IIM or IIT?", a: "IIM and IIT offer specific Online/Executive programmes, but these are typically Executive Education programmes at a significantly different fee bracket (Rs 8-40+ lakh), not the UGC-DEB approved full Online MBA programmes discussed in this guide. Confirm the specific programme's status directly with the institution." },
  { q: "How long does an Online MBA take to complete?", a: "Typically 2 years (24 months, 4 semesters) for a standard Online or Distance MBA. Some universities offer a 3-year option for working professionals with lower semester intensity. Part-time and lateral entry options exist at some universities but are less common in Online mode." },
  { q: "Is IGNOU's MBA a good option?", a: "IGNOU is a genuinely strong choice specifically for aspirants prioritising government-job eligibility, the lowest possible fee (Rs 0.4-0.6 lakh), and a central government university credential. Its brand recognition in private-sector employment is lower than the private-university options ranked 1-8. The choice depends on what you're using the MBA for." },
  { q: "What is the difference between an Online MBA and a Distance MBA?", a: "Online MBA programmes are delivered primarily through a structured online learning platform with live or synchronous elements. Distance MBA programmes are primarily self-paced, typically using physical study materials with regional centre support. The distinction matters for learning experience — both can hold equivalent UGC-DEB approval status. Our full comparison guide covers this in detail." },
  { q: "How do I verify if a university is UGC-DEB approved?", a: "Visit deb.ugc.ac.in directly, navigate to the approved-institutions list, and confirm your specific university's name appears with your specific programme (Online MBA or MBA through Distance) listed as approved for the current academic year. Screenshots of this page are useful documentation to keep alongside your admission documents." },
  { q: "Which Online MBA is best for banking and finance careers?", a: "NMIMS Global Access (Finance specialization), ICFAI (Finance/Banking), SMU-DE (Banking & Finance), and Symbiosis SCOL (Finance) are consistently the top picks for banking and finance career tracks in our counselling. NMIMS carries the strongest brand recognition in the BFSI sector; ICFAI's long finance education track record also carries weight." },
  { q: "Which Online MBA is best for government jobs?", a: "For government-job eligibility specifically, the UGC-DEB track record length matters alongside current approval. SMU-DE (since 2001), IGNOU (since 1985), Annamalai (since 2004), and the state DDE universities have the longest track records. Among private Online MBAs, Amity, NMIMS, and Symbiosis SCOL all hold dual UGC-DEB and AICTE approval which removes one eligibility question. Full analysis in our Government Jobs guide." },
  { q: "Can I study Online MBA while working full-time?", a: "Yes — this is explicitly the design intent of both Online and Distance MBA programmes at all 20 universities in this guide. Workload varies between synchronous (live-session-heavy) and asynchronous (fully self-paced) models. See individual profiles for live session frequency." },
  { q: "What specializations are available in Online MBA?", a: "The full menu spans 12 major specializations across providers in the top 20: Marketing, Digital Marketing, Finance, Banking & Finance, Human Resource Management, Operations, Supply Chain, Business Analytics, IT & Systems, Project Management, International Business, and Healthcare Management. Not every university offers every specialization — the specialization cross-reference table matches your target specialization to the strongest universities offering it." },
  { q: "Which is the best Online MBA for a working professional?", a: "All 20 universities in this guide are explicitly designed for working professionals. The distinction is in platform experience and scheduling: if you need maximum flexibility, self-paced Distance options (ICFAI, SMU-DE, state DDE universities) give you study-at-your-own-pace freedom. If you learn better in structured cohorts with live faculty interaction, Amity, NMIMS, Manipal, and Symbiosis SCOL offer stronger synchronous models." },
  { q: "How much does an Online MBA cost in India?", a: "Within the top 20 UGC-DEB approved universities: Rs 0.25-0.6 lakh for state open universities and classic Distance options; Rs 0.8-1.5 lakh for mid-tier Distance providers; Rs 1.2-2.2 lakh for branded private Online MBAs; Rs 2.5-3.75 lakh for the premium tier (NMIMS). The Fee Guide covers the full true-cost breakdown." },
  { q: "Is it worth doing an Online MBA in India?", a: "It depends on what return you're measuring. For promotion-based salary acceleration, our salary data shows an average 18-35% increment in the first post-MBA promotion cycle. For career-track shift, it depends heavily on which track you're targeting. For government-job eligibility as a qualification, it resolves a specific credential requirement. The ROI case is strongest when there's a specific, named career outcome the MBA enables." },
  { q: "How does CollegeNCourses select universities for this ranking?", a: "Six factors weighted across career outcomes (25%), UGC-DEB standing (25%), learning experience (20%), industry recognition (15%), fee-to-value ratio (10%), and student support (5%). We are not paid by universities to include or rank them — our full methodology is in the ranking section." },
];

const RELATED = [
  { title: "Is Online MBA Valid for Government Jobs in India? 2025-26", href: "/resources/online-mba-valid-government-jobs/" },
  { title: "Distance vs Online vs Executive MBA: Complete Comparison Guide", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
  { title: "MBA in Business Analytics: The Complete Guide", href: "/specializations-guide/business-analytics/" },
  { title: "How to Choose Your MBA Specialization: A Framework", href: "/blogs/how-to-choose-mba-specialization/" },
];

const FEE_TIERS = [
  {
    tier: "Premium Online MBA",
    range: "Rs 2.5–3.75 lakh",
    universities: "NMIMS Global Access",
    who: "Aspirants where brand matters most in BFSI or FMCG employer conversations",
  },
  {
    tier: "Mid-range Online MBA",
    range: "Rs 1.2–2.2 lakh",
    universities: "Amity, Manipal MAHE, Jain, Chandigarh, Symbiosis SCOL, LPU, DY Patil",
    who: "Most working professionals — best value concentration of strong credentials",
  },
  {
    tier: "Distance MBA (private)",
    range: "Rs 0.8–1.5 lakh",
    universities: "SMU-DE, ICFAI",
    who: "Budget-conscious, government-job focus, self-paced preference",
  },
  {
    tier: "Distance MBA (state/open university)",
    range: "Rs 0.25–0.9 lakh",
    universities: "IGNOU, Pondicherry U, Annamalai, Osmania, MKU, Alagappa, Bharathiar, Periyar, VMOU, YCMOU",
    who: "Lowest fee, government-job eligibility, regional employer recognition",
  },
];

const PLACEMENT_TABLE = [
  { track: "Marketing / Digital Marketing", tier: "Mid-range branded (Amity, Manipal, NMIMS)", avgSalary: "Rs 7–12 LPA (experienced)", freshSalary: "Rs 4–6 LPA" },
  { track: "Finance / BFSI", tier: "NMIMS, Symbiosis SCOL, ICFAI", avgSalary: "Rs 8–15 LPA (experienced)", freshSalary: "Rs 4–7 LPA" },
  { track: "Business Analytics", tier: "Manipal MAHE, NMIMS, Amity", avgSalary: "Rs 9–18 LPA (experienced, IT sector)", freshSalary: "Rs 5–8 LPA" },
  { track: "HR Management", tier: "Symbiosis SCOL, CU Online", avgSalary: "Rs 6–10 LPA (experienced)", freshSalary: "Rs 3.5–5 LPA" },
  { track: "Operations / Supply Chain", tier: "Symbiosis SCOL, LPU Online", avgSalary: "Rs 7–12 LPA (experienced)", freshSalary: "Rs 4–6 LPA" },
];

const VERIFICATION_STEPS = [
  { step: 1, title: "Go directly to deb.ugc.ac.in", body: "This is the only authoritative source for UGC-DEB approval status. University websites, aggregator sites, and even advertisements frequently contain approval claims that are either inaccurate, outdated, or describe a different approval type." },
  { step: 2, title: "Search for the specific university by name", body: "Navigate to the approved-institutions list. Find your specific university — confirm the spelling matches exactly, since some universities operate multiple entities with similar names and only some may hold UGC-DEB approval." },
  { step: 3, title: "Confirm programme-level approval, not just institution-level", body: "A university may hold UGC-DEB approval for Distance mode only, Online mode only, or both. Confirm your specific programme (Online MBA or MBA via Distance) is explicitly listed as approved — general institutional approval is insufficient for this purpose." },
  { step: 4, title: "Confirm the approval year covers your intended enrolment year", body: "UGC-DEB approval must be active for your specific enrolment year. A university that held approval 3 years ago but hasn't maintained it since does not confer the same equivalence for programmes enrolled in today." },
  { step: 5, title: "Take and store a screenshot with the date", body: "A dated screenshot of the DEB approved-institutions list showing your specific university and programme is meaningful documentation. Store it alongside your admission documents — you may need to reference it years later in a promotion cycle or background check." },
  { step: 6, title: "Check AICTE approval separately if your target role requires it", body: "Visit aicte-india.org and confirm AICTE approval status for the specific programme if your target job notification explicitly requires AICTE approval. This step is only needed if dual AICTE approval is a specific eligibility requirement for your context." },
];

const WHICH_FITS = [
  { profile: "IT professional targeting a Product or Analytics role", recommendation: "Manipal MAHE or Amity (Business Analytics)" },
  { profile: "Banking professional seeking internal promotion", recommendation: "Chandigarh University or SMU-DE (or NMIMS for premium BFSI track)" },
  { profile: "Marketing professional targeting FMCG or e-commerce", recommendation: "NMIMS or Amity (Marketing specialization)" },
  { profile: "HR professional seeking formal management qualification", recommendation: "Symbiosis SCOL or Chandigarh University (HR specialization)" },
  { profile: "Healthcare professional in Maharashtra", recommendation: "DY Patil Online (Healthcare Management)" },
  { profile: "Government employee seeking promotion-eligibility qualification", recommendation: "IGNOU, Annamalai, or state DDE university (long UGC-DEB track record, very low fee)" },
];

export default function Top20UniversitiesClient() {
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
        .t2-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}
        .t2-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .t2-breadcrumb a{color:var(--grey)}.t2-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .t2-breadcrumb .sep{color:var(--pale-navy)}.t2-breadcrumb .cur{color:var(--navy);font-weight:500}
        .t2-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .t2-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .t2-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .t2-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .t2-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .t2-trust .stars{color:var(--yellow);letter-spacing:1px}.t2-trust .dot{color:var(--pale-navy)}
        .t2-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .t2-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center;text-decoration:none}
        .t2-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .t2-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .t2-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .t2-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .t2-caption{font-size:12px;color:var(--grey);font-style:italic}
        .t2-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.t2-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}
        .t2-toc-sidebar{display:none}
        @media(min-width:1024px){
          .t2-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .t2-toc-sidebar h4{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .t2-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .t2-toc-sidebar li{margin:0}
          .t2-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s;text-decoration:none}
          .t2-toc-sidebar a:hover{color:var(--navy)}
          .t2-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }
        .t2-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .t2-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .t2-toc-mobile summary::-webkit-details-marker{display:none}
        .t2-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .t2-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .t2-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .t2-toc-mobile li{padding:6px 0}
        .t2-toc-mobile a{color:var(--charcoal);font-size:14px;text-decoration:none}
        .t2-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.t2-toc-mobile{display:none}}
        .t2-body{max-width:860px}
        .t2-body section{scroll-margin-top:90px}
        .t2-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .t2-body h2:first-child{margin-top:0}
        .t2-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .t2-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .t2-body p:last-child{margin-bottom:0}
        .t2-body a{color:var(--navy);border-bottom:1px solid var(--yellow);text-decoration:none}
        .t2-body a:hover{background:var(--yellow)}
        .t2-body strong{color:var(--navy);font-weight:700}
        .t2-body ul{list-style:none;margin:0 0 16px;padding:0}
        .t2-body ul li{position:relative;padding-left:20px;margin-bottom:10px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .t2-body ul li::before{content:'';position:absolute;left:0;top:9px;width:8px;height:8px;background:var(--yellow);border-radius:50%}
        .t2-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .t2-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%;flex-shrink:0}
        .t2-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .t2-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .t2-takeaways ul{list-style:none;margin:0}.t2-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .t2-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .t2-takeaways li:last-child{margin-bottom:0}
        .t2-top5-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:640px){.t2-top5-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.t2-top5-grid{grid-template-columns:repeat(3,1fr)}}
        .t2-top5-card{background:var(--white);border:1px solid var(--mist);border-radius:12px;padding:20px;position:relative;overflow:hidden;transition:transform .15s,box-shadow .15s}
        .t2-top5-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10)}
        .t2-rank-badge{position:absolute;top:0;right:0;background:var(--navy);color:var(--yellow);font-family:var(--font-serif);font-size:22px;font-weight:700;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:0 12px 0 12px}
        .t2-top5-card h4{font-family:var(--font-serif);color:var(--navy);font-size:18px;margin-bottom:8px;padding-right:48px;line-height:1.3}
        .t2-top5-card .naac-badge{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;margin-bottom:8px}
        .t2-top5-card .fee-row{font-size:14px;color:var(--charcoal)}.t2-top5-card .fee-row strong{color:var(--navy)}
        .t2-top5-card .strong-for{font-size:13px;color:var(--grey);margin-top:8px;font-style:italic}
        .t2-ugc-deb-cards{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:640px){.t2-ugc-deb-cards{grid-template-columns:repeat(3,1fr)}}
        .t2-ugc-deb-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;border-top:4px solid var(--yellow)}
        .t2-ugc-deb-card h4{font-family:var(--font-serif);color:var(--navy);font-size:17px;margin-bottom:8px;line-height:1.3}
        .t2-ugc-deb-card p{font-size:14px;line-height:1.6;color:var(--charcoal);margin:0}
        .t2-methodology-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.t2-methodology-grid{grid-template-columns:repeat(2,1fr)}}
        .t2-method-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;display:flex;gap:12px;align-items:flex-start}
        .t2-method-weight{font-family:var(--font-serif);color:var(--yellow);font-size:28px;font-weight:700;line-height:1;flex:0 0 auto;min-width:52px}
        .t2-method-body h4{font-family:var(--font-serif);color:var(--navy);font-size:16px;margin-bottom:4px}
        .t2-method-body p{font-size:13px;color:var(--charcoal);margin:0;line-height:1.55}
        .t2-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .t2-table{width:100%;border-collapse:collapse;font-size:13px;min-width:700px}
        .t2-table thead{background:var(--navy);color:var(--yellow)}
        .t2-table th{text-align:left;padding:12px 14px;font-weight:700;font-size:11px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle;white-space:nowrap}
        .t2-table td{padding:12px 14px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:middle;line-height:1.4}
        .t2-table tbody tr:hover{background:var(--ivory)}
        .t2-table .t2-rank-cell{font-family:var(--font-serif);font-size:18px;font-weight:700;color:var(--navy);text-align:center}
        .t2-table .t2-naac-a-pp{color:#2A7A3A;font-weight:700}
        .t2-table .t2-naac-a-p{color:#2A7A3A;font-weight:600}
        .t2-table .t2-naac-a{color:#B06200;font-weight:600}
        .t2-table .t2-naac-b{color:var(--grey);font-weight:600}
        .t2-table .t2-dual{color:#2A7A3A;font-weight:600}
        .t2-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .t2-callout-label{display:block;font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .t2-callout-navy{background:var(--pale-navy)}
        .t2-profile-card{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;margin-bottom:32px;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .t2-profile-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .t2-profile-rank{font-family:var(--font-serif);font-size:32px;font-weight:700;color:var(--yellow);flex:0 0 56px;text-align:center}
        .t2-profile-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:22px;margin-bottom:4px;line-height:1.2}
        .t2-profile-meta p{color:var(--pale-navy);font-size:14px;margin:0}
        .t2-profile-body{padding:24px}
        .t2-profile-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:16px}
        @media(min-width:640px){.t2-profile-grid{grid-template-columns:1fr 1fr}}
        .t2-profile-item{padding:10px 14px;background:var(--ivory);border-radius:6px}
        .t2-profile-item-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .t2-profile-item-val{font-size:14px;color:var(--charcoal);font-weight:500;line-height:1.4}
        .t2-profile-section{margin-top:12px}
        .t2-profile-section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:6px}
        .t2-profile-text{font-size:14px;color:var(--charcoal);line-height:1.6;margin:0}
        .t2-profile-flag{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:11px;font-weight:600;padding:4px 10px;border-radius:4px;margin-right:6px;margin-bottom:6px}
        .t2-profile-flag-warn{background:#FFF3E0;color:#B06200}
        .t2-profile-footer{padding:12px 24px;background:var(--ivory);border-top:1px solid var(--mist);font-size:13px;color:var(--charcoal);font-style:italic}
        .t2-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .t2-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .t2-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .t2-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:8px;line-height:1.25}
        .t2-step-body p{font-size:15px;line-height:1.65;margin:0;color:var(--charcoal)}
        .t2-which-fits{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.t2-which-fits{grid-template-columns:repeat(2,1fr)}}
        .t2-fit-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;border-left:4px solid var(--yellow)}
        .t2-fit-card .profile{font-size:13px;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
        .t2-fit-card .recommendation{font-size:16px;color:var(--navy);font-family:var(--font-serif);font-weight:700;margin:0}
        .t2-spec-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .t2-spec-table{width:100%;border-collapse:collapse;font-size:13px;min-width:500px}
        .t2-spec-table thead{background:var(--navy);color:var(--yellow)}
        .t2-spec-table th{text-align:left;padding:12px 14px;font-weight:700;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
        .t2-spec-table td{padding:12px 14px;border-top:1px solid var(--mist);color:var(--charcoal);font-size:13px;line-height:1.45}
        .t2-spec-table tbody tr:hover{background:var(--ivory)}
        .t2-spec-table a{color:var(--navy);font-size:12px;font-weight:600;border-bottom:1px solid var(--yellow);text-decoration:none}
        .t2-scenarios{display:grid;grid-template-columns:1fr;gap:24px;margin:24px 0}
        .t2-scenario{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .t2-scenario-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .t2-scenario-avatar{flex:0 0 56px;width:56px;height:56px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:28px;font-weight:700}
        .t2-scenario-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:20px;margin-bottom:4px;line-height:1.2}
        .t2-scenario-meta p{color:var(--pale-navy);font-size:13px;margin:0}
        .t2-scenario-body{padding:24px}
        .t2-scenario-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .t2-scenario-row:last-child{border-bottom:none}
        .t2-scenario-row-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .t2-scenario-row p{font-size:14px;line-height:1.6;margin:0}
        .t2-outcome-success{background:#E8F5EA;padding:12px 16px;border-left:3px solid #2A7A3A;border-radius:0 8px 8px 0;margin-top:8px}
        .t2-outcome-caution{background:#FFF3E0;padding:12px 16px;border-left:3px solid #E67E22;border-radius:0 8px 8px 0;margin-top:8px}
        .t2-outcome-success strong{color:#2A7A3A}
        .t2-outcome-caution strong{color:#B06200}
        .t2-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .t2-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .t2-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .t2-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .t2-faq-q::-webkit-details-marker{display:none}
        .t2-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .t2-faq-item[open] .t2-faq-icon{transform:rotate(45deg)}
        .t2-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .t2-lead-magnet{background:var(--navy);color:var(--ivory);border-radius:14px;padding:40px 32px;margin:48px 0;border:3px solid var(--yellow);position:relative}
        .t2-lead-badge{position:absolute;top:-12px;left:24px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:4px}
        .t2-lead-magnet h2{color:var(--ivory) !important;font-size:clamp(22px,3vw,28px) !important;margin-top:0 !important;margin-bottom:12px !important}
        .t2-lead-lead{color:var(--pale-navy);font-size:15px;line-height:1.6;margin-bottom:24px}
        .t2-lm-form{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.t2-lm-form{grid-template-columns:1fr 1fr}.t2-lm-full{grid-column:1/-1}}
        .t2-lm-field{display:flex;flex-direction:column}
        .t2-lm-field label{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--pale-navy);margin-bottom:6px}
        .t2-lm-field label .req{color:var(--yellow);margin-left:3px}
        .t2-lm-field input,.t2-lm-field select{background:rgba(255,255,255,.08);border:1px solid rgba(214,219,237,.3);border-radius:8px;padding:12px 14px;color:var(--ivory);font-size:15px;transition:border-color .15s,background .15s;font-family:inherit}
        .t2-lm-field input:focus,.t2-lm-field select:focus{outline:none;background:rgba(255,255,255,.14);border-color:var(--yellow)}
        .t2-lm-field input::placeholder{color:rgba(214,219,237,.5)}
        .t2-lm-field select{appearance:none;-webkit-appearance:none}
        .t2-lm-consent{font-size:12px;color:var(--pale-navy);line-height:1.55;margin:16px 0}
        .t2-lm-submit{background:var(--yellow);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:800;font-size:15px;box-shadow:0 4px 16px rgba(36,48,72,.22);border:none;cursor:pointer;transition:transform .15s;width:100%}
        @media(min-width:640px){.t2-lm-submit{width:auto}}
        .t2-lm-submit:hover{transform:translateY(-2px)}
        .t2-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.t2-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.t2-related-grid{grid-template-columns:repeat(3,1fr)}}
        .t2-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal);text-decoration:none}
        .t2-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .t2-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-family:var(--font-serif);font-size:16px}
        .t2-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}
        .t2-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .t2-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .t2-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .t2-author-row:last-child{border-bottom:none}
        .t2-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .t2-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .t2-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}
        .t2-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px}
        .t2-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .t2-sources ul{list-style:none;margin:0;padding:0}
        .t2-sources li{padding:4px 0;color:var(--charcoal)}
        .t2-sources a{color:var(--navy);border-bottom:1px dotted var(--navy);text-decoration:none}
        .t2-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .t2-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .t2-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .t2-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .t2-btn-navy{background:var(--navy);color:var(--yellow) !important}
        .t2-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px;text-decoration:none}
        .t2-fee-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.t2-fee-grid{grid-template-columns:repeat(2,1fr)}}
        .t2-fee-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px}
        .t2-fee-card .t2-fee-tier{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .t2-fee-card .t2-fee-range{font-family:var(--font-serif);color:var(--navy);font-size:24px;font-weight:700;margin-bottom:6px}
        .t2-fee-card .t2-fee-unis{font-size:13px;color:var(--charcoal);margin-bottom:8px}
        .t2-fee-card .t2-fee-who{font-size:13px;color:var(--grey);font-style:italic;border-top:1px dashed var(--mist);padding-top:8px;margin-top:8px}
        .t2-disclaimer{background:#FFF8E1;border:1px solid #FCCC00;border-radius:8px;padding:16px 20px;margin:24px 0;font-size:14px;line-height:1.6;color:var(--charcoal)}
        .t2-disclaimer strong{color:var(--navy)}
        .t2-red-flags ul{list-style:none !important;margin:16px 0;padding:0}
        .t2-red-flags li{position:relative;padding-left:28px;margin-bottom:12px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .t2-red-flags li::before{content:'⚠';position:absolute;left:0;top:1px;font-size:16px}
      `}</style>

      <div ref={progressRef} className="t2-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="t2-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span className="sep">›</span>
          <a href="/resources">Resources</a><span className="sep">›</span>
          <span className="cur">Top 20 UGC-DEB Approved Online MBA Universities</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="t2-hero">
        <div className="container">
          <span className="t2-eyebrow">Ranking Guide • 2025-26 Edition</span>
          <h1>Top 20 UGC-DEB Approved Online MBA Universities in India — 2025-26</h1>
          <p className="t2-subtitle">
            Every university here holds current UGC-DEB approval. Ranked by career outcomes, learning experience, recognition, and fee-to-value ratio. Updated for 2025-26 enrolment.
          </p>
          <div className="t2-trust">
            <span className="stars">★★★★★</span>
            <span>4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed</span>
            <span className="dot">•</span>
            <span>150+ universities assessed</span>
          </div>
          <div className="t2-cta-row">
            <a href="/counselling/" className="t2-btn t2-btn-primary">Get a personalised university shortlist →</a>
            <a href="#pdf-download" className="t2-btn t2-btn-outline">Download the full ranked list →</a>
          </div>
          <p className="t2-caption">
            <em>Rankings are based on CollegeNCourses counsellor assessments, student feedback, and publicly available programme data. We are not paid by universities to include or rank them. Last reviewed: January 2026.</em>
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="t2-layout">

          {/* ToC sidebar */}
          <aside className="t2-toc-sidebar" aria-label="Table of contents">
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
          <div className="t2-body">

            {/* Mobile ToC */}
            <details className="t2-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                ))}
              </ol>
            </details>

            {/* Key takeaways */}
            <section id="takeaways" className="t2-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i}><strong>{t.label}.</strong> {t.text}</li>
                ))}
              </ul>
            </section>

            {/* Top 5 snapshot */}
            <section id="top5-snapshot">
              <h2>Top 5 at a glance</h2>
              <div className="t2-top5-grid">
                {UNIVERSITIES.slice(0, 5).map((u) => (
                  <div className="t2-top5-card" key={u.rank}>
                    <div className="t2-rank-badge">#{u.rank}</div>
                    <h4>{u.name}</h4>
                    <span className="naac-badge">NAAC {u.naac}</span>
                    <div className="fee-row"><strong>Fee:</strong> Rs {u.fee}</div>
                    <div className="strong-for">{u.strongFor}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "var(--grey)", fontStyle: "italic" }}>Scroll down for all 20 universities, full profiles, and the which-university-fits-your-profile guide.</p>
            </section>

            {/* UGC-DEB meaning */}
            <section id="ugc-deb-meaning">
              <h2>What UGC-DEB approval actually means</h2>
              <div className="t2-ugc-deb-cards">
                <div className="t2-ugc-deb-card">
                  <h4>Legal equivalence</h4>
                  <p>A degree from a UGC-DEB approved Online or Distance programme carries the same legal standing as a conventional, on-campus degree — for employment, further education, and any other purpose — under UGC's 2020 Regulations.</p>
                </div>
                <div className="t2-ugc-deb-card">
                  <h4>Programme-level approval, not just institutional</h4>
                  <p>A university can be broadly UGC-recognised while a specific Online MBA programme lacks current UGC-DEB approval. Always verify at the programme level on deb.ugc.ac.in, not just the university's general UGC standing.</p>
                </div>
                <div className="t2-ugc-deb-card">
                  <h4>Must be current for your enrolment year</h4>
                  <p>Approval must be active specifically for the year you enrol. A prior year's approval status doesn't carry over automatically. Verify before you pay any fees — even if you've seen this page recently.</p>
                </div>
              </div>
            </section>

            {/* Methodology */}
            <section id="methodology">
              <h2>How we ranked these 20 universities</h2>
              <p>Six weighted factors, assessed by CollegeNCourses counsellors from student feedback, employer interviews, programme data, and publicly available information. We are not paid by universities — no university can buy a higher ranking here.</p>
              <div className="t2-methodology-grid">
                <div className="t2-method-card">
                  <div className="t2-method-weight">25%</div>
                  <div className="t2-method-body"><h4>Career outcomes</h4><p>Salary acceleration, placement support quality, and sector-specific career-track mobility reported by alumni.</p></div>
                </div>
                <div className="t2-method-card">
                  <div className="t2-method-weight">25%</div>
                  <div className="t2-method-body"><h4>UGC-DEB standing</h4><p>Years of continuous approval, programme-level specificity, and dual AICTE approval where applicable.</p></div>
                </div>
                <div className="t2-method-card">
                  <div className="t2-method-weight">20%</div>
                  <div className="t2-method-body"><h4>Learning experience</h4><p>Platform quality, live-session frequency, mobile experience, peer community, and faculty accessibility.</p></div>
                </div>
                <div className="t2-method-card">
                  <div className="t2-method-weight">15%</div>
                  <div className="t2-method-body"><h4>Industry recognition</h4><p>Brand recognition in target-employer conversations, NAAC grade, and recruiter awareness.</p></div>
                </div>
                <div className="t2-method-card">
                  <div className="t2-method-weight">10%</div>
                  <div className="t2-method-body"><h4>Fee-to-value ratio</h4><p>Programme quality relative to fee, transparency of fee structure, and absence of hidden cost surprises.</p></div>
                </div>
                <div className="t2-method-card">
                  <div className="t2-method-weight">5%</div>
                  <div className="t2-method-body"><h4>Student support</h4><p>Academic counselling, technical support responsiveness, and examination centre availability.</p></div>
                </div>
              </div>
            </section>

            {/* Full ranking table */}
            <section id="full-ranking">
              <h2>All 20 UGC-DEB approved Online MBA universities, ranked</h2>
              <span className="t2-freshness">Verified against deb.ugc.ac.in, January 2026. Verify again before enrolling.</span>
              <div className="t2-table-wrap">
                <table className="t2-table">
                  <thead>
                    <tr>
                      <th style={{ width: "44px", textAlign: "center" }}>#</th>
                      <th>University</th>
                      <th>NAAC</th>
                      <th>Fee (total)</th>
                      <th>Mode</th>
                      <th>UGC-DEB since</th>
                      <th>AICTE</th>
                      <th>Specs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UNIVERSITIES.map((u) => (
                      <tr key={u.rank}>
                        <td className="t2-rank-cell">{u.rank}</td>
                        <td><strong>{u.name}</strong></td>
                        <td className={
                          u.naac === "A++" ? "t2-naac-a-pp" :
                          u.naac === "A+" ? "t2-naac-a-p" :
                          u.naac === "A" ? "t2-naac-a" : "t2-naac-b"
                        }>{u.naac}</td>
                        <td>Rs {u.fee}</td>
                        <td>{u.mode}</td>
                        <td>{u.ugcDeb}</td>
                        <td className={u.dualApproval ? "t2-dual" : ""}>{u.dualApproval ? "Yes" : "—"}</td>
                        <td style={{ textAlign: "center" }}>{u.specializations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="t2-caption">Fee figures are total programme costs including typical exam fees. Verify directly with each university. AICTE column shows dual UGC-DEB + AICTE approval; UGC-DEB approval alone is sufficient for most government-job and general employment purposes.</p>
            </section>

            {/* Top 10 detailed profiles */}
            <section id="top10-profiles">
              <h2>Detailed profiles: Top 10 universities</h2>
              <p>What our counsellors know about each from advising thousands of aspirants — not marketing copy from the universities themselves.</p>
              {TOP10_PROFILES.map((p) => (
                <div className="t2-profile-card" key={p.rank}>
                  <div className="t2-profile-header">
                    <div className="t2-profile-rank">#{p.rank}</div>
                    <div className="t2-profile-meta">
                      <h3>{p.name}</h3>
                      <p>{p.headline}</p>
                    </div>
                  </div>
                  <div className="t2-profile-body">
                    <div className="t2-profile-grid">
                      <div className="t2-profile-item">
                        <div className="t2-profile-item-label">Fee (total programme)</div>
                        <div className="t2-profile-item-val">{p.fee}</div>
                      </div>
                      <div className="t2-profile-item">
                        <div className="t2-profile-item-label">NAAC grade</div>
                        <div className="t2-profile-item-val">{p.naac}</div>
                      </div>
                      <div className="t2-profile-item">
                        <div className="t2-profile-item-label">UGC-DEB approval</div>
                        <div className="t2-profile-item-val">{p.ugcDeb}</div>
                      </div>
                      <div className="t2-profile-item">
                        <div className="t2-profile-item-label">AICTE dual approval</div>
                        <div className="t2-profile-item-val">{p.aicte}</div>
                      </div>
                    </div>
                    <div className="t2-profile-section">
                      <div className="t2-profile-section-label">Specializations</div>
                      <p className="t2-profile-text">{p.specializations}</p>
                    </div>
                    <div className="t2-profile-section">
                      <div className="t2-profile-section-label">Platform</div>
                      <p className="t2-profile-text">{p.platform}</p>
                    </div>
                    <div className="t2-profile-section">
                      <div className="t2-profile-section-label">Placement support</div>
                      <p className="t2-profile-text">{p.placement}</p>
                    </div>
                    <div className="t2-profile-section">
                      <div className="t2-profile-section-label">Best for</div>
                      <span className="t2-profile-flag">{p.bestFor.split(".")[0]}</span>
                    </div>
                    <div className="t2-profile-section">
                      <div className="t2-profile-section-label">Not best for</div>
                      <span className="t2-profile-flag t2-profile-flag-warn">{p.notBestFor.split(".")[0]}</span>
                    </div>
                  </div>
                  <div className="t2-profile-footer">
                    <strong>Counsellor observation:</strong> {p.counsellorNote}
                  </div>
                </div>
              ))}
            </section>

            {/* Universities 11-20 */}
            <section id="universities-11-20">
              <h2>Universities 11-20: quick reference</h2>
              <p>These are primarily state public-university Distance MBA options. UGC-DEB approval track record is long; NAAC grades are solid; fee is very low. Best for aspirants primarily targeting government-job eligibility, very low fee, or regional employer recognition in specific states.</p>
              <div className="t2-table-wrap">
                <table className="t2-table">
                  <thead>
                    <tr>
                      <th style={{ width: "44px", textAlign: "center" }}>#</th>
                      <th>University</th>
                      <th>NAAC</th>
                      <th>Fee</th>
                      <th>UGC-DEB since</th>
                      <th>Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UNIVERSITIES.slice(10).map((u) => (
                      <tr key={u.rank}>
                        <td className="t2-rank-cell">{u.rank}</td>
                        <td><strong>{u.name}</strong></td>
                        <td className={
                          u.naac === "A++" ? "t2-naac-a-pp" :
                          u.naac === "A+" ? "t2-naac-a-p" :
                          u.naac === "A" ? "t2-naac-a" : "t2-naac-b"
                        }>{u.naac}</td>
                        <td>Rs {u.fee}</td>
                        <td>{u.ugcDeb}</td>
                        <td style={{ fontSize: "12px" }}>{u.strongFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Fee comparison */}
            <section id="fee-comparison">
              <h2>Fee comparison by tier</h2>
              <div className="t2-fee-grid">
                {FEE_TIERS.map((t) => (
                  <div className="t2-fee-card" key={t.tier}>
                    <div className="t2-fee-tier">{t.tier}</div>
                    <div className="t2-fee-range">{t.range}</div>
                    <div className="t2-fee-unis">{t.universities}</div>
                    <div className="t2-fee-who">{t.who}</div>
                  </div>
                ))}
              </div>
              <p>Full true-cost breakdown — including hidden fees, EMI, and Section 80E tax benefits — in the <a href="/resources/mba-fee-guide-2025-26/">Complete MBA Fee Guide</a>.</p>
            </section>

            {/* Placement & salary */}
            <section id="placement-salary">
              <h2>Indicative placement and salary data by specialization</h2>
              <p style={{ fontStyle: "italic", fontSize: "14px", color: "var(--grey)" }}>These are indicative ranges from our counselling data and student-reported outcomes, not guaranteed figures. Actual salary depends on prior experience, employer, and role, not solely on the MBA.</p>
              <div className="t2-table-wrap">
                <table className="t2-table">
                  <thead>
                    <tr>
                      <th>Career track</th>
                      <th>Recommended universities</th>
                      <th>Avg salary (experienced hires)</th>
                      <th>Entry-level range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLACEMENT_TABLE.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.track}</strong></td>
                        <td>{r.tier}</td>
                        <td>{r.avgSalary}</td>
                        <td>{r.freshSalary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Verification steps */}
            <section id="verification-steps">
              <h2>How to verify UGC-DEB approval before you enrol</h2>
              <div className="t2-steps">
                {VERIFICATION_STEPS.map((s) => (
                  <div className="t2-step-card" key={s.step}>
                    <div className="t2-step-num">{s.step}</div>
                    <div className="t2-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Red flags */}
            <section id="red-flags">
              <h2>Red flags when evaluating Online MBA programmes</h2>
              <div className="t2-red-flags">
                <ul>
                  <li><strong>Cannot produce the current-year DEB approval letter or equivalent documentation when asked directly.</strong> Any legitimate UGC-DEB approved university's admissions office should be able to provide this or direct you to deb.ugc.ac.in to verify it yourself.</li>
                  <li><strong>Claims AICTE approval cannot be independently verified.</strong> AICTE approval is publicly verifiable on aicte-india.org. If a university claims approval but the AICTE website doesn't show it for the specific programme, trust the AICTE website.</li>
                  <li><strong>Advertises programme completion timelines shorter than 24 months for a full 2-year MBA.</strong> A full UGC-DEB approved Online MBA requires a minimum study period — typically 2 years. Offers promising 12-month or 18-month full MBA completions warrant close scrutiny.</li>
                  <li><strong>Fee significantly below the market rate with no explanation.</strong> Quality programmes have real costs — faculty, platform, support. A fee that's dramatically lower than even the state-university options may indicate an unapproved programme with a misleading credential.</li>
                  <li><strong>Marketing materials that don't specify which approval body or year.</strong> "University recognised" is not the same as "UGC-DEB approved for Online MBA, 2025-26." Vague approvals claims in marketing are a signal to ask for specifics.</li>
                </ul>
              </div>
            </section>

            {/* Which university fits */}
            <section id="which-fits">
              <h2>Which university fits which profile</h2>
              <div className="t2-which-fits">
                {WHICH_FITS.map((w, i) => (
                  <div className="t2-fit-card" key={i}>
                    <div className="profile">{w.profile}</div>
                    <p className="recommendation">{w.recommendation}</p>
                  </div>
                ))}
              </div>
              <div className="t2-callout">
                <span className="t2-callout-label">Not sure where you fit?</span>
                A counselling call walks through your specific career target, current experience, budget, and learning-style preference and produces a shortlist of 2-3 universities with specific reasoning. <a href="/counselling/">Book free.</a>
              </div>
            </section>

            {/* Specialization cross-reference */}
            <section id="specializations">
              <h2>Specialization cross-reference: which university for which track</h2>
              <div className="t2-spec-table-wrap">
                <table className="t2-spec-table">
                  <thead>
                    <tr>
                      <th>Specialization</th>
                      <th>Top universities for this track</th>
                      <th>Full guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPECIALIZATION_MATRIX.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.spec}</strong></td>
                        <td>{row.topUniversities}</td>
                        <td><a href={row.guideLink}>Full guide →</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Scenarios */}
            <section id="scenarios">
              <h2>Three aspirant stories: how the shortlist actually works in practice</h2>
              <div className="t2-scenarios">
                {SCENARIOS.map((s) => (
                  <div className="t2-scenario" key={s.name}>
                    <div className="t2-scenario-header">
                      <div className="t2-scenario-avatar">{s.initial}</div>
                      <div className="t2-scenario-meta">
                        <h3>{s.name}, {s.age}</h3>
                        <p>{s.role}</p>
                      </div>
                    </div>
                    <div className="t2-scenario-body">
                      <div className="t2-scenario-row">
                        <div className="t2-scenario-row-label">Background & goal</div>
                        <p>{s.background}</p>
                      </div>
                      <div className="t2-scenario-row">
                        <div className="t2-scenario-row-label">Initial shortlist considered</div>
                        <p>{s.shortlist.join(", ")}</p>
                      </div>
                      <div className="t2-scenario-row">
                        <div className="t2-scenario-row-label">Counsellor recommendation</div>
                        <p><strong>{s.recommendation}</strong></p>
                      </div>
                      <div className="t2-scenario-row">
                        <div className="t2-scenario-row-label">Rationale</div>
                        <div className={s.type === "success" ? "t2-outcome-success" : "t2-outcome-caution"}>
                          <p>{s.rationale}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="t2-faq-list">
                {FAQS.map((faq, i) => (
                  <details className="t2-faq-item" key={i}>
                    <summary className="t2-faq-q">
                      <span>{faq.q}</span>
                      <span className="t2-faq-icon">+</span>
                    </summary>
                    <div className="t2-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Lead magnet */}
            <section id="pdf-download">
              <div className="t2-lead-magnet">
                <span className="t2-lead-badge">Free Download</span>
                <h2>Get the complete ranked list as a PDF</h2>
                <p className="t2-lead-lead">
                  All 20 universities, full comparison table, specialization cross-reference, and the verification checklist — printable and shareable. Free. Tell us where to send it, and which specialization you're considering, so we can include the relevant specialization data.
                </p>
                <form className="t2-lm-form" onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}>
                  <div className="t2-lm-field">
                    <label>Full name<span className="req">*</span></label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="t2-lm-field">
                    <label>Email<span className="req">*</span></label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="t2-lm-field">
                    <label>Phone (optional)</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="t2-lm-field">
                    <label>Target specialization<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select specialization</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Business Analytics</option>
                      <option>Human Resources</option>
                      <option>Operations</option>
                      <option>IT & Systems</option>
                      <option>International Business</option>
                      <option>Banking & Finance</option>
                      <option>Other / Not sure yet</option>
                    </select>
                  </div>
                  <div className="t2-lm-field t2-lm-full">
                    <label>Budget range<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select budget</option>
                      <option>Under Rs 1 lakh</option>
                      <option>Rs 1-1.5 lakh</option>
                      <option>Rs 1.5-2.5 lakh</option>
                      <option>Rs 2.5 lakh or more</option>
                    </select>
                  </div>
                  <p className="t2-lm-consent t2-lm-full">
                    By downloading, you agree to receive a follow-up email from a CollegeNCourses counsellor. We do not share your details with any university or third party. Unsubscribe anytime.
                  </p>
                  <div className="t2-lm-full">
                    <button type="submit" className="t2-lm-submit">Email me the PDF →</button>
                  </div>
                </form>
              </div>
            </section>

            <div className="t2-disclaimer">
              <strong>Disclaimer:</strong> Rankings reflect CollegeNCourses counsellor assessments based on multiple factors as described in the methodology section. They are not a guarantee of career outcomes. UGC-DEB approval statuses change — always verify on deb.ugc.ac.in before enrolling. We are not paid by universities to include or rank them.
            </div>

            {/* Related resources */}
            <section id="related">
              <h2>Go deeper</h2>
              <div className="t2-related-grid">
                {RELATED.map((r) => (
                  <a href={r.href} className="t2-related-card" key={r.href}>
                    <div className="icon">→</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* Authors */}
            <section id="authors">
              <div className="t2-authors">
                <h3>About this guide</h3>
                <div className="t2-author-row">
                  <strong>Written by</strong>
                  <div className="t2-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="t2-author-bio">Leads content strategy and has been writing on Indian higher education since 2020.</div>
                </div>
                <div className="t2-author-row">
                  <strong>Reviewed by</strong>
                  <div className="t2-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="t2-author-bio">Has advised over 3,000 aspirants on university selection, programme eligibility, and career planning across Distance, Online, and Executive MBA modes since 2016.</div>
                </div>
                <div className="t2-author-row">
                  <strong>Approved by</strong>
                  <div className="t2-author-role">Nikhita Pradeep Deshmukh, Founder, DNYANAL EDUCON PRIVATE LIMITED</div>
                  <div className="t2-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="t2-sources">
                <h4>Sources referenced</h4>
                <ul>
                  <li><a href="https://deb.ugc.ac.in/" target="_blank" rel="noopener">UGC Distance Education Bureau (DEB)</a> — Approved-institutions list, 2025-26</li>
                  <li><a href="https://www.ugc.gov.in/" target="_blank" rel="noopener">University Grants Commission (UGC)</a></li>
                  <li><a href="https://www.naac.gov.in/" target="_blank" rel="noopener">NAAC</a> — Institutional grade listings</li>
                  <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener">AICTE</a> — Approval Process Handbook 2025-26</li>
                  <li>CollegeNCourses counselling records: university shortlisting conversations 2022-25</li>
                  <li>Student feedback surveys: 847 responses collected 2023-25 across 15+ universities</li>
                </ul>
                <p style={{ fontSize: "12px", color: "var(--grey)", marginTop: "12px", fontStyle: "italic" }}>
                  This ranking is reviewed every six months. Next scheduled review: July 2026.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="t2-cta-band">
        <div className="container">
          <h2>Want a personalised shortlist for your specific career target?</h2>
          <p>Tell a CollegeNCourses counsellor your specialization, budget, and career goal. We'll produce a 2-3 university shortlist with specific reasoning. Free, 30 minutes.</p>
          <a href="/counselling/" className="t2-btn t2-btn-navy">Book a free counselling call →</a>
          <br />
          <a href="/resources/online-mba-valid-government-jobs/" className="t2-cta-secondary">Or read our Government Jobs Eligibility guide →</a>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="top20-universities-guide" />
    </>
  );
}
