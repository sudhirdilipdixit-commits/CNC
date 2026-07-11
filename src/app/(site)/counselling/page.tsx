"use client";

import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type View = "hub" | "wizard" | "loading" | "results" | "success";

interface Answers {
  profile?: string;
  time?: string;
  budget?: string;
  mode?: string;
  spec?: string;
  goal?: string;
}

interface Programme {
  id: number;
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

// ─── Programme database ───────────────────────────────────────────────────────
const PROGRAMMES: Programme[] = [
  { id: 1, name: "Online MBA in Marketing", uni: "Symbiosis Centre for Distance Learning", mode: "online", duration: "24 months", feeDisplay: "₹1.8 L", feeBand: "1-2", batch: "Mar 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["marketing"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed", "intensive"], goals: ["promotion", "switch", "salary"] },
  { id: 2, name: "Distance MBA in HR", uni: "NMIMS Global Access", mode: "distance", duration: "24 months", feeDisplay: "₹1.5 L", feeBand: "1-2", batch: "Apr 2026", accreditations: ["UGC-DEB", "AICTE"], specs: ["hr"], profiles: ["working_professional", "graduate"], timeBands: ["very_limited", "manageable", "committed"], goals: ["promotion", "switch"] },
  { id: 3, name: "Executive Online MBA", uni: "IIM Indore", mode: "executive", duration: "12 months", feeDisplay: "₹6.5 L", feeBand: "5plus", batch: "Jul 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["general", "marketing", "finance"], profiles: ["entrepreneur", "working_professional"], timeBands: ["intensive", "committed"], goals: ["promotion", "business"] },
  { id: 4, name: "Online MBA in Finance", uni: "Amity University Online", mode: "online", duration: "24 months", feeDisplay: "₹1.5 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["finance"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch", "salary"] },
  { id: 5, name: "Online MBA in IT & PM", uni: "Manipal Online Education", mode: "online", duration: "24 months", feeDisplay: "₹1.4 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["it"], profiles: ["working_professional"], timeBands: ["manageable", "committed", "intensive"], goals: ["promotion", "switch", "salary"] },
  { id: 6, name: "Online MBA in Healthcare", uni: "Symbiosis Centre for Distance Learning", mode: "online", duration: "24 months", feeDisplay: "₹2.1 L", feeBand: "2-5", batch: "Sep 2026", accreditations: ["UGC-DEB", "NAAC A++"], specs: ["healthcare"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch"] },
  { id: 7, name: "Distance MBA in Finance", uni: "ICFAI University", mode: "distance", duration: "24 months", feeDisplay: "₹0.9 L", feeBand: "u1", batch: "Jul 2026", accreditations: ["UGC-DEB"], specs: ["finance"], profiles: ["graduate", "career_break"], timeBands: ["very_limited", "manageable"], goals: ["salary"] },
  { id: 8, name: "Distance MBA in Operations", uni: "Welingkar Distance Learning", mode: "distance", duration: "24 months", feeDisplay: "₹1.1 L", feeBand: "1-2", batch: "Jun 2026", accreditations: ["UGC-DEB"], specs: ["operations"], profiles: ["working_professional", "graduate"], timeBands: ["very_limited", "manageable"], goals: ["promotion", "salary"] },
  { id: 9, name: "Online MBA in Digital Marketing", uni: "OP Jindal Global University", mode: "online", duration: "18 months", feeDisplay: "₹2.8 L", feeBand: "2-5", batch: "May 2026", accreditations: ["UGC-DEB", "NAAC A"], specs: ["marketing"], profiles: ["working_professional", "entrepreneur"], timeBands: ["committed", "intensive"], goals: ["switch", "business", "salary"] },
  { id: 10, name: "EPGP Executive MBA", uni: "IIM Kozhikode", mode: "executive", duration: "12 months", feeDisplay: "₹7 L", feeBand: "5plus", batch: "Aug 2026", accreditations: ["UGC-DEB", "AICTE", "NAAC A++"], specs: ["general"], profiles: ["working_professional", "entrepreneur"], timeBands: ["intensive"], goals: ["promotion", "business"] },
  { id: 11, name: "Online MBA in HR", uni: "Amity University Online", mode: "online", duration: "24 months", feeDisplay: "₹1.5 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["hr"], profiles: ["working_professional", "graduate", "career_break"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch"] },
  { id: 12, name: "Online MBA in Marketing", uni: "Manipal Online Education", mode: "online", duration: "24 months", feeDisplay: "₹1.4 L", feeBand: "1-2", batch: "Quarterly", accreditations: ["UGC-DEB", "NAAC A+"], specs: ["marketing"], profiles: ["working_professional", "graduate"], timeBands: ["manageable", "committed"], goals: ["promotion", "switch", "salary"] },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
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
  if (ans.mode && (MODE_COMPAT[ans.mode] || []).includes(prog.mode)) s += 3;
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
  const profileMap: Record<string, string> = { working_professional: "As a working professional", graduate: "As a recent graduate", entrepreneur: "As a business owner", career_break: "As someone returning from a career break" };
  const goalMap: Record<string, string> = { promotion: "looking to accelerate into a managerial role", switch: "planning an industry or function switch", business: "building depth for your business", salary: "targeting a salary uplift" };
  const modeMap: Record<string, string> = { online: "fully online format", online_weekend: "online-with-weekend format", distance: "distance learning format", executive: "executive format" };
  const budgetMap: Record<string, string> = { "u1": "under-1-lakh budget", "1-2": "1 to 2 lakh budget", "2-5": "2 to 5 lakh budget", "5plus": "5 lakh-plus budget" };
  return `${profileMap[ans.profile ?? ""] ?? "Based on your profile"} ${goalMap[ans.goal ?? ""] ?? "with your goals in mind"}, ${prog.name} from ${prog.uni} scores well. The ${modeMap[ans.mode ?? ""] ?? "flexible format"} suits your availability, and the ${budgetMap[ans.budget ?? ""] ?? "your budget"} is matched by the ${prog.feeDisplay} total fee.`;
}

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    key: "profile", q: "What's your current situation?", sub: "This shapes which programmes and modes are most realistic for you.",
    options: [
      { icon: "💻", label: "Working Professional", desc: "3+ years of experience, employed full-time", val: "working_professional" },
      { icon: "🎓", label: "Recent Graduate", desc: "Final year student or just graduated", val: "graduate" },
      { icon: "🏠", label: "Business Owner", desc: "Running or set to inherit a business", val: "entrepreneur" },
      { icon: "✋", label: "Career Break", desc: "On a break, looking to return stronger", val: "career_break" },
    ],
  },
  {
    key: "time", q: "How many hours per week can you commit to studying?", sub: "Be honest. Overestimating leads to dropouts in semester two.",
    options: [
      { icon: "🕘", label: "Up to 5 hours", desc: "Very tight. Travel, night shifts, or family commitments.", val: "very_limited" },
      { icon: "🕙", label: "5 to 10 hours", desc: "Manageable alongside a regular full-time job.", val: "manageable" },
      { icon: "🕚", label: "10 to 15 hours", desc: "Serious commitment. Evenings and weekends.", val: "committed" },
      { icon: "⚡", label: "15+ hours", desc: "Fully focused. Study is a priority right now.", val: "intensive" },
    ],
  },
  {
    key: "budget", q: "What's your budget for the full programme?", sub: "Total fee over the full 24 months, including all semesters.",
    options: [
      { icon: "💰", label: "Under ₹1 lakh", desc: "Entry-level or state-university programmes", val: "u1" },
      { icon: "💵", label: "₹1 to 2 lakh", desc: "Mainstream band. Symbiosis, NMIMS, Amity, Manipal.", val: "1-2" },
      { icon: "💶", label: "₹2 to 5 lakh", desc: "Premium universities. OP Jindal, Symbiosis top-tier.", val: "2-5" },
      { icon: "🥇", label: "₹5 lakh and above", desc: "Executive formats. IIM-tier programmes.", val: "5plus" },
    ],
  },
  {
    key: "mode", q: "How do you prefer to study?", sub: "There's no right answer. Pick what actually fits your life.",
    options: [
      { icon: "🖥️", label: "Fully online", desc: "Live evening sessions + recorded content. No campus visits.", val: "online" },
      { icon: "📅", label: "Online with weekend classes", desc: "Weekly live sessions, optional weekend contact.", val: "online_weekend" },
      { icon: "📚", label: "Distance mode", desc: "Self-paced study material, periodic sessions, flexible exams.", val: "distance" },
      { icon: "🏛️", label: "Executive or hybrid format", desc: "Intensive weekend or short-term residential immersions.", val: "executive" },
    ],
  },
  {
    key: "spec", q: "Which specialization interests you most?", sub: "If you're unsure, pick 'Not sure yet' and we'll suggest based on your goals.",
    options: [
      { icon: "📢", label: "Marketing & Digital", val: "marketing" },
      { icon: "📈", label: "Finance / Banking", val: "finance" },
      { icon: "👥", label: "Human Resources", val: "hr" },
      { icon: "⚙️", label: "Operations & Supply Chain", val: "operations" },
      { icon: "💻", label: "IT & Project Management", val: "it" },
      { icon: "🏥", label: "Healthcare Management", val: "healthcare" },
      { icon: "🌟", label: "General / Executive MBA", val: "general" },
      { icon: "🔍", label: "Not sure yet", val: "not_sure" },
    ],
  },
  {
    key: "goal", q: "What's your primary goal from this MBA?", sub: "Be specific. This is what the recommendation optimises for.",
    options: [
      { icon: "🚀", label: "Get promoted in current role", desc: "Managerial credentials within the same company or sector.", val: "promotion" },
      { icon: "↔️", label: "Switch industries", desc: "Move from one sector or function to another.", val: "switch" },
      { icon: "🌍", label: "Start or scale a business", desc: "Finance, ops, and strategy depth for your own venture.", val: "business" },
      { icon: "💲", label: "Higher salary", desc: "Salary uplift as the main driver. Role is secondary.", val: "salary" },
    ],
  },
];

