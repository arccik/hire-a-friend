import dayjs from "dayjs";

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
