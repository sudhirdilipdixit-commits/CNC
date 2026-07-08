import { defineType, defineField } from "sanity";

export default defineType({
  name: "specializationDetail",
  title: "Specialization Detail Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "overview", title: "Overview" },
    { name: "careers", title: "Career Outcomes" },
    { name: "universities", title: "Universities" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA Band" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
      description: "e.g. 'marketing' → /specializations-guide/marketing",
    }),

    /* ── Hero ────────────────────────────────────────────── */
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "MBA SPECIALIZATION GUIDE" }),
        defineField({ name: "heading", title: "Heading (H1)", type: "string", validation: (R) => R.required() }),
        defineField({ name: "lede", title: "Lede (intro paragraph)", type: "text", rows: 3 }),
        defineField({
          name: "heroStats",
          title: "Hero Stats (pills below lede)",
          type: "array",
          of: [{
            type: "object",
            name: "heroStat",
            fields: [
              defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
              defineField({ name: "value", title: "Value", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
            preview: { select: { title: "value", subtitle: "label" } },
          }],
        }),
        defineField({
          name: "softCta",
          title: "Soft CTA Bar",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
            defineField({ name: "buttonLabel", title: "Button Label", type: "string", initialValue: "Try the AI Counsellor" }),
          ],
        }),
      ],
    }),

    /* ── Overview ────────────────────────────────────────── */
    defineField({
      name: "overview",
      title: "Overview Section (The Specialization)",
      type: "object",
      group: "overview",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "THE SPECIALIZATION" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 8,
          description: "Separate paragraphs with a blank line.",
        }),
        defineField({
          name: "skills",
          title: "Skills Grid",
          type: "array",
          of: [{
            type: "object",
            name: "skill",
            fields: [
              defineField({ name: "name", title: "Skill Name", type: "string", validation: (R) => R.required() }),
              defineField({ name: "isNew", title: "New in 2026?", type: "boolean", initialValue: false }),
            ],
            preview: { select: { title: "name" } },
          }],
        }),
        defineField({
          name: "infoCard",
          title: "Info Card (callout box)",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "body", title: "Card Body", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),

    /* ── Career Outcomes ─────────────────────────────────── */
    defineField({
      name: "careerOutcomes",
      title: "Career Outcomes Section",
      type: "object",
      group: "careers",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "CAREER OUTCOMES" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "careers",
          title: "Career Cards",
          type: "array",
          of: [{
            type: "object",
            name: "careerCard",
            title: "Career",
            fields: [
              defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
              defineField({ name: "role", title: "Role / Title", type: "string", validation: (R) => R.required() }),
              defineField({ name: "industries", title: "Industries / Sectors", type: "string" }),
              defineField({ name: "salaryRange", title: "Salary Range (e.g. ₹8–14 L)", type: "string" }),
            ],
            preview: { select: { title: "role", subtitle: "salaryRange" } },
          }],
        }),
        defineField({ name: "sourceNote", title: "Source Note (below grid)", type: "string" }),
      ],
    }),

    /* ── Editorial CTA ───────────────────────────────────── */
    defineField({
      name: "editorialCta",
      title: "Editorial CTA Block (between Career and Universities)",
      type: "object",
      group: "careers",
      fields: [
        defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
        defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
        defineField({ name: "linkHref", title: "Link URL", type: "string" }),
      ],
    }),

    /* ── Universities ────────────────────────────────────── */
    defineField({
      name: "universities",
      title: "Top Universities Section",
      type: "object",
      group: "universities",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "TOP UNIVERSITIES" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "items",
          title: "University Rows",
          type: "array",
          of: [{
            type: "object",
            name: "uniRow",
            title: "University",
            fields: [
              defineField({ name: "rank", title: "Rank", type: "number" }),
              defineField({ name: "name", title: "University Name", type: "string", validation: (R) => R.required() }),
              defineField({ name: "programme", title: "Programme Name", type: "string" }),
              defineField({
                name: "accreditations",
                title: "Accreditation Tags",
                description: "e.g. UGC-DEB, NAAC A++, WES",
                type: "array",
                of: [{ type: "string" }],
              }),
              defineField({ name: "fee", title: "Fee (e.g. ₹1.8 L)", type: "string" }),
              defineField({ name: "detailsHref", title: "Details URL", type: "string" }),
            ],
            preview: { select: { title: "name", subtitle: "programme" } },
          }],
        }),
        defineField({ name: "seeAllLabel", title: "See All Link Label", type: "string" }),
        defineField({ name: "seeAllHref", title: "See All Link URL", type: "string" }),
      ],
    }),

    /* ── FAQs ────────────────────────────────────────────── */
    defineField({
      name: "faqsHeading",
      title: "FAQs Section Heading",
      type: "string",
      group: "faqs",
      initialValue: "Frequently Asked Questions",
    }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      group: "faqs",
      of: [{
        type: "object",
        name: "faqItem",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),

    /* ── CTA Band ────────────────────────────────────────── */
    defineField({
      name: "ctaBand",
      title: "CTA Band",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
        defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string", initialValue: "Try the AI Counsellor" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string", initialValue: "Talk to a Counsellor" }),
        defineField({ name: "secondaryCtaHref", title: "Secondary CTA URL", type: "string", initialValue: "tel:+917350460393" }),
      ],
    }),

    /* ── SEO ─────────────────────────────────────────────── */
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
        defineField({ name: "noIndex", title: "No Index", type: "boolean", initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? "Untitled", subtitle: subtitle ? `/specializations-guide/${subtitle}` : "" };
    },
  },
});
