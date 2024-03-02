import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import Link from "next/link";
import sayHiData from "~/data/animations/say-hi.json";

export default function Hero() {
  return (
    <section className="grid  grid-flow-row md:grid-cols-2">
      <Lottie animationData={sayHiData} loop={false} />
      <div className="m-5 flex flex-col justify-center">
        <p className="text-5xl font-semibold lg:text-7xl">
          Need a buddy for life&apos;s adventures?
        </p>
        <p className="mr-10 mt-5 text-2xl">
          Rent one (they come with stories).
        </p>
        <p className="text-md text-gray-400">
          Our platform connects those offering services with those in need,
          fostering meaningful connections and providing opportunities for extra
          income.
        </p>
        <div className="mb-10 flex w-full">
          <Button
            as={Link}
            href="/profiles"
            radius="full"
            className="mt-10 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg  hover:from-yellow-500 hover:to-pink-500 hover:drop-shadow-lg"
          >
            Make Connections
          </Button>
        </div>
      </div>
    </section>
  );
}
