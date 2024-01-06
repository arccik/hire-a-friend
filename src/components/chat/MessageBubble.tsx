import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { Message } from "~/types/Socket";

type Props = Message & { recipientImage?: string };

export default function MessageBubble({
  message,
  from,
  to,
  timestamp,
  recipientImage,
}: Props) {
  const { data: userSession } = useSession();
  const isSender = userSession?.user?.id === from;

  const avatarUrl = isSender ? recipientImage : userSession?.user?.image;

  return (
    <div className={cn("flex", isSender ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative flex w-11/12",
          isSender ? "flex-row-reverse" : "flex-row",
        )}
      >
        <Avatar
          src={avatarUrl || ""}
          alt="Your avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="mr-4" />
        <div
          className={cn(
            "relative max-w-xl whitespace-normal  rounded-xl px-4 py-2",
            isSender
              ? "rounded-tr-none bg-blue-600"
              : "rounded-tl-none bg-green-600",
          )}
        >
          <span className="text-md break-all font-medium text-white">
            {message}
          </span>
        </div>
        {/* {isLast && (
              <span className="absolute -bottom-4 right-32 text-[0.7rem] text-black">
                {dayjs(date).fromNow()}
              </span>
            )} */}
      </div>
    </div>
  );
}
