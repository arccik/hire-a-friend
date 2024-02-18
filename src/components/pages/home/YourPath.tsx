import Lottie from "lottie-react";
import threeFriend from "~/data/animations/three-friend-circles.json";

export default function YourPath() {
  return (
    <section className="grid grid-flow-row md:grid-cols-2">
      <div className="order-2 m-5 flex flex-col justify-center md:order-1 md:ml-10">
        <p className="mt-10 text-4xl font-semibold md:text-7xl">
          Your Path to Adventure and Companionship
        </p>
        <p className="mt-10 text-xl">
          At Rent My Time, we believe that everyone deserves the warmth of
          friendship and the comfort of connection. We&apos;re here to help you
          bridge the gap between loneliness and companionship.
        </p>
      </div>
      <div className="order-1 md:order-2">
        <Lottie animationData={threeFriend} />
      </div>
    </section>
  );
}
