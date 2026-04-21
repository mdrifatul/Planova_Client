"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Route } from "@/types/route.type";
import Link from "next/link";

export function NavMain({ items }: { items: Route[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="px-3">
      <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2">
        Platform Navigation
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.items && item.items.length > 0;

          // Parent is active if any of its children are active
          const isParentActive = item.items?.some((subItem) =>
            subItem.url === "/"
              ? pathname === "/"
              : pathname.startsWith(subItem.url),
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "relative h-11 px-3 transition-all duration-300 rounded-xl",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                      isParentActive && !hasSubItems
                        ? "text-teal-600 dark:text-teal-400 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400",
                    )}
                  >
                    {isParentActive && !hasSubItems && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-100/50 dark:border-teal-900/50"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-3 w-full">
                      {Icon && (
                        <Icon
                          className={cn(
                            "size-4.5 transition-colors duration-300",
                            isParentActive
                              ? "text-teal-600 dark:text-teal-400"
                              : "text-zinc-400 group-hover/collapsible:text-zinc-600 dark:group-hover/collapsible:text-zinc-300",
                          )}
                        />
                      )}
                      <span className="text-sm tracking-tight">
                        {item.title}
                      </span>
                      {hasSubItems && (
                        <ChevronRight className="ml-auto size-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 text-zinc-300 dark:text-zinc-600" />
                      )}
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <AnimatePresence>
                  {hasSubItems && (
                    <CollapsibleContent>
                      <SidebarMenuSub className="relative ml-4 mt-1 border-l border-zinc-100 dark:border-zinc-800/50 pl-4 space-y-1">
                        {item.items?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    "group/sub relative flex h-9 items-center gap-3 px-3 rounded-lg transition-all duration-200",
                                    isSubActive
                                      ? "text-teal-600 dark:text-teal-400 font-medium bg-teal-50/50 dark:bg-teal-950/20"
                                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30",
                                  )}
                                >
                                  {isSubActive && (
                                    <motion.div
                                      layoutId={`sub-active-${item.title}`}
                                      className="absolute left-[-17px] w-[2px] h-4 bg-teal-500 dark:bg-teal-400 rounded-full"
                                    />
                                  )}
                                  {SubIcon && <SubIcon className="size-3.5" />}
                                  <span className="text-xs tracking-wide">
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
