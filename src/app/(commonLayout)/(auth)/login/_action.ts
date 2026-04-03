"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { TLoginResponse } from "@/types/auth.types";
import { loginSchema, TLoginPayload } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const userLogin = async (
  payload: TLoginPayload,
): Promise<TLoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<TLoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    const { token, accessToken, refreshToken } = response.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    redirect("/dashboard");
  } catch (error: any) {
    return {
      success: false,
      message: `Login failed: ${error.message || "Unknown error"}`,
    };
  }
};
