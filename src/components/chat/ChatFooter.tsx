import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineSend, AiOutlineContacts } from "react-icons/ai";
import { type Message } from "~/validation/message-validation";

type PropType = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setShowContacts: Dispatch<SetStateAction<boolean>>;
};

export default function ChatFooter({ setMessages, setShowContacts }: PropType) {
  const [message, setMessage] = useState<string>("");

  const handleMessageSend = async () => {
    if (!message) return;

    const sendData = JSON.stringify({
      message,
      sender: "Stas",
      id: Math.random().toString(36).substring(2, 15),
    });

    const response = await fetch("/api/chat", {
      method: "POST",
      body: sendData,
    });
    const data = (await response.json()) as Message;
    console.log("REspnse From Server: ", data);
    setMessages((prev) => [
      ...prev,
      // {
      //   message,
      //   sender: "Stas",
      //   receiver: 'someone',
      //   id: Math.random().toString(36).substring(2, 15),
      //   type: 'sender',

      // },
    ]);
    setMessage("");
  };
  return (
    <div className="relative bottom-0 flex w-full items-center border-t p-2">
      <div>
        <button
          onClick={() => setShowContacts((prev) => !prev)}
          className="inline-flex rounded-full p-2 hover:bg-indigo-50"
          type="button"
        >
          <AiOutlineContacts color="black" size="1.4rem" />
        </button>
      </div>

      <div className="mx-2 w-full">
        <input
          value={message}
          className="w-full rounded-full border border-gray-200 p-2 pl-4 text-xs"
          type="text"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void handleMessageSend();
            }
          }}
        />
      </div>

      <div>
        <button
          className="inline-flex rounded-full p-2 hover:bg-indigo-50"
          type="button"
          onClick={() => void handleMessageSend()}
        >
          <AiOutlineSend size="1rem" color="black" />
        </button>
      </div>
    </div>
  );
}
