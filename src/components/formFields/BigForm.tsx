import {
  Badge,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
// import { FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import countries from "~/data/Countries.json";
import { zodResolver } from "@hookform/resolvers/zod";

import { type User } from "@prisma/client";
import {
  userValidation,
  UserValidationType,
} from "~/validation/user-validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Apearance from "./Apearance";
import InterestActivities from "./InterestActivities";

export default function BigForm(props: User & { userId: string }) {
  const updateUser = api.user.update.useMutation({
    onSuccess: (data) => {
      console.log("Update User Success: ", data);
    },
  });
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
      currency: props.currency ?? "",
      email: props.email ?? "",
      firstName: props.firstName ?? "",
      lastName: props.lastName ?? "",
      name: props.name ?? "",
      activities: props.activities ?? [],
      age: props.age ?? 0,
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

  // const avatar = (watch("image") as File[]) || undefined;
  // const coverImage = watch("coverImage") as File[];

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
                  defaultValue={""}
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
              <div className="mt-2 flex items-center gap-x-3">
                {/* {avatar && avatar[0] ? (
                  <img
                    src={URL.createObjectURL(avatar[0])}
                    alt="avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )} */}
                <input
                  type="file"
                  id="upload-btn"
                  accept="image/*"
                  hidden
                  {...register("image")}
                />
                <Button
                  as="label"
                  htmlFor="upload-btn"
                  variant="bordered"
                  radius="sm"
                  size="sm"
                >
                  Change
                </Button>
              </div>
            </div>

            {/* {coverImage && coverImage[0] ? (
              <div className="col-span-full">
                <Badge
                  content="X"
                  onClick={() => setValue("coverImage", undefined)}
                  size="lg"
                  color="danger"
                >
                  <img
                    src={URL.createObjectURL(coverImage[0])}
                    className="object-cover"
                  />
                </Badge>
              </div>
            ) : (
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <FaPhotoVideo
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          {...register("coverImage")}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 4MB
                    </p>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Apearance register={register} errors={errors} getValues={getValues} />
      <InterestActivities register={register} errors={errors} />

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button variant="faded">Cancel</Button>
        <Button color="success" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
