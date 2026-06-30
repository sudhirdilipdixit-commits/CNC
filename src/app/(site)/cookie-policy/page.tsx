import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Cookie Policy | CollegeNCourses",
  description:
    "How CollegeNCourses uses cookies, web beacons, and tracking technologies on its websites and apps. Learn how to control your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | CollegeNCourses",
    description:
      "Detailed information about how and when we use cookies on collegencourses.com.",
  },
};

const TOC = [
  { id: "introduction",   label: "Introduction" },
  { id: "uses-cookies",   label: "Does CNC Use Cookies?" },
  { id: "what-is-cookie", label: "What is a Cookie?" },
  { id: "cookies-used-for", label: "What Are Cookies Used For?" },
  { id: "when-placed",    label: "When Are Cookies Placed?" },
  { id: "analytics",      label: "Cookies for Analytics" },
  { id: "advertising",    label: "Cookies for Advertising" },
  { id: "third-party",    label: "Third-Party Cookies" },
  { id: "web-beacons",    label: "Web Beacons" },
  { id: "control-cookies",label: "How to Control Cookies" },
];

const COOKIE_CATEGORIES = [
  {
    num: "1",
    name: "Essential Cookies",
    desc: "Essential cookies (First Party Cookies) are sometimes called “strictly necessary” as without them we cannot provide many services that you need on the Website. They maintain preferences and login functionality.",
  },
  {
    num: "2",
    name: "Analytics Cookies",
    desc: "These cookies track information about visits to the Collegencourses.com and partner (college/university websites) websites so that we can make improvements and report our performance. They analyse user behaviour and test features.",
  },
  {
    num: "3",
    name: "Functionality or Preference Cookies",
    desc: "During your visit to the Websites, cookies are used to remember information you have entered or choices you make (such as your username, language or your region) on the Websites. Preferences persist for future visits.",
  },
  {
    num: "4",
    name: "Targeting or Advertising Cookies",
    desc: "These Cookies are placed by third party advertising platforms or networks in order to deliver ads and track ad performance, and enable advertising networks to deliver ads that may be relevant to you based upon your activities.",
  },
];

const THIRD_PARTY_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/policy.php" },
  { name: "AdSense", url: "https://policies.google.com/technologies/ads" },
  { name: "Google Analytics", url: "https://www.google.com/analytics/learn/privacy.html" },
  { name: "Google Tag Manager", url: "https://www.google.com/analytics/tag-manager/faq/" },
  { name: "Google+", url: "https://www.google.com/policies/privacy/" },
  { name: "Twitter", url: "https://twitter.com/en/privacy" },
  { name: "Google Ad Manager", url: "https://support.google.com/admanager/answer/2839090?hl=en" },
];

