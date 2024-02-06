import { Chip, Select, SelectItem } from "@nextui-org/react";
import languages from "~/data/language-list.json";
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

export type LanguagesProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  setValue: UseFormSetValue<UserValidationType>;
  value?: string[];
  getValues: UseFormGetValues<UserValidationType>;
};

export default function Languages({ register, errors, setValue, value }: LanguagesProps) {
  return (
    <fieldset>
      <label
        htmlFor="select languages"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Languages
      </label>
      <Select
        id="select languages"
        translate="no"
        items={languages}
        label="Select languages you can speak"
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        defaultSelectedKeys={value}
        placeholder="Select Languages"
        {...register("languages")}
        onChange={(e) => {
          setValue("languages", e.target.value.split(","));
        }}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          );
        }}
        isInvalid={!!errors.languages}
        errorMessage={errors.languages?.message}
      >
        {(item) => (
          <SelectItem
            key={item.value}
            textValue={item.value}
            value={item.value}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-small">{item.value}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  );
}
