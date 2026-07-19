'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './new-home.module.css'

const FAQS = [
  {
    q: 'Is an Online MBA legally equivalent to a regular MBA in India?',
    a: 'Yes. As per UGC-DEB regulations and the 2022 amendment to the AICTE handbook, Online and Distance Mode degrees from approved institutions hold the same legal standing as regular-mode degrees for employment, further studies, and government job eligibility. The key word is approved - always confirm the institution is on the UGC-DEB list dated within the last 12 months.',
  },
  {
    q: 'How much does an Online MBA cost in India in 2026?',
    a: 'Total programme fees range from Rs 50,000 at entry-level state universities to Rs 6.5 lakh at IIMs for executive formats. The mainstream band sits between Rs 1.5 lakh and Rs 2.5 lakh for two-year programmes from Symbiosis, Amity, NMIMS, Manipal, ICFAI, and Welingkar. EMI options typically convert this into 24-month plans of Rs 6,000 to Rs 10,000 per month.',
  },
  {
    q: 'Do employers in India accept Online and Distance MBAs?',
    a: 'Major MNCs and Indian corporates (TCS, Infosys, Reliance, Asian Paints, Mahindra, HDFC) treat Online and Distance MBAs from UGC-DEB approved universities at parity with regular MBAs in their HR policies. Some PSUs and central government recruitments have specific clauses - these are detailed in our Specializations Guide.',
  },
  {
    q: 'How long does an Online MBA take?',
    a: 'Standard Online MBA in India is 24 months. Executive formats from IIMs and similar tier-1 schools run 12 months. Some universities offer 18-month accelerated formats for candidates with 5 or more years of work experience.',
  },
  {
    q: 'Can I work full-time and pursue an Online MBA?',
    a: 'This is the dominant use case. Most Online MBA enrolees in India are full-time employed. Programmes are designed around evening live sessions (typically 8 to 10 pm), weekend classes, and recorded content for catch-up.',
  },
  {
    q: 'What is the difference between Online MBA and Distance MBA?',
    a: 'Online MBA includes live virtual classroom sessions, real-time interaction with faculty, online assessments, and digital course material. Distance MBA traditionally relies on self-paced study material with periodic contact sessions and physical examinations. In 2026, the line has blurred - most distance programmes now include online components.',
  },
  {
    q: 'Will my degree certificate say Online or Distance?',
    a: 'By UGC-DEB rules, degrees do not need to label the mode on the certificate. They state the degree (for example, Master of Business Administration) and the issuing university. Confirm with the institution and on a sample issued certificate before enrolling.',
  },
  {
    q: 'How does guidance work at CollegeNCourses?',
    a: 'Use the AI Counsellor - answer 6 short questions about your goals, budget, mode preference, and timeline. You get a personalised shortlist of 3 matched programmes instantly, with fees, accreditation status, and a clear explanation of fit. No phone number required to see your results.',
  },
  {
    q: 'Does CollegeNCourses support Study Abroad options?',
    a: 'Yes. CollegeNCourses covers both Study in India and Study Abroad. For international programmes, the AI Counsellor Abroad track (Profile Evaluator) takes your academics, test scores (GRE, GMAT, IELTS, TOEFL), target country, and budget to generate a shortlist of Ambitious, Target, and Safe universities with indicative admit-likelihood bands.',
  },
]

