import { Card } from "@nextui-org/react";

type PropType = {
  hobbies: string[];
  activities: string[];
};

export default function ActivityAndHobby({ hobbies, activities }: PropType) {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:w-1/2">
        <Card shadow="sm" className="rounded-xl p-4 hover:bg-slate-50">
          <p className="text-lg">Hobbies</p>
          <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">Good at</p>
          <ul>
            {hobbies.map((item, index) => (
              <li className="font-bold" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card shadow="sm" className="rounded-xl p-4 hover:bg-slate-50">
          <p className="text-lg">Activities</p>
          <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
            Available for
          </p>
          <ul>
            {activities.map((item, index) => (
              <li className="font-bold" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
