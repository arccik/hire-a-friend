import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <Input
      label="Search"
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
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
      placeholder="Type to search..."
      startContent={
        <FaSearch className="pointer-events-none flex-shrink-0 text-black/50 text-slate-400" />
      }
    />
  );
}
