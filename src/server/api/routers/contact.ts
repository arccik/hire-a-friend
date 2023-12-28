import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { contactHrefConstructor } from "~/helpers/chatHrefConstructor";

export const contactsRouter = createTRPCRouter({
  getContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.contact.findFirst({
        where: { userId: input.id },
      });
    }),
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.contact.findMany({
      where: { userId: ctx.session?.user.id, blocked: false },
      include: { user: true },
    });
    const contacts = response.map((data) => ({
      image: data.user.image,
      name: data.user.name,
      contactId: data.contactId,
      id: data.id,
    }));
    return contacts;
  }),
  deleteContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.delete({
        where: { id: input.id },
      });
      return contact;
    }),
  blockContact: protectedProcedure
    .input(z.object({ contactId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
      });

      if (!user) return;

      user.blockedBy.push(ctx.session.user.id);
      await ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          blockedBy: user.blockedBy,
        },
      });

      const response = await ctx.prisma.contact.update({
        where: { id: input.contactId },
        data: { blocked: true },
      });

      return response;
    }),
  unblockContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({ where: { id: input.id } });
      if (!user) return;
      user.blockedBy = user.blockedBy.filter((v) => v !== ctx.session.user.id);
      await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          blockedBy: user.blockedBy,
        },
      });
      return ctx.prisma.contact.updateMany({
        where: { contactId: input.id, userId: ctx.session.user.id },
        data: { blocked: false },
      });
    }),
  addContact: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const searchParams = contactHrefConstructor(
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
});
