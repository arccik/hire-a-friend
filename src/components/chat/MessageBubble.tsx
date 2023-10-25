import Link from "next/link";
import { cn } from "~/lib/utils";
import { type MessageResponse } from "~/validation/message-validation";

export default function MessageBubble({
  message,
  avatar,
}: MessageResponse & {
  avatar?: string | null;
  receiverName?: string | null;
}) {
  const type = "sender";

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
        {avatar && (
          <img className="h-10 w-10 rounded-full" src={avatar} alt="avatar" />
        )}
        <Link
          href="/profile"
          className="block text-xs text-black hover:underline"
        >
          You
        </Link>
      </div>
      <div
        className={cn(
          "relative mb-2 flex-1 rounded-lg  p-2 ",
          type === "sender"
            ? "bg-indigo-100 text-gray-800"
            : "bg-indigo-400 text-white",
        )}
      >
        <div>{message}</div>
        {type == "sender" ? (
          <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 rotate-45 transform bg-indigo-100"></div>
        ) : (
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 transform bg-indigo-400"></div>
        )}
      </div>
    </div>
  );
}
