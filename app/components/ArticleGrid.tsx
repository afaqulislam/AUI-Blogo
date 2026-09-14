import Link from "next/link";
import PostComponent from "./PostComponent";
import { Post } from "../utils/interface";
import EmptyState from "./EmptyState";
import { RiArticleLine } from "react-icons/ri";

interface Props {
  posts: Post[];
  emptyTitle?: string;
  emptyMessage?: string;
}

const ArticleGrid = ({ posts, emptyTitle = "No articles yet", emptyMessage = "Check back soon for new content." }: Props) => {
  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        icon={<RiArticleLine className="w-12 h-12" />}
      />
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostComponent key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ArticleGrid;
