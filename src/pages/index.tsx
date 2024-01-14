import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import Link from "next/link";

import sayHiData from "~/data/animations/say-hi.json";
import handshake from "~/data/animations/handshake.json";
import threeFriend from "~/data/animations/three-friend-circles.json";
import bubbleProfileAnimationData from "~/data/animations/bubble-profile.json";

import Features from "~/components/pages-components/home/Features";
import ActiveFriend from "~/components/pages-components/home/ActiveFriends";

export default function HomePage() {
  return (
    <main className="container mx-auto">
      <section className="grid min-h-screen grid-flow-row md:grid-cols-2">
        <Lottie animationData={sayHiData} loop={false} />
        <div className="m-5 flex flex-col justify-center">
          <p className="text-4xl font-semibold md:text-8xl">
            Need a buddy for life&apos;s adventures?
          </p>
          <p className="mr-10 mt-5 text-2xl">
            Rent one (they come with stories).
          </p>
          <p className="text-md text-gray-400">
            Our platform connects those offering services with those in need,
            fostering meaningful connections and providing opportunities for
            extra income.
            {/* Whether you are seeking companionship or a listening ear, our
            platform connects those looking to offer services with individuals
            in need. On the other hand, if you are looking to earn extra income,
            our platform also provides opportunities for financial growth. This
            way, we cater to both the desire for meaningful connections and the
            pursuit of additional financial resources. */}
          </p>
          <div className="mb-10 flex w-full">
            <Button
              as={Link}
              href="/profiles"
              radius="full"
              className="mt-10 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg  hover:from-yellow-500 hover:to-pink-500 hover:drop-shadow-lg"
            >
              Make Connections
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-10 grid min-h-screen grid-flow-row md:grid-cols-2">
        <div className="order-2 m-5 flex flex-col justify-center md:order-1 md:ml-10">
          <p className="mt-10 text-4xl font-semibold md:text-7xl">
            {/* Your Path to Friendship and Connection */}
            Your Path to Adventure and Companionship
          </p>
          <p className="mt-10 text-xl">
            At Rent My Time, we believe that everyone deserves the warmth of
            friendship and the comfort of connection. We&apos;re here to help
            you bridge the gap between loneliness and companionship.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Lottie animationData={threeFriend} />
        </div>
      </section>
      <section className="grid  grid-flow-row md:grid-cols-2">
        <div className="flex align-middle">
          <Lottie animationData={handshake} />
        </div>
        <div className="m-5 flex flex-col justify-center md:ml-10">
          <p className="text-7xl font-semibold">Our Mission</p>
          <p className="mb-10 mt-10 text-xl md:mb-0">
            Our mission is simple: to bring people together. We provide a
            welcoming platform where you can find like-minded individuals, form
            meaningful connections, and discover new friends who resonate with
            your interests and emotions.
          </p>
        </div>
      </section>
      <section className="mx-auto mt-10 md:container">
        <div className="m-5">
          <p className="text-6xl font-semibold ">Events and Activities</p>
          <p className="mb-10 text-xl">
            Discover a world of connection and engagement through our diverse
            range of events and activities. From lively meetups to enriching
            workshops, there&apos;s always something happening. Dive into the
            excitement and create unforgettable memories with like-minded
            individuals.
          </p>
        </div>

        <Features />
      </section>
      <section className="mx-auto mt-32 md:container">
        <div className="m-5">
          <p className="mb-10 text-6xl font-semibold ">
            Connect with Those Available Now
          </p>
          <p className="mb-10 text-xl">
            It&apos;s time to reach out and connect with individuals who truly
            understand the value of friendship. Explore their profiles and find
            the one that suits your needs. Let&apos;s make the world a better
            place together!{" "}
          </p>
        </div>

        <ActiveFriend />
      </section>

      <section className="m-5 mt-10 grid grid-flow-row md:grid-cols-2">
        <div className="flex flex-col justify-center md:ml-10">
          <p className="text-7xl font-semibold">Our Vision</p>
          <p className="mt-10 text-xl">
            Our vision goes beyond just connecting people — it&apos;s about
            breaking the ice of loneliness. In a world where making connections
            can be challenging, we are on a mission to redefine how individuals
            forge meaningful bonds. Imagine a platform where the currency is
            time, and loneliness becomes a thing of the past. Our vision is to
            create a space where every rented moment is a step towards breaking
            down barriers and building bridges of genuine connection. Join us in
            reshaping the way we connect, one rented moment at a time.
          </p>
        </div>
        <Lottie animationData={bubbleProfileAnimationData} />
      </section>
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
