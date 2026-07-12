import type { Metadata } from "next";
import MarketingGuideClient from "./MarketingGuideClient";

export const metadata: Metadata = {
  title: "MBA in Marketing Management 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.2 L to ₹25 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/marketing/",
  },
  openGraph: {
    type: "article",
    title: "MBA in Marketing Management 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/marketing/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-marketing.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in Marketing Management 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-marketing.webp"],
  },
};

export default function MarketingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "MBA in Marketing Management: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description:
              "Fees ₹1.2 L to ₹25 L, salary bands, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
            datePublished: "2025-12-15T09:00:00+05:30",
            dateModified: "2025-12-15T09:00:00+05:30",
            author: {
              "@type": "Person",
              name: "CollegeNCourses Editorial Team",
              worksFor: { "@type": "Organization", name: "CollegeNCourses" },
            },
            publisher: {
              "@type": "EducationalOrganization",
              name: "CollegeNCourses",
              logo: { "@type": "ImageObject", url: "https://collegencourses.com/logo.png" },
            },
            mainEntityOfPage:
              "https://collegencourses.com/specializations-guide/marketing/",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://collegencourses.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Specializations Guide",
                item: "https://collegencourses.com/specializations-guide/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "MBA in Marketing Management",
                item: "https://collegencourses.com/specializations-guide/marketing/",
              },
            ],
          }),
        }}
      />
      <MarketingGuideClient />
    </>
  );
}
