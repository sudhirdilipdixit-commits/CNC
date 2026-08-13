import { defineType, defineField } from "sanity";

export default defineType({
  name: "landingPages",
  title: "Landing Pages",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display Settings" },
    { name: "cards", title: "Cards" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Page Type — ungrouped so it floats above all tabs ────────────
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      description: "Controls which card type is shown.",
      options: {
        list: [
          { title: "Course / Programme Grid", value: "course" },
          { title: "University Grid", value: "university" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "course",
      validation: (R) => R.required(),
    }),

    // ── Internal ─────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "Used in Sanity only. e.g. 'Marketing MBA – Google Ads – Jun 2026'",
      validation: (R) => R.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
      description: "Page URL will be /[slug]",
      group: "content",
    }),
    defineField({
      name: "campaign",
      title: "Campaign / Channel",
      type: "string",
      options: {
        list: [
          "Google Ads",
          "Meta Ads",
          "Email",
          "WhatsApp",
          "Organic",
          "Partner",
        ],
      },
      group: "content",
    }),

    // ── Hero ─────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (R) => R.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Sub-headline",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Get Free Counselling",
        }),
      ],
    }),

    // ── Highlight Banner ─────────────────────────────────────────────
    defineField({
      name: "highlightBanner",
      title: "Highlight Banner",
      type: "object",
      description: "Full-width banner with a headline, two-tone sub-text, two-column bullet points, and a CTA button.",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show Highlight Banner",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "e.g. 'Top 10 Online/Distance MBA Colleges/Universities'",
        }),
        defineField({
          name: "leadText",
          title: "Lead Text",
          type: "text",
          rows: 2,
          description: "First part of the sub-heading, e.g. 'Are You Looking For The Best Online/Distance MBA Colleges In India?'",
        }),
        defineField({
          name: "highlightText",
          title: "Highlight Text",
          type: "text",
          rows: 2,
          description: "Second part of the sub-heading, shown in the accent color set below.",
        }),
        defineField({
          name: "leftPoints",
          title: "Left Column Bullet Points",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "rightPoints",
          title: "Right Column Bullet Points",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Get Free Career Counseling",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
        }),
        defineField({
          name: "headlineColor",
          title: "Headline Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to yellow if not set.",
        }),
        defineField({
          name: "accentTextColor",
          title: "Highlight Text Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Color of the Highlight Text sentence above. Defaults to yellow if not set.",
        }),
        defineField({
          name: "ctaButtonColor",
          title: "CTA Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Background color of the CTA button. Defaults to yellow if not set.",
        }),
      ],
    }),

    // ── University Logos ──────────────────────────────────────────────
    defineField({
      name: "universityLogos",
      title: "University Logos",
      type: "object",
      description: "Headline + grid of university logos + CTA button.",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show University Logos Section",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "e.g. 'Only Choose The Best Govt. Approved Indian Universities For Online/Distance MBA'",
        }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [{
            type: "object",
            name: "universityLogoItem",
            title: "Logo",
            fields: [
              defineField({ name: "logo", title: "Logo Image", type: "image", validation: (R) => R.required() }),
              defineField({ name: "name", title: "University Name", type: "string", description: "Used for alt text." }),
            ],
            preview: { select: { title: "name", media: "logo" } },
          }],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Enquire Now",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to ivory if not set.",
        }),
        defineField({
          name: "headlineColor",
          title: "Headline Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
        }),
        defineField({
          name: "ctaButtonColor",
          title: "CTA Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Background color of the CTA button. Defaults to yellow if not set.",
        }),
      ],
    }),

    // ── Display Settings ─────────────────────────────────────────────
    defineField({
      name: "urgencyBanner",
      title: "Urgency Banner (optional)",
      type: "object",
      group: "display",
      fields: [
        defineField({
          name: "show",
          title: "Show Urgency Banner",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "text",
          title: "Banner Text",
          type: "string",
          description:
            "Yellow strip above header. e.g. 'Mar 2026 batch closing — only 23 seats remaining at Symbiosis.'",
        }),
      ],
    }),
    defineField({
      name: "showFullHeader",
      title: "Show Full Site Header",
      type: "boolean",
      description:
        "OFF (default) = stripped header with logo + phone + CTA only. ON = full site navigation.",
      initialValue: false,
      group: "display",
    }),
    defineField({
      name: "showFooter",
      title: "Show Footer",
      type: "boolean",
      initialValue: false,
      group: "display",
    }),

    // ── Cards ──────────────────────────────────────────────────────────
    defineField({
      name: "universityItems",
      title: "University Cards",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "universityCard" }],
        options: {
          filter: ({ document }: { document: Record<string, unknown> }) => {
            const items = Array.isArray(document?.universityItems)
              ? (document.universityItems as Array<Record<string, unknown>>)
              : [];
            const usedIds = items
              .filter((item) => typeof item._ref === "string")
              .map((item) => item._ref as string);
            if (!usedIds.length) return { filter: "true", params: {} };
            return { filter: "!(_id in $usedIds)", params: { usedIds } };
          },
        },
      }],
      description: "Select and reorder university cards. Drag to change display order.",
      group: "cards",
      validation: (R) =>
        R.custom((items?: Array<{ _ref: string }>) => {
          if (!items || items.length === 0) return true;
          const seen = new Set<string>();
          for (const item of items) {
            if (seen.has(item._ref)) return "Each university card can only be added once.";
            seen.add(item._ref);
          }
          return true;
        }),
    }),

    // ── Icon Feature Strip ───────────────────────────────────────────
    defineField({
      name: "iconStrip",
      title: "Icon Feature Strip",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show Icon Feature Strip",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "items",
          title: "Items (max 6)",
          type: "array",
          of: [{
            type: "object",
            name: "iconStripItem",
            title: "Item",
            fields: [
              defineField({ name: "icon", title: "Icon Image", type: "image" }),
              defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
            ],
            preview: { select: { title: "label", media: "icon" } },
          }],
        }),
      ],
    }),

    // ── Placement Stats ──────────────────────────────────────────────
    defineField({
      name: "placementStats",
      title: "Placement Stats Section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show Placement Stats Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", description: "e.g. 'Placements In Distance MBA'" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({
          name: "stats",
          title: "Stat Cards",
          type: "array",
          of: [{
            type: "object",
            name: "statItem",
            title: "Stat",
            fields: [
              defineField({ name: "value", title: "Value", type: "string", description: "e.g. '50%' or '25K+'", validation: (R) => R.required() }),
              defineField({ name: "label", title: "Label", type: "string", description: "e.g. 'Average Salary Hike'", validation: (R) => R.required() }),
            ],
            preview: { select: { title: "value", subtitle: "label" } },
          }],
        }),
      ],
    }),

    // ── How We Help ─────────────────────────────────────────────────
    defineField({
      name: "howWeHelp",
      title: "How We Help Section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show How We Help Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Sub-heading", type: "text", rows: 2 }),
        defineField({ name: "leftPoints", title: "Left Column Bullet Points", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "rightPoints", title: "Right Column Bullet Points", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Get Free Career Counseling" }),
      ],
    }),

    // ── CTA band ─────────────────────────────────────────────────────
    defineField({
      name: "ctaBand",
      title: "Bottom CTA Band",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show Bottom CTA Band",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "headline",
          type: "string",
          initialValue: "Get a recommendation in 2 minutes.",
        }),
        defineField({
          name: "body",
          type: "text",
          rows: 2,
          initialValue:
            "Our AI Counsellor recommends three programmes matched to your situation, budget, and timeline.",
        }),
        defineField({
          name: "ctaLabel",
          type: "string",
          initialValue: "Get Free Guidance",
        }),
      ],
    }),

    // ── FAQs ────────────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show FAQs Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "items",
          title: "FAQ Items",
          type: "array",
          description:
            "Add FAQs in any order. Use 'FAQ from Library' for shared questions — edit once and it updates everywhere. Use 'Custom FAQ' for questions unique to this page.",
          of: [
            {
              type: "object",
              name: "faqItem",
              title: "Custom FAQ (this page only)",
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
              ],
              preview: { select: { title: "question" } },
            },
            {
              type: "reference",
              title: "FAQ from Library",
              to: [{ type: "faq" }],
              options: {
                // Already-added FAQs are hidden from the picker so you can't add the same one twice.
                filter: ({ document }: { document: Record<string, unknown> }) => {
                  const faqs = Array.isArray((document?.faqs as Record<string, unknown>)?.items)
                    ? ((document.faqs as Record<string, unknown>).items as Array<Record<string, unknown>>)
                    : [];
                  const usedIds = faqs
                    .filter((item) => item._type === "reference" && typeof item._ref === "string")
                    .map((item) => item._ref as string);
                  if (!usedIds.length) return { filter: "true", params: {} };
                  return { filter: "!(_id in $usedIds)", params: { usedIds } };
                },
              },
            },
          ],
          validation: (R) =>
            R.custom((items?: Array<Record<string, unknown>>) => {
              if (!items) return true;
              const refs = items
                .filter((item) => item._type === "reference" && typeof item._ref === "string")
                .map((item) => item._ref as string);
              const seen = new Set<string>();
              for (const ref of refs) {
                if (seen.has(ref)) return "Each FAQ from Library can only be added once.";
                seen.add(ref);
              }
              return true;
            }),
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({
          name: "noIndex",
          title: "No Index (hide from search engines)",
          type: "boolean",
          initialValue: true,
          description:
            "Landing pages are usually no-indexed to avoid duplicate content. Uncheck only for SEO-targeted pages.",
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "campaign" } },
});
