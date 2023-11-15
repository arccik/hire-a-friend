import { AnimatePresence, motion } from "framer-motion";
import { IoMdChatboxes } from "react-icons/io";
import Contacts from "./Contacts";
import { useSearchParams } from "next/navigation";
import ChatBody from "./ChatBody";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { pusherClient } from "~/utils/pusher";
import { toast } from "react-toastify";
import { pusherHrefConstructor } from "~/helpers/chatHrefConstructor";
import { MessageResponse } from "~/validation/message";
// import usePusher from "~/hooks/usePusher";

export default function ChatBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showChat = searchParams.get("showChat");
  const chatId = searchParams.get("chat");
  const { data: userSession } = useSession();

  // const messages = usePusher({
  //   sender: userSession?.user.id ?? "",
  //   receiver: chatId!,
  // });

  // console.log("Pusher Messages: ", { messages });

  useEffect(() => {
    // to disable scrolling of site when chat open
    if (showChat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showChat]);

  useEffect(() => {
    
    const pusherKey = pusherHrefConstructor(
      userSession?.user.id ?? "",
      chatId!,
    );
    pusherClient.subscribe(pusherKey);

    const messageHandler = (message: MessageResponse) => {
      console.log("New MEssage: >> ", message);
      toast.info("New Message");
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, []);

  const handleChatButtonClick = () => {
    if (showChat) {
      delete router.query.showChat;
      void router.replace({ query: router.query }, undefined, {
        shallow: true,
      });
    } else {
      void router.replace(
        {
          query: { ...router.query, showChat: true },
        },
        undefined,
        { shallow: true },
      );
    }
  };
  if (!userSession) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="Chat Button"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: -100 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-5 z-50 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
      >
        <IoMdChatboxes size="2rem" onClick={handleChatButtonClick} />
      </motion.div>
      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-0 right-0  z-50 flex h-[calc(100%-100px)] w-full flex-col overflow-x-scroll  rounded-xl  border bg-slate-50 md:w-96 md:shadow-md"
        >
          {chatId ? <ChatBody /> : <Contacts onClose={handleChatButtonClick} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
