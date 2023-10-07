import React from "react";
import { Spinner } from "@nextui-org/react";
import ActiveFriendsCard from "./ActiveFriendsCard";
import { api } from "~/utils/api";
import Title from "../../ui/Title";

export default function ActiveFriend() {
  const { data, status } = api.user.getActiveFriends.useQuery();
  if (status === "loading") return <Spinner size="lg" />;
  return (
    <div className="hide-scroll-bar flex w-[calc(100%)] flex-col">
      <div className="hide-scroll-bar flex w-full overflow-x-scroll">
        <div className="flex flex-nowrap gap-2 md:gap-5">
          {data?.map((item) => <ActiveFriendsCard {...item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
}
