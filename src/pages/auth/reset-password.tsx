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
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import {
  type SignUpSchemaType,
  signUpSchema,
} from "~/validation/user-validation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createUser = api.user.signUp.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<SignUpSchemaType> = (data): void => {
    createUser
      .mutateAsync(data)
      .then(() => console.log("ALL GOOD"))
      .catch(() => setError("email", { message: "User alredy exist!" }));
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
              />
            </form>
            <Button
              className="m-0 p-0 text-xs text-slate-500"
              variant="light"
              onPress={onOpen}
            >
              Don&apos;t remember Email ?
            </Button>
            <Button
              onClick={() =>
                void signIn("email", {
                  email: "arccik@gmail.com",
                  callbackUrl: "/change-password",
                })
              }
              type="submit"
              color="primary"
              className="w-full"
            >
              Reset Password
            </Button>
          </div>
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
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
