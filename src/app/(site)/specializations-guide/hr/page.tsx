import type { Metadata } from "next";
import HRGuideClient from "./HRGuideClient";

export const metadata: Metadata = {
  title: "MBA in Human Resource Management 2025-26: Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.2 L to ₹25 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/hr/",
  },
  openGraph: {
    type: "article",
    title: "MBA in Human Resource Management 2025-26 — Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/hr/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-hr.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in Human Resource Management 2025-26 — Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-hr.webp"],
  },
};

export default function HRGuidePage() {
  return (
    <>
      {/* Schema 1 — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "MBA in Human Resource Management: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description:
              "Fees Rs 1.2 L to Rs 25 L, salary bands, top 10 UGC-DEB approved programmes.",
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
              "https://collegencourses.com/specializations-guide/hr/",
          }),
        }}
      />
      {/* Schema 2 — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://collegencourses.com/" },
              { "@type": "ListItem", position: 2, name: "Specializations Guide", item: "https://collegencourses.com/specializations-guide/" },
              { "@type": "ListItem", position: 3, name: "MBA in Human Resource Management", item: "https://collegencourses.com/specializations-guide/hr/" },
            ],
          }),
        }}
      />
      {/* Schema 3 — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Is an Online MBA in HR valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA in HR from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes." } },
              { "@type": "Question", name: "Is XLRI worth the Rs 25 lakh fee for HR?", acceptedAnswer: { "@type": "Answer", text: "For aspirants targeting Tier-1 HR consulting (Mercer, Aon, Deloitte People Advisory), CHRO track at large Indian conglomerates, or MNC HR leadership — absolutely yes. XLRI alumni report ~45-60% Tier-1 consulting placement rates. For aspirants staying in HR at mid-tier corporates, XLRI is not worth the premium — an Online MBA at Symbiosis or NMIMS delivers similar outcomes at a fraction of the cost." } },
              { "@type": "Question", name: "How much does an HR Management MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 25 lakh (XLRI Executive). Mainstream Online MBA programmes sit between Rs 1.4 lakh and Rs 2.5 lakh total." } },
              { "@type": "Question", name: "What is the salary after an Online MBA in HR?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary is Rs 6 LPA for freshers, Rs 13 LPA at 3-7 years, Rs 28 LPA at 8-15 years. CHRO track at 15+ years reaches Rs 50 LPA–Rs 1 Cr+." } },
              { "@type": "Question", name: "Is HR MBA a good career option?", acceptedAnswer: { "@type": "Answer", text: "Yes, particularly for people-oriented professionals seeking career stability and long-term progression. HR roles are structurally embedded in every organization and remain in demand across cycles." } },
            ],
          }),
        }}
      />
      {/* Schema 4 — HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to decide if an HR Management MBA is right for you",
            description:
              "A 5-question framework used by CollegeNCourses counsellors to help aspirants choose an HR Management MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Name your target HR role family", text: "HRBP? Talent Acquisition? L&D? Compensation? People Analytics? Consulting? The programme choice, elective mix, and networking strategy differ across these." },
              { "@type": "HowToStep", position: 2, name: "Confirm whether Tier-1 HR consulting or CHRO track is a realistic goal", text: "If yes — XLRI Executive justifies the Rs 25 lakh. If not — Online MBA is far better ROI." },
              { "@type": "HowToStep", position: 3, name: "Audit your comfort with people-facing work at scale", text: "HR is not one-on-one counselling — it's systems, structures, and difficult conversations at scale (layoffs, restructuring, compensation disputes)." },
              { "@type": "HowToStep", position: 4, name: "Check whether you enjoy quantitative HR work", text: "Modern HR increasingly demands data literacy — engagement analytics, predictive attrition, compensation modelling." },
              { "@type": "HowToStep", position: 5, name: "Set your hard financial ceiling", text: "Rs 1.2 L to Rs 25 L is the full range. Most working professionals fit Rs 1.9 L to Rs 2.5 L Online." },
            ],
          }),
        }}
      />
      {/* Schema 5 — ItemList (top 3 programmes) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Executive MBA in HR — XLRI Jamshedpur", description: "15-month Executive MBA — unmatched HR brand in India with very strong consulting placements (~98%).", courseMode: "Blended", timeRequired: "P15M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Executive MBA (HR focus) — TISS Mumbai", description: "24-month Executive MBA with legacy HR strength in social sector and PSUs (~92%).", courseMode: "Blended", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Online MBA HR — Symbiosis SCOL", description: "24-month Online MBA with live faculty and strong HR alumni at TATA/Reliance (~74%).", courseMode: "Online", timeRequired: "P24M" } },
            ],
          }),
        }}
      />
      <HRGuideClient />
    </>
  );
}
