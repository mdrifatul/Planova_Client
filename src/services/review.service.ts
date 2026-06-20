import { env } from "@/env";
import {
  ApiResponse,
  CreateReviewDto,
  Review,
  UpdateReviewDto,
} from "@/interfaces";
import { cookies } from "next/headers";

export const reviewService = {
  createReview: async function (
    payload: CreateReviewDto,
  ): Promise<ApiResponse<Review>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/reviews`, {
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
          error: { message: "Failed to create review" },
        };
      }

      const review = await res.json();
      return { data: review, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while creating review" },
      };
    }
  },

  updateReview: async function (
    id: string,
    payload: UpdateReviewDto,
  ): Promise<ApiResponse<Review>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/reviews/${id}`, {
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
          error: { message: "Failed to update review" },
        };
      }

      const review = await res.json();
      return { data: review, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while updating review" },
      };
    }
  },

  deleteReview: async function (
    id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete review" },
        };
      }

      return {
        data: { message: "Review deleted successfully" },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while deleting review" },
      };
    }
  },

  getAllReviews: async function (
    limit?: number,
    skip?: number,
  ): Promise<ApiResponse<Review[]>> {
    try {
      const cookieStore = await cookies();
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("limit", limit.toString());
      if (skip) queryParams.append("skip", skip.toString());

      const url = `${env.API_URL}/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return {
          data: null,
          error: {
            message:
              errorData?.message ||
              errorData?.error ||
              `Failed to fetch reviews (Status: ${res.status})`,
          },
        };
      }

      const response = await res.json();

      const reviews = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
          ? response.data
          : [];
      return { data: reviews, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while fetching reviews",
        },
      };
    }
  },

  getReviewsByEventId: async function (
    eventId: string,
    limit?: number,
    skip?: number,
  ): Promise<ApiResponse<Review[]>> {
    try {
      const cookieStore = await cookies();
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("limit", limit.toString());
      if (skip) queryParams.append("skip", skip.toString());

      const url = `${env.API_URL}/reviews/event/${eventId}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return {
          data: null,
          error: {
            message:
              errorData?.message ||
              errorData?.error ||
              `Failed to fetch event reviews (Status: ${res.status})`,
          },
        };
      }

      const response = await res.json();

      const reviews = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
          ? response.data
          : [];
      return { data: reviews, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while fetching event reviews",
        },
      };
    }
  },

  getReviewById: async function (id: string): Promise<ApiResponse<Review>> {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/reviews/${id}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return {
          data: null,
          error: {
            message:
              errorData?.message ||
              errorData?.error ||
              `Failed to fetch review (Status: ${res.status})`,
          },
        };
      }

      const response = await res.json();
      const review = response.data || response;
      return { data: review, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while fetching review",
        },
      };
    }
  },
};
