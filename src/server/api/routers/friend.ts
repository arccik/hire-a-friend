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
  search: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: input } },
          { lastName: { contains: input } },
          { email: { contains: input } },
        ],
      },
    });
  }),
  vote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("Voting ::: ");
      const isVoted = await ctx.prisma.rate.findFirst({
        where: { voterId: ctx.session.user.id, targetUserId: input.id },
      });
      if (!!isVoted) {
        await ctx.prisma.rate.delete({
          where: { id: isVoted.id },
        });
        console.log("Removing vote : ");
      } else {
        const response = await ctx.prisma.rate.create({
          data: {
            targetUserId: input.id,
            voterId: ctx.session.user.id,
          },
        });
        console.log("Adding vote : ", isVoted, response);
      }
    }),
});


// id?: string
//   voterId: string
//   targetUserId: string
//   rating?: number