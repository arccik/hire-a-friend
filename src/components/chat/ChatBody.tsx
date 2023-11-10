import type { MessageResponse } from "~/validation/message";
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
