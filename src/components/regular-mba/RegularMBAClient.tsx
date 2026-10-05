'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  { rank: 1, uni: 'Symbiosis Institute of Business Management (SIBM)', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 12 L', rating: '4.7', batch: 'Jun 2026', accred: 'AICTE, NAAC A++' },
  { rank: 2, uni: 'NMIMS School of Business Management', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 14 L', rating: '4.7', batch: 'Jun 2026', accred: 'AICTE, NAAC A++' },
  { rank: 3, uni: 'Great Lakes Institute of Management', prog: 'PGDM', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 10 L', rating: '4.6', batch: 'Jun 2026', accred: 'AICTE, NAAC A+' },
  { rank: 4, uni: 'Welingkar Institute of Management', prog: 'PGDM', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 9 L', rating: '4.5', batch: 'Jun 2026', accred: 'AICTE' },
  { rank: 5, uni: 'ICFAI Business School (IBS)', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 8.5 L', rating: '4.4', batch: 'Jun 2026', accred: 'UGC, AICTE' },
  { rank: 6, uni: 'Manipal Academy of Higher Education', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 6.5 L', rating: '4.4', batch: 'Jul 2026', accred: 'UGC, NAAC A++' },
  { rank: 7, uni: 'Amity University', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 4.5 L', rating: '4.2', batch: 'Jul 2026', accred: 'UGC' },
  { rank: 8, uni: 'Lovely Professional University (LPU)', prog: 'MBA', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 2.8 L', rating: '4.2', batch: 'Jul 2026', accred: 'UGC' },
]

const FAQS = [
  {
    q: 'What entrance exams are accepted for a Regular MBA in India?',
    a: 'Most private universities accept CAT, MAT, CMAT, XAT, ATMA, or their own institute-level entrance test. CAT and XAT scores are generally preferred for top-tier institutes, while MAT and CMAT are widely accepted across a larger pool of universities, including most of those on our comparison list.',
  },
  {
    q: 'Is a Regular MBA better than an Online or Distance MBA for placements?',
    a: 'Yes, if campus placement is your priority. Regular MBA programmes run structured summer internships and final placement drives through a dedicated placement cell, which online and distance modes do not offer. If placement support is not a priority for you, online or distance MBA can be more cost-effective.',
  },
  {
    q: 'What is the age limit for a Regular MBA?',
    a: 'There is generally no strict upper age limit, but Regular MBA is overwhelmingly pursued by candidates within 1-3 years of graduation, since the cohort, internship, and placement process are built around that profile. Candidates with significant work experience are usually better suited to an Executive MBA.',
  },
  {
    q: 'How much does a Regular MBA cost in India in 2026?',
    a: 'Fees for private university Regular MBA/PGDM programmes range from about Rs 2.8 lakh to Rs 20 lakh for the full two-year programme, depending on brand positioning, faculty, campus infrastructure, and placement record. Hostel and mess charges are typically additional.',
  },
  {
    q: 'What is the difference between an MBA and a PGDM?',
    a: 'An MBA is a university degree, awarded by a UGC-recognised university. A PGDM (Post Graduate Diploma in Management) is awarded by an autonomous AICTE-approved institute and is treated as equivalent to an MBA for employment purposes in India, though it is technically a diploma, not a university degree - relevant mainly if you plan further academic study or government roles that specifically require a degree.',
  },
  {
    q: 'Do all private university MBAs offer campus placements?',
    a: 'No - placement strength varies significantly between institutes. Always ask for the last three years\' placement report (not just the highlighted highest package), including median salary, placement percentage, and the actual list of recruiting companies, before making a decision based on placement expectations.',
  },
  {
    q: 'Can I do a Regular MBA right after graduation with no work experience?',
    a: 'Yes. Unlike Executive MBA, Regular MBA has no minimum work-experience requirement and is specifically structured for fresh graduates, including a mandatory summer internship between the first and second year to build practical exposure.',
  },
]

export default function RegularMBAClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('regular-mba')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'regular-mba') => {
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
            <span className="crumb-current">Regular MBA</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - REGULAR MBA</div>
              <h1 className="h-display h1">Regular MBA in India 2026-27: Full-Time Campus MBA with Placements</h1>

              <div className="answer-capsule">
                A Regular MBA is a 2-year, full-time, on-campus postgraduate management degree with a mandatory summer internship and structured campus placement drives. Total fees range from Rs 2.8 lakh to Rs 20 lakh. It is designed for fresh graduates seeking campus life, a peer network, and placement support.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of Regular MBA and PGDM programmes across fees, placement records, accreditation, and campus life. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('regular-mba-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>

              <div className="trust-strip">
                <span>1,100+ Regular MBA aspirants guided since 2023</span>
                <span className="sep">·</span>
                <span>AICTE / UGC / NAAC accredited institutes</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right Regular MBA for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 2.8 L - Rs 20 L</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>24 months, full-time</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Entrance exams:</span>
                    <strong>CAT / MAT / CMAT / XAT</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Any graduate, entrance score required</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('regular-mba-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>

          <div className="toc-box">
            <h4>What is in this guide</h4>
            <ol>
              <li><a href="#compare">Top Regular MBA programmes compared</a></li>
              <li><a href="#eligibility">Eligibility and admission requirements</a></li>
              <li><a href="#curriculum">What a Regular MBA teaches in 2026</a></li>
              <li><a href="#outcomes">Placement and salary outcomes</a></li>
              <li><a href="#who">Is Regular MBA right for you?</a></li>
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
          <h2 className="h-display h2">Top Regular MBA programmes in India 2026-27</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Institute and Programme</th>
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
            Fees shown are total programme fees and exclude hostel, mess, and caution deposit charges. Ratings are based on CollegeNCourses alumni survey 2026.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="#" className="btn btn-secondary btn-sm">Browse all Regular MBA programmes on portal {ARROW}</a>
          </div>
        </div>
      </section>

      {/* Section 2: Eligibility */}
      <section className="section-lp" id="eligibility">
        <div className="container">
          <div className="eyebrow">ELIGIBILITY AND ADMISSION</div>
          <h2 className="h-display h2">Who can apply for a Regular MBA?</h2>
          <hr className="section-rule" />
          <p>
            Regular MBA admission is entrance-score driven and is the one MBA mode with a formal, competitive selection process. Here are the standard requirements across most private universities.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { label: 'Education', value: "Bachelor's degree in any stream, minimum 3 years, from a recognised university" },
              { label: 'Marks', value: 'Minimum 50% aggregate (45% for reserved categories at most institutes)' },
              { label: 'Entrance exam', value: 'CAT, MAT, CMAT, XAT, ATMA, or institute-level test - mandatory' },
              { label: 'Work experience', value: 'Not required. Fresh graduates form the majority of each cohort.' },
              { label: 'Selection process', value: 'Entrance score, group discussion (at some institutes), and personal interview' },
              { label: 'Admission process', value: 'Apply, appear for entrance/GD/PI, receive offer - typically a 2-4 month cycle' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">Admission timeline for 2026</div>
            <p>Most Regular MBA programmes admit a single annual batch starting June-July. Entrance exam cycles typically run from November (CMAT, MAT) through January (CAT results, XAT), with institute-level GD/PI rounds in February-April and offers rolling out by May. Start your entrance exam preparation at least 6 months ahead of your target intake.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Curriculum */}
      <section className="section-lp section-lp-alt" id="curriculum">
        <div className="container">
          <div className="eyebrow">2026 CURRICULUM</div>
          <h2 className="h-display h2">What does a Regular MBA actually teach in 2026?</h2>
          <hr className="section-rule" />
          <p>
            A standard 24-month Regular MBA covers core management disciplines in the first year, followed by a specialization stream, a mandatory summer internship, and a final placement-linked project in the second year.
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
              'Summer Internship (Year 1-2)',
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
              {['Marketing', 'Finance', 'Human Resources', 'Operations', 'Business Analytics', 'International Business', 'Banking and Financial Services', 'Rural and Agri-Business Management'].map(s => (
                <span key={s} style={{ background: 'var(--pale-navy)', color: 'var(--navy)', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">What matters most for placement outcomes</div>
            <p>Beyond brand name, placement outcomes track closely with the institute's industry connect, the quality (not just duration) of the summer internship, and whether the placement cell runs role-specific pre-placement training. Ask to see the last three years' recruiter list, not just the single highest package reported.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Career outcomes */}
      <section className="section-lp" id="outcomes">
        <div className="container">
          <div className="eyebrow">PLACEMENT AND SALARY OUTCOMES</div>
          <h2 className="h-display h2">What Regular MBA graduates earn (2026 data)</h2>
          <hr className="section-rule" />
          <p style={{ marginBottom: 6, fontSize: 14, color: 'var(--grey)' }}>
            Source: CollegeNCourses 2026 Alumni Survey, Regular MBA / PGDM graduates
          </p>

          <div className="salary-chart">
            {[
              { role: 'Management Trainee (fresher placement)', avg: 'Rs 7 L', range: 'Rs 5 - 10 L', width: '25%' },
              { role: 'Manager / Team Lead (2-4 yrs post-MBA)', avg: 'Rs 13 L', range: 'Rs 9 - 18 L', width: '48%' },
              { role: 'Senior Manager / Head (5-8 yrs post-MBA)', avg: 'Rs 22 L', range: 'Rs 16 - 30 L', width: '72%' },
              { role: 'VP / Director and above', avg: 'Rs 38 L', range: 'Rs 26 - 65 L', width: '95%' },
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
            Across the institutes we track, average fresher placement rates ranged from 75% to 96% within 6 months of graduation, with significant variation by institute tier - always verify an institute's specific placement percentage and median (not just highest) package before enrolling.
          </p>
        </div>
      </section>

      {/* Section 5: Is it right for you */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="eyebrow">IS THIS FOR YOU?</div>
          <h2 className="h-display h2">Is a Regular MBA right for you?</h2>
          <hr className="section-rule" />
          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>This fits if you are...</h4>
              <ul className="fit-list">
                <li>A fresh graduate or early-career professional (under 2 years' experience)</li>
                <li>Able to take a 2-year career break and relocate to a campus</li>
                <li>Looking for structured campus placement support and a summer internship</li>
                <li>Wanting a residential peer network and campus life experience</li>
                <li>Planning a functional career switch (for example, engineering to marketing or finance)</li>
              </ul>
            </div>
            <div className="fit-box fit-no">
              <h4>This may not fit if you are...</h4>
              <ul className="fit-list">
                <li>Currently employed and unable to take a 2-year break - consider Executive MBA</li>
                <li>Budget-constrained and wanting the lowest-cost UGC-DEB mode - consider Distance MBA</li>
                <li>A working professional who wants to study without relocating - consider Online MBA</li>
                <li>Looking for the fastest path to a postgraduate qualification - Executive MBA is shorter</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which programme fits your profile and career stage?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('regular-mba-fit')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Questions to ask */}
      <section className="section-lp" id="questions">
        <div className="container">
          <div className="eyebrow">BEFORE YOU APPLY</div>
          <h2 className="h-display h2">5 questions to ask before choosing a Regular MBA</h2>
          <hr className="section-rule" />
          <div className="questions-list">
            {[
              {
                q: 'What is the institute\'s actual placement percentage and median salary - not just the highest package?',
                a: 'A single headline package (often earned by one or two students) tells you little. Ask for the median salary, the placement percentage within 6 months, and the full list of recruiting companies from the last three years.',
              },
              {
                q: 'Is the programme an MBA (university degree) or a PGDM (autonomous diploma)?',
                a: 'Both are treated as equivalent for employment, but an MBA is a university degree while a PGDM is a diploma from an AICTE-approved autonomous institute. This can matter for certain government jobs or further academic study - confirm which you are being offered.',
              },
              {
                q: 'What is included in the quoted fee, and what is charged separately?',
                a: 'Hostel, mess, caution deposit, laptop/study material, and international immersion modules (if any) are often charged separately from the headline tuition fee. Ask for a complete, itemised cost breakdown for the full 2 years.',
              },
              {
                q: 'What does the summer internship process actually look like?',
                a: 'Ask whether internship placement is institute-facilitated or self-sourced, which companies typically participate, and whether internship performance is formally linked to final placement offers (a "pre-placement offer" or PPO pathway).',
              },
              {
                q: 'What accreditation and approvals does the institute currently hold?',
                a: 'Confirm current AICTE approval (mandatory for PGDM) or UGC recognition (for university MBA programmes), and NAAC accreditation grade if claimed. Approvals can lapse - verify directly on the regulator\'s official website, not just the institute\'s brochure.',
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
          <h2 className="h-display h2">Regular MBA: common questions answered</h2>
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
          <h2>Ready to find your Regular MBA?</h2>
          <p>Get a personalised shortlist of campus MBA programmes matched to your profile, budget, and placement goals. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('regular-mba-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
