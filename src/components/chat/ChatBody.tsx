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
import { toast } from "react-toastify";

export default function ChatBody() {
  const { data: userSession } = useSession({ required: true });
  const chatRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");

  const router = useRouter();
  const [messages, setMessages] = useState<MessageResponse[] | undefined>();

  const pusherKey = pusherHrefConstructor(userSession?.user.id ?? "", chatId!);

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
    setMessages(messagesData);
  }, [messagesData]);

  // useEffect(() => {
  //   if (!chatId || !userSession?.user.id) return;
  //   pusherClient.subscribe(pusherKey);

  //   const messageHandler = (message: MessageResponse) => {
  //     setMessages((prev) => [...(prev ?? []).slice(0, -1), message]);
  //     if (message.receiver === userSession.user.id) {
  //       toast.info("New Message");
  //     }
  //   };

  //   pusherClient.bind("incoming-message", messageHandler);

  //   return () => {
  //     pusherClient.unsubscribe(pusherKey);
  //     pusherClient.unbind("incoming-message", messageHandler);
  //   };
  // }, [chatId]);

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
      <div className="flex items-center overflow-auto border-b p-3">
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
          {messages?.map((msg, index) => (
            <Message
              key={msg.message + index}
              {...msg}
              receiverImage={receiverData?.image}
              isLast={messages.length === index + 1}
            />
          ))}
        </div>
      </div>
      <ChatFooter setMessages={setMessages} chatId={chatId} />
    </>
  );
}
