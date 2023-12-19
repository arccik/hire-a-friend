import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import UploadImage from "./UploadImage";
import { clientSchema, type ClientFormData } from "~/validation/client-form";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import Link from "next/link";

type PropType = {
  name?: string | null;
  image?: string | null;
  city?: string | null;
  age?: number | null;
  about?: string | null;
  experties?: string | null;
};

const fields = ["name", "city", "age", "experties", "about"] as const;

const MyForm: React.FC<PropType> = ({
  name,
  image,
  city,
  age,
  about,
  experties,
}) => {
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
      age: age ?? 0,
      about: about ?? "",
      experties: experties ?? "",
    },
  });
  const updateUser = api.user.updateClientProfile.useMutation({
    onSuccess: (user) => {
      toast.success(
        <>
          Profile updated successfully{" "}
          <Button
            as={Link}
            href={`/profile/${user.id}`}
            size="sm"
            variant="ghost"
          >
            View profile
          </Button>
        </>,
      );
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: ClientFormData) => {
    updateUser.mutate(data);
  };

  return (
    <div className="mx-auto w-full  md:w-1/2">
      <p className="text-center text-2xl font-bold text-orange-500 md:text-3xl">
        Profile
      </p>
      <p className="mb-10 text-xs text-slate-400">
        This information will be exclusively shared with individuals whom you
        wish to engage with or lease their time.
      </p>
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="flex flex-col gap-4"
      >
        <UploadImage setValue={(v) => setValue("image", v)} imgUrl={image} />
        {fields.map((field) => {
          if (field === "about") {
            return (
              <Textarea
                key={field}
                label={field[0]?.toUpperCase() + field.slice(1)}
                {...register(field)}
                placeholder="Write something about youself"
                errorMessage={errors[field]?.message}
                isInvalid={!!errors[field]}
              />
            );
          } else
            return (
              <Input
                key={field}
                label={field[0]?.toUpperCase() + field.slice(1)}
                {...register(field, {
                  valueAsNumber: field === "age" ? true : false,
                })}
                placeholder={`Enter your ${field}`}
                type={field === "age" ? "number" : "text"}
                errorMessage={errors[field]?.message}
                isInvalid={!!errors[field]}
              />
            );
        })}

        <div className="flex justify-end gap-2">
          <Button type="submit" color="success">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
