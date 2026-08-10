import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SpecializationLandingClient from '@/components/online-mba/SpecializationLandingClient'
import { SPECIALIZATION_DATA, getSpecializationData } from '@/components/online-mba/specializationData'

const SITE_URL = 'https://collegencourses.com'

function feeToPaise(fee: string): number | undefined {
  const match = fee.match(/Rs\s*([\d.]+)\s*L/i)
  return match ? Math.round(parseFloat(match[1]) * 100000) : undefined
}

function durationToIso(duration: string): string | undefined {
  const match = duration.match(/(\d+)\s*month/i)
  return match ? `P${match[1]}M` : undefined
}

export async function generateStaticParams() {
  return Object.keys(SPECIALIZATION_DATA).map((specialization) => ({ specialization }))
}

export async function generateMetadata({ params }: { params: Promise<{ specialization: string }> }): Promise<Metadata> {
  const { specialization } = await params
  const data = getSpecializationData(specialization)
  if (!data) return {}

  const url = `${SITE_URL}/online-mba/${data.slug}/`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: data.metaTitle,
      description: data.metaDescription,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
    },
  }
}

export default async function SpecializationLandingPage({ params }: { params: Promise<{ specialization: string }> }) {
  const { specialization } = await params
  const data = getSpecializationData(specialization)
  if (!data) notFound()

  const url = `${SITE_URL}/online-mba/${data.slug}/`
  const faqEntities = [...data.faqs, ...data.questions].map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Online MBA', item: `${SITE_URL}/online-mba/` },
              { '@type': 'ListItem', position: 3, name: data.title, item: url },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: data.title,
            dateModified: data.dateModified,
            itemListElement: data.programmes.map((programme) => ({
              '@type': 'ListItem',
              position: programme.rank,
              item: {
                '@type': 'EducationalOccupationalProgram',
                name: `${data.title} - ${programme.uni}`,
                provider: { '@type': 'EducationalOrganization', name: programme.uni },
                programType: 'Online',
                educationalCredentialAwarded: 'MBA',
                timeToComplete: durationToIso(programme.duration),
                offers: {
                  '@type': 'Offer',
                  price: feeToPaise(programme.fee),
                  priceCurrency: 'INR',
                },
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqEntities,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': url,
            url,
            name: data.title,
            description: data.metaDescription,
            dateModified: data.dateModified,
            author: {
              '@type': 'Person',
              name: 'CollegeNCourses Editorial Team',
              jobTitle: 'Content Lead',
              worksFor: { '@type': 'Organization', name: 'CollegeNCourses' },
            },
            reviewedBy: {
              '@type': 'Person',
              name: 'CollegeNCourses Senior Counsellor',
              jobTitle: 'Senior Counsellor',
              worksFor: { '@type': 'Organization', name: 'CollegeNCourses' },
            },
            publisher: {
              '@type': 'EducationalOrganization',
              name: 'CollegeNCourses',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
              founder: {
                '@type': 'Person',
                name: 'Nikhita Pradeep Deshmukh',
                jobTitle: 'Founder and Lead Education Expert',
                worksFor: { '@type': 'Organization', name: 'CollegeNCourses' },
              },
            },
          }),
        }}
      />
      <SpecializationLandingClient data={data} />
    </>
  )
}
