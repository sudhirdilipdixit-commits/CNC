export default function PromiseSection() {
  const pillars = [
    "UGC-DEB & AICTE Approved Programmes Only",
    "Free Counselling. No Hidden Charges.",
    "Counsellors are Alumni & Industry Mentors",
  ];

  return (
    <section
      id="promise"
      className="py-16 lg:py-24"
      style={{ background: "var(--white)" }}
    >
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">OUR PROMISE</p>
          <h2 className="h-display h2">
            You&apos;ll leave more clear than you arrived.
          </h2>
          <p>
            Whether you choose us, choose elsewhere, or choose to wait,
            you&apos;ll know your options, you&apos;ll know yourself, and
            you&apos;ll move forward with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {pillars.map((text) => (
            <div
              key={text}
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{
                background: "var(--ivory)",
                borderLeft: "4px solid var(--yellow)",
              }}
            >
              <span
                className="flex-none w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-base"
                style={{ background: "var(--navy)", color: "var(--yellow)" }}
                aria-hidden="true"
              >
                ✓
              </span>
              <span
                className="text-[15px] font-medium"
                style={{ color: "var(--charcoal)" }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
