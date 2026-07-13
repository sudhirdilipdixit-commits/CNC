"use client";

import { useRef, useEffect, useState } from "react";
import LeadModal from "@/components/forms/LeadModal";

const TOC_ITEMS = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "quick-answer", label: "Quick answer" },
  { id: "legal-basis", label: "The legal basis" },
  { id: "job-categories", label: "Which job categories accept Online MBA" },
  { id: "ugc-deb-requirement", label: "UGC-DEB approval requirement" },
  { id: "promotion-vs-recruitment", label: "Promotion vs fresh recruitment" },
  { id: "aicte-matter", label: "Does AICTE approval matter" },
  { id: "rejection-reasons", label: "Common rejection reasons" },
  { id: "verification-steps", label: "How to verify your specific case" },
  { id: "categories-depth", label: "Government job categories in depth" },
  { id: "safest-universities", label: "Which universities are safest" },
  { id: "red-flags", label: "Red flags to avoid" },
  { id: "scenarios", label: "Real aspirant scenarios" },
  { id: "faq", label: "FAQ" },
  { id: "pdf-download", label: "Download PDF version" },
  { id: "authors", label: "About this guide" },
];

const TAKEAWAYS = [
  { label: "Short answer: yes, conditionally", text: "UGC has explicitly established that degrees from UGC-DEB approved Online and Distance programmes are equivalent to conventional-mode degrees for all purposes, including employment — provided the specific programme was UGC-DEB approved for your enrolment year." },
  { label: '"Conditionally" is the important word', text: "Individual recruiting authorities — specific PSUs, banks, state departments — can and occasionally do add their own eligibility clauses in a specific notification, such as requiring \"full-time\" or \"regular\" mode. General equivalence doesn't override a specific notification's explicit wording." },
  { label: "Promotion eligibility is generally the safest use case", text: "Internal promotion policies at PSU banks and public-sector employers most consistently accept UGC-DEB approved Online MBAs. Fresh external recruitment for specific named posts is where notification-specific wording matters most." },
  { label: "Teaching positions are a different eligibility track entirely", text: "An MBA alone — in any mode — does not typically qualify someone for a management faculty position; that requires UGC-NET or a PhD, regardless of how the MBA itself was obtained." },
  { label: "AICTE and UGC-DEB answer different questions", text: "UGC-DEB approval establishes degree equivalence for general employment purposes. AICTE approval is separately relevant only when a specific notification explicitly requires it." },
  { label: "Common mistake", text: "Enrolling in an Online MBA specifically for a named government job target without first reading that job's actual eligibility notification word for word." },
];

const JOB_CATEGORIES = [
  { category: "PSU bank internal promotion (Scale I-IV)", stance: "Generally accepted", caveat: "Check your specific bank's internal HR promotion policy document" },
  { category: "PSU direct/external recruitment (Management Trainee, Executive)", stance: "Mixed — varies by PSU and notification", caveat: "Some notifications specify \"full-time\" or \"regular\" MBA explicitly" },
  { category: "Central Government administrative posts requiring PG qualification", stance: "Generally accepted if UGC-DEB approved", caveat: "Check the specific ministry/department notification" },
  { category: "State Government administrative posts (State PSC-recruited)", stance: "Generally accepted if UGC-DEB approved", caveat: "State-specific circulars occasionally add conditions" },
  { category: "Defence civilian administrative roles", stance: "Generally accepted if UGC-DEB approved", caveat: "Verify against the specific recruitment notification" },
  { category: "Teaching / academic faculty positions (management subjects)", stance: "Not typically sufficient", caveat: "Requires UGC-NET or PhD; MBA mode is not the deciding factor — the qualification track itself is different" },
];

const VERIFICATION_STEPS = [
  { step: 1, title: "Confirm current-year UGC-DEB approval for your specific programme", body: "Visit deb.ugc.ac.in and confirm your specific university and MBA programme were approved for your specific enrolment year — not a general \"the university is UGC recognised\" claim, and not a prior year's approval status." },
  { step: 2, title: "Find the most recent official notification for your specific target role", body: "Not a summary from a coaching website or forum — the actual PDF notification from the recruiting body's official website. Eligibility clauses can change between recruitment cycles." },
  { step: 3, title: "Read the eligibility clause in full, word for word", body: 'Look specifically for mode-related language: "full-time," "regular," "on-campus," or conversely, explicit mentions of "Distance," "Online," or "ODL mode acceptable."' },
  { step: 4, title: "Check whether AICTE approval is separately required", body: "If the notification explicitly names AICTE alongside UGC, confirm your specific programme carries both approvals." },
  { step: 5, title: "If the language is ambiguous, request written clarification before applying", body: "Email or write to the recruiting body's grievance cell or admissions/recruitment helpdesk, describe your specific qualification precisely, and request written confirmation of eligibility. Keep this correspondence — it becomes useful documentation if a question arises later." },
  { step: 6, title: "For promotion-based eligibility, check your organisation's internal HR policy document directly", body: "Don't rely on colleague anecdotes or general assumptions about what your employer accepts — request the specific written policy from HR." },
];

const SCENARIOS = [
  {
    name: "Manoj",
    initial: "M",
    age: 33,
    role: "Senior Manager at a nationalised bank in Bhopal",
    background: "9 years' banking experience. Wanted to move from Scale II to Scale III via his bank's internal AVP-track promotion process, which listed a postgraduate management qualification as one eligibility route.",
    action: "Checked his bank's internal HR promotion policy document directly (Step 6) before enrolling, and confirmed UGC-DEB approved Online MBAs were explicitly listed as qualifying.",
    recommendation: "Enrolled in an Online MBA in Banking & Finance Management at a UGC-DEB approved university.",
    outcome: "Completed the MBA and was promoted to Scale III (Senior Manager) six months after graduation, with the qualification accepted without any document-verification friction.",
    type: "success",
  },
  {
    name: "Kavita",
    initial: "K",
    age: 29,
    role: "State Government department employee in Bhubaneswar",
    background: "Working in a state government department, targeting a departmental promotion exam that listed \"postgraduate degree in a relevant field\" as one eligibility criterion, without explicit mode language.",
    action: "Wrote to her department's establishment section directly (Step 5) before enrolling, describing the specific UGC-DEB approved Online MBA she was considering, and requested written confirmation of eligibility.",
    recommendation: "Received written confirmation within 12 days before proceeding with enrolment.",
    outcome: "Completed the MBA with full confidence in its eligibility status, and used the written confirmation as supporting documentation during her subsequent promotion application.",
    type: "success",
  },
  {
    name: "Deepak",
    initial: "D",
    age: 26,
    role: "Applying for a PSU Management Trainee position",
    background: "Held a UGC-DEB approved Online MBA and applied for a PSU Management Trainee position advertised externally. The specific notification, on close reading, used the phrase \"full-time MBA/PGDM from a recognised institute.\"",
    action: "Had not checked this specific notification's exact wording before applying — assumed general UGC-DEB equivalence would apply, based on advice from an online forum rather than the notification itself.",
    recommendation: "During document verification, this specific phrasing was raised as a query by the recruiting PSU.",
    outcome: "The matter required additional correspondence and clarification with the PSU, adding delay and uncertainty to his application at a stage when it mattered most. This is precisely the scenario the Step 5 verification process is designed to prevent.",
    type: "caution",
  },
];

