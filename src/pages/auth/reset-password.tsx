import { Button, Input, Card } from "@nextui-org/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import {
  type SignUpSchemaType,
  signUpSchema,
} from "~/validation/user-validation";

export default function ResetPasswordPage() {
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
      .then((e) => console.log("ALL GOOD"))
      .catch((e) => setError("email", { message: "User alredy exist!" }));
  };
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
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

              <Button type="submit" color="primary" className="w-full">
                Reset Password
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
