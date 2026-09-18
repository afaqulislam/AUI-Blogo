import Link from "next/link";
import { BackArrowIcon } from "./Icons";

const CmsNavbar = () => {
  return (
    <div className="bg-white dark:bg-[#13141b]">
      <div className="mx-auto max-w-5xl px-6">
        <nav
          className="flex justify-between items-center h-16 w-full"
          aria-label="Admin navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Back to the blog"
          >
            <BackArrowIcon className="transition-opacity group-hover:opacity-80" />
            <span className="hidden sm:inline text-sm !text-indigo-950 dark:!text-white group-hover:text-purple-500 transition-colors">
              Back
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center"
            aria-label="AUI Blogo home"
          >
            <div className="font-display text-3xl !text-indigo-950 dark:!text-white">
              AUI
              <span className="!text-purple-500">Blogo</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default CmsNavbar;