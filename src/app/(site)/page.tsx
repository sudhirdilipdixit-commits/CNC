import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title:
    "CollegeNCourses | Study in India and Abroad - Compare. Choose. Begin.",
  description:
    "Compare Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from 150+ UGC-DEB approved universities and top global institutions. AI-powered guidance, transparent fees, no spam.",
  alternates: { canonical: "https://collegencourses.com/" },
  openGraph: {
    url: "https://collegencourses.com/",
    title: "CollegeNCourses | India's Trusted Higher-Education Compass",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "CollegeNCourses",
  alternateName: "College N Courses",
  url: "https://collegencourses.com",
  logo: "https://collegencourses.com/logo.webp",
  description:
    "India's trusted compass for higher-education decisions. Compare Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from 150+ UGC-DEB approved universities and top global institutions.",
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
        text: "Total programme fees range from Rs 50,000 at entry-level state universities to Rs 6.5 lakh at IIMs for executive formats. The mainstream band sits between Rs 1.5 lakh and Rs 2.5 lakh for two-year programmes from Symbiosis, Amity, NMIMS, Manipal, ICFAI, and Welingkar.",
      },
    },
    {
      "@type": "Question",
      name: "Does CollegeNCourses help with Study Abroad options?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CollegeNCourses covers both Study in India and Study Abroad. The AI Counsellor has two tracks: India (Online, Distance, Executive MBA) and Abroad (MBA, MS, MIM, Bachelors at global universities). The Profile Evaluator assesses your academics and budget to suggest Ambitious, Target, and Safe universities across 7 or more countries.",
      },
    },
    {
      "@type": "Question",
      name: "How does guidance work at CollegeNCourses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the AI Counsellor - answer 6 short questions about your goals, budget, and timeline and get a personalised programme shortlist instantly. For Study Abroad, the Profile Evaluator assesses your academics, test scores, and target country to suggest Ambitious, Target, and Safe universities.",
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

export default function HomePage() {
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
      <HomePageClient />
    </>
  );
}
