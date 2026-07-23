'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const DESTINATIONS = [
  {
    country: 'USA',
    tag: 'Most Popular',
    programmes: 'MBA, MS, Computer Science, Engineering',
    fee: '$25,000 - $80,000 / year',
    intake: 'Fall (Aug) and Spring (Jan)',
    highlight: 'STEM OPT: 3 years post-study work',
  },
  {
    country: 'United Kingdom',
    tag: 'Top Ranked',
    programmes: 'MBA, MSc, MIM, Law',
    fee: '£15,000 - £45,000 / year',
    intake: 'September and January',
    highlight: '2-year Graduate Route visa',
  },
  {
    country: 'Canada',
    tag: 'Best for PR',
    programmes: 'MBA, MS, MIM, Engineering',
    fee: 'CAD 25,000 - 50,000 / year',
    intake: 'September and January',
    highlight: 'PGWP up to 3 years and PR pathway',
  },
  {
    country: 'Australia',
    tag: 'Work Rights',
    programmes: 'MBA, MS, MIM, Accounting',
    fee: 'AUD 30,000 - 55,000 / year',
    intake: 'February and July',
    highlight: 'Temporary Graduate visa: 2-5 years',
  },
  {
    country: 'Germany',
    tag: 'Lowest Cost',
    programmes: 'MS, MBA, Engineering, STEM',
    fee: '€500 - €15,000 / year',
    intake: 'October and April',
    highlight: 'Public universities: low or no tuition',
  },
  {
    country: 'Ireland',
    tag: 'EU Access',
    programmes: 'MSc, MBA, Data Science, Finance',
    fee: '€10,000 - €30,000 / year',
    intake: 'September and January',
    highlight: 'Stamp 1G: 24 months post-study work',
  },
  {
    country: 'New Zealand',
    tag: 'Quality of Life',
    programmes: 'MBA, MS, Agriculture, Engineering',
    fee: 'NZD 25,000 - 45,000 / year',
    intake: 'February and July',
    highlight: 'Post-study work visa up to 3 years',
  },
]

const PROGRAMMES_ABROAD = [
  {
    title: 'MBA Abroad',
    tagline: 'General management with a global peer network. For career switchers and professionals targeting senior international roles.',
    duration: '12-24 months',
    experience: '2-5 years (most programmes)',
  },
  {
    title: 'MS / MSc',
    tagline: 'Specialised technical or management degree. High demand in STEM, Analytics, Computer Science, Finance, and Engineering.',
    duration: '1-2 years',
    experience: 'Fresh graduates eligible',
  },
  {
    title: 'Master in Management (MIM)',
    tagline: 'Post-graduate management degree for recent graduates without extensive work experience. Strong in UK and Europe.',
    duration: '12-18 months',
    experience: '0-2 years',
  },
  {
    title: 'Bachelors Abroad',
    tagline: 'Undergraduate programme at a global university. International network, post-study work rights, and global career access.',
    duration: '3-4 years',
    experience: 'After Class 12',
  },
]

const CHOOSER = [
  {
    situation: 'You are a working professional targeting a senior international role',
    recommendation: 'MBA Abroad - USA, UK, or Canada',
    reason: 'MBA programmes combine career services, alumni networks, and internship access in the target country. USA STEM OPT gives 3 years of work authorisation post-graduation.',
  },
  {
    situation: 'You are a fresh graduate in engineering, technology, or analytics',
    recommendation: 'MS / MSc - USA, Germany, or Canada',
    reason: 'Technical MS degrees offer strong ROI. Germany\'s public universities have very low fees. USA\'s STEM OPT allows 3 years of work after graduation without a separate visa.',
  },
  {
    situation: 'Immigration to Canada or Australia is your priority',
    recommendation: 'Canada or Australia',
    reason: 'Canada\'s Express Entry awards CRS points for Canadian study, and PGWP gives 3 years of work rights. Australia\'s 485 visa gives 2-4 years and a clear PR pathway.',
  },
  {
    situation: 'Your budget is limited but you want a quality international degree',
    recommendation: 'Germany or Ireland',
    reason: 'German public universities charge around €300-500 per semester in fees, making them the most affordable quality option. Ireland offers EU-standard degrees at €10,000 - €30,000 per year with post-study work rights.',
  },
]

