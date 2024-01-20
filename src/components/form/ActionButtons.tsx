import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function ActionButtons({ id }: { id: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex h-auto w-full items-center justify-center gap-4 bg-background/70 p-1 backdrop-blur-lg backdrop-saturate-150">
      <div className="w-1/4">
        <Button
          variant="flat"
          fullWidth
          color="danger"
          className="bg-red-100 text-red-400  hover:scale-95"
          as={Link}
          href={`/profile/${id}`}
        >
          Cancel
        </Button>
      </div>
      <div className="w-1/2">
        <Button
          fullWidth
          color="success"
          variant="flat"
          className=" border border-green-400 bg-green-100 text-green-400 hover:scale-95"
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
