import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import BlogIndexClient, { type BlogPostCard } from "./BlogIndexClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | CollegeNCourses",
  description:
    "Expert insights on online MBA programmes, career strategy, accreditation updates, and everything working professionals need to make smarter education decisions.",
  alternates: {
    canonical: "https://collegencourses.com/blog",
  },
};

interface RawPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; _type: string };
  tag?: string;
  readTime?: string;
  publishedAt?: string;
  author?: string;
}

export default async function BlogIndexPage() {
  const raw = await sanityFetch<RawPost[]>({ query: blogListQuery, revalidate: 300 });

  // Pre-compute image URLs server-side so the client component needs no Sanity SDK
  const posts: BlogPostCard[] = raw.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug.current,
    excerpt: p.excerpt,
    tag: p.tag,
    readTime: p.readTime,
    publishedAt: p.publishedAt,
    author: p.author,
    imageUrl: p.coverImage
      ? urlFor(p.coverImage).width(800).height(450).url()
      : undefined,
  }));

  // Unique, sorted tags from published posts
  const allTags = [...new Set(posts.map((p) => p.tag).filter(Boolean) as string[])];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://collegencourses.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://collegencourses.com/blog" },
          ],
        }) }}
      />
      <main>
      {/* Hero */}
      <div className="bi-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--yellow)" }}>INSIGHTS &amp; GUIDES</div>
          <h1 className="h-display h1" style={{ color: "var(--ivory)", margin: "12px 0 16px" }}>
            Honest writing on Indian higher education.
          </h1>
          <p className="lede" style={{ color: "var(--pale-navy)", maxWidth: 600, marginBottom: 32 }}>
            No clickbait. No paid rankings. Real data, written by counsellors who work with aspirants every day.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingBottom: 40 }}>
            <Link href="/contact-us" className="btn btn-primary btn-sm">
              Speak to a Counsellor
            </Link>
            <Link
              href="/#programmes"
              className="btn btn-sm"
              style={{
                background: "rgba(255,255,255,.1)",
                color: "var(--ivory)",
                border: "1.5px solid rgba(255,255,255,.25)",
              }}
            >
              Browse MBA Programmes
            </Link>
          </div>
        </div>
      </div>

      {/* Filter bar + Grid + Load more (all client-side interactive) */}
      <BlogIndexClient posts={posts} allTags={allTags} />

      {/* CTA band */}
      <section className="bi-cta-band">
        <div className="container" style={{ maxWidth: 560, textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--navy)" }}>NOT SURE WHERE TO START?</div>
          <h2 className="h-display h2" style={{ color: "var(--navy)", margin: "12px 0 16px" }}>
            Talk to a counsellor
          </h2>
          <p style={{ color: "var(--navy)", fontSize: 17, marginBottom: 28 }}>
            Skip the research rabbit hole. Get a personalised shortlist of programmes matched to your profile.
          </p>
          <Link href="/contact-us" className="btn btn-inverted">
            Get Expert Guidance
          </Link>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .bi-hero {
          background: var(--navy);
          padding: 56px 0 0;
        }

        /* ── Sticky filter bar ── */
        .bi-filter-bar {
          background: var(--white);
          border-bottom: 2px solid var(--mist);
          position: sticky;
          top: 64px;
          z-index: 90;
          box-shadow: 0 1px 3px rgba(36,48,72,.06);
        }
        .bi-filter-inner {
          display: flex;
          overflow-x: auto;
          gap: 4px;
          padding: 12px 0;
          scrollbar-width: none;
        }
        .bi-filter-inner::-webkit-scrollbar { display: none; }
        .bi-chip {
          padding: 7px 16px;
          font-size: 13px;
          font-weight: 500;
          border-radius: 999px;
          border: 1.5px solid var(--pale-navy);
          color: var(--navy);
          background: var(--white);
          white-space: nowrap;
          cursor: pointer;
          transition: all .15s;
          font-family: var(--font-sans);
        }
        .bi-chip:hover { border-color: var(--navy); }
        .bi-chip-active {
          background: var(--navy);
          color: var(--ivory);
          border-color: var(--navy);
        }

        /* ── Main + Grid ── */
        .bi-main { padding: 36px 0 64px; }
        .bi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) { .bi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .bi-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Blog card ── */
        .bi-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .18s, box-shadow .18s;
          text-decoration: none;
          color: inherit;
        }
        .bi-card:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(36,48,72,.10); }
        .bi-card-featured { border-color: var(--yellow); border-width: 2px; }

        /* ── Cover ── */
        .bi-cover {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--navy), #1A2336);
          position: relative;
          overflow: hidden;
        }
        .bi-cover-deco {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 70% 20%, rgba(252,204,0,.13), transparent 45%),
            radial-gradient(circle at 20% 80%, rgba(214,219,237,.12), transparent 40%);
        }
        .bi-cover-cat {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 1;
        }
        .bi-tag {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          background: var(--yellow);
          color: var(--navy);
        }
        .bi-cover-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--yellow);
          color: var(--navy);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 3px;
        }

        /* ── Card body ── */
        .bi-card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .bi-card-body h3 {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: 19px;
          line-height: 1.25;
          margin-bottom: 10px;
        }
        .bi-excerpt {
          font-size: 14px;
          color: var(--grey);
          flex: 1;
          margin-bottom: 14px;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bi-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--grey);
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .bi-sep { color: var(--pale-navy); }
        .bi-read-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
          margin-top: auto;
        }
        .bi-read-link svg { transition: transform .15s; }
        .bi-card:hover .bi-read-link svg { transform: translateX(3px); }

        /* ── Mid-grid capture ── */
        .bi-mid-capture {
          background: var(--navy);
          border-radius: 14px;
          padding: 28px 24px;
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .bi-mid-capture { flex-direction: row; align-items: center; gap: 28px; }
        }
        .bi-mid-body { flex: 1; }
        .bi-mid-body h3 {
          font-family: var(--font-serif);
          color: var(--yellow);
          font-size: 20px;
          margin-bottom: 6px;
        }
        .bi-mid-body p { color: var(--pale-navy); font-size: 14px; margin: 0; }
        .bi-mid-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 260px;
        }
        .bi-mid-form input {
          padding: 11px 14px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-family: var(--font-sans);
          color: var(--charcoal);
        }
        .bi-mid-form input:focus { outline: 2px solid var(--yellow); }

        /* ── Load more ── */
        .bi-load-more { text-align: center; margin-top: 40px; }
        .bi-load-more p { font-size: 14px; color: var(--grey); margin-bottom: 14px; }

        /* ── CTA band ── */
        .bi-cta-band {
          background: var(--yellow);
          padding: 64px 0;
          border-top: 4px solid var(--navy);
        }

        /* ── btn-inverted (navy bg, yellow text) ── */
        .btn-inverted {
          background: var(--navy);
          color: var(--yellow);
          border-top: 4px solid var(--yellow);
          padding-top: 9px;
        }
        .btn-inverted:hover { opacity: .9; }
      `}</style>
    </main>
    </>
  );
}
