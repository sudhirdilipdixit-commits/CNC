'use client'

import { useMemo, useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const LOAN_PRESETS = [200000, 500000, 1000000, 2000000]

const BANK_RATES = [
  { label: 'SBI', rate: 9.5 },
  { label: 'HDFC', rate: 10.5 },
  { label: 'ICICI', rate: 11 },
]

function formatINR(n: number) {
  if (!isFinite(n)) return 'Rs 0'
  return 'Rs ' + Math.round(n).toLocaleString('en-IN')
}

function calcEmi(principal: number, annualRatePercent: number, months: number) {
  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 }
  }
  const r = annualRatePercent / 12 / 100
  if (r === 0) {
    const emi = principal / months
    return { emi, totalPayment: principal, totalInterest: 0 }
  }
  const pow = Math.pow(1 + r, months)
  const emi = (principal * r * pow) / (pow - 1)
  const totalPayment = emi * months
  return { emi, totalPayment, totalInterest: totalPayment - principal }
}

const FAQS = [
  {
    q: 'How is the EMI calculated?',
    a: 'EMI = P x R x (1+R)^N / ((1+R)^N - 1), where P is the loan (principal) amount, R is the monthly interest rate (annual rate / 12 / 100), and N is the number of monthly instalments. For an interest-free university plan, the calculation simplifies to the loan amount divided by the number of instalments.',
  },
  {
    q: 'Are the SBI, HDFC, and ICICI rates on this page exact?',
    a: 'No. They are indicative starting points for education loan interest rates, used only to give you a realistic figure to plan around. Actual rates depend on your loan amount, collateral, co-applicant income, and the lender\'s current policy. Always confirm the exact rate in your sanction letter before committing.',
  },
  {
    q: 'What is a university direct EMI plan?',
    a: 'Some universities let you pay your total fee in interest-free instalments spread across the programme duration, sometimes with a one-time processing fee. It avoids bank interest entirely but the repayment window is shorter (tied to the programme length) than a typical 5-15 year bank loan tenure.',
  },
  {
    q: 'Can I deduct education loan interest from my taxes?',
    a: 'Under Section 80E of the Income Tax Act, the interest paid on an education loan (not the principal) is fully deductible from taxable income for up to 8 years from the year repayment starts. This does not apply to interest-free university direct plans, since there is no interest to deduct.',
  },
]

