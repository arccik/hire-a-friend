import { z } from "zod";

export const messageSchema = z.object({
  sender: z.string(),
  message: z.string(),
  date: z.date(),
  receiver: z.string(),
});


export type MessageResponse = z.infer<typeof messageSchema>;

