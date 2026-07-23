import { Metadata } from 'next'
import LoansAbroadClient from '@/components/study-abroad/LoansAbroadClient'

export const metadata: Metadata = {
  title: 'Education Loans for Studying Abroad 2026-27 | Indian Banks, NBFCs, Collateral-Free | CollegeNCourses',
  description:
    'Compare education loans for studying abroad from India. SBI, Bank of Baroda, HDFC Credila, Avanse, Auxilo. Collateral-free loans up to Rs 75 lakh. Section 80E tax benefit. Updated July 2026.',
}

export default function LoansAbroadPage() {
  return <LoansAbroadClient />
}
