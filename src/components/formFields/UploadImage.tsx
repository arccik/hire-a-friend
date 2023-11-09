import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import uploadFileToAWS from "~/utils/uploadFileToAWS";
import { api } from "~/utils/api";
import { type UseFormSetValue } from "react-hook-form";
import { type UserValidationType } from "~/validation/member";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type PropsType = {
  setValue: (value: string) => void;
  imgUrl?: string | null;
};

export default function UploadImage({ setValue, imgUrl }: PropsType) {
  const { data: userSession, update } = useSession();

  const fileDeleter = api.uploader.delete.useMutation({
    onSuccess: () => {
      toast.success("File Succesfully deleted!");
    },
    onError: () => {
      toast.error("File not deleted. Something went wrong!");
    },
  });
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const [imageUrl, setImageUrl] = useState(imgUrl);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) return;
    if (imageUrl) {
      fileDeleter.mutate({ url: imageUrl });
    }
    const { url, fields } = await getUploaderURL.mutateAsync({
      fileName: file.name,
      fileType: file.type,
    });
    const savedImageUrl = await uploadFileToAWS({ url, fields, file });
    if (savedImageUrl) {
      setValue(savedImageUrl);
      setImageUrl(savedImageUrl);
      await update({ user: { ...userSession?.user, image: imageUrl } });
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
        {imageUrl?.length ? "Change" : "Upload"} Image
      </Button>
    </div>
  );
}
