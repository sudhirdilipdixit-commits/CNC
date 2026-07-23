'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const VISA_TABLE_ROWS = [
  {
    country: 'USA',
    visaType: 'F-1 Student Visa + SEVIS fee',
    fee: '$185 + $350 SEVIS fee',
    processing: '3-12 weeks',
    workRights: '20 hrs/week (on campus)',
    postStudy: 'OPT: 12 mo, STEM OPT: +24 mo',
  },
  {
    country: 'UK',
    visaType: 'Student Visa',
    fee: '£363 + £776/yr IHS',
    processing: '3 weeks (standard)',
    workRights: '20 hrs/week during term',
    postStudy: 'Graduate Route: 2 years',
  },
  {
    country: 'Canada',
    visaType: 'Study Permit',
    fee: 'CAD 150',
    processing: '4-12 weeks',
    workRights: '20 hrs/week off campus',
    postStudy: 'PGWP: up to 3 years',
  },
  {
    country: 'Australia',
    visaType: 'Student Visa (500)',
    fee: 'AUD 710',
    processing: '4-6 weeks',
    workRights: 'Unlimited (since 2023)',
    postStudy: 'Temporary Graduate (485): 2-5 yrs',
  },
  {
    country: 'Germany',
    visaType: 'National Visa (Type D)',
    fee: '€75',
    processing: '6-12 weeks (embassy)',
    workRights: '120 days or 240 half-days/yr',
    postStudy: '18-month job search visa',
  },
]

const VISA_CARDS = [
  {
    mode: 'USA',
    title: 'F-1 Student Visa',
    tagline:
      'The US student visa requires a SEVIS fee, a DS-160 application, and an interview at a US embassy or consulate in India. Apply after receiving your I-20 form from the university.',
    badges: ['~3-12 weeks processing', 'Interview required'],
    docs: [
      'I-20 from university',
      'SEVIS fee receipt',
      'DS-160 confirmation',
      'Passport',
      'Financial evidence (bank statements showing funds for 1 year)',
      'IELTS/TOEFL score',
      'Academic transcripts',
      'Visa appointment confirmation',
    ],
  },
  {
    mode: 'UK',
    title: 'UK Student Visa',
    tagline:
      'Apply online with a CAS (Confirmation of Acceptance for Studies) from your UK university. Show 28-day bank balance covering tuition balance plus £1,334/month for London or £1,023/month outside London.',
    badges: ['~3 weeks standard', 'No interview required'],
    docs: [
      'CAS number and reference',
      'Passport',
      '28-day bank statement (ending within 31 days of application)',
      'IELTS/TOEFL if not waived',
      'Proof of ATAS clearance if required (STEM subjects)',
      'TB test results (required for India)',
    ],
  },
  {
    mode: 'Canada',
    title: 'Study Permit',
    tagline:
      'Apply online via IRCC portal. Canada\'s Student Direct Stream (SDS) offers faster processing for Indian students with IELTS 6.0+ and a GIC (Guaranteed Investment Certificate) of CAD 20,635.',
    badges: ['4-12 weeks (SDS faster)', 'Biometrics required'],
    docs: [
      'Acceptance letter from DLI (Designated Learning Institution)',
      'Proof of funds (CAD 10,000/year plus first year tuition)',
      'GIC for SDS',
      'IELTS score (SDS: 6.0+)',
      'Financial documents for parents',
      'Passport',
      'Photos',
    ],
  },
  {
    mode: 'Australia',
    title: 'Student Visa (Subclass 500)',
    tagline:
      'Apply through ImmiAccount after receiving a CoE (Confirmation of Enrolment). Must show OSHC (Overseas Student Health Cover) and genuine temporary entrant (GTE) statement.',
    badges: ['4-6 weeks processing', 'Biometrics at VFS'],
    docs: [
      'CoE from institution',
      'OSHC (Overseas Student Health Cover)',
      'Financial evidence (AUD 21,041/year)',
      'IELTS/TOEFL/PTE score',
      'Academic transcripts',
      'GTE statement',
      'Passport and photos',
    ],
  },
  {
    mode: 'Germany',
    title: 'National Visa (Type D)',
    tagline:
      'Apply at the German consulate or embassy in India. Processing takes 6-12 weeks. Requires a blocked account of €11,208 at a German bank (Deutsche Bank India or Fintiba) as proof of funds.',
    badges: ['6-12 weeks embassy', 'In-person appointment'],
    docs: [
      'University admission letter',
      'Blocked account proof (€11,208)',
      'German language certificate or English proficiency for English-taught programmes',
      'Academic transcripts and certified translations',
      'Health insurance from a German-approved provider',
      'Passport',
      'CV',
      'Statement of purpose',
    ],
  },
]

