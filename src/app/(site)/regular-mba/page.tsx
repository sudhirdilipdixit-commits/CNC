import { Metadata } from 'next'
import RegularMBAClient from '@/components/regular-mba/RegularMBAClient'

export const metadata: Metadata = {
  title: 'Regular MBA in India 2026-27 | Full-Time Campus MBA with Placements | CollegeNCourses',
  description:
    'Compare full-time campus MBA and PGDM programmes in India. Honest comparison of fees (Rs 2.8 lakh to Rs 20 lakh), placement records, accreditation, and career outcomes. Updated July 2026.',
}

export default function RegularMBAPage() {
  return <RegularMBAClient />
}
