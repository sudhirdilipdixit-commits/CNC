interface TrustBadge {
  icon?: string;
  label: string;
}

interface TrustStripSectionProps {
  caption?: string;
  badges?: TrustBadge[];
}

const DEFAULT_CAPTION = "We only list programmes from approved and accredited institutions.";
const DEFAULT_BADGES: TrustBadge[] = [
  { icon: "UGC", label: "UGC-DEB Approved Universities" },
  { icon: "AC", label: "AICTE Approved Institutions" },
  { icon: "NA", label: "NAAC Accredited Universities" },
];

export default function TrustStripSection({ caption, badges }: TrustStripSectionProps) {
  const resolvedBadges = badges?.length ? badges : DEFAULT_BADGES;

  return (
    <section className="section-trust" aria-label="Accreditation and recognition">
      <div className="container">
        <p className="trust-strip-caption">{caption || DEFAULT_CAPTION}</p>
        <div className="trust-strip-large">
          {resolvedBadges.map((badge, i) => (
            <div className="trust-badge" key={i}>
              <span className="trust-badge-icon">{badge.icon}</span> {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
