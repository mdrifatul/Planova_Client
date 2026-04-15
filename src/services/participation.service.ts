import { env } from "@/env";
import {
  ApiResponse,
  Participation,
  UpdateParticipationStatusDto,
} from "@/interfaces";
import { cookies } from "next/headers";

export const participationService = {
  // Join an event
  joinEvent: async function (
    eventId: string,
  ): Promise<ApiResponse<Participation>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/participations/join/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to join event" },
        };
      }

      const participation = await res.json();
      return { data: participation.data || participation, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while joining event" },
      };
    }
  },

  // Update participation status
  updateParticipationStatus: async function (
    participationId: string,
    payload: UpdateParticipationStatusDto,
  ): Promise<ApiResponse<Participation>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/participations/status/${participationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update participation status" },
        };
      }

      const participation = await res.json();
      return { data: participation.data || participation, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while updating participation status",
        },
      };
    }
  },

  // Get my participations
  getMyParticipations: async function (): Promise<
    ApiResponse<Participation[]>
  > {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/participations/my-participations`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch participations" },
        };
      }

      const participations = await res.json();
      return { data: participations.data || participations, error: null };
    } catch {
      return {
        data: null,
        error: {
          message: "Something went wrong while fetching participations",
        },
      };
    }
  },

  // Delete participation
  deleteParticipation: async function (
    participationId: string,
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/participations/${participationId}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete participation" },
        };
      }

      return {
        data: { message: "Participation deleted successfully" },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while deleting participation" },
      };
    }
  },
};
