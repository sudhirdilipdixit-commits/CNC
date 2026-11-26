"use client";

import { useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import LeadModal from "@/components/forms/LeadModal";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-legal.css";

const bricolage = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  variable: "--font-planner-display",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  variable: "--font-planner-body",
  subsets: ["latin"],
  display: "swap",
});

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope of this policy" },
  { id: "key-terms", label: "Key terms" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-collect", label: "How we collect it" },
  { id: "why-we-process", label: "Why we process it" },
  { id: "who-we-share", label: "Who we share it with" },
  { id: "cross-border", label: "Cross-border transfer" },
  { id: "retention", label: "Data retention" },
  { id: "protection", label: "How we protect it" },
  { id: "your-rights", label: "Your rights" },
  { id: "cookies", label: "Cookies" },
  { id: "children", label: "Children's data" },
  { id: "grievance-officer", label: "Grievance Officer" },
  { id: "third-party-links", label: "Third-party links" },
  { id: "policy-changes", label: "Policy changes" },
  { id: "governing-law", label: "Governing law" },
  { id: "contact", label: "Contact us" },
];

export default function PlannerPrivacyPolicyClient() {
  const [active, setActive] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    TOC.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader primaryCTA="Get Free Guidance" onOpenLeadForm={() => setModalOpen(true)} />

      <div className="p-breadcrumb">
        <div className="wrap">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <span className="cur">Privacy Policy</span>
        </div>
      </div>

      <section className="legal-head">
        <div className="wrap">
          <div className="p-eyebrow">LEGAL</div>
          <h1 style={{ marginTop: 10, fontSize: 40 }}>Privacy Policy</h1>
          <div className="legal-meta">
            <span><strong>Effective date:</strong> 15 July 2026</span>
            <span><strong>Last updated:</strong> 15 July 2026</span>
          </div>
        </div>
      </section>

      <section className="p-section" style={{ paddingTop: 0 }}>
        <div className="wrap legal-layout">
          <nav className="legal-toc" aria-label="Table of contents">
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="legal-toc-mobile">
            <select
              value={active}
              onChange={(e) => {
                document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {TOC.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="legal-body">
            <div className="legal-section" id="overview" ref={(el) => { sectionRefs.current.overview = el; }}>
              <h2>Overview</h2>
              <p>
                CollegeNCourses is operated by <strong>DNYANAL EDUCON PRIVATE LIMITED</strong> (&quot;DEPL&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), a company incorporated in India (CIN: U85499PN2023PTC220146), with its registered office at FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021, Maharashtra, India.
              </p>
              <p>
                This Privacy Policy explains what personal data we collect when you use collegencourses.com and our related services (together, the &quot;Platform&quot;), why we collect it, who we share it with, and the rights you have over it. We&apos;ve written it as clearly as we know how &mdash; the fine print, in plain language, as we say elsewhere on this site.
              </p>
              <div className="legal-callout">
                <p><strong>In plain language</strong> (this box is a friendly summary only &mdash; the numbered sections below are what actually governs):</p>
                <ul>
                  <li>We collect your name, contact details, and information about the programmes and specializations you&apos;re interested in, so our team and AI Counsellor can help you.</li>
                  <li>If you express interest in a specific university or programme, we share your contact details with that specific institution so they can follow up with you &mdash; this is core to how the Platform works, and we tell you this plainly rather than burying it.</li>
                  <li>We never sell your data to unrelated third parties for their own marketing purposes.</li>
                  <li>We keep your data on India-hosted systems.</li>
                  <li>You can ask us what we hold about you, ask us to correct it, or ask us to delete it, at any time.</li>
                  <li>We have a named Grievance Officer you can contact if anything about this policy or our data practices concerns you &mdash; see our Grievances page.</li>
                </ul>
              </div>
            </div>

            <div className="legal-section" id="scope" ref={(el) => { sectionRefs.current.scope = el; }}>
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

            <div className="legal-section" id="key-terms" ref={(el) => { sectionRefs.current["key-terms"] = el; }}>
              <h2>2. Key terms</h2>
              <p>We use a few terms from India&apos;s Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) throughout this Policy:</p>
              <ul>
                <li><strong>Data Principal</strong> &mdash; the individual the personal data is about. That&apos;s you, if you&apos;re using our Platform.</li>
                <li><strong>Data Fiduciary</strong> &mdash; the entity that decides why and how personal data is processed. That&apos;s us, DEPL.</li>
                <li><strong>Data Processor</strong> &mdash; any entity that processes personal data on our behalf (for example, our CRM provider). Processors act under our instructions and are contractually bound to protect your data.</li>
                <li><strong>Personal Data</strong> &mdash; any data about you by which you are or can be identified.</li>
                <li><strong>Consent</strong> &mdash; your free, specific, informed, and unambiguous agreement to a particular processing activity, given by clear affirmative action.</li>
              </ul>
            </div>

            <div className="legal-section" id="what-we-collect" ref={(el) => { sectionRefs.current["what-we-collect"] = el; }}>
              <h2>3. What personal data we collect</h2>
              <p><strong>3.1 Identity and contact data.</strong> Name, email address, mobile number, and city/location, typically collected when you fill out an enquiry form, request a callback, or download a resource.</p>
              <p><strong>3.2 Academic and career data.</strong> Your current qualification, work experience, target programme and specialization interest, preferred mode of study (Distance/Online/Executive), budget range, and similar information you share with us or with our AI Counsellor tool, so that our team &mdash; and the AI Counsellor &mdash; can give you relevant guidance.</p>
              <p><strong>3.3 Communication data.</strong> Records of calls, WhatsApp messages, emails, and chat or AI Counsellor conversation transcripts between you and CollegeNCourses, kept so our team has context across follow-up conversations.</p>
              <p><strong>3.4 Technical and usage data.</strong> IP address, device and browser type, pages visited, referral source, and campaign identifiers (such as gclid or fbclid from Google or Meta ad clicks), collected automatically when you visit the Platform. See our Cookie Policy for detail on how this is collected.</p>
              <p><strong>3.5 Verification data.</strong> A one-time password (OTP) sent to your mobile number to verify it&apos;s genuinely yours before we act on an enquiry. We do not store the OTP itself beyond the verification window.</p>
              <p>We do not knowingly collect financial account details, health data, or biometric data through the general counselling Platform.</p>
            </div>

            <div className="legal-section" id="how-we-collect" ref={(el) => { sectionRefs.current["how-we-collect"] = el; }}>
              <h2>4. How we collect your data</h2>
              <ul>
                <li>Directly from you, when you fill in a form, call us, message us on WhatsApp, or use the AI Counsellor tool.</li>
                <li>Automatically, through cookies and similar technologies when you browse the Platform (see our Cookie Policy).</li>
                <li>From our OTP verification provider, to confirm your mobile number.</li>
                <li>From advertising platforms (Google Ads, Meta), in the form of click identifiers that help us understand which campaign brought you to us &mdash; not additional personal data from those platforms themselves.</li>
              </ul>
            </div>

            <div className="legal-section" id="why-we-process" ref={(el) => { sectionRefs.current["why-we-process"] = el; }}>
              <h2>5. Why we process your data</h2>
              <p>We process your personal data for the following purposes, each grounded in your consent (given when you submit a form or otherwise engage with the Platform) or in our legitimate interest in operating a functioning counselling service:</p>
              <ul>
                <li>To respond to your enquiry and connect you with the right programme team;</li>
                <li>To assess which programmes and universities may fit your stated goals, budget, and background;</li>
                <li>To share your enquiry, with your knowledge, with the specific partner institution(s) you&apos;ve expressed interest in (Section 6);</li>
                <li>To send you confirmation messages (SMS, WhatsApp, email) about your enquiry;</li>
                <li>To improve our Platform, tools, and content based on aggregate usage patterns;</li>
                <li>To send you further information about programmes or services, where you haven&apos;t opted out;</li>
                <li>To meet our legal, regulatory, and accounting obligations;</li>
                <li>To detect and prevent fraud, abuse, or misuse of the Platform.</li>
              </ul>
            </div>

            <div className="legal-section" id="who-we-share" ref={(el) => { sectionRefs.current["who-we-share"] = el; }}>
              <h2>6. Who we share your data with</h2>
              <p>This is the section we think deserves the most plain speaking, because it&apos;s central to how a counselling platform like ours works.</p>
              <p><strong>6.1 Partner educational institutions.</strong> When you express interest in a specific programme or university through the Platform &mdash; for example, by requesting more information about a specific institution, or by asking to be connected with one &mdash; we share your relevant contact and enquiry details (typically name, mobile number, and email address) with that specific institution, so they can follow up with you directly regarding admissions, further information, or enrolment. We only do this in connection with programmes or institutions you&apos;ve actually shown interest in &mdash; we do not blanket-share your details with every institution on our Platform.</p>
              <p>We require partner institutions not to use your data for any purpose beyond the one you engaged with them for. That said, once your data is shared with a partner institution, their own privacy practices govern how they handle it from that point on &mdash; we are not responsible for a partner institution&apos;s separate data practices, and we encourage you to review their privacy policy directly.</p>
              <p><strong>6.2 Service providers (Data Processors).</strong> We use third-party providers to run parts of the Platform &mdash; for example, our CRM system (India-hosted), our OTP/SMS/WhatsApp messaging provider, and our website hosting and analytics providers. These providers process data only on our instructions and only for the purposes we&apos;ve engaged them for.</p>
              <p><strong>6.3 Legal and regulatory disclosure.</strong> We may disclose personal data where required to comply with a legal obligation, court order, or lawful request from a government or regulatory authority.</p>
              <p><strong>6.4 Business transfers.</strong> If DEPL is ever involved in a merger, acquisition, or sale of assets, personal data may be transferred as part of that transaction, subject to this Policy continuing to apply (or you being notified of any material change).</p>
              <div className="legal-callout">
                <p>We do not sell your personal data to third parties for their own independent marketing purposes. Sharing with partner institutions under Section 6.1, at your expressed interest, is not a sale of your data &mdash; it&apos;s core to the service you&apos;ve asked us for.</p>
              </div>
            </div>

            <div className="legal-section" id="cross-border" ref={(el) => { sectionRefs.current["cross-border"] = el; }}>
              <h2>7. Cross-border data transfer</h2>
              <p>CollegeNCourses primarily stores and processes data on India-hosted systems. Where any processing occurs outside India &mdash; for example, through a cloud or software provider with servers abroad &mdash; this is done consistent with the DPDP Act&apos;s approach to cross-border transfer, which currently permits transfers except to countries the Central Government specifically restricts by notification. We do not currently transfer personal data to any country subject to such a restriction.</p>
            </div>

            <div className="legal-section" id="retention" ref={(el) => { sectionRefs.current.retention = el; }}>
              <h2>8. Data retention</h2>
              <p>We retain personal data for as long as reasonably necessary to fulfil the purposes described in Section 5, and thereafter for any additional period required by applicable law (for example, accounting or regulatory retention requirements). Communication and enquiry records are typically retained for the duration of our relationship with you plus a reasonable follow-up period, after which they are deleted or anonymised, unless you&apos;ve asked us to delete them sooner (see Section 10).</p>
            </div>

            <div className="legal-section" id="protection" ref={(el) => { sectionRefs.current.protection = el; }}>
              <h2>9. How we protect your data</h2>
              <p>We apply reasonable technical and organisational security measures appropriate to the sensitivity of the data involved, including:</p>
              <ul>
                <li>Access controls limiting who within our team can view your data, based on role;</li>
                <li>India-hosted storage for our primary CRM systems;</li>
                <li>Encrypted transmission (HTTPS) across the Platform;</li>
                <li>Additional handling care for the sensitive documents (passport, academic transcripts) collected specifically for Study Abroad services, including restricted access and secure storage.</li>
              </ul>
              <p>No system is completely immune to risk. If we become aware of a data breach affecting your personal data, we will notify you and take appropriate steps consistent with applicable law.</p>
            </div>

            <div className="legal-section" id="your-rights" ref={(el) => { sectionRefs.current["your-rights"] = el; }}>
              <h2>10. Your rights</h2>
              <p>As a Data Principal, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> &mdash; ask us what personal data we hold about you;</li>
                <li><strong>Correction</strong> &mdash; ask us to correct inaccurate or outdated data;</li>
                <li><strong>Erasure</strong> &mdash; ask us to delete your data, subject to any legal retention obligations;</li>
                <li><strong>Withdraw consent</strong> &mdash; withdraw your consent to a specific processing activity at any time, without affecting the lawfulness of processing carried out before withdrawal;</li>
                <li><strong>Grievance redressal</strong> &mdash; raise a complaint with our Grievance Officer if you&apos;re unhappy with how we&apos;ve handled your data (see Section 13 and our Grievances page);</li>
                <li><strong>Nominate</strong> &mdash; nominate another individual to exercise these rights on your behalf in the event of your death or incapacity.</li>
              </ul>
              <div className="legal-callout">
                <p>To exercise any of these rights, email info@collegencourses.com. We aim to respond within a reasonable time, and in any case consistent with the response timelines prescribed under applicable law.</p>
              </div>
            </div>

            <div className="legal-section" id="cookies" ref={(el) => { sectionRefs.current.cookies = el; }}>
              <h2>11. Cookies</h2>
              <p>The Platform uses cookies and similar technologies to remember your preferences, understand how you use the site, and measure the effectiveness of our marketing. Full detail is in our separate Cookie Policy, which forms part of this Privacy Policy by reference.</p>
            </div>

            <div className="legal-section" id="children" ref={(el) => { sectionRefs.current.children = el; }}>
              <h2>12. Children&apos;s data</h2>
              <p>CollegeNCourses is intended for use by individuals capable of entering a binding contract under Indian law (generally, 18 years or older). We do not knowingly collect personal data from anyone under 18 without the involvement of a parent or legal guardian. If you believe a minor has provided us with personal data without appropriate consent, please contact us at info@collegencourses.com and we will take appropriate action.</p>
            </div>

            <div className="legal-section" id="grievance-officer" ref={(el) => { sectionRefs.current["grievance-officer"] = el; }}>
              <h2>13. Grievance Officer</h2>
              <p>In accordance with applicable Indian law, we have appointed a Grievance Officer to address concerns relating to this Privacy Policy and our data practices:</p>
              <div className="legal-callout">
                <p><strong>Grievance Officer:</strong> Mr. Sudhir Dixit</p>
                <p>Email: grievances@collegencourses.com</p>
                <p>Contact number: +91 7350 460 393</p>
              </div>
              <p>Full detail on our grievance redressal process is available on our Grievances page.</p>
            </div>

            <div className="legal-section" id="third-party-links" ref={(el) => { sectionRefs.current["third-party-links"] = el; }}>
              <h2>14. Third-party links</h2>
              <p>The Platform may contain links to third-party websites, including partner institution websites. This Policy does not apply to those websites. We encourage you to read the privacy policy of any third-party site before sharing personal data with it.</p>
            </div>

            <div className="legal-section" id="policy-changes" ref={(el) => { sectionRefs.current["policy-changes"] = el; }}>
              <h2>15. Changes to this policy</h2>
              <p>We may update this Policy from time to time &mdash; to reflect changes in our practices, our services, or applicable law. We&apos;ll update the &quot;Last updated&quot; date at the top of this page when we do. Material changes will be highlighted on this page or communicated to you directly where appropriate.</p>
            </div>

            <div className="legal-section" id="governing-law" ref={(el) => { sectionRefs.current["governing-law"] = el; }}>
              <h2>16. Governing law</h2>
              <p>This Policy is governed by the laws of India. Any disputes arising from it are subject to the exclusive jurisdiction of the courts at Pune, Maharashtra.</p>
            </div>

            <div className="legal-section" id="contact" ref={(el) => { sectionRefs.current.contact = el; }}>
              <h2>17. Contact us</h2>
              <p>For any questions about this Privacy Policy or how we handle your data:</p>
              <div className="legal-callout">
                <p><strong>Dnyanal Educon Pvt Ltd</strong></p>
                <p>FLNO A-603, Utsav Homes, Patil Nagar, Bavdhan BK, Pune &ndash; 411021, Maharashtra, India</p>
                <p>Email: info@collegencourses.com | Phone: +91 7350 460 393</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source="privacy-policy-preview" />
    </div>
  );
}
