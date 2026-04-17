import { Route } from "@/types/route.type";
import { Calendar, ClipboardList, Home, Plus, User } from "lucide-react";

export const organizerRouter: Route[] = [
  {
    title: "Organizer management",
    icon: ClipboardList,
    items: [
      {
        title: "Profile",
        url: "/organizer-dashboard",
        icon: User,
      },
      {
        title: "Create Events",
        url: "/organizer-dashboard/create",
        icon: Plus,
      },
      {
        title: "Events",
        url: "/organizer-dashboard/events",
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
