import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { env } from "~/env.mjs";

// export const pusherServer = new PusherServer({
//   appId: env.PUSHER_APP_ID,
//   key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
//   secret: env.PUSHER_APP_SECRET,
//   cluster: "eu",
//   useTLS: true,
// });

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: "eu",
});
