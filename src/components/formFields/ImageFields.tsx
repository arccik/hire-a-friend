import { Badge, Button } from "@nextui-org/react";
import type { PropsType } from "./BigFormPropsType";
import { FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function ImageFields({
  register,
  getValues,
  setValue,
}: Required<Pick<PropsType, "getValues" | "setValue">> & PropsType) {
  const avatar = getValues("image") as string | undefined;
  const coverImage = getValues("coverImage") as string | undefined;

  const [showCoverImage, setShowCoverImage] = useState(!!coverImage);
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Photo
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          {avatar ? (
            <Image
              width="100"
              height="100"
              src={avatar}
              alt="avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle
              className="h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}
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

      {showCoverImage && coverImage ? (
        <div className="col-span-full" onClick={() => setShowCoverImage(false)}>
          <Badge
            content="X"
            size="lg"
            // color="danger"
            className="mt-2 cursor-pointer hover:bg-red-400"
          >
            <Image
              width="400"
              height="400"
              alt="cover image"
              src={coverImage}
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
      )}
    </>
  );
}
