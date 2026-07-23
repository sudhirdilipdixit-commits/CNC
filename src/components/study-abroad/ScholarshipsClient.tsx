'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const SCHOLARSHIP_TYPES = [
  {
    mode: 'Government',
    title: 'Government Scholarships',
    tagline: 'Fully funded awards from foreign governments. Highly competitive. Cover tuition, living stipend, and travel. Examples: Chevening (UK), Fulbright (USA), DAAD (Germany), Australia Awards.',
    badge: 'Fully Funded',
    source: 'scholarships-govt',
  },
  {
    mode: 'University',
    title: 'University Scholarships',
    tagline: 'Partial or full funding from the university based on merit, diversity, or need. Automatically considered at admission at many schools. Range from 10% to 100% of tuition.',
    badge: 'Partial to Full',
    source: 'scholarships-university',
  },
  {
    mode: 'Private',
    title: 'Private and Foundation Awards',
    tagline: 'Funded by corporates, foundations, or trusts. Inlaks, Tata, JN Tata, and KC Mahindra are major private scholarships for Indian students going abroad.',
    badge: 'Varies',
    source: 'scholarships-private',
  },
  {
    mode: 'Programme-specific',
    title: 'Exchange and Joint Programmes',
    tagline: 'Erasmus Mundus and similar joint-degree programmes are fully funded by the EU. Cover tuition at multiple European universities plus travel and living allowance.',
    badge: 'Fully Funded',
    source: 'scholarships-exchange',
  },
]

const TIPS = [
  {
    num: 1,
    heading: 'Apply to the right scholarships for your profile',
    body: 'A research-focused scholarship (Fulbright) is not right for a career-switcher going for an MBA. A leadership scholarship (Chevening) expects demonstrated community impact, not just academic grades. Match your profile to the scholarship\'s stated criteria before spending weeks on the application.',
  },
  {
    num: 2,
    heading: 'Start 12-18 months before your intake',
    body: 'Fully funded government scholarships like Chevening and Fulbright open applications 12-18 months before the programme starts. Many applicants realise too late and miss the cycle. Set a reminder today for the scholarship deadline that applies to your intake.',
  },
  {
    num: 3,
    heading: 'Write a specific Statement of Purpose for each scholarship',
    body: 'Generic SOPs that could apply to any scholarship are rejected at the screening stage. Each scholarship has a specific mission: Chevening values UK ties and leadership, Fulbright values exchange and development, DAAD values research contribution. Write to that mission specifically.',
  },
  {
    num: 4,
    heading: 'Get strong, specific letters of recommendation',
    body: 'A letter that says "X is a hardworking student with great potential" is not useful. A strong letter gives a specific example of a problem you solved, a skill you demonstrated, or an impact you made. Brief your recommenders with context about the scholarship and what it values.',
  },
  {
    num: 5,
    heading: 'Apply to university scholarships at every institution on your list',
    body: 'Many students focus only on external scholarships and miss university-funded awards that are automatically considered at admission. When filling the application, check every scholarship and financial aid box. Merit scholarships of 10-25% of tuition can be secured this way with no extra work.',
  },
]

