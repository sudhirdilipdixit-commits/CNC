"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import LeadModal from "@/components/forms/LeadModal";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CourseCardItem {
  _id: string;
  courseName: string;
  universityName?: string;
  universityLogoUrl?: string;
  mode?: string;
  duration?: string;
  fees?: string;
  eligibility?: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface UniversityCardItem {
  _id: string;
  universityName: string;
  universityLogoUrl?: string;
  mode?: string;
  duration?: string;
  approvedBy?: string[];
  fees?: string;
  eligibility?: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface LandingPageData {
  title: string;
  campaign?: string;
  pageType?: "course" | "university";
  showFullHeader?: boolean;
  showFooter?: boolean;
  urgencyBanner?: string;
  hero?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  filterConfig?: {
    showMode?: boolean;
  };
  sidebarForm?: {
    show?: boolean;
    heading?: string;
    subheading?: string;
  };
  trustPoints?: string[];
  courseItems?: CourseCardItem[];
  universityItems?: UniversityCardItem[];
  faqs?: { _id: string; question: string; answer: string }[];
  ctaBand?: { headline?: string; body?: string; ctaLabel?: string };
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

// ── Stripped header ────────────────────────────────────────────────────────

function LpHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header className="lp-header">
      <div className="container lp-header-inner">
        <a href="/" className="lp-logo" aria-label="CollegeNCourses Home">
          <Image src="/logo.webp" alt="CollegeNCourses" width={140} height={36} priority />
        </a>
        <div className="lp-header-right">
          <a href="tel:+917350460393" className="lp-phone" aria-label="Call us">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
            </svg>
            +91 7350 460 393
          </a>
          <button className="btn btn-primary btn-sm" onClick={onOpenModal}>
            Get Free Counselling
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Course card ────────────────────────────────────────────────────────────

function CourseCard({ item, onCta }: { item: CourseCardItem; onCta: (name: string) => void }) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}`}>
      {item.badge && <span className="lp-card-badge">{item.badge}</span>}

      <div className="lp-card-head">
        {item.universityLogoUrl ? (
          <Image
            src={item.universityLogoUrl}
            alt={item.universityName || item.courseName}
            width={48}
            height={48}
            className="lp-card-logo"
          />
        ) : (
          <div className="lp-card-logo-ph" aria-hidden="true">
            {(item.universityName || item.courseName).charAt(0)}
          </div>
        )}
        <div className="lp-card-titles">
          <div className="lp-card-name">{item.courseName}</div>
          {item.universityName && <div className="lp-card-sub">{item.universityName}</div>}
          {item.mode && <span className="lp-mode-tag">{item.mode}</span>}
        </div>
      </div>

      {(item.duration || item.fees) && (
        <div className="lp-card-meta">
          {item.duration && (
            <div className="lp-meta-cell">
              <span className="lp-meta-label">Duration</span>
              <span className="lp-meta-val">{item.duration}</span>
            </div>
          )}
          {item.fees && (
            <div className="lp-meta-cell">
              <span className="lp-meta-label">Fees</span>
              <span className="lp-meta-val">{item.fees}</span>
            </div>
          )}
        </div>
      )}

      {item.eligibility && (
        <div className="lp-card-info-row">
          <span className="lp-meta-label">Eligibility</span>
          <span>{item.eligibility}</span>
        </div>
      )}

      <div className="lp-card-actions">
        <button className="lp-btn-primary-full" onClick={() => onCta(item.courseName)}>
          Get Free Career Counselling
        </button>
        <div className="lp-card-sec-row">
          <button className="lp-btn-secondary" onClick={() => onCta(item.courseName)}>
            Download Brochure
          </button>
          <button className="lp-btn-secondary" onClick={() => onCta(item.courseName)}>
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

// ── University card ────────────────────────────────────────────────────────

function UniversityCard({ item, onCta }: { item: UniversityCardItem; onCta: (name: string) => void }) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}`}>
      {item.badge && <span className="lp-card-badge">{item.badge}</span>}

      <div className="lp-card-head">
        {item.universityLogoUrl ? (
          <Image
            src={item.universityLogoUrl}
            alt={item.universityName}
            width={48}
            height={48}
            className="lp-card-logo"
          />
        ) : (
          <div className="lp-card-logo-ph" aria-hidden="true">
            {item.universityName.charAt(0)}
          </div>
        )}
        <div className="lp-card-titles">
          <div className="lp-card-name">{item.universityName}</div>
          {item.mode && <span className="lp-mode-tag">{item.mode}</span>}
        </div>
      </div>

      {(item.duration || item.fees) && (
        <div className="lp-card-meta">
          {item.duration && (
            <div className="lp-meta-cell">
              <span className="lp-meta-label">Duration</span>
              <span className="lp-meta-val">{item.duration}</span>
            </div>
          )}
          {item.fees && (
            <div className="lp-meta-cell">
              <span className="lp-meta-label">Fees</span>
              <span className="lp-meta-val">{item.fees}</span>
            </div>
          )}
        </div>
      )}

      {item.approvedBy && item.approvedBy.length > 0 && (
        <div className="lp-card-info-row">
          <span className="lp-meta-label">Approved by</span>
          <span>{item.approvedBy.join(" • ")}</span>
        </div>
      )}

      {item.eligibility && (
        <div className="lp-card-info-row">
          <span className="lp-meta-label">Eligibility</span>
          <span>{item.eligibility}</span>
        </div>
      )}

      <div className="lp-card-actions">
        <div className="lp-card-sec-row">
          <button className="lp-btn-secondary" onClick={() => onCta(item.universityName)}>
            Download Brochure
          </button>
          <button className="lp-btn-primary-half" onClick={() => onCta(item.universityName)}>
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

