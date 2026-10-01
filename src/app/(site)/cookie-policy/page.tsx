import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Cookie Policy — CollegeNCourses",
  description:
    "How CollegeNCourses uses cookies and similar technologies, and how to manage your preferences.",
  alternates: { canonical: "https://collegencourses.com/cookie-policy/" },
  openGraph: {
    title: "Cookie Policy — CollegeNCourses",
    description:
      "How CollegeNCourses uses cookies and similar technologies, and how to manage your preferences.",
  },
};

const TOC = [
  { id: "overview",   label: "Overview" },
  { id: "what-are",   label: "What are cookies" },
  { id: "why-we-use", label: "Why we use cookies" },
  { id: "third-party",label: "Cookies set by third parties" },
  { id: "managing",   label: "Managing your preferences" },
  { id: "dnt",        label: "Do Not Track" },
  { id: "changes",    label: "Changes to this policy" },
  { id: "contact",    label: "Contact us" },
];

const CATEGORIES = [
  {
    num: "1",
    name: "Strictly necessary",
    purpose:
      "Keep the site functional — for example, remembering your progress through a multi-step enquiry form, or keeping you securely connected to our AI Counsellor tool during a session.",
    disable: "No — the site may not function correctly without these.",
  },
  {
    num: "2",
    name: "Analytics / performance",
    purpose:
      "Understand how visitors use the Platform — which pages are read, where visitors drop off — so we can improve content and navigation. Typically via a provider such as Google Analytics.",
    disable: "Yes, via cookie settings or browser controls.",
  },
  {
    num: "3",
    name: "Advertising / marketing",
    purpose:
      "Measure whether our Google Ads and Meta (Facebook/Instagram) campaigns are reaching relevant aspirants, and avoid showing you the same ad repeatedly. This is where identifiers like gclid (Google) or fbclid (Meta) come from when you arrive via a paid ad.",
    disable: "Yes, via cookie settings, browser controls, or the ad platform's own preference tools.",
  },
  {
    num: "4",
    name: "Functional",
    purpose:
      "Remember choices you've made on the site (for example, a specialization you've been exploring) so you don't have to re-enter them on a return visit.",
    disable: "Yes, via cookie settings or browser controls.",
  },
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
                Effective date: <strong>15 July 2026</strong>
              </div>
              <div className="legal-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                Last updated: <strong>15 July 2026</strong>
              </div>
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

            {/* Overview */}
            <div className="legal-section" id="overview">
              <p>
                This Cookie Policy explains how <strong>DNYANAL EDUCON PRIVATE LIMITED</strong>,
                operating CollegeNCourses (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
                uses cookies and similar technologies on collegencourses.com (the
                &ldquo;Platform&rdquo;), and how you can manage your preferences. This Policy
                should be read alongside our <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>In plain language</strong> (this box is a friendly summary only &mdash; the numbered sections below are what actually governs):</p>
                <ul style={{ margin: "8px 0 0 18px" }}>
                  <li>We use a small number of cookies to keep the site working properly, understand how visitors use it, and measure whether our marketing is reaching the right people.</li>
                  <li>We don&apos;t use cookies to build a profile of you for sale to third parties.</li>
                  <li>You can control or switch off non-essential cookies through your browser settings or our cookie banner, without losing access to the core site.</li>
                </ul>
              </div>
            </div>

            {/* 1. What Are Cookies */}
            <div className="legal-section" id="what-are">
              <h2>1. What Are Cookies</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They
                help the website remember information about your visit &mdash; such as your
                preferences or how you arrived at the site &mdash; which can make your next visit
                easier and the site more useful to you. We also use similar technologies, such as
                pixels and local storage, which work in comparable ways; this Policy refers to all
                of them collectively as &ldquo;cookies.&rdquo;
              </p>
              <p>Cookies can be:</p>
              <ul>
                <li><strong>Session cookies</strong> &mdash; temporary, and deleted when you close your browser.</li>
                <li><strong>Persistent cookies</strong> &mdash; remain on your device for a set period, or until you delete them, so the site can recognise you on a return visit.</li>
                <li><strong>First-party cookies</strong> &mdash; set directly by collegencourses.com.</li>
                <li><strong>Third-party cookies</strong> &mdash; set by a service we use (such as an analytics or advertising provider), not by us directly.</li>
              </ul>
            </div>

            {/* 2. Why We Use Cookies */}
            <div className="legal-section" id="why-we-use">
              <h2>2. Why We Use Cookies</h2>

              <div className="cookie-categories">
                {CATEGORIES.map((cat) => (
                  <div key={cat.num} className="cookie-cat-card">
                    <div className="cookie-cat-badge">{cat.num}</div>
                    <div>
                      <div className="cookie-cat-name">{cat.name}</div>
                      <p className="cookie-cat-desc">{cat.purpose}</p>
                      <p className="cookie-cat-disable">Can you disable it? {cat.disable}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="legal-highlight" style={{ marginTop: 20 }}>
                <p style={{ marginBottom: 10 }}><strong>Cookies we actually use today</strong></p>
                <p style={{ marginBottom: 4 }}><strong>cnc_lead_submitted</strong> (first-party, strictly necessary)</p>
                <p style={{ marginBottom: 10 }}>Prevents the same enquiry from being submitted twice in a short window. Expires after 24 hours.</p>
                <p style={{ marginBottom: 4 }}><strong>cnc_cookie_consent</strong> (first-party, strictly necessary)</p>
                <p style={{ margin: 0 }}>Remembers your cookie preferences from the banner below, so we don&apos;t ask again on every visit. Expires after 180 days.</p>
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--grey)" }}>
                As we activate analytics and advertising tools (such as Google Analytics, Google
                Ads, or Meta Pixel) on the Platform, we&apos;ll add their specific cookies to this
                list.
              </p>
            </div>

            {/* 3. Cookies Set By Third Parties */}
            <div className="legal-section" id="third-party">
              <h2>3. Cookies Set By Third Parties</h2>
              <p>
                Some cookies on the Platform are set by services we work with, not by us directly.
                These may include analytics providers, advertising platforms (Google, Meta), and
                our CRM or chat-tool provider. Each of these third parties has its own privacy and
                cookie practices, which we encourage you to review:
              </p>
              <ul>
                <li>
                  <strong>Google:</strong>{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    policies.google.com/privacy
                  </a>
                </li>
                <li>
                  <strong>Meta:</strong>{" "}
                  <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
                    facebook.com/privacy/policy
                  </a>
                </li>
              </ul>
            </div>

            {/* 4. Managing Your Cookie Preferences */}
            <div className="legal-section" id="managing">
              <h2>4. Managing Your Cookie Preferences</h2>
              <h3>4.1 On this site</h3>
              <p>
                When you first visit the Platform, a cookie banner lets you accept all
                non-essential cookies, reject them, or choose which categories to allow. You can
                change your choice at any time via the &ldquo;Cookie Preferences&rdquo; link in the
                footer.
              </p>
              <h3>4.2 In your browser</h3>
              <p>
                Most browsers let you view, delete, and block cookies through their settings menu
                (usually under &ldquo;Privacy&rdquo; or &ldquo;Settings&rdquo;). Since browsers
                differ, check your specific browser&apos;s help section for exact steps. Note that
                blocking all cookies may affect how parts of the Platform function &mdash; for
                example, our multi-step enquiry form or AI Counsellor tool may not work correctly
                without strictly necessary cookies enabled.
              </p>
              <h3>4.3 Ad platform opt-outs</h3>
              <p>
                You can also manage ad personalisation directly through{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                  Google Ads Settings
                </a>{" "}
                and{" "}
                <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">
                  Meta Ad Preferences
                </a>.
              </p>
            </div>

            {/* 5. Do Not Track */}
            <div className="legal-section" id="dnt">
              <h2>5. Do Not Track</h2>
              <p>
                Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) signal. There isn&apos;t a
                single accepted industry standard for how websites should respond to DNT signals,
                and the Platform does not currently respond differently based on a DNT signal. You
                can still manage your cookie preferences directly through the methods in Section 4.
              </p>
            </div>

            {/* 6. Changes to This Policy */}
            <div className="legal-section" id="changes">
              <h2>6. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time, particularly as our use of
                analytics and marketing tools evolves, or as consent requirements under Indian law
                develop. We&apos;ll update the &ldquo;Last updated&rdquo; date at the top of this
                page when we do.
              </p>
            </div>

            {/* 7. Contact Us */}
            <div className="legal-section" id="contact">
              <h2>7. Contact Us</h2>
              <p>For any questions about this Cookie Policy:</p>
              <p>
                DNYANAL EDUCON PRIVATE LIMITED<br />
                FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021, Maharashtra, India<br />
                Email: <a href="mailto:info@collegencourses.com">info@collegencourses.com</a>
                {" "}| Phone: <a href="tel:+917350460393">+91 7350 460 393</a>
              </p>
            </div>

          </article>
        </div>
      </div>

      {/* Page-scoped styles — identical base to privacy-policy / terms-conditions / grievances */}
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
            top: calc(var(--header-h) + 20px);
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
        .legal-highlight ul { margin: 8px 0 0 18px; }
        .legal-highlight li { font-size: 14px; color: var(--navy); line-height: 1.6; }

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
          margin: 0 0 6px !important;
        }
        .cookie-cat-disable {
          font-size: 12px !important;
          color: var(--navy) !important;
          font-weight: 600 !important;
          margin: 0 !important;
        }
      `}</style>
    </main>
  );
}
