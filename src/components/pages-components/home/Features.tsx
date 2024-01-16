import React, { useState } from "react";

import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { activities } from "~/data/activities-list";
import Link from "next/link";

export default function Features() {
  const [showMore, setShowMore] = useState(false);
  const toDisplay = showMore ? activities : activities.slice(0, 4);

  return (
    <>
      <div className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-4">
        {toDisplay.map(({ title, Icon, description }, index) => (
          <Card
            as={Link}
            className="p-3 md:p-5"
            href={`/profiles?activities=${title}`}
            shadow="sm"
            key={index}
            isPressable
          >
            <CardBody className="overflow-visible">
              <div className="mx-auto  text-center align-middle duration-200 hover:scale-110">
                <Icon className="mx-auto mb-2 rounded-lg bg-gradient-to-tr from-pink-500  to-yellow-500 p-3 text-8xl text-white shadow-lg drop-shadow-lg" />
                <b>{title}</b>
              </div>
            </CardBody>
            <CardFooter className="justify-between">
              <p className="text-default-500">{description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="bordered" onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      </div>
    </>
  );
}
