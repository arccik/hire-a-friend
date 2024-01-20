import { Chip } from "@nextui-org/react";
import type { Rate, User } from "@prisma/client";
import { FaCity, FaPoundSign, FaHeart } from "react-icons/fa";
import { cn } from "~/lib/utils";

export default function ChipList({
  data,
}: {
  data: User & { Rate: Rate[] } & { online: boolean };
}) {
  return (
    <div className="max-w-80 mx-auto my-4 grid grid-cols-3 gap-1">
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
        <Chip
          startContent={<FaHeart size={18} className="text-red-500" />}
          variant="flat"
        >
          {data.Rate.length}
        </Chip>
      )}
      <Chip
        variant="dot"
        color={data.online ? "success" : "danger"}
        className={cn(
          "col-span-3 mx-auto mt-3",
          data.online
            ? "border-green-500 text-green-600"
            : "border-red-600 text-red-600",
        )}
      >
        {data.online ? "Online" : "Offline"}
      </Chip>
    </div>
  );
}
