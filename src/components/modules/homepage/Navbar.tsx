import { userService } from "@/services/user.service";
import { NavbarClient } from "./NavbarClient";

const Navbar = async () => {
  const { data: session } = await userService.getSession();
  const isLoggedIn = !!session;
  const userName = session?.user?.name || session?.name;
  const userRole = session?.user?.role || session?.role;

  return (
    <NavbarClient
      isLoggedIn={isLoggedIn}
      userName={userName}
      userRole={userRole}
    />
  );
};

export { Navbar };
