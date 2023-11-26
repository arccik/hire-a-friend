import { Select, SelectItem } from "@nextui-org/react";
import { zodiacSigns } from "~/data/zodiac-sign-list";
import { type PropsType } from "~/types/memberFormPropsType";

export default function ZodiacSelect({
  register,
  value,
}: PropsType & { value?: string }) {
  return (
    <Select
      items={zodiacSigns}
      translate="no"
      label="Zodiac Sign"
      {...register("zodiacSign")}
      variant="bordered"
      defaultSelectedKeys={value}
      placeholder="Select your Zodiac sign"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-unit-12 py-2",
      }}
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
