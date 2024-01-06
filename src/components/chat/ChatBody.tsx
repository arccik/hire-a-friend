import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { TfiArrowLeft, TfiClose } from "react-icons/tfi";
import { Spinner, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import ChatFooter from "./ChatFooter";
import { handleRouterRemoveQuery } from "~/helpers/searchParams";
import useChat from "~/hooks/useChat";

import MessageBubble from "./MessageBubble";
import { Message, SendMessage } from "~/types/Socket";

export default function ChatBody() {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const { messages, sendMessage, readyState } = useChat();
  useSession({ required: true });
  const chatRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");

  const { data: receiverData } = api.user.getOne.useQuery(
    { id: chatId! },
    { enabled: !!chatId },
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
    setMessageHistory((prev) => [...new Set([...prev, ...messages])]);
  }, [messages]);

  const handleBackButton = () => {
    handleRouterRemoveQuery("chat");
  };

  const handleCloseButton = () => {
    handleRouterRemoveQuery("showChat");
  };

  const handleSendMessage = (data: SendMessage) => {
    console.log("handleSendMessage", { data });
    sendMessage(data);
    setMessageHistory((prev) => [...prev, data]);
  };

  return (
    <>
      <div className="flex items-center overflow-auto border-b p-3">
        <TfiArrowLeft
          onClick={handleBackButton}
          className="mr-5 cursor-pointer"
        />
        <div className="flex w-full justify-between">
          <User
            name={receiverData?.name}
            description={receiverData?.city}
            avatarProps={{
              src: receiverData?.image ?? "",
            }}
          />
          <TfiClose
            className="mt-2 inline-flex  cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
            size="2rem"
            onClick={handleCloseButton}
          />
        </div>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto mb-16 w-full space-y-4">
          {readyState !== 1 && (
            <Spinner
              className="grid h-screen place-items-center"
              color="warning"
            />
          )}
          {messageHistory?.map((msg, index) => (
            <MessageBubble key={msg.from + index} {...msg} />
          ))}
        </div>
      </div>
      <ChatFooter chatId={chatId} sendMessage={handleSendMessage} />
    </>
  );
}
