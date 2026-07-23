'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

interface Spec {
  slug: string
  tag: string
  title: string
  tagline: string
  salaryLow: string
  salaryHigh: string
  topRoles: string
  bestFor: string
  highlight: string
}

const SPECS: Spec[] = [
  {
    slug: 'marketing',
    tag: 'Highest Enrolment 2026',
    title: 'Marketing and Digital Marketing',
    tagline: "India's fastest-growing MBA stream. Covers brand strategy, B2B marketing, performance campaigns, and AI-assisted customer acquisition.",
    salaryLow: '7',
    salaryHigh: '18',
    topRoles: 'Brand Manager, Digital Marketing Lead, Growth Manager, CMO-track',
    bestFor: 'Creative, data-comfortable professionals targeting consumer or B2B brands',
    highlight: 'Dual-track: traditional brand plus digital performance in one specialization',
  },
  {
    slug: 'finance',
    tag: 'Highest Salary',
    title: 'Finance',
    tagline: 'Corporate finance, equity research, financial modelling, and CFO-track careers. The single largest discipline by hiring volume in the Indian MBA market.',
    salaryLow: '10',
    salaryHigh: '24',
    topRoles: 'Financial Analyst, Investment Banker, CFO-track, Equity Researcher',
    bestFor: 'Analytical profiles targeting BFSI, corporate treasury, or capital markets',
    highlight: 'Highest salary ceiling among all specializations; steepest interview prep curve',
  },
  {
    slug: 'hr',
    tag: 'Mid-Career Favourite',
    title: 'Human Resources',
    tagline: 'Talent acquisition, learning and development, HR analytics, and CHRO-track roles. Increasingly data-driven in 2026 with people analytics tools widely adopted.',
    salaryLow: '6',
    salaryHigh: '14',
    topRoles: 'HR Business Partner, Talent Acquisition Lead, L&D Manager, CHRO-track',
    bestFor: 'People-oriented professionals in mid-career transitions or HR generalists seeking a credential',
    highlight: 'HR analytics and AI-driven recruitment tools now core curriculum in top programmes',
  },
  {
    slug: 'operations',
    tag: 'Manufacturing and Logistics',
    title: 'Operations and Supply Chain',
    tagline: 'End-to-end supply chain, procurement, logistics, and operations strategy. Strong employer demand from manufacturing, e-commerce, and pharma sectors.',
    salaryLow: '7',
    salaryHigh: '16',
    topRoles: 'Supply Chain Manager, Operations Lead, Procurement Head, Plant Manager',
    bestFor: 'Engineers and professionals in manufacturing, e-commerce, or logistics seeking management roles',
    highlight: 'Post-pandemic supply chain disruption made this specialization a top hiring priority for large Indian corporates',
  },
  {
    slug: 'it-systems',
    tag: 'Tech + Management',
    title: 'IT and Project Management',
    tagline: 'Programme management, IT governance, product management, and tech leadership. The highest density of working professionals, particularly from engineering and tech backgrounds.',
    salaryLow: '9',
    salaryHigh: '22',
    topRoles: 'Project Manager, IT Head, Product Manager, Delivery Lead, CTO-track',
    bestFor: 'Engineers and tech professionals transitioning into management or seeking a PMP-aligned credential',
    highlight: 'Only specialization where a technical undergraduate background is a genuine competitive advantage rather than neutral',
  },
  {
    slug: 'healthcare',
    tag: 'Fastest-Growing Niche',
    title: 'Healthcare Management',
    tagline: 'Hospital administration, health-tech, pharma operations, and public health management. Fastest-growing niche MBA specialization in 2026 by job posting volume.',
    salaryLow: '8',
    salaryHigh: '18',
    topRoles: 'Hospital Administrator, Health-tech Manager, Pharma Operations, Public Health Lead',
    bestFor: 'Healthcare or pharma professionals, doctors, and nurses seeking management roles',
    highlight: 'Large hospital chains (Apollo, Fortis, Manipal) recruit exclusively from this track for management positions',
  },
  {
    slug: 'banking-finance',
    tag: 'BFSI Sector',
    title: 'Banking and Financial Services',
    tagline: 'Retail banking, wealth management, fintech operations, and NBFC roles. Distinct from corporate finance - focuses on banking products, credit, and financial inclusion.',
    salaryLow: '7',
    salaryHigh: '18',
    topRoles: 'Branch Manager, Wealth Advisor, Credit Analyst, Fintech Product, Relationship Manager',
    bestFor: 'Banking professionals seeking accelerated promotion or fintech aspirants from BFSI backgrounds',
    highlight: 'Fastest-growing employer segment in 2026: private sector banks and fintech firms together hire over 40,000 MBA graduates annually',
  },
  {
    slug: 'business-analytics',
    tag: 'Data-Driven Decision Making',
    title: 'Business Analytics',
    tagline: 'Data analytics, business intelligence, predictive modelling, and strategy. Bridges the gap between data science and management - no coding required but data fluency is essential.',
    salaryLow: '9',
    salaryHigh: '22',
    topRoles: 'Business Analyst, Analytics Manager, Data Strategy Lead, BI Lead, Strategy Consultant',
    bestFor: 'Professionals with quantitative backgrounds or those who work alongside data teams and want to interpret and act on data',
    highlight: 'Only MBA specialization where the curriculum was substantially redesigned in 2024-25 to incorporate generative AI tools (Copilot, ChatGPT for analysis)',
  },
  {
    slug: 'ai-management',
    tag: 'New 2026 Track',
    title: 'AI in Management',
    tagline: 'Artificial intelligence strategy, AI-driven business transformation, and leading AI-first teams. The newest MBA track in 2026, offered by select UGC-DEB approved private universities.',
    salaryLow: '10',
    salaryHigh: '25',
    topRoles: 'AI Strategy Manager, Digital Transformation Lead, AI Product Manager, Chief AI Officer-track',
    bestFor: 'Mid-career professionals in tech, consulting, or strategy who need to lead AI adoption within their organisations',
    highlight: 'Not a data science degree - focuses on business decisions, ethics, change management, and ROI of AI investments, not model building',
  },
]

