"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

export type TVerifyEmailPayload = {
  email: string;
  otp: string;
};

export const handleVerifyEmail = async (
  payload: TVerifyEmailPayload,
): Promise<ApiResponse<any> | ApiErrorResponse> => {
  try {
    const response = await httpClient.post<any>(
      "/auth/verify-email",
      payload,
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Email verification failed",
    };
  }
};

export const handleResendOTP = async (
  email: string,
): Promise<ApiResponse<any> | ApiErrorResponse> => {
  try {
    const response = await httpClient.post<any>(
      "/auth/resend-verification-otp",
      { email },
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to resend OTP",
    };
  }
};
