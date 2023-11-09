import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name is required").max(50, "Name is too long"),
  image: z.string().url("Invalid image URL").optional(),
  city: z.string().min(2, "City is required"),
});

export type ClientFormData = z.infer<typeof clientSchema>;
