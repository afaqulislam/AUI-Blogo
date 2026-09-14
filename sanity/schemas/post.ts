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
      validation: (Rule: Rule) => Rule.required().error("Category is required"),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
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
