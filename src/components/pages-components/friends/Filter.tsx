import { Select, SelectItem } from "@nextui-org/react";
import { GoFilter } from "react-icons/go";
import activitiesList from "~/data/FriendActivitiesList.json";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import genders from "~/data/gender-list.json";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import { citiesList } from "~/data/cities-list";

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  const queryKeysToCheck = ["activities", "status", "gender", "city", "status"];
  const shouldRenderClearBtn = useMemo(() => queryKeysToCheck.some(
    (key) => key in router.query,
  ), [router.query]);

  return (
    <div className="mb-2 gap-2">
      {shouldRenderClearBtn && (
        <div
          onClick={() => {
            void router.push({
              query: router.query.page ? { page: router.query.page } : null,
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
            className="mb-10 mt-2 flex w-full flex-col justify-between  gap-5 md:flex-row"
          >
            <Select
              label="Select a gender"
              size="sm"
              labelPlacement="outside"
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
              size="sm"
              labelPlacement="outside"
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
              size="sm"
              name="activities"
              labelPlacement="outside"
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
            <Select
              label="City"
              labelPlacement="outside"
              size="sm"
              onChange={(e) => {
                void router.push({
                  query: { ...router.query, city: e.target.value },
                });
              }}
            >
              {citiesList.map((city) => (
                <SelectItem key={city.label} value={city.label}>
                  {city.label}
                </SelectItem>
              ))}
            </Select>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
