"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/interfaces";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminRecentEventsProps {
  events: Event[];
}

export function AdminRecentEvents({ events }: AdminRecentEventsProps) {
  return (
    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-serif font-semibold">
            Recent Events
          </CardTitle>
          <CardDescription>
            Latest events published on the platform
          </CardDescription>
        </div>
        <Link
          href={"/admin-dashboard/events"}
          className="flex text-primary font-medium hover:text-primary/80"
        >
          View All
          <ExternalLink className="ml-2 mt-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground italic">
              No recent events found.
            </div>
          ) : (
            events.slice(0, 4).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              >
                <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground uppercase tracking-tight">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground uppercase tracking-tight">
                        <MapPin className="h-3 w-3" />
                        {event.venue}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      event.visibility === "PUBLIC" ? "outline" : "secondary"
                    }
                    className="text-[10px] px-1.5 py-0"
                  >
                    {event.visibility}
                  </Badge>
                  <div className="text-xs font-serif font-bold text-primary">
                    {event.fee === 0
                      ? "Free"
                      : `${event.currency} ${event.fee}`}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
