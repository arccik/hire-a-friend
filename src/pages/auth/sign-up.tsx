// import { Button, Checkbox, Input, Card } from "@nextui-org/react";
// import Link from "next/link";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { api } from "~/utils/api";
// import { type SignUpSchemaType, signUpSchema } from "~/validation/user-validation";
// import { FaGoogle } from "react-icons/fa";
// import { signIn, useSession } from "next-auth/react";
// import Divider from "~/components/ui/Divider";
// import { useRouter } from "next/router";

// export default function SignUpPage() {
//   const createUser = api.user.signUp.useMutation();
//   const { data: userSession } = useSession();
//   const router = useRouter();
//   if (userSession?.user.id) {
//     void router.push("/");
//   }
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     clearErrors,
//     setError,
//   } = useForm<SignUpSchemaType>({
//     resolver: zodResolver(signUpSchema),
//   });
//   const onSubmit: SubmitHandler<SignUpSchemaType> = (data): void => {
//     createUser
//       .mutateAsync(data)
//       .then(async (e) => {
//         await signIn("credentials", {
//           email: data.email,
//           password: data.password,
//           // redirect: false,

//           callbackUrl: "/auth/choose-member-type",
//         });
//         console.log("ALL GOOD");
//       })
//       .catch((e) => setError("email", { message: "User alredy exist!" }));
//   };

//   return (
//     <section>
//       <div className="mx-auto mb-10 mt-10 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
//         <Card fullWidth className="md:w-1/2">
//           <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
//               Create an account
//             </h1>
//             <form
//               className="space-y-4 md:space-y-6"
//               onSubmit={(event) => void handleSubmit(onSubmit)(event)}
//             >
//               <Input
//                 {...register("email")}
//                 label="Email"
//                 variant="bordered"
//                 autoComplete="email"
//                 placeholder="email@example.com"
//                 errorMessage={errors.email?.message}
//               />
//               <Input
//                 {...register("password")}
//                 label="Create a Password"
//                 variant="bordered"
//                 type="password"
//                 placeholder="Type your password"
//                 errorMessage={errors.password?.message}
//               />
//               <Input
//                 {...register("confirmPassword")}
//                 label="Confirm Password"
//                 variant="bordered"
//                 type="password"
//                 placeholder="Type your password again"
//                 errorMessage={errors.confirmPassword?.message}
//               />

//               <div className="flex items-start ">
//                 <div className="flex h-5 items-center ">
//                   <Checkbox
//                     id="terms"
//                     onValueChange={(v) => {
//                       setValue("terms", v);
//                       clearErrors("terms");
//                     }}
//                   >
//                     <p className={"text-sm font-light  "}>
//                       I accept the{" "}
//                       <Link
//                         className="font-medium  text-primary-600 hover:underline"
//                         href="/docs/terms-and-conditions"
//                       >
//                         Terms and Conditions
//                       </Link>
//                     </p>
//                     {errors.terms?.message && (
//                       <p className="text-xs text-red-500">
//                         Terms and condition must be accepted
//                       </p>
//                     )}
//                   </Checkbox>
//                 </div>
//               </div>
//               <Button
//                 isDisabled={Object.entries(errors).length > 0}
//                 type="submit"
//                 color="primary"
//                 className="w-full"
//               >
//                 Create an account
//               </Button>
//               <Divider text="OR" />
//               <Button
//                 onClick={() => void signIn("google")}
//                 fullWidth
//                 startContent={<FaGoogle />}
//               >
//                 Login with Google
//               </Button>

//               <p className="text-sm font-light text-gray-500">
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/sign-in"
//                   className="font-medium text-primary-600 hover:underline "
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// }

export default function SignUpPage() {
  return null;
}
