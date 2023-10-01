import { type PropsType } from "./BigFormPropsType";
import countries from "~/data/Countries.json";

import { Input, Select, SelectItem } from "@nextui-org/react";

export default function PersonalInformation({
  register,
  errors,
  getValues,
}: PropsType) {
  const selectedCountry = getValues?.("country");

  console.log("Selected country : ", selectedCountry);
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
          <div className="mt-2">
            <Input
              labelPlacement="inside"
              label="First name"
              variant="bordered"
              radius="sm"
              type="text"
              id="first-name"
              autoComplete="given-name"
              {...register("firstName")}
              errorMessage={errors.firstName?.message}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          {/* <label
          htmlFor="last-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Last name
        </label> */}
          <div className="mt-2">
            <Input
              label="Last Name"
              variant="bordered"
              radius="sm"
              type="text"
              id="last-name"
              autoComplete="family-name"
              {...register("lastName")}
              errorMessage={errors.lastName?.message}
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          {/* <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label> */}
          <div className="mt-2">
            <Input
              label="Email address"
              aria-label="Email Address"
              variant="bordered"
              radius="sm"
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              errorMessage={errors.email?.message}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <div className="mt-2">
            <Input
              label="Phone Number"
              variant="bordered"
              radius="sm"
              {...register("phoneNumber")}
              errorMessage={errors.phoneNumber?.message}
            />
          </div>
        </div>

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
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Street address
          </label>
          <div className="mt-2">
            <Input
              variant="bordered"
              radius="sm"
              type="text"
              id="street-address"
              autoComplete="street-address"
              {...register("street")}
              errorMessage={errors.street?.message}
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <Input
              variant="bordered"
              radius="sm"
              type="text"
              id="city"
              autoComplete="address-level2"
              {...register("city")}
              errorMessage={errors.city?.message}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State / Province
          </label>
          <div className="mt-2">
            <Input
              variant="bordered"
              radius="sm"
              type="text"
              id="region"
              autoComplete="address-level1"
              {...register("state")}
              errorMessage={errors.state?.message}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <Input
              variant="bordered"
              radius="sm"
              type="text"
              id="postal-code"
              autoComplete="postal-code"
              {...register("zipCode")}
              errorMessage={errors.zipCode?.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
