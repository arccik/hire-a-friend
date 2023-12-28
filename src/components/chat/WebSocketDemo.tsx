import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { env } from "~/env.mjs";

type MessageResponse = {
  action: string;
};

export const WebSocketDemo = () => {
  const { data: userSession } = useSession();
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const userId = userSession?.user.id;

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    env.NEXT_PUBLIC_AWS_WEBSOCKET,
    {
      onOpen: () => {
        sendJsonMessage({ userId });
        console.log("OPENED");
      },
    },
  );

  console.log("SOCKET ::: ", { readyState, lastJsonMessage });

  useEffect(() => {
    if (!lastJsonMessage) return;
    setMessageHistory((prev) => {
      return prev.concat(lastJsonMessage);
    });
  }, [lastJsonMessage, setMessageHistory]);

  const handleContactsCheck = useCallback(() => {
    sendJsonMessage({
      action: "contactList",
      userId,
      contacts: JSON.stringify([
        "clp74ljkl00001lyfo80kiogu",
        "something else very long with user contacts",
      ]),
    });
  }, []);

  const handleSendPrivateMessage = () => {
    if (!inputValue) return;
    setInputValue("");
    sendJsonMessage({
      action: "sendPrivate",
      to: "clp74ljkl00001lyfo80kiogu",
      message: inputValue,
    });
  };

  const dispayMessages = () => {
    const messagesData = messageHistory.map((message, idx) =>
      JSON.parse(message.data),
    );
    console.log("HISTORY MESSAGE: ", messagesData);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  console.log("SOCKET ::: ", { inputValue });
  return (
    <div className="grid w-full items-center bg-gray-200">
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastJsonMessage ? (
        <span>Last message: {lastJsonMessage.toString()}</span>
      ) : null}
      <>
        <ul className="p-2">
          {messageHistory.map((message: any, idx: number) => (
            <li className="h-10 w-full rounded-sm bg-gray-400" key={idx}>
              {message["data"] ? message.data : null}
            </li>
          ))}
        </ul>

        {dispayMessages()}
      </>
      <div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleContactsCheck}>send contacts</Button>
        <Button onClick={handleSendPrivateMessage}>send Message</Button>
      </div>
    </div>
  );
};
