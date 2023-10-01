import MembershipCard from "~/components/pages-components/choose-service/MembershipCard";

export default function ChooseMemberTypePage() {
  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div>
          <p className="mt-8 text-center text-4xl font-bold">
            Choose Your Friend Role
          </p>
          <p className="mb-8 text-center text-gray-600">Join Our Community</p>
          <p className="m-8 text-center text-sm text-gray-600">
            At Hire A Friend, you get to decide what role suits you best.
            Whether you are here to connect with new friends or to offer your
            companionship and earn, we have got you covered.
          </p>
          {/* <Card className="mb-10 p-4">
            <p className="mb-5">What Type of Friend Are You?</p>

            <p className="flex gap-2">
              <FiUsers /> <b>Member:</b> Looking to make new friends and enjoy
              exciting experiences? Become a Member and start connecting with
              like-minded people who share your interests.
            </p>

            <p className="flex gap-2">
              <GiThreeFriends /> <b>Friend: </b>Want to share your time and make
              some extra cash along the way? Join us as a Friend and offer your
              companionship to those seeking a friend for various activities.
            </p>

            <p className="mt-10">
              Choose your role and become part of our friendly community. We're
              excited to welcome you to our ever-growing network of friends and
              companions.
            </p>

            <p>Join now and let's get started!</p>
          </Card> */}
        </div>
        <div className="m-2 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4">
          <MembershipCard
            memberType="Customer"
            title="Looking for Friendship"
            subtitle="Spend Money"
            image="/assets/images/member-card-bg.jpg"
            description=" Sign up as a member and find the perfect friend for your needs."
          />
          <MembershipCard
            memberType="Friend"
            title="Offering Friendship"
            subtitle="Earn Money"
            image="/assets/images/friend-for-hire-bg.jpg"
            description="Join our community as a friend for hire and offer your services."
          />
        </div>
      </div>
    </section>
  );
}
