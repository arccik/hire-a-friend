import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import InterestActivities from "./InterestActivities";
import { type UserValidationType } from "~/validation/member";

export type HobbiesProps = {
  setValue: UseFormSetValue<UserValidationType>;
  register: UseFormRegister<UserValidationType>;
  getValues: UseFormGetValues<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
};

export default function Hobbies({
  setValue,
  register,
  errors,
  getValues,
}: HobbiesProps) {
  return (
    <div>
      <label
        htmlFor="hobbies"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Hobbies/Topics
      </label>
      <p className="mt-1  text-sm leading-6 text-gray-600">
        Specify your hobbies/topics, what you especially enjoy discussing. That
        gives clients a sense of your specialties and descriptive tags help
        clients easily find you.
      </p>
      <InterestActivities
        register={register}
        errors={errors}
        type="hobbies"
        setValue={setValue}
        value={getValues("hobbies")}
      />
    </div>
  );
}
