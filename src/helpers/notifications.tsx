import { toast } from "react-toastify";
import { BiMessage } from "react-icons/bi";
import { handleRouterNavigation } from "./searchParams";
import { type Message } from "~/types/Socket";
import Router from "next/router";

type NewMessageProps = {
  name?: string | null;
  message: Message;
};
export const newMessageNotification = ({ name, message }: NewMessageProps) => {
  if (Router.query.chat === message.senderId && Router.query.showChat) {
    return null;
  }
  return toast.success(
    <>
      <p className="text-xs font-bold"> New Message</p>
      <p>Touch to see message</p>
      {/* <User
        avatarProps={{ src: image ?? "" }}
        name={name}
        description={message.message}
      /> */}
    </>,
    {
      icon: <BiMessage size="2rem" />,

      onClick: () =>
        handleRouterNavigation({ chat: message.senderId, showChat: true }),
    },
  );
};
