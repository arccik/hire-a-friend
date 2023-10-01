import { z } from "zod";

export const friendFilterSchema = z.object({
  gender: z.string().optional(),
  online: z.boolean().optional(),
  activities: z.object({ has: z.string().optional() }).optional(),
});

export type FriendFilterSchemaType = z.infer<typeof friendFilterSchema>;
