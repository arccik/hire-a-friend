import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { type MessageResponse } from "~/validation/message-validation";

export default function MessageBubble({
  message,
  image,
  sender,
  date,
}: MessageResponse & {
  image?: string | null;
}) {
  const { data: userSession } = useSession();
  const type = userSession?.user.id === sender ? "sender" : "receiver";

  return (
    <div
      className={cn(
        "mb-4 flex items-center",
        type == "sender" ? "flex-row-reverse " : "",
      )}
    >
      <div
        className={cn(
          "flex flex-none flex-col items-center space-y-1",
          type === "sender" ? "ml-4" : "mr-4",
        )}
      >
        {image && (
          <img className="h-10 w-10 rounded-full" src={image} alt="avatar" />
        )}
        <p className="block text-xs text-black hover:underline">You</p>
      </div>
      <div
        className={cn(
          "group relative mb-2 flex-1  rounded-xl p-2",
          type === "sender"
            ? "bg-indigo-200 text-gray-800"
            : "bg-indigo-400 text-white",
        )}
      >
        <div>
          {message}
          <p className="hidden text-[0.7rem]  group-hover:block ">
            {new Date(date).toUTCString()}
          </p>
        </div>

        {type == "sender" ? (
          <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 rotate-45 transform bg-indigo-200"></div>
        ) : (
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 transform bg-indigo-400"></div>
        )}
      </div>
    </div>
  );
}
