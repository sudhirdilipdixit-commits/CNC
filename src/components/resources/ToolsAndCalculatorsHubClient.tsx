'use client'

import { useCallback, useState } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

type Tool = {
  slug: string
  title: string
  badge: string
  tagline: string
  href: string
  linkLabel: string
}

const TOOLS: Tool[] = [
  {
    slug: 'emi-calculator',
    title: 'MBA Fee and EMI Calculator',
    badge: 'Bank loan vs university plan',
    tagline: 'Enter your total fee and compare the monthly instalment for a bank education loan against an interest-free university direct payment plan.',
    href: '/resources/emi-calculator',
    linkLabel: 'Open calculator',
  },
  {
    slug: 'cost-calculator',
    title: 'Study Abroad Cost Calculator',
    badge: '7 countries',
    tagline: 'See the full cost of studying abroad by country: tuition, living expenses, visa fees, health insurance, and travel, all in one comparison.',
    href: '/study-abroad/cost-calculator',
    linkLabel: 'Open calculator',
  },
]

export default function ToolsAndCalculatorsHubClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('tools-hub')

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
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <a href="/resources-new">Resources</a>
            <span className="sep">/</span>
            <span className="crumb-current">Tools and Calculators</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="section-lp" id="hero">
        <div className="container">
          <div className="eyebrow">TOOLS AND CALCULATORS</div>
          <h1 className="h-display h1">Work Out the Real Numbers Before You Apply</h1>

          <div className="answer-capsule">
            Two free, interactive calculators: one for your MBA fee EMI (bank loan versus an interest-free university plan), and one for the total cost of studying abroad by country. No sign-up required.
          </div>

          <p className="lede" style={{ marginBottom: 28, maxWidth: 640 }}>
            Guides and blog posts give you the context. These tools give you the exact number for your situation - enter your figures and see the result instantly.
          </p>

          <div className="sp-cta-row">
            <a href="#hub" className="btn btn-primary">Browse tools {ARROW}</a>
            <button type="button" className="btn btn-secondary" onClick={() => openModal('tools-hub-hero')}>
              Get Free Guidance
            </button>
          </div>
        </div>
      </section>

      {/* Tool cards */}
      <section className="section-lp section-lp-alt" id="hub">
        <div className="container">
          <div className="eyebrow">AVAILABLE NOW</div>
          <h2 className="h-display h2">Two calculators, ready to use</h2>
          <hr className="section-rule" />

          <div className="prog-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {TOOLS.map((tool) => (
              <div className="prog-card" key={tool.slug}>
                <div className="prog-card-title">{tool.title}</div>
                <p className="prog-card-tagline">{tool.tagline}</p>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{tool.badge}</span>
                </div>
                <a href={tool.href} className="prog-card-link" style={{ marginTop: 4 }}>
                  {tool.linkLabel} {ARROW}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <h2>Not sure which numbers apply to you?</h2>
          <p>Tell us your programme, budget, and timeline. We will point you to the right calculator and the right numbers for your situation.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('tools-hub-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </main>
  )
}
