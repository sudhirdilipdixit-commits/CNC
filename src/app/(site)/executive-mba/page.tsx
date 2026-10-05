import { Metadata } from 'next'
import ExecutiveMBAClient from '@/components/executive-mba/ExecutiveMBAClient'

export const metadata: Metadata = {
  title: 'Executive MBA in India 2026-27 | Weekend Programmes for Working Professionals | CollegeNCourses',
  description:
    'Compare Executive MBA programmes in India for professionals with 3+ years of experience. Honest comparison of fees (Rs 3.5 lakh to Rs 15 lakh), weekend formats, residencies, and career outcomes. Updated July 2026.',
}

export default function ExecutiveMBAPage() {
  return <ExecutiveMBAClient />
}
