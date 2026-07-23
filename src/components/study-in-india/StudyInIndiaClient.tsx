'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  {
    mode: 'Online',
    title: 'Online MBA',
    href: '/online-mba',
    tagline: 'Full MBA via internet. No campus attendance. Designed for working professionals.',
    fee: 'Rs 1L - 6.5L',
    duration: '24 months',
    ideal: 'Working professionals, flexible learners',
  },
  {
    mode: 'Distance',
    title: 'Distance MBA',
    href: '/distance-mba',
    tagline: 'Study material based learning. Exam centres near you. Most affordable UGC-DEB mode.',
    fee: 'Rs 50K - 3L',
    duration: '24-36 months',
    ideal: 'Cost-conscious, self-paced learners',
  },
  {
    mode: 'Executive',
    title: 'Executive MBA',
    href: '/executive-mba',
    tagline: 'Accelerated MBA for experienced professionals. Weekend sessions and short residencies.',
    fee: 'Rs 3L - 15L',
    duration: '12-18 months',
    ideal: 'Professionals with 3+ years experience',
  },
  {
    mode: 'Regular',
    title: 'Regular MBA',
    href: '/regular-mba',
    tagline: 'Full-time campus MBA. Placement drives, campus life, and structured peer network.',
    fee: 'Rs 2L - 20L',
    duration: '24 months',
    ideal: 'Fresh graduates seeking campus experience',
  },
  {
    mode: 'Design',
    title: 'Design Programmes',
    href: '/design',
    tagline: 'B.Des and M.Des programmes from accredited private design institutes across India.',
    fee: 'Rs 3L - 15L',
    duration: '24-48 months',
    ideal: 'Creative professionals and NID/NIFT aspirants',
  },
]

const MODE_COMPARISON = [
  { feature: 'Duration', online: '24 months', distance: '24-36 months', executive: '12-18 months', regular: '24 months' },
  { feature: 'Fee range', online: 'Rs 1L - 6.5L', distance: 'Rs 50K - 3L', executive: 'Rs 3L - 15L', regular: 'Rs 2L - 20L' },
  { feature: 'Campus attendance', online: 'None required', distance: 'Exam centres only', executive: 'Weekend sessions', regular: 'Full-time' },
  { feature: 'Work while studying', online: 'Yes', distance: 'Yes', executive: 'Yes (recommended)', regular: 'Typically no' },
  { feature: 'Work experience needed', online: 'None', distance: 'None', executive: '3+ years', regular: 'None' },
  { feature: 'Regulatory approval', online: 'UGC-DEB', distance: 'UGC-DEB', executive: 'AICTE / UGC', regular: 'AICTE / UGC / NAAC' },
  { feature: 'Best for', online: 'Professionals, flexible learners', distance: 'Budget-focused, self-paced', executive: 'Senior professionals', regular: 'Campus experience seekers' },
]

const CHOOSER = [
  {
    situation: 'You are working full-time and cannot take a break',
    recommendation: 'Online MBA or Distance MBA',
    reason: 'Both are UGC-DEB approved. No mandatory campus attendance. Study fits around your work schedule.',
    href: '/online-mba',
  },
  {
    situation: 'You have 3 or more years of professional experience',
    recommendation: 'Executive MBA',
    reason: 'Accelerated 12-18 month programmes designed for professionals already in management or senior roles.',
    href: '/executive-mba',
  },
  {
    situation: 'You are a fresh graduate and want campus life and placements',
    recommendation: 'Regular MBA',
    reason: 'Full-time, placement-driven campus MBA with peer network and structured curriculum from AICTE approved institutions.',
    href: '/regular-mba',
  },
  {
    situation: 'Budget is your primary constraint',
    recommendation: 'Distance MBA',
    reason: 'Most affordable UGC-DEB approved mode. Fees from Rs 50,000 for the full programme from accredited private universities.',
    href: '/distance-mba',
  },
  {
    situation: 'You are in a creative field or pursuing design',
    recommendation: 'Design Programmes',
    reason: 'B.Des and M.Des programmes from CEED, NID, and NIFT aligned private design institutes across India.',
    href: '/design',
  },
]

