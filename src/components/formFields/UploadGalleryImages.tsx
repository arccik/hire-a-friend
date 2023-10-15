import { useState } from "react";
import { type UseFormSetValue } from "react-hook-form";
import { api } from "~/utils/api";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { type UserValidationType } from "~/validation/user-validation";

import ImageGallery from "../ui/ImageGallery";
import { toast } from "react-toastify";

export default function UploadImageGallery({
  setValue,
  imgUrls,
}: {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrls: string[] | null;
}) {
  const getUploaderURL = api.uploader.getUrl.useMutation();

  const deleteImage = api.uploader.delete.useMutation({
    onSuccess: () => {
      toast.success("File Succesfully deleted!");
    },
    onError: () => {
      toast.error("File not deleted. Something went wrong!");
    },
  });

  const [imageUrls, setImageUrls] = useState<string[] | null>(imgUrls);

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
      setValue(
        "photos",
        imageUrls ? [...imageUrls, savedImageUrl] : [savedImageUrl],
      );
      setImageUrls((prev) => [...prev!, savedImageUrl]);
    }
  };
  console.log("imageUrls", imageUrls);

  const handleDeleteImage = (imgUrl: string): void => {
    deleteImage.mutate({ url: imgUrl });
    setImageUrls(imageUrls!.filter((url) => url !== imgUrl));
  };

  return (
    <>
      <p className="mb-2 text-lg font-bold">Upload photos to your gallery</p>

      <div className="flex flex-col gap-2 md:flex-row">
        <ImageGallery
          imagesUrl={imageUrls}
          handleDeleteImage={handleDeleteImage}
        />
        <div className="flex justify-center">
          <label
            htmlFor="dropzone-file"
            className=" flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(event) => void handleFileUpload(event)}
            />
          </label>
        </div>
      </div>
    </>
  );
}
