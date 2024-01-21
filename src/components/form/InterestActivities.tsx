import activities from "~/data/activities.json";
import hobbies from "~/data/hobby-list.json";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

type InterestActivitiesProps = {
  setValue: UseFormSetValue<UserValidationType>;
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  value: string[] | undefined;
  type: "activities" | "hobbies";
};

export default function InterestActivities({
  register,
  errors,
  setValue,
  value,
  type,
}: InterestActivitiesProps) {
  const values = type === "activities" ? activities : hobbies;
  return (
    <fieldset>
      <Select
        id={type}
        translate="no"
        items={values}
        label={type.toUpperCase()}
        variant="bordered"
        defaultSelectedKeys={value}
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select"
        {...register(type)}
        onSelectionChange={(e) => setValue(type, [...e] as string[])}
        onChange={(e) => {
          if (type === "hobbies") return;
          setValue(type, e.target.value.split(","));
        }}
        // classNames={{
        //   base: "max-w-lg",
        //   trigger: "min-h-unit-12 py-2",
        // }}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          );
        }}
        errorMessage={errors[type]?.message}
        isInvalid={!!errors[type]}
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
