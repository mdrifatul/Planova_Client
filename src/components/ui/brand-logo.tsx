"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href={"/"} className="flex-1 pl-3 text-sm leading-tight">
            {/* <span>
              <Image src={"/logo1.svg"} width={180} height={40} alt={"Logo"} />
            </span> */}
            <span>
              <Image src={"/text.svg"} width={120} height={40} alt={"Logo"} />
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
