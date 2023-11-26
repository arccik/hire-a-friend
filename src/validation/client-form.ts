import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name is required").max(50, "Name is too long"),
  image: z.string().url("Invalid image URL").optional(),
  city: z.string().min(2, "City is required"),
  age: z
    .number({ invalid_type_error: "Required" })
    .min(18, "Must be over 18 to use service")
    .max(99, "Must be under 100")
    .refine((data) => !isNaN(data), {
      message: "Age must be a number",
    }),
  about: z.string().optional(),
  experties: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
