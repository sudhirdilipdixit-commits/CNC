interface ProgrammesSectionProps {
  onOpenLeadForm: () => void;
}

export default function ProgrammesSection({ onOpenLeadForm }: ProgrammesSectionProps) {
  return (
    <section className="section-programmes" id="programmes">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FEATURED PROGRAMMES</div>
          <h2 className="h-display h2">Programmes Indian aspirants are choosing in 2026</h2>
          <p>Curated from the most-applied-to programmes on our portal this quarter.</p>
        </div>

        <div className="programme-grid">
          <article className="programme-card">
            <div className="programme-card-body">
              <div className="programme-tags">
                <span className="tag tag-mode">Online</span>
              </div>
              <h3>Online MBA in Marketing</h3>
              <div className="programme-university">Symbiosis Centre for Distance Learning</div>
              <div className="programme-meta">
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Duration</div>
                  <div className="programme-meta-value">24 months</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Fee</div>
                  <div className="programme-meta-value">₹1.8 L</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Batch</div>
                  <div className="programme-meta-value">Mar 2026</div>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={onOpenLeadForm}>
                Get Details
              </button>
            </div>
          </article>

          <article className="programme-card">
            <div className="programme-card-body">
              <div className="programme-tags">
                <span className="tag tag-mode">Distance</span>
              </div>
              <h3>Distance MBA in HR</h3>
              <div className="programme-university">NMIMS Global Access</div>
              <div className="programme-meta">
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Duration</div>
                  <div className="programme-meta-value">24 months</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Fee</div>
                  <div className="programme-meta-value">₹1.5 L</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Batch</div>
                  <div className="programme-meta-value">Apr 2026</div>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={onOpenLeadForm}>
                Get Details
              </button>
            </div>
          </article>

          <article className="programme-card">
            <div className="programme-card-body">
              <div className="programme-tags">
                <span className="tag tag-new">Executive</span>
                <span className="tag tag-mode">IIM</span>
              </div>
              <h3>Executive Online MBA</h3>
              <div className="programme-university">IIM Indore, 1-Year Programme</div>
              <div className="programme-meta">
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Duration</div>
                  <div className="programme-meta-value">12 months</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Fee</div>
                  <div className="programme-meta-value">₹6.5 L</div>
                </div>
                <div className="programme-meta-item">
                  <div className="programme-meta-label">Batch</div>
                  <div className="programme-meta-value">Jul 2026</div>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={onOpenLeadForm}>
                Get Details
              </button>
            </div>
          </article>
        </div>

        <div className="programme-grid-more">
          <a href="#programmes">See all programmes on our portal &rarr;</a>
        </div>
      </div>
    </section>
  );
}