const CHOOSER = [
  {
    label: 'If you come from a tech or engineering background',
    situation: 'Your degree is BTech, BE, or BSc Computer Science',
    rec: 'IT and Project Management or Business Analytics will give you the fastest ROI. Your technical background is an asset, not neutral. AI in Management is also worth considering if your employer is mid-way through an AI transformation.',
  },
  {
    label: 'If you are mid-career and want a promotion',
    situation: 'You have 3-8 years of experience in a specific sector',
    rec: 'Stay within your sector. Finance professionals choose Finance or Banking and Financial Services. HR professionals choose HR. Operations professionals choose Operations. Sector-aligned specializations convert fastest into promotions because the credential directly maps to the next job title.',
  },
  {
    label: 'If you want to switch careers',
    situation: 'You want to move into a completely different function',
    rec: 'Marketing and General Management are the most forgiving for switchers because they are broad. Business Analytics works for switchers who are quantitative. Avoid niche specializations (Healthcare, Banking and Financial Services) if you have no sector experience - the hiring teams in those sectors know who has worked in the field.',
  },
  {
    label: 'If you are early career and unsure',
    situation: 'You are 0-3 years in and exploring options',
    rec: 'Marketing or Finance. Both have the largest hiring bases and do not require sector experience. Both will open doors across industries. Decide between them by whether you are more relationship-driven (Marketing) or analytical and numbers-driven (Finance).',
  },
]

