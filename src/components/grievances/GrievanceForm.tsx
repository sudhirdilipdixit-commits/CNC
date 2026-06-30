"use client";

import { useState, useRef } from "react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  enquiryId: string;
  category: string;
  description: string;
  consent: boolean;
}

const EMPTY: FormData = {
  name: "", email: "", mobile: "", enquiryId: "",
  category: "", description: "", consent: false,
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 16,
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase",
  color: "var(--navy)", marginBottom: 6,
};

const inputBase: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  border: "1px solid var(--pale-navy)",
  borderRadius: "var(--radius-md)",
  background: "var(--white)", fontSize: 15,
  fontFamily: "var(--font-sans)", color: "var(--charcoal)",
  transition: "border-color 0.15s",
};

const optLabel: React.CSSProperties = {
  color: "var(--grey)", fontWeight: 400,
  fontSize: 11, textTransform: "none",
  letterSpacing: 0,
};

function genRef(): string {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export default function GrievanceForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.category) e.category = "Please select a category";
    if (!form.description.trim() || form.description.trim().length < 10)
      e.description = "Please describe the issue (at least 10 characters)";
    if (!form.consent) e.consent = "Please confirm before submitting";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setRef(genRef());
    setSubmitting(false);
  }

  const inp = (k: keyof FormData): React.CSSProperties => ({
    ...inputBase,
    borderColor: errors[k] ? "#B83A2A" : "var(--pale-navy)",
  });

  const err = (k: keyof FormData) =>
    errors[k]
      ? <div style={{ fontSize: 12, color: "#B83A2A", marginTop: 4 }}>{errors[k]}</div>
      : null;

  // Success state
  if (ref) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
        <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: 20, marginBottom: 8 }}>
          Grievance submitted successfully
        </h3>
        <div style={{
          display: "inline-block", background: "var(--pale-navy)",
          color: "var(--navy)", padding: "6px 14px",
          borderRadius: "var(--radius-md)", fontWeight: 700,
          fontSize: 13, margin: "10px 0 16px",
        }}>
          Ref: GRV-2026-{ref}
        </div>
        <p style={{ color: "var(--grey)", fontSize: 14, maxWidth: 440, margin: "0 auto" }}>
          We have received your grievance and will acknowledge it within 24 hours
          by email. If you do not receive an acknowledgement, please write to{" "}
          <a href="mailto:grievances@collegencourses.com"
            style={{ color: "var(--navy)", fontWeight: 600 }}>
            grievances@collegencourses.com
          </a>{" "}
          with your reference number.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Full Name */}
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Full Name <span style={{ color: "#B83A2A" }}>*</span>
        </label>
        <input style={inp("name")} type="text" value={form.name}
          placeholder="As per your enquiry record"
          onChange={(e) => set("name", e.target.value)} />
        {err("name")}
      </div>

      {/* Email + Mobile row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        className="grv-2col">
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Email <span style={{ color: "#B83A2A" }}>*</span>
          </label>
          <input style={inp("email")} type="email" value={form.email}
            placeholder="your@email.com"
            onChange={(e) => set("email", e.target.value)} />
          {err("email")}
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Mobile <span style={optLabel}>(optional)</span>
          </label>
          <input style={inputBase} type="tel" value={form.mobile}
            placeholder="+91 98XXX XX XX"
            onChange={(e) => set("mobile", e.target.value)} />
        </div>
      </div>

      {/* Enquiry ID */}
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Enquiry ID <span style={optLabel}>(if applicable)</span>
        </label>
        <input style={inputBase} type="text" value={form.enquiryId}
          placeholder="CNC-2026-XXXXX"
          onChange={(e) => set("enquiryId", e.target.value)} />
      </div>

      {/* Category */}
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Category of grievance <span style={{ color: "#B83A2A" }}>*</span>
        </label>
        <select style={inp("category")} value={form.category}
          onChange={(e) => set("category", e.target.value)}>
          <option value="">Select category</option>
          <option>Counselling quality</option>
          <option>Misleading or inaccurate programme information</option>
          <option>Sales pressure or repeated follow-up</option>
          <option>Programme was not as described</option>
          <option>Data privacy concern</option>
          <option>Billing or fee dispute</option>
          <option>Other</option>
        </select>
        {err("category")}
      </div>

      {/* Description */}
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Description of grievance <span style={{ color: "#B83A2A" }}>*</span>
        </label>
        <textarea
          style={{ ...inp("description"), minHeight: 120, resize: "vertical" as const }}
          value={form.description}
          placeholder="Please describe what happened, when it happened, and what outcome you are seeking. The more detail you provide, the faster we can act."
          onChange={(e) => set("description", e.target.value)}
        />
        {err("description")}
      </div>

      {/* File upload */}
      <div style={fieldStyle}>
        <label style={labelStyle}>
          Attach supporting documents{" "}
          <span style={optLabel}>(optional, max 5 MB)</span>
        </label>
        <label style={{
          display: "block",
          border: "2px dashed var(--pale-navy)",
          borderRadius: "var(--radius-md)",
          padding: "20px", textAlign: "center",
          color: "var(--grey)", fontSize: 14,
          cursor: "pointer", transition: "border-color 0.15s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--yellow)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pale-navy)")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.75"
            style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          {fileNames.length > 0
            ? fileNames.join(", ")
            : "Click to upload (PDF, JPG, PNG, screenshot)"}
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setFileNames(files.map((f) => f.name));
            }} />
        </label>
      </div>

      {/* Consent */}
      <label style={{
        display: "flex", gap: 8, alignItems: "flex-start",
        fontSize: 12, color: "var(--grey)",
        marginBottom: 14, lineHeight: 1.5, cursor: "pointer",
      }}>
        <input type="checkbox" checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)" }} />
        <span>
          I confirm that the information provided is accurate and I consent to
          CollegeNCourses using this data to investigate and resolve my grievance,
          per their{" "}
          <a href="/privacy-policy" style={{ color: "var(--navy)", fontWeight: 600 }}>
            Privacy Policy
          </a>.
        </span>
      </label>
      {err("consent")}

      <button type="submit" className="btn btn-primary" disabled={submitting}
        style={{ width: "100%", marginTop: 4 }}>
        {submitting ? "Submitting…" : "Submit Grievance"}
        {!submitting && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        )}
      </button>

      <style>{`
        @media (max-width: 540px) {
          .grv-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
