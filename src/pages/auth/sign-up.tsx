import { Button, Checkbox, Input, Card, Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { type SignUpSchemaType, signUpSchema } from "~/validation/sign-up";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import Divider from "~/components/features/Divider";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const createUser = api.user.signUp.useMutation();
  const { data: userSession } = useSession();
  const router = useRouter();

  if (userSession?.user.id) {
    void router.push("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
    control,
    getValues,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<SignUpSchemaType> = (data): void => {
    createUser
      .mutateAsync(data)
      .then(async () => {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: `/auth/update-profile`,
        });
        toast.success("User Successfully Created!");
      })
      .catch((_) => setError("email", { message: "User alredy exist!" }));
  };

  const handleGoogleSignInClick = () => {
    const userType = getValues("userType");
    const callBackUrl = {
      Friend: "/auth/update-profile",
      Customer: "auth/update-profile",
    };
    void signIn("google", {
      callbackUrl: callBackUrl[userType],
    });
  };

  return (
    <section>
      <div className="mx-auto mb-10 mt-10 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <Card fullWidth className="md:w-1/2">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
              Create an account
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
                isInvalid={!!errors.email?.message}
              />
              <Input
                {...register("password")}
                label="Create a Password"
                variant="bordered"
                type="password"
                placeholder="Type your password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password?.message}
              />
              <Input
                {...register("confirmPassword")}
                label="Confirm Password"
                variant="bordered"
                type="password"
                placeholder="Type your password again"
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword?.message}
              />
              <div className="flex flex-col">
                <p className="text-center text-sm font-bold text-orange-500">
                  User Type
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Controller
                    control={control}
                    name="userType"
                    defaultValue="Friend"
                    render={({ field }) => (
                      <Tabs
                        color="warning"
                        aria-label="Tabs colors"
                        radius="lg"
                        selectedKey={field.value}
                        onSelectionChange={(key) => {
                          field.onChange(key);
                        }}
                      >
                        <Tab key="Customer" title="Rent Time" />
                        <Tab key="Friend" title="Offer Time" />
                      </Tabs>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-start ">
                <div className="flex h-5 items-center ">
                  <Checkbox
                    id="terms"
                    isInvalid={!!errors.terms?.message}
                    onValueChange={(v) => {
                      setValue("terms", v);
                      clearErrors("terms");
                    }}
                  >
                    <p className={"text-sm font-light  "}>
                      I accept the{" "}
                      <Link
                        className="font-medium  text-primary-600 hover:underline"
                        href="/docs/terms-and-conditions"
                        target="_blank"
                      >
                        Terms and Conditions
                      </Link>
                    </p>
                    {errors.terms?.message && (
                      <p className="text-xs text-red-500">
                        Terms and condition must be accepted
                      </p>
                    )}
                  </Checkbox>
                </div>
              </div>

              <Button
                isDisabled={Object.entries(errors).length > 0}
                type="submit"
                color="warning"
                variant="bordered"
                className="w-full"
              >
                Create an account
              </Button>
              <Divider text="OR" />
              <Button
                onClick={handleGoogleSignInClick}
                fullWidth
                color="warning"
                className="bg-orange-500/50"
                startContent={<FaGoogle />}
              >
                Login with Google
              </Button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
