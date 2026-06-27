import { defineType, defineField } from "sanity";

const BLOCK_TYPES = [
  { type: "heroBlock" },
  { type: "promiseBlock" },
  { type: "pathBlock" },
  { type: "programmesBlock" },
  { type: "whyUsBlock" },
  { type: "aiCounsellorBlock" },
  { type: "howItWorksBlock" },
  { type: "trustStripBlock" },
  { type: "blogBlock" },
  { type: "faqBlock" },
  { type: "ctaBandBlock" },
];

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal Title", type: "string" }),
    defineField({
      name: "sections",
      title: "Page Sections",
      description: "Add, remove and drag to reorder page sections.",
      type: "array",
      of: BLOCK_TYPES,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
