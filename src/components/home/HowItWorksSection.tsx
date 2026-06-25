export default function HowItWorksSection() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2 className="h-display h2">From first enquiry to a clear decision.</h2>
          <p>A simple, three-step process. No script. No sales pressure.</p>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial">
            <div className="step-number">1</div>
            <h3 className="step-title">Share your situation</h3>
            <p className="step-body">
              Fill a short form or try the AI Counsellor. Tell us your background, goals, budget,
              and timeline. Two minutes is all it takes.
            </p>
          </article>

          <article className="testimonial">
            <div className="step-number">2</div>
            <h3 className="step-title">Talk to a senior counsellor</h3>
            <p className="step-body">
              A senior counsellor calls you back within 30 minutes during working hours. The first
              conversation is a 30-minute, honest discussion of your options.
            </p>
          </article>

          <article className="testimonial">
            <div className="step-number">3</div>
            <h3 className="step-title">Choose with clarity</h3>
            <p className="step-body">
              You leave the call knowing your real options and how each one fits. If you decide to
              apply, we help with the paperwork. If not, we wish you well.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
