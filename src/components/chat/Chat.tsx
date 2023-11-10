import { AnimatePresence, motion } from "framer-motion";
import { IoMdChatboxes } from "react-icons/io";
import Contacts from "./Contacts";
import { useSearchParams } from "next/navigation";
import ChatBody from "./ChatBody";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ChatBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showChat = searchParams.get("showChat");
  const chatId = searchParams.get("chat");
  const { data: userSession } = useSession();

  if (!userSession) return null;
  const handleChatButtonClick = () => {
    if (showChat) {
      delete router.query.showChat;
      void router.replace({ query: router.query });
      document.body.style.overflow = "visible"; // to disable scrolling when chat open
    } else {
      document.body.style.overflow = "hidden";
      void router.replace(
        {
          query: { ...router.query, showChat: true },
        },
        undefined,
        { shallow: true },
      );
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
        className="fixed bottom-5 right-5 z-50 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
      >
        <IoMdChatboxes size="2rem" onClick={handleChatButtonClick} />
      </motion.div>
      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-0 right-0  z-50 flex h-[calc(100%-100px)]  w-full flex-col  overflow-x-scroll  border bg-slate-50 md:w-96 md:shadow-md"
        >
          {chatId ? <ChatBody /> : <Contacts onClose={handleChatButtonClick} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
