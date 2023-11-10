import React from "react";

import { Card, Skeleton, User as UserCard } from "@nextui-org/react";
import { User } from "@prisma/client";
import Image from "next/image";

type PropType = {
  data: User;
};

export default function CustomerProfile({ data }: PropType) {
  return (
    <section className="m-10 flex h-96 place-content-center">
      <UserCard
        name={data.name}
        description={data.city}
        avatarProps={{
          src: data.image ?? "",
        }}
      />
    </section>
  );
}
