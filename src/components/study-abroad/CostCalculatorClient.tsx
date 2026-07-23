'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

type Country = 'USA' | 'UK' | 'Canada' | 'Australia' | 'Germany' | 'Ireland' | 'New Zealand'

const COST_DATA: Record<Country, {
  tuition: string
  tuitionINR: string
  living: string
  livingINR: string
  visa: string
  insurance: string
  travel: string
  totalLow: string
  totalHigh: string
  currency: string
  note: string
}> = {
  USA: {
    currency: 'USD',
    tuition: '$25,000 - $80,000',
    tuitionINR: 'Rs 21 lakh - Rs 67 lakh',
    living: '$18,000 - $28,000',
    livingINR: 'Rs 15 lakh - Rs 23.5 lakh',
    visa: '$535 (F-1 + SEVIS)',
    insurance: '$1,500 - $3,000 / year',
    travel: 'Rs 80,000 - Rs 1.5 lakh (return)',
    totalLow: 'Rs 36 lakh',
    totalHigh: 'Rs 90 lakh',
    note: 'STEM OPT allows 3 years of paid work after graduation, partially offsetting loan cost.',
  },
  UK: {
    currency: 'GBP',
    tuition: '£15,000 - £45,000',
    tuitionINR: 'Rs 16 lakh - Rs 48 lakh',
    living: '£12,000 - £18,000',
    livingINR: 'Rs 13 lakh - Rs 19 lakh',
    visa: '£363 + £776/yr Immigration Health Surcharge',
    insurance: 'Covered by IHS (Immigration Health Surcharge)',
    travel: 'Rs 70,000 - Rs 1.2 lakh (return)',
    totalLow: 'Rs 29 lakh',
    totalHigh: 'Rs 67 lakh',
    note: 'Most UK master\'s programmes are 1 year, reducing total cost vs 2-year programmes in USA and Canada.',
  },
  Canada: {
    currency: 'CAD',
    tuition: 'CAD 25,000 - CAD 50,000',
    tuitionINR: 'Rs 15.5 lakh - Rs 31 lakh',
    living: 'CAD 15,000 - CAD 20,000',
    livingINR: 'Rs 9.3 lakh - Rs 12.4 lakh',
    visa: 'CAD 150 + biometrics CAD 85',
    insurance: 'CAD 600 - CAD 900 / year',
    travel: 'Rs 80,000 - Rs 1.4 lakh (return)',
    totalLow: 'Rs 25 lakh',
    totalHigh: 'Rs 43 lakh',
    note: 'PGWP allows you to work full-time in Canada for up to 3 years after graduation, with a clear PR pathway via Express Entry.',
  },
  Australia: {
    currency: 'AUD',
    tuition: 'AUD 30,000 - AUD 55,000',
    tuitionINR: 'Rs 16.8 lakh - Rs 30.8 lakh',
    living: 'AUD 20,000 - AUD 25,000',
    livingINR: 'Rs 11.2 lakh - Rs 14 lakh',
    visa: 'AUD 710 (Student visa 500)',
    insurance: 'OSHC: AUD 700 - AUD 1,200 / year',
    travel: 'Rs 75,000 - Rs 1.3 lakh (return)',
    totalLow: 'Rs 28 lakh',
    totalHigh: 'Rs 45 lakh',
    note: 'International students can work unlimited hours (since 2023 policy). Temporary Graduate visa gives 2-5 years post-study.',
  },
  Germany: {
    currency: 'EUR',
    tuition: '€0 - €15,000 (public: semester fee ~€300-500)',
    tuitionINR: 'Rs 28,000 - Rs 13.8 lakh',
    living: '€10,000 - €13,200',
    livingINR: 'Rs 9.2 lakh - Rs 12.1 lakh',
    visa: '€75 (National Visa)',
    insurance: '€100 - €120 / month (mandatory)',
    travel: 'Rs 70,000 - Rs 1.2 lakh (return)',
    totalLow: 'Rs 8 lakh (public, no tuition)',
    totalHigh: 'Rs 26 lakh',
    note: 'Public universities charge only a semester contribution (~€300-500 per semester). Living in smaller cities reduces costs significantly.',
  },
  Ireland: {
    currency: 'EUR',
    tuition: '€10,000 - €30,000',
    tuitionINR: 'Rs 9.2 lakh - Rs 27.6 lakh',
    living: '€12,000 - €18,000',
    livingINR: 'Rs 11 lakh - Rs 16.6 lakh',
    visa: '€60 (Study Visa - if required)',
    insurance: 'Included in most programmes or ~€500/year',
    travel: 'Rs 70,000 - Rs 1.2 lakh (return)',
    totalLow: 'Rs 20 lakh',
    totalHigh: 'Rs 44 lakh',
    note: 'Stamp 1G allows 24 months of work after graduation. Dublin is expensive; consider Galway, Cork, or Limerick for lower living costs.',
  },
  'New Zealand': {
    currency: 'NZD',
    tuition: 'NZD 25,000 - NZD 45,000',
    tuitionINR: 'Rs 12.8 lakh - Rs 23 lakh',
    living: 'NZD 18,000 - NZD 22,000',
    livingINR: 'Rs 9.2 lakh - Rs 11.2 lakh',
    visa: 'NZD 375 (Student visa)',
    insurance: 'NZD 600 - NZD 1,000 / year',
    travel: 'Rs 80,000 - Rs 1.5 lakh (return)',
    totalLow: 'Rs 22 lakh',
    totalHigh: 'Rs 34 lakh',
    note: 'Post-study work visa up to 3 years. Smaller country with a high quality of life and relatively lower living costs than Australia.',
  },
}

