import React from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";

export default function ActiveFriendsCard(props: User) {
  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="min-w-[200px] max-w-[200px] border-none"
      as={Link}
      href={`profile/${props.id}`}
    >
      {props.image && (
        <Image
          alt={props.id}
          className="object-cover"
          height={100}
          src={props.image}
          width={200}
        />
      )}
      <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-center overflow-hidden rounded-large border-1 border-white/20 bg-slate-700/50 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <p className="text-tiny text-white">{props.name}</p>
        {/* <Button
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          href="profile"
        >
          <Link href={`profile/${props.id}`}> Pick me</Link>
        </Button> */}
      </CardFooter>
    </Card>
  );
}
