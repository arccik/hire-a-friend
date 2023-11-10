import { z } from "zod";

export const messageSchema = z.object({
  sender: z.string().optional(),
  message: z.string(),
  date: z.date(),
});

export const chatUsers = z.object({
  senderId: z.string(),
  receiverId: z.string(),
});

export type ChatUsers = z.infer<typeof chatUsers>;
export type Message = z.infer<typeof messageSchema>;

export type MessageResponse = {
  message: string;
  date: string | Date;
  sender: string;
};
