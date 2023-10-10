import { Card, CardHeader, Chip, CardBody } from "@nextui-org/react";
import { type User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FriendCard({ item }: { item: User }) {
  const router = useRouter();
  return (
    <div
      className=" flex w-full max-w-full cursor-pointer drop-shadow-md hover:drop-shadow-lg"
      onClick={() => void router.push(`/profile/${item.id}`)}
    >
      <div
        className="h-auto w-36 flex-none  overflow-hidden  bg-cover text-center"
        style={{ backgroundImage: `url(${item.image})` }}
        title="User Image"
      ></div>
      <div className="flex w-full flex-col  justify-between  rounded bg-white p-4 leading-normal ">
        <div className="mb-8">
          <div className="text-xl font-bold text-gray-900">{item.name}</div>
          <p className="mb-2  flex items-center text-sm text-gray-500">
            {item.experties}
          </p>
          <p className="text-base text-gray-700">
            {item.about?.slice(0, 100)}..
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">Hobbies:</p>
          <div className="flex flex-wrap items-center gap-1">
            {item.hobbies.map((hobby) => (
              <Chip
                as={Link}
                href={`?activities=${hobby}`}
                size="sm"
                key={hobby}
                className="bg-green-400 text-xs"
              >
                {hobby}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">Activities:</p>
          <div className="flex flex-wrap items-center gap-1">
            {item.activities.slice(0, 4).map((activity) => (
              <Chip
                as={Link}
                href={`?activities=${activity}`}
                size="sm"
                key={activity}
                className="text-xs"
              >
                {activity}
              </Chip>
            ))}
            {item.activities.length > 4 && <Chip size="sm">...</Chip>}
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <Card className="flex flex-row gap-4 ">
  //     <div>
  //       {item.image && (
  //         <Image
  //           alt="Card background"
  //           src={item.image}
  //           width={120}
  //           height={120}
  //         />
  //       )}
  //     </div>
  //     <div>
  //       <h4 className="text-large font-bold">{item.name}</h4>
  //       <p className="text-tiny font-bold text-slate-400">Ocupation</p>
  //       <div className="flex-wrap gap-4">
  //         {item.activities.slice(0, 4).map((activity) => (
  //           <Chip
  //             as={Link}
  //             href={`?activities=${activity}`}
  //             size="sm"
  //             key={activity}
  //             color="primary"
  //             variant="flat"
  //           >
  //             {activity}
  //           </Chip>
  //         ))}
  //         {item.activities.length > 4 && (
  //           <Chip size="sm" color="primary" variant="flat">
  //             ...
  //           </Chip>
  //         )}
  //       </div>
  //     </div>
  //   </Card>
  // );

  // return (
  //   <Card className="py-4" isPressable as={Link} href={`/profile/${item.id}`}>
  //     <CardHeader className="flex-row items-start justify-between px-4 pb-0 pt-2">
  //       <h4 className="text-large font-bold">{item.name}</h4>
  //       <div className="flex flex-col items-end justify-between">
  //         <p className="text-tiny font-bold uppercase">{item.city}</p>
  //         {item.price && (
  //           <small className="text-default-500">£ {item.price + " / h"}</small>
  //         )}
  //       </div>
  //     </CardHeader>
  //     <CardBody className="items-center overflow-visible py-2">
  //       {item.image && (
  //         <Image
  //           alt="Card background"
  //           className="h-96 w-96 rounded-xl object-cover"
  //           src={item.image}
  //         />
  //       )}
  //     </CardBody>
  //     {item.activities && item.activities.length > 0 && (
  //       <div className="no-scrollbar ml-5 mr-5 flex overflow-x-auto">
  //         <p className="mr-5 text-tiny font-bold uppercase">Activities: </p>
  //         {item.activities.map((activity) => (
  //           <Chip
  //             as={Link}
  //             href={`?activities=${activity}`}
  //             size="sm"
  //             key={activity}
  //             color="primary"
  //             variant="flat"
  //           >
  //             {activity}
  //           </Chip>
  //         ))}
  //       </div>
  //     )}
  //   </Card>
  // );
}
