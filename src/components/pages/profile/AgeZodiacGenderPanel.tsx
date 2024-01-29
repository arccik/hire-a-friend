import { zodiacSigns } from "~/data/zodiac-sign-list";
import { genders } from "~/data/gender-icons";

type Props = {
  age: number | null;
  zodiac: string | null;
  gender: string | null;
};
export default function AgeZodiacGenderPanel({ zodiac, age, gender }: Props) {
  const genderSign = genders.find((g) => g.id.toString() == gender);
  const zodiacSign = zodiacSigns.find((s) => s.id === Number(zodiac));
  return (
    <div className="mx-auto mt-5 flex flex-row justify-center md:w-96">
      <div className="flex justify-between gap-10">
        {zodiacSign && (
          <div className="flex flex-col items-center">
            <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
              Zodiac Sign
            </p>
            {zodiacSign?.Icon({ size: "2rem", color: "orange" })}
            <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">
              {zodiacSign?.name}
            </p>
          </div>
        )}
        {age && (
          <div className="flex flex-col items-center">
            <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">Age</p>
            <p className="text-2xl text-orange-500"> {age}</p>
            <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">years</p>
          </div>
        )}
        {genderSign && (
          <div className="flex flex-col items-center">
            <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">Gender</p>
            {genderSign?.Icon({ size: "2rem", color: "orange" })}
            <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">
              {genderSign?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
