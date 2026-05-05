"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

import { setTokenInCookies } from "@/lib/tokenUtils";

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

    if (response.success && response.data) {
      const { accessToken, refreshToken, token } = response.data;
      
      if (accessToken) await setTokenInCookies("accessToken", accessToken);
      if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
      if (token) await setTokenInCookies("better-auth.session_token", token, 86400);
    }

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
