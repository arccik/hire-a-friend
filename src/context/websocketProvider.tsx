import { useSession } from "next-auth/react";
import React, { createContext, useContext, FC, ReactNode } from "react";
import useWebSocket from "react-use-websocket";
import { env } from "~/env.mjs";
import type { SocketResponse } from "~/types/Socket";

export enum ACTIONS {
  $connect = "$connect",
  $disconnect = "$disconnect",
  contactList = "contactList",
  sendPrivate = "sendPrivate",
}

interface WebSocketContextProps {
  sendJsonMessage: (message: Record<string, string | number>) => void;
  readyState: number;
  lastJsonMessage: SocketResponse;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined,
);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: userSession } = useSession();
  const userId = userSession?.user.id;
  // only open socket when user connected
  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<SocketResponse>(
      userId ? env.NEXT_PUBLIC_AWS_WEBSOCKET : null,
      {
        onOpen: () => sendJsonMessage({ userId }),
        reconnectAttempts: 10,
        reconnectInterval: 3000,
      },
    );

  const value: WebSocketContextProps = {
    sendJsonMessage,
    readyState,
    lastJsonMessage,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSharedWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error(
      "useSharedWebSocket must be used within a WebSocketProvider",
    );
  }

  return context;
};
