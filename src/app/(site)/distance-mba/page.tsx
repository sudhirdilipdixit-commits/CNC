import { Metadata } from 'next'
import DistanceMBAClient from '@/components/distance-mba/DistanceMBAClient'

export const metadata: Metadata = {
  title: 'Distance MBA in India 2026-27 | Most Affordable UGC-DEB Approved MBA | CollegeNCourses',
  description:
    'Compare UGC-DEB approved Distance MBA programmes in India. Honest comparison of fees (Rs 50,000 to Rs 3 lakh), study material, exam centres, and career outcomes. Updated July 2026.',
}

export default function DistanceMBAPage() {
  return <DistanceMBAClient />
}
