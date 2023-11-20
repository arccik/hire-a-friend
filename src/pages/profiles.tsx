import { Pagination, Spinner } from "@nextui-org/react";
import DisplayError from "~/components/features/DisplayError";
import Title from "~/components/features/Title";
import FriendCard from "~/components/pages-components/friends/FriendCard";
import Filter from "~/components/pages-components/friends/Filter";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import ClearFilter from "~/components/pages-components/friends/ClearFilterButton";
// import PaginationOrange from "~/components/features/PaginationOrange";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Explore Profiles for Companionship and Services | RentMyTime",
  description:
    "Discover a diverse range of profiles on our platform. Whether you're looking for companionship, a listening ear, or opportunities to earn extra income, we connect people with shared interests, fostering meaningful connections and financial opportunities. Start your journey today!",
};

const HEADLINE_TITLE = "Make Connections";

export default function FriendsPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activities = searchParams.get("activities");
  const status = searchParams.get("status");
  const gender = searchParams.get("gender");
  const city = searchParams.get("city");
  const paramPage = searchParams.get("page");
  const page = paramPage ? parseInt(paramPage) : 1;
  const searchValue = searchParams.get("search") ?? undefined;

  const { data: filterData, status: filterStatus } = api.friend.filter.useQuery(
    {
      activities: { has: activities },
      status,
      gender,
      city,
      page,
    },
  );

  const { data: searchResult } = api.friend.search.useQuery(
    { value: searchValue, page },
    { enabled: !!searchValue },
  );

  if (filterStatus === "error") return <DisplayError />;

  const toDisplay =
    (searchResult && searchResult) ?? (filterData && filterData);

  return (
    <main className="m-3 md:m-10">
      <div className="text-center">
        <Title text={HEADLINE_TITLE} className="mt-10 text-tiny" />
        <p className="mb-5 text-sm text-gray-400">
          Unlock a World of Connections with a Click.
        </p>
      </div>
      <div className="mx-auto h-full w-full max-w-screen-2xl content-center  pb-10">
        <Filter />

        {filterStatus === "loading" && (
          <Spinner
            color="warning"
            className="mt-10 flex items-center align-middle"
          />
        )}

        {toDisplay && toDisplay[0].length === 0 && (
          <ClearFilter show={true} router={router} />
        )}

        <div className="grid grid-flow-row gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3  2xl:grid-cols-4">
          {toDisplay
            ? toDisplay[0].map((friend) => (
                <FriendCard item={friend} key={friend.id} />
              ))
            : null}
        </div>
        {searchResult && searchResult[0].length === 0 && (
          <p className="mt-10 text-center text-lg text-gray-400">
            No results found
          </p>
        )}

        {toDisplay && Math.ceil(toDisplay[1] / toDisplay[0]?.length) > 1 && (
          <Pagination
            className="m-10 flex place-content-center "
            color="warning"
            total={Math.ceil(toDisplay[1] / 9)}
            showControls
            isCompact
            showShadow
            page={page}
            onChange={(p) =>
              void router.push(
                { pathname: router.pathname, query: { page: p } },
                undefined,
                {
                  shallow: true,
                },
              )
            }
            variant="light"
          />
        )}
      </div>
    </main>
  );
}
