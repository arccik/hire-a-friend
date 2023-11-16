import { useEffect, useState } from "react";
import { pusherClient } from "~/utils/pusher";
import type { MessageResponse } from "~/validation/message";

type PropType = {
  receiver?: string | null;
};

export default function useNewMessage({ receiver }: PropType) {
  const [messages, setMessages] = useState<MessageResponse>();
  useEffect(() => {
    if (!receiver) return;
    pusherClient.subscribe(receiver);

    const messageHandler = (message: MessageResponse) => {
      setMessages(message);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(receiver);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, []);

  return messages;
}
