"use client";

import { useEffect } from "react";

const SESSION_KEY_AUTO = "cnc_auto_popup_shown";
const SESSION_KEY_EXIT = "cnc_exit_popup_shown";
const COOKIE_NAME = "cnc_lead_submitted";

interface PopupManagerProps {
  onOpenLeadForm: (source: string) => void;
}

export default function PopupManager({ onOpenLeadForm }: PopupManagerProps) {
  useEffect(() => {
    const hasCookie = document.cookie.includes(COOKIE_NAME + "=true");
    if (hasCookie) return;

    // Auto popup after 30 seconds
    const autoTimer = setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY_AUTO)) {
        sessionStorage.setItem(SESSION_KEY_AUTO, "1");
        onOpenLeadForm("auto-30s");
      }
    }, 30000);

    // Exit-intent (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return;
      if (sessionStorage.getItem(SESSION_KEY_EXIT)) return;
      sessionStorage.setItem(SESSION_KEY_EXIT, "1");
      onOpenLeadForm("exit-intent");
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(autoTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onOpenLeadForm]);

  return null;
}
