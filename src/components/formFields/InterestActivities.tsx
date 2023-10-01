import { type PropsType } from "./BigFormPropsType";
import activities from "~/data/FriendActivitiesList.json";
import { Chip, Input, Select, SelectItem } from "@nextui-org/react";

export default function InterestActivities({
  register,
  errors,
  getValues,
}: PropsType) {
  const currency = getValues?.("currency");
  const currencySymbol: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return (
    <div className="border-b border-gray-900/10">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Interests/Activities
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Listing various interests helps attract the right clients for you.
        Specify your hobbies/topics, what you especially enjoy discussing. That
        gives clients a sense of your specialties and descriptive tags help
        clients easily find you.
      </p>

      <div className="mb-10 flex flex-col space-y-10 md:flex-row md:gap-10">
        <fieldset>
          <Select
            items={activities}
            label="Activities willing to do"
            variant="bordered"
            isMultiline={true}
            selectionMode="multiple"
            placeholder="Select a user"
            {...register("activities")}
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
            errorMessage={errors.activities?.message}
          >
            {(activity) => (
              <SelectItem key={activity.value} textValue={activity.value}>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-small">{activity.value}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Price Per Hour
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Set the price for your service. This will be shown on your profile.
          </p>
          <Input
            label="Price"
            placeholder="0.00"
            {...register("price")}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">
                  {currency ? currencySymbol[currency] : "£"}
                </span>
              </div>
            }
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="currency">
                  Currency
                </label>
                <select
                  className="border-0 bg-transparent text-small text-default-400 outline-none"
                  id="currency"
                  {...register("currency")}
                >
                  <option>GBP</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            }
            type="number"
          />
        </fieldset>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Push Notifications
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          These are delivered via SMS to your mobile phone.
        </p>
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-x-3">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Everything
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-email"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="push-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Same as email
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-nothing"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="push-nothing"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              No push notifications
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
