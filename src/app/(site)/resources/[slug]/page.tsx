import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { resourceDetailQuery, allResourceDetailSlugsQuery } from "@/sanity/lib/queries";
import LeadMagnetClient from "./LeadMagnetClient";

export interface ResourceDetail {
  _id: string;
  eyebrow: string | null;
  headline: string;
  lede: string | null;
  downloadCount: string | null;
  ratingText: string | null;
  checklistItems: string[] | null;
  freshnessNote: string | null;
  testimonials: Array<{ quote: string; attribution: string }> | null;
  formTitle: string | null;
  formSubtitle: string | null;
  formFooterNote: string | null;
  pageCount: number | null;
  lastUpdated: string | null;
  pdfName: string | null;
  pdfDownloadUrl: string | null;
  afterSteps: Array<{ stepLabel: string; title: string; body: string }> | null;
  seo: { title: string | null; description: string | null } | null;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allResourceDetailSlugsQuery,
    revalidate: false,
  });
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<ResourceDetail | null>({
    query: resourceDetailQuery,
    params: { slug },
    revalidate: 3600,
  });
  if (!data) return {};
  return {
    title: data.seo?.title ?? data.headline,
    description: data.seo?.description ?? data.lede ?? undefined,
  };
}

export default async function ResourceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = await sanityFetch<ResourceDetail | null>({
    query: resourceDetailQuery,
    params: { slug },
    revalidate: 3600,
    tags: ["resourceDetail"],
  });

  if (!data) return notFound();
  return <LeadMagnetClient data={data} />;
}
