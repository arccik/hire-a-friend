import React from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { activities } from "~/data/activities-list";
import Link from "next/link";

export default function Features() {
  function generateRandomHexColor() {
    // Generate a random 24-bit (8-bit for each R, G, and B) color value
    const randomColorValue = Math.floor(Math.random() * 16777215); // 16777215 is equivalent to 0xFFFFFF in hexadecimal
    const color = "#" + randomColorValue.toString(16).toUpperCase();
    return color;
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {activities.map((item, index) => (
        <Card
          as={Link}
          className="p-1 md:p-5"
          href={`/friends?activities=${item.title}`}
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible">
            <div className="mx-auto text-center ">
              <item.Icon
                className="text-8xl "
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
  );
}
