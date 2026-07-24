import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Privacy Policy — CollegeNCourses",
  description:
    "How CollegeNCourses (Dnyanal Educon Pvt Ltd) collects, uses, and protects your personal data. DPDP Act aligned. Plain-language summary included.",
  alternates: { canonical: "https://collegencourses.com/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy — CollegeNCourses",
    description:
      "Our commitment to your privacy — written in plain language, not legal jargon.",
  },
};

const TOC = [
  { id: "overview",        label: "Overview" },
  { id: "scope",           label: "Scope of this policy" },
  { id: "key-terms",       label: "Key terms" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-collect",  label: "How we collect it" },
  { id: "why-we-process",  label: "Why we process it" },
  { id: "sharing",         label: "Who we share it with" },
  { id: "cross-border",    label: "Cross-border transfer" },
  { id: "retention",       label: "Data retention" },
  { id: "security",        label: "How we protect it" },
  { id: "your-rights",     label: "Your rights" },
  { id: "cookies",         label: "Cookies" },
  { id: "children",        label: "Children's data" },
  { id: "grievance",       label: "Grievance Officer" },
  { id: "third-party-links", label: "Third-party links" },
  { id: "changes",         label: "Policy changes" },
  { id: "governing-law",   label: "Governing law" },
  { id: "contact-privacy", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500 }}>Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Document header */}
      <div className="legal-doc-header">
        <div className="container">
          <div className="legal-doc-header-inner">
            <div className="eyebrow">LEGAL</div>
            <h1 className="h-display h1">Privacy Policy</h1>
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
              <span className="legal-updated-badge legal-updated-badge-draft">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                Draft — pending legal review
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

            {/* Overview */}
            <div className="legal-section" id="overview">
              <h2>Overview</h2>
              <p>
                CollegeNCourses is operated by <strong>DNYANAL EDUCON PRIVATE LIMITED</strong>
                {" "}(&ldquo;DEPL&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a
                company incorporated in India (CIN:{" "}
                <mark className="legal-placeholder">Insert CIN Number</mark>), with its registered
                office at FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021,
                Maharashtra, India.
              </p>
              <p>
                This Privacy Policy explains what personal data we collect when you use
                collegencourses.com and our related services (together, the &ldquo;Platform&rdquo;),
                why we collect it, who we share it with, and the rights you have over it. We&apos;ve
                written it as clearly as we know how &mdash; the fine print, in plain language, as we
                say elsewhere on this site.
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>In plain language</strong> (this box is a friendly summary only &mdash; the numbered sections below are what actually governs):</p>
                <ul style={{ margin: "8px 0 0 18px" }}>
                  <li>We collect your name, contact details, and information about the programmes and specializations you&apos;re interested in, so our counsellors can help you.</li>
                  <li>If you express interest in a specific university or programme, we share your contact details with that specific institution so they can follow up with you &mdash; this is core to how the Platform works, and we tell you this plainly rather than burying it.</li>
                  <li>We never sell your data to unrelated third parties for their own marketing purposes.</li>
                  <li>We keep your data on India-hosted systems.</li>
                  <li>You can ask us what we hold about you, ask us to correct it, or ask us to delete it, at any time.</li>
                  <li>We have a named Grievance Officer you can contact if anything about this policy or our data practices concerns you &mdash; see our <Link href="/grievances">Grievances</Link> page.</li>
                </ul>
              </div>
            </div>

            {/* 1. Scope */}
            <div className="legal-section" id="scope">
              <h2>1. Scope of this policy</h2>
              <p>This Policy applies to personal data collected through:</p>
              <ul>
                <li>The collegencourses.com website and any subdomains (including our AI Counsellor tool and comparison portal);</li>
                <li>Enquiry forms, callback requests, and lead-magnet downloads on the Platform;</li>
                <li>WhatsApp, SMS, phone, and email communications you have with our counselling team as a result of using the Platform;</li>
                <li>Our official social media pages, to the extent we collect information through them (e.g., direct messages).</li>
              </ul>
              <p>It does not govern the privacy practices of:</p>
              <ul>
                <li>Partner universities, colleges, or educational institutions once your data has been shared with them at your request (see Section 6);</li>
                <li>Third-party websites we may link to;</li>
                <li>Any offline interactions not connected to the Platform.</li>
              </ul>
            </div>

            {/* 2. Key terms */}
            <div className="legal-section" id="key-terms">
              <h2>2. Key terms</h2>
              <p>We use a few terms from India&apos;s Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) throughout this Policy:</p>
              <ul>
                <li><strong>Data Principal</strong> &mdash; the individual the personal data is about. That&apos;s you, if you&apos;re using our Platform.</li>
                <li><strong>Data Fiduciary</strong> &mdash; the entity that decides why and how personal data is processed. That&apos;s us, DEPL.</li>
                <li><strong>Data Processor</strong> &mdash; any entity that processes personal data on our behalf (for example, our CRM provider). Processors act under our instructions and are contractually bound to protect your data.</li>
                <li><strong>Personal Data</strong> &mdash; any data about you by which you are or can be identified.</li>
                <li><strong>Consent</strong> &mdash; your free, specific, informed, and unambiguous agreement to a particular processing activity, given by clear affirmative action.</li>
              </ul>
            </div>

            {/* 3. What we collect */}
            <div className="legal-section" id="what-we-collect">
              <h2>3. What personal data we collect</h2>
              <p>
                <strong>3.1 Identity and contact data.</strong> Name, email address, mobile number,
                and city/location, typically collected when you fill out an enquiry form, request a
                callback, or download a resource.
              </p>
              <p>
                <strong>3.2 Academic and career data.</strong> Your current qualification, work
                experience, target programme and specialization interest, preferred mode of study
                (Distance/Online/Executive), budget range, and similar information you share with us
                or with our AI Counsellor tool, so that our counsellors &mdash; and the AI Counsellor
                &mdash; can give you relevant guidance.
              </p>
              <p>
                <strong>3.3 Communication data.</strong> Records of calls, WhatsApp messages, emails,
                and chat or AI Counsellor conversation transcripts between you and CollegeNCourses,
                kept so our counselling team has context across follow-up conversations.
              </p>
              <p>
                <strong>3.4 Technical and usage data.</strong> IP address, device and browser type,
                pages visited, referral source, and campaign identifiers (such as gclid or fbclid
                from Google or Meta ad clicks), collected automatically when you visit the Platform.
                See our <Link href="/cookie-policy">Cookie Policy</Link> for detail on how this is
                collected.
              </p>
              <p>
                <strong>3.5 Verification data.</strong> A one-time password (OTP) sent to your
                mobile number to verify it&apos;s genuinely yours before we act on an enquiry. We do
                not store the OTP itself beyond the verification window.
              </p>
              <p>
                <strong>3.6 Sensitive data (Study Abroad services only).</strong> If and when you
                engage our Study Abroad counselling services specifically, we may collect passport
                details, academic transcripts, and other documents needed to support letters of
                recommendation, visa applications, and university applications on your behalf. This
                category of data is collected only in the context of that specific service, only
                with your explicit consent, and is handled with additional care as outlined in
                Section 9.
              </p>
              <p>
                We do not knowingly collect financial account details, health data, or biometric
                data through the general counselling Platform.
              </p>
            </div>

            {/* 4. How we collect it */}
            <div className="legal-section" id="how-we-collect">
              <h2>4. How we collect your data</h2>
              <ul>
                <li>Directly from you, when you fill in a form, call us, message us on WhatsApp, or use the AI Counsellor tool.</li>
                <li>Automatically, through cookies and similar technologies when you browse the Platform (see our <Link href="/cookie-policy">Cookie Policy</Link>).</li>
                <li>From our OTP verification provider, to confirm your mobile number.</li>
                <li>From advertising platforms (Google Ads, Meta), in the form of click identifiers that help us understand which campaign brought you to us &mdash; not additional personal data from those platforms themselves.</li>
              </ul>
            </div>

            {/* 5. Why we process it */}
            <div className="legal-section" id="why-we-process">
              <h2>5. Why we process your data</h2>
              <p>
                We process your personal data for the following purposes, each grounded in your
                consent (given when you submit a form or otherwise engage with the Platform) or in
                our legitimate interest in operating a functioning counselling service:
              </p>
              <ul>
                <li>To respond to your enquiry and connect you with a counsellor;</li>
                <li>To assess which programmes and universities may fit your stated goals, budget, and background;</li>
                <li>To share your enquiry, with your knowledge, with the specific partner institution(s) you&apos;ve expressed interest in (Section 6);</li>
                <li>To send you confirmation messages (SMS, WhatsApp, email) about your enquiry;</li>
                <li>To improve our Platform, tools, and content based on aggregate usage patterns;</li>
                <li>To send you further information about programmes or services, where you haven&apos;t opted out;</li>
                <li>To meet our legal, regulatory, and accounting obligations;</li>
                <li>To detect and prevent fraud, abuse, or misuse of the Platform.</li>
              </ul>
            </div>

            {/* 6. Who we share it with */}
            <div className="legal-section" id="sharing">
              <h2>6. Who we share your data with</h2>
              <p>This is the section we think deserves the most plain speaking, because it&apos;s central to how a counselling platform like ours works.</p>
              <p>
                <strong>6.1 Partner educational institutions.</strong> When you express interest in
                a specific programme or university through the Platform &mdash; for example, by
                requesting more information about a specific institution, or by asking a counsellor
                to connect you &mdash; we share your relevant contact and enquiry details (typically
                name, mobile number, and email address) with that specific institution, so they can
                follow up with you directly regarding admissions, further information, or enrolment.
                We only do this in connection with programmes or institutions you&apos;ve actually
                shown interest in &mdash; we do not blanket-share your details with every institution
                on our Platform.
              </p>
              <p>
                We require partner institutions not to use your data for any purpose beyond the one
                you engaged with them for. That said, once your data is shared with a partner
                institution, their own privacy practices govern how they handle it from that point
                on &mdash; we are not responsible for a partner institution&apos;s separate data
                practices, and we encourage you to review their privacy policy directly.
              </p>
              <p>
                <strong>6.2 Service providers (Data Processors).</strong> We use third-party
                providers to run parts of the Platform &mdash; for example, our CRM system
                (India-hosted), our OTP/SMS/WhatsApp messaging provider, and our website hosting and
                analytics providers. These providers process data only on our instructions and only
                for the purposes we&apos;ve engaged them for.
              </p>
              <p>
                <strong>6.3 Legal and regulatory disclosure.</strong> We may disclose personal data
                where required to comply with a legal obligation, court order, or lawful request
                from a government or regulatory authority.
              </p>
              <p>
                <strong>6.4 Business transfers.</strong> If DEPL is ever involved in a merger,
                acquisition, or sale of assets, personal data may be transferred as part of that
                transaction, subject to this Policy continuing to apply (or you being notified of
                any material change).
              </p>
              <div className="legal-highlight">
                <p>
                  We do not sell your personal data to third parties for their own independent
                  marketing purposes. Sharing with partner institutions under Section 6.1, at your
                  expressed interest, is not a sale of your data &mdash; it&apos;s core to the
                  service you&apos;ve asked us for.
                </p>
              </div>
            </div>

            {/* 7. Cross-border transfer */}
            <div className="legal-section" id="cross-border">
              <h2>7. Cross-border data transfer</h2>
              <p>
                CollegeNCourses primarily stores and processes data on India-hosted systems. Where
                any processing occurs outside India &mdash; for example, through a cloud or software
                provider with servers abroad &mdash; this is done consistent with the DPDP
                Act&apos;s approach to cross-border transfer, which currently permits transfers
                except to countries the Central Government specifically restricts by notification.
                We do not currently transfer personal data to any country subject to such a
                restriction.
              </p>
            </div>

            {/* 8. Data retention */}
            <div className="legal-section" id="retention">
              <h2>8. Data retention</h2>
              <p>
                We retain personal data for as long as reasonably necessary to fulfil the purposes
                described in Section 5, and thereafter for any additional period required by
                applicable law (for example, accounting or regulatory retention requirements).
                Communication and enquiry records are typically retained for the duration of our
                relationship with you plus a reasonable follow-up period, after which they are
                deleted or anonymised, unless you&apos;ve asked us to delete them sooner (see Section
                10).
              </p>
            </div>

            {/* 9. Security */}
            <div className="legal-section" id="security">
              <h2>9. How we protect your data</h2>
              <p>We apply reasonable technical and organisational security measures appropriate to the sensitivity of the data involved, including:</p>
              <ul>
                <li>Access controls limiting who within our team can view your data, based on role;</li>
                <li>India-hosted storage for our primary CRM systems;</li>
                <li>Encrypted transmission (HTTPS) across the Platform;</li>
                <li>Additional handling care for the sensitive documents (passport, academic transcripts) collected specifically for Study Abroad services, including restricted access and secure storage.</li>
              </ul>
              <p>
                No system is completely immune to risk. If we become aware of a data breach
                affecting your personal data, we will notify you and take appropriate steps
                consistent with applicable law.
              </p>
            </div>

            {/* 10. Your rights */}
            <div className="legal-section" id="your-rights">
              <h2>10. Your rights</h2>
              <p>As a Data Principal, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> &mdash; ask us what personal data we hold about you;</li>
                <li><strong>Correction</strong> &mdash; ask us to correct inaccurate or outdated data;</li>
                <li><strong>Erasure</strong> &mdash; ask us to delete your data, subject to any legal retention obligations;</li>
                <li><strong>Withdraw consent</strong> &mdash; withdraw your consent to a specific processing activity at any time, without affecting the lawfulness of processing carried out before withdrawal;</li>
                <li><strong>Grievance redressal</strong> &mdash; raise a complaint with our Grievance Officer if you&apos;re unhappy with how we&apos;ve handled your data (see Section 13 and our <Link href="/grievances">Grievances</Link> page);</li>
                <li><strong>Nominate</strong> &mdash; nominate another individual to exercise these rights on your behalf in the event of your death or incapacity.</li>
              </ul>
              <div className="legal-highlight">
                <p>
                  To exercise any of these rights, email{" "}
                  <a href="mailto:info@collegencourses.com">info@collegencourses.com</a>. We aim to
                  respond within a reasonable time, and in any case consistent with the response
                  timelines prescribed under applicable law.
                </p>
              </div>
            </div>

            {/* 11. Cookies */}
            <div className="legal-section" id="cookies">
              <h2>11. Cookies</h2>
              <p>
                The Platform uses cookies and similar technologies to remember your preferences,
                understand how you use the site, and measure the effectiveness of our marketing.
                Full detail is in our separate <Link href="/cookie-policy">Cookie Policy</Link>,
                which forms part of this Privacy Policy by reference.
              </p>
            </div>

            {/* 12. Children */}
            <div className="legal-section" id="children">
              <h2>12. Children&apos;s data</h2>
              <p>
                CollegeNCourses is intended for use by individuals capable of entering a binding
                contract under Indian law (generally, 18 years or older). We do not knowingly
                collect personal data from anyone under 18 without the involvement of a parent or
                legal guardian. If you believe a minor has provided us with personal data without
                appropriate consent, please contact us at{" "}
                <a href="mailto:info@collegencourses.com">info@collegencourses.com</a> and we will
                take appropriate action.
              </p>
            </div>

            {/* 13. Grievance Officer */}
            <div className="legal-section" id="grievance">
              <h2>13. Grievance Officer</h2>
              <p>
                In accordance with applicable Indian law, we have appointed a Grievance Officer to
                address concerns relating to this Privacy Policy and our data practices:
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}><strong>Grievance Officer:</strong> Mr. Sudhir Dixit</p>
                <p style={{ marginBottom: 4 }}>
                  Email:{" "}
                  <a href="mailto:grievances@collegencourses.com">grievances@collegencourses.com</a>
                </p>
                <p style={{ margin: 0 }}>Contact number: +91 7350 460 393</p>
              </div>
              <p>
                Full detail on our grievance redressal process is available on our{" "}
                <Link href="/grievances">Grievances</Link> page.
              </p>
            </div>

            {/* 14. Third-party links */}
            <div className="legal-section" id="third-party-links">
              <h2>14. Third-party links</h2>
              <p>
                The Platform may contain links to third-party websites, including partner
                institution websites. This Policy does not apply to those websites. We encourage
                you to read the privacy policy of any third-party site before sharing personal data
                with it.
              </p>
            </div>

            {/* 15. Changes */}
            <div className="legal-section" id="changes">
              <h2>15. Changes to this policy</h2>
              <p>
                We may update this Policy from time to time &mdash; to reflect changes in our
                practices, our services, or applicable law. We&apos;ll update the &ldquo;Last
                updated&rdquo; date at the top of this page when we do. Material changes will be
                highlighted on this page or communicated to you directly where appropriate.
              </p>
            </div>

            {/* 16. Governing law */}
            <div className="legal-section" id="governing-law">
              <h2>16. Governing law</h2>
              <p>
                This Policy is governed by the laws of India. Any disputes arising from it are
                subject to the exclusive jurisdiction of the courts at Pune, Maharashtra.
              </p>
            </div>

            {/* 17. Contact */}
            <div className="legal-section" id="contact-privacy">
              <h2>17. Contact us</h2>
              <p>For any questions about this Privacy Policy or how we handle your data:</p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 4 }}>
                  <strong>Dnyanal Educon Pvt Ltd</strong><br />
                  FLNO A-603, Utsav Homes, Patil Nagar,<br />
                  Bavdhan BK, Pune &ndash; 411021, Maharashtra, India
                </p>
                <p style={{ margin: 0 }}>
                  Email:{" "}
                  <a href="mailto:info@collegencourses.com">info@collegencourses.com</a>
                  {" "}| Phone:{" "}
                  <a href="tel:+917350460393">+91 7350 460 393</a>
                </p>
              </div>
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
