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
    <main className="m-2 md:m-0">
      <section className="grid min-h-screen grid-flow-row md:grid-cols-2">
        <Lottie animationData={sayHiData} />
        <div className="m-5 flex flex-col justify-center">
          <p className="text-6xl font-semibold md:text-8xl">
            Tired of being alone?
          </p>
          <p className="mr-10 mt-5 text-xl">
            {/* Having nobody to share your emotions, the quiet evenings spent
            alone, and the unspoken words? */}
            Whether you are seeking companionship, a listening ear, or a way to
            earn extra income, our platform connects those looking to offer
            services with those in need, creating meaningful connections and
            financial opportunities.
          </p>
          <div className="mb-10 flex w-full">
            <Button
              as={Link}
              href="/profiles"
              radius="full"
              className="mt-10 animate-bounce bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg  hover:from-yellow-500 hover:to-pink-500 hover:drop-shadow-lg"
            >
              Make Connections
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-10 grid min-h-screen grid-flow-row md:grid-cols-2">
        <div className="order-2 m-5 flex flex-col justify-center md:order-1 md:ml-10">
          <p className="mt-10 text-4xl font-semibold md:text-7xl">
            Your Path to Friendship and Connection
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
          <p className="mb-10 text-xl">Don not let loneliness linger.</p>
        </div>

        <Features />
      </section>
      <section className="mx-auto mt-32 md:container">
        <div className="m-5">
          <p className="mb-10 text-6xl font-semibold ">
            Check who is Available now
          </p>
          <p className="mb-10 text-xl">
            It is time to reach out and connect with people who understand what
            it means to seek a friend
          </p>
        </div>

        <ActiveFriend />
      </section>

      <section className="m-5 mt-10 grid grid-flow-row md:grid-cols-2">
        <div className="flex flex-col justify-center md:ml-10">
          <p className="text-7xl font-semibold">Our Vision</p>
          <p className="mt-10 text-xl">
            We want to be the first platform to connect people with people who
            share the same interests and experiences.
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
