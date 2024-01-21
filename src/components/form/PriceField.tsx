import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Checkbox, Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

import { type UserValidationType } from "~/validation/member";

export type PriceFieldProps = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  watch: UseFormWatch<UserValidationType>;
  setValue: UseFormSetValue<UserValidationType>;
};

export default function PriceField({
  register,
  errors,
  watch,
  setValue,
}: PriceFieldProps) {
  const showPriceField = watch("hidePrice") ?? false;
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Price Per Hour
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Set the price for your service. This will be shown on your profile.
      </p>
      <div>
        <Checkbox
          defaultSelected={showPriceField}
          {...register("hidePrice")}
          onChange={(e) => setValue("hidePrice", e.target.checked)}
        >
          {/* Don&apos;t show the price on my page */}
          Hide Price
        </Checkbox>
        <AnimatePresence>
          {!showPriceField && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                label="Price"
                placeholder="0.00"
                type="number"
                defaultValue="0"
                min={0}
                step={0.1}
                errorMessage={errors.price?.message?.toString()}
                {...register("price", { valueAsNumber: true })}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">£</span>
                  </div>
                }
                isInvalid={!!errors.price}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </fieldset>
  );
}
