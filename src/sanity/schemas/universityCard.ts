import { defineType, defineField } from "sanity";

export default defineType({
  name: "universityCard",
  title: "University Card",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      description: "Used in Sanity only — e.g. 'Amity Online MBA 2026'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "universityLogo",
      title: "University Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "universityName",
      title: "University Name",
      type: "string",
      description: "e.g. 'Amity University Online'",
      validation: (R) => R.required(),
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
      description: "e.g. '2 Years'",
    }),
    defineField({
      name: "approvedBy",
      title: "Approved / Accredited By",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. UGC-DEB, AICTE, NBA, NAAC A++",
    }),
    defineField({
      name: "fees",
      title: "Fees (display)",
      type: "string",
      description: "Shown on the card — e.g. '₹1,20,000/year'",
    }),
    defineField({
      name: "feeCategory",
      title: "Fee Range (for filter)",
      type: "string",
      options: {
        list: ["Under 1 Lakh", "1–2 Lakh", "2–3 Lakh", "3–5 Lakh", "5+ Lakh"],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Used to power the fee filter on landing pages.",
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility",
      type: "string",
      description: "e.g. 'Graduation in any stream | Min. 50%'",
    }),
    defineField({
      name: "badge",
      title: "Badge (optional)",
      type: "string",
      description: "e.g. 'NAAC A++' or 'Top Ranked'",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (highlighted card)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "universityName", subtitle: "internalName", media: "universityLogo" },
  },
});
