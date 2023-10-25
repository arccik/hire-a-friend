import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { chatHrefConstructor } from "~/helpers/chatHrefConstructor";
import { authOptions } from "~/server/auth";
import { redis } from "~/utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  try {
    const searchPattern = chatHrefConstructor(session.user.id, "*");
    const contacts = await redis.keys(searchPattern);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Wasn't able to get contacts" });
  }
}
