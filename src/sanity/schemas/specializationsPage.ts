import { defineType, defineField } from "sanity";

export default defineType({
  name: "specializationsPage",
  title: "Specializations Guide Page",
  type: "document",
  fields: [
    defineField({ name: "internalTitle", title: "Internal Title", type: "string" }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "GUIDE 2026" }),
        defineField({ name: "heading", title: "Heading (H1)", type: "string" }),
        defineField({ name: "lede", title: "Lede Paragraph", type: "text", rows: 3 }),
        defineField({ name: "notSureText", title: '"Not Sure" Box Text', type: "text", rows: 2 }),
        defineField({ name: "notSureCTA", title: '"Not Sure" Button Text', type: "string" }),
      ],
    }),

    defineField({
      name: "specGrid",
      title: "Specializations Grid Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Section Eyebrow", type: "string", initialValue: "THE EIGHT SPECIALIZATIONS" }),
        defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "Compare. Then explore." }),
        defineField({
          name: "cards",
          title: "Specialization Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "specCard",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon (Emoji)",
                  type: "string",
                  description: "Paste an emoji, e.g. 📢",
                }),
                defineField({
                  name: "name",
                  title: "Specialization Name",
                  type: "string",
                  validation: (R) => R.required(),
                }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                defineField({ name: "salary", title: "Salary (e.g. ₹9 L avg)", type: "string" }),
                defineField({
                  name: "pageSlug",
                  title: "Detail Page Slug",
                  type: "string",
                  description: 'e.g. "marketing" links to /specializations-guide/marketing',
                }),
              ],
              preview: { select: { title: "name", subtitle: "salary" } },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "freshness",
      title: "What's New Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "WHAT'S NEW IN 2026" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Three tracks that didn't exist two years ago",
        }),
        defineField({ name: "body", title: "Body Text (single paragraph)", type: "text", rows: 5 }),
      ],
    }),

    defineField({
      name: "framework",
      title: "Decision Framework Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Section Eyebrow", type: "string", initialValue: "DECISION FRAMEWORK" }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Five questions to ask before choosing",
        }),
        defineField({
          name: "items",
          title: "Framework Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "frameworkItem",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (R) => R.required(),
                }),
                defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "question" } },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "ctaBand",
      title: "CTA Band",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Still not sure?" }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 2,
          initialValue:
            "Our AI Counsellor recommends a specialization and three matching programmes based on your profile in two minutes.",
        }),
        defineField({ name: "primaryCTA", title: "Primary Button Text", type: "string", initialValue: "Get Free Counselling" }),
        defineField({ name: "secondaryCTA", title: "Secondary Button Text", type: "string", initialValue: "Talk to a Counsellor" }),
      ],
    }),
  ],
  preview: {
    select: { title: "internalTitle" },
    prepare: ({ title }: { title?: string }) => ({ title: title || "Specializations Guide Page" }),
  },
});
