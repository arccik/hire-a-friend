type PropType = {
  hobbies: string[];
  activities: string[];
};

export default function ActivityAndHobby({ hobbies, activities }: PropType) {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:w-1/2">
        <div className="rounded-md  p-4 hover:bg-slate-50">
          <p className="text-left text-lg font-bold text-orange-500 md:text-right">
            Hobbies
          </p>
          <p className="-mt-1 mb-1 text-left text-xs leading-6 text-gray-400 md:text-right">
            Good at
          </p>
          <ul className="text-left md:text-right">
            {hobbies.map((item, index) => (
              <li className="font-bold" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md  p-4 text-left  hover:bg-slate-50 md:text-left">
          <p className="text-lg font-bold text-orange-500">Activities</p>
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
        </div>
      </div>
    </>
  );
}
