"use client";

import { useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-legal.css";
import "@/components/planner/planner-about.css";
import "@/components/planner/planner-guide-article.css";

const bricolage = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  variable: "--font-planner-display",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  variable: "--font-planner-body",
  subsets: ["latin"],
  display: "swap",
});

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const TOC = [
  { id: "takeaways", label: "Key takeaways" },
  { id: "snapshot", label: "In 90 seconds" },
  { id: "what-is", label: "What this MBA really is" },
  { id: "who-fits", label: "Who it fits" },
  { id: "curriculum", label: "Curriculum 2025-26" },
  { id: "career-paths", label: "Career paths" },
  { id: "salary", label: "Salary data 2025-26" },
  { id: "top-programmes", label: "Top 10 programmes" },
  { id: "fees", label: "Fee structure" },
  { id: "mode-comparison", label: "Distance vs Online vs Executive" },
  { id: "not-fit", label: "Who it does NOT fit" },
  { id: "questions", label: "5 questions to ask" },
  { id: "faq", label: "FAQ" },
  { id: "resources", label: "Related resources" },
  { id: "authors", label: "About the authors" },
];

const CURRICULUM = [
  { sem: "Semester 1", title: "Foundations", body: "Principles of Management, Managerial Economics, Financial Accounting, Business Statistics, Marketing Management (core), Organisational Behaviour. This is where you build the vocabulary of business." },
  { sem: "Semester 2", title: "Core marketing", body: "Consumer Behaviour, Brand Management, Sales & Distribution Management, Marketing Research, Services Marketing, Business Communication. This is where marketing becomes a proper discipline." },
  { sem: "Semester 3", title: "Specialization depth", body: "Integrated Marketing Communications, Digital Marketing (module), Retail Management, B2B Marketing, Product & Innovation Management, Marketing Analytics (Excel and GA4)." },
  { sem: "Semester 4", title: "2025-26 additions & capstone", body: "AI for Marketers (new elective at most universities in 2024-25), Retail Media & CTV Advertising, Marketing Automation & CRM (HubSpot, Salesforce), Sustainability & Purpose-Led Marketing, capstone project." },
];

const ROLES = [
  { n: 1, title: "Brand Management", body: "Ownership of a single brand or product line. Roles: Assistant Brand Manager → Brand Manager → Senior Brand Manager → Category Head. Typical employers: HUL, ITC, Nestle, Marico, Dabur, Emami. The 'classic' marketing career and most competitive to enter." },
  { n: 2, title: "Product Marketing", body: "Sits between product and sales. Owns positioning, launches, sales enablement. Roles: PMA → PMM → Senior PMM → Head of PMM. Typical employers: Amazon, Flipkart, Salesforce, Microsoft, Freshworks, Zoho. Fastest-growing role family in India in 2025-26." },
  { n: 3, title: "Digital & Growth Marketing", body: "Performance marketing, SEO, paid media, growth hacking. Roles: Growth Associate → Growth Manager → Head of Growth. Typical employers: D2C (Nykaa, Mamaearth, boAt), fintech (CRED, Groww, Zerodha), consumer tech (Zomato, Swiggy, Ola)." },
  { n: 4, title: "Sales & BD", body: "Enterprise sales, key account management, channel sales. Roles: BDM → Sales Manager → Regional Head → National Sales Head. Typical employers: SaaS, industrial goods, insurance, real estate, pharma. Marketing MBAs who do this well often earn faster than pure marketing paths." },
  { n: 5, title: "Marketing Research & Analytics", body: "Consumer research, market sizing, analytics. Roles: Research Analyst → Insights Manager → Head of Insights. Typical employers: Nielsen, Kantar, Ipsos, Deloitte, and internal insights teams at large FMCG and tech firms. Strong fit for quantitative aspirants." },
  { n: 6, title: "Marketing Consulting", body: "Independent or firm-based consulting on brand strategy, go-to-market, marketing operations. Roles: Consultant → Senior Consultant → Principal → Partner. Typical employers: Bain, BCG, McKinsey, Kearney, boutique firms. More accessible via Executive MBA than Distance/Online." },
];

const SALARY_ROWS = [
  { band: "Fresh graduate, 0-2 years", distOnline: "Rs 4.5-8 LPA", execT1: "Rs 8-14 LPA", execT2: "Rs 6-10 LPA" },
  { band: "Mid-level, 3-7 years", distOnline: "Rs 9-16 LPA", execT1: "Rs 18-30 LPA", execT2: "Rs 12-20 LPA" },
  { band: "Senior, 8-15 years", distOnline: "Rs 18-35 LPA", execT1: "Rs 35-60 LPA", execT2: "Rs 22-40 LPA" },
  { band: "Leadership, 15+ years", distOnline: "Rs 35-60 LPA", execT1: "Rs 60 LPA - 1.2 Cr", execT2: "Rs 40-75 LPA" },
  { band: "CMO track (top 5%)", distOnline: "Rs 50 LPA+", execT1: "Rs 1 Cr+", execT2: "Rs 60 LPA+" },
];

