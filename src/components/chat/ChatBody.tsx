import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { TfiArrowLeft, TfiClose } from "react-icons/tfi";
import { useRouter } from "next/router";
import { Spinner, User } from "@nextui-org/react";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { pusherClient } from "~/utils/pusher";
import { useSession } from "next-auth/react";

import { type MessageResponse } from "~/validation/message";
import ChatFooter from "./ChatFooter";

export default function ChatBody() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const router = useRouter();
  const { data: userSession } = useSession({ required: true });

  const pusherKey = pusherHrefConstructor(userSession?.user.id ?? "", chatId!);

  const [messages, setMessages] = useState<MessageResponse[] | null>(null);
  console.log("Rerender!");

  const { data: messagesData, status: messageStatus } =
    api.chat.getMessages.useQuery(chatId!, {
      enabled: !!chatId,
    });

  const { data: receiverData } = api.user.getOne.useQuery(
    { id: chatId! },
    { enabled: !!chatId },
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId || !userSession?.user.id) return;
    if (!messages && messagesData) {
      setMessages(messagesData);
      console.log("Setting Messages", { messages });
    }

    pusherClient.subscribe(pusherKey);

    console.log("Chat Body: ", { pusherKey });

    const messageHandler = (message: MessageResponse) => {
      console.log("messageHandler", message, pusherKey);
      setMessages((prev) => [...(prev ?? []), message]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, []);

  const handleBackButton = () => {
    delete router.query.chat;
    void router.replace({ query: router.query }, undefined, { shallow: true });
  };

  const handleCloseButton = () => {
    delete router.query.showChat;
    void router.replace({ query: router.query }, undefined, { shallow: true });
  };

  return (
    <>
      <div className="flex items-center  overflow-auto border-b p-3">
        <TfiArrowLeft
          onClick={handleBackButton}
          className="mr-5 cursor-pointer"
        />
        <div className="flex w-full justify-between">
          <User
            name={receiverData?.name}
            description={receiverData?.city}
            avatarProps={{
              src: receiverData?.image ?? "",
            }}
          />
          <TfiClose
            className="mt-2 inline-flex  cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
            size="2rem"
            onClick={handleCloseButton}
          />
        </div>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto mb-16 w-full space-y-4">
          {messageStatus === "loading" && (
            <Spinner className="grid h-screen place-items-center" />
          )}
          {(messages ?? messagesData)?.map((msg, index) => (
            <Message
              key={msg.date.toString() + index}
              receiverImage={receiverData?.image}
              date={msg.date}
              message={msg.message}
              sender={userSession?.user.id ?? ""}
            />
          ))}
        </div>
      </div>
      <ChatFooter setMessages={setMessages} chatId={chatId} />
    </>
  );
}
