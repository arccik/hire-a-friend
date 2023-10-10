import { Button, Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

export default function SearchBar() {
  const [show, setShow] = useState(true);
  const ButtonWithIcon = () => (
    <>
      <p className="text-tiny font-semibold text-slate-500">Search</p>
      <GoSearch
        className="mb-2 ml-2 rounded-full bg-white p-2 text-2xl shadow-md hover:bg-gray-100 hover:shadow-lg md:cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      />
    </>
  );
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="ml-5 md:w-1/2"
        >
          <Input
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50",
              input: [
                "bg-transparent",
                "text-black/90",
                "placeholder:text-default-700/50 ",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-md",
                "bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                // "group-data-[focused=true]:bg-default-200/50",
                "!cursor-text",
                "mb-5",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <FaSearch className="pointer-events-none flex-shrink-0 text-black/50 text-slate-400" />
            }
          />
        </motion.div>
      )}
      <ButtonWithIcon />
    </AnimatePresence>
  );
}
