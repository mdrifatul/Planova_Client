"use client";

import { getAllCategoriesAction } from "@/action/category.action";
import { deleteEventAction, getAllEventsAction } from "@/action/event.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Event } from "@/interfaces";
import {
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Inbox,
  Loader2,
  Lock,
  MapPin,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [eventsRes, categoriesRes] = await Promise.all([
          getAllEventsAction(),
          getAllCategoriesAction(),
        ]);

        if (eventsRes.data) setEvents(eventsRes.data);
        if (categoriesRes.data) setCategories(categoriesRes.data);

        if (eventsRes.error) toast.error(eventsRes.error.message);
      } catch {
        toast.error("Failed to synchronize event ecosystem");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const filteredEvents = useMemo(() => {
    let results = events;

    // Filter by Category
    if (selectedCategoryId !== "all") {
      results = results.filter((e) => e.categoryId === selectedCategoryId);
    }

    // Filter by Search Term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerSearch) ||
          event.organizer?.name?.toLowerCase().includes(lowerSearch) ||
          event.venue?.toLowerCase().includes(lowerSearch) ||
          event.category?.name?.toLowerCase().includes(lowerSearch)
      );
    }

    return results;
  }, [events, searchTerm, selectedCategoryId]);

  const handleDelete = async (eventId: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently terminate this event? This action cannot be undone.",
      )
    )
      return;

    try {
      const res = await deleteEventAction(eventId);
      if (res.error) {
        toast.error(res.error?.message || "Termination failed");
      } else {
        toast.success("Event terminated and scrubbed from records");
        setEvents(events.filter((e) => e.id !== eventId));
      }
    } catch {
      toast.error("Process interrupted by network error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
          <p className="text-zinc-400 font-serif italic text-sm tracking-widest">
            Synchronizing Event Stream...
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 p-6 md:p-12 transition-colors duration-500">
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-1000">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                  Content Oversight
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  Event Universe
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                  Monitor and manage orchestrations across the global platform.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="space-y-1 text-right">
                <p className="text-3xl md:text-4xl font-serif text-zinc-900 dark:text-zinc-100">
                  {events.length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Total Ecosystem
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-3xl md:text-4xl font-serif text-teal-600">
                  {events.filter((e) => e.visibility === "PUBLIC").length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Public Assets
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Refined Design */}
          <div className="relative w-full max-w-3xl group">
            <div className="relative">
              <Input
                placeholder="Search events, organizers, or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-6 pr-16 h-16 w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-lg font-serif italic text-zinc-700 dark:text-zinc-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
                <Search className="w-5 h-5 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Category Filter - Like Event Page */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              <Layers className="w-3 h-3" /> Filter by Category
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
              <button
                onClick={() => setSelectedCategoryId("all")}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategoryId === "all"
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-md"
                    : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                }`}
              >
                All Orchestrations
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedCategoryId === cat.id
                      ? "bg-teal-600 text-white border-teal-600 shadow-md"
                      : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-serif italic text-zinc-500 py-6 px-8">
                    Event Portfolio
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Orchestrator
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6">
                    Operational Status
                  </TableHead>
                  <TableHead className="font-serif italic text-zinc-500 py-6 text-right px-8">
                    Administrative Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow
                      key={event.id}
                      className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/30 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      <TableCell className="py-6 px-8">
                        <div className="flex items-center gap-5">
                          <div className="relative h-14 w-14 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
                            {event.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-zinc-300" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-zinc-900 dark:text-zinc-100 text-lg tracking-tight truncate leading-tight">
                                {event.title}
                              </span>
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-none">
                                {event.category?.name}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-zinc-500 opacity-80 font-light">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-teal-600" />
                                {event.venue?.substring(0, 20) || "Virtual"}...
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-teal-600" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-700">
                            <AvatarImage src={event.organizer?.image} />
                            <AvatarFallback className="bg-zinc-50 dark:bg-zinc-800 text-zinc-400 text-[10px] font-serif italic">
                              {event.organizer?.name?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                              {event.organizer?.name}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              ID: {event.organizerId.substring(0, 8)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant="outline"
                            className={`w-fit font-medium tracking-wider rounded-full py-0.5 px-3 text-[9px] uppercase border shadow-none ${event.visibility === "PUBLIC" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
                          >
                            {event.visibility === "PUBLIC" ? (
                              <Globe className="w-2.5 h-2.5 mr-1.5" />
                            ) : (
                              <Lock className="w-2.5 h-2.5 mr-1.5" />
                            )}
                            {event.visibility}
                          </Badge>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <Users className="w-3 h-3 text-teal-600" />
                            {event.maxAttendees} Permits
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-xl border-zinc-200 text-zinc-500 hover:text-teal-600 hover:border-teal-200 transition-all"
                              >
                                <Link href={`/events/${event.id}`} target="_blank">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-serif italic text-xs">Public Inspection</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(event.id)}
                                className="h-9 w-9 rounded-xl border-zinc-200 text-zinc-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-serif italic text-xs">Terminate Event</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <Inbox className="w-12 h-12 text-zinc-400" />
                        <p className="text-sm font-serif italic">No orchestrations identified in the stream.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest opacity-40 py-8">
            <ShieldCheck className="w-3 h-3" />
            Global event stream is monitored and verified by the administrative core.
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
