// import React, { useState, useEffect } from 'react';
// import { Redis } from '@upstash/redis';

import { useState } from "react";
import { LuX } from "react-icons/lu";
import { IoMdChatboxes } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import ChatBoddy from "~/components/pages-components/chat/ChatBody";

export default function Chat() {
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-5 right-5 flex cursor-pointer  flex-col hover:scale-105 hover:text-slate-600"
        >
          <IoMdChatboxes size="2rem" onClick={() => setShowChat(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <AnimatePresence>
      <div className="h-screen bg-slate-400"></div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 right-0 flex h-96 w-80 flex-col border bg-white shadow-md"
      >
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">
                  John Doe
                </a>
              </div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
          </div>
          <div>
            <LuX
              className="m-2 inline-flex cursor-pointer rounded-full hover:bg-indigo-50"
              size="2rem"
              onClick={() => setShowChat(false)}
            />
          </div>
        </div>
        <ChatBoddy />

        <div className=" flex items-center border-t p-2">
          <div>
            <button
              className="inline-flex rounded-full p-2 hover:bg-indigo-50"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <div className="mx-2 w-full">
            <input
              className="w-full rounded-full border border-gray-200 p-2 text-xs"
              type="text"
              value=""
              placeholder="Aa"
              autoFocus
            />
          </div>

          <div>
            <button
              className="inline-flex rounded-full p-2 hover:bg-indigo-50"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
