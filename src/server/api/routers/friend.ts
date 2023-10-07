import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
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

    return ctx.prisma.user.findMany({ where: { ...options } });
  }),
});
