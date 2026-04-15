"use client";

import { motion } from "framer-motion";
import { Search, Ticket, Users } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Discover Events",
      description: "Explore a curated list of events happening around you, filtered by your interests.",
      icon: Search,
      color: "bg-teal-500",
    },
    {
      title: "Book Securely",
      description: "Fast and secure registration process for both free and paid events.",
      icon: Ticket,
      color: "bg-blue-500",
    },
    {
      title: "Join Community",
      description: "Attend events, connect with like-minded people, and grow your network.",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 dark:text-white"
          >
            How <span className="text-teal-600">Planova</span> Works
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A seamless three-step process designed to get you from discovery to attendance in minutes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-12 z-0" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 mb-8`}>
                <step.icon size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full flex items-center justify-center font-black text-sm border-4 border-white dark:border-gray-950">
                    {idx + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
