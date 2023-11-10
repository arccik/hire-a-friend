import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { TfiArrowLeft, TfiClose, TfiFaceSmile } from "react-icons/tfi";
import { useRouter } from "next/router";
import { Input, Spinner, User } from "@nextui-org/react";
import { RiMailSendLine } from "react-icons/ri";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { pusherClient } from "~/utils/pusher";
import { type MessageResponse } from "~/validation/message";
import { useSession } from "next-auth/react";

export default function ChatBody() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const router = useRouter();
  const { data: userSession } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageResponse[] | null>(null);

  const {
    data: messagesData,
    refetch,
    status: messageStatus,
  } = api.chat.getMessages.useQuery(chatId!, {
    enabled: !!chatId,
  });

  const { data: receiverData } = api.user.getOne.useQuery(
    { id: chatId! },
    { enabled: !!chatId },
  );
  const addMessage = api.chat.addMessage.useMutation();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId || !userSession?.user.id) return;
    setMessages((prev) => [...(prev ?? []), ...(messagesData ?? [])]);
    const pusherKey = pusherHrefConstructor(userSession?.user.id, chatId);
    pusherClient.subscribe(pusherKey);

    const messageHandler = (message: MessageResponse) => {
      console.log("messageHandler", message, pusherKey);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, [chatId, messagesData, userSession?.user.id]);

  const handleBackButton = () => {
    delete router.query.chat;
    void router.replace({ query: router.query }, undefined, { shallow: true });
  };

  const handleCloseButton = () => {
    delete router.query.showChat;
    void router.replace({ query: router.query }, undefined, { shallow: true });
  };

  const handleMessageSend = async () => {
    if (!message || !userSession?.user.id) return;
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
    const sendData = {
      message,
      sender: userSession?.user.id,
      date: new Date(),
    };
    setMessages((prev) => [...(prev ?? []), sendData]);
    addMessage.mutate(sendData);
    await refetch();
    setMessage("");
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

      <div ref={chatRef} className="flex-1  overflow-y-auto px-4 py-4">
        <div className="mx-auto mb-16 w-full  space-y-4">
          {messageStatus === "loading" && (
            <Spinner className="grid h-screen place-items-center" />
          )}
          {(messages ?? messagesData)?.map((message, index) => (
            <Message
              {...message}
              key={message.date.toString() + index}
              receiverImage={receiverData?.image}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-40 flex h-auto w-full items-center justify-around  gap-3 bg-background/70  p-2  backdrop-blur-lg backdrop-saturate-150">
        <TfiFaceSmile
          size={30}
          className="cursor-pointer rounded-full  p-1 hover:bg-indigo-50"
        />

        <Input
          value={message}
          variant="bordered"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void handleMessageSend();
            }
          }}
        />
        <RiMailSendLine
          size={30}
          onClick={() => void handleMessageSend()}
          className="-rotate-45 cursor-pointer rounded-full  p-1 hover:bg-indigo-50"
        />
      </div>
    </>
  );
}
