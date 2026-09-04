"use client";

import { CONSENT_TEXT } from "@/lib/consent";
import type { UseLeadFormReturn } from "./useLeadForm";

interface LeadFormFieldsProps {
  form: UseLeadFormReturn;
  submitLabel?: string;
}

const COURSE_OPTIONS = [
  "Banking and Finance Management",
  "Business Management",
  "Digital Marketing",
  "Finance Management",
  "Healthcare Management",
  "Human Resource Management",
  "IT & Project Management",
  "Marketing Management",
  "Operations Management",
  "Supply Chain Management",
  "Executive MBA",
  "Information Technology and System Management",
  "International Business Management",
  "Retail Management",
  "Project Management",
  "General Management",
  "MCA",
  "BBA",
  "BCA",
];

export default function LeadFormFields({ form, submitLabel = "Get Free Counselling" }: LeadFormFieldsProps) {
  const {
    OTP_ENABLED,
    nameRef,
    otpRef,
    data,
    errors,
    submitting,
    mobileInput,
    mobileError,
    otpSent,
    otpVerified,
    otpInput,
    otpError,
    sending,
    verifying,
    resendCountdown,
    handleChange,
    handleMobileChange,
    handleNonOtpMobileChange,
    handleOtpChange,
    handleChangeMobile,
    handleResendOtp,
    verifyOtpCode,
    maskedMobile,
    submitDisabled,
  } = form;

  return (
    <>
      {/* ── Row 1: Name + Mobile ── */}
      <div className="form-field-row">
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
          {errors.name && <div className="hint" style={{ color: "#B83A2A" }}>{errors.name}</div>}
        </div>

        <div className="form-field">
          <label htmlFor="leadMobile">
            Mobile Number <span className="req">*</span>
            {OTP_ENABLED && otpVerified && (
              <span style={{ marginLeft: 6, fontSize: 12, color: "#2a7a4e", fontWeight: 600 }}>✓ Verified</span>
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
                  : (e) => handleNonOtpMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              style={
                OTP_ENABLED && otpSent
                  ? { background: "#f5f5f5", cursor: "default", paddingRight: 60 }
                  : undefined
              }
            />
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
          {mobileError && <div className="hint" style={{ color: "#B83A2A" }}>{mobileError}</div>}
          {errors.mobile && !mobileError && <div className="hint" style={{ color: "#B83A2A" }}>{errors.mobile}</div>}
          {OTP_ENABLED && !otpSent && !sending && mobileInput.length > 0 && mobileInput.length < 10 && (
            <div className="hint" style={{ color: "#888" }}>OTP will be sent automatically</div>
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
          {otpError && <div className="hint" style={{ color: "#B83A2A" }}>{otpError}</div>}
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
              <span style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>Resend in {resendCountdown}s</span>
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
          {COURSE_OPTIONS.map((course) => (
            <option key={course}>{course}</option>
          ))}
        </select>
        {errors.courseInterested && <div className="hint" style={{ color: "#B83A2A" }}>{errors.courseInterested}</div>}
      </div>

      {/* ── Consent ── */}
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={data.consent}
          onChange={(e) => handleChange("consent", e.target.checked)}
        />
        <span>{CONSENT_TEXT}</span>
      </label>
      {errors.consent && <div className="hint" style={{ color: "#B83A2A", marginBottom: 8 }}>{errors.consent}</div>}

      {/* ── Submit ── */}
      <button type="submit" className="btn btn-primary" disabled={submitDisabled} style={{ width: "100%", marginTop: 8 }}>
        {submitting ? "Submitting…" : submitLabel}
        {!submitting && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        )}
      </button>
      {OTP_ENABLED && otpSent && !otpVerified && (
        <p style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 6, marginBottom: 0 }}>
          Please verify your OTP to submit the form
        </p>
      )}
    </>
  );
}
