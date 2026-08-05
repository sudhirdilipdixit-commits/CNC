import type { Metadata } from 'next'
import EMICalculatorClient from '@/components/resources/EMICalculatorClient'

export const metadata: Metadata = {
  title: 'MBA Fee and EMI Calculator 2026-27 | CollegeNCourses',
  description:
    'Work out your monthly instalment for an MBA fee: compare a bank education loan (any interest rate and tenure) against an interest-free university direct payment plan, side by side.',
  alternates: { canonical: 'https://collegencourses.com/resources/emi-calculator/' },
  openGraph: {
    url: 'https://collegencourses.com/resources/emi-calculator/',
    title: 'MBA Fee and EMI Calculator | CollegeNCourses',
    description: 'Compare a bank education loan EMI against an interest-free university direct payment plan.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegencourses.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools and Calculators', item: 'https://collegencourses.com/resources/tools-and-calculators/' },
    { '@type': 'ListItem', position: 3, name: 'MBA Fee and EMI Calculator', item: 'https://collegencourses.com/resources/emi-calculator/' },
  ],
}

export default function EMICalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EMICalculatorClient />
    </>
  )
}
