import React, { useState, useEffect, useRef } from "react";
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

  // Use useRef to store the initial isRead value
  const initialIsReadRef = useRef(notification.isRead);
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    // Set isRead to the initial value only on the first render
    setIsRead(initialIsReadRef.current);
  }, []);

  const handleNotificationClick = (notificaiton: Notification) => {
    if (notificaiton.message.includes("Message")) {
      handleRouterNavigation({ chat: notificaiton.from, showChat: true });
    } else {
      void router.push(`/profile/${notificaiton.from}`);
    }

    // Update the isRead state when the notification is clicked
    setIsRead(true);
  };

  return (
    <div
      onClick={() => handleNotificationClick(notification)}
      className="flex flex-row items-center gap-1 md:gap-2"
    >
      <Avatar src={notification.image} className="h-6" />
      <p className="w-full truncate text-tiny ">{notification.message}</p>
      <span className="text-[10px] text-slate-400">
        {formatNoticationfDateTime(notification.createdAt)}
      </span>
      {!isRead && <span className="h-2 w-3 rounded-full bg-warning"></span>}
    </div>
  );
}
