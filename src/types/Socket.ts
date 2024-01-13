export type SocketResponse =
  | {
      onlineMembers: string[];
    }
  | {
      body: Message;
    }
  | {
      systemMessage: string[];
    };

export type SendMessage = {
  to: string;
  message: string;
  from: string;
  timestamp: string;
};
export type Message = {
  senderId: string;
  message: string;
  recipientId: string;
  timestamp: string;
};
