import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function formatMessageDateTime(timestamp: string) {
  const messageDateTime = dayjs(timestamp);
  const today = dayjs();

  if (messageDateTime.isSame(today, "day")) {
    // Message arrived today, display only the time
    return messageDateTime.format("h:mm A");
  } else {
    // Message arrived earlier, display the full date and time
    return messageDateTime.format("D MMM, YYYY h:mm A");
  }
}

export const formatNoticationfDateTime = (dateTime: Date) => {
  return dayjs().to(dayjs(dateTime));
};