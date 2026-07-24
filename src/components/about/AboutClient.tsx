'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)


const STATS = [
  { value: '12,000+', label: 'Learners helped since 2023' },
  { value: '150+', label: 'UGC-DEB approved universities listed' },
  { value: '4.8 / 5', label: 'Average platform rating from users' },
  { value: '2 Pillars', label: 'Study in India and Study Abroad' },
]

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'You compare on the platform',
    desc: 'Browse Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes side by side. Fees, accreditation, mode of study, and batch details - all in one place, in plain language.',
  },
  {
    num: '02',
    title: 'The AI Counsellor shortlists for your profile',
    desc: 'Answer a few questions about your background, budget, and goal. The AI Counsellor returns a ranked shortlist of Ambitious, Target, and Safe programmes matched specifically to you.',
  },
  {
    num: '03',
    title: 'You decide with full information',
    desc: 'Every recommendation includes honest pros, cons, fee breakdowns, and accreditation status. We flag if a programme is not a strong fit for your stated goal - even if it is a partner university.',
  },
  {
    num: '04',
    title: 'The right university reaches out to help you enrol',
    desc: 'Once you enquire, the admission team of the programme you chose contacts you to help with application, documentation, and enrolment. CollegeNCourses stays available throughout.',
  },
]

const COMMITMENTS = [
  '"Limited seats" or "last batch" pressure tactics. There is always another batch.',
  '"This is the best programme for everyone." No programme is right for everyone.',
  'A recommendation made before we understand your background and goal.',
  'Hidden charges or surprise fees beyond what is listed on the university page.',
  'A push toward a partner programme when a non-partner fits you better.',
  '"Our team will call you back." We route enquiries; we do not promise to call.',
]


const LEGAL_CARDS = [
  {
    title: 'Our entity',
    items: [
      'DNYANAL EDUCON PRIVATE LIMITED',
      'Incorporated 29 April 2023',
      'Registered office: Pune, Maharashtra',
      'GST registered, PAN registered',
      'MCA filings publicly available',
    ],
  },
  {
    title: 'Programmes we list',
    items: [
      'UGC-DEB approved only (verified annually)',
      'AICTE approved where applicable',
      'NAAC accreditation noted on each listing',
      'Last audit: June 2026',
      'Removed programmes reported within 24 hours',
    ],
  },
  {
    title: 'Your data and consent',
    items: [
      'DPDP Act 2023 compliant',
      'Explicit consent collected at every lead form',
      'Lead data shared with the institution you enquired about',
      'Never sold to third parties outside of your enquiry',
      'Deletion on request: privacy@collegencourses.com',
    ],
  },
]

const PRESS = [
  'Economic Times Education',
  'Business Standard',
  'Hindustan Times',
  'Outlook Business',
  'The Hindu Education Plus',
]

