import { defineType, defineField } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2 }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (R) => R.warning("Alt text is required for accessibility and image SEO."),
        }),
      ],
    }),
    defineField({ name: "tag", title: "Tag / Category", type: "string" }),
    defineField({ name: "readTime", title: "Read Time (e.g. 6 min read)", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (R) => R.warning("Alt text is required for accessibility and image SEO."),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", type: "image" }),
      ],
    }),

    // ── Phase 2: SEO / E-E-A-T / AEO fields ──────────────────────────────

    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
      description: "Set whenever you make significant content changes. Drives dateModified in Google's rich results.",
    }),
    defineField({
      name: "authorRef",
      title: "Author (linked)",
      type: "reference",
      to: [{ type: "author" }],
      weak: true,
      description: "Link to an Author document for E-E-A-T signals. Preferred over the plain Author text field above.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "blogCategory" }],
      weak: true,
      description: "Primary content category — used as articleSection in search results and for hub pages.",
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
      description: "The single keyword this post targets most. Keep under 60 characters — e.g. 'online MBA fees India 2026'.",
    }),
    defineField({
      name: "keywords",
      title: "Secondary Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" } as { layout: "tags" },
      description: "Additional keywords used in JSON-LD and meta tags. Press Enter after each one.",
    }),
    defineField({
      name: "noIndex",
      title: "Exclude from search engines (noindex)",
      type: "boolean",
      initialValue: false,
      description: "Enable for draft posts or thin content. Adds a noindex meta tag.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs — Answer Engine Optimization",
      type: "array",
      description: "Q&A pairs that appear in Google's People Also Ask boxes and are cited by AI engines (ChatGPT, Perplexity).",
      of: [{
        type: "object",
        name: "faqItem",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
    defineField({
      name: "wordCount",
      title: "Word Count",
      type: "number",
      description: "Auto-set during WordPress migration. Update manually after major rewrites.",
      validation: (R) => R.integer().positive(),
    }),

    // ── Phase 4: GEO / AEO depth fields ──────────────────────────────────

    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Guide / Explainer", value: "guide" },
          { title: "Tutorial — Step-by-step", value: "tutorial" },
          { title: "Listicle", value: "listicle" },
          { title: "Review / Comparison", value: "review" },
          { title: "News / Update", value: "news" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Selects the correct JSON-LD type. Tutorials unlock HowTo rich results; news posts use NewsArticle schema.",
    }),
    defineField({
      name: "about",
      title: "About (Primary Entity)",
      type: "object",
      description: "The main subject of this post. Linking to Wikipedia/Wikidata helps AI engines place your content in their knowledge graph.",
      fields: [
        defineField({ name: "entity", title: "Entity Name", type: "string", description: "e.g. 'Master of Business Administration'" }),
        defineField({ name: "url", title: "Wikipedia or Wikidata URL", type: "url" }),
      ],
    }),
    defineField({
      name: "mentions",
      title: "Mentions (Named Entities)",
      type: "array",
      description: "Universities, exams, regulators, or concepts this post references. Each linked entity strengthens knowledge graph association.",
      of: [{
        type: "object",
        name: "mentionItem",
        fields: [
          defineField({ name: "entity", title: "Entity Name", type: "string", validation: (R) => R.required() }),
          defineField({ name: "url", title: "Wikipedia / Official URL", type: "url" }),
        ],
        preview: { select: { title: "entity", subtitle: "url" } },
      }],
    }),
    defineField({
      name: "howToSteps",
      title: "How-To Steps",
      type: "array",
      description: "Step-by-step instructions for Tutorial posts. Generates HowTo rich results in Google SERPs — numbered steps shown directly in search.",
      of: [{
        type: "object",
        name: "howToStep",
        fields: [
          defineField({ name: "name", title: "Step Name", type: "string", description: "Short label — e.g. 'Register on the CAT portal'", validation: (R) => R.required() }),
          defineField({ name: "text", title: "Step Instructions", type: "text", rows: 2, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "name", subtitle: "text" } },
      }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});
