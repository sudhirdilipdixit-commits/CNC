import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "e.g. 'Senior Education Counsellor'",
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "string",
      description: "e.g. 'MBA, University of Mumbai · 8 years in EdTech'",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Short author bio shown on blog posts and the author page.",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
      description: "Full URL — used in author JSON-LD sameAs for E-E-A-T signals.",
    }),
    defineField({
      name: "twitter",
      title: "Twitter / X Handle",
      type: "string",
      description: "Without the @ symbol — e.g. 'nikhita_cnc'",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "avatar" },
  },
});
