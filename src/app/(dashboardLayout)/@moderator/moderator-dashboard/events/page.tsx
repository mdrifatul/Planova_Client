"use client";

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
import { Event } from "@/interfaces";
import {
  Calendar,
  Clock,
  Eye,
  Globe,
  Inbox,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllEventsAction();
      if (error) {
        toast.error(error?.message || "Critical data retrieval error");
      } else if (data) {
        setEvents(data);
      }
    } catch {
      toast.error("Failed to fetch events ecosystem");
    } finally {
      setLoading(false);
    }
  };

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
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">
            Accessing Global Event Stream...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-1000 max-w-(--breakpoint-2xl) mx-auto">
      {/* Header section with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-teal-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-400">
              Content Oversight
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            Event Universe
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Monitor all orchestrated experiences across the global platform.
            Manage visibility and maintain quality standards.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end px-6 border-r border-zinc-200 dark:border-zinc-800">
            <span className="text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {events.length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Total Events
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-teal-600">
              {events.filter((e) => e.visibility === "PUBLIC").length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Public Access
            </span>
          </div>
        </div>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] bg-white/50 dark:bg-gray-950/40 backdrop-blur-3xl shadow-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-100/50 dark:bg-zinc-900/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="w-87.5 text-[10px] font-black uppercase tracking-widest py-6 px-8">
                Event Briefing
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-6">
                Orchestrator
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-6">
                Metrics & Visibility
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 text-right px-8">
                Operational Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event) => (
                <TableRow
                  key={event.id}
                  className="border-zinc-200 dark:border-zinc-800 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-5">
                      <div className="relative h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                        {event.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Calendar className="w-4 h-4 text-zinc-400" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-zinc-900 dark:text-zinc-100 text-lg tracking-tight truncate leading-tight mb-1">
                          {event.title}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-bold opacity-70">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-teal-500" />{" "}
                            {event.venue?.substring(0, 15) || "Virtual"}...
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-teal-500" />{" "}
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <AvatarImage src={event.organizer?.image} />
                        <AvatarFallback className="text-[10px] font-black">
                          {event.organizer?.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-zinc-700 dark:text-zinc-300">
                          {event.organizer?.name}
                        </span>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                          ID: {event.organizerId.substring(0, 8)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex flex-col gap-2">
                      <Badge
                        variant="outline"
                        className={`w-fit font-black tracking-[0.15em] rounded-lg py-1 px-3 text-[9px] uppercase border-2 ${event.visibility === "PUBLIC" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}
                      >
                        {event.visibility === "PUBLIC" ? (
                          <Globe className="w-3 h-3 mr-2" />
                        ) : (
                          <Lock className="w-3 h-3 mr-2" />
                        )}
                        {event.visibility}
                      </Badge>
                      <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                        <Users className="w-3 h-3 text-teal-600" />
                        {event.maxAttendees} Global Permits
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-right px-8">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-10 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold uppercase tracking-widest text-[9px] hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 transition-all"
                      >
                        <Link href={`/events/${event.id}`} target="_blank">
                          <Eye className="w-4 h-4 mr-2" />
                          Inspect
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="h-10 w-10 rounded-xl border-zinc-200 dark:border-zinc-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <Inbox className="w-8 h-8 text-zinc-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      No Events Orchestrated Yet
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
        <ShieldCheck className="w-3 h-3" />
        Global event stream is monitored and verified by the administrative
        core.
      </div>
    </div>
  );
}
