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
      description: "Page URL will be /lp/[slug]",
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
      name: "programmeGrid",
      title: "Programme Grid",
      type: "reference",
      to: [{ type: "programmeGrid" }],
      description: "The curated list of programmes to show on this landing page.",
      group: "filters",
    }),
    defineField({
      name: "filterConfig",
      title: "Filter Configuration",
      type: "object",
      description: "Choose which filter dimensions to expose on this page.",
      group: "filters",
      fields: [
        defineField({
          name: "showSpecialization",
          title: "Show Specialization filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showMode",
          title: "Show Mode filter (Online / Distance / etc.)",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showFee",
          title: "Show Fee / Budget filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "feeBrackets",
          title: "Custom Fee Brackets",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Leave empty to use defaults: Under ₹1L / ₹1L–₹2L / ₹2L–₹3L / ₹3L+. Add custom values to override.",
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

    // ── FAQs & Testimonials ──────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
      group: "content",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      group: "content",
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
