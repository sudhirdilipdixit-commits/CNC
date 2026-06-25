import { defineType, defineField } from "sanity";

export default defineType({
  name: "scholarship",
  title: "Scholarship",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Scholarship Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "provider", title: "Provider / Organization", type: "string" }),
    defineField({ name: "amount", title: "Amount / Value", type: "string" }),
    defineField({ name: "deadline", title: "Application Deadline", type: "string" }),
    defineField({ name: "eligibility", title: "Eligibility Criteria", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Merit", "Need-based", "Category-based", "University-specific"] },
    }),
    defineField({ name: "link", title: "Application Link", type: "url" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "provider" } },
});
