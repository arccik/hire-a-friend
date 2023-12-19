import { env } from "~/env.mjs";

export const socket = new WebSocket(env.NEXT_PUBLIC_AWS_WEBSOCKET);
