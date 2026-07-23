'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const COUNTRY_TABLE = [
  {
    country: 'USA',
    mba: 'GMAT (preferred)',
    ms: 'GRE (most)',
    mim: 'GRE/GMAT',
    bachelors: 'SAT (optional at many)',
    english: 'TOEFL or IELTS',
  },
  {
    country: 'UK',
    mba: 'GMAT (often waived w/ exp)',
    ms: 'Usually not required',
    mim: 'Varies',
    bachelors: 'None',
    english: 'IELTS or PTE',
  },
  {
    country: 'Canada',
    mba: 'GMAT or GRE',
    ms: 'GRE at many',
    mim: 'GMAT/GRE',
    bachelors: 'None',
    english: 'IELTS or TOEFL',
  },
  {
    country: 'Australia',
    mba: 'GMAT optional',
    ms: 'Mostly not required',
    mim: 'Rarely required',
    bachelors: 'None',
    english: 'IELTS or PTE',
  },
  {
    country: 'Germany',
    mba: 'Rarely',
    ms: 'Rarely',
    mim: 'Not required',
    bachelors: 'None',
    english: 'IELTS, TOEFL, or Goethe',
  },
  {
    country: 'Ireland',
    mba: 'Rarely',
    ms: 'Rarely',
    mim: 'Not required',
    bachelors: 'None',
    english: 'IELTS or TOEFL',
  },
  {
    country: 'New Zealand',
    mba: 'Rarely',
    ms: 'Rarely',
    mim: 'Not required',
    bachelors: 'None',
    english: 'IELTS or PTE',
  },
]

const TESTS = [
  {
    mode: 'Aptitude Test',
    title: 'GRE General Test',
    tagline: 'Required for most US MS programmes and some MBA programmes. Measures verbal, quantitative, and analytical writing skills.',
    badges: ['Score 260-340', '3-4 months prep'],
    note: 'Exam fee: Rs 22,550 (~$275). Valid 5 years.',
    source: 'test-prep-gre',
  },
  {
    mode: 'Aptitude Test',
    title: 'GMAT Focus Edition',
    tagline: 'Standard for MBA admissions globally. The GMAT Focus Edition (2023 onwards) scores 205-805. Most US and UK MBA programmes require or strongly prefer GMAT.',
    badges: ['Score 205-805', '3-4 months prep'],
    note: 'Exam fee: Rs 22,000 (~$275). Valid 5 years.',
    source: 'test-prep-gmat',
  },
  {
    mode: 'English Proficiency',
    title: 'IELTS Academic',
    tagline: 'Accepted globally. Required for UK, Canada, Australia, Ireland, New Zealand. Paper-based and computer-based options. Target band 6.5-7.5 depending on programme.',
    badges: ['Band 0-9', '4-8 weeks prep'],
    note: 'Exam fee: Rs 16,500-17,000. Valid 2 years.',
    source: 'test-prep-ielts',
  },
  {
    mode: 'English Proficiency',
    title: 'TOEFL iBT',
    tagline: 'Preferred at most US and Canadian universities. Computer-based, conducted at home or test centres. Score range 0-120. Target 90-110 for most programmes.',
    badges: ['Score 0-120', '4-8 weeks prep'],
    note: 'Exam fee: Rs 18,500 (~$230). Valid 2 years.',
    source: 'test-prep-toefl',
  },
  {
    mode: 'English Proficiency',
    title: 'PTE Academic',
    tagline: 'Computer-based, AI-scored. Results in 48 hours. Accepted by most UK, Australian, and Canadian universities as an alternative to IELTS. Fast turnaround makes it popular.',
    badges: ['Score 10-90', '4-6 weeks prep'],
    note: 'Exam fee: Rs 16,500 (~$204). Valid 2 years.',
    source: 'test-prep-pte',
  },
  {
    mode: 'English Proficiency',
    title: 'Duolingo English Test',
    tagline: 'Online, home-proctored, results in 2 days. Accepted by 5,000+ universities including many in USA, UK, and Canada. Most affordable option.',
    badges: ['Score 10-160', '1-2 weeks prep'],
    note: 'Exam fee: Rs 4,900 (~$59). Valid 2 years.',
    source: 'test-prep-duolingo',
  },
]