const TOP_PROGRAMMES = [
  { n: 1, uni: "Symbiosis (SCOL)", prog: "Online MBA Marketing", mode: "Online", duration: "24 mo", fee: "Rs 2.5 L", approval: "UGC-DEB, AICTE", placement: "Strong (~78%)", strength: "Live faculty, alumni network" },
  { n: 2, uni: "NMIMS Global Access", prog: "Distance MBA Marketing", mode: "Distance", duration: "24 mo", fee: "Rs 1.75 L", approval: "UGC-DEB", placement: "Moderate-Strong (~65%)", strength: "Industry-tied projects" },
  { n: 3, uni: "Manipal (MAHE)", prog: "Online MBA Marketing", mode: "Online", duration: "24 mo", fee: "Rs 1.6 L", approval: "UGC-DEB, NAAC A+", placement: "Moderate (~55%)", strength: "Best-value Tier-1 university" },
  { n: 4, uni: "IIM Indore", prog: "Executive MBA (1-Year)", mode: "Executive", duration: "12 mo", fee: "Rs 22 L", approval: "AICTE, IIM Act", placement: "Very Strong (~100%)", strength: "Tier-1 brand, guaranteed track" },
  { n: 5, uni: "Amity University", prog: "Online MBA Marketing", mode: "Online", duration: "24 mo", fee: "Rs 1.99 L", approval: "UGC-DEB", placement: "Moderate (~55%)", strength: "Widest specialization electives" },
  { n: 6, uni: "OP Jindal (JGBS)", prog: "Online MBA Global", mode: "Online", duration: "24 mo", fee: "Rs 3.5 L", approval: "UGC-DEB, AACSB", placement: "Strong (~70%)", strength: "International accreditation" },
  { n: 7, uni: "ICFAI University", prog: "Distance MBA Marketing", mode: "Distance", duration: "24 mo", fee: "Rs 1.2 L", approval: "UGC-DEB", placement: "Limited (self-driven)", strength: "Lowest UGC-DEB cost" },
  { n: 8, uni: "Jain Deemed-to-be Univ", prog: "Online MBA Marketing", mode: "Online", duration: "24 mo", fee: "Rs 1.5 L", approval: "UGC-DEB, NAAC A++", placement: "Moderate-Strong (~60%)", strength: "Value + accreditation" },
  { n: 9, uni: "IIM Kozhikode", prog: "EPGP", mode: "Executive", duration: "24 mo", fee: "Rs 15 L", approval: "AICTE, IIM Act", placement: "Very Strong (~95%)", strength: "IIM tag without residency" },
  { n: 10, uni: "Chandigarh University", prog: "Online MBA Marketing", mode: "Online", duration: "24 mo", fee: "Rs 1.4 L", approval: "UGC-DEB, NAAC A+", placement: "Moderate (~55%)", strength: "Strong newer entrant" },
];

const FEE_CARDS = [
  { mode: "Distance MBA", price: "Rs 1.2 L - Rs 2 L", body: "Lowest cost. Self-paced study, largely asynchronous. Best for self-disciplined aspirants. Placement support is minimal at most universities. Third-party EMI available through Bajaj Finserv, HDFC Credila, and fintech lenders." },
  { mode: "Online MBA", price: "Rs 1.5 L - Rs 3.5 L", body: "Mid-tier cost. Live faculty sessions, scheduled classes, recorded playback. Better placement support. Fee often payable in semester-wise or monthly instalments interest-free directly through the university. Most 2025-26 programmes offer their own 24-month EMI plans." },
  { mode: "Executive MBA", price: "Rs 8 L - Rs 25 L", body: "Highest cost. In-person or intensive interactive online. Full placement or career-services access. Standard education-loan tie-ups with SBI, HDFC Credila, ICICI Bank, and Avanse Financial." },
];

const MODE_FIT_ROWS = [
  { situation: "Working full-time, want a promotion inside current company or industry", best: "Distance MBA or Online MBA", why: "Job continues uninterrupted. Employer often reimburses partially. Promotion clock keeps running." },
  { situation: "Switching industry or function (engineer → marketer, tech → brand)", best: "Online MBA (preferred) or Executive MBA", why: "Online gives structured live faculty and stronger placement support than Distance. Executive gives Tier-1 credibility that helps break industry inertia." },
  { situation: "Between jobs, mid-career, need a hard reset with brand credibility", best: "Executive MBA (IIM, ISB, XLRI, MDI)", why: "Higher fee, but placement cell + alumni network + Tier-1 brand justify it for a reset moment. Not worth it for a small career-tuning." },
  { situation: "Founder or family-business owner", best: "Distance MBA or Online MBA", why: "Time is the constraint, not credential. Curriculum access matters more than placement." },
  { situation: "Aspirant with 0-2 years of experience", best: "Wait, or take Online MBA", why: "Most Executive MBAs require 3+ years. Distance MBAs are open to all but career leverage is thin at 0-2 years." },
];

