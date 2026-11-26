"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";

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

interface FeaturedCourse {
  _id: string;
  courseName: string;
  universityName?: string;
  mode?: string;
  duration?: string;
  fees?: string;
  eligibility?: string;
  universityLogoUrl?: string;
}

interface HeroBlockData {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

interface Faq {
  _id?: string;
  question: string;
  answer: string;
}

interface PlannerHomeClientProps {
  cmsData?: Record<string, unknown> | null;
}

const HERO_DEFAULTS: Required<HeroBlockData> = {
  eyebrow: "INDIA'S TRUSTED HIGHER-EDUCATION COMPASS",
  headline: "Your MBA fits into the hours your week leaves free.",
  subheadline:
    "Compare Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from 150+ UGC-DEB approved universities and top global institutions - by fees, specialisation and eligibility.",
  primaryCTA: "Get Free Guidance",
  secondaryCTA: "Compare universities",
};

const FALLBACK_COURSES: FeaturedCourse[] = [
  { _id: "f1", courseName: "Online MBA in Marketing", universityName: "Symbiosis Centre for Distance Learning", mode: "Online", duration: "24 months", fees: "Rs 1.8 L" },
  { _id: "f2", courseName: "Distance MBA in Finance", universityName: "NMIMS Global Access", mode: "Distance", duration: "24 months", fees: "Rs 1.5 L" },
  { _id: "f3", courseName: "Executive Online MBA", universityName: "IIM Indore, 1-Year Programme", mode: "Executive", duration: "12 months", fees: "Rs 6.5 L" },
  { _id: "f4", courseName: "Online MBA in Operations", universityName: "Amity University Online", mode: "Online", duration: "24 months", fees: "Rs 1.6 L" },
  { _id: "f5", courseName: "Distance MBA in HR", universityName: "Manipal University Jaipur", mode: "Distance", duration: "24 months", fees: "Rs 1.4 L" },
];

const CARD_BG = ["c-lilac", "c-mint", "c-rose", "c-sun"] as const;

const SPECIALIZATIONS = [
  { slug: "marketing", icon: "\u{1F4E3}", title: "Marketing and Digital Marketing", roles: "Brand Manager, Digital Marketing Lead, Growth Manager, CMO-track" },
  { slug: "finance", icon: "\u{1F4B0}", title: "Finance", roles: "Financial Analyst, Investment Banker, CFO-track, Equity Researcher" },
  { slug: "hr", icon: "\u{1F465}", title: "Human Resources", roles: "HR Business Partner, Talent Acquisition Lead, L&D Manager, CHRO-track" },
  { slug: "operations", icon: "\u{1F3ED}", title: "Operations and Supply Chain", roles: "Supply Chain Manager, Operations Lead, Procurement Head, Plant Manager" },
  { slug: "it-systems", icon: "\u{1F4BB}", title: "IT and Project Management", roles: "Project Manager, IT Head, Product Manager, Delivery Lead, CTO-track" },
  { slug: null, icon: "\u{1F3E5}", title: "Healthcare Management", roles: "Hospital Administrator, Health-tech Manager, Pharma Operations, Public Health Lead" },
  { slug: "banking-finance", icon: "\u{1F3E6}", title: "Banking and Financial Services", roles: "Branch Manager, Wealth Advisor, Credit Analyst, Relationship Manager" },
  { slug: "business-analytics", icon: "\u{1F4C8}", title: "Business Analytics", roles: "Business Analyst, Analytics Manager, Data Strategy Lead, BI Lead" },
];

const TESTIMONIALS = [
  {
    quote:
      "I was sceptical about online MBAs. The CollegeNCourses team showed me the UGC-DEB approval details and actual placement data from Symbiosis. The fee comparison was completely transparent. I enrolled the next week. Two years later, I am a senior manager.",
    name: "Ankit Sharma",
    meta: "Senior Manager at Tech Mahindra - Symbiosis Online MBA",
    initial: "A",
  },
  {
    quote:
      "The AI Counsellor gave me three options within minutes, ranked by fit. It explained exactly why each programme matched my profile and budget. That clarity is why I trusted CollegeNCourses over every other site I visited.",
    name: "Priya Mehta",
    meta: "Marketing Lead at Asian Paints - NMIMS Distance MBA",
    initial: "P",
  },
  {
    quote:
      "I tried four other websites before this one. They all asked for my mobile number before showing me anything. CollegeNCourses let me explore the AI Counsellor without giving up my contact details first.",
    name: "Rajat Khanna",
    meta: "Family business owner, Surat - IIM Indore Executive MBA",
    initial: "R",
  },
];

const DEFAULT_FAQS: Faq[] = [
  { question: "Is an Online MBA legally equivalent to a regular MBA in India?", answer: "Yes. As per UGC-DEB regulations and the 2022 amendment to the AICTE handbook, Online and Distance Mode degrees from approved institutions hold the same legal standing as regular-mode degrees for employment, further studies, and government job eligibility." },
  { question: "How much does an Online MBA cost in India in 2026?", answer: "Total programme fees range from Rs 50,000 at entry-level state universities to Rs 6.5 lakh at IIMs for executive formats. The mainstream band sits between Rs 1.5 lakh and Rs 2.5 lakh for two-year programmes." },
  { question: "Do employers in India accept Online and Distance MBAs?", answer: "Major MNCs and Indian corporates (TCS, Infosys, Reliance, Asian Paints, Mahindra, HDFC) treat Online and Distance MBAs from UGC-DEB approved universities at parity with regular MBAs in their HR policies." },
  { question: "How does guidance work at CollegeNCourses?", answer: "Use the AI Counsellor - answer 6 short questions about your goals, budget, mode preference, and timeline. You get a personalised shortlist of 3 matched programmes instantly, with fees, accreditation status, and a clear explanation of fit." },
  { question: "Does CollegeNCourses support Study Abroad options?", answer: "Yes. CollegeNCourses covers both Study in India and Study Abroad. For international programmes, the AI Counsellor's Abroad track (Profile Evaluator) takes your academics, test scores, target country, and budget to generate a shortlist of Ambitious, Target, and Safe universities." },
];

export default function PlannerHomeClient({ cmsData }: PlannerHomeClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("home-preview");
  const railRef = useRef<HTMLDivElement>(null);
  const [railAtStart, setRailAtStart] = useState(true);
  const [railAtEnd, setRailAtEnd] = useState(false);

  const openLeadForm = useCallback((source = "home-preview") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const sections = (cmsData?.sections as Array<Record<string, unknown>>) || [];
  const heroBlock = sections.find((s) => s._type === "heroBlock") as HeroBlockData | undefined;
  const programmesBlock = sections.find((s) => s._type === "programmesBlock") as
    | { featuredCourses?: FeaturedCourse[] }
    | undefined;
  const faqBlock = sections.find((s) => s._type === "faqBlock") as { faqs?: Faq[] } | undefined;

  const eyebrow = heroBlock?.eyebrow || HERO_DEFAULTS.eyebrow;
  const headline = heroBlock?.headline || HERO_DEFAULTS.headline;
  const subheadline = heroBlock?.subheadline || HERO_DEFAULTS.subheadline;
  const primaryCTA = heroBlock?.primaryCTA || HERO_DEFAULTS.primaryCTA;
  const secondaryCTA = heroBlock?.secondaryCTA || HERO_DEFAULTS.secondaryCTA;

  const courses = programmesBlock?.featuredCourses?.length ? programmesBlock.featuredCourses : FALLBACK_COURSES;
  const faqs = faqBlock?.faqs?.length ? faqBlock.faqs : DEFAULT_FAQS;

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setRailAtStart(el.scrollLeft <= 2);
    setRailAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, courses.length]);

