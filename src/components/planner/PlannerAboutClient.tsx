"use client";

import { useCallback, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-about.css";

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

const STATS = [
  { num: "12,000+", label: "Learners helped since 2023" },
  { num: "150+", label: "UGC-DEB approved universities listed" },
  { num: "9", label: "MBA specializations compared" },
  { num: "2 Pillars", label: "Study in India and Study Abroad" },
];

const STEPS = [
  {
    h: "You compare on the platform",
    p: "Browse Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes side by side. Fees, accreditation, mode of study, and batch details - all in one place, in plain language.",
  },
  {
    h: "The AI Counsellor shortlists for your profile",
    p: "Answer a few questions about your background, budget, and goal. The AI Counsellor returns a ranked shortlist of Ambitious, Target, and Safe programmes matched specifically to you.",
  },
  {
    h: "You decide with full information",
    p: "Every recommendation includes honest pros, cons, fee breakdowns, and accreditation status. We flag if a programme is not a strong fit for your stated goal - even if it is a partner university.",
  },
  {
    h: "The right university reaches out to help you enrol",
    p: "Once you enquire, the admission team of the programme you chose contacts you to help with application, documentation, and enrolment. CollegeNCourses stays available throughout.",
  },
];

const COMMITMENTS = [
  "“Limited seats” or “last batch” pressure tactics. There is always another batch.",
  "“This is the best programme for everyone.” No programme is right for everyone.",
  "A recommendation made before we understand your background and goal.",
  "Hidden charges or surprise fees beyond what is listed on the university page.",
  "A push toward a partner programme when a non-partner fits you better.",
  "“Our team will call you back.” We route enquiries; we do not promise to call.",
];

export default function PlannerAboutClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("about-preview");

  const openLeadForm = useCallback((source = "about-preview") => {
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
          <span className="cur">About Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="p-hero">
        <div className="wrap spec-hero-inner">
          <div className="p-eyebrow">ABOUT COLLEGENCOURSES</div>
          <h1>Honest programme comparisons for Indian aspirants. Study in India and Study Abroad.</h1>

          <div className="answer-capsule">
            CollegeNCourses is an education comparison platform helping Indian aspirants choose Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from UGC-approved private universities. Founded in 2023 in Pune by Nikhita Pradeep Deshmukh, the platform has helped over 12,000 learners compare programmes across Study in India and Study Abroad.
          </div>

          <p className="p-lede">
            India produces millions of graduates every year. The choice of what and where to study is one of the most consequential decisions a person makes - and one of the most poorly supported. Glossy brochures, conflicting rankings, and aggressive sales calls have replaced honest guidance. CollegeNCourses was built to fix that.
          </p>

          <div className="p-cta-row">
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("about-hero-cta")}>
              Get Free Guidance {ARROW}
            </button>
            <a href="/study-in-india" className="btn btn-white">Explore Programmes</a>
          </div>

          <div className="stat-grid">
            {STATS.map((s) => (
              <div className="stat-tile" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="p-section p-section-alt">
        <div className="wrap">
          <div className="p-eyebrow">WHY WE EXIST</div>
          <h2 style={{ marginTop: 10 }}>The problem we were built to solve</h2>
          <hr className="p-rule" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p className="p-body-text" style={{ maxWidth: 900 }}>
              Indian aspirants choosing an MBA or a study abroad programme face a market designed to confuse them. Aggregator sites rank programmes by advertising spend, not quality. University websites quote fees that do not match the final invoice. Sales teams promise callbacks and then call eighteen times. Rankings change every year without explanation.
            </p>
            <p className="p-body-text" style={{ maxWidth: 900 }}>
              CollegeNCourses is built on a different premise: a clear comparison, honestly presented, converts better than a hard sell. Our programme listings show real fees, real accreditation status, and real mode differences. Our AI Counsellor returns a shortlist matched to your stated profile and budget - not to which university pays us the most.
            </p>
            <p className="p-body-text" style={{ maxWidth: 900 }}>
              We are not a rankings website. We are not an advertising aggregator. We are a programme comparison platform that uses technology to scale honest guidance across two categories: Study in India and Study Abroad.
            </p>
          </div>

          <div className="pillar-grid">
            <div className="pillar-card c-blue">
              <h4>Study in India</h4>
              <p>Online MBA, Distance MBA, Executive MBA, Regular MBA, and Design programmes from UGC-DEB approved private universities. 9 MBA specializations compared. Fee range Rs 30,000 to Rs 2.5 lakh.</p>
            </div>
            <div className="pillar-card c-mint">
              <h4>Study Abroad</h4>
              <p>USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Profile Evaluation matched to your academics and budget. Loan guidance, test prep, visa resources, and cost estimates in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="p-section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div className="p-eyebrow">HOW IT WORKS</div>
          <h2 style={{ marginTop: 10 }}>From first visit to enrolment: four steps</h2>
          <hr className="p-rule" />
          <div className="p-questions">
            {STEPS.map((s, i) => (
              <div className="p-q-item" key={s.h}>
                <div className="p-q-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="p-q-body">
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our commitment */}
      <section className="p-section p-section-alt">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="p-eyebrow">OUR COMMITMENT</div>
          <h2 style={{ marginTop: 10 }}>What you will never hear from us</h2>
          <hr className="p-rule" />
          <p className="p-body-text" style={{ marginBottom: 0 }}>
            These are not marketing claims. They are the rules our platform and content team operate by - written down so you can hold us to them.
          </p>
          <div className="commitment-card">
            <ul>
              {COMMITMENTS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Legal and accreditation */}
      <section className="p-section">
        <div className="wrap">
          <div className="p-eyebrow">LEGAL AND ACCREDITATION</div>
          <h2 style={{ marginTop: 10 }}>The fine print, in plain language</h2>
          <hr className="p-rule" />
          <div className="legal-grid">
            <div className="legal-card">
              <h4>Our entity</h4>
              <ul>
                <li>DNYANAL EDUCON PRIVATE LIMITED</li>
                <li>Incorporated 29 April 2023</li>
                <li>Registered office: Pune, Maharashtra</li>
                <li>GST registered, PAN registered</li>
                <li>MCA filings publicly available</li>
              </ul>
            </div>
            <div className="legal-card">
              <h4>Programmes we list</h4>
              <ul>
                <li>UGC-DEB approved only (verified annually)</li>
                <li>AICTE approved where applicable</li>
                <li>NAAC accreditation noted on each listing</li>
                <li>Last audit: June 2026</li>
                <li>Removed programmes reported within 24 hours</li>
              </ul>
            </div>
            <div className="legal-card">
              <h4>Your data and consent</h4>
              <ul>
                <li>DPDP Act 2023 compliant</li>
                <li>Explicit consent collected at every lead form</li>
                <li>Lead data shared with the institution you enquired about</li>
                <li>Never sold to third parties outside of your enquiry</li>
                <li>Deletion on request: privacy@collegencourses.com</li>
              </ul>
            </div>
          </div>
          <p className="p-body-text" style={{ marginTop: 24, color: "var(--muted)", fontSize: 14 }}>
            Under the Digital Personal Data Protection Act 2023 (DPDP Act), we collect explicit consent before sharing your lead data with any partner university or institution. The consent checkbox on every form is unticked by default, plainly worded, and required to submit. Your consent text, version, timestamp, and IP are stored on the CRM lead record as legally required proof of consent.
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta p-cta-band">
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Have a question about a programme or how we work?</h2>
          <p>Tell us your background and what you are looking for. We will match you to the right programme in 2 minutes.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("about-cta-band")}>
              Get Free Guidance {ARROW}
            </button>
            <a href="/contact-us" className="btn btn-white">Contact Us</a>
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