const CHECKLIST_ALWAYS = [
  'Valid passport (minimum 6 months validity beyond intended stay)',
  'University admission or enrolment confirmation letter',
  'Proof of sufficient funds (bank statements, FD certificates)',
  'English language test results (IELTS, TOEFL, or PTE)',
  'Academic transcripts and certificates',
  'Passport-size photographs (white or light background)',
  'Visa application form (completed online)',
  'Visa fee payment receipt',
]

const CHECKLIST_OFTEN = [
  'Statement of Purpose (Germany, sometimes USA)',
  'Biometric appointment confirmation (UK, Canada, Australia)',
  'TB (tuberculosis) test from an approved UKVI clinic (UK only)',
  'Blocked account or GIC (Germany and Canada SDS)',
  'Health insurance enrollment (Germany: mandatory, Australia: OSHC)',
  'ATAS (Academic Technology Approval Scheme) for certain UK STEM subjects',
  'Sponsorship letter if parent is funding (most countries)',
]

const TIMELINE_CARDS = [
  {
    country: 'USA (F-1 Visa)',
    detail:
      'Apply 3-4 months before your programme start date. You can be issued an F-1 visa up to 120 days before the programme start but cannot enter the USA more than 30 days before classes begin. Book your SEVIS appointment as soon as you receive your I-20. Visa interview slots at Mumbai and New Delhi can be booked 2-3 months in advance.',
  },
  {
    country: 'UK Student Visa',
    detail:
      'Apply no earlier than 6 months before your course start date and no later than 6 weeks before arrival. The 28-day bank statement must end within 31 days of your application date. Standard processing is 3 weeks; priority (5 working days) and super priority (next working day) are available for a premium.',
  },
  {
    country: 'Canada, Australia, Germany',
    detail:
      'Canada: Apply 3-4 months before, accounting for biometric appointments and document collection. Australia: Apply 4-6 weeks before CoE start date; working rights start on arrival. Germany: Apply 8-12 weeks before programme start; blocked account setup takes 4-6 weeks, so start 14-16 weeks before intake.',
  },
]

const FAQS = [
  {
    q: 'Can I apply for a student visa before I receive my admission letter?',
    a: 'No. All student visas require proof of admission as a mandatory document. For USA you need the I-20 form, for UK the CAS number, for Canada the acceptance letter from a Designated Learning Institution, for Australia the Confirmation of Enrolment (CoE), and for Germany the university admission letter. You cannot substitute or skip this requirement. Start visa preparation immediately after receiving your admission confirmation.',
  },
  {
    q: 'Do I need to show all the funds upfront for a student visa?',
    a: 'Yes, you need to show proof of sufficient funds at the time of application. For UK, this is a 28-day bank statement showing funds for tuition balance plus living costs. For USA, bank statements showing at least one year\'s total costs. For Canada (SDS), a GIC of CAD 20,635 plus the first year\'s tuition. For Australia, approximately AUD 21,041 per year. For Germany, a blocked account of €11,208. An education loan sanction letter is accepted as proof of funds at most consulates.',
  },
  {
    q: 'Will a previous visa rejection affect my student visa application?',
    a: 'It depends on the country. USA requires you to disclose all previous visa refusals on the DS-160 form; a refusal does not automatically mean rejection but the reason for the previous refusal will be examined. UK requires disclosure of refusals in the last 10 years. Canada, Australia, and Germany also require disclosure. Provide documentation explaining what changed since the previous rejection. A strong profile with clear funding and intent to return typically overcomes a prior refusal.',
  },
  {
    q: 'Can my spouse or family accompany me on a student visa?',
    a: 'Rules vary. USA: your spouse can apply for an F-2 dependent visa but cannot work legally in the USA on F-2. UK: your spouse can apply as a dependent on your Student visa and can work full-time if you are doing a postgraduate programme over 9 months at a higher education institution. Canada: your spouse can get an open work permit if you are enrolled full-time in a postgraduate programme at a DLI. Australia and Germany also have dependent pathways; check the specific rules for your programme level.',
  },
  {
    q: 'What happens if my visa is delayed and I miss my intake?',
    a: 'Contact your university\'s international admissions office immediately. Most universities will defer your admission to the next intake if the delay is due to visa processing, provided you notify them in advance and have a valid visa application reference. USA, UK, and Canadian universities are experienced with this and handle deferral requests routinely. Do not cancel your visa application; continue the process and apply for deferral in parallel.',
  },
]

