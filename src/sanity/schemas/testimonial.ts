import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Student Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role / Designation", type: "string" }),
    defineField({ name: "company", title: "Company / College", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "avatar", title: "Avatar Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number" }),
    defineField({
      name: "course",
      title: "Course Enrolled",
      type: "reference",
      to: [{ type: "course" }],
    }),
    defineField({ name: "isFeatured", title: "Featured on Homepage", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role" } },
});
