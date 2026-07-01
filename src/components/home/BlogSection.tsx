interface BlogPost {
  _id?: string;
  slug?: { current: string };
  tag?: string;
  title: string;
  excerpt?: string;
  readTime?: string;
  publishedAt?: string;
}

interface BlogSectionProps {
  blogPosts?: BlogPost[];
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    tag: "AI in Education",
    title: "AI Specializations in MBA: The Five Programmes Worth Considering in 2026",
    excerpt:
      "Symbiosis, IIM Indore, and Amity now offer dedicated AI tracks. Which ones are actually substantive, and which are repackaging?",
    readTime: "6 min read",
    publishedAt: "2026-04-15",
  },
  {
    tag: "Regulatory Update",
    title: "UGC-DEB Approved List 2026-27: What Changed and Why It Matters to You",
    excerpt:
      "Three programmes lost approval this year. Five new ones joined. Here's the current list, cross-checked with UGC.",
    readTime: "8 min read",
    publishedAt: "2026-05-02",
  },
  {
    tag: "Programme Choice",
    title: "One-Year Online MBA: Is the Accelerated Format Right for You?",
    excerpt:
      "Twelve-month programmes are gaining traction with experienced professionals. The tradeoffs are real. Read before you commit.",
    readTime: "7 min read",
    publishedAt: "2026-05-28",
  },
];

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BlogSection({ blogPosts }: BlogSectionProps) {
  const posts = blogPosts?.length ? blogPosts : DEFAULT_POSTS;

  return (
    <section id="blog">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FRESH PERSPECTIVES</div>
          <h2 className="h-display h2">From our 2026 desk</h2>
          <p>AI in MBA programmes, NEP rollout, and what employers are really looking for.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <article className="blog-card" key={post._id || post.title || i}>
              <div className="blog-cover">
                <div className="blog-cover-deco"></div>
                {post.tag && <span className="blog-cover-tag">{post.tag}</span>}
              </div>
              <div className="blog-card-body">
                <h3>{post.title}</h3>
                {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                <div className="blog-card-meta">
                  {post.readTime && <span>{post.readTime}</span>}
                  {post.readTime && post.publishedAt && <span>·</span>}
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                </div>
                <a href={post.slug?.current ? `/blog/${post.slug.current}` : "#"} className="blog-card-read">
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