const BROWSER_LINKS = [
  { name: "Internet Explorer", url: "https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" },
  { name: "Firefox", url: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" },
  { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
  { name: "Safari", url: "https://support.apple.com/kb/ph21411" },
];

export default function CookiePolicyPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Cookie Policy</span>
          </nav>
        </div>
      </div>

      {/* Document header */}
      <div className="legal-doc-header">
        <div className="container">
          <div className="legal-doc-header-inner">
            <div className="eyebrow">LEGAL</div>
            <h1 className="h-display h1">Cookie Policy</h1>
            <div className="legal-meta">
              <div className="legal-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Published: <strong>1 May 2023</strong>
              </div>
              <div className="legal-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                Last updated: <strong>1 June 2026</strong>
              </div>
              <span className="legal-updated-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 11l3 3L22 4" />
                </svg>
                Current version
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="container">
        <div className="legal-layout">

          <LegalToc items={TOC} />

          {/* Main content */}
          <article className="legal-content">

            {/* Introduction */}
            <div className="legal-section" id="introduction">
              <h2>Introduction</h2>
              <p>
                This Cookie Policy (&ldquo;Policy&rdquo;) explains that we believe in being open and clear
                about how we use your information. In the spirit of transparency, this Policy provides
                detailed information about how and when we use cookies on our Websites.
              </p>
              <p>
                The policy applies to any Collegencourses.com product or service that links to or
                incorporates it by reference.
              </p>
            </div>

            {/* 1. Does CNC Use Cookies? */}
            <div className="legal-section" id="uses-cookies">
              <h2>Does Collegencourses.com use cookies?</h2>
              <p>
                Collegencourses.com uses cookies, tags and other technologies when you use any of the
                Collegencourses.com websites, mobile sites or mobile apps (collectively &ldquo;the
                services&rdquo;).
              </p>
              <p>
                Cookies ensure optimal user experience and account security. By continuing to use the
                services, users consent to cookie usage as described in this policy. Users preferring not
                to receive cookies should discontinue site use or adjust browser settings.
              </p>
            </div>

            {/* 2. What is a Cookie? */}
            <div className="legal-section" id="what-is-cookie">
              <h2>What is a cookie?</h2>
              <p>
                Cookies are small pieces of text stored by a website you visit in your browser and
                subsequently sent by your web browser in every request to the website.
              </p>
              <p>
                A cookie file remains in your web browser, allowing website recognition and personalised
                experiences. Web beacons, tags and scripts may be used in the Websites or in emails to
                help us to deliver cookies, count visits, understand usage and campaign effectiveness and
                determine whether an email has been opened and acted upon.
              </p>
              <p>There are two main types of cookies:</p>
              <ul>
                <li>
                  <strong>Persistent cookies:</strong> Help recognise returning users, remaining in
                  browsers across sessions.
                </li>
                <li>
                  <strong>Session cookies:</strong> Last only during the current visit or browser session.
                </li>
              </ul>
            </div>

            {/* 3. What Are Cookies Used For? */}
            <div className="legal-section" id="cookies-used-for">
              <h2>What are cookies used for?</h2>
              <p>
                When you visit our Websites, we may place a number of cookies in your browser. These are
                known as First Party Cookies and are required to enable to hold session information as you
                navigate from page to page within the website.
              </p>
              <p>
                Cookies track preferences, improve experience, and analyse usage statistics. They deliver
                targeted advertising and enable customised features. Users can control cookies at browser
                level, though limiting cookies may restrict website functionality.
              </p>

              {/* Cookie category cards */}
              <div className="cookie-categories">
                {COOKIE_CATEGORIES.map((cat) => (
                  <div key={cat.num} className="cookie-cat-card">
                    <div className="cookie-cat-badge">{cat.num}</div>
                    <div>
                      <div className="cookie-cat-name">{cat.name}</div>
                      <p className="cookie-cat-desc">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. When Are Cookies Placed? */}
            <div className="legal-section" id="when-placed">
              <h2>When does Collegencourses.com place cookies?</h2>
              <p>
                Cookies are placed on websites, mobile sites, and mobile applications. Any browser
                visiting these sites will receive cookies from us which helps us identify you more quickly
                when you return.
              </p>
              <p>
                The organisation uses both Google Analytics and proprietary analytics cookies to generate
                statistics and reports about visitor activities.
              </p>
            </div>

            {/* 5. Analytics */}
            <div className="legal-section" id="analytics">
              <h2>How cookies are used for online analytics purposes</h2>
              <p>
                We may use web analytics services on Collegencourses.com, such as those of Google
                Analytics. These services help us analyse how users use the services, including by noting
                the third-party website from which you arrive.
              </p>
              <p>
                Service providers collect and use this information to evaluate service usage, compile
                reports on website activity, and provide other services relating to website activity and
                internet usage.
              </p>
            </div>

            {/* 6. Advertising */}
            <div className="legal-section" id="advertising">
              <h2>How are cookies used for advertising purposes?</h2>
              <p>
                Cookies and other ad technology such as beacons, pixels, and tags help us serve relevant
                ads to you more effectively.
              </p>
              <p>
                The organisation partners with analytics and advertising networks including Google Display
                Network and Facebook to deliver targeted advertisements. This information allows an ad
                network to deliver targeted advertisements that they believe will be of most interest to
                you, and it allows Collegencourses.com to optimise the performance of our advertising
                campaigns and the usability of our website.
              </p>
            </div>

            {/* 7. Third-Party Cookies */}
            <div className="legal-section" id="third-party">
              <h2>What third-party cookies does Collegencourses.com use?</h2>
              <p>
                Please note that third parties (advertising networks and providers of external services
                like web traffic analysis services) may also use cookies on our Services.
              </p>
              <p>
                Third-party cookie names and technologies may change over time. Social networks including
                Facebook, Google, and Twitter may place cookies when users log in through the website.
              </p>
              <p>For more information, visit the privacy policies of the relevant third parties:</p>
              <ul>
                {THIRD_PARTY_LINKS.map((link) => (
                  <li key={link.name}>
                    <strong>{link.name}:</strong>{" "}
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 8. Web Beacons */}
            <div className="legal-section" id="web-beacons">
              <h2>What are web beacons?</h2>
              <p>
                Collegencourses.com occasionally advertises on third party web sites. As part of our
                effort to track the success of our advertising campaigns, we may at times use a visitor
                identification technology such as &ldquo;web beacons,&rdquo; or &ldquo;action tags,&rdquo;
                which count visitors who have come to our site after being exposed to a
                Collegencourses.com banner ad on a third party site.
              </p>
              <p>
                By navigating on our site, you agree that we can place cookies and web beacons on your
                computer or device.
              </p>
            </div>

            {/* 9. How to Control Cookies */}
            <div className="legal-section" id="control-cookies">
              <h2>How to control cookies</h2>
              <p>
                Most browsers allow you to control cookies through their settings preferences. However,
                if you choose to turn off these cookies, you will still see advertising on the internet
                but it may not be tailored to your interests.
              </p>
              <p>
                Essential cookies cannot be disabled. Disabling other cookies may limit website access
                and functionality.
              </p>

              <div className="legal-highlight">
                <p style={{ marginBottom: 8 }}>
                  <strong>Changing your cookie settings</strong>
                </p>
                <p style={{ marginBottom: 8 }}>
                  Browser settings for cookies are typically found in options or preferences menus:
                </p>
                <ul style={{ margin: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {BROWSER_LINKS.map((b) => (
                    <li key={b.name} style={{ fontSize: 14 }}>
                      <a href={b.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: "var(--navy)", fontWeight: 600 }}>
                        Cookie settings in {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <h3>More information</h3>
              <p>
                For additional information about cookies, visit{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
                  www.allaboutcookies.org
                </a>
                . To learn about opting out of interest-based ads, visit{" "}
                <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
                  optout.aboutads.info
                </a>{" "}
                and{" "}
                <a href="https://www.networkadvertising.org/choices" target="_blank" rel="noopener noreferrer">
                  www.networkadvertising.org/choices
                </a>
                . Google and Facebook offer customisable preference options for internet browsing
                advertisements.
              </p>
              <p>
                For any questions about this Cookie Policy, please contact us at{" "}
                <a href="mailto:privacy@collegencourses.com">privacy@collegencourses.com</a>.
              </p>
            </div>

          </article>
        </div>
      </div>

      {/* Page-scoped styles — identical base to privacy-policy / terms-conditions */}
      <style>{`
        .legal-doc-header {
          background: var(--white);
          padding: 40px 0 0;
          border-bottom: 1px solid var(--mist);
        }
        .legal-doc-header-inner { max-width: 880px; }
        .legal-doc-header h1 { margin: 10px 0 14px; }

        .legal-meta {
          display: flex; flex-wrap: wrap;
          gap: 12px; align-items: center;
          padding-bottom: 20px;
        }
        .legal-meta-item {
          font-size: 13px; color: var(--grey);
          display: flex; align-items: center; gap: 6px;
        }
        .legal-meta-item strong { color: var(--navy); }
        .legal-updated-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #E8F5EA; color: #2A7A3A;
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 999px;
        }

        .legal-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding: 40px 0 64px;
        }
        @media (min-width: 1024px) {
          .legal-layout {
            grid-template-columns: 220px 1fr;
            gap: 48px;
            align-items: start;
          }
        }

        .legal-toc { display: none; }
        @media (min-width: 1024px) {
          .legal-toc {
            display: block;
            position: sticky;
            top: calc(37px + 64px + 20px);
          }
        }
        .legal-toc-inner {
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: 8px;
          padding: 16px;
        }
        .legal-toc-title {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--grey); margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--mist);
        }
        .legal-toc-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 2px;
        }
        .legal-toc-list a {
          font-size: 13px; color: var(--grey);
          display: block; padding: 6px 10px;
          border-left: 2px solid transparent;
          border-radius: 0 4px 4px 0;
          transition: all 0.15s; line-height: 1.4;
          text-decoration: none;
        }
        .legal-toc-list a:hover { color: var(--navy); background: var(--ivory); }
        .legal-toc-list a.active {
          color: var(--navy); font-weight: 600;
          border-left-color: var(--yellow);
          background: var(--ivory);
        }

        .mobile-toc { display: block; margin-bottom: 24px; }
        @media (min-width: 1024px) { .mobile-toc { display: none; } }
        .mobile-toc select {
          width: 100%; padding: 11px 14px;
          border: 1px solid var(--pale-navy);
          border-radius: 8px; font-size: 14px;
          font-family: var(--font-sans);
          color: var(--charcoal); background: var(--white);
        }

        .legal-content { max-width: 720px; }

        .legal-section {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--mist);
        }
        .legal-section:last-child { border-bottom: none; margin-bottom: 0; }

        .legal-section h2 {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: clamp(19px, 2.2vw, 24px);
          margin-bottom: 14px;
          padding-bottom: 10px;
          position: relative;
        }
        .legal-section h2::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 36px; height: 2px;
          background: var(--yellow);
        }
        .legal-section h3 {
          font-size: 16px; font-weight: 700;
          color: var(--navy); margin: 20px 0 10px;
        }
        .legal-section p {
          font-size: 15px; color: var(--charcoal);
          line-height: 1.7; margin-bottom: 1em;
        }
        .legal-section ul, .legal-section ol {
          margin: 10px 0 16px 20px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .legal-section li {
          font-size: 14px; color: var(--charcoal); line-height: 1.6;
        }
        .legal-section a {
          color: var(--navy);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--yellow);
        }

        .legal-highlight {
          background: var(--pale-navy);
          border-left: 4px solid var(--yellow);
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
          margin: 16px 0;
        }
        .legal-highlight p {
          font-size: 14px; color: var(--navy); margin: 0;
        }
        .legal-highlight p + p { margin-top: 8px; }
        .legal-highlight a { color: var(--navy); font-weight: 600; }

        /* Cookie category cards */
        .cookie-categories {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 20px 0 8px;
        }
        .cookie-cat-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: var(--radius-md);
          padding: 16px 20px;
        }
        .cookie-cat-badge {
          width: 32px; height: 32px;
          background: var(--navy);
          color: var(--yellow);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif);
          font-size: 16px; font-weight: 700;
          flex-shrink: 0;
        }
        .cookie-cat-name {
          font-size: 14px; font-weight: 700;
          color: var(--navy); margin-bottom: 6px;
        }
        .cookie-cat-desc {
          font-size: 13px !important;
          color: var(--grey) !important;
          line-height: 1.55 !important;
          margin: 0 !important;
        }
      `}</style>
    </main>
  );
}
