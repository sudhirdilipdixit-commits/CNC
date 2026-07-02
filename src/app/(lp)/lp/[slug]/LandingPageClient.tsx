"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import LeadModal from "@/components/forms/LeadModal";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CourseCard {
  _id: string;
  title: string;
  slug?: { current: string };
  mode?: string;
  specialization?: string;
  feeMin?: number;
  feeMax?: number;
  duration?: string;
  nextBatch?: string;
  badge?: string;
  isFeatured?: boolean;
  accreditations?: string[];
  shortDescription?: string;
  rating?: number;
  collegeName?: string;
  collegeLogoUrl?: string;
}

export interface ProgrammeItem {
  isPinned?: boolean;
  course: CourseCard;
}

export interface LandingPageData {
  title: string;
  campaign?: string;
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
    showSpecialization?: boolean;
    showMode?: boolean;
    showFee?: boolean;
    feeBrackets?: string[];
  };
  sidebarForm?: {
    show?: boolean;
    heading?: string;
    subheading?: string;
  };
  trustPoints?: string[];
  defaultSort?: string;
  programmes?: ProgrammeItem[];
  faqs?: { _id: string; question: string; answer: string }[];
  ctaBand?: { headline?: string; body?: string; ctaLabel?: string };
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

// ── Helpers ────────────────────────────────────────────────────────────────

const DEFAULT_FEE_BRACKETS = ["Under ₹1L", "₹1L–₹2L", "₹2L–₹3L", "₹3L+"];

function formatFee(min?: number, max?: number): string {
  if (!min && !max) return "Contact us";
  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000 % 1 === 0 ? (n / 100000).toFixed(0) : (n / 100000).toFixed(1))}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };
  if (min && max && min !== max) return `${fmt(min)}–${fmt(max)}`;
  return fmt(max || min!);
}

function matchesFee(course: CourseCard, bracket: string): boolean {
  const fee = course.feeMax || course.feeMin || 0;
  if (bracket === "Under ₹1L") return fee > 0 && fee < 100000;
  if (bracket === "₹1L–₹2L") return fee >= 100000 && fee <= 200000;
  if (bracket === "₹2L–₹3L") return fee > 200000 && fee <= 300000;
  if (bracket === "₹3L+") return fee > 300000;
  return true;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="lp-stars" aria-label={`${rating} out of 5`}>
      {"★".repeat(Math.min(full, 5))}{"☆".repeat(Math.max(0, 5 - full))}
    </span>
  );
}

// ── Stripped landing page header ───────────────────────────────────────────

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

// ── Programme card ─────────────────────────────────────────────────────────

