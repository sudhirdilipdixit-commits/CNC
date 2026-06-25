import { defineType, defineField } from "sanity";

export default defineType({
  name: "exam",
  title: "Entrance Exam",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Exam Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "fullForm", title: "Full Form", type: "string" }),
    defineField({ name: "conductedBy", title: "Conducted By", type: "string" }),
    defineField({ name: "examDate", title: "Exam Date", type: "string" }),
    defineField({ name: "registrationDeadline", title: "Registration Deadline", type: "string" }),
    defineField({ name: "eligibility", title: "Eligibility", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "acceptedBy",
      title: "Accepted By (Colleges)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "college" }] }],
    }),
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
  preview: { select: { title: "name" } },
});
