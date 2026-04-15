import { env } from "@/env";
import {
  ApiResponse,
  Invitation,
  SendInvitationDto,
  UpdateInvitationDto,
} from "@/interfaces";
import { cookies } from "next/headers";

export const invitationService = {
  // Send invitation
  sendInvitation: async function (
    payload: SendInvitationDto,
  ): Promise<ApiResponse<Invitation>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to send invitation" },
        };
      }

      const invitation = await res.json();
      return { data: invitation, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while sending invitation" },
      };
    }
  },

  // Get received invitations
  getReceivedInvitations: async function (): Promise<
    ApiResponse<Invitation[]>
  > {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/received`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch received invitations" },
        };
      }

      const invitations = await res.json();
      return { data: invitations, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while fetching received invitations",
        },
      };
    }
  },

  // Get sent invitations
  getSentInvitations: async function (): Promise<ApiResponse<Invitation[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/sent`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch sent invitations" },
        };
      }

      const invitations = await res.json();
      return { data: invitations, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while fetching sent invitations",
        },
      };
    }
  },

  // Get event invitations
  getEventInvitations: async function (
    eventId: string,
  ): Promise<ApiResponse<Invitation[]>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/event/${eventId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch event invitations" },
        };
      }

      const invitations = await res.json();
      return { data: invitations, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while fetching event invitations",
        },
      };
    }
  },

  // Get invitation by ID
  getInvitationById: async function (
    id: string,
  ): Promise<ApiResponse<Invitation>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/${id}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Invitation not found" },
        };
      }

      const invitation = await res.json();
      return { data: invitation, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while fetching invitation details",
        },
      };
    }
  },

  // Update invitation
  updateInvitation: async function (
    id: string,
    payload: UpdateInvitationDto,
  ): Promise<ApiResponse<Invitation>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update invitation" },
        };
      }

      const invitation = await res.json();
      return { data: invitation, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while updating invitation" },
      };
    }
  },

  // Delete invitation
  deleteInvitation: async function (
    id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/invitations/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete invitation" },
        };
      }

      return {
        data: { message: "Invitation deleted successfully" },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while deleting invitation" },
      };
    }
  },
};
