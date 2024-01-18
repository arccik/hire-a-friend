import { toast } from "react-toastify";
import { BiMessage } from "react-icons/bi";
import Router from "next/router";

import { handleRouterNavigation } from "./searchParams";
import { type Message } from "~/components/chat/ChatBody";
import { User } from "@nextui-org/react";

type NewMessageProps = {
  name?: string | null;
  message: Message;
  image?: string | null;
};
export const newMessageNotification = ({
  message,
  image,
  name,
}: NewMessageProps) => {
  if (Router.query.chat === message.senderId && Router.query.showChat) {
    return null;
  }
  return toast.success(
    <>
      <User
        avatarProps={{ src: image ?? "" }}
        name={name}
        description={message.message}
      />
    </>,
    {
      icon: <BiMessage size="2rem" />,

      onClick: () =>
        handleRouterNavigation({ chat: message.senderId, showChat: true }),
    },
  );
};
