export type ProgramItem = {
  rank: number
  uni: string
  fee: string
  duration: string
  batch: string
  approval: string
  strength: string
}

export type SpecializationData = {
  slug: string
  eyebrow: string
  title: string
  metaTitle: string
  metaDescription: string
  answerCapsule: string
  description: string
  stats: Array<{ label: string; value: string }>
  programmes: ProgramItem[]
  fitPoints: string[]
  fitPointsNo: string[]
  outcomes: Array<{ label: string; value: string }>
  questions: Array<{ q: string; a: string }>
  faqs: Array<{ q: string; a: string }>
  updated: string
  dateModified: string
}

export const SPECIALIZATION_DATA: Record<string, SpecializationData> = {
  marketing: {
    slug: 'marketing',
    eyebrow: 'STUDY IN INDIA - ONLINE MBA IN MARKETING',
    title: 'Online MBA in Marketing Management for Working Professionals',
    metaTitle: 'Online MBA in Marketing Management | Compare Programmes | CollegeNCourses',
    metaDescription:
      'Compare online MBA programmes in Marketing for working professionals. Find UGC-DEB approved options, fees, and admission guidance for your next step.',
    answerCapsule:
      'An Online MBA in Marketing helps you learn brand strategy, digital growth, customer analytics, and sales planning without leaving your job. It is a strong fit for professionals aiming for promotion, a career switch, or stronger salary growth in marketing and product-led roles.',
    description:
      'Compare high-intent online MBA programmes in Marketing with real fees, approvals, and admission timelines. This page is built for Google campaigns that target working professionals searching for a practical management degree with strong career relevance.',
    stats: [
      { label: 'Programmes compared', value: '24+ online MBA tracks' },
      { label: 'Typical fee range', value: 'Rs 1.1 L to Rs 2.8 L' },
      { label: 'Best for', value: 'Working professionals, mid-career growth' },
      { label: 'Admission mode', value: 'Online application, quick shortlist' },
    ],
    programmes: [
      { rank: 1, uni: 'NMIMS Global Access', fee: 'Rs 2.5 L', duration: '24 months', batch: 'Sep 2026', approval: 'UGC-DEB, AICTE', strength: 'Brand, marketing depth' },
      { rank: 2, uni: 'Amity University Online', fee: 'Rs 1.9 L', duration: '24 months', batch: 'Quarterly', approval: 'UGC-DEB', strength: 'Digital marketing exposure' },
      { rank: 3, uni: 'Symbiosis Centre for Online Learning', fee: 'Rs 2.3 L', duration: '24 months', batch: 'Jul 2026', approval: 'UGC-DEB', strength: 'Strong industry relevance' },
      { rank: 4, uni: 'Manipal University Online', fee: 'Rs 1.7 L', duration: '24 months', batch: 'Rolling', approval: 'UGC-DEB, NAAC A++', strength: 'Balanced fee and brand' },
    ],
    fitPoints: [
      'You want a management degree that improves your profile for product, growth, or brand roles',
      'You are already working in sales, marketing, operations, or digital teams and want a promotion',
      'You want to learn strategy, brand building, analytics, and customer behaviour in one degree',
    ],
    fitPointsNo: [
      'You want a campus-based MBA with placement drives and full-time networking',
      'You want a very low-fee programme and are not focused on career mobility',
      'You want a degree purely for credential value and not for practical skill growth',
    ],
    outcomes: [
      { label: 'Entry-level growth', value: 'Marketing roles in D2C, growth, digital, and brand teams' },
      { label: 'Career switch', value: 'Strong fit for sales, business development, and product marketing transitions' },
      { label: 'Salary uplift', value: 'Many working professionals see faster promotion and a stronger pay band' },
    ],
    questions: [
      { q: 'Is this degree valid for government jobs?', a: 'Only if the university is UGC-DEB approved. Always verify the current approval status before you apply.' },
      { q: 'Is it better than a regular MBA?', a: 'For working professionals, an online MBA usually offers the best balance of flexibility, cost, and career continuity.' },
      { q: 'Does the programme include digital marketing?', a: 'Most leading online MBA programmes include digital marketing, data analytics, and growth modules in the core or elective structure.' },
    ],
    faqs: [
      { q: 'What is the difference between online MBA and distance MBA in Marketing?', a: 'Online MBA usually provides a more modern learning experience with live classes, recorded content, and stronger digital engagement. Distance MBA is more self-paced and may offer fewer live interactions.' },
      { q: 'Can I pursue this while working full-time?', a: 'Yes. Most online MBA programmes are designed for working professionals and support flexible study schedules with weekend or evening sessions.' },
      { q: 'How soon can I apply?', a: 'Most universities accept applications year-round or in quarterly intakes. The fastest route is to compare the programme, eligibility, and fee before applying.' },
    ],
    updated: 'Updated July 2026',
    dateModified: '2026-07-25',
  },
  finance: {
    slug: 'finance',
    eyebrow: 'STUDY IN INDIA - ONLINE MBA IN FINANCE',
    title: 'Online MBA in Finance for Working Professionals',
    metaTitle: 'Online MBA in Finance | Compare Programmes | CollegeNCourses',
    metaDescription:
      'Compare online MBA in Finance programmes for working professionals. Get fee guidance, eligibility details, and programme comparisons for your next move.',
    answerCapsule:
      'An Online MBA in Finance is designed for professionals who want stronger business decision-making, financial analysis, and leadership capacity without pausing their career. It is a practical route to grow into finance, banking, and strategic business roles.',
    description:
      'Compare online MBA programmes in Finance with admissions support, fee guidance, and practical career fit. Built for Google Search and lead-gen campaigns aimed at ambitious working professionals.',
    stats: [
      { label: 'Programmes compared', value: '18+ online MBA tracks' },
      { label: 'Typical fee range', value: 'Rs 1.1 L to Rs 2.6 L' },
      { label: 'Best for', value: 'Finance, operations, consulting, and business roles' },
      { label: 'Admission mode', value: 'Fast online application and guidance' },
    ],
    programmes: [
      { rank: 1, uni: 'NMIMS Global Access', fee: 'Rs 2.5 L', duration: '24 months', batch: 'Sep 2026', approval: 'UGC-DEB', strength: 'Strong brand and finance depth' },
      { rank: 2, uni: 'Amity University Online', fee: 'Rs 1.8 L', duration: '24 months', batch: 'Quarterly', approval: 'UGC-DEB', strength: 'Good value and flexible structure' },
      { rank: 3, uni: 'Manipal University Online', fee: 'Rs 1.7 L', duration: '24 months', batch: 'Rolling', approval: 'UGC-DEB', strength: 'Balanced cost and credibility' },
      { rank: 4, uni: 'Symbiosis Centre for Online Learning', fee: 'Rs 2.2 L', duration: '24 months', batch: 'Jul 2026', approval: 'UGC-DEB', strength: 'Industry-ready learning' },
    ],
    fitPoints: [
      'You want stronger finance, budgeting, and strategic decision-making skills',
      'You are working in banking, accounts, operations, or consulting and want faster growth',
      'You want a degree that supports transition into finance leadership roles',
    ],
    fitPointsNo: [
      'You want a purely theoretical degree without practical business exposure',
      'You are looking for a campus programme with regular placements',
      'You need a very low-cost degree without career progression goals',
    ],
    outcomes: [
      { label: 'Career growth', value: 'Finance manager, business analyst, and strategy roles' },
      { label: 'Industry fit', value: 'Strong for BFSI, consulting, operations, and business finance' },
      { label: 'Leadership path', value: 'Useful for professionals aiming for next-level managerial responsibility' },
    ],
    questions: [
      { q: 'Is Finance MBA good for working professionals?', a: 'Yes, especially if you want stronger decision-making, salary growth, and cross-functional visibility.' },
      { q: 'Which universities are best for Finance?', a: 'Top private universities with UGC-DEB approval are usually the best starting point for most professionals.' },
      { q: 'How much does it cost?', a: 'Fees usually range from roughly Rs 1.1 L to Rs 2.6 L depending on the university and structure.' },
    ],
    faqs: [
      { q: 'Can I switch from operations to finance?', a: 'Yes. Many professionals use Finance MBA to move into analytical, planning, and business finance roles.' },
      { q: 'Is it suitable for freshers?', a: 'It can work for fresh graduates, but the strongest fit is usually working professionals who want career acceleration.' },
      { q: 'How long does it take?', a: 'Most online MBA programmes in Finance are completed over 24 months.' },
    ],
    updated: 'Updated July 2026',
    dateModified: '2026-07-25',
  },
}

export function getSpecializationData(slug: string): SpecializationData | undefined {
  return SPECIALIZATION_DATA[slug]
}
