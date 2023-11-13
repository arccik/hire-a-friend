import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { redis } from "~/utils/redis";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { messageSchema, type MessageResponse } from "~/validation/message";
// import { pusherServer } from "~/utils/pusher";
import PusherServer from "pusher";

import { env } from "~/env.mjs";

export const chatRouter = createTRPCRouter({
  getContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.contact.findFirst({
        where: { userId: input.id },
      });
    }),

  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.contact.findMany({
      where: { userId: ctx.session?.user.id },
      include: { user: true },
    });
    const contacts = response.map((data) => ({
      image: data.user.image,
      name: data.user.name,
      contactId: data.contactId,
    }));
    return contacts;
  }),
  addContact: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const searchParams = pusherHrefConstructor(
        ctx.session?.user.id,
        input.id,
      );
      const isExist = await ctx.prisma.contact.findFirst({
        where: {
          userId: ctx.session.user.id,
          contactId: input.id,
        },
      });

      if (!!isExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Contact already exist",
        });
      }
      return await ctx.prisma.contact.create({
        data: {
          userId: ctx.session?.user.id,
          href: searchParams,
          contactId: input.id,
        },
      });
    }),
  deleteContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.contact.deleteMany({
        where: { contactId: input.id, userId: ctx.session?.user.id },
      });
    }),
  deleteMessages: protectedProcedure
    .input(z.object({ messageId: z.string(), contactId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const querySting = pusherHrefConstructor(
        ctx.session.user.id,
        input.contactId,
      );
      await redis.srem(querySting, {
        receiver: ctx.session.user.id,
        sender: input.contactId,
      });
      return { message: "Messages deleted successfully" };
    }),
  getMessages: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const querySting = pusherHrefConstructor(ctx.session.user.id, input);

      const messages: MessageResponse[] = await redis.smembers(querySting);
      // await redis.sadd(querySting, { isRead: true });
      return messages.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    }),
  addMessage: protectedProcedure
    .input(messageSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.sender)
        return new TRPCError({
          message: "Sender is required",
          code: "BAD_REQUEST",
        });
      const querySting = pusherHrefConstructor(
        ctx.session.user.id,
        input.receiver,
      );

      const message = {
        message: input.message,
        date: input.date,
        sender: ctx.session.user.id,
        receiver: input.receiver,
        isRead: false,
      };
      await redis.sadd(querySting, message);

      const pusherServer = new PusherServer({
        appId: env.PUSHER_APP_ID,
        key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: env.PUSHER_APP_SECRET,
        cluster: "eu",
        useTLS: true,
      });
      await pusherServer.trigger(querySting, "incoming-message", message);
    }),
});
