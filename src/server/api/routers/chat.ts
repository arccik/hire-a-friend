import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { redis } from "~/utils/redis";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  chatHrefConstructor,
  pusherHrefConstructor,
} from "~/helpers/chatHrefConstructor";
import { type MessageResponse } from "~/validation/message-validation";
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
    const data = await ctx.prisma.user.findFirst({
      where: { id: ctx.session?.user.id },
      select: { contacts: true },
    });
    return data?.contacts;
  }),
  addContact: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string().optional(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const searchParams = chatHrefConstructor(ctx.session?.user.id, input.id);
      const isExist = await ctx.prisma.user.findFirst({
        include: { contacts: true },
        where: {
          id: ctx.session.user.id,
          contacts: { some: { href: searchParams } },
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
          image: input.image,
          name: input.name,
          userId: ctx.session?.user.id,
          href: searchParams,
          contactId: input.id,
        },
      });
    }),

  getMessages: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const querySting = chatHrefConstructor(ctx.session.user.id, input);
      const messages: MessageResponse[] = await redis.smembers(querySting);
      return messages.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    }),
  addMessage: protectedProcedure
    .input(
      z.object({ message: z.string(), receiverId: z.string(), date: z.date() }),
    )
    .mutation(async ({ ctx, input }) => {
      const querySting = pusherHrefConstructor(
        ctx.session.user.id,
        input.receiverId,
      );
      console.log("Query String Radis: TRPC :::: ", querySting);

      const message = {
        message: input.message,
        date: input.date,
        sender: ctx.session.user.id,
      };
      const pusherServer = new PusherServer({
        appId: env.PUSHER_APP_ID,
        key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: env.PUSHER_APP_SECRET,
        cluster: "eu",
        useTLS: true,
      });
      console.log("HEllo FROM TRPS::: ", pusherServer, querySting);
      await pusherServer.trigger(querySting, "incoming-message", message);

      await redis.sadd(querySting, message);
    }),
});
