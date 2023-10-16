export default function ChatApp() {
  return null;
}

// import React, { useState, useEffect } from 'react';
// import { Redis } from '@upstash/redis';

// interface Message {
//   text: string;
//   user: string;
// }

// function ChatApp() {
//   const redis = new Redis({}); // Replace with your Upstash Redis URL

//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     const channel = 'chat_channel';

//     // Subscribe to the Redis channel to receive messages in real-time
//     const onMessage = (data: string) => {
//       const newMessage = JSON.parse(data) as Message;
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     redis.subscribe(channel, onMessage);

//     return () => {
//       redis.unsubscribe(channel, onMessage);
//       redis.quit();
//     };
//   }, [redis]);

//   const sendMessage = () => {
//     if (message.trim() === '') return;

//     const newMessage: Message = {
//       text: message,
//       user: 'You', // You can replace with user info
//     };

//     // Publish the message to the Redis channel
//     redis.publish('chat_channel', JSON.stringify(newMessage));

//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>Real-time Chat</h1>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.user}:</strong> {message.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatApp;
