"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function BrandLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <Link
            href={"/"}
            className="grid flex-1 text-left text-sm leading-tight"
          >
            <span className="truncate font-bold text-lg tracking-tight">
              Planova
            </span>
            <span className="truncate text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em]">
              Event Intelligence
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
