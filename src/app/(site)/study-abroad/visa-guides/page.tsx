import { Metadata } from 'next'
import VisaGuidesClient from '@/components/study-abroad/VisaGuidesClient'

export const metadata: Metadata = {
  title: 'Student Visa Guide for Study Abroad 2026-27 | USA F-1, UK, Canada, Australia, Germany | CollegeNCourses',
  description:
    'Complete student visa guide for Indian students studying abroad. USA F-1, UK Student visa, Canada Study Permit, Australia subclass 500, Germany Student visa. Documents, costs, and processing times. Updated July 2026.',
}

export default function VisaGuidesPage() {
  return <VisaGuidesClient />
}
