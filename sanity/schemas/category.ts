import { defineType, Rule } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: Rule) =>
        rule.required().min(2).max(60).error("Category name is required (2-60 characters)"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule: Rule) => rule.required().error("Slug is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule: Rule) => rule.max(300).error("Max 300 characters"),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
  },
});
