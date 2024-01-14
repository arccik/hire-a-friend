import { Input } from "@nextui-org/react";
import type { MemberFormProps } from "~/types/MemberFormPropsType";
import type { UserValidationType } from "~/validation/member";

export default function InputField({
  register,
  fieldName,
  title,
  errors,
}: MemberFormProps & {
  fieldName: keyof UserValidationType;
  title?: string;
}) {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title ? title : fieldName}
      </label>
      <div className="mt-2">
        <Input
          id={fieldName}
          variant="bordered"
          {...register(fieldName)}
          autoComplete={fieldName}
          placeholder="type here"
          radius="sm"
          errorMessage={errors[fieldName]?.message as string}
          isInvalid={!!errors[fieldName]}
        />
      </div>
    </div>
  );
}
