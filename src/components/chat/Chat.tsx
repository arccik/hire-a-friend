import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdChatboxes } from "react-icons/io";
import Contacts from "./Contacts";
import ChatBody from "./ChatBody";
import {
  handleRouterNavigation,
  handleRouterRemoveQuery,
} from "~/helpers/searchParams";
import { ACTIONS, useSharedWebSocket } from "~/context/websocketProvider";
import { newMessageNotification } from "~/helpers/newMessageNotification";
import { api } from "~/utils/api";

export default function ChatBox() {
  const searchParams = useSearchParams();
  const showChat = searchParams.get("showChat");
  const chatId = searchParams.get("chat");
  const { data: userSession } = useSession();
  const { lastJsonMessage } = useSharedWebSocket();
  const notification = api.notify.create.useMutation();
  const message =
    lastJsonMessage &&
    ACTIONS.newMessage in lastJsonMessage &&
    lastJsonMessage.body;

  const senderId: string = message ? lastJsonMessage.body.senderId : "";

  const { data } = api.profile.getOne.useQuery(
    { id: senderId },
    {
      enabled: !!message,
    },
  );

  useEffect(() => {
    if (message) {
      if (!data) return;
      newMessageNotification({
        message: message,
        image: data.image!,
        name: data.name!,
      });
      notification.mutate({
        message: `Message ${data.name}: ${message.message}`,
        image: data.image ?? "",
        from: senderId,
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    // disable scrolling on mobile when chat open
    const isDesktop = window.innerWidth >= 768;
    document.body.style.overflow =
      showChat && !isDesktop ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showChat]);
  if (!userSession) return null;

  const handleChatButtonClick = () => {
    if (showChat) {
      handleRouterRemoveQuery("showChat");
    } else {
      handleRouterNavigation({ showChat: true });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="Chat Button"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: -100 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-5 z-10 flex cursor-pointer flex-col overflow-x-hidden hover:scale-105 hover:text-slate-600"
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
          {chatId ? <ChatBody /> : <Contacts onClose={handleChatButtonClick} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
