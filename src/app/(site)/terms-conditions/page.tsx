import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Terms & Conditions — CollegeNCourses",
  description:
    "The terms governing your use of the CollegeNCourses platform, operated by Dnyanal Educon Pvt Ltd.",
  alternates: { canonical: "https://collegencourses.com/terms-conditions/" },
  openGraph: {
    title: "Terms & Conditions — CollegeNCourses",
    description:
      "The terms governing your use of the CollegeNCourses platform, operated by Dnyanal Educon Pvt Ltd.",
  },
};

const TOC = [
  { id: "overview",            label: "Overview" },
  { id: "eligibility",         label: "Eligibility" },
  { id: "what-platform-does",  label: "What the Platform Does" },
  { id: "no-fee",              label: "No Fee to Aspirants" },
  { id: "accuracy",            label: "Accuracy of Information" },
  { id: "responsibilities",    label: "Your Responsibilities" },
  { id: "ip",                  label: "Intellectual Property" },
  { id: "third-party",         label: "Third-Party Institutions & Links" },
  { id: "disclaimers",         label: "Disclaimers" },
  { id: "limitation-liability",label: "Limitation of Liability" },
  { id: "indemnification",     label: "Indemnification" },
  { id: "termination",         label: "Termination" },
  { id: "changes",             label: "Changes to These Terms" },
  { id: "governing-law",       label: "Governing Law & Disputes" },
  { id: "severability",        label: "Severability" },
  { id: "contact",             label: "Contact Us" },
];

