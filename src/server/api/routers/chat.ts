// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { redis } from "~/utils/redis";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { messageSchema, type MessageResponse } from "~/validation/message";

export const chatRouter = createTRPCRouter({
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

      const isFriendHas = await ctx.prisma.contact.findFirst({
        where: {
          userId: input.id,
          contactId: ctx.session.user.id,
        },
      });
      if (!!isFriendHas) return;
      // {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Contact already exist",
      //   });
      // }
      // await pusherServer.trigger(input.id, "new-contact", {
      //   receiver: input.id,
      //   sender: ctx.session.user.id,
      //   href: searchParams,
      // });

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

      // await pusherServer.trigger(input.receiver, "incoming-message", message);
    }),
  setUserStatus: protectedProcedure
    .input(z.object({ status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // await pusherServer.trigger("user-status", "status-change", {
      //   userId: ctx.session.user.id,
      //   status: input.status,
      // });
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
