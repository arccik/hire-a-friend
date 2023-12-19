import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(3, "Email is required").email(),

    password: z.string().min(3, "Password must have more than 8 characters"),
    confirmPassword: z
      .string()
      .min(3, "Password must have more than 8 characters"),
    terms: z
      .literal<boolean>(true)
      .refine((v) => v, "Terms and condition must be accepted"),
    userType: z.enum(["Friend", "Customer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const loginSchema = z.object({
  email: z.string().min(3, "Required").email(),
  password: z.string().min(3, "Password is required"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
