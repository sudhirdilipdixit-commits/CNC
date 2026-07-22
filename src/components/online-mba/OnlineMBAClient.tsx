'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  { rank: 1, uni: 'Symbiosis Centre for Distance Learning', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.8 L', rating: '4.8', batch: 'Aug 2026', accred: 'UGC-DEB' },
  { rank: 2, uni: 'NMIMS Global Access School', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.7 L', rating: '4.7', batch: 'Sep 2026', accred: 'UGC-DEB, AICTE' },
  { rank: 3, uni: 'Amity University Online', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.5 L', rating: '4.6', batch: 'Quarterly', accred: 'UGC-DEB' },
  { rank: 4, uni: 'Manipal Academy of Higher Education', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.4 L', rating: '4.6', batch: 'Quarterly', accred: 'UGC-DEB, NAAC A++' },
  { rank: 5, uni: 'Jain Online (JGI)', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.2 L', rating: '4.5', batch: 'Quarterly', accred: 'UGC-DEB' },
  { rank: 6, uni: 'Lovely Professional University', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.2 L', rating: '4.4', batch: 'Rolling', accred: 'UGC-DEB' },
  { rank: 7, uni: 'Chandigarh University', prog: 'Online MBA', mode: 'Online', duration: '24 mo', fee: 'Rs 1.1 L', rating: '4.4', batch: 'Bi-annual', accred: 'UGC-DEB' },
  { rank: 8, uni: 'IGNOU', prog: 'MBA (Online)', mode: 'Online', duration: '24-48 mo', fee: 'Rs 31,500', rating: '4.2', batch: 'Jul 2026', accred: 'Central Univ., AICTE' },
]

const FAQS = [
  {
    q: 'Is an online MBA from India recognised by employers?',
    a: 'Yes, provided the university is approved by UGC-DEB (University Grants Commission - Distance Education Bureau). A UGC-DEB approved online MBA carries the same legal value as a full-time MBA from the same institution. Always verify approval status on the official UGC website before enrolling.',
  },
  {
    q: 'What is the difference between an online MBA and a distance MBA?',
    a: 'Both are UGC-DEB approved flexible modes, but they differ in delivery. Online MBA uses live and recorded internet sessions, digital assessments, and virtual classrooms. Distance MBA relies on printed study material, physical exam centres, and limited online interaction. Online MBA is increasingly preferred for its digital learning environment.',
  },
  {
    q: 'Can I pursue an online MBA while working full-time?',
    a: 'Yes. This is the primary audience for online MBA programmes. Most are designed around 8-12 hours of study per week, with weekend live sessions and self-paced modules. There is no mandatory campus attendance for online MBA - exams may be conducted at designated centres or online, depending on the university.',
  },
  {
    q: 'What is the minimum eligibility for an online MBA?',
    a: 'A bachelor\'s degree in any discipline from a recognised university is required. Most universities require a minimum 50% aggregate in graduation; some accept 45%. There is no upper age limit. Work experience is not mandatory for an online MBA, unlike Executive MBA programmes.',
  },
  {
    q: 'How much does an online MBA cost in 2026?',
    a: 'Fees range from Rs 31,500 (IGNOU) to approximately Rs 6.5 lakh depending on the institution and specialization. Most reputed private university online MBAs fall between Rs 1 lakh and Rs 2 lakh for the full programme. IIM and IIT affiliated online programmes are priced higher.',
  },
  {
    q: 'Is UGC-DEB approval mandatory for an online MBA?',
    a: 'Yes. Only institutions with UGC-DEB (or earlier UGC-DEC) approval are permitted to offer distance and online degree programmes in India. A degree from an institution without this approval has no legal standing. Check the current approved list at ugcdeb.ac.in before enrolling.',
  },
  {
    q: 'Which specialization has the best career outcome for online MBA?',
    a: 'Business Analytics, Finance, and Marketing consistently show the strongest salary outcomes in our alumni data. Business Analytics in particular has seen a 35% salary uplift on average over the last three years. Healthcare Management and Operations are strong choices for sector-specific growth.',
  },
  {
    q: 'Can I do an online MBA from a foreign university while in India?',
    a: 'Yes. Several foreign universities offer fully online MBA programmes accessible from India. These degrees are awarded by the foreign institution and carry international recognition, but are not regulated by UGC-DEB (which covers Indian institutions only). These are listed under our Study Abroad section.',
  },
]

export default function OnlineMBAClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('online-mba')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'online-mba') => {
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
            <a href="/online-mba">Study in India</a>
            <span className="sep">/</span>
            <span className="crumb-current">Online MBA</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            {/* Left: hero content */}
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - ONLINE MBA</div>
              <h1 className="h-display h1">Online MBA in India 2026-27: Compare 150+ UGC-DEB Approved Programmes</h1>

              <div className="answer-capsule">
                An Online MBA in India is a UGC-DEB approved postgraduate management degree completed via internet. Working professionals study over 24 months with no campus attendance required. Total fees range from Rs 31,500 to Rs 6.5 lakh depending on the university. The degree carries the same legal value as a full-time MBA.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of 150+ online MBA programmes across fees, specializations, accreditation, and career outcomes. All data verified against the current UGC-DEB approved list. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('online-mba-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8 / 5</span>
                <span className="sep">·</span>
                <span>2,400+ online MBA alumni guided since 2023</span>
                <span className="sep">·</span>
                <span>150+ UGC-DEB approved universities</span>
              </div>
            </div>

            {/* Right: sticky sidebar */}
            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right Online MBA for you</h3>
                <p>Free. Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Programmes compared:</span>
                    <strong>150+</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 31,500 - Rs 6.5 L</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>24 months (most programmes)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Any graduate, min 50%</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('online-mba-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
                <p className="sp-sidebar-note">
                  Answer 3 questions and get a matched shortlist of programmes suited to your profile and budget.
                </p>
              </div>
            </aside>
          </div>

          {/* Table of Contents */}
          <div className="sp-layout">
            <div>
              <div className="toc-box">
                <h4>What is in this guide</h4>
                <ol>
                  <li><a href="#compare">Top online MBA programmes compared</a></li>
                  <li><a href="#eligibility">Eligibility and admission requirements</a></li>
                  <li><a href="#curriculum">What an online MBA teaches in 2026</a></li>
                  <li><a href="#outcomes">Career outcomes and salary data</a></li>
                  <li><a href="#who">Is online MBA right for you?</a></li>
                  <li><a href="#questions">Questions to ask before applying</a></li>
                  <li><a href="#faq">Frequently asked questions</a></li>
                </ol>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 1: Comparison Table */}
      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">PROGRAMME COMPARISON</div>
              <h2 className="h-display h2">Top Online MBA programmes in India 2026-27</h2>
              <hr className="section-rule" />

              <div className="comp-table-wrap">
                <table className="comp-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>University and Programme</th>
                      <th>Mode</th>
                      <th>Duration</th>
                      <th>Total Fee</th>
                      <th>Rating</th>
                      <th>Next Batch</th>
                      <th>Approval</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRAMMES.map(p => (
                      <tr key={p.rank}>
                        <td className="rank">{p.rank}</td>
                        <td>
                          <span className="uni-name">{p.uni}</span>
                          <span className="prog-label">{p.prog}</span>
                        </td>
                        <td><span className="mode-tag">{p.mode}</span></td>
                        <td>{p.duration}</td>
                        <td className="fee">{p.fee}</td>
                        <td><span className="stars-sm">★</span> {p.rating}</td>
                        <td>{p.batch}</td>
                        <td><span className="accred-tag">{p.accred}</span></td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => openModal(`table-${p.uni}`)}
                          >
                            Enquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="comp-table-note">
                All programmes verified against the UGC-DEB approved list as of July 2026. Fees shown are total programme fees and exclude exam centre charges. Ratings are based on CollegeNCourses alumni survey 2026 (n = 2,412).
              </p>
              <div style={{ marginTop: 16 }}>
                <a href="#" className="btn btn-secondary btn-sm">Browse all 150+ programmes on portal {ARROW}</a>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 2: Eligibility */}
      <section className="section-lp" id="eligibility">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">ELIGIBILITY AND ADMISSION</div>
              <h2 className="h-display h2">Who can apply for an Online MBA?</h2>
              <hr className="section-rule" />
              <p>
                Online MBA programmes in India are designed for working professionals, though fresh graduates are also eligible. Here are the standard requirements across most UGC-DEB approved universities.
              </p>

              <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {[
                  { label: 'Education', value: "Bachelor's degree in any stream from a recognised university" },
                  { label: 'Marks', value: 'Minimum 50% aggregate (some universities accept 45%)' },
                  { label: 'Entrance exam', value: 'Not required at most universities. Some use an internal aptitude test.' },
                  { label: 'Work experience', value: 'Not mandatory. Executive MBA programmes require 2+ years.' },
                  { label: 'Age limit', value: 'No upper age limit for any UGC-DEB approved online MBA.' },
                  { label: 'Admission process', value: 'Online application, document verification, and fee payment. Some universities hold a merit-based interview.' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="info-card">
                <div className="info-card-title">Admission intakes in 2026</div>
                <p>Most online MBA universities offer quarterly or bi-annual admissions. Symbiosis and NMIMS run fixed annual intakes (typically July/August and January). Amity, Manipal, LPU, and Chandigarh accept rolling admissions year-round. If you missed one intake, the next is usually within 90 days.</p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 3: Curriculum */}
      <section className="section-lp section-lp-alt" id="curriculum">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">2026 CURRICULUM</div>
              <h2 className="h-display h2">What does an Online MBA actually teach in 2026?</h2>
              <hr className="section-rule" />
              <p>
                A standard 24-month online MBA covers eight core management disciplines in the first year, followed by a specialization stream and a capstone project in the second year. Here is what to expect across top programmes.
              </p>

              <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  'Managerial Economics',
                  'Financial Accounting and Analysis',
                  'Marketing Management',
                  'Human Resource Management',
                  'Operations and Supply Chain',
                  'Business Statistics and Analytics',
                  'Organisational Behaviour',
                  'Corporate Strategy (capstone)',
                ].map(subject => (
                  <div key={subject} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--charcoal)' }}>
                    <span style={{ color: 'var(--yellow)', fontWeight: 700, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>+</span>
                    <span>{subject}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <h3 className="h-display h3" style={{ marginBottom: 16 }}>Specializations available in 2026</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['Marketing', 'Finance', 'Human Resources', 'Operations', 'Business Analytics', 'IT and Project Management', 'Healthcare Management', 'Banking and Financial Services', 'International Business', 'AI in Management (new 2026)'].map(s => (
                    <span key={s} style={{ background: 'var(--pale-navy)', color: 'var(--navy)', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-title">What changed in 2026</div>
                <p>Leading online MBA programmes have absorbed three significant updates this year: AI for Business (tools, prompt engineering, and automation in management), Advanced Marketing Analytics with hands-on GA4 and HubSpot training, and Sustainability and ESG Reporting as a core elective. If the programme you are considering does not include at least one of these, ask the university why.</p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 4: Career outcomes */}
      <section className="section-lp" id="outcomes">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">CAREER OUTCOMES</div>
              <h2 className="h-display h2">What online MBA graduates earn (2026 data)</h2>
              <hr className="section-rule" />
              <p style={{ marginBottom: 6, fontSize: 14, color: 'var(--grey)' }}>
                Source: CollegeNCourses 2026 Alumni Survey (n = 2,412 online MBA graduates, 2019-2024 cohorts)
              </p>

              <div className="salary-chart">
                {[
                  { role: 'Management Trainee / Junior Manager', avg: 'Rs 5 L', range: 'Rs 3.5 - 7 L', width: '22%' },
                  { role: 'Manager / Team Lead', avg: 'Rs 9.5 L', range: 'Rs 7 - 14 L', width: '44%' },
                  { role: 'Senior Manager / Head', avg: 'Rs 18 L', range: 'Rs 13 - 26 L', width: '70%' },
                  { role: 'VP / Director / GM', avg: 'Rs 35 L', range: 'Rs 24 - 60 L', width: '92%' },
                ].map(row => (
                  <div className="salary-row" key={row.role}>
                    <div className="salary-label">{row.role}</div>
                    <div className="salary-bar-wrap">
                      <div className="salary-bar" style={{ width: row.width }}>
                        <span>{row.avg}</span>
                      </div>
                    </div>
                    <div className="salary-range">{row.range}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--grey)' }}>
                Working professionals in our survey reported an average 26% salary uplift within 18 months of completing their online MBA. Uplifts were highest in Business Analytics (35%) and Finance (30%) specializations.
              </p>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 5: Is it right for you */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">IS THIS FOR YOU?</div>
              <h2 className="h-display h2">Is an Online MBA right for you?</h2>
              <hr className="section-rule" />
              <div className="fit-grid">
                <div className="fit-box fit-yes">
                  <h4>This fits if you are...</h4>
                  <ul className="fit-list">
                    <li>A working professional wanting a management degree without leaving your job</li>
                    <li>A fresh graduate who cannot relocate for a full-time campus programme</li>
                    <li>Looking to switch functions (for example, from engineering to product management or analytics)</li>
                    <li>Aiming for a promotion into a managerial role within 12-24 months</li>
                    <li>Budget-conscious: fees from Rs 1 lakh, no relocation or living costs</li>
                    <li>Comfortable with self-paced learning and digital collaboration tools</li>
                  </ul>
                </div>
                <div className="fit-box fit-no">
                  <h4>This may not fit if you are...</h4>
                  <ul className="fit-list">
                    <li>Looking for a top-tier B-school brand (IIM, ISB) on your resume - consider Executive MBA</li>
                    <li>Expecting campus placement drives or a residential learning experience</li>
                    <li>Planning a Study Abroad MBA for international career access</li>
                    <li>Struggling with self-discipline - online learning requires consistent self-motivation</li>
                    <li>Looking for a degree that is recognised for immigration purposes (check country-specific rules)</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which programme fits your profile and budget?</p>
                <button type="button" className="btn btn-primary" onClick={() => openModal('online-mba-fit')}>
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 6: Questions to ask */}
      <section className="section-lp" id="questions">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">BEFORE YOU APPLY</div>
              <h2 className="h-display h2">5 questions to ask before choosing an Online MBA</h2>
              <hr className="section-rule" />
              <div className="questions-list">
                {[
                  {
                    q: 'Is the university on the current UGC-DEB approved list?',
                    a: 'Verify at ugcdeb.ac.in - do not rely on the university\'s own website alone. The approved list is updated annually and some programmes lose approval. A degree from an unapproved institution has no legal standing and cannot be used for government jobs or further study.',
                  },
                  {
                    q: 'What is the exact fee structure, including exam and registration charges?',
                    a: 'Programme fees are typically quoted without exam centre fees, library charges, and proctored exam costs. Ask for a complete fee schedule in writing before applying. The difference between quoted and actual cost can be Rs 15,000-40,000 depending on the university.',
                  },
                  {
                    q: 'How are exams conducted and how often are they held?',
                    a: 'Some universities hold exams at physical centres once or twice a year, which can be limiting if you travel frequently. Others offer online proctored exams quarterly. Confirm the exam mode, frequency, and centre locations relevant to where you live or work.',
                  },
                  {
                    q: 'What is the actual live session schedule and time commitment per week?',
                    a: 'Marketing materials say 8-10 hours per week, but ask to see a real semester timetable. Live sessions held on weekday evenings may conflict with work schedules. Weekend-only programmes suit most working professionals. Confirm the schedule before committing.',
                  },
                  {
                    q: 'What support is available after enrollment?',
                    a: 'Ask specifically about academic support (faculty office hours, doubt resolution), career services (if any), alumni network access, and what happens if you need to take a semester break. Good programmes have clear policies; programmes with vague answers on these points are a warning sign.',
                  },
                ].map((item, i) => (
                  <div className="q-item" key={i}>
                    <div className="q-num">{i + 1}</div>
                    <div className="q-body">
                      <h4>{item.q}</h4>
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="h-display h2">Online MBA: common questions answered</h2>
              <hr className="section-rule" />
              <div className="faq-list">
                {FAQS.map((item, i) => (
                  <div
                    key={i}
                    className={`faq-item${openFaq === i ? ' open' : ''}`}
                  >
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
          <h2>Ready to find your Online MBA?</h2>
          <p>Get a personalised shortlist of UGC-DEB approved programmes matched to your profile, goals, and budget. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('online-mba-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
