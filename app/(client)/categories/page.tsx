import Header from "@/app/components/Header";
import CategoryCard from "@/app/components/CategoryCard";
import { Category } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import EmptyState from "@/app/components/EmptyState";
import { RiFolderLine } from "react-icons/ri";
import { cache } from "react";

const getAllCategories = cache(async () => {
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

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all article categories on AUI Blogo",
};

const page = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <div>
      <Header title="Categories" />
      {categories?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories yet"
          message="It looks like no categories have been added just yet. Check back soon — fresh topics are on the way!"
          icon={<RiFolderLine className="w-12 h-12" />}
        />
      )}
    </div>
  );
};

export default page;
