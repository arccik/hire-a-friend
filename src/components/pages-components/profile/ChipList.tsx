import { Chip } from "@nextui-org/react";
import { Rate, User } from "@prisma/client";
import { FaCity, FaPoundSign, FaGrinHearts } from "react-icons/fa";

export default function ChipList({ data }: { data: User & { Rate: Rate[] } }) {
  return (
    <div className="my-4 flex flex-row justify-center gap-1">
      {data.city && (
        <Chip
          startContent={<FaCity size={18} />}
          className="p-2"
          variant="flat"
        >
          {data.city}
        </Chip>
      )}
      {!data?.hidePrice && data.price && (
        <Chip startContent={<FaPoundSign />} variant="flat">
          {data?.price}
          <span className="text-xs text-slate-600"> per hour</span>
        </Chip>
      )}

      {!!data.Rate.length && (
        <Chip startContent={<FaGrinHearts size={18} />} variant="flat">
          {data.Rate.length}
        </Chip>
      )}
    </div>
  );
}
