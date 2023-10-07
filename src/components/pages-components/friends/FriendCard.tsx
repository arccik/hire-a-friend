import {
  Button,
  Card,
  CardHeader,
  Image,
  CardFooter,
  Chip,
  Badge,
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
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="text-tiny font-bold uppercase text-white/60">
          {item.city}
        </p>

        <h4 className="text-xl font-medium text-white/90">{item.name}</h4>
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
          <div className="flex flex-col">
            <div className="flex snap-x gap-2 scroll-auto">
              {item.activities.slice(0, 4).map((activity) => (
                <Chip
                  size="sm"
                  color="success"
                  variant="dot"
                  className="snap-start text-tiny text-white/60"
                  key={activity}
                >
                  {activity}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
