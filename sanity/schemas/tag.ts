import { defineType, Rule } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Tag Name",
      type: "string",
      validation: (rule: Rule) =>
        rule.required().min(1).max(40).error("Tag name is required (1-40 characters)"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule: Rule) => rule.required().error("Slug is required"),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
