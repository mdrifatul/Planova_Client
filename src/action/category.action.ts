"use server";

import { ApiResponse, Category, CreateCategoryDto } from "@/interfaces";
import { categoryService } from "@/services/category.service";

// Create a new category
export const createCategoryAction = async (
  payload: CreateCategoryDto,
): Promise<ApiResponse<Category>> => {
  const res = await categoryService.createCategory(payload);
  return res;
};

// Get all categories
export const getAllCategoriesAction = async (): Promise<
  ApiResponse<Category[]>
> => {
  const res = await categoryService.getAllCategories();
  return res;
};

// Delete category
export const deleteCategoryAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await categoryService.deleteCategory(id);
  return res;
};