const FAQS = [
  {
    q: 'Can I apply for a scholarship and an education loan at the same time?',
    a: 'Yes, and it is recommended. Apply for education loans as a backup while scholarship results are pending. If you receive a fully funded scholarship, you can decline the loan. If you receive a partial scholarship, the loan covers the remaining amount. Never wait for scholarship results before starting the loan application, as loan processing takes 15-30 working days.',
  },
  {
    q: 'Do I need a university admission offer to apply for government scholarships?',
    a: 'Requirements vary. Chevening requires you to have or receive an offer from a UK university as part of the scholarship process. Fulbright-Nehru does not require an offer upfront; you are placed if selected. DAAD requires a university acceptance for most programmes. Australia Awards requires an acceptance letter. Check the specific scholarship\'s requirement before applying.',
  },
  {
    q: 'Are Indian students eligible for university scholarships abroad?',
    a: 'Yes. Most international universities offer merit scholarships open to all nationalities including Indians. Some universities have India-specific scholarships (Tata Scholarships at Cornell, for example). At US universities, financial aid for international students is more limited than for domestic students, but merit scholarships are not restricted. UK, Canadian, and Australian universities typically offer open-merit scholarships.',
  },
  {
    q: 'What GPA or CGPA is needed for scholarship eligibility?',
    a: 'Requirements vary widely. Chevening has no stated minimum but competition means most awardees have strong academic records. DAAD typically requires a minimum GPA of 2.5 on the German scale (roughly equivalent to 7.5+ CGPA on a 10-point scale). University scholarships often require a minimum CGPA of 8.0-8.5 on a 10-point scale or equivalent. The Fulbright-Nehru focuses more on leadership and research potential than GPA alone.',
  },
  {
    q: 'Can I reapply for a scholarship if I am rejected?',
    a: 'Yes. Chevening and Fulbright both allow reapplication in the following cycle. Many successful awardees applied 2-3 times before winning. Use the rejection cycle to strengthen weak elements: get more work experience, improve your English score, sharpen your SOP, and get better recommendation letters. Government scholarship selectors look for progression and self-awareness, not just raw achievement.',
  },
]

