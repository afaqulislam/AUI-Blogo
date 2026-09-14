import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import { Post } from "../utils/interface";
import PostComponent from "../components/PostComponent";
import FeaturedPost from "../components/FeaturedPost";
import CategoryCard from "../components/CategoryCard";
import Link from "next/link";
import { Category } from "../utils/interface";
import { RiFolderLine, RiArticleLine } from "react-icons/ri";
import EmptyState from "../components/EmptyState";
import { cache } from "react";

const getPosts = cache(async () => {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
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
  const data = await client.fetch(query);
  return data;
});

const getCategories = cache(async () => {
  const query = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "post" && references("category", ^._id)])
  }
  `;
  const data = await client.fetch(query);
  return data;
});

export const revalidate = 60;

export default async function Home() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([getPosts(), getCategories()]);
  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1);

  return (
    <div>
      <Header title="Articles" tags />

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-10" aria-label="Featured article">
          <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-4">
            Latest Article
          </h3>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Categories Section */}
      {categories?.length > 0 && (
        <section className="mb-10" aria-label="Categories">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider">
              Categories
            </h3>
            <Link
              href="/categories"
              className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1"
            >
              <RiFolderLine className="w-3 h-3" />
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.slice(0, 4).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      {remainingPosts?.length > 0 && (
        <section aria-label="All articles">
          <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-4">
            All Articles
          </h3>
          <div>
            {remainingPosts.map((post) => (
              <PostComponent key={post?._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Zero-Post Empty State */}
      {!posts?.length && (
        <EmptyState
          title="No articles yet"
          message="No articles have been published just yet. Check back soon — fresh posts are on the way!"
          icon={<RiArticleLine className="w-12 h-12" />}
        />
      )}
    </div>
  );
}
