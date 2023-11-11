import { Button } from "@nextui-org/react";
import { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdThumbUpAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

type PropType = {
  id: string;
  image: string | null;
  name: string | null;
  rate: Rate[];
  refetch: () => void;
};

export default function ActionButtons({
  id,
  image,
  name,
  rate,
  refetch,
}: PropType) {
  const { data: userSession } = useSession();
  const router = useRouter();
  const addContact = api.chat.addContact.useMutation();
  const isRated =
    userSession?.user &&
    rate.some((v: Rate) => v.voterId === userSession?.user?.id);

  const rateUser = api.friend.vote.useMutation({
    onSuccess: () => {
      toast.success("Thanks");
      refetch();
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
  const handleChatClick = () => {
    if (!userSession) {
      return toast.info(
        <div className="flex">
          <p>Have to be logged in</p>
          <Button
            className="ml-4"
            size="sm"
            onClick={() => void router.push("/auth/sign-in")}
          >
            Login
          </Button>
        </div>,
      );
    }
    addContact.mutate({
      id: id,
      image: image ?? "",
      name: name!,
    });
    void router.replace(
      {
        query: { ...router.query, chat: id, showChat: true },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <div className="mb-2 mt-0 flex justify-center gap-5 text-sm font-bold leading-normal text-gray-400">
      <div className="flex justify-end gap-5 py-6 sm:mt-0">
        <Button
          color="warning"
          variant={isRated ? "light" : "flat"}
          onClick={() => rateUser.mutate({ id })}
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
            onClick={handleChatClick}
            color="success"
            className="mr-2 rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white hover:border hover:border-orange-500"
            type="button"
            variant="flat"
          >
            Send Message
          </Button>
        )}
      </div>
    </div>
  );
}
