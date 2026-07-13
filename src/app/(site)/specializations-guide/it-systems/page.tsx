import type { Metadata } from "next";
import ITSystemsGuideClient from "./ITSystemsGuideClient";

export const metadata: Metadata = {
  title: "MBA in IT & Systems Management 2025-26: The Honest Guide | CollegeNCourses",
  description:
    "Fees ₹1.3 L to ₹28 L, salary bands, top 10 UGC-DEB programmes across Distance, Online & Executive modes. Honest 2025-26 guide for IT professionals by CollegeNCourses.",
  alternates: {
    canonical: "https://collegencourses.com/specializations-guide/it-systems/",
  },
  openGraph: {
    type: "article",
    title: "MBA in IT & Systems Management 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes. Built for software engineers and IT professionals.",
    url: "https://collegencourses.com/specializations-guide/it-systems/",
    images: [
      {
        url: "https://collegencourses.com/og/specializations-guide-it-systems.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA in IT & Systems Management 2025-26 — The Honest Guide",
    description:
      "Fees, salary, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
    images: ["https://collegencourses.com/og/specializations-guide-it-systems.webp"],
  },
};

export default function ITSystemsGuidePage() {
  return (
    <>
      {/* Schema 1 — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "MBA in IT & Systems Management: The Honest 2025-26 Guide to Distance, Online & Executive Modes",
            description: "Fees Rs 1.3 L to Rs 28 L, salary bands, top 10 UGC-DEB approved programmes across Distance, Online & Executive modes.",
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
            mainEntityOfPage: "https://collegencourses.com/specializations-guide/it-systems/",
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
              { "@type": "ListItem", position: 3, name: "MBA in IT & Systems Management", item: "https://collegencourses.com/specializations-guide/it-systems/" },
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
              { "@type": "Question", name: "Is an Online MBA in IT & Systems Management valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA in IT & Systems Management from a UGC-DEB approved university is legally equivalent to a regular MBA for all purposes including government jobs, further education, and private-sector employment." } },
              { "@type": "Question", name: "Can a software engineer do an MBA in IT & Systems Management?", acceptedAnswer: { "@type": "Answer", text: "Yes — it is the most natural transition. Software engineers who add an IT & Systems MBA typically move into Product Management, IT Consulting, Enterprise Architecture, or IT Management roles. 65% of our IT MBA alumni report moving out of purely coding roles within 24 months of graduation." } },
              { "@type": "Question", name: "What is the salary after an MBA in IT & Systems Management?", acceptedAnswer: { "@type": "Answer", text: "Median 2025-26 salary is Rs 8 LPA for freshers, Rs 16 LPA at 3-7 years, Rs 34 LPA at 8-15 years. CIO/CTO-track roles at 15+ years reach Rs 65 LPA to Rs 1.5 Cr+. Executive MBA from IIM Ahmedabad or IIM Bangalore pushes these numbers significantly higher." } },
              { "@type": "Question", name: "How much does an IT & Systems MBA cost in India in 2025-26?", acceptedAnswer: { "@type": "Answer", text: "Fees range from Rs 1.3 lakh (ICFAI Distance) to Rs 28 lakh (IIM Bangalore Executive). Mainstream Online MBA programmes at Symbiosis, NMIMS, Amity, Manipal, and Jain sit between Rs 1.65 lakh and Rs 2.75 lakh total." } },
              { "@type": "Question", name: "Is IT & Systems MBA better than an MBA in Business Analytics?", acceptedAnswer: { "@type": "Answer", text: "They serve different career paths. IT & Systems MBA focuses on technology management, IT strategy, enterprise architecture, and product management. Business Analytics MBA focuses on data-driven decision-making across all functions. IT & Systems MBA is stronger if you want to manage technology teams or become a CIO/CTO. Business Analytics is stronger for data science or analytics leadership roles." } },
              { "@type": "Question", name: "Can I get into product management after an IT & Systems MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes. Product management is one of the strongest career outcomes for IT & Systems MBA graduates, especially those with prior engineering experience. The MBA adds business context — product strategy, P&L ownership, stakeholder management — that engineering experience alone does not provide." } },
              { "@type": "Question", name: "Is enterprise architecture a good career after IT & Systems MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes — and it is an underrated one. Enterprise Architects (EA) at senior levels earn Rs 42-75 LPA, rising to Rs 80 LPA+ at CIO/CTO level. The EA path is less visible than Product or Consulting, but it has lower competition and high demand at large enterprises undergoing digital transformation." } },
              { "@type": "Question", name: "Which universities offer the best IT & Systems Management MBA in India?", acceptedAnswer: { "@type": "Answer", text: "Based on placement outcomes and programme quality: IIM Ahmedabad PGPX and IIM Bangalore EPGP for Executive mode; IIIT Bangalore Executive for technology-specific management; Symbiosis and NMIMS for Online/Distance mode." } },
              { "@type": "Question", name: "How is AI affecting IT & Systems Management careers?", acceptedAnswer: { "@type": "Answer", text: "AI is reshaping technology management. IT professionals who understand AI governance, cloud AI platforms, and how to translate AI capabilities into business outcomes are commanding 20-35% salary premiums in 2025-26. The IT & Systems MBA curriculum increasingly covers AI strategy and digital transformation leadership." } },
              { "@type": "Question", name: "Can I move into IT consulting after an Online MBA in IT & Systems?", acceptedAnswer: { "@type": "Answer", text: "Yes — IT consulting is one of the strongest outcomes for Online and Executive IT & Systems MBA graduates. Big-4 IT consulting (Deloitte, PwC, EY, KPMG), Accenture Technology, IBM Consulting, and Capgemini all hire IT MBA graduates with relevant engineering or IT services backgrounds." } },
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
            name: "How to decide if an IT & Systems Management MBA is right for you",
            description: "A 5-question framework used by CollegeNCourses counsellors to help IT professionals choose the right MBA in 2025-26.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Name your target role", text: "Product Manager? IT Consulting? Enterprise Architect? IT Director/CIO? The programme structure, electives, and career strategy differ significantly across these. Vague targets produce vague outcomes." },
              { "@type": "HowToStep", position: 2, name: "Assess your existing technical depth", text: "If you have 5+ years of software engineering or IT services experience, you have the technical foundation. The IT & Systems MBA adds the management and business strategy layer. If you have less than 3 years of technical experience, focus on deepening technical skills before the MBA." },
              { "@type": "HowToStep", position: 3, name: "Decide if Tier-1 Executive is necessary for your goal", text: "If your target is MBB consulting or a CTO role at a top-5 tech firm, IIM Ahmedabad PGPX or IIM Bangalore EPGP justifies Rs 22-28 lakh. If your target is IT management, product, or Big-4 consulting, Online MBA at Rs 1.65-2.75 lakh is far better ROI." },
              { "@type": "HowToStep", position: 4, name: "Audit whether you enjoy systems thinking", text: "IT & Systems Management requires thinking in systems — architecture, dependencies, trade-offs, governance. Professionals who enjoy designing systems (not just building them) do exceptionally well. Those who prefer pure execution or creative work often find the management layer unsatisfying." },
              { "@type": "HowToStep", position: 5, name: "Set your financial ceiling", text: "Rs 1.3 L to Rs 28 L is the full range. Most working IT professionals fit Rs 1.65 L to Rs 2.75 L Online. Stretching to Executive without a specific consulting-reset or CIO-track opportunity in view is the most expensive regret pattern in this specialization." },
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
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "PGPX — IIM Ahmedabad", description: "12-month Executive MBA at India's top business school with strong consulting and technology leadership placements.", courseMode: "Blended", timeRequired: "P12M" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "EPGP IT Management — IIM Bangalore", description: "12-15 month Executive MBA with technology management focus and strong tech-sector placements.", courseMode: "Blended", timeRequired: "P12M" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Online MBA IT Management — Symbiosis SCOL", description: "24-month Online MBA with strong placement conversion and live faculty interaction.", courseMode: "Online", timeRequired: "P24M" } },
            ],
          }),
        }}
      />
      <ITSystemsGuideClient />
    </>
  );
}
