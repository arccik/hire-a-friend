import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "~/utils/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { messageSchema, Message } from "~/validation/message-validation";
import { chatHrefConstructor } from "~/helpers/chatHrefConstructor";
import { pusherServer } from "~/utils/pusher";

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
      const { receiverId } = req.query;
      if (!receiverId) {
        return res
          .status(400)
          .json({ message: "Invalid query, receiver Id not provided!" });
      }

      const receiver = Array.isArray(receiverId) ? receiverId[0] : receiverId;
      if (!receiver)
        return res.status(400).json({ message: "Invalid receiver id" });
      const querySting = chatHrefConstructor(session.user.id, receiver);
      const messages = await redis.smembers(querySting);

      res.json(messages);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Cannot access db, something went wrong!" });
    }
  }
  if (req.method === "POST") {
    try {
      const requestBody = typeof req.body === "string" ? req.body : "";
      const data = messageSchema.parse(JSON.parse(requestBody));
      // const data = messageSchema.parse(JSON.parse(req.body) as string);

      const querySting = chatHrefConstructor(session.user.id, data.receiverId);
      await pusherServer.trigger(querySting, "message", {
        sender: session.user.id,
        recever: data.receiverId,
      });
      await redis.sadd(querySting, {
        message: data.message,
        date: data.date,
        sender: session.user.id,
      });
      return res.json({ message: "Message added", ok: true });
    } catch (error) {
      console.log("failed to add message: ", error);
      return res.status(400).json({ message: "Invalid message" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
