import { Metadata } from 'next'
import ByProgrammeClient from '@/components/study-abroad/ByProgrammeClient'

export const metadata: Metadata = {
  title: 'Study Abroad by Programme 2026-27 | MBA, MS, MIM, Bachelors | CollegeNCourses',
  description:
    'Compare MBA, MS, MIM, Bachelors, and PhD programmes abroad for Indian students. Duration, cost, eligibility, best countries, and career outcomes by programme type. Updated July 2026.',
}

export default function ByProgrammePage() {
  return <ByProgrammeClient />
}