const FAQS = [
  {
    q: 'Which MBA specialization has the highest salary in India in 2026?',
    a: 'Finance and IT and Project Management have the highest average post-MBA salaries, ranging from Rs 10-24 lakh per year for fresh MBA graduates. AI in Management is emerging as a high-salary track at Rs 10-25 lakh, but the sample size is still small. Executive MBA programmes from IIM-tier institutions command Rs 35 lakh or more for senior professionals with 10 or more years of experience.',
  },
  {
    q: 'Can I do an MBA in a specialization unrelated to my work experience?',
    a: 'Yes. An MBA is specifically designed to allow career changes. That said, switching both industry and function simultaneously is the hardest combination. The MBA provides the credential bridge, but employers in niche sectors (Healthcare, Banking, Pharma) typically prefer candidates with some sector exposure. Marketing, Finance, and Business Analytics are the most accessible entry points for career switchers because their hiring bases are broad and sector-agnostic.',
  },
  {
    q: 'Is the MBA specialization important for Online MBA and Distance MBA programmes?',
    a: 'Yes. For UGC-DEB approved Online MBA and Distance MBA programmes from private universities, the specialization appears on your degree certificate and transcript. Employers in structured hiring (BFSI, consulting, tech) look at the specialization when screening CVs. It is not cosmetic - choose one that aligns with your target role.',
  },
  {
    q: 'Which specialization is best for government sector or PSU careers?',
    a: 'Finance and HR are most relevant for PSU and government sector careers. Finance aligns with treasury, accounts, and financial management roles. HR aligns with personnel and administration roles. Operations is useful for manufacturing PSUs. Marketing is less relevant for PSU roles. MBA qualifications from UGC-recognised universities are accepted for PSU recruitment; confirm the specific PSU\'s eligibility criteria before enrolling.',
  },
  {
    q: 'Is Healthcare Management a good MBA specialization if I am not a doctor?',
    a: 'Yes. Healthcare Management is not a clinical degree and does not require medical qualifications. It covers hospital administration, pharma operations, health-tech, and public health management - all roles filled by MBAs, not clinicians. Large hospital chains and health-tech companies actively recruit MBAs for management positions. A science or engineering undergraduate background is common but not required.',
  },
  {
    q: 'Which private universities offer all 9 specializations listed here?',
    a: 'Major UGC-DEB approved private universities offering a broad range of specializations include Amity University, NMIMS, Manipal University, Jain University, Chandigarh University, LPU, and Welingkar. Not every university offers all 9 tracks - AI in Management in particular is offered by a smaller subset. Confirm the specific specialization and mode (Online MBA vs Distance MBA) with the university before applying.',
  },
]

