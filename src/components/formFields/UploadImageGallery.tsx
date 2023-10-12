import { Image, Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaPhotoVideo } from "react-icons/fa";
import { api } from "~/utils/api";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { UserValidationType } from "~/validation/user-validation";

export default function UploadImageGallery({
  setValue,
  imgUrls,
}: {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrls: string[] | null;
}) {
  const getUploaderURL = api.uploader.getUrl.useMutation();

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
  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Images for you Gallery
      </label>
      <p className="mt-1 text-sm text-gray-500">
        Images will be resized to fit within the dimensions of the image and any
        EXIF data will be removed.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        <FaPhotoVideo className="mx-auto h-12 w-12 text-gray-300" />
      </p>
      <p className="mt-2 text-sm text-gray-500">
        You can upload multiple images at once.
      </p>
      <p className="mb-5 mt-2 text-sm text-gray-500">
        <span className="font-bold">Note:</span> The maximum file size is 10 Mb
      </p>
      <input
        type="file"
        id="upload-btn"
        accept="image/*"
        hidden
        multiple={true}
        onChange={(event) => void handleFileUpload(event)}
      />
      <Button
        as="label"
        htmlFor="upload-btn"
        variant="bordered"
        radius="sm"
        size="sm"
        fullWidth
      >
        Upload File
      </Button>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {imageUrls?.map((url, index) => (
          <Card
            shadow="sm"
            key={index}
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0 ">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={url}
                className="group h-[140px] w-full object-cover"
                src={url}
              />
            </CardBody>
            <CardFooter className="text-small text-red-500">
              <p className=" text-red-500">Delete</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
