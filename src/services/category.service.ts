import { env } from "@/env";
import { ApiResponse, Category, CreateCategoryDto } from "@/interfaces";
import { cookies } from "next/headers";

export const categoryService = {
  // Create a new category
  createCategory: async function (
    payload: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/categories`, {
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
          error: { message: "Failed to create category" },
        };
      }

      const category = await res.json();
      return { data: category, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while creating category" },
      };
    }
  },

  // Get all categories
  getAllCategories: async function (): Promise<ApiResponse<Category[]>> {
    try {
      const res = await fetch(`${env.API_URL}/categories`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch categories" },
        };
      }

      const categories = await res.json();
      return { data: categories, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while fetching categories" },
      };
    }
  },

  // Delete category
  deleteCategory: async function (
    id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete category" },
        };
      }

      return {
        data: { message: "Category deleted successfully" },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: { message: "Something went wrong while deleting category" },
      };
    }
  },
};
