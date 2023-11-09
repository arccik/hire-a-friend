export default function Chat() {
  return <p>Chat</p>;
}

// import { useEffect, useMemo, useState } from "react";
// import { IoMdChatboxes } from "react-icons/io";
// import { AnimatePresence, motion } from "framer-motion";
// import ChatBody from "~/components/chat/ChatBody";
// import ChatFooter from "~/components/chat/ChatFooter";
// import ChatHeader from "~/components/chat/ChatHeader";

// import { useSession } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
// import Contacts from "./Contacts";
// import { api } from "~/utils/api";
// import { MessageResponse } from "~/validation/message-validation";
// import { pusherClient } from "~/utils/pusher";
// import {
//   chatHrefConstructor,
//   pusherHrefConstructor,
// } from "~/helpers/chatHrefConstructor";

// export default function Chat() {
//   const { data: userSession } = useSession(); // TODO: add required when complete this component.
//   const [showChat, setShowChat] = useState(false);
//   const [showContacts, setShowContacts] = useState(false);
//   const searchParams = useSearchParams();
//   const chatId = searchParams.get("chat");

//   const [messages, setMessages] = useState<MessageResponse[] | null>(null);
//   const { data: contactsData } = api.chat.getContacts.useQuery();
//   const { data: messageData } = api.chat.getMessages.useQuery(chatId!, {
//     enabled: !!chatId && !messages,
//   });

//   const selectedChat = useMemo(
//     () => contactsData?.find((v) => v.contactId === chatId),
//     [chatId],
//   );
//   // useEffect(() => {
//   //   if (chatId) {
//   //     setShowChat(true);
//   //   }
//   //   if (messageData) {
//   //     setMessages(messageData);
//   //   }
//   // }, [chatId]);

//   useEffect(() => {
//     if (!chatId) return;
//     if (messageData && !messages?.length) setMessages(messageData);

//     const pusherKey = pusherHrefConstructor(userSession?.user.id!, chatId);
//     pusherClient.subscribe(pusherKey);

//     const messageHandler = (message: MessageResponse) => {
//       setMessages((prev) => [...(prev || []), message]);
//       console.log("messageHandler", message, pusherKey);
//     };

//     pusherClient.bind("incoming-message", messageHandler);

//     return () => {
//       pusherClient.unsubscribe(pusherKey);
//       pusherClient.unbind("incoming-message", messageHandler);
//     };
//   }, [chatId]);

//   if (!userSession) return null;
//   return (
//     <AnimatePresence>
//       <motion.div
//         key="Chat Button"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0.5, y: -100 }}
//         transition={{ duration: 0.5 }}
//         className="fixed bottom-5 right-5 z-50 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
//       >
//         <IoMdChatboxes
//           size="2rem"
//           onClick={() => setShowChat((prev) => !prev)}
//         />
//       </motion.div>
//       {showChat && (
//         <div className="grid grid-cols-2">
//           <motion.div
//             key="chat body"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col rounded-lg border bg-white shadow-md md:h-[calc(100%-100px)] md:w-1/3"
//           >
//             <ChatHeader
//               id={selectedChat?.contactId ?? ""}
//               setShowChat={setShowChat}
//               name={selectedChat?.name ?? ""}
//               status="Online | Offline"
//               avatar={selectedChat?.image ?? ""}
//             />
//             {messages && (
//               <ChatBody messages={messages} selected={selectedChat} />
//             )}
//             {!chatId && (
//               <div className="h-full w-full items-center ">
//                 <p className="items-center text-center font-bold">
//                   No chat selected
//                 </p>
//               </div>
//             )}
//             <ChatFooter
//               receiverId={chatId}
//               setShowContacts={setShowContacts}
//               setMessages={setMessages}
//             />
//           </motion.div>
//           {showContacts && (
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 100 }}
//               className="fixed bottom-12 z-50 flex w-full flex-row overflow-x-scroll border bg-slate-50  md:bottom-0  md:right-1/3  md:h-[calc(100%-100px)] md:w-72 md:flex-col md:shadow-md"
//             >
//               {/* <Contacts selected={chatId} /> */}
//             </motion.div>
//           )}
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }
