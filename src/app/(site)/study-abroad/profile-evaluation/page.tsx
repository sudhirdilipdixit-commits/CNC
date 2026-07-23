import { Metadata } from 'next'
import ProfileEvaluationClient from '@/components/study-abroad/ProfileEvaluationClient'

export const metadata: Metadata = {
  title: 'Profile Evaluation for Study Abroad 2026-27 | Ambitious, Target, Safe Universities | CollegeNCourses',
  description:
    'Free profile evaluation for Indian students planning to study abroad. Get a shortlist of Ambitious, Target, and Safe universities based on your academics, test scores, and budget. Updated July 2026.',
}

export default function ProfileEvaluationPage() {
  return <ProfileEvaluationClient />
}
