import type { Metadata } from "next";
import BusinessAnalyticsGuideClient from "./BusinessAnalyticsGuideClient";

export const metadata: Metadata = {
  title: "MBA in Business Analytics 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.3 L to ₹28 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/business-analytics/",
  },
  openGraph: {
    type: "article",
    title: "MBA in Business Analytics 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/business-analytics/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-business-analytics.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in Business Analytics 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-business-analytics.webp"],
  },
};

export default function BusinessAnalyticsGuidePage() {
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
              "MBA in Business Analytics: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description:
              "Fees Rs 1.3 L to Rs 28 L, salary bands, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
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
              "https://collegencourses.com/specializations-guide/business-analytics/",
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
              { "@type": "ListItem", position: 3, name: "MBA in Business Analytics", item: "https://collegencourses.com/specializations-guide/business-analytics/" },
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
              { "@type": "Question", name: "Is an Online MBA in Business Analytics valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA in Business Analytics from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes." } },
              { "@type": "Question", name: "Which is better — Business Analytics MBA or a Data Science course?", acceptedAnswer: { "@type": "Answer", text: "A Business Analytics MBA is better if you want to move into management, business decision-making, or analytics consulting. A Data Science course is better if you want deep model-building or algorithm work. Business Analytics is broader; Data Science is deeper on technical specifics." } },
              { "@type": "Question", name: "How much does a Business Analytics MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.3 lakh (ICFAI Distance) to Rs 28 lakh (IIM Bangalore BAI Executive). Mainstream Online programmes at Symbiosis, NMIMS, Amity, Manipal, Jain, and OP Jindal sit between Rs 1.55 lakh and Rs 3.75 lakh." } },
              { "@type": "Question", name: "What is the salary after an Online MBA in Business Analytics?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary is Rs 8.5 LPA for freshers, Rs 17 LPA at 3-7 years, Rs 34 LPA at 8-15 years. Analytics consulting at Deloitte, EY, Fractal, or Tiger Analytics carries a 20-35% premium above these numbers." } },
              { "@type": "Question", name: "Do I need to know Python or R before starting the MBA?", acceptedAnswer: { "@type": "Answer", text: "Not required, but strongly helpful. Aspirants with basic Python or R exposure enter the programme roughly 6-8 weeks ahead of peers. Programmes at Symbiosis, NMIMS, and Great Lakes include Python foundations in Semester 2." } },
              { "@type": "Question", name: "What is the difference between a Business Analytics MBA and a Business Analytics diploma?", acceptedAnswer: { "@type": "Answer", text: "An MBA is a full 24-month postgraduate degree with management foundation plus specialization. A diploma is a shorter (typically 6-12 months) technical certification focused on execution. MBAs open Analytics Manager and consulting career paths." } },
              { "@type": "Question", name: "Can I do a Business Analytics MBA without a technical background?", acceptedAnswer: { "@type": "Answer", text: "Yes. Roughly 30% of 2024-25 enrolments at Symbiosis SCOL and NMIMS Business Analytics came from non-technical backgrounds. Expect the first 4 months to feel steep if statistics are unfamiliar." } },
              { "@type": "Question", name: "Which universities have the best placement records for Business Analytics MBAs?", acceptedAnswer: { "@type": "Answer", text: "Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIM Bangalore BAI Executive (~98%), ISB CBA (~95%), Great Lakes PGP-BABI (~92%), and Symbiosis Online (~74%)." } },
              { "@type": "Question", name: "How is AI affecting Business Analytics careers in India?", acceptedAnswer: { "@type": "Answer", text: "AI is expanding the field rather than contracting it. Generative AI is augmenting analytics workflows, but analytical judgment, business problem-framing, and stakeholder communication remain human. Analytics job postings in India grew 34% in 2024-25 per Naukri JobSpeak data." } },
              { "@type": "Question", name: "Can I switch industries after a Business Analytics MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes — one of the specialization's strongest features. Business Analytics is industry-agnostic. Our alumni tracking shows 41% switch industries within 3 years of graduation." } },
              { "@type": "Question", name: "What are education loan and EMI options for a Business Analytics MBA?", acceptedAnswer: { "@type": "Answer", text: "For Online MBAs at Rs 2-3 lakh, most working professionals pay from monthly salary. For Executive MBAs at Rs 15-28 lakh, education loans are widely available from SBI, HDFC Credila, ICICI, Avanse, and Auxilo at 9.5-12.5% interest." } },
              { "@type": "Question", name: "How does CollegeNCourses help me choose?", acceptedAnswer: { "@type": "Answer", text: "Our counsellors match you to programmes based on your target industry, tool comfort, career goal, budget, and Tier-1 consulting aspiration. Free 30-minute call. Shortlist three programmes from UGC-DEB approved options only." } },
              { "@type": "Question", name: "Is Business Analytics MBA in demand in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, very much. Business Analytics is the second-fastest-growing MBA specialization in India by search volume in 2025-26. Analytics job postings grew 34% year-on-year in 2024-25. Demand is broad-based across BFSI, IT services, consulting, e-commerce, and product-tech." } },
              { "@type": "Question", name: "How much does a Business Analytics MBA pay?", acceptedAnswer: { "@type": "Answer", text: "The median starting salary after an Online MBA in Business Analytics is Rs 8.5 LPA in India in 2025-26 — the highest of any MBA specialization at entry-level. It scales to Rs 17 LPA at 3-7 years and Rs 34 LPA at 8-15 years." } },
              { "@type": "Question", name: "Which is the best MBA in Business Analytics in India?", acceptedAnswer: { "@type": "Answer", text: "The three most-recommended MBAs for Business Analytics in 2025-26 are IIM Bangalore BAI (Executive, best for Tier-1 consulting reset), Great Lakes PGP-BABI (Executive, purely analytics-focused Tier-1 brand), and Symbiosis SCOL (Online, best value at Tier-1 university)." } },
              { "@type": "Question", name: "Do employers actually value Distance and Online Business Analytics MBAs in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Yes, especially in IT services, BFSI, e-commerce, product-tech, and mid-size consulting firms. What matters more than mode is portfolio: capstone projects, Kaggle competitions, or live BI dashboards on GitHub materially strengthen candidacy." } },
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
            name: "How to decide if a Business Analytics MBA is right for you",
            description:
              "A 5-question framework used by CollegeNCourses counsellors to help aspirants choose a Business Analytics MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Name your target role and industry", text: "Business Analyst at a SaaS firm? Risk Analytics at a bank? Product Analytics at an e-commerce firm? Analytics Consultant at Deloitte? The programme choice and elective mix changes based on the answer." },
              { "@type": "HowToStep", position: 2, name: "Confirm your existing tool comfort level", text: "SQL, Excel, and Tableau are the minimum for Business Analytics. If you have zero exposure, plan for 2-3 months of parallel self-learning before the MBA starts." },
              { "@type": "HowToStep", position: 3, name: "Check whether Tier-1 analytics consulting is a realistic goal", text: "If yes, Executive MBA at IIM Bangalore, ISB, or Great Lakes justifies the Rs 15-28 lakh investment. If not, Online MBA is far better ROI." },
              { "@type": "HowToStep", position: 4, name: "Audit whether you enjoy problem-framing and structured thinking", text: "Business Analytics is not about running scripts. It is about deciding what to measure. Aspirants who love ambiguous business problems do exceptionally well." },
              { "@type": "HowToStep", position: 5, name: "Set your hard financial ceiling", text: "Rs 1.3 L to Rs 28 L is the full range. Most working professionals fit Rs 1.9 L to Rs 3 L Online. Stretching to Executive without a clear Tier-1 reset in view is the common financial regret we track." },
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
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Executive Analytics (BAI) — IIM Bangalore", description: "12-month Executive MBA in Business Analytics at India's top business school with very strong placement support (~98%).", courseMode: "Blended", timeRequired: "P12M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "PGP-BABI — Great Lakes Institute of Management", description: "12-month Executive programme in Business Analytics and Business Intelligence with strong placement (~92%).", courseMode: "Blended", timeRequired: "P12M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Online MBA Business Analytics — Symbiosis SCOL", description: "24-month Online MBA in Business Analytics with live faculty and strong placement support (~74%).", courseMode: "Online", timeRequired: "P24M" } },
            ],
          }),
        }}
      />
      <BusinessAnalyticsGuideClient />
    </>
  );
}
