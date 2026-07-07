import type { Metadata } from "next";
import SpecializationsHubClient from "./SpecializationsHubClient";

export const metadata: Metadata = {
  title: "MBA Specializations Guide 2026 | Find Your Perfect Track | CollegeNCourses",
  description:
    "The honest, jargon-free guide to 8 MBA specializations Indian aspirants are choosing in 2026. Career outcomes, salary benchmarks, top programmes, and the questions to ask before deciding.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide",
  },
  openGraph: {
    url: "https://collegencourses.com/specializations-guide",
    title: "MBA Specializations Guide 2026 | CollegeNCourses",
    description:
      "Explore 8 MBA specializations with career outcomes, salary benchmarks, and expert guidance for Indian aspirants.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://collegencourses.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Specializations Guide",
      item: "https://collegencourses.com/specializations-guide",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which MBA specialization has the highest salary in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finance and IT & Project Management typically yield the highest post-MBA salaries, averaging ₹14 lakh per annum. Executive MBA programmes from IIM-tier institutions command ₹35 lakh+ for senior professionals.",
      },
    },
    {
      "@type": "Question",
      name: "Which MBA specialization is best for a working professional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IT & Project Management has the highest density of working professionals, particularly from tech backgrounds. HR and Operations are also popular for mid-career professionals. The best choice depends on your current domain — staying within your field usually provides the strongest career leverage.",
      },
    },
    {
      "@type": "Question",
      name: "Is it possible to switch to a completely different field with an MBA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but the curve is steeper when switching both industry and function simultaneously. The MBA provides the credential bridge, but without domain experience, you start the job search at a disadvantage to peers who already have that context.",
      },
    },
    {
      "@type": "Question",
      name: "Which MBA specialization is right if I am not sure what I want?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marketing and General Management are the most forgiving specializations for the undecided — they offer broad skill sets applicable across industries. However, if you have a domain background, using it is almost always more powerful than abandoning it.",
      },
    },
    {
      "@type": "Question",
      name: "Is Healthcare Management a good MBA specialization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Healthcare Management is the fastest-growing niche MBA specialization in 2026, driven by expansion of hospital chains, health-tech, and pharma operations. Average post-MBA salaries are around ₹12 lakh.",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MBA Specializations 2026",
  description: "8 MBA specializations for Indian aspirants in 2026",
  numberOfItems: 8,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Marketing & Digital Marketing", url: "https://collegencourses.com/specializations-guide/marketing" },
    { "@type": "ListItem", position: 2, name: "Finance", url: "https://collegencourses.com/specializations-guide/finance" },
    { "@type": "ListItem", position: 3, name: "Banking & Financial Services", url: "https://collegencourses.com/specializations-guide/banking-financial-services" },
    { "@type": "ListItem", position: 4, name: "Human Resources", url: "https://collegencourses.com/specializations-guide/human-resources" },
    { "@type": "ListItem", position: 5, name: "Operations & Supply Chain", url: "https://collegencourses.com/specializations-guide/operations-supply-chain" },
    { "@type": "ListItem", position: 6, name: "IT & Project Management", url: "https://collegencourses.com/specializations-guide/it-project-management" },
    { "@type": "ListItem", position: 7, name: "Healthcare Management", url: "https://collegencourses.com/specializations-guide/healthcare-management" },
    { "@type": "ListItem", position: 8, name: "Executive MBA at IIM-tier", url: "https://collegencourses.com/specializations-guide/executive-mba" },
  ],
};

export default function SpecializationsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <SpecializationsHubClient />
    </>
  );
}
