interface WhyUsRow {
  label: string;
  aggregatorValue?: string;
  ourValue?: string;
}

interface WhyUsSectionProps {
  heading?: string;
  rows?: WhyUsRow[];
}

const DEFAULT_HEADING = "What makes us different";
const DEFAULT_ROWS: WhyUsRow[] = [
  { label: "Guidance", aggregatorValue: "Commission-driven sales call", ourValue: "AI Counsellor - instant, unbiased shortlist" },
  { label: "Programme list", aggregatorValue: "500+ unverified listings", ourValue: "150+ UGC-DEB approved + global universities" },
  { label: "Fees disclosure", aggregatorValue: "“Starting from...”", ourValue: "Exact range, every programme" },
  { label: "Sales follow-up", aggregatorValue: "Multiple calls per day", ourValue: "Matched shortlist in your inbox" },
  { label: "Recommendation tool", aggregatorValue: "None", ourValue: "AI Counsellor + Profile Evaluator" },
  { label: "Study Abroad support", aggregatorValue: "Not available", ourValue: "7+ countries, Ambitious/Target/Safe shortlist" },
];

export default function WhyUsSection({ heading, rows }: WhyUsSectionProps) {
  const resolvedRows = rows?.length ? rows : DEFAULT_ROWS;

  return (
    <section id="why">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">WHY COLLEGENCOURSES</div>
          <h2 className="h-display h2">{heading || DEFAULT_HEADING}</h2>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Typical aggregator</th>
                <th scope="col">CollegeNCourses</th>
              </tr>
            </thead>
            <tbody>
              {resolvedRows.map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td>
                  <td>{row.aggregatorValue}</td>
                  <td>{row.ourValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
