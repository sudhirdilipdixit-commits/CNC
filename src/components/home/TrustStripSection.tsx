export default function TrustStripSection() {
  return (
    <section className="section-trust" aria-label="Accreditation and recognition">
      <div className="container">
        <p className="trust-strip-caption">
          We only list programmes from approved and accredited institutions.
        </p>
        <div className="trust-strip-large">
          <div className="trust-badge">
            <span className="trust-badge-icon">UGC</span> UGC-DEB Approved Universities
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">AC</span> AICTE Approved Institutions
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">NA</span> NAAC Accredited Universities
          </div>
        </div>
      </div>
    </section>
  );
}
