"use client";

import { getAllReviewsAction } from "@/action/review.action";
import { Review } from "@/interfaces";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
}

export function CommunityFeedback() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviewsAction(5);
        if (response.error) {
          setTestimonials([]);
          setLoading(false);
          return;
        }

        if (response.data && Array.isArray(response.data)) {
          const mappedTestimonials: Testimonial[] = response.data.map(
            (review: Review) => ({
              id: review.id,
              name: review.user?.name || "Anonymous",
              role: review.event?.title || "Event Attendee",
              content: review.comment || "Great experience!",
              rating: review.rating,
            }),
          );
          setTestimonials(mappedTestimonials);
        } else {
          console.warn("No reviews data found or invalid format:", response);
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-bold text-sm mb-4"
          >
            <Star size={16} fill="currentColor" />
            <span>Community Trust</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-6 dark:text-white"
          >
            What Our <span className="text-teal-600">Community</span> Says
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                <p className="text-slate-600 dark:text-gray-400 mt-4">
                  Loading reviews...
                </p>
              </div>
            </div>
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all relative group"
              >
                <Quote
                  className="absolute top-6 right-8 text-teal-600/10 group-hover:text-teal-600 transition-colors"
                  size={48}
                />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "text-orange-500"
                          : "text-zinc-300 dark:text-zinc-700"
                      }
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-gray-400 mb-8 italic leading-relaxed text-lg">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold dark:text-white">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-16">
              <p className="text-slate-600 dark:text-gray-400">
                No reviews available yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-100 dark:bg-zinc-800 z-0" />
    </section>
  );
}
