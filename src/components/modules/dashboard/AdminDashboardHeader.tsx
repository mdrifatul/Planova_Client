"use client";

import { motion } from "framer-motion";

interface AdminDashboardHeaderProps {
  userName: string;
}

export function AdminDashboardHeader({ userName }: AdminDashboardHeaderProps) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight">
          Welcome back, <span className="text-primary italic">{userName}</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
          Here&apos;s what&apos;s happening with your platform today. Manage
          events, users, and monitor performance.
        </p>
      </motion.div>
    </div>
  );
}
