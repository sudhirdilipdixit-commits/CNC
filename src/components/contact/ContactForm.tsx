"use client";

import { useState } from "react";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  message: string;
  consent: boolean;
}

const EMPTY: FormData = {
  name: "", mobile: "", email: "", city: "", message: "", consent: false,
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

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof FormData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.city.trim() || form.city.trim().length < 2) e.city = "Please enter your city";
    if (!form.consent) e.consent = "Please accept to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
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
          courseInterested: form.message,
          consent: form.consent,
          source: "contact-page",
          ...extra,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        const id = `CNC-2026-${json.id || "XXXXX"}`;
        const firstName = encodeURIComponent(form.name.trim().split(" ")[0]);
        window.location.href = `/thank-you/?id=${encodeURIComponent(id)}&name=${firstName}&source=contact`;
        return;
      } else {
        setErrors({ consent: json.error || "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ consent: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const err = (k: keyof FormData) =>
    errors[k] ? <div style={{ fontSize: 12, color: "#B83A2A", marginTop: 4 }}>{errors[k]}</div> : null;

  const inp = (k: keyof FormData): React.CSSProperties => ({
    ...input,
    borderColor: errors[k] ? "#B83A2A" : "var(--pale-navy)",
  });

  return (
    <form onSubmit={submit} noValidate>
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
        <span>
          I agree that CollegeNCourses and the university or institution I am enquiring about
          may contact me by call, WhatsApp, SMS, and email regarding my enquiry, including on
          numbers registered with DND/NDNC, and that my details may be shared with that
          institution&apos;s admissions team so they can assist me.
        </span>
      </label>
      {err("consent")}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit My Enquiry"}{" "}
          {!submitting && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
