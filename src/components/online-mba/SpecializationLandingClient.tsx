'use client'

import { useCallback, useState } from 'react'
import LeadModal from '@/components/forms/LeadModal'
import ProgrammeCompareCards from '@/components/online-mba/ProgrammeCompareCards'
import type { SpecializationData } from '@/components/online-mba/specializationData'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export default function SpecializationLandingClient({ data }: { data: SpecializationData }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('specialization-landing')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'specialization-landing') => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--mist)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <a href="/study-in-india">Study in India</a>
            <span className="sep">/</span>
            <a href="/online-mba">Online MBA</a>
            <span className="sep">/</span>
            <span className="crumb-current">{data.title}</span>
          </nav>
        </div>
      </div>

      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">{data.eyebrow}</div>
              <h1 className="h-display h1">{data.title}</h1>
              <div className="answer-capsule">{data.answerCapsule}</div>
              <p className="lede" style={{ marginBottom: 8 }}>{data.description}</p>
              <p style={{ fontSize: 13, color: 'var(--grey)', marginBottom: 6 }}>{data.updated}</p>
              <p className="sp-byline">
                Written by CollegeNCourses Editorial Team · Reviewed by CollegeNCourses Senior Counsellor · Approved by Nikhita Pradeep Deshmukh, Founder
              </p>
              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal(`${data.slug}-hero`)}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>
              <div className="trust-strip">
                <span>Fast, honest guidance for working professionals</span>
                <span className="sep">·</span>
                <span>Lead-ready landing page for paid campaigns</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right programme for your goal</h3>
                <p>Free. Takes 2 minutes.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  {data.stats.map((item) => (
                    <div className="sp-sidebar-stat" key={item.label}>
                      <span>{item.label}:</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => openModal(`${data.slug}-sidebar`)}>
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="eyebrow">PROGRAMME COMPARISON</div>
          <h2 className="h-display h2">Top online MBA options for this specialisation</h2>
          <hr className="section-rule" />
          <ProgrammeCompareCards
            programmes={data.programmes}
            onEnquire={(rank) => openModal(`${data.slug}-card-${rank}`)}
          />
        </div>
      </section>

      <section className="section-lp">
        <div className="container">
          <div className="eyebrow">WHO THIS FITS</div>
          <h2 className="h-display h2">Why this specialisation can be the right next step</h2>
          <hr className="section-rule" />
          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>This fits if you are...</h4>
              <ul className="fit-list">
                {data.fitPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-box fit-no">
              <h4>This may not fit if you are...</h4>
              <ul className="fit-list">
                {data.fitPointsNo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lp section-lp-alt">
        <div className="container">
          <div className="eyebrow">CAREER OUTCOMES</div>
          <h2 className="h-display h2">What this specialisation is used for in real careers</h2>
          <hr className="section-rule" />
          <div style={{ display: 'grid', gap: 12 }}>
            {data.outcomes.map((item) => (
              <div key={item.label} className="info-card">
                <div className="info-card-title">{item.label}</div>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lp">
        <div className="container">
          <div className="eyebrow">BEFORE YOU APPLY</div>
          <h2 className="h-display h2">Questions to ask before choosing a programme</h2>
          <hr className="section-rule" />
          <div className="questions-list">
            {data.questions.map((item, index) => (
              <div className="q-item" key={item.q}>
                <div className="q-num">{index + 1}</div>
                <div className="q-body">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">Quick answers for students comparing this option</h2>
          <hr className="section-rule" />
          <div className="faq-list">
            {data.faqs.map((item, index) => (
              <div key={item.q} className={`faq-item${openFaq === index ? ' open' : ''}`}>
                <button type="button" className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={openFaq === index}>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">{openFaq === index ? '-' : '+'}</span>
                </button>
                {openFaq === index && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lp">
        <div className="container">
          <div className="eyebrow">ABOUT THIS PAGE</div>
          <h2 className="h-display h2">Who wrote and reviewed this comparison</h2>
          <hr className="section-rule" />
          <div className="sp-authors">
            <div className="sp-author-row">
              <span className="sp-author-name">Written by: CollegeNCourses Editorial Team</span>
              <div className="sp-author-role">Content Lead, CollegeNCourses Editorial Desk</div>
              <div className="sp-author-bio">
                Our editorial team tracks fees, approvals, and batch timelines for online MBA programmes across UGC-DEB approved private universities.
              </div>
            </div>
            <div className="sp-author-row">
              <span className="sp-author-name">Reviewed by: CollegeNCourses Senior Counsellor</span>
              <div className="sp-author-role">Senior Counsellor, CollegeNCourses</div>
              <div className="sp-author-bio">
                Our reviewing counsellor has advised working professionals across Distance, Online, and Executive MBA modes, with a focus on Marketing and Digital specializations.
              </div>
            </div>
            <div className="sp-author-row">
              <span className="sp-author-name">Approved by: Nikhita Pradeep Deshmukh</span>
              <div className="sp-author-role">Founder, Dnyanal Educon Pvt Ltd</div>
              <div className="sp-author-bio">Founder of CollegeNCourses.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-cta-band">
        <div className="container">
          <h2>Ready to compare your next step?</h2>
          <p>Tell us your goal, current profile, and budget. We will help you shortlist the right online MBA programme without the hard sell.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal(`${data.slug}-cta`)}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} title="Get free guidance for this programme" />
    </>
  )
}
