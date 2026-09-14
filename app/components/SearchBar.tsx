"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

interface Props {
  defaultValue?: string;
  placeholder?: string;
}

const SearchBar = ({ defaultValue = "", placeholder = "Search articles..." }: Props) => {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push("/search");
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full" role="search">
      <label htmlFor="search-input" className="sr-only">
        Search articles
      </label>
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-purple-900 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="mt-2 w-full sm:w-auto px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
