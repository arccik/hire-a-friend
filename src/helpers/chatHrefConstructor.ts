export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `chat:${sortedIds[0]}:${sortedIds[1]}`;
}

export function contactsHrefConstructor(id: string) {
  return `chat:*${id}*`;
}

export function pusherHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `pusher-${sortedIds[0]}-${sortedIds[1]}`;
}
export function contactHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `contacts-${sortedIds[0]}-${sortedIds[1]}`;
}