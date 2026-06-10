"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User as UserType } from "@/interfaces";
import { motion } from "framer-motion";
import { Mail, MoreVertical, Shield } from "lucide-react";
import Link from "next/link";

interface AdminRecentUsersProps {
  users: UserType[];
}

export function AdminRecentUsers({ users }: AdminRecentUsersProps) {
  return (
    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-serif font-semibold">
            Recent Registrations
          </CardTitle>
          <CardDescription>Latest users joined the community</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground italic">
              No recent registrations.
            </div>
          ) : (
            users.slice(0, 5).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <Avatar className="h-10 w-10 border-2 border-zinc-50 dark:border-zinc-800">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold truncate">
                      {user.name}
                    </h4>
                    {user.role === "ADMIN" && (
                      <Shield className="h-3 w-3 text-primary fill-primary/10" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Joined
                  </p>
                  <p className="text-[11px] font-serif font-bold text-foreground">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <Link href={"/admin-dashboard/users"}>
          <Button
            variant={"outline"}
            className="w-full mt-6 border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs uppercase tracking-wider"
          >
            Manage All Users
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
