"use client";

import { Category } from "@/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentQuery = searchParams.get("query");

  return (
    <div className="flex items-center gap-2 overflow-x-auto px-2 py-6 no-scrollbar">
      <Link
        href="/events"
        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          !currentCategory
            ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 shadow-md ring-2 ring-slate-900 dark:ring-white ring-offset-2 dark:ring-offset-gray-950"
            : "bg-zinc-100 dark:bg-zinc-900 text-slate-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-transparent"
        }`}
      >
        All Events
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/events?category=${cat.id}${currentQuery ? `&query=${currentQuery}` : ""}`}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            currentCategory === cat.id
              ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-600 ring-offset-2 dark:ring-offset-gray-950"
              : "bg-zinc-100 dark:bg-zinc-900 text-slate-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-transparent"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
