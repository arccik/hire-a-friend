import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { api } from "~/utils/api";
import { PropsType } from "./BigFormPropsType";
import { UseFormSetValue } from "react-hook-form";
import { UserValidationType } from "~/validation/user-validation";

export default function UploadImage({
  setValue,
  imgUrl,
}: {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrl: string | null;
}) {
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const [imageUrl, setImageUrl] = useState(imgUrl);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) return;
    const { url, fields } = await getUploaderURL.mutateAsync({
      fileName: file.name,
      fileType: file.type,
    });
    console.log("Fields: ", fields);
    const savedImageUrl = await uploadFileToAWS({ url, fields, file });
    console.log({ savedImageUrl });
    if (savedImageUrl) {
      setValue("image", savedImageUrl);
      setImageUrl(savedImageUrl);
    }
  };

  return (
    <div className="mt-2 flex items-center gap-x-3">
      {imageUrl ? (
        <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
          src={imageUrl}
          alt="avatar"
        />
      ) : (
        <FaUserCircle className="h-12 w-12 text-gray-300" aria-hidden="true" />
      )}

      <input
        type="file"
        id="upload-btn"
        accept="image/*"
        hidden
        onChange={(event) => void handleFileUpload(event)}
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
  );
}
