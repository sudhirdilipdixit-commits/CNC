const steps = [
  {
    num: "1",
    title: "Share your situation",
    body: "Fill a short form or try the AI Counsellor. Tell us your background, goals, budget, and timeline. Two minutes is all it takes.",
  },
  {
    num: "2",
    title: "Talk to a senior counsellor",
    body: "A senior counsellor calls you back within 30 minutes during working hours. The first conversation is a 30-minute, honest discussion of your options.",
  },
  {
    num: "3",
    title: "Choose with clarity",
    body: "You leave the call knowing your real options and how each one fits. If you decide to apply, we help with the paperwork. If not, we wish you well.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="h-display h2">
            From first enquiry to a clear decision.
          </h2>
          <p>A simple, three-step process. No script. No sales pressure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <article
              key={s.num}
              className="rounded-lg p-5 pt-6"
              style={{
                background: "var(--white)",
                border: "1px solid var(--mist)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-xl font-serif mb-4"
                style={{ background: "var(--yellow)", color: "var(--navy)" }}
              >
                {s.num}
              </div>
              <h3 className="font-serif text-xl leading-tight mb-3" style={{ color: "var(--navy)" }}>
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed m-0" style={{ color: "var(--charcoal)" }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
