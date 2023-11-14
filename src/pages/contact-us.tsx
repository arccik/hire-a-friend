import { Button, Card, Input, Textarea } from "@nextui-org/react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ContactUsForm,
  contactUsFormSchema,
} from "~/validation/contac-us-form";
import { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

export default function ContactUsPage() {
  const [msgSent, setMessageSent] = useState(false);

  const sendEmail = api.email.contactUs.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully");
      setMessageSent(true);
    },
    onError: () => {
      toast.error("Error sending message");
      setMessageSent(false);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsForm>({
    resolver: zodResolver(contactUsFormSchema),
  });

  const onSubmit: SubmitHandler<ContactUsForm> = (data): void => {
    console.log(data);
    setMessageSent(true);
    sendEmail.mutate(data);
  };

  if (msgSent) {
    return (
      <main className="p-5">
        <Card className="mx-auto w-1/2 place-content-center p-5">
          <p className="text-center text-xl font-bold">
            Thank you for contacting us!
          </p>
          <p className="text-center text-xs text-slate-400">
            We will get back to you as soon as possible.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="p-5">
      <Card className="mx-auto place-content-center p-5 md:w-1/2">
        <p className="text-center text-xl font-bold text-orange-500">
          Contact Us
        </p>
        <p className="mb-5 text-center text-xs font-semibold text-slate-500">
          We are happy to hear from you.
        </p>
        <form
          className="mx-auto my-5 flex w-96 flex-col gap-5"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <Input
            label="Subject"
            {...register("subject")}
            isInvalid={!!errors.subject}
            errorMessage={errors.subject?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Textarea
            label="Message"
            isInvalid={!!errors.message}
            {...register("message")}
            errorMessage={errors.message?.message}
          />
          <Button type="submit" className="mt-5 bg-orange-300">
            Submit
          </Button>
        </form>
      </Card>
    </main>
  );
}
