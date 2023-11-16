import { useSearchParams } from "next/navigation";
import DisplayError from "~/components/features/DisplayError";
import Title from "~/components/features/Title";
import FriendCard from "~/components/pages-components/friends/FriendCard";
import { api } from "~/utils/api";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const { data: people, status: searchStatus } = api.friend.search.useQuery({
    value: searchValue ?? "",
    page: 1,
  });

  if (searchStatus === "loading") return <p>Loading...</p>;
  if (searchStatus === "error") return <DisplayError />;
  return (
    <main className="m-3 md:m-10">
      <Title text="Search Result" />
      <div className="mt-10 grid grid-flow-row grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {people[0].map((person) => (
          <FriendCard item={person} key={person.id} />
        ))}
      </div>
    </main>
  );
}
