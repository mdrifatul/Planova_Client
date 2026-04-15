"use server";

import {
  ApiResponse,
  CreateReviewDto,
  Review,
  UpdateReviewDto,
} from "@/interfaces";
import { reviewService } from "@/services/review.service";

// Create a new review
export const createReviewAction = async (
  payload: CreateReviewDto,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.createReview(payload);
  return res;
};

// Get all reviews
export const getAllReviewsAction = async (
  limit?: number,
  skip?: number,
): Promise<ApiResponse<Review[]>> => {
  const res = await reviewService.getAllReviews(limit, skip);
  return res;
};

// Get reviews by event ID
export const getReviewsByEventIdAction = async (
  eventId: string,
  limit?: number,
  skip?: number,
): Promise<ApiResponse<Review[]>> => {
  const res = await reviewService.getReviewsByEventId(eventId, limit, skip);
  return res;
};

// Get review by ID
export const getReviewByIdAction = async (
  id: string,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.getReviewById(id);
  return res;
};

// Update review
export const updateReviewAction = async (
  id: string,
  payload: UpdateReviewDto,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.updateReview(id, payload);
  return res;
};

// Delete review
export const deleteReviewAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await reviewService.deleteReview(id);
  return res;
};
