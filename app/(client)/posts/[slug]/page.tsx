import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import Toc from "@/app/components/Toc";
import ShareButton from "@/app/components/ShareButton";
import { slugify, dedupeTags } from "@/app/utils/helpers";
import { isSvgUrl } from "@/app/utils/image";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { RiCalendarLine, RiFolderLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const getPost = cache(async (slug: string, commentsOrder: "asc" | "desc" = "desc") => {
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    category-> {
      _id,
      name,
      slug
    },
    tags[]-> {
      _id,
      slug,
      name
    },
    "comments": *[_type == "comment" && post._ref == ^._id ] | order(_createdAt ${commentsOrder}) {
      _id,
      name,
      comment,
      _createdAt,
    },
    "bodyImages": body[_type == "image"] {
      _key,
      "asset": asset-> {
        _id,
        metadata { dimensions { width, height } }
      }
    }
  }
  `;

  const post = await client.fetch(query, { slug });
  return post;
});

const getRelatedPosts = cache(async (categorySlug: string, currentSlug: string) => {
  const query = `
  *[_type == "post" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
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
  return await client.fetch(query, { categorySlug, currentSlug });
});

const getPrevNext = cache(async (slug: string) => {
  const query = `
  {
    "current": *[_type == "post" && slug.current == $slug][0] {
      _createdAt,
      publishedAt
    },
    "prev": *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [publishedAt < ^.current.publishedAt][0] {
      title,
      slug
    },
    "next": *[_type == "post" && slug.current != $slug] | order(publishedAt asc) [publishedAt > ^.current.publishedAt][0] {
      title,
      slug
    }
  }
  `;
  return await client.fetch(query, { slug });
});

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | undefined> {
  const post: Post = await getPost(params?.slug);
  if (!post) {
    return;
  }

  const firstImage = post?.body?.find?.((b: any) => b._type === "image");
  const imageUrl = firstImage ? urlForImage(firstImage).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `https://aui-blogo.vercel.app/posts/${params.slug}`,
      siteName: "AUIBlogo",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

const page = async ({ params, searchParams }: Params) => {
  const commentsOrder: "asc" | "desc" =
    searchParams?.comments === "asc" ? "asc" : "desc";
  const [post, prevNext]: [Post, any] = await Promise.all([
    getPost(params?.slug, commentsOrder),
    getPrevNext(params?.slug),
  ]);

  if (!post) {
    notFound();
  }

  const imageDimMap = new Map<string, { width?: number; height?: number } | undefined>();
  post?.bodyImages?.forEach((img) => {
    imageDimMap.set(img?._key || "", img?.asset?.metadata?.dimensions);
  });

  const relatedPosts = post?.category
    ? await getRelatedPosts(post.category.slug.current, params.slug)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `https://aui-blogo.vercel.app/posts/${params.slug}`,
    publisher: {
      "@type": "Organization",
      name: "AUI Blogo",
      url: "https://aui-blogo.vercel.app",
    },
    ...(post?.category && {
      articleSection: post.category.name,
    }),
  };

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-purple-500 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        {post?.category && (
          <>
            <Link
              href={`/category/${post.category.slug.current}`}
              className="hover:text-purple-500 transition-colors"
            >
              {post.category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="text-center mb-8 border-b dark:border-purple-900 pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {post?.category && (
            <Link
              key="category-link"
              href={`/category/${post.category.slug.current}`}
              className="flex items-center gap-1 hover:text-purple-500 transition-colors"
            >
              <RiFolderLine key="folder-icon" className="w-4 h-4 text-purple-500" />
              {post?.category?.name}
            </Link>
          )}
          <span key="date" className="flex items-center gap-1">
            <RiCalendarLine key="calendar-icon" className="w-4 h-4" />
            <span className="font-pixel">
              {new Date(post?.publishedAt).toDateString()}
            </span>
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {dedupeTags(post?.tags).map((tag, index) => (
            <Link key={tag?._id ?? `tag-${index}`} href={`/tag/${tag.slug.current}`}>
              <span className="px-2 py-1 rounded-sm text-xs lowercase bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Share */}
        <div className="mt-4 flex justify-center">
          <ShareButton title={post?.title} />
        </div>
      </header>

      {/* Table of Contents */}
      <Toc headings={post?.headings} />

      {/* Article Body */}
      <article className={richTextStyles}>
        <PortableText
          value={post?.body}
          components={getPortableTextComponents(imageDimMap)}
        />
      </article>

      {/* Prev/Next Navigation */}
      <div className="flex justify-between items-center mt-10">
        {prevNext?.prev ? (
          <Link
            href={`/posts/${prevNext.prev.slug.current}`}
            className="flex items-center gap-2 text-sm hover:text-purple-500 transition-colors group"
          >
            <RiArrowLeftLine className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <p className="text-xs text-gray-500 dark:text-gray-400">Previous</p>
              <p className="line-clamp-1">{prevNext.prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {prevNext?.next ? (
          <Link
            href={`/posts/${prevNext.next.slug.current}`}
            className="flex items-center gap-2 text-sm hover:text-purple-500 transition-colors group text-right"
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Next</p>
              <p className="line-clamp-1">{prevNext.next.title}</p>
            </div>
            <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts?.length > 0 && (
        <section className="mt-12 pt-8 pb-8 border-t border-b border-gray-300 dark:border-purple-900" aria-label="Related articles">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((rp: Post) => (
              <Link
                key={rp._id}
                href={`/posts/${rp.slug.current}`}
                className="p-4 border border-gray-300 dark:border-purple-900 rounded-lg hover:shadow-md hover:border-purple-500 transition-all group"
              >
                <p className="font-pixel text-purple-500 text-sm">
                  {new Date(rp.publishedAt).toDateString()}
                </p>
                <h4 className="font-semibold mt-1 group-hover:text-purple-500 transition-colors line-clamp-2">
                  {rp.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {rp.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="mt-12" aria-label="Comments">
        <div className="max-w-2xl mx-auto w-full">
          <AddComment postId={post?._id} />
          <h3 className="text-lg font-semibold mb-4">All Comments</h3>
          <AllComments
            comments={post?.comments || []}
            slug={post?.slug?.current}
            commentsOrder={commentsOrder}
          />
        </div>
      </section>
    </div>
  );
};

export default page;

const getPortableTextComponents = (
  imageDimMap: Map<string, { width?: number; height?: number } | undefined>
) => ({
  types: {
    image: ({ value }: any) => {
      const dims = imageDimMap.get(value?._key);
      const aspectRatio =
        dims?.width && dims?.height ? `${dims.width} / ${dims.height}` : "3 / 2";
      return (
        <figure className="my-6">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio }}
          >
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || "Article image"}
              fill
              unoptimized={isSvgUrl(urlForImage(value).url())}
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
});

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
