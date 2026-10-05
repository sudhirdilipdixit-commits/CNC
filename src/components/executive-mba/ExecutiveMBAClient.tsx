'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  { rank: 1, uni: 'NMIMS School of Business Management', prog: 'Executive MBA', mode: 'Weekend + Residency', duration: '15 mo', fee: 'Rs 9.5 L', rating: '4.7', batch: 'Jun 2026', accred: 'AICTE, NAAC A++' },
  { rank: 2, uni: 'Symbiosis Institute of Business Management', prog: 'Executive MBA', mode: 'Weekend + Residency', duration: '15 mo', fee: 'Rs 8.5 L', rating: '4.6', batch: 'May 2026', accred: 'AICTE, NAAC A++' },
  { rank: 3, uni: 'Welingkar Institute of Management', prog: 'Executive MBA', mode: 'Weekend', duration: '18 mo', fee: 'Rs 6.5 L', rating: '4.5', batch: 'Jul 2026', accred: 'AICTE' },
  { rank: 4, uni: 'Great Lakes Institute of Management', prog: 'PGPM (Executive)', mode: 'Weekend + Residency', duration: '13 mo', fee: 'Rs 11 L', rating: '4.6', batch: 'Apr 2026', accred: 'AICTE, NAAC A+' },
  { rank: 5, uni: 'ICFAI Business School (IBS)', prog: 'Executive MBA', mode: 'Weekend', duration: '18 mo', fee: 'Rs 5.5 L', rating: '4.3', batch: 'Jun 2026', accred: 'UGC, AICTE' },
  { rank: 6, uni: 'Manipal Academy of Higher Education', prog: 'Executive MBA', mode: 'Weekend + Online', duration: '15-18 mo', fee: 'Rs 4.5 L', rating: '4.4', batch: 'Quarterly', accred: 'UGC, NAAC A++' },
  { rank: 7, uni: 'Amity University', prog: 'Executive MBA', mode: 'Weekend', duration: '18 mo', fee: 'Rs 3.8 L', rating: '4.2', batch: 'Quarterly', accred: 'UGC' },
  { rank: 8, uni: 'Jain University (Centre for Management Studies)', prog: 'Executive MBA', mode: 'Weekend', duration: '15 mo', fee: 'Rs 3.5 L', rating: '4.2', batch: 'Rolling', accred: 'UGC' },
]

const FAQS = [
  {
    q: 'What is the minimum work experience required for an Executive MBA?',
    a: 'Most Executive MBA programmes in India require a minimum of 3 years of full-time, post-qualification work experience, though some accept candidates with 2 years. A few premium programmes prefer 5+ years with at least some time in a supervisory or managerial role.',
  },
  {
    q: 'Do I need to take CAT, XAT, or GMAT for an Executive MBA?',
    a: 'Usually no. Most Executive MBA programmes waive entrance exams for experienced candidates and instead evaluate work experience, a personal interview, and sometimes a written statement of purpose. A small number of premium programmes accept GMAT or an institute-specific test as one evaluation input.',
  },
  {
    q: 'How is an Executive MBA different from a Regular MBA?',
    a: 'An Executive MBA is compressed into 12-18 months (versus 24 months for a Regular MBA), is delivered through weekend classes with short campus residencies rather than full-time daily attendance, and is built around case studies and peer learning drawing on participants\' existing work experience rather than a fresher-focused curriculum.',
  },
  {
    q: 'Can I continue working while doing an Executive MBA?',
    a: 'Yes - that is the entire premise of the format. Classes are typically held on weekends (Friday evening to Sunday, roughly twice a month) with 2-4 short campus residencies of 3-5 days each spread across the programme, usually requiring you to take leave only for the residencies.',
  },
  {
    q: 'How much does an Executive MBA cost in India in 2026?',
    a: 'Fees range from about Rs 3.5 lakh to Rs 15 lakh depending on the institute\'s brand positioning, faculty, and residency intensity. Programmes with international residency modules or premium institute branding sit at the higher end of this range.',
  },
  {
    q: 'Does an Executive MBA help with a career switch, or is it mainly for growth within the same field?',
    a: 'Executive MBA is primarily designed for vertical growth (moving into senior management) within your existing industry or function, since admission itself is based on relevant prior experience. For a functional career switch, a Regular MBA or Online MBA with a different specialization is usually more suitable.',
  },
  {
    q: 'Is an Executive MBA worth it compared to a Regular full-time MBA?',
    a: 'If you already have 3+ years of experience and cannot leave your job, Executive MBA lets you earn a postgraduate management qualification and a compressed-timeline promotion-ready credential without a career break. A Regular MBA is generally a better fit for candidates under 2 years of experience who can take a two-year break and want full-time campus placements.',
  },
]

