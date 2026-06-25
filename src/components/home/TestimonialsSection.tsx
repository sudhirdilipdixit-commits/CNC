const testimonials = [
  {
    quote:
      "I was sceptical about online MBAs. The CollegeNCourses counsellor spent 40 minutes explaining the UGC-DEB approval and showed me actual placement data from Symbiosis. I enrolled the next week. Two years later, I'm a senior manager.",
    name: "Ankit Sharma",
    role: "Senior Manager at Tech Mahindra, Pune",
    programme: "Symbiosis Online MBA, 2023 cohort",
    initial: "A",
  },
  {
    quote:
      "My parents were the harder sell, not me. The counsellor offered to talk to my father directly and walked him through the AICTE approval certificate. That call changed everything.",
    name: "Priya Mehta",
    role: "Marketing Lead at Asian Paints, Mumbai",
    programme: "NMIMS Distance MBA, 2024 cohort",
    initial: "P",
  },
  {
    quote:
      "I tried four other websites. They all asked for my number first. Only CollegeNCourses let me explore the AI Counsellor without giving up my mobile. That respect is why I came back.",
    name: "Rajat Khanna",
    role: "Family business, Surat",
    programme: "IIM Indore Executive MBA, 2025 cohort",
    initial: "R",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">REAL LEARNERS. REAL OUTCOMES.</p>
          <h2 className="h-display h2">What our alumni say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-lg p-5 flex flex-col relative"
              style={{
                background: "var(--white)",
                border: "1px solid var(--mist)",
              }}
            >
              {/* Open quote */}
              <span
                className="absolute -top-2 left-4 text-6xl font-serif leading-none"
                style={{ color: "var(--yellow)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote
                className="text-[15px] leading-relaxed flex-1 mt-4 mb-5"
                style={{ color: "var(--charcoal)" }}
              >
                {t.quote}
              </blockquote>
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid var(--mist)" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex-none flex items-center justify-center font-bold text-base font-serif border-2"
                  style={{
                    background: "var(--navy)",
                    color: "var(--yellow)",
                    borderColor: "var(--yellow)",
                  }}
                >
                  {t.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight" style={{ color: "var(--navy)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--grey)" }}>
                    {t.role}
                  </p>
                  <p className="text-[11px] italic mt-1" style={{ color: "var(--grey)" }}>
                    {t.programme}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
