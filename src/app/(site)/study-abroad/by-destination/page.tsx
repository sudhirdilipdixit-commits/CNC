import { Metadata } from 'next'
import ByDestinationClient from '@/components/study-abroad/ByDestinationClient'

export const metadata: Metadata = {
  title: 'Study Abroad by Destination 2026-27 | USA, UK, Canada, Australia, Germany | CollegeNCourses',
  description:
    'Compare study abroad destinations for Indian students. USA, UK, Canada, Australia, Germany, Ireland, and New Zealand - fees, work permits, immigration pathways, and top programmes. Updated July 2026.',
}

export default function ByDestinationPage() {
  return <ByDestinationClient />
}
