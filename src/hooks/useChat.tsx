import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { env } from "~/env.mjs";
import { SocketResponse } from "~/types/Socket";
import type { Message } from "~/types/Socket";

export default function useChat() {
  const { data: userSession } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = userSession?.user?.id;

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<SocketResponse>(env.NEXT_PUBLIC_AWS_WEBSOCKET, {
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    });

  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      // Connection is open, send initial message
      sendJsonMessage({ userId });
      console.log("WebSocket opened");
    }
  }, [readyState, userId]);

  const sendMessage = (data: Message) => {
    sendJsonMessage({ action: "sendPrivate", ...data });
  };

  const notifyOnlineMembers = (contacts: string[]) => {
    sendJsonMessage({ action: "contactList", userId, contacts });
  };

  useEffect(() => {
    if (lastJsonMessage && "body" in lastJsonMessage) {
      setMessages((prev) => [...prev, lastJsonMessage.body]);
    } else if (lastJsonMessage && "onlineMembers" in lastJsonMessage) {
      console.log("Contact LIST :::: ", lastJsonMessage.onlineMembers);
    }
  }, [lastJsonMessage]);

  console.log("USE CHAT :::: ", lastJsonMessage);

  return { messages, sendMessage, readyState, notifyOnlineMembers };
}