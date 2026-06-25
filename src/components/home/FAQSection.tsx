"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is an Online MBA legally equivalent to a regular MBA in India?",
    a: "Yes. As per UGC-DEB regulations and the 2022 amendment to the AICTE handbook, Online and Distance Mode degrees from approved institutions hold the same legal standing as regular-mode degrees for employment, further studies, and government job eligibility. The key word is approved. Always confirm the institution's name is on the UGC-DEB list dated within the last 12 months.",
  },
  {
    q: "How much does an Online MBA cost in India in 2026?",
    a: "Total programme fees range from ₹50,000 at entry-level state universities to ₹6.5 lakh at IIMs for executive formats. The mainstream band, where 70% of working professionals enrol, sits between ₹1.5 lakh and ₹2.5 lakh for two-year programmes from Symbiosis, Amity, NMIMS, Manipal, ICFAI, and Welingkar. EMI options through SBI, HDFC Credila, and ICICI typically convert this into 24-month plans of ₹6,000–₹10,000 per month.",
  },
  {
    q: "Do employers in India accept Online and Distance MBAs?",
    a: "The major MNCs and Indian corporates (TCS, Infosys, Reliance, Asian Paints, Mahindra, HDFC) treat Online and Distance MBAs from UGC-DEB approved universities at parity with regular MBAs in their HR policies. Some PSUs and central government recruitments have specific clauses; these are listed in our Specializations Guide.",
  },
  {
    q: "How long does an Online MBA take?",
    a: 'Standard Online MBA in India is 24 months. Executive formats from IIMs and similar tier-1 schools run 12 months. Some universities offer 18-month "accelerated" formats for candidates with 5+ years of work experience.',
  },
  {
    q: "Can I work full-time and pursue an Online MBA?",
    a: "This is the dominant use case. Over 80% of Online MBA enrolees in India are full-time employed. Programmes are designed around evening live sessions (typically 8–10 pm), weekend classes, and recorded content for catch-up.",
  },
  {
    q: "What's the difference between Online MBA and Distance MBA?",
    a: 'Online MBA includes live virtual classroom sessions, real-time interaction with faculty, online assessments, and digital course material. Distance MBA traditionally relies on self-paced study material with periodic contact sessions and physical examinations. In 2026, the line has blurred — most "distance" programmes now include online components.',
  },
  {
    q: 'Will my degree certificate say "Online" or "Distance"?',
    a: 'By UGC-DEB rules, degrees do not need to label the mode on the certificate. They state the degree (e.g., "Master of Business Administration") and the issuing university. Whether your specific programme follows this practice varies — confirm with the institution and on the issued sample certificate before enrolling.',
  },
  {
    q: "How does counselling at CollegeNCourses work?",
    a: "You fill a short form or talk to our AI Counsellor. A senior counsellor (with at least 5 years' experience in higher-education advising, and typically an MBA themselves) calls you back within 30 minutes. The first call is a 30-minute conversation about your situation, options, and questions. No hard sell. If you choose to apply, we help with the paperwork. If you choose not to, we wish you well.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-16 lg:py-24"
      style={{ background: "var(--white)" }}
    >
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">FREQUENTLY ASKED</p>
          <h2 className="h-display h2">
            Questions aspirants ask us most often
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden"
              style={{
                border: `1px solid ${openIndex === i ? "var(--pale-navy)" : "var(--mist)"}`,
                background: "var(--ivory)",
              }}
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full px-5 py-4 flex justify-between items-center gap-3 text-left font-semibold text-base leading-snug"
                style={{ color: "var(--navy)" }}
                itemProp="name"
              >
                {faq.q}
                <span
                  className="flex-none w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-base transition-transform duration-200"
                  style={{
                    background: "var(--yellow)",
                    color: "var(--navy)",
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div
                  className="px-5 pb-5 text-[15px] leading-relaxed"
                  style={{ color: "var(--charcoal)" }}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <p itemProp="text">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
