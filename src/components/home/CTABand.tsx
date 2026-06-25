interface CTABandProps {
  onOpenLeadForm: () => void;
}

export default function CTABand({ onOpenLeadForm }: CTABandProps) {
  return (
    <section className="cta-band" id="contact">
      <div className="container">
        <h2>Ready to begin?</h2>
        <p>Talk to a senior counsellor in 30 minutes. Free, with no obligation.</p>
        <button
          type="button"
          onClick={onOpenLeadForm}
          className="btn btn-inverted"
        >
          Schedule My Free Call
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