const FAQS = [
  { q: "Is an Online MBA valid for government jobs in India?", a: "Yes, generally. A UGC-DEB approved Online MBA is legally equivalent to a regular MBA for government job eligibility, per UGC's ODL and Online Regulations 2020. The one important condition: always verify the specific job notification's eligibility clause, since individual recruiting bodies can add their own specific requirements." },
  { q: "Is a UGC-DEB approved online MBA the same as a regular MBA for government job purposes?", a: "Yes, in legal standing. UGC has stated that degrees from UGC-DEB approved Online or Distance programmes carry the same legal standing as conventional-mode degrees for all purposes, including employment. This equivalence requires the specific programme to have held current UGC-DEB approval for your enrolment year." },
  { q: "Do public-sector banks accept online MBAs for promotion?", a: "Generally yes. Most large public-sector banks recognise UGC-DEB approved Online and Distance MBAs for internal promotion eligibility (Scale I-IV and specialist tracks), particularly following HR policy updates after the 2020 Regulations. Always confirm against your specific bank's current internal promotion policy document." },
  { q: "Are PSU jobs open to online MBA holders?", a: "It depends on the specific PSU and specific notification. Internal promotion within a PSU generally accepts UGC-DEB approved Online MBAs. Fresh external recruitment (like Management Trainee positions) varies — some notifications explicitly welcome any UGC-recognised postgraduate qualification, others use \"full-time\" language that requires closer reading. Always check the specific notification before applying." },
  { q: "Is an online MBA valid for UPSC or State PSC recruitment?", a: "For roles where a postgraduate management qualification is part of the eligibility criteria, a UGC-DEB approved Online MBA is generally accepted on the same equivalence basis as any UGC-recognised postgraduate degree. Most UPSC and State PSC notifications reference \"recognised university\" rather than mode-specific exclusions, but state-specific circulars occasionally add conditions." },
  { q: "What is the difference between AICTE and UGC-DEB approval for government job eligibility?", a: "UGC-DEB approval establishes the degree's general legal equivalence and is the primary requirement for most government job eligibility. AICTE approval is relevant only when a specific job notification explicitly names it as a requirement, which happens for certain technical-management roles but isn't the default expectation across most government postings." },
  { q: "Can I use an online MBA for a teaching or academic government position?", a: "No, not on the basis of the MBA alone. Faculty eligibility for management subjects requires UGC-NET qualification or a PhD, regardless of how any MBA was obtained. This is a fundamentally different eligibility track from the general employment eligibility this guide otherwise covers." },
  { q: "Do I need an equivalence certificate from AIU for my online MBA?", a: "Generally no, for domestically UGC-DEB approved Online MBAs — UGC's own regulation already establishes the equivalence, which is what most Indian government recruiting bodies rely on. AIU equivalence certification is more commonly relevant for foreign degrees or specific cases requiring formal cross-institutional equivalence recognition." },
  { q: 'What if a specific government job notification says "full-time MBA only"?', a: "Read the exact wording carefully and, if genuinely ambiguous, write to the recruiting body directly for written clarification before applying. Some notifications use \"full-time\" language inherited from older templates without intending to exclude UGC-DEB approved programmes; others may genuinely intend the restriction. Written clarification removes the ambiguity." },
  { q: "How do I verify if my specific online MBA qualifies for a specific government job?", a: "Six steps: confirm current-year UGC-DEB approval for your specific programme, find the exact current notification for your target role, read the eligibility clause word for word for mode-specific language, check whether AICTE approval is separately required, request written clarification if the language is ambiguous, and for promotion-based eligibility, check your employer's specific internal HR policy directly. Full walkthrough in the verification section." },
  { q: "Has any government recruiting body explicitly rejected online MBA candidates?", a: "We're not aware of any blanket, category-wide rejection of UGC-DEB approved Online MBAs by a major recruiting body. The friction we see in our counselling records is notification-specific and documentation-specific — a particular posting's wording, or a gap in an aspirant's own verification before applying — rather than a systemic rejection of Online MBAs as a category." },
  { q: "Is an online MBA valid for defence sector civilian roles?", a: "Generally yes, for civilian and administrative-track roles within defence establishments and Defence PSUs, on the same UGC-DEB equivalence basis as other central government contexts. This is distinct from combatant or uniformed recruitment, which typically doesn't involve MBA-level eligibility at all." },
  { q: "Is online MBA government recognised?", a: "Yes. An Online MBA from a university holding current UGC-DEB approval is government recognised and legally equivalent to a regular MBA for employment and further education purposes in India, under UGC's 2020 Regulations.", voice: true },
  { q: "Can online MBA be used for government job promotion?", a: "Yes, in most cases. Online MBAs from UGC-DEB approved universities are widely accepted for internal government and PSU promotion eligibility, particularly at public-sector banks. Always confirm against your specific organisation's current internal HR promotion policy.", voice: true },
  { q: "Which online MBA is valid for government jobs?", a: "Any Online MBA from a university currently holding UGC-DEB approval for that specific programme is valid for general government job eligibility. See our Top 20 UGC-DEB Approved Online MBA Universities guide for a ranked list, and the safest universities section of this guide for government-job-specific selection considerations.", voice: true },
  { q: "How does CollegeNCourses help verify government job eligibility?", a: "Our counsellors help you check UGC-DEB approval status, read and interpret specific job notifications, and — where useful — draft the written clarification request described in the verification section. Free 30-minute call. We do not guarantee outcomes for any specific job posting, since final eligibility determination always rests with the recruiting body." },
];

const RELATED = [
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources/top-20-ugc-deb-approved-online-mba-2025-26/" },
  { title: "Distance vs Online vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources/distance-vs-online-vs-executive-mba-guide/" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources/mba-fee-guide-2025-26/" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources/online-mba-salary-report-2025-26/" },
  { title: "MBA in Banking & Finance Management: The Honest Guide", href: "/specializations-guide/banking-finance/" },
  { title: "How to Choose Your MBA Specialization: A Framework", href: "/blogs/how-to-choose-mba-specialization/" },
];

