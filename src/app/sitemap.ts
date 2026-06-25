import { MetadataRoute } from "next";
import { createClient } from "next-sanity";
import {
  allBlogSlugsQuery,
  allCollegeSlugsQuery,
  allCourseSlugsQuery,
  allExamSlugsQuery,
  allScholarshipSlugsQuery,
  allPageSlugsQuery,
} from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://collegencourses.com";

type SlugItem = { slug: string };

async function getSlugs(query: string): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];
  try {
    const sanityClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
    const items = await sanityClient.fetch<SlugItem[]>(query);
    return items.filter((i) => i.slug).map((i) => i.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, collegeSlugs, courseSlugs, examSlugs, scholarshipSlugs, pageSlugs] =
    await Promise.all([
      getSlugs(allBlogSlugsQuery),
      getSlugs(allCollegeSlugsQuery),
      getSlugs(allCourseSlugsQuery),
      getSlugs(allExamSlugsQuery),
      getSlugs(allScholarshipSlugsQuery),
      getSlugs(allPageSlugsQuery),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/colleges`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/exams`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/scholarships`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...collegeSlugs.map((slug) => ({
      url: `${BASE_URL}/colleges/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...courseSlugs.map((slug) => ({
      url: `${BASE_URL}/courses/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...examSlugs.map((slug) => ({
      url: `${BASE_URL}/exams/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...scholarshipSlugs.map((slug) => ({
      url: `${BASE_URL}/scholarships/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...pageSlugs.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
