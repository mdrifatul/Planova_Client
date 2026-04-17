import { Route } from "@/types/route.type";
import {
  Calendar,
  FolderTree,
  Home,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const adminRouter: Route[] = [
  {
    title: "Admin management",
    icon: LayoutDashboard,
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Events",
        url: "/admin-dashboard/events",
        icon: Calendar,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: FolderTree,
      },
      {
        title: "Home Page",
        url: "/",
        icon: Home,
      },
    ],
  },
];
