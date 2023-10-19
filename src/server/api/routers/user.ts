import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userValidation, signUpSchema } from "~/validation/user-validation";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const isExist = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (!!isExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      } else {
        return ctx.prisma.user.create({
          data: {
            email: input.email,
            password: input.password,
          },
        });
      }
    }),
  create: publicProcedure.input(userValidation).mutation(({ ctx, input }) => {
    const { appearance, ...rest } = input;
    return ctx.prisma.user.create({
      data: {
        ...rest,
        appearance: { create: appearance },
      },
    });
  }),
  update: protectedProcedure
    .input(userValidation.extend({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { appearance, ...rest } = input;
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          appearance: { create: appearance },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: { appearance: true, Rate: true },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getActiveFriends: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        // activated: false,
      },
    });
  }),
  changeMemberStatus: protectedProcedure
    .input(z.object({ memberType: z.enum(["Friend", "Customer"]) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { userType: input.memberType },
      });
    }),
});
