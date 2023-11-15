import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});

export const info = await transporter.sendMail({
  from: '"Fred Foo 👻" ', // sender address
  to: "bar@example.com, baz@example.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});

export const sendGreetings = async ({
  email,
  text,
}: {
  email: string;
  text: string;
}) => {
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: `Welcome To Rent My Time ${email.split("@")[0]}`,
    text: text,
  });
};