const SCORE_TABLE = [
  {
    test: 'GRE',
    mba: '155-165 Quant',
    ms: '158-168 Quant',
    mim: '150-158',
    bachelors: '150-155',
  },
  {
    test: 'GMAT',
    mba: '680-740',
    ms: '600-680',
    mim: '580-650',
    bachelors: 'Not required',
  },
  {
    test: 'IELTS',
    mba: '7.0-7.5',
    ms: '6.5-7.0',
    mim: '6.5-7.0',
    bachelors: '6.0-6.5',
  },
  {
    test: 'TOEFL',
    mba: '100-110',
    ms: '90-105',
    mim: '88-100',
    bachelors: '80-95',
  },
  {
    test: 'PTE',
    mba: '65-79',
    ms: '58-70',
    mim: '58-68',
    bachelors: '53-65',
  },
  {
    test: 'Duolingo',
    mba: '120-135',
    ms: '110-125',
    mim: '105-120',
    bachelors: '100-115',
  },
]

const TIMELINE_CARDS = [
  {
    situation: 'You are targeting GRE or GMAT',
    rec: '3-4 months minimum. Start with a diagnostic test to find your baseline. GRE Quant 160+ and GMAT 700+ require structured daily study. Use Official Guide material plus Manhattan Prep or Magoosh. Plan for one retake if needed; most test centres allow retakes after 16 days (GRE) or 16 calendar days (GMAT).',
  },
  {
    situation: 'You are targeting IELTS, TOEFL, or PTE',
    rec: '4-8 weeks for most Indian students with strong English. Focus on speaking and writing sections which are most variable. IELTS and PTE are scored section-by-section; TOEFL is holistic. Take a full practice test under timed conditions every week.',
  },
  {
    situation: 'You are targeting Duolingo English Test',
    rec: '1-3 weeks preparation. The test format (adaptive, computer-based, home-proctored) is unique. Practice with the free Duolingo preparation resources. Take the practice test before your actual attempt. Results arrive in 48 hours after the exam.',
  },
]

const FAQS = [
  {
    q: 'Can I apply abroad without GRE or GMAT?',
    a: 'Yes. Many programmes globally are test-optional or do not require GRE or GMAT. In the UK, most MSc and MIM programmes do not require a management test. In Australia, most MBA programmes waive GMAT with 3+ years of work experience. Germany and Ireland rarely require GRE or GMAT at all. USA programmes are the most test-dependent; however, an increasing number of US universities have gone test-optional for MS programmes post-2020. Always check the specific university requirement before preparing.',
  },
  {
    q: 'How many times can I take the GRE or GMAT?',
    a: 'GRE can be taken up to 5 times in any continuous rolling 12-month period, with a minimum of 21 days between attempts. GMAT can be taken up to 5 times in any 12-month period with a minimum of 16 calendar days between attempts, and up to 8 times in your lifetime. Most competitive programmes see your best score when you use ScoreSelect (GRE) or Score Preview (GMAT); you choose which scores to send.',
  },
  {
    q: 'Is IELTS or TOEFL better for study abroad?',
    a: 'Both are accepted at virtually all universities that require an English proficiency test. IELTS is more widely recognised in the UK, Canada, Australia, Ireland, and New Zealand. TOEFL is preferred at many US universities. PTE is a strong alternative to IELTS and is AI-scored (more consistent). If you are applying across multiple countries, IELTS gives the broadest acceptance. Duolingo is the most convenient and affordable, accepted at 5,000+ universities.',
  },
  {
    q: 'Do I need both an English test and GRE or GMAT?',
    a: 'Yes, for programmes that require both. A US MS programme typically requires GRE and IELTS or TOEFL. A US MBA typically requires GMAT and IELTS or TOEFL. The English test is always a separate requirement from the aptitude test, even if you have studied in English throughout your degree. However, some universities waive the English requirement for applicants who completed their bachelor\'s or master\'s degree entirely in English; check the specific waiver policy.',
  },
  {
    q: 'How should I decide between IELTS, TOEFL, and PTE?',
    a: 'If you are applying primarily to UK, Australia, Canada, or New Zealand: take IELTS or PTE. PTE is faster (results in 48 hours vs 3-13 days for IELTS) and AI-scored, which some students find more consistent. If you are applying primarily to USA or Canada: take TOEFL or IELTS. If you want speed and affordability and most of your target universities accept it: take Duolingo. Check each university\'s accepted tests before booking - a few programmes only accept IELTS or only TOEFL.',
  },
]

