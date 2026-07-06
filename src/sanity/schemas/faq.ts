import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ Library",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" } as { layout: "tags" },
      description:
        "Group by topic — e.g. 'fees', 'eligibility', 'ugc-deb', 'admissions'. Helps filter in Studio when the library grows.",
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title,
        subtitle: subtitle && subtitle.length > 90 ? subtitle.slice(0, 90) + "…" : subtitle,
      };
    },
  },
});
