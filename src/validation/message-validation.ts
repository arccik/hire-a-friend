import { z } from "zod";

export const messageSchema = z.object({
  senderId: z.string().optional(),
  receiverId: z.string(),
  message: z.string(),
  date: z.string(),
  reverse: z.string().optional(),
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
  senderId?: string;
};
