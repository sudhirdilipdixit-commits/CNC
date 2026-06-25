"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { z } from "zod";

const step1Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "Please enter your city"),
});

const fullSchema = step1Schema.extend({
  courseInterested: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Please accept the terms to continue"),
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
const DUPLICATE_MSG =
  "Thank you. Your enquiry has already been received. Our counsellor will contact you shortly.";

export default function LeadModal({ open, onClose, source = "modal" }: LeadModalProps) {
  const [step, setStep] = useState(1);
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
  const [enquiryId, setEnquiryId] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 2;

  // Check cookie on open
  useEffect(() => {
    if (open) {
      const hasCookie = document.cookie.includes(COOKIE_NAME + "=true");
      if (hasCookie) {
        setIsDuplicate(true);
        setStep(3);
      } else {
        setIsDuplicate(false);
        setStep(1);
      }
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [open]);

  // Trap focus + Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [errors]
  );

  const validateStep1 = () => {
    const result = step1Schema.safeParse(data);
    if (!result.success) {
      const errs: FormErrors = {};
      result.error.issues.forEach((e) => {
        const key = e.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = e.message;
      });
      setErrors(errs);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent) {
      setErrors((prev) => ({ ...prev, consent: "Please accept the terms" }));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        ...getUTMParams(),
        ...getDeviceInfo(),
        source,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.duplicate) {
        setIsDuplicate(true);
        setStep(3);
        // Set cookie
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${COOKIE_NAME}=true; expires=${expires}; path=/; SameSite=Lax`;
        return;
      }

      if (json.id) {
        // Set success cookie
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${COOKIE_NAME}=true; expires=${expires}; path=/; SameSite=Lax`;
        setEnquiryId(json.id);
        setStep(3);
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

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center"
      style={{ background: "rgba(36,48,72,0.65)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-t-xl md:rounded-xl"
        style={{
          background: "var(--ivory)",
          boxShadow: "var(--shadow-lg)",
          animation: "slideUp 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="relative p-5" style={{ background: "var(--navy)", color: "var(--ivory)" }}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full inline-flex items-center justify-center text-2xl leading-none"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ×
          </button>
          <h2 id="modalTitle" className="font-serif text-[22px] leading-tight text-ivory mb-1">
            Talk to a counsellor in 30 minutes
          </h2>
          <p className="text-sm m-0" style={{ color: "var(--yellow)" }}>
            Free, no spam, no obligations.
          </p>
          {step < 3 && (
            <div className="flex gap-1 mt-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 h-1 rounded-sm transition-colors duration-200"
                  style={{
                    background: i < step ? "var(--yellow)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="form-field">
                <label htmlFor="leadName">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="leadName"
                  type="text"
                  value={data.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  autoComplete="name"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="leadMobile">
                  Mobile <span className="text-red-600">*</span>
                </label>
                <input
                  id="leadMobile"
                  type="tel"
                  value={data.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                />
                {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="leadEmail">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="leadEmail"
                  type="email"
                  value={data.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="leadCity">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  id="leadCity"
                  type="text"
                  value={data.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="e.g. Pune"
                  autoComplete="address-level2"
                />
                {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="leadCourse">Course Interested In</label>
                <select
                  id="leadCourse"
                  value={data.courseInterested}
                  onChange={(e) => handleChange("courseInterested", e.target.value)}
                >
                  <option value="">Select a programme</option>
                  <option value="Online MBA">Online MBA</option>
                  <option value="Distance MBA">Distance MBA</option>
                  <option value="Executive MBA">Executive MBA</option>
                  <option value="MBA in Marketing">MBA in Marketing</option>
                  <option value="MBA in Finance">MBA in Finance</option>
                  <option value="MBA in HR">MBA in HR</option>
                  <option value="MBA in Operations">MBA in Operations</option>
                  <option value="MBA in IT & PM">MBA in IT & Project Management</option>
                  <option value="MBA in Healthcare">MBA in Healthcare</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <label className="flex gap-2 items-start text-xs text-[var(--grey)] mb-4 leading-relaxed">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                  className="mt-[3px] flex-none accent-[var(--navy)]"
                />
                <span>
                  I accept the{" "}
                  <a href="/terms-and-conditions" className="underline" style={{ color: "var(--navy)" }}>
                    Terms and Conditions
                  </a>{" "}
                  and agree to be contacted by CollegeNCourses about my enquiry.
                </span>
              </label>
              {errors.consent && <p className="text-red-600 text-xs mb-4">{errors.consent}</p>}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[var(--grey)] font-medium text-sm"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary flex-1"
                >
                  {submitting ? "Submitting…" : "Submit My Enquiry"}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success or Duplicate */}
          {step === 3 && (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4"
                style={{ background: "var(--yellow)", color: "var(--navy)" }}
              >
                ✓
              </div>
              {isDuplicate ? (
                <>
                  <h2 className="font-serif text-2xl text-[var(--navy)] mb-3">
                    Already received!
                  </h2>
                  <p className="text-[var(--grey)] text-[15px] mb-3">{DUPLICATE_MSG}</p>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-2xl text-[var(--navy)] mb-3">
                    Thanks, we&apos;ve got your enquiry.
                  </h2>
                  <p className="text-[var(--grey)] text-[15px] mb-3">
                    A senior counsellor will call you within 30 minutes during working hours.
                  </p>
                  {enquiryId && (
                    <span
                      className="inline-block px-3 py-1.5 rounded-md font-bold text-sm tracking-wide mb-4"
                      style={{ background: "var(--pale-navy)", color: "var(--navy)" }}
                    >
                      CNC-2026-{enquiryId}
                    </span>
                  )}
                  <p className="text-xs text-[var(--grey)]">
                    We&apos;ve sent a confirmation to your mobile.
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-6 btn btn-secondary text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
