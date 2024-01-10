import { z } from "zod";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { env } from "~/env.mjs";

const client = new DynamoDBClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { chatHrefConstructor } from "~/helpers/chatHrefConstructor";

export const chatRouter = createTRPCRouter({
  saveMessage: protectedProcedure
    .input(
      z.object({
        primaryKey: z.string(),
        senderId: z.string(),
        recipientId: z.string(),
        message: z.string(),
        timestamp: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const params = {
        TableName: "ChatHistory",
        Item: input,
      };
      const command = new PutCommand(params);
      return await client.send(command);
    }),
  getMessages: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input: { chatId } }) => {
      const params = {
        TableName: "ChatHistory",
        Key: {
          primaryKey: { S: chatId },
        },
      };
      const command = new GetCommand(params);
      return client.send(command);
    }),
  deleteMessage: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ ctx, input: { chatId } }) => {
      const params = {
        TableName: "ChatHistory",
        Key: {
          primaryKey: { S: chatId },
        },
      };
      const command = new DeleteCommand(params);
      return client.send(command);
    }),
  saveContact: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const href = chatHrefConstructor(ctx.session.user.id, input);
      const isExist = await ctx.prisma.contact.findFirst({ where: { href } });
      console.log("isExist", { isExist });
      if (isExist) return;
      ctx.prisma.contact.create({
        data: {
          href,
          userId: ctx.session.user.id,
          contactId: input,
          blocked: false,
        },
      });
      const params = {
        TableName: "Contacts",
        Item: {
          userId: ctx.session.user.id,
          contactId: input,
        },
      };
      const command = new PutCommand(params);
      return await client.send(command);
    }),
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const params = {
      TableName: "Contacts",
      FilterExpression: "userId = :userId", // Filter by userId
      ExpressionAttributeValues: {
        ":userId": ctx.session.user.id,
      },
      ProjectionExpression: "contactId",
    };
    const command = new ScanCommand(params);
    const response = await client.send(command);

    if (!response.Items) return [];

    const result = response.Items.map(async (contact) => {
      if (!contact) return;
      return await ctx.prisma.user.findFirst({
        where: {
          id: contact.contactId,
        },
        select: {
          id: true,
          image: true,
          name: true,
        },
      });
    });

    return Promise.all(result);
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
      const response = await client.send(command);

      if (!response.Items) return null;

      return response.Items;
    }),
  deleteContact: protectedProcedure
    .input(z.object({ contactId: z.string() }))
    .mutation(async ({ ctx, input: { contactId } }) => {
      // const params = {
      //   TableName: "ChatContactsList",
      //   Key: {
      //     userId: { S: ctx.session.user.id },
      //   },
      //   UpdateExpression: "DELETE contactsIds :contactId",
      //   ExpressionAttributeNames: {
      //     "#contactsIds": "contactsIds",
      //   },
      //   ExpressionAttributeValues: {
      //     ":contactId": contactId,
      //   },
      // };

      // const command = new UpdateCommand(params);
      // try {
      //   const response = await client.send(command);
      //   console.log("ContactId deleted successfully:", response);
      //   return response;
      // } catch (error) {
      //   console.error("Error deleting contactId:", error);
      //   throw error; // Re-throw for proper error handling
      // }
      const params = {
        TableName: "Contacts",
        Key: {
          userId: ctx.session.user.id, // Partition key
          contactId: contactId,
        },
      };

      const command = new DeleteCommand(params);
      const response = await client.send(command);

      if (!response) {
        console.log("Contact not found or already deleted.");
      } else {
        console.log("Contact deleted successfully.");
      }
    }),
});