const COUNTRIES: Country[] = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand']

const COMPARISON_ROWS = [
  { country: 'Germany', low: 'Rs 8 lakh', high: 'Rs 26 lakh', duration: '2 years', total: 'Rs 16-52 lakh' },
  { country: 'Ireland', low: 'Rs 20 lakh', high: 'Rs 44 lakh', duration: '1-2 years', total: 'Rs 20-88 lakh' },
  { country: 'New Zealand', low: 'Rs 22 lakh', high: 'Rs 34 lakh', duration: '1-2 years', total: 'Rs 22-68 lakh' },
  { country: 'Canada', low: 'Rs 25 lakh', high: 'Rs 43 lakh', duration: '1-2 years', total: 'Rs 25-86 lakh' },
  { country: 'Australia', low: 'Rs 28 lakh', high: 'Rs 45 lakh', duration: '1-2 years', total: 'Rs 28-90 lakh' },
  { country: 'UK', low: 'Rs 29 lakh', high: 'Rs 67 lakh', duration: '1 year (most masters)', total: 'Rs 29-67 lakh' },
  { country: 'USA', low: 'Rs 36 lakh', high: 'Rs 90 lakh', duration: '1.5-2 years', total: 'Rs 54-180 lakh' },
]

const SAVINGS_CARDS = [
  {
    title: 'Choose a public university in Germany or Canada',
    detail:
      'Public universities in Germany charge a semester contribution (~€300-500) rather than tuition. In Canada, some provincial universities have significantly lower fees than Ontario schools. The degree quality at a well-ranked public university is comparable to private institutions at a fraction of the cost.',
  },
  {
    title: 'Choose a smaller city over a capital city',
    detail:
      'Living in Manchester, Edinburgh, or Nottingham costs 30-40% less than London. Halifax or Saskatoon costs 25-35% less than Toronto or Vancouver. Berlin is significantly cheaper than Munich. The degree from the same university is identical regardless of which campus or city.',
  },
  {
    title: 'Apply for university merit scholarships early',
    detail:
      'Many universities automatically award 10-30% tuition waivers to high-achieving international students at the time of admission. This requires no separate application - just a strong academic record. Combined with an education loan, a 25% tuition waiver substantially reduces the total loan burden.',
  },
  {
    title: 'Take up part-time work during study',
    detail:
      'All 7 countries allow international students to work part-time during their programme. At 20 hours per week at a student-market wage, you can offset Rs 3-6 lakh of living costs per year. Australia now allows unlimited working hours (since 2023), making it possible to offset a larger portion of living costs.',
  },
]

const LOAN_ROWS = [
  { amount: 'Rs 20 lakh', emi11: 'Rs 27,550', emi12: 'Rs 28,694', emi13: 'Rs 29,860', total12: 'Rs 34.4 lakh' },
  { amount: 'Rs 40 lakh', emi11: 'Rs 55,100', emi12: 'Rs 57,388', emi13: 'Rs 59,720', total12: 'Rs 68.9 lakh' },
  { amount: 'Rs 60 lakh', emi11: 'Rs 82,650', emi12: 'Rs 86,082', emi13: 'Rs 89,580', total12: 'Rs 103.3 lakh' },
  { amount: 'Rs 80 lakh', emi11: 'Rs 1,10,200', emi12: 'Rs 1,14,775', emi13: 'Rs 1,19,440', total12: 'Rs 137.7 lakh' },
]

