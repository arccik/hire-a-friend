import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { randomBytes } from "crypto";

type PropsType = {
  setValue: (value: string) => void;
  imgUrl?: string | null;
};

export default function UploadImage({ setValue, imgUrl }: PropsType) {
  const { update } = useSession();
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const [imageUrl, setImageUrl] = useState(imgUrl);
  const [isLoading, setIsLoading] = useState(false);
  const fileDeleter = api.uploader.delete.useMutation();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setIsLoading(true);
    const file = event.target.files?.[0];

    if (!file) return;
    if (imageUrl) {
      fileDeleter.mutate({ url: imageUrl });
    }

    const { url, fields } = await getUploaderURL.mutateAsync({
      fileName: file.name,
      fileType: file.type,
    });
    const savedImageUrl = await uploadFileToAWS({
      url,
      fields,
      file,
    });
    if (savedImageUrl) {
      setValue(savedImageUrl);
      setImageUrl(savedImageUrl);
      await update({ image: savedImageUrl });
    }
    setIsLoading(false);
  };
  if (isLoading) return <Spinner />;
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
        {imageUrl?.length ? "Change" : "Upload"} Image
      </Button>
    </div>
  );
}
