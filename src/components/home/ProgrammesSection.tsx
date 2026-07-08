import Image from "next/image";

interface FeaturedCourse {
  _id: string;
  courseName: string;
  universityName?: string;
  mode?: string;
  duration?: string;
  fees?: string;
  eligibility?: string;
  badge?: string;
  universityLogoUrl?: string;
}

interface ProgrammesSectionProps {
  onOpenLeadForm: () => void;
  featuredCourses?: FeaturedCourse[];
}

const FALLBACK_COURSES: FeaturedCourse[] = [
  {
    _id: "f1",
    courseName: "Online MBA in Marketing",
    universityName: "Symbiosis Centre for Distance Learning",
    mode: "Online",
    duration: "24 months",
    fees: "₹1.8 L",
    eligibility: "Graduate from any discipline with min. 50% marks",
  },
  {
    _id: "f2",
    courseName: "Distance MBA in HR",
    universityName: "NMIMS Global Access",
    mode: "Distance",
    duration: "24 months",
    fees: "₹1.5 L",
    eligibility: "Graduate from any recognised university",
  },
  {
    _id: "f3",
    courseName: "Executive Online MBA",
    universityName: "IIM Indore, 1-Year Programme",
    mode: "Executive",
    duration: "12 months",
    fees: "₹6.5 L",
    eligibility: "Graduate with min. 2 years work experience",
  },
];

export default function ProgrammesSection({ onOpenLeadForm, featuredCourses }: ProgrammesSectionProps) {
  const courses = featuredCourses?.length ? featuredCourses : FALLBACK_COURSES;

  return (
    <section className="section-programmes" id="programmes">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FEATURED PROGRAMMES</div>
          <h2 className="h-display h2">Programmes Indian aspirants are choosing in 2026</h2>
          <p>Curated from the most-applied-to programmes on our portal this quarter.</p>
        </div>

        <div className="programme-grid">
          {courses.map((course) => (
            <article className="fp-card" key={course._id}>
              <div className="fp-card-head">
                {course.universityLogoUrl ? (
                  <Image
                    src={course.universityLogoUrl}
                    alt={course.universityName ?? course.courseName}
                    width={220}
                    height={90}
                    className="fp-card-logo"
                  />
                ) : (
                  <div className="fp-card-logo-ph" aria-hidden="true">
                    {(course.universityName ?? course.courseName).charAt(0)}
                  </div>
                )}
                <div className="fp-card-name">{course.courseName}</div>
                {course.universityName && (
                  <div className="fp-card-sub">{course.universityName}</div>
                )}
                {course.mode && <span className="fp-mode-tag">{course.mode}</span>}
              </div>

              {(course.duration || course.fees) && (
                <div className="fp-card-meta">
                  {course.duration && (
                    <div className="fp-meta-cell">
                      <span className="fp-meta-label">Duration</span>
                      <span className="fp-meta-val">{course.duration}</span>
                    </div>
                  )}
                  {course.fees && (
                    <div className="fp-meta-cell">
                      <span className="fp-meta-label">Fees (₹)</span>
                      <span className="fp-meta-val">{course.fees}</span>
                    </div>
                  )}
                </div>
              )}

              {course.eligibility && (
                <div className="fp-card-info-row">
                  <span className="fp-meta-label">Eligibility</span>
                  <span>{course.eligibility}</span>
                </div>
              )}

              <div className="fp-card-actions">
                <button type="button" className="fp-btn-primary" onClick={onOpenLeadForm}>
                  Get Free Career Counselling
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="programme-grid-more">
          <a href="#programmes">See all programmes on our portal &rarr;</a>
        </div>
      </div>
    </section>
  );
}
