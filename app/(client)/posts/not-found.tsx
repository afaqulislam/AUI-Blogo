import Link from "next/link";
import React from "react";
import { RiHomeLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <RiHomeLine className="w-5 h-5" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
