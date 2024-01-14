import { z } from "zod";


export const saveMessageSchema = z.object({
  primaryKey: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export type SaveMessage = z.infer<typeof saveMessageSchema>;


