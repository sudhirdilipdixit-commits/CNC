'use client'

import { useCallback, useState } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

type HubTile = {
  slug: string
  title: string
  badge: string
  tagline: string
  href: string
  linkLabel: string
}

const TILES: HubTile[] = [
  {
    slug: 'blog',
    title: 'Blog',
    badge: 'Latest articles',
    tagline: 'Ongoing coverage on admissions, fees, career outcomes, and what is changing in MBA education this year.',
    href: '/blog',
    linkLabel: 'Read the blog',
  },
  {
    slug: 'guides',
    title: 'Guides',
    badge: '12 free guides',
    tagline: 'Downloadable guides on fees, salary data, mode comparisons, and application checklists. Free, no strings.',
    href: '/resources',
    linkLabel: 'Browse guides',
  },
  {
    slug: 'tools',
    title: 'Tools and Calculators',
    badge: 'MBA fee and EMI calculator',
    tagline: 'Work out your real total cost and monthly EMI across bank loans and university payment plans before you apply.',
    href: '/resources/emi-calculator',
    linkLabel: 'Try the calculator',
  },
]

const POPULAR = [
  { title: 'MBA Fee Guide 2025-26', href: '/resources/mba-fee-guide-2025-26' },
  { title: 'Online MBA Salary Report 2025-26', href: '/resources/online-mba-salary-report-2025-26' },
  { title: 'Top 20 UGC-DEB Approved Online MBA Programmes', href: '/resources/top-20-ugc-deb-approved-online-mba-2025-26' },
  { title: 'Distance vs Online vs Executive MBA Guide', href: '/resources/distance-vs-online-vs-executive-mba-guide' },
]

export default function ResourcesParentHubClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('resources-hub')

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
            <span className="crumb-current">Resources</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="section-lp" id="hero">
        <div className="container">
          <div className="eyebrow">RESOURCES</div>
          <h1 className="h-display h1">Guides, Blog, and Tools for Every Step of Your MBA Decision</h1>

          <div className="answer-capsule">
            CollegeNCourses Resources brings together our blog, free downloadable guides, and practical tools like the MBA fee and EMI calculator in one place. Whether you are comparing programmes, checking fees, or just starting your research, start here to find the right resource for where you are in your decision.
          </div>

          <p className="lede" style={{ marginBottom: 28, maxWidth: 640 }}>
            Everything on this site that is not a programme listing lives here: the blog for ongoing coverage, downloadable guides for deep dives, and calculators for quick numbers. Pick the format that fits how you like to research.
          </p>

          <div className="sp-cta-row">
            <a href="#hub" className="btn btn-primary">Explore the hub {ARROW}</a>
            <button type="button" className="btn btn-secondary" onClick={() => openModal('resources-hub-hero')}>
              Get Free Guidance
            </button>
          </div>
        </div>
      </section>

      {/* 3 Hub Tiles */}
      <section className="section-lp section-lp-alt" id="hub">
        <div className="container">
          <div className="eyebrow">WHERE TO START</div>
          <h2 className="h-display h2">Three ways to research, one place to find them</h2>
          <hr className="section-rule" />

          <div className="prog-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {TILES.map((tile) => (
              <div className="prog-card" key={tile.slug}>
                <div className="prog-card-title">{tile.title}</div>
                <p className="prog-card-tagline">{tile.tagline}</p>
                <div className="prog-card-meta">
                  <span className="prog-card-badge">{tile.badge}</span>
                </div>
                <a href={tile.href} className="prog-card-link" style={{ marginTop: 4 }}>
                  {tile.linkLabel} {ARROW}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular guides quick links */}
      <section className="section-lp" id="popular">
        <div className="container">
          <div className="eyebrow">POPULAR RIGHT NOW</div>
          <h2 className="h-display h2">A few guides to start with</h2>
          <hr className="section-rule" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {POPULAR.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  background: 'var(--white)',
                  border: '1px solid var(--mist)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 18px',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--navy)',
                  textDecoration: 'none',
                }}
              >
                {item.title} {ARROW}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="lp-cta-band">
        <div className="container">
          <div className="h-display h2" style={{ color: 'var(--white)', marginBottom: 8 }}>
            Not sure where to start?
          </div>
          <p style={{ color: 'rgba(250,247,242,.82)', marginBottom: 28, fontSize: 16 }}>
            Tell us your goal, current profile, and budget. We will point you to the right guide, tool, or programme comparison.
          </p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('resources-hub-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </main>
  )
}
