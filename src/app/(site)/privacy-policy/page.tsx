import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Privacy Policy | CollegeNCourses",
  description:
    "How CollegeNCourses (DNYANAL EDUCON PRIVATE LIMITED) collects, uses, stores, and protects your personal data. DPDP Act 2023 compliant.",
  openGraph: {
    title: "Privacy Policy | CollegeNCourses",
    description:
      "Our commitment to your privacy — written in plain language, not legal jargon.",
  },
};

const TOC = [
  { id: "overview",       label: "Overview" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-use",    label: "How we use your data" },
  { id: "cookies",       label: "Cookies & tracking" },
  { id: "third-party",   label: "Third-party services" },
  { id: "sharing",       label: "Data sharing" },
  { id: "retention",     label: "Data retention" },
  { id: "your-rights",   label: "Your rights" },
  { id: "security",      label: "Security" },
  { id: "social-media",  label: "Social media" },
  { id: "children",      label: "Age requirements" },
  { id: "changes",       label: "Policy changes" },
  { id: "disclaimer",    label: "Disclaimer" },
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

            {/* 1. Overview */}
            <div className="legal-section" id="overview">
              <h2>Overview</h2>
              <p>
                We, at Dnyanal Educon Pvt Ltd (herein referred to as DEPL) and our affiliated companies
                worldwide, are committed to respecting your online privacy and recognise your need for
                appropriate protection and management of personally identifiable information
                (&ldquo;Personal Information&rdquo;) you share with us, in line with applicable data
                protection laws and regulations.
              </p>
              <p>
                This Policy is subject to the Terms of Use of collegencourses.com and applies to those who
                register on the Platform, use our services, or whose information CollegeNCourses otherwise
                receives in connection with its services (including contact information of individuals
                associated with partner colleges and educational institutes).
              </p>
              <p>
                <strong>Personal Information (PI)</strong> means any information relating to an identified
                or identifiable living person — including a name, identification number, location data, an
                online identifier, or factors specific to the physical, physiological, genetic, mental,
                economic, cultural, or social identity of that person, as per applicable laws.
              </p>
              <div className="legal-highlight">
                <p>
                  <strong>Short version:</strong> We collect the information you give us to provide
                  counselling services. We never sell it to third parties. You can delete it at any time
                  by writing to{" "}
                  <a href="mailto:privacy@collegencourses.com">privacy@collegencourses.com</a>.
                </p>
              </div>
            </div>

            {/* 2. What we collect */}
            <div className="legal-section" id="what-we-collect">
              <h2>What we collect</h2>
              <p>We collect information about you or your usage to provide better services. We collect information in the following ways:</p>
              <ul>
                <li>
                  Many of our services require you to register for an account on CollegeNCourses. When
                  you do, we ask for personal information such as your name, email address, and telephone
                  number to create or update your account.
                </li>
                <li>
                  To provide additional services, we may collect profile information such as education
                  background, work experience, and date of birth.
                </li>
                <li>
                  We collect information about the services that you use and how you use them, including
                  log information and location information.
                </li>
                <li>
                  We may collect personal information such as bank details and passport details to assist
                  with study-abroad programmes, including Letter of Recommendation, aspirant profile,
                  aspirant visa, and application to university programmes.
                </li>
                <li>
                  When you communicate with CollegeNCourses or use our platform to communicate with other
                  members (such as advertisers, colleges, or institutes), we collect information about
                  your communication and any additional information you choose to provide.
                </li>
              </ul>
            </div>

            {/* 3. How we use your data */}
            <div className="legal-section" id="how-we-use">
              <h2>How we use your data</h2>
              <p>CollegeNCourses may process your Personal Information for the following purposes:</p>
              <ul>
                <li>
                  We use information collected from cookies and other technologies to improve your user
                  experience and the overall quality of our services. When showing tailored ads, we will
                  not associate identifiers with sensitive categories such as race, religion, sexual
                  orientation, or health.
                </li>
                <li>
                  Our automated systems analyse your content to provide customised search results,
                  recommendations, and specific promotions.
                </li>
                <li>
                  Send alerts and newsletters to you (you may unsubscribe at any time via your account
                  settings).
                </li>
                <li>Improving our website and its content to provide better features and services.</li>
                <li>Conducting market research and surveys to improve our products and services.</li>
                <li>Sending you information about our products and services for marketing purposes and promotions.</li>
                <li>
                  Preventing, detecting, investigating, and prosecuting crimes (including fraud and
                  financial crimes), identity verification, government sanctions screening, and due
                  diligence checks.
                </li>
                <li>
                  Establishing, exercising, or defending legal rights in connection with legal
                  proceedings and seeking professional or legal advice.
                </li>
              </ul>
              <h3>Personalisation of services</h3>
              <p>
                To the extent permitted by law, CollegeNCourses may record and monitor your
                communications with us to ensure compliance with our legal and regulatory obligations and
                our internal policies. This may include the recording of telephone conversations.
              </p>
            </div>

            {/* 4. Cookies */}
            <div className="legal-section" id="cookies">
              <h2>Cookies &amp; tracking technologies</h2>
              <p>
                Some of our web pages utilise &ldquo;cookies&rdquo; and other tracking technologies. A
                &ldquo;cookie&rdquo; is a small text file that may be used, for example, to collect
                information about website activity. Some cookies and other technologies may serve to recall
                Personal Information previously indicated by a web user. Most browsers allow you to
                control cookies, including whether or not to accept them and how to remove them.
              </p>
              <p>
                You may set most browsers to notify you if you receive a cookie, or you may choose to
                block cookies with your browser. Please note that if you choose to erase or block your
                cookies, you will need to re-enter your original user ID and password to gain access to
                certain parts of the website, and some features may not work.
              </p>
              <p>
                Tracking technologies may record information such as internet domain and host names,
                internet protocol (IP) addresses, browser software and operating system types, clickstream
                patterns, and dates and times that our site has been accessed.
              </p>
              <p>
                Our use of cookies and other tracking technologies allows us to improve our website and
                your experience. We may also analyse information that does not contain Personal Information
                for trends and statistics.
              </p>
              <p>
                For more information about our use of cookies please refer to our{" "}
                <Link href="/cookie-policy">Cookie Policy</Link>.
              </p>
            </div>

            {/* 5. Third-party services */}
            <div className="legal-section" id="third-party">
              <h2>Third-party services</h2>
              <p>
                Third parties provide certain services available on CollegeNCourses on DEPL&rsquo;s
                behalf. CollegeNCourses may provide information, including Personal Information, to
                third-party service providers to help us deliver programmes, products, information, and
                services. CollegeNCourses will take reasonable steps to ensure that these third-party
                service providers are obligated to protect Personal Information on our behalf.
              </p>
              <p>
                CollegeNCourses does not intend to transfer Personal Information without your consent to
                third parties, unless such transfer is required for providing relevant services or for
                legal purposes.
              </p>
              <p>
                When you are in a relationship with CollegeNCourses, your personal information may be
                transferred to geographies outside India for the purposes mentioned in this policy or to
                their local service providers. Transfers outside India are covered by standard data
                protection laws.
              </p>
              <p>
                Please be aware that CollegeNCourses sometimes contains links to other sites not governed
                by this privacy policy. CollegeNCourses makes no representations or warranties regarding
                how your information is stored or used on third-party servers. We recommend that you
                review the privacy statement of each third-party site to determine their use of your
                personal information.
              </p>
            </div>

            {/* 6. Data sharing */}
            <div className="legal-section" id="sharing">
              <h2>Data sharing</h2>
              <p>
                We restrict access to your Personal Information to employees who reasonably need to know
                that information to fulfil their jobs in providing, operating, developing, or improving our
                products or services.
              </p>
              <p>CollegeNCourses does not rent, sell, or share personal information about you with other people or non-affiliated companies except:</p>
              <ul>
                <li>To provide products or services you have requested.</li>
                <li>When we have your permission.</li>
                <li>
                  We provide the information to trusted partners who work on behalf of or with DEPL under
                  confidentiality agreements. These companies may use your personal information to help
                  CollegeNCourses communicate with you about offers, but do not have any independent right
                  to share this information.
                </li>
                <li>
                  We respond to subpoenas, court orders, or legal process, or to establish or exercise
                  our legal rights or defend against legal claims.
                </li>
                <li>
                  We believe it is necessary to share information in order to investigate, prevent, or
                  take action regarding illegal activities, suspected fraud, or situations involving
                  potential threats to physical safety.
                </li>
                <li>
                  We transfer information about you if CollegeNCourses is acquired by or merged with
                  another company.
                </li>
                <li>
                  We share your personal information with colleges or educational institutions based on
                  your browsing behaviour or expression of interest regarding courses, specialisations,
                  and institutions. These institutions may further contact you and process your
                  information for the said purposes. How these educational institutions use this data is
                  not governed by our privacy policy.
                </li>
              </ul>
              <div className="legal-highlight">
                <p>
                  CollegeNCourses displays targeted advertisements based on personal information.
                  When you interact with or view a targeted ad, you are consenting to the possibility that
                  the advertiser will make the assumption that you meet the targeting criteria used to
                  display the ad. CollegeNCourses does not provide any personal information to the
                  advertiser when you interact with an ad.
                </p>
              </div>
            </div>

            {/* 7. Data retention */}
            <div className="legal-section" id="retention">
              <h2>Data retention</h2>
              <p>
                Your personal information processed by CollegeNCourses is kept in a form that permits
                your identification for no longer than is necessary for the purposes for which the personal
                information is processed, in line with legal, regulatory, contractual, or statutory
                obligations as applicable.
              </p>
              <p>
                At the expiry of such periods, your personal information will be archived to comply with
                legal and contractual retention obligations or in accordance with applicable statutory
                limitation periods.
              </p>
            </div>

            {/* 8. Your rights */}
            <div className="legal-section" id="your-rights">
              <h2>Your rights</h2>
              <p>
                You may have the right to invoke certain rights (as per applicable laws and regulations
                such as GDPR) in relation to your personal information being processed by the Platform.
              </p>
              <p>
                The Platform may be allowed by law, in particular in case of excessive or manifestly
                unfounded requests, to charge a fee for fulfilling your request, subject to applicable
                conditions.
              </p>
              <p>
                You are legally entitled to request details of the personal information we may be holding
                about you. The Company provides you the ability to keep your personal information accurate
                and up-to-date. If at any time you would like to rectify, erase, or restrict the
                processing of your personal information — or you would like to obtain confirmation
                whether or not your personal information is processed, access your personal information,
                exercise your right to data portability, or withdraw your consent to processing — please
                contact us.
              </p>
              <p>
                You are entitled to lodge a complaint with a competent Data Protection Authority where
                existing, concerning the Platform&rsquo;s compliance with applicable data protection laws
                and regulations.
              </p>
              <div className="legal-highlight">
                <p>
                  To exercise any of these rights, write to{" "}
                  <a href="mailto:privacy@collegencourses.com">privacy@collegencourses.com</a>.
                  We will respond within 30 days.
                </p>
              </div>
            </div>

            {/* 9. Security */}
            <div className="legal-section" id="security">
              <h2>Confidentiality &amp; security</h2>
              <p>
                The security and confidentiality of your personal data is important to us and
                CollegeNCourses has invested significant resources to protect the safekeeping and
                confidentiality of your personal data. When using external service providers acting as
                processors, we require that they adhere to the same standards as CollegeNCourses.
                Regardless of where your personal information is transferred or stored, we take all steps
                reasonably necessary to ensure that personal data is kept secure.
              </p>
              <p>
                We have physical, electronic, and procedural safeguards that comply with the laws
                prevalent in India to protect personal information about you. We seek to ensure compliance
                with the requirements of the Information Technology Act, 2000 and Rules made thereunder,
                to ensure the protection and preservation of your privacy.
              </p>
            </div>

            {/* 10. Social media */}
            <div className="legal-section" id="social-media">
              <h2>Social media</h2>
              <p>
                CollegeNCourses operates channels, pages, and accounts on some social media sites to
                inform, assist, and engage with you. CollegeNCourses monitors and records comments and
                posts made on these channels about CollegeNCourses in order to improve its products and
                services.
              </p>
              <p>Please note that you must not communicate with CollegeNCourses through social media sites the following information:</p>
              <ul>
                <li>
                  Sensitive personal data including special categories of personal data — meaning any
                  information revealing racial or ethnic origin, political opinions, religious or
                  philosophical beliefs, or trade union membership, and the processing of genetic data,
                  biometric data for the purpose of uniquely identifying a natural person, data concerning
                  health or data concerning a natural person&rsquo;s sex life or sexual orientation, and
                  other sensitive personal data such as criminal convictions and offences and national
                  identification numbers.
                </li>
                <li>Excessive, inappropriate, offensive, or insulting information towards individuals.</li>
              </ul>
              <p>
                CollegeNCourses is not responsible for any information posted on those sites other than
                the information posted by its employees on its behalf, and is only responsible for its
                own use of the personal data received through such sites.
              </p>
            </div>

            {/* 11. Children */}
            <div className="legal-section" id="children">
              <h2>Age requirements</h2>
              <p>To use the site you agree that you must be of minimum age or older.</p>
              <ul>
                <li>
                  If you are a resident of the European Union, the minimum age is 16. However, if local
                  laws require that you must be older in order for CollegeNCourses to lawfully provide
                  the services to you, that older age shall apply as the applicable minimum age.
                </li>
                <li>
                  In all jurisdictions outside the European Union, if you are under the age of 18 or the
                  age of majority in your jurisdiction, you must use CollegeNCourses under the supervision
                  of your parent, legal guardian, or responsible adult.
                </li>
              </ul>
            </div>

            {/* 12. Changes */}
            <div className="legal-section" id="changes">
              <h2>Policy changes</h2>
              <p>
                CollegeNCourses reserves the right to update, change, or modify this policy at any time.
                The policy shall come into effect from the date of such update, change, or modification.
                We will endeavour to notify registered users of material changes by email.
              </p>
            </div>

            {/* 13. Disclaimer */}
            <div className="legal-section" id="disclaimer">
              <h2>Disclaimer</h2>
              <p>
                CollegeNCourses shall not be liable for any loss or damage sustained by reason of any
                disclosure (inadvertent or otherwise) of any information concerning the user&rsquo;s
                account and/or information relating to or regarding online transactions using credit
                cards/debit cards and/or their verification process and particulars, nor for any error,
                omission or inaccuracy with respect to any information so disclosed and used, whether or
                not in pursuance of a legal process or otherwise. CollegeNCourses does not store any
                credit/debit card details.
              </p>
              <p>
                Any other personal information shared by you which is not asked by CollegeNCourses during
                registration, either mandatorily or optionally, accounts to wilful and intentional
                furnishing, and CollegeNCourses will not be liable for breach of such information.
              </p>
            </div>

            {/* 14. Contact */}
            <div className="legal-section" id="contact-privacy">
              <h2>Contact us</h2>
              <p>
                If you have any questions regarding this privacy policy or the protection of your personal
                data, please contact our Data Protection Officer / Grievance Officer:
              </p>
              <div className="legal-highlight">
                <p style={{ marginBottom: 6 }}>
                  <strong>Data Protection Officer / Grievance Officer</strong>
                </p>
                <p style={{ marginBottom: 4 }}>
                  <strong>Dnyanal Educon Pvt Ltd</strong><br />
                  Flat No. A-603, Utsav Homes, Patilnagar,<br />
                  Bavdhan BK, Pune &ndash; 411021, Maharashtra, India
                </p>
                <p style={{ margin: 0 }}>
                  Email:{" "}
                  <a href="mailto:grievances@collegencourses.com">
                    grievances@collegencourses.com
                  </a>
                </p>
              </div>
              <p>
                For data deletion or privacy-specific requests, write to{" "}
                <a href="mailto:privacy@collegencourses.com">privacy@collegencourses.com</a>.
              </p>
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
      `}</style>
    </main>
  );
}