export default function GovtJobsGuideClient() {
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
        .gj-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--yellow);z-index:999;transition:width .1s linear}
        .gj-breadcrumb{font-size:13px;color:var(--grey);padding:14px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .gj-breadcrumb a{color:var(--grey)}.gj-breadcrumb a:hover{color:var(--navy);text-decoration:underline}
        .gj-breadcrumb .sep{color:var(--pale-navy)}.gj-breadcrumb .cur{color:var(--navy);font-weight:500}
        .gj-hero{background:var(--ivory);padding:32px 0 48px;border-bottom:1px solid var(--mist)}
        .gj-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:4px;margin-bottom:24px}
        .gj-hero h1{font-family:var(--font-serif);color:var(--navy);font-size:clamp(30px,5vw,52px);line-height:1.1;margin-bottom:16px;letter-spacing:-.01em}
        .gj-subtitle{font-size:clamp(16px,2.2vw,20px);color:var(--charcoal);line-height:1.55;margin-bottom:24px;max-width:780px}
        .gj-trust{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;color:var(--charcoal);font-size:14px;margin-bottom:24px}
        .gj-trust .stars{color:var(--yellow);letter-spacing:1px}.gj-trust .dot{color:var(--pale-navy)}
        .gj-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
        .gj-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:700;font-size:15px;transition:transform .15s,box-shadow .15s;cursor:pointer;border:none;text-align:center;text-decoration:none}
        .gj-btn-primary{background:var(--yellow);color:var(--navy);box-shadow:0 4px 16px rgba(36,48,72,.22)}
        .gj-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,48,72,.25)}
        .gj-btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy) !important}
        .gj-btn-outline:hover{background:var(--navy);color:var(--ivory)}
        .gj-caption{font-size:12px;color:var(--grey);font-style:italic}
        .gj-layout{display:grid;grid-template-columns:1fr;gap:32px;padding:32px 0}
        @media(min-width:1024px){.gj-layout{grid-template-columns:240px 1fr;gap:48px;padding:48px 0}}
        .gj-toc-sidebar{display:none}
        @media(min-width:1024px){
          .gj-toc-sidebar{display:block;position:sticky;top:100px;align-self:start;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:12px}
          .gj-toc-sidebar h4{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
          .gj-toc-sidebar ol{list-style:none;border-left:2px solid var(--mist)}
          .gj-toc-sidebar li{margin:0}
          .gj-toc-sidebar a{display:block;padding:8px 14px;font-size:13px;color:var(--grey);border-left:2px solid transparent;margin-left:-2px;line-height:1.4;transition:color .15s,border-color .15s;text-decoration:none}
          .gj-toc-sidebar a:hover{color:var(--navy)}
          .gj-toc-sidebar a.active{color:var(--navy);font-weight:600;border-left-color:var(--yellow)}
        }
        .gj-toc-mobile{background:var(--white);border:1px solid var(--mist);border-radius:8px;margin-bottom:24px}
        .gj-toc-mobile summary{padding:14px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--navy);font-size:14px}
        .gj-toc-mobile summary::-webkit-details-marker{display:none}
        .gj-toc-mobile summary::after{content:'+';background:var(--yellow);color:var(--navy);width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;transition:transform .2s}
        .gj-toc-mobile[open] summary::after{transform:rotate(45deg)}
        .gj-toc-mobile ol{list-style:none;padding:0 18px 18px}
        .gj-toc-mobile li{padding:6px 0}
        .gj-toc-mobile a{color:var(--charcoal);font-size:14px;text-decoration:none}
        .gj-toc-mobile a:hover{color:var(--navy)}
        @media(min-width:1024px){.gj-toc-mobile{display:none}}
        .gj-body{max-width:860px}
        .gj-body section{scroll-margin-top:90px}
        .gj-body h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(26px,3.5vw,36px);line-height:1.2;margin:48px 0 16px;letter-spacing:-.01em}
        .gj-body h2:first-child{margin-top:0}
        .gj-body h3{font-family:var(--font-serif);color:var(--navy);font-size:clamp(20px,2.4vw,24px);line-height:1.25;margin:32px 0 12px}
        .gj-body p{font-size:16px;color:var(--charcoal);line-height:1.7;margin-bottom:1em}
        .gj-body p:last-child{margin-bottom:0}
        .gj-body a{color:var(--navy);border-bottom:1px solid var(--yellow);text-decoration:none}
        .gj-body a:hover{background:var(--yellow)}
        .gj-body strong{color:var(--navy);font-weight:700}
        .gj-body ul{list-style:none;margin:0 0 16px;padding:0}
        .gj-body ul li{position:relative;padding-left:20px;margin-bottom:10px;font-size:15px;line-height:1.6;color:var(--charcoal)}
        .gj-body ul li::before{content:'';position:absolute;left:0;top:9px;width:8px;height:8px;background:var(--yellow);border-radius:50%}
        .gj-freshness{display:inline-flex;align-items:center;gap:8px;background:var(--pale-navy);color:var(--navy);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500;font-style:italic;margin-bottom:12px}
        .gj-freshness::before{content:'';width:8px;height:8px;background:#2A7A3A;border-radius:50%;flex-shrink:0}
        .gj-takeaways{background:var(--pale-navy);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:24px;margin:0 0 32px}
        .gj-takeaways h2{font-size:22px !important;margin-top:0 !important;margin-bottom:16px !important}
        .gj-takeaways ul{list-style:none;margin:0}.gj-takeaways li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15px;line-height:1.6}
        .gj-takeaways li::before{content:'';position:absolute;left:0;top:8px;width:12px;height:12px;background:var(--yellow);border-radius:50%}
        .gj-takeaways li:last-child{margin-bottom:0}
        .gj-quick-card{background:var(--white);border:2px solid var(--yellow);border-radius:14px;padding:24px;margin:24px 0;box-shadow:0 4px 14px rgba(36,48,72,.10)}
        .gj-quick-card ul{list-style:none;margin:16px 0 0}
        .gj-quick-card li{display:grid;grid-template-columns:auto 1fr;gap:12px;padding:10px 0;border-bottom:1px dashed var(--mist);font-size:15px;align-items:start}
        .gj-quick-card li:last-child{border-bottom:none}
        .gj-quick-label{font-weight:700;color:var(--navy);white-space:nowrap}
        .gj-quick-val{color:var(--charcoal)}
        .gj-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;border-radius:8px;border:1px solid var(--mist);background:var(--white)}
        .gj-table{width:100%;border-collapse:collapse;font-size:14px;min-width:600px}
        .gj-table thead{background:var(--navy);color:var(--yellow)}
        .gj-table th{text-align:left;padding:14px 16px;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle}
        .gj-table td{padding:14px 16px;border-top:1px solid var(--mist);color:var(--charcoal);vertical-align:top;line-height:1.5}
        .gj-table tbody tr:hover{background:var(--ivory)}
        .gj-table .gj-stance-yes{color:#2A7A3A;font-weight:700}
        .gj-table .gj-stance-check{color:#B06200;font-weight:700}
        .gj-table .gj-stance-no{color:#C04B4B;font-weight:700}
        .gj-callout{background:var(--white);border-left:4px solid var(--yellow);border-radius:0 8px 8px 0;padding:16px 24px;margin:24px 0;font-size:15px;color:var(--charcoal);font-style:italic;line-height:1.65;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .gj-callout-label{display:block;font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:8px;font-style:normal}
        .gj-callout-navy{background:var(--pale-navy)}
        .gj-disclaimer{background:#FFF8E1;border:1px solid #FCCC00;border-radius:8px;padding:16px 20px;margin:24px 0;font-size:14px;line-height:1.6;color:var(--charcoal)}
        .gj-disclaimer strong{color:var(--navy)}
        .gj-steps{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        .gj-step-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;display:flex;gap:16px;align-items:flex-start}
        .gj-step-num{flex:0 0 44px;width:44px;height:44px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:22px;font-weight:700}
        .gj-step-body h3{font-family:var(--font-serif);color:var(--navy);font-size:20px;margin-bottom:8px;line-height:1.25}
        .gj-step-body p{font-size:15px;line-height:1.65;margin:0;color:var(--charcoal)}
        .gj-category-cards{display:grid;grid-template-columns:1fr;gap:16px;margin:24px 0}
        @media(min-width:640px){.gj-category-cards{grid-template-columns:repeat(2,1fr)}}
        .gj-category-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:20px;border-top:4px solid var(--yellow)}
        .gj-category-card h4{font-family:var(--font-serif);color:var(--navy);font-size:17px;margin-bottom:8px;line-height:1.3}
        .gj-category-card p{font-size:14px;line-height:1.6;color:var(--charcoal);margin:0}
        .gj-scenarios{display:grid;grid-template-columns:1fr;gap:24px;margin:24px 0}
        .gj-scenario{background:var(--white);border:1px solid var(--mist);border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .gj-scenario-header{background:var(--navy);color:var(--ivory);padding:16px 24px;display:flex;align-items:center;gap:16px}
        .gj-scenario-avatar{flex:0 0 56px;width:56px;height:56px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:28px;font-weight:700;border:3px solid var(--yellow)}
        .gj-scenario-meta h3{font-family:var(--font-serif);color:var(--ivory);font-size:20px;margin-bottom:4px;line-height:1.2}
        .gj-scenario-meta p{color:var(--pale-navy);font-size:13px;margin:0}
        .gj-scenario-body{padding:24px}
        .gj-scenario-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .gj-scenario-row:last-child{border-bottom:none}
        .gj-scenario-row-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-bottom:4px}
        .gj-scenario-row p{font-size:14px;line-height:1.6;margin:0}
        .gj-scenario-outcome-success{background:#E8F5EA;padding:12px 16px;border-left:3px solid #2A7A3A;border-radius:0 8px 8px 0;margin-top:8px}
        .gj-scenario-outcome-caution{background:#FFF3E0;padding:12px 16px;border-left:3px solid #E67E22;border-radius:0 8px 8px 0;margin-top:8px}
        .gj-scenario-outcome-success strong{color:#2A7A3A}
        .gj-scenario-outcome-caution strong{color:#B06200}
        .gj-faq-list{display:flex;flex-direction:column;gap:12px;margin:24px 0}
        .gj-faq-item{border:1px solid var(--mist);border-radius:8px;background:var(--white);overflow:hidden}
        .gj-faq-item[open]{border-color:var(--pale-navy);box-shadow:0 1px 3px rgba(36,48,72,.06)}
        .gj-faq-q{padding:18px 22px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;color:var(--navy);font-size:16px;line-height:1.45}
        .gj-faq-q::-webkit-details-marker{display:none}
        .gj-faq-icon{flex:0 0 26px;width:26px;height:26px;background:var(--yellow);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;transition:transform .2s}
        .gj-faq-item[open] .gj-faq-icon{transform:rotate(45deg)}
        .gj-faq-a{padding:0 22px 20px;color:var(--charcoal);font-size:15px;line-height:1.7}
        .gj-voice-badge{display:inline-block;background:var(--pale-navy);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}
        .gj-lead-magnet{background:var(--navy);color:var(--ivory);border-radius:14px;padding:40px 32px;margin:48px 0;border:3px solid var(--yellow);position:relative}
        .gj-lead-badge{position:absolute;top:-12px;left:24px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:4px}
        .gj-lead-magnet h2{color:var(--ivory) !important;font-size:clamp(22px,3vw,28px) !important;margin-top:0 !important;margin-bottom:12px !important}
        .gj-lead-lead{color:var(--pale-navy);font-size:15px;line-height:1.6;margin-bottom:24px}
        .gj-lm-form{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.gj-lm-form{grid-template-columns:1fr 1fr}.gj-lm-full{grid-column:1/-1}}
        .gj-lm-field{display:flex;flex-direction:column}
        .gj-lm-field label{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--pale-navy);margin-bottom:6px}
        .gj-lm-field label .req{color:var(--yellow);margin-left:3px}
        .gj-lm-field input,.gj-lm-field select{background:rgba(255,255,255,.08);border:1px solid rgba(214,219,237,.3);border-radius:8px;padding:12px 14px;color:var(--ivory);font-size:15px;transition:border-color .15s,background .15s;font-family:inherit}
        .gj-lm-field input:focus,.gj-lm-field select:focus{outline:none;background:rgba(255,255,255,.14);border-color:var(--yellow)}
        .gj-lm-field input::placeholder{color:rgba(214,219,237,.5)}
        .gj-lm-field select{appearance:none;-webkit-appearance:none;padding-right:40px}
        .gj-lm-consent{font-size:12px;color:var(--pale-navy);line-height:1.55;margin:16px 0}
        .gj-lm-submit{background:var(--yellow);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:800;font-size:15px;box-shadow:0 4px 16px rgba(36,48,72,.22);border:none;cursor:pointer;transition:transform .15s;width:100%}
        @media(min-width:640px){.gj-lm-submit{width:auto}}
        .gj-lm-submit:hover{transform:translateY(-2px)}
        .gj-related-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:24px 0}
        @media(min-width:640px){.gj-related-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.gj-related-grid{grid-template-columns:repeat(3,1fr)}}
        .gj-related-card{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:16px;transition:transform .15s,box-shadow .15s,border-color .15s;display:block;color:var(--charcoal);text-decoration:none}
        .gj-related-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(36,48,72,.10);border-color:var(--yellow)}
        .gj-related-card .icon{width:32px;height:32px;background:var(--pale-navy);color:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-family:var(--font-serif);font-size:16px}
        .gj-related-card h4{font-family:var(--font-serif);color:var(--navy);font-size:15px;line-height:1.35;margin:0}
        .gj-authors{background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:24px;margin:24px 0}
        .gj-authors h3{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--grey);margin-bottom:12px}
        .gj-author-row{padding:12px 0;border-bottom:1px solid var(--mist)}
        .gj-author-row:last-child{border-bottom:none}
        .gj-author-row strong{color:var(--navy);font-size:15px;display:block;margin-bottom:4px}
        .gj-author-role{font-size:13px;color:var(--grey);margin-bottom:4px}
        .gj-author-bio{font-size:13px;color:var(--charcoal);line-height:1.55}
        .gj-sources{background:var(--pale-navy);border-radius:8px;padding:24px;margin:24px 0;font-size:13px;line-height:1.7}
        .gj-sources h4{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:12px}
        .gj-sources ul{list-style:none;margin:0 0 12px !important;padding:0}
        .gj-sources li{padding:4px 0;color:var(--charcoal)}
        .gj-sources a{color:var(--navy);border-bottom:1px dotted var(--navy);text-decoration:none}
        .gj-cta-band{background:var(--yellow);padding:64px 0;text-align:center;position:relative;margin-top:64px}
        .gj-cta-band::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--navy)}
        .gj-cta-band h2{font-family:var(--font-serif);color:var(--navy);font-size:clamp(28px,4vw,40px);line-height:1.15;margin-bottom:12px}
        .gj-cta-band p{color:var(--navy);font-size:17px;max-width:640px;margin:0 auto 24px;line-height:1.55}
        .gj-btn-navy{background:var(--navy);color:var(--yellow) !important}
        .gj-cta-secondary{display:inline-block;margin-top:16px;color:var(--navy);font-size:14px;font-weight:600;border-bottom:1px solid var(--navy);padding-bottom:2px;text-decoration:none}
      `}</style>

      <div ref={progressRef} className="gj-progress" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="container">
        <nav className="gj-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span className="sep">›</span>
          <a href="/resources">Resources</a><span className="sep">›</span>
          <span className="cur">Online MBA & Government Jobs Guide</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="gj-hero">
        <div className="container">
          <span className="gj-eyebrow">Resource Guide • 2025-26 Edition</span>
          <h1>Is an Online MBA valid for government jobs in India? The honest 2025-26 answer</h1>
          <p className="gj-subtitle">
            Yes, with one condition that matters more than any other: always verify the specific job notification. Built from 241 government-job-eligibility counselling conversations. No blanket guarantees — the real regulatory picture.
          </p>
          <div className="gj-trust">
            <span className="stars">★★★★★</span>
            <span>4.8 / 5 counselling rating</span>
            <span className="dot">•</span>
            <span>12,000+ aspirants placed since 2019</span>
            <span className="dot">•</span>
            <span>150+ verified universities</span>
          </div>
          <div className="gj-cta-row">
            <a href="/counselling/" className="gj-btn gj-btn-primary">Get a free eligibility check for your target job →</a>
            <a href="#pdf-download" className="gj-btn gj-btn-outline">Download the PDF version →</a>
          </div>
          <p className="gj-caption">
            <em>Last verified against UGC's ODL and Online Regulations 2020 and current UGC-DEB guidance. This is general information, not a guarantee for any specific job posting — see the verification section for how to verify your exact case.</em>
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="gj-layout">

          {/* ToC sidebar */}
          <aside className="gj-toc-sidebar" aria-label="Table of contents">
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
          <div className="gj-body">

            {/* Mobile ToC */}
            <details className="gj-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                ))}
              </ol>
            </details>

            {/* Section 1 — Key Takeaways */}
            <section id="takeaways" className="gj-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {TAKEAWAYS.map((t, i) => (
                  <li key={i}><strong>{t.label}.</strong> {t.text}</li>
                ))}
              </ul>
            </section>

            {/* Section 2 — Quick Answer */}
            <section id="quick-answer">
              <h2>If you only need the answer, here it is</h2>
              <p>
                Yes — an Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for government job eligibility in India, under UGC's own regulations. The one condition that matters: always check the specific job notification's eligibility clause, since recruiting bodies occasionally add their own mode-specific requirements.
              </p>
              <div className="gj-quick-card">
                <strong style={{ color: "var(--navy)" }}>Quick reference by category:</strong>
                <ul>
                  <li><span className="gj-quick-label">General principle (UGC-DEB approved):</span><span className="gj-quick-val"> Legally equivalent to regular MBA — <strong>Yes</strong></span></li>
                  <li><span className="gj-quick-label">PSU bank internal promotions:</span><span className="gj-quick-val"> Generally accepted — <strong>Usually yes</strong></span></li>
                  <li><span className="gj-quick-label">PSU direct/external recruitment:</span><span className="gj-quick-val"> Depends entirely on the specific notification's wording — <strong>Check first</strong></span></li>
                  <li><span className="gj-quick-label">State/Central Government admin promotion:</span><span className="gj-quick-val"> Generally accepted if UGC-DEB approved — <strong>Usually yes</strong></span></li>
                  <li><span className="gj-quick-label">Teaching/faculty positions:</span><span className="gj-quick-val"> MBA alone doesn't qualify regardless of mode — UGC-NET/PhD required — <strong>Different track entirely</strong></span></li>
                  <li><span className="gj-quick-label">Defence civilian administrative roles:</span><span className="gj-quick-val"> Generally accepted if UGC-DEB approved — <strong>Usually yes, verify specific notification</strong></span></li>
                </ul>
                <p style={{ fontSize: "13px", color: "var(--grey)", marginTop: "12px", fontStyle: "italic" }}>Full breakdown by category below. Full verification walkthrough in the How to Verify section.</p>
              </div>
            </section>

            {/* Section 3 — Legal Basis */}
            <section id="legal-basis">
              <h2>What the regulation actually says</h2>
              <span className="gj-freshness">Last verified against UGC ODL and Online Regulations 2020</span>
              <p>
                The UGC (Open and Distance Learning Programmes and Online Programmes) Regulations, 2020 govern how Indian universities may offer Distance and Online degrees. UGC has stated that degrees earned through approved Online or ODL mode carry the same legal standing as conventional, on-campus degrees — for all purposes, including employment.
              </p>
              <p>
                This is the foundational legal basis for everything else in this guide. Before 2020, Distance MBAs operated under an older, less standardised framework, and Online MBAs as a distinct category barely existed in Indian regulation. The 2020 Regulations created a clearer, stronger equivalence principle — but equivalence at the <em>regulatory</em> level doesn't automatically mean every individual recruiting notification will reflect that principle in its specific wording, which is precisely why the verification section walks through verifying your specific case rather than relying on the general principle alone.
              </p>
              <div className="gj-callout">
                <span className="gj-callout-label">What "equivalent for all purposes" actually covers</span>
                It covers: the degree's legal validity, its standing for further education (eligibility for a PhD, for instance), and its general standing as a postgraduate management qualification for employment purposes. It does <em>not</em> override a specific employer's or recruiting body's right to set additional, more specific eligibility criteria within an individual job notification.
              </div>
            </section>

            {/* Section 4 — Job Categories */}
            <section id="job-categories">
              <h2>The honest category-by-category picture</h2>
              <p>
                Government job categories vary meaningfully in how consistently they accept Online MBAs. PSU bank promotions and general administrative postgraduate-qualification eligibility are the most consistently accepting categories. Teaching and faculty positions are the clearest exception — MBA alone, in any mode, does not meet faculty eligibility requirements.
              </p>
              <div className="gj-table-wrap">
                <table className="gj-table">
                  <caption>As of 2025-26. This table reflects general regulatory principles — not a substitute for reading the specific notification for your target role.</caption>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>General stance</th>
                      <th>Key caveat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JOB_CATEGORIES.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.category}</strong></td>
                        <td className={
                          row.stance.includes("Generally") ? "gj-stance-yes" :
                          row.stance.includes("Mixed") ? "gj-stance-check" :
                          "gj-stance-no"
                        }>{row.stance}</td>
                        <td>{row.caveat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="gj-callout gj-callout-navy">
                <span className="gj-callout-label">Counsellor observation</span>
                From our counselling records 2023-25: the single biggest source of confusion we see is aspirants assuming "government job eligible" is one uniform status, when it genuinely isn't. An Online MBA that's perfectly fine for a state government administrative promotion may face a specific documentation question in a PSU Management Trainee recruitment that happens to use "full-time" language in its notification. These aren't contradictions in the law — they're different recruiting bodies exercising their right to set specific criteria within the general equivalence framework. — <em>CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Section 5 — UGC-DEB Requirement */}
            <section id="ugc-deb-requirement">
              <h2>Everything in this guide assumes one thing: current UGC-DEB approval</h2>
              <p>
                Every principle in this guide applies only if your specific university and specific MBA programme held UGC-DEB approval for the academic year in which you enrolled. This isn't a minor footnote — it's the load-bearing requirement underneath everything else. A degree from a university that lacked current-year UGC-DEB approval has no claim to the equivalence principle discussed above, regardless of how legitimate the university otherwise appears.
              </p>
              <p>
                The full verification process is covered in detail in our <a href="/resources/top-20-ugc-deb-approved-online-mba-2025-26/">Top 20 UGC-DEB Approved Online MBA Universities guide</a>. The short version: visit <a href="https://deb.ugc.ac.in" target="_blank" rel="noopener">deb.ugc.ac.in</a> directly, confirm your specific university and specific MBA programme are listed as approved for your specific enrolment year — not a general "the university is UGC recognised" claim, and not a prior year's approval status.
              </p>
              <div className="gj-callout">
                <span className="gj-callout-label">Timing matters</span>
                If you're still deciding where to enrol and government job eligibility is part of your reasoning, verify UGC-DEB status <em>before</em> you enrol, not after. If you've already completed your MBA and are now applying for a government role, verify it now — before you invest time in an application process, in case documentation issues need to be resolved first.
              </div>
            </section>

            {/* Section 6 — Promotion vs Recruitment */}
            <section id="promotion-vs-recruitment">
              <h2>Why this distinction changes the whole picture</h2>
              <p>
                Promotion eligibility and fresh recruitment eligibility are governed differently, and conflating them is the biggest source of confusion in this topic. Internal promotion policies at PSU banks typically align closely with UGC's equivalence principle. Fresh recruitment notifications, by contrast, are drafted independently, post by post — and wording varies.
              </p>
              <h3>Promotion eligibility</h3>
              <p>
                Promotion eligibility (an existing employee seeking internal advancement) tends to be the more consistent, more favourable case. Large PSU banks and public-sector employers generally maintain internal HR policies that explicitly recognise UGC-DEB approved qualifications — often because these policies were themselves updated after the 2020 Regulations to reflect the equivalence principle. In our tracking, this is where Online MBAs are most reliably accepted without friction.
              </p>
              <h3>Fresh recruitment eligibility</h3>
              <p>
                Fresh recruitment eligibility (applying externally for a newly advertised post) is where notification-specific wording matters most. Each recruitment notification is drafted independently — sometimes by a committee that copy-pastes eligibility language from a previous, older notification that predates the 2020 equivalence clarity, or that was written with a specific "full-time" phrasing for reasons unrelated to distance-education policy at all. This doesn't mean fresh recruitment routinely rejects Online MBAs — most don't — but it's the category where reading the actual notification text matters most.
              </p>
              <div className="gj-callout">
                <span className="gj-callout-label">Single highest-value action</span>
                If your goal is a specific named government post you haven't yet been recruited into, read that post's most recent eligibility notification directly <em>before</em> enrolling in any MBA programme — this is the single highest-value five minutes you can spend in your entire planning process.
              </div>
            </section>

            {/* Section 7 — AICTE */}
            <section id="aicte-matter">
              <h2>UGC-DEB vs AICTE: which one actually matters here</h2>
              <p>
                For general government job eligibility, UGC-DEB approval is the primary requirement — it establishes degree equivalence under the 2020 Regulations. AICTE approval becomes relevant only when a specific job notification explicitly names it as a requirement, which happens occasionally for certain technical-management or engineering-adjacent postgraduate roles, but is not the default expectation.
              </p>
              <p>
                Many strong Online MBA programmes hold UGC-DEB approval without separate AICTE approval, and this is entirely normal and doesn't diminish the degree's general validity. If you're targeting a specific government role and its notification explicitly requires AICTE approval alongside UGC recognition, that's a signal to choose a programme carrying both — several universities in our <a href="/resources/top-20-ugc-deb-approved-online-mba-2025-26/">Top 20 list</a> do.
              </p>
              <div className="gj-callout">
                <span className="gj-callout-label">Practical rule of thumb</span>
                If a specific job notification's eligibility clause mentions only "UGC recognised university" or "postgraduate degree in Management," UGC-DEB approval alone is sufficient. If it explicitly says "AICTE approved," confirm your specific programme carries that approval too, or choose one that does.
              </div>
            </section>

            {/* Section 8 — Rejection Reasons */}
            <section id="rejection-reasons">
              <h2>Why some Online MBA applications get flagged or rejected</h2>
              <p>None of these reasons reflect a problem with Online MBAs as a category — they reflect specific, avoidable gaps in documentation or verification.</p>
              <ul>
                <li><strong>The university's UGC-DEB approval had lapsed for the specific enrolment year</strong>, even though the university held approval in earlier or later years. This is the most consequential rejection reason and the one most within an aspirant's control to avoid.</li>
                <li><strong>Confusing "UGC recognised" with "UGC-DEB approved for Online MBA specifically."</strong> A university can be a broadly legitimate, UGC-recognised institution while a specific Online MBA programme lacks current UGC-DEB approval — always verify at the programme level, not just the university level.</li>
                <li><strong>The specific job notification required AICTE approval and the programme held UGC-DEB approval only.</strong> A notification-specific requirement, not a general rule.</li>
                <li><strong>The notification used "full-time" or "regular" language</strong>, and the recruiting body's document-verification stage interpreted this to exclude Online mode, even where the broader equivalence principle would otherwise apply. This is the area with the most genuine ambiguity, and where written clarification before applying is most valuable.</li>
                <li><strong>Incomplete or delayed documentation</strong> — provisional certificates, marksheet delays, or degree-issuance timing that didn't align with an application deadline. Not specific to Online MBAs, but worth planning around given Online/Distance degree issuance timelines can occasionally run longer than residential programmes.</li>
              </ul>
            </section>

            {/* Section 9 — Verification Steps */}
            <section id="verification-steps">
              <h2>How to verify your Online MBA qualifies for your specific target role, in 6 steps</h2>
              <p>This is narrower and more targeted than the general UGC-DEB verification process — this walkthrough is specifically for confirming eligibility against one named government role.</p>
              <div className="gj-steps">
                {VERIFICATION_STEPS.map((s) => (
                  <div className="gj-step-card" key={s.step}>
                    <div className="gj-step-num">{s.step}</div>
                    <div className="gj-step-body">
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gj-callout gj-callout-navy">
                <span className="gj-callout-label">Counsellor observation</span>
                From our counselling records 2023-25: aspirants who complete Step 5 — writing to the recruiting body directly before applying — report near-zero eligibility friction later in the process. It takes a few days for a response in most cases, and the written confirmation becomes genuinely valuable documentation. Aspirants who skip this step and simply assume eligibility based on the general UGC principle are the ones who occasionally encounter friction at the document-verification stage, well after they've already invested time and money in the application process. — <em>CollegeNCourses Senior Counsellor Desk</em>
              </div>
            </section>

            {/* Section 10 — Categories in Depth */}
            <section id="categories-depth">
              <h2>A closer look at each category</h2>
              <p>Building on the summary table above, here's more context on how each category tends to treat Online MBA qualifications in practice.</p>
              <div className="gj-category-cards">
                <div className="gj-category-card">
                  <h4>PSU bank promotions (Scale I-IV, specialist officer tracks)</h4>
                  <p>The most consistently favourable category in our tracking. Most large public-sector banks explicitly recognise UGC-DEB approved Online and Distance MBAs for internal promotion eligibility. Fresh recruitment for entry-level positions generally doesn't require an MBA at all — the MBA becomes relevant specifically at promotion and specialist-role stages.</p>
                </div>
                <div className="gj-category-card">
                  <h4>PSU direct recruitment (Management Trainee, Executive Trainee)</h4>
                  <p>The most notification-dependent category. Some PSUs explicitly welcome any UGC-recognised postgraduate management qualification regardless of mode; others use "full-time MBA/PGDM" language in specific notifications, sometimes inherited from older recruitment-cycle templates. Always check the specific, current notification rather than assuming based on a previous cycle or a different PSU's policy.</p>
                </div>
                <div className="gj-category-card">
                  <h4>Central Government administrative posts</h4>
                  <p>Where a specific central government post lists a postgraduate management qualification as eligibility, UGC-DEB approved Online MBAs are generally accepted on the same equivalence basis as any other UGC-recognised postgraduate degree. Central recruitment notifications more commonly reference "recognised university" language than mode-specific exclusions.</p>
                </div>
                <div className="gj-category-card">
                  <h4>State Government administrative posts</h4>
                  <p>Broadly similar to the central government pattern, though state-specific circulars occasionally introduce their own conditions. State Public Service Commission (PSC) notifications should be checked individually per state, since practice isn't fully uniform nationally.</p>
                </div>
                <div className="gj-category-card">
                  <h4>Defence civilian and Defence PSU administrative roles</h4>
                  <p>Civilian and administrative-track roles within defence establishments and Defence PSUs generally follow the same UGC-DEB equivalence principle as other central government contexts. This category is distinct from combatant/uniformed recruitment, which typically doesn't involve MBA-level eligibility criteria at all.</p>
                </div>
                <div className="gj-category-card">
                  <h4>Teaching and academic faculty positions</h4>
                  <p>The clear exception to nearly everything else in this guide. Eligibility for a management faculty position (Assistant Professor and above) is governed by UGC-NET qualification or a PhD — an MBA, in any mode, does not by itself satisfy faculty eligibility requirements. If your goal is an academic career, an MBA is not the relevant credential regardless of how it was obtained.</p>
                </div>
              </div>
            </section>

            {/* Section 11 — Safest Universities */}
            <section id="safest-universities">
              <h2>If government job eligibility is your priority, start here</h2>
              <p>
                Every university in our <a href="/resources/top-20-ugc-deb-approved-online-mba-2025-26/">Top 20 UGC-DEB Approved Online MBA Universities guide</a> meets the baseline UGC-DEB requirement. For aspirants specifically prioritising government job eligibility, a few additional considerations are worth highlighting.
              </p>
              <ul>
                <li><strong>Prefer universities holding both UGC-DEB and AICTE approval</strong> where your target role's notification specifically names AICTE — several universities in our Top 20 list, including NMIMS, Manipal MAHE, and Symbiosis SCOL, hold dual approval, which removes one entire category of potential friction.</li>
                <li><strong>Prefer well-established universities with a longer UGC-DEB approval track record</strong> over very new entrants — a university with several consecutive years of approval history gives you a stronger paper trail if a verification question arises years later during a promotion cycle.</li>
                <li><strong>Public university options (IGNOU, state open universities)</strong> carry genuine, strong UGC-DEB and NAAC standing and are a reasonable choice specifically for government-job-eligibility purposes, even though private-sector employer perception of these options runs lower. Government eligibility is a different question from private-sector brand perception.</li>
              </ul>
              <div className="gj-callout">
                <span className="gj-callout-label">Note on this guidance</span>
                This guidance is directional, not a ranking specific to government-job outcomes. If government job eligibility is your primary goal, a counselling call lets us walk through your specific target role and shortlist accordingly.
              </div>
            </section>

            {/* Section 12 — Red Flags */}
            <section id="red-flags">
              <h2>Marketing claims to be sceptical of</h2>
              <p>Because "government job eligible" is such a high-anxiety, high-search-intent phrase, it attracts overclaiming from some admissions counsellors and marketing material. Watch for these specific claims.</p>
              <ul>
                <li><strong>"This MBA guarantees you a government job."</strong> No MBA, in any mode, from any university, guarantees a government job. Eligibility and selection are entirely separate — government recruitment involves competitive exams, interviews, and selection ratios regardless of qualification.</li>
                <li><strong>"All government jobs accept this MBA, no exceptions."</strong> The honest picture is "generally yes, but always verify the specific notification," not a blanket universal guarantee.</li>
                <li><strong>"You don't need to check UGC-DEB approval, our university is obviously legitimate."</strong> Legitimate universities have no reason to discourage independent verification. If a counsellor actively discourages you from checking <a href="https://deb.ugc.ac.in" target="_blank" rel="noopener">deb.ugc.ac.in</a> yourself, treat that as a warning sign.</li>
                <li><strong>"This programme is specifically approved for [named specific government exam or post]."</strong> UGC-DEB approves the degree programme itself, not its eligibility for individual named job postings. No university can truthfully claim pre-approval for a specific external recruitment notification.</li>
              </ul>
              <div className="gj-callout">
                If you encounter any of these claims, <a href="/counselling/">book a counselling call</a> — we'll help you separate the honest regulatory picture from marketing overclaiming, specific to your target role.
              </div>
            </section>

            {/* Section 13 — Scenarios */}
            <section id="scenarios">
              <h2>Three real government-job-eligibility stories (anonymised)</h2>
              <div className="gj-scenarios">
                {SCENARIOS.map((s) => (
                  <div className="gj-scenario" key={s.name}>
                    <div className="gj-scenario-header">
                      <div className="gj-scenario-avatar">{s.initial}</div>
                      <div className="gj-scenario-meta">
                        <h3>{s.name}, {s.age}</h3>
                        <p>{s.role}</p>
                      </div>
                    </div>
                    <div className="gj-scenario-body">
                      <div className="gj-scenario-row">
                        <div className="gj-scenario-row-label">Background</div>
                        <p>{s.background}</p>
                      </div>
                      <div className="gj-scenario-row">
                        <div className="gj-scenario-row-label">What they did</div>
                        <p>{s.action}</p>
                      </div>
                      <div className="gj-scenario-row">
                        <div className="gj-scenario-row-label">Recommendation / Action taken</div>
                        <p>{s.recommendation}</p>
                      </div>
                      <div className="gj-scenario-row">
                        <div className="gj-scenario-row-label">Outcome</div>
                        <div className={s.type === "success" ? "gj-scenario-outcome-success" : "gj-scenario-outcome-caution"}>
                          <p><strong>{s.type === "success" ? "✓ " : "⚠ "}</strong>{s.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gj-callout">
                <span className="gj-callout-label">What these three stories illustrate</span>
                The aspirants who verified their specific situation in writing before committing — Manoj and Kavita — encountered no friction. Deepak's situation wasn't a case of Online MBAs being invalid; it was a case of not checking one specific notification's specific wording before it mattered. The lesson generalises: verify first, in writing, for your specific target role.
              </div>
            </section>

            {/* Section 14 — FAQ */}
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="gj-faq-list">
                {FAQS.map((faq, i) => (
                  <details className="gj-faq-item" key={i}>
                    <summary className="gj-faq-q">
                      <span>{faq.q}{(faq as { voice?: boolean }).voice && <span className="gj-voice-badge">Voice search</span>}</span>
                      <span className="gj-faq-icon">+</span>
                    </summary>
                    <div className="gj-faq-a">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Section 15 — Lead Magnet */}
            <section id="pdf-download">
              <div className="gj-lead-magnet">
                <span className="gj-lead-badge">Free Download</span>
                <h2>Take this guide with you</h2>
                <p className="gj-lead-lead">
                  The complete regulatory breakdown, print-ready and shareable. Includes the government job category table, the 6-step verification checklist, and a sample written-clarification-request template. Free — just tell us where to send it.
                </p>
                <form className="gj-lm-form" onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}>
                  <div className="gj-lm-field">
                    <label>Full name<span className="req">*</span></label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="gj-lm-field">
                    <label>Email<span className="req">*</span></label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="gj-lm-field">
                    <label>Phone (optional)</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="gj-lm-field">
                    <label>Target job category<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select category</option>
                      <option>PSU Bank</option>
                      <option>Other PSU</option>
                      <option>Central Government</option>
                      <option>State Government</option>
                      <option>Defence Civilian</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="gj-lm-field gj-lm-full">
                    <label>Are you currently employed in this sector?<span className="req">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Yes, seeking promotion</option>
                      <option>No, seeking fresh recruitment</option>
                      <option>Not yet employed here</option>
                    </select>
                  </div>
                  <p className="gj-lm-consent gj-lm-full">
                    By downloading, you agree to receive a follow-up email from a CollegeNCourses counsellor. We do not share your details with any university, employer, or third party. Unsubscribe anytime.
                  </p>
                  <div className="gj-lm-full">
                    <button type="submit" className="gj-lm-submit">Email me the PDF →</button>
                  </div>
                </form>
              </div>
            </section>

            {/* Legal disclaimer */}
            <div className="gj-disclaimer">
              <strong>Disclaimer:</strong> This guide provides general information based on UGC's stated equivalence principle as of 2025-26. It is not legal advice and does not guarantee eligibility for any specific job posting. Individual recruiting authorities set their own eligibility criteria within each specific notification. Always verify directly with the relevant recruiting body before making enrolment or application decisions based on this content.
            </div>

            {/* Section 16 — Related Resources */}
            <section id="related">
              <h2>Go deeper</h2>
              <div className="gj-related-grid">
                {RELATED.map((r) => (
                  <a href={r.href} className="gj-related-card" key={r.href}>
                    <div className="icon">→</div>
                    <h4>{r.title}</h4>
                  </a>
                ))}
              </div>
            </section>

            {/* Section 17 — Authors */}
            <section id="authors">
              <div className="gj-authors">
                <h3>About this guide</h3>
                <div className="gj-author-row">
                  <strong>Written by</strong>
                  <div className="gj-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="gj-author-bio">Leads content strategy for CollegeNCourses and has been writing on Indian higher education since 2020.</div>
                </div>
                <div className="gj-author-row">
                  <strong>Reviewed by</strong>
                  <div className="gj-author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="gj-author-bio">Has advised over 3,000 aspirants on eligibility and career-planning questions across Distance, Online, and Executive MBA modes since 2016.</div>
                </div>
                <div className="gj-author-row">
                  <strong>Approved by</strong>
                  <div className="gj-author-role">Nikhita Pradeep Deshmukh, Founder, DNYANAL EDUCON PRIVATE LIMITED</div>
                  <div className="gj-author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <div className="gj-sources">
                <h4>Sources referenced</h4>
                <ul>
                  <li><a href="https://www.ugc.gov.in/" target="_blank" rel="noopener">University Grants Commission (UGC)</a></li>
                  <li><a href="https://deb.ugc.ac.in/" target="_blank" rel="noopener">UGC Distance Education Bureau (DEB)</a> — Approved-institutions list, 2025-26</li>
                  <li>UGC (Open and Distance Learning Programmes and Online Programmes) Regulations, 2020</li>
                  <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener">AICTE</a> — Approval Process Handbook 2025-26</li>
                  <li><a href="https://www.aiu.ac.in/" target="_blank" rel="noopener">Association of Indian Universities (AIU)</a> — equivalence certification context</li>
                  <li>CollegeNCourses counselling records on government-job eligibility questions (241 conversations analysed 2023-25)</li>
                </ul>
                <p style={{ fontSize: "12px", color: "var(--grey)", marginTop: "12px", fontStyle: "italic" }}>
                  This page is updated every six months, or immediately upon any UGC regulatory change affecting Distance or Online degree equivalence.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="gj-cta-band">
        <div className="container">
          <h2>Targeting a specific government role? Let's check your exact eligibility.</h2>
          <p>Talk to a CollegeNCourses counsellor. We'll help you read your target notification correctly, verify UGC-DEB status, and — if needed — draft a written clarification request. Free, 30 minutes.</p>
          <a href="/counselling/" className="gj-btn gj-btn-navy">Book a free counselling call →</a>
          <br />
          <a href="/resources/top-20-ugc-deb-approved-online-mba-2025-26/" className="gj-cta-secondary">Or read our Top 20 UGC-DEB Approved Universities guide →</a>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="govt-jobs-guide" />
    </>
  );
}
