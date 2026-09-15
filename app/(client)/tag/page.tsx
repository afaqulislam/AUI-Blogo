import Header from "@/app/components/Header";
import { Tag } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import EmptyState from "@/app/components/EmptyState";
import { dedupeTags } from "@/app/utils/helpers";
import { RiHashtag } from "react-icons/ri";
import { cache } from "react";

const getAllTags = cache(async () => {
  const query = `
  *[_type == "tag"] | order(name asc) {
    name,
    slug,
    _id
  }
  `;
  const tags = client.fetch(query);
  return tags;
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all article tags on AUI Blogo",
  alternates: {
    canonical: "/tag",
  },
};

const page = async () => {
  const tags: Tag[] = await getAllTags();
  return (
    <div>
      <Header title="Tags" />
      {tags?.length > 0 ? (
        <div className="flex flex-wrap gap-3 justify-center">
          {dedupeTags(tags).map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="flex items-center gap-1 px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-purple-900 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all">
                <RiHashtag className="w-4 h-4" />
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tags yet"
          message="Tags will appear here once they are added to posts."
          icon={<RiHashtag className="w-12 h-12" />}
        />
      )}
    </div>
  );
};

export default page;
