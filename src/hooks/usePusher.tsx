import { useEffect, useState } from "react";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { pusherClient } from "~/utils/pusher";
import type { MessageResponse } from "~/validation/message";

type PropType = {
  sender: string;
  receiver: string;
};

export default function usePusher({ sender, receiver }: PropType) {
  const pusherKey = pusherHrefConstructor(sender, receiver);
  const [messages, setMessages] = useState<MessageResponse[]>();
  useEffect(() => {
    pusherClient.subscribe(pusherKey);

    const messageHandler = (message: MessageResponse) => {
      setMessages((prev) => [...(prev ?? []).slice(0, -1), message]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, []);

  return messages;
}
