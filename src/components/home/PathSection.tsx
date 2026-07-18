export default function PathSection() {
  return (
    <section id="counselling">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">WHERE DO YOU WANT TO STUDY?</div>
          <h2 className="h-display h2">Two paths. One trusted guide.</h2>
          <p>Tell us your goal and we will match you to the right programmes - in India or abroad.</p>
        </div>

        <div className="path-grid">
          <a href="/online-mba/" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
              </svg>
            </div>
            <h3>Study in India</h3>
            <p>Online MBA, Distance MBA, and Executive MBA from 150+ UGC-DEB and AICTE approved universities. Work while you study.</p>
            <span className="path-card-link">
              Explore programmes{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a href="/study-abroad/" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="9" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
            </div>
            <h3>Study Abroad</h3>
            <p>MBA, MS, MIM, and Bachelors at top global universities in the USA, UK, Canada, Australia, Germany, and Ireland.</p>
            <span className="path-card-link">
              Explore destinations{" "}
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
            <h3>I know my specialization</h3>
            <p>Finance, Marketing, HR, Operations, Business Analytics, Healthcare - find the best programme for your chosen field.</p>
            <span className="path-card-link">
              Browse by specialization{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a href="/contact-us" className="path-card">
            <div className="path-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
              </svg>
            </div>
            <h3>I am not sure yet</h3>
            <p>Answer 6 short questions and the AI Counsellor will suggest the programmes that best fit your profile, goals, and budget.</p>
            <span className="path-card-link">
              Get free guidance{" "}
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
