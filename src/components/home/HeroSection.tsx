interface HeroSectionProps {
  onOpenLeadForm: () => void;
}

export default function HeroSection({ onOpenLeadForm }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="eyebrow">INDIA&#39;S TRUSTED HIGHER-EDUCATION COMPASS</div>
          <h1 className="h-display h1 hero-headline">Compare. Choose. Begin.</h1>
          <p className="lede hero-sub">
            Online MBA, Distance MBA, and Executive MBA programmes from UGC-DEB and AICTE approved
            universities, compared honestly and explained by real counsellors.
          </p>

          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary" onClick={onOpenLeadForm}>
              Get Free Counselling
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#ai-counsellor" className="btn btn-secondary">Try the AI Counsellor</a>
          </div>

          <div className="trust-strip" aria-label="Trust signals">
            <span>UGC-DEB &amp; AICTE approved programmes</span>
            <span className="sep">·</span>
            <span>30-minute counsellor callback</span>
            <span className="sep">·</span>
            <span>No spam. No obligation.</span>
          </div>
        </div>

        <aside className="hero-visual" aria-hidden="true">
          <span className="hero-visual-label">AI Counsellor preview</span>
          <h3 className="hero-visual-title">3 programmes recommended for you</h3>

          <div className="mini-card featured">
            <div className="mini-card-icon">S</div>
            <div className="mini-card-body">
              <div className="mini-card-name">Online MBA in Marketing</div>
              <div className="mini-card-meta">Symbiosis · 24 months · ₹1.8 L</div>
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-card-icon">N</div>
            <div className="mini-card-body">
              <div className="mini-card-name">Distance MBA in HR</div>
              <div className="mini-card-meta">NMIMS · 24 months · ₹1.5 L</div>
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-card-icon">A</div>
            <div className="mini-card-body">
              <div className="mini-card-name">Online MBA Digital Marketing</div>
              <div className="mini-card-meta">Amity · 24 months · ₹1.4 L</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
