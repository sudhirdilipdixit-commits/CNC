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
    title: 'MBA Abroad',
    mode: 'For working professionals',
    tagline: 'Two-year general management degree with peer network, internships, and career services. The benchmark international business credential.',
    duration: '12-24 months',
    experience: '2-5 years (most programmes)',
    bestCountries: 'USA, UK, Canada, France',
  },
  {
    title: 'MS / MSc',
    mode: 'For STEM and technical graduates',
    tagline: 'Specialised technical or management degree. Strongest ROI for engineering, analytics, finance, and computer science graduates.',
    duration: '1-2 years',
    experience: 'Fresh graduates eligible',
    bestCountries: 'USA, Germany, Canada, UK',
  },
  {
    title: 'MIM (Master in Management)',
    mode: 'For pre-experience graduates',
    tagline: 'Post-graduate management degree for graduates with limited work experience. Strong in UK and European business schools.',
    duration: '12-18 months',
    experience: '0-2 years',
    bestCountries: 'UK, France, Germany, Ireland',
  },
  {
    title: 'Bachelors Abroad',
    mode: 'After Class 12',
    tagline: 'Undergraduate programme at an international university. Strong career access, international peer network, and post-study work rights.',
    duration: '3-4 years',
    experience: 'After Class 12',
    bestCountries: 'USA, UK, Canada, Australia',
  },
  {
    title: 'PhD / Research',
    mode: 'For master\'s degree holders',
    tagline: 'Doctoral programmes, often fully funded by the university. Research-focused, leading to academic or senior industry roles.',
    duration: '3-5 years',
    experience: 'Master\'s degree usually required',
    bestCountries: 'Germany, USA, UK, Canada',
  },
]

const COMPARE_ROWS = [
  {
    feature: 'Duration',
    mba: '12-24 months',
    ms: '1-2 years',
    mim: '12-18 months',
    bachelors: '3-4 years',
  },
  {
    feature: 'Work experience',
    mba: '2-5 years (most)',
    ms: 'None required',
    mim: '0-2 years',
    bachelors: 'After Class 12',
  },
  {
    feature: 'Average total cost',
    mba: '$80K-$200K',
    ms: '$30K-$100K',
    mim: '$30K-$70K',
    bachelors: '$60K-$160K',
  },
  {
    feature: 'Best countries',
    mba: 'USA, UK, Canada',
    ms: 'USA, Germany, Canada',
    mim: 'UK, France, Germany',
    bachelors: 'USA, UK, Canada, Australia',
  },
  {
    feature: 'GMAT/GRE needed',
    mba: 'GMAT preferred',
    ms: 'GRE (USA/Canada)',
    mim: 'Rarely',
    bachelors: 'SAT (USA) / None',
  },
  {
    feature: 'IELTS/TOEFL',
    mba: 'Yes',
    ms: 'Yes',
    mim: 'Yes',
    bachelors: 'Yes',
  },
  {
    feature: 'Career focus',
    mba: 'Senior management',
    ms: 'Technical specialist',
    mim: 'Entry management',
    bachelors: 'Any field',
  },
]

const CHOOSER = [
  {
    situation: 'You have 2+ years of work experience and want a career switch',
    recommendation: 'MBA Abroad',
    reason: 'USA or UK MBA combines international peer network and career services tailored for career switchers. Top-ranked programmes offer OCI (On Campus Interviews) and alumni networks in your target industry.',
  },
  {
    situation: 'You are a fresh engineering or STEM graduate',
    recommendation: 'MS / MSc',
    reason: 'USA STEM OPT (3 years work post-MS) and Germany (low fees + strong industry) are the strongest options. MS gives a specialisation pathway without the experience requirement or cost of an MBA.',
  },
  {
    situation: 'You are a fresh commerce or business graduate with limited experience',
    recommendation: 'MIM',
    reason: 'UK and French business schools (London Business School, HEC Paris) offer world-ranked MIM programmes for pre-experience candidates. MIM is increasingly recognised by multinationals as equivalent to an MBA for entry-level management roles.',
  },
  {
    situation: 'You want maximum flexibility and are in Class 11 or 12',
    recommendation: 'Bachelors Abroad',
    reason: 'USA liberal arts system, UK 3-year honours, and Canadian co-op programmes each offer a different path to an international career. Starting undergraduate abroad gives 3-4 years of international exposure and post-study work rights in the destination country.',
  },
]

