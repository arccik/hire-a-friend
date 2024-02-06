import React from "react";
import ActiveFriendsCard from "./ActiveFriendsCard";
import { api } from "~/utils/api";
import Loader from "~/components/features/Loader";
import DisplayError from "~/components/features/DisplayError";

export default function ActiveFriend() {
  const { data, status } = api.profile.getActiveFriends.useQuery();

  console.log("ActiveFriend", data);
  if (status === "loading") return <Loader />;
  if (status === "error") return <DisplayError />;
  return (
    <div className="no-scrollbar flex w-[calc(100%)] flex-col">
      <div className="no-scrollbar flex w-full overflow-x-scroll">
        <div className="flex flex-nowrap gap-2 p-4 md:gap-5">
          {data?.map((item) => <ActiveFriendsCard key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  );
}
