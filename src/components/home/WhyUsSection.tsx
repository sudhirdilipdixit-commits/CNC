const rows = [
  {
    label: "Counsellor",
    them: "Commission-driven sales agent",
    us: "MBA alumni & industry mentors",
  },
  {
    label: "Programme list",
    them: "500+ unverified",
    us: "150+ UGC-DEB approved",
  },
  {
    label: "Fees disclosure",
    them: '"Starting from…"',
    us: "Exact range, every programme",
  },
  {
    label: "Sales follow-up",
    them: "Multiple calls per day",
    us: "One call, one WhatsApp, no spam",
  },
  {
    label: "Recommendation tool",
    them: "None",
    us: "AI Counsellor + human review",
  },
  {
    label: "Time to first counsellor call",
    them: "1–2 days",
    us: "30 minutes",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why" className="py-16 lg:py-24">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">WHY COLLEGENCOURSES</p>
          <h2 className="h-display h2">What makes us different</h2>
        </div>

        <div
          className="overflow-x-auto rounded-lg border shadow-sm"
          style={{ borderColor: "var(--mist)", background: "var(--white)" }}
        >
          <table className="w-full border-collapse text-sm" style={{ minWidth: 540 }}>
            <thead>
              <tr>
                <th
                  className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-[0.08em]"
                  style={{ background: "var(--navy)", color: "var(--ivory)" }}
                />
                <th
                  className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-[0.08em]"
                  style={{ background: "var(--navy)", color: "var(--ivory)" }}
                >
                  Typical aggregator
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-[0.08em]"
                  style={{ background: "var(--navy)", color: "var(--yellow)" }}
                >
                  CollegeNCourses
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{ background: i % 2 === 0 ? "var(--ivory)" : "transparent" }}
                >
                  <td
                    className="px-4 py-3 font-semibold w-[30%]"
                    style={{ color: "var(--navy)" }}
                  >
                    {row.label}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--grey)" }}>
                    {row.them}
                  </td>
                  <td
                    className="px-4 py-3 font-semibold"
                    style={{ color: "var(--navy)" }}
                  >
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
