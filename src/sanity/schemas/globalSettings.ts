import { defineType, defineField } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "logoDark", title: "Logo (Dark / White version)", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "phone", title: "Contact Phone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({
      name: "announcementBanner",
      title: "Announcement Banner",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Show Banner", type: "boolean" }),
        defineField({ name: "text", title: "Banner Text", type: "string" }),
        defineField({ name: "link", title: "Link URL", type: "string" }),
        defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
      ],
    }),
    defineField({
      name: "leadForm",
      title: "Lead Form Settings",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Form Heading", type: "string" }),
        defineField({ name: "subheading", title: "Form Subheading", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string" }),
        defineField({
          name: "courseOptions",
          title: "Course Options",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "cityOptions",
          title: "City Options",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Global Settings" }) },
});
