import { Chip, Select, SelectItem } from "@nextui-org/react";
import languages from "~/data/language-list.json";
import { type PropsType } from "~/types/MemberFormPropsType";

type PropType = Required<Pick<PropsType, "setValue">> & PropsType;

export default function Languages({ register, errors, setValue }: PropType) {
  return (
    <fieldset className="mb-6">
      <h2 className="mb-2 text-base font-semibold leading-7 text-gray-900">
        Languages
      </h2>
      <Select
        translate="no"
        items={languages}
        label="Select languages you can speak"
        variant="bordered"
        // defaultSelectedKeys={"English"}
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select Languages"
        {...register("languages")}
        // onSelectionChange={(e) => setValue("languages", [...e] as string[])}
        onChange={(e) => {
          setValue("languages", e.target.value.split(","));
        }}
        classNames={{
          base: "max-w-lg",
          trigger: "min-h-unit-12 py-2",
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
