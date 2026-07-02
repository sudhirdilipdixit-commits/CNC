"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { z } from "zod";

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
  defaultCourse?: string;
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

export default function LeadModal({ open, onClose, source = "modal", defaultCourse = "" }: LeadModalProps) {
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
  const [success, setSuccess] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const hasCookie = document.cookie.includes(COOKIE_NAME + "=true");
      if (hasCookie) {
        setIsDuplicate(true);
        setSuccess(true);
      } else {
        setIsDuplicate(false);
        setSuccess(false);
        setErrors({});
        if (defaultCourse) {
          setData((prev) => ({ ...prev, courseInterested: defaultCourse }));
        }
      }
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [open, defaultCourse]);

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
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

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

      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${COOKIE_NAME}=true; expires=${expires}; path=/; SameSite=Lax`;

      if (json.duplicate) {
        setIsDuplicate(true);
      } else if (json.id) {
        setEnquiryId(json.id);
      }
      setSuccess(true);
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
          <h2 id="modalTitle">Talk to a counsellor in 30 minutes</h2>
          <p>Free, no spam, no obligations.</p>
        </div>

        {success ? (
          /* Success state */
          <div className="modal-body">
            <div className="modal-step modal-success active">
              <div className="modal-success-icon" aria-hidden="true">✓</div>
              {isDuplicate ? (
                <>
                  <h2>Already received!</h2>
                  <p>{DUPLICATE_MSG}</p>
                </>
              ) : (
                <>
                  <h2>Thanks, we&apos;ve got your enquiry.</h2>
                  <p>A senior counsellor will call you within 30 minutes during working hours.</p>
                  {enquiryId && <div className="enquiry-id">CNC-2026-{enquiryId}</div>}
                  <p style={{ fontSize: 13 }}>
                    We&apos;ve also sent a confirmation to your mobile.
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Form */
          <form className="modal-body" noValidate onSubmit={handleSubmit}>
            <div className="modal-step active">
              {/* Name + Mobile — 2 columns */}
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
                  </label>
                  <input
                    type="tel"
                    id="leadMobile"
                    name="mobile"
                    autoComplete="tel"
                    placeholder="10-digit number"
                    value={data.mobile}
                    onChange={(e) =>
                      handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                  {errors.mobile && <div className="hint" style={{ color: "#B83A2A" }}>{errors.mobile}</div>}
                </div>
              </div>

              {/* Email + City — 2 columns */}
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

              {/* Course Interested In — full width */}
              <div className="form-field">
                <label htmlFor="leadCourse">
                  Course Interested In <span className="req">*</span>
                </label>
                {defaultCourse ? (
                  <>
                    <input
                      type="text"
                      id="leadCourse"
                      name="courseInterested"
                      value={data.courseInterested}
                      readOnly
                      style={{ background: "var(--ivory)", cursor: "default" }}
                    />
                    <input type="hidden" name="courseInterested" value={data.courseInterested} />
                  </>
                ) : (
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
                )}
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
                <div className="hint" style={{ color: "#B83A2A", marginBottom: 8 }}>
                  {errors.consent}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%", marginTop: 8 }}>
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