// ─── Counsellors ──────────────────────────────────────────────────────────────
const COUNSELLORS = [
  { initials: "NP", name: "Nikhita P. Deshmukh", title: "Founder & Senior Counsellor", tags: ["Online MBA", "Executive"], bio: "10 years in higher-education advisory. Personally counselled over 4,000 aspirants. MBA graduate. Specialises in executive-track and IIM-tier programme guidance.", avail: "Available today", availColor: "#1B5E20", availBg: "#E8F5EA" },
  { initials: "RS", name: "Rahul Sharma", title: "Senior Counsellor, Distance MBA", tags: ["Distance MBA", "Marketing", "Finance"], bio: "7 years in distance education advisory. Former admissions officer at NMIMS. Specialises in working-professional profiles with budget constraints and career-switch goals.", avail: "Available today", availColor: "#1B5E20", availBg: "#E8F5EA" },
  { initials: "AP", name: "Anjali Patil", title: "Counsellor, Online MBA", tags: ["Online MBA", "HR", "Healthcare"], bio: "5 years in higher-education counselling. MBA from Symbiosis. Specialises in female professional re-entry, HR specialization, and first-generation MBA aspirants.", avail: "Available from 4 pm", availColor: "#E65100", availBg: "#FFF8E1" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is counselling really free? What's the catch?", a: "Genuinely free. We earn a referral fee from universities when a student enrols through us. You pay nothing extra for this, and it never inflates the fee shown to you. The university pays us from their marketing budget." },
  { q: "Will I get multiple sales calls after I enquire?", a: "No. One call from a senior counsellor, one WhatsApp follow-up if you don't pick up, and then we stop unless you reach back out. We've built this discipline into our CRM." },
  { q: "Can the AI Counsellor replace talking to a human?", a: "For a first-cut recommendation, yes. For finalising a decision involving fees of 1 to 6 lakh and 24 months of your life, no. The AI Counsellor gives you a structured shortlist in 2 minutes. The human counsellor stress-tests that shortlist and answers questions the AI can't." },
  { q: "What if I want to compare programmes from universities not on your portal?", a: "Ask your counsellor directly. We'll give you an honest assessment even of programmes we don't list, if they're genuinely the right fit for you." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CounsellingPage() {
  const [view, setView] = useState<View>("hub");
  const [currentQ, setCurrentQ] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<{ prog: Programme; score: number }[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Hub human-path form
  const [hubName, setHubName] = useState("");
  const [hubMobile, setHubMobile] = useState("");
  const [hubEmail, setHubEmail] = useState("");
  const [hubProg, setHubProg] = useState("");
  const [hubSubmitting, setHubSubmitting] = useState(false);
  const [hubSuccess, setHubSuccess] = useState(false);

  // AI handoff form
  const [hoName, setHoName] = useState("");
  const [hoMobile, setHoMobile] = useState("");
  const [hoEmail, setHoEmail] = useState("");
  const [hoTime, setHoTime] = useState("As soon as possible");
  const [hoConsent, setHoConsent] = useState(false);
  const [hoSubmitting, setHoSubmitting] = useState(false);
  const [hoError, setHoError] = useState("");

  const hubFormRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);

  function startWizard() {
    setAnswers({});
    setCurrentQ(1);
    setView("wizard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectOption(key: string, val: string) {
    const newAnswers = { ...answers, [key]: val };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < 6) setCurrentQ(currentQ + 1);
      else computeResults(newAnswers);
    }, 380);
  }

  function skipQuestion() {
    if (currentQ < 6) setCurrentQ(currentQ + 1);
    else computeResults(answers);
  }

  function computeResults(ans: Answers) {
    setView("loading");
    setTimeout(() => {
      const scored = PROGRAMMES.map(p => ({ prog: p, score: scoreProgramme(p, ans) }));
      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 3));
      setView("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2200);
  }

  function restart() {
    setAnswers({});
    setCurrentQ(1);
    setResults([]);
    setHoName(""); setHoMobile(""); setHoEmail(""); setHoConsent(false); setHoError("");
    setView("hub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitHubForm(e: React.FormEvent) {
    e.preventDefault();
    if (!hubName.trim() || !hubMobile.trim() || !hubEmail.trim()) return;
    setHubSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: hubName, mobile: hubMobile, email: hubEmail, city: "Online", courseInterested: hubProg, consent: true, source: "counselling-hub", landingPage: typeof window !== "undefined" ? window.location.href : "" }),
      });
      setHubSuccess(true);
    } catch { /* noop */ }
    setHubSubmitting(false);
  }

  async function submitHandoff(e: React.FormEvent) {
    e.preventDefault();
    if (!hoName.trim() || !hoMobile.trim() || !hoEmail.trim()) { setHoError("Please fill in all required fields."); return; }
    if (!hoConsent) { setHoError("Please accept the consent to continue."); return; }
    setHoError("");
    setHoSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: hoName, mobile: hoMobile, email: hoEmail, city: "Online", courseInterested: results[0]?.prog.name ?? "", consent: true, source: "ai-counsellor", landingPage: typeof window !== "undefined" ? window.location.href : "" }),
      });
      setView("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setHoError("Something went wrong. Please try again.");
    }
    setHoSubmitting(false);
  }

  const progressPct = view === "wizard" ? ((currentQ - 1) / 6) * 100 : view === "results" ? 100 : 0;
  const qData = QUESTIONS[currentQ - 1];

  // ── Shared styles ──────────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1px solid var(--pale-navy)", borderRadius: "var(--radius-md)", background: "var(--white)", fontSize: 15, fontFamily: "var(--font-sans)", color: "var(--charcoal)", outline: "none" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--navy)", marginBottom: 6 };

  return (
    <div>

      {/* ══════════════════════════════════════════════════════════════════════
          HUB VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {view === "hub" && (
        <>
          {/* Breadcrumb */}
          <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
            <div className="container" style={{ paddingTop: 10, paddingBottom: 10 }}>
              <nav style={{ fontSize: 12, color: "var(--grey)", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                <a href="/" style={{ color: "var(--grey)" }}>Home</a>
                <span style={{ color: "var(--pale-navy)" }}>/</span>
                <span style={{ color: "var(--navy)", fontWeight: 500 }}>Counselling</span>
              </nav>
            </div>
          </div>

          {/* Hero */}
          <section style={{ background: "var(--ivory)", padding: "56px 0 64px" }}>
            <div className="container" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>FREE COUNSELLING</div>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.08, color: "var(--navy)", marginBottom: 20 }}>Two ways to get your next step right.</h1>
              <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--charcoal)", lineHeight: 1.6, maxWidth: 620, margin: "0 auto 48px" }}>Whether you want an instant AI-powered recommendation or a real conversation with a senior counsellor, both are free, both are pressure-free, and both take under 30 minutes.</p>

              {/* Dual-path cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 960, margin: "0 auto" }}>
                {/* AI path */}
                <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)", background: "var(--navy)" }}>
                  <div style={{ padding: "36px 32px 32px", flex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(252,204,0,0.15)", color: "var(--yellow)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-pill)", marginBottom: 20 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                      New
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)", fontSize: "clamp(22px,2.5vw,30px)", lineHeight: 1.2, marginBottom: 16 }}>Let the AI Counsellor recommend three programmes for you.</h3>
                    <p style={{ color: "var(--pale-navy)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>Answer 6 quick questions about your situation, budget, and goals. Get three personalised programme recommendations with a plain-language explanation of why each fits.</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                      {[["2", "Takes 2 minutes"], ["✓", "No email required to see results"], ["✓", "Built on our counsellors' decision logic"], ["✓", "Save your shortlist for later"]].map(([tick, text]) => (
                        <li key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--pale-navy)" }}>
                          <span style={{ width: 20, height: 20, background: "var(--yellow)", color: "var(--navy)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{tick}</span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "24px 32px" }}>
                    <button onClick={startWizard} className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Start the AI Counsellor
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </button>
                    <small style={{ display: "block", color: "var(--pale-navy)", fontSize: 12, marginTop: 10 }}>Your answers are private. We don't store them without your consent.</small>
                  </div>
                </div>

                {/* Human path */}
                <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)", background: "var(--white)" }}>
                  <div style={{ padding: "36px 32px 32px", flex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--pale-navy)", color: "var(--navy)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-pill)", marginBottom: 20 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg>
                      Senior counsellor
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(22px,2.5vw,30px)", lineHeight: 1.2, marginBottom: 16 }}>Talk to a senior counsellor within 30 minutes.</h3>
                    <p style={{ color: "var(--charcoal)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>A real counsellor, with at least 5 years' experience and typically an MBA themselves, calls you back within 30 minutes during working hours. The first call is 30 minutes, entirely about you.</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                      {[["30", "Callback in 30 minutes"], ["✓", "No sales pressure, no hard sell"], ["✓", "Honest comparison, even across competitors"], ["✓", "Help with paperwork after enrolment"]].map(([tick, text]) => (
                        <li key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--charcoal)" }}>
                          <span style={{ width: 20, height: 20, background: "var(--navy)", color: "var(--yellow)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{tick}</span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div ref={hubFormRef} style={{ background: "var(--mist)", padding: "24px 32px" }}>
                    {hubSuccess ? (
                      <div style={{ textAlign: "center", padding: "16px 0" }}>
                        <div style={{ fontSize: 32 }}>✓</div>
                        <p style={{ fontWeight: 700, color: "var(--navy)", marginTop: 8 }}>Received. A counsellor will call within 30 minutes.</p>
                      </div>
                    ) : (
                      <form onSubmit={submitHubForm} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input required value={hubName} onChange={e => setHubName(e.target.value)} placeholder="Full name *" style={{ ...inputStyle, fontSize: 14 }} />
                        <input required value={hubMobile} onChange={e => setHubMobile(e.target.value)} placeholder="Mobile number *" type="tel" style={{ ...inputStyle, fontSize: 14 }} />
                        <input required value={hubEmail} onChange={e => setHubEmail(e.target.value)} placeholder="Email address *" type="email" style={{ ...inputStyle, fontSize: 14 }} />
                        <select value={hubProg} onChange={e => setHubProg(e.target.value)} style={{ ...inputStyle, fontSize: 14 }}>
                          <option value="">Programme of interest</option>
                          <option>Online MBA</option><option>Distance MBA</option><option>Executive MBA</option><option>Design Programmes</option><option>Not sure yet</option>
                        </select>
                        <button type="submit" disabled={hubSubmitting} className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          {hubSubmitting ? "Sending…" : "Call Me Back in 30 Minutes"}
                          {!hubSubmitting && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
                        </button>
                        <small style={{ color: "var(--grey)", fontSize: 12 }}>Mon to Sat, 9 am to 8 pm. No spam. Unsubscribe anytime.</small>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust strip */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 20px", fontSize: 13, color: "var(--grey)" }}>
                  <span style={{ color: "var(--yellow)", fontSize: 14, letterSpacing: 2 }}>★ ★ ★ ★ ★</span>
                  <span>4.8 / 5 average counsellor rating</span>
                  <span style={{ color: "var(--pale-navy)", fontWeight: 700 }}>·</span>
                  <span>12,000+ learners counselled since 2023</span>
                  <span style={{ color: "var(--pale-navy)", fontWeight: 700 }}>·</span>
                  <span>Free. Always.</span>
                </div>
              </div>
            </div>
          </section>

          {/* How counselling works */}
          <section style={{ background: "var(--white)", padding: "56px 0" }}>
            <div className="container">
              <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>THE PROCESS</div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px,3.5vw,38px)", color: "var(--navy)", marginBottom: 14 }}>How we work with every aspirant</h2>
                <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "0 auto" }}></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
                {[
                  { n: "01", t: "You enquire", b: "Through the form above, our AI Counsellor, or by calling +91 7350 460 393. Callback within 30 minutes during working hours." },
                  { n: "02", t: "We listen first", b: "Your situation, your goals, your constraints. We don't recommend programmes in the first call. We understand the person first." },
                  { n: "03", t: "We compare honestly", b: "Three programme options with full fee disclosure, accreditation status, and a clear 'why this fits you' explanation. If one of them isn't us, we'll tell you." },
                  { n: "04", t: "We help you apply", b: "Paperwork, documentation, EMI options. After enrolment, we stay in touch through the first semester to make sure the choice was right." },
                ].map(s => (
                  <div key={s.n} style={{ background: "var(--white)", border: "1px solid var(--mist)", borderRadius: "var(--radius-md)", padding: "28px 24px" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 56, color: "var(--yellow)", lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{s.t}</h4>
                    <p style={{ fontSize: 14, color: "var(--grey)", marginBottom: 0 }}>{s.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Counsellor profiles */}
          <section style={{ background: "var(--ivory)", padding: "56px 0" }}>
            <div className="container">
              <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>OUR TEAM</div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px,3.5vw,38px)", color: "var(--navy)", marginBottom: 14 }}>Meet our senior counsellors</h2>
                <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "0 auto 16px" }}></div>
                <p style={{ color: "var(--grey)", fontSize: 16 }}>Every counsellor has at least 5 years' experience in higher-education advisory, and typically an MBA themselves.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                {COUNSELLORS.map(c => (
                  <div key={c.name} style={{ background: "var(--white)", border: "1px solid var(--mist)", borderRadius: "var(--radius-md)", padding: 28, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--navy)", color: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: 26, border: "3px solid var(--yellow)", marginBottom: 16, flexShrink: 0 }}>{c.initials}</div>
                    <div style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 20, marginBottom: 4 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: "var(--grey)", marginBottom: 12 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
                      {c.tags.map((t, i) => <span key={t} style={{ background: i === 0 ? "var(--yellow)" : "var(--pale-navy)", color: "var(--navy)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 3 }}>{t}</span>)}
                    </div>
                    <p style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{c.bio}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: c.availColor, background: c.availBg, padding: "4px 10px", borderRadius: "var(--radius-pill)", marginBottom: 16, fontWeight: 600 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.availColor }}></span>
                      {c.avail}
                    </span>
                    <button onClick={() => hubFormRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-sm" style={{ width: "100%" }}>Book with {c.name.split(" ")[0]}</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Promise box */}
          <section style={{ background: "var(--white)", padding: "56px 0" }}>
            <div className="container" style={{ maxWidth: 900 }}>
              <div style={{ background: "var(--navy)", borderRadius: "var(--radius-lg)", padding: 40 }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--yellow)", fontSize: "clamp(22px,2.5vw,28px)", marginBottom: 24 }}>What you&apos;ll never hear from us</h3>
                <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                  {[
                    '"Limited seats" or "last batch" pressure tactics. There\'s always another batch.',
                    '"This is the best programme for everyone." No programme is.',
                    'Aggressive multi-call follow-ups. One call, one WhatsApp, then we wait for you.',
                    'Hidden charges or surprise fees beyond the original quote.',
                    'A push toward partner programmes when a non-partner fits you better.',
                    'A recommendation without first understanding your situation.',
                  ].map(t => (
                    <li key={t} style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 15, color: "var(--pale-navy)", lineHeight: 1.5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--yellow)", marginTop: 8, flexShrink: 0 }}></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ background: "var(--ivory)", padding: "56px 0" }}>
            <div className="container" style={{ maxWidth: 800 }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>COMMON QUESTIONS</div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px,3.5vw,38px)", color: "var(--navy)", marginBottom: 14 }}>About our counselling process</h2>
                <div style={{ width: 48, height: 3, background: "var(--yellow)", margin: "0 auto" }}></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ border: "1px solid var(--mist)", borderRadius: "var(--radius-md)", background: "var(--ivory)", overflow: "hidden", borderColor: openFaq === i ? "var(--pale-navy)" : "var(--mist)" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontWeight: 600, color: "var(--navy)", fontSize: 15, lineHeight: 1.4, textAlign: "left", background: "none", border: "none" }}>
                      {faq.q}
                      <span style={{ width: 22, height: 22, background: "var(--yellow)", color: "var(--navy)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                    </button>
                    {openFaq === i && <div style={{ padding: "0 20px 20px", fontSize: 14, color: "var(--charcoal)", lineHeight: 1.65 }}>{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA band */}
          <div style={{ background: "var(--yellow)", padding: "56px 0", textAlign: "center", borderTop: "4px solid var(--navy)" }}>
            <div className="container">
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(24px,3.5vw,36px)", marginBottom: 12 }}>Not sure which path to take?</h2>
              <p style={{ color: "var(--navy)", fontSize: 17, marginBottom: 28, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>Start with the AI Counsellor. If you want a human to review your results, we&apos;ll call you within 30 minutes.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={startWizard} className="btn" style={{ background: "var(--navy)", color: "var(--yellow)", borderTop: "4px solid var(--yellow)", paddingTop: 9, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Start AI Counsellor
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
                <button onClick={() => hubFormRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn" style={{ background: "transparent", color: "var(--navy)", border: "2px solid var(--navy)", padding: "11px 24px" }}>
                  Talk to a Counsellor
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          WIZARD VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {view === "wizard" && (
        <div style={{ background: "var(--ivory)", minHeight: "60vh", paddingBottom: 64 }}>
          {/* Progress bar */}
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grey)" }}>Your profile</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>Question {currentQ} of 6</span>
            </div>
            <div style={{ height: 6, background: "var(--mist)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "var(--yellow)", borderRadius: "var(--radius-pill)", width: `${progressPct}%`, transition: "width 0.4s ease" }}></div>
            </div>
          </div>

          {/* Question */}
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--yellow)", color: "var(--navy)", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "var(--radius-pill)", marginBottom: 20 }}>
              Question {currentQ} of 6
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px,3.5vw,32px)", color: "var(--navy)", lineHeight: 1.2, marginBottom: 10 }}>{qData.q}</h2>
            <p style={{ fontSize: 15, color: "var(--grey)", marginBottom: 32 }}>{qData.sub}</p>

            <div style={{ display: "grid", gridTemplateColumns: qData.key === "spec" ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {qData.options.map(opt => {
                const isSelected = answers[qData.key as keyof Answers] === opt.val;
                return (
                  <button
                    key={opt.val}
                    onClick={() => selectOption(qData.key, opt.val)}
                    style={{
                      background: isSelected ? "var(--navy)" : "var(--white)",
                      border: `2px solid ${isSelected ? "var(--navy)" : "var(--mist)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "18px 20px",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      minHeight: 80,
                      position: "relative",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{opt.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: isSelected ? "var(--ivory)" : "var(--navy)", lineHeight: 1.3 }}>{opt.label}</span>
                    {"desc" in opt && opt.desc && <span style={{ fontSize: 13, color: isSelected ? "var(--pale-navy)" : "var(--grey)", lineHeight: 1.4 }}>{opt.desc}</span>}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
              {currentQ > 1 ? (
                <button onClick={() => setCurrentQ(currentQ - 1)} style={{ color: "var(--grey)", fontSize: 14, fontWeight: 500, padding: "8px 0", display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                  ← Back
                </button>
              ) : <span></span>}
              <button onClick={skipQuestion} style={{ fontSize: 13, color: "var(--grey)", padding: "8px 0", background: "none", border: "none", cursor: "pointer" }}>
                Skip this question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LOADING VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {view === "loading" && (
        <div style={{ padding: "80px 20px", textAlign: "center", background: "var(--ivory)", minHeight: "60vh" }}>
          <div style={{ width: 56, height: 56, border: "4px solid var(--pale-navy)", borderTopColor: "var(--yellow)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 24px" }}></div>
          <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 24, marginBottom: 8 }}>Personalising your recommendations…</h3>
          <p style={{ color: "var(--grey)", fontSize: 15 }}>Matching your profile to 47 verified programmes</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          RESULTS VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {view === "results" && (
        <div style={{ background: "var(--ivory)", padding: "48px 0 64px" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: 640, marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 12 }}>YOUR RECOMMENDATIONS</div>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(26px,3.5vw,36px)", marginBottom: 12 }}>Your 3 personalised programme matches</h2>
            <p style={{ color: "var(--grey)", fontSize: 16, marginBottom: 12 }}>Based on your answers, these programmes offer the best combination of fit, accreditation, fees, and career outcomes for your situation.</p>
            <button onClick={restart} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--grey)", background: "none", border: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Start again with different answers
            </button>
          </div>

          {/* Result cards */}
          <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 960 }}>
            {results.map(({ prog }, i) => {
              const isBest = i === 0;
              const rankLabels = ["Top Pick", "Strong Alternative", "Also Consider"];
              return (
                <article key={prog.id} style={{ background: "var(--white)", border: `${isBest ? 3 : 2}px solid ${isBest ? "var(--yellow)" : "var(--mist)"}`, borderRadius: "var(--radius-lg)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", transition: "transform 0.18s, box-shadow 0.18s" }}>
                  {isBest && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--yellow)", color: "var(--navy)", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: "0 0 var(--radius-md) var(--radius-md)", whiteSpace: "nowrap" }}>Best Fit For You</div>}
                  <div style={{ background: isBest ? "var(--yellow)" : "var(--navy)", padding: "12px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: isBest ? "var(--navy)" : "var(--yellow)", lineHeight: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isBest ? "rgba(36,48,72,0.6)" : "var(--pale-navy)" }}>{rankLabels[i]}</span>
                  </div>
                  <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 18, lineHeight: 1.2, marginBottom: 6 }}>{prog.name}</div>
                    <div style={{ fontSize: 13, color: "var(--charcoal)", marginBottom: 12 }}>{prog.uni}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {prog.accreditations.map(a => <span key={a} style={{ background: "#E8F5EA", color: "#1B5E20", border: "1px solid #A5D6A7", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 3 }}>{a}</span>)}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, padding: "12px 0", borderTop: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)", marginBottom: 16 }}>
                      {[["Duration", prog.duration], ["Fee", prog.feeDisplay], ["Batch", prog.batch]].map(([label, val]) => (
                        <div key={label} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey)", marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "var(--pale-navy)", borderRadius: "var(--radius-md)", padding: 14, marginBottom: 16, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--yellow)" }}></span>
                        Why this fits you
                      </div>
                      <div style={{ fontSize: 13, color: "var(--navy)", lineHeight: 1.5 }}>{whyFits(prog, answers)}</div>
                    </div>
                    <button onClick={() => handoffRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-sm" style={{ width: "100%" }}>Get Counsellor Review</button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Hand-off form */}
          <div ref={handoffRef} style={{ background: "var(--white)", maxWidth: 640, margin: "40px auto 0", padding: 36, borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", borderTop: "4px solid var(--yellow)" }} className="mx-4 lg:mx-auto">
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 22, marginBottom: 8 }}>Want help finalising your choice?</h3>
              <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.5 }}>A senior counsellor will review your recommendations with you in a free 30-minute call. They&apos;ll have seen your shortlist before they dial.</p>
            </div>
            <form onSubmit={submitHandoff}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Full Name <span style={{ color: "#B83A2A" }}>*</span></label>
                <input value={hoName} onChange={e => setHoName(e.target.value)} placeholder="e.g. Priya Sharma" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Mobile <span style={{ color: "#B83A2A" }}>*</span></label>
                  <input value={hoMobile} onChange={e => setHoMobile(e.target.value)} type="tel" placeholder="+91 98XXX XXXXX" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email <span style={{ color: "#B83A2A" }}>*</span></label>
                  <input value={hoEmail} onChange={e => setHoEmail(e.target.value)} type="email" placeholder="you@email.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Best time to call</label>
                <select value={hoTime} onChange={e => setHoTime(e.target.value)} style={inputStyle}>
                  <option>As soon as possible</option>
                  <option>Today evening (after 6 pm)</option>
                  <option>Tomorrow morning</option>
                  <option>This weekend</option>
                </select>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "var(--grey)", marginBottom: 16, lineHeight: 1.5, cursor: "pointer" }}>
                <input type="checkbox" checked={hoConsent} onChange={e => setHoConsent(e.target.checked)} style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)" }} />
                <span>I agree to be contacted by CollegeNCourses. My shortlist and answers will be shared with the counsellor before the call. We never sell your data.</span>
              </label>
              {hoError && <p style={{ color: "#B83A2A", fontSize: 13, marginBottom: 12 }}>{hoError}</p>}
              <button type="submit" disabled={hoSubmitting} className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {hoSubmitting ? "Sending…" : "Schedule My Free Counsellor Call"}
                {!hoSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
              </button>
              <p style={{ fontSize: 12, color: "var(--grey)", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>Mon to Sat, 9 am to 8 pm. Callback within 30 minutes. No spam, no hard sell.</p>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          SUCCESS VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {view === "success" && (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--ivory)", minHeight: "60vh" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--yellow)", color: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, fontWeight: 800 }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 26, marginBottom: 12 }}>You&apos;re all set.</h2>
          <p style={{ color: "var(--grey)", fontSize: 15, marginBottom: 8 }}>A senior counsellor will call you within 30 minutes. They&apos;ve already seen your 3 programme matches.</p>
          <p style={{ color: "var(--grey)", fontSize: 15, marginBottom: 28 }}>We&apos;ve sent a confirmation to your mobile and email.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/917350460393" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Add on WhatsApp
            </a>
            <button onClick={restart} style={{ fontSize: 15, color: "var(--grey)", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
