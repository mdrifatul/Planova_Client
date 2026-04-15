"use client";

import { motion } from "framer-motion";
import { BarChart3, Globe2, ShieldCheck, Zap } from "lucide-react";

export function EmpowerSection() {
  const features = [
    {
      title: "Real-time Analytics",
      description:
        "Track ticket sales, attendance rates, and revenue in real-time with comprehensive dashboards.",
      icon: BarChart3,
    },
    {
      title: "Secure Payments",
      description:
        "Integrated payment gateways ensure safe transactions for your attendees globally.",
      icon: ShieldCheck,
    },
    {
      title: "Fast Registration",
      description:
        "Streamlined checkout process that maximizes conversion and reduces attendee friction.",
      icon: Zap,
    },
    {
      title: "Global Reach",
      description:
        "Connect with event-goers from all over the world and grow your community footprint.",
      icon: Globe2,
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight dark:text-white">
                Empower Your Events <br />
                <span className="text-teal-600">With Elite Tools</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-xl">
                Planova provides more than just a platform. We offer a
                comprehensive suite of tools designed to help you organize,
                manage, and scale your events with professional precision.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-teal-600 text-white rounded-full font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform cursor-pointer">
                  Get Started Free
                </div>
                <div className="px-6 py-3 border border-zinc-200 dark:border-zinc-700 dark:text-white rounded-full font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  View Demo
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-teal-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
