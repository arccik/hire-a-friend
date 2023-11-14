import { z } from "zod";

export const contactUsFormSchema = z.object({
  subject: z
    .string()
    .min(2, "Subject is required")
    .max(50, "Subject is too long"),
  email: z.string().min(4, "Email is required").email(),
  message: z.string().min(2, "Message is required"),
});

export type ContactUsForm = z.infer<typeof contactUsFormSchema>;
