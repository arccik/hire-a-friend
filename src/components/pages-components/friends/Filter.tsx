import { Select, SelectItem } from "@nextui-org/react";
import { GoFilter } from "react-icons/go";
import activitiesList from "~/data/FriendActivitiesList.json";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { type FriendFilterSchemaType } from "~/validation/friend-filter-validation";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import genders from "~/data/gender-list.json";
import { useRouter } from "next/router";

type PropsType = {
  setFilter: Dispatch<SetStateAction<FriendFilterSchemaType | null>>;
  showClearButton: boolean;
};

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   router.push(`?activities=${activities}&status=${status}&gender=${gender}`);
  // }, [activities, status, gender]);

  return (
    <div className="mb-2 flex w-full flex-col justify-between gap-2 md:flex-row">
      <GoFilter onClick={() => setShowFilter((prev) => !prev)} />

      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-10 flex w-full flex-col justify-between  gap-5 md:flex-row"
          >
            <Select
              label="Select a gender"
              variant="bordered"
              size="sm"
              name="gender"
              onChange={(e) => {
                void router.push({
                  query: { ...router.query, gender: e.target.value },
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
                void router.push({
                  query: { ...router.query, status: e.target.value },
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
                void router.push({
                  query: { ...router.query, activities: e.target.value },
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
      {Object.keys(router.query).length > 0 && (
        <div
          onClick={() => {
            void router.push({
              query: null,
            });
            setShowFilter(false);
          }}
          className="flex cursor-pointer items-start text-xs text-red-400"
        >
          <p className=" font-bold">Clear filter</p>
          <AiOutlineClose />
        </div>
      )}
    </div>
  );
}
