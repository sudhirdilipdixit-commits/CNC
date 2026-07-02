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
      description: "e.g. 'Marketing MBA Grid 2026'. Not shown on page.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "programmes",
      title: "Programmes (drag to reorder)",
      type: "array",
      of: [
        {
          type: "object",
          name: "gridItem",
          fields: [
            defineField({
              name: "course",
              title: "Programme",
              type: "reference",
              to: [{ type: "course" }],
              validation: (R) => R.required(),
            }),
            defineField({
              name: "isPinned",
              title: "Pin to top",
              type: "boolean",
              description:
                "Always shows first regardless of sort or active filter.",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "course.title",
              subtitle: "course.college.name",
            },
          },
        },
      ],
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
  ],
  preview: { select: { title: "title" } },
});
