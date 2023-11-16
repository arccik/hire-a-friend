import { Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import type { NextRouter } from "next/router";
import { useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

export default function SearchBar({ router }: { router: NextRouter }) {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="Search Bar animation"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.5, x: -300 }}
          //   transition={{ duration: 0.5 }}
        >
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
              void router.push(`/profiles?search=${e.currentTarget.value}`)
            }
            // onClear={() => {
            //   void router.push("/profiles", undefined, { shallow: true });
            // }}
            autoFocus
            placeholder="Type to search..."
            size="sm"
            startContent={<RiSearchLine size={18} />}
            type="search"
            onChange={(e) => console.log("On Change", e.target.value)}
          />
        </motion.div>
      )}
      {!show ? (
        <RiSearchLine
          size="1.4rem"
          className="cursor-pointer hover:text-slate-400"
          onClick={handleButtonClick}
        />
      ) : (
        <RiCloseLine
          size="1.4rem"
          className="cursor-pointer hover:text-slate-400"
          onClick={handleButtonClick}
        />
      )}
    </AnimatePresence>
  );
}
