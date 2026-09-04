"use client";

import { useEffect } from "react";
import { useLeadForm } from "./useLeadForm";
import LeadFormFields from "./LeadFormFields";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
  title?: string;
}

export default function LeadModal({
  open,
  onClose,
  source = "modal",
  title = "Get Free Guidance",
}: LeadModalProps) {
  const form = useLeadForm({ source, active: open, onSubmitted: onClose });
  const { OTP_ENABLED, otpSent, otpVerified, showCloseWarning, setShowCloseWarning, otpRef, duplicate, handleSubmit, maskedMobile } = form;

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
  }, [open, onClose, OTP_ENABLED, otpSent, otpVerified, setShowCloseWarning]);

  if (!open) return null;

  const tryClose = () => {
    if (OTP_ENABLED && otpSent && !otpVerified) {
      setShowCloseWarning(true);
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) tryClose();
  };

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
          <p>Free. Takes 2 minutes.</p>
        </div>

        {/* Duplicate message */}
        {duplicate ? (
          <div className="modal-body">
            <div className="modal-step modal-success active">
              <div className="modal-success-icon" aria-hidden="true">✓</div>
              <h2>Already received!</h2>
              <p>Your enquiry has already been received. The programme team will be in touch shortly.</p>
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

              <LeadFormFields form={form} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
