'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  { rank: 1, uni: 'IGNOU (Indira Gandhi National Open University)', prog: 'MBA (Distance)', mode: 'Distance', duration: '24-36 mo', fee: 'Rs 50,000', rating: '4.3', batch: 'Jan / Jul 2026', accred: 'Central Univ., AICTE' },
  { rank: 2, uni: 'Annamalai University (DDE)', prog: 'MBA', mode: 'Distance', duration: '24 mo', fee: 'Rs 60,000', rating: '4.2', batch: 'Jan / Jul 2026', accred: 'UGC-DEB' },
  { rank: 3, uni: 'YCMOU (Yashwantrao Chavan Maharashtra Open University)', prog: 'MBA', mode: 'Distance', duration: '24-36 mo', fee: 'Rs 65,000', rating: '4.1', batch: 'Jul 2026', accred: 'UGC-DEB' },
  { rank: 4, uni: 'Dr. B.R. Ambedkar Open University', prog: 'MBA', mode: 'Distance', duration: '24-36 mo', fee: 'Rs 70,000', rating: '4.1', batch: 'Jan / Jul 2026', accred: 'UGC-DEB' },
  { rank: 5, uni: 'Madurai Kamaraj University (IDE)', prog: 'MBA', mode: 'Distance', duration: '24 mo', fee: 'Rs 75,000', rating: '4.2', batch: 'Jul 2026', accred: 'UGC-DEB' },
  { rank: 6, uni: 'Sikkim Manipal University (DE)', prog: 'MBA', mode: 'Distance', duration: '24 mo', fee: 'Rs 1.1 L', rating: '4.3', batch: 'Quarterly', accred: 'UGC-DEB' },
  { rank: 7, uni: 'Netaji Subhas Open University', prog: 'MBA', mode: 'Distance', duration: '24-36 mo', fee: 'Rs 80,000', rating: '4.0', batch: 'Jan / Jul 2026', accred: 'UGC-DEB' },
  { rank: 8, uni: 'ICFAI University (Distance Mode)', prog: 'MBA', mode: 'Distance', duration: '24 mo', fee: 'Rs 1.8 L', rating: '4.3', batch: 'Quarterly', accred: 'UGC-DEB' },
]

const FAQS = [
  {
    q: 'Is a distance MBA recognised by employers in India?',
    a: 'Yes, provided the university holds current UGC-DEB (University Grants Commission - Distance Education Bureau) approval. A UGC-DEB approved distance MBA carries the same legal value as a full-time MBA from the same institution, for private employment, government jobs, and further study. Always verify approval status on ugcdeb.ac.in before enrolling.',
  },
  {
    q: 'What is the difference between a distance MBA and an online MBA?',
    a: 'Both are UGC-DEB approved flexible modes, but delivery differs. Distance MBA relies primarily on printed or downloadable study material, with physical exam centres and limited live interaction - this makes it the most affordable mode. Online MBA uses live and recorded internet sessions with a more digital, interactive learning environment, usually at a higher fee.',
  },
  {
    q: 'Do I need to attend campus for a distance MBA?',
    a: 'No. There is no mandatory campus attendance for a distance MBA. You do need to appear for exams at a designated regional exam centre (or, at some universities, via online proctored exams), typically twice a year.',
  },
  {
    q: 'What is the minimum eligibility for a distance MBA?',
    a: 'A bachelor\'s degree in any discipline from a recognised university. Most universities accept a minimum of 45-50% aggregate in graduation. There is no upper age limit, and prior work experience is not mandatory.',
  },
  {
    q: 'How much does a distance MBA cost in 2026?',
    a: 'Fees range from around Rs 50,000 (IGNOU) to roughly Rs 3 lakh for the full programme, depending on the university and specialization. This makes distance MBA the most affordable UGC-DEB approved postgraduate management route in India.',
  },
  {
    q: 'Is UGC-DEB approval mandatory for a distance MBA?',
    a: 'Yes. Only institutions with current UGC-DEB approval are permitted to offer distance degree programmes in India. A degree from an institution without this approval has no legal standing and will not be accepted for government jobs, PSU recruitment, or further academic admission.',
  },
  {
    q: 'How are exams conducted in a distance MBA?',
    a: 'Most universities conduct term-end exams at designated regional study centres, typically in June and December. A growing number of universities now also offer online proctored exams for select terms - confirm the exact exam mode with your shortlisted university before applying.',
  },
  {
    q: 'Can I switch from a distance MBA to a regular or online MBA later?',
    a: 'A completed distance MBA stands as a full postgraduate qualification on its own - there is no "upgrade" pathway, but it is accepted as equivalent for jobs, promotions, and most further academic admissions (including PhD, subject to the admitting institution\'s own criteria), provided the originating university is UGC-DEB approved.',
  },
]

