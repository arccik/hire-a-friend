import { z } from "zod";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { env } from "~/env.mjs";

export const ddbClient = new DynamoDBClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { chatHrefConstructor } from "~/helpers/chatHrefConstructor";

import { getMessages, saveMessage } from "../controllers/message-controller";
import { saveMessageSchema } from "~/validation/message";

export const chatRouter = createTRPCRouter({
  saveMessage: protectedProcedure
    .input(saveMessageSchema)
    .mutation(async ({ input }) => {
      return await saveMessage(input);
    }),
  getMessages: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input: { chatId } }) => {
      const primaryKey = chatHrefConstructor(chatId, ctx.session.user.id);
      return await getMessages({ primaryKey });
    }),
  deleteMessage: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(({ input: { chatId } }) => {
      const params = {
        TableName: "ChatHistory",
        Key: {
          primaryKey: { S: chatId },
        },
      };
      const command = new DeleteCommand(params);
      return ddbClient.send(command);
    }),
  isBlocked: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
        blockedBy: { has: ctx.session.user.id },
      },
    });
  }),
});
