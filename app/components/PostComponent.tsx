import Link from "next/link";
import React from "react";
import { Post } from "../utils/interface";
import { dedupeTags } from "../utils/helpers";
import { RiCalendarLine, RiFolderLine } from "react-icons/ri";

interface Props {
  post: Post;
}

const PostComponent = ({ post }: Props) => {
  const tags = dedupeTags(post?.tags);
  return (
    <div className={`${cardStyle} group`}>
      <Link href={`/posts/${post?.slug?.current}`}>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
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
        <h2 className="font-display text-2xl dark:text-slate-300 group-hover:text-purple-500 transition-colors">
          {post?.title}
        </h2>
        <p className="dark:text-gray-400 mb-4 line-clamp-2 mt-2">{post?.excerpt}</p>
      </Link>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={tag?._id ?? `tag-${index}`}
            className="px-2 py-1 rounded-sm text-xs lowercase bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
          >
            #{tag?.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;

const cardStyle = `
mb-6
p-5
border
border-gray-300
dark:border-purple-900
rounded-lg
shadow-sm
hover:shadow-md
hover:shadow-purple-500/10
hover:border-purple-500
transition-all
`;
