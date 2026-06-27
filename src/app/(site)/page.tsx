import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { sanityFetch } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title:
    "CollegeNCourses | Compare Online & Distance MBA Programmes in India 2026-27",
  description:
    "Compare Online MBA, Distance MBA, and Executive MBA programmes from 150+ UGC-DEB and AICTE approved universities. Honest counselling, transparent fees, no sales pressure. Talk to a real counsellor in 30 minutes.",
  alternates: { canonical: "https://collegencourses.com/" },
  openGraph: {
    url: "https://collegencourses.com/",
    title: "CollegeNCourses | India's Trusted Higher-Education Compass",
  },
};

// JSON-LD Schemas
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "CollegeNCourses",
  alternateName: "College N Courses",
  url: "https://collegencourses.com",
  logo: "https://collegencourses.com/logo.webp",
  description:
    "India's trusted compass for higher-education decisions. We compare Online MBA, Distance MBA, and Executive MBA programmes from 150+ UGC-DEB approved universities.",
  founder: { "@type": "Person", name: "Nikhita Pradeep Deshmukh" },
  foundingDate: "2023-04-29",
  parentOrganization: {
    "@type": "Corporation",
    name: "DNYANAL EDUCON PRIVATE LIMITED",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7350460393",
    contactType: "Customer Service",
    email: "info@collegencourses.com",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.facebook.com/CollegeNCourses/",
    "https://www.instagram.com/collegencourses/",
    "https://www.linkedin.com/company/college-n-courses/",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is an Online MBA legally equivalent to a regular MBA in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. As per UGC-DEB regulations and the 2022 amendment to the AICTE handbook, Online and Distance Mode degrees from approved institutions hold the same legal standing as regular-mode degrees for employment, further studies, and government job eligibility.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an Online MBA cost in India in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total programme fees range from ₹50,000 at entry-level state universities to ₹6.5 lakh at IIMs for executive formats. The mainstream band sits between ₹1.5 lakh and ₹2.5 lakh for two-year programmes from Symbiosis, Amity, NMIMS, Manipal, ICFAI, and Welingkar.",
      },
    },
    {
      "@type": "Question",
      name: "Do employers in India accept Online and Distance MBAs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Major MNCs and Indian corporates including TCS, Infosys, Reliance, Asian Paints, Mahindra, and HDFC treat Online and Distance MBAs from UGC-DEB approved universities at parity with regular MBAs in their HR policies.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CollegeNCourses",
  url: "https://collegencourses.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://collegencourses.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const cmsData = await sanityFetch<Record<string, unknown>>({ query: homepageQuery, revalidate: 300 }).catch(() => null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomePageClient cmsData={cmsData} />
    </>
  );
}
