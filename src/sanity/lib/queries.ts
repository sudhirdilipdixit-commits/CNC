import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0]{
  sections[] {
    _type,
    _key,
    eyebrow, headline, subheadline, primaryCTA, secondaryCTA, trustStrip,
    heading, body, pillars,
    subheading, ctaText,
    "posts": posts[]->{_id, title, slug, excerpt, tag, readTime, publishedAt},
    "faqs": faqs[]{"_id": _key, question, answer},
  },
  seo
}`;

export const blogListQuery = groq`*[_type == "blog"] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author
}`;

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]{
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author, body, seo
}`;

export const relatedBlogPostsQuery = groq`*[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt
}`;

export const allBlogSlugsQuery = groq`*[_type == "blog"]{ "slug": slug.current }`;

export const allLandingPageSlugsQuery = groq`*[_type == "landingPage"]{ "slug": slug.current }`;

export const landingPageQuery = groq`*[_type == "landingPage" && slug.current == $slug][0]{
  title, campaign, pageType,
  showFullHeader, showFooter, hideSidebar, urgencyBanner,
  hero { eyebrow, headline, subheadline, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref },
  filterConfig { showMode, showDuration, showFeeRange },
  contentBlock { heading, body },
  sidebarForm { show, heading, subheading },
  trustPoints,
  "courseItems": courseItems[]->{
    "_id": _id,
    courseName, universityName,
    "universityLogoUrl": universityLogo.asset->url,
    mode, duration, fees, feeCategory, eligibility, badge, isFeatured,
  },
  "universityItems": universityItems[]->{
    "_id": _id,
    universityName,
    "universityLogoUrl": universityLogo.asset->url,
    mode, duration, approvedBy, fees, feeCategory, eligibility, badge, isFeatured,
  },
  "faqs": faqs[]{ "_id": _key, question, answer },
  ctaBand { headline, body, ctaLabel },
  seo { title, description, noIndex },
}`;
