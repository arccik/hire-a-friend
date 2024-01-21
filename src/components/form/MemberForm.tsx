import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  type BigFormPropType,
  userValidation,
  type UserValidationType,
} from "~/validation/member";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import InputField from "../features/InputField";
import Link from "next/link";
import UploadImage from "./UploadImage";
import UploadGalleryImages from "./UploadGalleryImages";
import PriceField from "./PriceField";
import getDefaultValues from "~/helpers/getDefaultValues";
import Languages from "./Languages";
import PreferedAgeRange from "./PreferedAgeRange";
import ActionButtons from "./ActionButtons";
import About from "./About";
import GenderSelect from "./GenderSelect";
import ZodiacSelect from "./ZodiacSelect";
import Hobbies from "./Hobbies";
import Activities from "./Activities";
// import Availability from "./Availability";

export default function MemberForm(props: BigFormPropType) {
  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      toast.success(
        <div className="flex flex-row items-center justify-between">
          <b>Successfully Saved!</b>
          <Button
            size="sm"
            // className="bg-orange-500 text-xs text-white"
            as={Link}
            variant="bordered"
            color="warning"
            href={`/profile/${props.id}`}
          >
            View Profile
          </Button>
        </div>,
      );
    },
    onError: (error) => {
      toast.error("Something went wrong. Updates not saved");
      console.error("[update profile]: something went wrong: ", error.message);
    },
  });
  const defaultValues = getDefaultValues(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
  } = useForm<UserValidationType>({
    resolver: zodResolver(userValidation),
    defaultValues,
  });

  const onSubmit: SubmitHandler<UserValidationType> = (data): void => {
    updateUser.mutate({ ...data, id: props.userId });
  };
  return (
    <>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className="grid grid-cols-1  sm:grid-cols-4">
          <div className="col-span-4 flex w-full flex-col gap-4 p-5 sm:col-span-2">
            {/* Left */}
            <UploadImage
              setValue={(v) => setValue("image", v)}
              imgUrl={props.image}
            />
            <InputField
              fullWidth={true}
              fieldName="name"
              register={register("name")}
              errors={errors}
            />
            <InputField
              fullWidth={true}
              fieldName="experties"
              register={register("experties")}
              errors={errors}
            />
            <About register={register} errors={errors} />
            <Hobbies
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <InputField
              errors={errors}
              register={register("email")}
              fieldName="email"
              fullWidth={true}
            />
            <PriceField
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </div>
          <div className="col-span-4 flex w-full flex-col gap-4 border-l-1 p-5 sm:col-span-2">
            {/* Right */}
            <GenderSelect
              register={register}
              errors={errors}
              value={getValues("gender")}
            />
            <InputField
              errors={errors}
              register={register("age", { valueAsNumber: true, value: 0 })}
              fieldName="age"
              fullWidth={true}
            />
            <ZodiacSelect
              errors={errors}
              register={register}
              value={getValues("zodiacSign")}
            />
            <InputField
              errors={errors}
              register={register("ethnicity")}
              fieldName="ethnicity"
              fullWidth={true}
            />
            <Languages
              errors={errors}
              register={register}
              setValue={setValue}
            />
            <Activities
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <PreferedAgeRange control={control} />
            <InputField
              errors={errors}
              register={register("city")}
              fieldName="city"
              fullWidth={true}
            />
          </div>
          <div className="col-span-4 w-full border-t-1  p-5">
            {/* Bottom */}
            <UploadGalleryImages
              setValue={setValue}
              imgUrls={props.photos}
              errors={errors}
            />
            {/* <Availability
              errors={errors}
              setValue={setValue}
              control={control}
            /> */}
          </div>
        </div>
        <ActionButtons id={props.id} />
      </form>
    </>
  );
}
