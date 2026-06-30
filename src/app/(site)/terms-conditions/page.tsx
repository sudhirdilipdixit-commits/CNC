import type { Metadata } from "next";
import Link from "next/link";
import LegalToc from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Terms & Conditions | CollegeNCourses",
  description:
    "Terms and conditions governing your use of www.collegencourses.com, operated by Dnyanal Educon Pvt Ltd (DEPL).",
  openGraph: {
    title: "Terms & Conditions | CollegeNCourses",
    description:
      "Legally binding agreement between you and Dnyanal Educon Pvt Ltd governing your access to and use of the CollegeNCourses platform.",
  },
};

const TOC = [
  { id: "overview",            label: "Introduction" },
  { id: "eligibility",         label: "Eligibility" },
  { id: "registration",        label: "Registration" },
  { id: "purpose",             label: "Purpose" },
  { id: "conformity",          label: "Use Conformity" },
  { id: "use-of-platform",     label: "Use of Platform" },
  { id: "restrictions",        label: "Restrictions on Materials" },
  { id: "external-sites",      label: "External Sites" },
  { id: "privacy",             label: "Privacy" },
  { id: "payment-terms",       label: "Payment Terms" },
  { id: "disclaimer-warranty", label: "Disclaimer of Warranty" },
  { id: "content-liability",   label: "Content & Liability" },
  { id: "license-disclaimer",  label: "License Disclaimer" },
  { id: "online-availability", label: "Online Availability" },
  { id: "purchasing",          label: "Purchasing & Ordering" },
  { id: "your-responsibility", label: "Your Responsibility" },
  { id: "indemnification",     label: "Indemnification" },
  { id: "limitation-liability",label: "Limitation of Liability" },
  { id: "taxes",               label: "Taxes" },
  { id: "termination",         label: "Termination" },
  { id: "miscellaneous",       label: "Miscellaneous" },
  { id: "contact-us",          label: "Contact Us" },
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
            <div className="legal-section" id="overview">
              <h2>Introduction</h2>
              <p>
                The following terms and conditions, along with all other terms and legal notices located on
                www.collegencourses.com (collectively, &ldquo;Terms&rdquo;), govern Your use of
                www.collegencourses.com (the &ldquo;Website&rdquo;). The Website is owned and operated by
                Dnyanal Educon Pvt Ltd (hereinafter referred to as &ldquo;Company&rdquo;).
              </p>
              <p>
                These Terms of Use (&ldquo;Terms&rdquo;) constitute a legally binding agreement
                (&ldquo;Agreement&rdquo;) between the user who visits the Website in connection with use
                of our services, or whose information Company otherwise receives in connection with the
                services provided through its education business (&ldquo;You&rdquo;) and the Company
                governing Your access to and use of the Platform, including any subdomains thereof, and
                any other websites through which the Website makes its services available (collectively,
                &ldquo;Site&rdquo;), our mobile, tablet and other smart device applications, and application
                program interfaces (collectively, &ldquo;Application&rdquo;). The Application and Site are
                collectively termed as &ldquo;Platform&rdquo;.
              </p>
              <p>
                Access to any part of the Platform or any content downloaded from it is contingent on Your
                acceptance of and compliance with these Terms and Privacy Policy. If You do not understand
                and agree to be bound by all Terms and the Privacy Policy, do not use this Platform.
              </p>
              <p>
                These Terms are binding upon You and Your heirs, representatives, successors and assigns,
                as may be applicable. The headings of the several articles and subdivisions of these Terms
                are inserted solely for the convenience of reference and shall have no further meaning,
                force or effect.
              </p>
              <p>Additionally, basis services chosen, certain product specific conditions may apply.</p>
            </div>

            {/* 1. Eligibility */}
            <div className="legal-section" id="eligibility">
              <h2>Eligibility</h2>
              <p>You represent and warrant that:</p>
              <ol>
                <li>
                  You are competent to enter into a valid binding contract as per the applicable laws. If
                  You are a resident of the European Union the minimum age for these purposes shall be 16,
                  however if local laws require that You must be older in order for the Platform to lawfully
                  provide the services in the Platform to You then that older age shall apply as the
                  applicable minimum age.
                  <br /><br />
                  In all jurisdictions outside the European Union, if You are under the age of 18 or the
                  age of majority in Your jurisdiction, You must use the Platform under the supervision of
                  Your parent, legal guardian or responsible adult.
                  <br /><br />
                  By accessing or using the Platform You represent and warrant that You fulfil the
                  requirement of minimum age and have the legal capacity and authority to enter into a
                  contract as per the applicable laws.
                  <br /><br />
                  You are not under any legal or other disability which limits Your ability to comply with
                  these Terms or to install and use the products You purchase with minimal risk of harm to
                  You or others. You further represent that You are not purchasing the products/services
                  for resale to others and will not do so without the Company&rsquo;s prior written consent.
                </li>
                <li>You are eligible to conduct the purpose &ldquo;hereinafter defined&rdquo; lawfully.</li>
              </ol>
            </div>

            {/* 2. Registration */}
            <div className="legal-section" id="registration">
              <h2>Registration</h2>
              <p>On registration You agree to:</p>
              <ul>
                <li>
                  Make Your contact details available to partners/business associates of the Platform. You
                  may be contacted by Platform or its partners for additional information and registration
                  process through email, telephone and SMS.
                </li>
                <li>
                  Receive promotional mails/special offers from Platform or any of its partner
                  websites/applications. If You do not wish to be contacted by Platform, please modify the
                  settings at the time of registration or in the &ldquo;Accounts &amp; Settings&rdquo;
                  section on the Platform.
                </li>
                <li>Be contacted by Dnyanal Educon Pvt Ltd in accordance with the settings set by You.</li>
                <li>
                  By submitting your personal contact details the user agrees that he/she permits IRPL,
                  its partners, associates and other service providers to contact the user for the product
                  service he has enquired and also permits service providers of other product services to
                  contact the user in future unless the user unsubscribes.
                </li>
              </ul>
            </div>

            {/* 3. Purpose */}
            <div className="legal-section" id="purpose">
              <h2>Purpose</h2>
              <p>
                The Platform is made available for use to help aspirants get details, discover &amp;
                research on colleges, courses and exams of their interest and for allied services related
                thereto. Platform also helps connect colleges/educational institutes/coaching centres etc.
                with prospective aspirants who may be of interest to them. Study Abroad section of Platform
                also assists aspirants in completing and submitting their applications to universities
                abroad. (&ldquo;Purpose&rdquo;).
              </p>
            </div>

            {/* 4. Conformity */}
            <div className="legal-section" id="conformity">
              <h2>Use to be in conformity with the Purpose</h2>
              <p>
                The Platform (including the Platform and related products) or Service or Product that You
                subscribe to or use (whether the same is paid for by You or not) is meant for the Purpose
                and only Your exclusive use. Copying or downloading or recreating or sharing passwords or
                sublicensing or sharing in any manner which is not in accordance with these terms, is a
                misuse of the Platform or Service or Product and Company reserves its rights to act in
                such manner as to protect its loss of revenue or reputation or claim damages including
                stopping Your service or access and reporting to relevant authorities. In the event You are
                found to be copying or misusing or transmitting, scraping or crawling any data or
                photographs or graphics or any information available on the Platform or Service of Product
                for any purpose other than that being a bonafide purpose, we reserve the right to take
                such action that we deem fit including stopping access and claiming damages.
              </p>
              <ol>
                <li>
                  <strong>Accuracy and correctness of the information provided by You:</strong>
                  <ul>
                    <li>
                      Whilst using this Platform an obligation is cast upon You to only provide true and
                      correct information and in the case of creating a profile You undertake to at all
                      times keep the information up to date.
                    </li>
                    <li>
                      We reserve the right to remove/suspend any content or profile providing
                      false/incorrect or incomplete or outdated information or masquerading/impersonating
                      as someone else.
                    </li>
                    <li>
                      Keep Your contact details up to date; wrong and false details by themselves can be a
                      cause for termination of services. Also as a consequence we may not be able to reach You.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Security of log in credentials and responsibility of content/activities:</strong>
                  <ul>
                    <li>Do not share passwords; be responsible in what You post.</li>
                    <li>
                      If You have registered on the Platform, the safety and security of Your log in
                      credentials is Your responsibility; do not share these with anyone.
                    </li>
                    <li>
                      You are fully responsible for all activities that occur under the account and any
                      other actions taken in connection with the Platform. It is presumed that all activity
                      happening through a user&rsquo;s account on the Platform are being done after having
                      obtained proper authorizations and all lawful permissions as may be applicable.
                    </li>
                    <li>
                      The Platform may contain links to third party websites/apps; these links are provided
                      solely as convenience to You and the presence of these links should not under any
                      circumstances be considered as an endorsement of the contents of the same. If You
                      choose to access these websites/apps You do so at Your own risk.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* 5. Use of Platform */}
            <div className="legal-section" id="use-of-platform">
              <h2>Use of the Platform</h2>
              <ol>
                <li>
                  The Platform and the services and products offered via the Platform are meant only for
                  legitimate and lawful uses which fall within the scope of the Purpose and are meant only
                  for Your exclusive use. The Company has the sole and absolute right to determine whether
                  a specific type of action or use falls within the scope of the Purpose or not.
                </li>
                <li>
                  The following actions will inter alia constitute a misuse of the Platform and are
                  strictly prohibited:
                  <ul>
                    <li>
                      Copying, extracting, downloading, sharing, modifying, selling, storing, distributing,
                      making derivative works from or otherwise exploiting any content, data, information,
                      including profiles, photographs and/or graphics, available on the Platform and/or any
                      services or products of the Company, in any manner or for any purpose which is not
                      consistent with the Purpose and/or in accordance with these Terms.
                    </li>
                    <li>
                      Using or attempting to use any automated program, software or system or any similar
                      or equivalent process (including spiders, robots, crawlers, browser
                      plug-ins/extensions/add-ons, iframes on third party sites, mirroring, HTML parsers
                      etc.) to access, navigate, search, copy, monitor, download, scrape, crawl or
                      otherwise extract in any manner any data or content from the Platform.
                    </li>
                    <li>
                      Modifying Platform services or their appearance using any technology or overlay any
                      additional offering on top of Platform services or simulate Platform services or its
                      functions in any manner whatsoever without explicit consent from the Company.
                    </li>
                    <li>
                      Gaining or attempting to gain unauthorized access (inter alia by hacking, password
                      &ldquo;mining&rdquo; or any other means) to any portion or feature of the Platform
                      or any of the services or products offered on or through the Platform which are not
                      intended for You; or to any server, Platform, program or computer systems of the
                      Company or any other third parties and/or Users.
                    </li>
                    <li>Accessing the Platform through interfaces other than those expressly provided by Company.</li>
                    <li>
                      Attempting to breach or breaching any security or authentication measures set up by
                      the Company in relation to the Platform and/or attempting to probe, scan or test the
                      vulnerability of the Company&rsquo;s system or network.
                    </li>
                    <li>
                      Scraping, downloading (including bulk-downloading), replicating or otherwise
                      extracting any information or data from the Platform (by any process, whether
                      automatic or manual) to offer any products or services which are similar to or may
                      in any manner compete with the products or services of the Company.
                    </li>
                    <li>
                      Reverse engineering, decompiling, disassembling, deciphering or otherwise attempting
                      to derive the source code for the Site or Application or any related technology or
                      any part thereof.
                    </li>
                    <li>
                      Circumventing or attempting to circumvent any technological protections used or
                      employed by the Company or by any third party in order to protect the content on the
                      Platform and/or to exclude robots, spiders etc. from crawling and/or scraping
                      content from the Platform.
                    </li>
                    <li>
                      Interfering with or disrupting or attempting to interfere with or disrupt (including
                      by using any device, software or routine) the use of the Platform or any computer
                      networks connected to the Platform, by any other User.
                    </li>
                    <li>
                      Impersonating any other person or entity, or making any misrepresentation as to Your
                      employment by or affiliation with any person or entity.
                    </li>
                    <li>
                      Forging headers or in any manner manipulating identifiers in order to disguise the
                      origin of any user information.
                    </li>
                    <li>Stalking, threatening, or in any manner harassing any other User.</li>
                    <li>Imposing an unreasonable or disproportionately large load on the Platform infrastructure.</li>
                    <li>
                      Engaging in &ldquo;framing,&rdquo; &ldquo;mirroring,&rdquo; or otherwise simulating
                      the appearance or function of the Platform (or any part thereof) and providing
                      deeplinks into this Platform without prior permission of Company.
                    </li>
                    <li>
                      Spamming the Platform/Company or any other Users including by uploading, posting,
                      emailing, transmitting or otherwise making available either directly or indirectly,
                      any unsolicited bulk e-mail or unsolicited commercial e-mail.
                    </li>
                    <li>
                      Hosting, modifying, uploading, posting, transmitting, publishing, or distributing
                      any material or information that: violates any applicable local, provincial, state,
                      national or international law; belongs to another person and to which You have no
                      right; infringes intellectual property rights; contains computer viruses or malware;
                      is grossly harmful, harassing, defamatory, obscene, or pornographic; constitutes or
                      encourages conduct that would constitute a criminal offence; or threatens the unity,
                      integrity, defence, security or sovereignty of India.
                    </li>
                  </ul>
                </li>
                <li>
                  As a user, while submitting an enquiry, I provide consent to be contacted for promotion
                  via WhatsApp, SMS, Mail etc.
                </li>
              </ol>
            </div>

            {/* 6. Restrictions on Materials */}
            <div className="legal-section" id="restrictions">
              <h2>Restrictions Regarding Materials</h2>
              <ol>
                <li>
                  All information, documents, software, images, photographs, text, services and other
                  similar materials (collectively, &ldquo;Materials&rdquo;) contained in this Platform if
                  provided by Company or its third party authors, developers and vendors (&ldquo;Third
                  Party Providers&rdquo;) and are capable of being so protected are the copyrighted work
                  of Company and/or the Third Party Providers. Except as stated herein, none of the
                  Materials may be copied, reproduced, distributed, republished, downloaded, displayed,
                  posted or transmitted in any form or by any means, including, but not limited to,
                  electronic, mechanical, photocopying, recording, or otherwise, without the prior express
                  written permission of Company or the Third Party Provider. No part of the Platform,
                  including logos, graphics, sounds or images, may be reproduced or retransmitted in any
                  way, or by any means, without the prior express written permission of Company. You also
                  may not, without Dnyanal Educon Pvt Ltd&rsquo;s prior express written permission,
                  &ldquo;mirror&rdquo; any Materials contained on this Platform on any other server.
                </li>
                <li>
                  Nothing on this Platform shall be construed as conferring any license under any of
                  Dnyanal Educon Pvt Ltd&rsquo;s or any Third Party Provider&rsquo;s intellectual
                  property rights, whether by estoppels, implication, or otherwise. You acknowledge sole
                  responsibility for obtaining any such licenses.
                </li>
                <li>
                  Permission is granted to display, copy, distribute and download Dnyanal Educon Pvt
                  Ltd&rsquo;s Materials on this Platform provided that: (1) both the copyright notice
                  identified below and this permission notice appear in the Materials, (2) the use of such
                  Materials is solely for personal, non-commercial and informational use and will not be
                  copied or posted on any networked computer or broadcast in any media, and (3) no
                  modifications of any of the Materials are made. This permission terminates automatically
                  without notice if You breach any of these Terms. Upon termination, You will immediately
                  destroy any downloaded or printed Materials.
                </li>
                <li>
                  Materials provided by Third Party Providers have not been independently authenticated
                  in whole or in part by Company. The Platform does not provide, sell, license, or lease
                  any of the Materials other than those specifically identified as being provided by
                  Company. Company may, in its sole discretion, terminate or restrict the access rights of
                  users who infringe or otherwise violate others&rsquo; intellectual property rights.
                </li>
              </ol>
            </div>

            {/* 7. External Sites */}
            <div className="legal-section" id="external-sites">
              <h2>Disclaimer for websites that we link to</h2>
              <p>We use our best endeavours to ensure that:</p>
              <ul>
                <li>the websites/apps we select for inclusion in the Platform work, and continue to work properly;</li>
                <li>their content remains acceptable and useful; and</li>
                <li>their operation will not be injurious to our users&rsquo; devices.</li>
              </ul>
              <p>We explicitly disclaim, and will not accept any responsibility for any of the following in respect of the sites that we link to:</p>
              <ul>
                <li>Infection by computer viruses</li>
                <li>Damage caused by downloaded software</li>
                <li>Technical problems, failures and speed of operation</li>
                <li>Libelous or illegal material</li>
                <li>The quality or truth of any material, or advice that is offered</li>
              </ul>
            </div>

            {/* 8. Privacy */}
            <div className="legal-section" id="privacy">
              <h2>Privacy</h2>
              <p>
                The{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>{" "}
                of the Platform explains how we may use Your personal data. We will at all times respect
                and ensure adherence to the privacy policy. Additionally various settings are provided to
                help You control the manner in which others may be able to view Your information and the
                manner in which You may have chosen to be contacted. Any feedback provided by a user shall
                be deemed as non-confidential to the user.
              </p>
              <h3>Terms specific for educational institutions/colleges etc. (as applicable)</h3>
              <ul>
                <li>
                  You will comply with all applicable data protection laws in relation to the processing of
                  personal data; and not process personal data in an unlawful manner and excessive with
                  regard to agreed purposes as defined in the privacy policy and this terms and conditions.
                </li>
                <li>
                  You shall implement adequate technical and organizational controls to protect the shared
                  personal data obtained from the Company against unauthorised or unlawful processing and
                  against accidental loss, destruction, damage, alteration or disclosure.
                </li>
                <li>
                  You agree to provide reasonable assistance as is necessary to facilitate the handling of
                  any Data Security Breach (as applicable under GDPR or any other privacy law as
                  applicable) in an expeditious and compliant manner.
                </li>
                <li>
                  You agree that the responsibility for complying with a data subject request lies with the
                  Party which holds/processes the Personal Data collected/shared.
                </li>
                <li>
                  You warrant and represent that the institution shall not disclose or transfer Personal
                  Data obtained from the Company to any sub-processors without ensuring that adequate and
                  equivalent safeguards to the Personal Data.
                </li>
                <li>
                  You shall retain or process shared Personal Data for no longer than is necessary to carry
                  out the agreed purposes.
                </li>
              </ul>
              <p>
                Platform and the educational institutions etc. (as applicable) would act as independent
                controllers in their respective capacity.
              </p>
            </div>

            {/* 9. Payment Terms */}
            <div className="legal-section" id="payment-terms">
              <h2>Payment Terms</h2>
              <p>
                Payments for the services offered by the Platform shall be on a 100% advance basis. The
                payment for service once subscribed to by you is not refundable and any amount paid shall
                stand appropriated. Refund, if any, will be at the sole discretion of the Company.
              </p>
              <p>User hereby irrevocably accepts to receive the tax invoice as soft copy through emails.</p>
              <p>
                Notwithstanding anything contained in any other agreement or arrangement, by whatever name
                called, the performance obligation of the Company (service provider) is to provide access
                of its on-line portal to the customer for the duration of the subscription period &amp;
                reference to any usage, by whatever name called or any other performance obligation, if
                any, is to provide the upper limit for consumption, which by itself, does not create any
                additional performance obligation upon the Company.
              </p>
              <p>
                The Company offers no guarantees whatsoever for the accuracy or timeliness of the refunds
                reaching the Customers card/bank accounts.
              </p>
              <p>
                In the event of any suspension or termination of services on account of non-compliance of
                these Terms of Use, any payment made to the Company by you shall stand forfeited with
                immediate effect.
              </p>
              <p>
                The User acknowledges and agrees that Company/Platform, at its sole discretion and without
                prejudice to other rights and remedies that it may have under the applicable laws, shall be
                entitled to set off the amount excess paid by a subscriber/user against any amount(s)
                payable by User to Company under any other agreement or commercial relationship towards
                other products/services. The Company gives no guarantees of server uptime or applications
                working properly. All is on a best effort basis and liability is limited to refund of
                amount only.
              </p>
              <p>
                The User or customer shall be required to promptly provide copy of TDS certificate to the
                Company as mandated under law for tax deducted at source from the payments made to the
                Company.
              </p>
              <p>
                Users buying the products online are redirected to third party gateways for completing
                payment transactions. These transactions happen on third party network and hence not
                controlled by Company.
              </p>
              <p>
                A User through his user identification shall be solely responsible for carrying out any
                online or off-line transaction involving credit cards / debit cards or such other forms of
                instruments or documents for making such transactions and Company assumes no responsibility
                or liability for their improper use of information relating to such usage of credit cards /
                debit cards used by the subscriber online / off-line.
              </p>
              <p>
                The Company shall not be liable for any loss or damage sustained by reason of any disclosure
                (inadvertent or otherwise) of any information concerning the user&rsquo;s account and/or
                information relating to or regarding online transactions using credit cards / debit cards
                and/or their verification process and particulars nor for any error, omission or inaccuracy
                with respect to any information so disclosed and used whether or not in pursuance of a
                legal process or otherwise.
              </p>
            </div>

            {/* 10. Disclaimer of Warranty */}
            <div className="legal-section" id="disclaimer-warranty">
              <h2>Disclaimer of Warranty</h2>
              <p>
                The Company expressly disclaims warranties of any kind for any use of or any access to the
                Platform, to any material, information, links, or content presented on the web pages at
                the Platform, to any external website linked thereto, and to any external material,
                information, links, or content linked thereto. The Platform, and any material, information,
                links, and content presented on the web pages at the Platform, as well as any external
                website and any external material, information, links, and content linked thereto, are
                provided on an &ldquo;as is&rdquo; basis, without warranty of any kind, either express or
                implied, including, without limitation, the implied warranties of merchantability or fitness
                for a particular purpose, or non-infringement.
              </p>
              <p>
                The Company has no control over any external website or over any external material,
                information, links, and content linked to the Platform. Certain jurisdictions do not permit
                the exclusion of implied warranties and the foregoing exclusions of implied warranties may
                not apply to You.
              </p>
              <p>
                The Platform and its internal web pages may be unavailable for online access from time to
                time and at anytime; there are no guarantees and no warranties of online availability,
                impressions, and click-throughs. The entire risk as to the performance of, or
                non-performance of, or arising out of the use of, or the access of, or the lack of access
                to the Platform, to any material, information, links, or content presented on the web pages
                at the Platform, to any external website linked thereto, or to any external material,
                information, links, or content linked thereto, is borne by the user, visitor, customer, or
                other person.
              </p>
            </div>

            {/* 11. Content & Liability Disclaimer */}
            <div className="legal-section" id="content-liability">
              <h2>Content and Liability Disclaimer</h2>
              <p>
                Platform is an intermediary as defined under sub-clause (w) of Section 2 of the
                Information Technology Act, 2000.
              </p>
              <p>
                Company shall not be responsible for any errors or omissions contained on any Company
                website, and reserves the right to make changes anytime without notice. Mention of
                non-Dnyanal Educon Pvt Ltd products or services is provided for informational purposes
                only and constitutes neither an endorsement nor a recommendation by Company. All Company
                and third-party information provided on any Company Platform is provided on an &ldquo;as
                is&rdquo; basis.
              </p>
              <p>
                Views expressed by the users are their own, Dnyanal Educon Pvt Ltd does not endorse the
                same. No claim as to the accuracy and correctness of the information on the site is made
                although every attempt is made to ensure that the content is not misleading. In case any
                inaccuracy is or otherwise improper content is sighted on the Platform, please report it.
              </p>
              <p>
                This Platform could include unintended inaccuracies or typographical errors. Company and
                the third-party providers may make improvements and/or changes in the products, services,
                programs, and prices described in this Platform at any time without notice.
              </p>
              <p>
                The material, information, links, and content presented on and by this Platform is of a
                general nature only and is not intended to address the specific circumstances, requirements,
                or any other needs of any particular individual or entity. It cannot be guaranteed that the
                material, information, links, and content presented on and by this Platform is
                comprehensive, complete, accurate, sufficient, timely, or up to date for any particular
                purpose or use. The material, information, links, and content presented on and by this
                Platform should not be considered as professional, legal, business, financial, investment,
                or purchasing advice.
              </p>
              <p>
                This Platform is sometimes linked to external Platforms over which Company has no control
                and assumes no responsibility, and is in no way acting as a publisher of material,
                information, links, and content contained on external linked websites. Links are provided
                as a convenience and do not necessarily constitute, signify, or otherwise imply an
                endorsement by, or a relationship with, or connection to Company.
              </p>
            </div>

            {/* 12. License Disclaimer */}
            <div className="legal-section" id="license-disclaimer">
              <h2>License Disclaimer</h2>
              <p>
                Nothing on any Company website shall be construed as conferring any license under any of
                Dnyanal Educon Pvt Ltd&rsquo;s or any third party&rsquo;s intellectual property rights,
                whether by estoppel, implication, or otherwise.
              </p>
              <p>
                Dnyanal Educon Pvt Ltd disclaims all warranties, expressed or implied, with regard to any
                information (including any software, products, or services) provided on any Dnyanal Educon
                Pvt Ltd Platform, including the implied warranties of merchantability and fitness for a
                particular purpose, and non-infringement.
              </p>
            </div>

            {/* 13. Online Availability */}
            <div className="legal-section" id="online-availability">
              <h2>Disclaimer of Online Availability, Impressions, and Click-Through</h2>
              <p>
                In addition to the other disclaimers and limitations discussed in this notice, there are
                no guarantees and no warranties regarding online availability, impressions, and
                click-through of the Website, its web pages, the Application and any material, information,
                links, or content presented on the web pages that may be accessible through the Platform.
              </p>
              <p>
                Platform reserves the right although it is under no obligation to ensure that advertising
                sponsors and advertising must be approved by Company before the posting of any advertising
                material, information, links, content, banners, and graphics on the Platform. Any
                advertising should be related to interactive digital television and related subject areas.
                Company reserves the right to accept or to reject any advertising sponsor or any
                advertising for any reason.
              </p>
            </div>

            {/* 14. Purchasing & Ordering */}
            <div className="legal-section" id="purchasing">
              <h2>Purchasing and Ordering Disclaimer</h2>
              <h3>Make Your own decisions</h3>
              <p>
                If You are making or planning to make any decision, whether personal or business decisions,
                based on the content on the site, You should conduct an independent verification before
                making Your important decision. In the case of any listings or banners displaying any
                content related to any educational products, You may contact the institution/individual
                directly. All decisions made would be entirely Your prerogative and Company does not claim
                to offer any advice, either legal or financial.
              </p>
              <p>
                Company doesn&rsquo;t take any ownership, directly or indirectly towards any person
                whatsoever, with respect to banners hosted on its Platform by its customers, which are
                strictly in the nature of sale of space by Platform &amp; it has not carried out any
                independent verification on the authenticity or compliance requirements, as may have been
                required under any law for the time being in force, of such images/banners/listings.
              </p>
              <p>
                In purchasing/subscribing to a Product/service offered on this Platform You are advised
                to read these Terms carefully before proceeding further. You hereby understand and agree
                to the Terms below. If You do not understand and agree with these Terms then do not place
                an order for a Product/service.
              </p>
              <p>
                <strong>Pricing.</strong> All prices are subject to change without notice. Every effort
                has been made to ensure accurate pricing of the products/services featured on our Platform.
                In the event a part or accessory is ordered and the listed price has changed, You will be
                notified prior to our processing Your order.
              </p>
              <p>
                <strong>Purchase &ldquo;as is.&rdquo;</strong> All products/services are provided by the
                Company on &ldquo;as is&rdquo; basis with no representations or warranties of any kind
                from the Company, including without limitation no warranties as to the nature and quantum
                of responses to any banner or listing displayed on the Platform.
              </p>
            </div>

            {/* 15. Your Responsibility */}
            <div className="legal-section" id="your-responsibility">
              <h2>Your Responsibility and Damage Limits</h2>
              <p>
                You have sole responsibility for use of the products/services You purchase through this
                Platform. In no event shall collegencourses.com be liable to You in relation to the
                products/services, or Your use, misuse or inability to use the products, for any (1)
                indirect, punitive, special, exemplary, incidental, or consequential damage (including
                loss of business, revenue, profits, use, data or other economic advantage); or (2) direct
                damages in excess of the amount You paid the Company for the applicable product/service.
              </p>
            </div>

            {/* 16. Indemnification */}
            <div className="legal-section" id="indemnification">
              <h2>Indemnification</h2>
              <p>
                By accepting these Terms of Use, You agree to indemnify and otherwise hold harmless
                Company, its directors, officers, employers, agents, subsidiaries, affiliates and other
                partners from any direct, indirect, incidental, special, consequential or exemplary damages
                arising out of, relating to, or resulting from Your use of the Platform including but not
                limited to information provided by You or any other matter relating to the Platform. Any
                reference to duties and taxes etc in these Terms of Use shall include Goods and Services
                Tax (GST). Any additional tax liability arising on account of GST (whether on account of
                increase in rate or any other change under the tax regime) would be recovered over and
                above the agreed contract price / service fee.
              </p>
            </div>

            {/* 17. Limitation of Liability */}
            <div className="legal-section" id="limitation-liability">
              <h2>Limitation of Liability</h2>
              <p>
                In no event and under no circumstances and under no legal theory, tort, contract, or
                otherwise shall Company be liable, without limitation, for any damages whatsoever,
                including direct, indirect, incidental, consequential or punitive damages, arising out of
                any access to or any use of or any inability to access or use this Platform including any
                material, information, links, and content accessed through this Platform or through any
                linked external website/application.
              </p>
              <p>
                Unless otherwise specified and notwithstanding anything contained in any other agreement
                or arrangement, by whatever name called, the performance obligation of the Company
                (service provider) is to provide access of its on-line portal to the customer for the
                duration of the subscription period &amp; reference to any usage, by whatever name called
                or any other performance obligation, if any, is to provide the upper limit for consumption,
                which by itself, does not create any additional performance obligation upon Company.
              </p>
            </div>

            {/* 18. Taxes */}
            <div className="legal-section" id="taxes">
              <h2>Taxes</h2>
              <p>
                Any reference to duties and taxes etc in these Terms of Use shall include Goods and
                Services Tax (&ldquo;GST&rdquo;) or Value Added Tax (VAT) as per local jurisdiction or
                any other similar tax or duty, by whatever name called (herein referred as GST) and shall
                be charged in addition to the basic amount, in accordance with respective laws &amp;
                regulations.
              </p>
              <p>
                You are required to provide true &amp; correct information as required under tax laws,
                including but not limited to SEZ unit or usage therein. The Company shall be entitled to
                consider any information available as per its records to be correct &amp; true &amp;
                discharge its tax obligations accordingly. In case of any discrepancy or change, the user
                is required to promptly intimate the correct or updated particulars to the Company.
              </p>
              <p>
                The Company shall be entitled to seek indemnification from users if it is required to pay
                any tax, duty, fee, interest or penalty in view of incorrect or incomplete information or
                data furnished by user or not got rectified/updated by user timely.
              </p>
            </div>

            {/* 19. Termination */}
            <div className="legal-section" id="termination">
              <h2>Termination / Suspension</h2>
              <p>
                Company may, without notice in its sole discretion, and at any time, terminate or restrict
                Your use or access to the Platform (or any part thereof) for any reason, including, without
                limitation, that the company based on its judgement and perception believes You have
                violated or acted inconsistently with the letter or spirit of these terms of use.
              </p>
            </div>

            {/* 20. Miscellaneous */}
            <div className="legal-section" id="miscellaneous">
              <h2>Miscellaneous</h2>

              <h3>Amendment to these Terms</h3>
              <p>
                Company reserves its right to amend/alter or change all or any disclaimers or term(s) or
                condition(s) of agreements at any time without any prior notice.
              </p>
              <p>
                Businesses, environment and technology evolve and in order to accommodate the changing
                nature of the environment in which we operate as well to provide for any additional
                features that may be introduced in future, these Terms may need modifications or additions.
                Such modifications or additions shall be effective immediately upon posting of the modified
                Terms of Use on the Site.
              </p>
              <p>
                You are advised to review the modified Terms of Use periodically to be aware of such
                modifications or additions and your continued access or use of the Site shall be deemed
                conclusive proof of your acceptance of these Terms of Use, as amended/modified from time
                to time.
              </p>

              <h3>Dispute Settlement</h3>
              <p>
                If any dispute arises between a user/users and Company arising out of use of the Platform
                or thereafter, in connection with the validity, interpretation, implementation or alleged
                breach of any provision of these Terms, the dispute shall be referred to a sole arbitrator
                who shall be an independent and neutral third party identified by the Company. Decision of
                the arbitrator shall be final and binding on both the parties to the dispute. The place of
                arbitration shall be Pune, India. The Arbitration &amp; Conciliation Act, 1996 as amended,
                shall govern the arbitration proceedings.
              </p>
              <p>
                The Company will not be party to any legal proceedings between a User (e.g. a subscriber)
                and a party contacted through the site. In case Company is made a party in any legal
                proceedings, costs will be recovered from the party on whose behest the Company is
                involved in the matter. Company however will abide with any court order served on it
                through due process.
              </p>

              <h3>Local Laws</h3>
              <p>
                You are responsible for compliance with applicable local laws including but not limited to
                the export and import regulations of other countries, while consuming the information and
                the services as available through the Platform.
              </p>

              <h3>Governing Law and Jurisdiction</h3>
              <p>
                These Terms shall be governed by the laws of Republic of India. The exclusive forum for
                any disputes arising out of or relating to these Terms shall be a court of law located in
                Pune, India.
              </p>

              <h3>Entire Agreement</h3>
              <p>
                These terms of use as amended from time to time constitute the entire agreement between
                You and company regarding the Platform. These Terms supersede all terms and conditions
                contained in any purchase order, order acknowledgment form, invoice or other business form
                submitted by You.
              </p>
              <p>
                No advertisements, catalogues or other publications or statements, whether written or oral,
                regarding the performance of the Platform permitted under these Terms shall form part of
                these Terms.
              </p>

              <h3>Severability</h3>
              <p>
                If any provision of these Terms are held to be invalid or unenforceable by a court of
                competent jurisdiction, such provision will be changed and interpreted so as to best
                accomplish the objectives of the original provision to the fullest extent allowed by law
                and the remaining provisions of these Terms shall remain in full force and effect.
              </p>

              <h3>Assignment and Delegation</h3>
              <p>
                You may not assign or delegate Your rights under these Terms or the limited license that
                has been extended to You, and any assignment and/or delegation of these Terms or any sub
                licensing by You will be null and void. If any case of this nature is brought to our
                notice, in addition to any other remedies that we may have under the law, we reserve our
                rights to claim damages and seek an injunction against You.
              </p>

              <h3>Availability of Services</h3>
              <p>
                Services are provided on a best efforts basis on an AS IS and AS AVAILABLE basis. There
                are no server uptime guarantees.
              </p>
              <p>
                Any regulations, guidelines, legislations or lawful orders of a court or a quasi-judicial
                body may require us to change, alter or stop our services. Similarly, any force majeure
                events which are beyond our reasonable control, may cause an interruption in the services.
              </p>

              <h3>Data Protection Amendment</h3>
              <p>
                In line with General Data Protection Regulation, the below mentioned obligations are
                drafted which will be applicable on both the parties.
              </p>
              <p><strong>1. Definitions</strong></p>
              <ul>
                <li>
                  <strong>&ldquo;GDPR&rdquo;</strong> means Regulation (EU) 2016/679 of the European
                  Parliament and of the Council of 27th April 2016 on the protection of natural persons
                  with regard to the processing of personal data and on the free movement of such data
                  and repealing Directive 95/46/EC.
                </li>
                <li>
                  The <strong>&ldquo;data exporter&rdquo;</strong> shall mean the controller who transfers
                  the personal data.
                </li>
                <li>
                  The <strong>&ldquo;data importer&rdquo;</strong> shall mean the controller who agrees
                  to receive from the data exporter personal data for further processing in accordance with
                  the terms of these clauses and who is not subject to a third country&rsquo;s system
                  ensuring adequate protection.
                </li>
                <li>
                  <strong>&ldquo;Clauses&rdquo;</strong> shall mean these contractual clauses, which are
                  a free-standing document that does not incorporate commercial business terms established
                  by the parties under separate commercial arrangements.
                </li>
                <li>
                  <strong>&ldquo;Data Protection Legislation&rdquo;</strong> means the GDPR for as long
                  as it is directly applicable in the European Union and any national implementing laws,
                  regulations and secondary legislation, as amended or updated from time to time, in India,
                  and then any successor legislation.
                </li>
                <li>
                  <strong>&ldquo;Data Subject&rdquo;</strong> means a data subject as defined by the Data
                  Protection Legislation.
                </li>
                <li>
                  <strong>&ldquo;Personal Data&rdquo;</strong> means personal data as defined by the Data
                  Protection Legislation.
                </li>
              </ul>
              <p><strong>2. Obligations of the data exporter</strong></p>
              <p>The data exporter warrants and undertakes that:</p>
              <ul>
                <li>The personal data have been collected, processed and transferred in accordance with the laws applicable to the data exporter.</li>
                <li>It has used reasonable efforts to determine that the data importer is able to satisfy its legal obligations under these clauses.</li>
                <li>It will provide the data importer, when so requested, with copies of relevant data protection laws or references to them (where relevant, and not including legal advice) of the country in which the data exporter is established.</li>
              </ul>
              <p><strong>3. Obligations of the data importer</strong></p>
              <p>The data importer warrants and undertakes that:</p>
              <ul>
                <li>It will have in place appropriate technical and organisational measures to protect the personal data against accidental or unlawful destruction or accidental loss, alteration, unauthorised disclosure or access, and which provide a level of security appropriate to the risk represented by the processing and the nature of the data to be protected.</li>
                <li>It will have in place procedures so that any third party it authorises to have access to the personal data, including processors, will respect and maintain the confidentiality and security of the personal data.</li>
                <li>It has no reason to believe, at the time of entering into these clauses, in the existence of any local laws that would have a substantial adverse effect on the guarantees provided for under these clauses.</li>
                <li>It will process the personal data for purposes described in the privacy policy and terms and conditions, and has the legal authority to give the warranties and fulfil the undertakings set out in these clauses.</li>
                <li>It will identify to the data exporter a contact point within its organisation authorised to respond to enquiries concerning processing of the personal data, and will cooperate in good faith with the data exporter, the data subject and the authority concerning all such enquiries within a reasonable time.</li>
                <li>It will not disclose or transfer the personal data to a third party data controller without ensuring that adequate and equivalent safeguards to the Personal Data.</li>
              </ul>
              <p><strong>4. Law applicable to the clauses</strong></p>
              <p>These clauses shall be governed by the law of the country in which the data exporter is established.</p>
              <p><strong>5. Resolution of disputes with data subjects or the authority</strong></p>
              <ul>
                <li>In the event of a dispute or claim brought by a data subject or the authority concerning the processing of the personal data against either or both of the parties, the parties will inform each other about any such disputes or claims, and will cooperate with a view to settling them amicably in a timely fashion.</li>
                <li>The parties agree to respond to any generally available non-binding mediation procedure initiated by a data subject or by the authority. If they do participate in the proceedings, the parties may elect to do so remotely (such as by telephone or other electronic means).</li>
                <li>Each party shall abide by a decision of a competent court of the data exporter&rsquo;s country of establishment or of the authority which is final and against which no further appeal is possible.</li>
              </ul>
              <p><strong>6. Termination of clauses</strong></p>
              <p>
                In the event that the data importer is in breach of its obligations under these clauses,
                then the data exporter may temporarily suspend the transfer of personal data to the data
                importer until the breach is repaired or the contract is terminated. Either party may
                also terminate these clauses if (i) any Commission positive adequacy decision under Article
                25(6) of Directive 95/46/EC is issued in relation to the country to which the data is
                transferred and processed by the data importer, or (ii) Directive 95/46/EC (or any
                superseding text) becomes directly applicable in such country. The parties agree that
                the termination of these clauses at any time, in any circumstances and for whatever reason
                does not exempt them from the obligations and/or conditions under the clauses as regards
                the processing of the personal data transferred.
              </p>
              <p><strong>7. Description of the Transfer</strong></p>
              <p>
                The details of the transfer and of the personal data are specified in the{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> and these Terms &amp; Conditions.
              </p>
            </div>

            {/* 21. Contact Us */}
            <div className="legal-section" id="contact-us">
              <h2>How You may contact us</h2>
              <p>
                You may contact us by approaching us at{" "}
                <a href="mailto:info@collegencourses.com">info@collegencourses.com</a>.
              </p>
              <p>
                In case of any grievances related to content on the Platform please use the{" "}
                <Link href="/grievances">Grievance Redressal</Link> page.
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
            </div>

          </article>
        </div>
      </div>

      {/* Page-scoped styles — identical to privacy-policy page */}
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