export default function ExecutiveMBAClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('executive-mba')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'executive-mba') => {
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
            <a href="/study-in-india">Study in India</a>
            <span className="sep">/</span>
            <span className="crumb-current">Executive MBA</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - EXECUTIVE MBA</div>
              <h1 className="h-display h1">Executive MBA in India 2026-27: Accelerated Programmes for Experienced Professionals</h1>

              <div className="answer-capsule">
                An Executive MBA is a 12-18 month postgraduate management programme for professionals with 3+ years of work experience, delivered through weekend classes and short campus residencies. Total fees range from Rs 3.5 lakh to Rs 15 lakh. No daily campus attendance or career break is required.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of Executive MBA programmes across fees, format, residency requirements, and career outcomes for experienced professionals. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('executive-mba-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>

              <div className="trust-strip">
                <span>700+ Executive MBA candidates guided since 2023</span>
                <span className="sep">·</span>
                <span>AICTE and UGC recognised institutes</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right Executive MBA for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 3.5 L - Rs 15 L</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>12-18 months</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Format:</span>
                    <strong>Weekend classes + short residencies</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Graduate with 3+ years experience</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('executive-mba-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>

          <div className="toc-box">
            <h4>What is in this guide</h4>
            <ol>
              <li><a href="#compare">Top Executive MBA programmes compared</a></li>
              <li><a href="#eligibility">Eligibility and admission requirements</a></li>
              <li><a href="#curriculum">What an Executive MBA teaches in 2026</a></li>
              <li><a href="#outcomes">Career outcomes and salary data</a></li>
              <li><a href="#who">Is Executive MBA right for you?</a></li>
              <li><a href="#questions">Questions to ask before applying</a></li>
              <li><a href="#faq">Frequently asked questions</a></li>
            </ol>
          </div>
        </div>
      </section>

      {/* Section 1: Comparison Table */}
      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="eyebrow">PROGRAMME COMPARISON</div>
          <h2 className="h-display h2">Top Executive MBA programmes in India 2026-27</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Institute and Programme</th>
                  <th>Format</th>
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
            Fees shown are total programme fees and exclude residency travel and accommodation. Ratings are based on CollegeNCourses alumni survey 2026.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="#" className="btn btn-secondary btn-sm">Browse all Executive MBA programmes on portal {ARROW}</a>
          </div>
        </div>
      </section>

      {/* Section 2: Eligibility */}
      <section className="section-lp" id="eligibility">
        <div className="container">
          <div className="eyebrow">ELIGIBILITY AND ADMISSION</div>
          <h2 className="h-display h2">Who can apply for an Executive MBA?</h2>
          <hr className="section-rule" />
          <p>
            Executive MBA admission is built around professional experience rather than entrance exam scores. Here are the standard requirements across most Indian institutes.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { label: 'Education', value: "Bachelor's degree in any stream from a recognised university" },
              { label: 'Work experience', value: '3+ years full-time (2 years accepted at some institutes)' },
              { label: 'Entrance exam', value: 'Usually waived. A personal interview and SOP are standard instead.' },
              { label: 'Marks', value: 'Minimum 50% aggregate in graduation at most institutes' },
              { label: 'Age', value: 'No formal upper limit; most candidates are 26-40 years' },
              { label: 'Admission process', value: 'Application, work-experience evaluation, personal interview, and offer within 3-6 weeks' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">Admission intakes in 2026</div>
            <p>Most Executive MBA programmes run one or two intakes a year, typically starting in April-June. A few institutes (Manipal, Jain) accept rolling or quarterly admissions. Because interviews and work-experience evaluation take time, applying 2-3 months before your target intake is advisable.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Curriculum */}
      <section className="section-lp section-lp-alt" id="curriculum">
        <div className="container">
          <div className="eyebrow">2026 CURRICULUM</div>
          <h2 className="h-display h2">What does an Executive MBA actually teach in 2026?</h2>
          <hr className="section-rule" />
          <p>
            Executive MBA curricula assume prior work experience and spend less time on fundamentals, focusing instead on strategic decision-making, leadership, and case-based learning drawing on peers' real work situations.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Strategic Management and Leadership',
              'Corporate Finance',
              'Managerial Economics',
              'Business Analytics and Decision-Making',
              'Negotiation and Change Management',
              'Operations and Supply Chain Strategy',
              'Digital Transformation',
              'Capstone Project (with residency)',
            ].map(subject => (
              <div key={subject} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--charcoal)' }}>
                <span style={{ color: 'var(--yellow)', fontWeight: 700, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>+</span>
                <span>{subject}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <h3 className="h-display h3" style={{ marginBottom: 16 }}>Electives and focus tracks in 2026</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['General Management', 'Finance', 'Marketing', 'Operations and Strategy', 'Business Analytics', 'Leadership and HR', 'Technology Management'].map(s => (
                <span key={s} style={{ background: 'var(--pale-navy)', color: 'var(--navy)', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">About the residency component</div>
            <p>Most Executive MBA programmes require 2-4 short on-campus residencies of 3-5 days each, usually including the orientation, a mid-programme leadership module, and the capstone presentation. Confirm residency dates, location, and whether travel/accommodation is included in the quoted fee before enrolling.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Career outcomes */}
      <section className="section-lp" id="outcomes">
        <div className="container">
          <div className="eyebrow">CAREER OUTCOMES</div>
          <h2 className="h-display h2">What Executive MBA graduates earn (2026 data)</h2>
          <hr className="section-rule" />
          <p style={{ marginBottom: 6, fontSize: 14, color: 'var(--grey)' }}>
            Source: CollegeNCourses 2026 Alumni Survey, Executive MBA graduates
          </p>

          <div className="salary-chart">
            {[
              { role: 'Senior Manager (pre-EMBA)', avg: 'Rs 14 L', range: 'Rs 10 - 18 L', width: '35%' },
              { role: 'Senior Manager / Head (post-EMBA)', avg: 'Rs 20 L', range: 'Rs 15 - 28 L', width: '55%' },
              { role: 'AVP / GM', avg: 'Rs 30 L', range: 'Rs 22 - 42 L', width: '75%' },
              { role: 'VP / Director and above', avg: 'Rs 45 L', range: 'Rs 32 - 80 L', width: '95%' },
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
            Executive MBA graduates in our survey reported a 32% average salary and role-level uplift within 24 months of completion - the highest uplift across all management programme modes we track, reflecting the experience base participants already bring in.
          </p>
        </div>
      </section>

      {/* Section 5: Is it right for you */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="eyebrow">IS THIS FOR YOU?</div>
          <h2 className="h-display h2">Is an Executive MBA right for you?</h2>
          <hr className="section-rule" />
          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>This fits if you are...</h4>
              <ul className="fit-list">
                <li>A professional with 3+ years of experience aiming for a senior management or leadership role</li>
                <li>Unable or unwilling to take a career break for a full-time MBA</li>
                <li>Looking for peer learning from a cohort of similarly experienced professionals</li>
                <li>Seeking a compressed 12-18 month timeline rather than a full 2-year programme</li>
                <li>Able to commit to weekend classes and a few multi-day campus residencies</li>
              </ul>
            </div>
            <div className="fit-box fit-no">
              <h4>This may not fit if you are...</h4>
              <ul className="fit-list">
                <li>A fresh graduate with under 2 years of experience - consider Regular or Online MBA instead</li>
                <li>Looking for a lower-cost flexible option - consider Online or Distance MBA</li>
                <li>Hoping for full-time campus placement support - Executive MBA assumes you retain your current employer</li>
                <li>Unable to commit weekends consistently over 12-18 months</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which programme fits your profile and experience level?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('executive-mba-fit')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Questions to ask */}
      <section className="section-lp" id="questions">
        <div className="container">
          <div className="eyebrow">BEFORE YOU APPLY</div>
          <h2 className="h-display h2">5 questions to ask before choosing an Executive MBA</h2>
          <hr className="section-rule" />
          <div className="questions-list">
            {[
              {
                q: 'What is the exact weekend and residency schedule for the full programme?',
                a: 'Ask for a term-wise calendar, not just a generic "alternate weekends" description. Confirm residency dates fall outside your work\'s peak season, and whether they are mandatory for programme completion.',
              },
              {
                q: 'Is work-experience evaluation flexible, or strictly based on years in a specific role?',
                a: 'Some institutes weight leadership scope and industry relevance over raw years of experience. If you are close to the minimum threshold, ask directly whether your specific profile would be considered.',
              },
              {
                q: 'What is the complete fee breakdown, including residency travel and accommodation?',
                a: 'Programme fees often exclude residency travel, accommodation, and certain elective modules. Ask for an itemised, all-inclusive fee schedule before enrolling - the gap between quoted and actual cost can be substantial.',
              },
              {
                q: 'Does the institute offer placement or career-transition support for Executive MBA candidates?',
                a: 'Most Executive MBA programmes assume you retain your current employer and do not offer campus placements. A few institutes do offer light-touch career coaching or an alumni network - confirm what, if anything, is included.',
              },
              {
                q: 'How is the programme structured if I need to miss a residency due to work commitments?',
                a: 'Ask about the institute\'s policy for missed residencies - whether there is a makeup session, a different cohort\'s residency you can join, or a hard requirement that could delay your graduation.',
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
      </section>

      {/* Section 7: FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">Executive MBA: common questions answered</h2>
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
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <h2>Ready to find your Executive MBA?</h2>
          <p>Get a personalised shortlist of Executive MBA programmes matched to your experience, goals, and schedule. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('executive-mba-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
