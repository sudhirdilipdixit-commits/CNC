const articles = [
  {
    tag: "AI in Education",
    title: "AI Specializations in MBA: The Five Programmes Worth Considering in 2026",
    excerpt:
      "Symbiosis, IIM Indore, and Amity now offer dedicated AI tracks. Which ones are actually substantive, and which are repackaging?",
    readTime: "6 min read",
    date: "15 Apr 2026",
  },
  {
    tag: "Regulatory Update",
    title: "UGC-DEB Approved List 2026-27: What Changed and Why It Matters to You",
    excerpt:
      "Three programmes lost approval this year. Five new ones joined. Here's the current list, cross-checked with UGC.",
    readTime: "8 min read",
    date: "02 May 2026",
  },
  {
    tag: "Programme Choice",
    title: "One-Year Online MBA: Is the Accelerated Format Right for You?",
    excerpt:
      "Twelve-month programmes are gaining traction with experienced professionals. The tradeoffs are real. Read before you commit.",
    readTime: "7 min read",
    date: "28 May 2026",
  },
];

export default function BlogSection() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FRESH PERSPECTIVES</div>
          <h2 className="h-display h2">From our 2026 desk</h2>
          <p>AI in MBA programmes, NEP rollout, and what employers are really looking for.</p>
        </div>

        <div className="blog-grid">
          {articles.map((a) => (
            <article className="blog-card" key={a.title}>
              <div className="blog-cover">
                <div className="blog-cover-deco"></div>
                <span className="blog-cover-tag">{a.tag}</span>
              </div>
              <div className="blog-card-body">
                <h3>{a.title}</h3>
                <p className="blog-card-excerpt">{a.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{a.readTime}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
                <a href="#" className="blog-card-read">
                  Read article{" "}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
