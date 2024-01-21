import { Select, SelectItem } from "@nextui-org/react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UserValidationType } from "~/validation/member";

import genders from "~/data/gender-list.json";

export type GenderSelectProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  value?: string;
};

export default function GenderSelect({
  register,
  errors,
  value,
}: GenderSelectProps) {
  return (
    <Select
      label="Gender"
      fullWidth
      translate="no"
      className="font-semibold"
      placeholder="Select a gender"
      {...register("gender")}
      variant="bordered"
      defaultSelectedKeys={value}
      labelPlacement="outside"
      errorMessage={errors.gender?.message}
    >
      {genders.map((gender) => (
        <SelectItem key={gender.id} value={gender.name}>
          {gender.name}
        </SelectItem>
      ))}
    </Select>
  );
}
