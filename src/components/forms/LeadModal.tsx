"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const OTP_ENABLED = process.env.NEXT_PUBLIC_OTP_ENABLED === "true";

const mobileSchema = z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");

const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "Please enter your city"),
  courseInterested: z.string().min(1, "Please select a course"),
  consent: z.boolean().refine((v) => v, "Please accept the Terms and Conditions to continue"),
});

type FormData = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  courseInterested: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type Step = "mobile" | "otp" | "form";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
  title?: string;
}

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

function getBrowser(ua: string) {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  if (/Opera|OPR\//.test(ua)) return "Opera";
  return "Other";
}

const COOKIE_NAME = "cnc_lead_submitted";

export default function LeadModal({
  open,
  onClose,
  source = "modal",
  title = "Talk to a counsellor in 30 minutes",
}: LeadModalProps) {
  const router = useRouter();
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Step state
  const [step, setStep] = useState<Step>(OTP_ENABLED ? "mobile" : "form");

  // Mobile / OTP step state
  const [mobileInput, setMobileInput] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Form step state
  const [data, setData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    city: "",
    courseInterested: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  // Reset all state on open
  useEffect(() => {
    if (open) {
      const hasCookie = document.cookie.includes(COOKIE_NAME + "=true");
      if (hasCookie) {
        setDuplicate(true);
        return;
      }
      setDuplicate(false);
      setStep(OTP_ENABLED ? "mobile" : "form");
      setMobileInput("");
      setMobileError("");
      setOtpInput("");
      setOtpError("");
      setResendCountdown(0);
      setData({ name: "", mobile: "", email: "", city: "", courseInterested: "", consent: false });
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [open]);

  // Focus first input when step changes
  useEffect(() => {
    if (open) setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [step, open]);

  // Resend countdown tick
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  // Close on Escape, lock body scroll
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // ── OTP step handlers ───────────────────────────────────────────────

  const handleSendOtp = async () => {
    const parsed = mobileSchema.safeParse(mobileInput);
    if (!parsed.success) {
      setMobileError(parsed.error.issues[0]?.message ?? "Invalid mobile number");
      return;
    }
    setMobileError("");
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileInput }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMobileError(json.error ?? "Failed to send OTP. Please try again.");
        return;
      }
      setStep("otp");
      setResendCountdown(30);
    } catch {
      setMobileError("Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setOtpInput("");
    setOtpError("");
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileInput }),
      });
      const json = await res.json();
      if (!res.ok) {
        setOtpError(json.error ?? "Failed to resend OTP.");
        return;
      }
      setResendCountdown(30);
    } catch {
      setOtpError("Failed to resend OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpInput.length !== 6) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }
    setOtpError("");
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileInput, otp: otpInput }),
      });
      const json = await res.json();
      if (!res.ok) {
        setOtpError(json.error ?? "Verification failed. Please try again.");
        return;
      }
      // Mobile verified — pre-fill it in the form and lock it
      setData((prev) => ({ ...prev, mobile: mobileInput }));
      setStep("form");
    } catch {
      setOtpError("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  // ── Form step handlers ──────────────────────────────────────────────

  const handleChange = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(data);
    if (!result.success) {
      const errs: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = issue.message;
      });
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...data, ...getUTMParams(), ...getDeviceInfo(), source };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${COOKIE_NAME}=true; expires=${expires}; path=/; SameSite=Lax`;

      if (json.duplicate) {
        setDuplicate(true);
      } else {
        onClose();
        router.push(`/thank-you${json.id ? `?ref=CNC-2026-${json.id}` : ""}`);
      }
    } catch {
      setErrors({ name: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  const maskedMobile = `+91 ${mobileInput.slice(0, 2)}${"•".repeat(6)}${mobileInput.slice(-2)}`;

  return (
    <div
      className="modal-backdrop open"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-hidden="false"
    >
      <div className="modal" role="document">
        {/* Header */}
        <div className="modal-header">
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            ×
          </button>
          <h2 id="modalTitle">{title}</h2>
          <p>Free, no spam, no obligations.</p>
        </div>

        {/* Duplicate message */}
        {duplicate ? (
          <div className="modal-body">
            <div className="modal-step modal-success active">
              <div className="modal-success-icon" aria-hidden="true">✓</div>
              <h2>Already received!</h2>
              <p>Your enquiry has already been received. Our counsellor will contact you shortly.</p>
            </div>
          </div>
        ) : step === "mobile" ? (
          /* ── Step 1: Mobile entry ── */
          <div className="modal-body">
            <div className="modal-step active">
              <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
                We&apos;ll send a one-time password to verify your mobile number.
              </p>
              <div className="form-field">
                <label htmlFor="mobileVerify">
                  Mobile Number <span className="req">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="tel"
                  id="mobileVerify"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={mobileInput}
                  onChange={(e) => {
                    setMobileInput(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setMobileError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                />
                {mobileError && (
                  <div className="hint" style={{ color: "#B83A2A" }}>{mobileError}</div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                disabled={sending}
                onClick={handleSendOtp}
                style={{ width: "100%", marginTop: 8 }}
              >
                {sending ? "Sending…" : "Send OTP"}
                {!sending && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ) : step === "otp" ? (
          /* ── Step 2: OTP entry ── */
          <div className="modal-body">
            <div className="modal-step active">
              <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
                OTP sent to <strong>{maskedMobile}</strong>.{" "}
                <button
                  type="button"
                  onClick={() => { setStep("mobile"); setOtpInput(""); setOtpError(""); }}
                  style={{ background: "none", border: "none", color: "var(--navy, #1a2e4a)", textDecoration: "underline", cursor: "pointer", fontSize: 14, padding: 0 }}
                >
                  Change
                </button>
              </p>
              <div className="form-field">
                <label htmlFor="otpInput">
                  Enter OTP <span className="req">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="otpInput"
                  inputMode="numeric"
                  placeholder="6-digit OTP"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setOtpError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                  style={{ letterSpacing: "0.25em", fontSize: 20, textAlign: "center" }}
                />
                {otpError && (
                  <div className="hint" style={{ color: "#B83A2A" }}>{otpError}</div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                disabled={verifying}
                onClick={handleVerifyOtp}
                style={{ width: "100%", marginTop: 8 }}
              >
                {verifying ? "Verifying…" : "Verify OTP"}
                {!verifying && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              <div style={{ textAlign: "center", marginTop: 14, fontSize: 14 }}>
                {resendCountdown > 0 ? (
                  <span style={{ color: "#888" }}>Resend OTP in {resendCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    disabled={sending}
                    onClick={handleResendOtp}
                    style={{ background: "none", border: "none", color: "var(--navy, #1a2e4a)", textDecoration: "underline", cursor: "pointer", fontSize: 14, padding: 0 }}
                  >
                    {sending ? "Sending…" : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── Step 3: Full form ── */
          <form className="modal-body" noValidate onSubmit={handleSubmit}>
            <div className="modal-step active">
              {/* Name + Mobile */}
              <div className="form-field-row">
                <div className="form-field">
                  <label htmlFor="leadName">
                    Name <span className="req">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="leadName"
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. Priya Sharma"
                    value={data.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && <div className="hint" style={{ color: "#B83A2A" }}>{errors.name}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="leadMobile">
                    Mobile Number <span className="req">*</span>
                    {OTP_ENABLED && (
                      <span style={{ marginLeft: 6, fontSize: 12, color: "#2a7a4e", fontWeight: 600 }}>✓ Verified</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    id="leadMobile"
                    name="mobile"
                    autoComplete="tel"
                    placeholder="10-digit number"
                    value={data.mobile}
                    readOnly={OTP_ENABLED}
                    onChange={
                      OTP_ENABLED
                        ? undefined
                        : (e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    style={OTP_ENABLED ? { background: "#f5f5f5", cursor: "default" } : undefined}
                  />
                  {errors.mobile && <div className="hint" style={{ color: "#B83A2A" }}>{errors.mobile}</div>}
                </div>
              </div>

              {/* Email + City */}
              <div className="form-field-row">
                <div className="form-field">
                  <label htmlFor="leadEmail">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="leadEmail"
                    name="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={data.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && <div className="hint" style={{ color: "#B83A2A" }}>{errors.email}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="leadCity">
                    City <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="leadCity"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="e.g. Pune"
                    value={data.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                  {errors.city && <div className="hint" style={{ color: "#B83A2A" }}>{errors.city}</div>}
                </div>
              </div>

              {/* Course Interested */}
              <div className="form-field">
                <label htmlFor="leadCourse">
                  Course Interested In <span className="req">*</span>
                </label>
                <select
                  id="leadCourse"
                  name="courseInterested"
                  value={data.courseInterested}
                  onChange={(e) => handleChange("courseInterested", e.target.value)}
                >
                  <option value="">Select a programme</option>
                  <option>Online MBA</option>
                  <option>Distance MBA</option>
                  <option>Executive MBA</option>
                  <option>MBA in Marketing</option>
                  <option>MBA in Finance</option>
                  <option>MBA in HR</option>
                  <option>MBA in Operations</option>
                  <option>MBA in IT &amp; Project Management</option>
                  <option>MBA in Healthcare</option>
                  <option>Design Programmes</option>
                  <option>Not sure yet</option>
                </select>
                {errors.courseInterested && (
                  <div className="hint" style={{ color: "#B83A2A" }}>{errors.courseInterested}</div>
                )}
              </div>

              {/* Consent */}
              <label className="consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={data.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                />
                <span>
                  I Accept the{" "}
                  <a href="/terms-and-conditions" style={{ color: "var(--navy)", textDecoration: "underline" }}>
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {errors.consent && (
                <div className="hint" style={{ color: "#B83A2A", marginBottom: 8 }}>{errors.consent}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: "100%", marginTop: 8 }}
              >
                {submitting ? "Submitting…" : "Get Free Counselling"}{" "}
                {!submitting && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
