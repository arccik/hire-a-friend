import { cn } from "@nextui-org/react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

type AboutProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
};

export default function About({ register, errors }: AboutProps) {
  return (
    <>
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        About
      </label>
      <textarea
        placeholder="Write a few sentences about yourself."
        id="about"
        {...register("about")}
        className={cn(
          !!errors.about
            ? "border-red-500 ring-red-800"
            : "border-input ring-gray-800",
          "placeholder:text-muted-foreground  w-full resize-y rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:border-gray-800 focus-visible:border-slate-800 focus-visible:outline-none focus-visible:ring-1",
        )}
        rows={4}
      />
    </>
  );
}
