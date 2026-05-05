"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { TLoginResponse } from "@/types/auth.types";
import { loginSchema, TLoginPayload } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const userLogin = async (
  payload: TLoginPayload,
  redirectPath?: string,
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

    const { token, accessToken, refreshToken, user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 86400); // 1 day in seconds

    // Implement in the catch block
    // if (!emailVerified) {
    //   redirect("/verify-email");
    // } else

    if (needPasswordChange) {
      // Trigger OTP sending for password reset
      await httpClient.post("/auth/forget-password", { email });
      redirect(`/reset-password?email=${email}`);
    } else {
      const targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);

      redirect(targetPath);
    }
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

    if (
      error &&
      error.response &&
      error.response.data.message === "Email not verified"
    ) {
      redirect(`/verify-email?email=${payload.email}`);
    }

    return {
      success: false,
      message: `Login failed: ${error.message || "Unknown error"}`,
    };
  }
};