export default function TestPrepClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('test-prep')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'test-prep') => {
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
            <span className="crumb-current">Test Prep</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">TEST PREP - STUDY ABROAD</div>
              <h1 className="h-display h1">Test Prep for Study Abroad 2026-27: GRE, GMAT, IELTS, TOEFL, PTE, Duolingo</h1>

              <div className="answer-capsule">
                Studying abroad from India typically requires two types of tests: an English proficiency test (IELTS, TOEFL, PTE, or Duolingo) and sometimes a management or aptitude test (GRE or GMAT). Which tests you need depends on your target country and programme. German and Irish universities often waive all tests. USA MS programmes need GRE. MBA programmes globally need GMAT.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                The right test, taken once with a competitive score, is one of the highest-leverage investments in your study abroad application. The wrong test choice or a below-cutoff score can cost you 3-6 months of retakes. This guide tells you exactly which test each country and programme requires and what score is competitive.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('test-prep-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#which-test" className="btn btn-secondary">See which test you need</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>6 tests covered</span>
                <span className="sep">·</span>
                <span>Country and programme specific guidance</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Test prep sidebar">
              <div className="sp-sidebar-header">
                <h3>Not sure which test you need?</h3>
                <p>Takes 5 minutes. Personalised test and score guidance.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Tests covered:</span>
                    <strong>GRE, GMAT, IELTS, TOEFL, PTE, Duolingo</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Exam fee:</span>
                    <strong>Rs 4,900 (Duolingo) to Rs 22,550 (GRE/GMAT)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Prep time:</span>
                    <strong>4 weeks (IELTS/PTE) to 4 months (GRE/GMAT)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Score validity:</span>
                    <strong>2-5 years</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('test-prep-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Which Test For Which Purpose */}
      <section className="section-lp section-lp-alt" id="which-test">
        <div className="container">
          <div className="eyebrow">WHICH TEST</div>
          <h2 className="h-display h2">Which test does each country and programme require?</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>MBA</th>
                  <th>MS / MSc</th>
                  <th>MIM</th>
                  <th>Bachelors</th>
                  <th>English Test</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_TABLE.map(row => (
                  <tr key={row.country}>
                    <td>{row.country}</td>
                    <td>{row.mba}</td>
                    <td>{row.ms}</td>
                    <td>{row.mim}</td>
                    <td>{row.bachelors}</td>
                    <td>{row.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('test-prep-which-test')}>
              Get Test Guidance for Your Profile {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Test Cards */}
      <section className="section-lp" id="tests">
        <div className="container">
          <div className="eyebrow">ALL TESTS</div>
          <h2 className="h-display h2">Six tests for study abroad: what you need to know</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {TESTS.map(test => (
              <div className="prog-card" key={test.title}>
                <div className="prog-card-mode">{test.mode}</div>
                <div className="prog-card-title">{test.title}</div>
                <div className="prog-card-tagline">{test.tagline}</div>
                <div className="prog-card-meta">
                  {test.badges.map(badge => (
                    <span key={badge} className="prog-card-badge">{badge}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--charcoal)', margin: '8px 0 12px' }}>{test.note}</p>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => openModal(test.source)}
                >
                  Get guidance for {test.title} {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Requirements */}
      <section className="section-lp section-lp-alt" id="scores">
        <div className="container">
          <div className="eyebrow">SCORE BENCHMARKS</div>
          <h2 className="h-display h2">Competitive score benchmarks by programme type</h2>
          <hr className="section-rule" />

          <p style={{ marginBottom: 24, color: 'var(--charcoal)' }}>
            These are competitive ranges for admission, not minimum cutoffs. A score at the midpoint or above puts you in a strong position.
          </p>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Top 50 MBA</th>
                  <th>MS / MSc</th>
                  <th>MIM</th>
                  <th>Bachelors</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_TABLE.map(row => (
                  <tr key={row.test}>
                    <td>{row.test}</td>
                    <td>{row.mba}</td>
                    <td>{row.ms}</td>
                    <td>{row.mim}</td>
                    <td>{row.bachelors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('test-prep-scores')}>
              Get Score Guidance for Your Target Programmes {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Preparation Timeline */}
      <section className="section-lp" id="timeline">
        <div className="container">
          <div className="eyebrow">PREPARATION TIMELINE</div>
          <h2 className="h-display h2">How long to prepare for each test</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {TIMELINE_CARDS.map(item => (
              <div className="chooser-card" key={item.situation}>
                <div className="chooser-label">If you are targeting...</div>
                <div className="chooser-situation">{item.situation}</div>
                <div className="chooser-rec">{item.rec}</div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal('test-prep-timeline')}
                >
                  Get a prep plan {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="sp-layout">
            <div>
              <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="h-display h2">Test prep for study abroad: common questions answered</h2>
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
          <h2>Not sure which test you need?</h2>
          <p>Get personalised test and score guidance based on your target countries and programmes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('test-prep-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
