"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
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
  feeCategory?: string;
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
  feeCategory?: string;
  eligibility?: string;
  badge?: string;
  isFeatured?: boolean;
}

type AnyCardItem = CourseCardItem | UniversityCardItem;

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
  hideSidebar?: boolean;
  filterConfig?: {
    showMode?: boolean;
    showDuration?: boolean;
    showFeeRange?: boolean;
  };
  contentBlock?: {
    heading?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[];
    textAlign?: "left" | "center" | "right";
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
  iconStrip?: {
    items?: { iconUrl?: string; label: string }[];
  };
  placementStats?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    stats?: { value: string; label: string }[];
  };
  howWeHelp?: {
    heading?: string;
    subheading?: string;
    leftPoints?: string[];
    rightPoints?: string[];
    ctaLabel?: string;
  };
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

// ── Compare modal ──────────────────────────────────────────────────────────

function CompareModal({
  items,
  pageType,
  onClose,
  onCta,
}: {
  items: AnyCardItem[];
  pageType: "course" | "university";
  onClose: () => void;
  onCta: (name: string) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const getItemName = (item: AnyCardItem): string =>
    (pageType === "course" ? (item as CourseCardItem).courseName : item.universityName) ?? "";

  const fields: { label: string; render: (i: AnyCardItem) => string | undefined }[] =
    pageType === "course"
      ? [
          { label: "University", render: (i) => i.universityName },
          { label: "Mode",       render: (i) => i.mode },
          { label: "Duration",   render: (i) => i.duration },
          { label: "Fees (₹)",    render: (i) => i.fees },
          { label: "Eligibility",render: (i) => i.eligibility },
        ]
      : [
          { label: "Mode",        render: (i) => i.mode },
          { label: "Duration",    render: (i) => i.duration },
          { label: "Fees (₹)",   render: (i) => i.fees },
          { label: "Approved By", render: (i) => (i as UniversityCardItem).approvedBy?.join(" • ") },
          { label: "Eligibility", render: (i) => i.eligibility },
        ];

  const modalLabel = pageType === "course" ? "Compare courses" : "Compare universities";
  const modalTitle = pageType === "course" ? "Compare Courses" : "Compare Universities";

  return (
    <div className="lp-cmp-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={modalLabel}>
      <div className="lp-cmp-modal">
        <div className="lp-cmp-header">
          <h2 className="lp-cmp-title">{modalTitle}</h2>
          <button className="lp-cmp-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="lp-cmp-body">
          <div className="lp-cmp-table-wrap">
            <table className="lp-cmp-table">
              <thead>
                <tr>
                  <th className="lp-cmp-th lp-cmp-th-label"></th>
                  {items.map((item) => (
                    <th key={item._id} className="lp-cmp-th">
                      {item.universityLogoUrl ? (
                        <Image src={item.universityLogoUrl} alt={item.universityName ?? ""}
                          width={200} height={90} className="lp-cmp-logo" />
                      ) : (
                        <div className="lp-cmp-logo-ph">{(item.universityName ?? "?").charAt(0)}</div>
                      )}
                      <div className="lp-cmp-course-name">{getItemName(item)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map(({ label, render }) => (
                  <tr key={label} className="lp-cmp-row">
                    <td className="lp-cmp-td lp-cmp-td-label">{label}</td>
                    {items.map((item) => (
                      <td key={item._id} className="lp-cmp-td">{render(item) || <span className="lp-cmp-na">—</span>}</td>
                    ))}
                  </tr>
                ))}
                <tr className="lp-cmp-row lp-cmp-row-action">
                  <td className="lp-cmp-td lp-cmp-td-label"></td>
                  {items.map((item) => (
                    <td key={item._id} className="lp-cmp-td">
                      <button className="lp-btn-primary-full" onClick={() => onCta("Enquire Now")}>
                        Enquire Now
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
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

function CourseCard({
  item,
  onCta,
  inCompare = false,
  canCompare = true,
  onToggleCompare,
}: {
  item: CourseCardItem;
  onCta: (name: string) => void;
  inCompare?: boolean;
  canCompare?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}${inCompare ? " lp-card--comparing" : ""}`}>
      {item.badge && <span className="lp-card-badge">{item.badge}</span>}
      <div className="lp-card-head">
        {item.universityLogoUrl ? (
          <Image
            src={item.universityLogoUrl}
            alt={item.universityName || item.courseName}
            width={243}
            height={100}
            className="lp-card-logo"
          />
        ) : (
          <div className="lp-card-logo-ph" aria-hidden="true">
            {(item.universityName || item.courseName).charAt(0)}
          </div>
        )}
        <div className="lp-card-name">{item.courseName}</div>
        {item.universityName && <div className="lp-card-sub">{item.universityName}</div>}
        {item.mode && <span className="lp-mode-tag">{item.mode}</span>}
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
              <span className="lp-meta-label">Fees (₹)</span>
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
        <button className="lp-btn-primary-full" onClick={() => onCta("Get Free Career Counselling")}>
          Get Free Career Counselling
        </button>
        <div className="lp-card-sec-row">
          <button className="lp-btn-secondary" onClick={() => onCta("Download Brochure")}>
            Download Brochure
          </button>
          <button className="lp-btn-secondary" onClick={() => onCta("Enquire Now")}>
            Enquire Now
          </button>
        </div>
        {onToggleCompare && (
          <button
            className={`lp-compare-btn${inCompare ? " lp-compare-btn--active" : ""}`}
            onClick={() => onToggleCompare(item._id)}
            disabled={!inCompare && !canCompare}
            title={!inCompare && !canCompare ? "Maximum 3 courses can be compared" : undefined}
          >
            {inCompare ? "✓ Added to Compare" : "+ Compare"}
          </button>
        )}
      </div>
    </article>
  );
}

// ── University card ────────────────────────────────────────────────────────

function UniversityCard({
  item,
  onCta,
  inCompare = false,
  canCompare = true,
  onToggleCompare,
}: {
  item: UniversityCardItem;
  onCta: (name: string) => void;
  inCompare?: boolean;
  canCompare?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}${inCompare ? " lp-card--comparing" : ""}`}>
      {item.badge && <span className="lp-card-badge">{item.badge}</span>}
      <div className="lp-card-head">
        {item.universityLogoUrl ? (
          <Image
            src={item.universityLogoUrl}
            alt={item.universityName}
            width={243}
            height={100}
            className="lp-card-logo"
          />
        ) : (
          <div className="lp-card-logo-ph" aria-hidden="true">
            {item.universityName.charAt(0)}
          </div>
        )}
        <div className="lp-card-name">{item.universityName}</div>
        {item.mode && <span className="lp-mode-tag">{item.mode}</span>}
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
              <span className="lp-meta-label">Fees (₹)</span>
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
          <button className="lp-btn-secondary" onClick={() => onCta("Download Brochure")}>
            Download Brochure
          </button>
          <button className="lp-btn-primary-half" onClick={() => onCta("Enquire Now")}>
            Enquire Now
          </button>
        </div>
        {onToggleCompare && (
          <button
            className={`lp-compare-btn${inCompare ? " lp-compare-btn--active" : ""}`}
            onClick={() => onToggleCompare(item._id)}
            disabled={!inCompare && !canCompare}
            title={!inCompare && !canCompare ? "Maximum 3 universities can be compared" : undefined}
          >
            {inCompare ? "✓ Added to Compare" : "+ Compare"}
          </button>
        )}
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
  const [formTitle, setFormTitle] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<string | null>(null);
  const [activeFeeCategory, setActiveFeeCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const pageType: "course" | "university" =
    data.pageType ?? (data.courseItems?.length ? "course" : "university");

  const allItems: AnyCardItem[] =
    pageType === "course" ? (data.courseItems ?? []) : (data.universityItems ?? []);

  // Extract unique filter values from all items (always from full list)
  const allModes = useMemo(
    () => [...new Set(allItems.map((i) => i.mode).filter(Boolean) as string[])].sort(),
    [allItems]
  );
  const allDurations = useMemo(
    () => [...new Set(allItems.map((i) => i.duration).filter(Boolean) as string[])].sort(),
    [allItems]
  );
  const allFeeCategories = useMemo(() => {
    const seen = new Set<string>();
    allItems.forEach((i) => { if (i.feeCategory) seen.add(i.feeCategory); });
    const order = ["Under 1 Lakh", "1–2 Lakh", "2–3 Lakh", "3–5 Lakh", "5+ Lakh"];
    return order.filter((c) => seen.has(c));
  }, [allItems]);

  const anyFilterActive = activeMode !== null || activeDuration !== null || activeFeeCategory !== null;

  const filtered = useMemo(() => {
    let items = allItems;
    if (activeMode) items = items.filter((i) => i.mode === activeMode);
    if (activeDuration) items = items.filter((i) => i.duration === activeDuration);
    if (activeFeeCategory) items = items.filter((i) => i.feeCategory === activeFeeCategory);
    return items;
  }, [allItems, activeMode, activeDuration, activeFeeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openModal = useCallback((title = "") => {
    setFormTitle(title);
    setModalOpen(true);
  }, []);

  const toggleMode = useCallback((mode: string) => {
    setActiveMode((prev) => (prev === mode ? null : mode));
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const toggleDuration = useCallback((dur: string) => {
    setActiveDuration((prev) => (prev === dur ? null : dur));
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const toggleFeeCategory = useCallback((cat: string) => {
    setActiveFeeCategory((prev) => (prev === cat ? null : cat));
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveMode(null);
    setActiveDuration(null);
    setActiveFeeCategory(null);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const compareItems = useMemo(() => {
    const pool: AnyCardItem[] = pageType === "course" ? (data.courseItems ?? []) : (data.universityItems ?? []);
    return compareIds.map((id) => pool.find((c) => c._id === id)).filter(Boolean) as AnyCardItem[];
  }, [compareIds, data.courseItems, data.universityItems, pageType]);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
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
            <button className="btn btn-primary" onClick={() => openModal(data.hero?.primaryCtaLabel || "Get Free Counselling")}>
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

      {/* Content block — only rendered when at least one field has content */}
      {(data.contentBlock?.heading || data.contentBlock?.body?.length) && (
        <section className="lp-content-block">
          <div className="container lp-content-block-inner">
            {data.contentBlock.heading && (
              <h2 className="lp-content-block-heading">{data.contentBlock.heading}</h2>
            )}
            {data.contentBlock.body?.length ? (
              <div className="lp-content-block-body" style={{ textAlign: data.contentBlock.textAlign ?? "left" }}>
                <PortableText
                  value={data.contentBlock.body}
                  components={{
                    marks: {
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          target={value?.blank ? "_blank" : undefined}
                          rel={value?.blank ? "noopener noreferrer" : undefined}
                          className="lp-cb-link"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Main layout */}
      <div className="lp-main">
        <div className="container">
          <div className={`lp-layout${data.hideSidebar ? " lp-layout--no-sidebar" : ""}`}>

            {/* ── Left sidebar ─────────────────────────────────── */}
            {!data.hideSidebar && <aside className="lp-sidebar" aria-label="Filters">

              {/* Filter sections */}
              {(allModes.length > 0 || allDurations.length > 0 || allFeeCategories.length > 0) && (
                <div className="lp-filter-panel">
                  <div className="lp-filter-panel-head">
                    <span className="lp-filter-panel-title">Filters</span>
                    {anyFilterActive && (
                      <button className="lp-filter-clear-link" onClick={clearFilters}>
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Mode */}
                  {data.filterConfig?.showMode !== false && allModes.length > 0 && (
                    <div className="lp-filter-section">
                      <h4 className="lp-filter-heading">Mode</h4>
                      {allModes.map((mode) => (
                        <label key={mode} className="lp-filter-check">
                          <input
                            type="radio"
                            name="lp-mode-radio"
                            checked={activeMode === mode}
                            onChange={() => toggleMode(mode)}
                          />
                          <span>{mode}</span>
                        </label>
                      ))}
                      {activeMode && (
                        <button className="lp-filter-clear-link" style={{ marginTop: 4 }}
                          onClick={() => { setActiveMode(null); setVisibleCount(INITIAL_COUNT); }}>
                          Clear ×
                        </button>
                      )}
                    </div>
                  )}

                  {/* Duration */}
                  {data.filterConfig?.showDuration !== false && allDurations.length > 0 && (
                    <div className="lp-filter-section">
                      <h4 className="lp-filter-heading">Duration</h4>
                      {allDurations.map((dur) => (
                        <label key={dur} className="lp-filter-check">
                          <input
                            type="radio"
                            name="lp-duration-radio"
                            checked={activeDuration === dur}
                            onChange={() => toggleDuration(dur)}
                          />
                          <span>{dur}</span>
                        </label>
                      ))}
                      {activeDuration && (
                        <button className="lp-filter-clear-link" style={{ marginTop: 4 }}
                          onClick={() => { setActiveDuration(null); setVisibleCount(INITIAL_COUNT); }}>
                          Clear ×
                        </button>
                      )}
                    </div>
                  )}

                  {/* Fee Range */}
                  {data.filterConfig?.showFeeRange !== false && allFeeCategories.length > 0 && (
                    <div className="lp-filter-section">
                      <h4 className="lp-filter-heading">Fee Range (₹)</h4>
                      {allFeeCategories.map((cat) => (
                        <label key={cat} className="lp-filter-check">
                          <input
                            type="radio"
                            name="lp-fee-radio"
                            checked={activeFeeCategory === cat}
                            onChange={() => toggleFeeCategory(cat)}
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                      {activeFeeCategory && (
                        <button
                          className="lp-filter-clear-link"
                          style={{ marginTop: 4 }}
                          onClick={() => { setActiveFeeCategory(null); setVisibleCount(INITIAL_COUNT); }}
                        >
                          Clear ×
                        </button>
                      )}
                    </div>
                  )}

                  {anyFilterActive && (
                    <button className="lp-filter-clear-btn" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}

              {/* Counselling CTA */}
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
                    onClick={() => openModal("Talk to a Counsellor")}
                  >
                    Talk to a Counsellor
                  </button>
                  <p className="lp-sidebar-note">Free · No spam · 30 min</p>
                </div>
              )}
            </aside>}

            {/* ── Cards area ───────────────────────────────────── */}
            <div className="lp-content">
              <div className="lp-results-header">
                <p className="lp-results-count">
                  Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
                  <strong>{filtered.length}</strong>{" "}
                  {filtered.length === 1 ? itemLabel : itemLabelPlural}
                  {anyFilterActive && <span className="lp-filter-tag"> · filtered</span>}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="lp-empty">
                  <p>No results match the selected filters.</p>
                  <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="lp-card-grid">
                  {pageType === "course"
                    ? (visible as CourseCardItem[]).map((item) => (
                        <CourseCard
                          key={item._id}
                          item={item}
                          onCta={openModal}
                          inCompare={compareIds.includes(item._id)}
                          canCompare={compareIds.length < 3}
                          onToggleCompare={toggleCompare}
                        />
                      ))
                    : (visible as UniversityCardItem[]).map((item) => (
                        <UniversityCard
                          key={item._id}
                          item={item}
                          onCta={openModal}
                          inCompare={compareIds.includes(item._id)}
                          canCompare={compareIds.length < 3}
                          onToggleCompare={toggleCompare}
                        />
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

      {/* Icon Feature Strip */}
      {data.iconStrip?.items && data.iconStrip.items.length > 0 && (
        <section className="lp-icon-strip">
          <div className="container">
            <div className="lp-icon-strip-card">
              {data.iconStrip.items.map((item, i) => (
                <div key={i} className="lp-icon-strip-item">
                  <div className="lp-icon-strip-circle">
                    {item.iconUrl && (
                      <Image src={item.iconUrl} alt={item.label} width={48} height={48} className="lp-icon-strip-img" />
                    )}
                  </div>
                  <span className="lp-icon-strip-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Placement Stats */}
      {data.placementStats?.heading && (
        <section className="lp-stats">
          <div className="container">
            {data.placementStats.eyebrow && (
              <p className="lp-stats-eyebrow">{data.placementStats.eyebrow}</p>
            )}
            <h2 className="lp-stats-heading">{data.placementStats.heading}</h2>
            {data.placementStats.description && (
              <p className="lp-stats-desc">{data.placementStats.description}</p>
            )}
            {data.placementStats.stats && data.placementStats.stats.length > 0 && (
              <div className="lp-stats-grid">
                {data.placementStats.stats.map((stat, i) => (
                  <div key={i} className="lp-stat-card">
                    <span className="lp-stat-value">{stat.value}</span>
                    <span className="lp-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How We Help */}
      {data.howWeHelp?.heading && (
        <section className="lp-how-help">
          <div className="container">
            <h2 className="lp-how-help-heading">{data.howWeHelp.heading}</h2>
            {data.howWeHelp.subheading && (
              <p className="lp-how-help-sub">{data.howWeHelp.subheading}</p>
            )}
            {((data.howWeHelp.leftPoints?.length ?? 0) > 0 || (data.howWeHelp.rightPoints?.length ?? 0) > 0) && (
              <div className="lp-how-help-cards">
                {data.howWeHelp.leftPoints && data.howWeHelp.leftPoints.length > 0 && (
                  <div className="lp-how-help-card">
                    <ul>
                      {data.howWeHelp.leftPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.howWeHelp.rightPoints && data.howWeHelp.rightPoints.length > 0 && (
                  <div className="lp-how-help-card">
                    <ul>
                      {data.howWeHelp.rightPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {data.howWeHelp.ctaLabel && (
              <div className="lp-how-help-cta">
                <button className="lp-how-help-cta-btn" onClick={() => openModal(data.howWeHelp?.ctaLabel ?? "")}>
                  {data.howWeHelp.ctaLabel}
                </button>
              </div>
            )}
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
          <button className="btn btn-inverted" onClick={() => openModal(data.ctaBand?.ctaLabel || "Talk to a Counsellor")}>
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
        <button className="lp-mb-cta" onClick={() => openModal("Get Free Counselling")}>
          Get Free Counselling
        </button>
      </div>

      {/* Compare tray */}
      {compareIds.length > 0 && (
        <div className="lp-cmp-tray" role="region" aria-label="Compare tray">
          <div className="lp-cmp-tray-inner container">
            <div className="lp-cmp-tray-slots">
              {[0, 1, 2].map((i) => {
                const item = compareItems[i];
                const emptyLabel = pageType === "course" ? "+ Add course" : "+ Add university";
                return item ? (
                  <div key={item._id} className="lp-cmp-slot lp-cmp-slot--filled">
                    {item.universityLogoUrl ? (
                      <Image src={item.universityLogoUrl} alt={item.universityName ?? ""}
                        width={36} height={36} className="lp-cmp-slot-thumb" />
                    ) : (
                      <div className="lp-cmp-slot-ph">{(item.universityName ?? "?").charAt(0)}</div>
                    )}
                    <span className="lp-cmp-slot-name">
                      {pageType === "course" ? (item as CourseCardItem).courseName : item.universityName}
                    </span>
                    <button className="lp-cmp-slot-remove" onClick={() => toggleCompare(item._id)} aria-label="Remove">×</button>
                  </div>
                ) : (
                  <div key={i} className="lp-cmp-slot lp-cmp-slot--empty">
                    <span className="lp-cmp-slot-empty-label">{emptyLabel}</span>
                  </div>
                );
              })}
            </div>
            <div className="lp-cmp-tray-actions">
              <button
                className="lp-cmp-tray-btn"
                disabled={compareIds.length < 2}
                onClick={() => setCompareOpen(true)}
              >
                Compare ({compareIds.length})
              </button>
              <button className="lp-cmp-tray-clear" onClick={() => setCompareIds([])}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {compareOpen && compareItems.length >= 2 && (
        <CompareModal
          items={compareItems}
          pageType={pageType}
          onClose={() => setCompareOpen(false)}
          onCta={(name) => { setCompareOpen(false); openModal(name); }}
        />
      )}

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={`lp-${data.campaign?.toLowerCase().replace(/\s+/g, "-") || "organic"}`}
        title={formTitle || undefined}
      />

      <style>{`
        /* ── Urgency bar ── */
        .lp-urgency-bar { background: var(--yellow); color: var(--navy); font-size: 14px; font-weight: 600; text-align: center; padding: 10px 16px; border-bottom: 2px solid rgba(36,48,72,.15); }

        /* ── Stripped header ── */
        .lp-header { background: rgba(250,247,242,.97); backdrop-filter: saturate(180%) blur(8px); border-bottom: 1px solid var(--mist); position: sticky; top: 0; z-index: 100; }
        .lp-header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
        .lp-logo { display: block; }
        .lp-header-right { display: flex; align-items: center; gap: 10px; }
        .lp-phone { display: none; font-size: 13px; font-weight: 600; color: var(--navy); border: 1px solid var(--pale-navy); padding: 6px 12px; border-radius: 8px; text-decoration: none; align-items: center; gap: 6px; }
        @media (min-width: 768px) { .lp-phone { display: flex; } }

        /* ── Hero ── */
        .lp-hero { background: var(--navy); padding: 56px 0 48px; }
        .lp-eyebrow { color: var(--yellow) !important; margin-bottom: 12px; }
        .lp-h1 { font-family: var(--font-serif); color: var(--ivory); font-size: clamp(28px, 4.5vw, 52px); line-height: 1.1; margin: 0 0 16px; }
        .lp-lede { color: var(--pale-navy); font-size: clamp(15px, 1.8vw, 18px); max-width: 640px; margin-bottom: 28px; line-height: 1.6; }
        .lp-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .lp-btn-ghost-light { background: rgba(255,255,255,.1); color: var(--ivory) !important; border: 1.5px solid rgba(255,255,255,.25); min-height: 48px; display: inline-flex; align-items: center; justify-content: center; padding: 13px 24px; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none; transition: background .15s; }
        .lp-btn-ghost-light:hover { background: rgba(255,255,255,.18); }
        .lp-trust-strip { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 20px; font-size: 13px; color: var(--pale-navy); }
        .lp-trust-bullet { color: var(--yellow); font-weight: 700; margin-right: 3px; }

        /* ── Content block ── */
        .lp-content-block { background: var(--ivory); border-bottom: 1px solid var(--mist); padding: 32px 0; }
        .lp-content-block-inner { max-width: 800px; }
        .lp-content-block-heading { font-family: var(--font-serif); color: var(--navy); font-size: clamp(20px, 2.5vw, 28px); margin-bottom: 16px; line-height: 1.2; text-align: center; }
        .lp-content-block-body p { font-size: 15px; color: var(--charcoal); line-height: 1.7; margin-bottom: 10px; }
        .lp-content-block-body p:last-child { margin-bottom: 0; }
        .lp-content-block-body h2 { font-family: var(--font-serif); color: var(--navy); font-size: clamp(18px, 2vw, 24px); margin: 20px 0 8px; line-height: 1.2; }
        .lp-content-block-body h3 { font-family: var(--font-serif); color: var(--navy); font-size: clamp(16px, 1.6vw, 20px); margin: 16px 0 6px; line-height: 1.3; }
        .lp-content-block-body ul { list-style: disc; padding-left: 20px; margin-bottom: 10px; }
        .lp-content-block-body ol { list-style: decimal; padding-left: 20px; margin-bottom: 10px; }
        .lp-content-block-body li { font-size: 15px; color: var(--charcoal); line-height: 1.7; margin-bottom: 4px; }
        .lp-content-block-body strong { font-weight: 700; color: var(--navy); }
        .lp-content-block-body em { font-style: italic; }
        .lp-content-block-body u { text-decoration: underline; }
        .lp-cb-link { color: var(--navy); font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }

        /* ── Main layout ── */
        .lp-main { padding: 28px 0 64px; }
        .lp-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 1024px) { .lp-layout { grid-template-columns: 240px 1fr; gap: 32px; align-items: start; } }
        .lp-layout--no-sidebar { grid-template-columns: 1fr !important; }
        @media (min-width: 1024px) { .lp-layout--no-sidebar .lp-card-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1280px) { .lp-layout--no-sidebar .lp-card-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── Sidebar ── */
        .lp-sidebar { display: none; }
        @media (min-width: 1024px) {
          .lp-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; max-height: calc(100vh - 96px); overflow-y: auto; }
        }

        /* Filter panel */
        .lp-filter-panel { background: var(--white); border: 1px solid var(--mist); border-radius: 10px; overflow: hidden; }
        .lp-filter-panel-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--mist); background: var(--ivory); }
        .lp-filter-panel-title { font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--navy); }
        .lp-filter-clear-link { background: none; border: none; font-size: 12px; font-weight: 600; color: var(--grey); text-decoration: underline; cursor: pointer; font-family: var(--font-sans); padding: 0; }
        .lp-filter-clear-link:hover { color: var(--navy); }
        .lp-filter-section { padding: 14px 16px; border-bottom: 1px solid var(--mist); }
        .lp-filter-section:last-of-type { border-bottom: none; }
        .lp-filter-heading { font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--grey); margin-bottom: 10px; }
        .lp-filter-check { display: flex; gap: 8px; align-items: center; font-size: 13px; color: var(--charcoal); cursor: pointer; margin-bottom: 7px; line-height: 1.3; }
        .lp-filter-check:last-child { margin-bottom: 0; }
        .lp-filter-check input { accent-color: var(--navy); width: 14px; height: 14px; flex: 0 0 14px; cursor: pointer; }
        .lp-filter-clear-btn { display: block; width: calc(100% - 32px); margin: 12px 16px; padding: 9px; background: none; border: 1.5px solid var(--pale-navy); border-radius: 7px; color: var(--navy); font-size: 13px; font-weight: 600; font-family: var(--font-sans); cursor: pointer; text-align: center; transition: border-color .15s, background .15s; }
        .lp-filter-clear-btn:hover { border-color: var(--navy); background: var(--mist); }

        /* Sidebar CTA */
        .lp-sidebar-cta { background: var(--navy); border-radius: 10px; padding: 20px; }
        .lp-sidebar-cta h4 { font-family: var(--font-serif); color: var(--yellow); font-size: 17px; margin-bottom: 8px; line-height: 1.2; }
        .lp-sidebar-cta p { color: var(--pale-navy); font-size: 13px; margin-bottom: 14px; line-height: 1.5; }
        .lp-sidebar-note { font-size: 11px; color: rgba(255,255,255,.4); text-align: center; margin-top: 8px; margin-bottom: 0; }

        /* ── Results ── */
        .lp-results-header { margin-bottom: 14px; }
        .lp-results-count { font-size: 14px; color: var(--grey); }
        .lp-results-count strong { color: var(--navy); }
        .lp-filter-tag { color: var(--navy); font-weight: 600; }

        /* ── Card grid — 1 col → 2 col → 3 col ── */
        .lp-card-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 640px) { .lp-card-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1280px) { .lp-card-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Card ── */
        .lp-card { background: var(--white); border: 1px solid var(--mist); border-top: 4px solid var(--mist); border-radius: 10px; display: flex; flex-direction: column; gap: 12px; padding: 16px; position: relative; transition: box-shadow .18s, transform .18s; }
        .lp-card:hover { box-shadow: 0 4px 18px rgba(36,48,72,.1); transform: translateY(-2px); }
        .lp-card--featured { border-top-color: var(--yellow); }
        .lp-card-badge { position: absolute; top: 12px; right: 12px; background: var(--yellow); color: var(--navy); font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; }
        .lp-card-head { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; padding-bottom: 4px; }
        .lp-card-logo { width: 243px; max-width: 100%; height: 100px; object-fit: contain; border: 1px solid var(--mist); border-radius: 10px; background: var(--ivory); padding: 8px; }
        .lp-card-logo-ph { width: 243px; max-width: 100%; height: 100px; border-radius: 10px; background: var(--navy); color: var(--yellow); display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 800; font-family: var(--font-serif); }
        .lp-card-name { font-family: var(--font-serif); font-size: 15px; font-weight: 700; line-height: 1.3; color: var(--navy); margin-bottom: 0; }
        .lp-card-sub { font-size: 12px; color: var(--grey); margin-bottom: 0; }
        .lp-mode-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; background: var(--mist); color: var(--navy); padding: 2px 8px; border-radius: 999px; }
        .lp-card-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 0; border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist); }
        .lp-meta-cell { display: flex; flex-direction: column; gap: 2px; }
        .lp-meta-label { font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--grey); }
        .lp-meta-val { font-size: 13px; font-weight: 700; color: var(--navy); }
        .lp-card-info-row { font-size: 12px; color: var(--charcoal); line-height: 1.5; display: flex; flex-direction: column; gap: 2px; }
        .lp-card-actions { display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 2px; }
        .lp-card-sec-row { display: flex; gap: 6px; }
        .lp-btn-primary-full { width: 100%; background: var(--yellow); color: var(--navy); border: 2px solid var(--navy); border-radius: 8px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); padding: 9px 16px; cursor: pointer; transition: background .15s; text-align: center; }
        .lp-btn-primary-full:hover { background: #e6b800; }
        .lp-btn-primary-half { flex: 1; background: var(--yellow); color: var(--navy); border: 2px solid var(--navy); border-radius: 8px; font-size: 12px; font-weight: 700; font-family: var(--font-sans); padding: 9px 10px; cursor: pointer; transition: background .15s; text-align: center; }
        .lp-btn-primary-half:hover { background: #e6b800; }
        .lp-btn-secondary { flex: 1; background: var(--white); color: var(--navy); border: 1.5px solid var(--pale-navy); border-radius: 8px; font-size: 12px; font-weight: 600; font-family: var(--font-sans); padding: 9px 8px; cursor: pointer; transition: border-color .15s, background .15s; text-align: center; }
        .lp-btn-secondary:hover { border-color: var(--navy); background: var(--ivory); }

        /* ── Empty ── */
        .lp-empty { text-align: center; padding: 64px 0; color: var(--grey); }
        .lp-empty p { font-size: 16px; margin-bottom: 16px; }

        /* ── Load more ── */
        .lp-load-more { text-align: center; margin-top: 36px; }

        /* ── FAQ ── */
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

        /* ── CTA band ── */
        .lp-cta-band { background: var(--yellow); padding: 56px 0; border-top: 4px solid var(--navy); }
        .lp-cta-band-headline { font-family: var(--font-serif); color: var(--navy); font-size: clamp(22px, 3.5vw, 34px); margin-bottom: 12px; line-height: 1.15; }
        .lp-cta-band-body { color: var(--navy); font-size: 16px; margin-bottom: 24px; line-height: 1.6; }

        /* ── Mobile sticky bar ── */
        .lp-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; background: var(--white); border-top: 1px solid var(--mist); box-shadow: 0 -4px 16px rgba(36,48,72,.08); z-index: 50; display: flex; align-items: stretch; height: 60px; padding: 6px; gap: 6px; }
        @media (min-width: 1024px) { .lp-mobile-bar { display: none; } }
        .lp-mb-call, .lp-mb-whatsapp { display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; width: 48px; flex: 0 0 48px; text-decoration: none; }
        .lp-mb-call { background: var(--navy); color: var(--yellow); }
        .lp-mb-whatsapp { background: #25D366; color: white; }
        .lp-mb-cta { background: var(--yellow); color: var(--navy); border-top: 3px solid var(--navy); flex: 1; font-weight: 700; font-size: 13px; font-family: var(--font-sans); border-radius: 8px; border-left: none; border-right: none; border-bottom: none; cursor: pointer; }

        /* Body padding for mobile bar */
        body { padding-bottom: 60px; }
        @media (min-width: 1024px) { body { padding-bottom: 0; } }

        /* ── Compare button on card ── */
        .lp-compare-btn { width: 100%; background: none; border: 1.5px dashed var(--pale-navy); border-radius: 8px; font-size: 12px; font-weight: 600; font-family: var(--font-sans); color: var(--navy); padding: 7px 12px; cursor: pointer; transition: border-color .15s, background .15s, color .15s; text-align: center; }
        .lp-compare-btn:hover:not(:disabled) { border-style: solid; border-color: var(--navy); background: var(--mist); }
        .lp-compare-btn--active { background: var(--navy); color: var(--ivory); border-style: solid; border-color: var(--navy); }
        .lp-compare-btn--active:hover { background: #1a2b44; }
        .lp-compare-btn:disabled { opacity: 0.38; cursor: not-allowed; }
        .lp-card--comparing { border-color: var(--navy); border-top-color: var(--navy); box-shadow: 0 0 0 2px var(--navy); }

        /* ── Compare tray ── */
        .lp-cmp-tray { position: fixed; bottom: 60px; left: 0; right: 0; z-index: 60; background: var(--navy); border-top: 3px solid var(--yellow); box-shadow: 0 -4px 20px rgba(36,48,72,.25); }
        @media (min-width: 1024px) { .lp-cmp-tray { bottom: 0; } }
        .lp-cmp-tray-inner { display: flex; align-items: center; gap: 12px; padding: 10px 16px; flex-wrap: wrap; }
        .lp-cmp-tray-slots { display: flex; gap: 8px; flex: 1; min-width: 0; overflow-x: auto; }
        .lp-cmp-slot { display: flex; align-items: center; gap: 8px; border-radius: 8px; padding: 6px 10px; flex: 0 0 auto; max-width: 200px; }
        .lp-cmp-slot--filled { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2); }
        .lp-cmp-slot--empty { background: rgba(255,255,255,.05); border: 1.5px dashed rgba(255,255,255,.25); }
        .lp-cmp-slot-empty-label { font-size: 11px; color: rgba(255,255,255,.45); font-weight: 500; white-space: nowrap; }
        .lp-cmp-slot-thumb { width: 36px; height: 36px; object-fit: contain; border-radius: 6px; background: var(--ivory); flex: 0 0 36px; }
        .lp-cmp-slot-ph { width: 36px; height: 36px; border-radius: 6px; background: var(--yellow); color: var(--navy); font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: 0 0 36px; font-family: var(--font-serif); }
        .lp-cmp-slot-name { font-size: 11px; color: var(--ivory); font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 110px; }
        .lp-cmp-slot-remove { background: none; border: none; color: rgba(255,255,255,.55); font-size: 16px; cursor: pointer; padding: 0 2px; line-height: 1; flex: 0 0 auto; }
        .lp-cmp-slot-remove:hover { color: var(--ivory); }
        .lp-cmp-tray-actions { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; }
        .lp-cmp-tray-btn { background: var(--yellow); color: var(--navy); border: 2px solid var(--yellow); border-radius: 8px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); padding: 9px 20px; cursor: pointer; white-space: nowrap; transition: background .15s; }
        .lp-cmp-tray-btn:hover:not(:disabled) { background: #e6b800; }
        .lp-cmp-tray-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .lp-cmp-tray-clear { background: none; border: none; color: rgba(255,255,255,.55); font-size: 12px; font-weight: 600; cursor: pointer; font-family: var(--font-sans); text-decoration: underline; }
        .lp-cmp-tray-clear:hover { color: var(--ivory); }

        /* ── Icon Feature Strip ── */
        .lp-icon-strip { padding: 28px 0 36px; background: var(--white); }
        .lp-icon-strip-card { border: 1px solid var(--mist); border-radius: 16px; padding: 28px 24px; display: flex; flex-wrap: wrap; justify-content: center; gap: 28px 48px; }
        .lp-icon-strip-item { display: flex; flex-direction: column; align-items: center; gap: 12px; max-width: 150px; text-align: center; }
        .lp-icon-strip-circle { width: 80px; height: 80px; border-radius: 50%; border: 2px dashed #e879a0; display: flex; align-items: center; justify-content: center; flex: 0 0 80px; background: var(--white); }
        .lp-icon-strip-img { width: 48px; height: 48px; object-fit: contain; }
        .lp-icon-strip-label { font-size: 13px; font-weight: 600; color: var(--navy); line-height: 1.35; }

        /* ── Placement Stats ── */
        .lp-stats { padding: 56px 0; background: var(--white); border-top: 1px solid var(--mist); }
        .lp-stats-eyebrow { text-align: center; font-size: 13px; color: var(--grey); font-weight: 500; margin-bottom: 8px; letter-spacing: .03em; }
        .lp-stats-heading { font-family: var(--font-serif); font-size: clamp(24px, 3.5vw, 40px); color: var(--navy); text-align: center; margin-bottom: 16px; line-height: 1.15; }
        .lp-stats-desc { text-align: center; font-size: 15px; color: var(--charcoal); max-width: 680px; margin: 0 auto 40px; line-height: 1.65; }
        .lp-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 640px) { .lp-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .lp-stat-card { background: #f9c812; border-radius: 20px; padding: 28px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-align: center; min-height: 130px; }
        .lp-stat-value { font-family: var(--font-serif); font-size: clamp(30px, 5vw, 52px); font-weight: 800; color: var(--navy); line-height: 1; }
        .lp-stat-label { font-size: 13px; font-weight: 600; color: var(--navy); line-height: 1.4; }

        /* ── How We Help ── */
        .lp-how-help { background: var(--navy); padding: 56px 0; }
        .lp-how-help-heading { font-family: var(--font-serif); font-size: clamp(22px, 3.5vw, 38px); color: var(--ivory); text-align: center; margin-bottom: 14px; line-height: 1.15; }
        .lp-how-help-sub { font-size: 15px; color: var(--pale-navy); text-align: center; max-width: 620px; margin: 0 auto 36px; line-height: 1.65; }
        .lp-how-help-cards { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 36px; }
        @media (min-width: 640px) { .lp-how-help-cards { grid-template-columns: 1fr 1fr; } }
        .lp-how-help-card { background: var(--white); border-radius: 16px; padding: 28px 32px; }
        .lp-how-help-card ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .lp-how-help-card li { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; font-weight: 700; color: var(--navy); line-height: 1.4; }
        .lp-how-help-card li::before { content: "●"; color: var(--navy); font-size: 7px; flex: 0 0 7px; margin-top: 6px; }
        .lp-how-help-cta { text-align: center; }
        .lp-how-help-cta-btn { background: var(--yellow); color: var(--navy); border: none; border-radius: 28px; padding: 14px 36px; font-size: 15px; font-weight: 700; font-family: var(--font-sans); cursor: pointer; transition: background .15s, transform .15s; }
        .lp-how-help-cta-btn:hover { background: #e6b800; transform: translateY(-1px); }

        /* ── Compare modal ── */
        .lp-cmp-backdrop { position: fixed; inset: 0; background: rgba(20,30,48,.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .lp-cmp-modal { background: var(--white); border-radius: 14px; width: 100%; max-width: 860px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 64px rgba(20,30,48,.35); }
        .lp-cmp-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid var(--mist); background: var(--ivory); }
        .lp-cmp-title { font-family: var(--font-serif); font-size: 20px; color: var(--navy); margin: 0; }
        .lp-cmp-close { background: none; border: none; font-size: 26px; color: var(--grey); cursor: pointer; line-height: 1; padding: 0 4px; font-family: var(--font-sans); }
        .lp-cmp-close:hover { color: var(--navy); }
        .lp-cmp-body { overflow-y: auto; flex: 1; }
        .lp-cmp-table-wrap { overflow-x: auto; }
        .lp-cmp-table { width: 100%; border-collapse: collapse; }
        .lp-cmp-th { padding: 20px 16px 16px; text-align: center; vertical-align: top; border-bottom: 2px solid var(--mist); min-width: 180px; background: var(--ivory); }
        .lp-cmp-th-label { min-width: 100px; max-width: 110px; background: var(--ivory); }
        .lp-cmp-logo { display: block; margin: 0 auto; width: 100%; max-width: 200px; height: 90px; object-fit: contain; border: 1px solid var(--mist); border-radius: 10px; background: var(--white); padding: 8px; }
        .lp-cmp-logo-ph { width: 100%; max-width: 200px; height: 90px; border-radius: 10px; background: var(--navy); color: var(--yellow); font-size: 32px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-family: var(--font-serif); }
        .lp-cmp-course-name { font-family: var(--font-serif); font-size: 14px; font-weight: 700; color: var(--navy); margin-top: 10px; line-height: 1.3; }
        .lp-cmp-row { border-bottom: 1px solid var(--mist); }
        .lp-cmp-row:last-child { border-bottom: none; }
        .lp-cmp-row-action { background: var(--ivory); }
        .lp-cmp-td { padding: 14px 16px; font-size: 13px; color: var(--charcoal); vertical-align: middle; text-align: center; }
        .lp-cmp-td-label { font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--grey); text-align: left; background: var(--ivory); border-right: 1px solid var(--mist); white-space: nowrap; }
        .lp-cmp-na { color: var(--mist); }
      `}</style>
    </>
  );
}
