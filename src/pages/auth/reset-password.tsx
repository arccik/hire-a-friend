import {
  Button,
  Input,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { SiMinutemailer } from "react-icons/si";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import z from "zod";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = api.email.passwordResetRequest.useMutation({
    onSuccess: () => {
      setEmailSent(true);
      setIsLoading(false);
      toast.success("Email Sent, check your inbox");
    },
    onError: (error) => {
      setEmailSent(false);
      setIsLoading(false);
      toast.error(`Couldn't send email ${error.message} `);
    },
    onMutate: () => setIsLoading(true),
  });

  const schema = z.object({
    email: z.string().email(),
  });

  type SchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    sendEmail.mutate({ email: data.email });
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex h-[32rem] flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="text-3xl font-extrabold md:text-5xl">
          <span className="bg-gradient-to-r from-pink-900 to-violet-900 bg-clip-text text-transparent">
            Forgot your password?
          </span>
          <p className="mb-10 text-xl">No problem.</p>
        </div>

        <Card fullWidth className="max-w-xl md:w-1/2">
          {!emailSent ? (
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
                Reset your password
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              >
                <Input
                  {...register("email")}
                  label="Email"
                  variant="bordered"
                  autoComplete="email"
                  placeholder="email@example.com"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                />

                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Reset Password
                </Button>
              </form>
              <Button
                className="m-0 p-0 text-xs text-slate-500"
                variant="light"
                onPress={onOpen}
              >
                Don&apos;t remember Email ?
              </Button>
            </div>
          ) : (
            <p className="p-5 text-center text-2xl font-bold">
              Reset password link sent{" "}
              <SiMinutemailer
                className="mx-auto mt-10 text-orange-500"
                size="5rem"
              />
              <br /> Check your inbox
            </p>
          )}
        </Card>
      </div>
      <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Recover password
              </ModalHeader>
              <ModalBody>
                <p>
                  Please use email porivded to send request to administation for
                  password recovery in case email is forgotten.
                  <a type="email">admin@rentmytime.co.uk</a>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
