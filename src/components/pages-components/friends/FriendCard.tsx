import {
  Button,
  Card,
  CardHeader,
  Image,
  CardFooter,
  Chip,
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
          Your day your way
        </p>
        <h4 className="text-xl font-medium text-white/90">
          Your checklist for better sleep
        </h4>
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
          {/* <Image
            alt="Breathing app icon"
            className="h-11 w-10 rounded-full bg-black"
            src="/images/breathing-app-icon.jpeg"
          /> */}
          {item.online && <Chip color="secondary">Online</Chip>}
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{item.name}</p>
            <p className="text-tiny text-white/60">
              Get a good night&apos;s sleep.
            </p>
          </div>
        </div>
        <Button radius="full" size="sm">
          <Link href={`/profile/${item.id}`}>Hire me</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
