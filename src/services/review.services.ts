"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { TCreateReviewPayload, TReview } from "@/types/review.types";

export const createReview = async (payload: TCreateReviewPayload) => {
  try {
    return await httpClient.post<TReview>("/reviews", payload);
  } catch (error) {
    console.log("Error creating review:", error);
    throw error;
  }
};

export const getMyReviews = async () => {
  try {
    return await httpClient.get<TReview[]>("/reviews/my-reviews");
  } catch (error) {
    console.log("Error fetching my reviews:", error);
    throw error;
  }
};

export const getAllReviews = async () => {
  try {
    return await httpClient.get<TReview[]>("/reviews");
  } catch (error) {
    console.log("Error fetching all reviews:", error);
    throw error;
  }
};
export const updateReview = async (id: string, payload: Partial<TCreateReviewPayload>) => {
  try {
    return await httpClient.patch<TReview>(`/reviews/${id}`, payload);
  } catch (error) {
    console.log("Error updating review:", error);
    throw error;
  }
};
