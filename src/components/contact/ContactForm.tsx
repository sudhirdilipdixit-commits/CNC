"use client";

import { useState } from "react";

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  courseInterested: string;
  mode: string;
  preferredStart: string;
  callTime: string;
  message: string;
  consent: boolean;
}

const EMPTY: FormData = {
  name: "", mobile: "", email: "", city: "",
  courseInterested: "", mode: "", preferredStart: "",
  callTime: "As soon as possible", message: "", consent: false,
};

function getUTMParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") || "",
    utmMedium: p.get("utm_medium") || "",
    utmCampaign: p.get("utm_campaign") || "",
    utmContent: p.get("utm_content") || "",
    utmTerm: p.get("utm_term") || "",
    gclidFbclid: p.get("gclid") || p.get("fbclid") || "",
    landingPage: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    browser: navigator.userAgent.includes("Chrome") ? "Chrome"
      : navigator.userAgent.includes("Firefox") ? "Firefox"
      : navigator.userAgent.includes("Safari") ? "Safari" : "Other",
  };
}

const ff: React.CSSProperties = { marginBottom: 16 };
const label: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase",
  color: "var(--navy)", marginBottom: 6,
};
const input: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  border: "1px solid var(--pale-navy)", borderRadius: "var(--radius-md)",
  background: "var(--white)", fontSize: 15,
  fontFamily: "var(--font-sans)", color: "var(--charcoal)",
};
const hint: React.CSSProperties = { fontSize: 12, color: "var(--grey)", marginTop: 4 };

