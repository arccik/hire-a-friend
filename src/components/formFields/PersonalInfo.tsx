import { type PropsType } from "./BigFormPropsType";
import countries from "~/data/Countries.json";

import { Select, SelectItem } from "@nextui-org/react";
import InputField from "../ui/InputField";

export default function PersonalInformation({ register, errors }: PropsType) {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputField
            errors={errors}
            title="First name"
            register={register}
            fieldName="firstName"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            errors={errors}
            title="Last name"
            register={register}
            fieldName="lastName"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            errors={errors}
            title="Email"
            register={register}
            fieldName="email"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            errors={errors}
            title="Phone number"
            register={register}
            fieldName="phoneNumber"
          />
        </div>
        {/* 
        <div className="sm:col-span-3">
          <div className="mt-2">
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
              <Select
                label="Select Country"
                className="max-w-xs"
                variant="bordered"
                selectedKeys={selectedCountry}
                {...register("country")}
              >
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.value}>
                    {country.value}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div> */}

        <div className="col-span-full">
          <InputField
            errors={errors}
            title="Street address"
            register={register}
            fieldName="street"
          />
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <InputField
            errors={errors}
            title="City"
            register={register}
            fieldName="city"
          />
        </div>

        <div className="sm:col-span-2">
          <InputField
            errors={errors}
            title="State"
            register={register}
            fieldName="state"
          />
        </div>

        <div className="sm:col-span-2">
          <InputField
            errors={errors}
            title="Post Code"
            register={register}
            fieldName="zipCode"
          />
        </div>
      </div>
    </div>
  );
}
