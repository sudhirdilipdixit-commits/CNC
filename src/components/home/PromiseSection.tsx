interface PromiseSectionProps {
  heading?: string;
  body?: string;
  pillars?: string[];
}

const DEFAULT_HEADING = "You'll leave more clear than you arrived.";
const DEFAULT_BODY =
  "Whether you choose India or abroad, whether you enrol now or later, you'll know your real options and move forward with confidence.";
const DEFAULT_PILLARS = [
  "UGC-DEB & AICTE Approved Programmes Only",
  "Free AI Guidance. No Hidden Charges.",
  "Transparent Fees on Every Programme",
];

export default function PromiseSection({ heading, body, pillars }: PromiseSectionProps) {
  const resolvedPillars = pillars?.length ? pillars : DEFAULT_PILLARS;

  return (
    <section className="section-promise" id="promise">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR PROMISE</div>
          <h2 className="h-display h2">{heading || DEFAULT_HEADING}</h2>
          <p>{body || DEFAULT_BODY}</p>
        </div>

        <div className="promise-pillars">
          {resolvedPillars.map((pillar, i) => (
            <div className="pillar" key={i}>
              <span className="pillar-check" aria-hidden="true">✓</span>
              <span className="pillar-text">{pillar}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
