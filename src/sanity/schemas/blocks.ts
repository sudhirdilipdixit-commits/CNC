import { defineType, defineField } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Text", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheadline", title: "Sub-headline", type: "text", rows: 2 }),
    defineField({ name: "primaryCTA", title: "Primary Button Text", type: "string" }),
    defineField({ name: "secondaryCTA", title: "Secondary Button Text", type: "string" }),
    defineField({
      name: "trustStrip",
      title: "Trust Strip Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Hero Section" }) },
});

export const promiseBlock = defineType({
  name: "promiseBlock",
  title: "Promise Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body Text", type: "text", rows: 3 }),
    defineField({ name: "pillars", title: "Pillars", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { prepare: () => ({ title: "Promise Section" }) },
});

export const pathBlock = defineType({
  name: "pathBlock",
  title: "Your Path Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Sub-heading", type: "string" }),
    defineField({
      name: "cards",
      title: "Path Cards",
      description: "Up to 4 cards, in order. Each card's icon and link stay fixed — only the text below is editable. Leave blank to use the default copy.",
      type: "array",
      validation: (R) => R.max(4),
      of: [
        {
          type: "object",
          name: "pathCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body Text", type: "text", rows: 2 }),
            defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Your Path Section" }) },
});

export const programmesBlock = defineType({
  name: "programmesBlock",
  title: "Programmes Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Section Heading", type: "string" }),
    defineField({ name: "subheading", title: "Sub-heading", type: "string" }),
    defineField({
      name: "featuredCourses",
      title: "Featured Courses (max 3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "courseCard" }] }],
      description: "Pick up to 3 isFeatured course cards to show here. Falls back to placeholder data if empty.",
      validation: (R) => R.max(3),
    }),
  ],
  preview: { prepare: () => ({ title: "Programmes Section" }) },
});

export const whyUsBlock = defineType({
  name: "whyUsBlock",
  title: "Why Us Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "rows",
      title: "Comparison Rows",
      description: "Leave blank to use the default comparison table.",
      type: "array",
      of: [
        {
          type: "object",
          name: "whyUsRow",
          fields: [
            defineField({ name: "label", title: "Row Label", type: "string", description: "e.g. 'Guidance'", validation: (R) => R.required() }),
            defineField({ name: "aggregatorValue", title: "Typical Aggregator", type: "string" }),
            defineField({ name: "ourValue", title: "CollegeNCourses", type: "string" }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Why Us Section" }) },
});

export const howItWorksBlock = defineType({
  name: "howItWorksBlock",
  title: "How It Works Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Sub-heading", type: "string" }),
    defineField({
      name: "steps",
      title: "Steps",
      description: "Leave blank to use the default 3 steps.",
      type: "array",
      validation: (R) => R.max(3),
      of: [
        {
          type: "object",
          name: "howItWorksStep",
          fields: [
            defineField({ name: "title", title: "Step Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "body", title: "Step Body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "How It Works Section" }) },
});

export const trustStripBlock = defineType({
  name: "trustStripBlock",
  title: "Trust Strip / Stats Section",
  type: "object",
  fields: [
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "badges",
      title: "Trust Badges",
      description: "Leave blank to use the default 3 badges.",
      type: "array",
      of: [
        {
          type: "object",
          name: "trustBadge",
          fields: [
            defineField({ name: "icon", title: "Short Icon Text", type: "string", description: "e.g. 'UGC' — a short label shown inside the badge icon.", validation: (R) => R.max(4) }),
            defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Trust Strip Section" }) },
});

export const blogBlock = defineType({
  name: "blogBlock",
  title: "Blog Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Section Heading", type: "string" }),
    defineField({ name: "subheading", title: "Sub-heading", type: "string" }),
    defineField({
      name: "posts",
      title: "Blog Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Blog Section" }) },
});

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ Section",
  type: "object",
  fields: [
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "FAQ Section" }) },
});

export const ctaBandBlock = defineType({
  name: "ctaBandBlock",
  title: "CTA Band",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Sub-heading", type: "string" }),
    defineField({ name: "ctaText", title: "Button Text", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "CTA Band" }) },
});
