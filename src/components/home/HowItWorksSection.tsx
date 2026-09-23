interface HowItWorksStep {
  title: string;
  body?: string;
}

interface HowItWorksSectionProps {
  heading?: string;
  subheading?: string;
  steps?: HowItWorksStep[];
}

const DEFAULT_HEADING = "From first question to a clear decision.";
const DEFAULT_SUBHEADING = "A simple, three-step process. No script. No sales pressure.";
const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    title: "Answer a few questions",
    body: "Use the AI Counsellor or fill a short form. Share your goals, budget, preferred mode, and whether you want to study in India or abroad. Two minutes is all it takes.",
  },
  {
    title: "Get your shortlist instantly",
    body: "The AI Counsellor returns 3 matched programmes with fees, accreditation details, and a clear explanation of why each one fits your profile. For Study Abroad, it groups results as Ambitious, Target, and Safe universities.",
  },
  {
    title: "Enrol with confidence",
    body: "Compare your options, ask questions, and decide on your own timeline. The right programme or university may reach out to guide you through the admission process.",
  },
];

export default function HowItWorksSection({ heading, subheading, steps }: HowItWorksSectionProps) {
  const resolvedSteps = steps?.length ? steps : DEFAULT_STEPS;

  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2 className="h-display h2">{heading || DEFAULT_HEADING}</h2>
          <p>{subheading || DEFAULT_SUBHEADING}</p>
        </div>

        <div className="testimonial-grid">
          {resolvedSteps.map((step, i) => (
            <article className="testimonial" key={i}>
              <div className="step-number">{i + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              {step.body && <p className="step-body">{step.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
