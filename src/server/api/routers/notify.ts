import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notifyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId: ctx.session.user.id,
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
    .input(z.object({ message: z.string(), image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.notification.create({
        data: {
          userId: ctx.session.user.id,
          message: input.message,
          image: input.image,
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
  setAllRead: protectedProcedure
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
