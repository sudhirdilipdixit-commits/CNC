'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const COMPARE_ROWS = [
  {
    country: 'USA',
    programmes: 'MBA, MS, CS',
    tuition: '$25K-$80K',
    living: '$18K-$25K',
    postStudy: 'STEM OPT: 3 yrs',
    pr: 'H-1B lottery (competitive)',
  },
  {
    country: 'UK',
    programmes: 'MBA, MSc, MIM',
    tuition: '£15K-£45K',
    living: '£12K-£18K',
    postStudy: '2-yr Graduate Route',
    pr: 'Skilled Worker visa',
  },
  {
    country: 'Canada',
    programmes: 'MBA, MS, MIM',
    tuition: 'CAD 25K-50K',
    living: 'CAD 15K-20K',
    postStudy: 'PGWP up to 3 yrs',
    pr: 'Express Entry (strong pathway)',
  },
  {
    country: 'Australia',
    programmes: 'MBA, MS, Accounting',
    tuition: 'AUD 30K-55K',
    living: 'AUD 20K-25K',
    postStudy: '485: 2-5 yrs',
    pr: 'Skilled visa (strong pathway)',
  },
  {
    country: 'Germany',
    programmes: 'MS, MBA, Engineering',
    tuition: '€500-€15K',
    living: '€10K-€12K',
    postStudy: '18-mo job search',
    pr: 'EU Blue Card',
  },
  {
    country: 'Ireland',
    programmes: 'MSc, MBA, Data Science',
    tuition: '€10K-€30K',
    living: '€12K-€15K',
    postStudy: 'Stamp 1G: 24 mo',
    pr: 'Critical Skills permit',
  },
  {
    country: 'New Zealand',
    programmes: 'MBA, MS, Agriculture',
    tuition: 'NZD 25K-45K',
    living: 'NZD 18K-22K',
    postStudy: 'Up to 3 yrs',
    pr: 'Skilled Migrant Category',
  },
]

const DESTINATIONS = [
  {
    country: 'USA',
    tag: 'Most Popular',
    programmes: 'MBA, MS, Computer Science, Engineering',
    fee: '$25,000 - $80,000 / year',
    intake: 'Fall (Aug) and Spring (Jan)',
    highlight: 'STEM OPT: 3 years post-study work for STEM graduates',
  },
  {
    country: 'United Kingdom',
    tag: 'Top Ranked',
    programmes: 'MBA, MSc, MIM, Law',
    fee: '£15,000 - £45,000 / year',
    intake: 'September and January',
    highlight: '2-year Graduate Route visa for all graduates',
  },
  {
    country: 'Canada',
    tag: 'Best for PR',
    programmes: 'MBA, MS, MIM, Engineering',
    fee: 'CAD 25,000 - 50,000 / year',
    intake: 'September and January',
    highlight: 'PGWP up to 3 years, Express Entry CRS points from Canadian study',
  },
  {
    country: 'Australia',
    tag: 'Work Rights',
    programmes: 'MBA, MS, Accounting, Nursing',
    fee: 'AUD 30,000 - 55,000 / year',
    intake: 'February and July',
    highlight: 'Temporary Graduate visa (485): 2-5 years post-study',
  },
  {
    country: 'Germany',
    tag: 'Lowest Cost',
    programmes: 'MS, MBA, Engineering, STEM',
    fee: '€500 - €15,000 / year',
    intake: 'October and April',
    highlight: 'Public universities charge semester fee only (approx €300-500)',
  },
  {
    country: 'Ireland',
    tag: 'EU Access',
    programmes: 'MSc, MBA, Data Science, Finance',
    fee: '€10,000 - €30,000 / year',
    intake: 'September and January',
    highlight: 'Stamp 1G: 24 months post-study work, EU market access',
  },
  {
    country: 'New Zealand',
    tag: 'Quality of Life',
    programmes: 'MBA, MS, Agriculture, Engineering',
    fee: 'NZD 25,000 - 45,000 / year',
    intake: 'February and July',
    highlight: 'Post-study work visa up to 3 years, Skilled Migrant Category',
  },
]

const CHOOSER = [
  {
    situation: 'You want the best MBA brand name and career services',
    recommendation: 'USA',
    reason: 'Harvard, Wharton, Booth, Kellogg, MIT Sloan peer network and OCI. STEM OPT gives 3 years of work authorisation post-graduation for STEM MBA graduates.',
  },
  {
    situation: 'You want the fastest route to permanent residency',
    recommendation: 'Canada',
    reason: 'PGWP + Express Entry CRS boost from Canadian study = fastest PR globally for Indian students. Clear pathway from study to work permit to permanent residency within 2-3 years.',
  },
  {
    situation: 'You need the most affordable quality degree',
    recommendation: 'Germany',
    reason: 'Public university semester fee €300-500, strong engineering and STEM reputation. Living costs around €800-1,200 per month in major cities. 18-month job search visa after graduation.',
  },
  {
    situation: 'You want European access plus English-language teaching',
    recommendation: 'Ireland',
    reason: 'EU market access, English instruction, Stamp 1G for 24 months post-study. Programmes in Data Science, Finance, and MBA from recognised Irish universities.',
  },
]

