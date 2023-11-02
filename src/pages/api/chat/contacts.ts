import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { contactsHrefConstructor } from "~/helpers/chatHrefConstructor";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { redis } from "~/utils/redis";

type ContactType = {
  sender: string;
  receiver: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  try {
    const searchPattern = contactsHrefConstructor(session.user.id);
    const contactsStrings = await redis.keys(searchPattern);

    const contacts = contactsStrings.map((contact) => {
      const userIds = contact.split(":").splice(1);

      return { sender: userIds[0], receiver: userIds[1] };
    });

    const senderData = await prisma.user.findFirst({
      where: {
        id: contacts[0]?.receiver,
      },
      select: { image: true, name: true, status: true },
    });

    console.log("SenderData from PRisma: ", senderData);
    // console.log("Contacts:::: ", { contacts, contactsStrings, searchPattern });

    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Wasn't able to get contacts" });
  }
}
