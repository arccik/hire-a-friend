import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { transporter } from "~/server/email-sender";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";

export const emailRouter = createTRPCRouter({
  sendGreetings: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: input.email,
        subject: `Welcome To Rent My Time ${input.email.split("@")[0]}`,
        html: `<p>Welcome To Rent My Time ${input.email.split("@")[0]}</p>`,
      });
    }),
  passwordResetRequest: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
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
        from: env.EMAIL_FROM,
        to: input.email,
        subject: "Reset Password",
        html: `<p>Click <a href="${env.NEXTAUTH_URL}/reset-password?user.id=${user.id}">here</a> to reset your password</p>`,
      });
      return { message: "Email sent" };
    }),
  newMessageReceived: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: input.email,
        subject: "New Message Received",
        html: `<p>A new message has been received from XXX</p>`,
      });
    }),
});
