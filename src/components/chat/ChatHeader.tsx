import { DefaultSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { TfiClose } from "react-icons/tfi";

export default function ChatHeader({
  setShowChat,
  user,
}: {
  setShowChat: (value: boolean) => void;
  user: DefaultSession["user"] & {
    id: string;
  };
}) {
  const router = useRouter();
  const handleCloseButton = () => {
    setShowChat(false);
    const { pathname, query } = router;
    delete router.query.chat;
    void router.replace({ pathname, query });
  };
  if (!user) return null;
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        {user.image && (
          <img className="h-10 w-10 rounded-full" src={user.image} />
        )}
        <div className="pl-2 ">
          <div className="font-semibold">
            <Link
              className="text-black hover:underline"
              href={`/profile/${user.id}`}
            >
              {user.name}
            </Link>
          </div>
          <div className="text-xs text-gray-500">Online</div>
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
