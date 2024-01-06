import { useEffect, useState } from "react";
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

export default function ChatBox() {
  const searchParams = useSearchParams();
  const showChat = searchParams.get("showChat");
  const chatId = searchParams.get("chat");
  const { data: userSession } = useSession();

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
          {chatId ? <ChatBody /> : <Contacts onClose={handleChatButtonClick} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
