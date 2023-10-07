import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("CALLING SOCKET >>> ");
  if (req.method === "POST") {
    const io = new Server();

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("chatMessage", (message) => {
        console.log(`Message: ${message}`);

        io.emit("chatMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    io.listen(3000); // Adjust the port as needed
  } else {
    res.status(405).end();
  }
}
