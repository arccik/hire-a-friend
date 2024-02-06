import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  blockContact,
  deleteContact,
  getContact,
  getContacts,
  isOnline,
  saveContact,
  unblockContact,
} from "../controllers/contact-controller";


export const contactsRouter = createTRPCRouter({
  addContact: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isExist = await getContact({
        userId: ctx.session.user.id,
        contactId: input.id,
      });
      if (isExist) return;

      return saveContact({ userId: ctx.session.user.id, contactId: input.id });
    }),
  getContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return getContact({ userId: ctx.session.user.id, contactId: input.id });
    }),
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const contactsIds = await getContacts({ userId: ctx.session.user.id });
    if (!contactsIds) return null;
    return Promise.all(
      contactsIds?.map(async (id) => {
        const user = await ctx.prisma.user.findFirst({
          where: { id },
          select: { id: true, name: true, image: true },
        });
        if (!user) return;
        const online = await isOnline({ userId: id });
        return { ...user, online };
      }),
    );
  }),
  deleteContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return deleteContact({
        userId: ctx.session.user.id,
        contactId: input.id,
      });
    }),
  blockContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return blockContact({ userId: ctx.session.user.id, contactId: input.id });
    }),
  unblockContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return unblockContact({
        userId: ctx.session.user.id,
        contactId: input.id,
      });
    }),
});
