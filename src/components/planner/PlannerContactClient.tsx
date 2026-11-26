"use client";

import { Bricolage_Grotesque, Figtree } from "next/font/google";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import PlannerContactForm from "@/components/planner/PlannerContactForm";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-contact.css";

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

const PHONE_ICON = (
  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
);
const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24"><path d="M20.5 3.5A10.6 10.6 0 0012 0a10.5 10.5 0 00-9.1 15.7L1 22l6.5-1.9A10.5 10.5 0 0012 21a10.6 10.6 0 007.5-18.5zM12 19a8.5 8.5 0 01-4.3-1.2l-.3-.2-3.2.9.9-3.1-.2-.3A8.5 8.5 0 1119 11a8.5 8.5 0 01-7 8z" /></svg>
);
const MAIL_ICON = (
  <svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><path d="M22 6l-10 7L2 6" /></svg>
);

export default function PlannerContactClient() {
  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader
        primaryCTA="Get Free Guidance"
        onOpenLeadForm={() => {
          document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <div className="p-breadcrumb">
        <div className="wrap">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <span className="cur">Contact Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="p-hero">
        <div className="wrap spec-hero-inner">
          <div className="p-eyebrow">GET IN TOUCH</div>
          <h1>Three ways to reach us directly.</h1>
          <p className="p-lede">Call us, WhatsApp us, or fill the form below. Direct line, no call centre, no automated queue.</p>

          <div className="method-grid">
            <div className="method-card c-dark">
              <div className="method-icon">{PHONE_ICON}</div>
              <h3>Call us directly</h3>
              <div className="method-value">+91 7350 460 393</div>
              <p>Monday to Saturday, 9 am to 8 pm IST. Average wait under 60 seconds.</p>
              <a href="tel:+917350460393" className="btn btn-sun btn-sm">Call Now</a>
            </div>
            <div className="method-card c-whatsapp">
              <div className="method-icon">{WHATSAPP_ICON}</div>
              <h3>WhatsApp us</h3>
              <div className="method-value">+91 7350 460 393</div>
              <p>Replies during working hours. Useful for quick questions, sending documents, or scheduling a call.</p>
              <a href="https://wa.me/917350460393" target="_blank" rel="noopener noreferrer" className="btn btn-white btn-sm">Open WhatsApp</a>
            </div>
            <div className="method-card c-white">
              <div className="method-icon">{MAIL_ICON}</div>
              <h3>Email us</h3>
              <div className="method-value" style={{ fontSize: 16 }}>info@collegencourses.com</div>
              <p>Reply within 4 working hours. For data or privacy requests, write to privacy@collegencourses.com.</p>
              <a href="mailto:info@collegencourses.com" className="btn btn-sun btn-sm">Send Email</a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + next steps */}
      <section className="p-section p-section-alt">
        <div className="wrap contact-split">
          <div className="contact-form-card" id="contact-form">
            <div className="contact-form-head">
              <h3>Or send us your details</h3>
              <p>Share a few details below and we&apos;ll match your enquiry to the right programme team.</p>
            </div>
            <div className="contact-form-body">
              <PlannerContactForm />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 20, marginBottom: 20 }}>What happens next</h3>
            <div className="next-steps-list">
              <div className="next-step">
                <div className="p-q-num">1</div>
                <div><h4>Your enquiry is logged</h4><p>The moment you submit, your details are securely recorded against your enquiry.</p></div>
              </div>
              <div className="next-step">
                <div className="p-q-num">2</div>
                <div><h4>We match it to the right team</h4><p>Your enquiry is matched to the university or programme team best placed to help, based on what you shared.</p></div>
              </div>
              <div className="next-step">
                <div className="p-q-num">3</div>
                <div><h4>They reach out to help</h4><p>With your consent, that admissions team contacts you directly - no call centre in between.</p></div>
              </div>
              <div className="next-step">
                <div className="p-q-num">4</div>
                <div><h4>Guided from there</h4><p>They help with forms, documents, and deadlines through to enrolment.</p></div>
              </div>
            </div>

            <div className="office-box">
              <strong>Our office</strong>
              DNYANAL EDUCON PRIVATE LIMITED<br />
              Pune, Maharashtra, India
            </div>
          </div>
        </div>
      </section>

      <PlannerFooter />
    </div>
  );
}