export default function VisaGuidesClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('visa-guides')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'visa-guides') => {
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
            <span className="crumb-current">Visa Guides</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY ABROAD - VISA GUIDES</div>
              <h1 className="h-display h1">Student Visa Guide for Study Abroad 2026-27: USA, UK, Canada, Australia, Germany</h1>

              <div className="answer-capsule">
                Studying abroad from India requires a student visa from your destination country. USA issues an F-1 visa, UK a Student visa, Canada a Study Permit, Australia a Student visa (subclass 500), and Germany a National Student visa. Each requires a university admission letter, proof of funds, English proficiency test results, and biometrics. Processing times range from 3 to 12 weeks.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                The student visa is the final step before you fly. A missing document or an underestimated processing time can cost you your intake. This guide covers the exact requirements, costs, and timelines for the five most popular study destinations for Indian students.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('visa-guides-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare visa requirements</a>
              </div>

              <div className="trust-strip">
                <span className="stars">★★★★★</span>
                <span>4.8/5</span>
                <span className="sep">·</span>
                <span>5 countries detailed</span>
                <span className="sep">·</span>
                <span>Processing times and checklists</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Visa guidance">
              <div className="sp-sidebar-header">
                <h3>Get visa guidance for your destination</h3>
                <p>Takes 5 minutes. Country-specific checklist.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Countries covered:</span>
                    <strong>USA, UK, Canada, Australia, Germany, Ireland, NZ</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Processing time:</span>
                    <strong>3 weeks (UK) to 12 weeks (Germany)</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Student work rights:</span>
                    <strong>20-48 hrs/week depending on country</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Post-study work:</span>
                    <strong>2-5 years depending on country and degree</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('visa-guides-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Visa Comparison Table */}
      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="eyebrow">VISA COMPARISON</div>
          <h2 className="h-display h2">Student visa requirements at a glance: 5 countries</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="mode-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Visa Type</th>
                  <th>Application Fee</th>
                  <th>Processing Time</th>
                  <th>Work Rights</th>
                  <th>Post-Study Work</th>
                </tr>
              </thead>
              <tbody>
                {VISA_TABLE_ROWS.map(row => (
                  <tr key={row.country}>
                    <td><strong>{row.country}</strong></td>
                    <td>{row.visaType}</td>
                    <td>{row.fee}</td>
                    <td>{row.processing}</td>
                    <td>{row.workRights}</td>
                    <td>{row.postStudy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Country Visa Cards */}
      <section className="section-lp" id="visas">
        <div className="container">
          <div className="eyebrow">COUNTRY VISA GUIDES</div>
          <h2 className="h-display h2">Step-by-step student visa guide by country</h2>
          <hr className="section-rule" />

          <div className="prog-cards">
            {VISA_CARDS.map(card => (
              <div className="prog-card" key={card.mode}>
                <div className="prog-card-mode">{card.mode}</div>
                <div className="prog-card-title">{card.title}</div>
                <div className="prog-card-tagline">{card.tagline}</div>
                <div className="prog-card-meta">
                  {card.badges.map(badge => (
                    <span className="prog-card-badge" key={badge}>{badge}</span>
                  ))}
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>
                    Key Documents
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.7 }}>
                    {card.docs.map(doc => (
                      <li key={doc}>{doc}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal(`visa-${card.mode}`)}
                >
                  Get {card.mode} visa checklist {ARROW}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Checklist */}
      <section className="section-lp section-lp-alt" id="checklist">
        <div className="container">
          <div className="eyebrow">DOCUMENT CHECKLIST</div>
          <h2 className="h-display h2">Documents every student visa application needs</h2>
          <hr className="section-rule" />

          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: 'var(--navy)' }}>
                Always required (all countries)
              </div>
              <ul className="fit-list">
                {CHECKLIST_ALWAYS.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-box fit-yes">
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: 'var(--navy)' }}>
                Often required (check per country)
              </div>
              <ul className="fit-list">
                {CHECKLIST_OFTEN.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => openModal('visa-checklist')}>
              Get my country-specific checklist {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Timeline: When to Apply */}
      <section className="section-lp" id="timeline">
        <div className="container">
          <div className="eyebrow">VISA TIMELINE</div>
          <h2 className="h-display h2">When to apply for your student visa</h2>
          <hr className="section-rule" />

          <div className="chooser-grid">
            {TIMELINE_CARDS.map(card => (
              <div className="chooser-card" key={card.country}>
                <div className="chooser-label">Country</div>
                <div className="chooser-situation">{card.country}</div>
                <div className="chooser-rec">{card.detail}</div>
                <button
                  type="button"
                  className="prog-card-link"
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 14 }}
                  onClick={() => openModal(`timeline-${card.country}`)}
                >
                  Get personalised timeline {ARROW}
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
              <h2 className="h-display h2">Student visa questions answered</h2>
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
          <h2>Get country-specific visa guidance for your study abroad plan.</h2>
          <p>Get a checklist and timeline matched to your destination and intake date.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('visa-guides-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
