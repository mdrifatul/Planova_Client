import { getAllCategoriesAction } from "@/action/category.action";
import { getAllEventsAction } from "@/action/event.action";
import { SearchEvents } from "@/components/layout/SearchEvents";
import { CategoryFilter } from "@/components/modules/events/CategoryFilter";
import { EventCard } from "@/components/modules/homepage/EventCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string; category?: string }>;
}) {
  const { page, query, category } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 12;

  // Fetch categories for the filter
  const { data: categories } = await getAllCategoriesAction();

  // Parse visibility from query if it contains "public" or "private"
  let searchTerm = query;
  let visibility: "PUBLIC" | "PRIVATE" | undefined;

  if (query) {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("public")) {
      visibility = "PUBLIC";
      searchTerm =
        lowerQuery === "public"
          ? undefined
          : query.replace(/public\s*/gi, "").trim() || undefined;
    } else if (lowerQuery.includes("private")) {
      visibility = "PRIVATE";
      searchTerm =
        lowerQuery === "private"
          ? undefined
          : query.replace(/private\s*/gi, "").trim() || undefined;
    }
  }

  const actionParams = {
    limit,
    page: currentPage,
    include: ["organizer", "category", "_count"] as Array<
      "organizer" | "category" | "_count"
    >,
    ...(searchTerm !== undefined && { searchTerm }),
    ...(visibility !== undefined && { visibility }),
    ...(category !== undefined && { categoryId: category }),
  };

  const { data: events, meta, error } = await getAllEventsAction(actionParams);

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-zinc-500 mt-2">{error.message}</p>
      </div>
    );
  }

  const totalEvents = meta?.total || 0;
  const totalPages = Math.ceil(totalEvents / limit);

  return (
    <div className="bg-zinc-50 dark:bg-gray-950 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Discover <span className="text-teal-600">Events</span>
            </h1>
            <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-2xl">
              Browse through our curated selection of events. From tech
              conferences to music festivals, find what moves you.
            </p>
          </div>
          <SearchEvents />
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <CategoryFilter categories={categories} />
        )}

        {/* Events Grid */}
        {!events || events.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-zinc-500 text-xl">
              No events found at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/events?page=${Math.max(1, currentPage - 1)}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}
                        aria-disabled={currentPage === 1}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href={`/events?page=${p}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}
                            isActive={currentPage === p}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href={`/events?page=${Math.min(totalPages, currentPage + 1)}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}
                        aria-disabled={currentPage === totalPages}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
