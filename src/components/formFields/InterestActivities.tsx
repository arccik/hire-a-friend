import { type PropsType } from "./BigFormPropsType";
import activities from "~/data/FriendActivitiesList.json";
import { Chip, Input, Select, SelectItem } from "@nextui-org/react";

type PropType = Required<Pick<PropsType, "setValue">> &
  PropsType & { value: string[] | undefined };

export default function InterestActivities({
  register,
  errors,
  getValues,
  setValue,
  value,
}: PropType) {
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

      <div className="mb-10 flex flex-col md:flex-row md:gap-10">
        <fieldset>
          <Select
            items={activities}
            label="Activities willing to do"
            variant="bordered"
            selectedKeys={value}
            isMultiline={true}
            selectionMode="multiple"
            placeholder="Select a user"
            {...register("activities")}
            onChange={(e) => setValue("activities", e.target.value.split(","))}
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
              <SelectItem
                key={activity.value}
                textValue={activity.value}
                value={activity.value}
              >
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
            {...register("price", { valueAsNumber: true })}
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
    </div>
  );
}
