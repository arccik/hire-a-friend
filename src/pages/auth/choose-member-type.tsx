import MembershipCard from "~/components/pages-components/choose-member-type/MembershipCard";

export default function ChooseMemberTypePage() {
  return (
    <section className="w-full">
      <div className="container mx-auto p-5">
        <div>
          <p className="mt-8 text-center text-4xl font-bold">
            Choose Your Role
          </p>
          <p className="mb-8 text-center text-gray-400">
            Your are one step away from world of connections
          </p>
          <p className="m-8 mx-auto max-w-2xl text-sm text-gray-600">
            At RentMyTime, you get to decide what role suits you best. Whether
            you are here to connect with new friends or to offer your
            companionship and earn, we have got you covered.
          </p>
        </div>
        <div className="m-2 flex flex-col items-center justify-center  md:flex-row md:space-x-4">
          <MembershipCard
            memberType="Customer"
            title="Looking for services"
            subtitle="Spend Money"
            // image="/assets/images/member-card-bg.jpg"
            description="Sign Up as a member, through which you can discern and engage with the ideal individual to fulfill your specific requirements."
          />
          <br />
          <MembershipCard
            memberType="Friend"
            title="Offering Services"
            subtitle="Earn Money"
            // image="/assets/images/friend-for-hire-bg.jpg"
            description="We cordially invite you to become a valued member of our community, where you can offer your time for rental purposes."
          />
        </div>
      </div>
    </section>
  );
}
