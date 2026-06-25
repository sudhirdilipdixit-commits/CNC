import Link from "next/link";

interface HeroSectionProps {
  onOpenLeadForm: () => void;
}

export default function HeroSection({ onOpenLeadForm }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden py-12 lg:py-24"
      style={{ background: "var(--ivory)" }}
    >
      {/* Decorative blobs */}
      <span
        className="absolute -top-1/5 -right-1/10 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{ background: "var(--pale-navy)", filter: "blur(40px)" }}
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-3/10 -left-1/10 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(252,204,0,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-[640px]">
            <p className="eyebrow">INDIA'S TRUSTED HIGHER-EDUCATION COMPASS</p>
            <h1 className="h-display h1 mb-6">Compare. Choose. Begin.</h1>
            <p className="lede mb-8" style={{ color: "var(--charcoal)" }}>
              Online MBA, Distance MBA, and Executive MBA programmes from UGC-DEB
              and AICTE approved universities, compared honestly and explained by
              real counsellors.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                type="button"
                onClick={onOpenLeadForm}
                className="btn btn-primary"
              >
                Get Free Counselling
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
              <Link href="/ai-counsellor" className="btn btn-secondary">
                Try the AI Counsellor
              </Link>
            </div>

            <div
              className="flex items-center flex-wrap gap-3 text-sm"
              style={{ color: "var(--grey)" }}
              aria-label="Trust signals"
            >
              <span>UGC-DEB &amp; AICTE approved programmes</span>
              <span style={{ color: "var(--pale-navy)", fontWeight: 700 }}>·</span>
              <span>30-minute counsellor callback</span>
              <span style={{ color: "var(--pale-navy)", fontWeight: 700 }}>·</span>
              <span>No spam. No obligation.</span>
            </div>
          </div>

          {/* Hero visual: AI Counsellor preview */}
          <aside
            className="rounded-xl p-5 border relative"
            style={{
              background: "var(--white)",
              boxShadow: "var(--shadow-lg)",
              borderColor: "var(--mist)",
            }}
            aria-hidden="true"
          >
            <span
              className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-pill mb-4"
              style={{ background: "var(--pale-navy)", color: "var(--navy)" }}
            >
              AI Counsellor preview
            </span>
            <h3
              className="font-serif text-[22px] leading-tight mb-4"
              style={{ color: "var(--navy)" }}
            >
              3 programmes recommended for you
            </h3>

            {[
              { initial: "S", name: "Online MBA in Marketing", meta: "Symbiosis · 24 months · ₹1.8 L", featured: true },
              { initial: "N", name: "Distance MBA in HR", meta: "NMIMS · 24 months · ₹1.5 L", featured: false },
              { initial: "A", name: "Online MBA Digital Marketing", meta: "Amity · 24 months · ₹1.4 L", featured: false },
            ].map((prog) => (
              <div
                key={prog.name}
                className="flex gap-3 p-3 rounded-lg mb-3 items-center relative"
                style={{
                  border: prog.featured ? "2px solid var(--yellow)" : "1px solid var(--mist)",
                  background: prog.featured ? "var(--white)" : "var(--ivory)",
                }}
              >
                {prog.featured && (
                  <span
                    className="absolute -top-2 right-3 text-[9px] font-extrabold tracking-[0.1em] px-2 py-0.5 rounded-[3px]"
                    style={{ background: "var(--yellow)", color: "var(--navy)" }}
                  >
                    BEST FIT
                  </span>
                )}
                <div
                  className="w-8 h-8 rounded-md flex-none flex items-center justify-center font-bold text-[12px] font-serif"
                  style={{ background: "var(--navy)", color: "var(--yellow)" }}
                >
                  {prog.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold leading-tight truncate" style={{ color: "var(--navy)" }}>
                    {prog.name}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--grey)" }}>
                    {prog.meta}
                  </p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
