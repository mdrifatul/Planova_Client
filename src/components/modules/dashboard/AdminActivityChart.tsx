"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const chartData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 48 },
  { day: "Sat", value: 80 },
  { day: "Sun", value: 72 },
];

export function AdminActivityChart() {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm bg-white dark:bg-zinc-900/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-serif font-semibold">
              Activity Overview
            </CardTitle>
            <CardDescription>
              Daily event engagement and traffic analysis
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground font-medium">
                Traffic
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary/30" />
              <span className="text-xs text-muted-foreground font-medium">
                Bookings
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full flex items-end justify-between gap-2 pt-4">
          {chartData.map((data, index) => {
            const height = (data.value / maxValue) * 100;
            return (
              <div
                key={data.day}
                className="flex-1 flex flex-col items-center gap-3 h-full"
              >
                <div className="relative w-full flex-1 flex items-end justify-center group">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    {data.value} visits
                  </div>

                  {/* Main bar */}
                  <motion.div
                    className="w-full max-w-10 bg-primary rounded-t-lg relative"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                  </motion.div>

                  {/* Background bar */}
                  <div className="absolute bottom-0 w-full max-w-10 h-full bg-zinc-100 dark:bg-zinc-800/50 -z-10 rounded-t-lg" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
