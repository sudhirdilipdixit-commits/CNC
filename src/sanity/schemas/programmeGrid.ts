import { defineType, defineField } from "sanity";

export default defineType({
  name: "programmeGrid",
  title: "Programme Grid",
  type: "document",
  description:
    "A curated, ordered list of programmes. Assign to one or more landing pages — update the grid and all landing pages using it update instantly.",
  fields: [
    defineField({
      name: "title",
      title: "Grid Name (internal)",
      type: "string",
      description: "e.g. 'MBA Programmes — Google Ads Jun 2026'. Not shown on page.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "defaultSort",
      title: "Default Sort",
      type: "string",
      options: {
        list: [
          { title: "Featured first", value: "featured" },
          { title: "Fee: Low to High", value: "fee-asc" },
          { title: "Fee: High to Low", value: "fee-desc" },
          { title: "Rating (highest first)", value: "rating" },
        ],
        layout: "radio",
      },
      initialValue: "featured",
    }),
    defineField({
      name: "programmes",
      title: "Programmes (drag to reorder)",
      type: "array",
      of: [
        {
          type: "object",
          name: "gridItem",
          title: "Programme",
          fields: [
            defineField({
              name: "title",
              title: "Programme Name",
              type: "string",
              description: "e.g. 'Online MBA in Marketing'",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "collegeName",
              title: "University / College Name",
              type: "string",
            }),
            defineField({
              name: "collegeLogo",
              title: "College Logo",
              type: "image",
              options: { hotspot: false },
            }),
            defineField({
              name: "mode",
              title: "Mode",
              type: "string",
              options: {
                list: ["Online", "Distance", "Executive", "Hybrid"],
                layout: "radio",
              },
            }),
            defineField({
              name: "specialization",
              title: "Specialization",
              type: "string",
              description: "e.g. 'Marketing', 'Finance', 'HR'",
            }),
            defineField({
              name: "feeMin",
              title: "Fee Min (₹)",
              type: "number",
              description: "e.g. 125000 for ₹1.25L",
            }),
            defineField({
              name: "feeMax",
              title: "Fee Max (₹)",
              type: "number",
              description: "e.g. 250000 for ₹2.5L",
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: "e.g. '2 Years'",
            }),
            defineField({
              name: "nextBatch",
              title: "Next Batch",
              type: "string",
              description: "e.g. 'Jul 2026'",
            }),
            defineField({
              name: "badge",
              title: "Badge",
              type: "string",
              options: {
                list: ["Bestseller", "New", "Premium", "Top Rated"],
              },
              description: "Optional highlight badge shown on the card.",
            }),
            defineField({
              name: "isFeatured",
              title: "Featured",
              type: "boolean",
              initialValue: false,
              description: "Shown first when sorting by 'Best match'.",
            }),
            defineField({
              name: "isPinned",
              title: "Pin to top",
              type: "boolean",
              initialValue: false,
              description:
                "Always shows first regardless of sort or active filter.",
            }),
            defineField({
              name: "accreditations",
              title: "Accreditations",
              type: "array",
              of: [{ type: "string" }],
              description: "e.g. UGC-DEB, AICTE, NAAC A++",
            }),
            defineField({
              name: "shortDescription",
              title: "Short Description",
              type: "text",
              rows: 2,
              description: "2-line summary on the card. Keep under 120 characters.",
            }),
            defineField({
              name: "rating",
              title: "Rating (0–5)",
              type: "number",
              validation: (R) => R.min(0).max(5),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "collegeName" },
          },
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
