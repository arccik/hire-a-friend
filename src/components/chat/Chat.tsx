import { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import ChatBody from "~/components/chat/ChatBody";
import ChatFooter from "~/components/chat/ChatFooter";
import ChatHeader from "~/components/chat/ChatHeader";

import type { MessageResponse } from "~/validation/message-validation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Contacts from "./Contacts";
import { api } from "~/utils/api";
import { User } from "@nextui-org/react";

export default function Chat() {
  const { data: userSession } = useSession(); // add required when complete this component.
  const [showChat, setShowChat] = useState(true);
  const [showContacts, setShowContacts] = useState(false);
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("chat");
  const { data: receiverData } = api.friend.getOne.useQuery(
    { id: receiverId! },
    { enabled: receiverId !== null },
  );

  const [messages, setMessages] = useState<MessageResponse[]>([]);
  useEffect(() => {
    const fetchChats = () => {
      const url = receiverData?.isOffering
        ? `/api/chat?receiverId=${receiverId}`
        : `/api/chat?receiverId=${receiverId}&reverse=${true}`;
      fetch(url)
        .then(async (r) => {
          const data = (await r.json()) as MessageResponse[];
          console.log("list of messages: ", data);
          setMessages(data);
        })
        .catch((e) => console.log("Couldn't send message"));
    };
    fetchChats();
    if (receiverId) {
      setShowChat(true);
    }
  }, [receiverId]);

  if (!userSession) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="Chat Button"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: -100 }}
        transition={{ duration: 0.5 }}
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-5 right-5 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
      >
        <IoMdChatboxes size="2rem" />
      </motion.div>
      {showChat && receiverData && (
        <div className="grid grid-cols-2">
          <motion.div
            key="chat body"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 right-0 z-50 flex h-[calc(100%-100px)] w-full flex-col border bg-white shadow-md md:w-1/3"
          >
            <ChatHeader
              id={receiverData.id}
              setShowChat={setShowChat}
              name={receiverData.name}
              status={receiverData.status}
              avatar={receiverData.image}
            />
            <ChatBody
              messages={messages}
              avatar={userSession?.user?.image}
              senderName={userSession?.user?.name}
              receiverName={receiverData.name}
            />

            <ChatFooter
              setMessages={setMessages}
              receiverId={receiverId}
              setShowContacts={setShowContacts}
            />
          </motion.div>
          {showContacts && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed bottom-12 z-50 flex w-full flex-row overflow-x-scroll border bg-slate-50  md:bottom-0  md:right-1/3  md:h-[calc(100%-100px)] md:w-72 md:flex-col md:shadow-md"
            >
              <Contacts />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
