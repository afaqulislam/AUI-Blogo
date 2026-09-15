import Link from "next/link";
import { Post } from "../utils/interface";
import { dedupeTags } from "../utils/helpers";
import { isSvgUrl } from "../utils/image";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { RiCalendarLine, RiFolderLine } from "react-icons/ri";

interface Props {
  post: Post;
}

const FeaturedPost = ({ post }: Props) => {
  const firstImage = post?.body?.find?.((b: any) => b._type === "image");

  return (
    <Link href={`/posts/${post?.slug?.current}`}>
      <article className="relative overflow-hidden border border-gray-300 dark:border-purple-900 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
        {firstImage && (
          <div className="relative h-48 sm:h-64 w-full overflow-hidden">
            <Image
              src={urlForImage(firstImage).url()}
              alt={firstImage.alt || post.title}
              fill
              priority
              unoptimized={isSvgUrl(urlForImage(firstImage).url())}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            {post?.category && (
              <span key="category" className="flex items-center gap-1">
                <RiFolderLine key="folder-icon" className="w-4 h-4 text-purple-500" />
                {post?.category?.name}
              </span>
            )}
            <span key="date" className="flex items-center gap-1">
              <RiCalendarLine key="calendar-icon" className="w-4 h-4" />
              <span key="date-text" className="font-pixel">
                {new Date(post?.publishedAt).toDateString()}
              </span>
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl dark:text-slate-300 mb-3 group-hover:text-purple-500 transition-colors">
            {post?.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {post?.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {dedupeTags(post?.tags)?.slice(0, 3)?.map((tag, index) => (
              <span
                key={tag?._id ?? `tag-${index}`}
                className="px-2 py-1 text-xs rounded-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              >
                #{tag?.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPost;
