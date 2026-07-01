import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Blog | CollegeNCourses",
  description:
    "Expert insights on online MBA programmes, career strategy, accreditation updates, and everything working professionals need to make smarter education decisions.",
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
  tag?: string;
  readTime?: string;
  publishedAt?: string;
  author?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPost[]>({
    query: blogListQuery,
    revalidate: 1800,
  });

  return (
    <main>
      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "56px 0 48px" }}>
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--yellow)" }}>FRESH PERSPECTIVES</div>
          <h1 className="h-display h1" style={{ color: "var(--white)", margin: "12px 0 16px", maxWidth: 640 }}>
            Insights for India&apos;s next generation of business leaders
          </h1>
          <p className="lede" style={{ color: "var(--pale-navy)", maxWidth: 560, marginBottom: 0 }}>
            Expert guidance on online MBA programmes, accreditation, career strategy, and the decisions that shape your trajectory.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "48px 0 72px" }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--grey)" }}>
              <p style={{ fontSize: 17 }}>No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="bi-grid">
              {posts.map((post) => (
                <article key={post._id} className="bi-card">
                  <Link href={`/blog/${post.slug.current}`} className="bi-card-link">

                    {/* Cover */}
                    <div className="bi-cover">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).width(600).height(338).url()}
                          alt={post.title}
                          width={600}
                          height={338}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="bi-cover-gradient">
                          <div className="bi-cover-deco" />
                        </div>
                      )}
                      {post.tag && (
                        <span className="bi-tag">{post.tag}</span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="bi-body">
                      <h2 className="bi-title">{post.title}</h2>
                      {post.excerpt && (
                        <p className="bi-excerpt">{post.excerpt}</p>
                      )}
                      <div className="bi-meta">
                        {post.readTime && <span>{post.readTime}</span>}
                        {post.readTime && post.publishedAt && (
                          <span className="bi-sep">·</span>
                        )}
                        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                      </div>
                      <span className="bi-read">
                        Read article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>

                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)", padding: "64px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="eyebrow" style={{ color: "var(--yellow)" }}>NOT SURE WHERE TO START?</div>
          <h2 className="h-display h2" style={{ color: "var(--white)", margin: "12px 0 16px" }}>
            Talk to a counsellor
          </h2>
          <p style={{ color: "var(--pale-navy)", fontSize: 16, marginBottom: 28 }}>
            Skip the research rabbit hole. Get a personalised shortlist of programmes matched to your profile.
          </p>
          <Link href="/contact-us" className="btn btn-primary">
            Get Expert Guidance
          </Link>
        </div>
      </section>

      <style>{`
        .bi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .bi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .bi-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .bi-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: transform .18s, box-shadow .18s;
        }
        .bi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(36,48,72,.10);
        }
        .bi-card-link {
          display: flex; flex-direction: column; height: 100%;
          text-decoration: none; color: inherit;
        }

        .bi-cover {
          aspect-ratio: 16/9;
          position: relative; overflow: hidden;
          background: var(--navy);
        }
        .bi-cover-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--navy), #1A2336);
        }
        .bi-cover-deco {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 20%, rgba(252,204,0,.13), transparent 45%),
                      radial-gradient(circle at 20% 80%, rgba(214,219,237,.12), transparent 40%);
        }
        .bi-tag {
          position: absolute; bottom: 12px; left: 12px; z-index: 1;
          font-size: 9px; font-weight: 800; letter-spacing: .08em;
          text-transform: uppercase; padding: 3px 9px; border-radius: 3px;
          background: var(--yellow); color: var(--navy);
        }

        .bi-body {
          padding: 20px; flex: 1;
          display: flex; flex-direction: column;
        }
        .bi-title {
          font-family: var(--font-serif); color: var(--navy);
          font-size: 19px; line-height: 1.25; margin-bottom: 10px;
        }
        .bi-excerpt {
          font-size: 14px; color: var(--grey); line-height: 1.55;
          flex: 1; margin-bottom: 14px;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .bi-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--grey); margin-bottom: 14px;
        }
        .bi-sep { color: var(--pale-navy); }
        .bi-read {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: var(--navy);
          margin-top: auto;
        }
        .bi-card:hover .bi-read svg { transform: translateX(3px); }
        .bi-read svg { transition: transform .15s; }
      `}</style>
    </main>
  );
}
