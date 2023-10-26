import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { friendFilterSchema } from "~/validation/friend-filter-validation";

export const friendRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findFirst({ where: { id: input.id } });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  filter: publicProcedure.input(friendFilterSchema).query(({ ctx, input }) => {
    const options: Record<string, string | boolean | object | null> = {};
    // const options: { [key: string]: string | boolean | object } = {};
    if (!!input.status) options.status = input.status;
    if (input.activities?.has && input.activities.has !== "null") {
      options.activities = input.activities;
    } else {
      delete options.activities;
    }
    if (input.gender && input.gender !== "null") options.gender = input.gender;
    if (input.city && input.city !== "null") options.city = input.city;
    const pageSize = 9;
    const skip = (input.page - 1) * pageSize;
    const take = pageSize;
    options.userType = "Friend";
    return ctx.prisma.$transaction([
      ctx.prisma.user.findMany({
        where: { ...options },
        skip,
        take,
      }),
      ctx.prisma.user.count({ where: { ...options } }),
    ]);
  }),
  search: publicProcedure
    .input(
      z.object({ value: z.string().optional(), page: z.number().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const pageSize = 9;
      const skip = input.page ? (input.page - 1) * pageSize : 0;
      const take = pageSize;

      return ctx.prisma.$transaction([
        ctx.prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: input.value, mode: "insensitive" } },
              { about: { contains: input.value, mode: "insensitive" } },
              { experties: { contains: input.value, mode: "insensitive" } },
            ],
          },
          skip,
          take,
        }),
        ctx.prisma.user.count({
          where: {
            OR: [
              { name: { contains: input.value, mode: "insensitive" } },
              { about: { contains: input.value, mode: "insensitive" } },
              { experties: { contains: input.value, mode: "insensitive" } },
            ],
          },
        }),
      ]);
    }),
  vote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const isVoted = await ctx.prisma.rate.findFirst({
        where: { voterId: ctx.session.user.id, targetUserId: input.id },
      });
      if (!!isVoted) {
        await ctx.prisma.rate.delete({
          where: { id: isVoted.id },
        });
      } else {
        await ctx.prisma.rate.create({
          data: {
            targetUserId: input.id,
            voterId: ctx.session.user.id,
          },
        });
      }
    }),
});


// id?: string
//   voterId: string
//   targetUserId: string
//   rating?: number