import { defineType, defineField } from "sanity";

export default defineType({
  name: "resourceDetail",
  title: "Resource Detail Page",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "internalName" },
      validation: (R) => R.required(),
      description: "URL path: /resources/[slug]. Must match the href on the Resource Item hub card.",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "e.g. 'FREE GUIDE · 2026 EDITION'",
    }),
    defineField({
      name: "headline",
      title: "Headline (H1)",
      type: "text",
      rows: 2,
      validation: (R) => R.required(),
      description: "Main headline of the page",
    }),
    defineField({
      name: "lede",
      title: "Lede (subtitle paragraph)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "string",
      description: "e.g. '12,400+' — shown in social proof bar",
    }),
    defineField({
      name: "ratingText",
      title: "Rating Text",
      type: "string",
      description: "e.g. '4.9 rating from readers'",
    }),
    defineField({
      name: "checklistItems",
      title: "What's Inside (checklist)",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points listing what's in the guide. 5–6 items recommended.",
    }),
    defineField({
      name: "freshnessNote",
      title: "Freshness Note",
      type: "string",
      description: "e.g. 'Last updated: April 2026. Cross-checked against UGC-DEB current list.'",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 2 }),
            defineField({
              name: "attribution",
              title: "Attribution",
              type: "string",
              description: "e.g. 'Vikram, working professional, Bangalore'",
            }),
          ],
          preview: {
            select: { title: "attribution", subtitle: "quote" },
          },
        },
      ],
    }),

    // ── Form fields ─────────────────────────────────────────────────────────
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
      initialValue: "Get the Guide. Free.",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Subtitle",
      type: "string",
      initialValue: "In your inbox in 60 seconds. No spam.",
    }),
    defineField({
      name: "formFooterNote",
      title: "Form Footer Note",
      type: "string",
      initialValue: "No call unless you ask for one. Seriously.",
    }),

    // ── Guide meta ──────────────────────────────────────────────────────────
    defineField({
      name: "pageCount",
      title: "Page Count",
      type: "number",
      description: "e.g. 48 — shown on the post-submit success card",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "string",
      description: "e.g. 'April 2026'",
    }),
    defineField({
      name: "pdfName",
      title: "PDF Display Name",
      type: "string",
      description: "Shown on the post-submit card. e.g. 'Top 10 Online MBA Guide 2026-27'",
    }),
    defineField({
      name: "pdfDownloadUrl",
      title: "PDF Download URL",
      type: "string",
      description: "Direct URL for the download button. Leave blank to send via email only.",
    }),

    // ── After download steps ────────────────────────────────────────────────
    defineField({
      name: "afterSteps",
      title: "After Download Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepLabel", title: "Step Label", type: "string", description: "e.g. '01'" }),
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "body", title: "Step Body", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "stepLabel" },
          },
        },
      ],
      initialValue: [
        { stepLabel: "01", title: "Guide in your inbox", body: "Within 60 seconds. Check spam if not there within 2 minutes." },
        { stepLabel: "02", title: "One follow-up email", body: "In 3 days, with questions other aspirants asked us after reading. Unsubscribe in one click." },
        { stepLabel: "03", title: "No call unless you ask", body: "If you want to talk to a counsellor, reply to the email or use the contact form." },
      ],
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({ name: "description", title: "SEO Description", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: "internalName", subtitle: "headline" },
  },
});
