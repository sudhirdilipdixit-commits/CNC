import Link from "next/link";

const programmes = [
  {
    tags: [{ label: "Online", style: "mode" }],
    title: "Online MBA in Marketing",
    university: "Symbiosis Centre for Distance Learning",
    duration: "24 months",
    fee: "₹1.8 L",
    batch: "Mar 2026",
  },
  {
    tags: [
      { label: "Bestseller", style: "bestseller" },
      { label: "Distance", style: "mode" },
    ],
    title: "Distance MBA in HR",
    university: "NMIMS Global Access",
    duration: "24 months",
    fee: "₹1.5 L",
    batch: "Apr 2026",
  },
  {
    tags: [
      { label: "Executive", style: "new" },
      { label: "IIM", style: "mode" },
    ],
    title: "Executive Online MBA",
    university: "IIM Indore, 1-Year Programme",
    duration: "12 months",
    fee: "₹6.5 L",
    batch: "Jul 2026",
  },
];

const tagStyles: Record<string, string> = {
  mode: "bg-[var(--mist)] text-[var(--navy)]",
  bestseller: "bg-[var(--navy)] text-[var(--yellow)]",
  new: "bg-[var(--pale-navy)] text-[var(--navy)]",
  premium: "bg-[var(--yellow)] text-[var(--navy)]",
};

interface ProgrammesSectionProps {
  onOpenLeadForm: () => void;
}

export default function ProgrammesSection({ onOpenLeadForm }: ProgrammesSectionProps) {
  return (
    <section
      id="programmes"
      className="py-16 lg:py-24"
      style={{ background: "var(--white)" }}
    >
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">FEATURED PROGRAMMES</p>
          <h2 className="h-display h2">
            Programmes Indian aspirants are choosing in 2026
          </h2>
          <p>
            Curated from the most-applied-to programmes on our portal this
            quarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programmes.map((prog) => (
            <article
              key={prog.title}
              className="rounded-lg overflow-hidden flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background: "var(--white)",
                border: "1px solid var(--mist)",
                borderTop: "5px solid var(--yellow)",
              }}
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-2 flex-wrap mb-3">
                  {prog.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] ${tagStyles[t.style]}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-xl leading-tight mb-1" style={{ color: "var(--navy)" }}>
                  {prog.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: "var(--charcoal)" }}>
                  {prog.university}
                </p>
                <div
                  className="grid grid-cols-3 gap-2 py-3 mb-4"
                  style={{ borderTop: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)" }}
                >
                  {[
                    { label: "Duration", value: prog.duration },
                    { label: "Fee", value: prog.fee },
                    { label: "Batch", value: prog.batch },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: "var(--grey)" }}>
                        {m.label}
                      </p>
                      <p className="text-sm font-bold" style={{ color: "var(--navy)" }}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onOpenLeadForm}
                  className="btn btn-primary btn-sm w-full mt-auto"
                >
                  Get Details
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="https://portal.collegencourses.com"
            className="font-semibold"
            style={{
              color: "var(--navy)",
              borderBottom: "2px solid var(--yellow)",
              paddingBottom: "2px",
            }}
          >
            See all programmes on our portal →
          </Link>
        </div>
      </div>
    </section>
  );
}
