import type { MessageResponse } from "~/validation/message-validation";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

type PropType = {
  messages: MessageResponse[] | undefined;
  avatar?: string | null;
  receiverName?: string | null;
};

export default function ChatBoddy({
  messages,
  avatar,
  receiverName,
}: PropType) {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messages]);

  if (!messages) return null;
  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto scroll-smooth px-4 py-4"
    >
      {messages?.map((message) => (
        <MessageBubble
          key={message?.date.toString()}
          {...message}
          avatar={avatar}
          receiverName={receiverName}
        />
      ))}
    </div>
  );
}
