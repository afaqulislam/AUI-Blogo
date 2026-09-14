import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";
import { Post, Category } from "./utils/interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getPosts() {
    const query = `
    *[_type == "post"] {
      title,
      slug,
      publishedAt,
    }
    `;
    const data = await client.fetch(query);
    return data;
  }

  async function getCategories() {
    const query = `
    *[_type == "category"] {
      name,
      slug
    }
    `;
    const data = await client.fetch(query);
    return data;
  }

  const posts: Post[] = await getPosts();
  const categories: Category[] = await getCategories();

  const postUrls = posts.map((post) => ({
    url: `https://aui-blogo.vercel.app/posts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }));

  const categoryUrls = categories.map((category) => ({
    url: `https://aui-blogo.vercel.app/category/${category.slug.current}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://aui-blogo.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://aui-blogo.vercel.app/search",
      lastModified: new Date(),
    },
    {
      url: "https://aui-blogo.vercel.app/categories",
      lastModified: new Date(),
    },
    {
      url: "https://aui-blogo.vercel.app/tag",
      lastModified: new Date(),
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
