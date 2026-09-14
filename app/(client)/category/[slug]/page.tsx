import Header from "@/app/components/Header";
import ArticleGrid from "@/app/components/ArticleGrid";
import { Post, Category } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getCategory = cache(async (slug: string) => {
  const query = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "post" && references("category", ^._id)])
  }
  `;
  return await client.fetch(query, { slug });
});

const getPostsByCategory = cache(async (slug: string) => {
  const query = `
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category-> {
      _id,
      name,
      slug
    },
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;
  return await client.fetch(query, { slug });
});

export const revalidate = 60;

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category: Category = await getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || `Articles in the ${category.name} category`,
  };
}

const page = async ({ params }: Params) => {
  const [category, posts]: [Category, Post[]] = await Promise.all([
    getCategory(params.slug),
    getPostsByCategory(params.slug),
  ]);
  if (!category) notFound();

  return (
    <div>
      <Header title={category.name} />
      {category?.description && (
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          {category.description}
        </p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        {category.postCount} {category.postCount === 1 ? "article" : "articles"}
      </p>
      <ArticleGrid
        posts={posts}
        emptyTitle="No articles in this category"
        emptyMessage="No articles have been published in this category yet."
      />
    </div>
  );
};

export default page;
