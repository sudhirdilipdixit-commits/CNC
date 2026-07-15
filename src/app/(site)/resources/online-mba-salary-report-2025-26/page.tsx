import type { Metadata } from "next";
import SalaryReportClient from "./SalaryReportClient";

export const metadata: Metadata = {
  title: "2025-26 Online MBA Salary Report by Specialization | CollegeNCourses",
  description:
    "All 12 MBA specializations compared: entry to leadership salary, Executive premium, employer type impact. The definitive 2025-26 salary benchmark.",
  alternates: {
    canonical: "https://collegencourses.com/resources/online-mba-salary-report-2025-26/",
  },
  openGraph: {
    type: "article",
    title: "2025-26 Online MBA Salary Report: All 12 Specializations Compared",
    description:
      "Entry to leadership salary, Executive premium, and what actually moves your offer. Built from 3,842 alumni salary outcomes tracked across all 12 specializations.",
    url: "https://collegencourses.com/resources/online-mba-salary-report-2025-26/",
    images: [
      {
        url: "https://collegencourses.com/og/resources-online-mba-salary-report.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2025-26 Online MBA Salary Report: All 12 Specializations Compared",
    description: "Which specialization pays most, at which career stage? The full 2025-26 data.",
    images: ["https://collegencourses.com/og/resources-online-mba-salary-report.webp"],
  },
};

export default function SalaryReportPage() {
  return (
    <>
      {/* Schema 1: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "2025-26 Online MBA Salary Report by Specialization",
            description:
              "All 12 MBA specializations compared: entry to leadership salary, Executive premium, employer type impact. The definitive 2025-26 salary benchmark.",
            datePublished: "2025-12-15T09:00:00+05:30",
            dateModified: "2025-12-15T09:00:00+05:30",
            author: {
              "@type": "Person",
              name: "CollegeNCourses Editorial Team",
              jobTitle: "Content Lead",
              worksFor: { "@type": "Organization", name: "CollegeNCourses" },
            },
            reviewedBy: {
              "@type": "Person",
              name: "CollegeNCourses Senior Counsellor",
              jobTitle: "Senior Counsellor",
              worksFor: { "@type": "Organization", name: "CollegeNCourses" },
            },
            publisher: {
              "@type": "EducationalOrganization",
              name: "CollegeNCourses",
              logo: { "@type": "ImageObject", url: "https://collegencourses.com/logo.png" },
            },
            image: "https://collegencourses.com/og/resources-online-mba-salary-report.webp",
            mainEntityOfPage:
              "https://collegencourses.com/resources/online-mba-salary-report-2025-26/",
          }),
        }}
      />
      {/* Schema 2: BreadcrumbList */}
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
                name: "Resources",
                item: "https://collegencourses.com/resources/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "2025-26 Online MBA Salary Report by Specialization",
                item: "https://collegencourses.com/resources/online-mba-salary-report-2025-26/",
              },
            ],
          }),
        }}
      />
      {/* Schema 3: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which MBA specialization pays the highest salary in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on career stage. Business Analytics and IT & Systems Management pay highest at entry level (₹6–10 lakh). Finance Management and IT & Systems Management pay highest at leadership level (₹42–75 lakh), reflecting CFO and CIO/CTO track ceilings. See the full ranking in the career-stage section of this guide.",
                },
              },
              {
                "@type": "Question",
                name: "What is the salary difference between Online MBA and Executive MBA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Executive MBA delivers roughly 1.8–2x the leadership-level salary of an Online MBA in the same specialization, but costs 8–15 times more upfront. Finance Management and IT & Systems Management show the widest Executive premiums.",
                },
              },
              {
                "@type": "Question",
                name: "Does employer type matter more than specialization for MBA salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Often, yes. D2C brands, quick commerce, and product-tech companies pay 25–45% above traditional employers for comparable roles regardless of specialization, while IT services and legacy manufacturing pay conservatively.",
                },
              },
              {
                "@type": "Question",
                name: "What is the lowest-paying MBA specialization?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "HR Management, International Business Management, and Retail Management post the lowest entry-level salaries among the 12 specializations we track, at ₹4–7 lakh. HR and International Business have strong leadership-level ceilings (₹32–55 lakh) that partially close the gap by mid-to-senior career.",
                },
              },
              {
                "@type": "Question",
                name: "Which specialization has the fastest salary growth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Operations Management shows the single sharpest documented transition, with manufacturing engineers moving into management reporting median progression from ₹6 lakh to ₹18 lakh over 4 years. IT & Systems Management and Digital Marketing show comparably steep documented transitions.",
                },
              },
              {
                "@type": "Question",
                name: "How much does salary vary by city for MBA graduates?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bangalore, Mumbai, and Delhi-NCR post the highest absolute salaries. Pune, Hyderabad, and Chennai typically run 10–20% below those three metros. Tier-2 cities typically run 25–40% below metro figures, though cost-of-living-adjusted purchasing power can be comparable.",
                },
              },
              {
                "@type": "Question",
                name: "Is CTC the same as take-home salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. CTC (Cost to Company) includes employer PF contributions, insurance, and other non-cash components. Take-home pay is meaningfully lower than the headline CTC figure. Always ask for a clear breakdown when comparing offers or reported salary figures.",
                },
              },
              {
                "@type": "Question",
                name: "How was this salary data collected?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Every figure is sourced from CollegeNCourses internal alumni tracking (3,842 salary outcomes analysed across all 12 specializations, 2023–25), cross-referenced with AmbitionBox, Naukri JobSpeak, and LinkedIn Salary India data.",
                },
              },
              {
                "@type": "Question",
                name: "Should I choose my MBA specialization based purely on salary data?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Salary data should inform your decision, not be the sole basis for it. A strong-fit aspirant in a lower-paying specialization typically compounds better over a career than a mismatched aspirant chasing the highest number.",
                },
              },
              {
                "@type": "Question",
                name: "How can I use this data to negotiate my job offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Identify your specialization's experience-band salary in the complete table, adjust for your specific employer type, adjust for your city, then compare your actual offer against that specific combination, not the specialization's overall range. Full 6-step framework in the negotiation section.",
                },
              },
              {
                "@type": "Question",
                name: "Do Business Analytics and IT & Systems Management really pay the same at entry level?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both post directionally similar entry-level bands (₹6–10 lakh), reflecting comparable demand for quantitative and technical-management skills. Their trajectories diverge more at senior and leadership levels.",
                },
              },
              {
                "@type": "Question",
                name: "What is the highest MBA salary achievable in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "At the very top (CFO, CIO/CTO, or Chief Supply Chain Officer roles at large conglomerates or MNCs), total compensation including RSUs and bonuses can exceed ₹1.5 crore. These are top-5% outcomes at 15+ years' experience.",
                },
              },
              {
                "@type": "Question",
                name: "Which MBA specialization has the highest salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Business Analytics and IT & Systems Management have the highest entry-level salaries in India in 2025–26, at ₹6–10 lakh. Finance Management and IT & Systems Management have the highest leadership-level ceilings, reaching ₹42–75 lakh.",
                },
              },
              {
                "@type": "Question",
                name: "How much salary increase after online MBA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Median salary increase after an Online MBA varies by specialization and prior experience, typically ranging from a 30% jump for working professionals seeking promotion to over 80% for career-switchers moving into a new function.",
                },
              },
              {
                "@type": "Question",
                name: "What is the average salary after MBA in India 2025?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Average post-MBA salary in India in 2025–26 ranges from roughly ₹4–10 lakh at entry level to ₹32–75 lakh at leadership level across the 12 specializations CollegeNCourses tracks.",
                },
              },
              {
                "@type": "Question",
                name: "How does CollegeNCourses help me understand my specific salary potential?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our counsellors walk through your specific specialization, target employer type, and city to give you a realistic benchmark, and help you use that benchmark in an actual offer negotiation if you already have one. Free 30-minute call. No paid referral affects our recommendation.",
                },
              },
            ],
          }),
        }}
      />
      {/* Schema 4: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to use MBA salary data to negotiate a job offer",
            description:
              "A 6-step framework used by CollegeNCourses counsellors to help aspirants benchmark and negotiate a job offer using specialization, employer-type, and city salary data.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Find your specialization's band",
                text: "Identify your specific experience band (entry, mid, senior, or leadership), not the specialization's full career-long range.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Identify your employer's type",
                text: "D2C, product-tech, consulting, BFSI, IT services, or manufacturing: this typically moves expected salary more than specialization alone.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Adjust for your city",
                text: "Benchmark a metro offer against metro data and a Tier-2 offer against Tier-2 expectations; comparing across tiers without adjustment produces a misleading read.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Check where your offer sits in the resulting band",
                text: "An offer below the 25th percentile for your specific experience band, employer type, and city combination gives a data-backed basis for a counter-offer.",
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Ask for the full compensation breakdown, not just base",
                text: "RSUs or ESOPs can materially change total compensation at product companies and D2C brands.",
              },
              {
                "@type": "HowToStep",
                position: 6,
                name: "Bring the specific comparison to the negotiation",
                text: "A concrete, sourced comparison is more defensible in a negotiation than a general request for more money.",
              },
            ],
          }),
        }}
      />
      {/* Schema 5: ItemList (Occupation/estimatedSalary, all 12 specializations) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MBA Specialization Salary Comparison 2025-26",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Business Analytics graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 600000,
                    median: 800000,
                    percentile90: 7000000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Occupation",
                  name: "MBA in IT & Systems Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 600000,
                    median: 800000,
                    percentile90: 7500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Digital Marketing graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 700000,
                    percentile90: 6500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Finance Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 700000,
                    percentile90: 7500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Supply Chain Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 700000,
                    percentile90: 6800000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Marketing Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 650000,
                    percentile90: 5800000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 7,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Operations Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 650000,
                    percentile90: 6500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 8,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Project Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 500000,
                    median: 650000,
                    percentile90: 6200000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 9,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Banking & Finance Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 450000,
                    median: 600000,
                    percentile90: 5500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 10,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Human Resource Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 400000,
                    median: 550000,
                    percentile90: 5500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 11,
                item: {
                  "@type": "Occupation",
                  name: "MBA in International Business Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 400000,
                    median: 550000,
                    percentile90: 5500000,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 12,
                item: {
                  "@type": "Occupation",
                  name: "MBA in Retail Management graduate",
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "base",
                    currency: "INR",
                    duration: "P1Y",
                    percentile10: 400000,
                    median: 550000,
                    percentile90: 5800000,
                  },
                },
              },
            ],
          }),
        }}
      />
      <SalaryReportClient />
    </>
  );
}
