import { useEffect, useRef } from "react";
import Message from "./Message";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { TfiArrowLeft, TfiClose, TfiFaceSmile } from "react-icons/tfi";
import { useRouter } from "next/router";
import { Input, User } from "@nextui-org/react";
import { RiMailSendLine } from "react-icons/ri";

export default function ChatBody() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const router = useRouter();

  const { data: messages } = api.chat.getMessages.useQuery(chatId!, {
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

  const handleBackButton = () => {
    delete router.query.chat;
    void router.replace({ query: router.query });
  };

  const handleCloseButton = () => {
    delete router.query.showChat;
    void router.replace({ query: router.query });
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
        <div className="mx-auto mb-16 w-full max-w-md space-y-4">
          {messages?.map((message) => (
            <Message
              {...message}
              key={message.date.toString()}
              receiverImage={receiverData?.image}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full items-center justify-around gap-3 bg-slate-400 p-2">
        <TfiFaceSmile
          size={30}
          className="cursor-pointer rounded-full  p-1 hover:bg-indigo-50"
        />

        <Input />
        <RiMailSendLine
          size={30}
          className="-rotate-45 cursor-pointer rounded-full  p-1 hover:bg-indigo-50"
        />
      </div>
    </>
  );
}
