"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type View = "intro" | "router" | "abroad" | "wizard" | "loading" | "results" | "success";

interface Answers {
  profile?: string;
  time?: string;
  budget?: string;
  mode?: string;
  spec?: string;
  goal?: string;
}

interface Programme {
  id: string;
  name: string;
  uni: string;
  mode: string;
  duration: string;
  feeDisplay: string;
  feeBand: string;
  batch: string;
  accreditations: string[];
  specs: string[];
  profiles: string[];
  timeBands: string[];
  goals: string[];
}

// ─── Programme database (India track, source of truth for now) ───────────────
const PROGRAMMES: Programme[] = [
  { id: "hc-1", name: "Online MBA in Marketing", uni: "Symbiosis Centre for Distance Learning", mode: "online", duration: "24 months", feeDisplay: "Rs 1.8 L", feeBand: "1-2", batch: "Mar 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["marketing"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed", "intensive"], goals: ["promotion", "switch", "salary"] },
  { id: "hc-2", name: "Distance MBA in HR", uni: "NMIMS Global Access", mode: "distance", duration: "24 months", feeDisplay: "Rs 1.5 L", feeBand: "1-2", batch: "Apr 2026", accreditations: ["UGC-DEB", "AICTE"], specs: ["hr"], profiles: ["working_professional", "graduate"], timeBands: ["very_limited", "manageable", "committed"], goals: ["promotion", "switch"] },
  { id: "hc-3", name: "Executive Online MBA", uni: "IIM Indore", mode: "executive", duration: "12 months", feeDisplay: "Rs 6.5 L", feeBand: "5plus", batch: "Jul 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["general", "marketing", "finance"], profiles: ["entrepreneur", "working_professional"], timeBands: ["intensive", "committed"], goals: ["promotion", "business"] },
  { id: "hc-4", name: "Online MBA in Finance", uni: "Amity University Online", mode: "online", duration: "24 months", feeDisplay: "Rs 1.5 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["finance"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch", "salary"] },
  { id: "hc-5", name: "Online MBA in IT & PM", uni: "Manipal Online Education", mode: "online", duration: "24 months", feeDisplay: "Rs 1.4 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["it"], profiles: ["working_professional"], timeBands: ["manageable", "committed", "intensive"], goals: ["promotion", "switch", "salary"] },
  { id: "hc-6", name: "Online MBA in Healthcare", uni: "Symbiosis Centre for Distance Learning", mode: "online", duration: "24 months", feeDisplay: "Rs 2.1 L", feeBand: "2-5", batch: "Sep 2026", accreditations: ["UGC-DEB", "NAAC A++"], specs: ["healthcare"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch"] },
  { id: "hc-7", name: "Distance MBA in Finance", uni: "ICFAI University", mode: "distance", duration: "24 months", feeDisplay: "Rs 0.9 L", feeBand: "u1", batch: "Jul 2026", accreditations: ["UGC-DEB"], specs: ["finance"], profiles: ["graduate", "career_break"], timeBands: ["very_limited", "manageable"], goals: ["salary"] },
  { id: "hc-8", name: "Distance MBA in Operations", uni: "Welingkar Distance Learning", mode: "distance", duration: "24 months", feeDisplay: "Rs 1.1 L", feeBand: "1-2", batch: "Jun 2026", accreditations: ["UGC-DEB"], specs: ["operations"], profiles: ["working_professional", "graduate"], timeBands: ["very_limited", "manageable"], goals: ["promotion", "salary"] },
  { id: "hc-9", name: "Online MBA in Digital Marketing", uni: "OP Jindal Global University", mode: "online", duration: "18 months", feeDisplay: "Rs 2.8 L", feeBand: "2-5", batch: "May 2026", accreditations: ["UGC-DEB", "NAAC A"], specs: ["marketing"], profiles: ["working_professional", "entrepreneur"], timeBands: ["committed", "intensive"], goals: ["switch", "business", "salary"] },
  { id: "hc-10", name: "EPGP Executive MBA", uni: "IIM Kozhikode", mode: "executive", duration: "12 months", feeDisplay: "Rs 7 L", feeBand: "5plus", batch: "Aug 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["general"], profiles: ["working_professional", "entrepreneur"], timeBands: ["intensive"], goals: ["promotion", "business"] },
  { id: "hc-11", name: "Online MBA in HR", uni: "Amity University Online", mode: "online", duration: "24 months", feeDisplay: "Rs 1.5 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["hr"], profiles: ["working_professional", "graduate", "career_break"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch"] },
  { id: "hc-12", name: "Online MBA in Marketing", uni: "Manipal Online Education", mode: "online", duration: "24 months", feeDisplay: "Rs 1.4 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["marketing"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch", "salary"] },
];

// ─── Scoring (deterministic rules engine; see sitemap section 2.3 / 10) ───────
const FEE_ORDER = ["u1", "1-2", "2-5", "5plus"];
const MODE_COMPAT: Record<string, string[]> = {
  online: ["online", "online_weekend"],
  online_weekend: ["online", "online_weekend"],
  distance: ["distance"],
  executive: ["executive"],
};

function scoreProgramme(prog: Programme, ans: Answers): number {
  let s = 0;
  if (ans.budget) {
    if (prog.feeBand === ans.budget) s += 3;
    else if (Math.abs(FEE_ORDER.indexOf(prog.feeBand) - FEE_ORDER.indexOf(ans.budget)) === 1) s += 1;
  }
  if (ans.mode && (MODE_COMPAT[ans.mode] ?? []).includes(prog.mode)) s += 3;
  if (ans.spec) {
    if (ans.spec === "not_sure") s += 1;
    else if (prog.specs.includes(ans.spec)) s += 3;
  }
  if (ans.profile && prog.profiles.includes(ans.profile)) s += 2;
  if (ans.time && prog.timeBands.includes(ans.time)) s += 2;
  if (ans.goal && prog.goals.includes(ans.goal)) s += 1;
  return s;
}

function whyFits(prog: Programme, ans: Answers): string {
  const pm: Record<string, string> = { working_professional: "As a working professional", graduate: "As a recent graduate", entrepreneur: "As a business owner", career_break: "As someone returning from a career break" };
  const gm: Record<string, string> = { promotion: "looking to accelerate into a managerial role", switch: "planning an industry or function switch", business: "building depth for your business", salary: "targeting a salary uplift" };
  const mm: Record<string, string> = { online: "fully online format", online_weekend: "online-with-weekend format", distance: "distance learning format", executive: "executive format" };
  const bm: Record<string, string> = { u1: "under-1-lakh budget", "1-2": "1 to 2 lakh budget", "2-5": "2 to 5 lakh budget", "5plus": "5 lakh-plus budget" };
  return `${pm[ans.profile ?? ""] ?? "Based on your profile"} ${gm[ans.goal ?? ""] ?? "with your goals in mind"}, ${prog.name} from ${prog.uni} scores well. The ${mm[ans.mode ?? ""] ?? "flexible format"} suits your availability, and the ${bm[ans.budget ?? ""] ?? "your budget"} is matched by the ${prog.feeDisplay} total fee.`;
}

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    key: "profile", label: "Question 1 of 6",
    q: "What's your current situation?",
    sub: "This shapes which programmes and modes are most realistic for you.",
    options: [
      { icon: "\u{1F4BB}", label: "Working Professional", desc: "3+ years of experience, employed full-time", val: "working_professional" },
      { icon: "\u{1F393}", label: "Recent Graduate", desc: "Final year student or just graduated", val: "graduate" },
      { icon: "\u{1F3E0}", label: "Business Owner", desc: "Running or set to inherit a business", val: "entrepreneur" },
      { icon: "✋", label: "Career Break", desc: "On a break, looking to return stronger", val: "career_break" },
    ],
  },
  {
    key: "time", label: "Question 2 of 6",
    q: "How many hours per week can you commit to studying?",
    sub: "Be honest. Overestimating leads to dropouts in semester two.",
    options: [
      { icon: "\u{1F550}", label: "Up to 5 hours", desc: "Very tight. Travel, night shifts, or family commitments.", val: "very_limited" },
      { icon: "\u{1F551}", label: "5 to 10 hours", desc: "Manageable alongside a regular full-time job.", val: "manageable" },
      { icon: "\u{1F552}", label: "10 to 15 hours", desc: "Serious commitment. Evenings and weekends.", val: "committed" },
      { icon: "⚡", label: "15+ hours", desc: "Fully focused. Study is a priority right now.", val: "intensive" },
    ],
  },
  {
    key: "budget", label: "Question 3 of 6",
    q: "What's your budget for the full programme?",
    sub: "Total fee over the full 24 months, including all semesters.",
    options: [
      { icon: "\u{1F4B0}", label: "Under Rs 1 lakh", desc: "Entry-level or state-university programmes", val: "u1" },
      { icon: "\u{1F4B5}", label: "Rs 1 to 2 lakh", desc: "Mainstream band. Symbiosis, NMIMS, Amity, Manipal.", val: "1-2" },
      { icon: "\u{1F4B6}", label: "Rs 2 to 5 lakh", desc: "Premium universities. OP Jindal, Symbiosis top-tier.", val: "2-5" },
      { icon: "\u{1F947}", label: "Rs 5 lakh and above", desc: "Executive formats. IIM-tier programmes.", val: "5plus" },
    ],
  },
  {
    key: "mode", label: "Question 4 of 6",
    q: "How do you prefer to study?",
    sub: "There's no right answer. Pick what actually fits your life.",
    options: [
      { icon: "\u{1F5A5}️", label: "Fully online", desc: "Live evening sessions + recorded content. No campus visits.", val: "online" },
      { icon: "\u{1F4C5}", label: "Online with weekend classes", desc: "Weekly live sessions, optional weekend contact.", val: "online_weekend" },
      { icon: "\u{1F4DA}", label: "Distance mode", desc: "Self-paced study material, periodic sessions, flexible exams.", val: "distance" },
      { icon: "\u{1F3DB}️", label: "Executive or hybrid format", desc: "Intensive weekend or short-term residential immersions.", val: "executive" },
    ],
  },
  {
    key: "spec", label: "Question 5 of 6",
    q: "Which specialization interests you most?",
    sub: "If you're unsure, pick \"Not sure yet\" and we'll suggest based on your goals.",
    options: [
      { icon: "\u{1F4E2}", label: "Marketing & Digital", val: "marketing" },
      { icon: "\u{1F4C8}", label: "Finance / Banking", val: "finance" },
      { icon: "\u{1F465}", label: "Human Resources", val: "hr" },
      { icon: "⚙️", label: "Operations & Supply Chain", val: "operations" },
      { icon: "\u{1F4BB}", label: "IT & Project Management", val: "it" },
      { icon: "\u{1F3E5}", label: "Healthcare Management", val: "healthcare" },
      { icon: "\u{1F31F}", label: "General / Executive MBA", val: "general" },
      { icon: "\u{1F50D}", label: "Not sure yet", val: "not_sure" },
    ],
  },
  {
    key: "goal", label: "Question 6 of 6",
    q: "What's your primary goal from this MBA?",
    sub: "Be specific. This is what the recommendation optimises for.",
    options: [
      { icon: "\u{1F680}", label: "Get promoted in current role", desc: "Managerial credentials within the same company or sector.", val: "promotion" },
      { icon: "⇄", label: "Switch industries", desc: "Move from one sector or function to another.", val: "switch" },
      { icon: "\u{1F30D}", label: "Start or scale a business", desc: "Finance, ops, and strategy depth for your own venture.", val: "business" },
      { icon: "\u{1F4B2}", label: "Higher salary", desc: "Salary uplift as the main driver. Role is secondary.", val: "salary" },
    ],
  },
];

function getUTMParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || "",
    gclidFbclid: params.get("gclid") || params.get("fbclid") || "",
    landingPage: window.location.href,
    referrer: document.referrer,
  };
}

function getBrowser(ua: string) {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  if (/Opera|OPR\//.test(ua)) return "Opera";
  return "Other";
}

function getDeviceInfo() {
  if (typeof window === "undefined") return {};
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  return {
    userAgent: ua,
    deviceType: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
    browser: getBrowser(ua),
  };
}

const CONSENT_TEXT =
  "I agree that CollegeNCourses and the university or institution I am enquiring about may contact me by call, WhatsApp, SMS, and email regarding my enquiry, including on numbers registered with DND/NDNC, and that my details may be shared with that institution's admissions team so they can assist me.";

// ─── Loading dots hook ────────────────────────────────────────────────────────
function useLoadingDots(active: boolean) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    if (!active) return;
    const frames = ["", ".", "..", "..."];
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % frames.length; setDots(frames[i]); }, 450);
    return () => { clearInterval(id); setDots(""); };
  }, [active]);
  return dots;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AICounsellorClient() {
  const [view, setView] = useState<View>("intro");
  const [currentQ, setCurrentQ] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<{ prog: Programme; score: number }[]>([]);
  const [animKey, setAnimKey] = useState(0);
  const [enquiryId, setEnquiryId] = useState("");

  const [hoName, setHoName] = useState("");
  const [hoMobile, setHoMobile] = useState("");
  const [hoEmail, setHoEmail] = useState("");
  const [hoTime, setHoTime] = useState("As soon as possible");
  const [hoConsent, setHoConsent] = useState(false);
  const [hoSubmitting, setHoSubmitting] = useState(false);
  const [hoError, setHoError] = useState("");

  const handoffRef = useRef<HTMLDivElement>(null);
  const dots = useLoadingDots(view === "loading");

  // ── Actions ──────────────────────────────────────────────────────────────
  function goToRouter() {
    setView("router");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseTrack(track: "india" | "abroad") {
    if (track === "abroad") {
      setView("abroad");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setAnswers({});
    setCurrentQ(1);
    setAnimKey(k => k + 1);
    setView("wizard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectOption(key: string, val: string) {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    setTimeout(() => {
      if (currentQ < 6) {
        setCurrentQ(q => q + 1);
        setAnimKey(k => k + 1);
      } else {
        computeResults(next);
      }
    }, 380);
  }

  function goBack() {
    if (currentQ > 1) {
      setCurrentQ(q => q - 1);
      setAnimKey(k => k + 1);
    } else {
      setView("router");
    }
  }

  function skipQuestion() {
    if (currentQ < 6) {
      setCurrentQ(q => q + 1);
      setAnimKey(k => k + 1);
    } else {
      computeResults(answers);
    }
  }

  function computeResults(ans: Answers) {
    setView("loading");
    setTimeout(() => {
      const scored = PROGRAMMES.map(p => ({ prog: p, score: scoreProgramme(p, ans) }));
      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 3));
      setView("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2400);
  }

  function restart() {
    setAnswers({});
    setCurrentQ(1);
    setResults([]);
    setHoName(""); setHoMobile(""); setHoEmail(""); setHoConsent(false); setHoError("");
    setView("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitHandoff(e: React.FormEvent) {
    e.preventDefault();
    if (!hoName.trim() || !hoMobile.trim() || !hoEmail.trim()) {
      setHoError("Please fill in your name, mobile, and email.");
      return;
    }
    if (!hoConsent) { setHoError("Please accept the consent above to continue."); return; }
    setHoError("");
    setHoSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: hoName,
          mobile: hoMobile,
          email: hoEmail,
          city: "Online",
          courseInterested: results[0]?.prog.name ?? "",
          consent: true,
          source: "ai-counsellor",
          ...getUTMParams(),
          ...getDeviceInfo(),
        }),
      });
      setEnquiryId(String(Math.floor(10000 + Math.random() * 90000)));
      setView("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setHoError("Something went wrong. Please try again.");
    }
    setHoSubmitting(false);
  }

  const progressPct = view === "wizard" ? ((currentQ - 1) / 6) * 100 : 100;
  const qData = QUESTIONS[currentQ - 1];
  const isSpecQ = qData?.key === "spec";

  const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1px solid var(--pale-navy)", borderRadius: "var(--radius-md)", background: "var(--white)", fontSize: 15, fontFamily: "var(--font-sans)", color: "var(--charcoal)", outline: "none" };
  const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--navy)", marginBottom: 6 };

  return (
    <>
      <style>{`
        @keyframes aicFadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes aicSpin   { to { transform:rotate(360deg); } }
        .aic-fadein { animation: aicFadeUp .28s ease both; }
        .aic-option-btn:hover { border-color: var(--navy) !important; background: var(--ivory) !important; }
      `}</style>

      {/* ══ INTRO ════════════════════════════════════════════════════════════ */}
      {view === "intro" && (
        <section style={{ background: "var(--ivory)", padding: "64px 0 72px" }}>
          <div className="container">
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>

              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 16 }}>
                AI COUNSELLOR
              </div>

              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.08, color: "var(--navy)", letterSpacing: "-0.01em", marginBottom: 20 }}>
                3 programme recommendations<br />in 2 minutes.
              </h1>

              <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--charcoal)", lineHeight: 1.6, marginBottom: 36 }}>
                Answer 6 questions about your situation, budget, and goals. The AI Counsellor applies the same decision logic our education experts use, and returns three personalised programme recommendations with a plain-language explanation of why each fits.
              </p>

              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
                {[
                  { icon: "⏰", text: "Takes 2 minutes" },
                  { icon: "★", text: "No email to see results" },
                  { icon: "\u{1F512}", text: "Your answers stay private" },
                  { icon: "\u{1F464}", text: "Built by our education experts" },
                ].map(c => (
                  <div key={c.text} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--white)", border: "1px solid var(--mist)", padding: "8px 16px", borderRadius: "var(--radius-pill)", fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                    <span style={{ color: "var(--yellow)", fontSize: 16 }}>{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <button
                  onClick={goToRouter}
                  className="btn btn-primary"
                  style={{ fontSize: 18, padding: "16px 40px", minHeight: 56, display: "inline-flex", alignItems: "center", gap: 10 }}
                >
                  Start the AI Counsellor
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
                <p style={{ fontSize: 12, color: "var(--grey)" }}>
                  Free. No spam.{" "}
                  <a href="/privacy-policy" style={{ color: "var(--navy)", fontWeight: 600 }}>Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ ROUTER (Where do you want to study?) ════════════════════════════════ */}
      {view === "router" && (
        <section style={{ background: "var(--ivory)", padding: "64px 0 72px", minHeight: "60vh" }}>
          <div className="container">
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 16 }}>
                QUESTION 0 OF 6
              </div>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px,4vw,38px)", color: "var(--navy)", marginBottom: 36 }}>
                Where do you want to study?
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
                <button
                  onClick={() => chooseTrack("india")}
                  className="aic-option-btn"
                  style={{ background: "var(--white)", border: "2px solid var(--mist)", borderRadius: "var(--radius-lg)", padding: "28px 24px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <span style={{ fontSize: 28 }}>{"\u{1F3EB}"}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", fontFamily: "var(--font-serif)" }}>Study in India</span>
                  <span style={{ fontSize: 14, color: "var(--grey)" }}>Online, Distance, and Executive MBA from UGC-DEB approved universities.</span>
                </button>
                <button
                  onClick={() => chooseTrack("abroad")}
                  className="aic-option-btn"
                  style={{ background: "var(--white)", border: "2px solid var(--mist)", borderRadius: "var(--radius-lg)", padding: "28px 24px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <span style={{ fontSize: 28 }}>{"\u{1F30D}"}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", fontFamily: "var(--font-serif)" }}>Study Abroad</span>
                  <span style={{ fontSize: 14, color: "var(--grey)" }}>MBA, MS, MIM, and Bachelors at universities in the USA, UK, Canada, and more.</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ ABROAD STUB (Track 2, activates fully with the Study Abroad portal) ══ */}
      {view === "abroad" && (
        <section style={{ background: "var(--ivory)", padding: "64px 0 80px", minHeight: "60vh" }}>
          <div className="container">
            <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 20 }}>{"\u{1F30D}"}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(24px,3.5vw,32px)", marginBottom: 12 }}>
                The Study Abroad track is on its way
              </h2>
              <p style={{ color: "var(--grey)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                Our full Study Abroad profile evaluation, with an Ambitious/Target/Safe university shortlist and admit-likelihood bands, is rolling out shortly. In the meantime, our Profile Evaluation tool can get you started today.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/study-abroad/profile-evaluation" className="btn btn-primary">
                  Try Profile Evaluation
                </a>
                <button onClick={() => setView("router")} style={{ fontSize: 14, color: "var(--grey)", background: "none", border: "none", cursor: "pointer" }}>
                  {"←"} Back
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ WIZARD ═══════════════════════════════════════════════════════════ */}
      {view === "wizard" && qData && (
        <div style={{ background: "var(--ivory)", minHeight: "70vh", paddingBottom: 80 }}>

          <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grey)" }}>Study in India</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>Question {currentQ} of 6</span>
            </div>
            <div style={{ height: 6, background: "var(--mist)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "var(--yellow)", borderRadius: "var(--radius-pill)", width: `${progressPct}%`, transition: "width 0.4s ease" }} />
            </div>
          </div>

          <div key={`q-${animKey}`} className="aic-fadein" style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>

            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--yellow)", color: "var(--navy)", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "var(--radius-pill)", marginBottom: 20 }}>
              {qData.label}
            </span>

            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px,3.5vw,32px)", color: "var(--navy)", lineHeight: 1.2, marginBottom: 10 }}>{qData.q}</h2>
            <p style={{ fontSize: 15, color: "var(--grey)", marginBottom: 32 }}>{qData.sub}</p>

            <div style={{ display: "grid", gridTemplateColumns: isSpecQ ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
              {qData.options.map(opt => {
                const selected = answers[qData.key as keyof Answers] === opt.val;
                return (
                  <button
                    key={opt.val}
                    onClick={() => selectOption(qData.key, opt.val)}
                    className="aic-option-btn"
                    style={{
                      background: selected ? "var(--navy)" : "var(--white)",
                      border: `2px solid ${selected ? "var(--navy)" : "var(--mist)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "18px 20px",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      minHeight: isSpecQ ? 64 : 80,
                      transition: "border-color .15s, background .15s, transform .12s",
                    }}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{opt.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: selected ? "var(--ivory)" : "var(--navy)", lineHeight: 1.3 }}>{opt.label}</span>
                    {"desc" in opt && opt.desc && (
                      <span style={{ fontSize: 13, color: selected ? "var(--pale-navy)" : "var(--grey)", lineHeight: 1.4 }}>{opt.desc}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
              <button onClick={goBack} style={{ color: "var(--grey)", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 0" }}>
                {"←"} Back
              </button>
              <button onClick={skipQuestion} style={{ fontSize: 13, color: "var(--grey)", background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
                Skip this question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ LOADING ══════════════════════════════════════════════════════════ */}
      {view === "loading" && (
        <div style={{ padding: "80px 20px", textAlign: "center", background: "var(--ivory)", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 56, border: "4px solid var(--pale-navy)", borderTopColor: "var(--yellow)", borderRadius: "50%", animation: "aicSpin 0.8s linear infinite", marginBottom: 28 }} aria-hidden="true" />
          <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 24, marginBottom: 8 }}>
            Personalising your recommendations{dots}
          </h3>
          <p style={{ color: "var(--grey)", fontSize: 15 }}>Matching your profile to {PROGRAMMES.length} verified programmes</p>
        </div>
      )}

      {/* ══ RESULTS ══════════════════════════════════════════════════════════ */}
      {view === "results" && (
        <div style={{ background: "var(--ivory)", padding: "48px 0 80px" }}>

          <div className="container" style={{ textAlign: "center", maxWidth: 660, marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>YOUR RECOMMENDATIONS</div>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(26px,3.5vw,36px)", marginBottom: 12 }}>Your 3 personalised programme matches</h2>
            <p style={{ color: "var(--grey)", fontSize: 16, marginBottom: 16 }}>Based on your answers, these programmes offer the best combination of fit, accreditation, fees, and career outcomes for your situation.</p>
            <button onClick={restart} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--grey)", background: "none", border: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              Start again with different answers
            </button>
          </div>

          <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, maxWidth: 980 }}>
            {results.map(({ prog }, i) => {
              const isBest = i === 0;
              const rankLabels = ["Top Pick", "Strong Alternative", "Also Consider"];
              return (
                <article
                  key={prog.id}
                  style={{ background: "var(--white)", border: `${isBest ? 3 : 2}px solid ${isBest ? "var(--yellow)" : "var(--mist)"}`, borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}
                >
                  {isBest && (
                    <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--yellow)", color: "var(--navy)", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: "0 0 var(--radius-md) var(--radius-md)", whiteSpace: "nowrap" }}>
                      Best Fit For You
                    </div>
                  )}

                  <div style={{ background: isBest ? "var(--yellow)" : "var(--navy)", padding: "12px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: isBest ? "var(--navy)" : "var(--yellow)", lineHeight: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isBest ? "rgba(36,48,72,0.6)" : "var(--pale-navy)" }}>{rankLabels[i]}</span>
                  </div>

                  <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 18, lineHeight: 1.2, marginBottom: 6 }}>{prog.name}</div>
                    <div style={{ fontSize: 13, color: "var(--charcoal)", marginBottom: 14 }}>{prog.uni}</div>

                    {prog.accreditations.length > 0 && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                        {prog.accreditations.map(a => (
                          <span key={a} style={{ background: "#E8F5EA", color: "#1B5E20", border: "1px solid #A5D6A7", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 3 }}>{a}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, padding: "12px 0", borderTop: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)", marginBottom: 16 }}>
                      {[["Duration", prog.duration], ["Fee", prog.feeDisplay], ["Batch", prog.batch]].map(([k, v]) => (
                        <div key={k} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey)", marginBottom: 2 }}>{k}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: "var(--pale-navy)", borderRadius: "var(--radius-md)", padding: 14, marginBottom: 16, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0 }} />
                        Why this fits you
                      </div>
                      <div style={{ fontSize: 13, color: "var(--navy)", lineHeight: 1.5 }}>{whyFits(prog, answers)}</div>
                    </div>

                    <button onClick={() => handoffRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                      Enquire About This Programme
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Hand-off form */}
          <div ref={handoffRef} style={{ background: "var(--white)", maxWidth: 640, margin: "44px auto 0", padding: "36px 36px 32px", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", borderTop: "4px solid var(--yellow)" }} className="mx-4 sm:mx-auto">

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 22, marginBottom: 8 }}>Want help finalising your choice?</h3>
              <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.5 }}>Get your shortlist and let the right universities reach out to help you enrol.</p>
            </div>

            <form onSubmit={submitHandoff}>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Full Name <span style={{ color: "#B83A2A" }}>*</span></label>
                <input value={hoName} onChange={e => setHoName(e.target.value)} placeholder="e.g. Priya Sharma" style={inp} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={lbl}>Mobile <span style={{ color: "#B83A2A" }}>*</span></label>
                  <input value={hoMobile} onChange={e => setHoMobile(e.target.value)} type="tel" placeholder="+91 98XXX XXXXX" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Email <span style={{ color: "#B83A2A" }}>*</span></label>
                  <input value={hoEmail} onChange={e => setHoEmail(e.target.value)} type="email" placeholder="you@email.com" style={inp} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Best time to be contacted</label>
                <select value={hoTime} onChange={e => setHoTime(e.target.value)} style={inp}>
                  <option>As soon as possible</option>
                  <option>Today evening (after 6 pm)</option>
                  <option>Tomorrow morning</option>
                  <option>This weekend</option>
                </select>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "var(--grey)", marginBottom: 16, lineHeight: 1.5, cursor: "pointer" }}>
                <input type="checkbox" checked={hoConsent} onChange={e => setHoConsent(e.target.checked)} style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)" }} />
                <span>{CONSENT_TEXT}</span>
              </label>
              {hoError && <p style={{ color: "#B83A2A", fontSize: 13, marginBottom: 12 }}>{hoError}</p>}
              <button type="submit" disabled={hoSubmitting} className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {hoSubmitting ? "Sending…" : "Send Me My Shortlist"}
                {!hoSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>}
              </button>
              <p style={{ fontSize: 12, color: "var(--grey)", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
                No spam, no hard sell.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ══ SUCCESS ══════════════════════════════════════════════════════════ */}
      {view === "success" && (
        <div style={{ textAlign: "center", padding: "80px 20px 100px", background: "var(--ivory)", minHeight: "60vh" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--yellow)", color: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, fontWeight: 800 }}>
            {"✓"}
          </div>

          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 26, marginBottom: 12 }}>You&apos;re all set.</h2>
          <p style={{ color: "var(--grey)", fontSize: 15, marginBottom: 8 }}>Your shortlist is saved. The university or institution you&apos;re matched with may reach out to help you enrol.</p>

          <div style={{ display: "inline-block", background: "var(--pale-navy)", color: "var(--navy)", padding: "7px 20px", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: 14, letterSpacing: "0.06em", margin: "12px 0 20px" }}>
            CNC-2026-{enquiryId}
          </div>

          <p style={{ color: "var(--grey)", fontSize: 15, marginBottom: 32 }}>We&apos;ve sent a confirmation to your mobile and email.</p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/917350460393" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.4-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2A10 10 0 002 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2A10 10 0 0022 12 10 10 0 0012 2z" /></svg>
              Add on WhatsApp
            </a>
            <button onClick={restart} style={{ fontSize: 15, color: "var(--grey)", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              Start again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
