import { Button, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  type BigFormPropType,
  userValidation,
  type UserValidationType,
} from "~/validation/member";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Apearance from "./Apearance";
import InterestActivities from "./InterestActivities";
import PersonalInformation from "./PersonalInfo";
import InputField from "../features/InputField";
import NotifyBy from "./NotifyBy";
import Link from "next/link";
import UploadImage from "./UploadImage";
import UploadCoverImage from "./UploadCoverImage";
import UploadGalleryImages from "./UploadGalleryImages";
import PriceField from "./PriceField";
import getDefaultValues from "~/helpers/getDefaultValues";
import Languages from "./Languages";

export default function MemberForm(props: BigFormPropType) {

  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      toast.success(
        <div className="flex flex-row items-center justify-between">
          <b>Successfully Saved!</b>
          <Button
            size="sm"
            className="text-xs"
            as={Link}
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<UserValidationType>({
    resolver: zodResolver(userValidation),
    defaultValues: getDefaultValues(props),
  });

  const onSubmit: SubmitHandler<UserValidationType> = (data): void => {
    updateUser.mutate({ ...data, id: props.userId });
  };

  return (
    <>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className="grid grid-cols-1 space-y-12 md:grid-flow-dense md:grid-cols-2 md:space-x-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <InputField
                title="Nickname"
                fieldName="name"
                register={register}
                errors={errors}
              />
              <InputField
                title="Experties"
                fieldName="experties"
                register={register}
                errors={errors}
              />
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <Textarea
                    id="about"
                    {...register("about")}
                    name="about"
                    rows={3}
                    variant="bordered"
                    radius="sm"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="upload-btn"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <UploadImage
                  setValue={(v) => setValue("image", v)}
                  imgUrl={props.image}
                />
              </div>
              <UploadCoverImage setValue={setValue} imgUrl={props.coverImage} />
            </div>
          </div>

          <PersonalInformation
            register={register}
            errors={errors}
            getValues={getValues}
          />
        </div>
        <UploadGalleryImages
          setValue={setValue}
          imgUrls={props.photos}
          errors={errors}
        />

        <Apearance register={register} errors={errors} getValues={getValues} />

        <div className="flex flex-row">
          <div className="my-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Activities/Interests
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Curate your choices from the list and watch the connections
              unfold. Precision matters – pick your preferences, and let the
              cool collaborations come to you
            </p>

            <InterestActivities
              register={register}
              errors={errors}
              setValue={setValue}
              value={getValues("activities")}
              type="activities"
            />
            <br />
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Hobbies/Topics
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Specify your hobbies/topics, what you especially enjoy discussing.
              That gives clients a sense of your specialties and descriptive
              tags help clients easily find you.
            </p>
            <InterestActivities
              register={register}
              errors={errors}
              type="hobbies"
              setValue={setValue}
              value={getValues("hobbies")}
            />
          </div>
        </div>
        <Languages errors={errors} register={register} setValue={setValue} />
        <PriceField
          register={register}
          errors={errors}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />

        <NotifyBy />
        <div className="fixed inset-x-0 bottom-0 z-40 flex h-auto w-full items-center justify-center gap-4 bg-background/70 p-1 backdrop-blur-lg backdrop-saturate-150">
          <div className="w-1/4">
            <Button
              variant="flat"
              fullWidth
              color="danger"
              className="bg-red-100 text-red-400  hover:scale-95"
              as={Link}
              href={`/profile/${props.id}`}
            >
              Cancel
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              fullWidth
              color="success"
              variant="flat"
              className=" border border-green-400 bg-green-100 text-green-400 hover:scale-95"
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
