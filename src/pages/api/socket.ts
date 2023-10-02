import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

interface NextApiRequestWithSocket extends NextApiRequest {
  end: () => void;
}

export default function SocketHandler(
  req: NextApiRequestWithSocket,
  res: NextApiResponseWithSocket,
) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      socket.emit("receive-message", obj);
    });
  });
  console.log("socket handler");
  req.end();
}
