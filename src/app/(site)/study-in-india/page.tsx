import { Metadata } from 'next'
import StudyInIndiaClient from '@/components/study-in-india/StudyInIndiaClient'

export const metadata: Metadata = {
  title: 'Study in India 2026-27 | Online MBA, Distance MBA, Executive MBA | CollegeNCourses',
  description:
    'Compare Online MBA, Distance MBA, Executive MBA, Regular MBA, and Design programmes from UGC-DEB approved private universities in India. Honest comparison of fees, accreditation, and career outcomes. Updated July 2026.',
}

export default function StudyInIndiaPage() {
  return <StudyInIndiaClient />
}
