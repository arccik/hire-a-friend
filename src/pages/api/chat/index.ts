// import type { NextApiRequest, NextApiResponse } from "next";
// import { z } from "zod";
// import { redis } from "~/utils/redis";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "~/server/auth";

// import { messageSchema } from "~/validation/message-validation";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).json({ message: "Unauthorized" });

//   if (req.method === "GET") {
//     try {
//       const messages = await redis.smembers(`message:${session.user.name}`);
//       res.json(messages);
//     } catch (error) {
//       return res
//         .status(400)
//         .json({ message: "Cannot access db, something went wrong!" });
//     }
//   }
//   if (req.method === "POST") {
//     try {
//       let formData;

//       if (typeof req.body === "string") {
//         formData = JSON.parse(req.body);
//       } else {
//         formData = req.body;
//       }
//       const data = messageSchema.parse(formData);
//       await redis.sadd(`message:${data.sender}`, data.message);
//       return res.json({ message: "Message added" });
//     } catch (error) {
//       return res.status(400).json({ message: "Invalid message" });
//     }
//   }

//   return res.status(405).json({ message: "Method not allowed" });
// }
