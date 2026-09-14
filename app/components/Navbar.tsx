import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { RiSearchLine, RiFolderLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <nav className="flex justify-between items-center h-16 w-full" aria-label="Main navigation">
        <Link href="/" className="flex items-center">
          <div className="font-display text-3xl dark:text-amber-50">
            AUI
            <span className="text-purple-500">Blogo</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm hover:text-purple-500 transition-colors"
            aria-label="Browse categories"
          >
            <RiFolderLine className="w-4 h-4" />
            <span>Categories</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm hover:text-purple-500 transition-colors"
            aria-label="Search articles"
          >
            <RiSearchLine className="w-5 h-5" />
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
