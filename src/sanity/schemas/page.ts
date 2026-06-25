import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero / Banner",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Sub-heading", type: "text", rows: 2 }),
        defineField({ name: "backgroundImage", title: "Background Image", type: "image" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Page Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "callToAction",
          title: "Call to Action",
          fields: [
            defineField({ name: "text", type: "string" }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", type: "image" }),
        defineField({ name: "noIndex", title: "No Index", type: "boolean" }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
