import { z } from "zod";

export const messageSchema = z.object({
  id: z.string().optional(),
  sender: z.string(),
  receiver: z.string(),
  message: z.string(),
  type: z.enum(["sender", "receiver"]),
  date: z.date(),
  avatar: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
