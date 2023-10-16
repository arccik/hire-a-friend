import { Card } from "@nextui-org/react";

type PropType = {
  hobbies: string[];
  activities: string[];
};

export default function ActivityAndHobby({ hobbies, activities }: PropType) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded bg-blue-200 p-4">
          <h2 className="text-lg font-bold">Hobbies</h2>
          <ul>
            {hobbies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="rounded bg-green-200 p-4">
          <h2 className="text-lg font-bold">Activities</h2>
          <ul>
            {activities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
