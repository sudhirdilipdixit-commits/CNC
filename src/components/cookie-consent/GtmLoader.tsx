"use client";

import { useEffect } from "react";
import { useCookieConsent } from "./CookieConsentContext";

export default function GtmLoader({ gtmId }: { gtmId?: string }) {
  const { consent, hasDecided } = useCookieConsent();

  useEffect(() => {
    if (!gtmId) return;
    if (!hasDecided) return;
    if (!consent.analytics && !consent.advertising) return;
    if (document.getElementById("gtm-script")) return;

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }, [gtmId, hasDecided, consent.analytics, consent.advertising]);

  return null;
}