const FAQS = [
  {
    q: 'Does the cost estimate include health insurance?',
    a: 'Yes. Each country estimate includes the mandatory health insurance requirement: the UK Immigration Health Surcharge (£776/year, paid upfront with the visa fee), Australia\'s Overseas Student Health Cover (OSHC, AUD 700-1,200/year), and Germany\'s mandatory statutory health insurance (~€100-120/month). USA and Canada health insurance varies by university plan (typically $1,500-3,000/year, often mandatory through the university).',
  },
  {
    q: 'Are there hidden costs not shown in the calculator?',
    a: 'Some costs vary and are not fully captured in averages: airport pickup and initial setup (Rs 20,000-50,000), laptop and course materials (Rs 30,000-80,000/year), exam and certification fees (Rs 5,000-20,000), and one-time university orientation fees. For USA, the SEVIS fee ($350) is a fixed additional cost. Budget an additional 10-15% over the stated estimate for these variable costs in the first year.',
  },
  {
    q: 'How do exchange rate fluctuations affect my loan?',
    a: 'Education loans from Indian banks are disbursed in INR and the university invoices in the local currency. If the INR weakens against the local currency after your loan is sanctioned, the tuition becomes more expensive in INR terms and the sanctioned loan amount may not be sufficient. Prodigy Finance offers foreign-currency loans that eliminate this risk by lending in the currency you will repay in. For INR loans, build a 10-15% buffer into your loan amount to absorb exchange rate movement.',
  },
  {
    q: 'Can I use my part-time income abroad to pay living expenses?',
    a: 'Yes, and it is a recommended approach. At 20 hours per week (the standard student work allowance in UK, Canada, and USA), a student earning minimum wage in the local country can offset Rs 2-5 lakh per year in living costs. Australia now permits unlimited working hours for international students, making it possible to offset a higher portion. This effectively reduces the education loan needed for living costs, lowering your EMI and total repayment.',
  },
  {
    q: 'Is the cost different for undergraduate versus postgraduate programmes?',
    a: 'Generally yes. Undergraduate programmes are 3-4 years, so total cost is higher even if annual fees are similar or lower than postgraduate. In the UK, undergraduate annual tuition for international students is typically £15,000-30,000 (vs £15,000-45,000 for taught master\'s). In Germany, both are similarly low at public universities. In the USA, the annual cost of a bachelor\'s degree at a private university is similar to an MBA but the duration is 4 years, making total cost significantly higher.',
  },
]

