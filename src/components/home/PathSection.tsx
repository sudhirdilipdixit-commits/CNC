interface PathCardContent {
  title?: string;
  body?: string;
  linkLabel?: string;
}

interface PathSectionProps {
  heading?: string;
  subheading?: string;
  cards?: PathCardContent[];
}

const DEFAULT_HEADING = "Two paths. One trusted guide.";
const DEFAULT_SUBHEADING = "Tell us your goal and we will match you to the right programmes - in India or abroad.";

const CARD_SHELLS = [
  {
    href: "/online-mba/",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
      </svg>
    ),
    title: "Study in India",
    body: "Online MBA, Distance MBA, and Executive MBA from 150+ UGC-DEB and AICTE approved universities. Work while you study.",
    linkLabel: "Explore programmes",
  },
  {
    href: "/study-abroad/",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Study Abroad",
    body: "MBA, MS, MIM, and Bachelors at top global universities in the USA, UK, Canada, Australia, Germany, and Ireland.",
    linkLabel: "Explore destinations",
  },
  {
    href: "#programmes",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M12 12v4M8 14h8" />
      </svg>
    ),
    title: "I know my specialization",
    body: "Finance, Marketing, HR, Operations, Business Analytics, Healthcare - find the best programme for your chosen field.",
    linkLabel: "Browse by specialization",
  },
  {
    href: "/ai-counsellor",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01" />
      </svg>
    ),
    title: "I am not sure yet",
    body: "Answer 6 short questions and the AI Counsellor will suggest the programmes that best fit your profile, goals, and budget.",
    linkLabel: "Start the AI Counsellor",
  },
];

export default function PathSection({ heading, subheading, cards }: PathSectionProps) {
  return (
    <section id="counselling">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">WHERE DO YOU WANT TO STUDY?</div>
          <h2 className="h-display h2">{heading || DEFAULT_HEADING}</h2>
          <p>{subheading || DEFAULT_SUBHEADING}</p>
        </div>

        <div className="path-grid">
          {CARD_SHELLS.map((shell, i) => {
            const override = cards?.[i];
            return (
              <a href={shell.href} className="path-card" key={shell.href}>
                <div className="path-card-icon">{shell.icon}</div>
                <h3>{override?.title || shell.title}</h3>
                <p>{override?.body || shell.body}</p>
                <span className="path-card-link">
                  {override?.linkLabel || shell.linkLabel}{" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
