import { type PropsType } from "~/types/BigFormPropsType";

type PropType = Required<Pick<PropsType, "register" | "errors">>;

import { Checkbox, Input } from "@nextui-org/react";
import { useState } from "react";

export default function PriceField({ register, errors }: PropType) {
  const [checked, setChecked] = useState(false);
  return (
    <fieldset className="mb-10">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Price Per Hour
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Set the price for your service. This will be shown on your profile.
      </p>
      <div className="flex flex-shrink">
        {!checked && (
          <Input
            label="Price"
            placeholder="0.00"
            errorMessage={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">£</span>
              </div>
            }
            type="number"
          />
        )}
        <Checkbox onChange={(e) => setChecked(e.target.checked)}>
          Don&apos;t show the price on my page
        </Checkbox>
      </div>
    </fieldset>
  );
}
