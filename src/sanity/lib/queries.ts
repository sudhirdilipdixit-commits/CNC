import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0]{
  sections[] {
    _type,
    _key,
    eyebrow, headline, subheadline, primaryCTA, secondaryCTA, trustStrip,
    heading, body, pillars,
    subheading, ctaText,
    "posts": posts[]->{_id, title, slug, excerpt, tag, readTime, publishedAt},
    "faqs": faqs[]->{_id, question, answer},
  },
  seo
}`;

export const blogListQuery = groq`*[_type == "blog"] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author
}`;

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]{
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt, author, body, seo
}`;

export const collegeListQuery = groq`*[_type == "college"] | order(name asc){
  _id, name, slug, logo, accreditations, naacGrade, nirfRank, city, state, type
}`;

export const collegeBySlugQuery = groq`*[_type == "college" && slug.current == $slug][0]{
  _id, name, slug, logo, shortDescription, accreditations, naacGrade, nirfRank, website, city, state, type, seo
}`;

export const courseListQuery = groq`*[_type == "course"] | order(isFeatured desc, title asc){
  _id, title, slug, mode, specialization, duration, feeMin, feeMax,
  nextBatch, badge, isFeatured, accreditations,
  college->{name, slug, logo, naacGrade}
}`;

export const courseBySlugQuery = groq`*[_type == "course" && slug.current == $slug][0]{
  _id, title, slug, mode, specialization, duration, feeMin, feeMax,
  nextBatch, eligibility, highlights, description, badge, accreditations,
  college->{name, slug, logo, shortDescription, naacGrade, nirfRank},
  seo
}`;

export const examListQuery = groq`*[_type == "exam"] | order(name asc){
  _id, name, slug, fullForm, conductedBy, examDate, registrationDeadline
}`;

export const scholarshipListQuery = groq`*[_type == "scholarship"] | order(deadline asc){
  _id, name, slug, provider, amount, deadline, type
}`;

export const faqsByCategory = groq`*[_type == "faq" && category == $category] | order(order asc){
  _id, question, answer
}`;

export const navigationQuery = groq`*[_type == "navigationMenu" && identifier == $identifier][0]{
  title, items
}`;

export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  siteName, logo, logoDark, favicon, phone, whatsapp, email,
  announcementBanner, leadForm
}`;

export const footerSettingsQuery = groq`*[_type == "footerSettings"][0]`;

export const seoSettingsQuery = groq`*[_type == "seoSettings"][0]{
  siteTitle, titleSeparator, siteDescription, defaultOgImage,
  canonicalUrl, twitter, structuredData,
  googleSiteVerification, gaTrackingId
}`;

export const relatedBlogPostsQuery = groq`*[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id, title, slug, excerpt, coverImage, tag, readTime, publishedAt
}`;

export const allBlogSlugsQuery = groq`*[_type == "blog"]{ "slug": slug.current }`;
export const allCollegeSlugsQuery = groq`*[_type == "college"]{ "slug": slug.current }`;
export const allCourseSlugsQuery = groq`*[_type == "course"]{ "slug": slug.current }`;
export const allExamSlugsQuery = groq`*[_type == "exam"]{ "slug": slug.current }`;
export const allScholarshipSlugsQuery = groq`*[_type == "scholarship"]{ "slug": slug.current }`;
export const allPageSlugsQuery = groq`*[_type == "page"]{ "slug": slug.current }`;
