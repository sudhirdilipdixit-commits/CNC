interface FAQ {
  _id?: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "Is an Online MBA legally equivalent to a regular MBA in India?",
    answer:
      "Yes. As per UGC-DEB regulations and the 2022 amendment to the AICTE handbook, Online and Distance Mode degrees from approved institutions hold the same legal standing as regular-mode degrees for employment, further studies, and government job eligibility. The key word is approved - always confirm the institution's name is on the UGC-DEB list dated within the last 12 months.",
  },
  {
    question: "How much does an Online MBA cost in India in 2026?",
    answer:
      "Total programme fees range from Rs 50,000 at entry-level state universities to Rs 6.5 lakh at IIMs for executive formats. The mainstream band sits between Rs 1.5 lakh and Rs 2.5 lakh for two-year programmes from universities such as Symbiosis, Amity, NMIMS, Manipal, ICFAI, and Welingkar.",
  },
  {
    question: "Do employers in India accept Online and Distance MBAs?",
    answer:
      "Major MNCs and Indian corporates (TCS, Infosys, Reliance, Asian Paints, Mahindra, HDFC) treat Online and Distance MBAs from UGC-DEB approved universities at parity with regular MBAs in their HR policies.",
  },
  {
    question: "How long does an Online MBA take?",
    answer:
      "Standard Online MBA in India is 24 months. Executive formats from IIMs and similar tier-1 schools run 12 months. Some universities offer 18-month accelerated formats for candidates with 5 or more years of work experience.",
  },
  {
    question: "Can I work full-time and pursue an Online MBA?",
    answer:
      "This is the dominant use case. Most Online MBA enrolees in India are full-time employed. Programmes are designed around evening live sessions (typically 8 to 10 pm), weekend classes, and recorded content for catch-up.",
  },
  {
    question: "What is the difference between Online MBA and Distance MBA?",
    answer:
      "Online MBA includes live virtual classroom sessions, real-time interaction with faculty, online assessments, and digital course material. Distance MBA traditionally relies on self-paced study material with periodic contact sessions and physical examinations. In 2026, the line has blurred - most distance programmes now include online components.",
  },
  {
    question: "Will my degree certificate say Online or Distance?",
    answer:
      "By UGC-DEB rules, degrees do not need to label the mode on the certificate. They state the degree (for example, Master of Business Administration) and the issuing university. Confirm with the institution and on a sample issued certificate before enrolling.",
  },
  {
    question: "How does guidance work at CollegeNCourses?",
    answer:
      "Use the AI Counsellor - answer 6 short questions about your goals, budget, mode preference, and timeline. You get a personalised shortlist of 3 matched programmes instantly, with fees, accreditation status, and a clear explanation of fit. No phone number required to see your results.",
  },
  {
    question: "Does CollegeNCourses support Study Abroad options?",
    answer:
      "Yes. CollegeNCourses covers both Study in India and Study Abroad. For international programmes, the AI Counsellor's Abroad track (Profile Evaluator) takes your academics, test scores (GRE, GMAT, IELTS, TOEFL), target country, and budget to generate a shortlist of Ambitious, Target, and Safe universities with indicative admit-likelihood bands.",
  },
];

export default function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs?.length ? faqs : DEFAULT_FAQS;

  return (
    <section className="section-faq" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FREQUENTLY ASKED</div>
          <h2 className="h-display h2">Questions aspirants ask us most often</h2>
        </div>

        <div className="faq-list">
          {items.map((faq, i) => (
            <details className="faq-item" key={faq._id || faq.question || i}>
              <summary className="faq-question">
                {faq.question}
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
