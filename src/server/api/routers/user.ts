import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clientSchema } from "~/validation/client-form";
import { userValidation } from "~/validation/member";
import { signUpSchema } from "~/validation/sign-up";
import { isOnline } from "../controllers/contact-controller";
// import bcrypt from "bcrypt";

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
        // const hashedPassword = await argon2.hash(input.password, {
        //   saltLength: 10,
        // });
        return ctx.prisma.user.create({
          data: {
            email: input.email,
            password: input.password,
            userType: input.userType,
          },
        });
      }
    }),
  create: publicProcedure.input(userValidation).mutation(({ ctx, input }) => {
    const { availability, appearance, ...rest } = input;
    return ctx.prisma.user.create({
      data: {
        ...rest,
        appearance: { create: appearance },
        availability: { create: availability },
      },
    });
  }),
  update: protectedProcedure
    .input(userValidation)
    .mutation(({ ctx, input }) => {
      const { availability, appearance, ...rest } = input;
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          appearance: { create: appearance },
          availability: { create: availability },
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
    .query(async ({ ctx, input }) => {
      const online = await isOnline({ userId: input.id });
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: { appearance: true, Rate: true, availability: true },
      });
      if (!user) return null;

      return { ...user, password: null, online };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getActiveFriends: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        // activated: true,
        userType: "Friend",
      },
      // select: { password: false },
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
  count: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count();
  }),
  isUserTypeChoosen: protectedProcedure.query(async ({ ctx }) => {
    const isChoosen = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { userType: true },
    });
    return !!isChoosen?.userType;
  }),
  lastFiveUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: { createdAt: { gt: new Date(Date.now() - 50 * 60 * 1000) } },
      take: 5,
      // select: { password: false },
    });
  }),
  updateClientProfile: protectedProcedure
    .input(clientSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
  makeActive: protectedProcedure
    .input(z.object({ id: z.string(), status: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.id },
      });
      if (
        !user?.name ||
        !user?.age ||
        !user?.image ||
        !user?.activities.length
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "To activate your account, please fill in all the required fields.",
        });
      }

      return ctx.prisma.user.update({
        where: { id: input.id },
        data: { activated: input.status },
      });
    }),
});
