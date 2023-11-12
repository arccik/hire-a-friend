import { z } from "zod";

export const messageSchema = z.object({
  sender: z.string(),
  message: z.string(),
  date: z.date(),
  receiver: z.string(),
});


export type Message = z.infer<typeof messageSchema>;

export type MessageResponse = {
  message: string;
  date: string | Date;
  sender: string;
};