const NOT_FIT = [
  "You dislike consumer psychology and find people-motivation questions boring. Marketing is fundamentally about why people buy. If that's uninteresting, you'll be miserable.",
  "You want a purely analytical or technical role. Consider Business Analytics or IT & Systems Management instead.",
  "You want to become a CFO or work in equity research. Finance or Banking & Financial Services specialization is the right path.",
  "You want to become a CHRO or work in learning-and-development. HR Management specialization is the right path.",
  "You resist creative work or find brand-building 'fluffy.' Modern marketing has moved substantially toward data, but discomfort with creative execution will hurt you at senior levels.",
  "You are choosing Marketing 'because it seems easier than Finance.' It isn't. It is different-hard. If you are optimising for perceived ease, you will not enjoy the job that follows the MBA.",
];

const QUESTIONS = [
  { q: "Name your target role, two years post-graduation", a: "'Marketing' is too vague. Brand Manager? Product Marketing Manager? Head of Growth? Sales Manager? Consultant? The programme, and even the specialization mix within Marketing, changes based on the answer. If you cannot name a specific target role, book a counselling call before you enrol." },
  { q: "Confirm whether you're shifting up or fully switching", a: "The MBA's payoff is 2-3x higher for someone already in sales, marketing, or comms who wants a promotion. It's a slower payoff for a full-industry-and-function switch. Both are valid; know which one you're doing." },
  { q: "Check your employer's stated position on Distance and Online MBAs", a: "Most employers accept them in 2025-26 (post AICTE clarifications), but 'accept' is not 'reward.' Have an honest conversation with your reporting manager or HR before enrolling. If the answer is 'we prefer regular MBA,' calibrate accordingly." },
  { q: "Audit whether you can actually finish", a: "Distance and Online MBAs have a 30-40% dropout rate in India. Working professionals underestimate the workload. Before enrolling, block your calendar and see if 12-15 hours per week for 24 months is realistic. If not, either compress by choosing a 12-month Executive MBA or postpone." },
  { q: "Set your hard financial ceiling", a: "Set a walk-away number. If you can afford Rs 2 lakh across two years, you have 6 excellent options. If you can afford Rs 5 lakh, the shortlist widens to 12. Trying to stretch into Rs 15-25 lakh Executive MBAs without employer support is a common cause of financial stress in years 3-4 post-enrolment." },
];

