import type { MessageResponse } from "~/validation/message-validation";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import { Contact } from "@prisma/client";

type PropType = {
  messages: MessageResponse[];
  selected: Contact | undefined;
};

export default function ChatBoddy({ messages, selected }: PropType) {
  const chatRef = useRef<HTMLDivElement | null>(null);
  console.log("Chat Bodyu", selected);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messages]);

  if (!messages) return null;
  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto  px-4 py-4">
      {messages.map((message) => (
        <MessageBubble
          key={message?.date.toString()}
          {...message}
          selected={selected}
        />
      ))}
    </div>
  );
}
