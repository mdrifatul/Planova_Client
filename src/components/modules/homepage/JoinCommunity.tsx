"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function JoinCommunity() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-slate-900 dark:bg-zinc-900 px-8 py-16 md:py-24 text-center overflow-hidden border border-slate-800 dark:border-zinc-800"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-teal-400 font-bold text-sm mb-6"
            >
              <Mail size={16} />
              <span>Newsletter Integration</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Ready to <span className="text-teal-500">Transform</span> Your{" "}
              <br className="hidden md:block" />
              Event Experience?
            </h2>
            <p className="text-xl text-slate-400 dark:text-gray-400 mb-12">
              Join 50,000+ event enthusiasts and stay updated with the latest
              happenings in your area. No spam, just pure excitement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto h-16 px-8 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-bold transition-all flex items-center justify-center gap-3 group shrink-0 "
              >
                Join Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-500 dark:text-gray-500">
              By joining, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
