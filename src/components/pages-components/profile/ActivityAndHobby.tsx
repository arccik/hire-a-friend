import { Card } from "@nextui-org/react";

type PropType = {
  hobbies: string[];
  activities: string[];
};

export default function ActivityAndHobby({ hobbies, activities }: PropType) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded  p-4">
          <p className="text-lg font-bold">Hobbies</p>
          <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
            This i do on my free time
          </p>
          <ul>
            {hobbies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="rounded p-4">
          <p className="text-lg font-bold">Activities</p>
          <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
            I am available for
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
