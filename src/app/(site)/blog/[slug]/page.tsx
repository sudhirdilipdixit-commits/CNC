import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch, client } from "@/sanity/lib/client";
import { blogBySlugQuery, relatedBlogPostsQuery, allBlogSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import BlogProgressBar from "./BlogProgressBar";
import BlogSidebarClient from "./BlogSidebarClient";

/* ── Types ──────────────────────────────────────────────────────────── */

interface BlockChild {
  _type: string;
  text?: string;
}

interface ContentBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: BlockChild[];
  asset?: { _ref: string };
  alt?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  tag?: string;
  readTime?: string;
  publishedAt?: string;
  author?: string;
  body?: ContentBlock[];
  seo?: { title?: string; description?: string; ogImage?: { asset: { _ref: string } } };
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { _ref: string } };
  tag?: string;
  readTime?: string;
  publishedAt?: string;
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function blockText(block: ContentBlock): string {
  return (block.children ?? [])
    .filter((c) => c._type === "span")
    .map((c) => c.text ?? "")
    .join("");
}

function extractHeadings(body: ContentBlock[]) {
  return body
    .filter((b) => b._type === "block" && (b.style === "h2" || b.style === "h3"))
    .map((b) => ({ id: slugify(blockText(b)), label: blockText(b) }))
    .filter((h) => h.id && h.label);
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

/* ── Portable Text components ────────────────────────────────────────── */

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ContentBlock }) => (
      <figure style={{ margin: "28px 0" }}>
        <Image
          src={urlFor(value as Parameters<typeof urlFor>[0]).width(720).url()}
          alt={value.alt || ""}
          width={720}
          height={405}
          style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)" }}
        />
      </figure>
    ),
  },
  block: {
    h2: ({ children, value }) => {
      const id = slugify(blockText(value as ContentBlock));
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children, value }) => {
      const id = slugify(blockText(value as ContentBlock));
      return <h3 id={id}>{children}</h3>;
    },
    blockquote: ({ children }) => (
      <div className="bp-pull-quote">
        <p>{children}</p>
      </div>
    ),
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string }).href || "#"}
        target={(value as { blank?: boolean }).blank ? "_blank" : undefined}
        rel={(value as { blank?: boolean }).blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

/* ── Static params ───────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: blogBySlugQuery,
    params: { slug },
    revalidate: 3600,
  });
  if (!post) return { title: "Blog | CollegeNCourses" };

  const seoTitle = post.seo?.title || `${post.title} | CollegeNCourses`;
  const seoDesc = post.seo?.description || post.excerpt || "";
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  };
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [post, related] = await Promise.all([
    sanityFetch<BlogPost>({
      query: blogBySlugQuery,
      params: { slug },
      tags: [`blog:${slug}`],
    }),
    sanityFetch<RelatedPost[]>({
      query: relatedBlogPostsQuery,
      params: { slug },
      revalidate: 3600,
    }),
  ]);

  if (!post) notFound();

  const tocItems = post.body ? extractHeadings(post.body) : [];
  const byline = post.author || "CollegeNCourses Editorial";

  return (
    <main style={{ background: "var(--ivory)" }}>
      <BlogProgressBar />

      {/* Breadcrumb */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--mist)" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 0", fontSize: 12, color: "var(--grey)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--grey)" }}>Home</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <Link href="/blog" style={{ color: "var(--grey)" }}>Blog</Link>
            <span style={{ color: "var(--pale-navy)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 500, maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: "var(--white)", paddingTop: 36 }}>
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            {post.tag && (
              <div style={{ marginBottom: 14 }}>
                <span className="bp-tag">{post.tag}</span>
              </div>
            )}
            <h1 className="h-display h1" style={{ marginBottom: 20 }}>{post.title}</h1>
            {post.excerpt && (
              <p className="lede" style={{ color: "var(--grey)", marginBottom: 24, maxWidth: 680 }}>
                {post.excerpt}
              </p>
            )}

            {/* Byline */}
            <div className="bp-byline">
              <div className="bp-byline-avatar">
                {byline.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{byline}</div>
                <div style={{ fontSize: 12, color: "var(--grey)" }}>CollegeNCourses Editorial Team</div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                {post.readTime && (
                  <div className="bp-byline-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" /><path d="M12 8v4l2 2" />
                    </svg>
                    {post.readTime}
                  </div>
                )}
                {post.publishedAt && (
                  <div className="bp-byline-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {formatDate(post.publishedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div style={{ background: "var(--white)" }}>
          <div className="container">
            <div style={{ maxWidth: 780, overflow: "hidden", borderRadius: "var(--radius-lg)" }}>
              <Image
                src={urlFor(post.coverImage).width(780).height(440).url()}
                alt={post.coverImage.alt || post.title}
                width={780}
                height={440}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Article layout */}
      <div className="container">
        <div className="bp-layout">

          {/* Article body */}
          <div>
            <article className="bp-body" id="articleBody">
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p style={{ color: "var(--grey)" }}>No content yet.</p>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <BlogSidebarClient items={tocItems} />
        </div>
      </div>

      {/* Related reading */}
      {related && related.length > 0 && (
        <section style={{ background: "var(--white)", padding: "40px 0 56px" }}>
          <div className="container">
            <h2 className="h-display h3" style={{ marginBottom: 24 }}>Related reading</h2>
            <div className="bp-related-grid">
              {related.map((rp) => (
                <Link key={rp._id} href={`/blog/${rp.slug.current}`} className="bp-related-card">
                  <div className="bp-related-cover">
                    {rp.coverImage ? (
                      <Image
                        src={urlFor(rp.coverImage).width(400).height(200).url()}
                        alt={rp.title}
                        width={400}
                        height={200}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <>
                        <div className="bp-related-cover-grad" />
                        <div className="bp-related-cover-deco" />
                      </>
                    )}
                    {rp.tag && <span className="bp-tag bp-tag-sm">{rp.tag}</span>}
                  </div>
                  <div className="bp-related-body">
                    <h4>{rp.title}</h4>
                    <div className="bp-related-meta">
                      {rp.readTime}
                      {rp.readTime && rp.publishedAt ? " · " : ""}
                      {formatDate(rp.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section style={{ background: "var(--yellow)", padding: "64px 0", borderTop: "4px solid var(--navy)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div className="eyebrow" style={{ color: "var(--navy)" }}>READY TO TRANSFORM YOUR CAREER?</div>
          <h2 className="h-display h2" style={{ color: "var(--navy)", margin: "12px 0 16px" }}>
            Find the right MBA for your goals
          </h2>
          <p style={{ color: "var(--navy)", fontSize: 17, marginBottom: 28 }}>
            Speak with a CollegeNCourses counsellor — no commitment, no sales pitch.
          </p>
          <Link
            href="/contact-us"
            className="btn btn-primary"
            style={{ background: "var(--navy)", color: "var(--yellow)", borderTopColor: "var(--yellow)" }}
          >
            Talk to a Counsellor
          </Link>
        </div>
      </section>

      {/* Page-scoped styles */}
      <style>{`
        /* Layout */
        .bp-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding: 40px 0 64px;
        }
        @media (min-width: 1200px) {
          .bp-layout {
            grid-template-columns: 1fr 264px;
            gap: 56px;
            align-items: start;
          }
        }

        /* Sidebar */
        .bp-sidebar { display: none; }
        @media (min-width: 1200px) {
          .bp-sidebar {
            display: block;
            position: sticky;
            top: calc(var(--header-h) + 20px);
          }
        }
        .bp-sidebar-inner {
          background: var(--white);
          border: 1px solid var(--mist);
          border-top: 4px solid var(--yellow);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .bp-toc-title {
          font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: var(--grey); margin-bottom: 14px;
        }
        .bp-toc-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 2px;
          margin-bottom: 4px;
        }
        .bp-toc-link {
          font-size: 13px; color: var(--grey); display: block;
          padding: 6px 10px;
          border-left: 2px solid transparent;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          line-height: 1.4; text-decoration: none;
          transition: color .15s, border-color .15s, background .15s;
        }
        .bp-toc-link:hover { color: var(--navy); background: var(--ivory); }
        .bp-toc-active {
          color: var(--navy); font-weight: 600;
          border-left-color: var(--yellow); background: var(--ivory);
        }
        .bp-form-wrap {
          margin-top: 20px; padding-top: 20px;
          border-top: 1px solid var(--mist);
        }
        .bp-input {
          width: 100%; padding: 9px 12px;
          border: 1px solid var(--pale-navy);
          border-radius: var(--radius-md);
          font-size: 13px; font-family: var(--font-sans);
          color: var(--charcoal); background: var(--white);
          transition: border-color .15s;
        }
        .bp-input:focus {
          outline: none; border-color: var(--yellow);
          box-shadow: 0 0 0 3px rgba(252,204,0,.18);
        }

        /* Article body typography */
        .bp-body {
          font-size: 17px; line-height: 1.72; color: var(--charcoal);
          max-width: 720px;
        }
        .bp-body h2 {
          font-family: var(--font-serif); color: var(--navy);
          font-size: clamp(22px, 2.8vw, 30px);
          margin: 40px 0 16px; padding-bottom: 12px;
          border-bottom: 2px solid var(--mist); position: relative;
        }
        .bp-body h2::before {
          content: ''; position: absolute;
          bottom: -2px; left: 0; width: 40px; height: 2px;
          background: var(--yellow);
        }
        .bp-body h3 {
          font-family: var(--font-serif); color: var(--navy);
          font-size: clamp(18px, 2.2vw, 23px); margin: 28px 0 12px;
        }
        .bp-body p { margin-bottom: 1.1em; }
        .bp-body ul, .bp-body ol {
          margin: 12px 0 20px 20px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .bp-body li { font-size: 16px; line-height: 1.6; }
        .bp-body strong { color: var(--navy); font-weight: 700; }
        .bp-body a {
          color: var(--navy); text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--yellow);
        }
        .bp-body figure { margin: 28px 0; }

        /* Pull quote (blockquote) */
        .bp-pull-quote {
          background: var(--pale-navy);
          border-left: 4px solid var(--yellow);
          padding: 20px 24px; margin: 28px 0;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .bp-pull-quote p {
          font-family: var(--font-serif); font-size: 20px;
          color: var(--navy); line-height: 1.4; margin: 0; font-style: italic;
        }

        /* Byline */
        .bp-byline {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 0;
          border-top: 1px solid var(--mist);
          border-bottom: 1px solid var(--mist);
          margin-bottom: 0; flex-wrap: wrap;
        }
        .bp-byline-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--navy); color: var(--yellow);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif); font-size: 12px; font-weight: 700;
          border: 2px solid var(--yellow); flex: 0 0 44px; letter-spacing: .04em;
        }
        .bp-byline-stat {
          font-size: 12px; color: var(--grey);
          display: flex; align-items: center; gap: 5px;
        }

        /* Tag */
        .bp-tag {
          display: inline-flex; align-items: center;
          font-size: 10px; font-weight: 800;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 3px;
          background: var(--yellow); color: var(--navy);
        }
        .bp-tag-sm { font-size: 9px; padding: 3px 8px; }

        /* Related */
        .bp-related-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 640px) {
          .bp-related-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .bp-related-card {
          background: var(--white); border: 1px solid var(--mist);
          border-radius: var(--radius-md); overflow: hidden;
          display: block; text-decoration: none; color: inherit;
          transition: transform .18s, box-shadow .18s;
        }
        .bp-related-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(36,48,72,.10);
        }
        .bp-related-cover {
          height: 110px; position: relative; overflow: hidden;
          display: flex; align-items: flex-end; padding: 10px;
        }
        .bp-related-cover-grad {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--navy), #1A2336);
        }
        .bp-related-cover-deco {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(252,204,0,.12), transparent 50%);
        }
        .bp-related-cover .bp-tag { position: relative; z-index: 1; }
        .bp-related-body { padding: 14px; }
        .bp-related-body h4 {
          font-family: var(--font-serif); color: var(--navy);
          font-size: 15px; line-height: 1.3; margin-bottom: 8px;
        }
        .bp-related-meta { font-size: 11px; color: var(--grey); }
      `}</style>
    </main>
  );
}
