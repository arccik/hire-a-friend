import { useSession } from "next-auth/react";
import ChatBox from "../chat/Chat";

export default function Footer() {
  const { data: userSession } = useSession();
  return (
    <>
      {userSession?.user.id && <ChatBox />}
      <footer className="inset-x-0 bottom-0 flex h-32 w-full items-center justify-center gap-4 bg-background/70 p-1 backdrop-blur-lg backdrop-saturate-150">
        <div className="container mx-auto text-center font-extralight">
          <p> Rent My time &copy; 2024</p>
        </div>
      </footer>
    </>
  );
}