export default function TermsConditionsPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Terms &amp; Conditions</span>
          </nav>
        </div>
      </div>

      {/* Document header */}
      <div className="legal-doc-header">
        <div className="container">
          <div className="legal-doc-header-inner">
            <div className="eyebrow">LEGAL</div>
            <h1 className="h-display h1">Terms &amp; Conditions</h1>
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
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of
                collegencourses.com and related services (the &ldquo;Platform&rdquo;), operated by{" "}
                <strong>DNYANAL EDUCON PRIVATE LIMITED</strong>{" "}
                (&ldquo;DEPL&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;), a company incorporated in India (CIN: U85499PN2023PTC220146) with its registered
                office at FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021,
                Maharashtra, India.
              </p>
              <p>
                By accessing or using the Platform, you (&ldquo;you&rdquo;, &ldquo;User&rdquo;)
                agree to be bound by these Terms and by our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree, please do
                not use the Platform.
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>In plain language</strong> (this box is a friendly summary only &mdash; the numbered sections below are what actually governs):</p>
                <ul style={{ margin: "8px 0 0 18px" }}>
                  <li>The Platform helps you research and compare Distance, Online, and Executive MBA (and related) programmes, and connects you with counsellors and institutions.</li>
                  <li>Using the Platform, including our counselling calls, is free to you as an aspirant.</li>
                  <li>We aim to give you honest, accurate comparisons &mdash; but final admission decisions, fees, and programme details are always confirmed by the institution itself, not by us.</li>
                  <li>You&apos;re responsible for the accuracy of the information you give us.</li>
                  <li>We may work with, and be compensated by, partner institutions &mdash; we&apos;ll always tell you honestly if a recommendation involves a partner relationship.</li>
                </ul>
              </div>
            </div>

            {/* 1. Eligibility */}
            <div className="legal-section" id="eligibility">
              <h2>1. Eligibility</h2>
              <p>
                You must be at least 18 years old, or otherwise capable of entering into a legally
                binding contract under Indian law, to use the Platform. If you are using the
                Platform on behalf of another person (for example, a family member exploring
                programme options), you confirm you have their permission to share relevant
                information with us on their behalf.
              </p>
            </div>

            {/* 2. What the Platform Does */}
            <div className="legal-section" id="what-platform-does">
              <h2>2. What the Platform Does</h2>
              <p>
                CollegeNCourses is an education counselling and comparison platform. Through the
                Platform, we:
              </p>
              <ul>
                <li>Publish information and guides on Distance, Online, and Executive MBA programmes (and related programme categories such as Design and, where applicable, Study Abroad services) across UGC-DEB approved and otherwise appropriately accredited Indian institutions;</li>
                <li>Offer a free counselling service &mdash; by phone, WhatsApp, and our AI Counsellor tool &mdash; to help you understand your options based on your goals, background, and budget;</li>
                <li>Connect you, at your request, with specific educational institutions you&apos;ve expressed interest in.</li>
              </ul>
              <p>
                We are not a university, and we do not grant degrees or admissions. Any decision to
                admit you into a programme rests entirely with the relevant institution, under its
                own admission criteria and process.
              </p>
            </div>

            {/* 3. No Fee to Aspirants */}
            <div className="legal-section" id="no-fee">
              <h2>3. No Fee to Aspirants</h2>
              <p>
                Our counselling service is free to you. We do not charge aspirants a fee to use the
                Platform, receive counselling, or be connected with an institution. Where
                CollegeNCourses has a commercial relationship with a partner institution, this does
                not change the price you pay to that institution, and it does not affect the
                honesty of our recommendation &mdash; see our counsellor promise at{" "}
                <Link href="/about">About Us</Link>.
              </p>
            </div>

            {/* 4. Accuracy of Information */}
            <div className="legal-section" id="accuracy">
              <h2>4. Accuracy of Information</h2>
              <h3>4.1 From us to you</h3>
              <p>
                We make a genuine effort to keep programme details, fees, accreditation status, and
                other information on the Platform accurate and current, and we clearly date our
                content where relevant. That said, universities change fees, curricula, and intake
                timelines independently of us, and we cannot guarantee that every detail on the
                Platform is accurate at every moment. Always confirm final details &mdash; fees,
                dates, eligibility criteria &mdash; directly with the institution before making a
                decision or payment.
              </p>
              <h3>4.2 From you to us</h3>
              <p>
                You agree to provide accurate, current, and complete information when using the
                Platform, including in enquiry forms and conversations with our counsellors and AI
                Counsellor tool. Providing false or misleading information may affect the quality of
                guidance we&apos;re able to give you, and we are not responsible for any consequence
                of decisions made based on inaccurate information you&apos;ve provided.
              </p>
            </div>

            {/* 5. Your Responsibilities */}
            <div className="legal-section" id="responsibilities">
              <h2>5. Your Responsibilities</h2>
              <p>When using the Platform, you agree not to:</p>
              <ul>
                <li>Use the Platform for any unlawful purpose, or in a way that could damage, disable, or impair it;</li>
                <li>Attempt to gain unauthorised access to any part of the Platform, our systems, or another user&apos;s data;</li>
                <li>Submit false information, or impersonate another person;</li>
                <li>Scrape, copy, or republish content from the Platform for commercial purposes without our written permission (see Section 6);</li>
                <li>Use automated means (bots, scrapers) to access the Platform, other than standard search-engine crawlers.</li>
              </ul>
            </div>

            {/* 6. Intellectual Property */}
            <div className="legal-section" id="ip">
              <h2>6. Intellectual Property</h2>
              <h3>6.1 Our content</h3>
              <p>
                All content on the Platform &mdash; including text, guides, comparison tables,
                graphics, logos, and the CollegeNCourses name and branding &mdash; is owned by DEPL
                or licensed to us, and is protected under applicable Indian intellectual property
                law.
              </p>
              <h3>6.2 Permitted use</h3>
              <p>
                You may view, download, and print content from the Platform for your own personal,
                non-commercial use in researching your education decision. You may not reproduce,
                distribute, modify, or use our content for any commercial purpose without our prior
                written consent.
              </p>
              <h3>6.3 Third-party marks</h3>
              <p>
                University, institute, and accreditation body names and logos appearing on the
                Platform (for example, in comparison tables) are the trademarks of their respective
                owners, used for identification and comparison purposes only. Their appearance on
                the Platform does not imply endorsement of CollegeNCourses by that institution unless
                explicitly stated.
              </p>
            </div>

            {/* 7. Third-Party Institutions and Links */}
            <div className="legal-section" id="third-party">
              <h2>7. Third-Party Institutions and Links</h2>
              <p>
                The Platform may link to, describe, or facilitate contact with third-party
                educational institutions, financing partners, and other service providers. We are
                not responsible for:
              </p>
              <ul>
                <li>The accuracy of information provided directly by a third-party institution;</li>
                <li>The quality, delivery, or outcome of any programme offered by a third-party institution;</li>
                <li>The privacy or data-handling practices of a third-party institution once your data has been shared with them at your request (see our <Link href="/privacy-policy">Privacy Policy</Link>, Section 6);</li>
                <li>Any contract, transaction, or dispute between you and a third-party institution &mdash; that relationship is exclusively between you and that institution.</li>
              </ul>
            </div>

            {/* 8. Disclaimers */}
            <div className="legal-section" id="disclaimers">
              <h2>8. Disclaimers</h2>
              <p>
                The Platform and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; basis. To the fullest extent permitted by applicable law, we
                disclaim all warranties, express or implied, regarding the Platform, including
                implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement. We do not warrant that the Platform will be uninterrupted,
                error-free, or entirely secure.
              </p>
              <p>
                Nothing in this Section limits any right you may have under the Consumer Protection
                Act, 2019 or other applicable Indian consumer protection law that cannot lawfully be
                excluded.
              </p>
            </div>

            {/* 9. Limitation of Liability */}
            <div className="legal-section" id="limitation-liability">
              <h2>9. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, DEPL and its officers, employees,
                and counsellors shall not be liable for any indirect, incidental, special, or
                consequential loss or damage arising from your use of the Platform, including but
                not limited to loss arising from a decision made based on information provided
                through the Platform, or from your dealings with a third-party institution.
              </p>
              <p>
                Nothing in these Terms excludes or limits liability that cannot lawfully be excluded
                or limited under Indian law, including liability for fraud or wilful misconduct.
              </p>
            </div>

            {/* 10. Indemnification */}
            <div className="legal-section" id="indemnification">
              <h2>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold DEPL harmless from any claim, loss, or demand,
                including reasonable legal fees, arising from your breach of these Terms, your
                misuse of the Platform, or your violation of any applicable law or third-party
                right.
              </p>
            </div>

            {/* 11. Termination */}
            <div className="legal-section" id="termination">
              <h2>11. Termination</h2>
              <p>
                We may suspend or terminate your access to the Platform, without notice, if we
                reasonably believe you have violated these Terms. You may stop using the Platform at
                any time. Sections of these Terms that by their nature should survive termination
                (including Sections 6, 8, 9, and 10) will continue to apply.
              </p>
            </div>

            {/* 12. Changes to These Terms */}
            <div className="legal-section" id="changes">
              <h2>12. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time, to reflect changes in our services or
                in applicable law. We&apos;ll update the &ldquo;Last updated&rdquo; date at the top
                of this page when we do. Continuing to use the Platform after a change takes effect
                constitutes your acceptance of the revised Terms.
              </p>
            </div>

            {/* 13. Governing Law and Dispute Resolution */}
            <div className="legal-section" id="governing-law">
              <h2>13. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of India. Any dispute arising from these Terms
                or your use of the Platform is subject to the exclusive jurisdiction of the courts
                at Pune, Maharashtra.
              </p>
              <p>
                Before initiating any formal legal proceeding, we encourage you to first raise any
                concern with our Grievance Officer &mdash; see our{" "}
                <Link href="/grievances">Grievances</Link>{" "}
                page &mdash; so we have a fair opportunity to resolve it directly.
              </p>
            </div>

            {/* 14. Severability */}
            <div className="legal-section" id="severability">
              <h2>14. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid under
                applicable law, that provision will be limited or eliminated to the minimum extent
                necessary, and the remaining provisions will continue in full force and effect.
              </p>
            </div>

            {/* 15. Contact Us */}
            <div className="legal-section" id="contact">
              <h2>15. Contact Us</h2>
              <p>For any questions about these Terms:</p>
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

      {/* Page-scoped styles — identical to privacy-policy / cookie-policy / grievances */}
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
        .legal-updated-badge-draft {
          background: #FFF3D6; color: #8A5A00;
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
          margin: 10px 0 16px 0;
          padding-left: 20px;
        }
        .legal-section ul { list-style: disc outside; }
        .legal-section ol { list-style: decimal outside; }
        .legal-section ul ul, .legal-section ol ul { list-style: circle outside; }
        .legal-section li {
          font-size: 14px; color: var(--charcoal); line-height: 1.6;
          margin-bottom: 6px;
        }
        .legal-section li:last-child { margin-bottom: 0; }
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
        .legal-highlight ul { margin: 8px 0 0 0; padding-left: 18px; list-style: disc outside; }
        .legal-highlight li { font-size: 14px; color: var(--navy); line-height: 1.6; }

        .legal-placeholder {
          background: var(--yellow);
          color: var(--navy);
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
        }
      `}</style>
    </main>
  );
}
