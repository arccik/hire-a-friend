import { type HobbiesProps } from "./Hobbies";
import InterestActivities from "./InterestActivities";

export default function Activities({
  register,
  errors,
  setValue,
  getValues,
}: HobbiesProps) {
  return (
    <div>
      <label
        htmlFor="activities"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Activities you are available for?
      </label>
      <p className="mt-1 max-w-96 text-sm leading-6 text-gray-600">
        Pick your preferences, and let the cool collaborations come to you
      </p>

      <InterestActivities
        register={register}
        errors={errors}
        setValue={setValue}
        value={getValues("activities")}
        type="activities"
      />
    </div>
  );
}
