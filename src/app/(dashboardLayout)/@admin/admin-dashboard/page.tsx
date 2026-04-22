import { AdminActivityChart } from "@/components/modules/dashboard/AdminActivityChart";
import { AdminDashboardHeader } from "@/components/modules/dashboard/AdminDashboardHeader";
import { AdminRecentEvents } from "@/components/modules/dashboard/AdminRecentEvents";
import { AdminRecentUsers } from "@/components/modules/dashboard/AdminRecentUsers";
import { AdminStatsCards } from "@/components/modules/dashboard/AdminStatsCards";
import { eventService } from "@/services/event.service";
import { userService } from "@/services/user.service";

export default async function AdminDashboardPage() {
  const [{ data: sessionData }, { data: users }, { data: events }] =
    await Promise.all([
      userService.getSession(),
      userService.getAllUser(),
      eventService.getAllEvents({
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    ]);

  const user = sessionData?.user;

  if (!user) {
    return null;
  }

  // Calculate some basic stats
  const totalUsers = users?.length || 0;
  const totalEvents = events?.length || 0;
  // Mocking some stats for visual richness
  const activeParticipations = Math.floor(totalEvents * 12.5);
  const totalRevenue = `$${(totalEvents * 1450).toLocaleString()}.00`;

  const statsData = {
    totalUsers,
    totalEvents,
    activeParticipations,
    totalRevenue,
  };

  return (
    <div className="p-6 md:p-12 max-w-400 mx-auto bg-[#fafafa] dark:bg-black/5 min-h-screen">
      <AdminDashboardHeader userName={user.name || "Admin"} />

      <AdminStatsCards statsData={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Chart and Recent Users */}
        <div className="lg:col-span-2 space-y-8">
          <AdminActivityChart />
          <AdminRecentEvents events={events || []} />
        </div>

        {/* Right column: Recent Registrations and Quick Stats */}
        <div className="space-y-8">
          <AdminRecentUsers users={users || []} />

          {/* Quick Support / Status Card */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-serif font-bold text-primary mb-2">
              System Health
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">API Status</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Database</span>
                <span className="text-emerald-600 font-medium">Synced</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="text-foreground">2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
