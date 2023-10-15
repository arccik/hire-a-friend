import { type PropsType } from "~/types/BigFormPropsType";
import activities from "~/data/FriendActivitiesList.json";
import { Chip, Select, SelectItem } from "@nextui-org/react";

type PropType = Required<Pick<PropsType, "setValue">> &
  PropsType & { value: string[] | undefined };

export default function InterestActivities({
  register,
  errors,
  setValue,
  value,
}: PropType) {
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
      </div>
    </div>
  );
}