function ProgrammeCard({
  item,
  onApply,
  onToggleCompare,
  inCompare,
  compareDisabled,
}: {
  item: ProgrammeItem;
  onApply: () => void;
  onToggleCompare: () => void;
  inCompare: boolean;
  compareDisabled: boolean;
}) {
  const c = item.course;
  const badgeLower = c.badge?.toLowerCase() || "";
  const badgeClass =
    badgeLower === "bestseller"
      ? "lp-tag-bestseller"
      : badgeLower === "new"
      ? "lp-tag-new"
      : "lp-tag-premium";

  return (
    <article className={`lp-prog-card${item.isPinned ? " lp-prog-pinned" : ""}`}>
      {/* Compare toggle */}
      <button
        className={`lp-shortlist-btn${inCompare ? " active" : ""}`}
        onClick={onToggleCompare}
        disabled={compareDisabled && !inCompare}
        aria-label={inCompare ? "Remove from compare" : "Add to compare (max 3)"}
        title={compareDisabled && !inCompare ? "You can compare up to 3 programmes" : undefined}
      >
        {inCompare ? "★" : "☆"}
      </button>

      <div className="lp-prog-body">
        {/* Tags */}
        <div className="lp-prog-tags">
          {c.mode && <span className="lp-tag lp-tag-mode">{c.mode}</span>}
          {c.badge && <span className={`lp-tag ${badgeClass}`}>{c.badge}</span>}
          {c.isFeatured && !c.badge && <span className="lp-tag lp-tag-premium">Featured</span>}
        </div>

        {/* Programme name */}
        <h3 className="lp-prog-name">{c.title}</h3>

        {/* University */}
        <div className="lp-prog-uni">
          {c.collegeLogoUrl && (
            <Image
              src={c.collegeLogoUrl}
              alt={c.collegeName || ""}
              width={20}
              height={20}
              style={{ objectFit: "contain", borderRadius: 2 }}
            />
          )}
          <span>{c.collegeName}</span>
        </div>

        {/* Rating */}
        {c.rating ? (
          <div className="lp-prog-rating">
            <Stars rating={c.rating} />
            <span>{c.rating.toFixed(1)}</span>
          </div>
        ) : null}

        {/* Short description */}
        {c.shortDescription && (
          <p className="lp-prog-desc">{c.shortDescription}</p>
        )}

        {/* Meta 3-col */}
        <div className="lp-prog-meta">
          <div className="lp-prog-meta-item">
            <div className="lp-prog-meta-label">Duration</div>
            <div className="lp-prog-meta-value">{c.duration || "—"}</div>
          </div>
          <div className="lp-prog-meta-item">
            <div className="lp-prog-meta-label">Total Fee</div>
            <div className="lp-prog-meta-value">{formatFee(c.feeMin, c.feeMax)}</div>
          </div>
          <div className="lp-prog-meta-item">
            <div className="lp-prog-meta-label">Next Batch</div>
            <div className="lp-prog-meta-value">{c.nextBatch || "Rolling"}</div>
          </div>
        </div>

        {/* Accreditations */}
        {c.accreditations && c.accreditations.length > 0 && (
          <div className="lp-prog-accred">
            {c.accreditations.slice(0, 3).map((a) => (
              <span key={a} className="lp-tag lp-tag-accred">{a}</span>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="lp-prog-cta-row">
          <button className="btn btn-primary btn-sm lp-apply-btn" onClick={onApply}>
            Apply Now
          </button>
          <button
            className={`lp-compare-btn${inCompare ? " lp-compare-active" : ""}${compareDisabled && !inCompare ? " lp-compare-disabled" : ""}`}
            onClick={onToggleCompare}
            disabled={compareDisabled && !inCompare}
          >
            {inCompare ? "✓ Comparing" : "+ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Compare tray ───────────────────────────────────────────────────────────

function CompareTray({
  selected,
  programmes,
  onRemove,
  onClear,
  onOpenModal,
}: {
  selected: Set<string>;
  programmes: ProgrammeItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}) {
  if (selected.size === 0) return null;
  const selectedItems = [...selected]
    .map((id) => programmes.find((p) => p.course._id === id))
    .filter(Boolean) as ProgrammeItem[];

  return (
    <div className="lp-compare-tray" role="region" aria-label="Compare tray">
      <div className="lp-compare-slots">
        {selectedItems.map((item) => (
          <div key={item.course._id} className="lp-compare-slot">
            <span>{item.course.title}</span>
            <button
              className="lp-compare-remove"
              onClick={() => onRemove(item.course._id)}
              aria-label={`Remove ${item.course.title} from compare`}
            >
              ×
            </button>
          </div>
        ))}
        {selected.size < 3 && (
          <div className="lp-compare-slot lp-compare-empty">
            + {3 - selected.size} more to compare
          </div>
        )}
      </div>
      <div className="lp-compare-actions">
        <span className="lp-compare-count">{selected.size} selected</span>
        {selected.size >= 2 && (
          <button className="btn btn-primary btn-sm" onClick={onOpenModal}>
            Get Counselling on These
          </button>
        )}
        <button className="lp-compare-clear" onClick={onClear}>
          Clear all
        </button>
      </div>
    </div>
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

// ── Main client component ──────────────────────────────────────────────────

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
  const [activeSpecs, setActiveSpecs] = useState<Set<string>>(new Set());
  const [activeModes, setActiveModes] = useState<Set<string>>(new Set());
  const [activeFee, setActiveFee] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(data.defaultSort || "featured");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());

  const allProgrammes = data.programmes || [];
  const fc = data.filterConfig || {};
  const feeBrackets = fc.feeBrackets?.length ? fc.feeBrackets : DEFAULT_FEE_BRACKETS;

  const allSpecs = useMemo(
    () => [...new Set(allProgrammes.map((p) => p.course.specialization).filter(Boolean) as string[])],
    [allProgrammes]
  );
  const allModes = useMemo(
    () => [...new Set(allProgrammes.map((p) => p.course.mode).filter(Boolean) as string[])],
    [allProgrammes]
  );

  const filtered = useMemo(() => {
    let items = [...allProgrammes];
    if (activeSpecs.size > 0)
      items = items.filter((p) => p.course.specialization && activeSpecs.has(p.course.specialization));
    if (activeModes.size > 0)
      items = items.filter((p) => p.course.mode && activeModes.has(p.course.mode));
    if (activeFee)
      items = items.filter((p) => matchesFee(p.course, activeFee));

    const pinned = items.filter((p) => p.isPinned);
    const rest = [...items.filter((p) => !p.isPinned)].sort((a, b) => {
      const ca = a.course, cb = b.course;
      if (sortBy === "fee-asc") return (ca.feeMin || 0) - (cb.feeMin || 0);
      if (sortBy === "fee-desc") return (cb.feeMax || cb.feeMin || 0) - (ca.feeMax || ca.feeMin || 0);
      if (sortBy === "rating") return (cb.rating || 0) - (ca.rating || 0);
      return (cb.isFeatured ? 1 : 0) - (ca.isFeatured ? 1 : 0);
    });
    return [...pinned, ...rest];
  }, [allProgrammes, activeSpecs, activeModes, activeFee, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openModal = useCallback((courseName = "") => {
    setDefaultCourse(courseName);
    setModalOpen(true);
  }, []);

  const toggleSpec = useCallback((spec: string) => {
    setActiveSpecs((prev) => {
      const next = new Set(prev);
      next.has(spec) ? next.delete(spec) : next.add(spec);
      return next;
    });
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const toggleMode = useCallback((mode: string) => {
    setActiveModes((prev) => {
      const next = new Set(prev);
      next.has(mode) ? next.delete(mode) : next.add(mode);
      return next;
    });
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const toggleFee = useCallback((bracket: string) => {
    setActiveFee((prev) => (prev === bracket ? null : bracket));
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveSpecs(new Set());
    setActiveModes(new Set());
    setActiveFee(null);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });
  }, []);

  const anyFilterActive = activeSpecs.size > 0 || activeModes.size > 0 || activeFee !== null;

  return (
    <>
      {/* ── Urgency banner ─────────────────────────────────────── */}
      {data.urgencyBanner && (
        <div className="lp-urgency-bar" role="alert">{data.urgencyBanner}</div>
      )}

      {/* ── Header ────────────────────────────────────────────── */}
      {data.showFullHeader ? (
        <Header onOpenLeadForm={() => openModal()} />
      ) : (
        <LpHeader onOpenModal={() => openModal()} />
      )}

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="lp-hero">
        <div className="container">
          {data.hero?.eyebrow && (
            <div className="eyebrow lp-eyebrow">{data.hero.eyebrow}</div>
          )}
          {data.hero?.headline && (
            <h1 className="lp-h1">{data.hero.headline}</h1>
          )}
          {data.hero?.subheadline && (
            <p className="lp-lede">{data.hero.subheadline}</p>
          )}
          <div className="lp-cta-row">
            <button className="btn btn-primary" onClick={() => openModal()}>
              {data.hero?.primaryCtaLabel || "Get Free Counselling"}
            </button>
            {data.hero?.secondaryCtaLabel && (
              <a
                href={data.hero.secondaryCtaHref || "#"}
                className="btn lp-btn-ghost-light"
              >
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

      {/* ── Sticky filter chips ───────────────────────────────── */}
      <div className="lp-filter-bar">
        <div className="container">
          <div className="lp-filter-row">
            {/* Specialization */}
            {fc.showSpecialization !== false && allSpecs.length > 0 && (
              <div className="lp-filter-group" role="group" aria-label="Filter by specialization">
                <span className="lp-filter-label">Spec</span>
                {allSpecs.map((spec) => (
                  <button
                    key={spec}
                    className={`lp-chip${activeSpecs.has(spec) ? " lp-chip-active" : ""}`}
                    onClick={() => toggleSpec(spec)}
                    aria-pressed={activeSpecs.has(spec)}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            )}

            {/* Mode */}
            {fc.showMode !== false && allModes.length > 1 && (
              <div className="lp-filter-group" role="group" aria-label="Filter by mode">
                <span className="lp-filter-label">Mode</span>
                {allModes.map((mode) => (
                  <button
                    key={mode}
                    className={`lp-chip${activeModes.has(mode) ? " lp-chip-active" : ""}`}
                    onClick={() => toggleMode(mode)}
                    aria-pressed={activeModes.has(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}

            {/* Fee */}
            {fc.showFee !== false && (
              <div className="lp-filter-group" role="group" aria-label="Filter by budget">
                <span className="lp-filter-label">Budget</span>
                {feeBrackets.map((bracket) => (
                  <button
                    key={bracket}
                    className={`lp-chip${activeFee === bracket ? " lp-chip-active" : ""}`}
                    onClick={() => toggleFee(bracket)}
                    aria-pressed={activeFee === bracket}
                  >
                    {bracket}
                  </button>
                ))}
              </div>
            )}

            {/* Sort */}
            <div className="lp-sort-group">
              <label className="lp-filter-label" htmlFor="lp-sort">Sort</label>
              <select
                id="lp-sort"
                className="lp-sort-select"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setVisibleCount(INITIAL_COUNT); }}
              >
                <option value="featured">Best match</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>
          </div>

          {anyFilterActive && (
            <div className="lp-filter-active">
              <span>
                <strong>{filtered.length}</strong> programme{filtered.length !== 1 ? "s" : ""} found
              </span>
              <button className="lp-clear-btn" onClick={clearFilters}>
                Clear filters ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────── */}
      <div className="lp-main">
        <div className="container">
          <div className="lp-layout">
            {/* Left sidebar (desktop only) */}
            <aside className="lp-sidebar" aria-label="Filter programmes">
              {fc.showSpecialization !== false && allSpecs.length > 0 && (
                <div className="lp-sidebar-section">
                  <h4 className="lp-sidebar-heading">Specialization</h4>
                  {allSpecs.map((spec) => (
                    <label key={spec} className="lp-checkbox">
                      <input
                        type="checkbox"
                        checked={activeSpecs.has(spec)}
                        onChange={() => toggleSpec(spec)}
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
                </div>
              )}

              {fc.showMode !== false && allModes.length > 1 && (
                <div className="lp-sidebar-section">
                  <h4 className="lp-sidebar-heading">Mode</h4>
                  {allModes.map((mode) => (
                    <label key={mode} className="lp-checkbox">
                      <input
                        type="checkbox"
                        checked={activeModes.has(mode)}
                        onChange={() => toggleMode(mode)}
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              )}

              {fc.showFee !== false && (
                <div className="lp-sidebar-section">
                  <h4 className="lp-sidebar-heading">Total Fee</h4>
                  {feeBrackets.map((bracket) => (
                    <label key={bracket} className="lp-checkbox">
                      <input
                        type="radio"
                        name="lp-fee-radio"
                        checked={activeFee === bracket}
                        onChange={() => toggleFee(bracket)}
                      />
                      <span>{bracket}</span>
                    </label>
                  ))}
                  {activeFee && (
                    <button className="lp-clear-fee-btn" onClick={() => { setActiveFee(null); setVisibleCount(INITIAL_COUNT); }}>
                      Clear ×
                    </button>
                  )}
                </div>
              )}

              {/* Sidebar CTA */}
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

            {/* Main content */}
            <div className="lp-content">
              <div className="lp-results-header">
                <p className="lp-results-count">
                  Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
                  <strong>{filtered.length}</strong> programme{filtered.length !== 1 ? "s" : ""}
                  {anyFilterActive ? " (filtered)" : ""}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="lp-empty">
                  <p>No programmes match your current filters.</p>
                  <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="lp-prog-grid">
                  {visible.map((item) => (
                    <ProgrammeCard
                      key={item.course._id}
                      item={item}
                      onApply={() => openModal(item.course.title)}
                      onToggleCompare={() => toggleCompare(item.course._id)}
                      inCompare={compareIds.has(item.course._id)}
                      compareDisabled={!compareIds.has(item.course._id) && compareIds.size >= 3}
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
                    Load {Math.min(LOAD_BATCH, filtered.length - visibleCount)} more programmes
                  </button>
                  <p className="lp-load-more-note">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQs ──────────────────────────────────────────────── */}
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

      {/* ── CTA band ──────────────────────────────────────────── */}
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

      {/* ── Footer (server component passed as prop) ───────────── */}
      {footer}

      {/* ── Mobile sticky bar ─────────────────────────────────── */}
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

      {/* ── Compare tray ──────────────────────────────────────── */}
      <CompareTray
        selected={compareIds}
        programmes={allProgrammes}
        onRemove={toggleCompare}
        onClear={() => setCompareIds(new Set())}
        onOpenModal={() => openModal()}
      />

      {/* ── Lead modal ────────────────────────────────────────── */}
      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={`lp-${data.campaign?.toLowerCase().replace(/\s+/g, "-") || "organic"}`}
        defaultCourse={defaultCourse}
      />

      {/* ── All lp-* CSS ──────────────────────────────────────── */}
      <style>{`
        /* Urgency bar */
        .lp-urgency-bar {
          background: var(--yellow);
          color: var(--navy);
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          padding: 10px 16px;
          border-bottom: 2px solid rgba(36,48,72,.15);
        }

        /* Stripped header */
        .lp-header {
          background: rgba(250,247,242,.97);
          backdrop-filter: saturate(180%) blur(8px);
          border-bottom: 1px solid var(--mist);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .lp-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 16px;
        }
        .lp-logo { display: block; }
        .lp-header-right { display: flex; align-items: center; gap: 10px; }
        .lp-phone {
          display: none;
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
          border: 1px solid var(--pale-navy);
          padding: 6px 12px;
          border-radius: 8px;
          text-decoration: none;
          align-items: center;
          gap: 6px;
        }
        @media (min-width: 768px) { .lp-phone { display: flex; } }

        /* Hero */
        .lp-hero { background: var(--navy); padding: 56px 0 48px; }
        .lp-eyebrow { color: var(--yellow) !important; margin-bottom: 12px; }
        .lp-h1 {
          font-family: var(--font-serif);
          color: var(--ivory);
          font-size: clamp(28px, 4.5vw, 52px);
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .lp-lede {
          color: var(--pale-navy);
          font-size: clamp(15px, 1.8vw, 18px);
          max-width: 640px;
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .lp-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .lp-btn-ghost-light {
          background: rgba(255,255,255,.1);
          color: var(--ivory) !important;
          border: 1.5px solid rgba(255,255,255,.25);
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: background .15s;
        }
        .lp-btn-ghost-light:hover { background: rgba(255,255,255,.18); }
        .lp-trust-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-top: 20px;
          font-size: 13px;
          color: var(--pale-navy);
        }
        .lp-trust-bullet { color: var(--yellow); font-weight: 700; margin-right: 3px; }

        /* Sticky filter bar */
        .lp-filter-bar {
          background: var(--white);
          border-bottom: 2px solid var(--mist);
          position: sticky;
          top: 64px;
          z-index: 90;
          box-shadow: 0 1px 3px rgba(36,48,72,.06);
          padding: 10px 0;
        }
        .lp-filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
          align-items: center;
        }
        .lp-filter-group { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; }
        .lp-filter-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: var(--grey);
          white-space: nowrap;
          margin-right: 2px;
        }
        .lp-chip {
          padding: 5px 13px;
          font-size: 12px;
          font-weight: 500;
          border: 1.5px solid var(--pale-navy);
          border-radius: 999px;
          color: var(--navy);
          background: var(--white);
          white-space: nowrap;
          cursor: pointer;
          transition: all .15s;
          font-family: var(--font-sans);
        }
        .lp-chip:hover { border-color: var(--navy); }
        .lp-chip-active { background: var(--navy); color: var(--ivory); border-color: var(--navy); }
        .lp-sort-group { display: flex; align-items: center; gap: 6px; margin-left: auto; }
        .lp-sort-select {
          padding: 5px 10px;
          border: 1px solid var(--pale-navy);
          border-radius: 6px;
          font-size: 13px;
          font-family: var(--font-sans);
          color: var(--navy);
          background: var(--white);
        }
        .lp-filter-active {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          font-size: 13px;
          color: var(--grey);
        }
        .lp-clear-btn {
          color: var(--navy);
          font-size: 13px;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-sans);
          padding: 0;
        }

        /* Main */
        .lp-main { padding: 28px 0 64px; }
        .lp-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 1024px) {
          .lp-layout { grid-template-columns: 220px 1fr; gap: 32px; align-items: start; }
        }

        /* Sidebar */
        .lp-sidebar { display: none; }
        @media (min-width: 1024px) {
          .lp-sidebar {
            display: block;
            position: sticky;
            top: calc(64px + 58px + 16px);
            max-height: calc(100vh - 64px - 58px - 32px);
            overflow-y: auto;
          }
        }
        .lp-sidebar-section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--mist); }
        .lp-sidebar-section:last-of-type { border-bottom: none; }
        .lp-sidebar-heading {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--grey);
          margin-bottom: 10px;
        }
        .lp-checkbox {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 14px;
          color: var(--charcoal);
          cursor: pointer;
          margin-bottom: 7px;
          line-height: 1.3;
        }
        .lp-checkbox input { accent-color: var(--navy); flex: 0 0 15px; width: 15px; height: 15px; }
        .lp-clear-fee-btn {
          font-size: 12px;
          color: var(--navy);
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-sans);
          margin-top: 4px;
          padding: 0;
        }
        .lp-sidebar-cta {
          background: var(--navy);
          border-radius: 12px;
          padding: 20px;
          margin-top: 4px;
        }
        .lp-sidebar-cta h4 {
          font-family: var(--font-serif);
          color: var(--yellow);
          font-size: 17px;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .lp-sidebar-cta p { color: var(--pale-navy); font-size: 13px; margin-bottom: 14px; line-height: 1.5; }
        .lp-sidebar-note {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          text-align: center;
          margin-top: 8px;
          margin-bottom: 0;
        }

        /* Results */
        .lp-results-header { margin-bottom: 14px; }
        .lp-results-count { font-size: 14px; color: var(--grey); }
        .lp-results-count strong { color: var(--navy); }

        /* Programme grid */
        .lp-prog-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .lp-prog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1200px) { .lp-prog-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Programme card */
        .lp-prog-card {
          background: var(--white);
          border: 1px solid var(--mist);
          border-top: 5px solid var(--yellow);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform .18s, box-shadow .18s;
        }
        .lp-prog-card:hover { transform: translateY(-3px); box-shadow: 0 4px 14px rgba(36,48,72,.09); }
        .lp-prog-pinned { border-top-color: var(--navy); }

        .lp-shortlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--mist);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: var(--pale-navy);
          cursor: pointer;
          transition: color .15s, border-color .15s;
          z-index: 1;
        }
        .lp-shortlist-btn:hover, .lp-shortlist-btn.active { color: var(--yellow); border-color: var(--yellow); }
        .lp-shortlist-btn:disabled { opacity: .4; cursor: not-allowed; }

        .lp-prog-body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
        .lp-prog-tags { display: flex; gap: 5px; margin-bottom: 10px; flex-wrap: wrap; }
        .lp-tag {
          display: inline-flex;
          align-items: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: 3px;
        }
        .lp-tag-mode { background: var(--mist); color: var(--navy); }
        .lp-tag-premium { background: var(--yellow); color: var(--navy); }
        .lp-tag-bestseller { background: var(--navy); color: var(--yellow); }
        .lp-tag-new { background: var(--pale-navy); color: var(--navy); }
        .lp-tag-accred { background: #E8F5EA; color: #1B5E20; border: 1px solid #A5D6A7; }

        .lp-prog-name {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: 17px;
          line-height: 1.25;
          margin-bottom: 7px;
          padding-right: 32px;
        }
        .lp-prog-uni {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: var(--charcoal);
          margin-bottom: 7px;
        }
        .lp-prog-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--grey);
          margin-bottom: 10px;
        }
        .lp-stars { color: var(--yellow); letter-spacing: 1px; font-size: 12px; }
        .lp-prog-desc {
          font-size: 13px;
          color: var(--grey);
          margin-bottom: 10px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lp-prog-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 10px 0;
          border-top: 1px solid var(--mist);
          border-bottom: 1px solid var(--mist);
          margin-bottom: 12px;
        }
        .lp-prog-meta-item { text-align: center; }
        .lp-prog-meta-label {
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--grey);
          margin-bottom: 3px;
        }
        .lp-prog-meta-value { font-size: 13px; font-weight: 700; color: var(--navy); }
        .lp-prog-accred { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
        .lp-prog-cta-row { display: flex; gap: 8px; margin-top: auto; }
        .lp-apply-btn { flex: 1; }
        .lp-compare-btn {
          background: var(--ivory);
          color: var(--navy);
          border: 1px solid var(--pale-navy);
          padding: 7px 10px;
          font-size: 12px;
          min-height: 38px;
          border-radius: 8px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: all .15s;
        }
        .lp-compare-btn:hover { background: var(--pale-navy); }
        .lp-compare-active { background: var(--navy) !important; color: var(--yellow) !important; border-color: var(--navy) !important; }
        .lp-compare-disabled { opacity: .4; cursor: not-allowed; }

        /* Empty */
        .lp-empty { text-align: center; padding: 64px 0; color: var(--grey); }
        .lp-empty p { font-size: 16px; margin-bottom: 16px; }

        /* Load more */
        .lp-load-more { text-align: center; margin-top: 36px; }
        .lp-load-more-note { font-size: 13px; color: var(--grey); margin-top: 10px; }

        /* FAQ */
        .lp-faq-section { background: var(--white); padding: 56px 0; border-top: 1px solid var(--mist); }
        .lp-faq-heading {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: clamp(22px, 3vw, 34px);
          text-align: center;
          margin: 10px 0 32px;
        }
        .lp-faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .lp-faq-item {
          border: 1px solid var(--mist);
          border-radius: 8px;
          background: var(--ivory);
          overflow: hidden;
        }
        .lp-faq-item[open] { border-color: var(--pale-navy); }
        .lp-faq-q {
          padding: 15px 18px;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: var(--navy);
          font-size: 15px;
          line-height: 1.4;
        }
        .lp-faq-q::-webkit-details-marker { display: none; }
        .lp-faq-icon {
          width: 22px;
          height: 22px;
          background: var(--yellow);
          color: var(--navy);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          transition: transform .2s;
          flex: 0 0 22px;
          line-height: 1;
        }
        .lp-faq-item[open] .lp-faq-icon { transform: rotate(45deg); }
        .lp-faq-a { padding: 0 18px 18px; font-size: 14px; color: var(--charcoal); line-height: 1.65; }

        /* CTA band */
        .lp-cta-band { background: var(--yellow); padding: 56px 0; border-top: 4px solid var(--navy); }
        .lp-cta-band-headline {
          font-family: var(--font-serif);
          color: var(--navy);
          font-size: clamp(22px, 3.5vw, 34px);
          margin-bottom: 12px;
          line-height: 1.15;
        }
        .lp-cta-band-body {
          color: var(--navy);
          font-size: 16px;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        /* Mobile sticky bar */
        .lp-mobile-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--white);
          border-top: 1px solid var(--mist);
          box-shadow: 0 -4px 16px rgba(36,48,72,.08);
          z-index: 50;
          display: flex;
          align-items: stretch;
          height: 60px;
          padding: 6px;
          gap: 6px;
        }
        @media (min-width: 1024px) { .lp-mobile-bar { display: none; } }
        .lp-mb-call, .lp-mb-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          width: 48px;
          flex: 0 0 48px;
          text-decoration: none;
        }
        .lp-mb-call { background: var(--navy); color: var(--yellow); }
        .lp-mb-whatsapp { background: #25D366; color: white; }
        .lp-mb-cta {
          background: var(--yellow);
          color: var(--navy);
          border-top: 3px solid var(--navy);
          flex: 1;
          font-weight: 700;
          font-size: 13px;
          font-family: var(--font-sans);
          border-radius: 8px;
          border-left: none;
          border-right: none;
          border-bottom: none;
          cursor: pointer;
          padding-top: 0;
        }

        /* Compare tray */
        .lp-compare-tray {
          position: fixed;
          bottom: 60px;
          left: 0;
          right: 0;
          background: var(--navy);
          color: var(--ivory);
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          z-index: 40;
          box-shadow: 0 -4px 16px rgba(0,0,0,.2);
          flex-wrap: wrap;
        }
        @media (min-width: 1024px) { .lp-compare-tray { bottom: 0; } }
        .lp-compare-slots { display: flex; gap: 8px; flex-wrap: wrap; }
        .lp-compare-slot {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,.1);
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          max-width: 200px;
        }
        .lp-compare-slot span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lp-compare-empty { border: 1px dashed rgba(255,255,255,.25); color: rgba(255,255,255,.4); }
        .lp-compare-remove {
          color: var(--yellow);
          font-weight: 700;
          cursor: pointer;
          background: none;
          border: none;
          font-size: 16px;
          line-height: 1;
          font-family: var(--font-sans);
          flex: 0 0 auto;
        }
        .lp-compare-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .lp-compare-count { font-size: 13px; color: var(--yellow); white-space: nowrap; }
        .lp-compare-clear {
          background: none;
          border: none;
          color: rgba(255,255,255,.6);
          font-size: 13px;
          cursor: pointer;
          text-decoration: underline;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        /* Page body padding for mobile bar */
        body { padding-bottom: 60px; }
        @media (min-width: 1024px) { body { padding-bottom: 0; } }
      `}</style>
    </>
  );
}
