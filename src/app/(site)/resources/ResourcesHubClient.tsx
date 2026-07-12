"use client";

import { useState } from "react";
import type { ResourceItem } from "./page";

// ─── Fallback seed data (used if no Sanity resourceItems exist yet) ───────────
const SEED_RESOURCES: ResourceItem[] = [
  {
    _id: "hc-1",
    title: "Top 10 Online MBA Programmes in India",
    titleHighlight: "2026-27",
    coverType: "Free Guide",
    category: "free-guides",
    lastUpdated: "April 2026",
    pageCount: 48,
    isInteractiveTool: false,
    isFeatured: true,
    downloadCount: "12,400+ downloads",
    checklistItems: [
      "10 UGC-DEB approved programmes ranked on fee, mode, placement, accreditation",
      "Exact fee structure and EMI options compared",
      "Specialization tracks and admission timelines 2026-27",
      "Free counsellor recommendation worksheet",
    ],
    href: "/resources/top-10-online-mba-programmes-india-2026-27",
    order: 1,
  },
  {
    _id: "hc-2",
    title: "Distance MBA vs Online MBA:",
    titleHighlight: "Which Suits You?",
    coverType: "Comparison Guide",
    category: "comparison-guides",
    lastUpdated: "May 2026",
    pageCount: 24,
    isInteractiveTool: false,
    isFeatured: false,
    downloadCount: "4,800+ downloads",
    checklistItems: [
      "Mode-by-mode comparison across 6 criteria",
      "Employer acceptance data by mode (2026 survey)",
      "Certificate and degree equivalence explained",
      "Decision flowchart for your profile",
    ],
    href: "/resources/distance-mba-vs-online-mba",
    order: 2,
  },
  {
    _id: "hc-3",
    title: "The 2026 Online MBA",
    titleHighlight: "Salary Report",
    coverType: "Free Guide",
    category: "career-tools",
    lastUpdated: "June 2026",
    pageCount: 32,
    isInteractiveTool: false,
    isFeatured: false,
    downloadCount: "3,200+ downloads",
    checklistItems: [
      "Salary uplift data by specialization from 412 alumni",
      "Industry-by-industry employer acceptance rates",
      "Role-level salary bands: executive to CMO",
      "What changed from 2025 to 2026",
    ],
    href: "/resources/2026-online-mba-salary-report",
    order: 3,
  },
  {
    _id: "hc-4",
    title: "Pre-Application Checklist:",
    titleHighlight: "10 Things to Verify",
    coverType: "Checklist",
    category: "checklists",
    lastUpdated: "March 2026",
    pageCount: 8,
    isInteractiveTool: false,
    isFeatured: false,
    downloadCount: "6,100+ downloads",
    checklistItems: [
      "UGC-DEB verification steps (step by step)",
      "Questions to ask the admission office",
      "Documents you'll need for application",
      "Red flags that should make you walk away",
    ],
    href: "/resources/pre-application-checklist",
    order: 4,
  },
  {
    _id: "hc-5",
    title: "MBA Fee and EMI Calculator",
    titleHighlight: null,
    coverType: "Calculator",
    category: "calculator",
    lastUpdated: null,
    pageCount: null,
    isInteractiveTool: true,
    isFeatured: false,
    downloadCount: "⚡ Try it now",
    checklistItems: [
      "Monthly EMI for bank loan (SBI, HDFC, ICICI rates)",
      "University direct EMI plan comparison",
      "Total interest paid over the full tenure",
      "Email your calculation to yourself",
    ],
    href: "/resources/emi-calculator",
    order: 5,
  },
  {
    _id: "hc-6",
    title: "Returning After a Career Break:",
    titleHighlight: "A 2026 Guide",
    coverType: "Free Guide",
    category: "career-tools",
    lastUpdated: "April 2026",
    pageCount: 20,
    isInteractiveTool: false,
    isFeatured: false,
    downloadCount: "2,400+ downloads",
    checklistItems: [
      "How to frame your break in applications",
      "Which programmes work best for re-entry",
      "Employer questions and how counsellors suggest you answer",
      "Case studies from our alumni",
    ],
    href: "/resources/returning-after-career-break-2026",
    order: 6,
  },
];

