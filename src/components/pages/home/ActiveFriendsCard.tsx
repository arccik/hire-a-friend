import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

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
      <CardBody className="relative h-64">
        {props.image && (
          <Image
            fill
            alt={props.id}
            className="rounded-2xl object-cover p-1"
            src={props.image}
          />
        )}
      </CardBody>
      <p className="text-center font-semibold text-slate-700">{props.name}</p>
      <p className="-mt-1 text-center text-sm text-slate-400">
        {props.experties}
      </p>
      <CardFooter className="justify-between pt-1">
        <div className="flex gap-1">
          <p className="flex text-small font-semibold text-default-400">
            {props.city}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">
            {props.age}
          </p>
          <p className="text-small text-default-400">years</p>
        </div>
      </CardFooter>
    </Card>
  );
}
