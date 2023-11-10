import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { type MessageResponse } from "~/validation/message";

export default function Message({
  message,
  sender,
  receiverImage,
}: MessageResponse & { receiverImage?: string | null }) {
  const { data: userSession } = useSession();

  const type = userSession?.user.id === sender ? "sender" : "receiver";

  const imgUrl =
    (type === "sender" ? userSession?.user.image : receiverImage) ?? "";

  return (
    <div
      className={cn(
        "flex",
        type === "sender" ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex w-11/12",
          type === "sender" ? "flex-row-reverse" : "flex-row",
        )}
      >
        <img
          src={imgUrl}
          alt="avatar"
          className="inline-block h-10 w-10 rounded-full"
        />
        <div className="mr-4" />
        <div
          className={cn(
            "relative max-w-xl rounded-xl rounded-tr-none  px-4 py-2",
            type === "sender" ? "bg-blue-600" : "bg-green-600",
          )}
        >
          <span className="text-sm font-medium text-white">{message}</span>
        </div>
      </div>
    </div>
  );
}
