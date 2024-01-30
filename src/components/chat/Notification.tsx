import { User } from "@nextui-org/react";
import { api } from "~/utils/api";
import Loader from "../features/Loader";

type PropType = {
  msg: string;
  sender: string;
};

export default function Notification({ msg, sender }: PropType) {
  const { data: senderData, status } = api.profile.getOne.useQuery({
    id: sender,
  });
  if (status === "loading") return <Loader />;
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

// toast.success(
//     <Notification msg={"New Contact!"} sender={newContact.sender} />,
//     {
//       icon: <BiMessage size="2rem" />,
//       onClick: () => handleRouterNavigation({ chat: newContact.receiver }),
//     },
//   );
