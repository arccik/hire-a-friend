import { useState } from "react";
import { api } from "~/utils/api";
import uploadFileToAWS from "~/utils/uploadFileToAWS";

import ImageGallery from "../features/ImageGallery";
import { toast } from "react-toastify";

import { cn } from "~/lib/utils";
import { MdOutlineCloudUpload } from "react-icons/md";
import { v1 } from "uuid";
import { type UserValidationType } from "~/validation/member";
import { type FieldErrors, type UseFormSetValue } from "react-hook-form";
import Loader from "../features/Loader";
import { computeSHA256 } from "~/helpers/uploader";

export type ImageUploadType = {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrls: string[] | null;
  errors: FieldErrors<UserValidationType>;
};

export default function UploadImageGallery({
  setValue,
  imgUrls,
  errors,
}: ImageUploadType) {
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const deleteImage = api.uploader.delete.useMutation({
    onError: () => {
      toast.error("File not deleted. Something went wrong!");
    },
  });

  const getSignedURL = api.uploader.getSignedURL.useMutation();
  const [imageUrls, setImageUrls] = useState<string[] | null>(imgUrls);
  const [isLoading, setIsLoading] = useState(false);

  const isFull = !!(imageUrls && imageUrls?.length >= 8);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file || isFull) return;
    setIsLoading(true);

    const url = await getSignedURL.mutateAsync({
      fileType: file.type,
      checksum: await computeSHA256(file),
      fileSize: file.size,
    });
    const savedImageUrl = await uploadFileToAWS({
      url,
      file,
    });
    if (savedImageUrl) {
      setValue(
        "photos",
        imageUrls ? [...imageUrls, savedImageUrl] : [savedImageUrl],
      );
      setImageUrls((prev) => [...prev!, savedImageUrl]);
    }
    setIsLoading(false);
  };

  const handleDeleteImage = (imgUrl: string): void => {
    if (!imageUrls) return;
    deleteImage.mutate({ url: imgUrl });
    const index = imageUrls.indexOf(imgUrl);
    if (index !== -1) {
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index, 1);
      setImageUrls(newImageUrls);
      setValue("photos", newImageUrls);
    }
  };

  return (
    <>
      <p className="block text-sm font-medium leading-6 text-gray-900">
        Upload photos to your gallery
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="mb-2 flex w-full sm:mb-0 sm:w-48">
          <label
            htmlFor="dropzone-file"
            className={cn(
              "flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100",
              {
                "cursor-not-allowed opacity-50": isLoading || isFull,
                "bg-red-500 hover:bg-red-300": errors.photos?.message,
              },
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <MdOutlineCloudUpload size="3rem" />
              {isFull ? (
                <p className="text-xs text-red-500">
                  Maximum picture limit reached. Delete old images to upload new
                  ones.
                </p>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 ">
                    PNG, JPG or GIF (MAX. 10MB)
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              name={v1()}
              className="hidden"
              disabled={isFull}
              onChange={(event) => void handleFileUpload(event)}
            />
          </label>
        </div>
        <ImageGallery
          imagesUrl={imageUrls}
          handleDeleteImage={handleDeleteImage}
        />
        {isLoading && <Loader fullWidth={false} />}
      </div>
    </>
  );
}
