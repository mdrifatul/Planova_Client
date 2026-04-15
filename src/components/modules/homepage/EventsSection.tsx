"use client";

import { Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { EventCardPreview } from "./EventCard";

export function EventsSection() {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-linear-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto">
        <div className="mb-16">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-linear-to-r from-teal-500 to-teal-600 rounded-full" />
            <span className="text-sm font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase">
              Featured Events
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-teal-500 to-teal-600 rounded-full" />
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            <span className="flex items-center justify-center gap-3 flex-wrap">
              Discover Extraordinary
              <span className="inline-flex items-center gap-2 bg-linear-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                <Sparkles className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                Events
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore a curated collection of premium events happening in your
            city. Connect with like-minded professionals and expand your
            network.
          </p>
        </div>

        {/* Events Grid */}
        <div>
          <EventCardPreview />
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Explore All Events
            </span>
            <span className="w-6 h-0.5 bg-white opacity-60 group-hover:w-8 transition-all duration-300" />
          </Link>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-10 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-10 -z-10" />
    </section>
  );
}
