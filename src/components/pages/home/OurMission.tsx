import Lottie from "lottie-react";
import handshake from "~/data/animations/handshake.json";

export default function OurMission() {
  return (
    <section className="mb-10 grid grid-flow-row md:h-[calc(100dvh-64px)]  md:grid-cols-2">
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
  );
}
