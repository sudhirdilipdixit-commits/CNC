"use client";

import { Fragment, useCallback, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import LeadModal from "@/components/forms/LeadModal";
import PlannerHeader from "@/components/planner/PlannerHeader";
import PlannerFooter from "@/components/planner/PlannerFooter";
import "@/components/planner/planner-theme.css";
import "@/components/planner/planner-inner-page.css";
import "@/components/planner/planner-blog.css";

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

interface Post {
  title: string;
  slug: string;
  tag: string;
  readTime: string;
  date: string;
  img: string;
}

const POSTS: Post[] = [
  { title: "Mastering People Data: Why Top-Ranked Online MBA Programs Transform HR Leaders into Strategic Powerhouses", slug: "mastering-people-data-why-top-ranked-online-mba-programs-transform-hr-leaders-into-strategic-powerhouses", tag: "Learning, Online", readTime: "15 min read", date: "19 Aug 2025", img: `${CDN}/93bcbd55ed0c7862ff45cc6532d442b25bba2efc-1200x630.jpg` },
  { title: "The Future of Education: Why Online MBA Programs Continue to Gain Unprecedented Popularity in 2025", slug: "the-future-of-education-why-online-mba-programs-continue-to-gain-unprecedented-popularity-in-2025", tag: "Learning, Online", readTime: "20 min read", date: "19 Aug 2025", img: `${CDN}/04f449c9747e0c4e940c75ed895a5955f33bad64-1200x630.jpg` },
  { title: "Technology Readiness: Your Complete Guide to Succeeding in the Best Online MBA Degrees", slug: "technology-readiness-your-complete-guide-to-succeeding-in-the-best-online-mba-degrees", tag: "Learning, Online", readTime: "20 min read", date: "16 Aug 2025", img: `${CDN}/cd4b15656af0fcb94b520395854fb7ec4df97fdb-1200x630.jpg` },
  { title: "How Online MBA for Working Professionals Fuels Career Growth Without Pausing Your Paycheck", slug: "how-online-mba-for-working-professionals-fuels-career-growth-without-pausing-your-paycheck", tag: "Online", readTime: "10 min read", date: "16 Aug 2025", img: `${CDN}/48ea459179d90b737714ee4d08ba68b788e1de6c-1200x630.jpg` },
  { title: "The Roadmap to Specialization: Aligning Your Bachelor's Degree With The Hottest Online MBA Programs", slug: "the-roadmap-to-specialization-aligning-your-bachelors-degree-with-the-hottest-online-mba-programs", tag: "Learning, Online", readTime: "8 min read", date: "16 Aug 2025", img: `${CDN}/3356e47ebb4ec40661ce988d2f92c5a716a6bf04-1200x630.jpg` },
  { title: "The Entrepreneur's Lab: Identifying the Best University for an Online MBA That Fuels Start-up Success in 2025.", slug: "the-entrepreneurs-lab-identifying-the-best-university-for-an-online-mba-that-fuels-start-up-success-in-2025", tag: "Learning, Online", readTime: "10 min read", date: "16 Aug 2025", img: `${CDN}/828b0954acf5c8621f293ae90cf11aab9e1073b2-1200x630.jpg` },
  { title: "Is an Online MBA Degree Enough for 2025? What Employers Really Look For?", slug: "is-an-online-mba-degree-enough-for-2025-what-employers-really-look-for", tag: "Learning, Online", readTime: "9 min read", date: "13 Aug 2025", img: `${CDN}/b74ea42b7da4467c53e74c454503eefb4a411a7c-1280x854.jpg` },
  { title: "From BBA to Manipal Online MBA: Unlocking Deeper Expertise and Career Acceleration in 2025", slug: "from-bba-to-manipal-online-mba-unlocking-deeper-expertise-and-career-acceleration-in-2025", tag: "Online", readTime: "10 min read", date: "13 Aug 2025", img: `${CDN}/ec33c3d342dd3e69f4db4ac94884a55cb1ff0f3a-1280x854.jpg` },
  { title: "Accreditation Matters: Why It Defines the Best Online MBA Courses for Global Recognition Today?", slug: "accreditation-matters-why-it-defines-the-best-online-mba-courses-for-global-recognition-today", tag: "Online MBA", readTime: "10 min read", date: "13 Aug 2025", img: `${CDN}/532462dfc8ce3987f7af28e107693fa8f4c5ba52-1200x630.jpg` },
  { title: "Agile Leadership for Tech: Why an Online IT MBA is Essential Now", slug: "agile-leadership-for-tech-why-an-online-it-mba-is-essential-now", tag: "Learning, Online", readTime: "10 min read", date: "31 Jul 2025", img: `${CDN}/9ea3355267483ed4074a92cd0ffd5995c3aa225f-1920x1080.jpg` },
  { title: "NEP 2025: How It's Reshaping MBA Online Courses in India", slug: "nep-2025-how-its-reshaping-mba-online-courses-in-india", tag: "Learning, Online", readTime: "9 min read", date: "31 Jul 2025", img: `${CDN}/4e3e099d0620abaa72736b5b886515fb51ea202d-1920x1080.jpg` },
  { title: "Is Distance MBA Worth It? Debunking Common Myths and Revealing the True ROI", slug: "is-distance-mba-worth-it-debunking-common-myths-and-revealing-the-true-roi", tag: "distance, Learning", readTime: "10 min read", date: "31 Jul 2025", img: `${CDN}/7bc95459410eca14e33d1bad9f8959f5bacf95bc-1920x1080.jpg` },
];

const ALL_TAGS = ["Learning, Online", "Online", "Online MBA", "distance, Learning", "Learning", "Distance", "Distance MBA", "distance"];

const INITIAL_COUNT = 9;

export default function PlannerBlogIndexClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("blog-preview");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const openLeadForm = useCallback((source = "blog-preview") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const filtered = activeTag ? POSTS.filter((p) => p.tag === activeTag) : POSTS;
  const shown = filtered.slice(0, visible);
  const isAllFeatured = !activeTag;

  return (
    <div className={`planner-theme ${bricolage.variable} ${figtree.variable}`}>
      <PlannerHeader primaryCTA="Get Free Guidance" onOpenLeadForm={openLeadForm} />

      {/* Hero */}
      <section className="hero" style={{ padding: "64px 0 56px" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="hero-eyebrow">INSIGHTS &amp; GUIDES</div>
          <h1 style={{ marginTop: 14, fontSize: 46 }}>Honest writing on Indian higher education.</h1>
          <p className="lede">No clickbait. No paid rankings. Real data, written by a team that works with aspirants every day.</p>
          <div className="hero-ctas">
            <button type="button" className="btn btn-sun" onClick={() => openLeadForm("blog-hero")}>Get Free Guidance {ARROW}</button>
            <a href="/online-mba#programmes" className="btn btn-white">Browse MBA Programmes</a>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="p-section p-section-alt">
        <div className="wrap">
          <div className="blog-filters">
            <button type="button" className={`blog-chip${!activeTag ? " active" : ""}`} onClick={() => { setActiveTag(null); setVisible(INITIAL_COUNT); }}>
              All posts
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`blog-chip${activeTag === tag ? " active" : ""}`}
                onClick={() => { setActiveTag(tag); setVisible(INITIAL_COUNT); }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {shown.map((post, i) => (
              <Fragment key={post.slug}>
                {i === 6 && (
                  <div className="blog-lead-banner" key="lead-banner">
                    <div>
                      <h3>Skip the research. Get expert guidance.</h3>
                      <p>Get a personalised programme shortlist matched to your profile. Free. Takes 2 minutes.</p>
                    </div>
                    <button type="button" className="btn btn-sun" onClick={() => openLeadForm("blog-mid-capture")}>
                      Get Free Guidance {ARROW}
                    </button>
                  </div>
                )}
                <a
                  href={post.slug === "mastering-people-data-why-top-ranked-online-mba-programs-transform-hr-leaders-into-strategic-powerhouses" ? "/design-preview/blog-post" : `/blog/${post.slug}`}
                  className={`blog-card${isAllFeatured && i === 0 ? " featured" : ""}`}
                >
                  <div className="blog-card-media">
                    <img src={post.img} alt={post.title} />
                    <span className="blog-tag-pill">{post.tag}</span>
                    {isAllFeatured && i === 0 && <span className="blog-edit-pick">Editor&apos;s Pick</span>}
                  </div>
                  <div className="blog-card-body">
                    <h3>{post.title}</h3>
                    <div className="blog-card-meta">{post.readTime} &middot; {post.date}</div>
                    <span className="blog-read-link">Read article {ARROW}</span>
                  </div>
                </a>
              </Fragment>
            ))}
          </div>

          <div className="blog-load-more">
            <small>Showing {shown.length} of {filtered.length} articles</small>
            {visible < filtered.length && (
              <button type="button" className="btn btn-white" onClick={() => setVisible((v) => v + 6)}>
                Load 6 more articles
              </button>
            )}
          </div>
        </div>
      </section>

      <PlannerFooter />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </div>
  );
}
