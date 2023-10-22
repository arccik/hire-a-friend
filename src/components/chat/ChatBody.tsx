import { type Message } from "~/validation/message-validation";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

type PropType = {
  messages: Message[] | undefined;
  chatId: string | null;
};

export default function ChatBoddy({ messages, chatId }: PropType) {
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
      <p className="text-xl font-bold text-black">Chat{chatId}</p>
      {messages.map((message) => (
        <MessageBubble key={message.date.toISOString()} {...message} />
      ))}
    </div>
  );
}
