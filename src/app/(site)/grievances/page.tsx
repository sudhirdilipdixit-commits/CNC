import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Grievance Redressal — CollegeNCourses",
  description:
    "How to raise a complaint or concern with CollegeNCourses, and how our Grievance Officer resolves it.",
  alternates: { canonical: "https://collegencourses.com/grievances/" },
  openGraph: {
    title: "Grievance Redressal — CollegeNCourses",
    description:
      "How to raise a complaint or concern with CollegeNCourses, and how our Grievance Officer resolves it.",
  },
};

const TOC = [
  { id: "overview",    label: "Overview" },
  { id: "who-for",     label: "Who this page is for" },
  { id: "officer",     label: "Grievance Officer" },
  { id: "how-to",      label: "How to raise a grievance" },
  { id: "next-steps",  label: "What happens next" },
  { id: "escalation",  label: "If you're not satisfied" },
  { id: "fraud",       label: "Fraud, abuse & safety" },
  { id: "related",     label: "Related pages" },
];

export default function GrievancesPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Grievance Redressal</span>
          </nav>
        </div>
      </div>

      {/* Document header */}
      <div className="legal-doc-header">
        <div className="container">
          <div className="legal-doc-header-inner">
            <div className="eyebrow">GRIEVANCE REDRESSAL</div>
            <h1 className="h-display h1">Grievance Redressal</h1>
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
                We&apos;d rather you tell us directly when something&apos;s gone wrong than leave
                frustrated and say nothing. This page explains how to raise a concern with
                CollegeNCourses, and what happens after you do.
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>In plain language</strong> (this box is a friendly summary only &mdash; the numbered sections below are what actually governs):</p>
                <ul style={{ margin: "8px 0 0 18px" }}>
                  <li>If something about our service, our website, or how we&apos;ve handled your data has bothered you, email our named Grievance Officer directly.</li>
                  <li>We&apos;ll acknowledge your complaint within 24 hours and aim to resolve it within 15 days.</li>
                  <li>If you&apos;re still not satisfied, we&apos;ll tell you what to do next.</li>
                </ul>
              </div>
            </div>

            {/* 1. Who This Page Is For */}
            <div className="legal-section" id="who-for">
              <h2>1. Who This Page Is For</h2>
              <p>You can use this grievance process if you have a concern about:</p>
              <ul>
                <li>The accuracy or conduct of information, advice, or counselling provided through the CollegeNCourses Platform;</li>
                <li>How a CollegeNCourses counsellor has communicated with you (including concerns about pressure tactics or conduct inconsistent with our counsellor promise);</li>
                <li>How your personal data has been collected, used, or shared, including any concern related to our <Link href="/privacy-policy">Privacy Policy</Link>;</li>
                <li>Any other conduct on the Platform that you believe breaches our <Link href="/terms-conditions">Terms &amp; Conditions</Link> or applicable law.</li>
              </ul>
              <p>
                If your concern is specifically about a partner educational institution&apos;s own
                conduct, admission process, or fees, we encourage you to raise it with that
                institution directly first, since the final decision on those matters rests with
                them &mdash; but you&apos;re welcome to loop us in too, especially if you believe we
                made an inaccurate representation about that institution on our Platform.
              </p>
            </div>

            {/* 2. Grievance Officer */}
            <div className="legal-section" id="officer">
              <h2>2. Grievance Officer</h2>
              <p>
                In accordance with applicable Indian law, including the Digital Personal Data
                Protection Act, 2023 and the Information Technology Act, 2000 and rules made
                thereunder, DNYANAL EDUCON PRIVATE LIMITED has appointed the following Grievance
                Officer:
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>Name:</strong> Mr. Sudhir Dixit</p>
                <p style={{ marginBottom: 4 }}>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:grievances@collegencourses.com">grievances@collegencourses.com</a>
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Contact number:</strong>{" "}
                  <a href="tel:+917350460393">+91 7350 460 393</a>
                </p>
              </div>
              <p>
                <strong>Registered office:</strong><br />
                DNYANAL EDUCON PRIVATE LIMITED<br />
                FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021, Maharashtra, India
              </p>
            </div>

            {/* 3. How to Raise a Grievance */}
            <div className="legal-section" id="how-to">
              <h2>3. How to Raise a Grievance</h2>
              <p>
                Write to us at{" "}
                <a href="mailto:grievances@collegencourses.com">grievances@collegencourses.com</a>{" "}
                with:
              </p>
              <ul>
                <li>Your full name and the contact details you used on the Platform (so we can match your complaint to your enquiry, if relevant);</li>
                <li>A clear description of your concern &mdash; what happened, when, and who (if anyone) you were dealing with on our side;</li>
                <li>Any supporting documents or screenshots, where relevant;</li>
                <li>What outcome you&apos;re looking for.</li>
              </ul>
              <p>
                You can also call us on <a href="tel:+917350460393">+91 7350 460 393</a>{" "}
                to raise a concern verbally; we&apos;ll follow up by email to make sure it&apos;s
                properly logged.
              </p>
            </div>

            {/* 4. What Happens Next */}
            <div className="legal-section" id="next-steps">
              <h2>4. What Happens Next</h2>
              <div className="legal-table-wrap">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th scope="col">Step</th>
                      <th scope="col">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Acknowledgment</td>
                      <td>Within 24 hours of receipt, on a working day.</td>
                    </tr>
                    <tr>
                      <td>Investigation</td>
                      <td>Our Grievance Officer reviews the matter, which may include speaking with the relevant counsellor or team member.</td>
                    </tr>
                    <tr>
                      <td>Resolution</td>
                      <td>Within 15 days of the original complaint, wherever reasonably possible. If a matter is genuinely complex and needs longer, we&apos;ll tell you why and give you a revised timeline.</td>
                    </tr>
                    <tr>
                      <td>Outcome communication</td>
                      <td>We&apos;ll email you directly with the outcome and, where relevant, the action taken.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. If You're Not Satisfied */}
            <div className="legal-section" id="escalation">
              <h2>5. If You&apos;re Not Satisfied With the Outcome</h2>
              <p>If you feel your grievance hasn&apos;t been resolved satisfactorily:</p>
              <ul>
                <li>You&apos;re welcome to ask for the matter to be escalated within DEPL for a further review.</li>
                <li>For grievances specifically relating to how your personal data has been handled, you have the right to approach the Data Protection Board of India, established under the Digital Personal Data Protection Act, 2023, once you have first attempted resolution through our internal process above.</li>
                <li>For other consumer-related concerns, you may also approach the appropriate consumer forum under the Consumer Protection Act, 2019, or the National Consumer Helpline.</li>
              </ul>
              <p>
                We genuinely prefer to resolve things directly wherever we can, and would rather
                hear a hard truth from you than have you walk away quietly.
              </p>
            </div>

            {/* 6. Fraud, Abuse, or Safety Concerns */}
            <div className="legal-section" id="fraud">
              <h2>6. Fraud, Abuse, or Safety Concerns</h2>
              <p>
                If your concern involves something more serious &mdash; suspected fraud,
                impersonation of CollegeNCourses by a third party, or a safety concern &mdash;
                please mark your email to{" "}
                <a href="mailto:grievances@collegencourses.com">grievances@collegencourses.com</a>{" "}
                as &ldquo;Urgent&rdquo; in the subject line, and call us directly on{" "}
                <a href="tel:+917350460393">+91 7350 460 393</a>{" "}
                as well. We&apos;ll prioritise these.
              </p>
            </div>

            {/* 7. Related Pages */}
            <div className="legal-section" id="related">
              <h2>7. Related Pages</h2>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions">Terms &amp; Conditions</Link></li>
                <li><Link href="/cookie-policy">Cookie Policy</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </div>

          </article>
        </div>
      </div>

      {/* Page-scoped styles matching reference */}
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

        .legal-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--mist);
          border-radius: 8px;
          margin: 16px 0;
        }
        .legal-table { width: 100%; border-collapse: collapse; min-width: 480px; }
        .legal-table th {
          background: var(--navy); color: var(--white);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          text-align: left; padding: 12px 16px;
        }
        .legal-table td {
          font-size: 14px; color: var(--charcoal);
          padding: 12px 16px; vertical-align: top;
          border-top: 1px solid var(--mist);
        }
        .legal-table tr:nth-child(even) td { background: var(--ivory); }
        .legal-table td:first-child { font-weight: 700; color: var(--navy); white-space: nowrap; }
      `}</style>
    </main>
  );
}
