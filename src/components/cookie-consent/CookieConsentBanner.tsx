"use client";

import { useEffect, useState } from "react";
import { useCookieConsent, type ConsentCategories } from "./CookieConsentContext";

const CATEGORIES: { key: keyof Omit<ConsentCategories, "necessary">; label: string; desc: string }[] = [
  {
    key: "analytics",
    label: "Analytics",
    desc: "Helps us understand which pages are useful and where visitors drop off (e.g. Google Analytics).",
  },
  {
    key: "advertising",
    label: "Advertising",
    desc: "Measures whether our Google Ads / Meta campaigns are reaching the right aspirants.",
  },
  {
    key: "functional",
    label: "Functional",
    desc: "Remembers choices you've made on the site, like a specialization you were exploring.",
  },
];

export default function CookieConsentBanner() {
  const { consent, hasDecided, bannerOpen, preferencesOpen, acceptAll, rejectNonEssential, savePreferences, dismissBanner } =
    useCookieConsent();
  const [expanded, setExpanded] = useState(preferencesOpen);
  const [draft, setDraft] = useState(consent);

  useEffect(() => {
    if (bannerOpen) {
      setExpanded(preferencesOpen);
      setDraft(consent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerOpen]);

  if (!bannerOpen) return null;

  return (
    <div className="cookie-consent-backdrop">
      <div className="cookie-consent-banner" role="dialog" aria-label="Cookie preferences">
        {hasDecided && (
          <button
            type="button"
            className="cookie-consent-close"
            aria-label="Close"
            onClick={dismissBanner}
          >
            &times;
          </button>
        )}

        {!expanded ? (
          <>
            <p className="cookie-consent-text">
              We use cookies to keep the site working, understand how it&apos;s used, and measure
              whether our marketing reaches the right people. See our{" "}
              <a href="/cookie-policy">Cookie Policy</a> for details.
            </p>
            <div className="cookie-consent-actions">
              <button type="button" className="cookie-consent-btn cookie-consent-btn-ghost" onClick={() => setExpanded(true)}>
                Manage Preferences
              </button>
              <button type="button" className="cookie-consent-btn cookie-consent-btn-outline" onClick={rejectNonEssential}>
                Reject Non-Essential
              </button>
              <button type="button" className="cookie-consent-btn cookie-consent-btn-primary" onClick={acceptAll}>
                Accept All
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-consent-text">
              Choose which non-essential cookies we can use. Strictly necessary cookies are always
              on &mdash; the site may not function correctly without them.
            </p>
            <div className="cookie-consent-categories">
              <div className="cookie-consent-category">
                <div className="cookie-consent-category-head">
                  <span>Strictly necessary</span>
                  <span className="cookie-consent-toggle cookie-consent-toggle-locked" aria-hidden="true" />
                </div>
                <p>Required to keep the site and your enquiry forms working. Cannot be disabled.</p>
              </div>
              {CATEGORIES.map((cat) => (
                <div className="cookie-consent-category" key={cat.key}>
                  <div className="cookie-consent-category-head">
                    <span>{cat.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={draft[cat.key]}
                      className={`cookie-consent-toggle${draft[cat.key] ? " cookie-consent-toggle-on" : ""}`}
                      onClick={() => setDraft((d) => ({ ...d, [cat.key]: !d[cat.key] }))}
                    />
                  </div>
                  <p>{cat.desc}</p>
                </div>
              ))}
            </div>
            <div className="cookie-consent-actions">
              <button type="button" className="cookie-consent-btn cookie-consent-btn-ghost" onClick={() => setExpanded(false)}>
                Back
              </button>
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-primary"
                onClick={() =>
                  savePreferences({
                    analytics: draft.analytics,
                    advertising: draft.advertising,
                    functional: draft.functional,
                  })
                }
              >
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
