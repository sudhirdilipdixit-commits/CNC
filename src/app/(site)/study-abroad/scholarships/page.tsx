import { Metadata } from 'next'
import ScholarshipsClient from '@/components/study-abroad/ScholarshipsClient'

export const metadata: Metadata = {
  title: 'Scholarships for Indian Students Studying Abroad 2026-27 | Chevening, DAAD, Fulbright | CollegeNCourses',
  description:
    'Top scholarships for Indian students studying in USA, UK, Germany, Australia, and Europe. Chevening, Fulbright-Nehru, DAAD, Inlaks, Australia Awards, Erasmus Mundus. Deadlines and eligibility. Updated July 2026.',
}

export default function ScholarshipsPage() {
  return <ScholarshipsClient />
}
