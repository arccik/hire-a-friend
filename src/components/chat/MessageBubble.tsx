import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { type MessageResponse } from "~/validation/message";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { User } from "@nextui-org/react";
import { api } from "~/utils/api";
import { Contact } from "@prisma/client";
dayjs.extend(relativeTime);

export default function MessageBubble({
  message,
  sender,
  date,
  selected,
}: MessageResponse & { selected: Contact | undefined }) {
  const { data: userSession } = useSession();
  const type = userSession?.user.id === sender ? "sender" : "receiver";
  console.log("selected", selected);
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
        <User
          avatarProps={{
            src:
              (type === "sender" ? userSession?.user.image : selected?.image) ??
              undefined,
          }}
          name={type === "sender" ? "You" : selected?.name}
          description={dayjs(date).fromNow()}
        />
      </div>

      <div
        className={cn(
          "group relative mb-2 flex-1  rounded-xl p-2",
          type === "sender"
            ? "bg-indigo-200 text-gray-800"
            : "bg-indigo-400 text-white",
        )}
      >
        <div>{message}</div>

        {type == "sender" ? (
          <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 rotate-45 transform bg-indigo-200"></div>
        ) : (
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 transform bg-indigo-400"></div>
        )}
      </div>
    </div>
  );
}
