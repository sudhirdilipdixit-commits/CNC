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
  },
  {
    _id: "f2",
    courseName: "Distance MBA in HR",
    universityName: "NMIMS Global Access",
    mode: "Distance",
    duration: "24 months",
    fees: "₹1.5 L",
  },
  {
    _id: "f3",
    courseName: "Executive Online MBA",
    universityName: "IIM Indore, 1-Year Programme",
    mode: "Executive",
    duration: "12 months",
    fees: "₹6.5 L",
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
            <article className="programme-card" key={course._id}>
              <div className="programme-card-body">
                {course.universityLogoUrl ? (
                  <div className="programme-logo-wrap">
                    <Image
                      src={course.universityLogoUrl}
                      alt={course.universityName ?? course.courseName}
                      width={160}
                      height={56}
                      style={{ objectFit: "contain", maxHeight: 56 }}
                    />
                  </div>
                ) : null}
                <div className="programme-tags">
                  {course.mode && <span className="tag tag-mode">{course.mode}</span>}
                  {course.badge && <span className="tag tag-new">{course.badge}</span>}
                </div>
                <h3>{course.courseName}</h3>
                {course.universityName && (
                  <div className="programme-university">{course.universityName}</div>
                )}
                <div className="programme-meta">
                  {course.duration && (
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Duration</div>
                      <div className="programme-meta-value">{course.duration}</div>
                    </div>
                  )}
                  {course.fees && (
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Fee</div>
                      <div className="programme-meta-value">{course.fees}</div>
                    </div>
                  )}
                  {course.eligibility && (
                    <div className="programme-meta-item">
                      <div className="programme-meta-label">Eligibility</div>
                      <div className="programme-meta-value">{course.eligibility}</div>
                    </div>
                  )}
                </div>
                <button type="button" className="btn btn-primary btn-sm" onClick={onOpenLeadForm}>
                  Get Details
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
