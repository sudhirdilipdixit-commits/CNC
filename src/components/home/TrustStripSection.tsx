const badges = [
  { code: "UGC", label: "UGC-DEB Approved Universities" },
  { code: "AC", label: "AICTE Approved Institutions" },
  { code: "NA", label: "NAAC Accredited Universities" },
];

export default function TrustStripSection() {
  return (
    <section
      className="py-12"
      style={{ background: "var(--white)" }}
      aria-label="Accreditation and recognition"
    >
      <div className="container">
        <p
          className="text-center text-sm mb-5 max-w-[60ch] mx-auto"
          style={{ color: "var(--grey)" }}
        >
          We only list programmes from approved and accredited institutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8">
          {badges.map((b) => (
            <div key={b.code} className="trust-badge">
              <span
                className="w-7 h-7 rounded-[4px] inline-flex items-center justify-center text-[11px] font-extrabold flex-none"
                style={{ background: "var(--navy)", color: "var(--yellow)" }}
              >
                {b.code}
              </span>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
