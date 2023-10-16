import { Card, CardBody } from "@nextui-org/react";
import { cn } from "~/lib/utils";

type PropType = {
  username: string;
  message: string;
  date?: string;
  avatar?: string;
  side: "left" | "right";
};
export default function MessageBubble({ username, message, side }: PropType) {
  return (
    <div
      className={cn("mb-2 flex items-end", side === "right" && "justify-end")}
    >
      <Card
        shadow="sm"
        className={cn("max-w-xs rounded-lg", {
          "bg-gray-200": side === "left",
          "bg-blue-500 text-white": side === "right",
        })}
      >
        <CardBody>
          <h2 className="text-xl font-semibold">{username}</h2>
          <p>{message}</p>
        </CardBody>
      </Card>
    </div>
  );
}
