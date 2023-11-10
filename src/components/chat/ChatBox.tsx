import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import Contacts from "./Contacts";
import { useSearchParams } from "next/navigation";
import ChatBoddy from "./ChatBody";
import { MessageResponse } from "~/validation/message";
import { TfiArrowLeft, TfiClose } from "react-icons/tfi";

export default function ChatBox() {
  const [showChat, setShowChat] = useState(false);
  const [showMessages, setShowMessages] = useState(true);

  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");

  useEffect(() => {
    if (chatId) {
      setShowChat((prev) => !prev);
    }
  }, [chatId]);

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
        <IoMdChatboxes
          size="2rem"
          onClick={() => setShowChat((prev) => !prev)}
        />
      </motion.div>
      {showChat && (
        <div className="grid grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-0 right-0  z-50 flex h-[calc(100%-100px)]  w-full flex-col  overflow-x-scroll  border bg-slate-50 md:w-72 md:shadow-md"
          >
            {!showChat ? (
              <>
                <div className="sticky flex items-center justify-between overflow-auto border-b">
                  <TfiArrowLeft
                    className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
                    size="2rem"
                    onClick={() => setShowMessages((prev) => !prev)}
                  />
                  <p className="text-lg font-semibold  text-slate-500 md:p-3">
                    User Name
                  </p>
                  <TfiClose
                    className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
                    size="2rem"
                    onClick={() => setShowMessages((prev) => !prev)}
                  />
                </div>
                <ChatBoddy
                  setShowMessages={setShowMessages}
                  setShowChat={setShowChat}
                />
              </>
            ) : (
              <Contacts
                selected={chatId}
                setShowMessages={setShowMessages}
                setShowChat={setShowChat}
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
