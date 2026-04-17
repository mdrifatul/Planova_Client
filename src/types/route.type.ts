import { LucideIcon } from "lucide-react";

export interface Route {
  title: string;
  icon?: LucideIcon;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
