"use client";

import { useCallback, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-study-in-india.css";

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

const MODES = [
  { tag: "Online", title: "Online MBA", tagline: "Full MBA via internet. No campus attendance. Designed for working professionals.", fee: "Rs 1L - 6.5L", duration: "24 months", ideal: "Working professionals, flexible learners", href: "/online-mba" },
  { tag: "Distance", title: "Distance MBA", tagline: "Study material based learning. Exam centres near you. Most affordable UGC-DEB mode.", fee: "Rs 50K - 3L", duration: "24-36 months", ideal: "Cost-conscious, self-paced learners", href: "/distance-mba" },
  { tag: "Executive", title: "Executive MBA", tagline: "Accelerated MBA for experienced professionals. Weekend sessions and short residencies.", fee: "Rs 3L - 15L", duration: "12-18 months", ideal: "Professionals with 3+ years experience", href: "/executive-mba" },
  { tag: "Regular", title: "Regular MBA", tagline: "Full-time campus MBA. Placement drives, campus life, and structured peer network.", fee: "Rs 2L - 20L", duration: "24 months", ideal: "Fresh graduates seeking campus experience", href: "/regular-mba" },
];

const ALSO_ON_PLATFORM = {
  tag: "Design", title: "Design Programmes", tagline: "B.Des and M.Des programmes from accredited private design institutes across India.", fee: "Rs 3L - 15L", duration: "24-48 months", ideal: "Creative professionals and NID/NIFT aspirants", href: "/design",
};

const COMPARE_ROWS = [
  { feature: "Duration", online: "24 months", distance: "24-36 months", executive: "12-18 months", regular: "24 months" },
  { feature: "Fee range", online: "Rs 1L - 6.5L", distance: "Rs 50K - 3L", executive: "Rs 3L - 15L", regular: "Rs 2L - 20L" },
  { feature: "Campus attendance", online: "None required", distance: "Exam centres only", executive: "Weekend sessions", regular: "Full-time" },
  { feature: "Work while studying", online: "Yes", distance: "Yes", executive: "Yes (recommended)", regular: "Typically no" },
  { feature: "Work experience needed", online: "None", distance: "None", executive: "3+ years", regular: "None" },
  { feature: "Regulatory approval", online: "UGC-DEB", distance: "UGC-DEB", executive: "AICTE / UGC", regular: "AICTE / UGC / NAAC" },
  { feature: "Best for", online: "Professionals, flexible learners", distance: "Budget-focused, self-paced", executive: "Senior professionals", regular: "Campus experience seekers" },
];

const CHOOSERS = [
  { situation: "You are working full-time and cannot take a break", rec: "Online MBA or Distance MBA", reason: "Both are UGC-DEB approved. No mandatory campus attendance. Study fits around your work schedule.", href: "/online-mba" },
  { situation: "You have 3 or more years of professional experience", rec: "Executive MBA", reason: "Accelerated 12-18 month programmes designed for professionals already in management or senior roles.", href: "/executive-mba" },
  { situation: "You are a fresh graduate and want campus life and placements", rec: "Regular MBA", reason: "Full-time, placement-driven campus MBA with peer network and structured curriculum from AICTE approved institutions.", href: "/regular-mba" },
  { situation: "Budget is your primary constraint", rec: "Distance MBA", reason: "Most affordable UGC-DEB approved mode. Fees from Rs 50,000 for the full programme from accredited private universities.", href: "/distance-mba" },
  { situation: "You are in a creative field or pursuing design", rec: "Design Programmes", reason: "B.Des and M.Des programmes from CEED, NID, and NIFT aligned private design institutes across India.", href: "/design" },
];

const UNIVERSITIES = [
  "Symbiosis (SCDL), Pune", "NMIMS Global Access, Mumbai", "Amity University Online, Noida", "Manipal (MAHE), Manipal",
  "Jain University (JGI), Bangalore", "Lovely Professional University, Punjab", "Chandigarh University", "Welingkar Institute, Mumbai",
  "ICFAI University, Hyderabad", "IMT Centre for Distance Learning",
];

const FAQS = [
  { q: "What is the difference between an online MBA, a distance MBA, and an executive MBA?", a: "Online MBA is delivered via internet with live and recorded sessions, no campus attendance required. Distance MBA uses printed study material and physical exam centres, making it the most affordable mode. Executive MBA is designed for professionals with 3+ years of experience, with shorter duration and weekend sessions. All three can be pursued while working full-time and are regulated by UGC-DEB or AICTE." },
  { q: "Are private university MBAs from India legally recognised by employers?", a: "Yes, provided the university holds the relevant regulatory approval. For online and distance MBAs, UGC-DEB (University Grants Commission - Distance Education Bureau) approval is mandatory. For regular and executive MBAs, AICTE and UGC recognition applies. Always verify the programme's current approval status on the official UGC website before applying." },
  { q: "Which management programme is best for working professionals in 2026?", a: "Online MBA is the most popular choice for working professionals because it requires no campus attendance and is designed around 8-12 hours of study per week. Distance MBA is a more affordable alternative with the same legal standing. Executive MBA suits those with 3+ years of experience who want an accelerated, peer-driven programme with some weekend commitment." },
  { q: "Do I need to attend campus for an online or distance MBA?", a: "For online MBA programmes, there is no mandatory campus attendance. Exams are conducted online or at designated centres near you. Distance MBA also requires no campus visits but does require attendance at regional exam centres. Executive MBA and regular MBA require some campus presence, ranging from weekend sessions to full-time attendance respectively." },
  { q: "What is UGC-DEB approval and why does it matter for my MBA?", a: "UGC-DEB (University Grants Commission - Distance Education Bureau) is the Indian government body that authorises universities to offer online and distance programmes. A degree from a UGC-DEB approved programme carries the same legal value as a full-time degree for employment, government jobs, and further study. Without this approval, a degree from that institution has no legal standing." },
  { q: "How much do MBA programmes at private universities in India cost in 2026?", a: "Costs vary by mode and institution. Distance MBA starts from around Rs 50,000 for the full programme. Online MBA ranges from Rs 1 lakh to Rs 6.5 lakh. Executive MBA from Rs 3 lakh to Rs 15 lakh. Regular MBA from Rs 2 lakh to Rs 20 lakh depending on the institution. All prices are for the full programme from UGC-DEB approved private universities." },
];

export default function PlannerStudyInIndiaClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("study-in-india-preview");

  const openLeadForm = useCallback((source = "study-in-india-preview") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader primaryCTA="Get Free Guidance" onOpenLeadForm={openLeadForm} />

      <div className="p-breadcrumb">
        <div className="wrap">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <span className="cur">Study in India</span>
        </div>
      </div>

      {/* Hero + sidebar */}
      <section className="p-hero">
        <div className="wrap">
          <div className="p-layout">
            <div>
              <div className="p-eyebrow">STUDY IN INDIA &middot; OVERVIEW</div>
              <h1>Study in India 2026-27: Compare MBA and Management Programmes</h1>
              <div className="answer-capsule">
                Study in India for an MBA or management degree from UGC-DEB approved private universities. Four flexible modes - online, distance, executive, and regular - cover every career stage and budget. Fees start from Rs 1 lakh. All UGC-DEB approved degrees carry the same legal value as a full-time MBA.
              </div>
              <p className="p-lede">
                Honest comparison of Online MBA, Distance MBA, Executive MBA, Regular MBA, and Design programmes from 150+ accredited private universities in India. Find the right mode for your career stage, schedule, and budget. Updated July 2026.
              </p>
              <div className="p-cta-row">
                <button type="button" className="btn btn-sun" onClick={() => openLeadForm("study-in-india-hero")}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-white">Compare modes</a>
              </div>
              <div className="p-trust">
                <span>3,200+ students guided since 2023</span>
                <span>&middot;</span>
                <span>150+ UGC-DEB approved universities</span>
              </div>
            </div>

            <aside className="p-sidebar">
              <div className="p-sidebar-head">
                <h3>Find the right programme for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="p-sidebar-body">
                <div className="p-stat"><span>Modes available:</span><strong>Online, Distance, Executive, Regular, Design</strong></div>
                <div className="p-stat"><span>Fee range:</span><strong>Rs 50,000 - Rs 20 L</strong></div>
                <div className="p-stat"><span>Duration:</span><strong>12 to 48 months</strong></div>
                <div className="p-stat"><span>Eligibility:</span><strong>Any graduate (most programmes)</strong></div>
                <button type="button" className="btn btn-sun btn-sm" style={{ width: "100%" }} onClick={() => openLeadForm("study-in-india-sidebar")}>
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Programme types */}
      <section className="p-section p-section-alt" id="programmes">
        <div className="wrap">
          <div className="p-eyebrow">PROGRAMME TYPES</div>
          <h2 style={{ marginTop: 10 }}>Four ways to study management in India</h2>
          <hr className="p-rule" />
          <div className="mode-grid">
            {MODES.map((m) => (
              <div className="mode-card" key={m.title}>
                <span className="mode-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <p className="tagline">{m.tagline}</p>
                <div className="mode-facts">
                  <div><span>Fee</span> {m.fee}</div>
                  <div><span>Duration</span> {m.duration}</div>
                </div>
                <p className="mode-ideal">Best for: {m.ideal}</p>
                <a href={m.href} className="go">Explore {ARROW}</a>
              </div>
            ))}
          </div>

          <div className="mode-section-label">ALSO ON OUR PLATFORM</div>
          <div className="mode-grid secondary">
            <div className="mode-card">
              <span className="mode-tag">{ALSO_ON_PLATFORM.tag}</span>
              <h3>{ALSO_ON_PLATFORM.title}</h3>
              <p className="tagline">{ALSO_ON_PLATFORM.tagline}</p>
              <div className="mode-facts">
                <div><span>Fee</span> {ALSO_ON_PLATFORM.fee}</div>
                <div><span>Duration</span> {ALSO_ON_PLATFORM.duration}</div>
              </div>
              <p className="mode-ideal">Best for: {ALSO_ON_PLATFORM.ideal}</p>
              <a href={ALSO_ON_PLATFORM.href} className="go">Explore {ARROW}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Mode comparison table */}
      <section className="p-section" id="compare">
        <div className="wrap">
          <div className="p-eyebrow">MODE COMPARISON</div>
          <h2 style={{ marginTop: 10 }}>Online vs Distance vs Executive vs Regular MBA: side by side</h2>
          <hr className="p-rule" />
          <div className="p-table-wrap">
            <table className="p-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Online MBA</th>
                  <th>Distance MBA</th>
                  <th>Executive MBA</th>
                  <th>Regular MBA</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-uni-name">{row.feature}</td>
                    <td>{row.online}</td>
                    <td>{row.distance}</td>
                    <td>{row.executive}</td>
                    <td>{row.regular}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="p-table-note">Fee ranges are indicative for UGC-DEB approved private universities in India. Updated July 2026.</p>

          <div className="p-info-card">
            <div className="p-info-card-title">What UGC-DEB approval means for you</div>
            <p>UGC-DEB (University Grants Commission - Distance Education Bureau) is the Indian government body that certifies universities to offer online and distance programmes. A degree from a UGC-DEB approved programme carries the same legal value as a full-time degree for government employment, private sector jobs, and further study including PhD. Always verify current approval at ugcdeb.ac.in before applying - approvals can lapse.</p>
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="p-section p-section-alt" id="choose">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="p-eyebrow">HOW TO CHOOSE</div>
          <h2 style={{ marginTop: 10 }}>Which programme is right for your situation?</h2>
          <hr className="p-rule" />
          <div className="chooser-grid">
            {CHOOSERS.map((c) => (
              <div className="chooser-card" key={c.situation}>
                <div className="chooser-situation">If you are... {c.situation}</div>
                <div className="chooser-rec">{c.rec}</div>
                <p className="chooser-reason">{c.reason}</p>
                <a href={c.href} className="go">Learn more {ARROW}</a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <p style={{ marginBottom: 16, color: "var(--muted)" }}>Not sure which mode fits your profile and timeline?</p>
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("study-in-india-choose")}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="p-section" id="universities">
        <div className="wrap">
          <div className="p-eyebrow">PARTNER UNIVERSITIES</div>
          <h2 style={{ marginTop: 10 }}>Accredited private universities on our comparison platform</h2>
          <hr className="p-rule" />
          <p className="p-body-text">CollegeNCourses compares programmes from UGC-DEB approved private universities in India. Every institution is verified against the current UGC-DEB approved list as of July 2026.</p>
          <div className="uni-pill-strip">
            {UNIVERSITIES.map((u) => <span className="uni-pill" key={u}>{u}</span>)}
          </div>
          <div className="p-info-card" style={{ marginTop: 28 }}>
            <div className="p-info-card-title">Why we compare private universities only</div>
            <p>Private universities must obtain and maintain UGC-DEB approval, NAAC accreditation, and AICTE recognition, and are audited regularly against published standards. Their admission processes, fee structures, and student support services are consistent and transparent. We compare private universities because that is where the majority of distance and online MBA admissions take place and where students can make apples-to-apples fee and quality comparisons.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-section p-section-alt" id="faq">
        <div className="wrap">
          <div className="p-eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 style={{ marginTop: 10 }}>Study in India: common questions answered</h2>
          <hr className="p-rule" />
          <div>
            {FAQS.map((item) => (
              <details key={item.q}>
                <summary>{item.q}<span className="pm"></span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta p-cta-band">
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Ready to find your Management Programme in India?</h2>
          <p>Get a personalised shortlist of UGC-DEB approved private university programmes matched to your profile, goals, and budget. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-sun" style={{ marginTop: 26 }} onClick={() => openLeadForm("study-in-india-cta-band")}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
