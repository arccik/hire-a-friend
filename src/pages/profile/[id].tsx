import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import DisplayError from "~/components/features/DisplayError";

import CustomerProfile from "~/components/pages-components/profile/CustomerProfile";
import ApearanceTable from "~/components/pages-components/profile/ApearanceTable";

import { genders } from "~/data/gender-icons";
import ActiveFriend from "~/components/pages-components/home/ActiveFriends";
import Title from "~/components/features/Title";
import Gallery from "~/components/pages-components/profile/Gallery";
import ActivityAndHobby from "~/components/pages-components/profile/ActivityAndHobby";
import ReportViolating from "~/components/pages-components/profile/RepotViolating";
import GoBackButton from "~/components/features/GoBackButton";
import Head from "next/head";
import ActionButtons from "~/components/pages-components/profile/ActionButtons";
import Languages from "~/components/pages-components/profile/Languages";
import { zodiacSigns } from "~/data/zodiac-sign-list";
import ChipList from "~/components/pages-components/profile/ChipList";

export default function ProfilePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, status, refetch } = api.user.getOne.useQuery(
    { id },
    { enabled: !!id },
  );

  if (status === "loading")
    return (
      <Spinner
        size="lg"
        className="flex h-screen items-center justify-center"
      />
    );
  if (status === "error" || !data) return <DisplayError />;

  if (data?.userType === "Customer") return <CustomerProfile data={data} />;

  const gender = genders.find((g) => g.id.toString() == data?.gender);

  const zodiacSign = zodiacSigns.find((s) => s.id === Number(data.zodiacSign));

  return (
    <main className="profile-page">
      <Head>
        <title>
          {data?.name} Profile | Offer companionship, services and company |
          Check my interests and hobbies
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
              </div>
              <div className="text-center md:mt-2">
                <h3 className="mb-2  flex justify-center text-4xl font-semibold leading-normal text-gray-700">
                  {data?.name}
                </h3>
                <p className="-mt-4 text-slate-400">{data.experties}</p>

                <ActionButtons
                  rate={data.Rate}
                  id={data.id}
                  refetch={() => void refetch()}
                />

                <div className="mx-auto mb-10 mt-10 max-w-2xl text-left text-gray-600">
                  {data?.about}
                </div>
              </div>
              <ChipList data={data} />

              <ActivityAndHobby
                hobbies={data.hobbies}
                activities={data.activities}
              />
              <Languages languages={data.languages} />
              <div className="mx-auto mb-10 mt-10 flex flex-row justify-center gap-4 md:w-2/3">
                <Gallery imagesUrl={data?.photos} />
              </div>
              <ApearanceTable data={data?.appearance} />
              <div className="mx-auto mt-5 flex flex-row justify-center md:w-96">
                <div className="flex justify-between gap-10">
                  {zodiacSign && (
                    <div className="mx-auto">
                      <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
                        Zodiac Sign
                      </p>
                      {zodiacSign?.Icon({ size: "2rem", color: "orange" })}
                      <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">
                        {zodiacSign?.name}
                      </p>
                    </div>
                  )}
                  {data.age && (
                    <div className="mx-auto">
                      <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
                        Age
                      </p>
                      <p className="text-2xl text-orange-500"> {data.age}</p>
                      <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">
                        years
                      </p>
                    </div>
                  )}
                  <div className="mx-auto">
                    <p className="-mt-1 mb-1 text-xs leading-6 text-gray-400">
                      Gender
                    </p>
                    {gender?.Icon({ size: "2rem", color: "orange" })}
                    <p className=" -mt-1 mb-1 text-xs leading-6 text-gray-400">
                      {gender?.name}
                    </p>
                  </div>
                </div>
              </div>
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
