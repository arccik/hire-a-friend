import { z } from "zod";

export const userValidation = z.object({
  name: z.string().min(3, "Required"),
  email: z.string().email("Email Required"),
  images: z.any(z.string()).optional(),
  // image: z.any(z.instanceof(File)).optional(),
  // coverImage: z.any(z.instanceof(File)).optional(),
  image: z.any(z.string()).optional(),
  coverImage: z.any(z.string()).optional(),

  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z
    .number()
    .min(18, "Must be 18+")
    .max(99, "Must be under 100")
    .optional(),
  about: z.string().optional(),
  photos: z.array(z.string()).optional(),

  country: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),

  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.date().optional(),
  activities: z.array(z.string()).optional(),
  price: z.number().optional(),
  currency: z.string().optional(),
  isOffering: z.boolean().optional(),
  languages: z.array(z.string()).optional(),
  activated: z.boolean().optional(),
  earnings: z.string().optional(),
  feedback: z.array(z.string()).optional(),

  password: z.string().optional(),

  appearance: z.object({
    id: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    hairColor: z.string().optional(),
    eyeColor: z.string().optional(),
    bodyType: z.string().optional(),
    ethnicity: z.string().optional(),
  }),
});
export type UserValidationType = z.infer<typeof userValidation>;

export const signUpSchema = z
  .object({
    email: z.string().min(3, "Required").email(),

    password: z.string().min(3, "Password must have more than 8 characters"),
    confirmPassword: z
      .string()
      .min(3, "Password must have more than 8 characters"),
    terms: z
      .literal<boolean>(true)
      .refine((v) => v, "Terms and condition must be accepted"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  export const loginSchema = z.object({
    email: z.string().min(3, "Required").email(),
    password: z.string().min(3, "You must enter a password"),
  });

  export type SignUpSchemaType = z.infer<typeof signUpSchema>;
  export type LoginSchemaType = z.infer<typeof loginSchema>;


