import { Button, Chip, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import DisplayError from "~/components/features/DisplayError";
import { CiLocationOn } from "react-icons/ci";

import CustomerProfile from "~/components/pages-components/profile/CustomerProfile";
import ApearanceTable from "~/components/pages-components/profile/ApearanceTable";

import { genders } from "~/data/gender-icons";
import ActiveFriend from "~/components/pages-components/home/ActiveFriends";
import Title from "~/components/features/Title";
import { useSession } from "next-auth/react";
import { MdThumbUpAlt } from "react-icons/md";
import Gallery from "~/components/pages-components/profile/Gallery";
import { toast } from "react-toastify";
import { type Rate } from "@prisma/client";
import ActivityAndHobby from "~/components/pages-components/profile/ActivityAndHobby";
import ReportViolating from "~/components/pages-components/profile/RepotViolating";
import GoBackButton from "~/components/features/GoBackButton";
import Head from "next/head";

export default function ProfilePage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: userSession } = useSession();

  const { data, status, refetch } = api.user.getOne.useQuery(
    { id },
    { enabled: !!id },
  );
  const rateThisUser = api.friend.vote.useMutation({
    onSuccess: async () => {
      toast.success("Thanks");
      await refetch();
    },
    onError: (e) => {
      if (e.message.includes("UNAUTHORIZED"))
        return toast.info(
          <div className="flex">
            <p>Login to rate this profile</p>
            <Button
              className="ml-4"
              size="sm"
              onClick={() => void router.push("/auth/sign-in")}
            >
              Login
            </Button>
          </div>,
        );
      toast.error("Something went wrong :(");
    },
  });
  if (status === "loading")
    return (
      <Spinner
        size="lg"
        className="flex h-screen items-center justify-center"
      />
    );
  if (status === "error" || !data) return <DisplayError />;

  if (data?.userType === "Customer") return <CustomerProfile />;

  const gender = genders.find((g) => g.id.toString() == data?.gender);
  const isRated =
    userSession?.user &&
    data.Rate.some((v: Rate) => v.voterId === userSession?.user?.id);

  return (
    <main className="profile-page">
      <Head>
        <title>
          {data?.name} | Explore services, companionship, interests and hobbies
          on my profile
        </title>
      </Head>
      <section className="relative block h-[300px] lg:h-[400px]">
        <GoBackButton />

        {data?.coverImage && (
          <Image fill src={data?.coverImage} alt={"cover Image" + data?.name} />
        )}
        {data?.coverImage && (
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: data.coverImage,
            }}
          >
            <span
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-50"
            ></span>
          </div>
        )}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-[70px] w-full overflow-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Cover image bottom line */}
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-gray-200"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {data?.image && (
                  <div className="flex w-full justify-center px-4 ">
                    <div className="relative max-w-xs">
                      <Image
                        width={300}
                        height={500}
                        alt={data?.name + " Profile Image"}
                        src={data?.image}
                        className=" -mt-24 rounded-full border-none shadow-xl"
                      />
                    </div>
                  </div>
                )}
                <div className="lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                  <div className="flex justify-end gap-5 py-6 sm:mt-0">
                    <div className="mr-4 p-3 text-center">
                      <span className="block font-bold tracking-wide text-gray-600">
                        {data.city}
                      </span>
                      <span className="text-sm text-gray-400">City</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="block font-bold tracking-wide text-gray-600">
                        {data.gender}
                      </span>
                      <span className="text-sm text-gray-400">Gender</span>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center md:py-4 md:pt-8 lg:pt-4">
                    {!data?.hidePrice && (
                      <div className="mr-4 p-3 text-center">
                        <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                          £ {data?.price?.toString()}
                        </span>
                        <span className="text-sm text-gray-400">Per Hour</span>
                      </div>
                    )}
                    {data?.photos && (
                      <div className="mr-4 p-3 text-center">
                        <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                          {data.photos.length}
                        </span>
                        <span className="text-sm text-gray-400">Photos</span>
                      </div>
                    )}
                    {data.Rate && (
                      <div className="p-3 text-center lg:mr-4">
                        <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                          {data.Rate.length}
                        </span>
                        <span className="text-sm text-gray-400">
                          {data.Rate.length > 1 ? "Likes" : "Like"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center md:mt-2">
                <h3 className="mb-2  flex justify-center text-4xl font-semibold leading-normal text-gray-700">
                  {data?.name}
                </h3>
                <p className="-mt-4 text-slate-400">{data.experties}</p>
                <div className="mb-2 mt-0 flex justify-center gap-5 text-sm font-bold leading-normal text-gray-400">
                  <div className="flex justify-end gap-5 py-6 sm:mt-0">
                    <Button
                      color="warning"
                      variant={isRated ? "light" : "flat"}
                      onClick={() => rateThisUser.mutate({ id: data.id })}
                    >
                      <MdThumbUpAlt />
                      {isRated ? "Rated" : "Rate"}
                    </Button>

                    {userSession?.user.id === id ? (
                      <Button
                        variant="bordered"
                        onClick={() => void router.push("/auth/update-profile")}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          void router.replace(
                            {
                              query: { ...router.query, chat: data.id },
                            },
                            undefined,
                            { shallow: true },
                          );
                        }}
                        color="success"
                        className="mr-2 rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white hover:border hover:border-orange-500"
                        type="button"
                        variant="flat"
                      >
                        Chat
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mx-auto mb-10 mt-10 max-w-2xl text-left text-gray-600">
                  {data?.about}
                </div>
                <div className="mx-auto mb-10 mt-10 w-2/3 justify-center">
                  <Gallery imagesUrl={data?.photos} />
                </div>
              </div>

              <ActivityAndHobby
                hobbies={data.hobbies}
                activities={data.activities}
              />

              {!!data?.languages.length && (
                <div className="mb-10 mt-10 flex flex-wrap justify-center gap-5">
                  <p className="tracking-wide text-gray-600">Languages</p>
                  {data?.languages.map((language) => (
                    <Chip
                      key={language}
                      variant="dot"
                      color="warning"
                      className=" border-orange-400"
                    >
                      {language}
                    </Chip>
                  ))}
                </div>
              )}
              <ApearanceTable data={data?.appearance} />

              {data.lastLogin && (
                <div className="mt-10 text-xs text-slate-400">
                  <p>Last Visit: {data.lastLogin.toLocaleDateString()}</p>
                </div>
              )}
              <ReportViolating />
            </div>
          </div>
        </div>
        <footer className="relative mt-8 bg-gray-200 pb-6 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              <Title text="Check other profiles" className="mx-auto mb-5" />
              <ActiveFriend />
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
