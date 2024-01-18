import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getUnread: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.notification.count({
      where: {
        userId: ctx.session.user.id,
        isRead: false,
      },
    });
  }),
  getInfinityScroll: protectedProcedure
    .input(z.object({ cursor: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.notification.findMany({
        take: 10,
        cursor: {
          id: input.cursor,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOne: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.notification.findFirst({
      where: {
        id: input,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        image: z.string(),
        from: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.notification.create({
        data: {
          userId: ctx.session.user.id,
          message: input.message,
          image: input.image,
          from: input.from,
        },
      });
    }),
  setRead: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.notification.update({
      where: {
        id: input,
      },
      data: {
        isRead: true,
      },
    });
  }),
  setAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.notification.updateMany({
      where: { userId: ctx.session.user.id },
      data: {
        isRead: true,
      },
    });
  }),
  setBunchRead: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notification.updateMany({
        where: {
          id: { in: input },
        },
        data: {
          isRead: true,
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.notification.delete({
      where: {
        id: input,
      },
    });
  }),
});
