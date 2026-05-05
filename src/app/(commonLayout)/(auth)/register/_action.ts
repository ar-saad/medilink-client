"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { TRegisterResponse } from "@/types/auth.types";
import { registerSchema, TRegisterPayload } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const userRegister = async (
  payload: TRegisterPayload,
): Promise<TRegisterResponse | ApiErrorResponse> => {
  const parsedPayload = registerSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<TRegisterResponse>(
      "/auth/register",
      parsedPayload.data,
    );

    const { token, accessToken, refreshToken } = response.data;

    if (accessToken) await setTokenInCookies("accessToken", accessToken);
    if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
    if (token) await setTokenInCookies("better-auth.session_token", token, 86400);

    redirect(`/verify-email?email=${payload.email}`);
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message: `Registration failed: ${error.response?.data?.message || error.message || "Unknown error"}`,
    };
  }
};
