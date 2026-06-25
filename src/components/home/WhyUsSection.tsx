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
                <td>Counsellor</td>
                <td>Commission-driven sales agent</td>
                <td>MBA alumni &amp; industry mentors</td>
              </tr>
              <tr>
                <td>Programme list</td>
                <td>500+ unverified</td>
                <td>150+ UGC-DEB approved</td>
              </tr>
              <tr>
                <td>Fees disclosure</td>
                <td>&ldquo;Starting from...&rdquo;</td>
                <td>Exact range, every programme</td>
              </tr>
              <tr>
                <td>Sales follow-up</td>
                <td>Multiple calls per day</td>
                <td>One call, one WhatsApp, no spam</td>
              </tr>
              <tr>
                <td>Recommendation tool</td>
                <td>None</td>
                <td>AI Counsellor + human review</td>
              </tr>
              <tr>
                <td>Time to first counsellor call</td>
                <td>1, 2 days</td>
                <td>30 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