const TOOLS = [
  {
    title: 'Profile Evaluation',
    desc: 'Enter your academics, test scores, target country, and budget. Get a shortlist of Ambitious, Target, and Safe universities with indicative admit-likelihood and estimated costs. Free. Takes 5 minutes.',
    cta: 'Start Profile Evaluation',
    source: 'study-abroad-profile-eval',
    featured: true,
  },
  {
    title: 'Cost Calculator',
    desc: 'Estimate the total cost of studying abroad by country and city: tuition, living expenses, visa fees, health insurance, and travel. Compare countries side by side.',
    cta: 'Calculate Your Cost',
    source: 'study-abroad-cost-calc',
    featured: false,
  },
  {
    title: 'Test Prep Guides',
    desc: 'GRE, GMAT, IELTS, TOEFL, PTE, and Duolingo - which test is needed, what score is competitive, and how long to prepare. Country and programme specific.',
    cta: 'View Test Prep Guides',
    source: 'study-abroad-test-prep',
    featured: false,
  },
]

const FAQS = [
  {
    q: 'What is the minimum budget needed to study abroad from India?',
    a: 'It depends on the country and programme. Germany is the most affordable: public universities charge a semester contribution of around €300-500, so your main cost is living expenses (roughly €10,000 - €12,000 per year). Ireland ranges from €10,000 - €30,000 per year in tuition. UK, Canada, and Australia range from £15,000 - £45,000 / CAD 25,000 - 50,000 / AUD 30,000 - 55,000 per year. USA is highest at $25,000 - $80,000 per year. Indian bank education loans cover most of these under Section 80E with tax benefits.',
  },
  {
    q: 'Do I need GRE or GMAT for an MBA or MS abroad?',
    a: 'Requirements vary by programme and country. Most US MBA programmes prefer GMAT. Many MS programmes in USA and Canada require GRE. UK and Australian MBAs often waive GMAT with strong work experience. German and Irish universities frequently waive GRE and GMAT entirely. Some programmes accept either test. Our test prep guides cover the exact requirements for each country and programme type.',
  },
  {
    q: 'Can I work while studying abroad?',
    a: 'Yes. Most countries allow international students to work part-time during studies. USA permits 20 hours per week on campus on an F-1 visa. UK allows 20 hours per week during term and full-time during vacations. Canada allows 20 hours per week (no permit needed if enrolled full-time). Australia allows 48 hours per fortnight. Germany allows 120 full days or 240 half-days per year. Check the specific visa conditions for your target country before applying.',
  },
  {
    q: 'Which country is best for post-study work and immigration?',
    a: 'Canada has the clearest immigration pathway through Express Entry, with Canadian study awarding additional CRS points and PGWP giving up to 3 years of work rights. Australia\'s Temporary Graduate visa (485) gives 2-5 years of work rights with a clear PR pathway. UK\'s Graduate Route gives 2 years of unrestricted work rights. USA offers STEM OPT (36 months) for STEM degrees but no direct immigration pathway. Germany allows 18 months of post-study job search followed by a work permit.',
  },
  {
    q: 'What is a Profile Evaluation and how does it help?',
    a: 'A Profile Evaluation assesses your academic background (degree, percentage or CGPA), test scores (or \'not taken yet\'), target country, target programme, and budget. It returns a shortlist of universities grouped as Ambitious, Target, and Safe with indicative admit-likelihood bands and estimated total costs. It also recommends next steps: test prep timelines, loan options, and document preparation. The evaluation is free and takes approximately 5 minutes.',
  },
  {
    q: 'When should I start the study abroad application process?',
    a: 'For US Fall intake (August): start 12-15 months before. Take GRE or GMAT by October, request transcripts by November, and submit applications by December to January. For UK September intake: start 9-12 months before. For Canada: timelines vary; some universities accept rolling applications. For Germany: applications typically open 6 months before the October intake. Starting early gives time for test retakes and scholarship applications, both of which close well before the enrolment deadline.',
  },
]

