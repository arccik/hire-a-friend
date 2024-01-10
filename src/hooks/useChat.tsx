import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { env } from "~/env.mjs";
import { SocketResponse } from "~/types/Socket";
import type { Message, SendMessage } from "~/types/Socket";

export default function useChat() {
  const { data: userSession } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = userSession?.user?.id;

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<SocketResponse>(env.NEXT_PUBLIC_AWS_WEBSOCKET, {
      onOpen: () => {
        sendJsonMessage({ userId });
        console.log("websocket open");
      },
    });

  const sendMessage = (data: SendMessage) => {
    sendJsonMessage({ action: "sendPrivate", ...data });
  };

  const notifyOnlineMembers = (contacts: string[]) => {
    sendJsonMessage({ action: "contactList", userId, contacts });
  };

  useEffect(() => {
    if (lastJsonMessage && "body" in lastJsonMessage) {
      setMessages((prev) => [...prev, lastJsonMessage.body]);
      return;
    }
    if (lastJsonMessage && "onlineMembers" in lastJsonMessage) {
      console.log("Contact LIST :::: ", lastJsonMessage.onlineMembers);
    }
  }, [lastJsonMessage]);

  return { messages, sendMessage, readyState, notifyOnlineMembers };
}
