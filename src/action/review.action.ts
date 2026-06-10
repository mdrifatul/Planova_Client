"use server";

import {
  ApiResponse,
  CreateReviewDto,
  Review,
  UpdateReviewDto,
} from "@/interfaces";
import { reviewService } from "@/services/review.service";


export const createReviewAction = async (
  payload: CreateReviewDto,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.createReview(payload);
  return res;
};


export const getAllReviewsAction = async (
  limit?: number,
  skip?: number,
): Promise<ApiResponse<Review[]>> => {
  const res = await reviewService.getAllReviews(limit, skip);
  return res;
};


export const getReviewsByEventIdAction = async (
  eventId: string,
  limit?: number,
  skip?: number,
): Promise<ApiResponse<Review[]>> => {
  const res = await reviewService.getReviewsByEventId(eventId, limit, skip);
  return res;
};


export const getReviewByIdAction = async (
  id: string,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.getReviewById(id);
  return res;
};


export const updateReviewAction = async (
  id: string,
  payload: UpdateReviewDto,
): Promise<ApiResponse<Review>> => {
  const res = await reviewService.updateReview(id, payload);
  return res;
};


export const deleteReviewAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await reviewService.deleteReview(id);
  return res;
};
