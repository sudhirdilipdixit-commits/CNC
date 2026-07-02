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
  title, campaign,
  showFullHeader, showFooter, urgencyBanner,
  hero { eyebrow, headline, subheadline, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref },
  filterConfig { showSpecialization, showMode, showFee, feeBrackets },
  sidebarForm { show, heading, subheading },
  trustPoints,
  "defaultSort": programmeGrid->defaultSort,
  "programmes": programmeGrid->programmes[] {
    isPinned,
    "course": {
      "_id": _key,
      title, mode, specialization,
      feeMin, feeMax, duration, nextBatch,
      badge, isFeatured, accreditations,
      shortDescription, rating,
      "collegeName": collegeName,
      "collegeLogoUrl": collegeLogo.asset->url,
    },
  },
  "faqs": faqs[]{ "_id": _key, question, answer },
  ctaBand { headline, body, ctaLabel },
  seo { title, description, noIndex },
}`;
