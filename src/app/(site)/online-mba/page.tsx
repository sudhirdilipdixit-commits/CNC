import { Metadata } from 'next'
import OnlineMBAClient from '@/components/online-mba/OnlineMBAClient'

export const metadata: Metadata = {
  title: 'Online MBA in India 2026-27 | Compare 150+ UGC-DEB Approved Programmes | CollegeNCourses',
  description:
    'Compare 150+ UGC-DEB and AICTE approved Online MBA programmes in India. Honest comparison of fees (Rs 31,500 to Rs 6.5 lakh), specializations, accreditation, and career outcomes. Updated July 2026.',
}

export default function OnlineMBAPage() {
  return <OnlineMBAClient />
}
