import { z } from "zod";

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

export const createAdminFormZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 ||
        (value.length >= 11 && value.length <= 14),
      "Contact number must be between 11 and 14 characters",
    ),
});

export const editAdminFormZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 ||
        (value.length >= 11 && value.length <= 14),
      "Contact number must be between 11 and 14 characters",
    ),
});

export const createAdminServerZodSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  admin: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address"),
    profilePhoto: z.preprocess(
      emptyStringToUndefined,
      z.url("Profile photo must be a valid URL").optional(),
    ),
    contactNumber: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .min(11, "Contact number must be at least 11 characters")
        .max(14, "Contact number must be at most 14 characters")
        .optional(),
    ),
  }),
});

export const updateAdminServerZodSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .optional(),
    profilePhoto: z.preprocess(
      emptyStringToUndefined,
      z.url("Profile photo must be a valid URL").optional(),
    ),
    contactNumber: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .min(11, "Contact number must be at least 11 characters")
        .max(14, "Contact number must be at most 14 characters")
        .optional(),
    ),
  })
  .refine(
    (value) => Object.values(value).some((field) => field !== undefined),
    {
      message: "At least one field must be provided for update",
    },
  );

export type TCreateAdminFormValues = z.infer<typeof createAdminFormZodSchema>;
export type TEditAdminFormValues = z.infer<typeof editAdminFormZodSchema>;
