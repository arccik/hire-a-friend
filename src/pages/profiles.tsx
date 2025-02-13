import { Pagination } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import type { Metadata } from "next/types";
import DisplayError from "~/components/features/DisplayError";
import Title from "~/components/features/Title";
import FriendCard from "~/components/pages/profiles/FriendCard";
import { api } from "~/utils/api";
import NothingFound from "~/components/pages/profiles/NothingFound";
import { handleRouterNavigation } from "~/helpers/searchParams";
import FilterButton from "~/components/pages/profiles/FilterButton";
import { citiesList } from "~/data/cities-list";
import Loader from "~/components/features/Loader";

export const metadata: Metadata = {
  title: "Explore Profiles for Companionship and Services | RentMyTime",
  description:
    "Discover a diverse range of profiles on our platform. Whether you're looking for companionship, a listening ear, or opportunities to earn extra income, we connect people with shared interests, fostering meaningful connections and financial opportunities. Start your journey today!",
};

const HEADLINE_TITLE = "Make Connections";

export default function FriendsPage() {
  const searchParams = useSearchParams();
  const activities = searchParams.get("activities");
  const status = searchParams.get("status");
  const gender = searchParams.get("gender");
  const language = searchParams.get("language");
  const cityIndex = searchParams.get("city") ?? undefined;

  const city = citiesList.find((v) => v.id == +cityIndex!);
  const paramPage = searchParams.get("page");
  const page = paramPage ? parseInt(paramPage) : 1;
  const searchValue = searchParams.get("search") ?? undefined;

  const { data, status: filterStatus } = api.profile.filter.useQuery({
    activities: { has: activities },
    status,
    gender,
    languages: { has: language },
    city: city?.label,
    page,
  });

  const { data: searchResult } = api.profile.search.useQuery(
    { value: searchValue, page },
    { enabled: !!searchValue },
  );

  if (filterStatus === "error") return <DisplayError />;

  const toDisplay = (searchResult && searchResult) ?? (data && data);
  const isNothingFound = !!(toDisplay && toDisplay[0].length === 0);

  return (
    <main className="m-3 md:m-10">
      <div className="text-center">
        <Title text={HEADLINE_TITLE} className="mt-10 text-tiny" />
        <p className="mb-5 text-sm text-gray-400">
          Unlock a World of Connections with a Click.
        </p>
      </div>
      <div className="mx-auto h-full w-full max-w-screen-2xl content-center">
        <FilterButton />

        {filterStatus === "loading" && <Loader />}

        <NothingFound show={isNothingFound} />

        <div className="grid grid-flow-row gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3  2xl:grid-cols-4">
          {toDisplay
            ? toDisplay[0].map((friend) => (
                <FriendCard item={friend} key={friend.id} />
              ))
            : null}
        </div>

        {toDisplay && Math.ceil(toDisplay[1] / toDisplay[0]?.length) > 1 && (
          <Pagination
            className="m-10 flex place-content-center "
            color="warning"
            total={Math.ceil(toDisplay[1] / 9)}
            showControls
            isCompact
            showShadow
            page={page}
            onChange={(p) => handleRouterNavigation({ page: p })}
            variant="light"
          />
        )}
      </div>
    </main>
  );
}
