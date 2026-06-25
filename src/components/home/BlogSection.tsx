import Link from "next/link";

const posts = [
  {
    tag: "AI in Education",
    title: "AI Specializations in MBA: The Five Programmes Worth Considering in 2026",
    excerpt:
      "Symbiosis, IIM Indore, and Amity now offer dedicated AI tracks. Which ones are actually substantive, and which are repackaging?",
    readTime: "6 min read",
    date: "15 Apr 2026",
    href: "/blogs/ai-specializations-mba-2026",
  },
  {
    tag: "Regulatory Update",
    title: "UGC-DEB Approved List 2026-27: What Changed and Why It Matters to You",
    excerpt:
      "Three programmes lost approval this year. Five new ones joined. Here's the current list, cross-checked with UGC.",
    readTime: "8 min read",
    date: "02 May 2026",
    href: "/blogs/ugc-deb-approved-list-2026",
  },
  {
    tag: "Programme Choice",
    title: "One-Year Online MBA: Is the Accelerated Format Right for You?",
    excerpt:
      "Twelve-month programmes are gaining traction with experienced professionals. The tradeoffs are real. Read before you commit.",
    readTime: "7 min read",
    date: "28 May 2026",
    href: "/blogs/one-year-online-mba-2026",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 lg:py-24">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">FRESH PERSPECTIVES</p>
          <h2 className="h-display h2">From our 2026 desk</h2>
          <p>
            AI in MBA programmes, NEP rollout, and what employers are really
            looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-lg overflow-hidden flex flex-col transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md duration-200"
              style={{ background: "var(--white)", border: "1px solid var(--mist)" }}
            >
              <div
                className="relative aspect-video"
                style={{
                  background: "linear-gradient(135deg, var(--navy), var(--navy-dark))",
                }}
              >
                {/* Decorative gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(252,204,0,0.15) 0, transparent 40%), radial-gradient(circle at 20% 80%, rgba(214,219,237,0.15) 0, transparent 40%)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-1 rounded-[3px]"
                  style={{ background: "var(--yellow)", color: "var(--navy)" }}
                >
                  {post.tag}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3
                  className="font-serif text-[19px] leading-tight mb-3"
                  style={{ color: "var(--navy)" }}
                >
                  {post.title}
                </h3>
                <p className="text-sm flex-1 mb-4" style={{ color: "var(--grey)" }}>
                  {post.excerpt}
                </p>
                <div
                  className="flex gap-3 text-xs items-center mb-4"
                  style={{ color: "var(--grey)" }}
                >
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <Link
                  href={post.href}
                  className="inline-flex items-center gap-1.5 font-semibold text-sm"
                  style={{ color: "var(--navy)" }}
                >
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
