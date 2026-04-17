import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/contants/roles";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function RootLayout({
  admin,
  moderator,
  organizer,
  user,
}: {
  admin: React.ReactNode;
  moderator: React.ReactNode;
  organizer: React.ReactNode;
  user: React.ReactNode;
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  if (!data || !data.user) {
    redirect("/login");
  }
  const userInfo = data.user;

  const renderContent = () => {
    switch (userInfo.role) {
      case Roles.admin:
        return admin;
      case Roles.moderator:
        return moderator;
      case Roles.organizer:
        return organizer;
      case Roles.user:
        return user;
      default:
        return null;
    }
  };
  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={userInfo} />
        <SidebarInset className="bg-zinc-50 dark:bg-gray-950">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-800/50 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          {renderContent()}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
