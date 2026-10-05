'use client'

import { useState, useCallback } from 'react'
import LeadModal from '@/components/forms/LeadModal'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const PROGRAMMES = [
  { rank: 1, uni: 'MIT Institute of Design, Pune', prog: 'B.Des', mode: 'Full-time Campus', duration: '48 mo', fee: 'Rs 12 L', rating: '4.6', batch: 'Jul 2026', accred: 'UGC, NAAC' },
  { rank: 2, uni: 'Symbiosis Institute of Design', prog: 'B.Des', mode: 'Full-time Campus', duration: '48 mo', fee: 'Rs 10 L', rating: '4.6', batch: 'Jul 2026', accred: 'UGC, NAAC A++' },
  { rank: 3, uni: 'Pearl Academy', prog: 'B.Des / M.Des', mode: 'Full-time Campus', duration: '36-48 mo', fee: 'Rs 9 L', rating: '4.5', batch: 'Jul 2026', accred: 'UGC' },
  { rank: 4, uni: 'World University of Design', prog: 'B.Des', mode: 'Full-time Campus', duration: '48 mo', fee: 'Rs 8 L', rating: '4.4', batch: 'Jul 2026', accred: 'UGC' },
  { rank: 5, uni: 'Amity School of Fashion Technology', prog: 'B.Des', mode: 'Full-time Campus', duration: '48 mo', fee: 'Rs 7 L', rating: '4.3', batch: 'Jul 2026', accred: 'UGC' },
  { rank: 6, uni: 'JD Institute of Fashion Technology', prog: 'B.Des', mode: 'Full-time Campus', duration: '36-48 mo', fee: 'Rs 6 L', rating: '4.2', batch: 'Jul 2026', accred: 'Approved Institute' },
  { rank: 7, uni: 'Manipal School of Architecture and Planning (Design)', prog: 'M.Des', mode: 'Full-time Campus', duration: '24 mo', fee: 'Rs 5.5 L', rating: '4.3', batch: 'Jul 2026', accred: 'UGC, NAAC A++' },
  { rank: 8, uni: 'Lovely Professional University (School of Design)', prog: 'B.Des', mode: 'Full-time Campus', duration: '48 mo', fee: 'Rs 4.5 L', rating: '4.1', batch: 'Jul 2026', accred: 'UGC' },
]

const FAQS = [
  {
    q: 'What is the difference between B.Des and M.Des?',
    a: 'B.Des (Bachelor of Design) is a 4-year undergraduate programme you can join directly after Class 12, in any stream. M.Des (Master of Design) is a 2-year postgraduate programme that requires a bachelor\'s degree (in design or a related field) for admission, and goes deeper into a specialization and research-led design practice.',
  },
  {
    q: 'What entrance exams are required for design programmes in India?',
    a: 'The most recognised entrance exams are UCEED (for IITs and IIITDM), CEED (for M.Des at IITs/IISc), and NID DAT (for NID campuses). Most private design institutes on our comparison list accept UCEED/NID DAT scores or run their own institute-level design aptitude test - check each institute\'s specific accepted exams.',
  },
  {
    q: 'Do I need a background in art to apply for a design programme?',
    a: 'No. Design programmes are open to students from any stream (Science, Commerce, Arts) after Class 12 for B.Des. What matters more is a design aptitude test performance (visual reasoning, creativity, problem-solving) rather than prior formal art training, though a design portfolio can strengthen your application at some institutes.',
  },
  {
    q: 'What specializations are available within design programmes?',
    a: 'Common specializations include Communication Design (graphic/UX-UI), Product Design, Fashion Design, Interior and Spatial Design, Textile Design, and Animation and Film Design. Specialization is usually chosen after a common foundation year.',
  },
  {
    q: 'How much does a design degree cost in India in 2026?',
    a: 'Fees for private design institutes range from about Rs 4.5 lakh to Rs 12 lakh for the full B.Des programme, and roughly Rs 5 lakh to Rs 8 lakh for M.Des, depending on the institute\'s reputation, studio infrastructure, and specialization.',
  },
  {
    q: 'What career outcomes can I expect after a design degree?',
    a: 'Design graduates typically move into roles such as UX/UI Designer, Product Designer, Graphic Designer, Fashion Designer, or Interior Designer, across startups, design studios, e-commerce and tech companies, and fashion/manufacturing houses. UX/UI and Product Design roles currently show the strongest salary growth.',
  },
  {
    q: 'Is NID or NIFT better than a private design institute?',
    a: 'NID and NIFT are government institutes with strong brand recognition and typically the most competitive entrance process (NID DAT, NIFT entrance exam). Private design institutes can offer comparable studio infrastructure and faculty, often with a less competitive admission process and more seats available - the right choice depends on your entrance exam performance, budget, and specialization interest.',
  },
]

