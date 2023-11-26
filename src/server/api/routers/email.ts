import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { transporter } from "~/server/email-sender";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { env } from "~/env.mjs";

export const emailRouter = createTRPCRouter({
  passwordResetRequest: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      await transporter.sendMail({
        from: `Rent My Time | Reset Password <${env.EMAIL_FROM}>`,
        to: input.email,
        subject: "Reset Password",
        html: `<p>Click <a href="${env.NEXTAUTH_URL}/reset-password?user.id=${user.id}">here</a> to reset your password</p>`,
      });
      return { message: "Email sent" };
    }),
  contactUs: publicProcedure
    .input(
      z.object({ email: z.string(), subject: z.string(), message: z.string() }),
    )
    .mutation(async ({ input }) => {
       await transporter.sendMail({
         from: input.email,
         to: env.EMAIL_FROM,
         subject: `URGENT: Rent My Time | Contact Us - ${input.email} `,
         html: `<p>Email: ${input.email}</p><p>Subject: ${input.subject}</p><p>Message: ${input.message}</p>`,
       });
      return { message: "Email sent" };
    }),
  reportUser: protectedProcedure
    .input(z.object({ email: z.string(), id: z.string() }))
    .mutation(async ({ input }) => {
      await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: env.EMAIL_FROM,
        subject: `URGENT: Rent My Time | Report User - by ${input.email} `,
        html: `<div><p>Reporter: ${input.email}</p><p>User ${input.id} harassing or violating our community guidelines</p></div>`,
      });
      return { message: "Email sent" };
    }),

  newMessageReceived: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: input.email,
        subject: "New Message Received",
        html: `<p>A new message has been received from XXX</p>`,
      });
    }),
});
