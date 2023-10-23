import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "~/utils/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import {
  messageSchema,
  chatUsers,
  MessageResponse,
  Message,
} from "~/validation/message-validation";
import { mergeSenderReceiver } from "~/helper/extract-sender-receiver";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    try {
      const { receiverId, reverse } = req.query;
      if (!receiverId) {
        return res
          .status(400)
          .json({ message: "Invalid query, receiver Id not provided!" });
      }
      // const messages = await redis.smembers(
      //   `chat:${session.user.id}:${receiverId}`,
      // );
      const receiver = Array.isArray(receiverId) ? receiverId[0] : receiverId;
      if (!receiver)
        return res.status(400).json({ message: "Invalid receiver id" });
      const messages = await redis.smembers(
        mergeSenderReceiver({
          sender: session.user.id,
          receiver,
          reverse: !!reverse,
        }),
      );
      res.json(messages);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Cannot access db, something went wrong!" });
    }
  }
  if (req.method === "POST") {
    try {
      // const rawData: Message = JSON.parse(req.body);
      const data = messageSchema.parse(req.body as Message);
      // await redis.sadd(`chat:${session.user.id}:${data.receiverId}`, {
      await redis.sadd(
        mergeSenderReceiver({
          sender: session.user.id,
          receiver: data.receiverId,
          reverse: false,
        }),
        {
          message: data.message,
          date: data.date,
        },
      );
      return res.json({ message: "Message added", ok: true });
    } catch (error) {
      console.log("Error Adding messages: ", error);
      return res.status(400).json({ message: "Invalid message" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
