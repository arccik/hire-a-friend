import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdChatboxes } from "react-icons/io";
import { BiMessage } from "react-icons/bi";
import { toast } from "react-toastify";
import { pusherClient } from "~/utils/pusher";
import { type MessageResponse } from "~/validation/message";
import Notification from "./Notification";
import Contacts from "./Contacts";
import ChatBody from "./ChatBody";
import {
  handleRouterNavigation,
  handleRouterRemoveQuery,
} from "~/helpers/searchParams";
import { api } from "~/utils/api";
import { type UserStatusType } from "~/types/userStatusHandler";

type PusherReponseType = {
  sender: string;
  href: string;
  receiver: string;
};

export default function ChatBox() {
  const searchParams = useSearchParams();
  const showChat = searchParams.get("showChat");
  const chatId = searchParams.get("chat");
  const { data: userSession } = useSession();
  const userId = userSession?.user.id;
  const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({});

  const changeUserStatus = api.chat.setUserStatus.useMutation();

  const setupBodyOverflow = () => {
    const isDesktop = window.innerWidth >= 768;
    document.body.style.overflow =
      showChat && !isDesktop ? "hidden" : "visible";
  };

  useEffect(() => {
    // to disable scrolling of site when chat open
    setupBodyOverflow();
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showChat]);

  useEffect(() => {
    if (!userId) return;
    pusherClient.subscribe(userId);
    pusherClient.subscribe("user-status");

    const messageHandler = (message: MessageResponse) => {
      if (message.sender === userId) return;
      toast.success(
        <Notification msg={message.message} sender={message.sender} />,
        {
          icon: <BiMessage size="2rem" />,
          onClick: () => handleRouterNavigation({ chat: message.sender }),
        },
      );
    };
    const newContactHandler = (newContact: PusherReponseType) => {
      if (newContact.receiver !== userId) return;

      toast.success(
        <Notification msg={"New Contact!"} sender={newContact.sender} />,
        {
          icon: <BiMessage size="2rem" />,
          onClick: () => handleRouterNavigation({ chat: newContact.receiver }),
        },
      );
    };
    const onlineStatusHandler = ({ userId, status }: UserStatusType) => {
      setOnlineUsers((prevOnlineUsers) => ({
        ...prevOnlineUsers,
        [userId]: status,
      }));
    };
    pusherClient.bind("incoming-message", messageHandler);
    pusherClient.bind("new-contact", newContactHandler);
    pusherClient.bind("status-change", onlineStatusHandler);

    changeUserStatus.mutate({ status: "Online" });

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unsubscribe("user-status");
      pusherClient.unbind("incoming-message", messageHandler);
      pusherClient.unbind("new-contact", newContactHandler);
      pusherClient.unbind("status-change", onlineStatusHandler);
      changeUserStatus.mutate({ status: "Offline" });
    };
  }, [userId]);

  const handleChatButtonClick = () => {
    if (showChat) {
      handleRouterRemoveQuery("showChat");
    } else {
      handleRouterNavigation({ showChat: true });
    }
  };
  if (!userSession) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="Chat Button"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: -100 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-5 z-50 flex cursor-pointer flex-col  overflow-x-hidden hover:scale-105 hover:text-slate-600"
      >
        <IoMdChatboxes size="2rem" onClick={handleChatButtonClick} />
      </motion.div>
      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-0 right-0  z-50 flex h-[calc(100%-100px)] w-full flex-col overflow-y-scroll  rounded-xl  border bg-slate-50 md:w-96 md:shadow-md"
        >
          {chatId ? (
            <ChatBody />
          ) : (
            <Contacts onlines={onlineUsers} onClose={handleChatButtonClick} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
