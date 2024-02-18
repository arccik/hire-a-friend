import ActiveFriend from "./ActiveFriends";

export default function AvailableNow() {
  return (
    <section className="mx-auto mt-32 md:container ">
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
  );
}
