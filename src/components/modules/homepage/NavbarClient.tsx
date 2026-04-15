"use client";

import { LogOut, Menu, Settings, Store, User } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Roles } from "@/contants/roles";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./../../layout/ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarClientProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: string;
}

const NavbarClient = ({
  logo = {
    url: "/",
    src: "/",
    alt: "logo",
    title: "Planova",
  },
  menu = [
    { title: "Events", url: "/events" },
    { title: "About Us", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Policy", url: "/policy" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
  isLoggedIn = false,
  userName,
  userRole,
}: NavbarClientProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <motion.section
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-transparent border-b border-zinc-200/50 dark:border-white/10 supports-backdrop-filter:bg-white/60 shadow-sm transition-all duration-300",
        className,
      )}
    >
      <div className="container mx-auto py-3.5">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-2.5 group">
              {/* <div className="flex h-10 w-10 items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="FoodHub Logo"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div> */}
              <span className="text-3xl font-black tracking-widest bg-clip-text text-teal-600 drop-shadow-sm">
                Planova
              </span>
            </a>
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <ModeToggle />

            {isLoggedIn ? (
              <>
                {userRole === "USER" && (
                  <Button
                    asChild
                    className="rounded-full bg-primary text-primary-foreground hover:bg-teal-700 shadow-sm font-semibold h-10 px-5 transition-all"
                  >
                    <Link href="/providerForm">
                      <span>Create Organizer Account</span>
                    </Link>
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full border-teal-600/30 text-teal-600 hover:bg-teal-50 dark:border-teal-500/30 dark:text-teal-400 dark:hover:bg-teal-950/50 transition-all shadow-sm shrink-0"
                    >
                      <User className="h-[1.15rem] w-[1.15rem]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 rounded-2xl border-zinc-200/50 dark:border-white/10 shadow-xl overflow-hidden p-1.5 bg-white/80 dark:bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-background/60"
                  >
                    <DropdownMenuLabel className="font-bold py-3 px-3 text-sm flex items-center gap-3 rounded-xl m-0.5 bg-zinc-50 dark:bg-gray-900/50">
                      <div className="bg-zinc-100 dark:bg-gray-800 text-zinc-600 dark:text-slate-300 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-gray-700">
                        <User className="h-[1.15rem] w-[1.15rem]" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="leading-tight mb-0.5 truncate text-foreground">
                          {userName ? `${userName}` : "My Account"}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground leading-none uppercase tracking-wider">
                          {userRole || "Guest"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-gray-800/80 mx-2 my-1" />
                    <DropdownMenuItem
                      asChild
                      className="p-3 mx-1 my-1 rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-gray-800 focus:bg-zinc-100 dark:focus:bg-gray-800 focus:text-foreground font-medium transition-colors"
                    >
                      <Link
                        href={`/${userRole === Roles.admin ? "admin-dashboard" : userRole === Roles.organizer ? "organizer-dashboard" : userRole === Roles.moderator ? "moderator-dashboard" : "dashboard"}`}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-gray-800/80 mx-2 my-1" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="p-3 mx-1 my-1 rounded-xl cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50 focus:text-red-700 dark:focus:text-red-300 font-medium transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout Workspace</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-gray-800 font-semibold px-6 transition-all"
                >
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>

                <Button
                  asChild
                  className="rounded-full bg-primary hover:bg-teal-700 text-primary-foreground shadow-md shadow-teal-500/20 dark:shadow-teal-500/10 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 font-bold px-6 border-0 transition-all duration-300"
                >
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-xl font-black tracking-widest bg-linear-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
                PLANOVA
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-200/50 bg-white/50 dark:border-gray-800/50 dark:bg-gray-900/50 shadow-sm rounded-xl"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto border-zinc-200/50 dark:border-white/10 bg-white/95 dark:bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-background/80">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href={logo.url}
                      className="flex items-center justify-center gap-2 pb-4"
                    >
                      <span className="text-4xl font-black tracking-widest bg-linear-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
                        PLANOVA
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center px-1 mb-2">
                      <span className="font-semibold text-sm text-muted-foreground">
                        Appearance
                      </span>
                      <ModeToggle />
                    </div>

                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-gray-800 dark:hover:bg-gray-800/80 w-full justify-start h-12"
                          asChild
                        >
                          <Link
                            href={`/${userRole === "ADMIN" ? "admin-dashboard" : userRole === "PROVIDER" ? "provider-dashboard" : "dashboard"}`}
                          >
                            <Settings className="h-5 w-5 mr-3 text-zinc-500" />
                            <span className="font-semibold">Dashboard</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-gray-800 dark:hover:bg-gray-800/80 w-full justify-start h-12"
                          asChild
                        >
                          <Link href="/providerForm">
                            <Store className="h-5 w-5 mr-3 text-zinc-500" />
                            <span className="font-semibold">
                              Provider Account
                            </span>
                          </Link>
                        </Button>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50 w-full justify-start h-12 mt-2"
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          <span className="font-semibold">Logout</span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-xl border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-gray-800 dark:hover:bg-gray-800/80 h-12 font-semibold"
                        >
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>

                        <Button
                          asChild
                          className="rounded-xl bg-primary hover:bg-teal-700 text-white shadow-md shadow-teal-500/20 dark:shadow-teal-500/10 hover:shadow-lg hover:shadow-teal-500/30 font-bold border-0 h-12 transition-all"
                        >
                          <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-semibold transition-colors hover:bg-zinc-100 dark:hover:bg-gray-800/80 text-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <a
      key={item.title}
      href={item.url}
      className="text-lg font-semibold text-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors px-2 py-1"
    >
      {item.title}
    </a>
  );
};

export { NavbarClient };
