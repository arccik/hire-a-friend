import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ActionButton() {
  return (
    <div className="mb-10 flex w-full justify-center">
      <Button
        as={Link}
        size="lg"
        href="/profiles"
        className="mt-10 animate-bounce bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg  hover:from-yellow-500 hover:to-pink-500 hover:drop-shadow-lg"
      >
        Start your journey
      </Button>
    </div>
  );
}
