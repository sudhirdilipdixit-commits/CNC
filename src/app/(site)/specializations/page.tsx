import { Metadata } from 'next'
import SpecializationsClient from '@/components/specializations/SpecializationsClient'

export const metadata: Metadata = {
  title: 'MBA Specializations Guide 2026-27 | Marketing, Finance, HR, IT, Healthcare | CollegeNCourses',
  description:
    'Choose the right MBA specialization in 2026-27. Compare Marketing, Finance, HR, Operations, IT, Healthcare, Banking, Business Analytics, and AI-in-Management. Salary ranges, career paths, and top private universities. Updated July 2026.',
  alternates: { canonical: 'https://collegencourses.com/specializations/' },
}

export default function SpecializationsPage() {
  return <SpecializationsClient />
}
