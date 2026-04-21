import { env } from "@/env";
import {
  ApiResponse,
  CreateEventDto,
  Event,
  EventParticipant,
  UpdateEventDto,
} from "@/interfaces";
import { cookies } from "next/headers";

export const eventService = {
  // Create a new event
  createEvent: async function (
    payload: CreateEventDto,
  ): Promise<ApiResponse<Event>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/events`, {
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
          error: { message: "Failed to create event" },
        };
      }

      const event = await res.json();
      return { data: event.data || event, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while creating event" },
      };
    }
  },

  // Get all events (public)
  getAllEvents: async function (params?: {
    limit?: number;
    skip?: number;
    page?: number;
    searchTerm?: string;
    visibility?: "PUBLIC" | "PRIVATE";
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    include?: Array<"organizer" | "category" | "_count">;
    [key: string]: unknown;
  }): Promise<ApiResponse<Event[]>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params?.skip !== undefined)
        queryParams.append("skip", params.skip.toString());
      if (params?.page !== undefined)
        queryParams.append("page", params.page.toString());
      if (params?.searchTerm)
        queryParams.append("searchTerm", params.searchTerm);
      if (params?.visibility)
        queryParams.append("visibility", params.visibility);
      if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

      params?.include?.forEach((inc) => queryParams.append("include", inc));

      const reserved = new Set([
        "limit",
        "page",
        "skip",
        "searchTerm",
        "visibility",
        "sortBy",
        "sortOrder",
        "include",
      ]);
      for (const [key, value] of Object.entries(params ?? {})) {
        if (!reserved.has(key) && value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      }

      const url = `${env.API_URL}/events${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      console.log("→ Fetching from URL:", url);

      const res = await fetch(url, {
        cache: "no-store",
      });

      console.log("→ Response status:", res.status, res.ok);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("→ Error response:", errorText);
        return {
          data: null,
          error: { message: `Failed to fetch events: ${res.status}` },
        };
      }

      const response = await res.json();
      console.log("→ Full API response:", response);

      const result = {
        data: response.data || response,
        meta: response.meta,
        error: null,
      };

      console.log("→ Parsed result:", result);
      return result;
    } catch (err) {
      console.error("→ Catch error:", err);
      return {
        data: null,
        error: {
          message: `Something went wrong while fetching events: ${err instanceof Error ? err.message : String(err)}`,
        },
      };
    }
  },

  // Get my events (organizer)
  getMyEvents: async function (
    limit?: number,
    skip?: number,
  ): Promise<ApiResponse<Event[]>> {
    try {
      const cookieStore = await cookies();
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit.toString());
      if (skip) params.append("skip", skip.toString());

      const res = await fetch(
        `${env.API_URL}/events/my-events${params.toString() ? `?${params.toString()}` : ""}`,
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
          error: { message: "Failed to fetch your events" },
        };
      }

      const response = await res.json();
      return {
        data: response.data || response,
        meta: response.meta,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while fetching your events" },
      };
    }
  },

  // Get event by ID
  getEventById: async function (id: string): Promise<ApiResponse<Event>> {
    try {
      const res = await fetch(`${env.API_URL}/events/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Event not found" },
        };
      }

      const event = await res.json();
      return { data: event.data || event, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while fetching event details" },
      };
    }
  },

  // Get event participants
  getEventParticipants: async function (
    eventId: string,
    limit?: number,
    skip?: number,
  ): Promise<ApiResponse<EventParticipant[]>> {
    try {
      const cookieStore = await cookies();
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit.toString());
      if (skip) params.append("skip", skip.toString());

      const res = await fetch(
        `${env.API_URL}/events/${eventId}/participants${params.toString() ? `?${params.toString()}` : ""}`,
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
          error: { message: "Failed to fetch participants" },
        };
      }

      const response = await res.json();
      return {
        data: response.data || response,
        meta: response.meta,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while fetching participants" },
      };
    }
  },

  // Update event
  updateEvent: async function (
    id: string,
    payload: UpdateEventDto,
  ): Promise<ApiResponse<Event>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/events/${id}`, {
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
          error: { message: "Failed to update event" },
        };
      }

      const event = await res.json();
      return { data: event, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while updating event" },
      };
    }
  },

  // Delete event
  deleteEvent: async function (
    id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete event" },
        };
      }

      return {
        data: { message: "Event deleted successfully" },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while deleting event" },
      };
    }
  },
};