const UNIVERSITIES = [
  'Symbiosis (SCDL), Pune',
  'NMIMS Global Access, Mumbai',
  'Amity University Online, Noida',
  'Manipal (MAHE), Manipal',
  'Jain University (JGI), Bangalore',
  'Lovely Professional University, Punjab',
  'Chandigarh University',
  'Welingkar Institute, Mumbai',
  'ICFAI University, Hyderabad',
  'IMT Centre for Distance Learning',
]

const FAQS = [
  {
    q: 'What is the difference between an online MBA, a distance MBA, and an executive MBA?',
    a: 'Online MBA is delivered via internet with live and recorded sessions, no campus attendance required. Distance MBA uses printed study material and physical exam centres, making it the most affordable mode. Executive MBA is designed for professionals with 3+ years of experience, with shorter duration and weekend sessions. All three can be pursued while working full-time and are regulated by UGC-DEB or AICTE.',
  },
  {
    q: 'Are private university MBAs from India legally recognised by employers?',
    a: 'Yes, provided the university holds the relevant regulatory approval. For online and distance MBAs, UGC-DEB (University Grants Commission - Distance Education Bureau) approval is mandatory. For regular and executive MBAs, AICTE and UGC recognition applies. Always verify the programme\'s current approval status on the official UGC website before applying.',
  },
  {
    q: 'Which management programme is best for working professionals in 2026?',
    a: 'Online MBA is the most popular choice for working professionals because it requires no campus attendance and is designed around 8-12 hours of study per week. Distance MBA is a more affordable alternative with the same legal standing. Executive MBA suits those with 3+ years of experience who want an accelerated, peer-driven programme with some weekend commitment.',
  },
  {
    q: 'Do I need to attend campus for an online or distance MBA?',
    a: 'For online MBA programmes, there is no mandatory campus attendance. Exams are conducted online or at designated centres near you. Distance MBA also requires no campus visits but does require attendance at regional exam centres. Executive MBA and regular MBA require some campus presence, ranging from weekend sessions to full-time attendance respectively.',
  },
  {
    q: 'What is UGC-DEB approval and why does it matter for my MBA?',
    a: 'UGC-DEB (University Grants Commission - Distance Education Bureau) is the Indian government body that authorises universities to offer online and distance programmes. A degree from a UGC-DEB approved programme carries the same legal value as a full-time degree for employment, government jobs, and further study. Without this approval, a degree from that institution has no legal standing.',
  },
  {
    q: 'How much do MBA programmes at private universities in India cost in 2026?',
    a: 'Costs vary by mode and institution. Distance MBA starts from around Rs 50,000 for the full programme. Online MBA ranges from Rs 1 lakh to Rs 6.5 lakh. Executive MBA from Rs 3 lakh to Rs 15 lakh. Regular MBA from Rs 2 lakh to Rs 20 lakh depending on the institution. All prices are for the full programme from UGC-DEB approved private universities.',
  },
]

