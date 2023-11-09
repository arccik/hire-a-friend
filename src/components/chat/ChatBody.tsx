import type { MessageResponse } from "~/validation/message-validation";
import MessageBubble from "./MessageBubble";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Contact } from "@prisma/client";
import Message from "./Message";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { TfiArrowLeft, TfiClose } from "react-icons/tfi";

type PropType = {
  // messages: MessageResponse[];
  // selected: Contact | undefined;
  setShowMessages: Dispatch<SetStateAction<boolean>>;
  setShowChat: Dispatch<SetStateAction<boolean>>;
};

export default function ChatBoddy({ setShowMessages, setShowChat }: PropType) {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");

  const { data: messageData } = api.chat.getMessages.useQuery(chatId!, {
    enabled: !!chatId,
  });

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messageData]);

  if (!messageData) return null;
  return (
    <div ref={chatRef} className="flex-1  overflow-y-auto px-4 py-4">
      <div className="mb-5 flex items-center justify-between overflow-auto border-b md:p-2">
        <TfiArrowLeft
          className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
          size="2rem"
          onClick={() => setShowMessages((prev) => !prev)}
        />
        <p className="h-12 p-2 text-lg font-semibold  text-slate-500 md:p-3">
          User Name
        </p>
        <TfiClose
          className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
          size="2rem"
          onClick={() => setShowMessages((prev) => !prev)}
        />
      </div>
      <div className="mx-auto mb-16 w-full max-w-md space-y-4">
        {messageData.map((message) => (
          <Message
            {...message}
            // selected={selected}
            key={message.date.toString()}
          />
          // <MessageBubble
          //   key={message?.date.toString()}
          //   {...message}
          //   selected={selected}
          // />
        ))}
      </div>
    </div>
  );
}
