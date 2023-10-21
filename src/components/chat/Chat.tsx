import { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import ChatBody from "~/components/chat/ChatBody";
import ChatFooter from "~/components/chat/ChatFooter";
import ChatHeader from "~/components/chat/ChatHeader";

import type { Message } from "~/validation/message-validation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Contacts from "./Contacts";

export default function Chat() {
  const { data: userSession } = useSession({ required: true });
  const [showChat, setShowChat] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: `Hello ${userSession?.user.name}`,
      type: "sender",
      date: new Date(),
      sender: "this is the receiver name",
      receiver: "this is the sender name",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  ]);
  useEffect(() => {
    if (chatId) {
      setShowChat(true);
    }
  }, [chatId]);
  if (!userSession) return null;
  if (!showChat) {
    // show chat button
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-5 right-5 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
        >
          <IoMdChatboxes size="2rem" onClick={() => setShowChat(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    // show chat
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 right-0 z-50 flex h-[calc(100%-100px)] w-80 flex-col border bg-white shadow-md"
      >
        <ChatHeader setShowChat={setShowChat} user={userSession?.user} />
        <ChatBody messages={messages} chatId={chatId} />

        <ChatFooter
          setMessages={setMessages}
          setShowContacts={setShowContacts}
        />
      </motion.div>
      {showContacts && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-0 right-80 z-50 flex h-[calc(100%-100px)] w-60 flex-col border bg-slate-50 shadow-md"
        >
          <Contacts />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
