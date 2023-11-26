import type { Appearance, User } from "@prisma/client";
import { z } from "zod";

export const userValidation = z
  .object({
    id: z.string().optional(), // for update users form
    name: z.string().min(3, "Required"),
    email: z.string().email("Email Required"),
    // image: z.any(z.instanceof(File)).optional(),
    // coverImage: z.any(z.instanceof(File)).optional(),
    image: z.any(z.string()),
    coverImage: z.any(z.string()).optional(),

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z
      .number({ invalid_type_error: "Required" })
      .min(18, "Must be over 18 to use service")
      .max(99, "Must be under 100")
      .refine((data) => !isNaN(data), {
        message: "Age must be a number",
      }),
    about: z.string().optional(),
    photos: z.array(z.string()).max(8).optional(),

    country: z.string().optional(),
    street: z.string().optional(),
    city: z.string().min(2, "Required"),
    state: z.string().optional(),
    zipCode: z.string().optional(),

    phoneNumber: z.string().optional(),
    gender: z.string().optional(),
    birthday: z.date().optional(),
    activities: z
      .array(z.string())
      .min(
        1,
        "Please select activities to communicate your preferences and showcase what you are willing to engage in.",
      ),
    hobbies: z.array(z.string()).optional(),

    price: z.any().optional(),

    hidePrice: z.boolean().optional(),
    isOffering: z.boolean().optional(),
    languages: z.array(z.string()).optional(),
    experties: z.string().optional(),
    activated: z.boolean().optional(),
    earnings: z.string().optional(),
    feedback: z.array(z.string()).optional(),
    zodiacSign: z.string().optional(),

    password: z.string().optional(),

    preferedAgeRange: z.array(z.number()).optional(),
    availability: z
      .object({
        id: z.string().optional(),
        monday: z.string().optional(),
        tuesday: z.string().optional(),
        wednesday: z.string().optional(),
        thursday: z.string().optional(),
        friday: z.string().optional(),
        saturday: z.string().optional(),
        sunday: z.string().optional(),
      })
      .optional(),

    appearance: z.object({
      id: z.string().optional(),
      height: z.string().optional(),
      weight: z.string().optional(),
      hairColor: z.string().optional(),
      eyeColor: z.string().optional(),
      bodyType: z.string().optional(),
      ethnicity: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.price && !data.hidePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["price"],
        message: "Price Required, to hide price checkbox above",
      });
    }
  });

export type UserValidationType = z.infer<typeof userValidation>;

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

export type BigFormPropType = User & { userId: string } & {
  appearance: Appearance | null;
};