export default function EMICalculatorClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('emi-calculator')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [loanAmount, setLoanAmount] = useState(500000)
  const [bankRate, setBankRate] = useState(10.5)
  const [bankTenureYears, setBankTenureYears] = useState(5)
  const [univTenureMonths, setUnivTenureMonths] = useState(24)
  const [univFeePercent, setUnivFeePercent] = useState(1)

  const openModal = useCallback((source = 'emi-calculator') => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  const bank = useMemo(
    () => calcEmi(loanAmount, bankRate, bankTenureYears * 12),
    [loanAmount, bankRate, bankTenureYears]
  )

  const univ = useMemo(() => {
    const base = calcEmi(loanAmount, 0, univTenureMonths)
    const fee = (loanAmount * univFeePercent) / 100
    return { ...base, fee, totalCost: base.totalPayment + fee }
  }, [loanAmount, univTenureMonths, univFeePercent])

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--mist)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <a href="/resources/tools-and-calculators">Tools and Calculators</a>
            <span className="sep">/</span>
            <span className="crumb-current">MBA Fee and EMI Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">RESOURCES - EMI CALCULATOR</div>
              <h1 className="h-display h1">MBA Fee and EMI Calculator 2026-27</h1>

              <div className="answer-capsule">
                Enter your MBA fee, and this calculator works out your monthly instalment two ways: a bank education loan at an interest rate you choose, or an interest-free university direct payment plan. Compare the monthly outgo and total cost side by side before you commit to either.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Use it to sanity-check any fee quote before you enrol - whether it is an Online MBA, a Distance MBA, or a study-abroad programme.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('emi-calculator-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#calculator" className="btn btn-secondary">Open calculator</a>
              </div>

              <div className="trust-strip">
                <span>Bank loan vs university plan, compared instantly</span>
                <span className="sep">·</span>
                <span>No sign-up required</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick facts">
              <div className="sp-sidebar-header">
                <h3>Not sure which option to choose?</h3>
                <p>Get a recommendation matched to your fee and cash flow.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Bank loan tenure:</span>
                    <strong>Up to 15 years</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>University plan:</span>
                    <strong>Interest-free, tied to programme length</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Section 80E:</span>
                    <strong>Bank loan interest is tax deductible</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('emi-calculator-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="section-lp section-lp-alt" id="calculator">
        <div className="container">
          <div className="eyebrow">INTERACTIVE CALCULATOR</div>
          <h2 className="h-display h2">Work out your monthly instalment</h2>
          <hr className="section-rule" />

          <div className="form-field">
            <label htmlFor="loan-amount">Total fee / loan amount</label>
            <input
              id="loan-amount"
              type="number"
              min={10000}
              step={10000}
              value={loanAmount}
              onChange={e => setLoanAmount(Math.max(0, Number(e.target.value)))}
            />
            <div className="hint">{formatINR(loanAmount)}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {LOAN_PRESETS.map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setLoanAmount(amt)}
                style={{
                  background: loanAmount === amt ? 'var(--navy)' : 'var(--white)',
                  color: loanAmount === amt ? 'white' : 'var(--navy)',
                  border: loanAmount === amt ? '1px solid var(--navy)' : '1px solid var(--mist)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {formatINR(amt)}
              </button>
            ))}
          </div>

          <div className="prog-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 0 }}>
            {/* Bank loan card */}
            <div className="prog-card">
              <div className="prog-card-mode">BANK EDUCATION LOAN</div>
              <div className="form-field-row" style={{ marginBottom: 0 }}>
                <div className="form-field">
                  <label htmlFor="bank-rate">Interest rate (% p.a.)</label>
                  <input
                    id="bank-rate"
                    type="number"
                    min={0}
                    step={0.1}
                    value={bankRate}
                    onChange={e => setBankRate(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="bank-tenure">Tenure (years)</label>
                  <input
                    id="bank-tenure"
                    type="number"
                    min={1}
                    max={15}
                    value={bankTenureYears}
                    onChange={e => setBankTenureYears(Math.min(15, Math.max(1, Number(e.target.value))))}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {BANK_RATES.map(b => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setBankRate(b.rate)}
                    style={{
                      background: 'var(--pale-navy)',
                      color: 'var(--navy)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      cursor: 'pointer',
                      padding: '4px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {b.label} {b.rate}%
                  </button>
                ))}
              </div>
              <div className="hint" style={{ marginBottom: 12 }}>Indicative rates only - confirm with the lender.</div>
              <hr className="section-rule" style={{ margin: '8px 0 16px' }} />
              <div style={{ fontSize: 13, color: 'var(--grey)', marginBottom: 4 }}>Monthly EMI</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--navy)', marginBottom: 12 }}>
                {formatINR(bank.emi)}
              </div>
              <div className="sp-sidebar-stats">
                <div className="sp-sidebar-stat">
                  <span>Total interest:</span>
                  <strong>{formatINR(bank.totalInterest)}</strong>
                </div>
                <div className="sp-sidebar-stat">
                  <span>Total repayment:</span>
                  <strong>{formatINR(bank.totalPayment)}</strong>
                </div>
              </div>
            </div>

            {/* University plan card */}
            <div className="prog-card">
              <div className="prog-card-mode">UNIVERSITY DIRECT PLAN (INTEREST-FREE)</div>
              <div className="form-field-row" style={{ marginBottom: 0 }}>
                <div className="form-field">
                  <label htmlFor="univ-tenure">Instalments (months)</label>
                  <input
                    id="univ-tenure"
                    type="number"
                    min={1}
                    max={48}
                    value={univTenureMonths}
                    onChange={e => setUnivTenureMonths(Math.min(48, Math.max(1, Number(e.target.value))))}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="univ-fee">One-time processing fee (%)</label>
                  <input
                    id="univ-fee"
                    type="number"
                    min={0}
                    max={10}
                    step={0.5}
                    value={univFeePercent}
                    onChange={e => setUnivFeePercent(Math.min(10, Math.max(0, Number(e.target.value))))}
                  />
                </div>
              </div>
              <div className="hint" style={{ marginBottom: 12 }}>Not every university offers a direct EMI plan or charges a processing fee - confirm with the admissions office.</div>
              <hr className="section-rule" style={{ margin: '8px 0 16px' }} />
              <div style={{ fontSize: 13, color: 'var(--grey)', marginBottom: 4 }}>Monthly instalment</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--navy)', marginBottom: 12 }}>
                {formatINR(univ.emi)}
              </div>
              <div className="sp-sidebar-stats">
                <div className="sp-sidebar-stat">
                  <span>Processing fee:</span>
                  <strong>{formatINR(univ.fee)}</strong>
                </div>
                <div className="sp-sidebar-stat">
                  <span>Total cost:</span>
                  <strong>{formatINR(univ.totalCost)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card" style={{ marginTop: 28 }}>
            <div className="info-card-title">Which one costs less?</div>
            <p style={{ margin: 0 }}>
              At the numbers above, the bank loan costs {formatINR(bank.totalPayment)} in total ({formatINR(bank.totalInterest)} in interest) versus {formatINR(univ.totalCost)} for the university plan (a {formatINR(univ.fee)} processing fee, no interest). The university plan is usually cheaper overall, but its shorter tenure means a higher monthly instalment - only workable if your cash flow can absorb it.
            </p>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('emi-calculator-result')}>
              Get help choosing the right option {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-lp" id="how-it-works">
        <div className="container">
          <div className="eyebrow">HOW THE CALCULATION WORKS</div>
          <h2 className="h-display h2">The formula behind the numbers</h2>
          <hr className="section-rule" />
          <p>
            For an interest-bearing bank loan, EMI = P x R x (1+R)^N / ((1+R)^N - 1), where P is the principal, R is the monthly interest rate (annual rate divided by 12 and by 100), and N is the number of monthly instalments. For an interest-free university plan, it simplifies to the total fee divided by the number of instalments, plus any one-time processing fee.
          </p>
          <div className="info-card">
            <div className="info-card-title">Section 80E: bank loan interest is tax deductible</div>
            <p>Under Section 80E of the Income Tax Act, the interest portion of an education loan EMI (not the principal) can be deducted from taxable income for up to 8 years from the year repayment begins. This lowers the effective cost of a bank loan and does not apply to interest-free university direct plans, since there is no interest paid.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">EMI calculator: common questions answered</h2>
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
                {openFaq === i && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <h2>Not sure which fee plan fits your budget?</h2>
          <p>Tell us your fee, timeline, and monthly budget. We will point you to the loan or payment plan that fits.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('emi-calculator-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
