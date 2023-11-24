// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { redis } from "~/utils/redis";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { messageSchema, type MessageResponse } from "~/validation/message";
import PusherServer from "pusher";

import { env } from "~/env.mjs";

const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: "eu",
  useTLS: true,
});

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
      where: { userId: ctx.session?.user.id, blocked: false },
      include: { user: true },
    });
    const contacts = response.map((data) => ({
      image: data.user.image,
      name: data.user.name,
      contactId: data.contactId,
      id: data.id,
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

      if (!!isExist) return;
      // {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Contact already exist",
      //   });
      // }
      await pusherServer.trigger(input.id, "new-contact", {
        receiver: input.id,
        sender: ctx.session.user.id,
        href: searchParams,
      });

      return await ctx.prisma.contact.createMany({
        data: [
          {
            userId: ctx.session?.user.id,
            href: searchParams,
            contactId: input.id,
          },
          {
            userId: input.id,
            href: searchParams,
            contactId: ctx.session?.user.id,
          },
        ],
      });
    }),
  deleteContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.delete({
        where: { id: input.id },
      });
      await redis.del(contact.href);
      return contact;
    }),
  blockContact: protectedProcedure
    .input(z.object({ contactId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
      });

      if (!user) return;

      user.blockedBy.push(ctx.session.user.id);
      await ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          blockedBy: user.blockedBy,
        },
      });

      const response = await ctx.prisma.contact.update({
        where: { id: input.contactId },
        data: { blocked: true },
      });

      return response;
    }),
  unblockContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({ where: { id: input.id } });
      if (!user) return;
      user.blockedBy = user.blockedBy.filter((v) => v !== ctx.session.user.id);
      await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          blockedBy: user.blockedBy,
        },
      });
      return ctx.prisma.contact.updateMany({
        where: { contactId: input.id, userId: ctx.session.user.id },
        data: { blocked: false },
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
      if (!input.sender) return;
      const isBlocked = await ctx.prisma.contact.findFirst({
        where: { userId: ctx.session.user.id, contactId: input.receiver },
      });
      if (isBlocked?.blocked) return;
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

      await pusherServer.trigger(input.receiver, "incoming-message", message);
    }),
  setUserStatus: protectedProcedure
    .input(z.object({ status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await pusherServer.trigger("online-status", "user-status", {
        userId: ctx.session.user.id,
        status: input.status,
      });
      return { message: "Online status set successfully" };
    }),
  isBlocked: protectedProcedure
    .input(z.object({ contactId: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      const { userId, contactId } = input;
      return ctx.prisma.contact.findFirst({
        where: {
          userId,
          contactId,
          blocked: true,
        },
        select: { blocked: true },
      });
    }),
});
