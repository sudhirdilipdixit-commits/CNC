import type { Metadata } from 'next'
import ResourcesParentHubClient from '@/components/resources/ResourcesParentHubClient'

export const metadata: Metadata = {
  title: 'Resources: Blog, Guides, and Tools for Your MBA Decision | CollegeNCourses',
  description:
    'Explore CollegeNCourses resources: blog articles, free downloadable guides, and the MBA fee and EMI calculator. Everything you need to research your Online, Distance, or Executive MBA decision in one place.',
  alternates: { canonical: 'https://collegencourses.com/resources-new/' },
  openGraph: {
    url: 'https://collegencourses.com/resources-new/',
    title: 'Resources: Blog, Guides, and Tools | CollegeNCourses',
    description: 'Blog articles, free downloadable guides, and calculators, all in one place.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegencourses.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://collegencourses.com/resources-new/' },
  ],
}

export default function ResourcesNewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ResourcesParentHubClient />
    </>
  )
}
