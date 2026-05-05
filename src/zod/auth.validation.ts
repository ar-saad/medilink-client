import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerBaseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
});

export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export const forgetPasswordSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  otp: z.string().min(6, "OTP must be 6 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export type TLoginPayload = z.infer<typeof loginSchema>;
export type TRegisterPayload = z.infer<typeof registerSchema>;
export type TForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;
export type TResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
export type TChangePasswordPayload = z.infer<typeof changePasswordSchema>;
