import { defineType, defineField } from "sanity";

export default defineType({
  name: "course",
  title: "Course / Programme",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Course Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "college", title: "University", type: "reference", to: [{ type: "college" }] }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: { list: ["Online", "Distance", "Hybrid", "Executive"] },
    }),
    defineField({
      name: "specialization",
      title: "Specialization",
      type: "string",
      options: {
        list: [
          "Marketing & Digital Marketing",
          "Finance",
          "Banking & Financial Services",
          "Human Resources",
          "Operations & Supply Chain",
          "IT & Project Management",
          "Healthcare Management",
          "General Management",
          "Executive",
        ],
      },
    }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "feeMin", title: "Min Fee (₹)", type: "number" }),
    defineField({ name: "feeMax", title: "Max Fee (₹)", type: "number" }),
    defineField({ name: "nextBatch", title: "Next Batch Date", type: "string" }),
    defineField({ name: "eligibility", title: "Eligibility", type: "text", rows: 2 }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "accreditations",
      title: "Accreditations",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "isFeatured", title: "Featured Programme", type: "boolean" }),
    defineField({ name: "badge", title: "Badge (e.g. Bestseller)", type: "string" }),
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
  preview: {
    select: {
      title: "title",
      subtitle: "college.name",
    },
  },
});
