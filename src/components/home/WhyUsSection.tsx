export default function WhyUsSection() {
  return (
    <section id="why">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">WHY COLLEGENCOURSES</div>
          <h2 className="h-display h2">What makes us different</h2>
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
              <tr>
                <td>Guidance</td>
                <td>Commission-driven sales call</td>
                <td>AI Counsellor - instant, unbiased shortlist</td>
              </tr>
              <tr>
                <td>Programme list</td>
                <td>500+ unverified listings</td>
                <td>150+ UGC-DEB approved + global universities</td>
              </tr>
              <tr>
                <td>Fees disclosure</td>
                <td>&ldquo;Starting from...&rdquo;</td>
                <td>Exact range, every programme</td>
              </tr>
              <tr>
                <td>Sales follow-up</td>
                <td>Multiple calls per day</td>
                <td>Matched shortlist in your inbox</td>
              </tr>
              <tr>
                <td>Recommendation tool</td>
                <td>None</td>
                <td>AI Counsellor + Profile Evaluator</td>
              </tr>
              <tr>
                <td>Study Abroad support</td>
                <td>Not available</td>
                <td>7+ countries, Ambitious/Target/Safe shortlist</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
