import { Button, Pagination, Spinner } from "@nextui-org/react";
import DisplayError from "~/components/features/DisplayError";
import Title from "~/components/features/Title";
import FriendCard from "~/components/pages-components/friends/FriendCard";
import Filter from "~/components/pages-components/friends/Filter";
import { api } from "~/utils/api";
import Divider from "~/components/features/Divider";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const TITLE = "Meet the Right Person with a Simple Click";

export default function FriendsPage() {
  // const [page, setPage] = useState(1);
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

  const { data: searchResult, status: searchStatus } =
    api.friend.search.useQuery(
      { value: searchValue, page },
      { enabled: !!searchValue },
    );

  if (filterStatus === "error") return <DisplayError />;

  const toDisplay = searchResult ?? (filterData ? filterData[0] : []);

  return (
    <main className="m-3 md:m-10">
      <div className="text-center">
        <Title text={TITLE} className="mt-10 text-tiny" />
        <p className="mb-5 text-sm text-gray-400">
          Unlock a World of Connections with a Click.
        </p>
      </div>
      <div className="mx-auto h-full w-full max-w-screen-2xl content-center  pb-10">
        <Filter />

        {filterStatus === "loading" ? (
          <Spinner className="mt-10 flex items-center align-middle" />
        ) : (
          <>
            <div className="grid grid-flow-row gap-2 md:gap-4 lg:grid-cols-3">
              {toDisplay.map((friend) => (
                <FriendCard item={friend} key={friend.id} />
              ))}
            </div>
            {filterData[1] === 0 && (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-xl font-bold">Nothing found</p>
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
          </>
        )}

        {filterData && filterData[1] > 8 && (
          <Pagination
            className="m-10 flex place-content-center"
            total={Math.ceil(filterData[1] / 9)}
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
            color="secondary"
          />
        )}
      </div>
    </main>
  );
}
