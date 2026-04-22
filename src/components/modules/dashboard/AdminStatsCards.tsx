"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

interface AdminStatsCardsProps {
  statsData?: {
    totalUsers: number;
    totalEvents: number;
    activeParticipations: number;
    totalRevenue: string;
  };
}

export function AdminStatsCards({ statsData }: AdminStatsCardsProps) {
  console.log(statsData);
  const stats: Stat[] = [
    {
      title: "Total Users",
      value: statsData?.totalUsers.toLocaleString() || "0",
      change: "+12.5%",
      isPositive: true,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Live Events",
      value: statsData?.totalEvents.toLocaleString() || "0",
      change: "+3.2%",
      isPositive: true,
      icon: <Calendar className="h-6 w-6 text-emerald-600" />,
      color: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Bookings",
      value: statsData?.activeParticipations.toLocaleString() || "0",
      change: "-2.4%",
      isPositive: false,
      icon: <BarChart3 className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Revenue",
      value: statsData?.totalRevenue || "$0.00",
      change: "+18.7%",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      color: "bg-primary/10 dark:bg-primary/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="border-none shadow-sm bg-white dark:bg-zinc-900/50 hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div
                  className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110 duration-300`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {stat.change}
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-serif font-bold mt-1 text-foreground">
                  {stat.value}
                </h3>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
