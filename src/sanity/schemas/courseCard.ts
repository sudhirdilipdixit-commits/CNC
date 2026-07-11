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
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string", description: "Describe the logo for screen readers and SEO, e.g. 'Amity University Online logo'" }),
        defineField({ name: "title", title: "Title", type: "string", description: "Tooltip shown on hover" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2, description: "Optional longer description for accessibility" }),
      ],
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
        list: ["Under 1 Lakh", "1-2 Lakh", "2-3 Lakh", "3-5 Lakh", "5+ Lakh"],
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

    // ── AI Counsellor wizard scoring fields ─────────────────────────────────
    defineField({
      name: "aiMode",
      title: "AI Wizard: Mode",
      type: "string",
      options: {
        list: [
          { title: "Fully Online", value: "online" },
          { title: "Online + Weekend Classes", value: "online_weekend" },
          { title: "Distance / Self-paced", value: "distance" },
          { title: "Executive / Hybrid", value: "executive" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Maps to Q4 in the AI Counsellor wizard. Set this to make the course appear in AI recommendations.",
    }),
    defineField({
      name: "aiFeeBand",
      title: "AI Wizard: Fee Band",
      type: "string",
      options: {
        list: [
          { title: "Under ₹1 Lakh", value: "u1" },
          { title: "₹1–2 Lakh", value: "1-2" },
          { title: "₹2–5 Lakh", value: "2-5" },
          { title: "₹5 Lakh+", value: "5plus" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Maps to Q3 in the AI Counsellor wizard.",
    }),
    defineField({
      name: "specializations",
      title: "AI Wizard: Specializations",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Marketing & Digital", value: "marketing" },
          { title: "Finance / Banking", value: "finance" },
          { title: "Human Resources (HR)", value: "hr" },
          { title: "Operations & Supply Chain", value: "operations" },
          { title: "IT & Project Management", value: "it" },
          { title: "Healthcare Management", value: "healthcare" },
          { title: "General / Executive MBA", value: "general" },
        ],
        layout: "grid",
      },
      description: "Maps to Q5. Select all specializations this programme offers.",
    }),
    defineField({
      name: "targetProfiles",
      title: "AI Wizard: Target Profiles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Working Professional (3+ yrs)", value: "working_professional" },
          { title: "Recent Graduate", value: "graduate" },
          { title: "Business Owner / Entrepreneur", value: "entrepreneur" },
          { title: "Career Break", value: "career_break" },
        ],
        layout: "grid",
      },
      description: "Maps to Q1. Select all profiles this programme suits.",
    }),
    defineField({
      name: "studyHours",
      title: "AI Wizard: Study Hours",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Up to 5h/week", value: "very_limited" },
          { title: "5–10h/week", value: "manageable" },
          { title: "10–15h/week", value: "committed" },
          { title: "15h+/week", value: "intensive" },
        ],
        layout: "grid",
      },
      description: "Maps to Q2. Select all time bands this programme is feasible for.",
    }),
    defineField({
      name: "careerGoals",
      title: "AI Wizard: Career Goals",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Get promoted in current role", value: "promotion" },
          { title: "Switch industries / function", value: "switch" },
          { title: "Start or scale a business", value: "business" },
          { title: "Higher salary", value: "salary" },
        ],
        layout: "grid",
      },
      description: "Maps to Q6. Select all goals this programme aligns with.",
    }),
    defineField({
      name: "accreditations",
      title: "AI Wizard: Accreditations",
      type: "array",
      of: [{ type: "string" }],
      description: "Displayed as tags on the AI result card. e.g. UGC-DEB, AICTE, NAAC A++",
    }),
    defineField({
      name: "nextBatch",
      title: "AI Wizard: Next Batch",
      type: "string",
      description: "Displayed on the AI result card. e.g. 'Jul 2026' or 'Quarterly'",
    }),
  ],
  preview: {
    select: { title: "courseName", subtitle: "universityName", media: "universityLogo" },
  },
});
