import { Spinner, User } from "@nextui-org/react";
import { api } from "~/utils/api";

type PropType = {
  msg: string;
  sender: string;
};

export default function Notification({ msg, sender }: PropType) {
  const { data: senderData, status } = api.user.getOne.useQuery({ id: sender });
  if (status === "loading") return <Spinner />;
  return (
    <>
      <p className="text-xs font-bold"> New Message</p>
      <User
        avatarProps={{ src: senderData?.image ?? "" }}
        name={senderData?.name}
        description={msg}
      />
    </>
  );
}
