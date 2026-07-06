import { createClient } from "next-sanity";

export const revalidate = 3600;

const BASE = "https://collegencourses.com";

type FeedPost = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  author?: string;
  tag?: string;
  coverImageUrl?: string;
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getFeedPosts(): Promise<FeedPost[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];
  try {
    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
    return await client.fetch<FeedPost[]>(`
      *[_type == "blog"] | order(publishedAt desc)[0...20]{
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        author,
        tag,
        "coverImageUrl": coverImage.asset->url
      }
    `);
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = await getFeedPosts();

  const items = posts
    .map((p) => {
      const lines = [
        `    <item>`,
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${BASE}/blog/${p.slug}</link>`,
        `      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>`,
        p.excerpt ? `      <description>${escapeXml(p.excerpt)}</description>` : "",
        p.publishedAt ? `      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : "",
        p.author ? `      <author>editorial@collegencourses.com (${escapeXml(p.author)})</author>` : "",
        p.tag ? `      <category>${escapeXml(p.tag)}</category>` : "",
        p.coverImageUrl ? `      <enclosure url="${escapeXml(p.coverImageUrl)}" type="image/jpeg" length="0"/>` : "",
        `    </item>`,
      ];
      return lines.filter(Boolean).join("\n");
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CollegeNCourses Blog</title>
    <link>${BASE}/blog</link>
    <description>Expert insights on online MBA programmes, career strategy, and Indian higher education.</description>
    <language>en-IN</language>
    <managingEditor>editorial@collegencourses.com (CollegeNCourses Editorial)</managingEditor>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
