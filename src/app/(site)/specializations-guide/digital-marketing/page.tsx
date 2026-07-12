import type { Metadata } from "next";
import DigitalMarketingGuideClient from "./DigitalMarketingGuideClient";

export const metadata: Metadata = {
  title: "MBA in Digital Marketing 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.2 L to ₹18 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/digital-marketing/",
  },
  openGraph: {
    type: "article",
    title: "MBA in Digital Marketing 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/digital-marketing/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-digital-marketing.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in Digital Marketing 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-digital-marketing.webp"],
  },
};

export default function DigitalMarketingGuidePage() {
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
              "MBA in Digital Marketing: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description:
              "Fees ₹1.2 L to ₹18 L, salary bands, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
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
              "https://collegencourses.com/specializations-guide/digital-marketing/",
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
              { "@type": "ListItem", position: 3, name: "MBA in Digital Marketing", item: "https://collegencourses.com/specializations-guide/digital-marketing/" },
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
              { "@type": "Question", name: "Is an Online MBA in Digital Marketing valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. As of 2025-26, an Online MBA in Digital Marketing from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment." } },
              { "@type": "Question", name: "Which is better for Digital Marketing — this specialization or Marketing Management?", acceptedAnswer: { "@type": "Answer", text: "For growth roles at D2C, fintech, SaaS, or consumer tech companies, Digital Marketing is the better fit. For brand management at FMCG or offline-heavy consumer brands, Marketing Management is the better fit." } },
              { "@type": "Question", name: "How much does a Digital Marketing MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 18 lakh (IIM Executive tracks). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between Rs 1.55 lakh and Rs 2.6 lakh total for a 24-month programme." } },
              { "@type": "Question", name: "What is the salary after an Online MBA in Digital Marketing?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary for Online MBA graduates in Digital Marketing sits at Rs 7 LPA for freshers, Rs 15 LPA for mid-level (3-7 years), and Rs 32 LPA for senior roles (8-15 years). Salaries at D2C, fintech, and SaaS employers run 30-45% above this median." } },
              { "@type": "Question", name: "Do I need to know Google Ads and SEO before starting the MBA?", acceptedAnswer: { "@type": "Answer", text: "Not required, but strongly helpful. Aspirants who enter with basic Google Ads and GA4 familiarity have a 30-40% faster career acceleration in the first 12 months post-MBA." } },
              { "@type": "Question", name: "What is the difference between a Digital Marketing MBA and a diploma in Digital Marketing?", acceptedAnswer: { "@type": "Answer", text: "An MBA is a full postgraduate degree with a management foundation plus the Digital Marketing specialization. A diploma is a short-format certification (3-12 months) focused only on execution skills. For a management role, you need the MBA." } },
              { "@type": "Question", name: "Can I do a Digital Marketing MBA without a marketing background?", acceptedAnswer: { "@type": "Answer", text: "Yes. Roughly 55% of Digital Marketing MBA enrolments at Symbiosis and NMIMS in 2024-25 came from non-marketing backgrounds — typically IT, engineering, and content creation. The MBA teaches Digital Marketing from first principles." } },
              { "@type": "Question", name: "Which universities have the best placement records for Digital Marketing MBAs?", acceptedAnswer: { "@type": "Answer", text: "Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Kozhikode Executive Digital Track (~94%), Symbiosis Online (~76%), and OP Jindal Global (~72%)." } },
              { "@type": "Question", name: "How is AI affecting Digital Marketing careers in India?", acceptedAnswer: { "@type": "Answer", text: "Substantially. Generative AI tools have restructured content, ad copy, and creative production roles. Junior copywriting and static-content roles are contracting; strategic, analytical, and cross-channel roles are growing. Digital Marketing MBAs will be evaluated on AI-tool fluency in interviews." } },
              { "@type": "Question", name: "Can I switch to a growth marketing role at a D2C brand after this MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes — this is one of the most common outcomes. Aspirants with 2-5 years' prior digital or content experience report ~65% transition rate to D2C/fintech growth roles within 18 months of graduation." } },
              { "@type": "Question", name: "What tools and platforms will I learn during the MBA?", acceptedAnswer: { "@type": "Answer", text: "Standard 2025-26 curriculum covers Google Ads, Meta Ads Manager, LinkedIn Ads, GA4, Google Tag Manager, SEMrush or Ahrefs, HubSpot or Salesforce, Mailchimp, and basics of SQL and Excel." } },
              { "@type": "Question", name: "How does CollegeNCourses help me choose a Digital Marketing MBA?", acceptedAnswer: { "@type": "Answer", text: "Our counsellors match you to programmes based on your target growth channel, employer type, budget, and timeline. We shortlist three programmes from UGC-DEB approved options only. Free 30-minute call. No paid rankings." } },
              { "@type": "Question", name: "Is Digital Marketing MBA in demand in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, very. Digital Marketing became the highest-search-volume MBA specialization in India in Q3 2024 and continues to lead. D2C brand growth, fintech expansion, and SaaS scaling are driving demand for growth marketing and performance marketing talent." } },
              { "@type": "Question", name: "How much does a Digital Marketing MBA pay?", acceptedAnswer: { "@type": "Answer", text: "The median starting salary after an Online MBA in Digital Marketing is roughly Rs 7 lakh per annum in India in 2025-26, scaling to Rs 15 LPA at 3-7 years and Rs 32 LPA at 8-15 years. Growth Marketing roles at D2C or fintech companies can push these numbers 30-45% higher." } },
              { "@type": "Question", name: "Which is the best online MBA for Digital Marketing?", acceptedAnswer: { "@type": "Answer", text: "The three most-recommended Online MBAs for Digital Marketing in 2025-26 are Symbiosis Centre for Online Learning (highest placement conversion), NMIMS Global Access (strongest industry-tied projects), and Manipal Academy (best value in Tier-1 category)." } },
              { "@type": "Question", name: "Do employers actually value Digital Marketing MBAs from Distance or Online mode in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Yes, especially in the D2C, fintech, SaaS, ed-tech, and consumer-tech sectors. What matters more than mode is your portfolio of live campaigns and measurable outcomes." } },
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
            name: "How to decide if a Digital Marketing MBA is right for you",
            description:
              "A 5-question framework used by CollegeNCourses counsellors to help aspirants choose a Digital Marketing MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Name your target growth channel or role", text: "Performance marketing? SEO/content? Growth marketing at a startup? Marketing automation? Analytics? The programme choice changes based on the answer." },
              { "@type": "HowToStep", position: 2, name: "Confirm your employer type — brand-side, D2C, agency, or tech", text: "Salary and career progression differ 30-50% across these segments. D2C and tech pay premium; agencies pay steady; traditional brands pay conservative." },
              { "@type": "HowToStep", position: 3, name: "Check whether you have tool-fluency starter skills", text: "Google Ads, Meta Ads Manager, GA4, SEMrush, HubSpot. You'll be evaluated on these in interviews. Plan 3-6 months of parallel self-learning during the MBA if you have zero exposure." },
              { "@type": "HowToStep", position: 4, name: "Audit whether you can commit to continuous experimentation", text: "Distance and Online Digital Marketing MBAs have 32-38% dropout rate. The workload includes running actual campaigns in some programmes, which is time-heavy." },
              { "@type": "HowToStep", position: 5, name: "Set your hard financial ceiling", text: "Digital Marketing MBA fees run Rs 1.2 L to Rs 18 L. Most working professionals fit Rs 1.7 L to Rs 3 L Online. Stretching to Executive without a specific Tier-1 reset in view is a common financial regret pattern." },
            ],
          }),
        }}
      />
      {/* Schema 5 — ItemList (top 10 programmes) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Online MBA Digital Marketing — Symbiosis Centre for Online Learning (SCOL)", description: "24-month Online MBA in Digital Marketing with strong placement support (~76%) and live faculty.", courseMode: "Online", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Distance MBA Digital Marketing — NMIMS Global Access (CDOE)", description: "24-month Distance MBA in Digital Marketing with industry-tied projects.", courseMode: "OnDemand", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Executive MBA Digital Marketing — IIM Kozhikode (EPGP - Digital Track)", description: "24-month Executive MBA in Digital Marketing with IIM tag and very strong placement support (~94%).", courseMode: "Blended", timeRequired: "P24M" } },
            ],
          }),
        }}
      />
      <DigitalMarketingGuideClient />
    </>
  );
}
