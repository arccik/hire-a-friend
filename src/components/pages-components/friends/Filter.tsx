import { Select, SelectItem } from "@nextui-org/react";
import { GoFilter } from "react-icons/go";
import activitiesList from "~/data/FriendActivitiesList.json";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type FriendFilterSchemaType } from "~/validation/friend-filter-validation";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import genders from "~/data/gender-list.json";

type PropsType = {
  setFilter: Dispatch<SetStateAction<FriendFilterSchemaType | null>>;
  showClearButton: boolean;
};

export default function Filter({ showClearButton, setFilter }: PropsType) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="mb-2 flex w-full flex-col justify-between gap-2 md:flex-row ">
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
                setFilter((prev) => ({ ...prev, gender: e.target.value }));
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
                setFilter((prev) => ({
                  ...prev,
                  online:
                    e.target.value === "Online"
                      ? true
                      : e.target.value === "Offline"
                      ? false
                      : undefined,
                }));
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
                if (!e.target.value)
                  return setFilter((prev) => ({
                    ...prev,
                    activities: undefined,
                  }));
                setFilter((prev) => ({
                  ...prev,
                  activities: { has: e.target.value },
                }));
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
          onClick={() => setFilter(null)}
          className="flex cursor-pointer items-center text-red-400"
        >
          <p className="text-xs font-bold">Clear filter</p>
          <AiOutlineClose />
        </div>
      )}
    </div>
  );
}
