import { Checkbox, Input } from "@nextui-org/react";
import { type Control, Controller } from "react-hook-form";
import { type UserValidationType } from "~/validation/member";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function Availability({
  control,
}: {
  control: Control<UserValidationType>;
}) {
  return (
    <div className="border-b border-slate-400/50 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Availability
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Let others know when you are ready to chat! Set your availability for
        seamless communication.
      </p>

      <div className="space-y-10">
        <div className="flex gap-5">
          {days.map((d) => (
            <div key={d.toUpperCase()}>
              <p>{d.toLocaleUpperCase()}</p>
              <Checkbox size="sm">All Day</Checkbox>
              <Checkbox size="sm">Spec Time</Checkbox>
            </div>
          ))}
        </div>
        <div className="mt-6 grid w-full gap-5 md:grid-cols-7">
          {days.map((day) => (
            <div key={day}>
              <Controller
                control={control}
                name={`availability.${day}`}
                render={({ field }) => (
                  <>
                    <Input
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder={day.toLocaleUpperCase()}
                      radius="sm"
                      label={day.toLocaleUpperCase()}
                      size="lg"
                      startContent="Start"
                      value={field.value?.split("-")[0] ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          `${e.target.value}-${
                            field.value?.split("-")[1] ?? ""
                          }`,
                        )
                      }
                      type="time"
                    />
                    <Input
                      variant="bordered"
                      labelPlacement="outside"
                      radius="sm"
                      size="lg"
                      startContent="End"
                      value={field.value?.split("-")[1] ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          `${field.value?.split("-")[0] ?? ""}-${
                            e.target.value
                          }`,
                        )
                      }
                      type="time"
                    />
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
