'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const STEPS = [
  {
    num: 1,
    heading: 'Enter your academic profile',
    body: 'Degree, CGPA or percentage, university name and NAAC/ranking, any gap years and reasons.',
  },
  {
    num: 2,
    heading: 'Add your test scores',
    body: 'GRE, GMAT, IELTS, TOEFL, PTE, Duolingo - or mark as "not taken yet" to get test requirement guidance.',
  },
  {
    num: 3,
    heading: 'Set your target',
    body: 'Target country (or "help me choose"), target programme (MBA/MS/MIM/Bachelors), target intake (Fall/Spring/Rolling).',
  },
  {
    num: 4,
    heading: 'Set your budget',
    body: 'Total budget in INR for the full programme including tuition and living. Indicates if education loan is needed.',
  },
  {
    num: 5,
    heading: 'Receive your shortlist',
    body: 'Ambitious, Target, and Safe universities with indicative admit-likelihood band, estimated total cost, next steps for each.',
  },
]

const SHORTLIST_ITEMS = [
  'University name and QS / Times ranking',
  'Programme name and duration',
  'Indicative admit likelihood band (Strong/Moderate/Reach)',
  'Estimated total cost (tuition + living) in INR',
  'Application deadline for your target intake',
  'Required documents for that university',
  'Test score requirement vs your current score',
]

const NEXT_STEPS_ITEMS = [
  'Test prep recommendation if scores are below requirement',
  'SOP (Statement of Purpose) focus areas by university',
  'Scholarship opportunities matching your profile',
  'Education loan estimate and EMI',
  'Application timeline from today to submission',
]

const CHOOSER = [
  {
    situation: 'You are 6-18 months away from your target intake',
    rec: 'Do it now. With this much lead time you can take or retake tests, build your SOP, and apply to all bands. Last-minute evaluation still helps for realistic shortlisting.',
  },
  {
    situation: 'You are unsure which country or programme is right for you',
    rec: 'Profile evaluation compares your profile across multiple destination-programme combinations and shows you which are accessible on your current profile.',
  },
  {
    situation: 'You have taken GRE or IELTS and want to know if your scores are competitive',
    rec: 'The evaluation benchmarks your scores against the actual admit ranges for each university and tells you whether to retake or proceed.',
  },
  {
    situation: 'You want to know how much funding you will need and what loans are available',
    rec: 'The evaluation includes a cost estimate per university and guides you to the right loan type based on the total amount needed.',
  },
]

const COMPARISON_ROWS = [
  {
    aspect: 'University selection',
    without: 'Based on brand recognition or peer suggestions',
    with: 'Based on actual admit data matched to your profile',
  },
  {
    aspect: 'Test score targets',
    without: 'Unknown until rejection',
    with: 'Known before you sit the test',
  },
  {
    aspect: 'Application count',
    without: '8-12 applications (expensive)',
    with: '4-6 targeted applications (focused)',
  },
  {
    aspect: 'Scholarship awareness',
    without: 'Discovered after shortlisting',
    with: 'Built into the shortlist output',
  },
  {
    aspect: 'Loan planning',
    without: 'Started after offer',
    with: 'Planned with the shortlist, 3-6 months earlier',
  },
  {
    aspect: 'Result',
    without: 'Higher rejection rate, higher cost',
    with: 'Higher admit rate, lower total cost',
  },
]

const FAQS = [
  {
    q: 'Is profile evaluation the same as a university application?',
    a: 'No. Profile evaluation is a planning step that happens before applications are submitted. It produces a personalised shortlist of universities where your profile is likely to succeed, along with the information you need to build strong applications: test score targets, SOP focus areas, scholarship options, and cost estimates. The actual application to each university is a separate process submitted directly to that institution.',
  },
  {
    q: 'How accurate is the admit-likelihood band?',
    a: 'The bands (Strong / Moderate / Reach) are based on historical admit data for Indian students with similar profiles at each university and programme. They are indicative, not guaranteed. A Strong likelihood does not mean certain admission; a Reach likelihood does not mean you should not apply. The value of the bands is in helping you build a balanced portfolio across all three, improving your overall chances.',
  },
  {
    q: 'Do I need my GRE or IELTS score before getting a profile evaluation?',
    a: 'No. You can get a profile evaluation without test scores. In that case, the evaluation includes test requirements for each university on your shortlist, recommended target scores, and a preparation timeline. Many students do an initial evaluation before tests to understand what scores they need to target, then do a second evaluation after scores to refine the shortlist.',
  },
  {
    q: 'How is this different from asking a university agent?',
    a: 'A university agent typically represents specific partner universities and may have a financial incentive to recommend those institutions. Profile evaluation is based on admission data across a wide set of universities and matched to your specific profile without preference for any particular institution. The output is a ranked shortlist, not a sales pitch.',
  },
  {
    q: 'Does the evaluation cover scholarships and loans?',
    a: 'Yes. The evaluation identifies scholarship programmes at each shortlisted university that your profile may be eligible for, along with external scholarships relevant to your country and programme. It also estimates total cost and indicates whether you would need an education loan, and guides you to appropriate lenders based on the amount and whether collateral is available.',
  },
]

