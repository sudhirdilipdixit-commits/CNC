import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigationMenu",
  title: "Navigation Menu",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Menu Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "identifier",
      title: "Identifier (e.g. main-nav, footer-nav)",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          title: "Menu Item",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL / Path", type: "string" }),
            defineField({ name: "isExternal", title: "External Link", type: "boolean" }),
            defineField({
              name: "children",
              title: "Sub-items (Dropdown)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subMenuItem",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "URL / Path", type: "string" }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "identifier" } },
});
