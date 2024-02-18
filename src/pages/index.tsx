import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Hero from "~/components/pages/home/Hero";
import YourPath from "~/components/pages/home/YourPath";
import OurMission from "~/components/pages/home/OurMission";
import EventsAndActivities from "~/components/pages/home/EventsAndActivities";
import AvailableNow from "~/components/pages/home/AvailableNow";
import OurVision from "~/components/pages/home/OurVision";

export default function HomePage() {
  const { data: userSession } = useSession();
  if (userSession?.user.id) {
    return (
      <>
        <AvailableNow />
        <OurVision />
      </>
    );
  }
  return (
    <main className="container mx-auto">
      <Hero />
      <YourPath />
      <OurMission />
      <EventsAndActivities />
      <AvailableNow />

      <OurVision />
      <div className="mb-10 flex w-full justify-center">
        <Button
          as={Link}
          size="lg"
          href="/profiles"
          className="mt-10 animate-bounce bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg  hover:from-yellow-500 hover:to-pink-500 hover:drop-shadow-lg"
        >
          Start your journey
        </Button>
      </div>
    </main>
  );
}
