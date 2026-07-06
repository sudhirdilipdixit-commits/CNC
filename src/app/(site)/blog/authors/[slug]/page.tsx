import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { allAuthorSlugsQuery, authorBySlugQuery, blogsByAuthorRefQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/* ── Types ──────────────────────────────────────────────────────────── */

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  jobTitle?: string;
  qualifications?: string;
  bio?: string;
  avatar?: { asset: { _ref: string } };
  linkedIn?: string;
  twitter?: string;
}

interface PostCard {
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

/* ── Static params ───────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allAuthorSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const author = await sanityFetch<Author>({ query: authorBySlugQuery, params: { slug }, revalidate: 3600 });
  if (!author) return { title: "Author | CollegeNCourses" };

  const desc = author.bio || `Articles by ${author.name}${author.jobTitle ? `, ${author.jobTitle}` : ""} at CollegeNCourses.`;
  return {
    title: author.name,
    description: desc,
    alternates: { canonical: `https://collegencourses.com/blog/authors/${slug}` },
    openGraph: { title: author.name, description: desc },
  };
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default async function AuthorPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const author = await sanityFetch<Author>({ query: authorBySlugQuery, params: { slug }, revalidate: 3600 });
  if (!author) notFound();

  const posts = await sanityFetch<PostCard[]>({
    query: blogsByAuthorRefQuery,
    params: { authorId: author._id },
    revalidate: 3600,
  });

  const BASE = "https://collegencourses.com";
  const initials = author.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${BASE}/blog/authors/${slug}`,
    ...(author.jobTitle && { jobTitle: author.jobTitle }),
    ...(author.bio && { description: author.bio }),
    worksFor: { "@type": "Organization", name: "CollegeNCourses", url: BASE },
    sameAs: [
      author.linkedIn,
      author.twitter ? `https://x.com/${author.twitter}` : undefined,
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
          { "@type": "ListItem", position: 3, name: author.name, item: `${BASE}/blog/authors/${slug}` },
        ],
      }) }} />

      <main>
        {/* Hero */}
        <div className="au-hero">
          <div className="container">
            <nav className="au-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> / </span>
              <Link href="/blog">Blog</Link>
              <span> / </span>
              <span>{author.name}</span>
            </nav>

            <div className="au-profile">
              <div className="au-avatar" aria-hidden="true">
                {author.avatar ? (
                  <Image
                    src={urlFor(author.avatar).width(160).height(160).url()}
                    alt={author.name}
                    width={80}
                    height={80}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="au-meta">
                <h1 className="h-display h2" style={{ color: "var(--ivory)", marginBottom: 4 }}>
                  {author.name}
                </h1>
                {author.jobTitle && <p className="au-job-title">{author.jobTitle}</p>}
                {author.qualifications && <p className="au-quals">{author.qualifications}</p>}
                <div className="au-social">
                  {author.linkedIn && (
                    <a href={author.linkedIn} target="_blank" rel="noopener noreferrer" className="au-social-link">
                      LinkedIn ↗
                    </a>
                  )}
                  {author.twitter && (
                    <a href={`https://x.com/${author.twitter}`} target="_blank" rel="noopener noreferrer" className="au-social-link">
                      @{author.twitter} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>

            {author.bio && <p className="au-bio">{author.bio}</p>}
          </div>
        </div>

        {/* Posts grid */}
        <div style={{ background: "var(--ivory)", padding: "40px 0 72px" }}>
          <div className="container">
            <p className="au-post-count">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </p>

            {posts.length === 0 ? (
              <p style={{ color: "var(--grey)", fontSize: 15 }}>No published articles yet.</p>
            ) : (
              <div className="au-grid">
                {posts.map((p) => {
                  const imageUrl = p.coverImage
                    ? urlFor(p.coverImage).width(800).height(450).url()
                    : undefined;
                  const dateStr = p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : "";
                  return (
                    <Link key={p._id} href={`/blog/${p.slug.current}`} className="au-card">
                      <div className="au-card-cover">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={p.title}
                            width={400}
                            height={225}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="au-card-cover-fallback" />
                        )}
                        {p.tag && <span className="au-tag">{p.tag}</span>}
                      </div>
                      <div className="au-card-body">
                        <h3>{p.title}</h3>
                        {p.excerpt && <p className="au-card-excerpt">{p.excerpt}</p>}
                        <div className="au-card-meta">
                          {p.readTime}{p.readTime && dateStr ? " · " : ""}{dateStr}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <style>{`
          .au-hero {
            background: var(--navy);
            padding: 28px 0 40px;
          }
          .au-breadcrumb {
            font-size: 12px;
            color: rgba(255,255,255,.45);
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .au-breadcrumb a { color: rgba(255,255,255,.45); text-decoration: none; }
          .au-breadcrumb a:hover { color: var(--yellow); }
          .au-profile {
            display: flex;
            align-items: center;
            gap: 24px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }
          .au-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid var(--yellow);
            flex: 0 0 80px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,.08);
          }
          .au-avatar span {
            font-family: var(--font-serif);
            font-size: 26px;
            color: var(--yellow);
            font-weight: 700;
          }
          .au-meta { flex: 1; min-width: 200px; }
          .au-job-title { font-size: 15px; color: var(--yellow); font-weight: 500; margin-bottom: 4px; }
          .au-quals { font-size: 13px; color: rgba(255,255,255,.55); margin-bottom: 10px; }
          .au-social { display: flex; gap: 10px; flex-wrap: wrap; }
          .au-social-link {
            font-size: 12px;
            color: var(--yellow);
            text-decoration: none;
            border: 1px solid rgba(252,204,0,.35);
            border-radius: 4px;
            padding: 3px 10px;
            transition: background .15s;
          }
          .au-social-link:hover { background: rgba(252,204,0,.1); }
          .au-bio {
            font-size: 15px;
            color: rgba(255,255,255,.72);
            line-height: 1.65;
            max-width: 680px;
          }
          .au-post-count {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .1em;
            text-transform: uppercase;
            color: var(--grey);
            margin-bottom: 22px;
          }
          .au-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 640px)  { .au-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .au-grid { grid-template-columns: repeat(3, 1fr); } }
          .au-card {
            background: var(--white);
            border: 1px solid var(--mist);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            transition: transform .18s, box-shadow .18s;
          }
          .au-card:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(36,48,72,.10); }
          .au-card-cover {
            aspect-ratio: 16/9;
            position: relative;
            overflow: hidden;
          }
          .au-card-cover-fallback {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--navy), #1A2336);
          }
          .au-tag {
            position: absolute;
            bottom: 10px;
            left: 10px;
            z-index: 1;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .08em;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 3px;
            background: var(--yellow);
            color: var(--navy);
          }
          .au-card-body {
            padding: 18px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .au-card-body h3 {
            font-family: var(--font-serif);
            color: var(--navy);
            font-size: 17px;
            line-height: 1.3;
            margin-bottom: 8px;
          }
          .au-card-excerpt {
            font-size: 13px;
            color: var(--grey);
            line-height: 1.55;
            flex: 1;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .au-card-meta { font-size: 12px; color: var(--grey); margin-top: auto; }
        `}</style>
      </main>
    </>
  );
}
