import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/client";
import {
  landingPageQuery,
  allLandingPageSlugsQuery,
  landingPagesQuery,
  allLandingPagesSlugsQuery,
} from "@/sanity/lib/queries";
import LandingPageClient, { type LandingPageData } from "./LandingPageClient";
import LandingPagesClient, { type LandingPagesData } from "./LandingPagesClient";

export const revalidate = 60;

type ResolvedPage =
  | { kind: "old"; data: LandingPageData }
  | { kind: "new"; data: LandingPagesData };

async function getLandingPage(slug: string): Promise<ResolvedPage | null> {
  const [newData, oldData] = await Promise.all([
    sanityFetch<LandingPagesData | null>({
      query: landingPagesQuery,
      params: { slug },
      revalidate: 60,
    }),
    sanityFetch<LandingPageData | null>({
      query: landingPageQuery,
      params: { slug },
      revalidate: 60,
    }),
  ]);
  if (newData) return { kind: "new", data: newData };
  if (oldData) return { kind: "old", data: oldData };
  return null;
}

export async function generateStaticParams() {
  const [oldSlugs, newSlugs] = await Promise.all([
    sanityFetch<{ slug: string }[]>({
      query: allLandingPageSlugsQuery,
      revalidate: 3600,
    }),
    sanityFetch<{ slug: string }[]>({
      query: allLandingPagesSlugsQuery,
      revalidate: 3600,
    }),
  ]);
  const slugs = new Set([...oldSlugs, ...newSlugs].map((s) => s.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return {};
  const { data } = page;
  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description,
    robots: data.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) notFound();

  // Footer is a server component — pass as ReactNode so the client component can place it
  const footer = page.data.showFooter ? <Footer /> : null;

  if (page.kind === "new") {
    return <LandingPagesClient data={page.data} footer={footer} />;
  }
  return <LandingPageClient data={page.data} footer={footer} />;
}
