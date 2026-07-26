import type { Metadata } from 'next'
import AICounsellorClient from '@/components/ai-counsellor/AICounsellorClient'

export const metadata: Metadata = {
  title: 'AI Counsellor: 3 MBA Programme Matches in 2 Minutes | CollegeNCourses',
  description:
    'Answer 6 quick questions about your profile, budget, and goals. Get three personalised Online MBA, Distance MBA, or Executive MBA recommendations with a plain-language explanation of why each fits. Free, no email required to see results.',
  alternates: { canonical: 'https://collegencourses.com/ai-counsellor/' },
  openGraph: {
    url: 'https://collegencourses.com/ai-counsellor/',
    title: 'AI Counsellor | CollegeNCourses',
    description: '3 personalised MBA programme recommendations in 2 minutes. Free, no email required to see results.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegencourses.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Counsellor', item: 'https://collegencourses.com/ai-counsellor/' },
  ],
}

export default function AICounsellorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AICounsellorClient />
    </>
  )
}
