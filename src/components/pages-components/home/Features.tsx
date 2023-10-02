import React, { useState } from "react";

import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { activities } from "~/data/activities-list";
import Link from "next/link";

export default function Features() {
  const [showMore, setShowMore] = useState(false);
  const toDisplay = showMore ? activities : activities.slice(0, 4);
  function generateRandomHexColor() {
    // Generate a random 24-bit (8-bit for each R, G, and B) color value
    const randomColorValue = Math.floor(Math.random() * 16777215); // 16777215 is equivalent to 0xFFFFFF in hexadecimal
    const color = "#" + randomColorValue.toString(16).toUpperCase();
    return color;
  }
  return (
    <>
      <div className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {toDisplay.map((item, index) => (
          <Card
            as={Link}
            className="p-3 md:p-5"
            href={`/friends?activities=${item.title}`}
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible">
              <div className="mx-auto text-center align-middle">
                <item.Icon
                  className="mx-auto text-8xl"
                  style={{
                    color: generateRandomHexColor(),
                  }}
                />
                <b>{item.title}</b>
              </div>
            </CardBody>
            <CardFooter className="justify-between">
              <p className="text-default-500">{item.description}</p>
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
