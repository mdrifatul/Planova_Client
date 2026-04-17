"use client";

import { BrandLogo } from "@/components/ui/brand-logo";
import { NavMain } from "@/components/ui/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/contants/roles";
import { adminRouter } from "@/router/adminRouter";
import { moderatorRouter } from "@/router/moderatorRouter";
import { organizerRouter } from "@/router/organizerRouter";
import { userRouter } from "@/router/userRouter";
import { Route } from "@/types/route.type";
import * as React from "react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: { name: string; email: string; image?: string; role: string };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let routes: Route[] = [];
  switch (user.role) {
    case Roles.admin:
      routes = adminRouter;
      break;
    case Roles.moderator:
      routes = moderatorRouter;
      break;
    case Roles.organizer:
      routes = organizerRouter;
      break;
    case Roles.user:
      routes = userRouter;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-r border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-gray-950 **:data-[sidebar=sidebar]:bg-zinc-50 **:data-[sidebar=sidebar]:dark:bg-gray-950"
      {...props}
    >
      <SidebarHeader className="border-b border-zinc-200 dark:border-zinc-800/50 pb-4">
        <BrandLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={routes} />
      </SidebarContent>
      {/* <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800/50 pt-2">
        <NavUser user={user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
