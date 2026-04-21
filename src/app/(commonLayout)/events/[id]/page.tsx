import {
  getEventByIdAction,
  getEventParticipantsAction,
} from "@/action/event.action";
import JoinButton from "@/components/shared/JoinButton";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Ticket, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: event, error } = await getEventByIdAction(id);

  if (error || !event) {
    return notFound();
  }

  const { data: participants } = await getEventParticipantsAction(id);
  const participantCount = participants?.length || 0;
  const isFull = event.maxAttendees
    ? participantCount >= event.maxAttendees
    : false;

  const formatTime = (time?: string) => {
    if (!time) return "";
    try {
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
    <div className="bg-zinc-50 dark:bg-gray-950 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-100 overflow-hidden">
        <Image
          src={event.imageUrl || "/images/event.jpg"}
          alt={"event image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-teal-600 hover:bg-teal-600 border-none text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                {event.visibility}
              </Badge>
              {event.fee === 0 && (
                <Badge className="bg-orange-500 hover:bg-orange-500 border-none text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                  Free Access
                </Badge>
              )}
            </div>
            <h1 className="text-3xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-4xl tracking-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Calendar className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest text-white/60">
                    Date
                  </span>
                  <span className="font-bold text-lg">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Clock className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest text-white/60">
                    Time
                  </span>
                  <span className="font-bold text-lg">
                    {formatTime(event.startTime)}
                    {event.endTime ? ` - ${formatTime(event.endTime)}` : ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MapPin className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest text-white/60">
                    Location
                  </span>
                  <span className="font-bold text-lg">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
                About Event
              </h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {event.description || "No description provided for this event."}
              </div>
            </section>

            {/* Event Highlights / Tags */}
            {event.tags && event.tags.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 rounded-2xl bg-zinc-100 dark:bg-gray-900 text-zinc-700 dark:text-zinc-300 font-bold text-sm border border-zinc-200 dark:border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Action Cards */}
          <div className="space-y-8">
            {/* Join Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 top-24">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    Entry Fee
                  </span>
                  <span className="text-4xl font-black text-zinc-900 dark:text-white">
                    {event.fee > 0 ? `$${event.fee}` : "Free"}
                  </span>
                </div>
                <Ticket className="w-10 h-10 text-teal-600 opacity-20" />
              </div>

              <JoinButton eventId={id} isFull={isFull} fee={event.fee} />

              <div className="mt-8 space-y-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 font-medium">
                    Availability
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {isFull ? "Waitlist Only" : "Available Seats"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 font-medium">
                    Joined Participants
                  </span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span className="font-black text-zinc-900 dark:text-white">
                      {participantCount}
                      {event.maxAttendees ? ` / ${event.maxAttendees}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            {event.organizer && (
              <div className="bg-zinc-100 dark:bg-gray-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
                  Hosted By
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-teal-500/20">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight leading-none mb-1">
                      {event.organizer.name}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {event.organizer.email}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
