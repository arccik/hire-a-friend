import { Select, SelectItem } from "@nextui-org/react";
import { ethnicities } from "~/data/ethnicities-list";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

type EthnicitySelectProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  value?: string;
  setValue: UseFormSetValue<UserValidationType>;
};
export default function EthnicitySelect({
  register,
  value,
  setValue,
}: EthnicitySelectProps) {
  return (
    <Select
      items={ethnicities}
      translate="no"
      label="Ethnicity"
      className="font-semibold"
      {...register("ethnicity")}
      variant="bordered"
      defaultSelectedKeys={value}
      onSelectionChange={(e) => setValue("ethnicity", [...e].toString())}
      placeholder="Select your Ethnicity"
      labelPlacement="outside"
    >
      {(ethnicity) => (
        <SelectItem key={ethnicity.id} textValue={ethnicity.label}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-small">{ethnicity.label}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
