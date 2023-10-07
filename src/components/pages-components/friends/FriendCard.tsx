import {
  Button,
  Card,
  CardHeader,
  Image,
  CardFooter,
  Chip,
  Badge,
  Snippet,
} from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";

export default function FriendCard({ item }: { item: User }) {
  return (
    <Card
      className="max-h-[300px]"
      isFooterBlurred
      isPressable
      as={Link}
      href={`/profile/${item.id}`}
    >
      <CardHeader className="absolute top-1 z-10 flex-col items-start  overflow-auto">
        <div className="flex">
          {item.activities.slice(0, 4).map((activity) => (
            <Chip
              as={Link}
              href={`?activities=${activity}`}
              size="sm"
              className="border border-gray-200 bg-opacity-60 bg-clip-padding text-tiny text-white backdrop-blur-xl backdrop-filter"
              key={activity}
            >
              {activity}
            </Chip>
          ))}
        </div>
      </CardHeader>
      {item.image && (
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 h-full w-full object-cover"
          src={item.image}
        />
      )}
      <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
        <div className="flex flex-grow items-center gap-2">
          <h4 className="text-xl font-medium text-white/90">{item.name}</h4>
          <p className="text-tiny font-bold uppercase text-white/60">
            {item.city}
          </p>
        </div>
        {item.price && (
          <div className="">
            <Snippet
              symbol="£"
              color="primary"
              className="text-tiny text-white"
              hideCopyButton
            >
              {item.price + "/h"}
            </Snippet>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
