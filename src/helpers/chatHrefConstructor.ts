export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `chat:${sortedIds[0]}:${sortedIds[1]}`;
}
