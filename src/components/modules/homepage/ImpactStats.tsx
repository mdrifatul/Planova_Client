"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Award, Globe } from "lucide-react";

export function ImpactStats() {
  const stats = [
    {
      label: "Global Attendees",
      value: "500K+",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Events Organized",
      value: "12K+",
      icon: Calendar,
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      label: "Success Rate",
      value: "99.9%",
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      label: "Countries Reached",
      value: "45+",
      icon: Globe,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center p-6 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon size={32} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-2 dark:text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
