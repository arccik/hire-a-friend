import { z } from "zod";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
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
import {
  deleteContact,
  getContacts,
  saveContact,
} from "../controllers/contact-controller";
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
    .mutation(async ({ input: { chatId } }) => {
      const params = {
        TableName: "ChatHistory",
        Key: {
          primaryKey: { S: chatId },
        },
      };
      const command = new DeleteCommand(params);
      return ddbClient.send(command);
    }),
  saveContact: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const href = chatHrefConstructor(ctx.session.user.id, input);
      const isExist = await ctx.prisma.contact.findFirst({ where: { href } });
      if (isExist) return;
      await ctx.prisma.contact.create({
        data: {
          href,
          userId: ctx.session.user.id,
          contactId: input,
        },
      });
      return await saveContact({
        userId: ctx.session.user.id,
        contactId: input,
      });
    }),
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const contactsIds = await getContacts({ userId: ctx.session.user.id });
    if (!contactsIds) return [];

    const result = contactsIds.map(async (id) => {
      if (!id) return;
      return await ctx.prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          image: true,
          name: true,
        },
      });
    });

    return Promise.all(result);
  }),
  getContactsIds: protectedProcedure.query(async ({ ctx }) => {
    return await getContacts({ userId: ctx.session.user.id });
  }),
  getContact: protectedProcedure
    .input(z.object({ contactId: z.string() }))
    .query(async ({ ctx, input: { contactId } }) => {
      const params = {
        TableName: "Contacts",
        KeyConditionExpression: "userId = :userId AND contactId = :contactId",
        ExpressionAttributeValues: {
          ":userId": ctx.session.user.id,
          ":contactId": contactId,
        },
      };
      const command = new QueryCommand(params);
      const response = await ddbClient.send(command);

      if (!response.Items) return null;

      return response.Items;
    }),
  deleteContact: protectedProcedure
    .input(z.object({ contactId: z.string() }))
    .mutation(async ({ ctx, input: { contactId } }) => {
      const response = await deleteContact({
        userId: ctx.session.user.id,
        contactId,
      });
      if (!response) {
        console.log("Contact not found or already deleted.");
      } else {
        console.log("Contact deleted successfully.");
      }
    }),
});
