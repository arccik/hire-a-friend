import { z } from "zod";

export const friendFilterSchema = z.object({
  gender: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  page: z.number(),
  activities: z
    .object({ has: z.string().optional().nullable() })
    .optional()
    .nullable(),
});

export type FriendFilterSchemaType = z.infer<typeof friendFilterSchema>;
