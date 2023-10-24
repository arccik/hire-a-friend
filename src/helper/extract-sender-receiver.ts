export default function extractSenderReceiver(value: string) {
  const result = value.split(":").slice(1);
  return { sender: result[0], receiver: result[1] };
}

export function mergeSenderReceiver({
  sender,
  receiver,
  reverse,
}: {
  sender: string;
  receiver: string;
  reverse: boolean;
}) {
  if (reverse) return `chat:${sender}:${receiver}`;
  else return `chat:${receiver}:${sender}`;
}


export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}