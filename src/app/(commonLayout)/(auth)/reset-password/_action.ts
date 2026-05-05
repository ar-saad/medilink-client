"use server";

import { resetPassword } from "@/services/auth.services";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { resetPasswordSchema, TResetPasswordPayload } from "@/zod/auth.validation";

export const handleResetPassword = async (payload: TResetPasswordPayload) => {
  const parsedPayload = resetPasswordSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || "Invalid input",
    };
  }

  try {
    const result = await resetPassword(parsedPayload.data);
    
    if (result.success) {
      const { token, accessToken, refreshToken, user } = result.data;
      
      await setTokenInCookies("accessToken", accessToken);
      await setTokenInCookies("refreshToken", refreshToken);
      await setTokenInCookies("better-auth.session_token", token, 86400);
      
      return {
        success: true,
        message: result.message,
        data: user
      };
    }
    
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
