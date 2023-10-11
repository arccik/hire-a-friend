import { Card, CardHeader, Chip, CardBody } from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FriendCard({ item }: { item: User }) {
  const router = useRouter();
  return (
    <div
      className=" flex w-full max-w-full cursor-pointer drop-shadow-md hover:rounded-xl hover:drop-shadow-lg"
      onClick={() => void router.push(`/profile/${item.id}`)}
    >
      <div
        className="w-36 flex-none overflow-hidden  rounded-l-xl rounded-tr-none bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>
      <div className="flex w-full flex-col  justify-between  rounded bg-white p-4 leading-normal ">
        <div className="mb-2">
          <div className="text-xl font-bold text-gray-900">{item.name}</div>
          <p className="flex items-center text-sm text-gray-500">
            {item.experties}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">Hobbies:</p>
          <div className="flex flex-wrap items-center gap-1">
            {item.hobbies.slice(0, 4).map((hobby, index) => (
              <Chip
                as={Link}
                href={`?activities=${hobby}`}
                size="sm"
                key={hobby + index}
                className="text-xs text-slate-600"
              >
                {hobby}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mt-1 text-xs font-bold text-slate-500">Open For:</p>
          <div className="flex flex-wrap items-center gap-1">
            {item.activities.slice(0, 3).map((activity) => (
              <Chip
                as={Link}
                href={`?activities=${activity}`}
                size="sm"
                key={activity}
                className="bg-green-300 text-xs"
              >
                {activity}
              </Chip>
            ))}
            {item.activities.length > 4 && (
              <Chip size="sm" className="bg-green-300 text-xs">
                ...
              </Chip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
