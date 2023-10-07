import { Button, Card, Spinner } from "@nextui-org/react";
import DisplayError from "~/components/ui/DisplayError";
import Title from "~/components/ui/Title";
import FriendCard from "~/components/pages-components/friends/FriendCard";
import Filter from "~/components/pages-components/friends/Filter";
import { api } from "~/utils/api";
import Divider from "~/components/ui/Divider";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function FriendsPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activities = searchParams.get("activities");
  const status = searchParams.get("status");
  const gender = searchParams.get("gender");

  const { data: filterData, status: filterStatus } = api.friend.filter.useQuery(
    {
      activities: { has: activities },
      status,
      gender: gender,
    },
  );

  if (filterStatus === "error") return <DisplayError />;

  return (
    <main className="m-3 md:m-10">
      <div className="text-center">
        <Title text="We were waiting for you" className="mt-10" />
        <p className="mb-10 text-sm text-gray-400">Subtext for makakako</p>
      </div>
      <Card className="h-full w-full max-w-screen-2xl content-center  p-4 hover:drop-shadow-lg">
        <Filter />

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
              onClick={() => {
                void router.push(
                  { pathname: router.pathname, query: null },
                  undefined,
                  {
                    shallow: true,
                  },
                );
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
}
