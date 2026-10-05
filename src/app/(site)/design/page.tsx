import { Metadata } from 'next'
import DesignProgrammesClient from '@/components/design/DesignProgrammesClient'

export const metadata: Metadata = {
  title: 'Design Programmes in India 2026-27 | Compare B.Des and M.Des Institutes | CollegeNCourses',
  description:
    'Compare B.Des and M.Des design programmes from accredited institutes in India. Honest comparison of fees (Rs 4.5 lakh to Rs 12 lakh), specializations, entrance exams, and career outcomes. Updated July 2026.',
}

export default function DesignProgrammesPage() {
  return <DesignProgrammesClient />
}
