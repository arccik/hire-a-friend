import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <Card shadow="lg" className="mx-10">
      <div className="bg-white py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <Image
                src="/assets/images/startup.png"
                alt="image"
                loading="lazy"
                width="500"
                height="300"
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h1 className="mb-4 text-3xl font-bold">Rent My Time</h1>

              <p className="mb-6 text-gray-700">
                Rent My Time connects you with local companions across the
                United Kingdom, offering a platform where you can enjoy
                activities, seek advice, or find a friendly face for an event.
              </p>

              <h2 className="mb-4 text-2xl font-bold">How It Works</h2>

              <p className="mb-6 text-gray-700">
                Simply follow these steps to make the most of RentMyTime.co.uk:
              </p>

              <ol className="mb-6 list-inside list-decimal">
                <li className="mb-2">
                  <strong>Search for Companions:</strong> Look for companions in
                  your UK location.
                </li>
                <li className="mb-2">
                  <strong>Browse Profiles:</strong> View profiles, check out
                  photos, and learn about their interests – all for free.
                </li>
                <li className="mb-2">
                  <strong>Connect:</strong> To connect with companions, register
                  as a member with a small fee.
                </li>
                <li className="mb-2">
                  <strong>Messaging and Negotiation:</strong> Once you find a
                  companion whose profile interests you, hit the &quot;Send
                  Message&quot; button on their profile. Initiate a conversation
                  and negotiate future meetings directly with this person.
                </li>
              </ol>

              <h2 className="mb-4 text-2xl font-bold">Usage Scenarios</h2>

              <p className="mb-6 text-gray-700">
                People use RentMyTime.co.uk for a variety of reasons:
              </p>

              <ul className="mb-6 list-inside list-disc">
                <li className="mb-2">
                  <strong>Discover Local Insights:</strong> Explore your area
                  with a local companion.
                </li>
                <li className="mb-2">
                  <strong>Never Attend Events Alone:</strong> Find a companion
                  for movies, dining, or outings.
                </li>
                <li className="mb-2">
                  <strong>Learn New Skills or Hobbies:</strong> Connect with
                  someone who can teach you something new.
                </li>
                <li className="mb-2">
                  <strong>Diverse Connections:</strong> Meet people from diverse
                  backgrounds.
                </li>
                <li className="mb-2">
                  <strong>Dinner or Sports Companions:</strong> Find someone to
                  accompany you to dinner or a sports game.
                </li>
                <li className="mb-2">
                  <strong>Workout Partners:</strong> Get a workout buddy.
                </li>
                <li className="mb-2">
                  <strong>Seek Advice:</strong> Connect with companions for
                  personal advice and fresh perspectives.
                </li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold">Costs</h2>

              <p className="mb-6 text-gray-700">
                Most companions start at just £10 per hour, with room for
                negotiation, exclusively available in the UK.
              </p>

              <h2 className="mb-4 text-2xl font-bold">Contacting Companions</h2>

              <p className="mb-6 text-gray-700">
                Contact companions securely by messaging or calling them as a
                registered member.
              </p>

              <h2 className="mb-4 text-2xl font-bold">Ready to Begin?</h2>

              <p className="mb-6 text-gray-700">
                Browse companion profiles for free and find your ideal friend.
                Click the orange button below to start your search on
                RentMyTime.co.uk.
              </p>
              <Button
                as={Link}
                href="/profiles"
                className="bg-orange-500 text-white"
                color="warning"
              >
                Make Connections
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
