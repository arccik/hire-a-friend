import { useSession } from "next-auth/react";

import Hero from "~/components/pages/home/Hero";
import YourPath from "~/components/pages/home/YourPath";
import OurMission from "~/components/pages/home/OurMission";
import EventsAndActivities from "~/components/pages/home/EventsAndActivities";
import AvailableNow from "~/components/pages/home/AvailableNow";
import OurVision from "~/components/pages/home/OurVision";
import ActionButton from "~/components/pages/home/ActionButton";

export default function HomePage() {
  const { data: userSession } = useSession();
  if (userSession?.user.id) {
    return (
      <>
        <AvailableNow />
        <OurVision />
        <ActionButton />
      </>
    );
  }
  return (
    <main className="container mx-auto snap-y snap-mandatory overflow-y-scroll">
      <Hero />
      <YourPath />
      <OurMission />
      <EventsAndActivities />
      <AvailableNow />

      <OurVision />
      <ActionButton />
    </main>
  );
}