const MATRIX_ROWS = [
  {
    country: 'USA',
    bestFor: 'MBA, MS, CS, Finance',
    advantage: 'STEM OPT 3 years, top rankings',
    tests: 'GMAT (MBA), GRE (MS)',
  },
  {
    country: 'UK',
    bestFor: 'MBA, MSc, MIM, Law',
    advantage: '1-year MBA, Graduate Route visa',
    tests: 'GMAT (MBA), Often waived (MSc)',
  },
  {
    country: 'Canada',
    bestFor: 'MBA, MS, MIM',
    advantage: 'Co-op programmes, PGWP, PR pathway',
    tests: 'Varies by school',
  },
  {
    country: 'Germany',
    bestFor: 'MS, Engineering, STEM',
    advantage: 'Low/no tuition (public), strong industry',
    tests: 'Rarely required',
  },
  {
    country: 'France',
    bestFor: 'MBA, MIM',
    advantage: 'HEC Paris, INSEAD access',
    tests: 'GMAT for MBA, GMAT/None for MIM',
  },
  {
    country: 'Australia',
    bestFor: 'MBA, MS, Accounting',
    advantage: 'Long post-study work visa, G8 unis',
    tests: 'GMAT optional at most schools',
  },
  {
    country: 'Ireland',
    bestFor: 'MBA, MSc, Data Science',
    advantage: 'EU access, English-taught, 24-mo work',
    tests: 'Mostly waived',
  },
]

const FAQS = [
  {
    q: 'Is a 1-year MBA from the UK as valuable as a 2-year MBA from the USA?',
    a: 'The UK 1-year MBA (from schools like London Business School, Said, Judge, or Imperial) is globally recognised and costs significantly less than a 2-year US MBA. For Indian professionals staying in the UK or returning to India, the value is comparable. For US career access specifically, a 2-year US MBA gives more internship cycles and on-campus recruiting access. For European and global roles, a top UK MBA is fully competitive.',
  },
  {
    q: 'Can I switch fields with an MS abroad?',
    a: 'MS programmes are generally specialisation-focused and not designed for career switching the way an MBA is. However, some fields do use MS for switching: an MS in Business Analytics or Data Science can serve as a bridge from engineering to analytics. An MS in Finance can take a non-finance undergraduate into financial roles. For a broad career switch into management, an MBA is more effective.',
  },
  {
    q: 'Does work experience affect my chances of getting into an MS programme?',
    a: 'For most MS programmes, work experience is not required and does not significantly affect admission. The key factors are academic performance (GPA/CGPA), GRE or subject test scores, statement of purpose, and letters of recommendation. Some applied MS programmes in data science or project management value 1-2 years of relevant experience, but it is typically optional. For MBA, work experience is typically mandatory at 2+ years.',
  },
  {
    q: 'What is the difference between MIM and MBA?',
    a: 'MBA (Master of Business Administration) is designed for professionals with 2-5 years of work experience who want to switch careers or move into senior management. MIM (Master in Management) is designed for recent graduates with limited experience who want to enter management. MBA is typically more expensive and longer. MIM is increasingly offered by top European schools including LBS, HEC, ESADE, and RSM. The QS rankings treat MIM and MBA as separate categories.',
  },
  {
    q: 'Are foreign MBA and MS degrees recognised by Indian employers?',
    a: 'Yes. Degrees from accredited international universities are recognised by Indian employers across sectors. The Association of Indian Universities (AIU) issues equivalence certificates for foreign degrees if needed for government jobs or further study in India. Top MBA programmes from USA, UK, Canada, and Europe are preferred by multinationals and large Indian corporations. For technical MS degrees from ranked global universities, the degree is accepted without any equivalence process in the private sector.',
  },
]

