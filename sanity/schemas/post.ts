import { Rule } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required()
          .min(10)
          .max(120)
          .error("Title is required (10-120 characters)"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Slug is required"),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule: Rule) => Rule.required().error("Publication date is required"),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: Rule) =>
        Rule.required()
          .max(200)
          .error("Excerpt is required (max 200 characters)"),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "body",
      title: "Body",
      description:
        "Headings apply to the whole paragraph line, not just a selected word - create a new line first, then choose a heading style. Content pasted from other blogs/websites keeps its formatting automatically.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Heading 6", value: "h6" },
            { title: "Blockquote", value: "blockquote" },
            { title: "Code Block", value: "code" },
          ],
          lists: [
            { title: "Bulleted List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
              { title: "Strike-through", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule: Rule) =>
                      Rule.required().uri({ scheme: ["http", "https"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alt Text",
              description: "Describe the image for accessibility and SEO",
              validation: (Rule: Rule) =>
                Rule.required().error("Alt text is required for images"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().error("Article body is required"),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
    },
  },
};
