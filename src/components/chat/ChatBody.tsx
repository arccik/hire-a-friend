import { Message } from "~/validation/message-validation";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

type PropType = {
  messages: Message[] | undefined;
};

export default function ChatBoddy({ messages }: PropType) {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messages?.at(-1)]);

  if (!messages) return null;
  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto scroll-smooth px-4 py-4"
    >
      {messages.map((message) => (
        <MessageBubble key={message.date.toISOString()} {...message} />
      ))}
    </div>
  );
}
