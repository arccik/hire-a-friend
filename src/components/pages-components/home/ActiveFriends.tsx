import React from "react";
import { Spinner } from "@nextui-org/react";
import ActiveFriendsCard from "./ActiveFriendsCard";
import { api } from "~/utils/api";
import Title from "../../ui/Title";

export default function ActiveFriend() {
  const { data, status } = api.user.getAll.useQuery();
  if (status === "loading") return <Spinner size="lg" />;
  return (
    <div className="hide-scroll-bar flex w-[calc(100%-2rem)] flex-col">
      <Title text="Most Popular" className="mx-auto mb-5" />
      <div className="hide-scroll-bar ml-4 flex w-full overflow-x-scroll md:ml-10">
        <div className="flex flex-nowrap gap-2 md:gap-5">
          {data?.map((item) => <ActiveFriendsCard {...item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
}
