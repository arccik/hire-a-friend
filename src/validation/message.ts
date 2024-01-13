import { z } from "zod";

export const messageSchema = z.object({
  sender: z.string(),
  message: z.string(),
  date: z.date(),
  receiver: z.string(),
});

export const saveMessageSchema = z.object({
  primaryKey: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export type SaveMessage = z.infer<typeof saveMessageSchema>;


export type MessageResponse = z.infer<typeof messageSchema>;