export default function ByProgrammeClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('by-programme')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'by-programme') => {
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
            <a href="/study-abroad">Study Abroad</a>
            <span className="sep">/</span>
            <span className="crumb-current">By Programme</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - BY PROGRAMME</div>
              <h1 className="h-display h1">Study Abroad by Programme 2026-27: MBA, MS, MIM, Bachelors, and PhD Compared</h1>

              <div className="answer-capsule">
                International programmes for Indian students include MBA (for working professionals, 1-2 years), MS/MSc (technical specialisation, 1-2 years), MIM (management for fresh graduates, 1 year), and Bachelors (after class 12, 3-4 years). Programme choice determines eligible countries, scholarships, visa type, and post-study work rights. Your career goal and work experience determine the right programme.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Detailed comparison of international programme types for Indian students: eligibility, cost, best countries, test requirements, and career outcomes. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('by-programme-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#programmes" className="btn btn-secondary">Explore programmes</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8 / 5</span>
                <span className="sep">·</span>
                <span>MBA, MS, MIM, Bachelors, PhD</span>
                <span className="sep">·</span>
                <span>7 countries covered</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Programme finder">
              <div className="sp-sidebar-header">
                <h3>Find the right programme for your profile</h3>
                <p>Takes 5 minutes. Personalised shortlist.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Programme types:</span>
                    <strong>MBA, MS, MIM, Bachelors, PhD</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>1 to 4 years</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Class 12 to experienced professionals</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>€500 to $80,000/year</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('by-programme-sidebar')}
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
          <h2 className="h-display h2">Five international programme types for Indian students</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {PROGRAMMES.map(p => (
              <div className="prog-card" key={p.title}>
                <div className="prog-card-mode">{p.mode}</div>
                <div className="prog-card-title">{p.title}</div>
                <div className="prog-card-tagline">{p.tagline}</div>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{p.duration}</span>
                  <span className="prog-card-badge">{p.experience}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--charcoal)', marginBottom: 12 }}>
                  <strong>Best in:</strong> {p.bestCountries}
                </div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => openModal(`prog-${p.title}`)}
                >
                  Explore {p.title} {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Comparison Table */}
      <section className="section-lp" id="compare">
        <div className="container">
          <div className="eyebrow">PROGRAMME COMPARISON</div>
          <h2 className="h-display h2">MBA vs MS vs MIM vs Bachelors: which fits you?</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MBA</th>
                  <th>MS / MSc</th>
                  <th>MIM</th>
                  <th>Bachelors</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(row => (
                  <tr key={row.feature}>
                    <td><strong>{row.feature}</strong></td>
                    <td>{row.mba}</td>
                    <td>{row.ms}</td>
                    <td>{row.mim}</td>
                    <td>{row.bachelors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('by-programme-compare')}>
              Get matched programme shortlist {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* How to Choose Your Programme */}
      <section className="section-lp section-lp-alt" id="choose">
        <div className="container">
          <div className="eyebrow">HOW TO CHOOSE</div>
          <h2 className="h-display h2">Which programme fits your situation?</h2>
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
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal(`choose-${item.recommendation}`)}
                >
                  Get matched shortlist {ARROW}
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which programme fits your profile?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('by-programme-choose')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Country-Programme Matrix */}
      <section className="section-lp" id="matrix">
        <div className="container">
          <div className="eyebrow">COUNTRY-PROGRAMME MATRIX</div>
          <h2 className="h-display h2">Which programmes are strongest in which countries?</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Best For</th>
                  <th>Notable Advantage</th>
                  <th>Typical GMAT/GRE needed</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map(row => (
                  <tr key={row.country}>
                    <td><strong>{row.country}</strong></td>
                    <td>{row.bestFor}</td>
                    <td>{row.advantage}</td>
                    <td>{row.tests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('by-programme-matrix')}>
              Get country and programme guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="h-display h2">International programmes for Indian students: common questions answered</h2>
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
          <h2>Find the right international programme for you.</h2>
          <p>Get a matched shortlist of MBA, MS, and MIM programmes based on your profile, test scores, and budget.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('by-programme-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
