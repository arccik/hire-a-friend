import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../animations/people-glasses.json";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Title from "../../ui/Title";

export default function Hero() {
  return (
    <header className="mt-10">
      <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="container mx-auto text-center">
          <Title text="Welcome to Hire a Friend" className="mb-10 mt-5" />

          <p className="prose z-10 mx-auto mb-8 max-w-xl text-medium leading-tight md:text-lg">
            You can hire a friend to share joyful moments, companionship, and
            create meaningful connections, brightening your days and helping you
            leave loneliness behind.
          </p>
          <Button variant="flat">
            <Link href="/friends">Find a Friend</Link>
          </Button>
        </div>
        <div className="mx-auto w-full">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>
      </div>
    </header>
  );
}
