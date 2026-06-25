import { defineType, defineField } from "sanity";

export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "campaign",
      title: "Campaign / Channel",
      type: "string",
      options: { list: ["Google Ads", "Meta Ads", "Email", "WhatsApp", "Organic", "Partner"] },
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subheadline", title: "Sub-headline", type: "text", rows: 2 }),
        defineField({ name: "backgroundImage", title: "Background Image", type: "image" }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string" }),
      ],
    }),
    defineField({ name: "formHeading", title: "Form Heading", type: "string" }),
    defineField({ name: "formSubheading", title: "Form Sub-heading", type: "string" }),
    defineField({
      name: "trustPoints",
      title: "Trust / USP Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featuredCourses",
      title: "Featured Courses",
      type: "array",
      of: [{ type: "reference", to: [{ type: "course" }] }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "noIndex", title: "No Index (hide from search engines)", type: "boolean" }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "campaign" } },
});
