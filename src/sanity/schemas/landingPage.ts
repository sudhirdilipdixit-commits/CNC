import { defineType, defineField } from "sanity";

export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display Settings" },
    { name: "filters", title: "Filters & Grid" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Page Type — ungrouped so it floats above all tabs ────────────
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      description: "Controls which card type is shown and which fields appear in the Filters & Grid tab.",
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

    // ── Display Settings ─────────────────────────────────────────────
    defineField({
      name: "urgencyBanner",
      title: "Urgency Banner (optional)",
      type: "string",
      description:
        "Yellow strip above header. e.g. 'Mar 2026 batch closing — only 23 seats remaining at Symbiosis.'",
      group: "display",
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
    defineField({
      name: "hideSidebar",
      title: "Hide Sidebar (wider cards)",
      type: "boolean",
      initialValue: false,
      description: "Hides the filter sidebar so cards stretch to full width. Filters are disabled when sidebar is hidden.",
      group: "display",
    }),

    // ── Hero ─────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "e.g. '150+ VERIFIED PROGRAMMES'",
        }),
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
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Label",
          type: "string",
          description: "Leave blank to hide.",
        }),
        defineField({
          name: "secondaryCtaHref",
          title: "Secondary CTA URL",
          type: "string",
          description: "e.g. '#programmes' or '/contact-us'",
        }),
      ],
    }),

    // ── Content block (optional — shown between hero and cards) ─────────────
    defineField({
      name: "contentBlock",
      title: "Content Block (below hero)",
      type: "object",
      description: "Optional section shown between the hero and the cards grid. Leave both fields empty to hide.",
      group: "content",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "e.g. 'Why choose an Online MBA?'",
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "Heading 2", value: "h2" },
                { title: "Heading 3", value: "h3" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                  { title: "Underline", value: "underline" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "Link",
                    fields: [
                      defineField({ name: "href", type: "url", title: "URL" }),
                      defineField({ name: "blank", type: "boolean", title: "Open in new tab", initialValue: true }),
                    ],
                  },
                ],
              },
            },
          ],
          description: "Rich text body. Supports headings, bold, italic, bullet/numbered lists, and links.",
        }),
        defineField({
          name: "textAlign",
          title: "Body Text Alignment",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          initialValue: "left",
        }),
      ],
    }),

    // ── Trust points ─────────────────────────────────────────────────
    defineField({
      name: "trustPoints",
      title: "Trust / USP Points",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown below CTAs in the hero. e.g. '2,400+ learners placed since 2023'",
      group: "content",
    }),

    // ── Filters & Grid ───────────────────────────────────────────────
    defineField({
      name: "courseItems",
      title: "Course Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "courseCard" }] }],
      description: "Select and reorder course cards. Drag to change display order.",
      group: "filters",
      hidden: ({ document }) => (document as { pageType?: string })?.pageType === "university",
      validation: (R) =>
        R.custom((items?: Array<{ _ref: string }>) => {
          if (!items || items.length === 0) return true;
          const seen = new Set<string>();
          for (const item of items) {
            if (seen.has(item._ref)) return "Each course card can only be added once.";
            seen.add(item._ref);
          }
          return true;
        }),
    }),
    defineField({
      name: "universityItems",
      title: "University Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "universityCard" }] }],
      description: "Select and reorder university cards. Drag to change display order.",
      group: "filters",
      hidden: ({ document }) => (document as { pageType?: string })?.pageType !== "university",
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
    defineField({
      name: "filterConfig",
      title: "Filter Configuration",
      type: "object",
      description: "Choose which filters to expose on this page.",
      group: "filters",
      fields: [
        defineField({
          name: "showMode",
          title: "Show Mode filter (Online / Distance / etc.)",
          type: "boolean",
          initialValue: true,
          description: "Visible only when cards have two or more distinct mode values.",
        }),
        defineField({
          name: "showDuration",
          title: "Show Duration filter",
          type: "boolean",
          initialValue: true,
          description: "Visible only when cards have two or more distinct duration values.",
        }),
        defineField({
          name: "showFeeRange",
          title: "Show Fee Range filter",
          type: "boolean",
          initialValue: true,
          description: "Visible only when cards have two or more distinct fee range values.",
        }),
      ],
    }),

    // ── Sidebar form ─────────────────────────────────────────────────
    defineField({
      name: "sidebarForm",
      title: "Sidebar Counselling Prompt",
      type: "object",
      description: "Small CTA card shown at the bottom of the left sidebar on desktop.",
      group: "content",
      fields: [
        defineField({
          name: "show",
          title: "Show sidebar CTA",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Need help choosing?",
        }),
        defineField({
          name: "subheading",
          title: "Sub-heading",
          type: "text",
          rows: 2,
          initialValue:
            "Our counsellors match you to the right programme based on your profile and budget.",
        }),
      ],
    }),

    // ── FAQs ────────────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
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
              const faqs = Array.isArray(document?.faqs)
                ? (document.faqs as Array<Record<string, unknown>>)
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
      group: "content",
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

    // ── CTA band ─────────────────────────────────────────────────────
    defineField({
      name: "ctaBand",
      title: "Bottom CTA Band",
      type: "object",
      group: "content",
      fields: [
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
            "Our counsellors recommend three programmes matched to your situation, budget, and timeline.",
        }),
        defineField({
          name: "ctaLabel",
          type: "string",
          initialValue: "Talk to a Counsellor",
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
