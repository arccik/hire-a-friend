import { Chip } from "@nextui-org/react";
import { type User } from "@prisma/client";
import { useRouter } from "next/router";

export default function FriendCard({ item }: { item: User }) {
  const router = useRouter();
  return (
    <div
      className=" flex w-full max-w-full cursor-pointer drop-shadow-md hover:rounded-xl hover:drop-shadow-lg"
      onClick={() => void router.push(`/profile/${item.id}`)}
    >
      {item.image && (
        <div
          className="w-36 flex-none overflow-hidden  rounded-l-xl rounded-tr-none bg-cover bg-center"
          style={{ backgroundImage: `url(${encodeURI(item.image)})` }}
        ></div>
      )}
      <div className="flex w-full flex-col  justify-between  rounded bg-white p-4 leading-normal ">
        <div className="mb-2">
          <div className="text-xl font-bold text-gray-900">{item.name}</div>
          <p className="flex items-center text-sm text-gray-500">
            {item.experties}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">Hobbies:</p>
          <div className="flex flex-wrap items-center gap-1">
            <p className="mt-1 text-xs text-slate-400">
              {item.hobbies.join(", ")}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p className="mt-1 text-xs font-bold text-slate-800">Open for:</p>
          <div className="flex flex-wrap items-center gap-1">
            {item.activities.length === 0 && (
              <p className="mt-1 text-xs text-slate-400">No activities</p>
            )}

            <p className="mt-1 text-xs text-slate-400">
              {item.activities.join(", ")}
            </p>
          </div>
        </div>
        <Chip
          size="sm"
          variant="bordered"
          className="absolute right-5 top-5 text-xs opacity-50"
        >
          {item.city?.split(",")[0]}
        </Chip>
      </div>
    </div>
  );
}
