import { defineType, defineField } from "sanity";

export default defineType({
  name: "landingPages",
  title: "Landing Pages",
  type: "document",
  fields: [
    // ── Page Type ──────────────────────────────────────────────────────
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
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
      description: "Page URL will be /[slug]",
    }),

    // ── Urgency Banner ─────────────────────────────────────────────────
    defineField({
      name: "urgencyBanner",
      title: "Urgency Banner (optional)",
      type: "object",
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
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── Show Full Site Header ──────────────────────────────────────────
    defineField({
      name: "showFullHeader",
      title: "Show Full Site Header",
      type: "boolean",
      description:
        "OFF (default) = stripped header with logo + phone + CTA only. ON = full site navigation.",
      initialValue: false,
    }),

    // ── Hero — Option 1 ────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section — Option 1",
      type: "object",
      description: "Eyebrow + headline + highlight callout + byline, with an optional sidebar goal card.",
      fields: [
        defineField({
          name: "show",
          title: "Show This Hero (Option 1)",
          type: "boolean",
          initialValue: true,
          description: "Only one hero option should be ON at a time.",
          validation: (R) =>
            R.custom((value, context) => {
              const doc = context.document as { heroOption2?: { show?: boolean }; heroOption3?: { show?: boolean } } | undefined;
              if (value !== false && (doc?.heroOption2?.show === true || doc?.heroOption3?.show === true)) {
                return "Another hero option is also turned ON below. Turn one of them OFF — only one hero can be active.";
              }
              return true;
            }).warning(),
        }),
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Small label above the headline, e.g. 'Study in India · Online MBA in Marketing'",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (R) => R.required(),
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "calloutText",
          title: "Highlight Callout",
          type: "text",
          rows: 3,
          description: "Short answer-first summary shown in a highlighted box below the headline.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Body paragraph below the highlight callout.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "updatedLabel",
          title: "Updated Label",
          type: "string",
          description: "e.g. 'Updated July 2026'. Leave blank to hide.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "reviewerName",
          title: "Reviewer Name (optional)",
          type: "string",
          description: "Leave blank to credit the role only, e.g. just 'CollegeNCourses Senior Counsellor'.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "reviewerRole",
          title: "Reviewer Role",
          type: "string",
          initialValue: "CollegeNCourses Senior Counsellor",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "approverName",
          title: "Approver Name",
          type: "string",
          initialValue: "Nikhita Pradeep Deshmukh",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "approverRole",
          title: "Approver Role",
          type: "string",
          initialValue: "Founder",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Get Free Counselling",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Label (optional)",
          type: "string",
          description: "Outlined button next to the primary CTA. Scrolls down to the card grid. Leave blank to hide.",
          initialValue: "View Programmes",
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── Hero — Option 2 ────────────────────────────────────────────────
    defineField({
      name: "heroOption2",
      title: "Hero Section — Option 2",
      type: "object",
      description: "Simple full-bleed banner: eyebrow badge, headline, subheadline, dual CTA, optional right-side image.",
      fields: [
        defineField({
          name: "show",
          title: "Show This Hero (Option 2)",
          type: "boolean",
          initialValue: false,
          description: "Only one hero option should be ON at a time.",
          validation: (R) =>
            R.custom((value, context) => {
              const doc = context.document as { hero?: { show?: boolean }; heroOption3?: { show?: boolean } } | undefined;
              if (value === true && (doc?.hero?.show !== false || doc?.heroOption3?.show === true)) {
                return "Another hero option is also ON. Turn the others OFF — only one hero can be active.";
              }
              return true;
            }).warning(),
        }),
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "e.g. '150+ Programmes'",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "subheadline",
          title: "Sub-headline",
          type: "text",
          rows: 2,
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "image",
          title: "Right-side Image (optional)",
          type: "image",
          options: { hotspot: true },
          description: "Shown in the empty space to the right of the text on desktop.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Get Free Counselling",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Label (optional)",
          type: "string",
          description: "Outlined button next to the primary CTA. Opens the lead form. Leave blank to hide.",
          initialValue: "Download Brochure",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "buttonColor",
          title: "Primary Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "fontColor",
          title: "Font Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Headline and sub-headline text color. Defaults to ivory/white if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
      ],
    }),

    // ── Hero — Option 3 ────────────────────────────────────────────────
    defineField({
      name: "heroOption3",
      title: "Hero Section — Option 3",
      type: "object",
      description: "Same layout as Option 2 (eyebrow badge, headline, subheadline, dual CTA, optional right-side image) — a second preset you can configure independently.",
      fields: [
        defineField({
          name: "show",
          title: "Show This Hero (Option 3)",
          type: "boolean",
          initialValue: false,
          description: "Only one hero option should be ON at a time.",
          validation: (R) =>
            R.custom((value, context) => {
              const doc = context.document as { hero?: { show?: boolean }; heroOption2?: { show?: boolean } } | undefined;
              if (value === true && (doc?.hero?.show !== false || doc?.heroOption2?.show === true)) {
                return "Another hero option is also ON. Turn the others OFF — only one hero can be active.";
              }
              return true;
            }).warning(),
        }),
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "e.g. '200+ Verified Programmes'",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "subheadline",
          title: "Sub-headline",
          type: "text",
          rows: 2,
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "image",
          title: "Right-side Image (optional)",
          type: "image",
          options: { hotspot: true },
          description: "Shown in the empty space to the right of the text on desktop.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Get Free Counselling",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Label (optional)",
          type: "string",
          description: "Outlined button next to the primary CTA. Opens the lead form. Leave blank to hide.",
          initialValue: "Download Brochure",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "buttonColor",
          title: "Primary Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
        defineField({
          name: "fontColor",
          title: "Font Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Headline and sub-headline text color. Defaults to ivory/white if not set.",
          hidden: ({ parent }) => parent?.show !== true,
        }),
      ],
    }),

    // ── Hero Sidebar Card ────────────────────────────────────────────
    defineField({
      name: "heroSidebarCard",
      title: "Hero Sidebar Card",
      type: "object",
      description: "Sticky quick-enquiry card shown beside the hero on desktop. Only used with Hero Section — Option 1.",
      fields: [
        defineField({
          name: "show",
          title: "Show Sidebar Card",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Find the right programme for your goal",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "subtext",
          title: "Sub-text",
          type: "string",
          initialValue: "Free. Takes 2 minutes.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "stats",
          title: "Stat Rows",
          type: "array",
          hidden: ({ parent }) => parent?.show === false,
          of: [{
            type: "object",
            name: "heroStatItem",
            title: "Stat Row",
            fields: [
              defineField({ name: "label", title: "Label", type: "string", description: "e.g. 'Typical fee range'", validation: (R) => R.required() }),
              defineField({ name: "value", title: "Value", type: "string", description: "e.g. 'Rs 1.1L to Rs 2.8L'", validation: (R) => R.required() }),
            ],
            preview: { select: { title: "label", subtitle: "value" } },
          }],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Get Free Guidance",
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── Highlight Banner ─────────────────────────────────────────────
    defineField({
      name: "highlightBanner",
      title: "Highlight Banner",
      type: "object",
      description: "Full-width banner with a headline, two-tone sub-text, two-column bullet points, and a CTA button.",
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
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "leadText",
          title: "Lead Text",
          type: "text",
          rows: 2,
          description: "First part of the sub-heading, e.g. 'Are You Looking For The Best Online/Distance MBA Colleges In India?'",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "highlightText",
          title: "Highlight Text",
          type: "text",
          rows: 2,
          description: "Second part of the sub-heading, shown in the accent color set below.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "leftPoints",
          title: "Left Column Bullet Points",
          type: "array",
          of: [{ type: "string" }],
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "rightPoints",
          title: "Right Column Bullet Points",
          type: "array",
          of: [{ type: "string" }],
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Get Free Career Counseling",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "headlineColor",
          title: "Headline Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "accentTextColor",
          title: "Highlight Text Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Color of the Highlight Text sentence above. Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "ctaButtonColor",
          title: "CTA Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Background color of the CTA button. Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── University Logos ──────────────────────────────────────────────
    defineField({
      name: "universityLogos",
      title: "University Logos",
      type: "object",
      description: "Headline + grid of university logos + CTA button.",
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
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          hidden: ({ parent }) => parent?.show === false,
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
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to ivory if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "headlineColor",
          title: "Headline Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Defaults to navy if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "ctaButtonColor",
          title: "CTA Button Color",
          type: "color",
          options: { disableAlpha: true },
          description: "Background color of the CTA button. Defaults to yellow if not set.",
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── Cards ──────────────────────────────────────────────────────────
    defineField({
      name: "courseItems",
      title: "Course Cards",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "courseCard" }],
        options: {
          filter: ({ document }: { document: Record<string, unknown> }) => {
            const items = Array.isArray(document?.courseItems)
              ? (document.courseItems as Array<Record<string, unknown>>)
              : [];
            const usedIds = items
              .filter((item) => typeof item._ref === "string")
              .map((item) => item._ref as string);
            if (!usedIds.length) return { filter: "true", params: {} };
            return { filter: "!(_id in $usedIds)", params: { usedIds } };
          },
        },
      }],
      description: "Select and reorder course cards. Drag to change display order.",
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

    // ── Icon Feature Strip ───────────────────────────────────────────
    defineField({
      name: "iconStrip",
      title: "Icon Feature Strip",
      type: "object",
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
          hidden: ({ parent }) => parent?.show === false,
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
      fields: [
        defineField({
          name: "show",
          title: "Show Placement Stats Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", description: "e.g. 'Placements In Distance MBA'", hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "heading", title: "Heading", type: "string", hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2, hidden: ({ parent }) => parent?.show === false }),
        defineField({
          name: "stats",
          title: "Stat Cards",
          type: "array",
          hidden: ({ parent }) => parent?.show === false,
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
      fields: [
        defineField({
          name: "show",
          title: "Show How We Help Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "heading", title: "Heading", type: "string", hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "subheading", title: "Sub-heading", type: "text", rows: 2, hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "leftPoints", title: "Left Column Bullet Points", type: "array", of: [{ type: "string" }], hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "rightPoints", title: "Right Column Bullet Points", type: "array", of: [{ type: "string" }], hidden: ({ parent }) => parent?.show === false }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Get Free Career Counseling", hidden: ({ parent }) => parent?.show === false }),
      ],
    }),

    // ── FAQs ────────────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "object",
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
          hidden: ({ parent }) => parent?.show === false,
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

    // ── About This Page ──────────────────────────────────────────────
    defineField({
      name: "aboutThisPage",
      title: "About This Page",
      type: "object",
      description: "E-E-A-T credibility card shown near the bottom of the page — who wrote, reviewed, and approved it.",
      fields: [
        defineField({
          name: "show",
          title: "Show About This Page Section",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "About This Page",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Who wrote and reviewed this page",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "writtenBy",
          title: "Written By",
          type: "object",
          hidden: ({ parent }) => parent?.show === false,
          fields: [
            defineField({ name: "name", title: "Name", type: "string", initialValue: "CollegeNCourses Editorial Team" }),
            defineField({ name: "role", title: "Role", type: "string", initialValue: "Content Lead, CollegeNCourses Editorial Desk" }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 2,
              initialValue: "Our editorial team tracks fees, approvals, and batch timelines for online MBA programmes across UGC-DEB approved private universities.",
            }),
          ],
        }),
        defineField({
          name: "reviewedBy",
          title: "Reviewed By",
          type: "object",
          hidden: ({ parent }) => parent?.show === false,
          fields: [
            defineField({ name: "name", title: "Name", type: "string", initialValue: "CollegeNCourses Senior Counsellor" }),
            defineField({ name: "role", title: "Role", type: "string", initialValue: "Senior Counsellor, CollegeNCourses" }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 2,
              initialValue: "Our reviewing counsellor has advised working professionals across Distance, Online, and Executive MBA modes.",
            }),
          ],
        }),
        defineField({
          name: "approvedBy",
          title: "Approved By",
          type: "object",
          hidden: ({ parent }) => parent?.show === false,
          fields: [
            defineField({ name: "name", title: "Name", type: "string", initialValue: "Nikhita Pradeep Deshmukh" }),
            defineField({ name: "role", title: "Role", type: "string", initialValue: "Founder, Dnyanal Educon Pvt Ltd" }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 2,
              initialValue: "Founder of CollegeNCourses.",
            }),
          ],
        }),
      ],
    }),

    // ── CTA band ─────────────────────────────────────────────────────
    defineField({
      name: "ctaBand",
      title: "Bottom CTA Band",
      type: "object",
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
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "body",
          type: "text",
          rows: 2,
          initialValue:
            "Our AI Counsellor recommends three programmes matched to your situation, budget, and timeline.",
          hidden: ({ parent }) => parent?.show === false,
        }),
        defineField({
          name: "ctaLabel",
          type: "string",
          initialValue: "Get Free Guidance",
          hidden: ({ parent }) => parent?.show === false,
        }),
      ],
    }),

    // ── Show Footer ─────────────────────────────────────────────────
    defineField({
      name: "showFooter",
      title: "Show Footer",
      type: "boolean",
      initialValue: false,
    }),

    // ── SEO ──────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
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
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
