import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button, Switch } from "@nextui-org/react";
import type { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MdThumbUpAlt } from "react-icons/md";
import { handleRouterNavigation } from "~/helpers/searchParams";
import { api } from "~/utils/api";
import { AiFillSetting } from "react-icons/ai";

type PropType = {
  id: string;
  rate: Rate[];
  refetch: () => void;
  isAvailable: boolean | null;
  name: string | null;
  image: string | null;
};

export default function ActionButtons({
  id,
  rate,
  refetch,
  name,
  image,
  isAvailable,
}: PropType) {
  const [activated, setActivated] = useState(!!isAvailable);
  const { data: userSession } = useSession();

  const userId = userSession?.user?.id;
  const saveContact = api.contact.addContact.useMutation();
  const makeNotificaiton = api.notify.create.useMutation();
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
    userSession?.user && rate.some((v: Rate) => v.voterId === userId);

  const rateUser = api.friend.vote.useMutation({
    onSuccess: () => {
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
    saveContact.mutate({ id });
    handleRouterNavigation({ chat: id, showChat: true });
  };

  const handleActivateClick = (status: boolean) => {
    makeActive.mutate({
      id: id,
      status,
    });
  };

  const handleRateClick = (id: string) => {
    rateUser.mutate({ id });
    if (!image && !name) return;
    if (isRated) {
      makeNotificaiton.mutate({
        message: `Unrated ${name}'s profile`,
        image: image ?? "",
        from: id,
      });
    } else {
      makeNotificaiton.mutate({
        message: `Rated ${name}'s profile`,
        image: image ?? "",
        from: id,
      });
    }
  };
  return (
    <div className="mb-2 mt-0 flex justify-center gap-5 text-sm font-bold leading-normal text-gray-400">
      <div className="space-x-4 space-y-4 ">
        <Button
          color="warning"
          variant={isRated ? "light" : "flat"}
          onClick={() => handleRateClick(id)}
        >
          <MdThumbUpAlt />
          {isRated ? "Rated" : "Rate"}
        </Button>

        {userId === id ? (
          <>
            <Button
              startContent={<AiFillSetting className="text-orange-500" />}
              variant="bordered"
              as={Link}
              href="/auth/update-profile"
            >
              Edit
            </Button>
            <br />
            <Switch
              color="warning"
              isSelected={activated}
              onValueChange={handleActivateClick}
            >
              Activate
            </Switch>
          </>
        ) : (
          <Button
            onClick={handleChatClick}
            className="mr-2 rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white"
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
