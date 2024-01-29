import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import DisplayError from "~/components/features/DisplayError";

import CustomerProfile from "~/components/pages/profile/CustomerProfile";
import ApearanceTable from "~/components/pages/profile/ApearanceTable";

import ActiveFriend from "~/components/pages/home/ActiveFriends";
import Title from "~/components/features/Title";
import ActivityAndHobby from "~/components/pages/profile/ActivityAndHobby";
import ReportViolating from "~/components/pages/profile/RepotViolating";
import GoBackButton from "~/components/features/GoBackButton";
import Head from "next/head";
import ActionButtons from "~/components/pages/profile/ActionButtons";
import Languages from "~/components/pages/profile/Languages";
import ChipList from "~/components/pages/profile/ChipList";
import Alert from "~/components/pages/profile/Alert";
import { useSession } from "next-auth/react";
import Loader from "~/components/features/Loader";
import checkRequiredFields from "~/helpers/checkRequiredFields";
import ImageGallery from "~/components/features/ImageGallery";
import AgeZodiacGenderPanel from "~/components/pages/profile/AgeZodiacGenderPanel";

export default function ProfilePage() {
  const { data: userSession } = useSession();
  const router = useRouter();
  const id = router.query.id as string;

  const { data, status, refetch } = api.user.getOne.useQuery(
    { id },
    { enabled: !!id },
  );

  // const unblockUser = api.contact.unblockContact.useMutation({
  //   onError: (e) =>
  //     console.error("Fail to unblock user, something went wrong", e.message),
  //   onSuccess: async () => await refetch(),
  // });
  // const { data: blockedUser } = api.chat.isBlocked.useQuery(
  //   { contactId: id, userId: userSession?.user.id ?? "" },
  //   { enabled: !!userSession?.user.id },
  // );

  if (status === "loading") return <Loader />;

  if (status === "error" || !data) return <DisplayError />;

  if (data?.userType === "Customer") return <CustomerProfile data={data} />;

  // if (blockedUser?.blocked) {
  //   return (
  //     <div className="flex flex-col justify-center">
  //       <p className="m-10 text-center">You have blocked this user.</p>
  //       <Button
  //         className="mx-auto w-10"
  //         size="sm"
  //         onClick={() => unblockUser.mutate({ id })}
  //       >
  //         Unblock
  //       </Button>
  //     </div>
  //   );
  // }

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

        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-50 blur-xl backdrop-blur-3xl backdrop-hue-rotate-15"
          src={
            !!data?.coverImage
              ? data.coverImage
              : "/assets/images/abstracts_pattern_with_funny_shapes_black_and_wh.jpg"
          }
          alt={"cover Image" + data?.name}
        />

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
                        className=" -mt-24 rounded-full border-none object-cover shadow-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-5 text-center md:mt-2">
                <h3 className="mb-2  flex justify-center text-4xl font-semibold leading-normal text-gray-700">
                  {data?.name}
                </h3>
                <p className="-mt-4 text-slate-400">{data.experties}</p>

                {userSession?.user.id === data.id && (
                  <Alert show={checkRequiredFields(data)} />
                )}
                <ActionButtons
                  isAvailable={data.activated}
                  rate={data.Rate}
                  id={data.id}
                  name={data.name}
                  image={data.image}
                  refetch={() => void refetch()}
                />

                <div className="mx-auto max-w-2xl whitespace-break-spaces text-left text-gray-600">
                  {data?.about}
                </div>
              </div>
              <ChipList data={data} />

              <ActivityAndHobby
                hobbies={data.hobbies}
                activities={data.activities}
              />
              <Languages languages={data.languages} />
              <div className="w-full">
                <ImageGallery imagesUrl={data?.photos} />
              </div>
              <ApearanceTable data={data?.appearance} />
              <AgeZodiacGenderPanel
                zodiac={data.zodiacSign}
                age={data.age}
                gender={data.gender}
              />

              {/* {data.lastLogin && (
                <div className="mt-10 text-xs text-slate-400">
                  <p>Last Visit: {data.lastLogin.toLocaleDateString()}</p>
                </div>
              )} */}
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