export default function DistanceMBAClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('distance-mba')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'distance-mba') => {
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
            <span className="crumb-current">Distance MBA</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - DISTANCE MBA</div>
              <h1 className="h-display h1">Distance MBA in India 2026-27: The Most Affordable UGC-DEB Approved Mode</h1>

              <div className="answer-capsule">
                A Distance MBA in India is a UGC-DEB approved postgraduate management degree completed through printed or downloadable study material and periodic exam centre visits. It is the most affordable flexible MBA mode, with total fees from Rs 50,000 to Rs 3 lakh. The degree carries the same legal value as a full-time MBA.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of distance MBA programmes across fees, study material quality, exam centres, and accreditation. All data verified against the current UGC-DEB approved list. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('distance-mba-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>

              <div className="trust-strip">
                <span>900+ distance MBA alumni guided since 2023</span>
                <span className="sep">·</span>
                <span>UGC-DEB approved universities only</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right Distance MBA for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 50,000 - Rs 3 L</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>24-36 months</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Campus attendance:</span>
                    <strong>None (exam centres only)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Any graduate, min 45-50%</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('distance-mba-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>

          <div className="toc-box">
            <h4>What is in this guide</h4>
            <ol>
              <li><a href="#compare">Top distance MBA programmes compared</a></li>
              <li><a href="#eligibility">Eligibility and admission requirements</a></li>
              <li><a href="#curriculum">What a distance MBA teaches in 2026</a></li>
              <li><a href="#outcomes">Career outcomes and salary data</a></li>
              <li><a href="#who">Is distance MBA right for you?</a></li>
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
          <h2 className="h-display h2">Top Distance MBA programmes in India 2026-27</h2>
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
            All programmes verified against the UGC-DEB approved list as of July 2026. Fees shown are total programme fees and exclude exam centre charges. Ratings are based on CollegeNCourses alumni survey 2026.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="#" className="btn btn-secondary btn-sm">Browse all distance MBA programmes on portal {ARROW}</a>
          </div>
        </div>
      </section>

      {/* Section 2: Eligibility */}
      <section className="section-lp" id="eligibility">
        <div className="container">
          <div className="eyebrow">ELIGIBILITY AND ADMISSION</div>
          <h2 className="h-display h2">Who can apply for a Distance MBA?</h2>
          <hr className="section-rule" />
          <p>
            Distance MBA programmes are designed to be the most accessible postgraduate management route, with minimal entry barriers. Here are the standard requirements across most UGC-DEB approved universities.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { label: 'Education', value: "Bachelor's degree in any stream from a recognised university" },
              { label: 'Marks', value: 'Minimum 45-50% aggregate (varies by university)' },
              { label: 'Entrance exam', value: 'Not required at most universities. Direct admission on eligibility.' },
              { label: 'Work experience', value: 'Not mandatory for admission.' },
              { label: 'Age limit', value: 'No upper age limit for any UGC-DEB approved distance MBA.' },
              { label: 'Admission process', value: 'Online or offline application, document verification, and fee payment - usually completed within 7-10 days.' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">Admission intakes in 2026</div>
            <p>Most distance MBA universities run two fixed intakes a year - January and July. IGNOU, Annamalai, and the state open universities follow this cycle strictly. A few universities (Sikkim Manipal, ICFAI) accept quarterly admissions. Missing an intake usually means waiting up to six months for the next one, so apply early.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Curriculum */}
      <section className="section-lp section-lp-alt" id="curriculum">
        <div className="container">
          <div className="eyebrow">2026 CURRICULUM</div>
          <h2 className="h-display h2">What does a Distance MBA actually teach in 2026?</h2>
          <hr className="section-rule" />
          <p>
            A standard distance MBA covers the same core management disciplines as a full-time MBA, delivered through study material, assignments, and periodic contact classes where available.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Managerial Economics',
              'Financial Accounting and Analysis',
              'Marketing Management',
              'Human Resource Management',
              'Operations Management',
              'Business Statistics',
              'Organisational Behaviour',
              'Strategic Management (capstone)',
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
              {['Marketing', 'Finance', 'Human Resources', 'Operations', 'Banking and Financial Services', 'Rural Management', 'International Business', 'Information Technology'].map(s => (
                <span key={s} style={{ background: 'var(--pale-navy)', color: 'var(--navy)', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">What to check before enrolling</div>
            <p>Study material format and update frequency vary significantly between universities - some provide print-only material updated every few years, others provide digital material with an LMS login and periodic revisions. Ask to see a sample module and confirm how recently the syllabus was updated before paying your fee.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Career outcomes */}
      <section className="section-lp" id="outcomes">
        <div className="container">
          <div className="eyebrow">CAREER OUTCOMES</div>
          <h2 className="h-display h2">What distance MBA graduates earn (2026 data)</h2>
          <hr className="section-rule" />
          <p style={{ marginBottom: 6, fontSize: 14, color: 'var(--grey)' }}>
            Source: CollegeNCourses 2026 Alumni Survey, distance MBA graduates
          </p>

          <div className="salary-chart">
            {[
              { role: 'Executive / Junior Officer', avg: 'Rs 4 L', range: 'Rs 3 - 5.5 L', width: '18%' },
              { role: 'Manager / Team Lead', avg: 'Rs 8 L', range: 'Rs 6 - 11 L', width: '38%' },
              { role: 'Senior Manager / Head', avg: 'Rs 15 L', range: 'Rs 11 - 22 L', width: '60%' },
              { role: 'VP / Director / GM', avg: 'Rs 28 L', range: 'Rs 20 - 45 L', width: '80%' },
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
            Distance MBA graduates in our survey reported a 20% average salary uplift within 18 months of completion - slightly lower than online MBA uplifts, which our data attributes to fewer graduates pursuing analytics-heavy specializations in distance mode.
          </p>
        </div>
      </section>

      {/* Section 5: Is it right for you */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="eyebrow">IS THIS FOR YOU?</div>
          <h2 className="h-display h2">Is a Distance MBA right for you?</h2>
          <hr className="section-rule" />
          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>This fits if you are...</h4>
              <ul className="fit-list">
                <li>Budget-conscious and want the lowest-cost UGC-DEB approved MBA route</li>
                <li>A working professional who prefers self-paced study over fixed live sessions</li>
                <li>Based in a location with limited internet access but a nearby exam centre</li>
                <li>Looking for a postgraduate degree primarily for eligibility, promotion, or government job criteria</li>
                <li>Comfortable studying independently from printed or downloadable material</li>
              </ul>
            </div>
            <div className="fit-box fit-no">
              <h4>This may not fit if you are...</h4>
              <ul className="fit-list">
                <li>Looking for live faculty interaction and a digitally interactive classroom - consider Online MBA</li>
                <li>Wanting peer networking or campus placement support - consider Regular MBA</li>
                <li>Targeting a role where recruiters specifically weight brand-name B-schools - consider Executive MBA</li>
                <li>Uncomfortable with largely self-directed, low-touch learning</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which programme fits your profile and budget?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('distance-mba-fit')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Questions to ask */}
      <section className="section-lp" id="questions">
        <div className="container">
          <div className="eyebrow">BEFORE YOU APPLY</div>
          <h2 className="h-display h2">5 questions to ask before choosing a Distance MBA</h2>
          <hr className="section-rule" />
          <div className="questions-list">
            {[
              {
                q: 'Is the university on the current UGC-DEB approved list?',
                a: 'Verify at ugcdeb.ac.in before paying any fee. The approved list is updated annually, and some programmes lose approval. A degree from an unapproved institution has no legal standing.',
              },
              {
                q: 'How current is the study material, and in what format is it provided?',
                a: 'Ask to see a sample module and confirm the last revision date. Material that has not been updated in several years may not reflect current business practice or examination patterns.',
              },
              {
                q: 'Where are the exam centres, and how often are exams held?',
                a: 'Confirm the nearest exam centre to your location and the exam frequency (most universities hold exams twice a year). Travelling long distances twice a year for exams is a real time and cost commitment - factor it in.',
              },
              {
                q: 'What is the complete fee breakdown, including re-registration and exam fees?',
                a: 'The quoted programme fee often excludes exam fees, late re-registration penalties, and project/viva charges. Ask for a complete, itemised fee schedule in writing before applying.',
              },
              {
                q: 'What support is available if I fail to complete the programme within the standard duration?',
                a: 'Most universities allow a maximum completion window (often double the standard duration) with additional fees for extra years. Confirm this policy and the associated costs before enrolling.',
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
          <h2 className="h-display h2">Distance MBA: common questions answered</h2>
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
          <h2>Ready to find your Distance MBA?</h2>
          <p>Get a personalised shortlist of UGC-DEB approved programmes matched to your profile, goals, and budget. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('distance-mba-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
