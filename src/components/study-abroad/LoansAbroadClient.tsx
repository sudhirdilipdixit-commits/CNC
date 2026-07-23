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
    heading: 'Compare lenders and get pre-qualification',
    body: 'Use the comparison above to shortlist 2-3 lenders. Share your university, programme, and estimated cost to get a pre-qualification estimate. This does not affect your credit score.',
  },
  {
    num: 2,
    heading: 'Collect documents',
    body: 'KYC (Aadhaar, PAN), academic documents (marksheets, certificates), admission letter, fee structure from the university, proof of collateral if applicable, income documents for co-applicant (parent/guardian).',
  },
  {
    num: 3,
    heading: 'Submit the formal application',
    body: 'Apply online or at a branch. The lender will assess your profile, verify documents, and conduct collateral valuation if needed. Processing takes 7-20 working days depending on the lender.',
  },
  {
    num: 4,
    heading: 'Receive the sanction letter',
    body: 'The sanction letter states the approved amount, interest rate, moratorium period, and repayment terms. Read it carefully before accepting. This letter is often required by the university for visa applications.',
  },
  {
    num: 5,
    heading: 'Loan disbursement',
    body: 'Funds are usually disbursed directly to the university in tranches aligned with semester fee schedules. Living expense components are credited to your bank account separately.',
  },
]

const FAQS = [
  {
    q: 'Can I get an education loan before receiving an admission offer?',
    a: 'You can get a provisional sanction letter before receiving a formal admission offer, based on your intended university and programme. This helps you understand how much loan you are eligible for before applying to universities. However, the loan is only fully sanctioned and disbursed after you present a confirmed admission offer or I-20 letter from the university.',
  },
  {
    q: 'What is the moratorium period on an education loan?',
    a: 'The moratorium period is the time during which you do not need to repay the principal of the loan. For most Indian education loans, the moratorium is the study period plus 6-12 months after course completion, or 6-12 months after getting a job, whichever is earlier. During the moratorium, you may still be charged simple interest which you can pay as it accrues (recommended) or defer to the repayment period.',
  },
  {
    q: 'Is collateral always required for education loans above Rs 7.5 lakh?',
    a: 'Nationalised banks (SBI, Bank of Baroda) typically require collateral for loans above Rs 7.5 lakh. However, NBFCs like HDFC Credila, Avanse, and Auxilo offer collateral-free loans up to Rs 75 lakh for students admitted to QS top 200 or Times Higher Education top 200 universities. If your university is not in those rankings, collateral is likely required for amounts above Rs 7.5-15 lakh.',
  },
  {
    q: 'Can I repay the loan from abroad using my foreign income?',
    a: "Yes. Most Indian education loans can be repaid from foreign income via SWIFT transfer to the lender's account. Prodigy Finance specifically structures loans to be repaid in the currency of your country of employment, eliminating currency conversion risk. For Indian bank loans repaid in foreign currency, check the lender's policy on forex payments and any associated charges.",
  },
  {
    q: 'Is the education loan interest rate fixed or floating?',
    a: 'Most Indian education loans are on floating interest rates linked to the MCLR (Marginal Cost of Lending Rate) or the RBI repo rate. This means the rate can change during your loan tenure as the benchmark rate changes. Prodigy Finance offers fixed-rate foreign currency loans. Fixed-rate options in INR are rare in the Indian education loan market. Ask your lender to show you the rate revision history to understand the typical range.',
  },
]

