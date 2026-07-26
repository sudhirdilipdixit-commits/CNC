import { defineType, defineField } from "sanity";

export default defineType({
  name: "aiCounsellorSuggestion",
  title: "AI Counsellor Suggestion",
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
      ],
    }),
    defineField({
      name: "courseName",
      title: "Course Name",
      type: "string",
      description: "e.g. 'Online MBA in Marketing'",
      validation: (R) => R.required(),
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
        list: [
          { title: "Fully Online", value: "online" },
          { title: "Online with Weekend Classes", value: "online_weekend" },
          { title: "Distance", value: "distance" },
          { title: "Executive / Hybrid", value: "executive" },
        ],
        layout: "radio",
      },
      description: "Must match one of these exact values — the wizard's mode question scores against this.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. '24 months'",
    }),
    defineField({
      name: "fees",
      title: "Fees (display)",
      type: "string",
      description: "Shown on the card — e.g. 'Rs 1.8 L'",
    }),
    defineField({
      name: "feeBand",
      title: "Fee Band (for scoring)",
      type: "string",
      options: {
        list: [
          { title: "Under Rs 1 lakh", value: "u1" },
          { title: "Rs 1 to 2 lakh", value: "1-2" },
          { title: "Rs 2 to 5 lakh", value: "2-5" },
          { title: "Rs 5 lakh and above", value: "5plus" },
        ],
        layout: "radio",
      },
      description: "Which budget band this programme's fee falls into. Used to score against the wizard's budget question.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "nextBatch",
      title: "Next Batch",
      type: "string",
      description: "e.g. 'Sep 2026', 'Quarterly', or 'Rolling'",
    }),
    defineField({
      name: "accreditations",
      title: "Accreditations",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. UGC-DEB, AICTE, NAAC A++",
    }),
    defineField({
      name: "specializations",
      title: "Specializations",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Marketing & Digital", value: "marketing" },
          { title: "Finance / Banking", value: "finance" },
          { title: "Human Resources", value: "hr" },
          { title: "Operations & Supply Chain", value: "operations" },
          { title: "IT & Project Management", value: "it" },
          { title: "Healthcare Management", value: "healthcare" },
          { title: "General / Executive", value: "general" },
        ],
      },
      description: "Which specialization(s) this programme matches on the wizard's specialization question.",
    }),
    defineField({
      name: "targetProfiles",
      title: "Target Profiles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Working Professional", value: "working_professional" },
          { title: "Recent Graduate", value: "graduate" },
          { title: "Business Owner", value: "entrepreneur" },
          { title: "Career Break", value: "career_break" },
        ],
      },
      description: "Which 'current situation' answers this programme is a good fit for.",
    }),
    defineField({
      name: "studyHours",
      title: "Study Hours Fit",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Up to 5 hours/week", value: "very_limited" },
          { title: "5 to 10 hours/week", value: "manageable" },
          { title: "10 to 15 hours/week", value: "committed" },
          { title: "15+ hours/week", value: "intensive" },
        ],
      },
      description: "Which weekly time-commitment answers this programme suits.",
    }),
    defineField({
      name: "careerGoals",
      title: "Career Goals",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Get promoted in current role", value: "promotion" },
          { title: "Switch industries", value: "switch" },
          { title: "Start or scale a business", value: "business" },
          { title: "Higher salary", value: "salary" },
        ],
      },
      description: "Which primary-goal answers this programme supports.",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (tie-break priority)",
      type: "boolean",
      initialValue: false,
      description: "Featured suggestions are preferred when programmes tie on score.",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers sort first among featured suggestions.",
    }),
  ],
  preview: {
    select: { title: "courseName", subtitle: "universityName", media: "universityLogo" },
  },
});
