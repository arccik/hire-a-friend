import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import MessageBubble from "~/components/pages-components/chat/MessageBubble";

type Message = { text: string; sender: string };

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    void socketInitialization();
  }, []);

  const socketInitialization = async () => {
    await fetch("/api/socket");

    socket = io();
    socket.on("chatMessage", (message: Message) => {
      setMessages([...messages, message]);
    });
  };
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message: Message = { text: newMessage, sender: "user" };
    socket = io();
    socket.emit("chatMessage", message);
    setMessages([...messages, message]);
    setNewMessage("");
  };
  return (
    <main className="flex h-[calc(100%-100px)] flex-col bg-gray-100">
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-semibold">Chat App</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageBubble username="XXXXXXXXXXX" message="Hello" side="left" />

        <MessageBubble
          username="Antoha Toxa"
          message=" Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate eos quae voluptate dolor a velit nesciunt eaque
                molestias, officiis nihil accusamus voluptatibus saepe
                consectetur voluptates, voluptatem obcaecati dicta expedita
                debitis!"
          side="right"
        />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-default-200/50 p-4 shadow-xl backdrop-blur-xl backdrop-saturate-200">
        <div className="flex items-center">
          <Input
            isClearable
            radius="lg"
            size="lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type here..."
            startContent={<AiOutlineMessage />}
            onKeyDown={({ key }) => key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            variant="faded"
            className="ml-2 p-2"
          >
            Send
          </Button>
        </div>
      </footer>
    </main>
  );
}
