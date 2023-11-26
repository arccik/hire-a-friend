import { useEffect, useState } from "react";
import { type UserStatusType } from "~/types/userStatusHandler";
import { api } from "~/utils/api";
import { pusherClient } from "~/utils/pusher";

export default function OnlineStatus({ userId }: { userId: string | null }) {
  const [userStatus, setUserStatus] = useState("Offline");
  const changeUserStatus = api.chat.setUserStatus.useMutation();

  useEffect(() => {
    if (!userId) return;
    const channel = pusherClient.subscribe("online-status");

    const handleUserStatusReponse = (data: UserStatusType) => {
      if (data.userId === userId) {
        setUserStatus(data?.status);
      }
    };

    channel.bind("user-status", handleUserStatusReponse);

    changeUserStatus.mutate({ status: "Online" });

    return () => {
      pusherClient.unsubscribe("online-status");
      changeUserStatus.mutate({ status: "Offline" });
    };
  }, [userId, changeUserStatus]);

  return userStatus;
}
