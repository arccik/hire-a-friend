// import { Badge } from "@nextui-org/react";
// import { useState } from "react";
// import { type UseFormSetValue } from "react-hook-form";
// import { api } from "~/utils/api";
// import uploadFileToAWS from "~/utils/uploadFileToAWS";
// import type { UserValidationType } from "~/validation/member";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import { v1 } from "uuid";
// import { MdOutlineCloudUpload, MdDeleteForever } from "react-icons/md";

// export default function UploadCoverImage({
//   setValue,
//   imgUrl,
// }: {
//   setValue: UseFormSetValue<UserValidationType>;
//   imgUrl: string | null;
// }) {
//   const [imageUrl, setImageUrl] = useState<string | null>(imgUrl);

//   const getUploaderURL = api.uploader.getUrl.useMutation();
//   const fileDeleter = api.uploader.delete.useMutation({
//     onSuccess: () => {
//       toast.success("File Succesfully deleted!");
//     },
//     onError: () => {
//       toast.error("File not deleted. Something went wrong!");
//     },
//   });

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ): Promise<void> => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     // const fileName = randomBytes(16).toString("hex");
//     // const fileWithName = new File([file], fileName);

//     const { url, fields } = await getUploaderURL.mutateAsync({
//       fileType: file.type,
//       fileName: file.name,
//     });
//     const savedImageUrl = await uploadFileToAWS({
//       url,
//       fields,
//       file,
//     });
//     if (savedImageUrl) {
//       setValue("coverImage", savedImageUrl);
//       setImageUrl(savedImageUrl);
//     }
//   };

//   const handleDelete = () => {
//     if (imageUrl) {
//       fileDeleter.mutate({ url: imageUrl });
//       setImageUrl(null);
//     }
//     setImageUrl(null);
//   };

//   if (imageUrl) {
//     return (
//       <div>
//         <label className="block text-sm font-medium leading-6 text-gray-900">
//           Cover Image
//         </label>
//         <Badge
//           content={<MdDeleteForever size={20} />}
//           size="lg"
//           variant="faded"
//           className="mt-2 cursor-pointer hover:bg-red-400"
//           onClick={handleDelete}
//         >
//           <Image
//             width="200"
//             height="200"
//             alt="cover image"
//             src={imageUrl}
//             className="rounded-lg object-cover"
//           />
//         </Badge>
//       </div>
//     );
//   }

//   return (
//     <div className="col-span-4">
//       <p className=" text-sm font-medium  text-gray-900">Cover Image</p>
//       <label
//         htmlFor="dropzone-file"
//         className="flex h-60 w-full cursor-pointer flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100"
//       >
//         <div className="flex flex-col items-center justify-center pb-6 pt-5">
//           <MdOutlineCloudUpload size="3rem" />
//           <p className="mb-2 text-sm text-gray-500 ">
//             <span className="font-semibold">Click to upload</span>
//           </p>
//           <p className="text-xs text-gray-500 ">PNG, JPG or GIF (MAX. 5MB)</p>
//         </div>
//         <input
//           id="dropzone-file"
//           type="file"
//           name={v1()}
//           className="hidden"
//           onChange={(event) => void handleFileUpload(event)}
//         />
//       </label>
//     </div>
//   );
// }

export default function UploadCoverImage() {
  return null;
}