export default function ContactForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [enquiryId, setEnquiryId] = useState<string | null>(null);

  const set = (k: keyof FormData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validateStep(s: Step) {
    const e: typeof errors = {};
    if (s === 1) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
      if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.city.trim() || form.city.trim().length < 2) e.city = "Please enter your city";
    }
    if (s === 3) {
      if (!form.consent) e.consent = "Please accept to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  }
  function back() { setStep((s) => (s > 1 ? ((s - 1) as Step) : s)); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(3)) return;
    setSubmitting(true);
    try {
      const extra = getUTMParams();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          city: form.city,
          courseInterested: [form.courseInterested, form.mode, form.preferredStart, form.callTime, form.message]
            .filter(Boolean).join(" | "),
          consent: form.consent,
          source: "contact-page",
          ...extra,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setEnquiryId(json.id || "XXXXX");
      } else {
        setErrors({ consent: json.error || "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ consent: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success state ──
  if (enquiryId) {
    return (
      <div style={{ padding: "36px 28px", textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "var(--yellow)", color: "var(--navy)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: 28, fontWeight: 800,
        }}>✓</div>
        <div style={{
          fontFamily: "var(--font-serif)", color: "var(--navy)",
          fontSize: 24, marginBottom: 10,
        }}>Thank you. We&apos;ve got your enquiry.</div>
        <div style={{
          display: "inline-block", background: "var(--pale-navy)",
          color: "var(--navy)", padding: "7px 16px",
          borderRadius: "var(--radius-md)", fontWeight: 700,
          fontSize: 14, letterSpacing: "0.06em", margin: "10px 0 16px",
        }}>
          CNC-2026-{enquiryId}
        </div>
        <p style={{ color: "var(--grey)", fontSize: 14 }}>
          A senior counsellor will call you within 30 minutes during working
          hours. Confirmation sent by SMS and WhatsApp.
        </p>
        <a href="/" style={{
          color: "var(--navy)", fontWeight: 600, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12,
        }}>← Back to homepage</a>
      </div>
    );
  }

  const dotStyle = (n: Step): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, flexShrink: 0,
    background: step > n ? "#2A7A3A" : step === n ? "var(--yellow)" : "var(--mist)",
    color: step > n ? "#fff" : step === n ? "var(--navy)" : "var(--grey)",
    transition: "background 0.2s, color 0.2s",
  });

  const lineStyle = (n: Step): React.CSSProperties => ({
    flex: 1, height: 2, margin: "0 4px",
    background: step > n ? "#2A7A3A" : step === n ? "var(--yellow)" : "var(--mist)",
    transition: "background 0.2s",
  });

  const err = (k: keyof FormData) =>
    errors[k] ? <div style={{ fontSize: 12, color: "#B83A2A", marginTop: 4 }}>{errors[k]}</div> : null;

  const inp = (k: keyof FormData): React.CSSProperties => ({
    ...input,
    borderColor: errors[k] ? "#B83A2A" : "var(--pale-navy)",
  });

  return (
    <form onSubmit={submit} noValidate>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
        <div style={dotStyle(1)}>{step > 1 ? "✓" : "1"}</div>
        <div style={lineStyle(1)} />
        <div style={dotStyle(2)}>{step > 2 ? "✓" : "2"}</div>
        <div style={lineStyle(2)} />
        <div style={dotStyle(3)}>3</div>
      </div>

      {/* Step 1: Identity */}
      {step === 1 && (
        <div>
          <div style={ff}>
            <label style={label}>Full Name <span style={{ color: "#B83A2A" }}>*</span></label>
            <input style={inp("name")} type="text" value={form.name} placeholder="e.g. Priya Sharma"
              onChange={(e) => set("name", e.target.value)} />
            {err("name")}
          </div>
          <div style={ff}>
            <label style={label}>Mobile <span style={{ color: "#B83A2A" }}>*</span></label>
            <input style={inp("mobile")} type="tel" value={form.mobile} placeholder="98XXX XXXXX"
              onChange={(e) => set("mobile", e.target.value)} />
            <div style={hint}>We&apos;ll call you on this number.</div>
            {err("mobile")}
          </div>
          <div style={ff}>
            <label style={label}>Email <span style={{ color: "#B83A2A" }}>*</span></label>
            <input style={inp("email")} type="email" value={form.email} placeholder="you@email.com"
              onChange={(e) => set("email", e.target.value)} />
            {err("email")}
          </div>
          <div style={ff}>
            <label style={label}>City <span style={{ color: "#B83A2A" }}>*</span></label>
            <input style={inp("city")} type="text" value={form.city} placeholder="e.g. Mumbai"
              onChange={(e) => set("city", e.target.value)} />
            {err("city")}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <button type="button" onClick={next} className="btn btn-primary">
              Next: Your Interest{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Interest */}
      {step === 2 && (
        <div>
          <div style={ff}>
            <label style={label}>Programme of interest</label>
            <select style={inp("courseInterested")} value={form.courseInterested}
              onChange={(e) => set("courseInterested", e.target.value)}>
              <option value="">Choose</option>
              <option>Online MBA</option>
              <option>Distance MBA</option>
              <option>Executive MBA</option>
              <option>Design Programmes</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={ff}>
              <label style={label}>Mode</label>
              <select style={input} value={form.mode} onChange={(e) => set("mode", e.target.value)}>
                <option value="">Any</option>
                <option>Fully online</option>
                <option>Hybrid</option>
                <option>Distance</option>
              </select>
            </div>
            <div style={ff}>
              <label style={label}>Preferred start</label>
              <select style={input} value={form.preferredStart} onChange={(e) => set("preferredStart", e.target.value)}>
                <option>Anytime</option>
                <option>Next available</option>
                <option>3 to 6 months</option>
                <option>Later</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, gap: 12 }}>
            <button type="button" onClick={back}
              style={{ color: "var(--grey)", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
              ← Back
            </button>
            <button type="button" onClick={next} className="btn btn-primary">
              Next: Schedule Call{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && (
        <div>
          <div style={ff}>
            <label style={label}>When should we call?</label>
            <select style={input} value={form.callTime} onChange={(e) => set("callTime", e.target.value)}>
              <option>As soon as possible</option>
              <option>Today evening (after 6 pm)</option>
              <option>Tomorrow morning</option>
              <option>This weekend</option>
            </select>
          </div>
          <div style={ff}>
            <label style={label}>
              Anything else?{" "}
              <span style={{ color: "var(--grey)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 11 }}>
                (optional)
              </span>
            </label>
            <textarea
              style={{ ...input, minHeight: 80, resize: "vertical" as const }}
              value={form.message}
              placeholder="A specific programme, a question, a constraint..."
              onChange={(e) => set("message", e.target.value)}
            />
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "var(--grey)", marginBottom: 14, lineHeight: 1.5, cursor: "pointer" }}>
            <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
              style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)" }} />
            <span>I agree to be contacted by CollegeNCourses about my enquiry. We never sell or share your data.</span>
          </label>
          {err("consent")}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, gap: 12 }}>
            <button type="button" onClick={back}
              style={{ color: "var(--grey)", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
              ← Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit My Enquiry"}{" "}
              {!submitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
