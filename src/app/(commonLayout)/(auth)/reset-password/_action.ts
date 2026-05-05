"use server";

import { resetPassword } from "@/services/auth.services";
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
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
