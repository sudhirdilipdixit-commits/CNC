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
import LandingPagesClient, {
  type LandingPagesData,
  type CourseCardItem,
  type UniversityCardItem,
} from "./LandingPagesClient";

export const revalidate = 60;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://collegencourses.com").replace(/\/+$/, "");

const DEFAULT_AUTHOR = { name: "CollegeNCourses Editorial Team", role: "Content Lead, CollegeNCourses Editorial Desk" };
const DEFAULT_REVIEWER = { name: "CollegeNCourses Senior Counsellor", role: "Senior Counsellor, CollegeNCourses" };
const DEFAULT_APPROVER = { name: "Nikhita Pradeep Deshmukh", role: "Founder, Dnyanal Educon Pvt Ltd" };

function feeToNumber(fees?: string): number | undefined {
  if (!fees) return undefined;
  const match = fees.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : undefined;
}

function durationToIso(duration?: string): string | undefined {
  if (!duration) return undefined;
  const years = duration.match(/(\d+)\s*year/i);
  if (years) return `P${years[1]}Y`;
  const months = duration.match(/(\d+)\s*month/i);
  if (months) return `P${months[1]}M`;
  return undefined;
}

function buildLandingPagesJsonLd(data: LandingPagesData, slug: string): Record<string, unknown>[] {
  const url = `${SITE_URL}/${slug}`;
  const pageTitle = data.seo?.title || data.title;
  const pageDescription = data.seo?.description || data.hero?.calloutText || data.hero?.description;
  const dateModified = data.seo?.dateModified || undefined;

  const withFallback = (
    defaults: { name: string; role: string },
    override?: { name?: string; role?: string }
  ) => ({ name: override?.name || defaults.name, role: override?.role || defaults.role });

  const author = withFallback(DEFAULT_AUTHOR, data.aboutThisPage?.writtenBy);
  const reviewer = withFallback(DEFAULT_REVIEWER, data.aboutThisPage?.reviewedBy);
  const approver = withFallback(DEFAULT_APPROVER, data.aboutThisPage?.approvedBy);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: data.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: pageTitle,
      description: pageDescription,
      dateModified,
      author: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        worksFor: { "@type": "Organization", name: "CollegeNCourses" },
      },
      reviewedBy: {
        "@type": "Person",
        name: reviewer.name,
        jobTitle: reviewer.role,
        worksFor: { "@type": "Organization", name: "CollegeNCourses" },
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: "CollegeNCourses",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
        founder: {
          "@type": "Person",
          name: approver.name,
          jobTitle: approver.role,
          worksFor: { "@type": "Organization", name: "CollegeNCourses" },
        },
      },
    },
  ];

  if (data.faqs?.show !== false && data.faqs?.items?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  const items: (CourseCardItem | UniversityCardItem)[] =
    data.pageType === "university" ? data.universityItems ?? [] : data.courseItems ?? [];

  if (items.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: pageTitle,
      dateModified,
      itemListElement: items.map((item, index) => {
        const name = "courseName" in item ? item.courseName : item.universityName;
        const provider = item.universityName;
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "EducationalOccupationalProgram",
            name,
            provider: provider ? { "@type": "EducationalOrganization", name: provider } : undefined,
            timeToComplete: durationToIso(item.duration),
            offers: item.fees
              ? { "@type": "Offer", price: feeToNumber(item.fees), priceCurrency: "INR" }
              : undefined,
          },
        };
      }),
    });
  }

  return jsonLd;
}

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
  const title = data.seo?.title || data.title;
  const description = data.seo?.description;
  const url = `${SITE_URL}/${slug}`;
  return {
    title,
    description,
    robots: data.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url },
    twitter: { card: "summary_large_image", title, description },
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
    const jsonLd = buildLandingPagesJsonLd(page.data, slug);
    return (
      <>
        {jsonLd.map((block, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
        <LandingPagesClient data={page.data} footer={footer} slug={slug} />
      </>
    );
  }
  return <LandingPageClient data={page.data} footer={footer} />;
}
