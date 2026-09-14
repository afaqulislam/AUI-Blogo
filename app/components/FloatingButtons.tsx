"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  RiArrowGoBackLine,
  RiArrowUpLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";

const FloatingButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = pathname === "/";

  return (
    <>
      {/* Back button (left side, hidden on home page) */}
      {!isHome && (
        <button
          onClick={() => router.back()}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full border border-gray-300 dark:border-purple-900 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 shadow-md hover:bg-purple-500 hover:text-white hover:border-purple-500 dark:hover:bg-purple-500 dark:hover:text-white dark:hover:border-purple-500 transition-all"
          aria-label="Go back to previous page"
        >
          <RiArrowGoBackLine className="w-5 h-5" />
        </button>
      )}

      {/* Scroll-to-top button (right side, appears after scrolling) */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full border border-gray-300 dark:border-purple-900 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 shadow-md hover:bg-purple-500 hover:text-white hover:border-purple-500 dark:hover:bg-purple-500 dark:hover:text-white dark:hover:border-purple-500 transition-all"
          aria-label="Scroll back to top"
        >
          <RiArrowUpLine className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default FloatingButtons;