const FAQS = [
  { q: "Is an Online MBA in Marketing Management valid in India?", a: "Yes. As of 2025-26, an Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment. Enrol only with universities on the current UGC-DEB approved-institutions list." },
  { q: "Which is better for Marketing: Distance MBA, Online MBA, or Executive MBA?", a: "For most working professionals wanting a promotion in their current field, Online MBA is the best balance of cost, credential, and live faculty interaction. Distance MBA works if cost is the tightest constraint. Executive MBA (IIM/ISB/XLRI/MDI) is worth Rs 15-25 lakh only if you are making a Tier-1 industry reset, an international move, or targeting consulting/senior strategy roles." },
  { q: "How much does a Marketing Management MBA cost in India in 2025-26?", a: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 25 lakh (IIM Executive residential). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between Rs 1.5 lakh and Rs 2.5 lakh total for a 24-month programme." },
  { q: "What is the salary after an Online MBA in Marketing?", a: "Median 2025-26 salary for Online MBA graduates in Marketing sits at Rs 6.5 LPA for freshers (0-2 years' experience), Rs 14 LPA for mid-level (3-7 years), and Rs 28 LPA for senior roles (8-15 years). Salary is heavily influenced by location, employer, and industry: fintech, SaaS, and D2C consistently pay 30-40% above traditional FMCG and services." },
  { q: "Does an Online MBA in Marketing help with promotions in my current job?", a: "For most working professionals in sales, marketing, or communications roles at mid-sized to large Indian companies, yes. Promotions to Manager or Senior Manager often require a formal MBA credential per internal HR policy. Distance and Online MBAs from UGC-DEB approved universities typically satisfy this requirement." },
  { q: "What is the difference between a Marketing MBA and a Digital Marketing MBA?", a: "A Marketing Management MBA covers the entire marketing function: brand, product, distribution, offline and online channels, research, and sales alignment. A Digital Marketing MBA is a focused specialization, deeper on SEO, paid media, growth, and marketing automation. For general marketing careers, choose Marketing Management. For growth or D2C-first careers, choose Digital Marketing." },
  { q: "Can I do a Marketing Management MBA without a marketing background?", a: "Yes. Roughly 40% of Marketing Management MBA enrolments at Symbiosis, NMIMS, and Amity in 2024-25 came from non-marketing backgrounds. The MBA is designed to teach marketing from first principles." },
  { q: "Which universities have the best placement records for Marketing MBAs?", a: "Based on our internal alumni tracking (2024-25), the highest placement conversion rates for Marketing specialization were at IIM Indore Executive (approaching 100%), Symbiosis Online (approx 78%), and NMIMS Distance (approx 65%)." },
  { q: "How is the AI wave affecting Marketing careers in India?", a: "The 2024-25 AI wave restructured a subset of marketing roles: content marketing, basic copywriting, and early-stage market research are increasingly AI-augmented. Strategic roles (Brand Manager, Growth Head, PMM, Sales Head) are being aided by AI tools rather than replaced. Marketing MBAs should expect to be evaluated partly on AI-tool fluency." },
  { q: "Can I switch industries after a Marketing Management MBA?", a: "Yes, but with realism. Industry switches within marketing (FMCG to D2C, IT services to SaaS) are common and generally succeed. Function switches out of marketing into consulting or product management are harder from a Distance/Online MBA than from an Executive MBA at an IIM." },
  { q: "What is the EMI or education loan availability for a Marketing MBA?", a: "For Distance and Online MBAs, most working professionals pay from monthly salary. For Executive MBAs above Rs 8 lakh, education loans are widely available: SBI, HDFC Credila, ICICI Bank, Avanse Financial, and Auxilo. Interest rates in 2025-26 range from 9.5% to 12.5%." },
  { q: "How does CollegeNCourses help me choose a programme?", a: "Our AI Counsellor understands your role, salary, career goal, budget, and timeline; shortlists three programmes matched to your profile from UGC-DEB approved options only; and walks you through fee structures, EMI options, admission timelines, and the trade-offs." },
  { q: "Is online MBA worth it for a working professional?", a: "Yes, for the right profile. If you have 3+ years of experience in a marketing-adjacent role and want a promotion or a domain switch, a UGC-DEB approved Online MBA delivers strong return typically within 18-24 months of graduation." },
  { q: "How much salary after MBA in marketing?", a: "In 2025-26, the median first-year salary after an MBA in Marketing Management sits at roughly Rs 6.5 LPA for Distance and Online MBA graduates, and Rs 8-14 LPA for Tier-1 Executive MBA graduates." },
  { q: "Which online MBA is best for marketing in India?", a: "The three most-recommended Online MBA programmes for Marketing specialization in India as of 2025-26 are Symbiosis Centre for Online Learning, NMIMS Global Access, and Manipal Academy of Higher Education. Best depends on your budget, experience, and career target." },
  { q: "Do employers actually value Distance and Online MBAs in 2025-26?", a: "Most Indian employers, especially in mid-sized to large private-sector companies, accept Distance and Online MBAs from UGC-DEB approved universities for promotion eligibility and hiring. Acceptance is highest in IT, SaaS, D2C, and fintech." },
];

const RESOURCES = [
  { title: "Distance vs Online vs Executive MBA: Complete Comparison Guide 2025-26", href: "/resources" },
  { title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26", href: "/resources" },
  { title: "Complete Distance/Online MBA Fee Guide 2025-26", href: "/resources" },
  { title: "Digital Marketing MBA Specialization Guide", href: "/specializations-guide" },
  { title: "How to Choose Your MBA Specialization: A Framework", href: "/blog" },
  { title: "2025-26 Online MBA Salary Report by Specialization", href: "/resources" },
];

export default function PlannerMarketingGuideClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(TOC[0].id);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-100px 0px -70% 0px" }
    );
    TOC.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <div className="guide-progress-track"><div className="guide-progress-fill" style={{ width: `${progress}%` }}></div></div>

      <PlannerHeader primaryCTA="Get Free Guidance" onOpenLeadForm={() => setModalOpen(true)} />

      <div className="p-breadcrumb">
        <div className="wrap">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <a href="/design-preview/specializations-guide">Specializations Guide</a>
          <span className="sep">/</span>
          <span className="cur">MBA in Marketing Management</span>
        </div>
      </div>

      <section className="legal-head">
        <div className="wrap">
          <div className="p-eyebrow">SPECIALIZATION GUIDE &middot; 2025-26 EDITION</div>
          <h1 style={{ marginTop: 10, fontSize: 38, lineHeight: 1.15 }}>
            MBA in Marketing Management: the honest 2025-26 guide to Distance, Online &amp; Executive modes
          </h1>
          <p className="p-lede" style={{ marginTop: 18 }}>
            Fees from Rs 1.2 lakh to Rs 25 lakh. Real salary data from 412 alumni. Top 10 UGC-DEB approved programmes compared, mode-by-mode. No paid rankings. No sales pitch.
          </p>
          <div className="guide-trust">
            <span>12,000+ aspirants placed since 2019</span>
            <span>&middot;</span>
            <span>150+ verified universities</span>
          </div>
          <div className="p-cta-row" style={{ marginTop: 20 }}>
            <button type="button" className="btn btn-sun" onClick={() => setModalOpen(true)}>Get a free counsellor recommendation {ARROW}</button>
            <a href="#top-programmes" className="btn btn-white">Jump to top 10 programmes</a>
          </div>
          <p className="guide-verify">Last verified: 15 December 2025 against the UGC-DEB current approved-institutions list.</p>
        </div>
      </section>

      <section className="p-section" style={{ paddingTop: 0 }}>
        <div className="wrap legal-layout">
          <nav className="legal-toc" aria-label="Table of contents">
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""}>{item.label}</a>
            ))}
          </nav>

          <div className="legal-toc-mobile">
            <select value={active} onChange={(e) => document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" })}>
              {TOC.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>

          <div className="legal-body">
            <div className="legal-section" id="takeaways" ref={(el) => { sectionRefs.current.takeaways = el; }}>
              <h2>Key takeaways</h2>
              <ul>
                <li><strong>Mode-fit:</strong> Online MBA suits most working professionals; Distance MBA fits budget-tight self-learners; Executive MBA at IIM/ISB/XLRI is worth Rs 15-25 lakh only for Tier-1 industry resets.</li>
                <li><strong>Fees:</strong> Rs 1.2 lakh (ICFAI Distance) to Rs 25 lakh (IIM Indore Executive). Mainstream Online MBA median sits at Rs 1.8 lakh for 24 months.</li>
                <li><strong>Median salaries (2025-26):</strong> Rs 6.5 LPA for freshers, Rs 14 LPA at 3-7 years, Rs 28 LPA at 8-15 years. Location, employer, and industry each shift these bands by 30-60%.</li>
                <li><strong>Best-fit profile:</strong> Working professionals in sales, marketing, or communications wanting a promotion, or engineers/CAs switching into brand and product roles.</li>
                <li><strong>Poor-fit signal:</strong> If you dislike consumer psychology or want a purely quantitative role, choose Business Analytics or Finance instead.</li>
                <li><strong>Top pick by mode (2025-26):</strong> Symbiosis Online, NMIMS Distance, IIM Indore Executive.</li>
              </ul>
            </div>

            <div className="legal-section" id="snapshot" ref={(el) => { sectionRefs.current.snapshot = el; }}>
              <h2>Marketing Management MBA, in 90 seconds</h2>
              <p>An MBA in Marketing Management trains you to build, position, and grow brands. As of 2025-26, it is the single most-enrolled MBA specialization in India across Distance and Online modes, and the fastest-growing Executive MBA elective at IIMs. UGC-DEB has approved 47 institutions to offer Online MBA programmes as of the current session.</p>
              <p>Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 25 lakh (IIM Executive), with the mainstream Online MBA median at Rs 1.8 lakh. Median entry-level salary for a Marketing MBA graduate in 2025-26 stands at Rs 6.5 lakh per annum for freshers, Rs 14 lakh for mid-level (3-7 years' experience), and Rs 28 lakh for senior roles (8-15 years). The specialization suits three profiles best: working professionals in sales, marketing, or communications who want a management title; engineers and CAs shifting into brand or product roles; and founders who need structured marketing depth.</p>
              <div className="snapshot-grid">
                <div className="snapshot-card">
                  <h4>Quick facts</h4>
                  <div className="snapshot-row"><span>Duration</span><b>12-24 months</b></div>
                  <div className="snapshot-row"><span>Fee range</span><b>Rs 1.2 L - Rs 25 L</b></div>
                  <div className="snapshot-row"><span>Approval</span><b>UGC-DEB, AICTE, NAAC A+</b></div>
                  <div className="snapshot-row"><span>Median entry salary</span><b>Rs 6.5 LPA</b></div>
                  <div className="snapshot-row"><span>Median mid-career salary</span><b>Rs 14 LPA</b></div>
                </div>
                <div className="snapshot-card">
                  <h4>Top employers</h4>
                  <div className="snapshot-row"><span>FMCG</span><b>HUL, ITC, Nestle</b></div>
                  <div className="snapshot-row"><span>Tech</span><b>Amazon, Flipkart, Meta</b></div>
                  <div className="snapshot-row"><span>D2C</span><b>Nykaa, boAt, Sugar</b></div>
                  <div className="snapshot-row"><span>Best fits</span><b>Sales/marketing pros</b></div>
                </div>
              </div>
            </div>

            <div className="legal-section" id="what-is" ref={(el) => { sectionRefs.current["what-is"] = el; }}>
              <h2>What this MBA is really about (and what it is not)</h2>
              <p>An MBA in Marketing Management, at postgraduate level, is the discipline of understanding customers, building the right product for them, positioning it in the market, pricing correctly, distributing well, and communicating in ways that convert attention into revenue. Everything else - the Kotler frameworks, the STP model, the 4Ps - sits inside that discipline.</p>
              <p>What makes it different from a Digital Marketing MBA is scope. Marketing Management covers the full function: brand strategy, product management, offline and online channels, market research, consumer behaviour, sales-marketing alignment, retail, and partnerships. Digital Marketing is a focused subset. If you want to run brand strategy for a Nykaa or an HUL, choose Marketing Management. If you want to specialise in performance ads, SEO, and growth-hacking, Digital Marketing is the tighter fit.</p>
              <p>What makes it different from a Sales MBA is emphasis. Marketing sits upstream of sales. It decides what to sell, to whom, and why. Sales executes. In India&apos;s 2025-26 job market, most Marketing Management MBAs end up doing both, especially in the first three years.</p>
              <div className="legal-callout">
                <p><strong>One misconception we hear often:</strong> &quot;Marketing is only for creative people.&quot; It isn&apos;t. Modern marketing in 2025-26 is roughly 60% analytics, 25% strategy, and 15% creative. If you enjoy consumer psychology, data patterns, and business writing, you&apos;ll do well. Formal design skills are optional.</p>
              </div>
            </div>

            <div className="legal-section" id="who-fits" ref={(el) => { sectionRefs.current["who-fits"] = el; }}>
              <h2>Who this specialization is built for</h2>
              <p>Marketing Management MBAs work best for three broad profiles. If you recognise yourself below, this is worth serious consideration.</p>
              <div className="c-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 20 }}>
                <article className="c-card">
                  <h3>A. The working professional shifting up</h3>
                  <p className="roles">Three to twelve years of experience in sales, marketing, communications, PR, or brand management. Currently a Marketing Executive, Assistant Manager, or Senior Executive. Wanting a promotion to Manager or Senior Manager but blocked by the &quot;MBA required&quot; clause. Distance or Online MBA is the natural fit. Job continues, MBA runs alongside, promotion follows within 18-24 months.</p>
                </article>
                <article className="c-card">
                  <h3>B. The domain-switcher</h3>
                  <p className="roles">Engineer, CA, doctor, or non-marketing professional wanting to move into brand management, product marketing, or a customer-facing strategic role. Often triggered by a plateau in the current field. Online or Executive MBA fits. Executive MBA is preferred if the switch involves geographic relocation or a full-industry change.</p>
                </article>
                <article className="c-card">
                  <h3>C. The founder or family-business next-gen</h3>
                  <p className="roles">Founder of a D2C brand, e-commerce venture, or services business, or the incoming generation of a family enterprise. Wants formal marketing depth because instinct is no longer enough at scale. Distance or Online MBA suits busy founders. Executive MBA works if the business can spare 12-24 months of part-time academic commitment.</p>
                </article>
              </div>
            </div>

            <div className="legal-section" id="curriculum" ref={(el) => { sectionRefs.current.curriculum = el; }}>
              <h2>What a 2025-26 Marketing Management MBA actually teaches</h2>
              <p>A 2025-26 Marketing Management MBA covers 24 core subjects across four semesters: management foundations, core marketing (brand, consumer behaviour, sales, research), specialization electives (digital, retail, B2B, analytics), and the new 2025 additions - AI for Marketers, Marketing Automation, and Purpose-Led Marketing.</p>
              <div className="c-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 20 }}>
                {CURRICULUM.map((c) => (
                  <article className="c-card" key={c.sem}>
                    <div className="p-eyebrow" style={{ fontSize: 11 }}>{c.sem.toUpperCase()}</div>
                    <h3 style={{ marginTop: 6 }}>{c.title}</h3>
                    <p className="roles">{c.body}</p>
                  </article>
                ))}
              </div>
              <div className="legal-callout">
                <p><strong>New in 2025-26:</strong> AI for Marketers is now offered as an elective at Symbiosis, NMIMS, Amity, Manipal, Jain, and OP Jindal. It covers generative AI for content, AI-driven customer segmentation, and ethical guardrails around synthetic media. If it&apos;s not on the syllabus of a programme you&apos;re considering, that programme is behind.</p>
              </div>
            </div>

            <div className="legal-section" id="career-paths" ref={(el) => { sectionRefs.current["career-paths"] = el; }}>
              <h2>The roles a Marketing Management MBA leads to</h2>
              <p>Marketing is a broader career funnel than most aspirants realise. A single MBA in Marketing Management opens doors into six distinct role families. Your first job out of the MBA usually sits in one; your third job (five to seven years later) often sits in a different one.</p>
              <div className="legal-callout quote">
                <p>The single most under-explored option we surface is Product Marketing. Aspirants who chose Product Marketing over classical Brand Management - largely IT and engineering-background candidates - reported 40-60% faster salary progression in years 2-4 post-MBA, based on our alumni tracking. It remains under-marketed by universities relative to its actual career strength.</p>
                <span className="attribution">&mdash; CollegeNCourses Senior Counsellor Desk</span>
              </div>
              <div className="p-questions" style={{ marginTop: 20 }}>
                {ROLES.map((r) => (
                  <div className="p-q-item" key={r.title}>
                    <div className="p-q-num">{r.n}</div>
                    <div className="p-q-body"><h4>{r.title}</h4><p>{r.body}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="legal-section" id="salary" ref={(el) => { sectionRefs.current.salary = el; }}>
              <h2>What a Marketing Management MBA graduate earns in 2025-26</h2>
              <p className="p-salary-source">Last verified 15 December 2025 &middot; AmbitionBox, Naukri, LinkedIn Q3 2025</p>
              <p>Median 2025-26 salary for Online MBA graduates in Marketing sits at Rs 6.5 lakh per annum for freshers (0-2 years&apos; experience), Rs 14 lakh for mid-level (3-7 years), and Rs 28 lakh for senior roles (8-15 years). Executive MBA graduates from Tier-1 IIMs command roughly 2-3x these bands.</p>
              <div className="p-table-wrap" style={{ marginTop: 20 }}>
                <table className="p-table">
                  <thead>
                    <tr><th>Experience band</th><th>Distance/Online</th><th>Exec Tier-1</th><th>Exec Tier-2</th></tr>
                  </thead>
                  <tbody>
                    {SALARY_ROWS.map((row) => (
                      <tr key={row.band}>
                        <td className="p-uni-name">{row.band}</td>
                        <td>{row.distOnline}</td>
                        <td>{row.execT1}</td>
                        <td>{row.execT2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="p-table-note">Source: CollegeNCourses internal counsellor tracking (2025-26), cross-referenced with AmbitionBox, Naukri.com JobSpeak Q3 2025, LinkedIn Salary India 2025. Bands represent 25th-75th percentile.</p>
              <div className="legal-callout">
                <p><strong>What these numbers do not tell you:</strong> Location matters. A Mumbai, Bangalore, or Gurgaon Marketing Manager typically earns 30-40% more than the same role in Pune, Hyderabad, or Chennai. Company matters more - Amazon or HUL pays roughly 60% more than a mid-tier D2C brand. Domain matters most - marketing in fintech, SaaS, and D2C consistently pays 30-40% above traditional FMCG, media, or services.</p>
              </div>
            </div>

            <div className="legal-section" id="top-programmes" ref={(el) => { sectionRefs.current["top-programmes"] = el; }}>
              <h2>The 10 Marketing MBA programmes worth shortlisting in 2025-26</h2>
              <p className="p-salary-source">Last verified 15 December 2025 &middot; UGC-DEB &amp; AICTE current lists</p>
              <p>Our current top-10 list across Distance, Online, and Executive modes. Not paid, not sponsored. Drawn from UGC-DEB and AICTE approval status, NAAC accreditation, our internal placement tracking from 412 alumni, and structured feedback from our team handling 2,000+ enquiries per month. We refresh this list every six months.</p>
              <div className="p-table-wrap" style={{ marginTop: 20 }}>
                <table className="p-table">
                  <thead>
                    <tr><th>#</th><th>Programme</th><th>Mode</th><th>Duration</th><th>Fee</th><th>Approval</th><th>Placement</th><th>Key strength</th></tr>
                  </thead>
                  <tbody>
                    {TOP_PROGRAMMES.map((p) => (
                      <tr key={p.n}>
                        <td className="p-rank">{p.n}</td>
                        <td><span className="p-uni-name">{p.uni}</span><span className="p-prog-label">{p.prog}</span></td>
                        <td><span className="p-tag">{p.mode}</span></td>
                        <td>{p.duration}</td>
                        <td className="p-fee">{p.fee}</td>
                        <td><span className="p-tag p-tag-accred">{p.approval}</span></td>
                        <td>{p.placement}</td>
                        <td>{p.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="p-table-note">As of 2025-26. Fees are total programme cost, exclusive of exam surcharges. Placement support ratings are directional, not guarantees.</p>
              <div className="guide-mid-cta">
                <p>Confused about which one fits your profile? Our AI Counsellor shortlists three programmes matched to your role, budget, and timeline.</p>
                <button type="button" className="btn btn-sun btn-sm" onClick={() => setModalOpen(true)}>Book a free call {ARROW}</button>
              </div>
            </div>

            <div className="legal-section" id="fees" ref={(el) => { sectionRefs.current.fees = el; }}>
              <h2>What you will actually pay across the three modes</h2>
              <p>Fees for a Marketing Management MBA span an order of magnitude - roughly Rs 1.2 lakh at the lowest UGC-DEB approved end to Rs 25 lakh at Tier-1 Executive MBAs. That range is not arbitrary. It reflects real differences in brand, faculty access, peer network, and career support.</p>
              <div className="c-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 20 }}>
                {FEE_CARDS.map((f) => (
                  <article className="c-card fee-card" key={f.mode}>
                    <h3>{f.mode}</h3>
                    <span className="price-pill">{f.price}</span>
                    <p className="roles">{f.body}</p>
                  </article>
                ))}
              </div>
              <div className="legal-callout">
                <p><strong>Financing note:</strong> As of 2025-26, most working professionals finance Distance and Online MBAs from monthly salary (Rs 6,000-8,000 per month EMI is manageable for the Rs 1.5-2 L bracket). Executive MBA typically requires either employer sponsorship or a proper education loan. If you are self-financing an Executive MBA, do a hard-nosed ROI calculation before committing.</p>
              </div>
            </div>

            <div className="legal-section" id="mode-comparison" ref={(el) => { sectionRefs.current["mode-comparison"] = el; }}>
              <h2>Distance, Online, or Executive: which mode fits your Marketing career</h2>
              <p>This is the question most aspirants ask us in the first counselling call. The answer is not &quot;whichever is cheapest&quot; or &quot;whichever has the best brand.&quot; It depends on where you are in your career, what your employer will reimburse, and what problem the MBA is solving.</p>
              <div className="legal-callout quote">
                <p>The single most common regret we hear from Distance MBA graduates is under-estimating how much they missed live faculty interaction. Of aspirants who initially chose Distance for cost reasons, 34% told us in follow-up calls they would have paid the extra Rs 50,000-80,000 for Online with live classes if we had pushed harder.</p>
                <span className="attribution">&mdash; CollegeNCourses Senior Counsellor Desk</span>
              </div>
              <div className="p-table-wrap" style={{ marginTop: 20 }}>
                <table className="p-table">
                  <thead><tr><th>Situation</th><th>Best mode</th><th>Why</th></tr></thead>
                  <tbody>
                    {MODE_FIT_ROWS.map((row) => (
                      <tr key={row.situation}>
                        <td>{row.situation}</td>
                        <td className="p-fee">{row.best}</td>
                        <td>{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="legal-section" id="not-fit" ref={(el) => { sectionRefs.current["not-fit"] = el; }}>
              <h2>Who should not pick a Marketing Management MBA</h2>
              <p>We include this section because most guides won&apos;t. It saves people who are about to spend Rs 2-5 lakh on a wrong-fit programme. If two or more of the below describe you, choose a different specialization or mode.</p>
              <div className="commitment-card" style={{ marginTop: 20 }}>
                <ul>
                  {NOT_FIT.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="legal-section" id="questions" ref={(el) => { sectionRefs.current.questions = el; }}>
              <h2>How to decide if a Marketing Management MBA is right for you: 5 questions</h2>
              <p>Every aspirant who enrols in a Marketing Management MBA and later regrets it usually made a decision without answering one or more of the five questions below. Go through each honestly.</p>
              <div className="p-questions" style={{ marginTop: 20 }}>
                {QUESTIONS.map((item, i) => (
                  <div className="p-q-item" key={item.q}>
                    <div className="p-q-num">{i + 1}</div>
                    <div className="p-q-body"><h4>{item.q}</h4><p>{item.a}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="legal-section" id="faq" ref={(el) => { sectionRefs.current.faq = el; }}>
              <h2>Frequently asked questions</h2>
              <div style={{ marginTop: 10 }}>
                {FAQS.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}<span className="pm"></span></summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="legal-section" id="resources" ref={(el) => { sectionRefs.current.resources = el; }}>
              <h2>Go deeper</h2>
              <div className="resource-grid">
                {RESOURCES.map((r) => (
                  <a href={r.href} className="resource-card" key={r.title}>
                    {r.title}
                    <span className="go" style={{ fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>Read {ARROW}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="legal-section" id="authors" ref={(el) => { sectionRefs.current.authors = el; }}>
              <h2>About this guide</h2>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>Editorial credits</h3>
              <div className="author-row">
                <div className="author-avatar">CE</div>
                <div>
                  <div className="author-name">Written by CollegeNCourses Editorial Team</div>
                  <div className="author-role">Content Lead, CollegeNCourses Editorial Desk</div>
                  <div className="author-bio">Our editorial team has been writing on Indian higher education since 2020, covering Distance, Online, and Executive MBA programmes across UGC-DEB approved universities.</div>
                </div>
              </div>
              <div className="author-row">
                <div className="author-avatar">SC</div>
                <div>
                  <div className="author-name">Reviewed by CollegeNCourses Senior Counsellor</div>
                  <div className="author-role">Senior Counsellor, CollegeNCourses</div>
                  <div className="author-bio">Our reviewing counsellor has advised over 3,000 MBA aspirants across Distance, Online, and Executive modes since 2016. Areas of focus: Marketing and Digital specializations.</div>
                </div>
              </div>
              <div className="author-row">
                <div className="author-avatar">ND</div>
                <div>
                  <div className="author-name">Approved by Nikhita Pradeep Deshmukh</div>
                  <div className="author-role">Founder, Dnyanal Educon Pvt Ltd</div>
                  <div className="author-bio">Founder of CollegeNCourses.</div>
                </div>
              </div>
              <h3 style={{ fontSize: 16, marginTop: 22, marginBottom: 6 }}>Sources referenced</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
                Regulatory &amp; accreditation - UGC approved-institutions list 2025-26; UGC Distance Education Bureau (DEB); AICTE Approval Process Handbook 2025-26; NAAC Institution grading database. Salary and market data - AmbitionBox Salary Benchmarks (Marketing Manager India, Q3 2025); Naukri.com JobSpeak Report (October 2025); LinkedIn Salary India Dataset (2025). Internal - CollegeNCourses alumni tracking (412 alumni surveyed 2024-25, refreshed quarterly); counsellor enquiry logs, aggregated 2023-25, anonymised.
              </p>
              <p style={{ fontSize: 12.5, color: "var(--muted)", fontStyle: "italic", marginTop: 10 }}>
                This page is updated every six months. Next scheduled review: 15 June 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta p-cta-band" id="contact">
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Ready to shortlist your Marketing MBA?</h2>
          <p>Get a free shortlist from our AI Counsellor. We&apos;ll match you to three programmes based on your role, budget, and timeline. Free, no call required.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <button type="button" className="btn btn-sun" onClick={() => setModalOpen(true)}>Get free counselling {ARROW}</button>
            <a href="/contact-us" className="btn btn-white">Contact us</a>
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="spec-guide-marketing-preview" />
    </div>
  );
}
