"use client";

import { useCookieConsent } from "./CookieConsentContext";

export default function CookiePreferencesLink() {
  const { openPreferences } = useCookieConsent();
  return (
    <button type="button" className="footer-link-button" onClick={openPreferences}>
      Cookie Preferences
    </button>
  );
}
