import { Button, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import type { User, Appearance } from "@prisma/client";
import {
  userValidation,
  type UserValidationType,
} from "~/validation/user-validation";
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

type PropType = User & { userId: string } & { appearance: Appearance | null };

export default function BigForm(props: PropType) {
  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      toast.success(
        <div className="flex flex-row justify-between">
          <b>Profile Updated</b>{" "}
          <Button
            size="sm"
            className="text-xs"
            as={Link}
            href={`/profile/${props.id}`}
          >
            View Profile
          </Button>
        </div>,
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
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
    defaultValues: {
      about: props.about ?? "",
      activated: props.activated ?? false,
      image: props.image ?? undefined,
      gender: props.gender ?? undefined,
      coverImage: props.coverImage ?? "",
      country: props.country ?? "",
      street: props.street ?? "",
      state: props.state ?? "",
      city: props.city ?? "",
      zipCode: props.zipCode ?? "",
      email: props.email ?? "",
      firstName: props.firstName ?? "",
      lastName: props.lastName ?? "",
      name: props.name ?? "",
      activities: props.activities ?? [],
      experties: props.experties ?? undefined,
      age: props.age ?? undefined,
      price: props.price ?? undefined,
      hidePrice: props.hidePrice ?? false,
      phoneNumber: props.phoneNumber ?? "",
      appearance: {
        height: props.appearance?.height ?? "",
        weight: props.appearance?.weight ?? "",
        eyeColor: props.appearance?.eyeColor ?? "",
        hairColor: props.appearance?.hairColor ?? "",
        bodyType: props.appearance?.bodyType ?? "",
        ethnicity: props.appearance?.ethnicity ?? "",
      },
    },
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
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <UploadImage setValue={setValue} imgUrl={props.image} />
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
        <UploadGalleryImages setValue={setValue} imgUrls={props.photos} />

        <Apearance register={register} errors={errors} getValues={getValues} />
        <InterestActivities
          register={register}
          errors={errors}
          setValue={setValue}
          value={getValues("activities")}
        />
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
              color="danger"
              className="bg-red-100 text-red-400"
              as={Link}
              href={`/profile/${props.id}`}
            >
              Cancel
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              fullWidth
              variant="flat"
              className="bg-green-100 text-green-400"
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