// ─── Filter chips config ──────────────────────────────────────────────────────
const FILTER_CHIPS = [
  { label: "All resources",     value: "all" },
  { label: "Comparison guides", value: "comparison-guides" },
  { label: "Career tools",      value: "career-tools" },
  { label: "Calculator",        value: "calculator" },
  { label: "Checklists",        value: "checklists" },
];

// ─── Cover type icon map ──────────────────────────────────────────────────────
const TYPE_ICON: Record<string, string> = {
  "Free Guide":       "📄",
  "Comparison Guide": "📊",
  "Checklist":        "✅",
  "Calculator":       "📈",
  "Career Tool":      "💼",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ResourcesHubClient({ resources }: { resources: ResourceItem[] }) {
  const items = resources.length > 0 ? resources : SEED_RESOURCES;
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = activeFilter === "all"
    ? items
    : items.filter(r => r.category === activeFilter);

  return (
    <>
      <style>{`
        .res-card-link { display: flex; flex-direction: column; height: 100%; color: inherit; text-decoration: none; }
        .res-card-link:hover .res-cover { filter: brightness(1.06); }
        .res-chip-btn { cursor: pointer; transition: all .15s; }
        .res-chip-btn:hover { border-color: var(--navy) !important; }
        .res-grid-card { transition: transform .18s, box-shadow .18s; }
        .res-grid-card:hover { transform: translateY(-3px); box-shadow: 0 4px 14px rgba(36,48,72,.10); }
      `}</style>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--navy)", padding: "56px 0 0" }}>
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 12 }}>
            FREE RESOURCES
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px,4.5vw,50px)", lineHeight: 1.1, color: "var(--ivory)", letterSpacing: "-0.01em", margin: "12px 0 16px" }}>
            Download, compare, and decide with confidence.
          </h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--pale-navy)", lineHeight: 1.6, maxWidth: 600, marginBottom: 32 }}>
            Guides, comparison tools, and calculators built by our counselling team. All free. All updated for 2026.
          </p>
          <div style={{ paddingBottom: 40, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={items.find(r => r.isFeatured)?.href ?? items[0]?.href ?? "#"}
              className="btn btn-primary btn-sm"
            >
              Download the 2026 Guide
            </a>
            <a
              href={items.find(r => r.category === "calculator")?.href ?? "#"}
              className="btn btn-sm"
              style={{ background: "rgba(255,255,255,.1)", color: "var(--ivory)", border: "1.5px solid rgba(255,255,255,.25)", minHeight: 38, padding: "5px 16px", fontSize: 13, fontWeight: 600, borderRadius: "var(--radius-md)", display: "inline-flex", alignItems: "center" }}
            >
              Try the EMI Calculator
            </a>
          </div>
        </div>
      </section>

      {/* ══ FILTER CHIPS ═════════════════════════════════════════════════════ */}
      <div style={{ background: "var(--white)", borderBottom: "2px solid var(--mist)", position: "sticky", top: 64, zIndex: 90 }}>
        <div className="container">
          <div style={{ display: "flex", overflowX: "auto", gap: 4, padding: "12px 0", scrollbarWidth: "none" }}>
            {FILTER_CHIPS.map(chip => {
              const isActive = chip.value === activeFilter;
              return (
                <button
                  key={chip.value}
                  onClick={() => setActiveFilter(chip.value)}
                  className="res-chip-btn"
                  style={{
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: "var(--radius-pill)",
                    border: `1.5px solid ${isActive ? "var(--navy)" : "var(--pale-navy)"}`,
                    color: isActive ? "var(--ivory)" : "var(--navy)",
                    background: isActive ? "var(--navy)" : "var(--white)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ RESOURCE GRID ════════════════════════════════════════════════════ */}
      <main style={{ padding: "36px 0 80px" }}>
        <div className="container">
          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--grey)" }}>
              <p style={{ fontSize: 16 }}>No resources in this category yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {visible.map(item => (
                item.isInteractiveTool
                  ? <ToolCard key={item._id} item={item} />
                  : <GuideCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ══ CTA BAND ═════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--yellow)", padding: "56px 0", textAlign: "center", borderTop: "4px solid var(--navy)" }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "clamp(24px,3.5vw,34px)", marginBottom: 12 }}>
            Not sure which resource to start with?
          </h2>
          <p style={{ color: "var(--navy)", fontSize: 17, marginBottom: 28, lineHeight: 1.6 }}>
            Our counsellors will tell you exactly which guide is relevant for your situation — in a free 15-minute call.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact-us" className="btn btn-inverted">
              Talk to a Counsellor
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <a href="/contact-us" className="btn btn-secondary">
              Book a Free Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Guide Card ───────────────────────────────────────────────────────────────
function GuideCard({ item }: { item: ResourceItem }) {
  const cardHref = item.href ?? "#";
  const icon = TYPE_ICON[item.coverType] ?? "📄";
  const coverTypeLabel = `${icon} ${item.coverType}${item.isFeatured ? " · Featured" : ""}`;

  return (
    <article
      className="res-grid-card"
      style={{
        background: "var(--white)",
        border: item.isFeatured ? "2px solid var(--yellow)" : "1px solid var(--mist)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <a href={cardHref} className="res-card-link">
        {/* Cover */}
        <div
          className="res-cover"
          style={{
            background: "linear-gradient(135deg, var(--navy), #1A2336)",
            padding: "28px 24px",
            position: "relative",
            transition: "filter .15s",
          }}
        >
          {/* Radial glow deco */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(252,204,0,.15), transparent 50%)", pointerEvents: "none" }} />

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.1)", color: "var(--yellow)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 3, marginBottom: 12, position: "relative" }}>
            {coverTypeLabel}
          </div>

          <div style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)", fontSize: 20, lineHeight: 1.2, position: "relative" }}>
            {item.title}{" "}
            {item.titleHighlight && <span style={{ color: "var(--yellow)" }}>{item.titleHighlight}</span>}
          </div>

          {item.lastUpdated && (
            <div style={{ fontSize: 11, color: "var(--pale-navy)", marginTop: 8, position: "relative" }}>
              Last updated {item.lastUpdated}{item.pageCount ? ` · ${item.pageCount} pages` : ""}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--grey)", marginBottom: 10 }}>
            What&apos;s inside
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, flex: 1 }}>
            {(item.checklistItems ?? []).map((pt, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--charcoal)", display: "flex", gap: 8, alignItems: "baseline" }}>
                <span style={{ color: "var(--yellow)", fontWeight: 800, flexShrink: 0 }}>✓</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", background: "var(--ivory)", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--grey)" }}>
            {item.pageCount ? `${item.pageCount} pages · PDF` : "Interactive tool · No download"}
          </span>
          {item.downloadCount && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, background: "#E8F5EA", color: "#2A7A3A", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
              {item.downloadCount}
            </span>
          )}
        </div>
      </a>
    </article>
  );
}

// ─── Tool Card (calculator / interactive) ─────────────────────────────────────
function ToolCard({ item }: { item: ResourceItem }) {
  const cardHref = item.href ?? "#";

  return (
    <article
      className="res-grid-card"
      style={{
        background: "var(--white)",
        border: "1px solid var(--mist)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <a href={cardHref} className="res-card-link">
        {/* Tool cover */}
        <div
          className="res-cover"
          style={{
            background: "linear-gradient(135deg, var(--navy), #1A2336)",
            padding: "28px 24px",
            position: "relative",
            transition: "filter .15s",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 80%, rgba(252,204,0,.12), transparent 50%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 40, lineHeight: 1, position: "relative", marginBottom: 12 }}>
            {TYPE_ICON[item.coverType] ?? "🔧"}
          </div>
          <div style={{ fontFamily: "var(--font-serif)", color: "var(--yellow)", fontSize: 20, lineHeight: 1.2, position: "relative" }}>
            {item.title}
            {item.titleHighlight && <> <span style={{ color: "var(--ivory)" }}>{item.titleHighlight}</span></>}
          </div>
          {item.lastUpdated && (
            <div style={{ fontSize: 13, color: "var(--pale-navy)", marginTop: 6, position: "relative" }}>
              {item.lastUpdated}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--grey)", marginBottom: 10 }}>
            What it does
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, flex: 1 }}>
            {(item.checklistItems ?? []).map((pt, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--charcoal)", display: "flex", gap: 8, alignItems: "baseline" }}>
                <span style={{ color: "var(--yellow)", fontWeight: 800, flexShrink: 0 }}>✓</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", background: "var(--ivory)", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--grey)" }}>Interactive tool · No download</span>
          {item.downloadCount && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, background: "#E8F5EA", color: "#2A7A3A", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
              {item.downloadCount}
            </span>
          )}
        </div>
      </a>
    </article>
  );
}
