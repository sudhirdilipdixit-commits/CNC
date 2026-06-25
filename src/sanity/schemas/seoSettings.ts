import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoSettings",
  title: "Global SEO Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "titleSeparator", title: "Title Separator (e.g. |)", type: "string" }),
    defineField({ name: "siteDescription", title: "Default Meta Description", type: "text", rows: 3 }),
    defineField({ name: "defaultOgImage", title: "Default OG Image", type: "image" }),
    defineField({ name: "canonicalUrl", title: "Canonical Base URL", type: "url" }),
    defineField({
      name: "twitter",
      title: "Twitter / X Settings",
      type: "object",
      fields: [
        defineField({ name: "handle", title: "Twitter Handle (e.g. @collegencourses)", type: "string" }),
        defineField({ name: "cardType", title: "Card Type", type: "string", options: { list: ["summary", "summary_large_image"] } }),
      ],
    }),
    defineField({
      name: "structuredData",
      title: "Organization Structured Data",
      type: "object",
      fields: [
        defineField({ name: "orgName", title: "Organization Name", type: "string" }),
        defineField({ name: "orgUrl", title: "Organization URL", type: "url" }),
        defineField({ name: "logo", title: "Logo", type: "image" }),
        defineField({ name: "foundingYear", title: "Founding Year", type: "number" }),
        defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
        defineField({ name: "contactPhone", title: "Contact Phone", type: "string" }),
      ],
    }),
    defineField({ name: "googleSiteVerification", title: "Google Site Verification Code", type: "string" }),
    defineField({ name: "bingVerification", title: "Bing Verification Code", type: "string" }),
    defineField({ name: "gaTrackingId", title: "Google Analytics / GA4 Measurement ID", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Global SEO Settings" }) },
});
