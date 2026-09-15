import Header from "@/app/components/Header";
import ArticleGrid from "@/app/components/ArticleGrid";
import SearchBar from "@/app/components/SearchBar";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { RiSearchLine } from "react-icons/ri";
import EmptyState from "@/app/components/EmptyState";
import { groq } from "next-sanity";
import { cache } from "react";

interface Props {
  searchParams: { q?: string };
}

const searchPosts = cache(async (query: string) => {
  const data = await client.fetch(
    groq`*[_type == "post" && (title match $q || excerpt match $q || tags[]->name match $q || category->name match $q)] | order(publishedAt desc) {
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
  }`,
    { q: query } as any
  );
  return data;
});

export const revalidate = 60;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams?.q || "";
  if (!query) {
    return { title: "Search", alternates: { canonical: "/search" } };
  }
  return {
    title: `Search: ${query}`,
    description: `Search results for "${query}" on AUI Blogo`,
    alternates: {
      canonical: "/search",
    },
  };
}

const page = async ({ searchParams }: Props) => {
  const query = searchParams?.q || "";
  const posts: Post[] = query ? await searchPosts(query) : [];

  return (
    <div>
      <Header title="Search Articles" />
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar defaultValue={query} />
      </div>
      {query && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {posts.length} {posts.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}
      {!query ? (
        <EmptyState
          title="Search for articles"
          message="Enter a search term to find articles by title, excerpt, category, or tag."
          icon={<RiSearchLine className="w-12 h-12" />}
        />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No articles found"
          message={`No articles found for "${query}". Try a different search term.`}
          icon={<RiSearchLine className="w-12 h-12" />}
        />
      ) : (
        <ArticleGrid posts={posts} />
      )}
    </div>
  );
};

export default page;
