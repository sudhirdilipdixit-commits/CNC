import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal Title", type: "string" }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Text", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subheadline", title: "Sub-headline", type: "text", rows: 2 }),
        defineField({ name: "primaryCTA", title: "Primary CTA Text", type: "string" }),
        defineField({ name: "secondaryCTA", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "trustStrip", title: "Trust Strip Items", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "promise",
      title: "Promise Section",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        defineField({ name: "pillars", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "featuredProgrammes",
      title: "Featured Programmes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "university", type: "string" }),
            defineField({ name: "duration", type: "string" }),
            defineField({ name: "fee", type: "string" }),
            defineField({ name: "batch", type: "string" }),
            defineField({
              name: "tags",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({
                      name: "style",
                      type: "string",
                      options: {
                        list: ["mode", "bestseller", "new", "premium", "executive"],
                      },
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    defineField({
      name: "blogPosts",
      title: "Featured Blog Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
