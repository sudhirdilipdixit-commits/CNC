import { MetadataRoute } from "next";
import { createClient } from "next-sanity";
import {
  allBlogPostsForSitemapQuery,
  allAuthorSlugsQuery,
  allCategorySlugsQuery,
  allLandingPagesForSitemapQuery,
} from "@/sanity/lib/queries";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://collegencourses.com").replace(/\/+$/, "");

type BlogSitemapItem = { slug: string; publishedAt?: string; updatedAt?: string };
type SlugItem = { slug: string };
type LandingPageSitemapItem = { slug: string; dateModified?: string };

function makeSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

async function getBlogPosts(): Promise<BlogSitemapItem[]> {
  try {
    const c = makeSanityClient();
    if (!c) return [];
    const items = await c.fetch<BlogSitemapItem[]>(allBlogPostsForSitemapQuery);
    return items.filter((i) => i.slug);
  } catch { return []; }
}

async function getSlugs(query: string): Promise<string[]> {
  try {
    const c = makeSanityClient();
    if (!c) return [];
    const items = await c.fetch<SlugItem[]>(query);
    return items.filter((i) => i.slug).map((i) => i.slug);
  } catch { return []; }
}

async function getLandingPages(): Promise<LandingPageSitemapItem[]> {
  try {
    const c = makeSanityClient();
    if (!c) return [];
    const items = await c.fetch<LandingPageSitemapItem[]>(allLandingPagesForSitemapQuery);
    return items.filter((i) => i.slug);
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, authorSlugs, categorySlugs, landingPages] = await Promise.all([
    getBlogPosts(),
    getSlugs(allAuthorSlugsQuery),
    getSlugs(allCategorySlugsQuery),
    getLandingPages(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                           lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/blog`,                 lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/about`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact-us`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/authors/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const landingPageRoutes: MetadataRoute.Sitemap = landingPages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: page.dateModified ? new Date(page.dateModified) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...authorRoutes, ...categoryRoutes, ...landingPageRoutes];
}
