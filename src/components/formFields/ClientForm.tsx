import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import UploadImage from "./UploadImage";
import { clientSchema, type ClientFormData } from "~/validation/client-form";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

type PropType = {
  name?: string | null;
  image?: string | null;
  city?: string | null;
};

const MyForm: React.FC<PropType> = ({ name, image, city }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: name ?? "",
      image: image ?? "",
      city: city ?? "",
    },
  });
  const updateUser = api.user.updateClientProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  console.log("Little Form>>>> ", errors);
  const onSubmit = (data: ClientFormData) => {
    console.log(data);
    updateUser.mutate(data);
  };

  return (
    <div className="mx-auto w-full  md:w-1/2">
      <p className="text-center text-2xl font-bold text-primary-500 md:text-3xl">
        Welcome to our Registration Page!
      </p>
      <p className="-mt-1 text-center text-xs text-slate-400">
        Fill out the registration form below to create your account.
      </p>
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="flex flex-col gap-4"
      >
        <UploadImage setValue={(v) => setValue("image", v)} imgUrl={image} />

        <Input
          isRequired
          label="Name"
          {...register("name")}
          placeholder="Enter your name/username"
          type="text"
          errorMessage={errors.name?.message}
        />
        <Input
          isRequired
          label="City"
          {...register("city")}
          placeholder="Enter your City"
          type="text"
          errorMessage={errors.city?.message}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" fullWidth color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
