export default function HowItWorksSection() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2 className="h-display h2">From first question to a clear decision.</h2>
          <p>A simple, three-step process. No script. No sales pressure.</p>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial">
            <div className="step-number">1</div>
            <h3 className="step-title">Answer a few questions</h3>
            <p className="step-body">
              Use the AI Counsellor or fill a short form. Share your goals, budget, preferred mode, and whether
              you want to study in India or abroad. Two minutes is all it takes.
            </p>
          </article>

          <article className="testimonial">
            <div className="step-number">2</div>
            <h3 className="step-title">Get your shortlist instantly</h3>
            <p className="step-body">
              The AI Counsellor returns 3 matched programmes with fees, accreditation details, and a clear
              explanation of why each one fits your profile. For Study Abroad, it groups results as Ambitious,
              Target, and Safe universities.
            </p>
          </article>

          <article className="testimonial">
            <div className="step-number">3</div>
            <h3 className="step-title">Enrol with confidence</h3>
            <p className="step-body">
              Compare your options, ask questions, and decide on your own timeline. The right programme or
              university may reach out to guide you through the admission process.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
