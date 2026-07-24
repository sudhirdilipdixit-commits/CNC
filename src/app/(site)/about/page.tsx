import type { Metadata } from 'next'
import AboutClient from '@/components/about/AboutClient'

export const metadata: Metadata = {
  title: 'About Us | CollegeNCourses - Education Comparison Platform | Pune, India',
  description:
    'CollegeNCourses is an education comparison platform helping Indian aspirants choose Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes. Founded 2023 by Nikhita Pradeep Deshmukh. UGC-DEB approved universities only.',
  alternates: { canonical: 'https://collegencourses.com/about/' },
  openGraph: {
    url: 'https://collegencourses.com/about/',
    title: 'About Us | CollegeNCourses',
    description:
      'Honest programme comparisons for Indian aspirants. Study in India and Study Abroad. Founded 2023 in Pune.',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'CollegeNCourses',
  legalName: 'DNYANAL EDUCON PRIVATE LIMITED',
  url: 'https://collegencourses.com',
  logo: 'https://collegencourses.com/logo.webp',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7350-460-393',
    email: 'info@collegencourses.com',
    contactType: 'customer support',
  },
  sameAs: [
    'https://www.facebook.com/CollegeNCourses/',
    'https://www.instagram.com/collegencourses/',
    'https://www.linkedin.com/company/college-n-courses/',
  ],
  founder: {
    '@type': 'Person',
    name: 'Nikhita Pradeep Deshmukh',
    jobTitle: 'Founder and Lead Education Expert',
    worksFor: { '@type': 'Organization', name: 'CollegeNCourses' },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegencourses.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://collegencourses.com/about/' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutClient />
    </>
  )
}