const FAQS = [
  {
    q: 'Which country is easiest for Indian students to get a visa?',
    a: 'Canada and Australia have the most straightforward student visa processes for Indian students with online applications and clear documentation requirements. Germany requires a blocked account of approximately €11,208 and embassy appointments which can take 6-12 weeks. USA has the most extensive process including an interview. UK processing is typically fast (3 weeks standard) but the Immigration Health Surcharge (£776/year) adds significant cost.',
  },
  {
    q: 'Which country offers the best return on investment for study abroad?',
    a: 'Germany offers the best pure ROI for STEM graduates: low tuition (semester fee only at public universities), strong engineering industry, and an 18-month job search visa after graduation. Canada is strongest for those prioritising immigration: study gives CRS points, PGWP gives work rights, and Express Entry gives a clear PR path within 2-3 years. USA has the highest cost but also the highest MBA salary outcomes for top programmes.',
  },
  {
    q: 'Can I work while studying in all seven countries?',
    a: 'Yes, all seven countries permit part-time work for international students. USA allows 20 hours per week on campus (F-1 visa). UK, Canada: 20 hours per week off campus. Australia: unlimited hours (since 2023 policy change). Germany: 120 full working days or 240 half-days per year. Ireland: 20 hours per week during term, 40 during breaks. New Zealand: 20 hours per week during term.',
  },
  {
    q: 'Is an Indian bachelor\'s degree accepted for master\'s programmes abroad?',
    a: 'A 3-year Indian bachelor\'s degree is accepted for master\'s admission in Canada, Australia, and Ireland with no additional requirements. UK universities accept 3-year degrees from recognised Indian institutions for postgraduate admission. USA typically requires a 4-year degree or equivalent; however, many US universities now accept 3-year Indian degrees from NAAC-accredited institutions, sometimes with a bridge programme. Germany generally requires a 4-year degree or equivalent.',
  },
  {
    q: 'How do I compare the cost of living across these countries?',
    a: 'The most affordable cities for students are in Germany (Berlin, Munich: €800-1,200 per month total), followed by smaller Canadian cities (Halifax, Saskatoon: CAD 1,200-1,600 per month). UK outside London (Manchester, Nottingham) costs £900-1,300 per month. Major US cities (New York, San Francisco) are most expensive at $2,500-4,000 per month. Australian cities range AUD 1,800-2,500 per month. Use our Cost Calculator for a detailed breakdown by city.',
  },
]

export default function ByDestinationClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('by-destination')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'by-destination') => {
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
            <span className="crumb-current">By Destination</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - BY DESTINATION</div>
              <h1 className="h-display h1">Study Abroad by Destination 2026-27: Compare USA, UK, Canada, Australia, Germany, Ireland, and New Zealand</h1>

              <div className="answer-capsule">
                Seven countries offer the best study abroad value for Indian students in 2026: USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Each offers a distinct mix of programme quality, tuition cost, post-study work rights, and immigration options. The right choice depends on your programme, budget, and long-term career plans.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of all seven destinations for Indian students: tuition ranges, living costs, post-study work rights, PR pathways, and which programmes are strongest in each country. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('by-destination-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare destinations</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8 / 5</span>
                <span className="sep">·</span>
                <span>7 countries compared</span>
                <span className="sep">·</span>
                <span>Fees, work permits, and PR pathways</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Destination comparison">
              <div className="sp-sidebar-header">
                <h3>Compare destinations for your profile</h3>
                <p>Takes 5 minutes. Personalised shortlist.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Countries compared:</span>
                    <strong>7</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>€500/yr (Germany) to $80,000/yr (USA)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Work permits:</span>
                    <strong>All 7 countries offer post-study work</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Best for PR:</span>
                    <strong>Canada and Australia</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('by-destination-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Country Comparison Table */}
      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="eyebrow">DESTINATION COMPARISON</div>
          <h2 className="h-display h2">All seven destinations at a glance</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Top Programmes</th>
                  <th>Tuition/Year</th>
                  <th>Living Cost/Year</th>
                  <th>Post-Study Work</th>
                  <th>PR Pathway</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(row => (
                  <tr key={row.country}>
                    <td><strong>{row.country}</strong></td>
                    <td>{row.programmes}</td>
                    <td>{row.tuition}</td>
                    <td>{row.living}</td>
                    <td>{row.postStudy}</td>
                    <td>{row.pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('by-destination-compare')}>
              Get a matched shortlist {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Destination Cards */}
      <section className="section-lp" id="destinations">
        <div className="container">
          <div className="eyebrow">EXPLORE EACH DESTINATION</div>
          <h2 className="h-display h2">Explore each destination in detail</h2>
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
                  Get matched shortlist {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose Your Destination */}
      <section className="section-lp section-lp-alt" id="choose">
        <div className="container">
          <div className="eyebrow">HOW TO CHOOSE</div>
          <h2 className="h-display h2">Which destination fits your situation?</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {CHOOSER.map(item => (
              <div className="chooser-card" key={item.situation}>
                <div className="chooser-label">If you want...</div>
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
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which destination fits your profile?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('by-destination-choose')}>
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
              <h2 className="h-display h2">Study abroad destinations: common questions answered</h2>
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
          <h2>Ready to find your ideal study destination?</h2>
          <p>Get a matched shortlist based on your academics, test scores, and budget.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('by-destination-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
