import React from "react";

interface HeroData {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  trustStrip?: string[];
}

interface HeroSectionProps {
  onOpenLeadForm: () => void;
  hero?: HeroData;
}

const DEFAULTS: Required<HeroData> = {
  eyebrow: "INDIA'S TRUSTED HIGHER-EDUCATION COMPASS",
  headline: "Compare. Choose. Begin.",
  subheadline:
    "Online MBA, Distance MBA, Executive MBA, and Study Abroad programmes from 150+ UGC-DEB approved universities and top global institutions - compared honestly, explained clearly.",
  primaryCTA: "Get Free Guidance",
  secondaryCTA: "Contact Us",
  trustStrip: [
    "150+ UGC-DEB approved universities",
    "Study in India and Abroad",
    "Guidance matched to your profile.",
  ],
};

export default function HeroSection({ onOpenLeadForm, hero }: HeroSectionProps) {
  const eyebrow = hero?.eyebrow || DEFAULTS.eyebrow;
  const headline = hero?.headline || DEFAULTS.headline;
  const subheadline = hero?.subheadline || DEFAULTS.subheadline;
  const primaryCTA = hero?.primaryCTA || DEFAULTS.primaryCTA;
  const secondaryCTA = hero?.secondaryCTA || DEFAULTS.secondaryCTA;
  const trustStrip = hero?.trustStrip?.length ? hero.trustStrip : DEFAULTS.trustStrip;

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="h-display h1 hero-headline">{headline}</h1>
          <p className="lede hero-sub">{subheadline}</p>

          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary" onClick={onOpenLeadForm}>
              {primaryCTA}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="/contact-us" className="btn btn-secondary">{secondaryCTA}</a>
          </div>

          <div className="trust-strip" aria-label="Trust signals">
            {trustStrip.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <span className="sep">·</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <aside className="hero-visual" aria-hidden="true">
          <span className="hero-visual-label">AI Counsellor preview</span>
          <h3 className="hero-visual-title">3 programmes matched for you</h3>

          <div className="mini-card featured">
            <div className="mini-card-icon">S</div>
            <div className="mini-card-body">
              <div className="mini-card-name">Online MBA in Marketing</div>
              <div className="mini-card-meta">Symbiosis · 24 months · Rs 1.8 L</div>
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-card-icon">N</div>
            <div className="mini-card-body">
              <div className="mini-card-name">Distance MBA in Finance</div>
              <div className="mini-card-meta">NMIMS · 24 months · Rs 1.5 L</div>
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-card-icon">U</div>
            <div className="mini-card-body">
              <div className="mini-card-name">MBA - University of Birmingham</div>
              <div className="mini-card-meta">Study Abroad · 12 months · ~Rs 35 L</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