export default function ProfileEvaluationClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('profile-evaluation')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'profile-evaluation') => {
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
            <span className="crumb-current">Profile Evaluation</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">PROFILE EVALUATION - STUDY ABROAD</div>
              <h1 className="h-display h1">Profile Evaluation for Study Abroad 2026-27: Ambitious, Target, and Safe Universities</h1>

              <div className="answer-capsule">
                Profile Evaluation for study abroad assesses your academic record, test scores, target country, programme, and budget to produce a shortlist of Ambitious, Target, and Safe universities with indicative admit-likelihood bands. It is the primary planning tool for Indian students applying to international universities, replacing guesswork with data-driven shortlisting.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                India sends over 1.3 million students abroad each year. The ones who land in their target universities are those who matched their profiles to realistic admit criteria early and built their applications accordingly. Profile Evaluation is how that matching works - systematically, not by guesswork.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('profile-eval-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#how-it-works" className="btn btn-secondary">See how it works</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>Shortlist with admit probability</span>
                <span className="sep">·</span>
                <span>MBA, MS, MIM, Bachelors</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Profile evaluation sidebar">
              <div className="sp-sidebar-header">
                <h3>Evaluate your study abroad profile</h3>
                <p>Takes 5 minutes. University shortlist with admit probability.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Evaluation inputs:</span>
                    <strong>Academics, Test scores, Country, Budget</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Output:</span>
                    <strong>Ambitious / Target / Safe shortlist</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Also includes:</span>
                    <strong>Cost estimate and next steps</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Available for:</span>
                    <strong>MBA, MS, MIM, Bachelors</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('profile-eval-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* How Profile Evaluation Works */}
      <section className="section-lp section-lp-alt" id="how-it-works">
        <div className="container">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2 className="h-display h2">How profile evaluation works - 5 steps</h2>
          <hr className="section-rule" />

          <div>
            {STEPS.map(step => (
              <div key={step.num} className="q-item">
                <div className="q-num">{step.num}</div>
                <div className="q-body">
                  <strong>{step.heading}</strong>
                  <p style={{ margin: '6px 0 0' }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('profile-eval-how-it-works')}>
              Start Your Evaluation {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-lp" id="output">
        <div className="container">
          <div className="eyebrow">EVALUATION OUTPUT</div>
          <h2 className="h-display h2">What the evaluation produces</h2>
          <hr className="section-rule" />

          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h3 style={{ marginBottom: 16 }}>What is in your shortlist</h3>
              <ul className="fit-list">
                {SHORTLIST_ITEMS.map(item => (
                  <li key={item} className="fit-yes">{item}</li>
                ))}
              </ul>
            </div>

            <div
              className="fit-box fit-yes"
              style={{ background: 'var(--pale-navy)', borderColor: 'var(--navy)' }}
            >
              <h3 style={{ marginBottom: 16 }}>What comes next</h3>
              <ul className="fit-list">
                {NEXT_STEPS_ITEMS.map(item => (
                  <li key={item} className="fit-yes">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('profile-eval-output')}>
              Get Your Shortlist {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Who Should Do a Profile Evaluation */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="eyebrow">WHO BENEFITS</div>
          <h2 className="h-display h2">Who benefits most from profile evaluation?</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {CHOOSER.map(item => (
              <div className="chooser-card" key={item.situation}>
                <div className="chooser-situation">{item.situation}</div>
                <div className="chooser-rec">{item.rec}</div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal('profile-eval-who')}
                >
                  Start evaluation {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation vs. Guesswork */}
      <section className="section-lp" id="why">
        <div className="container">
          <div className="eyebrow">WHY IT MATTERS</div>
          <h2 className="h-display h2">Profile evaluation vs. applying without one</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>What happens</th>
                  <th>Without evaluation</th>
                  <th>With evaluation</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.aspect}>
                    <td>{row.aspect}</td>
                    <td>{row.without}</td>
                    <td>{row.with}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('profile-eval-why')}>
              Get Free Guidance {ARROW}
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
              <h2 className="h-display h2">Profile evaluation: common questions answered</h2>
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
          <h2>Start your study abroad profile evaluation.</h2>
          <p>Get a shortlist of Ambitious, Target, and Safe universities matched to your academics, test scores, and budget.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('profile-eval-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
