import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-14 px-4 mb-12 text-center border-b dark:border-purple-900">
      <h1 className="uppercase text-2xl sm:text-3xl mx-auto max-w-2xl font-bold">
        {title}
      </h1>

      {tags && (
        <p className="text-xs mt-2">
          <Link
            href="/tag"
            className="text-purple-500 hover:text-purple-600 transition-colors"
          >
            #tags
          </Link>
        </p>
      )}
    </header>
  );
};

export default Header;
