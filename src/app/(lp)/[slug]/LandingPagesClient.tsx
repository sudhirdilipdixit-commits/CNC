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
  duration?: string;
  approvedBy?: string[];
  fees?: string;
  eligibility?: string;
  badge?: string;
  isFeatured?: boolean;
}

type AnyCardItem = CourseCardItem | UniversityCardItem;

// ── Sort chips ─────────────────────────────────────────────────────────────

type SortKey = "balanced" | "fee-low" | "fee-high" | "accreditation";

function parseFeeAmount(fees?: string): number | null {
  if (!fees) return null;
  const match = fees.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

function sortItems(items: AnyCardItem[], sort: SortKey): AnyCardItem[] {
  if (sort === "balanced") return items;

  if (sort === "fee-low" || sort === "fee-high") {
    const known = items.filter((i) => parseFeeAmount(i.fees) !== null);
    const unknown = items.filter((i) => parseFeeAmount(i.fees) === null);
    known.sort((a, b) => {
      const va = parseFeeAmount(a.fees)!;
      const vb = parseFeeAmount(b.fees)!;
      return sort === "fee-low" ? va - vb : vb - va;
    });
    return [...known, ...unknown];
  }

  // accreditation — university cards only
  return [...items].sort(
    (a, b) =>
      ((b as UniversityCardItem).approvedBy?.length ?? 0) - ((a as UniversityCardItem).approvedBy?.length ?? 0)
  );
}

export interface LandingPagesData {
  title: string;
  pageType?: "course" | "university";
  showFullHeader?: boolean;
  showFooter?: boolean;
  urgencyBanner?: { show?: boolean; text?: string };
  hero: {
    show?: boolean;
    eyebrow?: string;
    headline: string;
    calloutText?: string;
    description?: string;
    updatedLabel?: string;
    reviewerName?: string;
    reviewerRole?: string;
    approverName?: string;
    approverRole?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  heroOption2?: {
    show?: boolean;
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    imageUrl?: string;
    imageAlt?: string;
    backgroundColor?: string;
    buttonColor?: string;
    fontColor?: string;
  };
  heroSidebarCard?: {
    show?: boolean;
    heading?: string;
    subtext?: string;
    stats?: { label: string; value: string }[];
    ctaLabel?: string;
  };
  highlightBanner?: {
    show?: boolean;
    headline?: string;
    leadText?: string;
    highlightText?: string;
    leftPoints?: string[];
    rightPoints?: string[];
    ctaLabel?: string;
    backgroundColor?: string;
    headlineColor?: string;
    accentTextColor?: string;
    ctaButtonColor?: string;
  };
  universityLogos?: {
    show?: boolean;
    headline?: string;
    ctaLabel?: string;
    logos?: { logoUrl?: string; name?: string }[];
    backgroundColor?: string;
    headlineColor?: string;
    ctaButtonColor?: string;
  };
  courseItems?: CourseCardItem[];
  universityItems?: UniversityCardItem[];
  faqs?: { show?: boolean; items?: { _id: string; question: string; answer: string }[] };
  iconStrip?: { show?: boolean; items?: { iconUrl?: string; label: string }[] };
  placementStats?: {
    show?: boolean;
    eyebrow?: string;
    heading?: string;
    description?: string;
    stats?: { value: string; label: string }[];
  };
  howWeHelp?: {
    show?: boolean;
    heading?: string;
    subheading?: string;
    leftPoints?: string[];
    rightPoints?: string[];
    ctaLabel?: string;
  };
  ctaBand?: { show?: boolean; headline?: string; body?: string; ctaLabel?: string };
  aboutThisPage?: {
    show?: boolean;
    eyebrow?: string;
    heading?: string;
    writtenBy?: { name?: string; role?: string; bio?: string };
    reviewedBy?: { name?: string; role?: string; bio?: string };
    approvedBy?: { name?: string; role?: string; bio?: string };
  };
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

function CourseCard({
  item,
  onCta,
}: {
  item: CourseCardItem;
  onCta: (name: string) => void;
}) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}`}>
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
        <button className="lp-btn-primary-full" onClick={() => onCta("Enquire Now")}>
          Enquire Now
        </button>
      </div>
    </article>
  );
}

// ── University card ────────────────────────────────────────────────────────

function UniversityCard({
  item,
  onCta,
}: {
  item: UniversityCardItem;
  onCta: (name: string) => void;
}) {
  return (
    <article className={`lp-card${item.isFeatured ? " lp-card--featured" : ""}`}>
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
        <button className="lp-btn-primary-full" onClick={() => onCta("Enquire Now")}>
          Enquire Now
        </button>
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

export default function LandingPagesClient({
  data,
  footer,
  slug,
}: {
  data: LandingPagesData;
  footer: React.ReactNode;
  slug: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [sort, setSort] = useState<SortKey>("balanced");

  const pageType: "course" | "university" =
    data.pageType ?? (data.courseItems?.length ? "course" : "university");

  const allItems: AnyCardItem[] = useMemo(
    () => (pageType === "course" ? (data.courseItems ?? []) : (data.universityItems ?? [])),
    [pageType, data.courseItems, data.universityItems]
  );

  const sortedItems = useMemo(() => sortItems(allItems, sort), [allItems, sort]);

  const sortOptions: { key: SortKey; label: string }[] =
    pageType === "university"
      ? [
          { key: "balanced", label: "Balanced pick" },
          { key: "fee-low", label: "Lowest fee first" },
          { key: "fee-high", label: "Highest fee first" },
          { key: "accreditation", label: "Strongest accreditation" },
        ]
      : [
          { key: "balanced", label: "Balanced pick" },
          { key: "fee-low", label: "Lowest fee first" },
          { key: "fee-high", label: "Highest fee first" },
        ];

  const changeSort = useCallback((key: SortKey) => {
    setSort(key);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const visible = sortedItems.slice(0, visibleCount);
  const hasMore = visibleCount < sortedItems.length;

  const openModal = useCallback((title = "") => {
    setFormTitle(title);
    setModalOpen(true);
  }, []);

  const itemLabel = pageType === "course" ? "course" : "university";
  const itemLabelPlural = pageType === "course" ? "courses" : "universities";

  const showHeroOption2 = data.heroOption2?.show === true;
  const showHighlightBanner = data.highlightBanner?.show;
  const showUniversityLogos = data.universityLogos?.show && (data.universityLogos.logos?.length ?? 0) > 0;
  const showFaqs = data.faqs?.show && (data.faqs.items?.length ?? 0) > 0;
  const showIconStrip = data.iconStrip?.show && (data.iconStrip.items?.length ?? 0) > 0;
  const showPlacementStats = data.placementStats?.show;
  const showHowWeHelp = data.howWeHelp?.show;
  const showCtaBand = data.ctaBand?.show !== false;
  const showAboutThisPage = data.aboutThisPage?.show !== false;

  return (
    <>
      {/* Urgency banner */}
      {data.urgencyBanner?.show && data.urgencyBanner.text && (
        <div className="lp-urgency-bar" role="alert">{data.urgencyBanner.text}</div>
      )}

      {/* Header */}
      {data.showFullHeader ? (
        <Header onOpenLeadForm={() => openModal()} />
      ) : (
        <LpHeader onOpenModal={() => openModal()} />
      )}

      {/* Hero — Option 1 */}
      {!showHeroOption2 && (
        <section className="lp-hero">
          <div className="container">
            <div className="lp-hero-layout">
              <div className="lp-hero-content">
                {data.hero.eyebrow && <div className="lp-hero-eyebrow">{data.hero.eyebrow}</div>}
                <h1 className="lp-h1">{data.hero.headline}</h1>
                {data.hero.calloutText && <div className="lp-hero-callout">{data.hero.calloutText}</div>}
                {data.hero.description && <p className="lp-lede">{data.hero.description}</p>}
                {data.hero.updatedLabel && <p className="lp-hero-updated">{data.hero.updatedLabel}</p>}
                <p className="lp-hero-byline">
                  Written by CollegeNCourses Editorial Team
                  {" · Reviewed by "}
                  {data.hero.reviewerName ? `${data.hero.reviewerName}, ` : ""}
                  {data.hero.reviewerRole || "CollegeNCourses Senior Counsellor"}
                  {" · Approved by "}
                  {data.hero.approverName || "Nikhita Pradeep Deshmukh"}
                  {data.hero.approverRole ? `, ${data.hero.approverRole}` : ""}
                </p>
                <div className="lp-cta-row">
                  <button className="btn btn-primary" onClick={() => openModal(data.hero.primaryCtaLabel || "Get Free Counselling")}>
                    {data.hero.primaryCtaLabel || "Get Free Counselling"}
                  </button>
                  {data.hero.secondaryCtaLabel && (
                    <a href="#programmes" className="btn btn-secondary">{data.hero.secondaryCtaLabel}</a>
                  )}
                </div>
              </div>

              {data.heroSidebarCard?.show !== false && (
                <aside className="lp-hero-sidebar" aria-label="Quick enquiry">
                  <div className="lp-hero-sidebar-header">
                    <h3>{data.heroSidebarCard?.heading || "Find the right programme for your goal"}</h3>
                    <p>{data.heroSidebarCard?.subtext || "Free. Takes 2 minutes."}</p>
                  </div>
                  <div className="lp-hero-sidebar-body">
                    {data.heroSidebarCard?.stats && data.heroSidebarCard.stats.length > 0 && (
                      <div className="lp-hero-sidebar-stats">
                        {data.heroSidebarCard.stats.map((item) => (
                          <div className="lp-hero-sidebar-stat" key={item.label}>
                            <span>{item.label}:</span>
                            <strong>{item.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={() => openModal(data.heroSidebarCard?.ctaLabel || "Get Free Guidance")}
                    >
                      {data.heroSidebarCard?.ctaLabel || "Get Free Guidance"}
                    </button>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hero — Option 2 */}
      {showHeroOption2 && (
        <section
          className="lp-hero2"
          style={{ background: data.heroOption2?.backgroundColor || "var(--navy)" }}
        >
          <div className="container">
            <div className="lp-hero2-layout">
              <div className="lp-hero2-content">
                {data.heroOption2?.eyebrow && (
                  <div className="lp-hero2-eyebrow" style={{ color: data.heroOption2?.buttonColor || "var(--yellow)" }}>
                    {data.heroOption2.eyebrow}
                  </div>
                )}
                {data.heroOption2?.headline && (
                  <h1 className="lp-hero2-headline" style={{ color: data.heroOption2?.fontColor || "var(--ivory)" }}>
                    {data.heroOption2.headline}
                  </h1>
                )}
                {data.heroOption2?.subheadline && (
                  <p className="lp-hero2-sub" style={{ color: data.heroOption2?.fontColor || "var(--pale-navy)" }}>
                    {data.heroOption2.subheadline}
                  </p>
                )}
                <div className="lp-cta-row">
                  <button
                    className="btn btn-primary"
                    style={data.heroOption2?.buttonColor ? { background: data.heroOption2.buttonColor } : undefined}
                    onClick={() => openModal(data.heroOption2?.primaryCtaLabel || "Get Free Counselling")}
                  >
                    {data.heroOption2?.primaryCtaLabel || "Get Free Counselling"}
                  </button>
                  {data.heroOption2?.secondaryCtaLabel && (
                    <button
                      className="lp-hero2-secondary-btn"
                      onClick={() => openModal(data.heroOption2?.secondaryCtaLabel || "Download Brochure")}
                    >
                      {data.heroOption2.secondaryCtaLabel}
                    </button>
                  )}
                </div>
              </div>

              {data.heroOption2?.imageUrl && (
                <div className="lp-hero2-media">
                  <Image
                    src={data.heroOption2.imageUrl}
                    alt={data.heroOption2.imageAlt || ""}
                    width={560}
                    height={420}
                    className="lp-hero2-img"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Highlight Banner */}
      {showHighlightBanner && (
        <section
          className="lp-hlb"
          style={{ background: data.highlightBanner?.backgroundColor || "var(--navy)" }}
        >
          <div className="container">
            {data.highlightBanner?.headline && (
              <h2
                className="lp-hlb-headline"
                style={{ color: data.highlightBanner.headlineColor || "var(--yellow)" }}
              >
                {data.highlightBanner.headline}
              </h2>
            )}
            {(data.highlightBanner?.leadText || data.highlightBanner?.highlightText) && (
              <p className="lp-hlb-subtext">
                {data.highlightBanner?.leadText}{" "}
                {data.highlightBanner?.highlightText && (
                  <span style={{ color: data.highlightBanner.accentTextColor || "var(--yellow)" }}>
                    {data.highlightBanner.highlightText}
                  </span>
                )}
              </p>
            )}
            {((data.highlightBanner?.leftPoints?.length ?? 0) > 0 ||
              (data.highlightBanner?.rightPoints?.length ?? 0) > 0) && (
              <div className="lp-hlb-points">
                {data.highlightBanner?.leftPoints && data.highlightBanner.leftPoints.length > 0 && (
                  <ul className="lp-hlb-points-col">
                    {data.highlightBanner.leftPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                )}
                {data.highlightBanner?.rightPoints && data.highlightBanner.rightPoints.length > 0 && (
                  <ul className="lp-hlb-points-col">
                    {data.highlightBanner.rightPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {data.highlightBanner?.ctaLabel && (
              <div className="lp-hlb-cta">
                <button
                  className="lp-hlb-cta-btn"
                  style={{ background: data.highlightBanner.ctaButtonColor || "var(--yellow)" }}
                  onClick={() => openModal(data.highlightBanner?.ctaLabel ?? "")}
                >
                  {data.highlightBanner.ctaLabel}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* University Logos */}
      {showUniversityLogos && (
        <section
          className="lp-unilogos"
          style={{ background: data.universityLogos?.backgroundColor || "var(--ivory)" }}
        >
          <div className="container">
            {data.universityLogos?.headline && (
              <h2
                className="lp-unilogos-headline"
                style={{ color: data.universityLogos.headlineColor || "var(--navy)" }}
              >
                {data.universityLogos.headline}
              </h2>
            )}
            <div className="lp-unilogos-grid">
              {data.universityLogos!.logos!.map((item, i) => (
                <div key={i} className="lp-unilogos-card">
                  {item.logoUrl && (
                    <Image
                      src={item.logoUrl}
                      alt={item.name || ""}
                      width={220}
                      height={100}
                      className="lp-unilogos-img"
                    />
                  )}
                </div>
              ))}
            </div>
            {data.universityLogos?.ctaLabel && (
              <div className="lp-unilogos-cta">
                <button
                  className="lp-unilogos-cta-btn"
                  style={{ background: data.universityLogos.ctaButtonColor || "var(--yellow)" }}
                  onClick={() => openModal(data.universityLogos?.ctaLabel ?? "")}
                >
                  {data.universityLogos.ctaLabel}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Cards area — full width, no sidebar */}
      <div className="lp-main" id="programmes">
        <div className="container">
          <div className="lp-content lp-content--full">
            <div className="lp-results-header">
              <p className="lp-results-count">
                Showing <strong>{Math.min(visibleCount, sortedItems.length)}</strong> of{" "}
                <strong>{sortedItems.length}</strong> {sortedItems.length === 1 ? itemLabel : itemLabelPlural}
              </p>
            </div>

            {allItems.length > 0 && (
              <div className="lp-sort-chips" role="group" aria-label={`Sort ${itemLabelPlural} by`}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className={`lp-sort-chip${sort === opt.key ? " lp-sort-chip--active" : ""}`}
                    onClick={() => changeSort(opt.key)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {allItems.length === 0 ? (
              <div className="lp-empty">
                <p>No {itemLabelPlural} added yet.</p>
              </div>
            ) : (
              <div className="lp-card-grid lp-card-grid--full">
                {pageType === "course"
                  ? (visible as CourseCardItem[]).map((item) => (
                      <CourseCard
                        key={item._id}
                        item={item}
                        onCta={openModal}
                      />
                    ))
                  : (visible as UniversityCardItem[]).map((item) => (
                      <UniversityCard
                        key={item._id}
                        item={item}
                        onCta={openModal}
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
                  Load {Math.min(LOAD_BATCH, sortedItems.length - visibleCount)} more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Icon Feature Strip */}
      {showIconStrip && (
        <section className="lp-icon-strip">
          <div className="container">
            <div className="lp-icon-strip-card">
              {data.iconStrip!.items!.map((item, i) => (
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
      {showPlacementStats && (
        <section className="lp-stats">
          <div className="container">
            {data.placementStats?.eyebrow && (
              <p className="lp-stats-eyebrow">{data.placementStats.eyebrow}</p>
            )}
            {data.placementStats?.heading && (
              <h2 className="lp-stats-heading">{data.placementStats.heading}</h2>
            )}
            {data.placementStats?.description && (
              <p className="lp-stats-desc">{data.placementStats.description}</p>
            )}
            {data.placementStats?.stats && data.placementStats.stats.length > 0 && (
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
      {showHowWeHelp && (
        <section className="lp-how-help">
          <div className="container">
            {data.howWeHelp?.heading && <h2 className="lp-how-help-heading">{data.howWeHelp.heading}</h2>}
            {data.howWeHelp?.subheading && (
              <p className="lp-how-help-sub">{data.howWeHelp.subheading}</p>
            )}
            {((data.howWeHelp?.leftPoints?.length ?? 0) > 0 || (data.howWeHelp?.rightPoints?.length ?? 0) > 0) && (
              <div className="lp-how-help-cards">
                {data.howWeHelp?.leftPoints && data.howWeHelp.leftPoints.length > 0 && (
                  <div className="lp-how-help-card">
                    <ul>
                      {data.howWeHelp.leftPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.howWeHelp?.rightPoints && data.howWeHelp.rightPoints.length > 0 && (
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
            {data.howWeHelp?.ctaLabel && (
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
      {showCtaBand && (
        <section className="lp-cta-band">
          <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
            <h2 className="lp-cta-band-headline">
              {data.ctaBand?.headline || "Get a recommendation in 2 minutes."}
            </h2>
            <p className="lp-cta-band-body">
              {data.ctaBand?.body ||
                "Our AI Counsellor recommends three programmes matched to your situation, budget, and timeline."}
            </p>
            <button className="btn btn-inverted" onClick={() => openModal(data.ctaBand?.ctaLabel || "Get Free Guidance")}>
              {data.ctaBand?.ctaLabel || "Get Free Guidance"}
            </button>
          </div>
        </section>
      )}

      {/* FAQs */}
      {showFaqs && (
        <section className="lp-faq-section">
          <div className="container">
            <div className="eyebrow" style={{ textAlign: "center", color: "var(--navy)" }}>FAQ</div>
            <h2 className="lp-faq-heading">Frequently asked questions</h2>
            <div className="lp-faq-list">
              {data.faqs!.items!.map((faq) => (
                <FaqItem key={faq._id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About This Page */}
      {showAboutThisPage && (
        <section className="lp-about-section">
          <div className="container">
            <div className="lp-about-eyebrow">{data.aboutThisPage?.eyebrow || "About This Page"}</div>
            <h2 className="lp-about-heading">{data.aboutThisPage?.heading || "Who wrote and reviewed this page"}</h2>
            <hr className="lp-about-rule" />
            <div className="lp-about-card">
              {[
                {
                  label: "Written by",
                  name: data.aboutThisPage?.writtenBy?.name || "CollegeNCourses Editorial Team",
                  role: data.aboutThisPage?.writtenBy?.role || "Content Lead, CollegeNCourses Editorial Desk",
                  bio: data.aboutThisPage?.writtenBy?.bio || "Our editorial team tracks fees, approvals, and batch timelines for online MBA programmes across UGC-DEB approved private universities.",
                },
                {
                  label: "Reviewed by",
                  name: data.aboutThisPage?.reviewedBy?.name || "CollegeNCourses Senior Counsellor",
                  role: data.aboutThisPage?.reviewedBy?.role || "Senior Counsellor, CollegeNCourses",
                  bio: data.aboutThisPage?.reviewedBy?.bio || "Our reviewing counsellor has advised working professionals across Distance, Online, and Executive MBA modes.",
                },
                {
                  label: "Approved by",
                  name: data.aboutThisPage?.approvedBy?.name || "Nikhita Pradeep Deshmukh",
                  role: data.aboutThisPage?.approvedBy?.role || "Founder, Dnyanal Educon Pvt Ltd",
                  bio: data.aboutThisPage?.approvedBy?.bio || "Founder of CollegeNCourses.",
                },
              ].map(({ label, name, role, bio }) => (
                <div className="lp-about-row" key={label}>
                  <span className="lp-about-name">{label}: {name}</span>
                  {role && <div className="lp-about-role">{role}</div>}
                  {bio && <p className="lp-about-bio">{bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={`lp-${slug}`}
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
        .lp-hero { background: var(--ivory); padding: 40px 0; }
        .lp-hero-layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
        @media (min-width: 1024px) { .lp-hero-layout { grid-template-columns: 1fr 340px; gap: 56px; } }
        .lp-hero-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--grey); margin-bottom: 10px; }
        .lp-h1 { font-family: var(--font-serif); color: var(--navy); font-size: clamp(28px, 4.5vw, 52px); line-height: 1.1; margin: 0 0 20px; }
        .lp-hero-callout { background: var(--white); border-left: 4px solid var(--yellow); border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 24px; font-size: 15px; color: var(--charcoal); line-height: 1.65; }
        .lp-lede { color: var(--charcoal); font-size: clamp(15px, 1.8vw, 17px); max-width: 640px; margin-bottom: 8px; line-height: 1.6; }
        .lp-hero-updated { font-size: 13px; color: var(--grey); margin-bottom: 6px; }
        .lp-hero-byline { font-size: 12px; color: var(--grey); margin-bottom: 28px; line-height: 1.5; }
        .lp-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ── Hero sidebar card ── */
        .lp-hero-sidebar { display: none; }
        @media (min-width: 1024px) {
          .lp-hero-sidebar { display: block; position: sticky; top: calc(64px + 24px); background: var(--white); border: 1px solid var(--mist); border-top: 4px solid var(--yellow); border-radius: 10px; box-shadow: 0 4px 18px rgba(36,48,72,.1); overflow: hidden; }
        }
        .lp-hero-sidebar-header { background: var(--navy); padding: 20px; }
        .lp-hero-sidebar-header h3 { font-family: var(--font-serif); font-size: 20px; color: var(--ivory); margin-bottom: 6px; line-height: 1.2; }
        .lp-hero-sidebar-header p { font-size: 13px; color: var(--yellow); }
        .lp-hero-sidebar-body { padding: 20px; }
        .lp-hero-sidebar-stats { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .lp-hero-sidebar-stat { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--charcoal); }
        .lp-hero-sidebar-stat strong { color: var(--navy); }

        /* ── Hero — Option 2 ── */
        .lp-hero2 { padding: 64px 0; }
        .lp-hero2-layout { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
        @media (min-width: 900px) { .lp-hero2-layout { grid-template-columns: 1fr 1fr; } }
        .lp-hero2-eyebrow { font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 14px; }
        .lp-hero2-headline { font-family: var(--font-serif); font-size: clamp(28px, 4.5vw, 50px); line-height: 1.1; margin: 0 0 20px; }
        .lp-hero2-sub { font-size: clamp(15px, 1.8vw, 18px); max-width: 640px; margin-bottom: 28px; line-height: 1.6; }
        .lp-hero2-secondary-btn { background: rgba(255,255,255,.08); color: var(--ivory); border: 1.5px solid rgba(255,255,255,.3); min-height: 48px; display: inline-flex; align-items: center; justify-content: center; padding: 13px 24px; font-size: 15px; font-weight: 600; font-family: var(--font-sans); border-radius: 8px; cursor: pointer; transition: background .15s; }
        .lp-hero2-secondary-btn:hover { background: rgba(255,255,255,.16); }
        .lp-hero2-media { display: flex; align-items: center; justify-content: center; }
        .lp-hero2-img { width: 100%; height: auto; max-width: 560px; object-fit: contain; border-radius: 12px; }

        /* ── Highlight Banner ── */
        .lp-hlb { padding: 56px 0; text-align: center; }
        .lp-hlb-headline { font-family: var(--font-serif); font-size: clamp(24px, 3.5vw, 40px); line-height: 1.15; margin: 0 0 20px; }
        .lp-hlb-subtext { color: var(--ivory); font-size: clamp(14px, 1.6vw, 17px); line-height: 1.6; max-width: 880px; margin: 0 auto 32px; }
        .lp-hlb-points { display: grid; grid-template-columns: 1fr; gap: 10px 48px; max-width: 760px; margin: 0 auto 36px; text-align: left; }
        @media (min-width: 640px) { .lp-hlb-points { grid-template-columns: 1fr 1fr; } }
        .lp-hlb-points-col { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .lp-hlb-points-col li { position: relative; padding-left: 20px; color: var(--ivory); font-size: 15px; line-height: 1.4; }
        .lp-hlb-points-col li::before { content: "•"; position: absolute; left: 0; color: var(--ivory); font-weight: 700; }
        .lp-hlb-cta { text-align: center; }
        .lp-hlb-cta-btn { color: var(--navy); border: none; border-radius: 28px; padding: 14px 36px; font-size: 15px; font-weight: 700; font-family: var(--font-sans); cursor: pointer; transition: transform .15s, filter .15s; }
        .lp-hlb-cta-btn:hover { filter: brightness(0.94); transform: translateY(-1px); }

        /* ── University Logos ── */
        .lp-unilogos { padding: 56px 0; text-align: center; }
        .lp-unilogos-headline { font-family: var(--font-serif); font-size: clamp(22px, 3vw, 34px); line-height: 1.25; margin: 0 auto 32px; max-width: 900px; }
        .lp-unilogos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 0 auto; }
        @media (min-width: 640px) { .lp-unilogos-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .lp-unilogos-grid { grid-template-columns: repeat(6, 1fr); } }
        .lp-unilogos-card { background: var(--white); border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: center; min-height: 70px; }
        .lp-unilogos-img { width: 100%; height: 60px; object-fit: contain; }
        .lp-unilogos-cta { margin-top: 36px; }
        .lp-unilogos-cta-btn { color: var(--navy); border: none; border-radius: 28px; padding: 14px 36px; font-size: 15px; font-weight: 700; font-family: var(--font-sans); cursor: pointer; transition: transform .15s, filter .15s; }
        .lp-unilogos-cta-btn:hover { filter: brightness(0.94); transform: translateY(-1px); }

        /* ── Main layout — full width, no sidebar ── */
        .lp-main { padding: 28px 0 64px; }
        .lp-content--full { width: 100%; }

        /* ── Results ── */
        .lp-results-header { margin-bottom: 14px; }
        .lp-results-count { font-size: 14px; color: var(--grey); }
        .lp-results-count strong { color: var(--navy); }

        /* ── Sort chips ── */
        .lp-sort-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .lp-sort-chip { font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; padding: 8px 14px; border-radius: 999px; border: 1.5px solid var(--mist); background: var(--white); color: var(--charcoal); cursor: pointer; transition: background .15s, border-color .15s, color .15s; }
        .lp-sort-chip:hover { border-color: var(--pale-navy); }
        .lp-sort-chip--active { background: var(--navy); border-color: var(--navy); color: var(--white); }
        .lp-sort-chip--active:hover { border-color: var(--navy); }

        /* ── Card grid — full width: 1 col → 2 col → 3 col → 4 col ── */
        .lp-card-grid--full { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 640px) { .lp-card-grid--full { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .lp-card-grid--full { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1280px) { .lp-card-grid--full { grid-template-columns: repeat(4, 1fr); } }

        /* ── Card ── */
        .lp-card { background: var(--white); border: 1px solid var(--mist); border-top: 4px solid var(--mist); border-radius: 10px; display: flex; flex-direction: column; gap: 12px; padding: 16px; position: relative; transition: box-shadow .18s, transform .18s; }
        .lp-card:hover { box-shadow: 0 4px 18px rgba(36,48,72,.1); transform: translateY(-2px); }
        .lp-card--featured { border-top-color: var(--yellow); }
        .lp-card-badge { position: absolute; top: 12px; right: 12px; background: var(--yellow); color: var(--navy); font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; }
        .lp-card-head { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; padding-bottom: 4px; }
        .lp-card-logo { width: 243px; max-width: 100%; height: 100px; object-fit: contain; border: 1px solid var(--mist); border-radius: 10px; background: var(--ivory); padding: 8px; }
        .lp-card-logo-ph { width: 243px; max-width: 100%; height: 100px; border-radius: 10px; background: var(--navy); color: var(--yellow); display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 800; font-family: var(--font-serif); }
        .lp-card-name { font-family: var(--font-serif); font-size: 15px; font-weight: 700; line-height: 1.3; color: var(--navy); margin-bottom: 0; }
        .lp-card-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 0; border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist); }
        .lp-meta-cell { display: flex; flex-direction: column; gap: 2px; }
        .lp-meta-label { font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--grey); }
        .lp-meta-val { font-size: 13px; font-weight: 700; color: var(--navy); }
        .lp-card-info-row { font-size: 12px; color: var(--charcoal); line-height: 1.5; display: flex; flex-direction: column; gap: 2px; }
        .lp-card-actions { display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 2px; }
        .lp-btn-primary-full { width: 100%; background: var(--yellow); color: var(--navy); border: 2px solid var(--navy); border-radius: 8px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); padding: 9px 16px; cursor: pointer; transition: background .15s; text-align: center; }
        .lp-btn-primary-full:hover { background: #e6b800; }

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

        /* ── About This Page ── */
        .lp-about-section { background: var(--ivory); padding: 56px 0; border-top: 1px solid var(--mist); }
        .lp-about-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--navy); margin-bottom: 10px; }
        .lp-about-heading { font-family: var(--font-serif); color: var(--navy); font-size: clamp(22px, 3vw, 34px); line-height: 1.2; margin: 0 0 14px; }
        .lp-about-rule { width: 48px; height: 3px; background: var(--yellow); border: none; margin: 0 0 28px; }
        .lp-about-card { background: var(--white); border: 1px solid var(--mist); border-radius: 10px; padding: 20px; }
        .lp-about-row { padding: 12px 0; border-bottom: 1px solid var(--mist); }
        .lp-about-row:last-child { border-bottom: none; }
        .lp-about-name { color: var(--navy); font-size: 15px; font-weight: 700; display: block; margin-bottom: 4px; }
        .lp-about-role { font-size: 13px; color: var(--grey); margin-bottom: 4px; }
        .lp-about-bio { font-size: 13px; color: var(--charcoal); line-height: 1.55; margin: 0; }

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
      `}</style>
    </>
  );
}