// ── FAQ accordion item ─────────────────────────────────────────────────────

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="lp-faq-item">
      <summary className="lp-faq-q">
        {question}
        <span className="lp-faq-icon" aria-hidden="true">+</span>
      </summary>
      <div className="lp-faq-a">{answer}</div>
    </details>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const INITIAL_COUNT = 9;
const LOAD_BATCH = 6;

export default function LandingPageClient({
  data,
  footer,
}: {
  data: LandingPageData;
  footer: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultCourse, setDefaultCourse] = useState("");
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const pageType: "course" | "university" =
    data.pageType ?? (data.courseItems?.length ? "course" : "university");

  const allItems: (CourseCardItem | UniversityCardItem)[] =
    pageType === "course" ? (data.courseItems ?? []) : (data.universityItems ?? []);

  const fc = data.filterConfig ?? {};

  const allModes = useMemo(
    () => [...new Set(allItems.map((i) => i.mode).filter(Boolean) as string[])],
    [allItems]
  );

  const showModeFilter = fc.showMode !== false && allModes.length > 1;

  const filtered = useMemo(() => {
    if (!activeMode) return allItems;
    return allItems.filter((i) => i.mode === activeMode);
  }, [allItems, activeMode]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openModal = useCallback((name = "") => {
    setDefaultCourse(name);
    setModalOpen(true);
  }, []);

  const handleModeToggle = useCallback((mode: string) => {
    setActiveMode((prev) => (prev === mode ? null : mode));
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const itemLabel = pageType === "course" ? "course" : "university";
  const itemLabelPlural = pageType === "course" ? "courses" : "universities";

  return (
    <>
      {/* Urgency banner */}
      {data.urgencyBanner && (
        <div className="lp-urgency-bar" role="alert">{data.urgencyBanner}</div>
      )}

      {/* Header */}
      {data.showFullHeader ? (
        <Header onOpenLeadForm={() => openModal()} />
      ) : (
        <LpHeader onOpenModal={() => openModal()} />
      )}

      {/* Hero */}
      <div className="lp-hero">
        <div className="container">
          {data.hero?.eyebrow && (
            <div className="eyebrow lp-eyebrow">{data.hero.eyebrow}</div>
          )}
          {data.hero?.headline && <h1 className="lp-h1">{data.hero.headline}</h1>}
          {data.hero?.subheadline && <p className="lp-lede">{data.hero.subheadline}</p>}
          <div className="lp-cta-row">
            <button className="btn btn-primary" onClick={() => openModal()}>
              {data.hero?.primaryCtaLabel || "Get Free Counselling"}
            </button>
            {data.hero?.secondaryCtaLabel && (
              <a href={data.hero.secondaryCtaHref || "#"} className="btn lp-btn-ghost-light">
                {data.hero.secondaryCtaLabel}
              </a>
            )}
          </div>
          {data.trustPoints && data.trustPoints.length > 0 && (
            <div className="lp-trust-strip">
              {data.trustPoints.map((pt, i) => (
                <span key={i} className="lp-trust-item">
                  <span className="lp-trust-bullet" aria-hidden="true">✓</span> {pt}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mode filter chips */}
      {showModeFilter && (
        <div className="lp-filter-bar">
          <div className="container">
            <div className="lp-filter-row">
              <span className="lp-filter-label">Mode</span>
              {allModes.map((mode) => (
                <button
                  key={mode}
                  className={`lp-chip${activeMode === mode ? " lp-chip-active" : ""}`}
                  onClick={() => handleModeToggle(mode)}
                  aria-pressed={activeMode === mode}
                >
                  {mode}
                </button>
              ))}
              {activeMode && (
                <button
                  className="lp-clear-btn"
                  onClick={() => { setActiveMode(null); setVisibleCount(INITIAL_COUNT); }}
                >
                  Clear ×
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="lp-main">
        <div className="container">
          <div className="lp-layout">
            {/* Sidebar */}
            <aside className="lp-sidebar" aria-label="Quick counselling">
              {data.sidebarForm?.show !== false && (
                <div className="lp-sidebar-cta">
                  <h4>{data.sidebarForm?.heading || "Need help choosing?"}</h4>
                  <p>
                    {data.sidebarForm?.subheading ||
                      "Our counsellors match you to the right programme based on your profile and budget."}
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%" }}
                    onClick={() => openModal()}
                  >
                    Talk to a Counsellor
                  </button>
                  <p className="lp-sidebar-note">Free · No spam · 30 min</p>
                </div>
              )}
            </aside>

            {/* Cards */}
            <div className="lp-content">
              <div className="lp-results-header">
                <p className="lp-results-count">
                  Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
                  <strong>{filtered.length}</strong>{" "}
                  {filtered.length === 1 ? itemLabel : itemLabelPlural}
                  {activeMode ? ` · ${activeMode}` : ""}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="lp-empty">
                  <p>No results for &ldquo;{activeMode}&rdquo;.</p>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveMode(null)}
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                <div className="lp-card-grid">
                  {pageType === "course"
                    ? (visible as CourseCardItem[]).map((item) => (
                        <CourseCard key={item._id} item={item} onCta={openModal} />
                      ))
                    : (visible as UniversityCardItem[]).map((item) => (
                        <UniversityCard key={item._id} item={item} onCta={openModal} />
                      ))}
                </div>
              )}

              {hasMore && (
                <div className="lp-load-more">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setVisibleCount((c) => c + LOAD_BATCH)}
                  >
                    Load {Math.min(LOAD_BATCH, filtered.length - visibleCount)} more
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="lp-faq-section">
          <div className="container">
            <div className="eyebrow" style={{ textAlign: "center", color: "var(--navy)" }}>FAQ</div>
            <h2 className="lp-faq-heading">Frequently asked questions</h2>
            <div className="lp-faq-list">
              {data.faqs.map((faq) => (
                <FaqItem key={faq._id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="lp-cta-band">
        <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
          <h2 className="lp-cta-band-headline">
            {data.ctaBand?.headline || "Get a recommendation in 2 minutes."}
          </h2>
          <p className="lp-cta-band-body">
            {data.ctaBand?.body ||
              "Our counsellors recommend three programmes matched to your situation, budget, and timeline."}
          </p>
          <button className="btn btn-inverted" onClick={() => openModal()}>
            {data.ctaBand?.ctaLabel || "Talk to a Counsellor"}
          </button>
        </div>
      </section>

      {footer}

      {/* Mobile sticky bar */}
      <div className="lp-mobile-bar">
        <a href="tel:+917350460393" className="lp-mb-call" aria-label="Call us">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
          </svg>
        </a>
        <a
          href="https://wa.me/917350460393"
          className="lp-mb-whatsapp"
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <button className="lp-mb-cta" onClick={() => openModal()}>
          Get Free Counselling
        </button>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={`lp-${data.campaign?.toLowerCase().replace(/\s+/g, "-") || "organic"}`}
        defaultCourse={defaultCourse}
      />

      <style>{`
        /* Urgency bar */
        .lp-urgency-bar { background: var(--yellow); color: var(--navy); font-size: 14px; font-weight: 600; text-align: center; padding: 10px 16px; border-bottom: 2px solid rgba(36,48,72,.15); }

        /* Stripped header */
        .lp-header { background: rgba(250,247,242,.97); backdrop-filter: saturate(180%) blur(8px); border-bottom: 1px solid var(--mist); position: sticky; top: 0; z-index: 100; }
        .lp-header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
        .lp-logo { display: block; }
        .lp-header-right { display: flex; align-items: center; gap: 10px; }
        .lp-phone { display: none; font-size: 13px; font-weight: 600; color: var(--navy); border: 1px solid var(--pale-navy); padding: 6px 12px; border-radius: 8px; text-decoration: none; align-items: center; gap: 6px; }
        @media (min-width: 768px) { .lp-phone { display: flex; } }

        /* Hero */
        .lp-hero { background: var(--navy); padding: 56px 0 48px; }
        .lp-eyebrow { color: var(--yellow) !important; margin-bottom: 12px; }
        .lp-h1 { font-family: var(--font-serif); color: var(--ivory); font-size: clamp(28px, 4.5vw, 52px); line-height: 1.1; margin: 0 0 16px; }
        .lp-lede { color: var(--pale-navy); font-size: clamp(15px, 1.8vw, 18px); max-width: 640px; margin-bottom: 28px; line-height: 1.6; }
        .lp-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .lp-btn-ghost-light { background: rgba(255,255,255,.1); color: var(--ivory) !important; border: 1.5px solid rgba(255,255,255,.25); min-height: 48px; display: inline-flex; align-items: center; justify-content: center; padding: 13px 24px; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none; transition: background .15s; }
        .lp-btn-ghost-light:hover { background: rgba(255,255,255,.18); }
        .lp-trust-strip { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 20px; font-size: 13px; color: var(--pale-navy); }
        .lp-trust-bullet { color: var(--yellow); font-weight: 700; margin-right: 3px; }

        /* Mode filter bar */
        .lp-filter-bar { background: var(--white); border-bottom: 2px solid var(--mist); position: sticky; top: 64px; z-index: 90; box-shadow: 0 1px 3px rgba(36,48,72,.06); padding: 10px 0; }
        .lp-filter-row { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; }
        .lp-filter-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--grey); white-space: nowrap; }
        .lp-chip { padding: 5px 13px; font-size: 12px; font-weight: 500; border: 1.5px solid var(--pale-navy); border-radius: 999px; color: var(--navy); background: var(--white); white-space: nowrap; cursor: pointer; transition: all .15s; font-family: var(--font-sans); }
        .lp-chip:hover { border-color: var(--navy); }
        .lp-chip-active { background: var(--navy); color: var(--ivory); border-color: var(--navy); }
        .lp-clear-btn { color: var(--navy); font-size: 13px; font-weight: 600; text-decoration: underline; cursor: pointer; background: none; border: none; font-family: var(--font-sans); padding: 0; }

        /* Main */
        .lp-main { padding: 28px 0 64px; }
        .lp-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 1024px) { .lp-layout { grid-template-columns: 220px 1fr; gap: 32px; align-items: start; } }

        /* Sidebar */
        .lp-sidebar { display: none; }
        @media (min-width: 1024px) { .lp-sidebar { display: block; position: sticky; top: 100px; max-height: calc(100vh - 120px); overflow-y: auto; } }
        .lp-sidebar-cta { background: var(--navy); border-radius: 12px; padding: 20px; }
        .lp-sidebar-cta h4 { font-family: var(--font-serif); color: var(--yellow); font-size: 17px; margin-bottom: 8px; line-height: 1.2; }
        .lp-sidebar-cta p { color: var(--pale-navy); font-size: 13px; margin-bottom: 14px; line-height: 1.5; }
        .lp-sidebar-note { font-size: 11px; color: rgba(255,255,255,.4); text-align: center; margin-top: 8px; margin-bottom: 0; }

        /* Results */
        .lp-results-header { margin-bottom: 14px; }
        .lp-results-count { font-size: 14px; color: var(--grey); }
        .lp-results-count strong { color: var(--navy); }

        /* Card grid */
        .lp-card-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 540px) { .lp-card-grid { grid-template-columns: repeat(2, 1fr); } }

        /* Card base */
        .lp-card { background: var(--white); border: 1px solid var(--mist); border-top: 4px solid var(--mist); border-radius: 10px; display: flex; flex-direction: column; gap: 12px; padding: 16px; position: relative; transition: box-shadow .18s, transform .18s; }
        .lp-card:hover { box-shadow: 0 4px 18px rgba(36,48,72,.1); transform: translateY(-2px); }
        .lp-card--featured { border-top-color: var(--yellow); }

        /* Badge */
        .lp-card-badge { position: absolute; top: 12px; right: 12px; background: var(--yellow); color: var(--navy); font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; }

        /* Card header */
        .lp-card-head { display: flex; gap: 12px; align-items: flex-start; }
        .lp-card-logo { width: 48px; height: 48px; flex: 0 0 48px; object-fit: contain; border: 1px solid var(--mist); border-radius: 6px; background: var(--ivory); }
        .lp-card-logo-ph { width: 48px; height: 48px; flex: 0 0 48px; border-radius: 6px; background: var(--navy); color: var(--yellow); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; font-family: var(--font-serif); }
        .lp-card-titles { flex: 1; min-width: 0; }
        .lp-card-name { font-family: var(--font-serif); font-size: 16px; font-weight: 700; line-height: 1.3; color: var(--navy); margin-bottom: 4px; padding-right: 52px; }
        .lp-card-sub { font-size: 13px; color: var(--grey); margin-bottom: 4px; }
        .lp-mode-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; background: var(--mist); color: var(--navy); padding: 2px 8px; border-radius: 999px; }

        /* Meta grid */
        .lp-card-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 0; border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist); }
        .lp-meta-cell { display: flex; flex-direction: column; gap: 2px; }
        .lp-meta-label { font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--grey); }
        .lp-meta-val { font-size: 13px; font-weight: 700; color: var(--navy); }

        /* Info rows */
        .lp-card-info-row { font-size: 13px; color: var(--charcoal); line-height: 1.5; display: flex; flex-direction: column; gap: 2px; }

        /* Actions */
        .lp-card-actions { display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 2px; }
        .lp-card-sec-row { display: flex; gap: 8px; }
        .lp-btn-primary-full { width: 100%; background: var(--yellow); color: var(--navy); border: 2px solid var(--navy); border-radius: 8px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); padding: 10px 16px; cursor: pointer; transition: background .15s; text-align: center; }
        .lp-btn-primary-full:hover { background: #e6b800; }
        .lp-btn-primary-half { flex: 1; background: var(--yellow); color: var(--navy); border: 2px solid var(--navy); border-radius: 8px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); padding: 10px 12px; cursor: pointer; transition: background .15s; text-align: center; }
        .lp-btn-primary-half:hover { background: #e6b800; }
        .lp-btn-secondary { flex: 1; background: var(--white); color: var(--navy); border: 1.5px solid var(--pale-navy); border-radius: 8px; font-size: 13px; font-weight: 600; font-family: var(--font-sans); padding: 10px 10px; cursor: pointer; transition: border-color .15s, background .15s; text-align: center; }
        .lp-btn-secondary:hover { border-color: var(--navy); background: var(--ivory); }

        /* Empty */
        .lp-empty { text-align: center; padding: 64px 0; color: var(--grey); }
        .lp-empty p { font-size: 16px; margin-bottom: 16px; }

        /* Load more */
        .lp-load-more { text-align: center; margin-top: 36px; }

        /* FAQ */
        .lp-faq-section { background: var(--white); padding: 56px 0; border-top: 1px solid var(--mist); }
        .lp-faq-heading { font-family: var(--font-serif); color: var(--navy); font-size: clamp(22px, 3vw, 34px); text-align: center; margin: 10px 0 32px; }
        .lp-faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .lp-faq-item { border: 1px solid var(--mist); border-radius: 8px; background: var(--ivory); overflow: hidden; }
        .lp-faq-item[open] { border-color: var(--pale-navy); }
        .lp-faq-q { padding: 15px 18px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-weight: 600; color: var(--navy); font-size: 15px; line-height: 1.4; }
        .lp-faq-q::-webkit-details-marker { display: none; }
        .lp-faq-icon { width: 22px; height: 22px; background: var(--yellow); color: var(--navy); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; transition: transform .2s; flex: 0 0 22px; line-height: 1; }
        .lp-faq-item[open] .lp-faq-icon { transform: rotate(45deg); }
        .lp-faq-a { padding: 0 18px 18px; font-size: 14px; color: var(--charcoal); line-height: 1.65; }

        /* CTA band */
        .lp-cta-band { background: var(--yellow); padding: 56px 0; border-top: 4px solid var(--navy); }
        .lp-cta-band-headline { font-family: var(--font-serif); color: var(--navy); font-size: clamp(22px, 3.5vw, 34px); margin-bottom: 12px; line-height: 1.15; }
        .lp-cta-band-body { color: var(--navy); font-size: 16px; margin-bottom: 24px; line-height: 1.6; }

        /* Mobile sticky bar */
        .lp-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; background: var(--white); border-top: 1px solid var(--mist); box-shadow: 0 -4px 16px rgba(36,48,72,.08); z-index: 50; display: flex; align-items: stretch; height: 60px; padding: 6px; gap: 6px; }
        @media (min-width: 1024px) { .lp-mobile-bar { display: none; } }
        .lp-mb-call, .lp-mb-whatsapp { display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; width: 48px; flex: 0 0 48px; text-decoration: none; }
        .lp-mb-call { background: var(--navy); color: var(--yellow); }
        .lp-mb-whatsapp { background: #25D366; color: white; }
        .lp-mb-cta { background: var(--yellow); color: var(--navy); border-top: 3px solid var(--navy); flex: 1; font-weight: 700; font-size: 13px; font-family: var(--font-sans); border-radius: 8px; border-left: none; border-right: none; border-bottom: none; cursor: pointer; }

        /* Body bottom padding for mobile bar */
        body { padding-bottom: 60px; }
        @media (min-width: 1024px) { body { padding-bottom: 0; } }
      `}</style>
    </>
  );
}
