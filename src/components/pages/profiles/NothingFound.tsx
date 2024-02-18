import { Button, Card } from "@nextui-org/react";
import Lottie from "lottie-react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import nothingFound from "~/data/animations/notfound-search.json";

type PropType = {
  show: boolean;
};

export default function ClearFilter({ show }: PropType) {
  if (!show) return null;
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={nothingFound} className="mb-10 w-60" />
      <Card className=" p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Oops! No profiles found.
        </h2>
        <p className="mb-4 text-lg text-gray-600">
          Looks like there are no profiles listed at the moment.
        </p>
        <p className="mb-4 text-gray-500">Here are a few things you can do:</p>
        <ul className="mb-4 text-left text-gray-500">
          <li className="flex gap-2">
            <FaCheck className="text-warning" /> Create your own profile and
            start offering your time!
          </li>
          <li className="flex gap-2">
            <FaCheck className="text-warning" /> Check back later, new profiles
            might be added soon.
          </li>
          <li className="flex gap-2">
            <FaCheck className="text-warning" />{" "}
            <Link href="/contact-us" className="underline">
              Contact us
            </Link>{" "}
            if you need assistance or have any questions.
          </li>
        </ul>
        <Button
          as={Link}
          href="/auth/sign-up"
          variant="bordered"
          color="warning"
        >
          Create Your Profile
        </Button>
      </Card>
    </div>
  );
}
