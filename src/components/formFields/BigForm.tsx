import { Button, Input, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User, Appearance } from "@prisma/client";
import {
  userValidation,
  UserValidationType,
} from "~/validation/user-validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Apearance from "./Apearance";
import InterestActivities from "./InterestActivities";
import PersonalInformation from "./PersonalInfo";
import ImageFields from "./ImageFields";

type PropType = User & { userId: string } & { appearance: Appearance | null };

export default function BigForm(props: PropType) {
  const updateUser = api.user.update.useMutation({
    onSuccess: (data) => {
      console.log("Update User Success: ", data);
    },
  });

  console.log("USer DATA : ", props);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
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
      currency: props.currency ?? "",
      email: props.email ?? "",
      firstName: props.firstName ?? "",
      lastName: props.lastName ?? "",
      name: props.name ?? "",
      activities: props.activities ?? [],
      age: props.age ?? undefined,
      price: props.price ?? undefined,
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

  console.log("VALUESSS ", watch());
  const onSubmit: SubmitHandler<UserValidationType> = (data): void => {
    delete data.image;
    delete data.coverImage;
    updateUser.mutate({ ...data, id: props.userId });

    // if (data.image) {
    //   const response = await fetch(
    //     `/api/upload?type=avatar&filename=${data.image.name}`,
    //     {
    //       method: "POST",
    //       body: data.image,
    //     },
    //   );
    //   console.log("RESPONSE FROM FILE UPLOADING: ", response);
    // }
    // console.log("Big FOrm Submittion>> ", data);
  };

  // check if image is vertical orintation
  // if (coverImage && coverImage[0]) {
  //   const image = new Image();
  //   image.src = URL.createObjectURL(coverImage[0]);
  //   const width = image.naturalWidth;
  //   const height = image.naturalHeight;
  //   console.log("CHECKING IMAGE : ", image.naturalHeight);
  //   if (height > width) {
  //     setError("coverImage", {
  //       message: "Cover image must be square",
  //     });
  //   }
  // }

  return (
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
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nickname
              </label>
              <div className="mt-2">
                <Input
                  variant="bordered"
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="type here"
                  radius="sm"
                />
              </div>
            </div>

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

            <ImageFields
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
            />
          </div>
        </div>

        <PersonalInformation
          register={register}
          errors={errors}
          getValues={getValues}
        />
      </div>
      <Apearance register={register} errors={errors} getValues={getValues} />
      <InterestActivities
        register={register}
        errors={errors}
        setValue={setValue}
        value={getValues("activities")}
      />

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button variant="faded">Cancel</Button>
        <Button color="success" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
