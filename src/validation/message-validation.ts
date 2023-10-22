import { z } from "zod";

export const messageSchema = z.object({
  id: z.string().optional(),
  senderId: z.string(),
  receiverId: z.string(),
  message: z.string(),
  date: z.date(),
});

export type Message = z.infer<typeof messageSchema>;
