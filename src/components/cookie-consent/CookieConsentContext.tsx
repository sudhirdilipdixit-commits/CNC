"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

const COOKIE_NAME = "cnc_cookie_consent";
const COOKIE_DAYS = 180;

const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: false,
  advertising: false,
  functional: false,
};

function readConsentCookie(): ConsentCategories | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      advertising: !!parsed.advertising,
      functional: !!parsed.functional,
    };
  } catch {
    return null;
  }
}

function writeConsentCookie(consent: ConsentCategories) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires}; path=/; SameSite=Lax`;
}

interface CookieConsentContextValue {
  consent: ConsentCategories;
  hasDecided: boolean;
  bannerOpen: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (partial: Partial<Omit<ConsentCategories, "necessary">>) => void;
  openPreferences: () => void;
  dismissBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentCategories>(DEFAULT_CONSENT);
  const [hasDecided, setHasDecided] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (stored) {
      setConsent(stored);
      setHasDecided(true);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const persist = useCallback((next: ConsentCategories) => {
    setConsent(next);
    setHasDecided(true);
    writeConsentCookie(next);
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(
    () => persist({ necessary: true, analytics: true, advertising: true, functional: true }),
    [persist]
  );

  const rejectNonEssential = useCallback(
    () => persist({ necessary: true, analytics: false, advertising: false, functional: false }),
    [persist]
  );

  const savePreferences = useCallback(
    (partial: Partial<Omit<ConsentCategories, "necessary">>) =>
      persist({ ...consent, ...partial, necessary: true }),
    [consent, persist]
  );

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
    setBannerOpen(true);
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasDecided,
        bannerOpen,
        preferencesOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        dismissBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