export default function StudyAbroadClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('study-abroad')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'study-abroad') => {
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
            <span className="crumb-current">Study Abroad</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - OVERVIEW</div>
              <h1 className="h-display h1">Study Abroad from India 2026-27: Compare International University Programmes</h1>

              <div className="answer-capsule">
                Study abroad from India at globally ranked universities in the USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Compare programmes, fees, work permit rules, and immigration pathways. Profile Evaluation matches you to Ambitious, Target, and Safe universities based on your academics, test scores, and budget.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of international programmes for Indian students: MBA, MS, MIM, and Bachelors across 7 countries. Covering fees, admit requirements, post-study work rights, and immigration pathways. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('study-abroad-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#destinations" className="btn btn-secondary">Explore destinations</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8 / 5</span>
                <span className="sep">·</span>
                <span>7 countries covered</span>
                <span className="sep">·</span>
                <span>MBA, MS, MIM, Bachelors programmes</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Profile evaluation">
              <div className="sp-sidebar-header">
                <h3>Evaluate your study abroad profile</h3>
                <p>Takes 5 minutes. Shortlist with admit probability.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Countries covered:</span>
                    <strong>USA, UK, Canada, Australia, Germany, Ireland, NZ</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Programmes:</span>
                    <strong>MBA, MS, MIM, Bachelors</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Evaluation includes:</span>
                    <strong>Admit probability, cost estimate, next steps</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Cost range:</span>
                    <strong>€500 / year (Germany) to $80,000 / year (USA)</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('study-abroad-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="section-lp section-lp-alt" id="destinations">
        <div className="container">
          <div className="eyebrow">TOP DESTINATIONS</div>
          <h2 className="h-display h2">Seven countries Indian students choose in 2026</h2>
          <hr className="section-rule" />

          <div className="dest-cards">
            {DESTINATIONS.map(d => (
              <div className="prog-card dest-card" key={d.country}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div className="prog-card-title" style={{ marginBottom: 0 }}>{d.country}</div>
                  <span className="dest-tag">{d.tag}</span>
                </div>
                <div className="dest-facts">
                  <div className="dest-fact">
                    <span className="dest-fact-label">Programmes</span>
                    <span>{d.programmes}</span>
                  </div>
                  <div className="dest-fact">
                    <span className="dest-fact-label">Tuition</span>
                    <span>{d.fee}</span>
                  </div>
                  <div className="dest-fact">
                    <span className="dest-fact-label">Intakes</span>
                    <span>{d.intake}</span>
                  </div>
                </div>
                <div style={{ background: 'var(--pale-navy)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: 13, color: 'var(--navy)', fontWeight: 600 }}>
                  {d.highlight}
                </div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => openModal(`dest-${d.country}`)}
                >
                  Get guidance for {d.country} {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Programme */}
      <section className="section-lp" id="programmes">
        <div className="container">
          <div className="eyebrow">BY PROGRAMME</div>
          <h2 className="h-display h2">Which international programme is right for you?</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {PROGRAMMES_ABROAD.map(p => (
              <div className="prog-card" key={p.title}>
                <div className="prog-card-title">{p.title}</div>
                <div className="prog-card-tagline">{p.tagline}</div>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{p.duration}</span>
                  <span className="prog-card-badge">{p.experience}</span>
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

      {/* How to Choose */}
      <section className="section-lp section-lp-alt" id="choose">
        <div className="container">
          <div className="eyebrow">HOW TO CHOOSE</div>
          <h2 className="h-display h2">Which destination is right for your situation?</h2>
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
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which country or programme fits your profile?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('study-abroad-choose')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Study Abroad Tools */}
      <section className="section-lp" id="tools">
        <div className="container">
          <div className="eyebrow">STUDY ABROAD TOOLS</div>
          <h2 className="h-display h2">Three tools to plan your study abroad journey</h2>
          <hr className="section-rule" />

          <div className="tools-grid">
            {TOOLS.map(tool => (
              <div
                key={tool.title}
                className={`tool-card${tool.featured ? ' tool-card-featured' : ''}`}
              >
                {tool.featured && (
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 4 }}>
                    Primary Tool
                  </div>
                )}
                <div className="tool-card-title">{tool.title}</div>
                <div className="tool-card-desc">{tool.desc}</div>
                <button
                  type="button"
                  className={tool.featured ? 'btn btn-inverted' : 'btn btn-secondary'}
                  style={{ marginTop: 8, alignSelf: 'flex-start' }}
                  onClick={() => openModal(tool.source)}
                >
                  {tool.cta} {ARROW}
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
              <h2 className="h-display h2">Study abroad from India: common questions answered</h2>
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
          <h2>Ready to plan your Study Abroad journey?</h2>
          <p>Get a personalised shortlist of international universities matched to your academics, test scores, and budget. Free. Takes 5 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('study-abroad-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
