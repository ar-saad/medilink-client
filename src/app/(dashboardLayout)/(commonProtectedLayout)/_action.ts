"use server";

import { logoutUserFromCurrentSession } from "@/services/auth.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

export const logoutUserAction = async (): Promise<
  ApiResponse<null> | ApiErrorResponse
> => {
  try {
    return await logoutUserFromCurrentSession();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "Failed to logout user",
      };
    }

    return {
      success: false,
      message: "Failed to logout user",
    };
  }
};

export const changePasswordAction = async (payload: any) => {
  try {
    const { changePassword } = await import("@/services/auth.services");
    return await changePassword(payload);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to change password",
    };
  }
};
