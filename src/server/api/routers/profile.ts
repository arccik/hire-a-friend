import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { friendFilterSchema } from "~/validation/filter";
import { clientSchema } from "~/validation/client-form";
import { userValidation } from "~/validation/member";
import { TRPCError } from "@trpc/server";
import { signUpSchema } from "~/validation/sign-up";
import { isOnline } from "../controllers/contact-controller";
import { generateFilterOptions, hideFieldsFromClient } from "~/helpers/prisma";

export const profileRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const online = await isOnline({ userId: input.id });
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: { appearance: true, Rate: true },
      });
      if (!user) return null;

      return { ...user, password: null, online };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  filter: publicProcedure.input(friendFilterSchema).query(({ ctx, input }) => {
    const { options, skip, take } = generateFilterOptions(
      input,
      ctx.session?.user.id,
    );
    const users = ctx.prisma.user.findMany({
      where: {
        ...options,
      },
      skip,
      take,
      // select: hideFieldsFromClient(ctx.prisma.user.fields),
    });

    return ctx.prisma.$transaction([
      users,
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
  updateClientProfile: protectedProcedure
    .input(clientSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
  update: protectedProcedure
    .input(userValidation)
    .mutation(({ ctx, input }) => {
      const {  appearance, ...rest } = input;
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          appearance: { create: appearance },
          // availability: { create: availability },
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
  count: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count();
  }),
  getActiveFriends: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const result = await ctx.prisma.user.findMany({
      where: {
        activated: true,
        userType: "Friend",
        id: userId ? { not: userId } : undefined,
      },
      // select: hideFieldsFromClient(ctx.prisma.user.fields),
    });
    result.filter((value) => (value.password = null));
    return result;
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
  isUserTypeChoosen: protectedProcedure.query(async ({ ctx }) => {
    const isChoosen = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { userType: true },
    });
    return !!isChoosen?.userType;
  }),
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
});
