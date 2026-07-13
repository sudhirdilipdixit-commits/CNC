import type { Metadata } from "next";
import RetailGuideClient from "./RetailGuideClient";

export const metadata: Metadata = {
  title: "MBA in Retail Management 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.2 L to ₹20 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/retail/",
  },
  openGraph: {
    type: "article",
    title: "MBA in Retail Management 2025-26 — The Honest Guide",
    description: "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/retail/",
    images: [{ url: "https://collegencourses.com/og/specializations-guide-retail.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in Retail Management 2025-26 — The Honest Guide",
    description: "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-retail.webp"],
  },
};

export default function RetailGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "MBA in Retail Management: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
        description: "Fees Rs 1.2 L to Rs 20 L, salary bands, top 10 UGC-DEB approved programmes.",
        datePublished: "2025-12-15T09:00:00+05:30", dateModified: "2025-12-15T09:00:00+05:30",
        author: { "@type": "Person", name: "CollegeNCourses Editorial Team", worksFor: { "@type": "Organization", name: "CollegeNCourses" } },
        publisher: { "@type": "EducationalOrganization", name: "CollegeNCourses", logo: { "@type": "ImageObject", url: "https://collegencourses.com/logo.png" } },
        mainEntityOfPage: "https://collegencourses.com/specializations-guide/retail/",
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://collegencourses.com/" },
          { "@type": "ListItem", position: 2, name: "Specializations Guide", item: "https://collegencourses.com/specializations-guide/" },
          { "@type": "ListItem", position: 3, name: "MBA in Retail Management", item: "https://collegencourses.com/specializations-guide/retail/" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Is an Online MBA in Retail Management valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA in Retail from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes." } },
          { "@type": "Question", name: "Should I do a Retail MBA or a Marketing MBA?", acceptedAnswer: { "@type": "Answer", text: "If you want to run brand strategy across sectors, Marketing Management is broader. If you want to work specifically in retail businesses (Nykaa category head, DMart regional manager, D2C brand founder), Retail Management goes deeper into retail-specific disciplines." } },
          { "@type": "Question", name: "How much does a Retail MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 28 lakh (IIM Ahmedabad PGPX). Mainstream Online MBA programmes sit between Rs 1.4 lakh and Rs 2.5 lakh total." } },
          { "@type": "Question", name: "What is the salary after an Online MBA in Retail?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary is Rs 5.5 LPA for freshers, Rs 12 LPA at 3-7 years, Rs 26 LPA at 8-15 years. D2C brand Category Managers at Nykaa, Mamaearth, and boAt earn 25-40% above these medians." } },
          { "@type": "Question", name: "Is Retail Management MBA a good career option?", acceptedAnswer: { "@type": "Answer", text: "Yes, particularly for aspirants interested in consumer businesses. India's D2C brand explosion, quick commerce growth, organised retail expansion, and e-commerce scaling are all driving structural retail hiring." } },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "HowTo",
        name: "How to decide if a Retail Management MBA is right for you",
        description: "A 5-question framework used by CollegeNCourses counsellors to help aspirants choose a Retail Management MBA in 2025-26.",
        step: [
          { "@type": "HowToStep", position: 1, name: "Name your target segment — traditional retail, D2C, e-commerce retail, or quick commerce", text: "Each has fundamentally different economics, hiring criteria, and daily work." },
          { "@type": "HowToStep", position: 2, name: "Confirm your comfort with weekends and festival-peak schedules", text: "Retail is 24x7 during Diwali, EOSS periods, Black Friday, and end-of-quarter pushes." },
          { "@type": "HowToStep", position: 3, name: "Audit whether you enjoy consumer businesses at ground level", text: "Retail rewards aspirants who genuinely enjoy understanding consumers — store visits, category walks, D2C brand deconstruction, and metrics reviews." },
          { "@type": "HowToStep", position: 4, name: "Check whether D2C or quick commerce is the right emerging segment for you", text: "If yes — Online MBA with D2C/quick commerce electives (Symbiosis, NMIMS, MICA) is far better than a traditional retail programme." },
          { "@type": "HowToStep", position: 5, name: "Set your hard financial ceiling", text: "Rs 1.2 L to Rs 28 L is the full range. Most working professionals fit Rs 1.85 L to Rs 2.5 L Online." },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        itemListElement: [
          { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "PGPX (Retail electives) — IIM Ahmedabad", description: "12-month Executive MBA with very strong D2C and consulting placements (~100%).", courseMode: "Blended", timeRequired: "P12M" } },
          { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Executive MBA — MICA Ahmedabad", description: "24-month Executive MBA with legacy consumer + brand depth (~92%).", courseMode: "Blended", timeRequired: "P24M" } },
          { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Online MBA Retail Management — Symbiosis SCOL", description: "24-month Online MBA with live faculty and strong D2C brand alumni (~72%).", courseMode: "Online", timeRequired: "P24M" } },
        ],
      }) }} />
      <RetailGuideClient />
    </>
  );
}
