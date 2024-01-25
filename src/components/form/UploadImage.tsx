import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Loader from "../features/Loader";
import { computeSHA256 } from "~/helpers/uploader";
import compressImage from "~/utils/compressImage";

type PropsType = {
  setValue: (value: string) => void;
  imgUrl?: string | null;
};

export default function UploadImage({ setValue, imgUrl }: PropsType) {
  const getUploaderURL = api.uploader.getSignedURL.useMutation();
  const [imageUrl, setImageUrl] = useState(imgUrl);
  const [isLoading, setIsLoading] = useState(false);
  const deleteFile = api.uploader.delete.useMutation();
  const { data: userSession } = useSession();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setIsLoading(true);
    const file = event.target.files?.[0];

    if (!file) return;
    if (imageUrl) {
      deleteFile.mutate({ url: imageUrl });
    }
    const compressed = await compressImage(file);
    if (compressed instanceof Error) return;

    const url = await getUploaderURL.mutateAsync({
      fileType: compressed.type,
      checksum: await computeSHA256(compressed as File),
      fileSize: compressed.size,
    });

    const savedImageUrl = await uploadFileToAWS({
      url,
      file: compressed as File,
    });
    if (savedImageUrl) {
      setValue(savedImageUrl);
      setImageUrl(savedImageUrl);
      if (userSession) {
        userSession.user.image = savedImageUrl;
        await fetch("/api/auth/session");
      }
    }
    setIsLoading(false);
  };
  if (isLoading) return <Loader />;

  return (
    <>
      <label
        htmlFor="upload-btn"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Profile Photo
      </label>
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
    </>
  );
}
