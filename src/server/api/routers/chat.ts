import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { redis } from "~/utils/redis";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userValidation, signUpSchema } from "~/validation/user-validation";
import {
  chatHrefConstructor,
  contactsHrefConstructor,
} from "~/helpers/chatHrefConstructor";

export const chatRouter = createTRPCRouter({
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const searchParams = contactsHrefConstructor(ctx.session?.user.id);
    const contacts = await redis.keys(searchParams);
    const contactIds = contacts.map((contact) => {
      const keys = contact.split(":").splice(1);
      return keys.filter((user) => user !== ctx.session?.user.id)[0];
    });
    return contactIds;
  }),
  // getChats: protectedProcedure.query(async ({ ctx }) => {
  //   const searchParams = contactsHrefConstructor(ctx.session?.user.id);
  //   const chats = await redis.keys(searchParams);
  //   return chats;
  // }),
  getMessages: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const querySting = chatHrefConstructor(ctx.session.user.id, input);
      const messages = await redis.smembers(querySting);
      return messages;
    }),
});
