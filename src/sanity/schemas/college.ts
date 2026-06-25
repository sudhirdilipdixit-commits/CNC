import { defineType, defineField } from "sanity";

export default defineType({
  name: "college",
  title: "College / University",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2 }),
    defineField({
      name: "accreditations",
      title: "Accreditations",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["UGC-DEB", "AICTE", "NAAC A++", "NAAC A+", "NAAC A", "AIU"] },
    }),
    defineField({ name: "naacGrade", title: "NAAC Grade", type: "string" }),
    defineField({ name: "nirfRank", title: "NIRF Rank", type: "number" }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Government", "Private", "Deemed", "Central", "Autonomous"] },
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
  preview: { select: { title: "name", media: "logo" } },
});
