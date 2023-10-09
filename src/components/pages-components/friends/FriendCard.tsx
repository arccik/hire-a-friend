import { Card, CardHeader, Image, Chip, CardBody } from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";

export default function FriendCard({ item }: { item: User }) {
  return (
    <Card className="py-4" isPressable as={Link} href={`/profile/${item.id}`}>
      <CardHeader className="flex-row items-start justify-between px-4 pb-0 pt-2">
        <h4 className="text-large font-bold">{item.name}</h4>
        <div className="flex flex-col items-end justify-between">
          <p className="text-tiny font-bold uppercase">{item.city}</p>
          {item.price && (
            <small className="text-default-500">£ {item.price + " / h"}</small>
          )}
        </div>
      </CardHeader>
      <CardBody className="items-center overflow-visible py-2">
        {item.image && (
          <Image
            alt="Card background"
            className="h-96 w-96 rounded-xl object-cover"
            src={item.image}
          />
        )}
      </CardBody>
      {item.activities && item.activities.length > 0 && (
        <div className="no-scrollbar ml-5 mr-5 flex overflow-x-auto">
          <p className="mr-5 text-tiny font-bold uppercase">Activities: </p>
          {item.activities.map((activity) => (
            <Chip
              as={Link}
              href={`?activities=${activity}`}
              size="sm"
              key={activity}
              color="primary"
              variant="flat"
            >
              {activity}
            </Chip>
          ))}
        </div>
      )}
    </Card>
  );
}
