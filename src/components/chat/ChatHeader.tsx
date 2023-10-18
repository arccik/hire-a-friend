import { Session, User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import Link from "next/link";
import { LuX } from "react-icons/lu";

export default function ChatHeader({
  setShowChat,
  user,
}: {
  setShowChat: (value: boolean) => void;
  user: DefaultSession["user"] & {
    id: string;
  };
}) {
  if (!user) return null;
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        {user.image && (
          <img className="h-10 w-10 rounded-full" src={user.image} />
        )}
        <div className="pl-2">
          <div className="font-semibold">
            <Link className="hover:underline" href={`/profile/${user.id}`}>
              {user.name}
            </Link>
          </div>
          <div className="text-xs text-gray-600">Online</div>
        </div>
      </div>
      <div>
        <LuX
          className="m-2 inline-flex cursor-pointer rounded-full hover:bg-indigo-50"
          size="2rem"
          onClick={() => setShowChat(false)}
        />
      </div>
    </div>
  );
}
