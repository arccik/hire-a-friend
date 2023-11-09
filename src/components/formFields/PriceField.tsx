import { type PropsType } from "~/types/memberFormPropsType";

type PropType = Required<
  Pick<PropsType, "register" | "errors" | "getValues" | "watch" | "setValue">
>;

import { Checkbox, Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

export default function PriceField({
  register,
  errors,
  watch,
  setValue,
}: PropType) {
  const showPriceField = watch("hidePrice") ?? false;
  return (
    <fieldset className="mb-10">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Price Per Hour
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Set the price for your service. This will be shown on your profile.
      </p>
      <div>
        <Checkbox
          className="mb-5"
          {...register("hidePrice")}
          defaultChecked={true}
          onChange={(e) => setValue("hidePrice", e.target.checked)}
        >
          Don&apos;t show the price on my page
        </Checkbox>
        <AnimatePresence>
          {!showPriceField && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </fieldset>
  );
}
