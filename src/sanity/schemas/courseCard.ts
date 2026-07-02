import { defineType, defineField } from "sanity";

export default defineType({
  name: "courseCard",
  title: "Course Card",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      description: "Used in Sanity only — e.g. 'Amity Online MBA Marketing 2026'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "universityLogo",
      title: "University Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "courseName",
      title: "Course Name",
      type: "string",
      description: "e.g. 'Online MBA in Marketing Management'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "universityName",
      title: "University Name",
      type: "string",
      description: "e.g. 'Amity University Online'",
    }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: ["Online", "Distance", "Online + Distance", "Blended"],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. '2 Years' or '18 Months'",
    }),
    defineField({
      name: "fees",
      title: "Fees (display)",
      type: "string",
      description: "Shown on the card — e.g. '₹80,000 – ₹1,20,000'",
    }),
    defineField({
      name: "feeCategory",
      title: "Fee Range (for filter)",
      type: "string",
      options: {
        list: ["Under ₹1L", "₹1L – ₹2L", "₹2L – ₹3L", "₹3L – ₹5L", "₹5L+"],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Used to power the fee filter on landing pages.",
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility",
      type: "string",
      description: "e.g. 'Graduation in any stream | Min. 50% marks'",
    }),
    defineField({
      name: "badge",
      title: "Badge (optional)",
      type: "string",
      description: "e.g. 'Top Pick' or 'Most Popular'",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (highlighted card)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "courseName", subtitle: "universityName", media: "universityLogo" },
  },
});
