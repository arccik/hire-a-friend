import { Button, Card, Spinner } from "@nextui-org/react";
import DisplayError from "~/components/ui/DisplayError";
import Title from "~/components/ui/Title";
import FriendCard from "~/components/pages-components/friends/FriendCard";
import Filter from "~/components/pages-components/friends/Filter";
import { api } from "~/utils/api";
import { type FriendFilterSchemaType } from "~/validation/friend-filter-validation";
import Divider from "~/components/ui/Divider";
import { useState } from "react";

export default function FriendsPage() {
  const [filterOptions, setFilterOptions] =
    useState<FriendFilterSchemaType | null>(null);

  console.log("Filter options: ", filterOptions);
  const { data: filterData, status: filterStatus } = api.friend.filter.useQuery(
    { ...filterOptions },
  );

  if (filterStatus === "error") return <DisplayError />;

  return (
    <main className="m-3 md:m-10">
      <div className="text-center">
        <Title text="We were waiting for you" className="mt-10" />
        <p className="mb-10 text-sm text-gray-400">Subtext for makakako</p>
      </div>
      <Card className="h-full w-full max-w-screen-2xl content-center  p-4 hover:drop-shadow-lg">
        <Filter
          setFilter={setFilterOptions}
          showClearButton={!!filterOptions}
        />

        {filterStatus === "loading" ? (
          <Spinner className="mt-10 items-center align-middle" />
        ) : (
          <div className="grid grid-flow-row gap-2 md:grid-cols-3 md:gap-4">
            {filterData?.map((friend) => (
              <FriendCard item={friend} key={friend.id} />
            ))}
          </div>
        )}
        {filterData?.length === 0 && filterStatus !== "loading" && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-xl font-bold">No friends found</p>
            <p className="text-center text-gray-600">
              Try to change your filter
            </p>
            <Divider text="or" />
            <Button
              size="sm"
              color="secondary"
              onClick={() => setFilterOptions(null)}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
}