const ARROW_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const CHEVRON_SVG = (
  <svg className="nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export default function NewHomeClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    interest: '', programme: '', mode: '',
    notes: '',
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const openModal = useCallback(() => {
    setModalOpen(true)
    setStep(1)
    setIsSuccess(false)
    setConsentChecked(false)
    setConsentError(false)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault()
    setStep(3)
  }

  function handleStep3(e: React.FormEvent) {
    e.preventDefault()
    if (!consentChecked) {
      setConsentError(true)
      return
    }
    setConsentError(false)
    setIsSuccess(true)
  }

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="siteHeader">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="CollegeNCourses Home">
            <Image src="/logo.webp" alt="CollegeNCourses" width={160} height={64} priority style={{ height: 64, width: 'auto' }} />
          </a>

          <nav className="primary-nav" aria-label="Primary">
            <div className="nav-has-dropdown">
              <span className="nav-dropdown-label">Study in India {CHEVRON_SVG}</span>
              <div className="nav-dropdown">
                <a href="/online-mba/">Online MBA</a>
                <a href="/distance-mba/">Distance MBA</a>
                <a href="/executive-mba/">Executive MBA</a>
                <a href="/regular-mba/">Regular MBA</a>
                <a href="/design/">Design Programmes</a>
              </div>
            </div>
            <div className="nav-has-dropdown">
              <span className="nav-dropdown-label">Study Abroad {CHEVRON_SVG}</span>
              <div className="nav-dropdown">
                <a href="/study-abroad/">Overview</a>
                <a href="/study-abroad/usa/">USA</a>
                <a href="/study-abroad/uk/">United Kingdom</a>
                <a href="/study-abroad/canada/">Canada</a>
                <a href="/study-abroad/australia/">Australia</a>
              </div>
            </div>
            <a href="/ai-counsellor/" style={{ color: 'var(--navy)', fontWeight: 700 }}>AI Counsellor</a>
            <a href="/blog/">Resources</a>
            <a href="/about/">About</a>
          </nav>

          <div className="header-cta-group">
            <button type="button" className="btn btn-primary btn-pill" onClick={openModal}>
              Get Free Guidance
            </button>
            <button
              type="button"
              className="nav-toggle"
              aria-controls="mobileMenu"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu" aria-hidden={!menuOpen}>
          <button
            type="button"
            className="mobile-submenu-toggle"
            onClick={() => setMobileSubOpen(o => !o)}
          >
            Study in India
            <svg className={`nav-chevron${mobileSubOpen ? ' open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {mobileSubOpen && (
            <div className="mobile-submenu">
              <a href="/online-mba/">Online MBA</a>
              <a href="/distance-mba/">Distance MBA</a>
              <a href="/executive-mba/">Executive MBA</a>
              <a href="/regular-mba/">Regular MBA</a>
            </div>
          )}
          <a href="/study-abroad/">Study Abroad</a>
          <a href="/ai-counsellor/">AI Counsellor</a>
          <a href="/blog/">Resources</a>
          <a href="/about/">About</a>
          <a href="/contact-us/">Contact</a>
          <button type="button" className="btn btn-primary" onClick={openModal}>Get Free Guidance</button>
        </div>
      </header>

      <main id="main">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-content">
              <div className="eyebrow">INDIA&apos;S TRUSTED HIGHER-EDUCATION COMPASS</div>
              <h1 className="h-display h1 hero-headline">Compare. Choose. Begin.</h1>
              <p className="lede hero-sub">
                Online MBA, Distance MBA, and Executive MBA from 150+ UGC-DEB and AICTE approved universities - and international degrees from top global universities. Study in India or Study Abroad, guided by AI.
              </p>

              <div className="hero-cta-row">
                <button type="button" className="btn btn-primary" onClick={openModal}>
                  Get Free Guidance
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
                <a href="#programmes" className="btn btn-secondary">Explore Programmes</a>
              </div>

              <div className="trust-strip" aria-label="Trust signals">
                <span>UGC-DEB &amp; AICTE approved programmes</span>
                <span className="sep">·</span>
                <span>Study in India and Abroad</span>
                <span className="sep">·</span>
                <span>No spam. No obligation.</span>
              </div>
            </div>

            <aside className="hero-visual" aria-hidden="true">
              <span className="hero-visual-label">AI Counsellor preview</span>
              <h3 className="hero-visual-title">3 programmes recommended for you</h3>

              <div className="mini-card featured">
                <div className="mini-card-icon">S</div>
                <div className="mini-card-body">
                  <div className="mini-card-name">Online MBA in Marketing</div>
                  <div className="mini-card-meta">Symbiosis - 24 months - Rs 1.8 L</div>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-icon">N</div>
                <div className="mini-card-body">
                  <div className="mini-card-name">Distance MBA in Finance</div>
                  <div className="mini-card-meta">NMIMS - 24 months - Rs 1.5 L</div>
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-card-icon">B</div>
                <div className="mini-card-body">
                  <div className="mini-card-name">MBA - University of Birmingham</div>
                  <div className="mini-card-meta">Study Abroad - 12 months - approx Rs 35 L</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── SECTION 2: THE PROMISE ─────────────────────────────────────── */}
        <section className="section-promise" id="promise">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">OUR PROMISE</div>
              <h2 className="h-display h2">You will leave more clear than you arrived.</h2>
              <p>Whether you choose us, choose elsewhere, or choose to wait, you will know your options, know yourself, and move forward with confidence.</p>
            </div>

            <div className="promise-pillars">
              <div className="pillar">
                <span className="pillar-check" aria-hidden="true">&#10003;</span>
                <span className="pillar-text">UGC-DEB &amp; AICTE Approved Programmes Only</span>
              </div>
              <div className="pillar">
                <span className="pillar-check" aria-hidden="true">&#10003;</span>
                <span className="pillar-text">Free AI Guidance. No Hidden Charges.</span>
              </div>
              <div className="pillar">
                <span className="pillar-check" aria-hidden="true">&#10003;</span>
                <span className="pillar-text">Transparent Fees. Verified Programmes.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHERE DO YOU WANT TO STUDY ────────────────────── */}
        <section id="counselling">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">WHERE DO YOU WANT TO STUDY?</div>
              <h2 className="h-display h2">Two paths. One trusted guide.</h2>
              <p>Tell us your goal and we will match you to the right programmes - in India or abroad.</p>
            </div>

            <div className="path-grid">
              <a href="/online-mba/" className="path-card">
                <div className="path-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
                  </svg>
                </div>
                <h3>Study in India</h3>
                <p>Online MBA, Distance MBA, and Executive MBA from 150+ UGC-DEB and AICTE approved universities. Work while you study.</p>
                <span className="path-card-link">Explore programmes {ARROW_SVG}</span>
              </a>

              <a href="/study-abroad/" className="path-card">
                <div className="path-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                </div>
                <h3>Study Abroad</h3>
                <p>MBA, MS, MIM, and Bachelors at top global universities in the USA, UK, Canada, Australia, Germany, and Ireland.</p>
                <span className="path-card-link">Explore destinations {ARROW_SVG}</span>
              </a>

              <a href="/specializations-guide/" className="path-card">
                <div className="path-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 12v4M8 14h8" />
                  </svg>
                </div>
                <h3>I know my specialization</h3>
                <p>Finance, Marketing, HR, Operations, Business Analytics, Healthcare - find the best programme for your chosen field.</p>
                <span className="path-card-link">Browse by specialization {ARROW_SVG}</span>
              </a>

              <a href="/contact-us/" className="path-card">
                <div className="path-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
                  </svg>
                </div>
                <h3>I am not sure yet</h3>
                <p>Answer 6 short questions and the AI Counsellor will suggest the programmes that best fit your profile, goals, and budget.</p>
                <span className="path-card-link">Get free guidance {ARROW_SVG}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FEATURED PROGRAMMES ───────────────────────────── */}
        <section className="section-programmes" id="programmes">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">FEATURED PROGRAMMES</div>
              <h2 className="h-display h2">Programmes aspirants are choosing in 2026</h2>
              <p>Curated from the most-applied-to programmes on our portal this quarter. Fees and accreditation verified.</p>
            </div>

            <div className="programme-grid">
              <article className="programme-card">
                <div className="programme-card-body">
                  <div className="programme-tags">
                    <span className="tag tag-mode">Online</span>
                    <span className="tag tag-bestseller">Best Seller</span>
                  </div>
                  <h3>Online MBA in Marketing</h3>
                  <div className="programme-university">Symbiosis Centre for Distance Learning</div>
                  <div className="programme-meta">
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Duration</div>
                      <div className="programme-meta-value">24 months</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Fee</div>
                      <div className="programme-meta-value">Rs 1.8 L</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Batch</div>
                      <div className="programme-meta-value">Mar 2026</div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>Get Free Guidance</button>
                </div>
              </article>

              <article className="programme-card">
                <div className="programme-card-body">
                  <div className="programme-tags">
                    <span className="tag tag-mode">Distance</span>
                  </div>
                  <h3>Distance MBA in Finance</h3>
                  <div className="programme-university">NMIMS Global Access</div>
                  <div className="programme-meta">
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Duration</div>
                      <div className="programme-meta-value">24 months</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Fee</div>
                      <div className="programme-meta-value">Rs 1.5 L</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Batch</div>
                      <div className="programme-meta-value">Apr 2026</div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>Get Free Guidance</button>
                </div>
              </article>

              <article className="programme-card">
                <div className="programme-card-body">
                  <div className="programme-tags">
                    <span className="tag tag-new">Executive</span>
                    <span className="tag tag-premium">IIM</span>
                  </div>
                  <h3>Executive Online MBA</h3>
                  <div className="programme-university">IIM Indore, 1-Year Programme</div>
                  <div className="programme-meta">
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Duration</div>
                      <div className="programme-meta-value">12 months</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Fee</div>
                      <div className="programme-meta-value">Rs 6.5 L</div>
                    </div>
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Batch</div>
                      <div className="programme-meta-value">Jul 2026</div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>Get Free Guidance</button>
                </div>
              </article>
            </div>

            <div className="programme-grid-more">
              <a href="/online-mba/">Browse all Study in India programmes &rarr;</a>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: WHY US (Comparison Table) ─────────────────────── */}
        <section id="why">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">WHY COLLEGENCOURSES</div>
              <h2 className="h-display h2">What makes us different</h2>
            </div>

            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Typical aggregator</th>
                    <th scope="col">CollegeNCourses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Guidance</td>
                    <td>Commission-driven sales agent</td>
                    <td>AI Counsellor + named content experts</td>
                  </tr>
                  <tr>
                    <td>Programme list</td>
                    <td>500+ unverified</td>
                    <td>150+ UGC-DEB approved</td>
                  </tr>
                  <tr>
                    <td>Fees disclosure</td>
                    <td>&ldquo;Starting from...&rdquo;</td>
                    <td>Exact range, every programme</td>
                  </tr>
                  <tr>
                    <td>Sales follow-up</td>
                    <td>Multiple calls per day</td>
                    <td>One email at most, no spam</td>
                  </tr>
                  <tr>
                    <td>Recommendation tool</td>
                    <td>None</td>
                    <td>AI Counsellor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: AI COUNSELLOR ───────────────────────────────────── */}
        <section className="section-ai" id="ai-counsellor">
          <div className="container">
            <div className="ai-inner">
              <div className="eyebrow on-dark">AI COUNSELLOR</div>
              <h2 className="h-display h2">Your free AI Counsellor is ready when you are.</h2>
              <p>Answer six quick questions about your background, budget, and goals. In two minutes, get three personalised programme recommendations with a clear explanation of why each fits.</p>
              <a href="/ai-counsellor/" className="btn btn-primary">
                Start the AI Counsellor
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <p className="ai-caption">No phone number required to see your results. Built in-house.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: HOW IT WORKS ───────────────────────────────────── */}
        <section id="how-it-works">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">HOW IT WORKS</div>
              <h2 className="h-display h2">From first enquiry to a clear decision.</h2>
              <p>A simple, three-step process. No script. No sales pressure.</p>
            </div>

            <div className="testimonial-grid">
              <article className="testimonial">
                <div className="step-number">1</div>
                <h3 className="step-title">Share your situation</h3>
                <p className="step-body">Fill a short form or try the AI Counsellor. Tell us your background, goals, budget, and timeline. Two minutes is all it takes.</p>
              </article>

              <article className="testimonial">
                <div className="step-number">2</div>
                <h3 className="step-title">Get your personalised shortlist</h3>
                <p className="step-body">The AI Counsellor matches your profile, budget, and goals to the programmes that fit best. For Study Abroad, the Profile Evaluator shortlists universities by country and admit likelihood.</p>
              </article>

              <article className="testimonial">
                <div className="step-number">3</div>
                <h3 className="step-title">Choose with clarity</h3>
                <p className="step-body">You see your options, fees, and fit. If you decide to apply, the right institution&apos;s admissions team may reach out to help you enrol.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: TRUST STRIP ────────────────────────────────────── */}
        <section className="section-trust" aria-label="Accreditation and recognition">
          <div className="container">
            <p className="trust-strip-caption">We only list programmes from approved and accredited institutions.</p>
            <div className="trust-strip-large">
              <div className="trust-badge">
                <span className="trust-badge-icon">UGC</span>
                UGC-DEB Approved Universities
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">AC</span>
                AICTE Approved Institutions
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">NA</span>
                NAAC Accredited Universities
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 9: BLOG ───────────────────────────────────────────── */}
        <section id="blog">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">FRESH PERSPECTIVES</div>
              <h2 className="h-display h2">From our desk</h2>
              <p>Study in India, Study Abroad, programme choices, and what employers are really looking for.</p>
            </div>

            <div className="blog-grid">
              <article className="blog-card">
                <div className="blog-cover">
                  <div className="blog-cover-deco"></div>
                  <span className="blog-cover-tag">Study Abroad</span>
                </div>
                <div className="blog-card-body">
                  <h3>MBA in the USA vs UK: Which Makes More Sense for Indian Students in 2026?</h3>
                  <p className="blog-card-excerpt">Cost, visa requirements, GMAT expectations, and post-study work rights compared across both destinations. The answer depends on your budget and career goal.</p>
                  <div className="blog-card-meta">
                    <span>8 min read</span><span>&#183;</span><span>10 Jun 2026</span>
                  </div>
                  <a href="/blog/mba-usa-vs-uk-indian-students-2026/" className="blog-card-read">
                    Read article {ARROW_SVG}
                  </a>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-cover">
                  <div className="blog-cover-deco"></div>
                  <span className="blog-cover-tag">Regulatory Update</span>
                </div>
                <div className="blog-card-body">
                  <h3>UGC-DEB Approved List 2026-27: What Changed and Why It Matters to You</h3>
                  <p className="blog-card-excerpt">Three programmes lost approval this year. Five new ones joined. Here is the current list, cross-checked with UGC.</p>
                  <div className="blog-card-meta">
                    <span>7 min read</span><span>&#183;</span><span>02 May 2026</span>
                  </div>
                  <a href="/blog/ugc-deb-approved-list-2026-27/" className="blog-card-read">
                    Read article {ARROW_SVG}
                  </a>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-cover">
                  <div className="blog-cover-deco"></div>
                  <span className="blog-cover-tag">Programme Choice</span>
                </div>
                <div className="blog-card-body">
                  <h3>Online MBA vs Distance MBA in 2026: A Plain-Language Comparison</h3>
                  <p className="blog-card-excerpt">The modes have blurred. Here is what the difference actually means for your schedule, exams, and degree certificate.</p>
                  <div className="blog-card-meta">
                    <span>6 min read</span><span>&#183;</span><span>28 May 2026</span>
                  </div>
                  <a href="/blog/online-mba-vs-distance-mba-2026/" className="blog-card-read">
                    Read article {ARROW_SVG}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── SECTION 10: FAQ ───────────────────────────────────────────── */}
        <section className="section-faq" id="faq">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">FREQUENTLY ASKED</div>
              <h2 className="h-display h2">Questions aspirants ask us most often</h2>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={openFaq === i}
                    onClick={() => toggleFaq(i)}
                  >
                    {faq.q}
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ──────────────────────────────────────────────────── */}
        <section className="cta-band" id="contact">
          <div className="container">
            <h2>Ready to find your right programme?</h2>
            <p>Get a personalised shortlist in minutes. Free, with no obligation.</p>
            <button type="button" className="btn btn-inverted" onClick={openModal}>
              Get Free Guidance
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container">
          <div className={`footer-grid ${styles.footerGrid}`}>
            <div className="footer-col footer-brand">
              <a href="/" className="logo" aria-label="CollegeNCourses">
                <Image src="/logo.webp" alt="CollegeNCourses" width={120} height={48} style={{ height: 36, width: 'auto', background: 'var(--ivory)', padding: '4px 8px', borderRadius: 4 }} />
              </a>
              <div className="footer-tagline">Compare. Choose. Begin.</div>
              <div className="footer-address">
                DNYANAL EDUCON PRIVATE LIMITED<br />
                Pune, Maharashtra, India<br />
                <a href="tel:+917350460393" style={{ color: 'var(--yellow)' }}>+91 7350 460 393</a><br />
                <a href="mailto:info@collegencourses.com" style={{ color: 'var(--yellow)' }}>info@collegencourses.com</a>
              </div>
              <div className="footer-social">
                <a href="https://www.facebook.com/CollegeNCourses/" aria-label="Facebook" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                </a>
                <a href="https://www.instagram.com/collegencourses/" aria-label="Instagram" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/college-n-courses/" aria-label="LinkedIn" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Study in India</h4>
              <ul className="footer-list">
                <li><a href="/online-mba/">Online MBA</a></li>
                <li><a href="/distance-mba/">Distance MBA</a></li>
                <li><a href="/executive-mba/">Executive MBA</a></li>
                <li><a href="/regular-mba/">Regular MBA</a></li>
                <li><a href="/design/">Design Programmes</a></li>
                <li><a href="/specializations-guide/">Specializations Guide</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Study Abroad</h4>
              <ul className="footer-list">
                <li><a href="/study-abroad/">Overview</a></li>
                <li><a href="/study-abroad/usa/">USA</a></li>
                <li><a href="/study-abroad/uk/">United Kingdom</a></li>
                <li><a href="/study-abroad/canada/">Canada</a></li>
                <li><a href="/study-abroad/australia/">Australia</a></li>
                <li><a href="/study-abroad/profile-evaluation/">Profile Evaluation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul className="footer-list">
                <li><a href="/about/">About Us</a></li>
                <li><a href="/blog/">Blog</a></li>
                <li><a href="/resources/">Resources</a></li>
                <li><a href="/contact-us/">Contact</a></li>
                <li><a href="/ai-counsellor/">AI Counsellor</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <ul className="footer-list">
                <li><a href="/privacy-policy/">Privacy Policy</a></li>
                <li><a href="/terms-conditions/">Terms &amp; Conditions</a></li>
                <li><a href="/cookie-policy/">Cookie Policy</a></li>
                <li><a href="/grievances/">Grievances</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} DNYANAL EDUCON PRIVATE LIMITED. All rights reserved.<br />
            CollegeNCourses is an educational information platform. Programme data is verified at the time of publication; always confirm with the university before applying.
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY BAR ─────────────────────────────────────────── */}
      <div className="mobile-bar" aria-label="Quick actions">
        <a href="https://wa.me/917350460393" className="mb-whatsapp" aria-label="WhatsApp us" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.06L2 22l5.06-1.35A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.97 15.06c-1.35 0-2.67-.35-3.83-1.01l-.27-.16-2.83.74.75-2.76-.18-.28A7.94 7.94 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm4.39-5.97c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.53.12-.16.24-.61.77-.75.93-.14.16-.27.18-.51.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.27.36-.41.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.4-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.72 2.63 4.17 3.69.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" /></svg>
        </a>
        <a href="tel:+917350460393" className="mb-call" aria-label="Call us">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .92H5a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91A16 16 0 0015.09 17.91l1.27-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
        </a>
        <button type="button" className="mb-cta" onClick={openModal}>
          Get Free Guidance
        </button>
      </div>

      {/* ── LEAD FORM MODAL ───────────────────────────────────────────── */}
      {modalOpen && (
        <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label="Get free guidance" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="modal">
            {isSuccess ? (
              <div className="modal-success">
                <div className="modal-success-icon" aria-hidden="true">&#10003;</div>
                <h2>Enquiry received</h2>
                <p>Your enquiry is received. The right programmes may reach out to help you enrol.</p>
                <p>Meanwhile, explore our guides while you wait.</p>
                <a href="/blog/" className="btn btn-primary">Read our guides</a>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Get free guidance</h2>
                  <p>Personalised programme match in 3 steps</p>
                  <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">&#215;</button>
                  <div className="modal-progress" aria-hidden="true">
                    <span className={step >= 1 ? 'active' : ''}></span>
                    <span className={step >= 2 ? 'active' : ''}></span>
                    <span className={step >= 3 ? 'active' : ''}></span>
                  </div>
                </div>

                <div className="modal-body">
                  {step === 1 && (
                    <form onSubmit={handleStep1} noValidate>
                      <div className="modal-step active">
                        <div className="form-field">
                          <label htmlFor="nh-name">Full name</label>
                          <input id="nh-name" name="name" type="text" required placeholder="Your name" value={formData.name} onChange={handleField} />
                        </div>
                        <div className="form-field">
                          <label htmlFor="nh-phone">Mobile number</label>
                          <input id="nh-phone" name="phone" type="tel" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleField} />
                        </div>
                        <div className="form-field">
                          <label htmlFor="nh-email">Email address</label>
                          <input id="nh-email" name="email" type="email" required placeholder="you@example.com" value={formData.email} onChange={handleField} />
                        </div>
                      </div>
                      <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">
                          Next: Your interest
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleStep2} noValidate>
                      <div className="modal-step active">
                        <div className="form-field">
                          <label htmlFor="nh-interest">Where do you want to study?</label>
                          <select id="nh-interest" name="interest" required value={formData.interest} onChange={handleField}>
                            <option value="">Select...</option>
                            <option value="india">Study in India</option>
                            <option value="abroad">Study Abroad</option>
                            <option value="both">Not sure yet</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label htmlFor="nh-programme">Programme of interest</label>
                          <select id="nh-programme" name="programme" required value={formData.programme} onChange={handleField}>
                            <option value="">Select...</option>
                            <option value="online-mba">Online MBA</option>
                            <option value="distance-mba">Distance MBA</option>
                            <option value="executive-mba">Executive MBA</option>
                            <option value="mba-abroad">MBA Abroad</option>
                            <option value="ms-abroad">MS Abroad</option>
                            <option value="other">Other / Not sure</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label htmlFor="nh-mode">Preferred mode</label>
                          <select id="nh-mode" name="mode" value={formData.mode} onChange={handleField}>
                            <option value="">Select...</option>
                            <option value="online">Online (live sessions)</option>
                            <option value="distance">Distance (self-paced)</option>
                            <option value="executive">Executive (weekends)</option>
                            <option value="campus">On-campus abroad</option>
                            <option value="unsure">I&apos;m not sure</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-actions">
                        <button type="button" className="btn btn-back" onClick={() => setStep(1)}>Back</button>
                        <button type="submit" className="btn btn-primary">
                          Next: Final step
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleStep3} noValidate>
                      <div className="modal-step active">
                        <div className="form-field">
                          <label htmlFor="nh-notes">Anything else we should know? (optional)</label>
                          <textarea id="nh-notes" name="notes" placeholder="Budget, timeline, specific questions..." value={formData.notes} onChange={handleField} />
                          <span className="hint">This helps us match the right programmes for you.</span>
                        </div>

                        <div className="consent" style={consentError ? { outline: '2px solid red', borderRadius: 4, padding: 8 } : {}}>
                          <input
                            type="checkbox"
                            id="nh-consent"
                            checked={consentChecked}
                            onChange={e => { setConsentChecked(e.target.checked); if (e.target.checked) setConsentError(false) }}
                            required
                          />
                          <label htmlFor="nh-consent" style={{ cursor: 'pointer' }}>
                            I agree that CollegeNCourses and the university or institution I am enquiring about may contact me by call, WhatsApp, SMS, and email regarding my enquiry, including on numbers registered with DND/NDNC, and that my details may be shared with that institution&apos;s admissions team so they can assist me.
                          </label>
                        </div>
                        {consentError && (
                          <p style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                            Please tick the checkbox above to continue.
                          </p>
                        )}
                      </div>
                      <div className="modal-actions">
                        <button type="button" className="btn btn-back" onClick={() => setStep(2)}>Back</button>
                        <button type="submit" className="btn btn-primary">
                          Submit enquiry
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
