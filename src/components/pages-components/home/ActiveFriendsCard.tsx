import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
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
      href={`/profile/${props.id}`}
    >
      <CardBody>
        {props.image && (
          <Image
            alt={props.id}
            className="object-cover"
            height={100}
            src={props.image}
            width={200}
          />
        )}
      </CardBody>
      <p className="text-center font-semibold text-slate-700">{props.name}</p>
      <CardFooter className="gap-4">
        <div className="flex gap-1">
          <p className="flex text-small font-semibold text-default-400">
            {props.city}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">
            {props.age}
          </p>
          <p className="text-small text-default-400">yers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
