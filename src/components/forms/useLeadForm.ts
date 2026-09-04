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
  consent: z.boolean().refine((v) => v, "Please accept to be contacted about your enquiry to continue"),
});

export type LeadFormData = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  courseInterested: string;
  consent: boolean;
};
export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

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

/**
 * Shared lead-capture logic (OTP verification, validation, UTM/device
 * tracking, submission) used by both the popup modal and any inline
 * embedded form, so both stay in sync with a single implementation.
 */
export function useLeadForm({
  source,
  active,
  onSubmitted,
}: {
  source: string;
  /** Reset the form whenever this flips to true — e.g. a modal's `open` prop. */
  active: boolean;
  /** Called right before redirecting to /thank-you on a successful (non-duplicate) submit. */
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const [mobileInput, setMobileInput] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const [showCloseWarning, setShowCloseWarning] = useState(false);

  const [data, setData] = useState<LeadFormData>({
    name: "",
    mobile: "",
    email: "",
    city: "",
    courseInterested: "",
    consent: false,
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  // Reset all state whenever the form becomes active (modal opens / inline form mounts)
  useEffect(() => {
    if (active) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (OTP_ENABLED && otpSent && !otpVerified) {
      setTimeout(() => otpRef.current?.focus(), 100);
    }
  }, [otpSent, otpVerified]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

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

  const handleChange = useCallback(<K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleNonOtpMobileChange = (val: string) => {
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
  };

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
      const errs: LeadFormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LeadFormData;
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
        onSubmitted?.();
        router.push(`/thank-you${json.id ? `?ref=CNC-2026-${json.id}` : ""}`);
      }
    } catch {
      setErrors({ name: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const maskedMobile = mobileInput
    ? `+91 ${mobileInput.slice(0, 2)}${"•".repeat(6)}${mobileInput.slice(-2)}`
    : "";

  const submitDisabled = submitting || (OTP_ENABLED && otpSent && !otpVerified);

  return {
    OTP_ENABLED,
    nameRef,
    otpRef,
    data,
    errors,
    submitting,
    duplicate,
    mobileInput,
    mobileError,
    otpSent,
    otpVerified,
    otpInput,
    otpError,
    sending,
    verifying,
    resendCountdown,
    showCloseWarning,
    setShowCloseWarning,
    handleChange,
    handleSubmit,
    handleMobileChange,
    handleNonOtpMobileChange,
    handleOtpChange,
    handleChangeMobile,
    handleResendOtp,
    verifyOtpCode,
    maskedMobile,
    submitDisabled,
  };
}

export type UseLeadFormReturn = ReturnType<typeof useLeadForm>;
