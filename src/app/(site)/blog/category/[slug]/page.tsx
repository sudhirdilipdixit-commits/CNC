import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { allCategorySlugsQuery, categoryBySlugQuery, blogsByCategoryQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/* ── Types ──────────────────────────────────────────────────────────── */

interface BlogCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  coverImage?: { asset: { _ref: string } };
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
  const slugs = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cat = await sanityFetch<BlogCategory>({ query: categoryBySlugQuery, params: { slug }, revalidate: 3600 });
  if (!cat) return { title: "Category | CollegeNCourses" };

  const desc = cat.description || `Browse all ${cat.name} articles on CollegeNCourses — expert education insights for Indian MBA aspirants.`;
  return {
    title: cat.name,
    description: desc,
    alternates: { canonical: `https://collegencourses.com/blog/category/${slug}` },
    openGraph: { title: cat.name, description: desc },
  };
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default async function CategoryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const cat = await sanityFetch<BlogCategory>({ query: categoryBySlugQuery, params: { slug }, revalidate: 3600 });
  if (!cat) notFound();

  const posts = await sanityFetch<PostCard[]>({
    query: blogsByCategoryQuery,
    params: { categoryId: cat._id },
    revalidate: 3600,
  });

  const BASE = "https://collegencourses.com";

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} — CollegeNCourses Blog`,
    description: cat.description,
    url: `${BASE}/blog/category/${slug}`,
    hasPart: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${BASE}/blog/${p.slug.current}`,
      ...(p.publishedAt && { datePublished: p.publishedAt }),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
          { "@type": "ListItem", position: 3, name: cat.name, item: `${BASE}/blog/category/${slug}` },
        ],
      }) }} />

      <main>
        {/* Hero */}
        <div className="cat-hero">
          <div className="container">
            <nav className="cat-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> / </span>
              <Link href="/blog">Blog</Link>
              <span> / </span>
              <span>{cat.name}</span>
            </nav>
            <div className="eyebrow" style={{ color: "var(--yellow)", marginBottom: 10 }}>
              CATEGORY
            </div>
            <h1 className="h-display h1" style={{ color: "var(--ivory)", marginBottom: 16 }}>
              {cat.name}
            </h1>
            {cat.description && (
              <p className="cat-desc">{cat.description}</p>
            )}
          </div>
        </div>

        {/* Posts */}
        <div style={{ background: "var(--ivory)", padding: "40px 0 72px" }}>
          <div className="container">
            <p className="cat-count">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </p>

            {posts.length === 0 ? (
              <p style={{ color: "var(--grey)", fontSize: 15 }}>No published articles in this category yet.</p>
            ) : (
              <div className="cat-grid">
                {posts.map((p) => {
                  const imageUrl = p.coverImage
                    ? urlFor(p.coverImage).width(800).height(450).url()
                    : undefined;
                  const dateStr = p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : "";
                  return (
                    <Link key={p._id} href={`/blog/${p.slug.current}`} className="cat-card">
                      <div className="cat-card-cover">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={p.title}
                            width={400}
                            height={225}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="cat-card-cover-fallback" />
                        )}
                        {p.tag && <span className="cat-tag">{p.tag}</span>}
                      </div>
                      <div className="cat-card-body">
                        <h3>{p.title}</h3>
                        {p.excerpt && <p className="cat-card-excerpt">{p.excerpt}</p>}
                        <div className="cat-card-meta">
                          {p.author && <span className="cat-card-author">{p.author}</span>}
                          {p.author && (p.readTime || dateStr) && <span className="cat-sep">·</span>}
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
          .cat-hero {
            background: var(--navy);
            padding: 28px 0 48px;
          }
          .cat-breadcrumb {
            font-size: 12px;
            color: rgba(255,255,255,.45);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .cat-breadcrumb a { color: rgba(255,255,255,.45); text-decoration: none; }
          .cat-breadcrumb a:hover { color: var(--yellow); }
          .cat-desc {
            font-size: 17px;
            color: rgba(255,255,255,.72);
            line-height: 1.65;
            max-width: 600px;
          }
          .cat-count {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .1em;
            text-transform: uppercase;
            color: var(--grey);
            margin-bottom: 22px;
          }
          .cat-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 640px)  { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .cat-grid { grid-template-columns: repeat(3, 1fr); } }
          .cat-card {
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
          .cat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(36,48,72,.10); }
          .cat-card-cover {
            aspect-ratio: 16/9;
            position: relative;
            overflow: hidden;
          }
          .cat-card-cover-fallback {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--navy), #1A2336);
          }
          .cat-tag {
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
          .cat-card-body {
            padding: 18px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .cat-card-body h3 {
            font-family: var(--font-serif);
            color: var(--navy);
            font-size: 17px;
            line-height: 1.3;
            margin-bottom: 8px;
          }
          .cat-card-excerpt {
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
          .cat-card-meta {
            font-size: 12px;
            color: var(--grey);
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
          }
          .cat-card-author { font-weight: 500; }
          .cat-sep { color: var(--pale-navy); }
        `}</style>
      </main>
    </>
  );
}
