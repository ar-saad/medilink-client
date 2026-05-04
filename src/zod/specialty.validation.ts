import { z } from "zod";

export const specialtyValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z.any().optional(),
});
