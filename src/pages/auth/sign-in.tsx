import { Button, Input, Card } from "@nextui-org/react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "~/validation/user-validation";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Divider from "~/components/ui/Divider";
import { FaGoogle } from "react-icons/fa";

const SignInPage = () => {
  const { data: userSession } = useSession();
  const router = useRouter();

  if (userSession?.user.id) void router.push("/");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    data,
  ): Promise<void> => {
    const response = await signIn("credentials", { ...data, redirect: false });
    if (!response?.ok) {
      setError("email", { message: "Invalid email or password" });
    } else {
      await router.push("/");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mb-10 text-3xl font-extrabold md:text-5xl">
          <span className="bg-gradient-to-r from-pink-900 to-violet-900 bg-clip-text text-transparent">
            Welcome Back
          </span>
        </div>
        <Card fullWidth className="max-w-xl md:w-1/2">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
              Login in to your account
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
              <Input
                {...register("password")}
                label="Password"
                variant="bordered"
                type="password"
                placeholder="Type your password"
                errorMessage={errors.password?.message}
              />

              <Button
                isDisabled={!!errors.email || !!errors.password}
                type="submit"
                color="primary"
                className="w-full"
              >
                Login
              </Button>
              <Divider text="OR" />
              <Button
                onClick={() => void signIn("google")}
                fullWidth
                startContent={<FaGoogle />}
              >
                Login with Google
              </Button>

              <p className="text-sm font-light text-gray-500">
                <Link
                  href="/auth/reset-password"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Forgot your password ?
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};
export default SignInPage;