export default function StudyInIndiaClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('study-in-india')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'study-in-india') => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--mist)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <span className="crumb-current">Study in India</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - OVERVIEW</div>
              <h1 className="h-display h1">Study in India 2026-27: Compare MBA and Management Programmes</h1>

              <div className="answer-capsule">
                Study in India for an MBA or management degree from UGC-DEB approved private universities. Four flexible modes - online, distance, executive, and regular - cover every career stage and budget. Fees start from Rs 1 lakh. All UGC-DEB approved degrees carry the same legal value as a full-time MBA.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of Online MBA, Distance MBA, Executive MBA, Regular MBA, and Design programmes from 150+ accredited private universities in India. Find the right mode for your career stage, schedule, and budget. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('study-in-india-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare modes</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8 / 5</span>
                <span className="sep">·</span>
                <span>3,200+ students guided since 2023</span>
                <span className="sep">·</span>
                <span>150+ UGC-DEB approved universities</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right programme for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Modes available:</span>
                    <strong>Online, Distance, Executive, Regular, Design</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 50,000 to Rs 20 lakh</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>12 to 48 months</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Any graduate (most programmes)</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('study-in-india-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Programme Cards */}
      <section className="section-lp section-lp-alt" id="programmes">
        <div className="container">
          <div className="eyebrow">PROGRAMME TYPES</div>
          <h2 className="h-display h2">Five ways to study management in India</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {PROGRAMMES.map(p => (
              <div className="prog-card" key={p.title}>
                <div className="prog-card-mode">{p.mode}</div>
                <div className="prog-card-title">{p.title}</div>
                <div className="prog-card-tagline">{p.tagline}</div>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{p.fee}</span>
                  <span className="prog-card-badge">{p.duration}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--grey)', marginTop: 4 }}>Best for: {p.ideal}</div>
                <a href={p.href} className="prog-card-link">
                  Explore {p.title} {ARROW}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Comparison Table */}
      <section className="section-lp" id="compare">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">MODE COMPARISON</div>
              <h2 className="h-display h2">Online vs Distance vs Executive vs Regular MBA: side by side</h2>
              <hr className="section-rule" />

              <div className="comp-table-wrap">
                <table className="mode-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Online MBA</th>
                      <th>Distance MBA</th>
                      <th>Executive MBA</th>
                      <th>Regular MBA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODE_COMPARISON.map(row => (
                      <tr key={row.feature}>
                        <td className="mode-feature">{row.feature}</td>
                        <td>{row.online}</td>
                        <td>{row.distance}</td>
                        <td>{row.executive}</td>
                        <td>{row.regular}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--grey)' }}>
                Fee ranges are indicative for UGC-DEB approved private universities in India. Updated July 2026.
              </p>

              <div className="info-card" style={{ marginTop: 24 }}>
                <div className="info-card-title">What UGC-DEB approval means for you</div>
                <p>UGC-DEB (University Grants Commission - Distance Education Bureau) is the Indian government body that certifies universities to offer online and distance programmes. A degree from a UGC-DEB approved programme carries the same legal value as a full-time degree for government employment, private sector jobs, and further study including PhD. Always verify current approval at ugcdeb.ac.in before applying - approvals can lapse.</p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="section-lp section-lp-alt" id="choose">
        <div className="container">
          <div className="eyebrow">HOW TO CHOOSE</div>
          <h2 className="h-display h2">Which programme is right for your situation?</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {CHOOSER.map(item => (
              <div className="chooser-card" key={item.situation}>
                <div className="chooser-label">If you are...</div>
                <div className="chooser-situation">{item.situation}</div>
                <div className="chooser-rec">
                  <strong>{item.recommendation}</strong><br />
                  {item.reason}
                </div>
                <a href={item.href} className="prog-card-link" style={{ marginTop: 14 }}>
                  Learn more {ARROW}
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which mode fits your profile and timeline?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('study-in-india-choose')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="section-lp" id="universities">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">PARTNER UNIVERSITIES</div>
              <h2 className="h-display h2">Accredited private universities on our comparison platform</h2>
              <hr className="section-rule" />
              <p>
                CollegeNCourses compares programmes from UGC-DEB approved private universities in India. Every institution is verified against the current UGC-DEB approved list as of July 2026.
              </p>

              <div className="uni-strip">
                {UNIVERSITIES.map(u => (
                  <div className="uni-badge" key={u}>{u}</div>
                ))}
              </div>

              <div className="info-card" style={{ marginTop: 28 }}>
                <div className="info-card-title">Why we compare private universities only</div>
                <p>Private universities must obtain and maintain UGC-DEB approval, NAAC accreditation, and AICTE recognition, and are audited regularly against published standards. Their admission processes, fee structures, and student support services are consistent and transparent. We compare private universities because that is where the majority of distance and online MBA admissions take place and where students can make apples-to-apples fee and quality comparisons.</p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="h-display h2">Study in India: common questions answered</h2>
              <hr className="section-rule" />
              <div className="faq-list">
                {FAQS.map((item, i) => (
                  <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden="true">{openFaq === i ? '-' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="faq-answer">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <h2>Ready to find your Management Programme in India?</h2>
          <p>Get a personalised shortlist of UGC-DEB approved private university programmes matched to your profile, goals, and budget. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('study-in-india-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
