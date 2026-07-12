export default function PathSection() {
  return (
    <section id="counselling">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">PICK A PATH</div>
          <h2 className="h-display h2">Where do you stand today?</h2>
          <p>Tell us where you are. We&#39;ll show you the path that fits.</p>
        </div>

        <div className="path-grid">
          <a href="#programmes" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
              </svg>
            </div>
            <h3>I&#39;m a Working Professional</h3>
            <p>3+ years of experience. Time-poor. Looking to accelerate without quitting.</p>
            <span className="path-card-link">
              See programmes for me{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a href="#programmes" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3>I&#39;m a Recent Graduate</h3>
            <p>Final-year student or just stepped out. Want an MBA but unsure about Tier-1 exams.</p>
            <span className="path-card-link">
              See programmes for me{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a href="#programmes" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                <path d="M12 12v4M8 14h8" />
              </svg>
            </div>
            <h3>I run a business</h3>
            <p>Already running or set to inherit a business. Want depth in finance, ops, or strategy.</p>
            <span className="path-card-link">
              See Executive MBAs at IIMs{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a href="/counselling" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
              </svg>
            </div>
            <h3>I&#39;m not sure yet</h3>
            <p>Talk to a counsellor who will assess your profile and recommend the right programme in 30 minutes.</p>
            <span className="path-card-link">
              Book a free counselling call{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
