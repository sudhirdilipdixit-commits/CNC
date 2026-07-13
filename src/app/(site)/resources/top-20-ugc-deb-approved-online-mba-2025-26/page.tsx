import type { Metadata } from "next";
import Top20UniversitiesClient from "./Top20UniversitiesClient";

export const metadata: Metadata = {
  title: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26 | CollegeNCourses",
  description:
    "Ranked, fact-checked, no paid placements. Fees, NAAC grades, placement data compared for 20 UGC-DEB approved Online MBA universities in India, 2025-26.",
  alternates: {
    canonical: "https://collegencourses.com/resources/top-20-ugc-deb-approved-online-mba-2025-26/",
  },
  openGraph: {
    type: "article",
    title: "Top 20 UGC-DEB Approved Online MBA Universities — 2025-26 Ranked List",
    description:
      "Fees, NAAC grades, placement data, and honest strengths/limitations compared for 20 UGC-DEB approved universities. No paid rankings.",
    url: "https://collegencourses.com/resources/top-20-ugc-deb-approved-online-mba-2025-26/",
    images: [
      {
        url: "https://collegencourses.com/og/resources-top-20-ugc-deb-universities.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 20 UGC-DEB Approved Online MBA Universities — 2025-26 Ranked List",
    description: "Ranked, fact-checked, no paid placements. The honest 2025-26 university comparison.",
    images: ["https://collegencourses.com/og/resources-top-20-ugc-deb-universities.webp"],
  },
};

export default function Top20UniversitiesPage() {
  return (
    <>
      {/* Schema 1 — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Top 20 UGC-DEB Approved Online MBA Universities in India: 2025-26 Ranked List",
            description:
              "Ranked, fact-checked, no paid placements. Fees, NAAC grades, and placement data compared for 20 UGC-DEB approved Online MBA universities in India.",
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
            image: "https://collegencourses.com/og/resources-top-20-ugc-deb-universities.webp",
            mainEntityOfPage:
              "https://collegencourses.com/resources/top-20-ugc-deb-approved-online-mba-2025-26/",
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
                name: "Top 20 UGC-DEB Approved Online MBA Universities",
                item: "https://collegencourses.com/resources/top-20-ugc-deb-approved-online-mba-2025-26/",
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
              { "@type": "Question", name: "What does UGC-DEB approval actually mean for an Online MBA?", acceptedAnswer: { "@type": "Answer", text: "UGC-DEB approval means a university has met the University Grants Commission's requirements — including NAAC A-grade accreditation or NIRF top-100 ranking, and at least five years' standing — to legally offer a specific Online degree programme for a specific academic year. Without current UGC-DEB approval, an Online MBA has no formal legal standing in India." } },
              { "@type": "Question", name: "Is this Top 20 list ranked or just alphabetical?", acceptedAnswer: { "@type": "Answer", text: "It's genuinely ranked, using a weighted six-factor methodology: UGC-DEB approval currency, accreditation quality, placement outcomes, fee-to-value ratio, specialization breadth, and faculty interaction quality. No university has paid for its position on this list." } },
              { "@type": "Question", name: "Is Symbiosis Online MBA (SCOL) worth the higher fee?", acceptedAnswer: { "@type": "Answer", text: "For most working professionals, yes. Symbiosis SCOL delivers the strongest placement conversion (around 74%) and broadest specialization catalogue among mainstream Online MBA providers, which typically justifies its Rs 2.5-2.7 lakh fee versus mid-tier alternatives at Rs 1.5-2 lakh." } },
              { "@type": "Question", name: "What is the cheapest UGC-DEB approved Online MBA in India?", acceptedAnswer: { "@type": "Answer", text: "IGNOU, at approximately Rs 0.4-0.6 lakh, is the cheapest genuinely UGC-DEB approved option with strong NAAC A++ (Category-1) standing. Karnataka State Open University follows at Rs 0.5-0.8 lakh for aspirants in or near Karnataka. Both have minimal formal placement support." } },
              { "@type": "Question", name: "Which university on this list has the best placement support?", acceptedAnswer: { "@type": "Answer", text: "Symbiosis Centre for Online Learning (SCOL) and O.P. Jindal Global (JGBS) Online lead at roughly 73-76% placement conversion in 2024-25 alumni tracking, ahead of the rest of the list." } },
              { "@type": "Question", name: "How can I verify UGC-DEB approval myself before enrolling?", acceptedAnswer: { "@type": "Answer", text: "Visit deb.ugc.ac.in directly, search for the specific university, and confirm the specific MBA programme is listed as approved for the current academic year — not a prior year. Full 6-step walkthrough in the verification section of this guide." } },
              { "@type": "Question", name: "What is the difference between UGC-DEB and AICTE approval for an Online MBA?", acceptedAnswer: { "@type": "Answer", text: "UGC-DEB approves the university to offer the Online degree programme — this is the primary approval every Distance or Online MBA needs. AICTE is a separate, additional approval some universities also hold for technical and management education; it's a positive signal but not universally mandatory." } },
              { "@type": "Question", name: "Are Online MBAs from these universities valid for government jobs?", acceptedAnswer: { "@type": "Answer", text: "Yes, provided the specific university and programme are UGC-DEB approved for the relevant academic year of enrolment. All 20 universities on this list meet that bar as of 2025-26." } },
              { "@type": "Question", name: "How often is this Top 20 list updated?", acceptedAnswer: { "@type": "Answer", text: "Every six months, cross-checked against the current UGC-DEB approved-institutions list, updated fee data from university official pages, and refreshed placement-outcome data. Any material UGC-DEB list change triggers an immediate update outside the regular cycle." } },
              { "@type": "Question", name: "Which university offers the widest specialization choice?", acceptedAnswer: { "@type": "Answer", text: "Amity University Online offers the broadest elective catalogue on this list — 12 or more specializations including newer additions in Business Analytics and AI-focused tracks — making it a strong choice for aspirants still narrowing down their target function." } },
              { "@type": "Question", name: "Is an IGNOU Online MBA good?", acceptedAnswer: { "@type": "Answer", text: "IGNOU is a legitimate, NAAC A++ (Category-1), UGC-DEB recognised option and by far the most affordable on this list. It's a strong choice specifically for aspirants who need the lowest-cost path to a legally valid MBA credential, particularly for government job eligibility. Placement support is minimal and private-sector employer perception sits at Tier-3." } },
              { "@type": "Question", name: "Which is the best online MBA university in India?", acceptedAnswer: { "@type": "Answer", text: "Based on our 2025-26 ranking, Symbiosis Centre for Online Learning (SCOL) is the best overall pick for most working professionals, balancing live faculty access, placement support, and specialization breadth. The best choice varies by individual priority." } },
              { "@type": "Question", name: "Is online MBA from a private university valid in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. An Online MBA from any private university holding current UGC-DEB approval for that specific programme is legally equivalent to a regular MBA in India for government jobs, further education, and private-sector employment." } },
              { "@type": "Question", name: "How do I check if a university is UGC approved for online MBA?", acceptedAnswer: { "@type": "Answer", text: "Visit the official UGC-DEB portal at deb.ugc.ac.in, search for the university by its exact legal name, and confirm the specific MBA programme is listed as approved for the current academic year. Cross-check NAAC accreditation at naac.gov.in as an additional verification step." } },
              { "@type": "Question", name: "How were these 20 universities selected?", acceptedAnswer: { "@type": "Answer", text: "We started from the full current UGC-DEB approved-institutions list, filtered to universities offering an MBA specifically, then scored each against our six-factor methodology using CollegeNCourses internal alumni tracking, AmbitionBox, Naukri JobSpeak, and official university fee and accreditation data." } },
              { "@type": "Question", name: "How does CollegeNCourses rank these universities — do any pay for placement?", acceptedAnswer: { "@type": "Answer", text: "No. This ranking uses a transparent, weighted methodology based on UGC-DEB approval status, accreditation, placement outcomes, fee-to-value ratio, specialization breadth, and faculty interaction quality. No university has paid for inclusion or rank position." } },
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
            name: "How to verify a university's UGC-DEB approval status for Online MBA",
            description:
              "A 6-step verification process used by CollegeNCourses to confirm UGC-DEB approval status before recommending any university.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Go to the official UGC-DEB portal", text: "Visit deb.ugc.ac.in directly — do not rely on a link sent by an admissions counsellor or a university's own website claim." },
              { "@type": "HowToStep", position: 2, name: "Search for the specific university by name", text: "Use the portal's List of HEIs or approved-institutions search. Search the exact legal name of the university, not a shortened or marketing name." },
              { "@type": "HowToStep", position: 3, name: "Check the current academic year listing specifically", text: "Confirm the university is listed as approved for the current academic year (2025-26) — not a prior year. Approval is granted annually." },
              { "@type": "HowToStep", position: 4, name: "Confirm the specific programme is listed, not just the university", text: "Approval is granted per-programme. Look for MBA or Master of Business Administration specifically listed against that university's entry." },
              { "@type": "HowToStep", position: 5, name: "Cross-check NAAC accreditation", text: "Visit naac.gov.in and confirm the university holds a NAAC grade of A or above, which is a prerequisite for UGC-DEB Online programme eligibility under the 2020 Regulations." },
              { "@type": "HowToStep", position: 6, name: "Check AICTE status if dual approval is claimed", text: "If a university advertises both UGC-DEB and AICTE approval, verify independently at aicte-india.org — don't take the dual-approval claim at face value from admissions material alone." },
            ],
          }),
        }}
      />
      {/* Schema 5 — ItemList (Top 20 universities) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Top 20 UGC-DEB Approved Online MBA Universities 2025-26",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "CollegeOrUniversity", name: "Symbiosis Centre for Online Learning (SCOL)", address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 2, item: { "@type": "CollegeOrUniversity", name: "NMIMS Global Access (CDOE)", address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 3, item: { "@type": "CollegeOrUniversity", name: "Manipal Academy of Higher Education (MAHE) Online", address: { "@type": "PostalAddress", addressLocality: "Manipal", addressRegion: "Karnataka", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 4, item: { "@type": "CollegeOrUniversity", name: "O.P. Jindal Global University (JGBS) Online", address: { "@type": "PostalAddress", addressLocality: "Sonipat", addressRegion: "Haryana", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 5, item: { "@type": "CollegeOrUniversity", name: "Amity University Online", address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 6, item: { "@type": "CollegeOrUniversity", name: "Jain (Deemed-to-be University) Online", address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressRegion: "Karnataka", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 7, item: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", address: { "@type": "PostalAddress", addressLocality: "Mohali", addressRegion: "Punjab", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 8, item: { "@type": "CollegeOrUniversity", name: "Lovely Professional University (LPU) Online", address: { "@type": "PostalAddress", addressLocality: "Jalandhar", addressRegion: "Punjab", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 9, item: { "@type": "CollegeOrUniversity", name: "DY Patil Vidyapeeth Online", address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 10, item: { "@type": "CollegeOrUniversity", name: "UPES Online", address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressRegion: "Uttarakhand", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 11, item: { "@type": "CollegeOrUniversity", name: "Sharda University Online", address: { "@type": "PostalAddress", addressLocality: "Greater Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 12, item: { "@type": "CollegeOrUniversity", name: "Shoolini University Online", address: { "@type": "PostalAddress", addressLocality: "Solan", addressRegion: "Himachal Pradesh", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 13, item: { "@type": "CollegeOrUniversity", name: "Bharati Vidyapeeth (Deemed University) Distance", address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 14, item: { "@type": "CollegeOrUniversity", name: "ICFAI University Distance", address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 15, item: { "@type": "CollegeOrUniversity", name: "GLA University Online", address: { "@type": "PostalAddress", addressLocality: "Mathura", addressRegion: "Uttar Pradesh", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 16, item: { "@type": "CollegeOrUniversity", name: "Vignan's Foundation Online", address: { "@type": "PostalAddress", addressLocality: "Guntur", addressRegion: "Andhra Pradesh", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 17, item: { "@type": "CollegeOrUniversity", name: "Uttaranchal University Online", address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressRegion: "Uttarakhand", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 18, item: { "@type": "CollegeOrUniversity", name: "Sikkim Manipal University Distance Education", address: { "@type": "PostalAddress", addressLocality: "Gangtok", addressRegion: "Sikkim", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 19, item: { "@type": "CollegeOrUniversity", name: "Karnataka State Open University (KSOU)", address: { "@type": "PostalAddress", addressLocality: "Mysuru", addressRegion: "Karnataka", addressCountry: "IN" } } },
              { "@type": "ListItem", position: 20, item: { "@type": "CollegeOrUniversity", name: "IGNOU", address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressRegion: "Delhi", addressCountry: "IN" } } },
            ],
          }),
        }}
      />
      <Top20UniversitiesClient />
    </>
  );
}
