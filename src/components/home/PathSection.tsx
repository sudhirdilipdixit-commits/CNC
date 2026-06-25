import Link from "next/link";

const paths = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
      </svg>
    ),
    title: "I'm a Working Professional",
    desc: "3+ years of experience. Time-poor. Looking to accelerate without quitting.",
    cta: "See programmes for me",
    href: "/landing/top-online-mba-universities",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "I'm a Recent Graduate",
    desc: "Final-year student or just stepped out. Want an MBA but unsure about Tier-1 exams.",
    cta: "See programmes for me",
    href: "/landing/top-distance-mba-universities",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M12 12v4M8 14h8" />
      </svg>
    ),
    title: "I run a business",
    desc: "Already running or set to inherit a business. Want depth in finance, ops, or strategy.",
    cta: "See Executive MBAs at IIMs",
    href: "/landing/distance-mba-executive-iim",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
      </svg>
    ),
    title: "I'm not sure yet",
    desc: "Talk to a counsellor or let our AI Counsellor recommend three programmes in 2 minutes.",
    cta: "Start with AI Counsellor",
    href: "/ai-counsellor",
  },
];

export default function PathSection() {
  return (
    <section id="counselling" className="py-16 lg:py-24">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">PICK A PATH</p>
          <h2 className="h-display h2">Where do you stand today?</h2>
          <p>Tell us where you are. We&apos;ll show you the path that fits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paths.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex flex-col rounded-lg p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background: "var(--white)",
                border: "1px solid var(--mist)",
                borderTop: "4px solid var(--yellow)",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 flex-none"
                style={{ background: "var(--pale-navy)", color: "var(--navy)" }}
              >
                {p.icon}
              </div>
              <h3
                className="font-serif text-xl leading-tight mb-2"
                style={{ color: "var(--navy)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm flex-1 mb-4 leading-relaxed" style={{ color: "var(--grey)" }}>
                {p.desc}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--navy)" }}
              >
                {p.cta}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