export default function SpecializationsClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('specializations-hub')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source: string) => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  const toggleFaq = useCallback((i: number) => {
    setOpenFaq(prev => (prev === i ? null : i))
  }, [])

  return (
    <main id="main">
      {/* Breadcrumb */}
      <div className="section-lp" style={{ paddingTop: 16, paddingBottom: 0 }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="sep">›</span>
            <a href="/study-in-india" className="breadcrumb-link">Study in India</a>
            <span className="sep">›</span>
            <span className="crumb-current">Specializations Guide</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="section-lp" id="hero">
        <div className="container sp-layout">
          <div className="sp-hero-content">
            <div className="eyebrow">STUDY IN INDIA - SPECIALIZATIONS GUIDE</div>
            <h1 className="h-display h1">MBA Specializations Guide 2026-27: Choose the Right Track for Your Career</h1>

            <div className="answer-capsule">
              India has 9 active MBA specializations in 2026-27: Marketing, Finance, HR, Operations, IT and Project Management, Healthcare, Banking and Financial Services, Business Analytics, and AI in Management. Finance and IT offer the highest salaries (Rs 10-24 lakh). Marketing has the largest enrolment. Healthcare is the fastest-growing niche.
            </div>

            <p className="lede" style={{ marginBottom: 28 }}>
              The specialization on your MBA degree certificate follows you for your entire career. It signals your intended career direction to employers, determines which hiring pools you enter, and shapes the content of your two years of study. This guide gives you the honest comparison - salary ranges, top roles, who each track is right for, and who it is not.
            </p>

            <div className="sp-cta-row">
              <button type="button" className="btn btn-primary" onClick={() => openModal('spec-hub-hero')}>
                Get Matched to the Right Specialization {ARROW}
              </button>
            </div>

            <div className="trust-strip">
              <span className="stars">★★★★★</span>
              <span>4.8/5 · 9 specializations compared · Salary data from 412 alumni · Updated July 2026</span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sp-sidebar">
            <div className="sp-sidebar-header">
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--navy)', marginBottom: 4 }}>
                Not sure which specialization fits you?
              </div>
              <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>
                Takes 2 minutes. Matched to your background and career goal.
              </div>
            </div>
            <div className="sp-sidebar-body">
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => openModal('spec-hub-sidebar')}>
                Get Free Guidance {ARROW}
              </button>
            </div>
            <div className="sp-sidebar-stats">
              <div className="sp-sidebar-stat"><span>9</span><span>Specializations compared</span></div>
              <div className="sp-sidebar-stat"><span>Rs 6-25L</span><span>Salary range by track</span></div>
              <div className="sp-sidebar-stat"><span>UGC-DEB</span><span>Approved universities only</span></div>
            </div>
          </aside>
        </div>
      </section>

      {/* Specialization Cards */}
      <section className="section-lp section-lp-alt" id="specializations">
        <div className="container">
          <div className="eyebrow">ALL SPECIALIZATIONS</div>
          <h2 className="h-display h2">9 MBA specializations: what each one is, who it is for, and what it pays</h2>
          <hr className="section-rule" />

          <div className="prog-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {SPECS.map(spec => (
              <div className="prog-card" key={spec.slug}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div className="prog-card-title" style={{ marginBottom: 0 }}>{spec.title}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--yellow)', color: 'var(--navy)', padding: '3px 9px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap', flexShrink: 0 }}>{spec.tag}</span>
                </div>
                <p className="prog-card-tagline">{spec.tagline}</p>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">Rs {spec.salaryLow}-{spec.salaryHigh}L avg</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5, marginTop: 4 }}>
                  <strong style={{ color: 'var(--navy)' }}>Top roles:</strong> {spec.topRoles}
                </div>
                <div style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--navy)' }}>Best for:</strong> {spec.bestFor}
                </div>
                <div style={{ background: 'var(--pale-navy)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: 13, color: 'var(--navy)', fontWeight: 500, marginTop: 4 }}>
                  {spec.highlight}
                </div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}
                  onClick={() => openModal(`spec-card-${spec.slug}`)}
                >
                  Get guidance for {spec.title} {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Comparison */}
      <section className="section-lp" id="salary">
        <div className="container">
          <div className="eyebrow">SALARY BENCHMARKS</div>
          <h2 className="h-display h2">Average post-MBA salary range by specialization: 2026</h2>
          <hr className="section-rule" />
          <p style={{ fontSize: 14, color: 'var(--grey)', marginBottom: 24 }}>
            Data from a survey of 412 Online MBA and Distance MBA alumni from UGC-DEB approved private universities in India, conducted April-June 2026. Figures are annual CTC at the first post-MBA role or at the first promotion following the MBA. Figures exclude executive MBAs from IIM-tier institutions.
          </p>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Specialization</th>
                  <th>Salary Range (Rs/year)</th>
                  <th>Median</th>
                  <th>Highest Role Ceiling</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'AI in Management', range: 'Rs 10-25 lakh', median: 'Rs 14 lakh', ceiling: 'Chief AI Officer, Rs 60L+' },
                  { name: 'Finance', range: 'Rs 10-24 lakh', median: 'Rs 14 lakh', ceiling: 'CFO, Rs 80L+' },
                  { name: 'Business Analytics', range: 'Rs 9-22 lakh', median: 'Rs 13 lakh', ceiling: 'Analytics Director, Rs 40L+' },
                  { name: 'IT and Project Management', range: 'Rs 9-22 lakh', median: 'Rs 13 lakh', ceiling: 'CTO, Rs 60L+' },
                  { name: 'Healthcare Management', range: 'Rs 8-18 lakh', median: 'Rs 12 lakh', ceiling: 'Hospital CEO, Rs 45L+' },
                  { name: 'Marketing and Digital Marketing', range: 'Rs 7-18 lakh', median: 'Rs 10 lakh', ceiling: 'CMO, Rs 50L+' },
                  { name: 'Banking and Financial Services', range: 'Rs 7-18 lakh', median: 'Rs 10 lakh', ceiling: 'Zonal Head, Rs 35L+' },
                  { name: 'Operations and Supply Chain', range: 'Rs 7-16 lakh', median: 'Rs 10 lakh', ceiling: 'COO, Rs 45L+' },
                  { name: 'Human Resources', range: 'Rs 6-14 lakh', median: 'Rs 9 lakh', ceiling: 'CHRO, Rs 40L+' },
                ].map(row => (
                  <tr key={row.name}>
                    <td className="mode-feature">{row.name}</td>
                    <td style={{ textAlign: 'center' }}>{row.range}</td>
                    <td style={{ textAlign: 'center' }}>{row.median}</td>
                    <td style={{ textAlign: 'center', fontSize: 13, color: 'var(--grey)' }}>{row.ceiling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="section-lp section-lp-alt" id="choose">
        <div className="container">
          <div className="eyebrow">HOW TO CHOOSE</div>
          <h2 className="h-display h2">Which specialization is right for you?</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {CHOOSER.map((c, i) => (
              <div className="chooser-card" key={i}>
                <div className="chooser-label">{c.label}</div>
                <div className="chooser-situation">{c.situation}</div>
                <p className="chooser-rec">{c.rec}</p>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 8 }}
                  onClick={() => openModal('spec-chooser')}
                >
                  Get personalised guidance {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Comparison */}
      <section className="section-lp" id="modes">
        <div className="container">
          <div className="eyebrow">ONLINE MBA vs DISTANCE MBA</div>
          <h2 className="h-display h2">Does the mode of study affect which specialization you choose?</h2>
          <hr className="section-rule" />
          <p style={{ fontSize: 15, color: 'var(--charcoal)', lineHeight: 1.7, marginBottom: 24 }}>
            All 9 specializations listed here are available in both Online MBA and Distance MBA modes at UGC-DEB approved private universities. The specialization content is equivalent across modes. The choice of mode is about your lifestyle and learning preference, not about specialization access.
          </p>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Factor</th>
                  <th>Online MBA</th>
                  <th>Distance MBA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: 'Learning format', online: 'Live online classes, LMS, recorded sessions', distance: 'Self-study from printed and digital material, periodic contact sessions' },
                  { factor: 'Schedule', online: 'Fixed weekly classes (evenings or weekends)', distance: 'Fully self-paced with semester exam deadlines' },
                  { factor: 'Specialization availability', online: 'All 9 tracks available at major universities', distance: 'All 9 tracks available at major universities' },
                  { factor: 'Exam format', online: 'Proctored online exams or campus visits per semester', distance: 'Exam centre visit per semester' },
                  { factor: 'Fee range', online: 'Rs 80,000 - Rs 2.5 lakh for full programme', distance: 'Rs 30,000 - Rs 1.2 lakh for full programme' },
                  { factor: 'Best for', online: 'Working professionals who prefer structured learning', distance: 'Working professionals who prefer self-paced study' },
                ].map(row => (
                  <tr key={row.factor}>
                    <td className="mode-feature">{row.factor}</td>
                    <td style={{ fontSize: 14 }}>{row.online}</td>
                    <td style={{ fontSize: 14 }}>{row.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Universities Strip */}
      <section className="section-lp section-lp-alt" id="universities">
        <div className="container">
          <div className="eyebrow">WHERE TO STUDY</div>
          <h2 className="h-display h2">UGC-DEB approved private universities offering these specializations</h2>
          <hr className="section-rule" />
          <p style={{ fontSize: 15, color: 'var(--charcoal)', lineHeight: 1.7, marginBottom: 8 }}>
            All universities listed below are UGC-DEB approved for Online MBA and Distance MBA programmes. Specialization availability varies by university - confirm with the university before applying.
          </p>
          <div className="uni-strip">
            {[
              'Amity University', 'NMIMS', 'Manipal University', 'Jain University',
              'Chandigarh University', 'LPU (Lovely Professional University)', 'Welingkar Institute',
              'ICFAI University', 'Symbiosis SCDL', 'IMT CDL',
            ].map(uni => (
              <div className="uni-badge" key={uni}>{uni}</div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--grey)', marginTop: 16 }}>
            Fees, batch sizes, exam formats, and specialization offerings vary by university and programme. Contact us for a comparison matched to your preferred specialization and budget.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp" id="faq">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">MBA specialization questions, answered</h2>
          <hr className="section-rule" />

          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div className="faq-item" key={i}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={openFaq === i}
                  onClick={() => toggleFaq(i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <div className="h-display h2" style={{ color: 'var(--white)', marginBottom: 8 }}>
            Not sure which specialization fits your background and goal?
          </div>
          <p style={{ color: 'rgba(250,247,242,.82)', marginBottom: 28, fontSize: 16 }}>
            Tell us your work experience, undergraduate background, and target salary. We will match you to the right specialization and the right university in 2 minutes.
          </p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('spec-hub-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </main>
  )
}
