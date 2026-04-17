import { Roles } from "@/contants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdmin = userRole === Roles.admin;
  const isModerator = userRole === Roles.moderator;
  const isOrganizer = userRole === Roles.organizer;
  const isUser = userRole === Roles.user;

  if (isAdmin) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (isModerator) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/moderator-dashboard")
    ) {
      return NextResponse.redirect(
        new URL("/moderator-dashboard", request.url),
      );
    }
  }

  if (isOrganizer) {
    if (
      pathName.startsWith("/dashboard") ||
      pathName.startsWith("/organizer-dashboard")
    ) {
      return NextResponse.redirect(
        new URL("/moderator-dashboard", request.url),
      );
    }
  }

  if (isUser) {
    if (
      pathName.startsWith("/admin-dashboard") ||
      pathName.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/moderator-dashboard",
    "/moderator-dashboard/:path*",
    "/organizer-dashboard",
    "/organizer-dashboard/:path*",
  ],
};
