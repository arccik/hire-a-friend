import { Button, Chip, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import DisplayError from "~/components/ui/DisplayError";
import { CiLocationOn } from "react-icons/ci";

import CustomerProfile from "~/components/pages-components/profile/CustomerProfile";
import ApearanceTable from "~/components/pages-components/profile/ApearanceTable";

import { genders } from "~/data/gender-icons";
import ActiveFriend from "~/components/pages-components/home/ActiveFriends";
import Title from "~/components/ui/Title";
import { useSession } from "next-auth/react";
import { MdThumbUpAlt } from "react-icons/md";
import ImageGallery from "~/components/ui/ImageGallery";

export default function ProfilePage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: userSession } = useSession();

  const { data, status } = api.user.getOne.useQuery({ id }, { enabled: !!id });
  if (status === "loading")
    return (
      <Spinner
        size="lg"
        className="flex h-screen items-center justify-center"
      />
    );
  console.log("Profile Data  :", data);
  if (status === "error") return <DisplayError />;

  if (data?.userType === "Customer") return <CustomerProfile />;

  const GenderIcon = genders.find((g) => g.id.toString() == data?.gender)?.Icon;

  return (
    <main className="profile-page">
      <section className="relative block h-[300px] lg:h-[500px]">
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
                    <Button color="secondary" variant="flat">
                      <MdThumbUpAlt />
                      Rate
                    </Button>
                    <Button color="success" variant="flat">
                      Chat
                    </Button>
                    {userSession?.user.id === id && (
                      <Button
                        variant="bordered"
                        onClick={() => void router.push("/auth/update-profile")}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center md:py-4 md:pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                        £ {data?.price?.toString()}
                      </span>
                      <span className="text-sm text-gray-400">Per Hour</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                        10
                      </span>
                      <span className="text-sm text-gray-400">Photos</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                        89
                      </span>
                      <span className="text-sm text-gray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:mt-2">
                <h3 className="mb-2  flex justify-center text-4xl font-semibold leading-normal text-gray-700">
                  {data?.name}
                  {GenderIcon && <GenderIcon />}
                </h3>
                <div className="mb-2 mt-0 flex justify-center text-sm font-bold uppercase leading-normal text-gray-400">
                  <CiLocationOn className="mr-2 text-lg text-gray-400 " />
                  {data?.city}
                </div>

                <div className="mx-auto mb-10 mt-10 max-w-2xl text-left text-gray-600">
                  {data?.about}
                </div>
              </div>

              {!!data?.languages.length && (
                <div className="mt-10 border-t border-gray-200 py-10 text-center">
                  <p className="mb-5 font-bold uppercase tracking-wide text-gray-600">
                    Languages:
                  </p>
                  {data?.languages.map((language) => (
                    <Chip
                      key={language}
                      color="success"
                      className="bg-success/20"
                    >
                      {language}
                    </Chip>
                  ))}
                </div>
              )}
              {!!data?.activities.length && (
                <div className="mt-10 border-t border-gray-200 py-10 text-center">
                  <p className="mb-5 font-bold uppercase tracking-wide text-gray-600">
                    Available for:
                  </p>
                  <div className="mx-auto flex max-w-2xl flex-wrap gap-1 ">
                    {data?.activities.map((activity) => (
                      <Chip key={activity} color="primary" variant="dot">
                        {activity}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
              {!!data?.activities.length && (
                <div className="mt-10 border-t border-gray-200 py-10 text-center">
                  <p className="mb-5 font-bold uppercase tracking-wide text-gray-600">
                    Hobby / Interests
                  </p>
                  <div className="mx-auto flex max-w-2xl flex-wrap gap-1 ">
                    {data?.hobbies.map((hobby) => (
                      <Chip key={hobby} variant="faded">
                        {hobby}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              <ApearanceTable data={data?.appearance} />

              <div className="mt-10 border-t border-gray-200 py-10 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="text-tiny leading-relaxed text-gray-700">
                      Your Safety Matters. If you believe this person is
                      harassing you or violating our community guidelines,
                      please don not hesitate to report. We are here to ensure a
                      safe and respectful environment for all.
                    </p>
                    <a href="report" className="font-normal text-pink-500">
                      Report
                    </a>
                  </div>
                </div>
              </div>
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
