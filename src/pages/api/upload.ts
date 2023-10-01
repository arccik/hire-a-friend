import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const fileName = randomUUID();

  console.log("Upload Type : ", request.query.type, request.query.fileName);
  const blob = await put(fileName, request.body as File, {
    access: "public",
  });

  return response.status(200).json(blob);
}
