"use client";

import { useCallback, useMemo, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-blog.css";
import "@/components/planner/planner-landing-course.css";

const bricolage = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  variable: "--font-planner-display",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  variable: "--font-planner-body",
  subsets: ["latin"],
  display: "swap",
});

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const CDN = "https://cdn.sanity.io/images/aok0lwsd/production";
const ELIGIBILITY = "Open to graduates from any discipline with a minimum of 50% marks or equivalent qualification.";

interface Course {
  course: string;
  uni: string;
  fees: string;
  logo: string;
}

const COURSES: Course[] = [
  { course: "Distance MBA in Business Management", uni: "Symbiosis Centre for Distance Learning", fees: "58,000/-", logo: `${CDN}/8a4f0daf75358deb5cdd38b63c92261c12a634a9-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "Amity University Online", fees: "2,25,000/-", logo: `${CDN}/bde76c1da894308762acfc03b21ffb21443809b7-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Narsee Monjee Institute of Management Studies (NMIMS)", fees: "1,44,000/-", logo: `${CDN}/70101ca6049858fe319010313be3ac12bf8db210-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "Manipal University", fees: "1,47,500/-", logo: `${CDN}/be4808c1146aa03ffa2c59b17c0a5540390182ac-400x200.webp` },
  { course: "Distance MBA in Business Management", uni: "ICFAI University", fees: "2,00,000/-", logo: `${CDN}/f6637b849540cedbf8aa0085f7fee7f6928e24b9-400x200.png` },
  { course: "Distance PGDM in Business Management", uni: "Sikkim Professional University", fees: "1,10,000/-", logo: `${CDN}/68040c75aa214c5aef8899d47910f8ef2cb18f93-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "Jain (Deemed-to-be University)", fees: "1,96,000/-", logo: `${CDN}/9ee09acb3db19ab592ee7c5a87a032bba905e666-400x200.png` },
  { course: "Online MBA in Business Management", uni: "Lovely Professional University (Online Education)", fees: "1,47,500/-", logo: `${CDN}/42bf00836636557151fedab5f3dc787be44102a6-400x200.webp` },
  { course: "Distance PGDM in Business Management", uni: "Parul University", fees: "90,000/-", logo: `${CDN}/615e01486d6a87d4d2dba56eba450fac3782a275-400x200.webp` },
  { course: "Online PGDM in Business Management", uni: "Welingkar Institute of Management (WeSchool)", fees: "1,26,000/-", logo: `${CDN}/33196bf126aac353719ff4909ac7b53ad5ed8f18-400x200.png` },
  { course: "Online MBA in Business Management", uni: "Bharati Vidyapeeth Deemed University", fees: "59,800/-", logo: `${CDN}/df16fef4a5da98ec23d0583946b2966ba38238ba-400x200.png` },
  { course: "Distance PGDM in Business Management", uni: "Institute of Management Technology (IMT) Ghaziabad", fees: "1,60,000/-", logo: `${CDN}/826ed7b7028e457c5d148ed89857fd3fabb0beaf-400x200.png` },
  { course: "Online MBA in Business Management", uni: "Dr. M.G.R. Educational and Research Institute", fees: "1,60,000/-", logo: `${CDN}/d210ca81429f162ee62ead00637bd2e0c2c2fee2-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Bharathiar University", fees: "70,000/-", logo: `${CDN}/97b74ae60ad6c2150b6fa07fbcffbbe0d3410f70-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Lovely Professional University (Distance Education)", fees: "1,45,600/-", logo: `${CDN}/af01b077652900dee88e88502842284376f6dfc5-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Suresh Gyan Vihar University", fees: "98,000/-", logo: `${CDN}/03c96b55c17afc6bd98d3024e7c682632496fd21-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Alagappa University", fees: "92,400/-", logo: `${CDN}/04ccfef3f7e5c33a1729e957fc47921af550f333-400x200.jpg` },
  { course: "Distance MBA in Business Management", uni: "Bharathidasan University", fees: "91,000/-", logo: `${CDN}/ea71c44fed5e087033052a13d8358cdc1bd7242d-400x200.png` },
  { course: "Online MBA in Business Management", uni: "Symbiosis School for Online and Digital Learning", fees: "2,99,000/-", logo: `${CDN}/e9e469fa14c1cad7c1aa6ea1566f3e129842edb9-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "Indian Institute of Management Calcutta", fees: "55,000/-", logo: `${CDN}/5e1fd2dd2e603318d37c80080d356ac3a85ab378-400x200.jpg` },
  { course: "Distance MBA in Business Management", uni: "SRM Institute of Science and Technology", fees: "1,89,000/-", logo: `${CDN}/1aa21b6f09d0b9bc2957ebab7adb305f0dccdc6a-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Shri Venkateshwara University", fees: "1,03,000/-", logo: `${CDN}/ae7932869909baf5d7bfe2412ea74866823e7c3d-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Savitribai Phule Pune University", fees: "30,000/-", logo: `${CDN}/b8e7bb0e9b77174201a40a84378ef42d48767de5-400x200.webp` },
  { course: "Online PGDM in Business Management", uni: "Jagdish Sheth School of Management (JAGSoM)", fees: "16,452/-", logo: `${CDN}/0ecdb7b7d55f744cd16b8b7e5bf97ca8fdf92d33-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "University of Petroleum and Energy Studies (UPES)", fees: "1,35,000/-", logo: `${CDN}/58e18ac85a6ac9a44b5671b304917c5485298e3d-400x200.png` },
  { course: "Online MBA in Business Management", uni: "XLRI - Xavier School of Management", fees: "4,00,000/-", logo: `${CDN}/def68e09dc05cf7b04a217f55bac52cc07cc7b23-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Guru Jambheshwar University of Science and Technology", fees: "18,000/-", logo: `${CDN}/f387566fa5c34a262773cdaf0802e0c87f3a5d03-400x200.webp` },
  { course: "Online MBA in Business Management", uni: "Andhra University", fees: "51,000/-", logo: `${CDN}/47e9836cbd84c5809130579f7b872d558cf77c11-400x200.jpg` },
  { course: "Online MBA in Business Management", uni: "Anna University", fees: "19,200/-", logo: `${CDN}/4b70406750fd6099a78e7527de50493c084691d3-400x200.jpg` },
  { course: "Online MBA in Business Management", uni: "Annamalai University", fees: "39,700/-", logo: `${CDN}/2769cfc7a677d4b282637dead8f09f7e630156d3-400x200.jpg` },
  { course: "Online MBA in Business Management", uni: "Shri Venkateshwara University", fees: "1,49,500/-", logo: `${CDN}/ae7932869909baf5d7bfe2412ea74866823e7c3d-400x200.png` },
  { course: "Online MBA in Business Management", uni: "Arunodaya University", fees: "12,010/-", logo: `${CDN}/d1325f15a4b21e3fc5c2438498201118bbd7b3e5-400x200.png` },
  { course: "Distance MBA in Business Management", uni: "Jaipur National University", fees: "50,000/-", logo: `${CDN}/0f89881e40511fe1b67bfd6abfe0aa5f968ad806-400x200.png` },
];

function feeValue(fees: string): number {
  return Number(fees.replace(/[^\d]/g, "")) || 0;
}

const ICON_STRIP = [
  { icon: `${CDN}/41670813043e6289660fd47ab86fc231103330eb-60x60.png`, label: "Admission Support" },
  { icon: `${CDN}/703996f1284e06824c23461f9cc39530580f7675-60x60.png`, label: "Presenting Top Online MBA Colleges" },
  { icon: `${CDN}/3cecfbf29e57b5d8f212693873361e3d34e516d4-60x60.png`, label: "100% Free Career Counseling" },
  { icon: `${CDN}/eaff80e5693e842d12dfc1a7ffd5072cb393c51a-60x60.png`, label: "Get College Details" },
];

type SortMode = "balanced" | "low" | "high";
const PAGE_SIZE = 12;

export default function PlannerDistanceMBAClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("dmba-preview");
  const [sort, setSort] = useState<SortMode>("balanced");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const openLeadForm = useCallback((source = "dmba-preview") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const sorted = useMemo(() => {
    const arr = [...COURSES];
    if (sort === "low") arr.sort((a, b) => feeValue(a.fees) - feeValue(b.fees));
    else if (sort === "high") arr.sort((a, b) => feeValue(b.fees) - feeValue(a.fees));
    return arr;
  }, [sort]);

  const shown = sorted.slice(0, visible);

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <div className="lp-ticker">
        <span className="lp-ticker-track">
          Note: - The Information Mentioned on this page or at www.collegencourses.com are purely indicative, candidates are advised to visit respective institutions/University&apos;s official websites for precise information to avoid any confusions.
        </span>
      </div>

      <PlannerHeader primaryCTA="Get Free Counselling" onOpenLeadForm={openLeadForm} />

      {/* Hero + sidebar */}
      <section className="p-hero">
        <div className="wrap">
          <div className="p-layout">
            <div>
              <h1 style={{ fontSize: 42 }}>Top Distance/Online MBA In Business Management</h1>
              <div className="answer-capsule">
                Enhance Your Skills with India&apos;s Distance/Online MBA Colleges. Explore Top Distance/Online MBA Colleges in India
              </div>
              <p className="p-lede">Admissions Open For Distance/Online MBA 2026-27 Batch</p>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>Updated September 2026</p>
              <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>
                Written by CollegeNCourses Editorial Team &middot; Reviewed by Sudhir, CollegeNCourses Senior Counsellor &middot; Approved by Nikhita Pradeep Deshmukh
              </p>

              <div className="p-cta-row">
                <button type="button" className="btn btn-sun" onClick={() => openLeadForm("dmba-hero")}>
                  Get Free Counselling {ARROW}
                </button>
                <a href="#programmes" className="btn btn-white">View Programmes</a>
              </div>
            </div>

            <aside className="p-sidebar">
              <div className="p-sidebar-head">
                <h3>Find the right programme for your goal</h3>
                <p>Free. Takes 2 minutes.</p>
              </div>
              <div className="p-sidebar-body">
                <div className="p-stat"><span>Fee Range:</span><strong>Rs 12k to 4L</strong></div>
                <div className="p-stat"><span>Duration:</span><strong>2 Years</strong></div>
                <button type="button" className="btn btn-sun btn-sm" style={{ width: "100%" }} onClick={() => openLeadForm("dmba-sidebar")}>
                  Get Free Guidance {ARROW}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Icon strip */}
      <section className="icon-strip">
        <div className="wrap">
          {ICON_STRIP.map((item) => (
            <div className="icon-strip-item" key={item.label}>
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Course grid */}
      <section className="p-section p-section-alt" id="programmes">
        <div className="wrap">
          <div className="lp-results-row">
            <div className="lp-results-count">Showing {COURSES.length} courses</div>
            <div className="lp-sort-chips">
              <button type="button" className={`blog-chip${sort === "balanced" ? " active" : ""}`} onClick={() => setSort("balanced")}>Balanced pick</button>
              <button type="button" className={`blog-chip${sort === "low" ? " active" : ""}`} onClick={() => setSort("low")}>Lowest fee first</button>
              <button type="button" className={`blog-chip${sort === "high" ? " active" : ""}`} onClick={() => setSort("high")}>Highest fee first</button>
            </div>
          </div>

          <div className="course-grid">
            {shown.map((c, i) => (
              <div className="course-card" key={`${c.uni}-${i}`}>
                <div className="course-card-logo"><img src={c.logo} alt={c.uni} /></div>
                <h3>{c.course}</h3>
                <div className="uni-name">{c.uni}</div>
                <div className="facts">
                  <div><span>Duration</span><b>2 Years</b></div>
                  <div><span>Fees</span><b>Rs {c.fees}</b></div>
                </div>
                <div className="elig">{ELIGIBILITY}</div>
                <button type="button" className="btn btn-sun btn-sm" onClick={() => openLeadForm(`dmba-card-${c.uni}`)}>Enquire Now</button>
              </div>
            ))}
          </div>

          {visible < sorted.length && (
            <div className="lp-load-more">
              <button type="button" className="btn btn-white" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more programmes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section className="cta p-cta-band">
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Hurry Up, Last Chance for Admission in 2026-27 Batch</h2>
          <p>Boost your career with recognized Distance/Online MBA Colleges In India.</p>
          <button type="button" className="btn btn-sun" style={{ marginTop: 26 }} onClick={() => openLeadForm("dmba-cta-band")}>
            Enquire Now {ARROW}
          </button>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
