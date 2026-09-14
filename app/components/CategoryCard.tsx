import Link from "next/link";
import { Category } from "../utils/interface";
import { RiFolderLine } from "react-icons/ri";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link href={`/category/${category?.slug?.current}`}>
      <div className="p-5 border border-gray-300 dark:border-purple-900 rounded-lg hover:shadow-md hover:border-purple-500 transition-all group">
        <div className="flex items-center gap-2 mb-2">
          <RiFolderLine className="w-5 h-5 text-purple-500 group-hover:text-purple-600" />
          <h3 className="text-lg font-semibold group-hover:text-purple-500 transition-colors">
            {category?.name}
          </h3>
        </div>
        {category?.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {category?.description}
          </p>
        )}
        {category?.postCount !== undefined && (
          <p className="text-xs text-gray-500 mt-2">
            {category?.postCount} {category?.postCount === 1 ? "article" : "articles"}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
