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
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, updatedAt, author
}`;

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]{
  _id, title, slug, excerpt,
  coverImage{ asset, alt },
  tag, readTime, publishedAt, author,
  updatedAt, focusKeyword, keywords, noIndex, faqs, wordCount,
  contentType, about, mentions, howToSteps,
  "category": category->{ _id, name, "slug": slug.current },
  "authorData": authorRef->{ name, "slug": slug.current, jobTitle, linkedIn, twitter },
  body, seo
}`;

export const relatedBlogPostsQuery = groq`*[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt
}`;

export const allBlogSlugsQuery = groq`*[_type == "blog"]{ "slug": slug.current }`;

export const allBlogPostsForSitemapQuery = groq`*[_type == "blog"]{
  "slug": slug.current,
  publishedAt,
  updatedAt,
  "coverImageUrl": coverImage.asset->url
}`;

// ── Author queries ────────────────────────────────────────────────────────────

export const allAuthorSlugsQuery = groq`*[_type == "author"]{ "slug": slug.current }`;

export const authorBySlugQuery = groq`*[_type == "author" && slug.current == $slug][0]{
  _id, name, slug, jobTitle, qualifications, bio, avatar, linkedIn, twitter
}`;

export const blogsByAuthorRefQuery = groq`*[_type == "blog" && authorRef._ref == $authorId] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author
}`;

// ── Category queries ──────────────────────────────────────────────────────────

export const allCategorySlugsQuery = groq`*[_type == "blogCategory"]{ "slug": slug.current }`;

export const categoryBySlugQuery = groq`*[_type == "blogCategory" && slug.current == $slug][0]{
  _id, name, slug, description, coverImage
}`;

export const blogsByCategoryQuery = groq`*[_type == "blog" && category._ref == $categoryId] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author
}`;

export const relatedBlogPostsByCategoryQuery = groq`*[_type == "blog" && slug.current != $slug && category._ref == $categoryId] | order(publishedAt desc)[0...3]{
  _id, title, slug, coverImage, tag, readTime, publishedAt
}`;

export const allLandingPageSlugsQuery = groq`*[_type == "landingPage"]{ "slug": slug.current }`;

export const landingPageQuery = groq`*[_type == "landingPage" && slug.current == $slug][0]{
  title, campaign, pageType,
  showFullHeader, showFooter, hideSidebar, urgencyBanner,
  hero { eyebrow, headline, subheadline, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref },
  filterConfig { showMode, showDuration, showFeeRange },
  contentBlock { heading, body, textAlign },
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
  "faqs": faqs[]{
    "_id": select(_type == "reference" => @->_id, _key),
    "question": select(_type == "reference" => @->question, question),
    "answer": select(_type == "reference" => @->answer, answer),
  },
  "iconStrip": iconStrip { "items": items[] { "iconUrl": icon.asset->url, label } },
  placementStats { eyebrow, heading, description, "stats": stats[] { value, label } },
  howWeHelp { heading, subheading, leftPoints, rightPoints, ctaLabel },
  ctaBand { headline, body, ctaLabel },
  seo { title, description, noIndex },
}`;
