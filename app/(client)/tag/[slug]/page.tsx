import Header from "@/app/components/Header";
import ArticleGrid from "@/app/components/ArticleGrid";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { cache } from "react";

const getPostsByTag = cache(async (slug: string) => {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(publishedAt desc) {
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
  const posts = await client.fetch(query, { slug });
  return posts;
});

export const revalidate = 60;

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params) {
  return {
    title: `#${params.slug}`,
    description: `Posts tagged with #${params.slug} on AUI Blogo`,
    alternates: {
      canonical: `/tag/${params.slug}`,
    },
  };
}

const page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);
  return (
    <div>
      <div className="mb-4">
        <Link
          href="/tag"
          className="inline-flex items-center gap-1 text-sm text-purple-500 hover:text-purple-600 transition-colors"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          All Tags
        </Link>
      </div>
      <Header title={`#${params?.slug}`} />
      <ArticleGrid
        posts={posts}
        emptyTitle="No articles with this tag"
        emptyMessage="No articles have been tagged with this tag yet."
      />
    </div>
  );
};

export default page;
