import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { env } from "~/env.mjs";

const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(env.NEXT_PUBLIC_AWS_WEBSOCKET);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState, sendJsonMessage } =
    useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () => sendJsonMessage({ action: "sendMessage", message: "yo Gi gi gi" }),
    [],
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="flex flex-col gap-5">
      <button
        className="border"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <br />
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? (
        <span className="font-bold">Last message: {lastMessage.data}</span>
      ) : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span className="mt-2 w-full" key={idx}>
            {message ? message.data : null}
          </span>
        ))}
      </ul>
    </div>
  );
};
export default WebSocketDemo;
