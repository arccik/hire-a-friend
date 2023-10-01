import { Input, Select, SelectItem } from "@nextui-org/react";

import { type PropsType } from "./BigFormPropsType";
import genders from "~/data/gender-list.json";

export default function Apearance({ register, errors }: PropsType) {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Appearance/Looks
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Describe yourself in a few words. This will be shown on your profile.
      </p>

      <div className="space-y-10">
        <div className="mt-6 grid w-full gap-5 md:grid-cols-2">
          <Input
            variant="bordered"
            radius="sm"
            label="Age"
            {...register("age", { valueAsNumber: true })}
            errorMessage={errors.age?.message}
          />

          <Select
            label="Select a gender"
            className="max-w-xs"
            {...register("gender")}
            errorMessage={errors.gender?.message}
          >
            {genders.map((gender) => (
              <SelectItem key={gender.id} value={gender.name}>
                {gender.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            variant="bordered"
            radius="sm"
            label="Height"
            type="text"
            {...register("appearance.height")}
          />
          <Input
            variant="bordered"
            radius="sm"
            label="Eyes"
            type="text"
            {...register("appearance.eyeColor")}
          />
          <Input
            variant="bordered"
            radius="sm"
            label="Hair"
            type="text"
            {...register("appearance.hairColor")}
          />
          <Input
            variant="bordered"
            radius="sm"
            label="Body Type"
            type="text"
            {...register("appearance.bodyType")}
          />
          <Input
            variant="bordered"
            radius="sm"
            label="Ethnicity"
            type="text"
            {...register("appearance.ethnicity")}
            errorMessage={errors.appearance?.ethnicity?.message}
          />
        </div>
      </div>
    </div>
  );
}
