import type { Metadata } from "next";
import FeeGuideClient from "./FeeGuideClient";

export const metadata: Metadata = {
  title: "Complete Distance/Online MBA Fee Guide 2025-26 | CollegeNCourses",
  description:
    "Tuition, hidden costs, EMI options, and Section 80E tax benefits explained. The full true-cost breakdown for Distance and Online MBA in India, 2025-26.",
  alternates: {
    canonical: "https://collegencourses.com/resources/mba-fee-guide-2025-26/",
  },
  openGraph: {
    type: "article",
    title: "Complete Distance/Online MBA Fee Guide: 2025-26 True Cost Breakdown",
    description:
      "Tuition, hidden costs, EMI options, and tax benefits explained. The full true-cost picture, not just the advertised fee.",
    url: "https://collegencourses.com/resources/mba-fee-guide-2025-26/",
    images: [
      {
        url: "https://collegencourses.com/og/resources-mba-fee-guide.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Distance/Online MBA Fee Guide: 2025-26 True Cost Breakdown",
    description: "Hidden costs, EMI, Section 80E tax benefits: the full picture for 2025-26.",
    images: ["https://collegencourses.com/og/resources-mba-fee-guide.webp"],
  },
};

export default function FeeGuidePage() {
  return (
    <>
      {/* Schema 1: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Complete Distance/Online MBA Fee Guide: True Cost Breakdown 2025-26",
            description:
              "Tuition, hidden costs, EMI options, and Section 80E tax benefits explained. The full true-cost breakdown for Distance and Online MBA in India.",
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
            image: "https://collegencourses.com/og/resources-mba-fee-guide.webp",
            mainEntityOfPage: "https://collegencourses.com/resources/mba-fee-guide-2025-26/",
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
              { "@type": "ListItem", position: 2, name: "Resources", item: "https://collegencourses.com/resources/" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Complete Distance/Online MBA Fee Guide",
                item: "https://collegencourses.com/resources/mba-fee-guide-2025-26/",
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
              { "@type": "Question", name: "How much does a Distance or Online MBA actually cost in India in 2025-26, including hidden fees?", acceptedAnswer: { "@type": "Answer", text: "Total all-in cost, including typical hidden fees, is approximately Rs 1.35-2.3 lakh for a Distance MBA and Rs 1.6-4.1 lakh for an Online MBA. The advertised tuition figure alone typically understates the true cost by Rs 15,000-40,000." } },
              { "@type": "Question", name: "What hidden costs should I budget for beyond tuition?", acceptedAnswer: { "@type": "Answer", text: "The four most commonly missed costs are registration/application fees (Rs 1,000-3,000), semester examination fees (Rs 8,000-20,000 across the programme), study material or tool licence fees (Rs 0-25,000, specialization-dependent), and convocation/certificate fees (Rs 2,000-5,000)." } },
              { "@type": "Question", name: "Does the MBA specialization I choose affect the fee?", acceptedAnswer: { "@type": "Answer", text: "Only modestly at Distance and Online level, where fees cluster within Rs 1.2-3.75 lakh regardless of specialization. At Executive level, specialization matters significantly because different specializations have different leading institutes with very different fee brackets." } },
              { "@type": "Question", name: "Can I get an education loan for a Distance or Online MBA?", acceptedAnswer: { "@type": "Answer", text: "Yes. Standard providers including SBI, HDFC Credila, ICICI Bank, and Avanse extend education loans for UGC-DEB approved Distance and Online MBA programmes, though for lower fee brackets many aspirants instead use interest-free direct university EMI." } },
              { "@type": "Question", name: "What is Section 80E and how does it help with MBA fees?", acceptedAnswer: { "@type": "Answer", text: "Section 80E of the Income Tax Act allows a full deduction of interest paid on an education loan from taxable income, with no upper limit, for up to 8 years. It applies to loans from a recognised financial institution. Only interest is deductible, not principal." } },
              { "@type": "Question", name: "Are there scholarships available for Distance or Online MBA programmes?", acceptedAnswer: { "@type": "Answer", text: "Yes, though less publicised than for full-time residential programmes. Categories include merit-based waivers (typically 10-25% off tuition), need-based concessions, women-in-management scholarships at several institutes, and defence/veteran quotas. Always ask the university's admissions office directly." } },
              { "@type": "Question", name: "Is it cheaper to pay MBA fees upfront or take an education loan?", acceptedAnswer: { "@type": "Answer", text: "It depends on your tax bracket and opportunity cost of capital. For lower fee brackets with interest-free university EMI available, financing carries no extra cost. For Executive MBA brackets, a bank loan combined with Section 80E tax deduction can sometimes work out cheaper in effective terms than upfront cash payment." } },
              { "@type": "Question", name: "What is the Central Sector Interest Subsidy (CSIS) Scheme?", acceptedAnswer: { "@type": "Answer", text: "A Government of India scheme providing interest subsidy during the loan moratorium period on education loans for professional and technical courses, for students from economically weaker sections. Eligibility for Distance/Online MBA specifically varies by lender; verify directly with your bank." } },
              { "@type": "Question", name: "Will a university increase fees mid-programme?", acceptedAnswer: { "@type": "Answer", text: "Legitimate universities specify in the admission offer letter whether fees are fixed for your programme duration or subject to annual revision. Always confirm this explicitly before enrolling." } },
              { "@type": "Question", name: "Do I have to pay GST on MBA tuition fees?", acceptedAnswer: { "@type": "Answer", text: "No. Tuition fees for a recognised degree programme offered by an educational institution as defined under Indian GST law are exempt from GST. If a fee breakdown shows GST charged on core tuition, ask for clarification." } },
              { "@type": "Question", name: "Can my employer pay for my MBA?", acceptedAnswer: { "@type": "Answer", text: "Many employers, particularly large private banks, IT services firms, and consulting firms, offer 40-100% fee sponsorship against a 2-3 year service-back commitment. In our tracking, fewer than 30% of eligible aspirants ask their employer directly before enrolling." } },
              { "@type": "Question", name: "How does CollegeNCourses help me plan my MBA fees and financing?", acceptedAnswer: { "@type": "Answer", text: "Our counsellors walk through the full 6-step true-cost calculation, help identify applicable scholarships and Section 80E tax benefits specific to your situation, and cross-check the university's fee structure for hidden costs or red flags before you enrol. Free 30-minute call." } },
              { "@type": "Question", name: "How much does an online MBA cost in India?", acceptedAnswer: { "@type": "Answer", text: "Total cost for an Online MBA in India in 2025-26, including typical hidden fees, is approximately Rs 1.6-4.1 lakh depending on the university, with the advertised tuition figure alone ranging Rs 1.4-3.75 lakh. Executive MBA programmes cost significantly more, from Rs 8 lakh to Rs 40 lakh." } },
              { "@type": "Question", name: "What is the cheapest online MBA in India?", acceptedAnswer: { "@type": "Answer", text: "IGNOU, at approximately Rs 0.4-0.6 lakh, is the most affordable genuinely UGC-DEB approved option. Among branded private universities, ICFAI University Distance at Rs 1.2 lakh is the lowest-cost option." } },
              { "@type": "Question", name: "How can I reduce the cost of my MBA?", acceptedAnswer: { "@type": "Answer", text: "Four levers: check for merit-based or need-based scholarships before enrolling, ask your employer directly about fee sponsorship, use an interest-free university EMI instead of a paid loan where the fee bracket allows it, and if you take an education loan, claim the Section 80E interest deduction on your taxes every year it applies." } },
              { "@type": "Question", name: "Is CollegeNCourses paid by universities to recommend certain fee structures?", acceptedAnswer: { "@type": "Answer", text: "No. We do not accept payment from universities, banks, or NBFCs that affects our recommendations. Financing-partner links in this guide are informational references to standard, widely-available providers, not paid placements." } },
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
            name: "How to calculate your true total MBA cost",
            description:
              "A 6-step worksheet used by CollegeNCourses counsellors to calculate the genuine all-in cost of a Distance, Online, or Executive MBA, including hidden fees and net financing cost.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Start with the base tuition fee", text: "Use the total programme tuition figure, not a per-semester or per-year figure, so you're comparing full-programme cost to full-programme cost." },
              { "@type": "HowToStep", position: 2, name: "Add registration and application fees", text: "Typically Rs 1,000-3,000, often already paid by the time you're deep into comparison, but include it for an accurate total." },
              { "@type": "HowToStep", position: 3, name: "Add semester-wise examination fees for the full programme", text: "Multiply the per-semester exam fee by the total number of semesters, typically 4 for a 24-month programme." },
              { "@type": "HowToStep", position: 4, name: "Add study material, tool licence, and placement cell fees if not bundled", text: "Confirm directly with the university whether these are included in headline tuition or billed separately." },
              { "@type": "HowToStep", position: 5, name: "Add the convocation and certificate fee", text: "Small individually (Rs 2,000-5,000) but easy to forget since it's charged at completion, 18-24 months after enrolment." },
              { "@type": "HowToStep", position: 6, name: "If financing, add net financing cost after any tax benefit", text: "For a bank loan, calculate total interest over the tenure, then subtract the estimated Section 80E tax saving to get genuine net financing cost." },
            ],
          }),
        }}
      />
      {/* Schema 5: ItemList (12 specializations with fee data) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MBA Specialization Fee Comparison 2025-26",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "MBA in Marketing Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2500000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "MBA in Digital Marketing", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "1800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "MBA in Business Analytics", offers: { "@type": "AggregateOffer", lowPrice: "130000", highPrice: "2800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 4, item: { "@type": "Course", name: "MBA in Finance Management", offers: { "@type": "AggregateOffer", lowPrice: "130000", highPrice: "4000000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 5, item: { "@type": "Course", name: "MBA in Banking & Finance Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "1500000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 6, item: { "@type": "Course", name: "MBA in Human Resource Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2500000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 7, item: { "@type": "Course", name: "MBA in Operations Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 8, item: { "@type": "Course", name: "MBA in Supply Chain Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 9, item: { "@type": "Course", name: "MBA in IT & Systems Management", offers: { "@type": "AggregateOffer", lowPrice: "130000", highPrice: "2800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 10, item: { "@type": "Course", name: "MBA in Project Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2800000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 11, item: { "@type": "Course", name: "MBA in International Business Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2200000", priceCurrency: "INR" } } },
              { "@type": "ListItem", position: 12, item: { "@type": "Course", name: "MBA in Retail Management", offers: { "@type": "AggregateOffer", lowPrice: "120000", highPrice: "2800000", priceCurrency: "INR" } } },
            ],
          }),
        }}
      />
      <FeeGuideClient />
    </>
  );
}
