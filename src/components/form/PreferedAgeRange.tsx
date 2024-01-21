import { Slider } from "@nextui-org/react";
import React from "react";
import { Controller, type Control } from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

type PropType = {
  control: Control<UserValidationType>;
};

export default function PreferedAgeRange({ control }: PropType) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Preferred Age Range
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Indicate the specific age range that best suits your preferences and
        requirements for the activities you engage in.
      </p>
      <Controller
        control={control}
        name="preferedAgeRange"
        render={({ field }) => (
          <Slider
            label="Age range"
            step={1}
            color="warning"
            minValue={18}
            maxValue={100}
            value={field.value}
            defaultValue={[18, 99]}
            onChange={field.onChange}
            className="max-w-md opacity-95"
          />
        )}
      />
    </fieldset>
  );
}
