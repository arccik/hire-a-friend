import { Select, SelectItem } from "@nextui-org/react";
import { GoFilter } from "react-icons/go";
import activitiesList from "~/data/FriendActivitiesList.json";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type FriendFilterSchemaType } from "~/validation/friend-filter-validation";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import genders from "~/data/gender-list.json";
import { usePathname, useSearchParams } from "next/navigation";

type PropsType = {
  // setFilter: Dispatch<SetStateAction<FriendFilterSchemaType | null>>;
  showClearButton: boolean;
};

export default function Filter({ showClearButton }: PropsType) {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log("Path Name : ", pathname);
  return (
    <>
      <div className="mb-2 flex w-full flex-col justify-between gap-2 md:flex-row">
        <GoFilter onClick={() => setShowFilter((prev) => !prev)} />

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col justify-between gap-5  md:flex-row"
            >
              <Select
                label="Select a gender"
                variant="bordered"
                size="sm"
                name="gender"
                onChange={(e) => {
                  void router.push(`/friends`, {
                    query: { gender: e.target.value },
                  });
                  // setFilter((prev) => ({ ...prev, gender: e.target.value }));
                }}
              >
                {genders.map((gender) => (
                  <SelectItem key={gender.name} value={gender.name}>
                    {gender.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Status"
                variant="bordered"
                size="sm"
                onChange={(e) => {
                  void router.push(`/friends`, {
                    query: {
                      ...searchParams.entries,
                      online: e.target.value === "Online",
                    },
                  });
                  // setFilter((prev) => ({
                  //   ...prev,
                  //   online:
                  //     e.target.value === "Online"
                  //       ? true
                  //       : e.target.value === "Offline"
                  //       ? false
                  //       : undefined,
                  // }));
                }}
              >
                {["Online", "Offline"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Activities"
                variant="bordered"
                size="sm"
                name="activities"
                onChange={(e) => {
                  void router.push(`/friends`, {
                    query: { activities: e.target.value },
                  });
                  // if (!e.target.value)
                  //   return setFilter((prev) => ({
                  //     ...prev,
                  //     activities: undefined,
                  //   }));
                  // setFilter((prev) => ({
                  //   ...prev,
                  //   activities: { has: e.target.value },
                  // }));
                }}
              >
                {activitiesList.map((activity) => (
                  <SelectItem key={activity.value}>{activity.label}</SelectItem>
                ))}
              </Select>
            </motion.div>
          )}
        </AnimatePresence>
        {showClearButton && (
          <div
            onClick={() => void router.push({ query: null })}
            className="flex cursor-pointer items-center text-red-400"
          >
            <p className="text-xs font-bold">Clear filter</p>
            <AiOutlineClose />
          </div>
        )}
      </div>
    </>
  );
}