export default function LoansAbroadClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('loans-abroad')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'loans-abroad') => {
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
            <span className="crumb-current">Education Loans Abroad</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - EDUCATION LOANS</div>
              <h1 className="h-display h1">Education Loans for Studying Abroad: 2026-27 Guide for Indian Students</h1>

              <div className="answer-capsule">
                Indian students can fund study abroad through education loans from nationalised banks like SBI and Bank of Baroda, private lenders like HDFC Credila, and NBFCs like Avanse and Auxilo. Loan amounts range from Rs 20 lakh to Rs 1.5 crore. Interest paid is fully tax-deductible under Section 80E for 8 years from the start of repayment.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                An education loan is how most Indian students fund study abroad. The right lender depends on your loan amount, whether you have collateral, and which university you are going to. This guide compares all major options with accurate 2026 rates and processes.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('loans-abroad-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare lenders</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>6 lenders compared</span>
                <span className="sep">·</span>
                <span>Section 80E tax benefit</span>
                <span className="sep">·</span>
                <span>Collateral-free options</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Education loan guidance">
              <div className="sp-sidebar-header">
                <h3>Get education loan guidance</h3>
                <p>Takes 5 minutes. Matched to your loan amount and university.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Loan amount:</span>
                    <strong>Up to Rs 1.5 crore</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Collateral-free:</span>
                    <strong>Up to Rs 75 lakh (top universities)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Section 80E:</span>
                    <strong>Interest deductible for 8 years</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Processing:</span>
                    <strong>7-15 working days</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('loans-abroad-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Secured vs Collateral-Free */}
      <section className="section-lp section-lp-alt" id="types">
        <div className="container">
          <div className="eyebrow">LOAN TYPES</div>
          <h2 className="h-display h2">Secured versus collateral-free education loans</h2>
          <hr className="section-rule" />

          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>Secured Loans (with collateral)</h4>
              <ul className="fit-list">
                <li><span><strong>Collateral:</strong> Property, FD, LIC policy, or NSC</span></li>
                <li><span><strong>Loan amount:</strong> Up to Rs 1.5 crore</span></li>
                <li><span><strong>Interest rate:</strong> 9.5% - 11.5% per annum (typically lower)</span></li>
                <li><span><strong>Best for:</strong> Large loans, lower-ranked universities, private sector lenders</span></li>
                <li><span><strong>Key lenders:</strong> SBI, Bank of Baroda, Bank of India</span></li>
              </ul>
            </div>

            <div className="fit-box fit-yes">
              <h4>Collateral-Free Loans</h4>
              <ul className="fit-list">
                <li><span>No property or asset required</span></li>
                <li><span><strong>Loan amount:</strong> Up to Rs 75 lakh (top-ranked universities only)</span></li>
                <li><span><strong>Interest rate:</strong> 11% - 14.5% per annum</span></li>
                <li><span><strong>Best for:</strong> Top 200 QS ranked universities, fast processing</span></li>
                <li><span><strong>Key lenders:</strong> HDFC Credila, Avanse, Auxilo, Prodigy Finance</span></li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('loans-abroad-types')}>
              Find the Right Loan for Your Profile {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Lender Comparison */}
      <section className="section-lp" id="compare">
        <div className="container">
          <div className="eyebrow">LENDER COMPARISON</div>
          <h2 className="h-display h2">Major education loan providers for study abroad: 2026 comparison</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Max Loan</th>
                  <th>Collateral</th>
                  <th>Interest Rate</th>
                  <th>Processing Time</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>SBI Scholar Loan</strong></td>
                  <td>Rs 1.5 crore</td>
                  <td>Required &gt;Rs 7.5 lakh</td>
                  <td>~10.9% p.a.</td>
                  <td>15-20 working days</td>
                  <td>Premier institutions (IIMs, IITs abroad equivalent)</td>
                </tr>
                <tr>
                  <td><strong>Bank of Baroda Baroda Vidya</strong></td>
                  <td>Rs 80 lakh</td>
                  <td>Required &gt;Rs 7.5 lakh</td>
                  <td>~10.85% p.a.</td>
                  <td>10-15 working days</td>
                  <td>Good rates, wide branch network</td>
                </tr>
                <tr>
                  <td><strong>HDFC Credila</strong></td>
                  <td>Rs 75 lakh (CF)</td>
                  <td>Optional</td>
                  <td>11.5%-13.5% p.a.</td>
                  <td>7-10 working days</td>
                  <td>Top-ranked universities, fast processing</td>
                </tr>
                <tr>
                  <td><strong>Avanse Financial Services</strong></td>
                  <td>Rs 75 lakh</td>
                  <td>Optional</td>
                  <td>11%-14% p.a.</td>
                  <td>7-10 working days</td>
                  <td>Digital-first, covers living costs</td>
                </tr>
                <tr>
                  <td><strong>Auxilo Finserve</strong></td>
                  <td>Rs 75 lakh</td>
                  <td>Optional</td>
                  <td>11.5%-13.5% p.a.</td>
                  <td>7-10 working days</td>
                  <td>No collateral for QS top 200</td>
                </tr>
                <tr>
                  <td><strong>Prodigy Finance</strong></td>
                  <td>Up to $220,000</td>
                  <td>None</td>
                  <td>7%-14% (USD)</td>
                  <td>1-2 weeks</td>
                  <td>Foreign currency loan repaid abroad</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-card" style={{ marginTop: 20 }}>
            <div className="info-card-title">Note on rates</div>
            <p>Interest rates are indicative as of July 2026 and are subject to change based on RBI repo rate and individual credit assessment. Rates shown are for female applicants at nationalised banks; add 0.5% for male applicants. Always request a formal sanction letter before finalising a university offer.</p>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('loans-abroad-compare')}>
              Get Matched to the Right Lender {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Section 80E Tax Benefit */}
      <section className="section-lp section-lp-alt" id="tax">
        <div className="container">
          <div className="eyebrow">TAX BENEFIT</div>
          <h2 className="h-display h2">Section 80E: the education loan tax deduction</h2>
          <hr className="section-rule" />

          <div className="info-card">
            <div className="info-card-title">Section 80E overview</div>
            <p>Section 80E of the Income Tax Act allows a deduction on the interest paid on education loans taken for higher education, including study abroad. The deduction applies for the year you start repaying and the next 7 years (8 years total). There is no upper limit on the interest amount that can be deducted.</p>
          </div>

          <h3 className="h-display h3" style={{ marginTop: 36, marginBottom: 16 }}>Example: Tax saving on a Rs 50 lakh loan at 12% per annum</h3>

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Interest Paid (approx)</th>
                  <th>Tax Saved (30% bracket)</th>
                  <th>Tax Saved (20% bracket)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Year 1 (moratorium)</td>
                  <td>Rs 6,00,000</td>
                  <td>Rs 1,80,000</td>
                  <td>Rs 1,20,000</td>
                </tr>
                <tr>
                  <td>Year 2 (repayment start)</td>
                  <td>Rs 5,40,000</td>
                  <td>Rs 1,62,000</td>
                  <td>Rs 1,08,000</td>
                </tr>
                <tr>
                  <td>Year 3</td>
                  <td>Rs 4,80,000</td>
                  <td>Rs 1,44,000</td>
                  <td>Rs 96,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: 'var(--grey)', marginTop: 8 }}>This is illustrative only. Consult a tax professional for your specific situation.</p>

          <div className="chooser-grid" style={{ marginTop: 32 }}>
            <div className="chooser-card">
              <div className="chooser-situation">Who can claim Section 80E?</div>
              <div className="chooser-rec">
                Only the individual who took the loan (student or parent). Applicable for loans from financial institutions and approved charitable institutions. Does not apply to loans from relatives or personal credit lines. Must be for a course of higher education (graduate or postgraduate).
              </div>
            </div>
            <div className="chooser-card">
              <div className="chooser-situation">What qualifies as higher education for 80E?</div>
              <div className="chooser-rec">
                Any full-time course after Class 12 at a university, college, school, or other educational institution outside India. Vocational courses may not qualify; always verify with a tax professional before filing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Application Process */}
      <section className="section-lp" id="process">
        <div className="container">
          <div className="eyebrow">APPLICATION PROCESS</div>
          <h2 className="h-display h2">How to apply for an education loan: step by step</h2>
          <hr className="section-rule" />

          <div>
            {STEPS.map(step => (
              <div key={step.num} className="q-item">
                <div className="q-num">{step.num}</div>
                <div className="q-body">
                  <h4>{step.heading}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('loans-abroad-process')}>
              Get Loan Application Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">Education loans for study abroad: common questions answered</h2>
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
          <h2>Get matched to the right education loan for your study abroad plan.</h2>
          <p>Get guidance on loan eligibility, lender comparison, and application support.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('loans-abroad-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
