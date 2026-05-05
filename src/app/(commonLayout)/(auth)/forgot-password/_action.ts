"use server";

import { forgetPassword } from "@/services/auth.services";
import { forgetPasswordSchema, TForgetPasswordPayload } from "@/zod/auth.validation";

export const handleForgetPassword = async (payload: TForgetPasswordPayload) => {
  const parsedPayload = forgetPasswordSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || "Invalid input",
    };
  }

  try {
    const result = await forgetPassword(parsedPayload.data.email);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
