interface CTABandProps {
  onOpenLeadForm: () => void;
  heading?: string;
  subheading?: string;
  ctaText?: string;
}

const DEFAULT_HEADING = "Ready to find your right programme?";
const DEFAULT_SUBHEADING = "Get a personalised shortlist in minutes. Free, with no obligation.";
const DEFAULT_CTA_TEXT = "Get Free Guidance";

export default function CTABand({ onOpenLeadForm, heading, subheading, ctaText }: CTABandProps) {
  return (
    <section className="cta-band" id="contact">
      <div className="container">
        <h2>{heading || DEFAULT_HEADING}</h2>
        <p>{subheading || DEFAULT_SUBHEADING}</p>
        <button type="button" className="btn btn-inverted" onClick={onOpenLeadForm}>
          {ctaText || DEFAULT_CTA_TEXT}{" "}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
