import { Route } from "@/types/route.type";
import { Calendar, Home, ShieldAlert, User } from "lucide-react";

export const moderatorRouter: Route[] = [
  {
    title: "Moderator management",
    icon: ShieldAlert,
    items: [
      {
        title: "Profile",
        url: "/moderator-dashboard",
        icon: User,
      },
      {
        title: "Users",
        url: "/moderator-dashboard/users",
        icon: User,
      },
      {
        title: "Events",
        url: "/moderator-dashboard/events",
        icon: Calendar,
      },
      {
        title: "Home Page",
        url: "/",
        icon: Home,
      },
    ],
  },
];
