"use client";

import { deleteEventAction, getMyEventsAction } from "@/action/event.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/interfaces";
import {
  ArrowUpRight,
  Calendar,
  Eye,
  Globe,
  Inbox,
  Loader2,
  Lock,
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
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-(--breakpoint-2xl) mx-auto">
      {/* Header section with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-teal-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-400">
              Institutional Dashboard
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            Event Management
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Oversee your active portfolio of curated experiences. Track
            engagement, security, and presence.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end px-6 border-r border-zinc-200 dark:border-zinc-800">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
              {events.length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Total Assets
            </span>
          </div>
          <Button
            asChild
            className="h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs px-8 hover:scale-[1.03] transition-all shadow-2xl"
          >
            <Link href="/organizer-dashboard/events/create">
              <Plus className="w-5 h-5 mr-3" />
              Initiate Event
            </Link>
          </Button>
        </div>
      </div>

      {!events || events.length === 0 ? (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-[3rem] bg-zinc-50/50 dark:bg-gray-950/20 py-32 flex flex-col items-center justify-center text-center space-y-8 backdrop-blur-xl group">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full" />
            <div className="relative p-12 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform group-hover:scale-110 duration-700">
              <Inbox className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              The stage is set
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium">
              Your portfolio is currently waiting for your first creation. Start
              your journey by creating an event.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col lg:flex-row lg:items-center gap-6 p-6 md:p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-700 overflow-hidden"
            >
              {/* Status & Date Side */}
              <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:w-48 shrink-0">
                <Badge
                  variant="outline"
                  className={`font-black tracking-[0.2em] rounded-lg py-1.5 px-4 text-[9px] uppercase border-2 shadow-sm ${
                    event.visibility === "PUBLIC"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}
                >
                  {event.visibility === "PUBLIC" ? (
                    <Globe className="w-3 h-3 mr-2" />
                  ) : (
                    <Lock className="w-3 h-3 mr-2" />
                  )}
                  {event.visibility}
                </Badge>
                <div className="flex items-center gap-2.5 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-100/50 dark:bg-zinc-900/50 px-4 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 group/title">
                  <h3 className="text-3xl font-black tracking-tight leading-none text-zinc-900 dark:text-zinc-100 group-hover:text-teal-500 transition-colors">
                    {event.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-800 group-hover:text-teal-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 font-bold">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>
                      {event.maxAttendees || "Unlimited"} Participants
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 font-bold">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span className="capitalize">
                      {event.category?.name || "Premium Tier"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Hub */}
              <div className="flex items-center gap-3 lg:ml-auto">
                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-12 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all p-0"
                >
                  <Link href={`/events/${event.id}`}>
                    <Eye className="w-5 h-5 text-zinc-400" />
                  </Link>
                </Button>

                <Button
                  className="rounded-xl py-5 px-3 bg-rose-500/90 hover:bg-rose-950 cursor-pointer group text-rose-500"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="w-4 h-4 text-white " />
                </Button>
                <Button
                  asChild
                  className="h-11 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-widest text-[10px] px-4 shadow-xl shadow-teal-500/20 transition-all ml-2"
                >
                  <Link href={`/organizer-dashboard/events/edit/${event.id}`}>
                    Edit
                  </Link>
                </Button>
              </div>

              {/* Decorative Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
