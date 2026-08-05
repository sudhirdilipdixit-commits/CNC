import type { Metadata } from 'next'
import ToolsAndCalculatorsHubClient from '@/components/resources/ToolsAndCalculatorsHubClient'

export const metadata: Metadata = {
  title: 'Tools and Calculators: MBA EMI and Study Abroad Cost | CollegeNCourses',
  description:
    'Free interactive tools: the MBA fee and EMI calculator (bank loan vs university plan) and the study abroad cost calculator covering 7 countries. No sign-up required.',
  alternates: { canonical: 'https://collegencourses.com/resources/tools-and-calculators/' },
  openGraph: {
    url: 'https://collegencourses.com/resources/tools-and-calculators/',
    title: 'Tools and Calculators | CollegeNCourses',
    description: 'Free interactive tools: MBA fee/EMI calculator and study abroad cost calculator.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegencourses.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://collegencourses.com/resources-new/' },
    { '@type': 'ListItem', position: 3, name: 'Tools and Calculators', item: 'https://collegencourses.com/resources/tools-and-calculators/' },
  ],
}

export default function ToolsAndCalculatorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolsAndCalculatorsHubClient />
    </>
  )
}
