import { Route } from "@/types/route.type";
import { Calendar, Home, User } from "lucide-react";

export const userRouter: Route[] = [
  {
    title: "User Management",
    icon: User,
    items: [
      {
        title: "Profile",
        url: "/dashboard",
        icon: User,
      },
      {
        title: "Events",
        url: "/dashboard/events",
        icon: Calendar,
      },
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
    ],
  },
];
