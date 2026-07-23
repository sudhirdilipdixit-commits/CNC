import { Metadata } from 'next'
import TestPrepClient from '@/components/study-abroad/TestPrepClient'

export const metadata: Metadata = {
  title: 'Test Prep for Study Abroad 2026-27 | GRE, GMAT, IELTS, TOEFL, PTE | CollegeNCourses',
  description:
    'Complete guide to GRE, GMAT, IELTS, TOEFL, PTE, and Duolingo English Test for Indian students studying abroad. Which test, which score, and how long to prepare. Updated July 2026.',
}

export default function TestPrepPage() {
  return <TestPrepClient />
}
