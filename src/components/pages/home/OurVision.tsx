import Lottie from "lottie-react";
import bubbleProfileAnimationData from "~/data/animations/bubble-profile.json";

export default function OurVision() {
  return (
    <section className="m-5 mt-32 grid grid-flow-row md:grid-cols-2 ">
      <div className="flex flex-col justify-center md:ml-10">
        <p className="text-7xl font-semibold">Our Vision</p>
        <p className="mt-10 text-xl">
          Our vision goes beyond just connecting people — it&apos;s about
          breaking the ice of loneliness. In a world where making connections
          can be challenging, we are on a mission to redefine how individuals
          forge meaningful bonds. Imagine a platform where the currency is time,
          and loneliness becomes a thing of the past. Our vision is to create a
          space where every rented moment is a step towards breaking down
          barriers and building bridges of genuine connection. Join us in
          reshaping the way we connect, one rented moment at a time.
        </p>
      </div>
      <Lottie animationData={bubbleProfileAnimationData} />
    </section>
  );
}