export default function CostCalculatorClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('cost-calculator')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Country>('USA')

  const openModal = useCallback((source = 'cost-calculator') => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  const data = COST_DATA[selectedCountry]

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
            <span className="crumb-current">Cost Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - COST CALCULATOR</div>
              <h1 className="h-display h1">Study Abroad Cost Calculator 2026-27: USA, UK, Canada, Australia, Germany, Ireland, New Zealand</h1>

              <div className="answer-capsule">
                The total cost of studying abroad from India covers tuition, living expenses, visa fees, health insurance, and travel. Annual costs range from Rs 8-24 lakh in Germany (public universities) to Rs 70-90 lakh at top US private universities. Living costs vary widely by city. Education loans cover most of these costs.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Understanding the real cost of studying abroad before you apply lets you plan your loan, choose the right city, and compare destinations on a like-for-like basis. This calculator uses real 2026 data for tuition, living costs, visa fees, health insurance, and travel.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('cost-calculator-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#calculator" className="btn btn-secondary">Open cost calculator</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>7 countries</span>
                <span className="sep">·</span>
                <span>Tuition plus living plus all fees</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Cost estimate">
              <div className="sp-sidebar-header">
                <h3>Get a personalised cost estimate</h3>
                <p>Takes 5 minutes. Matched to your programme and city.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Countries:</span>
                    <strong>USA, UK, Canada, Australia, Germany, Ireland, NZ</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Cost range:</span>
                    <strong>Rs 8 lakh/year (Germany) to Rs 90 lakh/year (USA top schools)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Loan coverage:</span>
                    <strong>Up to Rs 1.5 crore</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Section 80E:</span>
                    <strong>Interest tax deductible</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('cost-calculator-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Interactive Cost Calculator */}
      <section className="section-lp section-lp-alt" id="calculator">
        <div className="container">
          <div className="eyebrow">INTERACTIVE CALCULATOR</div>
          <h2 className="h-display h2">Estimated total cost of studying abroad: select a country</h2>
          <hr className="section-rule" />

          {/* Country selector buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
            {COUNTRIES.map(country => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                style={{
                  background: selectedCountry === country ? 'var(--navy)' : 'var(--white)',
                  color: selectedCountry === country ? 'white' : 'var(--navy)',
                  border: selectedCountry === country ? '1px solid var(--navy)' : '1px solid var(--mist)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Cost breakdown table */}
          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Cost Component</th>
                  <th>Amount ({data.currency})</th>
                  <th>Amount in INR (approx)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tuition (per year)</td>
                  <td>{data.tuition}</td>
                  <td>{data.tuitionINR}</td>
                </tr>
                <tr>
                  <td>Living expenses (per year)</td>
                  <td>{data.living}</td>
                  <td>{data.livingINR}</td>
                </tr>
                <tr>
                  <td>Student visa fee (one-time)</td>
                  <td>{data.visa}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Health insurance (per year)</td>
                  <td>{data.insurance}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Return travel (estimate)</td>
                  <td>-</td>
                  <td>{data.travel}</td>
                </tr>
                <tr style={{ fontWeight: 700, background: 'var(--pale-navy, #eef2f8)' }}>
                  <td><strong>Total per year (approx)</strong></td>
                  <td>-</td>
                  <td><strong>{data.totalLow} to {data.totalHigh}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key insight card */}
          <div className="info-card" style={{ marginTop: 24 }}>
            <div className="info-card-title">Key insight for {selectedCountry}</div>
            <p style={{ margin: 0 }}>{data.note}</p>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal(`cost-calc-${selectedCountry}`)}>
              Get personalised estimate for {selectedCountry} {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Country Comparison Overview */}
      <section className="section-lp" id="compare">
        <div className="container">
          <div className="eyebrow">COST COMPARISON</div>
          <h2 className="h-display h2">Annual total cost comparison: all 7 countries</h2>
          <hr className="section-rule" />

          <p style={{ color: 'var(--charcoal)', fontSize: 14, marginBottom: 24 }}>
            Costs shown are approximate 2026 figures for a master's programme (tuition + living + fees). Exchange rates: $1=Rs84, £1=Rs106, CAD1=Rs62, AUD1=Rs56, EUR1=Rs92, NZD1=Rs51.
          </p>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Low Estimate / Year</th>
                  <th>High Estimate / Year</th>
                  <th>Programme Duration</th>
                  <th>Total for Full Programme (approx)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.country}>
                    <td><strong>{row.country}</strong></td>
                    <td>{row.low}</td>
                    <td>{row.high}</td>
                    <td>{row.duration}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cost-Saving Strategies */}
      <section className="section-lp section-lp-alt" id="savings">
        <div className="container">
          <div className="eyebrow">COST-SAVING STRATEGIES</div>
          <h2 className="h-display h2">Four ways to reduce your study abroad cost</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {SAVINGS_CARDS.map(card => (
              <div className="chooser-card" key={card.title}>
                <div className="chooser-situation">{card.title}</div>
                <div className="chooser-rec">{card.detail}</div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal(`savings-${card.title.slice(0, 20)}`)}
                >
                  Get guidance on this approach {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan EMI Guide */}
      <section className="section-lp" id="loan">
        <div className="container">
          <div className="eyebrow">LOAN EMI GUIDE</div>
          <h2 className="h-display h2">What your education loan will cost per month</h2>
          <hr className="section-rule" />

          <div className="info-card" style={{ marginBottom: 28 }}>
            <div className="info-card-title">About the moratorium period</div>
            <p style={{ margin: 0 }}>
              The moratorium period (study + 6-12 months) means you start repaying after you are employed. At a 12% floating rate on a 10-year repayment term, the EMI per Rs 10 lakh borrowed is approximately Rs 14,347 per month.
            </p>
          </div>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Loan Amount</th>
                  <th>EMI at 11% (10 yr)</th>
                  <th>EMI at 12% (10 yr)</th>
                  <th>EMI at 13% (10 yr)</th>
                  <th>Total Repaid at 12%</th>
                </tr>
              </thead>
              <tbody>
                {LOAN_ROWS.map(row => (
                  <tr key={row.amount}>
                    <td><strong>{row.amount}</strong></td>
                    <td>{row.emi11}</td>
                    <td>{row.emi12}</td>
                    <td>{row.emi13}</td>
                    <td>{row.total12}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 13, color: 'var(--charcoal)', marginTop: 16 }}>
            EMIs are indicative only. Actual EMI depends on the sanctioned rate, which is floating. Section 80E deducts the interest portion for 8 years, reducing the net cost significantly at higher tax brackets.
          </p>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('cost-loan-emi')}>
              Get matched education loan options {ARROW}
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
              <h2 className="h-display h2">Study abroad costs: common questions answered</h2>
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
          <h2>Get a personalised cost estimate for your study abroad plan.</h2>
          <p>We will match you with the right loan, scholarships, and programme based on your budget and target country.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('cost-calculator-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
