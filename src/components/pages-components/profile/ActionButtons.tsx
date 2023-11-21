import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button, Switch } from "@nextui-org/react";
import type { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MdThumbUpAlt } from "react-icons/md";
import { handleRouterNavigation } from "~/helpers/searchParams";
import { api } from "~/utils/api";

type PropType = {
  id: string;
  rate: Rate[];
  refetch: () => void;
  isAvailable: boolean | null;
};

export default function ActionButtons({
  id,
  rate,
  refetch,
  isAvailable,
}: PropType) {
  const [activated, setActivated] = useState(!!isAvailable);
  const { data: userSession } = useSession();

  const addContact = api.chat.addContact.useMutation();
  const makeActive = api.user.makeActive.useMutation({
    onError: (e) => {
      if (e.message.includes("fields")) {
        toast.error(e.message);
        setActivated(false);
      }
    },
    onSuccess: () => {
      toast.success("Status successfully change");
      setActivated((prev) => !prev);
    },
  });
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
            <Button className="ml-4" size="sm" as={Link} href="/auth/sign-in">
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
          <Button className="ml-4" size="sm" as={Link} href="/auth/sign-in">
            Login
          </Button>
        </div>,
      );
    }
    addContact.mutate({
      id: id,
    });
    handleRouterNavigation({ chat: id, showChat: true });
  };

  const handleActivateClick = (status: boolean) => {
    makeActive.mutate({
      id: id,
      status,
    });
  };
  return (
    <div className="mb-2 mt-0 flex justify-center gap-5 text-sm font-bold leading-normal text-gray-400">
      <div className="space-x-4 space-y-4 ">
        <Button
          color="warning"
          variant={isRated ? "light" : "flat"}
          onClick={() => rateUser.mutate({ id })}
        >
          <MdThumbUpAlt />
          {isRated ? "Rated" : "Rate"}
        </Button>

        {userSession?.user.id === id ? (
          <>
            <Button variant="bordered" as={Link} href="/auth/update-profile">
              Edit
            </Button>
            <br />
            <Switch
              color="warning"
              // defaultSelected={activated}
              isSelected={activated}
              onValueChange={handleActivateClick}
            >
              Activate
            </Switch>
          </>
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
