'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

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

export default function NewHomeClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('new-home')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'new-home') => {
    setModalSource(source)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  return (
    <>

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
              <button type="button" className="btn btn-primary" onClick={() => openModal('hero')}>
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
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openModal('programmes')}>Get Free Guidance</button>
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
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openModal('programmes')}>Get Free Guidance</button>
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
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openModal('programmes')}>Get Free Guidance</button>
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
          <button type="button" className="btn btn-inverted" onClick={() => openModal('cta-band')}>
            Get Free Guidance
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* ── LEAD MODAL (finalized form) ───────────────────────────────── */}
      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
