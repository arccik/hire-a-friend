import { Select, SelectItem } from "@nextui-org/react";
import { zodiacSigns } from "~/data/zodiac-sign-list";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

type ZodiacSelectProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  value?: string;
};
export default function ZodiacSelect({ register, value }: ZodiacSelectProps) {
  return (
    <Select
      items={zodiacSigns}
      translate="no"
      label="Zodiac Sign"
      className="font-semibold"
      {...register("zodiacSign")}
      variant="bordered"
      defaultSelectedKeys={value}
      placeholder="Select your Zodiac sign"
      labelPlacement="outside"
    >
      {(zodiac) => (
        <SelectItem key={zodiac.id} textValue={zodiac.name}>
          <div className="flex items-center gap-2">
            <zodiac.Icon />
            <div className="flex flex-col">
              <span className="text-small">{zodiac.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