export default function ScholarshipsClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('scholarships')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'scholarships') => {
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
            <span className="crumb-current">Scholarships</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - SCHOLARSHIPS</div>
              <h1 className="h-display h1">Scholarships for Indian Students Studying Abroad 2026-27</h1>

              <div className="answer-capsule">
                Indian students studying abroad can access government scholarships like Chevening (UK), Fulbright-Nehru (USA), and DAAD (Germany), plus university-funded scholarships and private awards. Most fully funded scholarships require strong academics, leadership potential, and a clear development or research focus. Applications open 9-18 months before the programme starts.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Scholarships can reduce or eliminate the cost of studying abroad. Most fully funded options are competitive and require planning 12-18 months in advance. This guide covers the major scholarships for Indian students, their eligibility, typical award amounts, and how to build a strong application.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('scholarships-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#scholarships" className="btn btn-secondary">View scholarships</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>Government and university scholarships</span>
                <span className="sep">·</span>
                <span>Fully funded options available</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Scholarship matching">
              <div className="sp-sidebar-header">
                <h3>Find scholarships for your profile</h3>
                <p>Takes 5 minutes. Matched to your country and programme.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Scholarship types:</span>
                    <strong>Merit, Need-based, Government, University</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Top awards:</span>
                    <strong>Chevening, Fulbright-Nehru, DAAD, Inlaks</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Application lead time:</span>
                    <strong>6-18 months before intake</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Funding:</span>
                    <strong>Partial to fully funded</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('scholarships-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Types of Scholarships */}
      <section className="section-lp section-lp-alt" id="types">
        <div className="container">
          <div className="eyebrow">SCHOLARSHIP TYPES</div>
          <h2 className="h-display h2">Four types of scholarships available to Indian students</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {SCHOLARSHIP_TYPES.map(s => (
              <div className="prog-card" key={s.title}>
                <div className="prog-card-mode">{s.mode}</div>
                <div className="prog-card-title">{s.title}</div>
                <div className="prog-card-tagline">{s.tagline}</div>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{s.badge}</span>
                </div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => openModal(s.source)}
                >
                  Get guidance on {s.mode.toLowerCase()} scholarships {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Scholarships Table */}
      <section className="section-lp" id="scholarships">
        <div className="container">
          <div className="eyebrow">TOP SCHOLARSHIPS</div>
          <h2 className="h-display h2">Top scholarships for Indian students in 2026-27</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Scholarship</th>
                  <th>Country</th>
                  <th>Funding</th>
                  <th>For</th>
                  <th>Typical Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Chevening</strong></td>
                  <td>UK</td>
                  <td>Fully funded</td>
                  <td>Leadership potential, 2+ yr work exp</td>
                  <td>November</td>
                </tr>
                <tr>
                  <td><strong>Fulbright-Nehru</strong></td>
                  <td>USA</td>
                  <td>Fully funded</td>
                  <td>Research, teaching, professional dev</td>
                  <td>May-July (varies)</td>
                </tr>
                <tr>
                  <td><strong>DAAD (various)</strong></td>
                  <td>Germany</td>
                  <td>Partial to full</td>
                  <td>Research and postgraduate study</td>
                  <td>Oct-Nov</td>
                </tr>
                <tr>
                  <td><strong>Inlaks Shivdasani Foundation</strong></td>
                  <td>USA/UK/Europe</td>
                  <td>Up to $100,000</td>
                  <td>Academic excellence, under 30</td>
                  <td>April</td>
                </tr>
                <tr>
                  <td><strong>Commonwealth Scholarships</strong></td>
                  <td>UK and Commonwealth</td>
                  <td>Fully funded</td>
                  <td>Development-sector professionals</td>
                  <td>Dec (varies by country)</td>
                </tr>
                <tr>
                  <td><strong>Australia Awards</strong></td>
                  <td>Australia</td>
                  <td>Fully funded</td>
                  <td>Development-focused professionals</td>
                  <td>April-May</td>
                </tr>
                <tr>
                  <td><strong>Erasmus Mundus</strong></td>
                  <td>Europe</td>
                  <td>Fully funded</td>
                  <td>Joint master's at EU universities</td>
                  <td>November-January</td>
                </tr>
                <tr>
                  <td><strong>JN Tata Endowment</strong></td>
                  <td>Any country</td>
                  <td>Loan scholarship up to Rs 10 lakh</td>
                  <td>Indian nationals going abroad</td>
                  <td>March</td>
                </tr>
                <tr>
                  <td><strong>KC Mahindra Scholarships</strong></td>
                  <td>Any country</td>
                  <td>Up to Rs 8 lakh</td>
                  <td>Academic merit</td>
                  <td>March-April</td>
                </tr>
                <tr>
                  <td><strong>Tata Scholarship (Cornell)</strong></td>
                  <td>USA (Cornell only)</td>
                  <td>Up to $25,000/year</td>
                  <td>Indian undergrads at Cornell</td>
                  <td>January</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-card" style={{ marginTop: 20 }}>
            <div className="info-card-title">Deadlines change annually</div>
            <p>Deadlines shift annually. Verify the current deadline on the official scholarship website before planning your application. Applications that miss the official deadline are not accepted regardless of the reason.</p>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('scholarships-table')}>
              Get Matched to Eligible Scholarships {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* How to Win a Scholarship */}
      <section className="section-lp section-lp-alt" id="tips">
        <div className="container">
          <div className="eyebrow">HOW TO WIN</div>
          <h2 className="h-display h2">5 things that separate scholarship winners from shortlisted applicants</h2>
          <hr className="section-rule" />

          <div>
            {TIPS.map(tip => (
              <div key={tip.num} className="q-item">
                <div className="q-num">{tip.num}</div>
                <div className="q-body">
                  <h4>{tip.heading}</h4>
                  <p>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('scholarships-tips')}>
              Get Guidance on Building a Strong Application {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Scholarship Application Timeline */}
      <section className="section-lp" id="timeline">
        <div className="container">
          <div className="eyebrow">TIMELINE</div>
          <h2 className="h-display h2">When to start your scholarship applications</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            <div className="chooser-card">
              <div className="chooser-label">18 months before intake</div>
              <div className="chooser-rec">
                Identify target scholarships. Check eligibility (work experience, age, field of study). Request letters of recommendation from professors or managers. If IELTS is needed for Chevening, start preparing now.
              </div>
            </div>
            <div className="chooser-card">
              <div className="chooser-label">12 months before intake</div>
              <div className="chooser-rec">
                Write first drafts of Statement of Purpose and personal essays. Government scholarship applications (Chevening, Fulbright) typically open around this time. Apply to target universities simultaneously.
              </div>
            </div>
            <div className="chooser-card">
              <div className="chooser-label">6 months before intake</div>
              <div className="chooser-rec">
                Submit university scholarship applications embedded in university applications. Follow up on scholarship results. Accept or decline offers. Arrange education loan if scholarship is partial.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('scholarships-timeline')}>
              Plan Your Scholarship Timeline {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">Scholarships for study abroad: common questions answered</h2>
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
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <h2>Find scholarships matched to your study abroad profile.</h2>
          <p>Get guidance on which scholarships you are eligible for and how to build a strong application.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('scholarships-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
