"use client";

import { getAllEventsAction } from "@/action/event.action";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/interfaces";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatTime = (time?: string) => {
    if (!time) return "";
    try {
      // Check if it's already formatted
      if (
        time.toLowerCase().includes("am") ||
        time.toLowerCase().includes("pm")
      )
        return time;

      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch {
      return time;
    }
  };

  return (
    <Card className="overflow-hidden rounded-lg sm:rounded-xl shadow-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 transition-colors duration-500 h-full flex flex-col p-0 gap-0">
      {/* Top Image Section */}
      <div className="relative w-full h-48 shrink-0">
        <Image
          src={event.imageUrl || "/images/event.jpg"}
          alt={event.title}
          fill
          className="object-cover"
        />
        {/* Bottom Overlay Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-gray-900/90 to-transparent pointer-events-none" />

        {/* Location Pin */}
        {event.venue && (
          <div className="absolute bottom-3 left-4 flex items-center text-white gap-1.5 z-10">
            <span className="opacity-90">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="text-sm font-black tracking-wide drop-shadow-lg truncate uppercase">
              {event.venue.split(" ")[0]}
            </span>
          </div>
        )}

        {/* Pricing Tag */}
        <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-[12px] font-bold tracking-wide z-10 shadow-lg">
          {event.fee > 0 ? `$${event.fee} ${event.currency}` : "FREE"}
        </div>
      </div>

      {/* Card Body Section */}
      <CardHeader className="px-4 pt-4 pb-2 gap-0">
        {/* Date & Time Line */}
        <div className="flex justify-between gap-0.5 mb-2 text-xs text-slate-500 dark:text-gray-400 font-medium tracking-wide">
          <span>{new Date(event.date).toLocaleDateString()}</span>
          {event.startTime && (
            <span>
              {formatTime(event.startTime)}
              {event.endTime && ` to ${formatTime(event.endTime)}`}{" "}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <CardTitle className="text-base font-bold text-slate-800 dark:text-white leading-tight line-clamp-2">
          {event.title}
        </CardTitle>
        {event.description && (
          <CardDescription className="text-xs text-slate-400 dark:text-gray-500 font-medium line-clamp-2 mt-2">
            {event.description}
          </CardDescription>
        )}
      </CardHeader>

      {/* View Details Link at the Bottom */}
      <CardFooter className="px-4 pb-4 pt-2 mt-auto">
        <Link
          href={`/events/${event.id}`}
          className="flex justify-end w-full pt-2 border-t border-slate-100 dark:border-gray-800"
        >
          <span className="text-[12px] text-slate-500 dark:text-gray-400 font-medium cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            View details →
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function EventCardPreview() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEventsAction(4, 0);
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setError(response.error?.message || "Failed to fetch events");
        }
      } catch (err) {
        setError("Something went wrong while fetching events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">
            No events available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