  const scrollRail = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 354, behavior: "smooth" });
  };

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader primaryCTA={primaryCTA} onOpenLeadForm={openLeadForm} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-eyebrow">{eyebrow}</div>
            <h1 style={{ marginTop: 14 }}>{headline}</h1>
            <p className="lede">{subheadline}</p>
            <div className="hero-ctas">
              <button type="button" className="btn btn-sun" onClick={() => openLeadForm("hero")}>{primaryCTA}</button>
              <a href="#universities" className="btn btn-white">{secondaryCTA}</a>
            </div>
            <p className="hero-note">Free to use. Your details are shared only with the university you enquire about.</p>
          </div>

          <div className="hero-visual">
            <div className="photo">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" alt="Two working professionals studying together on laptops" />
            </div>
            <div className="planner" aria-label="Example working day with an evening study block">
              <h4>A typical working day</h4>
              <div className="day">
                <span className="tick" style={{ top: "0%" }}>6am</span>
                <span className="tick" style={{ top: "33.3%" }}>12pm</span>
                <span className="tick" style={{ top: "66.6%" }}>6pm</span>
                <span className="tick" style={{ top: "100%" }}>12am</span>
                <div className="blk free" style={{ top: "11%", height: "5.5%" }}>Commute</div>
                <div className="blk work" style={{ top: "16.7%", height: "50%" }}>Job, 9 to 6</div>
                <div className="blk free" style={{ top: "66.7%", height: "11%" }}>Dinner</div>
                <div className="blk study" style={{ top: "77.8%", height: "11.1%" }}>Lecture, 8 to 10pm</div>
              </div>
              <small>Study blocks you can shift to suit your day.</small>
            </div>
          </div>
        </div>
      </section>

      {/* USP bento */}
      <section className="usp">
        <div className="wrap">
          <div className="sec-head">
            <h2>Why aspirants compare on CollegeNCourses first</h2>
            <p>Five reasons working professionals choose to decide here.</p>
          </div>
          <div className="bento">
            <div className="tile t1">
              <span className="big">150+</span>
              <h3>UGC-DEB approved universities</h3>
              <p>Compare recognised Online, Distance, and Executive MBA programmes side by side.</p>
            </div>
            <div className="tile t2">
              <h3>Fees that stay in reach</h3>
              <p>Most programmes cost between Rs 50,000 and Rs 2,00,000 in total, with transparent, verified pricing.</p>
              <div className="range" aria-hidden="true">
                <div className="range-track"><div className="range-fill"></div></div>
                <div className="range-labels"><span>Rs 50,000</span><span>Rs 2,00,000</span></div>
              </div>
            </div>
            <div className="tile t3">
              <div className="stamp"><svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg></div>
              <h3>A recognised degree</h3>
              <p>Every programme we list carries verified UGC-DEB, AICTE, or AIU recognition.</p>
            </div>
            <div className="tile t4">
              <h3>8+ specialisations</h3>
              <p>Pick the track that matches your next role.</p>
              <div className="mini-chips"><span>Marketing</span><span>Finance</span><span>HR</span><span>Operations</span><span>IT</span><span>Analytics</span></div>
            </div>
            <div className="tile t5">
              <div className="stamp"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg></div>
              <h3>AI-matched guidance</h3>
              <p>No career break. The AI Counsellor shortlists programmes to your goals and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section id="universities">
        <div className="wrap">
          <div className="unis-head">
            <div className="sec-head">
              <h2>Private universities you can compare</h2>
              <p>Indicative details only. Confirm current fees and intake dates with the university before you apply.</p>
            </div>
            <div className="arrows">
              <button className="arrow" aria-label="Previous universities" disabled={railAtStart} onClick={() => scrollRail(-1)}>
                <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button className="arrow" aria-label="Next universities" disabled={railAtEnd} onClick={() => scrollRail(1)}>
                <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="rail" ref={railRef} onScroll={updateArrows} tabIndex={0} aria-label="University cards">
            {courses.map((course, i) => (
              <article className="u-card" key={course._id}>
                <div className={`u-top ${CARD_BG[i % CARD_BG.length]}`}>
                  <div className="badges">
                    <span className="badge">UGC-DEB</span>
                    {course.mode && <span className="badge">{course.mode}</span>}
                  </div>
                  {course.universityLogoUrl ? (
                    <img className="u-logo" src={course.universityLogoUrl} alt={course.universityName ?? course.courseName} />
                  ) : (
                    <span className="u-mono">{(course.universityName ?? course.courseName).charAt(0)}</span>
                  )}
                </div>
                <div className="u-body">
                  <h3>{course.universityName ?? course.courseName}</h3>
                  <p className="u-sub">{course.courseName}</p>
                  <div className="facts">
                    {course.duration && <div><span>Duration</span><b>{course.duration}</b></div>}
                    {course.fees && <div><span>Fees from</span><b>{course.fees}</b></div>}
                  </div>
                  <button type="button" className="btn btn-sun btn-sm" onClick={() => openLeadForm("universities")}>Enquire now</button>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a href="/online-mba/" className="btn btn-white">See all universities</a>
          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="courses">
        <div className="wrap">
          <div className="sec-head">
            <h2>Pick the course that points at your next role</h2>
            <p>Each specialisation lists the kinds of roles it usually leads to.</p>
          </div>
          <div className="c-grid">
            {SPECIALIZATIONS.map((spec, i) => (
              <article className="c-card" key={spec.title}>
                <div className="c-ic" style={{ background: [ "var(--rose)", "var(--mint)", "var(--sun)", "var(--lilac)" ][i % 4] }}>{spec.icon}</div>
                <h3>{spec.title}</h3>
                <p className="roles"><b>Roles:</b> {spec.roles}</p>
                <a href={spec.slug ? `/specializations-guide/${spec.slug}` : "/specializations-guide"} className="go">Explore track &rarr;</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <h2>They compared first, then chose</h2>
            <p>What learners told us about their decision.</p>
          </div>
          <div className="chat">
            {TESTIMONIALS.map((t, i) => (
              <div className={`msg${i % 2 === 1 ? " right" : ""}`} key={t.name}>
                <div className="av" style={{ background: [ "var(--lilac)", "var(--sun)", "var(--rose)" ][i % 3] }}>{t.initial}</div>
                <div className="bubble">
                  <p>{t.quote}</p>
                  <span className="who">{t.name} - {t.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="cta">
        <div className="wrap">
          <div>
            <h2>Ready to find a programme that fits your week?</h2>
            <p>Answer a few questions and get a shortlist of programmes matched to your budget, schedule and goals.</p>
          </div>
          <div className="cta-act">
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("cta-band")}>{primaryCTA}</button>
            <small>Takes about three minutes. No cost, no obligation.</small>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap faq-grid">
          <div className="faq-side">
            <h2>Questions you might have</h2>
            <p>Cannot find your answer? Write to info@collegencourses.com.</p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <details key={faq._id || faq.question || i}>
                <summary>{faq.question}<span className="pm"></span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
