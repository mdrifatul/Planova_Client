"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchEvents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    // Reset to page 1 on new search
    params.set("page", "1");

    router.push(`/events?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    params.set("page", "1");
    router.push(`/events?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:mx-0">
      <div className="relative group">
        <Input
          type="text"
          placeholder="Search (e.g. Public, Private, Free, Paid, Tech)..."
          className="pl-5 pr-28 h-14 w-full bg-white dark:bg-gray-900 border-zinc-200 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-16 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            title="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-4 flex items-center px-4 text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
