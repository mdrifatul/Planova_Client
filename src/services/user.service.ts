import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "unauthenticated" } };
      }

      const session = await res.json();
      if (!session || !session.user) {
        return { data: null, error: { message: "unauthenticated" } };
      }

      return { data: session, error: null };
    } catch {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  getAllUser: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/users`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          error: {
            message: errorData?.message || "Failed to retrieve user directory",
          },
        };
      }

      const users = await res.json();
      return { data: users.data || users, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message:
            err instanceof Error
              ? err.message
              : "System synchronization failure",
        },
      };
    }
  },

  updateUserStatus: async function (id: string, status?: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStor.toString(),
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update user status" },
        };
      }

      const data = await res.json();
      return { data: data.data || data, error: null };
    } catch {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  updateUserRole: async function (id: string, role?: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStor.toString(),
        },
        body: JSON.stringify({ role }),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Update user role failed:", {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
        return {
          data: null,
          error: {
            message:
              errorData?.message ||
              `Failed to update user role (${res.status})`,
          },
        };
      }

      const data = await res.json();
      return { data: data.data || data, error: null };
    } catch (err) {
      console.error("Update user role error:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  updateUserProfile: async function (
    id: string,
    data: { name?: string; phone?: string; address?: string; image?: string },
  ) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStor.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          error: {
            message: errorData?.message || "Failed to update profile",
          },
        };
      }

      const updatedUser = await res.json();
      return { data: updatedUser.data || updatedUser, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  getUserById: async function (id: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        headers: {
          Cookie: cookieStor.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch user data" },
        };
      }

      const user = await res.json();
      return { data: user.data || user, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  deleteUser: async function (id: string) {
    try {
      const cookieStor = await cookies();
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStor.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          error: { message: errorData?.message || "Failed to delete user" },
        };
      }

      const data = await res.json();
      return { data: data.data || data, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },
};
