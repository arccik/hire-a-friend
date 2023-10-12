import { Select, SelectItem } from "@nextui-org/react";
import { GoFilter } from "react-icons/go";
import activitiesList from "~/data/FriendActivitiesList.json";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import genders from "~/data/gender-list.json";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  return (
    <div className="mb-2 gap-2">
      {Object.keys(router.query).length > 0 && (
        <div
          onClick={() => {
            void router.push({
              query: null,
            });
            setShowFilter(false);
          }}
          className="flex cursor-pointer text-xs text-red-400"
        >
          <p className=" font-bold">Clear filter</p>
          <AiOutlineClose />
        </div>
      )}
      <div className="flex flex-row justify-end">
        <SearchBar />
        <p className="text-tiny font-semibold text-slate-500">Filter</p>
        <GoFilter
          className="mb-2 ml-2 rounded-full bg-white p-2 text-2xl shadow-md hover:bg-gray-100 hover:shadow-lg md:cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="SearchBar"
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
              }}
            >
              {genders.map((gender, index) => (
                <SelectItem key={gender.name + index} value={gender.name}>
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
              }}
            >
              {activitiesList.map((activity) => (
                <SelectItem key={activity.value}>{activity.label}</SelectItem>
              ))}
            </Select>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
