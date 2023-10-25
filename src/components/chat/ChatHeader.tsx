import { DefaultSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { TfiClose } from "react-icons/tfi";

type PropType = {
  setShowChat: (value: boolean) => void;
  name: string | null;
  status: string | null;
  avatar: string | null;
  id: string;
};

export default function ChatHeader({ setShowChat, name, status, avatar, id }: PropType) {
  const router = useRouter();

  const handleCloseButton = () => {
    setShowChat(false);
    const { pathname, query } = router;
    delete router.query.chat;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        {avatar && (
          <img
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={name + " Image"}
          />
        )}
        <div className="pl-2 ">
          <div className="font-semibold">
            <Link
              className="text-black hover:underline"
              href={`/profile/${id}`}
            >
              {name}
            </Link>
          </div>
          <div className="text-xs text-gray-500">{status}</div>
        </div>
      </div>
      <div>
        <TfiClose
          className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
          size="2rem"
          onClick={handleCloseButton}
        />
      </div>
    </div>
  );
}
