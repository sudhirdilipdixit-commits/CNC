import type { Metadata } from "next";
import MBAModeComparisonClient from "./MBAModeComparisonClient";

export const metadata: Metadata = {
  title: "Distance vs Online vs Executive MBA 2025-26: Full Guide | CollegeNCourses",
  description:
    "Fees, duration, salary, placement, recognition compared. Which MBA fits working professionals? Honest 2025-26 guide by CollegeNCourses counsellors.",
  alternates: {
    canonical: "https://collegencourses.com/resources/distance-vs-online-vs-executive-mba-guide/",
  },
  openGraph: {
    type: "article",
    title: "Distance vs Online vs Executive MBA 2025-26 — The Honest Comparison",
    description:
      "Fees, duration, salary, placement, and employer acceptance compared side by side across three MBA modes.",
    url: "https://collegencourses.com/resources/distance-vs-online-vs-executive-mba-guide/",
    images: [
      {
        url: "https://collegencourses.com/og/resources-distance-vs-online-vs-executive-mba.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distance vs Online vs Executive MBA 2025-26 — The Honest Comparison",
    description:
      "Fees, duration, salary, placement, and employer acceptance compared side by side.",
    images: ["https://collegencourses.com/og/resources-distance-vs-online-vs-executive-mba.webp"],
  },
};

export default function MBAModeComparisonPage() {
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
              "Distance MBA vs Online MBA vs Executive MBA: The Complete Comparison Guide 2025-26",
            description:
              "Fees, duration, salary, placement, and employer acceptance compared side by side across three MBA modes.",
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
            image: "https://collegencourses.com/og/resources-distance-vs-online-vs-executive-mba.webp",
            mainEntityOfPage:
              "https://collegencourses.com/resources/distance-vs-online-vs-executive-mba-guide/",
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
              { "@type": "ListItem", position: 2, name: "Resources", item: "https://collegencourses.com/resources/" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Distance vs Online vs Executive MBA Guide",
                item: "https://collegencourses.com/resources/distance-vs-online-vs-executive-mba-guide/",
              },
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
              { "@type": "Question", name: "What is the main difference between Distance, Online, and Executive MBA?", acceptedAnswer: { "@type": "Answer", text: "Distance MBA is self-paced with minimal live interaction, lowest cost. Online MBA offers scheduled live faculty sessions plus recorded playback, mid-tier cost, and structured placement support. Executive MBA is a full postgraduate degree designed for working professionals with 3+ years' experience, delivered in-person or intensive online, highest cost, strongest brand and placement outcomes." } },
              { "@type": "Question", name: "Which MBA mode is best for working professionals in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "For most working professionals with 2-10 years' experience wanting a promotion in their current field, Online MBA is the best balance of cost, time commitment, credential, and live faculty interaction. Distance suits budget-constrained self-learners; Executive suits Tier-1 industry-reset moments." } },
              { "@type": "Question", name: "Is Online MBA better than Distance MBA in India?", acceptedAnswer: { "@type": "Answer", text: "Online MBA is better than Distance MBA for most working professionals because of three factors: live faculty interaction, structured cohort learning, and stronger placement support. Distance MBA remains a better fit only for self-disciplined budget-tight aspirants. Both are UGC-DEB approved and legally equivalent." } },
              { "@type": "Question", name: "Is an Executive MBA worth it?", acceptedAnswer: { "@type": "Answer", text: "Executive MBA is worth Rs 15-25 lakh only when three conditions hold: you have 3+ years' experience, you're targeting a Tier-1 industry reset, and you have either employer sponsorship or clear financial capacity. Without a clear reset opportunity in view, Distance or Online delivers better ROI." } },
              { "@type": "Question", name: "How much does each MBA mode cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Distance MBA: Rs 1.2-2 lakh. Online MBA: Rs 1.5-3.5 lakh. Executive MBA: Rs 8 lakh (Tier-2) to Rs 25 lakh (IIM Indore residential). ISB PGPMAX and international programmes can go up to Rs 40 lakh." } },
              { "@type": "Question", name: "What is the salary difference between Distance, Online, and Executive MBA graduates?", acceptedAnswer: { "@type": "Answer", text: "In 2025-26, median entry-level salary bumps are: Distance MBA graduates Rs 2-4 lakh, Online MBA graduates Rs 3-5 lakh, Executive MBA graduates from Tier-1 institutes Rs 6-14 lakh. Executive delivers the biggest absolute jump but requires 5-15x the investment." } },
              { "@type": "Question", name: "Are Distance and Online MBA valid for government jobs?", acceptedAnswer: { "@type": "Answer", text: "Yes. UGC-DEB approved Distance and Online MBAs are legally equivalent to regular MBAs for all government job eligibility, per current UGC notifications (2020-2025). Confirm the specific university is on the UGC-DEB current approved-institutions list before enrolling." } },
              { "@type": "Question", name: "Do employers actually accept Distance and Online MBAs in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Most Indian employers — especially IT, SaaS, D2C, fintech, services, and mid-to-large private companies — accept Distance and Online MBAs from UGC-DEB approved universities at parity with regular MBAs. Tier-1 consulting, PE, and investment banking still prefer residential Tier-1 MBAs." } },
              { "@type": "Question", name: "What is the dropout rate for each mode?", acceptedAnswer: { "@type": "Answer", text: "As of 2025-26, Distance MBAs see 40%+ non-completion, Online MBAs 25-35%, and Executive MBAs under 10%. The completion gap is driven primarily by cohort presence and live faculty interaction, not by ability." } },
              { "@type": "Question", name: "Can I get education loans for all three modes?", acceptedAnswer: { "@type": "Answer", text: "Yes. Standard education-loan providers (SBI, HDFC Credila, ICICI Bank, Avanse) cover all UGC-DEB and AICTE approved programmes. Distance and Online MBAs typically use short-tenure personal loans or salary EMIs; Executive MBAs use full education loans. Interest rates in 2025-26 range 9.5-12.5%." } },
              { "@type": "Question", name: "Can I convert from Distance to Online MBA mid-programme?", acceptedAnswer: { "@type": "Answer", text: "Formally, no. Once enrolled, mode is fixed at the same university. However, you can enrol in a new Online MBA at a different university if career priorities change, though you lose progress. The better strategy is to choose the right mode at enrolment." } },
              { "@type": "Question", name: "What is the difference between AICTE and UGC-DEB approval?", acceptedAnswer: { "@type": "Answer", text: "UGC-DEB approves Distance and Online MBAs under UGC's remit. AICTE approves technical management education. Some Online MBAs carry both. Executive MBAs typically operate under AICTE, or for IIMs, under the IIM Act 2017. All three approval bodies confer legally equivalent degrees." } },
              { "@type": "Question", name: "Which mode is best for working professionals?", acceptedAnswer: { "@type": "Answer", text: "For most working professionals in India in 2025-26, Online MBA is the best mode. It balances cost, time commitment, live faculty interaction, and placement support. Distance suits only budget-tight self-directed learners. Executive suits only Tier-1 industry-reset moments." } },
              { "@type": "Question", name: "Is online MBA equal to regular MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes. As of 2025-26, an Online MBA from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes — government jobs, further education, and private-sector employment. Employer acceptance is high in most sectors." } },
              { "@type": "Question", name: "How to choose the right MBA in India?", acceptedAnswer: { "@type": "Answer", text: "Choose based on six factors: budget ceiling, weekly time availability, target role two years post-MBA, current employer's stated position on Online and Distance MBAs, your dropout risk profile, and whether you need international recognition." } },
              { "@type": "Question", name: "How does CollegeNCourses help me choose the right mode?", acceptedAnswer: { "@type": "Answer", text: "Our counsellors run a structured 30-minute free call in which we walk you through the six-question decision framework, understand your role, income, career goal, budget, and timeline, and shortlist three specific programmes across the right mode. We have no referral deal that affects our recommendation." } },
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
            name: "How to decide which MBA mode is right for you",
            description:
              "A 6-question framework used by CollegeNCourses counsellors to help aspirants choose between Distance, Online, and Executive MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "How much can you actually spend?", text: "Set a walk-away number before you research programmes. If under 2 lakh, Distance or lower-end Online. If 1.5-3.5 lakh, Online. If 8 lakh or more without employer sponsorship, do a hard-nosed ROI calculation." },
              { "@type": "HowToStep", position: 2, name: "How many hours per week can you realistically commit?", text: "Block your actual calendar for two typical weeks. If 8-10 hours max, Distance. If 12-15 hours, Online. If 20 or more hours or full-time, Executive." },
              { "@type": "HowToStep", position: 3, name: "What is your target role two years post-MBA?", text: "Name it specifically. If a promotion in your current company, Distance or Online. If an industry switch, Online or Executive. If Tier-1 consulting, Executive at IIM or ISB." },
              { "@type": "HowToStep", position: 4, name: "What does your employer actually think about Distance and Online MBAs?", text: "Not what LinkedIn says. What your reporting manager and HR say. Have the conversation before you enrol." },
              { "@type": "HowToStep", position: 5, name: "What is your dropout risk profile?", text: "Distance MBA has 40 percent plus dropout in India. If you have struggled with self-paced learning, choose Online or Executive despite the higher fee." },
              { "@type": "HowToStep", position: 6, name: "Do you need international recognition?", text: "If you are planning to work or study abroad post-MBA within 5 years, prioritise AACSB or EQUIS-accredited programmes." },
            ],
          }),
        }}
      />
      {/* Schema 5 — ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Distance MBA", description: "24-month self-paced MBA delivered largely through recorded content and printed material.", courseMode: "OnDemand", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Online MBA", description: "24-month scheduled live-class MBA with faculty interaction, recorded playback, and structured cohorts.", courseMode: "Online", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Executive MBA", description: "12-24 month postgraduate MBA for working professionals with 3+ years' experience, delivered in-person or intensive interactive online.", courseMode: "Blended", timeRequired: "P12M" } },
            ],
          }),
        }}
      />
      <MBAModeComparisonClient />
    </>
  );
}
