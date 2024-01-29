import { z } from "zod";


export const saveMessageSchema = z.object({
  primaryKey: z.string().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  message: z.string(),
  timestamp: z.number(),
});

export type SaveMessage = z.infer<typeof saveMessageSchema>;