export default function AboutClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('about-page')

  const openModal = useCallback((source: string) => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <main id="main">

      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--mist)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ padding: '10px 0' }}>
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="sep">›</span>
            <span className="crumb-current">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="section-lp" id="hero" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ maxWidth: 820 }}>
            <div className="eyebrow">ABOUT COLLEGENCOURSES</div>
            <h1 className="h-display h1" style={{ margin: '12px 0 20px' }}>
              Honest programme comparisons for Indian aspirants. Study in India and Study Abroad.
            </h1>

            <div className="answer-capsule">
              CollegeNCourses is an education comparison platform helping Indian aspirants choose Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from UGC-approved private universities. Founded in 2023 in Pune by Nikhita Pradeep Deshmukh, the platform has helped over 12,000 learners compare programmes across Study in India and Study Abroad.
            </div>

            <p className="lede" style={{ marginBottom: 32 }}>
              India produces millions of graduates every year. The choice of what and where to study is one of the most consequential decisions a person makes - and one of the most poorly supported. Glossy brochures, conflicting rankings, and aggressive sales calls have replaced honest guidance. CollegeNCourses was built to fix that.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" onClick={() => openModal('about-hero-cta')}>
                Get Free Guidance {ARROW}
              </button>
              <a href="/study-in-india" className="btn btn-secondary">
                Explore Programmes {ARROW}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginTop: 48 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderTop: '3px solid var(--yellow)', borderRadius: 'var(--radius-md)', padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--navy)', fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--grey)', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="section-lp" id="why" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow">WHY WE EXIST</div>
          <h2 className="h-display h2" style={{ marginBottom: 16 }}>The problem we were built to solve</h2>
          <hr className="section-rule" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--charcoal)' }}>
              Indian aspirants choosing an MBA or a study abroad programme face a market designed to confuse them. Aggregator sites rank programmes by advertising spend, not quality. University websites quote fees that do not match the final invoice. Sales teams promise callbacks and then call eighteen times. Rankings change every year without explanation.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--charcoal)' }}>
              CollegeNCourses is built on a different premise: a clear comparison, honestly presented, converts better than a hard sell. Our programme listings show real fees, real accreditation status, and real mode differences. Our AI Counsellor returns a shortlist matched to your stated profile and budget - not to which university pays us the most.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--charcoal)' }}>
              We are not a rankings website. We are not an advertising aggregator. We are a programme comparison platform that uses technology to scale honest guidance across two categories: Study in India and Study Abroad.
            </p>
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 220px', background: 'var(--ivory)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '18px 22px' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Study in India</div>
              <p style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.6 }}>
                Online MBA, Distance MBA, Executive MBA, Regular MBA, and Design programmes from UGC-DEB approved private universities. 9 MBA specializations compared. Fee range Rs 30,000 to Rs 2.5 lakh.
              </p>
            </div>
            <div style={{ flex: '1 1 220px', background: 'var(--ivory)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '18px 22px' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Study Abroad</div>
              <p style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.6 }}>
                USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Profile Evaluation matched to your academics and budget. Loan guidance, test prep, visa resources, and cost estimates in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-lp section-lp-alt" id="how-it-works">
        <div className="container">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2 className="h-display h2">From first visit to enrolment: four steps</h2>
          <hr className="section-rule" />

          <div className="chooser-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 32 }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.num} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '28px 24px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 48, color: 'var(--yellow)', lineHeight: 1, marginBottom: 16 }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--grey)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-lp section-lp-alt" id="commitment">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="eyebrow">OUR COMMITMENT</div>
          <h2 className="h-display h2">What you will never hear from us</h2>
          <hr className="section-rule" />

          <div style={{ background: 'var(--navy)', borderRadius: 14, padding: '36px 40px', marginTop: 32 }}>
            <p style={{ fontSize: 15, color: 'rgba(250,247,242,.75)', marginBottom: 24, lineHeight: 1.6 }}>
              These are not marketing claims. They are the rules our platform and content team operate by - written down so you can hold us to them.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {COMMITMENTS.map(text => (
                <div key={text} style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontSize: 15, color: 'var(--pale-navy)', lineHeight: 1.55 }}>
                  <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: 'var(--yellow)', marginTop: 7, display: 'inline-block' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal and Accreditation */}
      <section className="section-lp" id="legal" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="eyebrow">LEGAL AND ACCREDITATION</div>
          <h2 className="h-display h2">The fine print, in plain language</h2>
          <hr className="section-rule" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 32 }}>
            {LEGAL_CARDS.map(card => (
              <div key={card.title} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderTop: '4px solid var(--yellow)', borderRadius: 'var(--radius-md)', padding: 24 }}>
                <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>{card.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ fontSize: 14, color: 'var(--charcoal)', display: 'flex', gap: 8, alignItems: 'baseline', lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', marginTop: 7, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: 'var(--grey)', lineHeight: 1.6, marginTop: 24, maxWidth: 720 }}>
            Under the Digital Personal Data Protection Act 2023 (DPDP Act), we collect explicit consent before sharing your lead data with any partner university or institution. The consent checkbox on every form is unticked by default, plainly worded, and required to submit. Your consent text, version, timestamp, and IP are stored on the CRM lead record as legally required proof of consent.
          </p>
        </div>
      </section>

      {/* Press */}
      <section className="section-lp section-lp-alt" id="press">
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', textAlign: 'center', marginBottom: 20 }}>
            As featured in
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px 28px' }}>
            {PRESS.map(name => (
              <div key={name} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '10px 20px', fontSize: 13, fontWeight: 600, color: 'var(--grey)' }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <div className="h-display h2" style={{ color: 'var(--white)', marginBottom: 8 }}>
            Have a question about a programme or how we work?
          </div>
          <p style={{ color: 'rgba(250,247,242,.82)', marginBottom: 28, fontSize: 16, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Tell us your background and what you are looking for. We will match you to the right programme in 2 minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-inverted" onClick={() => openModal('about-cta-band')}>
              Get Free Guidance {ARROW}
            </button>
            <a href="/contact-us" className="btn btn-secondary" style={{ borderColor: 'rgba(250,247,242,.4)', color: 'var(--white)' }}>
              Contact Us {ARROW}
            </a>
          </div>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </main>
  )
}
