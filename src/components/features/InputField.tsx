import { Input } from "@nextui-org/react";
import type { UserValidationType } from "~/validation/member";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "~/lib/utils";

export type InputFieldProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  fieldName: keyof UserValidationType;
  title?: string;
  fullWidth?: boolean;
};

export default function InputField({
  register,
  fieldName,
  title,
  errors,
  fullWidth,
}: InputFieldProps) {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title ? title : fieldName}
      </label>
      <div className="mt-2">
        <input
          id={fieldName}
          className={cn(
            fullWidth ? "w-full" : "w-auto",
            !!errors[fieldName]
              ? "border-red-500 ring-red-800"
              : "border-input ring-gray-800",
            "placeholder:text-muted-foreground flex h-10  rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-gray-800 focus-visible:border-slate-800 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...register(fieldName)}
        />
        {errors[fieldName]?.message && (
          <p className="text-sm font-semibold text-red-500">
            {errors[fieldName]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