export default function DesignProgrammesClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('design-programmes')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const openModal = useCallback((source = 'design-programmes') => {
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
            <a href="/study-in-india">Study in India</a>
            <span className="sep">/</span>
            <span className="crumb-current">Design Programmes</span>
          </nav>
        </div>
      </div>

      {/* Hero + Sidebar */}
      <section className="sp-hero">
        <div className="container">
          <div className="sp-layout">
            <div className="sp-hero-content">
              <div className="eyebrow">STUDY IN INDIA - DESIGN PROGRAMMES</div>
              <h1 className="h-display h1">Design Programmes in India 2026-27: Compare B.Des and M.Des Institutes</h1>

              <div className="answer-capsule">
                B.Des (4-year undergraduate) and M.Des (2-year postgraduate) are India's primary formal design degrees, open after Class 12 or graduation respectively. Total fees at accredited private institutes range from Rs 4.5 lakh to Rs 12 lakh. Entry is typically via UCEED, NID DAT, or an institute-level design aptitude test.
              </div>

              <p className="lede" style={{ marginBottom: 28 }}>
                Honest comparison of B.Des and M.Des programmes across fees, specializations, entrance exams, and career outcomes from accredited design institutes. Updated July 2026.
              </p>

              <div className="sp-cta-row">
                <button type="button" className="btn btn-primary" onClick={() => openModal('design-hero')}>
                  Get Free Guidance {ARROW}
                </button>
                <a href="#compare" className="btn btn-secondary">Compare programmes</a>
              </div>

              <div className="trust-strip">
                <span>500+ design aspirants guided since 2023</span>
                <span className="sep">·</span>
                <span>UGC and NAAC accredited institutes</span>
              </div>
            </div>

            <aside className="sp-sidebar" aria-label="Quick enquiry">
              <div className="sp-sidebar-header">
                <h3>Find the right design programme for you</h3>
                <p>Takes 2 minutes. Personalised to your profile.</p>
              </div>
              <div className="sp-sidebar-body">
                <div className="sp-sidebar-stats">
                  <div className="sp-sidebar-stat">
                    <span>Fee range:</span>
                    <strong>Rs 4.5 L - Rs 12 L</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Duration:</span>
                    <strong>B.Des 48 mo · M.Des 24 mo</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Entrance exams:</span>
                    <strong>UCEED / NID DAT / institute test</strong>
                  </div>
                  <div className="sp-sidebar-stat">
                    <span>Eligibility:</span>
                    <strong>Class 12 (B.Des) or graduate (M.Des)</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => openModal('design-sidebar')}
                >
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>

          <div className="toc-box">
            <h4>What is in this guide</h4>
            <ol>
              <li><a href="#compare">Top design institutes compared</a></li>
              <li><a href="#eligibility">Eligibility and admission requirements</a></li>
              <li><a href="#curriculum">What a design degree teaches in 2026</a></li>
              <li><a href="#outcomes">Career outcomes and salary data</a></li>
              <li><a href="#who">Is a design programme right for you?</a></li>
              <li><a href="#questions">Questions to ask before applying</a></li>
              <li><a href="#faq">Frequently asked questions</a></li>
            </ol>
          </div>
        </div>
      </section>

      {/* Section 1: Comparison Table */}
      <section className="section-lp section-lp-alt" id="compare">
        <div className="container">
          <div className="eyebrow">PROGRAMME COMPARISON</div>
          <h2 className="h-display h2">Top Design institutes in India 2026-27</h2>
          <hr className="section-rule" />

          <div className="comp-table-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Institute and Programme</th>
                  <th>Mode</th>
                  <th>Duration</th>
                  <th>Total Fee</th>
                  <th>Rating</th>
                  <th>Next Batch</th>
                  <th>Approval</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMMES.map(p => (
                  <tr key={p.rank}>
                    <td className="rank">{p.rank}</td>
                    <td>
                      <span className="uni-name">{p.uni}</span>
                      <span className="prog-label">{p.prog}</span>
                    </td>
                    <td><span className="mode-tag">{p.mode}</span></td>
                    <td>{p.duration}</td>
                    <td className="fee">{p.fee}</td>
                    <td><span className="stars-sm">★</span> {p.rating}</td>
                    <td>{p.batch}</td>
                    <td><span className="accred-tag">{p.accred}</span></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openModal(`table-${p.uni}`)}
                      >
                        Enquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comp-table-note">
            Fees shown are total programme fees and exclude material, studio, and hostel charges. Ratings are based on CollegeNCourses alumni survey 2026.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="#" className="btn btn-secondary btn-sm">Browse all design programmes on portal {ARROW}</a>
          </div>
        </div>
      </section>

      {/* Section 2: Eligibility */}
      <section className="section-lp" id="eligibility">
        <div className="container">
          <div className="eyebrow">ELIGIBILITY AND ADMISSION</div>
          <h2 className="h-display h2">Who can apply for a design programme?</h2>
          <hr className="section-rule" />
          <p>
            Eligibility differs by level - B.Des is open right after school, while M.Des requires a prior degree. Here are the standard requirements across most accredited design institutes.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { label: 'B.Des education', value: 'Class 12 pass, any stream (Science, Commerce, or Arts)' },
              { label: 'M.Des education', value: "Bachelor's degree in design or a related field" },
              { label: 'Entrance exam', value: 'UCEED, NID DAT, CEED (for M.Des), or institute-level design aptitude test' },
              { label: 'Portfolio', value: 'Recommended, required at some institutes - prior creative work, sketches, or projects' },
              { label: 'Age limit', value: 'No formal upper age limit at most private institutes' },
              { label: 'Admission process', value: 'Entrance test or portfolio review, followed by a studio test and/or interview' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--white)', border: '1px solid var(--mist)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">Admission timeline for 2026</div>
            <p>UCEED and NID DAT results are typically announced between March and April, with institute-specific studio tests and interviews running through May-June, and admissions closing by July. Private institutes that run their own design aptitude test often have multiple intake cycles - check each institute's specific calendar.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Curriculum */}
      <section className="section-lp section-lp-alt" id="curriculum">
        <div className="container">
          <div className="eyebrow">2026 CURRICULUM</div>
          <h2 className="h-display h2">What does a design degree actually teach in 2026?</h2>
          <hr className="section-rule" />
          <p>
            Most B.Des programmes begin with a common foundation year covering design fundamentals, before students choose a specialization stream for the remaining three years, culminating in a graduation project.
          </p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Design Fundamentals and Visual Communication',
              'Drawing and Sketching',
              'Design Thinking and Research Methods',
              'Materials and Manufacturing Processes',
              'Digital Design Tools (Adobe CC, Figma)',
              'Human-Centred and UX Design',
              'Design History and Semiotics',
              'Graduation Project (capstone)',
            ].map(subject => (
              <div key={subject} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--charcoal)' }}>
                <span style={{ color: 'var(--yellow)', fontWeight: 700, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>+</span>
                <span>{subject}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <h3 className="h-display h3" style={{ marginBottom: 16 }}>Specializations available in 2026</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Communication Design', 'UX / UI Design', 'Product Design', 'Fashion Design', 'Interior and Spatial Design', 'Textile Design', 'Animation and Film Design', 'AI-Assisted Design Tools (new 2026)'].map(s => (
                <span key={s} style={{ background: 'var(--pale-navy)', color: 'var(--navy)', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">What changed in 2026</div>
            <p>Leading design institutes have added AI-assisted design tools (generative image and prototyping tools) as a core module across specializations this year, alongside a stronger emphasis on sustainable and circular design practices. Ask whether your shortlisted institute's curriculum has been updated to reflect these shifts.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Career outcomes */}
      <section className="section-lp" id="outcomes">
        <div className="container">
          <div className="eyebrow">CAREER OUTCOMES</div>
          <h2 className="h-display h2">What design graduates earn (2026 data)</h2>
          <hr className="section-rule" />
          <p style={{ marginBottom: 6, fontSize: 14, color: 'var(--grey)' }}>
            Source: CollegeNCourses 2026 Alumni Survey, B.Des / M.Des graduates
          </p>

          <div className="salary-chart">
            {[
              { role: 'Junior / Associate Designer', avg: 'Rs 4.5 L', range: 'Rs 3 - 6 L', width: '20%' },
              { role: 'Designer / UX-UI Designer', avg: 'Rs 8 L', range: 'Rs 6 - 11 L', width: '42%' },
              { role: 'Senior Designer / Design Lead', avg: 'Rs 15 L', range: 'Rs 11 - 20 L', width: '68%' },
              { role: 'Design Manager / Creative Head', avg: 'Rs 26 L', range: 'Rs 18 - 40 L', width: '90%' },
            ].map(row => (
              <div className="salary-row" key={row.role}>
                <div className="salary-label">{row.role}</div>
                <div className="salary-bar-wrap">
                  <div className="salary-bar" style={{ width: row.width }}>
                    <span>{row.avg}</span>
                  </div>
                </div>
                <div className="salary-range">{row.range}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--grey)' }}>
            UX/UI and Product Design graduates in our survey reported the strongest early-career salary growth, driven by continued demand from technology and e-commerce companies. Fashion and Interior Design outcomes vary more widely and depend heavily on whether graduates join an established studio or pursue independent practice.
          </p>
        </div>
      </section>

      {/* Section 5: Is it right for you */}
      <section className="section-lp section-lp-alt" id="who">
        <div className="container">
          <div className="eyebrow">IS THIS FOR YOU?</div>
          <h2 className="h-display h2">Is a design programme right for you?</h2>
          <hr className="section-rule" />
          <div className="fit-grid">
            <div className="fit-box fit-yes">
              <h4>This fits if you are...</h4>
              <ul className="fit-list">
                <li>Creatively inclined and enjoy visual problem-solving, regardless of your Class 12 stream</li>
                <li>Interested in a career in UX/UI, product, fashion, communication, or interior design</li>
                <li>Willing to prepare for a design aptitude test such as UCEED or NID DAT</li>
                <li>Looking for a portfolio-driven career where practical studio work matters as much as theory</li>
                <li>A working graduate wanting to formalise design skills via M.Des</li>
              </ul>
            </div>
            <div className="fit-box fit-no">
              <h4>This may not fit if you are...</h4>
              <ul className="fit-list">
                <li>Looking for a purely analytical or quantitative career path - consider a management or technical degree instead</li>
                <li>Expecting guaranteed placement without building a strong personal portfolio</li>
                <li>Unable to commit to a 4-year full-time campus programme for B.Des</li>
                <li>Hoping to specialize without first building foundational design and sketching skills</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: 'var(--charcoal)' }}>Not sure which design programme and specialization fits you?</p>
            <button type="button" className="btn btn-primary" onClick={() => openModal('design-fit')}>
              Get Free Guidance {ARROW}
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Questions to ask */}
      <section className="section-lp" id="questions">
        <div className="container">
          <div className="eyebrow">BEFORE YOU APPLY</div>
          <h2 className="h-display h2">5 questions to ask before choosing a design institute</h2>
          <hr className="section-rule" />
          <div className="questions-list">
            {[
              {
                q: 'What studio and lab infrastructure does the institute actually have?',
                a: 'Design education is heavily hands-on. Ask to see (or visit) the model-making workshop, photography studio, textile/fashion labs, and computer labs with relevant software licenses - not just renders in a brochure.',
              },
              {
                q: 'Which entrance exams and scores does the institute accept?',
                a: 'Confirm whether the institute accepts UCEED, NID DAT, or only its own test, and what the typical cutoff or acceptance range has been in recent years - this affects how you should prepare and which institutes are realistic options.',
              },
              {
                q: 'What is the faculty\'s own design industry background?',
                a: 'Ask about faculty members\' professional design experience outside academia, not just teaching tenure. Institutes with faculty who are active practitioners typically offer more current, industry-relevant studio briefs.',
              },
              {
                q: 'What does the placement and portfolio-review process look like?',
                a: 'Ask whether the institute runs a structured placement process, hosts design studios/companies for recruitment, and provides formal portfolio review and presentation coaching before final year - this matters more in design hiring than a resume alone.',
              },
              {
                q: 'What is the complete fee breakdown, including material and studio charges?',
                a: 'Design programmes often have significant additional costs for materials, model-making supplies, software licenses, and studio equipment beyond the quoted tuition fee. Ask for a full, itemised cost estimate for all four (or two) years.',
              },
            ].map((item, i) => (
              <div className="q-item" key={i}>
                <div className="q-num">{i + 1}</div>
                <div className="q-body">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="section-lp section-lp-alt" id="faq">
        <div className="container">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h-display h2">Design programmes: common questions answered</h2>
          <hr className="section-rule" />
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
              >
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
          <h2>Ready to find your Design programme?</h2>
          <p>Get a personalised shortlist of B.Des and M.Des programmes matched to your interests, budget, and entrance exam scores. Free. Takes 2 minutes.</p>
          <button type="button" className="btn btn-inverted" onClick={() => openModal('design-cta-band')}>
            Get Free Guidance {ARROW}
          </button>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} source={modalSource} />
    </>
  )
}
