import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/client";
import { landingPageQuery, allLandingPageSlugsQuery } from "@/sanity/lib/queries";
import LandingPageClient, { type LandingPageData } from "./LandingPageClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allLandingPageSlugsQuery,
    revalidate: 3600,
  });
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<LandingPageData>({
    query: landingPageQuery,
    params: { slug },
    revalidate: 60,
  });
  if (!data) return {};
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
  const data = await sanityFetch<LandingPageData>({
    query: landingPageQuery,
    params: { slug },
    revalidate: 60,
  });
  if (!data) notFound();

  // Footer is a server component — pass as ReactNode so LandingPageClient can place it
  const footer = data.showFooter ? <Footer /> : null;

  return <LandingPageClient data={data} footer={footer} />;
}
