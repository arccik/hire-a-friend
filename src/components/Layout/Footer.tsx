import React from "react";
import Chat from "../chat/Chat";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <Chat />
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Time Industry ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
