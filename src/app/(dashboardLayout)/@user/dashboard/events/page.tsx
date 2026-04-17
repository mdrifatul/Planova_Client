"use client";

import { getMyParticipationsAction } from "@/action/participation.action";
import { createReviewAction } from "@/action/review.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Participation } from "@/interfaces";
import {
  Calendar,
  ExternalLink,
  Inbox,
  Loader2,
  Mail,
  MessageSquareText,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserEventsPage() {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const { data, error } = await getMyParticipationsAction();
        if (error) setError(error.message);
        else if (data) setParticipations(data);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <p className="text-zinc-500 font-medium animate-pulse">
            Syncing your event universe...
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "REJECTED":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <div className="p-6 md:p-12 space-y-12 animate-in fade-in duration-700 max-w-(--breakpoint-2xl) mx-auto">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-linear-to-r from-teal-500 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
          My Participations
        </h1>
        <p className="text-muted-foreground text-xl font-medium max-w-3xl leading-relaxed">
          Manage your presence across the Planova ecosystem. Track status,
          contact organizers, and review your experiences.
        </p>
      </div>

      {!participations || participations.length === 0 ? (
        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] bg-zinc-50/50 dark:bg-zinc-900/10 py-32 flex flex-col items-center justify-center text-center space-y-8">
          <div className="p-10 rounded-full bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl scale-110">
            <Inbox className="w-16 h-16 text-zinc-400" />
          </div>
          <div className="space-y-4">
            <p className="text-4xl font-black tracking-tight">
              Your world is quiet
            </p>
            <p className="text-zinc-500 max-w-md mx-auto text-lg leading-relaxed font-medium">
              No event registrations found. The next great experience is just a
              click away!
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full px-12 font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 hover:scale-105 transition-transform duration-300"
            >
              <Link href="/">Discover Events</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {participations.map((part) => (
            <div
              key={part.id}
              className="group relative flex flex-col lg:flex-row items-stretch lg:items-center gap-6 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-gray-900/40 backdrop-blur-xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500"
            >
              {/* Event Main Section */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`font-black tracking-wider rounded-lg py-1 px-4 text-[10px] uppercase border-2 ${getStatusColor(part.status)}`}
                  >
                    {part.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/80 px-4 py-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                    <Calendar className="w-3 h-3" />
                    Joined {new Date(part.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none group-hover:text-teal-500 transition-colors duration-300">
                    {part.event?.title || "Exclusive Event"}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>
                      {(part as any).event?.date
                        ? new Date((part as any).event.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "Schedule Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Organizer Section */}
              <div className="lg:w-72 p-4 lg:p-6 rounded-[1.5rem] bg-white/50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/60 shadow-inner">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  Management
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-black truncate text-zinc-900 dark:text-zinc-100">
                      {(part as any).event?.organizer?.name || "Premium Host"}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-teal-500 transition-colors cursor-pointer group/mail">
                      <Mail className="w-3 h-3 group-hover/mail:scale-110 transition-transform" />
                      <span className="truncate">
                        {(part as any).event?.organizer?.email ||
                          "verified@planova.io"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex lg:flex-col items-stretch gap-3 lg:w-48">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-12 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-[1.02]"
                >
                  <Link
                    href={`/events/${part.eventId}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Details
                  </Link>
                </Button>
                <ReviewDialog
                  eventId={part.eventId}
                  eventTitle={part.event?.title || "this event"}
                />
              </div>

              {/* Decorative Accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-full bg-teal-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewDialog({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createReviewAction({ eventId, rating, comment });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Experience recorded successfully!");
        setIsOpen(false);
        setComment("");
        setRating(5);
      }
    } catch {
      toast.error("Network communication failure");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 h-12 rounded-2xl bg-teal-600 hover:bg-teal-500 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all border-none">
          <Star className="w-4 h-4 fill-current mr-2" />
          Review Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 border-zinc-800 bg-gray-950 rounded-[2rem]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-[1.5rem] bg-teal-500/10 flex items-center justify-center text-teal-500 mb-6 drop-shadow-2xl">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight leading-none mb-2">
            Share Your Story
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          <div className="space-y-4 text-center">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    rating >= star
                      ? "bg-teal-600 text-white shadow-xl shadow-teal-500/30"
                      : "bg-zinc-900 text-zinc-700 border border-zinc-800/50"
                  }`}
                >
                  <Star
                    className={`w-7 h-7 ${rating >= star ? "fill-current" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">
              Describe Experience
            </Label>
            <Textarea
              placeholder="The venue was stunning, the speakers were insightful..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-zinc-900 border-zinc-800/50 rounded-2xl min-h-35 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm leading-relaxed p-4"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-teal-500/40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Publishing
                </>
              ) : (
                "Post Recommendation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
