"use client";

import { deleteEventAction, getMyEventsAction } from "@/action/event.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/interfaces";
import {
  Calendar,
  Eye,
  Globe,
  Inbox,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await getMyEventsAction();
        if (error) {
          toast.error(error.message);
        } else if (data) {
          setEvents(data);
        }
      } catch (err) {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    )
      return;

    try {
      const res = await deleteEventAction(id);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Event removed permanently");
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      toast.error("Communication error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse">
            Consulting your event portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 min-h-screen bg-[#fafafa] dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Organizer Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Event Management
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl">
              Curate and oversee your portfolio of high-end experiences.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                  {events.length}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Total Events
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:border-zinc-800" />
              <Button
                asChild
                className="h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 transition-all shadow-md shadow-teal-600/10"
              >
                <Link href="/organizer-dashboard/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {!events || events.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
            <div className="p-6 rounded-full bg-zinc-50 dark:bg-gray-800">
              <Inbox className="w-12 h-12 text-zinc-300 dark:text-zinc-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-medium text-zinc-900 dark:text-zinc-100">
                No events found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Your portfolio is currently empty. Start by creating your first
                event experience.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-xl px-8 h-12">
              <Link href="/organizer-dashboard/create">Get Started</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative bg-white dark:bg-gray-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Event Thumbnail Placeholder or Category Icon */}
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-zinc-50 dark:bg-gray-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors overflow-hidden">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Calendar className="w-8 h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-teal-600 transition-colors" />
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="rounded-md font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 bg-zinc-100 dark:bg-gray-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {event.category?.name || "Event"}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="capitalize">
                          {event.visibility.toLowerCase()}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-teal-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Users className="w-4 h-4" />
                        <span>{event.maxAttendees} Attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 lg:pl-6">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      title="View Public Page"
                    >
                      <Link href={`/events/${event.id}`}>
                        <Eye className="w-5 h-5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="secondary"
                      className="h-10 rounded-xl bg-zinc-100 dark:bg-gray-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold px-5"
                    >
                      <Link
                        href={`/organizer-dashboard/events/edit/${event.id}`}
                      >
                        Edit
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="pt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
            Powered by Planova Intelligence Suite
          </p>
        </footer>
      </div>
    </div>
  );
}
