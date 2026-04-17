import { UserProfileView } from "@/components/layout/UserProfileView";
import { userService } from "@/services/user.service";

export default async function ModeratorDashboardPage() {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 md:p-12">
      <UserProfileView user={user} />
    </div>
  );
}
