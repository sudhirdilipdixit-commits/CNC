"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const OTP_ENABLED = process.env.NEXT_PUBLIC_OTP_ENABLED === "true";

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
  const nameRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  // Mobile / OTP state
  const [mobileInput, setMobileInput] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Close warning — shown when user tries to close with OTP pending
  const [showCloseWarning, setShowCloseWarning] = useState(false);

  // Form state
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

  // Reset all state on modal open
  useEffect(() => {
    if (open) {
      const hasCookie = document.cookie.includes(COOKIE_NAME + "=true");
      if (hasCookie) {
        setDuplicate(true);
        return;
      }
      setDuplicate(false);
      setMobileInput("");
      setMobileError("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtpInput("");
      setOtpError("");
      setResendCountdown(0);
      setShowCloseWarning(false);
      setData({ name: "", mobile: "", email: "", city: "", courseInterested: "", consent: false });
      setErrors({});
      setTimeout(() => nameRef.current?.focus(), 200);
    }
  }, [open]);

  // Focus OTP input when OTP section appears
  useEffect(() => {
    if (OTP_ENABLED && otpSent && !otpVerified) {
      setTimeout(() => otpRef.current?.focus(), 100);
    }
  }, [otpSent, otpVerified]);

  // Resend countdown tick
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  // Escape key — intercept if OTP pending
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (OTP_ENABLED && otpSent && !otpVerified) {
          setShowCloseWarning(true);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, otpSent, otpVerified]);

  // ── OTP helpers ─────────────────────────────────────────────────────

  const sendOtp = async (mobile: string) => {
    setSending(true);
    setMobileError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMobileError(json.error ?? "Failed to send OTP. Please try again.");
        // SMS provider down — still capture the prospect so they aren't lost
        if (data.name.trim()) {
          fetch("/api/leads/partial", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              mobile,
              ...getUTMParams(),
              ...getDeviceInfo(),
              source,
            }),
          }).catch(() => {});
        }
        return;
      }
      setOtpSent(true);
      setResendCountdown(30);

      // Fire-and-forget: save unverified lead so we don't lose the prospect
      // if they close the modal before verifying. Non-critical — errors are ignored.
      fetch("/api/leads/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          mobile,
          ...getUTMParams(),
          ...getDeviceInfo(),
          source,
        }),
      }).catch(() => {});
    } catch {
      setMobileError("Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const verifyOtpCode = async (otp: string) => {
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }
    setOtpError("");
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileInput, otp }),
      });
      const json = await res.json();
      if (!res.ok) {
        setOtpError(json.error ?? "Verification failed. Please try again.");
        return;
      }
      setOtpVerified(true);
      setShowCloseWarning(false);
      // Lock verified mobile into form data
      setData((prev) => ({ ...prev, mobile: mobileInput }));
    } catch {
      setOtpError("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleMobileChange = (val: string) => {
    setMobileInput(val);
    setMobileError("");
    if (val.length === 10 && !otpSent && !sending) {
      sendOtp(val);
    }
  };

  const handleOtpChange = (val: string) => {
    setOtpInput(val);
    setOtpError("");
    if (val.length === 6) verifyOtpCode(val);
  };

  const handleChangeMobile = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpInput("");
    setOtpError("");
    setMobileInput("");
    setMobileError("");
    setResendCountdown(0);
    setShowCloseWarning(false);
    setData((prev) => ({ ...prev, mobile: "" }));
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || sending) return;
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

  // ── Form handlers ────────────────────────────────────────────────────

  const handleChange = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (OTP_ENABLED && !otpVerified) {
      setMobileError(
        otpSent
          ? "Please verify the OTP sent to your mobile."
          : mobileInput.length === 10
          ? "OTP is being sent to your mobile…"
          : "Please enter your mobile number to receive OTP."
      );
      return;
    }

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

  // Intercept close if OTP is pending
  const tryClose = useCallback(() => {
    if (OTP_ENABLED && otpSent && !otpVerified) {
      setShowCloseWarning(true);
    } else {
      onClose();
    }
  }, [onClose, otpSent, otpVerified]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) tryClose();
  };

  if (!open) return null;

  const maskedMobile = mobileInput
    ? `+91 ${mobileInput.slice(0, 2)}${"•".repeat(6)}${mobileInput.slice(-2)}`
    : "";

  const submitDisabled = submitting || (OTP_ENABLED && otpSent && !otpVerified);

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
          <button type="button" className="modal-close" aria-label="Close" onClick={tryClose}>
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
        ) : (
          <form className="modal-body" noValidate onSubmit={handleSubmit}>
            <div className="modal-step active">

              {/* ── Close warning banner ── */}
              {showCloseWarning && (
                <div
                  style={{
                    background: "#fffbeb",
                    border: "1px solid #f59e0b",
                    borderRadius: 8,
                    padding: "12px 14px",
                    marginBottom: 16,
                  }}
                >
                  <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600, color: "#92400e" }}>
                    OTP verification is pending
                  </p>
                  <p style={{ margin: "0 0 10px", fontSize: 13, color: "#78350f" }}>
                    Enter the OTP sent to {maskedMobile} to complete verification and save your spot.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setShowCloseWarning(false);
                        setTimeout(() => otpRef.current?.focus(), 50);
                      }}
                      style={{ flex: 1, fontSize: 13 }}
                    >
                      Continue Verifying
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        fontSize: 13,
                        cursor: "pointer",
                        color: "#6b7280",
                        padding: "8px 12px",
                      }}
                    >
                      Close anyway
                    </button>
                  </div>
                </div>
              )}

              {/* ── Row 1: Name + Mobile ── */}
              <div className="form-field-row">
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="leadName">
                    Name <span className="req">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="leadName"
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. Priya Sharma"
                    value={data.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{errors.name}</div>
                  )}
                </div>

                {/* Mobile */}
                <div className="form-field">
                  <label htmlFor="leadMobile">
                    Mobile Number <span className="req">*</span>
                    {OTP_ENABLED && otpVerified && (
                      <span style={{ marginLeft: 6, fontSize: 12, color: "#2a7a4e", fontWeight: 600 }}>
                        ✓ Verified
                      </span>
                    )}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      id="leadMobile"
                      name="mobile"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="10-digit number"
                      value={mobileInput}
                      readOnly={OTP_ENABLED && otpSent}
                      onChange={
                        OTP_ENABLED
                          ? (e) => handleMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))
                          : (e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setMobileInput(val);
                              handleChange("mobile", val);
                              if (val.length === 10 && data.name.trim()) {
                                fetch("/api/leads/partial", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    name: data.name,
                                    mobile: val,
                                    ...getUTMParams(),
                                    ...getDeviceInfo(),
                                    source,
                                  }),
                                }).catch(() => {});
                              }
                            }
                      }
                      style={
                        OTP_ENABLED && otpSent
                          ? { background: "#f5f5f5", cursor: "default", paddingRight: 60 }
                          : undefined
                      }
                    />
                    {/* Change button — once mobile is locked */}
                    {OTP_ENABLED && otpSent && (
                      <button
                        type="button"
                        onClick={handleChangeMobile}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "var(--navy, #1a2e4a)",
                          fontSize: 12,
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: "0 2px",
                        }}
                      >
                        Change
                      </button>
                    )}
                    {/* Sending indicator */}
                    {OTP_ENABLED && sending && !otpSent && (
                      <span
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 12,
                          color: "#888",
                        }}
                      >
                        Sending…
                      </span>
                    )}
                  </div>
                  {mobileError && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{mobileError}</div>
                  )}
                  {errors.mobile && !mobileError && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{errors.mobile}</div>
                  )}
                  {OTP_ENABLED && !otpSent && !sending && mobileInput.length > 0 && mobileInput.length < 10 && (
                    <div className="hint" style={{ color: "#888" }}>
                      OTP will be sent automatically
                    </div>
                  )}
                </div>
              </div>

              {/* ── Inline OTP section ── */}
              {OTP_ENABLED && otpSent && !otpVerified && (
                <div className="form-field" style={{ marginTop: -8, marginBottom: 4 }}>
                  <label htmlFor="otpInput">
                    OTP sent to <strong>{maskedMobile}</strong> <span className="req">*</span>
                  </label>
                  <input
                    ref={otpRef}
                    type="text"
                    id="otpInput"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => handleOtpChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    style={{ letterSpacing: "0.2em", fontSize: 20, textAlign: "center" }}
                  />
                  {otpError && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{otpError}</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={verifying || otpInput.length !== 6}
                      onClick={() => verifyOtpCode(otpInput)}
                      style={{ flex: 1 }}
                    >
                      {verifying ? "Verifying…" : "Verify OTP"}
                    </button>
                    {resendCountdown > 0 ? (
                      <span style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>
                        Resend in {resendCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={sending}
                        onClick={handleResendOtp}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--navy, #1a2e4a)",
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontSize: 13,
                          padding: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sending ? "Sending…" : "Resend OTP"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Row 2: Email + City ── */}
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
                  {errors.email && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{errors.email}</div>
                  )}
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
                  {errors.city && (
                    <div className="hint" style={{ color: "#B83A2A" }}>{errors.city}</div>
                  )}
                </div>
              </div>

              {/* ── Course ── */}
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

              {/* ── Consent ── */}
              <label className="consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={data.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                />
                <span>
                  I Accept the{" "}
                  <a
                    href="/terms-and-conditions"
                    style={{ color: "var(--navy)", textDecoration: "underline" }}
                  >
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {errors.consent && (
                <div className="hint" style={{ color: "#B83A2A", marginBottom: 8 }}>{errors.consent}</div>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitDisabled}
                style={{ width: "100%", marginTop: 8 }}
              >
                {submitting ? "Submitting…" : "Get Free Counselling"}
                {!submitting && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              {OTP_ENABLED && otpSent && !otpVerified && (
                <p style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 6, marginBottom: 0 }}>
                  Please verify your OTP to submit the form
                </p>
              )}

            </div>
          </form>
        )}
      </div>
    </div>
  );
}
