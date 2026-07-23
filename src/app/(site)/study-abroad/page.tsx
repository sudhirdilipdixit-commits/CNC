import { Metadata } from 'next'
import StudyAbroadClient from '@/components/study-abroad/StudyAbroadClient'

export const metadata: Metadata = {
  title: 'Study Abroad from India 2026-27 | USA, UK, Canada, Australia | CollegeNCourses',
  description:
    'Compare international universities for Indian students. Profile evaluation, cost calculator, test prep guides for USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Updated July 2026.',
}

export default function StudyAbroadPage() {
  return <StudyAbroadClient />
}
