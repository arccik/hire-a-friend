import { Avatar } from "@nextui-org/react";
import { Notification } from "@prisma/client";
import { useRouter } from "next/router";
import { formatNoticationfDateTime } from "~/helpers/formatMessageDateTime";
import { handleRouterNavigation } from "~/helpers/searchParams";

type NotificationProps = {
  notification: Notification;
};

export default function Notification({ notification }: NotificationProps) {
  const router = useRouter();

  const handleNotificationClick = (notificaiton: Notification) => {
    if (notificaiton.message.includes("Message")) {
      handleRouterNavigation({ chat: notificaiton.from, showChat: true });
    } else {
      void router.push(`/profile/${notificaiton.from}`);
    }
  };

  return (
    <div
      onClick={() => handleNotificationClick(notification)}
      className="flex flex-row items-center gap-1 md:gap-2"
    >
      <Avatar src={notification.image} className="h-6 w-6" />
      <p className="w-full truncate text-tiny ">{notification.message}</p>
      <span className="text-[10px] text-slate-400">
        {formatNoticationfDateTime(notification.createdAt)}
      </span>
      {!notification.isRead && (
        <span className="h-2 w-3 rounded-full bg-warning"></span>
      )}
    </div>
  );
}
