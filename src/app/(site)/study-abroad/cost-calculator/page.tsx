import { Metadata } from 'next'
import CostCalculatorClient from '@/components/study-abroad/CostCalculatorClient'

export const metadata: Metadata = {
  title: 'Study Abroad Cost Calculator 2026-27 | USA, UK, Canada, Australia, Germany | CollegeNCourses',
  description:
    'Estimate the total cost of studying abroad from India by country: tuition, living expenses, visa fees, health insurance, and travel. Compare USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Updated July 2026.',
}

export default function CostCalculatorPage() {
  return <CostCalculatorClient />
}
