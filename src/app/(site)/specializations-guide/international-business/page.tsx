import type { Metadata } from "next";
import InternationalBusinessGuideClient from "./InternationalBusinessGuideClient";

export const metadata: Metadata = {
  title: "MBA in International Business 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.2 L to ₹22 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/international-business/",
  },
  openGraph: {
    type: "article",
    title: "MBA in International Business 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    url: "https://collegencourses.com/specializations-guide/international-business/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-international-business.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in International Business 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-international-business.webp"],
  },
};

export default function InternationalBusinessGuidePage() {
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
              "MBA in International Business Management: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description:
              "Fees Rs 1.2 L to Rs 22 L, salary bands, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
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
              "https://collegencourses.com/specializations-guide/international-business/",
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
              { "@type": "ListItem", position: 3, name: "MBA in International Business", item: "https://collegencourses.com/specializations-guide/international-business/" },
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
              { "@type": "Question", name: "Is an Online MBA in International Business valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA in International Business from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes: government jobs, further education, and private-sector employment." } },
              { "@type": "Question", name: "Is IIFT worth the Rs 18-22 lakh fee?", acceptedAnswer: { "@type": "Answer", text: "For aspirants targeting MNC country management, MEA services, embassy trade roles, or international consulting — yes. IIFT alumni report Tier-1 MNC placement rates of 90-98% and country-manager offers at 2-3x base salary. For aspirants staying in domestic export-import at Indian MSMEs, IIFT is not worth the premium — an Online MBA delivers the same career at a fraction of the cost." } },
              { "@type": "Question", name: "How much does an International Business MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.2 lakh (ICFAI Distance) to Rs 22 lakh (IIFT full-time residential). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between Rs 1.5 lakh and Rs 2.55 lakh. OP Jindal Global is higher at Rs 3.75 lakh for AACSB accreditation." } },
              { "@type": "Question", name: "What is the salary after an Online MBA in International Business?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary is Rs 6 LPA for freshers, Rs 13 LPA at 3-7 years, Rs 28 LPA at 8-15 years. MNC country management and global product roles can push Rs 40-80 LPA. Overseas postings often add 30-100% expatriate allowances." } },
              { "@type": "Question", name: "Can I work abroad after an International Business MBA from India?", acceptedAnswer: { "@type": "Answer", text: "An Indian MBA opens international-role doors but does not guarantee overseas placement. Work-visa requirements are governed by employer sponsorship and country-specific rules. AACSB-accredited programmes (OP Jindal JGBS) carry moderately better international recognition." } },
              { "@type": "Question", name: "What is the difference between an International Business MBA and a Foreign Trade MBA?", acceptedAnswer: { "@type": "Answer", text: "At IIFT, the two are used interchangeably. At other universities, International Business tends to be broader (marketing + finance + strategy across borders) while Foreign Trade tends to be trade-flow-specific (imports, exports, documentation, logistics)." } },
              { "@type": "Question", name: "Can I do an International Business MBA without any prior international experience?", acceptedAnswer: { "@type": "Answer", text: "Yes. Roughly 45% of Symbiosis and NMIMS International Business enrolments in 2024-25 came from purely domestic backgrounds. The MBA is designed to teach international business from first principles." } },
              { "@type": "Question", name: "Which universities have the best placement records for International Business MBAs?", acceptedAnswer: { "@type": "Answer", text: "Based on internal alumni tracking (2024-25), the highest placement conversion rates were at IIFT (~95-98% at Executive and residential), OP Jindal Global (~76%), and Symbiosis Online (~72%)." } },
              { "@type": "Question", name: "How is the geopolitical environment affecting International Business careers in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "India's push to $2 trillion in exports by 2030, EU CBAM (in force 2026), US supply-chain compliance requirements, and India's participation in trade agreements are all creating structural demand for International Business talent." } },
              { "@type": "Question", name: "Can I switch industries after an International Business MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes. International Business is industry-agnostic. Aspirants regularly move between FMCG, technology, pharmaceuticals, automotive, engineering goods, and services. Our alumni tracking shows 47% switch industries within 4 years of graduation." } },
              { "@type": "Question", name: "What are education loan options for IIFT and Executive International Business programmes?", acceptedAnswer: { "@type": "Answer", text: "For Online MBAs at Rs 1.5-3.75 lakh, most working professionals pay from monthly salary. For IIFT Executive at Rs 18-22 lakh, education loans are available from SBI, HDFC Credila, ICICI, Avanse, and Auxilo at interest rates of 9.5-12.5% in 2025-26." } },
              { "@type": "Question", name: "How does CollegeNCourses help me choose an International Business MBA?", acceptedAnswer: { "@type": "Answer", text: "Our counsellors match you to programmes based on your target role type (MNC, export-import, family business), current experience, comfort with international travel, budget, and timeline. Free 30-minute call. No paid referral affects our recommendation." } },
              { "@type": "Question", name: "Is International Business MBA good career in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, especially in 2025-26. India's export push, GCC growth, and MNC expansion into Tier-2 Indian markets are creating structural demand. Country Manager and VP International roles offer some of the highest MBA-track compensation in India." } },
              { "@type": "Question", name: "How much salary after international business MBA?", acceptedAnswer: { "@type": "Answer", text: "Median starting salary after an Online MBA in International Business is Rs 6 LPA in India in 2025-26, scaling to Rs 13 LPA at 3-7 years and Rs 28 LPA at 8-15 years. IIFT Executive graduates command 2-3x these bands." } },
              { "@type": "Question", name: "Which is the best MBA for international business in India?", acceptedAnswer: { "@type": "Answer", text: "The most-recommended MBAs for International Business in 2025-26 are IIFT Executive/Residential (highest brand and placement), OP Jindal Global Online (AACSB accredited, best for international mobility), and Symbiosis SCOL Online (strong MNC placements)." } },
              { "@type": "Question", name: "Do employers actually value Distance and Online International Business MBAs in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Yes, particularly in domestic export-import, family businesses, MSMEs going global, and Indian MNC subsidiary roles. For top-tier MNC country management or MEA-track roles, IIFT retains a strong preference." } },
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
            name: "How to decide if an International Business MBA is right for you",
            description:
              "A 5-question framework used by CollegeNCourses counsellors to help aspirants choose an International Business MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Name your target role type — MNC, export-import, or family business", text: "The three career paths have very different economics. MNC country management pays highest. Export-import at Indian MSMEs pays moderately. Family business scales with the business." },
              { "@type": "HowToStep", position: 2, name: "Confirm your comfort with travel and overseas relocation", text: "Roughly 60% of high-paying International Business roles involve significant travel or overseas postings. If family situation makes this hard, some role families work but others will be limiting." },
              { "@type": "HowToStep", position: 3, name: "Check whether IIFT is genuinely in play for your budget and timeline", text: "IIFT is the specialization leader at Rs 18-22 lakh. If your target is MNC country management or MEA-track, it is worth it. If domestic export-import at an Indian firm, an Online MBA is far better ROI." },
              { "@type": "HowToStep", position: 4, name: "Audit whether you enjoy cross-cultural work and macro-economics", text: "International Business demands active interest in geopolitics, currency movements, trade policy, and cultural nuance. Aspirants who love these topics thrive." },
              { "@type": "HowToStep", position: 5, name: "Set your hard financial ceiling", text: "Rs 1.2 L to Rs 22 L is the range. Most working professionals fit Rs 1.85 L to Rs 3.75 L Online. Stretching to IIFT Executive without an MNC-track reset in view is a common regret pattern." },
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
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Executive MBA International Business — IIFT", description: "24-month Executive MBA at India's top International Business institute with very strong placement support (~95%).", courseMode: "Blended", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Online MBA International Business (Global) — OP Jindal Global (JGBS)", description: "24-month AACSB-accredited Online MBA in International Business with strong placement support (~76%).", courseMode: "Online", timeRequired: "P24M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Online MBA International Business — Symbiosis SCOL", description: "24-month Online MBA in International Business with live faculty and strong MNC placements (~72%).", courseMode: "Online", timeRequired: "P24M" } },
            ],
          }),
        }}
      />
      <InternationalBusinessGuideClient />
    </>
  );
}
