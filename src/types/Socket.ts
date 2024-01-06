export type SocketResponse =
  | {
      onlineMembers: string[];
    }
  | {
      body: {
        from: string;
        message: string;
        to: string;
        timestamp: string;
      };
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
  from: string;
  message: string;
  to: string;
  timestamp: string;
};
