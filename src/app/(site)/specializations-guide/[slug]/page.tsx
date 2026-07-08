import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import {
  specializationDetailQuery,
  allSpecializationDetailSlugsQuery,
} from "@/sanity/lib/queries";
import SpecializationDetailClient from "./SpecializationDetailClient";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allSpecializationDetailSlugsQuery,
    revalidate: 3600,
  }).catch(() => []);
  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<{
    seo?: { title?: string; description?: string; noIndex?: boolean };
    hero?: { heading?: string; lede?: string };
  }>({
    query: specializationDetailQuery,
    params: { slug },
    revalidate: 300,
  }).catch(() => null);

  if (!data) return {};

  const title =
    data.seo?.title ??
    `${data.hero?.heading ?? "MBA Specialization"} | CollegeNCourses`;

  return {
    title,
    description: data.seo?.description ?? data.hero?.lede ?? "",
    ...(data.seo?.noIndex ? { robots: "noindex" } : {}),
  };
}

export default async function SpecializationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await sanityFetch<Record<string, unknown>>({
    query: specializationDetailQuery,
    params: { slug },
    revalidate: 300,
  }).catch(() => null);

  if (!data) notFound();

  return <SpecializationDetailClient data={data} />;
}
