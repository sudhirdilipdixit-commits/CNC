import { Metadata } from 'next'
import NewHomeClient from '@/components/new-home/NewHomeClient'

export const metadata: Metadata = {
  title: 'CollegeNCourses | Compare Online and Distance MBA Programmes in India 2026-27',
  description:
    'Compare Online MBA, Distance MBA, and Executive MBA from 150+ UGC-DEB and AICTE approved universities, and international degrees from top global universities. Study in India or Study Abroad. AI-powered guidance, transparent fees, no sales pressure.',
}

export default function NewHomePage() {
  return <NewHomeClient />
}
