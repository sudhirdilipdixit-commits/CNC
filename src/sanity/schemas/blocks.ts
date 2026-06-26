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
    defineField({ name: "note", title: "Note", type: "string", readOnly: true,
      description: "This section has no editable fields — it renders the fixed step-by-step path." }),
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
  ],
  preview: { prepare: () => ({ title: "Programmes Section" }) },
});

export const whyUsBlock = defineType({
  name: "whyUsBlock",
  title: "Why Us Section",
  type: "object",
  fields: [
    defineField({ name: "note", title: "Note", type: "string", readOnly: true,
      description: "This section renders the fixed 'Why Us' points." }),
  ],
  preview: { prepare: () => ({ title: "Why Us Section" }) },
});

export const aiCounsellorBlock = defineType({
  name: "aiCounsellorBlock",
  title: "AI Counsellor Section",
  type: "object",
  fields: [
    defineField({ name: "note", title: "Note", type: "string", readOnly: true,
      description: "This section renders the fixed AI Counsellor widget." }),
  ],
  preview: { prepare: () => ({ title: "AI Counsellor Section" }) },
});

export const howItWorksBlock = defineType({
  name: "howItWorksBlock",
  title: "How It Works Section",
  type: "object",
  fields: [
    defineField({ name: "note", title: "Note", type: "string", readOnly: true,
      description: "This section renders the fixed How It Works steps." }),
  ],
  preview: { prepare: () => ({ title: "How It Works Section" }) },
});

export const trustStripBlock = defineType({
  name: "trustStripBlock",
  title: "Trust Strip / Stats Section",
  type: "object",
  fields: [
    defineField({ name: "note", title: "Note", type: "string", readOnly: true,
      description: "This section renders the fixed stats/trust strip." }),
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
      of: [{ type: "reference", to: [{ type: "faq" }] }],
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
