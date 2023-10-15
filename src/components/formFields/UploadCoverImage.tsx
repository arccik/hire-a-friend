import { Badge } from "@nextui-org/react";
import { useState } from "react";
import { type UseFormSetValue } from "react-hook-form";
import { FaPhotoVideo } from "react-icons/fa";
import { api } from "~/utils/api";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import type { UserValidationType } from "~/validation/user-validation";
import Image from "next/image";
import { toast } from "react-toastify";

export default function UploadCoverImage({
  setValue,
  imgUrl,
}: {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrl: string | null;
}) {
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const fileDeleter = api.uploader.delete.useMutation({
    onSuccess: () => {
      toast.success("File Succesfully deleted!");
    },
    onError: () => {
      toast.error("File not deleted. Something went wrong!");
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(imgUrl);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { url, fields } = await getUploaderURL.mutateAsync({
      fileName: file.name,
      fileType: file.type,
    });
    const savedImageUrl = await uploadFileToAWS({ url, fields, file });
    if (savedImageUrl) {
      setValue("coverImage", savedImageUrl);
      setImageUrl(savedImageUrl);
    }
  };

  const handleDelete = () => {
    if (imageUrl) {
      fileDeleter.mutate({ url: imageUrl });
      setImageUrl(null);
    }
    setImageUrl(null);
  };

  if (imageUrl) {
    return (
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Cover photo
        </label>
        <Badge
          content="X"
          size="lg"
          className="mt-2 cursor-pointer hover:bg-red-400"
          onClick={handleDelete}
        >
          <Image
            width="400"
            height="400"
            alt="cover image"
            src={imageUrl}
            className="object-cover"
          />
        </Badge>
      </div>
    );
  }

  return (
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
                onChange={(event) => void handleFileUpload(event)}
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
  );
}
