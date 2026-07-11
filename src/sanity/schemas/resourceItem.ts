import { defineType, defineField } from "sanity";

export default defineType({
  name: "resourceItem",
  title: "Resource Item",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      description: "Used in Sanity only — e.g. 'Top 10 MBA Guide 2026'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Cover Title (main text)",
      type: "string",
      description: "e.g. 'Top 10 Online MBA Programmes in India'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleHighlight",
      title: "Cover Title Highlight (yellow text)",
      type: "string",
      description: "The part shown in yellow on the card cover. e.g. '2026-27'",
    }),
    defineField({
      name: "coverType",
      title: "Cover Type Badge",
      type: "string",
      options: {
        list: [
          { title: "Free Guide", value: "Free Guide" },
          { title: "Comparison Guide", value: "Comparison Guide" },
          { title: "Checklist", value: "Checklist" },
          { title: "Calculator", value: "Calculator" },
          { title: "Career Tool", value: "Career Tool" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "category",
      title: "Filter Category",
      type: "string",
      options: {
        list: [
          { title: "Free Guide (general)", value: "free-guides" },
          { title: "Comparison Guide", value: "comparison-guides" },
          { title: "Career Tool", value: "career-tools" },
          { title: "Calculator", value: "calculator" },
          { title: "Checklist", value: "checklists" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Determines which filter chip this card appears under.",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "string",
      description: "e.g. 'April 2026' — shown on the card cover",
    }),
    defineField({
      name: "pageCount",
      title: "Page Count",
      type: "number",
      description: "e.g. 48. Leave empty for interactive tools.",
    }),
    defineField({
      name: "isInteractiveTool",
      title: "Interactive Tool (no download)",
      type: "boolean",
      initialValue: false,
      description: "Enable for calculator or tool cards — changes the card cover style.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (yellow border)",
      type: "boolean",
      initialValue: false,
      description: "Featured cards get a yellow border and 'Featured' badge.",
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count Label",
      type: "string",
      description: "e.g. '12,400+ downloads' or '⚡ Try it now' for tools",
    }),
    defineField({
      name: "checklistItems",
      title: "What's Inside (checklist)",
      type: "array",
      of: [{ type: "string" }],
      description: "4 bullet points shown in the card body.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "Used for the individual resource page URL at /resources/[slug]",
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description: "Full path to the resource page or external tool, e.g. /resources/top-10-mba-guide",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Featured items are always sorted first regardless.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "coverType",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
