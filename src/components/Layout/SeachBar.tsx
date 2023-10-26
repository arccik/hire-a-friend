import { Input } from "@nextui-org/react";
import type { NextRouter } from "next/router";
import { RiSearchLine } from "react-icons/ri";

export default function SeachBar({ router }: { router: NextRouter }) {
  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[10rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" &&
        void router.push(`/friends?search=${e.currentTarget.value}`)
      }
      onClear={() => {
        void router.push("/friends", undefined, { shallow: true });
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<RiSearchLine size={18} />}
      type="search"
      onChange={(e) => console.log("On Change", e.target.value)}
    />
  );
}
